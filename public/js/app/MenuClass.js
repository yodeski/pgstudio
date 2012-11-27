var MenuClass = function (id, container) {
    this.ID = "#" + id;
    this.Container = "#" + container;
    this.enumDBType = { table: "mytables", view: "myviews", sproc: "myfunctions", shares: "myshares" };
};

MenuClass.prototype = function() { 
    
    var menuItems = null,
        tableList = null,
        viewList = null,
        funcList = null,
        shareList = null,
        
        loadObjectLists = function(ref) {
            var self = this;
            $.ajax({ url: "/" + ref, async: false }).then(function(data) {
                switch(ref) {
                    case self.enumDBType.table: self.tableList.data = data.objectList; break;
                    case self.enumDBType.view: self.viewList.data = data.objectList; break;
                    case self.enumDBType.sproc: self.funcList.data = data.objectList; break;
                    case self.enumDBType.shares: self.shareList.data = data.objectList; break;
                }
            });         
        },        
        
        loadSection = function() {
    		var self = this;
            if(this.menuItems.length>0) {
                _.forEach(this.menuItems, function(item) {
                    var relpop = (item.inControl=='popover') ? 'popover' : '';
                    var href = (item.inControl=='popover') ? '#' : item.ref;
                    var $_li = $('<li id="itm_' + 
                                                item.itemname + '" class="pointer" style="line-height:30px; color:' + 
                                                item.color + '"><a idData="' + item.id + '" rel="' + relpop + '" href="#' + 
                                                href + '" class="text-shadow nolink" style="color:' + item.color + '"><i class="' + 
                                                item.icon + ' icon-large text-shadow"></i>  <small style="font-size:12px;">' + 
                                                item.text + '</small></a></li>');

                    if(item.inControl=='popover')
                    	self.initPopOver($_li, item);
                    $(self.ID).append($_li);
				});
			}
        },
        
        loadMenuItems = function() {
            var self = this;
            $.get('getMenu', function (res) {
                self.menuItems = res.data;
                self.loadSection();
            });            
        };
		
    return {
        loadSection: loadSection
    };		

}();