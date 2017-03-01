import Ember from 'ember';

export default Ember.Controller.extend({
  evenProjects: Ember.computed('model.projects', function(){
    return this.get('model.projects').filter((item,index,self) => index % 2 ===0);
  }),
  oddProjects: Ember.computed('model.projects', function(){
    return this.get('model.projects').filter((item,index,self) => index % 2 !==0);
  })
});
