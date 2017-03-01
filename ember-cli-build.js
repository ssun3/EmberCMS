/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    dovEnv: {
      clientAllowedKeys: ['GOOGLE_API_KEY', 'GOOGLE_CLIENT_ID', 'FIREBASE_API', 'FIREBASE_AUTH_DOMAIN', 'FIREBASE_DATABASE_URL', 'FIREBASE_STORAGE_BUCKET']
    }
    // Add options here
  });

  app.import('bower_components/moment/min/moment.min.js');

  app.import('bower_components/flickity/dist/flickity.pkgd.js');

  app.import('bower_components/jquery/dist/jquery.min.js');

  app.import('bower_components/mousetrap/mousetrap.min.js');

  app.import('bower_components/saga-gallery/dist/saga-gallery.min.css');

  app.import('bower_components/saga-gallery/dist/saga-gallery.min.js');

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
