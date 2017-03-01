import Ember from 'ember';
 
export default Ember.Controller.extend({
  isProjectEditRoute: Ember.computed.equal('currentRouteName', 'work.edit.project.edit.media.index'),
  isWorkEditRoute: Ember.computed.equal('currentRouteName', 'work.edit.index'),
  actions: {
    signOut: function(){
      var self = this;
      this.get("session").close();
      self.transitionToRoute('application');
    }
  }
});
