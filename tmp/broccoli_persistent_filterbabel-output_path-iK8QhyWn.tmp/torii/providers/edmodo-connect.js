define('torii/providers/edmodo-connect', ['exports', 'torii/providers/oauth2-bearer', 'torii/configuration'], function (exports, _toriiProvidersOauth2Bearer, _toriiConfiguration) {
  'use strict';

  /*
  * This class implements authentication against Edmodo
  * with the token flow. For more information see
  * https://developers.edmodo.com/edmodo-connect/docs/#connecting-your-application
  * */
  exports['default'] = _toriiProvidersOauth2Bearer['default'].extend({
    name: 'edmodo-connect',
    baseUrl: 'https://api.edmodo.com/oauth/authorize',
    responseParams: ['access_token'],

    /* Configurable parameters */
    redirectUri: (0, _toriiConfiguration.configurable)('redirectUri'),
    // See https://developers.edmodo.com/edmodo-connect/docs/#connecting-your-application for the full list of scopes
    scope: (0, _toriiConfiguration.configurable)('scope', 'basic')
  });
});