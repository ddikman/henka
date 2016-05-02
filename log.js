var npmlog = require('npmlog');
var path = require('path');

var Log = function (context) {

  this.context = context;

  this.debug = function(msg) {
    npmlog.verbose.apply(this, this.getArgs.apply(this, arguments));
  };

  this.info = function(msg) {
    npmlog.info.apply(this, this.getArgs.apply(this, arguments));
  };

  this.warn = function(msg) {
    npmlog.warn.apply(this, this.getArgs.apply(this, arguments));
  };

  this.error = function() {
    npmlog.error.apply(this, this.getArgs.apply(this, arguments));
  };

  this.getArgs = function(){
    var args = [];
    args.push(this.context);
    for(i = 0; i < arguments.length; ++i)
      args.push(arguments[i]);

    return args;
  };

};

// Creates a new logger prefixed with the given context
Log.prototype.forContext = function(contextName){
  return new Log(contextName);
};

// Creates a new logger prefixed with the given filename
Log.prototype.forFile = function(filename){
  return new Log(path.basename(filename));
};

module.exports = new Log('general');
