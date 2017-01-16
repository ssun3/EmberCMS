define('aileen/components/work-component', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    session: _ember['default'].inject.service('session'),
    projectsCount: _ember['default'].computed('work.projects.length', function () {
      return this.get('work.projects.length');
    }),
    isProjects: _ember['default'].computed('work.projects.length', function () {
      return this.get('work.projects.length') > 0 ? true : false;
    }),
    isProjectsPlural: _ember['default'].computed('work.projects.length', function () {
      return this.get('work.projects.length') > 1 ? "projects" : "project";
    })

  });
});