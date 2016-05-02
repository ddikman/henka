var CronJob = require('cron').CronJob;
var CronCalc = require('cron-calc');
var Engine = require('./engine.js');
var Settings = require('./settings.js');
var log = require('./log.js').forFile(__filename);

var cronCalc = new CronCalc();

var settings = new Settings();
settings.load('settings.yml');

log.info('starting cron job with interval: ' + settings.interval);
var cron = cronCalc.createCron(settings.interval);
var nextPoll = cronCalc.findFirst(cron, new Date());
log.info('next poll will execute at ' + nextPoll);

var engine = new Engine(settings);

new CronJob(settings.interval, function() {

  log.debug("running poll");
  engine.turn();

}, null, true);
