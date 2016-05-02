var assert = require('chai');
var expect = assert.expect;

var Settings = require('../settings.js');

describe('Settings', function() {

  beforeEach(function() {
    this.settings = new Settings();
  });

  it('loads settings yaml', function() {
    this.settings.load('test/test.settings.yml');
    expect(this.settings.interval).to.equal('*/10 * * * * *');
  });

});
