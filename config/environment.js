/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'aileen',
    environment: environment,
    google: {
      developerKey: "AIzaSyBCOhpxKxUkwlQXWwRwbzsaYs5pmbI9yAY",
      clientId: "619862406222-ejqjpamted4nb655jv8408kgrvstssbv.apps.googleusercontent.com"
    },
    firebase: {
      apiKey: "AIzaSyAEc72YACi2i4iiSf7D87mz08aXidSoqUc",
      authDomain: "aileenzee-5e988.firebaseapp.com",
      databaseURL: "https://aileenzee-5e988.firebaseio.com",
      storageBucket: "aileenzee-5e988.appspot.com"
    },
    torii: {
      sessionServiceName:'session',
    },
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
