var request = require('./util').request;
var expect  = require('chai').expect;

describe('Authentication', function () {
    var refresh_token;
    var access_token;

    it('POST /oauth2/token should acquire an access token given the correct credentials', function () {
        var res = request('/oauth2/token', 'post', {
            json : {
                grant_type    : 'password',
                client_id     : 1337,
                client_secret : 'a_secret',
                username      : 'jim@thisplace.com',
                password      : 'secure_password'
            }
        });

        refresh_token = res.body.refresh_token;
        access_token  = res.body.access_token;

        return expect(
            res.status === 200 &&
            res.body.access_token &&
            res.body.refresh_token &&
            res.body.user_id === 337 &&
            res.body.client_id === 1337 &&
            res.body.token_type === "Bearer"
        ).to.be.true;
    });

    it('GET /ping/whoami should get information about an access token', function () {
        var res = request('/ping/whoami', 'get', {
            headers : { 'Authorization' : 'Bearer ' + access_token }
        });

        return expect(
            res.status === 200 &&
            res.body.authenticated &&
            res.body.client_id === 1337
        ).to.be.true;
    });

    it('POST /oauth2/token should refresh an access token given a correct refresh token ', function () {
        var res = request('/oauth2/token', 'post', {
            headers : { 'Authorization' : 'Bearer ' + access_token },
            json    : {
                grant_type    : 'refresh_token',
                client_id     : 1337,
                client_secret : 'a_secret',
                refresh_token : refresh_token
            }
        });

        var isDifferentAccessToken =  refresh_token !== res.body.refresh_token;
        var isDifferentRefreshToken =  access_token  !== res.body.access_token;

        refresh_token = res.body.refresh_token;
        access_token  = res.body.access_token;

        return expect(
            res.status === 200 &&
            isDifferentAccessToken &&
            isDifferentRefreshToken &&
            res.body.user_id === 337 &&
            res.body.client_id === 1337 &&
            res.body.token_type === "Bearer"
        ).to.be.true;
    });
});