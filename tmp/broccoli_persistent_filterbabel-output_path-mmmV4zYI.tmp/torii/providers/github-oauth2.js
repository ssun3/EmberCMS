define('torii/providers/github-oauth2', ['exports', 'torii/providers/oauth2-code', 'torii/configuration'], function (exports, _toriiProvidersOauth2Code, _toriiConfiguration) {
  'use strict';

  /**
   * This class implements authentication against Github
   * using the OAuth2 authorization flow in a popup window.
   * @class
   */
  var GithubOauth2 = _toriiProvidersOauth2Code['default'].extend({
    name: 'github-oauth2',
    baseUrl: 'https://github.com/login/oauth/authorize',

    responseParams: ['code', 'state'],

    redirectUri: (0, _toriiConfiguration.configurable)('redirectUri', function () {
      // A hack that allows redirectUri to be configurable
      // but default to the superclass
      return this._super();
    })
  });

  exports['default'] = GithubOauth2;
});