define([
    // Global application context.
    "app",
    "backbone",
    "bootstrap",
    "modules/usersources"
],

    function(app, Backbone, Bootstrap, UserSource) {

        var LeftMenu = app.module({
            objectList: []
        });

        LeftMenu.Collection = Backbone.Collection.extend({
            url: function() {
                return "/getMenu";
            },

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

        LeftMenu.Views.Item = Backbone.View.extend({
            template: "leftmenu/item",
            tagName: "li",
            className:"pointer clBlack lnh30",

            serialize: function() {

                return { model: this.model };
            },

            events: {
                click: "showPopOver"
            },

            initPopOver: function() {
                var item = this.model;
                this.$el.clickover({
                    tip_id: item.get('itemname'),
                    html: true,
                    title: item.get('text'),
                    trigger:'click',
                    placement:'belowRight',
                    allow_multiple:true,
                    global_close: false,
                    content: '',//this.getContent(model.objectList).render(),
                    //onShown: function() { self.setToolsToPopOver(model, elem) },
                    //onHide: function() { $('ul#leftMenu li').removeClass('active') }
                });
                //this.getContent().render();
                //this.$el.clickover('show');
                //alert(this.model.get('objectList'));
            },
            
            showPopOver: function(ev) {
                this.$el.siblings().removeClass("active");
                this.$el.addClass("active");
                this.$el.clickover('show');
            },

            beforeRender: function() {
                var url = this.model.get('ref');
                var model = this.model;
                //$.get(url, function(d) { model.set('objectList', d.objectList);});

            },
            afterRender:function() {
                this.initPopOver();
            },
            getContent: function(sources) {
                var objectList = new UserSource.Collection();
                var cntview = new UserSource.Views.List({
                    el: ".popover-content",
                    collection: objectList
                });
            }
        });

        LeftMenu.Views.List = Backbone.View.extend({
            template: "leftmenu/list",

            itemName: "leftMenu",
            className: "nav nav-list",

            serialize: function() {
                return {
                    count: this.collection.length
                };
            },

            beforeRender: function() {
                this.collection.each(function(leftmenu) {
                    this.insertView("ul", new LeftMenu.Views.Item({
                        model: leftmenu
                    }));
                }, this);

            },

            cleanup: function() {
                this.collection.off(null, null, this);
            },

            initialize: function() {
                this.collection.on("reset", this.render, this);
                this.collection.on("fetch", function() {

                }, this);
            }


        });

        return LeftMenu;

    });
