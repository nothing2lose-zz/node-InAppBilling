var crypto = require("crypto")
    ,algorithm = 'RSA-SHA1'
    ,publicKeyString = '------------- your public key here --------------'
    ,base64EncodedPublicKey = '';

var generateFormattedPublickey = function(publicKeyStr) {
    var KEY_PREFIX, KEY_SUFFIX, chunkSize, chunks, str;
    KEY_PREFIX = "-----BEGIN PUBLIC KEY-----\n";
    KEY_SUFFIX = '\n-----END PUBLIC KEY-----';
    str = publicKeyStr;
    chunks = [];
    chunkSize = 64;
    while (str) {
        if (str.length < chunkSize) {
            chunks.push(str);
            break;
        } else {
            chunks.push(str.substr(0, chunkSize));
            str = str.substr(chunkSize);
        }
    }
    str = chunks.join("\n");
    str = KEY_PREFIX + str + KEY_SUFFIX;
    return str;
};

var verify = function(signedData, signature) {
    var verifier;
    verifier = crypto.createVerify(algorithm);
    verifier.update(signedData);
    return verifier.verify(base64EncodedPublicKey, signature, 'base64');
};

base64EncodedPublicKey = generateFormattedPublickey(publicKeyString);

var routes = function(app) {
    return app.post('/vr', function(req, res) {
        var signedData = req.param('signedData')
        var signature = req.param('signature')

        var result = verify(signedData, signature);
        // do something
        // server database update or etc...
        return res.send(result);
    });
};

module.exports = routes;