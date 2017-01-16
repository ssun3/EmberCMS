define('torii/load-initializers', ['exports', 'torii/lib/load-initializer', 'torii/lib/load-instance-initializer', 'torii/initializers/initialize-torii', 'torii/initializers/initialize-torii-callback', 'torii/initializers/initialize-torii-session', 'torii/instance-initializers/setup-routes', 'torii/instance-initializers/walk-providers'], function (exports, _toriiLibLoadInitializer, _toriiLibLoadInstanceInitializer, _toriiInitializersInitializeTorii, _toriiInitializersInitializeToriiCallback, _toriiInitializersInitializeToriiSession, _toriiInstanceInitializersSetupRoutes, _toriiInstanceInitializersWalkProviders) {
  'use strict';

  exports['default'] = function () {
    (0, _toriiLibLoadInitializer['default'])(_toriiInitializersInitializeToriiCallback['default']);
    (0, _toriiLibLoadInitializer['default'])(_toriiInitializersInitializeTorii['default']);
    (0, _toriiLibLoadInitializer['default'])(_toriiInitializersInitializeToriiSession['default']);
    (0, _toriiLibLoadInstanceInitializer['default'])(_toriiInstanceInitializersWalkProviders['default']);
    (0, _toriiLibLoadInstanceInitializer['default'])(_toriiInstanceInitializersSetupRoutes['default']);
  };
});