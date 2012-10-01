var fs = require('fs');

exports.defineDAC = function defineDAC(app, callback) {
  
  fs.readdirSync(__dirname).forEach(function(file) {
    if (file == "index.js") {
      return;
    }
    var name = file.substr(0, file.indexOf('.'));
    require('./' + name)(app, callback);
  });

};
