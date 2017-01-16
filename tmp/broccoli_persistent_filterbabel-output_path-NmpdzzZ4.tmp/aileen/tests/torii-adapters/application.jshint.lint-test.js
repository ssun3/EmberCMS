define('aileen/tests/torii-adapters/application.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | torii-adapters/application.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'torii-adapters/application.js should pass jshint.');
  });
});