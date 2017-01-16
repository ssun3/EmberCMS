define('aileen/app', ['exports', 'ember', 'aileen/resolver', 'ember-load-initializers', 'aileen/config/environment'], function (exports, _ember, _aileenResolver, _emberLoadInitializers, _aileenConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _aileenConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _aileenConfigEnvironment['default'].podModulePrefix,
    Resolver: _aileenResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _aileenConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});