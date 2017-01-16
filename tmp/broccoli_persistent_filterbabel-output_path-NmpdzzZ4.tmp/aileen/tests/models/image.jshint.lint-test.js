define('aileen/tests/models/image.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/image.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'models/image.js should pass jshint.\nmodels/image.js: line 10, col 12, \'Ember\' is not defined.\nmodels/image.js: line 11, col 12, \'Ember\' is not defined.\n\n2 errors');
  });
});