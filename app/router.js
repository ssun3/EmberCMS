import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
  this.route('work', function() {
    this.route('edit', { path: ":work_id" }, function() {
      this.route('project', function() {
        this.route('new');
        this.route('edit', { path: ":project_id" }, function(){
          this.route('media', function(){
            this.route('new');
            this.route('edit', { path: ":image_id"});
          });
        });
      });
    });
    this.route('new');
    this.route('projects', { path: ":work_id/projects" });
  });
  this.route('login');
});

export default Router;
