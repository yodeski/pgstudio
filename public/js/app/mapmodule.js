app.register("map-module", function(sandbox){
    /*
    * @constructor
	*/
	var mainMap;
    return {

		objSource: {}, //objeto tabla/view
        
		init: function(){
			this.moduleId = "MyMap";
			this.el = sandbox.getElement({ selector:"#" + this.moduleId });
            mainMap= null;
            
            this.handleLayerEvent();
            this.loadMap();

		},
		loadMap: function(){
            var self = this;
            var sources = app.getModuleData("leftMenu").instance.getSources();

            mainMap = Map('map', {
                // Specify the MapBox API url
                api: 'http://api.tiles.mapbox.com/v3/mapbox.mapbox-streets.jsonp',
                center: {
                    lat: -34.5767,      // Intial center point and zoom level.
                    lon: -58.437,      // To find coordinates and zoom levels
                    zoom: 10            // try: http://www.getlatlon.com or http://freegeoip.net/json/201.250.58.50
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
            _.forEach(sources, function(value) {
                if(value) {
                    mainMap.layers({
                        lineassubte: { 
                            api: 'http://127.0.0.1:8888/' + value.ObjectName + '/{z}/{x}/{y}.png'
                        }
                    });
                }
            });

		},
        
        handleLayerEvent: function() {
            
            $('body').on('click.map', '[data-control="layer"]', function(e) {
                var $this = $(this),
                    id = $this.attr('href');
                
                id = id.replace(/.*(?=#[^\s]+$)/, '').slice(1);
                
                e.preventDefault();
                
                if($this.hasClass('active')) {
                    $('[data-control="layer"]').removeClass('active');
                    mainMap.removeOverlay(id);        
                } else {
                    $('[data-control="layer"]').removeClass('active');
                    $this.addClass('active');
                    mainMap.setOverlay(id);
                }
            });
            
        }

	};
});