import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  images: Ember.computed('project.images.[]', function(){
    return this.get('project.images');
  }),
  firstImage: Ember.computed('images', function(){
    return this.get('images.firstObject');
  })
});
