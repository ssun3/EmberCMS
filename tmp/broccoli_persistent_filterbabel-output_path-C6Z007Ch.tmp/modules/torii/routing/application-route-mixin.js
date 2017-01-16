import { getConfiguration } from 'torii/configuration';

export default Ember.Mixin.create({
  beforeModel: function beforeModel(transition) {
    var route = this;
    var superBefore = this._super.apply(this, arguments);
    if (superBefore && superBefore.then) {
      return superBefore.then(function () {
        return route.checkLogin(transition);
      });
    } else {
      return route.checkLogin(transition);
    }
  },
  checkLogin: function checkLogin() {
    var configuration = getConfiguration();
    return this.get(configuration.sessionServiceName).fetch()['catch'](function () {
      // no-op, cause no session is ok
    });
  }
});