import UUIDGenerator from 'torii/lib/uuid-generator';
import PopupIdSerializer from 'torii/lib/popup-id-serializer';
import ParseQueryString from 'torii/lib/parse-query-string';
var CURRENT_REQUEST_KEY = '__torii_request';

export { CURRENT_REQUEST_KEY };
var on = Ember.on;

function parseMessage(url, keys) {
  var parser = ParseQueryString.create({ url: url, keys: keys });
  var data = parser.parse();
  return data;
}

var ServicesMixin = Ember.Mixin.create({

  init: function init() {
    this._super.apply(this, arguments);
    this.remoteIdGenerator = this.remoteIdGenerator || UUIDGenerator;
  },

  // Open a remote window. Returns a promise that resolves or rejects
  // accoring to if the iframe is redirected with arguments in the URL.
  //
  // For example, an OAuth2 request:
  //
  // iframe.open('http://some-oauth.com', ['code']).then(function(data){
  //   // resolves with data.code, as from http://app.com?code=13124
  // });
  //
  // Services that use this mixin should implement openRemote
  //
  open: function open(url, keys, options) {
    var service = this,
        lastRemote = this.remote;

    return new Ember.RSVP.Promise(function (resolve, reject) {
      if (lastRemote) {
        service.close();
      }

      var remoteId = service.remoteIdGenerator.generate();

      var pendingRequestKey = PopupIdSerializer.serialize(remoteId);
      localStorage.setItem(CURRENT_REQUEST_KEY, pendingRequestKey);

      service.openRemote(url, pendingRequestKey, options);
      service.schedulePolling();

      var onbeforeunload = window.onbeforeunload;
      window.onbeforeunload = function () {
        if (typeof onbeforeunload === 'function') {
          onbeforeunload();
        }
        service.close();
      };

      if (service.remote && !service.remote.closed) {
        service.remote.focus();
      } else {
        reject(new Error('remote could not open or was closed'));
        return;
      }

      service.one('didClose', function () {
        var pendingRequestKey = localStorage.getItem(CURRENT_REQUEST_KEY);
        if (pendingRequestKey) {
          localStorage.removeItem(pendingRequestKey);
          localStorage.removeItem(CURRENT_REQUEST_KEY);
        }
        // If we don't receive a message before the timeout, we fail. Normally,
        // the message will be received and the window will close immediately.
        service.timeout = Ember.run.later(service, function () {
          reject(new Error("remote was closed, authorization was denied, or a authentication message otherwise not received before the window closed."));
        }, 100);
      });

      Ember.$(window).on('storage.torii', function (event) {
        var storageEvent = event.originalEvent;

        var remoteIdFromEvent = PopupIdSerializer.deserialize(storageEvent.key);
        if (remoteId === remoteIdFromEvent) {
          var data = parseMessage(storageEvent.newValue, keys);
          localStorage.removeItem(storageEvent.key);
          Ember.run(function () {
            resolve(data);
          });
        }
      });
    })['finally'](function () {
      // didClose will reject this same promise, but it has already resolved.
      service.close();

      Ember.$(window).off('storage.torii');
    });
  },

  close: function close() {
    if (this.remote) {
      this.closeRemote();
      this.remote = null;
      this.trigger('didClose');
    }
    this.cleanUp();
  },

  cleanUp: function cleanUp() {
    this.clearTimeout();
  },

  schedulePolling: function schedulePolling() {
    this.polling = Ember.run.later(this, function () {
      this.pollRemote();
      this.schedulePolling();
    }, 35);
  },

  // Clear the timeout, in case it hasn't fired.
  clearTimeout: function clearTimeout() {
    Ember.run.cancel(this.timeout);
    this.timeout = null;
  },

  stopPolling: on('didClose', function () {
    Ember.run.cancel(this.polling);
  })

});

export default ServicesMixin;