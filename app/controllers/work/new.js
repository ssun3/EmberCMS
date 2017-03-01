import Ember from 'ember'; 
import ENV from "../../config/environment";

export default Ember.Controller.extend({
  isEmptyImage: Ember.computed.equal('imageURL', ''),
  imageURL: "",
  actions: {
    addWork: function() {
      var self = this;
      var workplace = self.get('workplace');
      var role = self.get('role');
      var description = self.get('description');
      var startDate = self.get('startDate');
      var endDate = self.get('endDate');
      var image = self.get('imageURL');

      //create new work
      var newWork = self.store.createRecord('work', {
        workplace: workplace,
        role: role,
        description: description,
        startDate: new Date(startDate),
        endDate : new Date(endDate),
        image: image
      });

      //save to FB
      newWork.save().then(function(){
        //clear form
        self.setProperties({
          workplace: '',
          role: '',
          description: '',
          start: '',
          end: '',
          image: ''
        });
        self.transitionToRoute('work');
      });
    },

    uploadImage: function(){
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
              //addView(google.picker.ViewId.DOCS_VIDEOS).
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
          console.log(doc);
          updateImage(imageSRC);

        }
      }

      function updateImage(imageSRC){
        self.set("imageURL", imageSRC);
      }


      onApiLoad();
    }

  } //end actions
});
