define('aileen/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'aileen/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _aileenConfigEnvironment) {
  var _config$APP = _aileenConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});