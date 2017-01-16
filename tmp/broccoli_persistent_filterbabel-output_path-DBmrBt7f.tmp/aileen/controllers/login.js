define("aileen/controllers/login", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
    actions: {
      signIn: function signIn() {
        var self = this;
        this.get("session").open("firebase", {
          provider: 'password',
          email: this.get('email'),
          password: this.get('password')
        }).then(function (data) {
          console.log(data);
          self.transitionToRoute('application');
        });
      }
    }
  });
});