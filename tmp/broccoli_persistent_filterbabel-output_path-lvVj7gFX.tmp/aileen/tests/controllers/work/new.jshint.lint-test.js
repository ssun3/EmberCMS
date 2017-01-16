define('aileen/tests/controllers/work/new.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/work/new.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/work/new.js should pass jshint.');
  });
});