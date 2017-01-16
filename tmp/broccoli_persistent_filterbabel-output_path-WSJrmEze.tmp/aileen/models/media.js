define('aileen/models/media', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    title: _emberData['default'].attr('string'),
    description: _emberData['default'].attr('string'),
    url: _emberData['default'].attr('string'),
    mimeType: _emberData['default'].attr('string'),
    project: _emberData['default'].belongsTo('project', { async: true })
  });
});