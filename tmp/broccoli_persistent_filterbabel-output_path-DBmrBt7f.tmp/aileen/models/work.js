define('aileen/models/work', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    workplace: _emberData['default'].attr('string'),
    role: _emberData['default'].attr('string'),
    description: _emberData['default'].attr(),
    startDate: _emberData['default'].attr('date'),
    endDate: _emberData['default'].attr('date'),
    image: _emberData['default'].attr('string'),
    projects: _emberData['default'].hasMany('project', { async: true })

  });
});