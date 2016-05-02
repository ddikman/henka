var assert = require('chai');
var tmp = require('temporary');
var expect = assert.expect;

var EventStore = require('../eventStore.js');

describe('EventStore', function() {

  beforeEach(function() {
    this.tempDir = tmp.Dir('test');
    this.eventStore = new EventStore(this.tempDir.path);
  });

  afterEach(function() {
    if(this.tempDir)
      this.tempDir.rmdir();
  });

  it('can read events stored in another instance of the class', function() {
    var expectedEvent = { integers: 22, string: 'str' };
    this.eventStore.store('mockEvent', expectedEvent);

    var allEvents = this.eventStore.readEvents();
    expect(allEvents.length).to.eq(1);

    var actualEvent = allEvents[0];
    expect(actualEvent.type).to.eq('mockEvent');
    expect(actualEvent.data.integers).to.eq(expectedEvent.integers);
    expect(actualEvent.data.string).to.eq(expectedEvent.string);
  });

  it('can read events that has just been stored', function() {
    var expectedEvent = { integers: 22, string: 'str' };
    this.eventStore.store('mockEvent', expectedEvent);

    this.eventStore = new EventStore(this.tempDir.path);
    var allEvents = this.eventStore.readEvents();
    expect(allEvents.length).to.eq(1);

    var actualEvent = allEvents[0];
    expect(actualEvent.type).to.eq('mockEvent');
    expect(actualEvent.data.integers).to.eq(expectedEvent.integers);
    expect(actualEvent.data.string).to.eq(expectedEvent.string);
  });

});
