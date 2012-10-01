define([
    // Global application context.
    "app",
    "backbone",
    "bootstrap",
    "modules/usersources"
],

    function(app, Backbone, Bootstrap, UserSource) {

        var LeftMenu = app.module({
            //objectList: []
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
                click: "initPopOver"
            },

            initPopOver: function() {
                var item = this.model;
                this.$el.siblings().removeClass("active");
                this.$el.addClass("active");

                //this.$el.clickover('show');
                //alert(this.model.get('objectList'));
            },
            /*initPopOver: function() {
                var item = this.model;
                $.get(item.get('ref'), function(d) {
                    //$(d).find('.scrollbar').scrollbar();
                    this.$el.clickover({
                        tip_id: item.get('itemname'),
                        html: true,
                        title: item.get('text'),
                        trigger:'click',
                        placement:'belowRight',
                        allow_multiple:false,
                        global_close: false,
                        content: d
                        //onShown: function() { self.setToolsToPopOver(model, elem) },
                        //onHide: function() { $('ul#leftMenu li').removeClass('active') }
                    });
                    el.clickover('show');
                    //$('.scrollbar').scrollbar();
                });
            },*/
            showPopOver: function(ev) {

            },

            beforeRender: function() {
                var url = this.model.get('ref');
                var model = this.model;

                //$.get(url, function(d) { model.set('objectList', d.objectList);});

            },
            afterRender:function() {
                this.$el.siblings().removeClass("active");
                var model = this.model;
                var child_view = UserSource.Views;

                this.$el.clickover({
                    tip_id: model.get('itemname'),
                    html: true,
                    title: model.get('text'),
                    trigger:'click',
                    placement:'belowRight',
                    allow_multiple:false,
                    global_close: false,
                    content: this.getContent(model.objectList),
                    show: true
                    //onShown: function() { self.setToolsToPopOver(model, elem) },
                    //onHide: function() { $('ul#leftMenu li').removeClass('active') }
                });

            },
            getContent: function(sources) {
                var objectList = new UserSource.Collection();
                var cntview = new UserSource.Views.List({
                    collection: objectList
                });
                return cntview;
                /*this.insertView("ul", ).$el;*/
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
