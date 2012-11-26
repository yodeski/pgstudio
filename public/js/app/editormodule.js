app.register("editor-module", function(sandbox){
    /*
    * @constructor
	*/
    return {
        
		init: function(){
			this.moduleId = "editor";
			this.el = sandbox.getElement({ selector:"#" + this.moduleId });

            this.loadEditor();

		},
        loadEditor: function(){
            var self = this;
            $("#rightSidebarContainer").append(sandbox.fetchTemplate(sandbox.getTemplatesPath('editor'), []));
		}

	};
});