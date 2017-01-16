define('torii/providers/oauth1', ['exports', 'torii/providers/base', 'torii/configuration', 'torii/lib/query-string', 'torii/lib/required-property'], function (exports, _toriiProvidersBase, _toriiConfiguration, _toriiLibQueryString, _toriiLibRequiredProperty) {
  /*
   * This class implements authentication against an API
   * using the OAuth1.0a request token flow in a popup window.
   */

  'use strict';

  var Oauth1 = _toriiProvidersBase['default'].extend({
    name: 'oauth1',

    requestTokenUri: (0, _toriiConfiguration.configurable)('requestTokenUri'),

    buildRequestTokenUrl: function buildRequestTokenUrl() {
      return this.get('requestTokenUri');
    },

    open: function open(options) {
      var name = this.get('name'),
          url = this.buildRequestTokenUrl();

      return this.get('popup').open(url, ['code'], options).then(function (authData) {
        authData.provider = name;
        return authData;
      });
    }
  });

  exports['default'] = Oauth1;
});