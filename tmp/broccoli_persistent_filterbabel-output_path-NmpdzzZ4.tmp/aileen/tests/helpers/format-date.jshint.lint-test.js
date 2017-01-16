define('aileen/tests/helpers/format-date.jshint.lint-test', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/format-date.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/format-date.js should pass jshint.\nhelpers/format-date.js: line 4, col 10, \'moment\' is not defined.\n\n1 error');
  });
});