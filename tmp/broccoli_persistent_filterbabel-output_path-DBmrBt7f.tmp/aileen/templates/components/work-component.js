define("aileen/templates/components/work-component", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "UU4x8Dah", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"work-image\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"img\",[]],[\"dynamic-attr\",\"src\",[\"unknown\",[\"work\",\"image\"]],null],[\"dynamic-attr\",\"alt\",[\"concat\",[[\"unknown\",[\"work\",\"workplace\"]]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\" \\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"work-image-overlay\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"block\",[\"link-to\"],[\"work.projects\",[\"get\",[\"work\",\"id\"]]],[[\"class\"],[\"work-projects-link\"]],6],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"work-description\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"work-details\"],[\"flush-element\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"work-role\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"work\",\"role\"]],false],[\"text\",\" - \"],[\"close-element\"],[\"append\",[\"unknown\",[\"work\",\"description\"]],false],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"work-dates\"],[\"flush-element\"],[\"append\",[\"helper\",[\"format-date\"],[[\"get\",[\"work\",\"startDate\"]]],null],false],[\"text\",\" - \"],[\"append\",[\"helper\",[\"format-date\"],[[\"get\",[\"work\",\"endDate\"]]],null],false],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isProjects\"]]],null,5],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,4],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"work\",\"projects\"]]],null,2],[\"text\",\"\\n\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"          Edit PROJECT\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"link-to\"],[\"work.edit.project.edit\",[\"get\",[\"work\",\"id\"]],[\"get\",[\"project\",\"id\"]]],null,0]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"project: \"],[\"append\",[\"unknown\",[\"project\",\"title\"]],false],[\"text\",\"\\n      \"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,1],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"project\"]},{\"statements\":[[\"text\",\"          Edit WORK\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"work.edit.project\",[\"get\",[\"work\",\"id\"]]],null,3],[\"text\",\"        \\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"p\",[]],[\"static-attr\",\"class\",\"work-projects\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"projectsCount\"]],false],[\"text\",\" \"],[\"append\",[\"unknown\",[\"isProjectsPlural\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"View Projects\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "aileen/templates/components/work-component.hbs" } });
});