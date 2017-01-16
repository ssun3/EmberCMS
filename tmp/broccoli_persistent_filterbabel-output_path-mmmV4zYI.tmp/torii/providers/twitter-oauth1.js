define('torii/providers/twitter-oauth1', ['exports', 'torii/providers/oauth1'], function (exports, _toriiProvidersOauth1) {
  'use strict';

  exports['default'] = _toriiProvidersOauth1['default'].extend({
    name: 'twitter'
  });
});