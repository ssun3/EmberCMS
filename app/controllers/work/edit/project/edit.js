import Ember from 'ember';

 
export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  isProjectEdit: Ember.computed.alias('applicationController.isProjectEditRoute'),
  actions: {
    deleteProjectWarning: function(projectID, workID){
      var isDeleteOkay = confirm("Are you sure?");
      if (isDeleteOkay == true) {
        this.send('deleteProject', projectID, workID);
      }
    },

    editProject: function(projectID, workID){
      var self = this;
      var title = this.get('model.title'); 
      var subtitle = this.get('model.subtitle');
      var description = this.get('model.description');
      var role = this.get('model.role');
      var date = this.get('model.date');


      this.store.findRecord('project', projectID).then(function(project){
        project.set('title', title);
        project.set('subtitle', subtitle);
        project.set('description', description);
        project.set('role', role);
        project.set('date', date);
        //project.set('media', media);

        //save to FB
        project.save().then(function(){
          self.transitionToRoute('work.projects', workID);
        });
        
      });

    },

    deleteProject: function(projectID, workID){
      var self = this;
      var work = this.store.peekRecord('work', workID);
      var project = this.store.peekRecord('project', projectID);
      var deletions = project.get('images').map(function(image){
        return image.destroyRecord();
      });
      Ember.RSVP.all(deletions).then(function(){
        project.destroyRecord().then(function(){
          work.save().then(function(){
            self.transitionToRoute('work.projects', workID);
          });
        });
      });




    }
  }
});
