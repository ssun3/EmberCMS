define('torii/providers/stripe-connect', ['exports', 'torii/providers/oauth2-code', 'torii/configuration'], function (exports, _toriiProvidersOauth2Code, _toriiConfiguration) {
  'use strict';

  exports['default'] = _toriiProvidersOauth2Code['default'].extend({
    name: 'stripe-connect',
    baseUrl: 'https://connect.stripe.com/oauth/authorize',

    // additional url params that this provider requires
    requiredUrlParams: [],
    optionalUrlParams: ['stripe_landing', 'always_prompt'],

    responseParams: ['code', 'state'],

    scope: (0, _toriiConfiguration.configurable)('scope', 'read_write'),
    stripeLanding: (0, _toriiConfiguration.configurable)('stripeLanding', ''),
    alwaysPrompt: (0, _toriiConfiguration.configurable)('alwaysPrompt', 'false'),

    redirectUri: (0, _toriiConfiguration.configurable)('redirectUri', function () {
      // A hack that allows redirectUri to be configurable
      // but default to the superclass
      return this._super();
    })
  });
});