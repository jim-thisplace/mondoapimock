var http       = require('http');
var express    = require('express');
var app        = express();
var crypto     = require('crypto');
var random     = require('./random');
var bodyParser = require('body-parser');

function md5(data) {
    return crypto.createHash('md5').update(data).digest("hex");
}

function createToken() {
    return md5(Math.random() + new Date).substring(0, 8);
}

// Middleware

app.disable('x-powered-by');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('X-ACCESS', 'MAIN SECURITY GRID');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

// Endpoints

var SESSION_DURATION = 21600;
var sessions         = {};

/**
 * @param {Array} a
 * @returns {Boolean}
 */
function logicalArrayAND(a) {
    return a.map(Boolean).reduce(function (prev, curr) {return prev && curr;}, true);
}

/**
 * @param {object} req
 * @param {string} req.grant_type
 * @param {string} req.client_id
 * @param {string} req.client_secret
 * @param {string} req.username
 * @param {string} req.password
 * @returns {Boolean}
 */
function verifyCredentials(req) {
    if (req.body.grant_type === 'password') {
        return logicalArrayAND([
            req.body.client_id,
            req.body.client_secret,
            req.body.username,
            req.body.password
        ]);
    } else if (req.body.grant_type === 'refresh_token') {
        return logicalArrayAND([
            req.body.client_id,
            req.body.client_secret,
            req.body.refresh_token
        ]);
    } else {
        return false;
    }
}

function acquireAccessToken(req, res) {
    if (verifyCredentials(req)) {
        var session = {
            access_token  : createToken(),
            refresh_token : createToken(),
            client_id     : req.body.client_id,
            client_secret : req.body.client_secret,
            user_id       : parseInt(md5(req.body.client_secret).substring(0,3), 64)
        };

        res.status(200).json({
            access_token  : session.access_token,
            client_id     : session.client_id,
            expires_in    : SESSION_DURATION,
            refresh_token : session.refresh_token,
            token_type    : "Bearer",
            user_id       : session.user_id
        });
    } else {
        res.status(400).json({ error : 'invalid_token' });
    }
}

function lookupAccessToken(req, res) {
    var accessToken = req.get('Authorization') || '';
    accessToken     = accessToken.split(' ')[1];

    var theSession = sessions[accessToken];

    if (theSession) {
        res.status(200).json({
            authenticated : true,
            client_id     : theSession.client_id,
            user_id       : theSession.user_id
        });
    } else {
        res.status(400).json({ error : 'invalid_token' });
    }
}

// Auth
app.post('/oauth2/token', acquireAccessToken);
app.get('/ping/whoami', lookupAccessToken);

http.createServer(app)
    .listen(9001, console.log.bind(console, 'HTTP server listening on port 9001'));