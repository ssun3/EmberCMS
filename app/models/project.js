import DS from 'ember-data';
 
export default DS.Model.extend({
  title: DS.attr('string'), 
  subtitle: DS.attr('string'),
  description: DS.attr('string'),
  role: DS.attr('string'),
  date: DS.attr('date'),
  images: DS.hasMany('image', {async: true}),
  workplace: DS.belongsTo('work', {async: true})  
});
