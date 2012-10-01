var util = require('util');
var User = require('../models/modelUser');

module.exports = function (app) {
    app.get('/login', function(req, res) {
        res.render('login', {
            page: 'login'
        });
    });

    app.post('/login', function (req, res) {
        req.assert('inputUsername', 'Invalid postparam').notEmpty();
        req.assert('inputPassword', 'Invalid getparam').notEmpty();
        req.sanitize('inputUsername').toString();
        req.sanitize('inputPassword').toString();
    
        var errors = req.validationErrors();
        if (errors) {
            res.send('There have been validation errors: ' + util.inspect(errors), 500);
            return;
        }

        User.validateLogin (client, req.body.username, req.body.username, req.body.password, function (data) {
            if (!data.error) {
                console.log(data.obj);
                if (data.obj && data.obj.active == true)
                    res.redirect('/default', data);
                else {
                    res.send('usuario inexsistente o inactivo', 500);
                }
            }
            else
                res.send(data.error, 500);        
        });


    });
    
};
