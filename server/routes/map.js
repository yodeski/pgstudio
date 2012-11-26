var fs = require("fs");

module.exports = function(site) {

    site.get('/getMapsDirectory', function (req, res) {
        var mapsdir = site.config.mapsdir
        res.send( mapsdir );
    });
    
    site.get('/getMapFile', function (req, res) {
        getMapFile(site.config.mapsdir, req.query.mapfile, function(data) {
            res.send(data);
        });
    });
    
    site.get('/saveMapFile', function (req, res) {
        saveMapFile(site.config.mapsdir, req.query.mapfile, req.query.content, function(data) {
            res.send(data);
        });
    });
    
    function getMapFile(path, mapfile, callback) {
        try {
            var mf = path + mapfile + '.map';
            fs.readFile(mf, function(err, data){
                callback( data );
            });
        } 
        catch(ex) {
            callback( "" );
        }    
    }
    
    function saveMapFile(path, mapfile, content, callback) {
        try {
            var mf = path + mapfile + '.map';
            fs.writeFile(mf, content, function(err,data){
                callback( data );
            });
        } 
        catch(ex) {
            callback( "" );
        }    
    }
    
};

