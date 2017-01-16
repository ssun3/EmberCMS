define('aileen/tests/integration/components/google-picker-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('google-picker', 'Integration | Component | google picker', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      'id': 'TNvfaA7Z',
      'block': '{"statements":[["append",["unknown",["google-picker"]],false]],"locals":[],"named":[],"yields":[],"blocks":[],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      'id': 'KlVrB24k',
      'block': '{"statements":[["text","\\n"],["block",["google-picker"],null,null,0],["text","  "]],"locals":[],"named":[],"yields":[],"blocks":[{"statements":[["text","      template block text\\n"]],"locals":[]}],"hasPartials":false}',
      'meta': {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});