define('aileen/tests/integration/components/project-component-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('project-component', 'Integration | Component | project component', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'hDAC05Bp',
      'block': '{"statements":[["append",["unknown",["project-component"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'Xk6VEslL',
      'block': '{"statements":[["text","\\n"],["block",["project-component"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});