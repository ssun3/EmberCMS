define('aileen/tests/controllers/work/edit.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/work/edit.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/work/edit.js should pass jshint.\ncontrollers/work/edit.js: line 35, col 25, \'e\' is defined but never used.\n\n1 error');
  });
});