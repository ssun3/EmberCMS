define('aileen/models/image', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    title: _emberData['default'].attr('string'),
    description: _emberData['default'].attr('string'),
    url: _emberData['default'].attr('string'),
    mimeType: _emberData['default'].attr('string'),
    isMainImage: _emberData['default'].attr('boolean'),
    project: _emberData['default'].belongsTo('project', { async: true }),
    isImage: Ember.computed.equal('mimeType', 'photo'),
    isVideo: Ember.computed.equal('mimeType', 'video')
  });
});