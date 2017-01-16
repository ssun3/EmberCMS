define('aileen/tests/test-helper', ['exports', 'aileen/tests/helpers/resolver', 'ember-qunit'], function (exports, _aileenTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_aileenTestsHelpersResolver['default']);
});