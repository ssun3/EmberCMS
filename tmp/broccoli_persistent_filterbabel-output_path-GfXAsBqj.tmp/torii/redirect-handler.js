define("torii/redirect-handler", ["exports", "torii/lib/popup-id-serializer", "torii/mixins/ui-service-mixin", "torii/configuration"], function (exports, _toriiLibPopupIdSerializer, _toriiMixinsUiServiceMixin, _toriiConfiguration) {
  /**
   * RedirectHandler will attempt to find
   * these keys in the URL. If found,
   * this is an indication to Torii that
   * the Ember app has loaded inside a popup
   * and should postMessage this data to window.opener
   */

  "use strict";

  var RedirectHandler = Ember.Object.extend({

    run: function run() {
      var windowObject = this.windowObject;

      return new Ember.RSVP.Promise(function (resolve, reject) {
        var pendingRequestKey = windowObject.localStorage.getItem(_toriiMixinsUiServiceMixin.CURRENT_REQUEST_KEY);
        windowObject.localStorage.removeItem(_toriiMixinsUiServiceMixin.CURRENT_REQUEST_KEY);
        if (pendingRequestKey) {
          var url = windowObject.location.toString();
          windowObject.localStorage.setItem(pendingRequestKey, url);

          var remoteServiceName = _toriiConfiguration["default"].remoteServiceName || 'popup';
          if (remoteServiceName === 'popup') {
            // NOTE : If a single provider has been configured to use the 'iframe'
            // service, this next line will still be called. It will just fail silently.
            windowObject.close();
          }
        } else {
          reject('Not a torii popup');
        }
      });
    }

  });

  RedirectHandler.reopenClass({
    // untested
    handle: function handle(windowObject) {
      var handler = RedirectHandler.create({ windowObject: windowObject });
      return handler.run();
    }
  });

  exports["default"] = RedirectHandler;
});