define('aileen/tests/helpers/start-app', ['exports', 'ember', 'aileen/app', 'aileen/config/environment'], function (exports, _ember, _aileenApp, _aileenConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    // use defaults, but you can override
    var attributes = _ember['default'].assign({}, _aileenConfigEnvironment['default'].APP, attrs);

    _ember['default'].run(function () {
      application = _aileenApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});