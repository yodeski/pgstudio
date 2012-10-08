app.register("map-module", function(sandbox){
    /*
    * @constructor
	*/
	return {

		objSource: {}, //objeto tabla/view
        
		init: function(){
			this.moduleId = "MyMap";
			this.el = sandbox.getElement({ selector:"#" + this.moduleId });
            this.mainMap= null;
            this.loadMap();

		},
		loadMap: function(){

            mainMap = Map('map', {
                // Specify the MapBox API url
                api: 'http://api.tiles.mapbox.com/v3/mapbox.mapbox-streets.jsonp',
                center: {
                    lat: 38.9090033656251,      // Intial center point and zoom level.
                    lon: -77.014396158891,      // To find coordinates and zoom levels
                    zoom: 13                    // try: http://www.getlatlon.com
                },
                zoomRange: [0, 15],             // Limit zooming on the map to these levels
                features: [                     // Map features (see readme.md)
                    'zoomwheel',
                    'movetips',
                    'zoombox',
                    'zoompan',
                    'share'
                ]
            });
            
            mainMap.layers({
                custom: { api: 'http://localhost:4000/database/pgs_buenos_aires/table/lineas-subte/{z}/{x}/{y}' }
            });            

		}

	};
});
app.start("map-module");