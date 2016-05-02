var request = require('sync-request');
var cheerio = require('cheerio');
var log = require('./log.js').forFile(__filename);

var retriever = function(sites) {

  if(sites === null || sites === undefined)
    throw new Exception("No sites given!");

  this.sites = sites;

  this.getState = function() {
    return this.sites.map(this.examineSite, this);
  };

  this.examineSite = function(site) {
    var result = {
      name: site.name,
      url: site.url,
      passed: true,
      failed: false,
      failure: null
    };
    try {
      log.debug('getting state for ' + site.name + ' from: ' + site.url);
      var html = this.getSite(site.url);
      var dom = cheerio.load(html);
      var element = dom(site.examine);
      result.contents = element.text();
      log.debug('detected state for %s', site.name);
    }
    catch(err){
      result.failed = true;
      result.passed = false;
      result.failure = err;
      log.error('failed to detect state for %s: %s', site.name, err);
    }

    return result;
  };

  this.getSite = function(url) {
    return request('GET', url).getBody();
  };

};

module.exports = retriever;
