define('aileen/components/google-picker', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    actions: {
      uploadMedia: function uploadMedia() {

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
            var picker = new google.picker.PickerBuilder().addView(google.picker.ViewId.PHOTO_ALBUMS).addView(google.picker.ViewId.PHOTOS).addView(google.picker.ViewId.PHOTO_UPLOAD).addView(google.picker.ViewId.DOCS_VIDEOS).addView(new google.picker.DocsUploadView()).setOAuthToken(oauthToken).setDeveloperKey(developerKey).setCallback(pickerCallback).build();
            picker.setVisible(true);
          }
        }

        // A simple callback implementation.
        function pickerCallback(data) {
          var url = 'nothing';
          if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
            var doc = data[google.picker.Response.DOCUMENTS][0];
            url = doc[google.picker.Document.URL];
          }
          console.log(google.picker);
          console.log(google.picker.Response);
          console.log(data);
          console.log(doc);
          var message = 'You picked: ' + url;
          document.getElementById('result').innerHTML = message;
        }

        onApiLoad();
      }

    }
  });
});