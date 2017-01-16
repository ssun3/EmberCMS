import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    signIn: function(){
      var self = this;
      this.get("session").open("firebase", {
        provider: 'password',
        email: this.get('email'),
        password: this.get('password'),
      }).then(function(data){
        console.log(data);
        self.transitionToRoute('application');
      });
    },
  }
});
