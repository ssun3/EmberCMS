define('aileen/tests/unit/helpers/format-date-test', ['exports', 'aileen/helpers/format-date', 'qunit'], function (exports, _aileenHelpersFormatDate, _qunit) {

  (0, _qunit.module)('Unit | Helper | format date');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _aileenHelpersFormatDate.formatDate)([42]);
    assert.ok(result);
  });
});