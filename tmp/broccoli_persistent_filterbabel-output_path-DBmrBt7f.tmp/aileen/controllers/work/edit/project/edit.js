define('aileen/controllers/work/edit/project/edit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    actions: {
      editProject: function editProject(projectID) {
        var self = this;
        var title = this.get('model.title');
        var subtitle = this.get('model.subtitle');
        var description = this.get('model.description');
        var role = this.get('model.role');
        var date = this.get('model.date');

        this.store.findRecord('project', projectID).then(function (project) {
          project.set('title', title);
          project.set('subtitle', subtitle);
          project.set('description', description);
          project.set('role', role);
          project.set('date', date);
          //project.set('media', media);

          //save to FB
          project.save();
          self.transitionToRoute('work.edit.project');
        });
      },

      deleteProject: function deleteProject(projectID, workID) {
        var self = this;
        var work = this.store.peekRecord('work', workID);
        var project = this.store.peekRecord('project', projectID);
        project.destroyRecord().then(function () {
          work.save();
          self.transitionToRoute('work.edit.project');
        });
      }
    }
  });
});