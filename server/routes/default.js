var fs = require("fs");

module.exports = function(site) {
    site.get('/default', function(req, res) {
        res.redirect('/');
    });

    site.get('/', function(req, res) {
        fs.createReadStream("./index.html").pipe(res);
    });


};
