var log = require('./log.js').forFile(__filename);
var path = require('path');
var fs = require('fs');

var eventStore = function(storagePath) {

  this.eventsFilePath = path.join(fs.storagePath, 'events.json');
  this.events = [];

  this.readEvents = function() {
    var contents = fs.readFileSync(this.eventsFilePath, { encoding: 'utf8' });
    return JSON.parse('[' + contents + ']');
  };

  this.writeEvent = function(type, data, first_event)
  {
    if(!first_event)
      this.stream.write(",\r\n");

    var event = {
      type: type,
      data: data,
      timestamp: new Date()
    };

    this.stream.write(JSON.prettify(event));
  };

  this.prepareFile = function(targetPath) {
    if (fs.fStatSync(targetPath).isFile())
    {
      this.stream = fs.createWriteStream(targetPath, { flags: 'r+' });
      return;
    }

    this.stream = fs.createWriteStream(this.eventsFilePath, { flags: 'w' });
    this.writeEvent('stream_started', {}, true);
  };

  this.store = function(type, data){
    this.writeEvent(type, data, false);
  };

  this.getEvents = function(){
    return this.events;
  };

  prepareFile(this.eventsFilePath);

};

module.exports = eventStore;
