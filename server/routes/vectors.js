var GeoJsonVector = require('../models/modelVectors');

module.exports = function(site) {

    site.get('/getGeoJson', function (req, res) {
        var config = {pguser: 'postgres', pgpass: 'vivirencanada', pghost: 'localhost', pgdb: req.session.postgisDB };
        GeoJsonVector.getGeoJsonVectors(config, req.query._bbBox, req.query._tablename, req.query._fieldname, function(data) {
            res.send({ features: data.obj, error: data.error });
        });
    });

};
