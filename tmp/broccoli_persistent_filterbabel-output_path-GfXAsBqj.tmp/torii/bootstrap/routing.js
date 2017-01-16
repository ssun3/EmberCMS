define('torii/bootstrap/routing', ['exports', 'torii/routing/application-route-mixin', 'torii/routing/authenticated-route-mixin', 'torii/lib/container-utils'], function (exports, _toriiRoutingApplicationRouteMixin, _toriiRoutingAuthenticatedRouteMixin, _toriiLibContainerUtils) {
  'use strict';

  var AuthenticatedRoute = null;

  function reopenOrRegister(applicationInstance, factoryName, mixin) {
    var factory = (0, _toriiLibContainerUtils.lookup)(applicationInstance, factoryName);
    var basicFactory;

    if (factory) {
      factory.reopen(mixin);
    } else {
      basicFactory = (0, _toriiLibContainerUtils.lookupFactory)(applicationInstance, 'route:basic');
      if (!AuthenticatedRoute) {
        AuthenticatedRoute = basicFactory.extend(_toriiRoutingAuthenticatedRouteMixin['default']);
      }
      (0, _toriiLibContainerUtils.register)(applicationInstance, factoryName, AuthenticatedRoute);
    }
  }

  exports['default'] = function (applicationInstance, authenticatedRoutes) {
    reopenOrRegister(applicationInstance, 'route:application', _toriiRoutingApplicationRouteMixin['default']);
    for (var i = 0; i < authenticatedRoutes.length; i++) {
      var routeName = authenticatedRoutes[i];
      var factoryName = 'route:' + routeName;
      reopenOrRegister(applicationInstance, factoryName, _toriiRoutingAuthenticatedRouteMixin['default']);
    }
  };
});