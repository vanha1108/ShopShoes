const crypto = require('crypto');

const getCode = () => {
    var code = crypto.randomBytes(10).toString('hex');
    return code;
}

module.exports = {getCode};