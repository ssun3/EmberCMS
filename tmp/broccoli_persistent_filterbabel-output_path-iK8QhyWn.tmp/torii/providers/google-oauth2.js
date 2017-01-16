define('torii/providers/google-oauth2', ['exports', 'torii/providers/oauth2-code', 'torii/configuration'], function (exports, _toriiProvidersOauth2Code, _toriiConfiguration) {
  /**
   * This class implements authentication against google
   * using the OAuth2 authorization flow in a popup window.
   */

  'use strict';

  var GoogleOauth2 = _toriiProvidersOauth2Code['default'].extend({

    name: 'google-oauth2',
    baseUrl: 'https://accounts.google.com/o/oauth2/auth',

    // additional params that this provider requires
    optionalUrlParams: ['scope', 'request_visible_actions', 'access_type', 'approval_prompt', 'hd'],

    requestVisibleActions: (0, _toriiConfiguration.configurable)('requestVisibleActions', ''),

    accessType: (0, _toriiConfiguration.configurable)('accessType', ''),

    responseParams: ['code', 'state'],

    scope: (0, _toriiConfiguration.configurable)('scope', 'email'),

    approvalPrompt: (0, _toriiConfiguration.configurable)('approvalPrompt', 'auto'),

    redirectUri: (0, _toriiConfiguration.configurable)('redirectUri', 'http://localhost:8000/oauth2callback'),

    hd: (0, _toriiConfiguration.configurable)('hd', '')
  });

  exports['default'] = GoogleOauth2;
});