define('aileen/tests/controllers/work/edit.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | controllers/work/edit.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/work/edit.js should pass jshint.\ncontrollers/work/edit.js: line 27, col 11, Missing semicolon.\ncontrollers/work/edit.js: line 42, col 11, Missing semicolon.\ncontrollers/work/edit.js: line 43, col 25, \'e\' is defined but never used.\ncontrollers/work/edit.js: line 110, col 51, Expected \'===\' and instead saw \'==\'.\ncontrollers/work/edit.js: line 65, col 9, \'gapi\' is not defined.\ncontrollers/work/edit.js: line 66, col 9, \'gapi\' is not defined.\ncontrollers/work/edit.js: line 94, col 28, \'google\' is not defined.\ncontrollers/work/edit.js: line 95, col 23, \'google\' is not defined.\ncontrollers/work/edit.js: line 96, col 23, \'google\' is not defined.\ncontrollers/work/edit.js: line 110, col 18, \'google\' is not defined.\ncontrollers/work/edit.js: line 110, col 52, \'google\' is not defined.\ncontrollers/work/edit.js: line 111, col 26, \'google\' is not defined.\ncontrollers/work/edit.js: line 112, col 26, \'google\' is not defined.\n\n13 errors');
  });
});