define('aileen/components/project-component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    session: _ember['default'].inject.service('session')
  });
});