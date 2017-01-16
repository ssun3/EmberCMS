define('aileen/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    isWorkEditRoute: _ember['default'].computed.equal('currentRouteName', 'work.edit.index'),
    actions: {
      signOut: function signOut() {
        var self = this;
        this.get("session").close();
        self.transitionToRoute('application');
      }
    }
  });
});