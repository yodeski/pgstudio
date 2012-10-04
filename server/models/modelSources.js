var dacFactory = require('../dac/dac');
var dacUserSources = require('../dac/dacUserSources');

var UserSource = {
    ObjectName: '',
    Creationdate: '',
    Styles: '',
    Sourcetype: 'table',
    Fieldtype: 'point'
};

var UserSourcesColl = [];

module.exports = UserSource;

UserSource.loadUserSource = function (rows) {
    UserSourcesColl = [];
    for (var r in rows) {
        var usersource = Object.create(UserSource);
        usersource.ObjectName     = rows[r].tablename;
        usersource.Creationdate  = rows[r].creationdate;
        usersource.Styles        = rows[r].styles;
        usersource.Sourcetype    = rows[r].sourcetype;
        usersource.Fieldtype     = rows[r].fieldtype;
        UserSourcesColl.push(usersource);
    }

    return UserSourcesColl;
};

UserSource.getUserSources = function (config, email, callback) {

    dacFactory.init(config, function (client) {
        dacUserSources.getUserSources(client, email, function(data) {
            UserSource.loadUserSource(data.rows);
            callback(data = { obj: UserSourcesColl, error: data.error } );
        });

    });
};


