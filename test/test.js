var rest = require('restler');

// warnning!! this test base on local data

var signedData = '-- your signed data input here --';
var signature = '-- your signature input here --';

rest.post("http://localhost:3000" + '/vr', {
    data: {
        signedData: signedData,
        signature: signature
    }
}).on("complete", function(data, res) {
        return console.log(data);
    });