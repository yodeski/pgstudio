var MapClass = function (id) {
    this.ID = id;
    this.KEY = 'BC9A493B41014CAABB98F0471D759707';
};

MapClass.prototype = function() {
	
	var Map = null,
        Composition = null,
		Layers = null,
		baseUrl = 'http://{s}.tile.cloudmade.com/{key}/31371/256/{z}/{x}/{y}.png',
		cgiUrl = 'http://localhost/cgi-bin/mapserv?',
        mapDir = '',
        currentTable = '',
		dbname = '',
		
        initBaseMap = function(url){
            var self = this;
            $.get('getMapsDirectory', function (res) {
                self.mapDir = res;
            });
            
            this.Map = L.map(this.ID).setView([-34.5767, -58.437], 13);
            var tileLayer = new L.TileLayer(url, {
                attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2012 CloudMade',
                key: self.KEY
            });
          
            self.Map.addLayer(tileLayer);

    	},

		setCurrentTable = function (el) {
            var id = el.attr('href');
            currentTable = id.replace(/.*(?=#[^\s]+$)/, '').slice(1);
			dbname = el.attr('DBName');
		},
		
		getCurrentTable = function () {
            return currentTable;
		},
        
        refreshMap = function() {
            this.Map._resetView(this.Map.getCenter(), this.Map.getZoom(), true);   
        },
        
        reloadMap = function(tablename) {
            this.Map.removeLayer(this.Layers[tablename]);
            var layer = this.getTileFromMS(tablename);
            this.Map.addLayer(layer);
        },
        
        getTileFromMS = function(tablename){
            var urlTemplate = cgiUrl;
            urlTemplate += 'map=' + this.mapDir + this.dbname + '.map&';
            urlTemplate += 'layers=' + tablename || this.currentTable + '&';
            urlTemplate += 'mode=tile&';
            urlTemplate += 'tilemode=gmap&';
            urlTemplate += 'tile={x}+{y}+{z}';
            
            var layer = new L.TileLayer(urlTemplate, {
                transparent: true,
                attribution: "PGSTUDIO"
            });
            return layer;
        },
        
        handleLayerEvent: function() {
            var self = this;
            $('body').on('click.map', '[data-control="layer"]', function(e) {
                self.setCurrentTable($(this));
                self.reloadMap();
                self.getMapFile($(this));
                //self.setOverlay($(this), self.Map.getBounds());
            });   
        },         
        

}();