app.register("map-module", function(sandbox){
    /*
    * @constructor
	*/
    return {

		objSource: {}, //objeto tabla/view
        
		init: function(){
			this.moduleId = "MyMap";
			this.el = sandbox.getElement({ selector:"#" + this.moduleId });
            this.Map = {};
            this.theLayers = [];
            this.baseUrl = 'http://{s}.tile.cloudmade.com/{key}/31371/256/{z}/{x}/{y}.png';
            this.MapDir = "";
            this.handleLayerEvent();
            this.loadMap(this.baseUrl);

		},
        
        handleLayerEvent: function() {
            var self = this;
            
            $('body').on('click.map', '[data-control="layer"]', function(e) {
                self.setMSTileOverlay($(this));
                self.getMapFile($(this));
                //self.setOverlay($(this), self.Map.getBounds());
            });   
        },        
        turnOnOffLayer: function(el) {        
           var self = this;
           
           var $this = el,
                id = $this.attr('href');
            
            var tablename = id.replace(/.*(?=#[^\s]+$)/, '').slice(1);
                
            var $swith = $this.find('span');
            var state = $swith.attr('state');
            if(state==='on') {
                if (self.theLayers[tablename] != undefined) {
                    self.Map.removeLayer(self.theLayers[tablename]);
                };
                $swith.attr('state', 'off');
                $swith.removeClass('text-light');
                $swith.parent().addClass('text-grayed');
                return false;
            }
            else {
                $swith.attr('state', 'on');
                $swith.addClass('text-light');
                $swith.parent().removeClass('text-grayed');
                return true;
            }
            
        },

        loadMap: function(url){
            var self = this;
            $.get('getMapsDirectory', function (res) {
                self.MapDir = res;
            });
            
            self.Map = L.map('mymap').setView([-34.5767, -58.437], 13);
            var tileLayer = new L.TileLayer(url, {
                attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2012 CloudMade',
                key: 'BC9A493B41014CAABB98F0471D759707'
            });
          
            self.Map.addLayer(tileLayer);

		},
        setMSTileOverlay: function(el) {
            var self = this;
            
            var turnOn = self.turnOnOffLayer(el);
            if(turnOn) {
                var $this = el,
                    db = $this.attr('DBName'),
                    id = $this.attr('href');
                
                var tablename = id.replace(/.*(?=#[^\s]+$)/, '').slice(1);
                var urlTemplate = 'http://localhost/cgi-bin/mapserv?';
                urlTemplate += 'map=' + self.MapDir + db + '.map&';
                urlTemplate += 'layers=' + tablename + '&';
                urlTemplate += 'mode=tile&';
                urlTemplate += 'tilemode=gmap&';
                urlTemplate += 'tile={x}+{y}+{z}';
                
                var layer = new L.TileLayer(urlTemplate, {
                    transparent: true,
                    attribution: "FOSM"
                });
                self.theLayers[tablename] = layer;
                self.Map.addLayer(layer);
            }
        },
        getMapFile: function(el) {
            var self = this;
            var $this = el,
                db = $this.attr('DBName'),
                id = $this.attr('href');
            
            var tablename = id.replace(/.*(?=#[^\s]+$)/, '').slice(1);
             
            $.get('getMapFile', {mapfile: tablename }, function (res) {
                var editor = ace.edit("editor");
                editor.commands.addCommand({
                    name: 'saveMap',
                    bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
                    exec: function(editor) {
                        var text = editor.getValue();
                        self.saveMapFile(tablename, text);
                    }
                });                
                self.setEditorContent(res);              
            }); 
        
        },
        saveMapFile: function(filename,text) {
            $.get('saveMapFile', {mapfile: filename, content: text }, function (res) {
                
            });
        },
        setEditorContent: function(content) {
            var editor = ace.edit("editor");
            editor.setValue(content);
            editor.gotoLine(1);               
        },
        setOverlay: function(el, bounds) {
            var self = this;
            
            var $this = el,
                db = $this.attr('DBName'),
                id = $this.attr('href');
            
            var tablename = id.replace(/.*(?=#[^\s]+$)/, '').slice(1);
            var fieldname = 'gid';
            var boundbox = new L.LatLngBounds(bounds._southWest, bounds._northEast);
            var bbBox = {
                _sWLat: boundbox.getSouthWest().lat,
                _sWLon: boundbox.getSouthWest().lng,
                _nELat: boundbox.getNorthEast().lat,
                _nELon: boundbox.getNorthEast().lng
            };
                    
            $.getJSON(
                '/getGeoJson',
                {_bbBox: bbBox, _tablename: tablename, _fieldname: fieldname},
                function (res) {
                    self.parseLayerResponse(tablename, res)
                });
            //self.setStyle(el);

        },
        parseLayerResponse:function(layername, features) {
            var self = this;
            if (self.theLayers[layername] != undefined) {
                self.Map.removeLayer(self.theLayers[layername]);
            };
            var myStyle = {
                "color": "#ff7800",
                "strokeColor": "#0d0",
                "stroke-width":"1",
                "weight": 1,
                "opacity": 0.95
            };
            self.theLayers[layername] = L.geoJson(features.features, {
                style: myStyle
            }).addTo(self.Map);
            /*self.theLayers[layername] = new L.GeoJSON();
            self.theLayers[layername].on('featureparse', function(e) {
                e.layer.setStyle({ color:  '#003300', weight: 2, fill: true, fillColor: '#009933' });
            });
            self.theLayers[layername].addData(features);
            self.Map.addLayer(self.theLayers[layername]);*/
        }

	};
});