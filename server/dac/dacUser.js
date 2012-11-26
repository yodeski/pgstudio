var crypto = require('crypto'),
    uuid = require('node-uuid');

module.exports = {

    getLogin: function (client, username, email, pass, callback) {

        client.on('drain', function(client){
            client.end();
        });

        try {
            var query = client.query({
                text: "SELECT * from validate_user ($1, $2)",
                values: [username, email]
            }, function (err, result) {

                var passwdHash = result.rows[0].pass;
                var cryptHash = crypto.createHmac('sha256', result.rows[0].salt).update(pass).digest('hex');
                if (passwdHash == cryptHash) {
                    //console.log(crypto.createHmac('sha256', result.rows[0].salt).update(pass).digest('hex'));
                    callback(data = { rows: result.rows, error: err });
                }
                else {
                    var _err = 'Invalid password or user name. Please, enter correct password or user name.';
                    callback(data = { rows: [], error: _err });
                }
            });

            client.pauseDrain();
        }
        catch (e) {
            callback(data = { rows: [], error: e });
        }
    },

};
