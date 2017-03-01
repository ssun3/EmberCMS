import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  url: DS.attr('string'),
  mimeType: DS.attr('string'),
  project: DS.belongsTo('project', {async:true}),
  isImage: Ember.computed.equal('mimeType', 'photo'),
  isVideo: Ember.computed.equal('mimeType', 'video')
});
