define('torii/providers/google-oauth2-bearer', ['exports', 'torii/providers/oauth2-bearer', 'torii/configuration'], function (exports, _toriiProvidersOauth2Bearer, _toriiConfiguration) {
  /**
   * This class implements authentication against google
   * using the client-side OAuth2 authorization flow in a popup window.
   */

  'use strict';

  var GoogleOauth2Bearer = _toriiProvidersOauth2Bearer['default'].extend({

    name: 'google-oauth2-bearer',
    baseUrl: 'https://accounts.google.com/o/oauth2/auth',

    // additional params that this provider requires
    optionalUrlParams: ['scope', 'request_visible_actions'],

    requestVisibleActions: (0, _toriiConfiguration.configurable)('requestVisibleActions', ''),

    responseParams: ['access_token'],

    scope: (0, _toriiConfiguration.configurable)('scope', 'email'),

    redirectUri: (0, _toriiConfiguration.configurable)('redirectUri', 'http://localhost:4200/oauth2callback')
  });

  exports['default'] = GoogleOauth2Bearer;
});