define(
[
    "app",
    // Libs
    "backbone"
    // Modules
    // Plugins
],

    function(app, Backbone) {

        // Create a new module
        var Explorer = app.module();

        // This will fetch the tutorial template and render it.
        Explorer.Views.ExplorerView = Backbone.View.extend({
            template: "explorer"
        });

        return Explorer;

    }
);
