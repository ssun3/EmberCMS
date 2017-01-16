define('aileen/controllers/work/edit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    actions: {
      editWork: function editWork(id) {
        var self = this;
        var workplace = this.get('model.workplace');
        var role = this.get('model.role');
        var description = this.get('model.description');
        var startDate = this.get('model.start');
        var endDate = this.get('model.end');

        this.store.findRecord('work', id).then(function (work) {
          work.set('workplace', workplace);
          work.set('role', role);
          work.set('description', description);
          work.set('startDate', new Date(startDate));
          work.set('endDate', new Date(endDate));
          //save to FB
          work.save();
          self.transitionToRoute('work');
        });
      },
      deleteWork: function deleteWork(id) {
        var self = this;
        var work = this.store.peekRecord('work', id);
        var deletions = work.get('projects').map(function (project) {
          return project.destroyRecord();
        });

        //Ensure all projects are deleted before the work
        _ember['default'].RSVP.all(deletions).then(function () {
          work.destroyRecord();
          self.transitionToRoute('work');
        })['catch'](function (e) {
          console.log("An error has occured");
        });
      }
    }

  });
});