define('aileen/helpers/app-version', ['exports', 'ember', 'aileen/config/environment'], function (exports, _ember, _aileenConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _aileenConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});