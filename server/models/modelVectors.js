var dacFactory = require('../dac/dac');
var dacVectors= require('../dac/dacVectors');

var GeoJsonVector = {};

// GeoJSON Feature Collection
var data = {
    type: 'Feature',
    geometry: {},
    properties: {},
};
var features=[];

var GeoJSON = {
    type: 'FeatureCollection',
    features : []
};

module.exports = GeoJsonVector;

GeoJsonVector.loadFeatures = function (rows) {

    for (var i = 0; i < rows.length; i++)
    {
        var d = Object.create(data);
        d.type= 'Feature';
        d.geometry = JSON.parse(rows[i].the_geom);
        features.push(d);
    } 

}

GeoJsonVector.getGeoJsonVectors = function (config, bounds, tablename, fieldname, callback) {

    dacFactory.init(config, function (client) {
        dacVectors.getGeoJSONFromTable(client, bounds, tablename, fieldname, function(data) {
            GeoJsonVector.loadFeatures(data.rows);
            callback(data = { obj: features } );
        });

    });
}


