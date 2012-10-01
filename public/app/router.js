define([
    // Application.
    "app",

    // Modules.
    "modules/header",
    "modules/leftmenu",
    "modules/usersources",
    "modules/repo",
    "modules/user",
    "modules/commit"
],

    function(app, Header, LeftMenu, UserSource, Repo, User, Commit) {

        // Defining the application router, you can attach sub routers here.
        var Router = Backbone.Router.extend({
            routes: {
                "": "index",
                "org/:name": "org",
                "org/:org/user/:name": "user",
                "org/:org/user/:user/repo/:name": "repo"
            },

            index: function() {
                this.reset();

                // Use the main layout.
                app.useLayout("main").render();
            },

            org: function(name) {
                // Reset to initial state.
                this.reset();

                // Use the main layout.
                app.useLayout("main").render();

                // Set the organization.
                this.users.org = name;

                // Fetch the data.
                this.users.fetch();
            },

            user: function(org, name) {
                // Reset to initial state.
                this.reset();

                // Use the main layout.
                app.useLayout("main").render();

                // Set the organization.
                this.users.org = org;
                // Set the user name.
                this.repos.user = name;

                // Fetch the data
                this.users.fetch();
                this.repos.fetch();
            },

            repo: function(org, user, name) {
                // Reset to initial state.
                this.reset();

                // Use the main layout.
                app.useLayout("main").render();

                // Set the organization.
                this.users.org = org;
                // Set the user name.
                this.repos.user = user;
                // Set the repo name
                this.commits.user = user;
                this.commits.repo = name;

                // Fetch the data
                this.users.fetch();
                this.repos.fetch();
                this.commits.fetch();
            },

            // Shortcut for building a url.
            go: function() {
                return this.navigate(_.toArray(arguments).join("/"), true);
            },

            reset: function() {
                // Reset collections to initial state.
                if (this.users.length) {
                    this.users.reset();
                }

                if (this.repos.length) {
                    this.repos.reset();
                }

                if (this.commits.length) {
                    this.commits.reset();
                }

                // Reset active model.
                app.active = false;
                this.commits.repo = false;
            },

            initialize: function() {
                this.leftmenu = new LeftMenu.Collection();

                this.users = new LeftMenu.Collection();
                // Set up the users.
                this.users = new User.Collection();
                // Set the repos.
                this.repos = new Repo.Collection();
                // Set up the commits.
                this.commits = new Commit.Collection();

                // Use main layout and set Views.
                app.useLayout("main");

                app.layout.setViews({
                    "#headerContainer": new Header.Views.HeaderView({

                    }),
                    "#sidebarContainer": new LeftMenu.Views.List({
                        collection: this.leftmenu
                    }),
                    ".users": new User.Views.List({
                        collection: this.users
                    }),

                    ".repos": new Repo.Views.List({
                        collection: this.repos
                    }),

                    ".commits": new Commit.Views.List({
                        collection: this.commits
                    })
                });
            }
        });

        return Router;

    });