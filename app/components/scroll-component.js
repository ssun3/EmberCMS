import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function(){
    self = this
    this.$(document).on('keydown', function(e){
      console.log(e);
      var dir;
      if(e.keyCode === 39){
        dir = 1;
      }
      if(e.keyCode === 37){
        dir = -1;
      }
      if(dir) {
        var pixelScroll = dir * 460;
        //self.$('#work-components-container').scrollLeft(self.$('#work-components-container').scrollLeft() + pixelScroll);
        self.$('#work-components-container').animate({scrollLeft: self.$('#work-components-container').scrollLeft() + pixelScroll }, 400, 'swing');
      }
    });
  },
});
