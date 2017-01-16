import Ember from 'ember';

export default Ember.Controller.extend({
  isWorkEditRoute: Ember.computed.equal('currentRouteName', 'work.edit.index'),
  actions: {
    signOut: function(){
      var self = this;
      this.get("session").close();
      self.transitionToRoute('application');
    }
  }
});
