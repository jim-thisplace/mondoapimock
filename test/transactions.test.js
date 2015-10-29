var request = require('./util').request;
var expect  = require('chai').expect;

describe('Transactions', function () {
    var refresh_token;
    var access_token;

    before(function () {
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
    });

    it('GET /transactions/:transaction_id returns an individual transaction, fetched by its id', function () {
        var res = request('/transactions/12', 'get', {
            headers : { 'Authorization' : 'Bearer ' + access_token }
        });

        return expect(
            res.status === 200
        ).to.be.true;
    });
});