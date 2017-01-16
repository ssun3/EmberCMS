define('aileen/controllers/work/edit/project/edit/media/new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    isImage: _ember['default'].computed('mediaMimeType', function () {
      return this.get("mediaMimeType") === "photo" ? true : false;
    }),
    isVideo: _ember['default'].computed('mediaMimeType', function () {
      return this.get("mediaMimeType") === "video" ? true : false;
    }),
    mediaURL: "",
    mediaMimeType: "",
    actions: {
      addMedia: function addMedia(projectID) {
        var self = this;
        var title = self.get('title');
        var description = self.get('description');
        var project = self.store.peekRecord('project', projectID);
        var url = self.get('mediaURL');
        var mimeType = self.get('mediaMimeType');

        //create new image
        var newImage = self.store.createRecord('image', {
          title: title,
          description: description,
          url: url,
          mimeType: mimeType,
          isMainImage: false
        });

        //add to project
        project.get('images').pushObject(newImage);

        //save to FB
        newImage.save().then(function () {
          project.save().then(function () {
            self.setProperties({
              title: '',
              description: '',
              mediaURL: '',
              mediaMimeType: ''
            });
            self.transitionToRoute('work.edit.project.edit.media');
          });
        });
      },

      uploadMedia: function uploadMedia() {
        var self = this;
        // The Browser API key obtained from the Google Developers Console.
        var developerKey = 'AIzaSyBCOhpxKxUkwlQXWwRwbzsaYs5pmbI9yAY ';

        // The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
        var clientId = "619862406222-ejqjpamted4nb655jv8408kgrvstssbv.apps.googleusercontent.com";

        // Scope to use to access user's photos.
        var scope = ['https://www.googleapis.com/auth/drive'];

        var pickerApiLoaded = false;
        var oauthToken;

        // Use the API Loader script to load google.picker and gapi.auth.
        function onApiLoad() {
          gapi.load('auth', { 'callback': onAuthApiLoad });
          gapi.load('picker', { 'callback': onPickerApiLoad });
        }

        function onAuthApiLoad() {
          window.gapi.auth.authorize({
            'client_id': clientId,
            'scope': scope,
            'immediate': false
          }, handleAuthResult);
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
            var picker = new google.picker.PickerBuilder().addView(google.picker.ViewId.PHOTOS).addView(google.picker.ViewId.PHOTO_UPLOAD).addView(google.picker.ViewId.DOCS_VIDEOS).addView(new google.picker.DocsUploadView()).setOAuthToken(oauthToken).setDeveloperKey(developerKey).setCallback(pickerCallback).build();
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
              mediaSRC = "unavailable";
            }
            //console.log(doc);
            //console.log(google.picker.Document);
            updateImage(mediaSRC, mediaType);
          }
        }

        function updateImage(src, type) {
          self.set("mediaURL", src);
          self.set("mediaMimeType", type);
        }

        onApiLoad();
      }

    }
  });
});