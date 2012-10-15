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

            this.mainMap = Map('map', {
                // Specify the MapBox API url
                api: 'http://api.tiles.mapbox.com/v3/mapbox.mapbox-streets.jsonp',
                center: {
                    lat: -34.5875,      // Intial center point and zoom level.
                    lon: -58.6725,      // To find coordinates and zoom levels
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
            this.mainMap.layers({

                subtes: { 
                    api: 'http://127.0.0.1:8888/subtes/{z}/{x}/{y}.png',
                    center: { zoom: 12, ease: 1000 }
                }
            });            
            

		}

	};
});
app.start("map-module");