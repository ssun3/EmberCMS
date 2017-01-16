export default Ember.HTMLBars.template({"id":"S0k7Shky","block":"{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"projects_page\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"work-component-individual\"],[\"flush-element\"],[\"text\",\"\\n\\n    \"],[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"model\",\"image\"]],null],[\"dynamic-attr\",\"alt\",[\"concat\",[[\"unknown\",[\"model\",\"workplace\"]]]]],[\"static-attr\",\"class\",\"work-component-individual__image\"],[\"flush-element\"],[\"close-element\"],[\"text\",\" \\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"work-component-individual__description\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"work-component-individual__description__paragraph\"],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"work-role\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"model\",\"role\"]],false],[\"text\",\" - \"],[\"close-element\"],[\"append\",[\"unknown\",[\"model\",\"description\"]],false],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"work-component-individual__description__dates\"],[\"flush-element\"],[\"append\",[\"helper\",[\"format-date\"],[[\"get\",[\"model\",\"startDate\"]]],null],false],[\"text\",\" - \"],[\"append\",[\"helper\",[\"format-date\"],[[\"get\",[\"model\",\"endDate\"]]],null],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"project-section\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,2],[\"block\",[\"each\"],[[\"get\",[\"model\",\"projects\"]]],null,0],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"    \"],[\"append\",[\"helper\",[\"project-component\"],null,[[\"project\",\"class\"],[[\"get\",[\"project\"]],\"project-component\"]]],false],[\"text\",\"\\n\"]],\"locals\":[\"project\"]},{\"statements\":[[\"text\",\"        +\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"      \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"project-component\"],[\"flush-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"create-new\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"work.edit.project.new\",[\"get\",[\"model\",\"id\"]]],[[\"class\"],[\"create-new-link\"]],1],[\"text\",\"        \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}","meta":{"moduleName":"aileen/templates/work/projects.hbs"}});