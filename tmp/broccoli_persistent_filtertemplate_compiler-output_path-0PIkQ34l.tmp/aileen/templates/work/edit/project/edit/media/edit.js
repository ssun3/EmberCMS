export default Ember.HTMLBars.template({"id":"VIgU9APJ","block":"{\"statements\":[[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"EDIT MEDIA PAGE\"],[\"close-element\"],[\"text\",\"\\n \\n\"],[\"open-element\",\"form\",[]],[\"static-attr\",\"id\",\"edit-project-form\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Title\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"value\"],[\"text\",\"form-control\",[\"get\",[\"model\",\"title\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"open-element\",\"label\",[]],[\"flush-element\"],[\"text\",\"Description\"],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"textarea\"],null,[[\"class\",\"value\"],[\"form-control\",[\"get\",[\"model\",\"description\"]]]]],false],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"changeMedia\",[\"get\",[\"model\",\"id\"]]]],[\"flush-element\"],[\"text\",\"change media\"],[\"close-element\"],[\"text\",\"\\n\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"detail-work-image\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"isVideo\"]]],null,2],[\"text\",\"\\n  \"],[\"block\",[\"if\"],[[\"get\",[\"model\",\"isImage\"]]],null,1],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"mimeType\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \\n\\n  \"],[\"open-element\",\"button\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"editMedia\",[\"get\",[\"model\",\"id\"]]]],[\"flush-element\"],[\"text\",\"Submit Media\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"block\",[\"link-to\"],[\"work.edit.project\"],null,0],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\\n\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Close\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"model\",\"url\"]],null],[\"flush-element\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"iframe\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"model\",\"url\"]],null],[\"static-attr\",\"width\",\"640\"],[\"static-attr\",\"height\",\"480\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" \"]],\"locals\":[]}],\"hasPartials\":false}","meta":{"moduleName":"aileen/templates/work/edit/project/edit/media/edit.hbs"}});