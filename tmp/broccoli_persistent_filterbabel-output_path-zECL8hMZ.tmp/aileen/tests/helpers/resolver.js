define('aileen/tests/helpers/resolver', ['exports', 'aileen/resolver', 'aileen/config/environment'], function (exports, _aileenResolver, _aileenConfigEnvironment) {

  var resolver = _aileenResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _aileenConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _aileenConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});