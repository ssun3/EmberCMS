import DS from 'ember-data';

export default DS.Model.extend({
  workplace: DS.attr('string'), 
  role: DS.attr('string'),
  description: DS.attr(),
  startDate: DS.attr('date'),
  endDate: DS.attr('date'),
  image: DS.attr('string'),
  projects: DS.hasMany('project', {async: true})  

});
