define([
    // Global application context.
    "app",
    "backbone",
    "modules/leftmenu"
],

    function(app, Backbone, LeftMenu) {

        var UserSource = app.module();

        UserSource.Collection = Backbone.Collection.extend({
            url: function() {
                return "/mytables";
            },

            cache: true,

            parse: function(obj) {
                if (!obj.error) {
                    return obj.data;
                }
                return this.models;
            },

            initialize: function(models, options) {
                this.fetch();
            }
        });

        UserSource.Views.Item = Backbone.View.extend({
            template: "usersource/item",
            tagName: "li",

            serialize: function() {
                return {
                    model: this.model
                };
            }
        });

        UserSource.Views.List = Backbone.View.extend({
            template: "usersource/listSources",
            tagName: "ul",
            className: "nav nav-list scrollbar fff",

            beforeRender: function() {
                this.$el.children().remove();
                this.collection.each(function(source) {
                    this.insertView(new UserSource.Views.Item({
                        model: source
                    }));
                }, this);
            },

            cleanup: function() {
                this.collection.off(null, null, this);
            },

            initialize: function() {
                this.collection.on("reset", this.render, this);
            }
        });

        return UserSource;

    });
