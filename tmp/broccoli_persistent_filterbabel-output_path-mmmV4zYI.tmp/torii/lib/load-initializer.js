define('torii/lib/load-initializer', ['exports'], function (exports) {
  /* global Ember */
  'use strict';

  exports['default'] = function (initializer) {
    Ember.onLoad('Ember.Application', function (Application) {
      Application.initializer(initializer);
    });
  };
});