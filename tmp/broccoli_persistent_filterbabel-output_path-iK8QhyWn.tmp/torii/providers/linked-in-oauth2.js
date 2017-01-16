define('torii/providers/linked-in-oauth2', ['exports', 'torii/providers/oauth2-code', 'torii/configuration'], function (exports, _toriiProvidersOauth2Code, _toriiConfiguration) {
  'use strict';

  /**
   * This class implements authentication against Linked In
   * using the OAuth2 authorization flow in a popup window.
   *
   * @class LinkedInOauth2
   */
  var LinkedInOauth2 = _toriiProvidersOauth2Code['default'].extend({
    name: 'linked-in-oauth2',
    baseUrl: 'https://www.linkedin.com/uas/oauth2/authorization',

    responseParams: ['code', 'state'],

    redirectUri: (0, _toriiConfiguration.configurable)('redirectUri', function () {
      // A hack that allows redirectUri to be configurable
      // but default to the superclass
      return this._super();
    })

  });

  exports['default'] = LinkedInOauth2;
});