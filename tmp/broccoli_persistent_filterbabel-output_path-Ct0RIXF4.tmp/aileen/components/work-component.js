define('aileen/components/work-component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    session: _ember['default'].inject.service('session'),
    projectsCount: _ember['default'].computed('work.projects.length', function () {
      return this.get('work.projects.length');
    })
  });
});