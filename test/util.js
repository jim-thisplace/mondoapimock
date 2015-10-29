var syncRequest = require('sync-request');

var ORIGIN = 'http://localhost:9001';

/**
 * @param {string} url
 * @param {'get'|'post'} method
 * @param options
 * @returns {{status: number, body: string}}
 */
function request(url, method, options) {
    var res         = syncRequest(method || 'get', ORIGIN + url, options);
    var contentType = res.headers['content-type'];

    var isJSON = 'application/json; charset=utf-8' === contentType;
    var body   = res.body.toString('utf-8');

    if (isJSON) {
        body = JSON.parse(body);
    }

    return {
        status : res.statusCode,
        body   : body
    }
}

/**
 * @param {string} s
 * @returns {boolean}
 */
function isNotEmptyStringOrNull(s) {
    if (typeof s === 'string') {
        return s.length > 0 && s !== 'null';
    } else {
        return false;
    }
}

module.exports = {
    request                : request,
    isNotEmptyStringOrNull : isNotEmptyStringOrNull
};