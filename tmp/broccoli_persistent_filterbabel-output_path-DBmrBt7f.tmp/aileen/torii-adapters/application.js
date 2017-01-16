define('aileen/torii-adapters/application', ['exports', 'ember', 'emberfire/torii-adapters/firebase'], function (exports, _ember, _emberfireToriiAdaptersFirebase) {
  exports['default'] = _emberfireToriiAdaptersFirebase['default'].extend({
    firebase: _ember['default'].inject.service()
  });
});