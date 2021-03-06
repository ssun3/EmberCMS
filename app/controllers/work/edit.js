import Ember from 'ember'; 
import ENV from "../../config/environment";
 
export default Ember.Controller.extend({
  applicationController: Ember.inject.controller('application'),
  isWorkEdit: Ember.computed.alias('applicationController.isWorkEditRoute'),
  actions: { 

    deleteWorkWarning: function(id){
      var isDeleteOkay = confirm("Are you sure?");
      if (isDeleteOkay == true) {
        this.send('deleteWork', id);
      }
    },
 
    editWork: function(id){
      var self = this;
      var workplace = this.get('model.workplace');
      var role = this.get('model.role');
      var description = this.get('model.description');
      var startDate = this.get('model.startDate');
      var endDate = this.get('model.endDate');
      var image = this.get('model.image');

      this.store.findRecord('work', id).then(function(work){
        work.set('workplace', workplace);
        work.set('role', role);
        work.set('description', description);
        work.set('startDate', new Date(startDate));
        work.set('endDate', new Date(endDate));
        work.set('image', image);
        //save to FB
        work.save().then(function(){
          self.transitionToRoute('work');
        })
      });
    },

    deleteWork: function(id){
      var self = this;
      var work = this.store.peekRecord('work', id);
      var deletions = work.get('projects').map(function(project){
        return project.destroyRecord();
      });
 
      //Ensure all projects are deleted before the work
      Ember.RSVP.all(deletions).then(function(){
        work.destroyRecord().then(function(){
          self.transitionToRoute('work');
        })
      }).catch(function(e){
        console.log("An error has occured");
      });
    },

    changeImage: function(id){
      var self = this;
      // The Browser API key obtained from the Google Developers Console.
      var developerKey = ENV.google.developerKey;

      // The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
      var clientId = ENV.google.clientId;

      // Scope to use to access user's photos.
      var scope = ['https://www.googleapis.com/auth/drive'];

      var pickerApiLoaded = false;
      var oauthToken;


      // Use the API Loader script to load google.picker and gapi.auth.
      function onApiLoad() {
        gapi.load('auth', {'callback': onAuthApiLoad});
        gapi.load('picker', {'callback': onPickerApiLoad});
      }

      function onAuthApiLoad() {
        window.gapi.auth.authorize(
            {
              'client_id': clientId,
              'scope': scope,
              'immediate': false
            },
            handleAuthResult);
      }

      function onPickerApiLoad() {
        pickerApiLoaded = true;
        createPicker();
      }

      function handleAuthResult(authResult) {
        if (authResult && !authResult.error) {
          oauthToken = authResult.access_token;
          createPicker();
        }
      }

      // Create and render a Picker object for picking user Photos.
      function createPicker() {
        if (pickerApiLoaded && oauthToken) {
          var picker = new google.picker.PickerBuilder().
              addView(google.picker.ViewId.PHOTOS).
              addView(google.picker.ViewId.PHOTO_UPLOAD).
              //addView(google.picker.ViewId.DOCS_IMAGES_AND_VIDEOS).
              //addView(new google.picker.DocsUploadView()).
              setOAuthToken(oauthToken).
              setDeveloperKey(developerKey).
              setCallback(pickerCallback).
              build();
          picker.setVisible(true);
        }
      }

      // A simple callback implementation.
      function pickerCallback(data) {
        var imageSRC = 'nothing';
        if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
          var doc = data[google.picker.Response.DOCUMENTS][0];
          imageSRC = doc[google.picker.Document.THUMBNAILS][3].url;
          //imageSRC = "https://drive.google.com/file/d/" + doc[google.picker.Document.ID] + "/preview"
          console.log(doc);
          updateImage(imageSRC);

        }
      }

      function updateImage(imageURL){
        self.store.findRecord('work', id).then(function(work){
          work.set('image', imageURL);
        });
      }


      onApiLoad();
    }
  

  } //end actions

});
