var EditorClass = function (id) {
    this.ID = id;

};

EditorClass.prototype = function() {
	
	var editor = ace.editor(this.ID),
    
		initEditor = function() {
			var self = this;
            editor.getSession().setMode("ace/mode/yalm");
            editor.setTheme("ace/theme/xcode");
            editor.resize();
			editor.commands.addCommand({
				name: 'saveMap',
				bindKey: {win: 'Ctrl-S',  mac: 'Command-S'},
				exec: function(editor) {
					var text = editor.getValue();
					self.saveContent(tablename, text);
				}
			});		
		
		},
		
		setEditorContent = function (content) {
            var editor = ace.edit("editor");
            editor.setValue(content);
            editor.gotoLine(1);		
		},
		
		getEditorContent = function () {
			var editor = ace.edit("editor");
            return editor.getValue();
		},
		
        loadContent = function(filename) {
            $.get('getMapFile', {mapfile: filename }, function (res) {               
                setEditorContent(res);              
            });
        },
		
        saveContent = function(filename, text) {
            var text = this.getEditorContent();
			$.get('saveMapFile', {mapfile: filename, content: text }, function (res) {
				return res;
            });
        };
		
    return {
        initEditor: initEditor,
		loadContent: loadContent,
		saveContent: saveContent
    };		

}();