var fs = require('fs');

module.exports = function(site) {
  /** Load all the routes in ./routes .*/
  fs.readdirSync(__dirname).forEach(function(file) {
    if (file == "index.js") {
      return;
    }
    var name = file.substr(0, file.indexOf('.'));
    require('./' + name)(site);
  });

  /** Redirect everything else back to default if logged in. */
  site.get('*', function(req, res) {
    res.render('errors/404', {
      status: 404
    });
  });

};