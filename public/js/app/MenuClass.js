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
        
        loadSection = function() {
            var self = this;
            $.get('getMenu', function (res) {
                self.menuItems = res.data;
                self.loadMenuItems();
            });
        },
        
        loadMenuItems = function() {
            
        };
		
    return {
        loadSection: loadSection,
		loadContent: loadContent,
		saveContent: saveContent
    };		

}();