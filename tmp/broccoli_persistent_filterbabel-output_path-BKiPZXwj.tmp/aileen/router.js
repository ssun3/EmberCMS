define('aileen/router', ['exports', 'ember', 'aileen/config/environment'], function (exports, _ember, _aileenConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _aileenConfigEnvironment['default'].locationType,
    rootURL: _aileenConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('about');
    this.route('work', function () {
      this.route('edit', { path: ":work_id" }, function () {
        this.route('project', function () {
          this.route('new');
          this.route('edit', { path: ":project_id" }, function () {
            this.route('media', function () {
              this.route('new');
              this.route('edit', { path: ":image_id" });
            });
          });
        });
      });
      this.route('new');
      this.route('projects', { path: ":work_id/projects" });
    });
    this.route('login');
  });

  exports['default'] = Router;
});