define('torii/bootstrap/torii', ['exports', 'torii/providers/linked-in-oauth2', 'torii/providers/google-oauth2', 'torii/providers/google-oauth2-bearer', 'torii/providers/facebook-connect', 'torii/providers/facebook-oauth2', 'torii/adapters/application', 'torii/providers/twitter-oauth1', 'torii/providers/github-oauth2', 'torii/providers/azure-ad-oauth2', 'torii/providers/stripe-connect', 'torii/providers/edmodo-connect', 'torii/configuration', 'torii/services/torii', 'torii/services/popup', 'torii/services/iframe', 'torii/lib/container-utils'], function (exports, _toriiProvidersLinkedInOauth2, _toriiProvidersGoogleOauth2, _toriiProvidersGoogleOauth2Bearer, _toriiProvidersFacebookConnect, _toriiProvidersFacebookOauth2, _toriiAdaptersApplication, _toriiProvidersTwitterOauth1, _toriiProvidersGithubOauth2, _toriiProvidersAzureAdOauth2, _toriiProvidersStripeConnect, _toriiProvidersEdmodoConnect, _toriiConfiguration, _toriiServicesTorii, _toriiServicesPopup, _toriiServicesIframe, _toriiLibContainerUtils) {
  'use strict';

  exports['default'] = function (application) {
    application.register('service:torii', _toriiServicesTorii['default']);

    application.register('torii-provider:linked-in-oauth2', _toriiProvidersLinkedInOauth2['default']);
    application.register('torii-provider:google-oauth2', _toriiProvidersGoogleOauth2['default']);
    application.register('torii-provider:google-oauth2-bearer', _toriiProvidersGoogleOauth2Bearer['default']);
    application.register('torii-provider:facebook-connect', _toriiProvidersFacebookConnect['default']);
    application.register('torii-provider:facebook-oauth2', _toriiProvidersFacebookOauth2['default']);
    application.register('torii-provider:twitter', _toriiProvidersTwitterOauth1['default']);
    application.register('torii-provider:github-oauth2', _toriiProvidersGithubOauth2['default']);
    application.register('torii-provider:azure-ad-oauth2', _toriiProvidersAzureAdOauth2['default']);
    application.register('torii-provider:stripe-connect', _toriiProvidersStripeConnect['default']);
    application.register('torii-provider:edmodo-connect', _toriiProvidersEdmodoConnect['default']);
    application.register('torii-adapter:application', _toriiAdaptersApplication['default']);

    application.register('torii-service:iframe', _toriiServicesIframe['default']);
    application.register('torii-service:popup', _toriiServicesPopup['default']);
  };
});