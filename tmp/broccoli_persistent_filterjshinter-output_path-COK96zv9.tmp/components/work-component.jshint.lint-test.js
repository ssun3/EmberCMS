QUnit.module('JSHint | components/work-component.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'components/work-component.js should pass jshint.\ncomponents/work-component.js: line 12, col 73, Missing semicolon.\n\n1 error');
});
