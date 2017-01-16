define('aileen/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    beforeModel: function beforeModel() {
      return this.get('session').fetch()['catch'](function () {});
    }
  });
});