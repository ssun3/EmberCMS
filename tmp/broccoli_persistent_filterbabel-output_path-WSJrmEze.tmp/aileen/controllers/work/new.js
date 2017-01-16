define('aileen/controllers/work/new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    actions: {
      addWork: function addWork() {
        var self = this;
        var workplace = this.get('workplace');
        var role = this.get('role');
        var description = this.get('description');
        var startDate = this.get('start');
        var endDate = this.get('end');

        //create new work
        var newWork = this.store.createRecord('work', {
          workplace: workplace,
          role: role,
          description: description,
          startDate: new Date(startDate),
          endDate: new Date(endDate)
        });

        //save to FB
        newWork.save().then(function () {
          //clear form
          self.setProperties({
            workplace: '',
            role: '',
            description: '',
            start: '',
            end: ''
          });
          self.transitionToRoute('work');
        });
      }

    }
  });
});