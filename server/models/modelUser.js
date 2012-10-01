var dacFactory = require('../dac/dac');
var dacUser = require('../dac/dacUser');

module.exports = {

    Users : [],
    /** A user. */
    User : {
        UserName: '',
        Email: '',
        FirstName: '',
        LastName: '',
        Active: false,
        TotalTables: 0,
        TotalViews: 0,
        TotalFunctions: 0,
        SharedTables: 0,
        SharedViews: 0,
        SharedFunctions: 0

    },

    loadUser: function (rows) {
        var user = Object.create(Person);
        user.UserName         = rows[0].username;
        user.Email            = rows[0].email;
        user.FirstName        = rows[0].firstname;
        user.LastName         = rows[0].lastname;
        user.Active           = rows[0].active;
        user.TotalTables      = rows[0].totaltables;
        user.TotalViews       = rows[0].totalviews;
        user.TotalFunctions   = rows[0].totalfunctions;
        user.SharedTables     = rows[0].sharedtables;
        user.SharedViews      = rows[0].sharedviews;
        user.SharedFunctions  = rows[0].sharedfunctions;
        return user;
    },

    validateLogin: function (username, email, pass, callback) {

        dacFactory.init(app.config, function (client) {
            dacUser.getLogin(client, username, email, pass, function(data) {
                var user = this.loadUser(data.rows);
                callback(data = { obj: user, error: data.error } );
            });
        });

    }

}
