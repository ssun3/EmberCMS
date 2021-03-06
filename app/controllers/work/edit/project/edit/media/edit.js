import Ember from 'ember';
import ENV from "../../../../../../config/environment";

export default Ember.Controller.extend({
  actions: {
    deleteMediaWarning: function(mediaID, projectID){
      var isDeleteOkay = confirm("Are you sure?");
      if (isDeleteOkay == true) {
        this.send('deleteMedia', mediaID, projectID);
      }
    },
    editMedia: function(id){
      var self = this;
      var title = self.get('model.title'); 
      var description = self.get('model.description');
      var url = self.get('model.url');
      var mimeType= self.get('model.mimeType');

      this.store.findRecord('image', id).then(function(image){
        image.set('title', title);
        image.set('description', description);
        image.set('url', url);
        image.set('mimeType', mimeType);
        //save to FB
        image.save().then(function(){
          self.transitionToRoute('work.edit.project.edit.media');
        });

      });

    },
    deleteMedia: function(mediaID, projectID){
      var self = this;
      var project = this.store.peekRecord('project', projectID);
      var media = this.store.peekRecord('image', mediaID);
      media.destroyRecord().then(function(){
        project.save().then(function(){
          self.transitionToRoute('work.edit.project.edit.media');
        });
        
      });
    }, 


    changeMedia: function(id){
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
              addView(google.picker.ViewId.DOCS_VIDEOS).
              addView(new google.picker.DocsUploadView()).
              setOAuthToken(oauthToken).
              setDeveloperKey(developerKey).
              setCallback(pickerCallback).
              build();
          picker.setVisible(true);
        }
      }

      // A simple callback implementation.
      function pickerCallback(data) {
        var mediaSRC = 'nothing';
        var mediaType = 'nothing';
        if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
          var doc = data[google.picker.Response.DOCUMENTS][0];
          console.log(doc);
          mediaType = doc[google.picker.Document.TYPE];
          if (mediaType === "video") {
            mediaSRC = "https://drive.google.com/file/d/" + doc[google.picker.Document.ID] + "/preview";
          } else if (mediaType === "photo") {
            mediaSRC = doc[google.picker.Document.THUMBNAILS][3].url;
          } else {
            mediaSRC = "unavailable"
          }
          //console.log(doc);
          //console.log(google.picker.Document);
          updateImage(mediaSRC, mediaType);

        }
      }

      function updateImage(src, type){
        self.store.findRecord('image', id).then(function(image) {
          image.set("url", src);
          image.set("mimeType", type);
        });
      }

      onApiLoad();
    }







  }



});
