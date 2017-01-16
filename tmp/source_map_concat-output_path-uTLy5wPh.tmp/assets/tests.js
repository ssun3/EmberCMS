'use strict';

define('aileen/tests/adapters/application.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass jshint.');
  });
});
define('aileen/tests/app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('aileen/tests/components/google-picker.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/google-picker.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/google-picker.js should pass jshint.\ncomponents/google-picker.js: line 11, col 96, Missing semicolon.\ncomponents/google-picker.js: line 67, col 51, Expected \'===\' and instead saw \'==\'.\ncomponents/google-picker.js: line 74, col 21, \'doc\' used out of scope.\ncomponents/google-picker.js: line 21, col 9, \'gapi\' is not defined.\ncomponents/google-picker.js: line 22, col 9, \'gapi\' is not defined.\ncomponents/google-picker.js: line 50, col 28, \'google\' is not defined.\ncomponents/google-picker.js: line 51, col 23, \'google\' is not defined.\ncomponents/google-picker.js: line 52, col 23, \'google\' is not defined.\ncomponents/google-picker.js: line 53, col 23, \'google\' is not defined.\ncomponents/google-picker.js: line 54, col 23, \'google\' is not defined.\ncomponents/google-picker.js: line 55, col 27, \'google\' is not defined.\ncomponents/google-picker.js: line 67, col 18, \'google\' is not defined.\ncomponents/google-picker.js: line 67, col 52, \'google\' is not defined.\ncomponents/google-picker.js: line 68, col 26, \'google\' is not defined.\ncomponents/google-picker.js: line 69, col 21, \'google\' is not defined.\ncomponents/google-picker.js: line 71, col 21, \'google\' is not defined.\ncomponents/google-picker.js: line 72, col 21, \'google\' is not defined.\n\n17 errors');
  });
});
define('aileen/tests/controllers/application.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass jshint.');
  });
});
define('aileen/tests/controllers/login.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/login.js should pass jshint.');
  });
});
define('aileen/tests/controllers/work/edit.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/work/edit.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/work/edit.js should pass jshint.\ncontrollers/work/edit.js: line 35, col 25, \'e\' is defined but never used.\n\n1 error');
  });
});
define('aileen/tests/controllers/work/edit/project/edit.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/work/edit/project/edit.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/work/edit/project/edit.js should pass jshint.');
  });
});
define('aileen/tests/controllers/work/edit/project/new.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/work/edit/project/new.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/work/edit/project/new.js should pass jshint.');
  });
});
define('aileen/tests/controllers/work/new.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/work/new.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/work/new.js should pass jshint.');
  });
});
define('aileen/tests/helpers/create-offline-ref', ['exports', 'firebase'], function (exports, _firebase) {
  exports['default'] = createOfflineRef;
  var DEFAULT_NAME = '[EmberFire offline test app]';

  exports.DEFAULT_NAME = DEFAULT_NAME;
  /**
   * Creates an offline firebase reference with optional initial data and url.
   *
   * Be sure to `stubfirebase()` and `unstubfirebase()` in your tests!
   *
   * @param  {!Object} [initialData]
   * @param  {string} [url]
   * @param  {string} [apiKey]
   * @return {!firebase.database.Reference}
   */

  function createOfflineRef(initialData) {
    var url = arguments.length <= 1 || arguments[1] === undefined ? 'https://emberfire-tests-2c814.firebaseio.com' : arguments[1];
    var apiKey = arguments.length <= 2 || arguments[2] === undefined ? 'AIzaSyC9-ndBb1WR05rRF1msVQDV6EBqB752m6o' : arguments[2];

    if (!_firebase['default']._unStub) {
      throw new Error('Please use stubFirebase() before calling this method');
    }

    var config = {
      apiKey: apiKey,
      authDomain: 'emberfire-tests-2c814.firebaseapp.com',
      databaseURL: url,
      storageBucket: ''
    };

    var app = undefined;

    try {
      app = _firebase['default'].app(DEFAULT_NAME);
    } catch (e) {
      app = _firebase['default'].initializeApp(config, DEFAULT_NAME);
    }

    var ref = app.database().ref();

    app.database().goOffline(); // must be called after the ref is created

    if (initialData) {
      ref.set(initialData);
    }

    return ref;
  }
});
define('aileen/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('aileen/tests/helpers/destroy-app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('aileen/tests/helpers/destroy-firebase-apps', ['exports', 'ember', 'firebase'], function (exports, _ember, _firebase) {
  exports['default'] = destroyFirebaseApps;
  var run = _ember['default'].run;

  /**
   * Destroy all Firebase apps.
   */

  function destroyFirebaseApps() {
    var deletions = _firebase['default'].apps.map(function (app) {
      return app['delete']();
    });
    _ember['default'].RSVP.all(deletions).then(function () {
      return run(function () {
        // NOOP to delay run loop until the apps are destroyed
      });
    });
  }
});
define('aileen/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'aileen/tests/helpers/start-app', 'aileen/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _aileenTestsHelpersStartApp, _aileenTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _aileenTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _aileenTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('aileen/tests/helpers/module-for-acceptance.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('aileen/tests/helpers/replace-app-ref', ['exports'], function (exports) {
  exports['default'] = replaceAppRef;
  /**
   * Updates the supplied app adapter's Firebase reference.
   *
   * @param  {!Ember.Application} app
   * @param  {!firebase.database.Reference} ref
   * @param  {string} [model]  The model, if overriding a model specific adapter
   */

  function replaceAppRef(app, ref) {
    var model = arguments.length <= 2 || arguments[2] === undefined ? 'application' : arguments[2];

    app.register('service:firebaseMock', ref, { instantiate: false, singleton: true });
    app.inject('adapter:firebase', 'firebase', 'service:firebaseMock');
    app.inject('adapter:' + model, 'firebase', 'service:firebaseMock');
  }
});
define('aileen/tests/helpers/replace-firebase-app-service', ['exports'], function (exports) {
  exports['default'] = replaceFirebaseAppService;
  /**
   * Replaces the `firebaseApp` service with your own using injection overrides.
   *
   * This is usually not needed in test modules, where you can re-register over
   * existing names in the registry, but in acceptance tests, some registry/inject
   * magic is needed.
   *
   * @param  {!Ember.Application} app
   * @param  {!Object} newService
   */

  function replaceFirebaseAppService(app, newService) {
    app.register('service:firebaseAppMock', newService, { instantiate: false, singleton: true });
    app.inject('torii-provider:firebase', 'firebaseApp', 'service:firebaseAppMock');
    app.inject('torii-adapter:firebase', 'firebaseApp', 'service:firebaseAppMock');
  }
});
define('aileen/tests/helpers/resolver', ['exports', 'aileen/resolver', 'aileen/config/environment'], function (exports, _aileenResolver, _aileenConfigEnvironment) {

  var resolver = _aileenResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _aileenConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _aileenConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('aileen/tests/helpers/resolver.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
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
define('aileen/tests/helpers/start-app.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('aileen/tests/helpers/stub-firebase', ['exports', 'firebase'], function (exports, _firebase) {
  exports['default'] = stubFirebase;

  /**
   * When a reference is in offline mode it will not call any callbacks
   * until it goes online and resyncs. The ref will have already
   * updated its internal cache with the changed values so we shortcut
   * the process and call the supplied callbacks immediately (asynchronously).
   */

  function stubFirebase() {
    // check for existing stubbing
    if (!_firebase['default']._unStub) {
      var originalSet = _firebase['default'].database.Reference.prototype.set;
      var originalUpdate = _firebase['default'].database.Reference.prototype.update;
      var originalRemove = _firebase['default'].database.Reference.prototype.remove;

      _firebase['default']._unStub = function () {
        _firebase['default'].database.Reference.prototype.set = originalSet;
        _firebase['default'].database.Reference.prototype.update = originalUpdate;
        _firebase['default'].database.Reference.prototype.remove = originalRemove;
      };

      _firebase['default'].database.Reference.prototype.set = function (data, cb) {
        originalSet.call(this, data);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };

      _firebase['default'].database.Reference.prototype.update = function (data, cb) {
        originalUpdate.call(this, data);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };

      _firebase['default'].database.Reference.prototype.remove = function (cb) {
        originalRemove.call(this);
        if (typeof cb === 'function') {
          setTimeout(cb, 0);
        }
      };
    }
  }
});
define('aileen/tests/helpers/torii', ['exports'], function (exports) {
  exports.stubValidSession = stubValidSession;

  function stubValidSession(application, sessionData) {
    var session = application.__container__.lookup('service:session');
    var sm = session.get('stateMachine');
    Ember.run(function () {
      sm.send('startOpen');
      sm.send('finishOpen', sessionData);
    });
  }
});
define('aileen/tests/helpers/unstub-firebase', ['exports', 'firebase'], function (exports, _firebase) {
  exports['default'] = unstubFirebase;

  function unstubFirebase() {
    if (typeof _firebase['default']._unStub === 'function') {
      _firebase['default']._unStub();
      delete _firebase['default']._unStub;
    }
  }
});
define('aileen/tests/integration/components/google-picker-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('google-picker', 'Integration | Component | google picker', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'TNvfaA7Z',
      'block': '{"statements":[["append",["unknown",["google-picker"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'KlVrB24k',
      'block': '{"statements":[["text","\\n"],["block",["google-picker"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('aileen/tests/integration/components/google-picker-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/google-picker-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/google-picker-test.js should pass jshint.');
  });
});
define('aileen/tests/models/media.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/media.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/media.js should pass jshint.');
  });
});
define('aileen/tests/models/project.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/project.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/project.js should pass jshint.');
  });
});
define('aileen/tests/models/work.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/work.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/work.js should pass jshint.');
  });
});
define('aileen/tests/resolver.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('aileen/tests/router.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('aileen/tests/routes/about.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/about.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/about.js should pass jshint.');
  });
});
define('aileen/tests/routes/application.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass jshint.');
  });
});
define('aileen/tests/routes/login.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/login.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/login.js should pass jshint.');
  });
});
define('aileen/tests/routes/work.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/work.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/work.js should pass jshint.');
  });
});
define('aileen/tests/routes/work/edit.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/work/edit.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/work/edit.js should pass jshint.');
  });
});
define('aileen/tests/routes/work/edit/project/edit.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/work/edit/project/edit.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/work/edit/project/edit.js should pass jshint.');
  });
});
define('aileen/tests/routes/work/edit/project/new.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/work/edit/project/new.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/work/edit/project/new.js should pass jshint.');
  });
});
define('aileen/tests/routes/work/index.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/work/index.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/work/index.js should pass jshint.');
  });
});
define('aileen/tests/routes/work/new.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/work/new.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/work/new.js should pass jshint.');
  });
});
define('aileen/tests/test-helper', ['exports', 'aileen/tests/helpers/resolver', 'ember-qunit'], function (exports, _aileenTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_aileenTestsHelpersResolver['default']);
});
define('aileen/tests/test-helper.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('aileen/tests/torii-adapters/application.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | torii-adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'torii-adapters/application.js should pass jshint.');
  });
});
define('aileen/tests/unit/controllers/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:application', 'Unit | Controller | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('aileen/tests/unit/controllers/application-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/application-test.js should pass jshint.');
  });
});
define('aileen/tests/unit/controllers/login-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:login', 'Unit | Controller | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('aileen/tests/unit/controllers/login-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/login-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/login-test.js should pass jshint.');
  });
});
define('aileen/tests/unit/controllers/work/edit-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:work/edit', 'Unit | Controller | work/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('aileen/tests/unit/controllers/work/edit-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/work/edit-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/work/edit-test.js should pass jshint.');
  });
});
define('aileen/tests/unit/controllers/work/edit/project/edit-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:work/edit/project/edit', 'Unit | Controller | work/edit/project/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('aileen/tests/unit/controllers/work/edit/project/edit-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/work/edit/project/edit-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/work/edit/project/edit-test.js should pass jshint.');
  });
});
define('aileen/tests/unit/controllers/work/edit/project/new-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:work/edit/project/new', 'Unit | Controller | work/edit/project/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('aileen/tests/unit/controllers/work/edit/project/new-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/work/edit/project/new-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/work/edit/project/new-test.js should pass jshint.');
  });
});
define('aileen/tests/unit/controllers/work/new-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:work/new', 'Unit | Controller | work/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('aileen/tests/unit/controllers/work/new-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/controllers/work/new-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/work/new-test.js should pass jshint.');
  });
});
define('aileen/tests/unit/models/media-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('media', 'Unit | Model | media', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('aileen/tests/unit/models/media-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/media-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/media-test.js should pass jshint.');
  });
});
define('aileen/tests/unit/models/project-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('project', 'Unit | Model | project', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('aileen/tests/unit/models/project-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/project-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/project-test.js should pass jshint.');
  });
});
define('aileen/tests/unit/models/work-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('work', 'Unit | Model | work', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('aileen/tests/unit/models/work-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/models/work-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/work-test.js should pass jshint.');
  });
});
define('aileen/tests/unit/routes/about-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:about', 'Unit | Route | about', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('aileen/tests/unit/routes/about-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/about-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/about-test.js should pass jshint.');
  });
});
define('aileen/tests/unit/routes/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('aileen/tests/unit/routes/application-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/application-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/application-test.js should pass jshint.');
  });
});
define('aileen/tests/unit/routes/login-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:login', 'Unit | Route | login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('aileen/tests/unit/routes/login-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/login-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/login-test.js should pass jshint.');
  });
});
define('aileen/tests/unit/routes/work-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:work', 'Unit | Route | work', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('aileen/tests/unit/routes/work-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/work-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/work-test.js should pass jshint.');
  });
});
define('aileen/tests/unit/routes/work/edit-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:work/edit', 'Unit | Route | work/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('aileen/tests/unit/routes/work/edit-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/work/edit-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/work/edit-test.js should pass jshint.');
  });
});
define('aileen/tests/unit/routes/work/edit/project/edit-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:work/edit/project/edit', 'Unit | Route | work/edit/project/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('aileen/tests/unit/routes/work/edit/project/edit-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/work/edit/project/edit-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/work/edit/project/edit-test.js should pass jshint.');
  });
});
define('aileen/tests/unit/routes/work/edit/project/new-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:work/edit/project/new', 'Unit | Route | work/edit/project/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('aileen/tests/unit/routes/work/edit/project/new-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/work/edit/project/new-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/work/edit/project/new-test.js should pass jshint.');
  });
});
define('aileen/tests/unit/routes/work/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:work/index', 'Unit | Route | work/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('aileen/tests/unit/routes/work/index-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/work/index-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/work/index-test.js should pass jshint.');
  });
});
define('aileen/tests/unit/routes/work/new-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:work/new', 'Unit | Route | work/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('aileen/tests/unit/routes/work/new-test.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/work/new-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/work/new-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('aileen/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map
