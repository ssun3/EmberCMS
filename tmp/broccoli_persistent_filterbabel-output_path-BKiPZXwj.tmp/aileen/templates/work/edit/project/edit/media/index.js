define("aileen/templates/work/edit/project/edit/media/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "g7TEMDAc", "block": "{\"statements\":[[\"block\",[\"link-to\"],[\"work.edit.project.edit.media.new\"],null,4],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\",\"images\"]]],null,3],[\"text\",\"\\n\\n\\n\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"iframe\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"image\",\"url\"]],null],[\"static-attr\",\"width\",\"640\"],[\"static-attr\",\"height\",\"480\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" \"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"image\",\"url\"]],null],[\"flush-element\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Edit Media \"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"image\",\"title\"]],false],[\"close-element\"],[\"text\",\" \"],[\"block\",[\"link-to\"],[\"work.edit.project.edit.media.edit\",[\"get\",[\"image\",\"id\"]]],null,2],[\"text\",\"\\n  \"],[\"block\",[\"if\"],[[\"get\",[\"image\",\"isImage\"]]],null,1],[\"text\",\"\\n  \"],[\"block\",[\"if\"],[[\"get\",[\"image\",\"isVideo\"]]],null,0],[\"text\",\"\\n\"]],\"locals\":[\"image\"]},{\"statements\":[[\"text\",\"ADD MEDIA\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/work/edit/project/edit/media/index.hbs" } });
});