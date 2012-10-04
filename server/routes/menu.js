var UserSource = require('../models/modelSources');
var UserFunction = require('../models/modelUserFunctions');
var UserShares = require('../models/modelUserShares');

module.exports = function(site) {

    site.get('/getTemplate', function (req, res) {
        var myMenu = require('../resources/leftMenu.json');
        res.render('partials/leftNav', { menuItems: myMenu });
    });

    site.get('/getMenu', function (req, res) {
        var myMenu = require('../resources/leftMenu.json');
        res.send(myMenu);
    });

    site.get('/mytables', function (req, res) {
        UserSource.getUserSources(site.config, 'yodeski@gmail.com', function(data) {
            res.send({ objectList: data.obj, error: data.error });
        });
    });

    site.get('/myviews', function (req, res) {
        res.send({ objectList: [], error: '' });
    });    

    site.get('/myfunctions', function (req, res) {
        UserFunction.getUserFunctions(site.config, 'yodeski@gmail.com', function(data) {
            res.send({ objectList: data.obj, error: data.error });
        });
    });
    
    site.get('/myshares', function (req, res) {
        UserShares.getUserShares(site.config, 'yodeski@gmail.com', function(data) {
            res.send({ objectList: data.obj, error: data.error });
        });
    });

};
