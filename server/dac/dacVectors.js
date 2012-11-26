module.exports = {

    getGeoJSONFromTable: function (client, bounds, tablename, fieldname, callback) {
        client.on('drain', function(client){
            client.end();
        });
        var data = {};
        try {
            /*var sql = 'select ST_AsGeoJSON(the_geom) as the_geom ';
            sql = sql + 'from ' + tablename;
            sql = sql + 'where the_geom && ST_GeogFromText(\'SRID=4326;POLYGON((' + bounds._sWLon + ' ' + bounds._sWLat + ',' + bounds._nELon + ' ' + bounds._sWLat + ',' + bounds._nELon + ' ' + bounds._nELat + ',' + bounds._sWLon + ' ' + bounds._nELat + ',' + bounds._sWLon + ' ' + bounds._sWLat + '))\') ';
            sql = sql + 'and ST_Intersects(the_geom, ST_GeogFromText(\'SRID=4326;POLYGON((' + bounds._sWLon + ' ' + bounds._sWLat + ',' + bounds._nELon + ' ' + bounds._sWLat + ',' + bounds._nELon + ' ' + bounds._nELat + ',' + bounds._sWLon + ' ' + bounds._nELat + ',' + bounds._sWLon + ' ' + bounds._sWLat + '))\'));';
            console.log(sql);*/
            var query = client.query({
                text: "SELECT * from pgstudio.getGeoJsonFromTable ($1, $2, $3, $4, $5, $6)",
                values: [tablename, fieldname, bounds._sWLon, bounds._sWLat, bounds._nELon, bounds._nELat]
            }, function (err, result) {
                callback(data = { rows: result.rows, error: err });
            });

            client.pauseDrain();            
        }
        catch (e) {
            callback( data = { rows: [], error: e });
        }
    },

};