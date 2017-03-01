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
define('aileen/components/project-component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    session: _ember['default'].inject.service('session'),
    images: _ember['default'].computed('project.images.[]', function () {
      return this.get('project.images');
    }),
    firstImage: _ember['default'].computed('images', function () {
      return this.get('images.firstObject');
    })
  });
});
define('aileen/components/project-images-carousel', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    session: _ember['default'].inject.service('session'),
    willRender: function willRender() {
      var elem = document.querySelector('.main-carousel');
      var flkty = new Flickity(elem, {
        // options
        cellAlign: 'left',
        contain: true,
        wrapAround: true
      });
    }

  });
});
define('aileen/components/project-modal', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        session: _ember['default'].inject.service('session'),
        projectID: _ember['default'].computed('project.id', function () {
            return this.get('project.id');
        }),
        didInsertElement: function didInsertElement() {
            // instanciate new gallery
            var gallery = new SagaGallery(this.get('projectID'), {
                onOpen: function onOpen() {
                    console.log('gallery open');
                },
                onClose: function onClose() {
                    console.log('gallery closed');
                },
                loop: true
            });

            // open gallery
            gallery.open();

            // close gallery
            gallery.close();

            // check if gallery is opened
            if (gallery.isOpen())
                // do something ...

                // display next image
                gallery.next();

            // display prev image
            gallery.prev();
        }
    });
});
define('aileen/components/scroll-component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    didInsertElement: function didInsertElement() {
      self = this;
      this.$(document).on('keydown', function (e) {
        console.log(e);
        var dir;
        if (e.keyCode === 39) {
          dir = 1;
        }
        if (e.keyCode === 37) {
          dir = -1;
        }
        if (dir) {
          var pixelScroll = dir * 460;
          //self.$('#work-components-container').scrollLeft(self.$('#work-components-container').scrollLeft() + pixelScroll);
          self.$('#work-components-container').animate({ scrollLeft: self.$('#work-components-container').scrollLeft() + pixelScroll }, 400, 'swing');
        }
      });
    }
  });
});
define('aileen/components/torii-iframe-placeholder', ['exports', 'torii/components/torii-iframe-placeholder'], function (exports, _toriiComponentsToriiIframePlaceholder) {
  exports['default'] = _toriiComponentsToriiIframePlaceholder['default'];
});
define('aileen/components/work-component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    session: _ember['default'].inject.service('session'),
    projectsCount: _ember['default'].computed('work.projects.length', function () {
      return this.get('work.projects.length');
    }),
    isProjects: _ember['default'].computed('work.projects.length', function () {
      return this.get('work.projects.length') > 0 ? true : false;
    }),
    isProjectsPlural: _ember['default'].computed('work.projects.length', function () {
      return this.get('work.projects.length') > 1 ? "projects" : "project";
    })
  });
});
define('aileen/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    isProjectEditRoute: _ember['default'].computed.equal('currentRouteName', 'work.edit.project.edit.media.index'),
    isWorkEditRoute: _ember['default'].computed.equal('currentRouteName', 'work.edit.index'),
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
define('aileen/controllers/work/edit', ['exports', 'ember', 'aileen/config/environment'], function (exports, _ember, _aileenConfigEnvironment) {
  exports['default'] = _ember['default'].Controller.extend({
    applicationController: _ember['default'].inject.controller('application'),
    isWorkEdit: _ember['default'].computed.alias('applicationController.isWorkEditRoute'),
    actions: {

      deleteWorkWarning: function deleteWorkWarning(id) {
        var isDeleteOkay = confirm("Are you sure?");
        if (isDeleteOkay == true) {
          this.send('deleteWork', id);
        }
      },

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
          work.save().then(function () {
            self.transitionToRoute('work');
          });
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
          work.destroyRecord().then(function () {
            self.transitionToRoute('work');
          });
        })['catch'](function (e) {
          console.log("An error has occured");
        });
      },

      changeImage: function changeImage(id) {
        var self = this;
        // The Browser API key obtained from the Google Developers Console.
        var developerKey = _aileenConfigEnvironment['default'].google.developerKey;

        // The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
        var clientId = _aileenConfigEnvironment['default'].google.clientId;

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
            //addView(google.picker.ViewId.DOCS_IMAGES_AND_VIDEOS).
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
            //imageSRC = "https://drive.google.com/file/d/" + doc[google.picker.Document.ID] + "/preview"
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
    applicationController: _ember['default'].inject.controller('application'),
    isProjectEdit: _ember['default'].computed.alias('applicationController.isProjectEditRoute'),
    actions: {
      deleteProjectWarning: function deleteProjectWarning(projectID, workID) {
        var isDeleteOkay = confirm("Are you sure?");
        if (isDeleteOkay == true) {
          this.send('deleteProject', projectID, workID);
        }
      },

      editProject: function editProject(projectID, workID) {
        var self = this;
        var title = this.get('model.title');
        var subtitle = this.get('model.subtitle');
        var description = this.get('model.description');
        var role = this.get('model.role');
        var date = this.get('model.date');

        this.store.findRecord('project', projectID).then(function (project) {
          project.set('title', title);
          project.set('subtitle', subtitle);
          project.set('description', description);
          project.set('role', role);
          project.set('date', date);
          //project.set('media', media);

          //save to FB
          project.save().then(function () {
            self.transitionToRoute('work.projects', workID);
          });
        });
      },

      deleteProject: function deleteProject(projectID, workID) {
        var self = this;
        var work = this.store.peekRecord('work', workID);
        var project = this.store.peekRecord('project', projectID);
        var deletions = project.get('images').map(function (image) {
          return image.destroyRecord();
        });
        _ember['default'].RSVP.all(deletions).then(function () {
          project.destroyRecord().then(function () {
            work.save().then(function () {
              self.transitionToRoute('work.projects', workID);
            });
          });
        });
      }
    }
  });
});
define("aileen/controllers/work/edit/project/edit/media/edit", ["exports", "ember", "aileen/config/environment"], function (exports, _ember, _aileenConfigEnvironment) {
  exports["default"] = _ember["default"].Controller.extend({
    actions: {
      deleteMediaWarning: function deleteMediaWarning(mediaID, projectID) {
        var isDeleteOkay = confirm("Are you sure?");
        if (isDeleteOkay == true) {
          this.send('deleteMedia', mediaID, projectID);
        }
      },
      editMedia: function editMedia(id) {
        var self = this;
        var title = self.get('model.title');
        var description = self.get('model.description');
        var url = self.get('model.url');
        var mimeType = self.get('model.mimeType');

        this.store.findRecord('image', id).then(function (image) {
          image.set('title', title);
          image.set('description', description);
          image.set('url', url);
          image.set('mimeType', mimeType);
          //save to FB
          image.save().then(function () {
            self.transitionToRoute('work.edit.project.edit.media');
          });
        });
      },
      deleteMedia: function deleteMedia(mediaID, projectID) {
        var self = this;
        var project = this.store.peekRecord('project', projectID);
        var media = this.store.peekRecord('image', mediaID);
        media.destroyRecord().then(function () {
          project.save().then(function () {
            self.transitionToRoute('work.edit.project.edit.media');
          });
        });
      },

      changeMedia: function changeMedia(id) {
        var self = this;
        // The Browser API key obtained from the Google Developers Console.
        var developerKey = _aileenConfigEnvironment["default"].google.developerKey;

        // The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
        var clientId = _aileenConfigEnvironment["default"].google.clientId;

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
            var picker = new google.picker.PickerBuilder().addView(google.picker.ViewId.PHOTOS).addView(google.picker.ViewId.PHOTO_UPLOAD).addView(google.picker.ViewId.DOCS_VIDEOS).addView(new google.picker.DocsUploadView()).setOAuthToken(oauthToken).setDeveloperKey(developerKey).setCallback(pickerCallback).build();
            picker.setVisible(true);
          }
        }

        // A simple callback implementation.
        function pickerCallback(data) {
          var mediaSRC = 'nothing';
          var mediaType = 'nothing';
          if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
            var doc = data[google.picker.Response.DOCUMENTS][0];
            console.log(doc);
            mediaType = doc[google.picker.Document.TYPE];
            if (mediaType === "video") {
              mediaSRC = "https://drive.google.com/file/d/" + doc[google.picker.Document.ID] + "/preview";
            } else if (mediaType === "photo") {
              mediaSRC = doc[google.picker.Document.THUMBNAILS][3].url;
            } else {
              mediaSRC = "unavailable";
            }
            //console.log(doc);
            //console.log(google.picker.Document);
            updateImage(mediaSRC, mediaType);
          }
        }

        function updateImage(src, type) {
          self.store.findRecord('image', id).then(function (image) {
            image.set("url", src);
            image.set("mimeType", type);
          });
        }

        onApiLoad();
      }

    }

  });
});
define('aileen/controllers/work/edit/project/edit/media/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({});
});
define('aileen/controllers/work/edit/project/edit/media/new', ['exports', 'ember', 'aileen/config/environment'], function (exports, _ember, _aileenConfigEnvironment) {
  exports['default'] = _ember['default'].Controller.extend({
    isEmptyMedia: _ember['default'].computed.equal('mediaURL', ''),
    isImage: _ember['default'].computed('mediaMimeType', function () {
      return this.get("mediaMimeType") === "photo" ? true : false;
    }),
    isVideo: _ember['default'].computed('mediaMimeType', function () {
      return this.get("mediaMimeType") === "video" ? true : false;
    }),
    mediaURL: "",
    mediaMimeType: "",
    actions: {
      addMedia: function addMedia(projectID) {
        var self = this;
        var title = self.get('title');
        var description = self.get('description');
        var project = self.store.peekRecord('project', projectID);
        var url = self.get('mediaURL');
        var mimeType = self.get('mediaMimeType');

        //create new image
        var newImage = self.store.createRecord('image', {
          title: title,
          description: description,
          url: url,
          mimeType: mimeType,
          isMainImage: false
        });

        //add to project
        project.get('images').pushObject(newImage);

        //save to FB
        newImage.save().then(function () {
          project.save().then(function () {
            self.setProperties({
              title: '',
              description: '',
              mediaURL: '',
              mediaMimeType: ''
            });
            self.transitionToRoute('work.edit.project.edit.media');
          });
        });
      },

      uploadMedia: function uploadMedia() {
        var self = this;
        // The Browser API key obtained from the Google Developers Console.
        var developerKey = _aileenConfigEnvironment['default'].google.developerKey;

        // The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
        var clientId = _aileenConfigEnvironment['default'].google.clientId;

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
            var picker = new google.picker.PickerBuilder().addView(google.picker.ViewId.PHOTOS).addView(google.picker.ViewId.PHOTO_UPLOAD).addView(google.picker.ViewId.DOCS_VIDEOS).addView(new google.picker.DocsUploadView()).setOAuthToken(oauthToken).setDeveloperKey(developerKey).setCallback(pickerCallback).build();
            picker.setVisible(true);
          }
        }

        // A simple callback implementation.
        function pickerCallback(data) {
          var mediaSRC = 'nothing';
          var mediaType = 'nothing';
          if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
            var doc = data[google.picker.Response.DOCUMENTS][0];
            console.log(doc);
            mediaType = doc[google.picker.Document.TYPE];
            if (mediaType === "video") {
              mediaSRC = "https://drive.google.com/file/d/" + doc[google.picker.Document.ID] + "/preview";
            } else if (mediaType === "photo") {
              mediaSRC = doc[google.picker.Document.THUMBNAILS][3].url;
            } else {
              mediaSRC = "unavailable";
            }
            //console.log(doc);
            //console.log(google.picker.Document);
            updateImage(mediaSRC, mediaType);
          }
        }

        function updateImage(src, type) {
          self.set("mediaURL", src);
          self.set("mediaMimeType", type);
        }

        onApiLoad();
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
        var workplace = this.store.peekRecord('work', workID);

        //create new project

        var newProject = this.store.createRecord('project', {
          title: title,
          subtitle: subtitle,
          description: description,
          role: role,
          date: new Date(date)
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
              date: ''
            });
            self.transitionToRoute('work.projects', workID);
          });
        });
      }

    }
  });
});
define('aileen/controllers/work/new', ['exports', 'ember', 'aileen/config/environment'], function (exports, _ember, _aileenConfigEnvironment) {
  exports['default'] = _ember['default'].Controller.extend({
    isEmptyImage: _ember['default'].computed.equal('imageURL', ''),
    imageURL: "",
    actions: {
      addWork: function addWork() {
        var self = this;
        var workplace = self.get('workplace');
        var role = self.get('role');
        var description = self.get('description');
        var startDate = self.get('startDate');
        var endDate = self.get('endDate');
        var image = self.get('imageURL');

        //create new work
        var newWork = self.store.createRecord('work', {
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
      },

      uploadImage: function uploadImage() {
        var self = this;
        // The Browser API key obtained from the Google Developers Console.
        var developerKey = _aileenConfigEnvironment['default'].google.developerKey;

        // The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
        var clientId = _aileenConfigEnvironment['default'].google.clientId;

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

        function updateImage(imageSRC) {
          self.set("imageURL", imageSRC);
        }

        onApiLoad();
      }

    } //end actions
  });
});
define('aileen/controllers/work/projects', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    evenProjects: _ember['default'].computed('model.projects', function () {
      return this.get('model.projects').filter(function (item, index, self) {
        return index % 2 === 0;
      });
    }),
    oddProjects: _ember['default'].computed('model.projects', function () {
      return this.get('model.projects').filter(function (item, index, self) {
        return index % 2 !== 0;
      });
    })
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
define('aileen/helpers/format-date', ['exports', 'ember'], function (exports, _ember) {
  exports.formatDate = formatDate;

  function formatDate(params) {
    return moment(params[0]).format('YYYY');
  }

  exports['default'] = _ember['default'].Helper.helper(formatDate);
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
define('aileen/models/image', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    title: _emberData['default'].attr('string'),
    description: _emberData['default'].attr('string'),
    url: _emberData['default'].attr('string'),
    mimeType: _emberData['default'].attr('string'),
    project: _emberData['default'].belongsTo('project', { async: true }),
    isImage: Ember.computed.equal('mimeType', 'photo'),
    isVideo: Ember.computed.equal('mimeType', 'video')
  });
});
define('aileen/models/project', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    title: _emberData['default'].attr('string'),
    subtitle: _emberData['default'].attr('string'),
    description: _emberData['default'].attr('string'),
    role: _emberData['default'].attr('string'),
    date: _emberData['default'].attr('date'),
    images: _emberData['default'].hasMany('image', { async: true }),
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
    this.route('work', { path: "/" }, function () {
      this.route('edit', { path: ":work_id" }, function () {
        this.route('project', function () {
          this.route('new');
          this.route('edit', { path: ":project_id" }, function () {
            this.route('media', function () {
              this.route('new');
              this.route('edit', { path: ":image_id" });
            });
          });
        });
      });
      this.route('new');
      this.route('projects', { path: ":work_id/projects" });
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
define('aileen/routes/work/edit/project/edit/media', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('aileen/routes/work/edit/project/edit/media/edit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('aileen/routes/work/edit/project/edit/media/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('aileen/routes/work/edit/project/edit/media/new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
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
define('aileen/routes/work/projects', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
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
  exports["default"] = Ember.HTMLBars.template({ "id": "XqQSerXy", "block": "{\"statements\":[[\"text\",\"  \"],[\"append\",[\"unknown\",[\"project-modal\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/about.hbs" } });
});
define("aileen/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "fLaWMSUu", "block": "{\"statements\":[[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"application-container\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,0],[\"text\",\"  \"],[\"partial\",\"navbar\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"outlet-container\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"button is-dark sign-out-btn\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signOut\"]],[\"flush-element\"],[\"text\",\"Sign Out\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":true}", "meta": { "moduleName": "aileen/templates/application.hbs" } });
});
define("aileen/templates/components/project-component", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "vp+4AmUV", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"project-component__image\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"project-modal\"],null,[[\"project\"],[[\"get\",[\"project\"]]]]],false],[\"text\",\" \\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"project-component__details\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"project-component__details-title\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"project\",\"title\"]],false],[\"text\",\" - \"],[\"append\",[\"unknown\",[\"project\",\"role\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"project-component__details-description\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"project\",\"description\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,1],[\"close-element\"],[\"text\",\" \"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    Edit Project\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"link-to\"],[\"work.edit.project.edit.media\",[\"get\",[\"project\",\"workplace\",\"id\"]],[\"get\",[\"project\",\"id\"]]],[[\"class\"],[\"button is-dark work-edit-btn\"]],0]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/components/project-component.hbs" } });
});
define("aileen/templates/components/project-images-carousel", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "xrigs4Tq", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"main-carousel carousel\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\",\"images\"]]],null,3],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Edit Media \"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"iframe\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"image\",\"url\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\" \"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"image\",\"url\"]],null],[\"flush-element\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"carousel-cell\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"block\",[\"if\"],[[\"get\",[\"image\",\"isImage\"]]],null,2],[\"text\",\"\\n    \"],[\"block\",[\"if\"],[[\"get\",[\"image\",\"isVideo\"]]],null,1],[\"text\",\"\\n\\n    \"],[\"block\",[\"link-to\"],[\"work.edit.project.edit.media.edit\",[\"get\",[\"image\",\"id\"]]],[[\"class\"],[\"edit-media-link\"]],0],[\"text\",\"\\n\\n\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"image\"]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/components/project-images-carousel.hbs" } });
});
define("aileen/templates/components/project-modal", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "R7Kj/VTd", "block": "{\"statements\":[[\"open-element\",\"ul\",[]],[\"dynamic-attr\",\"id\",[\"unknown\",[\"project\",\"id\"]],null],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"project\",\"images\"]]],null,2],[\"text\",\"  \\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"iframe\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"image\",\"url\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\" \"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"image\",\"url\"]],null],[\"flush-element\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\" \\n      \"],[\"block\",[\"if\"],[[\"get\",[\"image\",\"isImage\"]]],null,1],[\"text\",\"\\n      \"],[\"block\",[\"if\"],[[\"get\",[\"image\",\"isVideo\"]]],null,0],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"saga-description\"],[\"flush-element\"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Lorem\"],[\"close-element\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"Ipsum dolor sit amet\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"image\"]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/components/project-modal.hbs" } });
});
define("aileen/templates/components/scroll-component", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "OtTRmkzb", "block": "{\"statements\":[[\"yield\",\"default\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/components/scroll-component.hbs" } });
});
define("aileen/templates/components/work-component", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "2tzWRyaf", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"work-image\"],[\"flush-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"link-to\"],[\"work.projects\",[\"get\",[\"work\",\"id\"]]],null,3],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"work-description\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"work-details\"],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"work-role\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"work\",\"role\"]],false],[\"text\",\" - \"],[\"close-element\"],[\"append\",[\"unknown\",[\"work\",\"description\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"work-dates\"],[\"flush-element\"],[\"append\",[\"helper\",[\"format-date\"],[[\"get\",[\"work\",\"startDate\"]]],null],false],[\"text\",\" - \"],[\"append\",[\"helper\",[\"format-date\"],[[\"get\",[\"work\",\"endDate\"]]],null],false],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isProjects\"]]],null,2],[\"close-element\"],[\"text\",\"\\n\\n      \\n\\n\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,1],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    Edit Work\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"work.edit\",[\"get\",[\"work\",\"id\"]]],[[\"class\"],[\"button is-dark work-edit-btn\"]],0],[\"text\",\"  \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"work-projects\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"projectsCount\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"isProjectsPlural\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"work-projects-link\"],[\"flush-element\"],[\"text\",\"View Projects\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"work\",\"image\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/components/work-component.hbs" } });
});
define("aileen/templates/login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "pd85O45b", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,1,0],[\"text\",\"\\n\\n\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\n\"],[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"form-container box\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signIn\"],[[\"on\"],[\"submit\"]]],[\"flush-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-control\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Email\"],[\"close-element\"],[\"text\",\"\\n        \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"input\",[\"get\",[\"email\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Password\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"password\",\"input\",[\"get\",[\"password\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"button is-primary\"],[\"static-attr\",\"type\",\"submit\"],[\"flush-element\"],[\"text\",\"Submit\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"form-container box\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\" Logged in as \"],[\"append\",[\"unknown\",[\"session\",\"uid\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/login.hbs" } });
});
define("aileen/templates/navbar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ZTlU9l3/", "block": "{\"statements\":[[\"open-element\",\"nav\",[]],[\"static-attr\",\"id\",\"main-nav\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"work\"],null,1],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"about\"],null,0],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"flush-element\"],[\"text\",\"Contact\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"About\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Work\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/navbar.hbs" } });
});
define("aileen/templates/work", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "G+Us3gpG", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"#work-page\"],[\"flush-element\"],[\"text\",\"\\n  \\n  \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\\n\\n\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\\n\\n\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work.hbs" } });
});
define("aileen/templates/work/edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "2pfyZgW6", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isWorkEdit\"]]],null,3],[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Close\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"upload-new-image\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"class\",\"upload-new-image-image\"],[\"dynamic-attr\",\"src\",[\"unknown\",[\"model\",\"image\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"upload-new-image-text\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"changeImage\",[\"get\",[\"model\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Change Image\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"upload-new-image\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"upload-new-image-plus\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"changeImage\",[\"get\",[\"model\",\"id\"]]]],[\"flush-element\"],[\"text\",\"+\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"upload-new-image-text\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"changeImage\",[\"get\",[\"model\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Change Image\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\n\\n \\n\"],[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"form-container box\"],[\"flush-element\"],[\"text\",\"\\n  \\n\"],[\"block\",[\"unless\"],[[\"get\",[\"model\",\"image\"]]],null,2],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"image\"]]],null,1],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-control\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Workplace\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"input\",[\"get\",[\"model\",\"workplace\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Role\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"input\",[\"get\",[\"model\",\"role\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Description\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"class\",\"value\"],[\"textarea\",[\"get\",[\"model\",\"description\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Start Date\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"date\",\"input\",[\"get\",[\"model\",\"startDate\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"End Date\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"date\",\"input\",[\"get\",[\"model\",\"endDate\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"button is-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"editWork\",[\"get\",[\"model\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Save Work\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"button is-danger\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"deleteWorkWarning\",[\"get\",[\"model\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Delete Work\"],[\"close-element\"],[\"text\",\" \\n    \"],[\"block\",[\"link-to\"],[\"work\"],[[\"class\"],[\"button is-link\"]],0],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\" \\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work/edit.hbs" } });
});
define("aileen/templates/work/edit/project", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "FGVkFFNA", "block": "{\"statements\":[[\"text\",\"\\n\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work/edit/project.hbs" } });
});
define("aileen/templates/work/edit/project/edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "2GLvqA4P", "block": "{\"statements\":[[\"text\",\" \\n\"],[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"form-container box\"],[\"flush-element\"],[\"text\",\"\\n  \\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \\n\"],[\"block\",[\"if\"],[[\"get\",[\"isProjectEdit\"]]],null,1],[\"close-element\"],[\"text\",\"\\n\\n  \\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Close\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\n\\n     \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-control\"],[\"flush-element\"],[\"text\",\"\\n     \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Project Title\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"input\",[\"get\",[\"model\",\"title\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Project Subtitle\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"input\",[\"get\",[\"model\",\"subtitle\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Description\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"class\",\"value\"],[\"textarea\",[\"get\",[\"model\",\"description\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Role\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"test\",\"input\",[\"get\",[\"model\",\"role\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Date\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"date\",\"input\",[\"get\",[\"model\",\"date\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"button is-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"editProject\",[\"get\",[\"model\",\"id\"]],[\"get\",[\"model\",\"workplace\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Save Project\"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"button is-danger\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"deleteProjectWarning\",[\"get\",[\"model\",\"id\"]],[\"get\",[\"model\",\"workplace\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Delete Project\"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"block\",[\"link-to\"],[\"work.projects\",[\"get\",[\"model\",\"workplace\",\"id\"]]],[[\"class\"],[\"button is-link\"]],0],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work/edit/project/edit.hbs" } });
});
define("aileen/templates/work/edit/project/edit/media", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "gVIiMtwi", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work/edit/project/edit/media.hbs" } });
});
define("aileen/templates/work/edit/project/edit/media/edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "wF93DjW4", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"open-element\",\"form\",[]],[\"static-attr\",\"id\",\"edit-project-form\"],[\"flush-element\"],[\"text\",\"\\n\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"upload-new-image\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"isVideo\"]]],null,2],[\"text\",\"\\n  \"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"isImage\"]]],null,1],[\"text\",\"\\n  \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"upload-new-image-text\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"changeMedia\",[\"get\",[\"model\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Change Media\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-control\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Title\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"input\",[\"get\",[\"model\",\"title\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Description\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"class\",\"value\"],[\"textarea\",[\"get\",[\"model\",\"description\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"button is-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"editMedia\",[\"get\",[\"model\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Save Media\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"button is-danger\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"deleteMediaWarning\",[\"get\",[\"model\",\"id\"]],[\"get\",[\"model\",\"project\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Delete Media\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"block\",[\"link-to\"],[\"work.edit.project.edit.media.index\"],[[\"class\"],[\"button is-link\"]],0],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Close\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"model\",\"url\"]],null],[\"static-attr\",\"class\",\"upload-new-image-image\"],[\"flush-element\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"iframe\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"model\",\"url\"]],null],[\"static-attr\",\"class\",\"upload-new-image-image\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" \"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work/edit/project/edit/media/edit.hbs" } });
});
define("aileen/templates/work/edit/project/edit/media/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "E2gHNYOb", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"model\",\"images\"]]],null,1],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"work.edit.project.edit.media.new\"],[[\"class\"],[\"button is-dark\"]],0],[\"text\",\"\\n\\n\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  Add New Media\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"project-images-carousel\"],null,[[\"model\"],[[\"get\",[\"model\"]]]]],false],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\" \\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work/edit/project/edit/media/index.hbs" } });
});
define("aileen/templates/work/edit/project/edit/media/new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ku+85aPE", "block": "{\"statements\":[[\"text\",\"\\n\"],[\"open-element\",\"form\",[]],[\"static-attr\",\"id\",\"new-project-form\"],[\"flush-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isEmptyMedia\"]]],null,4],[\"text\",\"\\n\"],[\"block\",[\"unless\"],[[\"get\",[\"isEmptyMedia\"]]],null,3],[\"text\",\"\\n\\n\\n\\n\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-control\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Title\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"input\",[\"get\",[\"title\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Description\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"class\",\"value\"],[\"textarea\",[\"get\",[\"description\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"button is-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"addMedia\",[\"get\",[\"model\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Create Media\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"block\",[\"link-to\"],[\"work.edit.project.edit.media\"],[[\"class\"],[\"button is-link\"]],0],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Close\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"mediaURL\"]],null],[\"static-attr\",\"class\",\"upload-new-image-image\"],[\"flush-element\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"iframe\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"mediaURL\"]],null],[\"static-attr\",\"class\",\"upload-new-image-image\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" \"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"upload-new-image\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"block\",[\"if\"],[[\"get\",[\"isVideo\"]]],null,2],[\"text\",\"\\n      \"],[\"block\",[\"if\"],[[\"get\",[\"isImage\"]]],null,1],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"upload-new-image-text\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"uploadMedia\"]],[\"flush-element\"],[\"text\",\"Upload New Media\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"upload-new-image\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"upload-new-image-plus\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"uploadMedia\"]],[\"flush-element\"],[\"text\",\"+\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"upload-new-image-text\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"uploadMedia\"]],[\"flush-element\"],[\"text\",\"Upload New Media\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work/edit/project/edit/media/new.hbs" } });
});
define("aileen/templates/work/edit/project/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "82olpfQQ", "block": "{\"statements\":[],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work/edit/project/index.hbs" } });
});
define("aileen/templates/work/edit/project/new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ka7mOmP4", "block": "{\"statements\":[[\"text\",\" \"],[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"form-container box\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-control\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Project Title\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"input\",[\"get\",[\"title\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Project Subtitle\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"input\",[\"get\",[\"subtitle\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Description\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"class\",\"value\"],[\"textarea\",[\"get\",[\"description\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Role\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"input\",[\"get\",[\"role\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Date\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"date\",\"input\",[\"get\",[\"date\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"button is-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"addProject\",[\"get\",[\"model\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Create Project\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"block\",[\"link-to\"],[\"work.projects\",[\"get\",[\"model\",\"id\"]]],[[\"class\"],[\"button is-link\"]],0],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Close\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work/edit/project/new.hbs" } });
});
define("aileen/templates/work/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ZO6YJEar", "block": "{\"statements\":[[\"block\",[\"scroll-component\"],null,null,3]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"append\",[\"helper\",[\"work-component\"],null,[[\"work\",\"class\"],[[\"get\",[\"work\"]],\"work-component\"]]],false],[\"text\",\" \\n\"]],\"locals\":[\"work\"]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"upload-new-work-plus\"],[\"flush-element\"],[\"text\",\"+\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"upload-new-work-text\"],[\"flush-element\"],[\"text\",\"Upload New Image\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"work-component\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"create-new\"],[\"flush-element\"],[\"text\",\"\\n\\n\\n\"],[\"block\",[\"link-to\"],[\"work.new\"],[[\"class\"],[\"create-new-link\"]],1],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"hide-scrollbar\"],[\"flush-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"work-components-container\"],[\"flush-element\"],[\"text\",\"\\n  \\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"work-component work-head\"],[\"flush-element\"],[\"text\",\" \\n    \"],[\"open-element\",\"h1\",[]],[\"flush-element\"],[\"text\",\"Hi, I'm Aileen. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"arrow\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"/assets/images/Arrow.png\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"arrow\"],[\"static-attr\",\"id\",\"rightarrow\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"src\",\"/assets/images/Arrow.png\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \\n    \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"arrow_instructions\"],[\"flush-element\"],[\"text\",\"Use your keys to navigate\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\" \\n\\n\\n\\n\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,2],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"text\",\"\\n  \\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work/index.hbs" } });
});
define("aileen/templates/work/new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "uzWi8Vgs", "block": "{\"statements\":[[\"open-element\",\"form\",[]],[\"static-attr\",\"class\",\"form-container box\"],[\"flush-element\"],[\"text\",\"\\n   \\n\"],[\"block\",[\"if\"],[[\"get\",[\"isEmptyImage\"]]],null,2],[\"text\",\"\\n\"],[\"block\",[\"unless\"],[[\"get\",[\"isEmptyImage\"]]],null,1],[\"text\",\"\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-control\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Workplace\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"input\",[\"get\",[\"workplace\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Role\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"input\",[\"get\",[\"role\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\" \\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Description\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"class\",\"value\"],[\"textarea\",[\"get\",[\"description\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"Start Date\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"date\",\"input\",[\"get\",[\"startDate\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"class\",\"label\"],[\"flush-element\"],[\"text\",\"End Date\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"date\",\"input\",[\"get\",[\"endDate\"]]]]],false],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"control\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"button is-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"addWork\"]],[\"flush-element\"],[\"text\",\"Create Work\"],[\"close-element\"],[\"text\",\"\\n      \"],[\"block\",[\"link-to\"],[\"work\"],[[\"class\"],[\"button is-link\"]],0],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Close\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"upload-new-image\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"img\",[]],[\"static-attr\",\"class\",\"upload-new-image-image\"],[\"dynamic-attr\",\"src\",[\"unknown\",[\"imageURL\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"upload-new-image-text\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"uploadImage\",[\"get\",[\"model\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Upload New Image\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"upload-new-image\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"upload-new-image-plus\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"uploadImage\",[\"get\",[\"model\",\"id\"]]]],[\"flush-element\"],[\"text\",\"+\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"upload-new-image-text\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"uploadImage\",[\"get\",[\"model\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Upload New Image\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work/new.hbs" } });
});
define("aileen/templates/work/projects", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "nP8zq7XL", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"projects_page\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"work-component-individual\"],[\"flush-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"model\",\"image\"]],null],[\"dynamic-attr\",\"alt\",[\"concat\",[[\"unknown\",[\"model\",\"workplace\"]]]]],[\"static-attr\",\"class\",\"work-component-individual__image\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" \\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"work-component-individual__description\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"work-component-individual__description__paragraph\"],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"work-role\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"role\"]],false],[\"text\",\" - \"],[\"close-element\"],[\"append\",[\"unknown\",[\"model\",\"description\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"work-component-individual__description__dates\"],[\"flush-element\"],[\"append\",[\"helper\",[\"format-date\"],[[\"get\",[\"model\",\"startDate\"]]],null],false],[\"text\",\" - \"],[\"append\",[\"helper\",[\"format-date\"],[[\"get\",[\"model\",\"endDate\"]]],null],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"project-section\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"columns\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"column is-six\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,3],[\"block\",[\"each\"],[[\"get\",[\"evenProjects\"]]],null,1],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"column is-six\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"oddProjects\"]]],null,0],[\"text\",\"     \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"        \"],[\"append\",[\"helper\",[\"project-component\"],null,[[\"project\",\"class\"],[[\"get\",[\"project\"]],\"project-component odd\"]]],false],[\"text\",\"\\n\"]],\"locals\":[\"project\"]},{\"statements\":[[\"text\",\"        \"],[\"append\",[\"helper\",[\"project-component\"],null,[[\"project\",\"class\"],[[\"get\",[\"project\"]],\"project-component even\"]]],false],[\"text\",\"\\n\"]],\"locals\":[\"project\"]},{\"statements\":[[\"text\",\"              \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"upload-new-work-plus\"],[\"flush-element\"],[\"text\",\"+\"],[\"close-element\"],[\"text\",\"\\n              \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"upload-new-work-text\"],[\"flush-element\"],[\"text\",\"Upload New Project\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"          \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"project-component even\"],[\"flush-element\"],[\"text\",\"\\n            \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"create-new-project-link\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"work.new\"],[[\"class\"],[\"create-new-link\"]],2],[\"text\",\"            \"],[\"close-element\"],[\"text\",\"\\n          \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work/projects.hbs" } });
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
  require("aileen/app")["default"].create({"LOG_ACTIVE_GENERATION":true,"LOG_TRANSITIONS":true,"LOG_TRANSITIONS_INTERNAL":true,"LOG_VIEW_LOOKUPS":true,"name":"aileen","version":"0.0.0+443e7909"});
}

/* jshint ignore:end */
//# sourceMappingURL=aileen.map
