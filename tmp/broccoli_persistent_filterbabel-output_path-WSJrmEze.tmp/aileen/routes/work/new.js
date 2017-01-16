define('aileen/routes/work/new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      if (!this.get('session.isAuthenticated')) {
        this.transitionTo('application');
      }
    }
  });
});