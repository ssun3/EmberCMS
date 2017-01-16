define('torii/lib/load-instance-initializer', ['exports'], function (exports) {
  /* global Ember */
  'use strict';

  exports['default'] = function (instanceInitializer) {
    Ember.onLoad('Ember.Application', function (Application) {
      Application.instanceInitializer(instanceInitializer);
    });
  };
});