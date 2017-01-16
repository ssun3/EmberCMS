define('torii/bootstrap/session', ['exports', 'torii/services/torii-session'], function (exports, _toriiServicesToriiSession) {
  'use strict';

  exports['default'] = function (application, sessionName) {
    var sessionFactoryName = 'service:' + sessionName;
    application.register(sessionFactoryName, _toriiServicesToriiSession['default']);
    application.inject(sessionFactoryName, 'torii', 'service:torii');
    application.inject('route', sessionName, sessionFactoryName);
    application.inject('controller', sessionName, sessionFactoryName);
  };
});