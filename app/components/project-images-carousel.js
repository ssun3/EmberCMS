import Ember from 'ember';
 
export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  willRender: function(){
    var elem = document.querySelector('.main-carousel');
    var flkty = new Flickity( elem, {
      // options
      cellAlign: 'left',
      contain: true,
      wrapAround: true
    });
  }
  
});
