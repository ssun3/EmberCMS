 import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  projectsCount: Ember.computed('work.projects.length', function() {
    return this.get('work.projects.length');
  }),
  isProjects: Ember.computed('work.projects.length', function() {
    return this.get('work.projects.length') > 0 ? true : false;
  }),
  isProjectsPlural: Ember.computed('work.projects.length', function(){
    return this.get('work.projects.length') > 1 ? "projects" : "project"
  })
});
