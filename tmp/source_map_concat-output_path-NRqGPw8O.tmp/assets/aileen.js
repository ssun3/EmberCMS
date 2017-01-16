"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('aileen/adapters/application', ['exports', 'emberfire/adapters/firebase'], function (exports, _emberfireAdaptersFirebase) {
  exports['default'] = _emberfireAdaptersFirebase['default'].extend({});
});
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
define('aileen/components/google-picker', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    // actions: {
    //   uploadMedia: function(){

    //     // The Browser API key obtained from the Google Developers Console.
    //     var developerKey = 'AIzaSyBCOhpxKxUkwlQXWwRwbzsaYs5pmbI9yAY ';

    //     // The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
    //     var clientId = "619862406222-ejqjpamted4nb655jv8408kgrvstssbv.apps.googleusercontent.com"

    //     // Scope to use to access user's photos.
    //     var scope = ['https://www.googleapis.com/auth/drive'];

    //     var pickerApiLoaded = false;
    //     var oauthToken;

    //     // Use the API Loader script to load google.picker and gapi.auth.
    //     function onApiLoad() {
    //       gapi.load('auth', {'callback': onAuthApiLoad});
    //       gapi.load('picker', {'callback': onPickerApiLoad});
    //     }

    //     function onAuthApiLoad() {
    //       window.gapi.auth.authorize(
    //           {
    //             'client_id': clientId,
    //             'scope': scope,
    //             'immediate': false
    //           },
    //           handleAuthResult);
    //     }

    //     function onPickerApiLoad() {
    //       pickerApiLoaded = true;
    //       createPicker();
    //     }

    //     function handleAuthResult(authResult) {
    //       if (authResult && !authResult.error) {
    //         oauthToken = authResult.access_token;
    //         createPicker();
    //       }
    //     }

    //     // Create and render a Picker object for picking user Photos.
    //     function createPicker() {
    //       if (pickerApiLoaded && oauthToken) {
    //         var picker = new google.picker.PickerBuilder().
    //             addView(google.picker.ViewId.PHOTO_ALBUMS).
    //             addView(google.picker.ViewId.PHOTOS).
    //             addView(google.picker.ViewId.PHOTO_UPLOAD).
    //             addView(google.picker.ViewId.DOCS_VIDEOS).
    //             addView(new google.picker.DocsUploadView()).
    //             setOAuthToken(oauthToken).
    //             setDeveloperKey(developerKey).
    //             setCallback(pickerCallback).
    //             build();
    //         picker.setVisible(true);
    //       }
    //     }

    //     // A simple callback implementation.
    //     function pickerCallback(data) {
    //       var url = 'nothing';
    //       if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
    //         var doc = data[google.picker.Response.DOCUMENTS][0];
    //         url = doc[google.picker.Document.URL];
    //       }
    //       console.log(google.picker);
    //       console.log(google.picker.Response);
    //       console.log(data);
    //       console.log(doc);
    //       //document.getElementById('result').value = url;
    //     }

    //     onApiLoad();
    //   }

    // }
  });
});
define('aileen/components/project-component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('aileen/components/torii-iframe-placeholder', ['exports', 'torii/components/torii-iframe-placeholder'], function (exports, _toriiComponentsToriiIframePlaceholder) {
  exports['default'] = _toriiComponentsToriiIframePlaceholder['default'];
});
define('aileen/components/work-component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    session: _ember['default'].inject.service('session'),
    projectsCount: _ember['default'].computed('work.projects.length', function () {
      return this.get('work.projects.length');
    })
  });
});
define('aileen/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    actions: {
      signOut: function signOut() {
        var self = this;
        this.get("session").close();
        self.transitionToRoute('application');
      }
    }
  });
});
define("aileen/controllers/login", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
    actions: {
      signIn: function signIn() {
        var self = this;
        this.get("session").open("firebase", {
          provider: 'password',
          email: this.get('email'),
          password: this.get('password')
        }).then(function (data) {
          console.log(data);
          self.transitionToRoute('application');
        });
      }
    }
  });
});
define('aileen/controllers/work/edit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    actions: {

      editWork: function editWork(id) {
        var self = this;
        var workplace = this.get('model.workplace');
        var role = this.get('model.role');
        var description = this.get('model.description');
        var startDate = this.get('model.startDate');
        var endDate = this.get('model.endDate');
        var image = this.get('model.image');

        this.store.findRecord('work', id).then(function (work) {
          work.set('workplace', workplace);
          work.set('role', role);
          work.set('description', description);
          work.set('startDate', new Date(startDate));
          work.set('endDate', new Date(endDate));
          work.set('image', image);
          //save to FB
          work.save();
          self.transitionToRoute('work');
        });
      },

      deleteWork: function deleteWork(id) {
        var self = this;
        var work = this.store.peekRecord('work', id);
        var deletions = work.get('projects').map(function (project) {
          return project.destroyRecord();
        });

        //Ensure all projects are deleted before the work
        _ember['default'].RSVP.all(deletions).then(function () {
          work.destroyRecord();
          self.transitionToRoute('work');
        })['catch'](function (e) {
          console.log("An error has occured");
        });
      },

      changeImage: function changeImage(id) {
        var self = this;
        // The Browser API key obtained from the Google Developers Console.
        var developerKey = 'AIzaSyBCOhpxKxUkwlQXWwRwbzsaYs5pmbI9yAY ';

        // The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
        var clientId = "619862406222-ejqjpamted4nb655jv8408kgrvstssbv.apps.googleusercontent.com";

        // Scope to use to access user's photos.
        var scope = ['https://www.googleapis.com/auth/drive'];

        var pickerApiLoaded = false;
        var oauthToken;

        // Use the API Loader script to load google.picker and gapi.auth.
        function onApiLoad() {
          gapi.load('auth', { 'callback': onAuthApiLoad });
          gapi.load('picker', { 'callback': onPickerApiLoad });
        }

        function onAuthApiLoad() {
          window.gapi.auth.authorize({
            'client_id': clientId,
            'scope': scope,
            'immediate': false
          }, handleAuthResult);
        }

        function onPickerApiLoad() {
          pickerApiLoaded = true;
          createPicker();
        }

        function handleAuthResult(authResult) {
          if (authResult && !authResult.error) {
            oauthToken = authResult.access_token;
            createPicker();
          }
        }

        // Create and render a Picker object for picking user Photos.
        function createPicker() {
          if (pickerApiLoaded && oauthToken) {
            var picker = new google.picker.PickerBuilder().addView(google.picker.ViewId.PHOTOS).addView(google.picker.ViewId.PHOTO_UPLOAD).
            //addView(google.picker.ViewId.DOCS_VIDEOS).
            //addView(new google.picker.DocsUploadView()).
            setOAuthToken(oauthToken).setDeveloperKey(developerKey).setCallback(pickerCallback).build();
            picker.setVisible(true);
          }
        }

        // A simple callback implementation.
        function pickerCallback(data) {
          var imageSRC = 'nothing';
          if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
            var doc = data[google.picker.Response.DOCUMENTS][0];
            imageSRC = doc[google.picker.Document.THUMBNAILS][3].url;
            console.log(doc);
            updateImage(imageSRC);
          }
        }

        function updateImage(imageURL) {
          self.store.findRecord('work', id).then(function (work) {
            work.set('image', imageURL);
          });
        }

        onApiLoad();
      }

    } //end actions

  });
});
define('aileen/controllers/work/edit/project/edit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    actions: {
      editProject: function editProject(projectID) {
        var self = this;
        var title = this.get('model.title');
        var subtitle = this.get('model.subtitle');
        var description = this.get('model.description');
        var role = this.get('model.role');
        var date = this.get('model.date');
        var media = this.get('model.media');

        this.store.findRecord('project', projectID).then(function (project) {
          project.set('title', title);
          project.set('subtitle', subtitle);
          project.set('description', description);
          project.set('role', role);
          project.set('date', date);
          project.set('media', media);

          //save to FB
          project.save();
          self.transitionToRoute('work.edit.project');
        });
      },

      deleteProject: function deleteProject(projectID, workID) {
        var self = this;
        var work = this.store.peekRecord('work', workID);
        var project = this.store.peekRecord('project', projectID);
        project.destroyRecord().then(function () {
          work.save();
          self.transitionToRoute('work.edit.project');
        });
      }
    }
  });
});
define('aileen/controllers/work/edit/project/new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    actions: {
      addProject: function addProject(workID) {
        var self = this;
        var title = this.get('title');
        var subtitle = this.get('subtitle');
        var description = this.get('description');
        var role = this.get('role');
        var date = this.get('date');
        var media = this.get('media');
        var workplace = this.store.peekRecord('work', workID);

        //create new project

        var newProject = this.store.createRecord('project', {
          title: title,
          subtitle: subtitle,
          description: description,
          role: role,
          date: new Date(date),
          media: media
        });

        workplace.get('projects').pushObject(newProject);

        //save to FB
        newProject.save().then(function () {
          workplace.save().then(function () {
            //clear form
            self.setProperties({
              title: '',
              subtitle: '',
              description: '',
              role: '',
              date: '',
              media: ''
            });
            self.transitionToRoute('work.edit.project');
          });
        });
      }
    }
  });
});
define('aileen/controllers/work/new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    actions: {
      addWork: function addWork() {
        var self = this;
        var workplace = this.get('workplace');
        var role = this.get('role');
        var description = this.get('description');
        var startDate = this.get('startDate');
        var endDate = this.get('endDate');
        var image = this.get('image');

        //create new work
        var newWork = this.store.createRecord('work', {
          workplace: workplace,
          role: role,
          description: description,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          image: image
        });

        //save to FB
        newWork.save().then(function () {
          //clear form
          self.setProperties({
            workplace: '',
            role: '',
            description: '',
            start: '',
            end: '',
            image: ''
          });
          self.transitionToRoute('work');
        });
      }

    }
  });
});
define('aileen/helpers/app-version', ['exports', 'ember', 'aileen/config/environment'], function (exports, _ember, _aileenConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _aileenConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('aileen/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('aileen/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('aileen/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'aileen/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _aileenConfigEnvironment) {
  var _config$APP = _aileenConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('aileen/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('aileen/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('aileen/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('aileen/initializers/emberfire', ['exports', 'emberfire/initializers/emberfire'], function (exports, _emberfireInitializersEmberfire) {
  exports['default'] = _emberfireInitializersEmberfire['default'];
});
define('aileen/initializers/export-application-global', ['exports', 'ember', 'aileen/config/environment'], function (exports, _ember, _aileenConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_aileenConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _aileenConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_aileenConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('aileen/initializers/initialize-torii-callback', ['exports', 'torii/redirect-handler'], function (exports, _toriiRedirectHandler) {
  exports['default'] = {
    name: 'torii-callback',
    before: 'torii',
    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      application.deferReadiness();
      _toriiRedirectHandler['default'].handle(window)['catch'](function () {
        application.advanceReadiness();
      });
    }
  };
});
define('aileen/initializers/initialize-torii-session', ['exports', 'torii/bootstrap/session', 'torii/configuration'], function (exports, _toriiBootstrapSession, _toriiConfiguration) {
  exports['default'] = {
    name: 'torii-session',
    after: 'torii',

    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      var configuration = (0, _toriiConfiguration.getConfiguration)();
      if (!configuration.sessionServiceName) {
        return;
      }

      (0, _toriiBootstrapSession['default'])(application, configuration.sessionServiceName);

      var sessionFactoryName = 'service:' + configuration.sessionServiceName;
      application.inject('adapter', configuration.sessionServiceName, sessionFactoryName);
    }
  };
});
define('aileen/initializers/initialize-torii', ['exports', 'torii/bootstrap/torii', 'torii/configuration', 'aileen/config/environment'], function (exports, _toriiBootstrapTorii, _toriiConfiguration, _aileenConfigEnvironment) {

  var initializer = {
    name: 'torii',
    initialize: function initialize(application) {
      if (arguments[1]) {
        // Ember < 2.1
        application = arguments[1];
      }
      (0, _toriiConfiguration.configure)(_aileenConfigEnvironment['default'].torii || {});
      (0, _toriiBootstrapTorii['default'])(application);
      application.inject('route', 'torii', 'service:torii');
    }
  };

  exports['default'] = initializer;
});
define('aileen/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('aileen/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('aileen/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("aileen/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('aileen/instance-initializers/setup-routes', ['exports', 'torii/bootstrap/routing', 'torii/configuration', 'torii/router-dsl-ext'], function (exports, _toriiBootstrapRouting, _toriiConfiguration, _toriiRouterDslExt) {
  exports['default'] = {
    name: 'torii-setup-routes',
    initialize: function initialize(applicationInstance, registry) {
      var configuration = (0, _toriiConfiguration.getConfiguration)();

      if (!configuration.sessionServiceName) {
        return;
      }

      var router = applicationInstance.get('router');
      var setupRoutes = function setupRoutes() {
        var authenticatedRoutes = router.router.authenticatedRoutes;
        var hasAuthenticatedRoutes = !Ember.isEmpty(authenticatedRoutes);
        if (hasAuthenticatedRoutes) {
          (0, _toriiBootstrapRouting['default'])(applicationInstance, authenticatedRoutes);
        }
        router.off('willTransition', setupRoutes);
      };
      router.on('willTransition', setupRoutes);
    }
  };
});
define('aileen/instance-initializers/walk-providers', ['exports', 'torii/lib/container-utils', 'torii/configuration'], function (exports, _toriiLibContainerUtils, _toriiConfiguration) {
  exports['default'] = {
    name: 'torii-walk-providers',
    initialize: function initialize(applicationInstance) {
      var configuration = (0, _toriiConfiguration.getConfiguration)();
      // Walk all configured providers and eagerly instantiate
      // them. This gives providers with initialization side effects
      // like facebook-connect a chance to load up assets.
      for (var key in configuration.providers) {
        if (configuration.providers.hasOwnProperty(key)) {
          (0, _toriiLibContainerUtils.lookup)(applicationInstance, 'torii-provider:' + key);
        }
      }
    }
  };
});
define('aileen/models/media', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    title: _emberData['default'].attr('string'),
    description: _emberData['default'].attr('string'),
    url: _emberData['default'].attr('string'),
    mimeType: _emberData['default'].attr('string'),
    project: _emberData['default'].belongsTo('project', { async: true })
  });
});
define('aileen/models/project', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    title: _emberData['default'].attr('string'),
    subtitle: _emberData['default'].attr('string'),
    description: _emberData['default'].attr('string'),
    role: _emberData['default'].attr('string'),
    date: _emberData['default'].attr('date'),
    medias: _emberData['default'].hasMany('media', { async: true }),
    workplace: _emberData['default'].belongsTo('work', { async: true })
  });
});
define('aileen/models/work', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    workplace: _emberData['default'].attr('string'),
    role: _emberData['default'].attr('string'),
    description: _emberData['default'].attr(),
    startDate: _emberData['default'].attr('date'),
    endDate: _emberData['default'].attr('date'),
    image: _emberData['default'].attr('string'),
    projects: _emberData['default'].hasMany('project', { async: true })

  });
});
define('aileen/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('aileen/router', ['exports', 'ember', 'aileen/config/environment'], function (exports, _ember, _aileenConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _aileenConfigEnvironment['default'].locationType,
    rootURL: _aileenConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('about');
    this.route('work', function () {
      this.route('edit', { path: "edit/:work_id" }, function () {
        this.route('project', function () {
          this.route('new');
          this.route('edit', { path: ":project_id" });
        });
      });
      this.route('new');
    });
    this.route('login');
  });

  exports['default'] = Router;
});
define('aileen/routes/about', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('aileen/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      return this.get('session').fetch()['catch'](function () {});
    }
  });
});
define('aileen/routes/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      if (this.get('session.isAuthenticated')) {
        this.transitionTo('application');
      }
    }
  });
});
define('aileen/routes/work', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.store.findAll('work');
    }
  });
});
define('aileen/routes/work/edit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      if (!this.get('session.isAuthenticated')) {
        this.transitionTo('application');
      }
    }
  });
});
define('aileen/routes/work/edit/project/edit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      if (!this.get('session.isAuthenticated')) {
        this.transitionTo('application');
      }
    }
  });
});
define('aileen/routes/work/edit/project/new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      if (!this.get('session.isAuthenticated')) {
        this.transitionTo('application');
      }
    }
  });
});
define('aileen/routes/work/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('aileen/routes/work/new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      if (!this.get('session.isAuthenticated')) {
        this.transitionTo('application');
      }
    }
  });
});
define('aileen/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('aileen/services/firebase-app', ['exports', 'emberfire/services/firebase-app'], function (exports, _emberfireServicesFirebaseApp) {
  exports['default'] = _emberfireServicesFirebaseApp['default'];
});
define('aileen/services/firebase', ['exports', 'emberfire/services/firebase'], function (exports, _emberfireServicesFirebase) {
  exports['default'] = _emberfireServicesFirebase['default'];
});
define('aileen/services/popup', ['exports', 'torii/services/popup'], function (exports, _toriiServicesPopup) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _toriiServicesPopup['default'];
    }
  });
});
define('aileen/services/torii-session', ['exports', 'torii/services/session'], function (exports, _toriiServicesSession) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _toriiServicesSession['default'];
    }
  });
});
define('aileen/services/torii', ['exports', 'torii/services/torii'], function (exports, _toriiServicesTorii) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _toriiServicesTorii['default'];
    }
  });
});
define("aileen/templates/about", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "zUVll6tf", "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"About Page\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/about.hbs" } });
});
define("aileen/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "PLQTFts9", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"partial\",\"navbar\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,0],[\"text\",\"\\n\\n\"],[\"text\",\"\\n\"],[\"text\",\"\\n\\n  \\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signOut\"]],[\"flush-element\"],[\"text\",\"Sign out\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":true}", "meta": { "moduleName": "aileen/templates/application.hbs" } });
});
define("aileen/templates/components/google-picker", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "in9fHTwR", "block": "{\"statements\":[[\"text\",\"\\n\\n\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/components/google-picker.hbs" } });
});
define("aileen/templates/components/project-component", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Gyo984lZ", "block": "{\"statements\":[[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/components/project-component.hbs" } });
});
define("aileen/templates/components/work-component", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Zi+aUpb0", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"work-image\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"work\",\"image\"]],null],[\"dynamic-attr\",\"alt\",[\"concat\",[[\"unknown\",[\"work\",\"workplace\"]]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\" \\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"work-details\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"work-role\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"work\",\"role\"]],false],[\"text\",\" - \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"work-description\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"work\",\"description\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"work-dates\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"work\",\"startDate\"]],false],[\"text\",\" - \"],[\"append\",[\"unknown\",[\"work\",\"endDate\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"work-projects\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"projectsCount\"]],false],[\"text\",\" projects\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n      \"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,4],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"work\",\"projects\"]]],null,2],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"          Edit PROJECT\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"link-to\"],[\"work.edit.project.edit\",[\"get\",[\"work\",\"id\"]],[\"get\",[\"project\",\"id\"]]],null,0]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"project: \"],[\"append\",[\"unknown\",[\"project\",\"title\"]],false],[\"text\",\"\\n      \"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,1],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"project\"]},{\"statements\":[[\"text\",\"          Edit WORK\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"work.edit.project\",[\"get\",[\"work\",\"id\"]]],null,3],[\"text\",\"        \\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/components/work-component.hbs" } });
});
define("aileen/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "4nPNhSkE", "block": "{\"statements\":[[\"open-element\",\"form\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signIn\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\nEmail: \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"type\"],[[\"get\",[\"email\"]],\"text\"]]],false],[\"text\",\"\\n\\nPassword: \"],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"type\"],[[\"get\",[\"password\"]],\"password\"]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"text\",\"Submit\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,1,0],[\"text\",\"\\n\\n\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  Not logged in\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  Logged in as \"],[\"append\",[\"unknown\",[\"session\",\"uid\"]],false],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/login.hbs" } });
});
define("aileen/templates/navbar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ZTlU9l3/", "block": "{\"statements\":[[\"open-element\",\"nav\",[]],[\"static-attr\",\"id\",\"main-nav\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"work\"],null,1],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"about\"],null,0],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Contact\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"About\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Work\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/navbar.hbs" } });
});
define("aileen/templates/work", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "G+Us3gpG", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"#work-page\"],[\"flush-element\"],[\"text\",\"\\n  \\n  \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\\n\\n\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\\n\\n\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work.hbs" } });
});
define("aileen/templates/work/edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "12yrUOCm", "block": "{\"statements\":[[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"EDIT PAGE\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"routeName\"]],false],[\"text\",\"\\n \\n\"],[\"open-element\",\"form\",[]],[\"static-attr\",\"id\",\"edit-work-form\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Workplace\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"model\",\"workplace\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Role\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"model\",\"role\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Description\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"class\",\"value\"],[\"form-control\",[\"get\",[\"model\",\"description\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Start Date\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"date\",\"form-control\",[\"get\",[\"model\",\"startDate\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"End Date\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"date\",\"form-control\",[\"get\",[\"model\",\"endDate\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Image\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"model\",\"image\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"detail-work-image\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"model\",\"image\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n\\n\\n  \\n  \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"changeImage\",[\"get\",[\"model\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Change Image\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\" \\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\" \\n\\n\\n\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\\n  \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"editWork\",[\"get\",[\"model\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Submit Work\"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"deleteWork\",[\"get\",[\"model\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Delete Work\"],[\"close-element\"],[\"text\",\"\\n  \\n  \"],[\"block\",[\"link-to\"],[\"work\"],null,0],[\"text\",\"\\n\\n\\n\\n\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Back to Work Index\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work/edit.hbs" } });
});
define("aileen/templates/work/edit/project", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "FGVkFFNA", "block": "{\"statements\":[[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work/edit/project.hbs" } });
});
define("aileen/templates/work/edit/project/edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "xIYpl2tk", "block": "{\"statements\":[[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"PROJECT DETAILS PAGE\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"form\",[]],[\"static-attr\",\"id\",\"edit-project-form\"],[\"flush-element\"],[\"text\",\"\\n   \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Title\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"model\",\"title\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Subtitle\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"model\",\"subtitle\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Description\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"class\",\"value\"],[\"form-control\",[\"get\",[\"model\",\"description\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Role\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"test\",\"form-control\",[\"get\",[\"model\",\"role\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Date\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"date\",\"form-control\",[\"get\",[\"model\",\"date\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Image\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"model\",\"media\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"editProject\",[\"get\",[\"model\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Edit Project\"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"deleteProject\",[\"get\",[\"model\",\"id\"]],[\"get\",[\"model\",\"workplace\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Delete Project\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\\n  \"],[\"block\",[\"link-to\"],[\"work.edit.project\"],null,0],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\\n  \\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Back to Project Index\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work/edit/project/edit.hbs" } });
});
define("aileen/templates/work/edit/project/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "QM0xLjPC", "block": "{\"statements\":[[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"All Projects\\n  \"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"work.edit.project.new\",[\"get\",[\"model\",\"id\"]]],null,2],[\"text\",\"  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\",\"projects\"]]],null,1]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\n      Edit Project\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"project\",\"title\"]],false],[\"text\",\"\\n    \"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"work.edit.project.edit\",[\"get\",[\"model\",\"id\"]],[\"get\",[\"project\",\"id\"]]],null,0],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"project\"]},{\"statements\":[[\"text\",\"    Add New Project\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work/edit/project/index.hbs" } });
});
define("aileen/templates/work/edit/project/new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "QwIPUGUX", "block": "{\"statements\":[[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"CREATE NEW PROJECT PAGE\"],[\"close-element\"],[\"text\",\"\\n \\n\"],[\"open-element\",\"form\",[]],[\"static-attr\",\"id\",\"new-project-form\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Title\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"title\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Subtitle\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"subtitle\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Description\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"class\",\"value\"],[\"form-control\",[\"get\",[\"description\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Role\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"role\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Date\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"date\",\"form-control\",[\"get\",[\"date\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Image\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"media\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n\\n  \\n\\n  \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"addProject\",[\"get\",[\"model\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Submit\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"block\",[\"link-to\"],[\"work.edit.project\"],null,0],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Close\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work/edit/project/new.hbs" } });
});
define("aileen/templates/work/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "8RGfE5B3", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"work-header\"],[\"flush-element\"],[\"text\",\" \\n  \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"\\n    Hi, I'm Aileen. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed metus erat, dapibus vitae risus ac, suscipit maximus quam. Cras molestie eros sed justo placerat, in dapibus ligula mollis. Mauris non enim et eros euismod malesuada. Nullam ac ipsum quis enim convallis efficitur non et justo. Pellentesque orci massa, pharetra vel ornare vel, efficitur sed ante.\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,2],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"work-component-container\"],[\"flush-element\"],[\"text\",\"\\n  \\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"text\",\"\\n  \\n\"],[\"close-element\"],[\"text\",\"\\n\\n \"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"append\",[\"helper\",[\"work-component\"],null,[[\"work\"],[[\"get\",[\"work\"]]]]],false],[\"text\",\" \\n    \\n\\n\"]],\"locals\":[\"work\"]},{\"statements\":[[\"text\",\"    New Work\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"link-to\"],[\"work.new\"],null,1]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work/index.hbs" } });
});
define("aileen/templates/work/new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "wLNdtFs2", "block": "{\"statements\":[[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"CREATE NEW WORK PAGE\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"form\",[]],[\"static-attr\",\"id\",\"new-work-form\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Workplace\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"workplace\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Role\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"role\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Description\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"class\",\"value\"],[\"form-control\",[\"get\",[\"description\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Start Date\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"date\",\"form-control\",[\"get\",[\"startDate\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"End Date\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"date\",\"form-control\",[\"get\",[\"endDate\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Image\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"image\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n\\n  \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"addWork\"]],[\"flush-element\"],[\"text\",\"Submit\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"block\",[\"link-to\"],[\"work\"],null,0],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Close\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work/new.hbs" } });
});
define('aileen/torii-adapters/application', ['exports', 'ember', 'emberfire/torii-adapters/firebase'], function (exports, _ember, _emberfireToriiAdaptersFirebase) {
  exports['default'] = _emberfireToriiAdaptersFirebase['default'].extend({
    firebase: _ember['default'].inject.service()
  });
});
define('aileen/torii-providers/firebase', ['exports', 'emberfire/torii-providers/firebase'], function (exports, _emberfireToriiProvidersFirebase) {
  exports['default'] = _emberfireToriiProvidersFirebase['default'];
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('aileen/config/environment', ['ember'], function(Ember) {
  var prefix = 'aileen';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("aileen/app")["default"].create({"LOG_ACTIVE_GENERATION":true,"LOG_TRANSITIONS":true,"LOG_TRANSITIONS_INTERNAL":true,"LOG_VIEW_LOOKUPS":true,"name":"aileen","version":"0.0.0+643e8149"});
}

/* jshint ignore:end */
//# sourceMappingURL=aileen.map
