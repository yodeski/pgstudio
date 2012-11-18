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
            this.MM_map = {};
            this.theLayers;
            
            this.baseUrl = 'http://api.tiles.mapbox.com/v3/mapbox.mapbox-streets.jsonp';
            this.layerURL = "http://tiles.appgis.com/database/<%= dbname %>/table/<%= table %>/{z}/{x}/{y}";
            this.baseStyleURL = "http://tiles.appgis.com/database/<%= dbname %>/table/<%= table %>";
            this.tilejson = {
                tilejson: '1.0.0',
                scheme: 'xyz',
                tiles: [],
                grids: [],
                formatter: function(options, data) { return data.id }
            };
            
            this.handleLayerEvent();
            this.loadMap();

		},
        Map: function(el, l, callback) {
            var self = this;
            wax.tilejson(l.api, function(t) {
                var handlers = [
                    new MM.DragHandler(),
                    new MM.DoubleClickHandler(),
                    new MM.TouchHandler()
                ];
                if ($.inArray('zoomwheel', l.features) >= 0) {
                    handlers.push(new MM.MouseWheelHandler());
                }
    
                self.MM_map = new MM.Map(el, new wax.mm.connector(t), null, handlers);
                self.MM_map.setCenterZoom({
                    lat: (l.center) ? l.center.lat : t.center[1],
                    lon: (l.center) ? l.center.lon : t.center[0]
                }, (l.center) ? l.center.zoom : t.center[2]);
    
                if (l.zoomRange) {
                    self.MM_map.setZoomRange(l.zoomRange[0], l.zoomRange[1]);
                } else {
                    self.MM_map.setZoomRange(t.minzoom, t.maxzoom);
                }
    
                wax.mm.attribution(self.MM_map, t).appendTo(self.MM_map.parent);
    
                for (var i = 0; i < l.features.length; i++) {
                    switch(l.features[i]) {
                        case 'zoompan':
                            wax.mm.zoomer(self.MM_map).appendTo(self.MM_map.parent);
                            break;
                        case 'zoombox':
                            wax.mm.zoombox(self.MM_map);
                            break;
                        case 'legend':
                            self.MM_map.legend = wax.mm.legend(self.MM_map, t).appendTo(self.MM_map.parent);
                            break;
                        case 'bwdetect':
                            wax.mm.bwdetect(self.MM_map);
                            break;
                        case 'share':
                            wax.mm.share(self.MM_map, t).appendTo($('body')[0]);
                            break;
                        case 'tooltips':
                            self.MM_map.interaction = wax.mm.interaction()
                                .map(self.MM_map)
                                .tilejson(t)
                                .on(wax.tooltip()
                                    .parent(self.MM_map.parent)
                                    .events()
                                );
                            break;
                        case 'movetips':
                            self.MM_map.interaction = wax.mm.interaction()
                                .map(self.MM_map)
                                .tilejson(t)
                                .on(wax.movetip()
                                    .parent(self.MM_map.parent)
                                    .events()
                                );
                            break;
                    }
                }
                if (callback && typeof(callback) == 'function') callback();
            });
            return self.MM_map;
        },
        
		loadMap: function(){
            
            mainMap = this.Map('mymap', {
                // Specify the MapBox API url
                api: 'http://api.tiles.mapbox.com/v3/mapbox.mapbox-streets.jsonp',
                center: {
                    lat: -34.5767,      // Intial center point and zoom level.
                    lon: -58.437,       // To find coordinates and zoom levels
                    zoom: 12            // try: http://www.getlatlon.com or http://freegeoip.net/json/201.250.58.50
                },
                zoomRange: [0, 20],     // Limit zooming on the map to these levels
                features: [             // Map features (see readme.md)
                    'zoomwheel',
                    'movetips',
                    'zoombox',
                    'zoompan'
                ]
            });

		},
        setOverlay: function(el) {
            var self = this;
            
            var $this = el,
                db = $this.attr('DBName')
                id = $this.attr('href'),
            
            id = id.replace(/.*(?=#[^\s]+$)/, '').slice(1);

            var url = _.template(self.layerURL, {dbname: db, table: id});
            self.tilejson.tiles = [url + '.png'];
            self.tilejson.grids = [url + '.grid.json'];
            
            var testMap = new wax.mm.connector(self.tilejson);
            try {
                self.MM_map.setLayerAt(0, new wax.mm.connector(self.tilejson));
            } catch (e) {
                self.MM_map.insertLayerAt(0, new wax.mm.connector(self.tilejson));
            }
            self.setStyle(el);

        },
        setStyle:function(el) {
            var self = this;
            
            var $this = el,
                db = $this.attr('DBName')
                id = $this.attr('href'),
            
            id = id.replace(/.*(?=#[^\s]+$)/, '').slice(1);

            var url = _.template(self.baseStyleURL, {dbname: db, table: id});
            var style = "{style: #" + id + "{line-color:#FF6600; line-width:1; line-opacity: 0.7;}}";
            
            $.ajax({ url: url + "/style?" + style, async: true, method:post }).then(function(data) {
                
            });         
        
        },
        
        handleLayerEvent: function() {
            var self = this;
            
            $('body').on('click.map', '[data-control="layer"]', function(e) {
                self.setOverlay($(this));

            });
            
        }

	};
});