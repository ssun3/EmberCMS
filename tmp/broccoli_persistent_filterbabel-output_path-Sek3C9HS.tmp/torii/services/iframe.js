define('torii/services/iframe', ['exports', 'torii/mixins/ui-service-mixin', 'torii/lib/uuid-generator'], function (exports, _toriiMixinsUiServiceMixin, _toriiLibUuidGenerator) {
  'use strict';

  var on = Ember.on;

  var Iframe = Ember.Object.extend(Ember.Evented, _toriiMixinsUiServiceMixin['default'], {

    openRemote: function openRemote(url, pendingRequestKey, options) {
      this.remote = Ember.$('<iframe src="' + url + '" id="torii-iframe"></iframe>');
      var iframeParent = '.torii-iframe-placeholder';
      Ember.$(iframeParent).append(this.remote);
    },

    closeRemote: function closeRemote() {
      this.remote.remove();
    },

    pollRemote: function pollRemote() {
      if (Ember.$('#torii-iframe').length === 0) {
        this.trigger('didClose');
      }
    }

  });

  exports['default'] = Iframe;
});