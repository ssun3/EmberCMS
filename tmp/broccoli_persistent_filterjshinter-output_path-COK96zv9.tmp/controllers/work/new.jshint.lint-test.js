QUnit.module('JSHint | controllers/work/new.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/work/new.js should pass jshint.\ncontrollers/work/new.js: line 102, col 51, Expected \'===\' and instead saw \'==\'.\ncontrollers/work/new.js: line 57, col 9, \'gapi\' is not defined.\ncontrollers/work/new.js: line 58, col 9, \'gapi\' is not defined.\ncontrollers/work/new.js: line 86, col 28, \'google\' is not defined.\ncontrollers/work/new.js: line 87, col 23, \'google\' is not defined.\ncontrollers/work/new.js: line 88, col 23, \'google\' is not defined.\ncontrollers/work/new.js: line 102, col 18, \'google\' is not defined.\ncontrollers/work/new.js: line 102, col 52, \'google\' is not defined.\ncontrollers/work/new.js: line 103, col 26, \'google\' is not defined.\ncontrollers/work/new.js: line 104, col 26, \'google\' is not defined.\n\n10 errors');
});
