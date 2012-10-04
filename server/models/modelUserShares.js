var dacFactory = require('../dac/dac');
var dacUserSources = require('../dac/dacUserSources');

var UserShares = {
    ObjectName: '',
    ObjectType: '',
    ObjectOwner: '',
    ObjectGuest: '',
    ShareDate: ''
};

var UserSharesColl = [];

module.exports = UserShares;

UserShares.loadUserShare = function (rows) {
    UserSharesColl = [];
    for (var r in rows) {
        var usershare = Object.create(UserShares);
        usershare.ObjectName     = rows[r].objectname;
        usershare.ObjectType  = rows[r].objecttype;
        usershare.ObjectOwner        = rows[r].ownermail;
        usershare.ObjectGuest    = rows[r].guestmail;
        usershare.ShareDate     = rows[r].sharedate;
        UserSharesColl.push(usershare);
        console.log('filas:' + rows.length);
    }

    return UserSharesColl;
};

UserShares.getUserShares = function (config, email, callback) {

    dacFactory.init(config, function (client) {
        dacUserSources.getUserSources(client, email, function(data) {
            UserShares.loadUserShare(data.rows);
            callback(data = { obj: UserSharesColl, error: data.error } );
        });

    });
};


