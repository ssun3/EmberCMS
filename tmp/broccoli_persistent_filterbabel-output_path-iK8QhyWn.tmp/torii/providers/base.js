define('torii/providers/base', ['exports', 'torii/lib/required-property', 'torii/lib/container-utils', 'torii/configuration'], function (exports, _toriiLibRequiredProperty, _toriiLibContainerUtils, _toriiConfiguration) {
  'use strict';

  var DEFAULT_REMOTE_SERVICE_NAME = 'popup';

  var computed = Ember.computed;

  /**
   * The base class for all torii providers
   * @class BaseProvider
   */
  var Base = Ember.Object.extend({

    /**
     * The name of the provider
     * @property {string} name
     */
    name: (0, _toriiLibRequiredProperty['default'])(),

    /**
     * The name of the configuration property
     * that holds config information for this provider.
     * @property {string} configNamespace
     */
    configNamespace: computed('name', function () {
      return 'providers.' + this.get('name');
    }),

    popup: computed('configuredRemoteServiceName', function () {
      var owner = (0, _toriiLibContainerUtils.getOwner)(this);
      var remoteServiceName = this.get('configuredRemoteServiceName') || _toriiConfiguration['default'].remoteServiceName || DEFAULT_REMOTE_SERVICE_NAME;
      return owner.lookup('torii-service:' + remoteServiceName);
    }),

    configuredRemoteServiceName: (0, _toriiConfiguration.configurable)('remoteServiceName', null)
  });

  exports['default'] = Base;
});