var pg = require('pg');
var dacFactory;

module.exports = {

    init: function (config, callback) {
        var connectionString = "pg://" + config.pguser + ":" + config.pgpass + "@" + config.pghost + ":5432/" + config.pgdb;
        var error = null;

        pg.connect(connectionString, function (err, client) {
            callback(client);
        });
    }

};


