var fs = require("fs");

var express = require("express");
var site = module.exports = express();

var config = site.config = require('./config');
site.use(express.static(__dirname + '/public'));

site.use(express.favicon(__dirname + '/favicon.ico'));

site.use(express.cookieParser());
site.use(express.session({
        secret: config.secret
    })
);

site.use(site.router);
require('./server/routes')(site);


site.listen(config.port, config.host);

console.log("Server listening on " + config.host + ":" + config.host);