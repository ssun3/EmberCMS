define('aileen/controllers/work/edit/project/new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    actions: {
      addProject: function addProject(workID) {
        var self = this;
        var title = this.get('title');
        var subtitle = this.get('subtitle');
        var description = this.get('description');
        var role = this.get('role');
        var date = this.get('date');
        var workplace = this.store.peekRecord('work', workID);

        //create new project

        var newProject = this.store.createRecord('project', {
          title: title,
          subtitle: subtitle,
          description: description,
          role: role,
          date: new Date(date)
        });

        workplace.get('projects').pushObject(newProject);

        //save to FB
        newProject.save().then(function () {
          workplace.save().then(function () {
            //clear form
            self.setProperties({
              title: '',
              subtitle: '',
              description: '',
              role: '',
              date: ''
            });
            self.transitionToRoute('work.projects', workID);
          });
        });
      }

    }
  });
});