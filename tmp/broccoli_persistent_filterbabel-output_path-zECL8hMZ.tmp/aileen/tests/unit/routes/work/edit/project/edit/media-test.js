define('aileen/tests/unit/routes/work/edit/project/edit/media-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:/work/edit/project/edit/media', 'Unit | Route | /work/edit/project/edit/media', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});