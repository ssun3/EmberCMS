define('aileen/initializers/initialize-torii-callback', ['exports', 'torii/redirect-handler'], function (exports, _toriiRedirectHandler) {
  exports['default'] = {
    name: 'torii-callback',
    before: 'torii',
    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      application.deferReadiness();
      _toriiRedirectHandler['default'].handle(window)['catch'](function () {
        application.advanceReadiness();
      });
    }
  };
});