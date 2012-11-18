var fs = require("fs");

module.exports = function(site) {
    site.get('/default', function(req, res) {
        res.redirect('/');
    });

    site.get('/', function(req, res) {
        req.session.logged = true;
        req.session.user = 'yodeski';
        req.session.postgisDB = 'pgs_buenos_aires';
        console.log(req.session);
        fs.createReadStream("./index.html").pipe(res);
    });


};
