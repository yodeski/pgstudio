define([
    // Global application context.
    "app",
    // Libs
    "backbone"
],

    function(app, Backbone, Commit) {

        var Header = app.module();

        Header.Collection = Backbone.Collection.extend({
            cache: true,

            initialize: function(models, options) {

            }

        });

        Header.Views.HeaderView = Backbone.View.extend({
            template: "header/header",

            serialize: function() {
                return { model: this.model };
            },

            beforeRender: function() {
                if (app.active === this.model) {
                    this.$el.siblings().removeClass("active");
                    this.$el.addClass("active");
                }
            }
        });

        return Header;

    });
