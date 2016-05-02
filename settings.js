YAML = require('js-yaml');
fs = require('fs');

var settings = function() {
  this.load = function(filename) {
    var fileContents = fs.readFileSync(filename, 'utf8');
    var yaml = YAML.safeLoad(fileContents);
    this.interval = yaml.settings.interval;
  };
};

module.exports = settings;
