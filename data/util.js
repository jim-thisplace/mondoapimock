var md5 = require('../md5');

/**
 * @param {object} merchant
 * @param {string} merchant.name
 * @returns {string}
 */
function createMerchantId(merchant) {
    return 'merch_' + md5(merchant.name).substring(0, 16);
}

module.exports = {
    createMerchantId : createMerchantId

};
