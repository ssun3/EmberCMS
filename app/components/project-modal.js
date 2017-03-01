import Ember from 'ember';

export default Ember.Component.extend({
    session: Ember.inject.service('session'),
    projectID: Ember.computed('project.id', function(){
        return this.get('project.id');
    }),
    didInsertElement: function(){
        // instanciate new gallery
    var gallery = new SagaGallery(this.get('projectID'), {
        onOpen: function() {
            console.log('gallery open');
        },
        onClose: function() {
            console.log('gallery closed');
        },
        loop: true
    });
     
    // open gallery
    gallery.open();
     
    // close gallery
    gallery.close();
     
    // check if gallery is opened
    if (gallery.isOpen()) 
        // do something ...
     
    // display next image
    gallery.next();
     
    // display prev image
    gallery.prev();
  }
});
