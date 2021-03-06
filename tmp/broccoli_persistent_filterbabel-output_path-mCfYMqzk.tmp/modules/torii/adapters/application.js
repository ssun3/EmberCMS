var ApplicationAdapter = Ember.Object.extend({

  open: function open() {
    return new Ember.RSVP.Promise(function () {
      throw new Error('The Torii adapter must implement `open` for a session to be opened');
    });
  },

  fetch: function fetch() {
    return new Ember.RSVP.Promise(function () {
      throw new Error('The Torii adapter must implement `fetch` for a session to be fetched');
    });
  },

  close: function close() {
    return new Ember.RSVP.Promise(function () {
      throw new Error('The Torii adapter must implement `close` for a session to be closed');
    });
  }

});

export default ApplicationAdapter;