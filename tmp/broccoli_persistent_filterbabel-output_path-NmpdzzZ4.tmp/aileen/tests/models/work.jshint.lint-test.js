define('aileen/tests/models/work.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/work.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/work.js should pass jshint.');
  });
});