export default Ember.HTMLBars.template({"id":"GXCdQtq4","block":"{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,7],[\"text\",\"\\n\"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,5]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"          Edit PROJECT\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"link-to\"],[\"work.edit.project.edit\",[\"get\",[\"work\",\"id\"]],[\"get\",[\"project\",\"id\"]]],null,0]],\"locals\":[]},{\"statements\":[[\"text\",\"    \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"project: \"],[\"append\",[\"unknown\",[\"project\",\"title\"]],false],[\"text\",\"\\n      \"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,1],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"project\"]},{\"statements\":[[\"text\",\"        Edit WORK\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"link-to\"],[\"work.edit.project\",[\"get\",[\"work\",\"id\"]]],null,3]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"work: \"],[\"append\",[\"unknown\",[\"work\",\"workplace\"]],false],[\"text\",\"\\n    \"],[\"open-element\",\"span\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"session\",\"isAuthenticated\"]]],null,4],[\"text\",\"    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"work\",\"projects\"]]],null,2],[\"text\",\"\\n\\n\"]],\"locals\":[\"work\"]},{\"statements\":[[\"text\",\"    New Work\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"link-to\"],[\"work.new\"],null,6]],\"locals\":[]}],\"hasPartials\":false}","meta":{"moduleName":"aileen/templates/work/index.hbs"}});