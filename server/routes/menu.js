var UserSource = require('../models/modelSources');
var UserFunction = require('../models/modelUserFunctions');

module.exports = function(site) {

    site.get('/getTemplate', function (req, res) {
        var myMenu = require('../resources/leftMenu.json');
        res.render('partials/leftNav',{ menuItems: myMenu });
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

    site.get('/myfunctions', function (req, res) {
        UserFunction.getUserFunctions(site.config, 'yodeski@gmail.com', function(data) {
            res.send({ objectList: data.obj, error: data.error });
    });

  });

};
