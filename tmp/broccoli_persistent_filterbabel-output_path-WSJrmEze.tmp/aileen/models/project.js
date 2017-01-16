define('aileen/models/project', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    title: _emberData['default'].attr('string'),
    subtitle: _emberData['default'].attr('string'),
    description: _emberData['default'].attr('string'),
    role: _emberData['default'].attr('string'),
    date: _emberData['default'].attr('date'),
    medias: _emberData['default'].hasMany('media', { async: true }),
    workplace: _emberData['default'].belongsTo('work', { async: true })
  });
});