
module.exports = {

    getUserSources: function (client, useremail, callback) {
        client.on('drain', function(client){
            client.end();
        });
        var data = {};
        try {
            var query = client.query({
                    text: "SELECT * from get_user_sources ($1)",
                    values: [useremail]
                },
                function (err, result) {
                    console.log(result);
                    callback( data = { rows: result.rows, error: err });
                });

            client.pauseDrain();
        }
        catch (e) {
            callback( data = { rows: [], error: e });
        }
    },
    
    getUserFunctions: function (client, useremail, callback) {
        client.on('drain', function(client){
            client.end();
        });
        var data = {};
        try {
            var query = client.query({
                    text: "SELECT * from get_user_functions ($1)",
                    values: [useremail]
                },
                function (err, result) {
                    callback(data = { rows: result.rows, error: err });
                });

            client.pauseDrain();
        }
        catch (e) {
            callback( data = { rows: [], error: e });
        }
    },
    
    getUserShares: function (client, useremail, callback) {
        client.on('drain', function(client){
            client.end();
        });
        
        var data = {};
        try {
            var query = client.query({
                    text: "SELECT * from get_user_shares ($1)",
                    values: [useremail]
                },
                function (err, result) {
                    console.log(result);
                    callback(data = { rows: result.rows, error: err });
                });

            client.pauseDrain();
        }
        catch (e) {
            callback( data = { rows: [], error: e });
        }
    } 

};
