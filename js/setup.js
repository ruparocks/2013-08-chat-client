// 1. Display messages retrieved from the parse server
// 2. Be careful to use proper escaping on any user input. Since you're displaying input that other users have typed, your app is vulnerable XSS attacks.
//      Note: If you issue an XSS attack, make it innocuous enough to be educational, rather than disruptive.
// 3. Allow users to select a username and send messages
// 4. Allow users to 'befriend' other users by clicking on their username
// 5. Display all messages sent by friends in bold
// 6. Allow users to create rooms and enter existing rooms
// 7. Refactor your app to use Backbone. Follow this guide


if(!/(&|\?)username=/.test(window.location.search)){
  var newSearch = window.location.search;
  if(newSearch !== '' & newSearch !== '?'){
    newSearch += '&';
  }
  var username = prompt('What is your name?') || 'anonymous';
  newSearch += 'username=' + username;
  window.location.search = newSearch;
}

// Don't worry about this code, it will ensure that your ajax calls are allowed by the browser
// .ajaxPrefilter([dataTypes], handler(options, originalOptions, jqXHR))
// dataTypes (String) - an option string containing one or more space-separated dataTypes
// handler)optiongs, originalOptions, jqXHR) (function) - A handler to set default values for future Ajax requests
$.ajaxPrefilter(function(settings, _, jqXHR) {
	// settings - the request options
	// _ originalOptions - the options as provided to the ajax method, unmodified and , thus, w/o defaults from ajaxSettings
	// jqXHR - the jqXHR object of the request
  jqXHR.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
  jqXHR.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");
});

$.ajax('https://api.parse.com/1/classes/messages', {
  contentType: 'application/json',
  success: function(data){
  	var domNode;
  	for (var i =0; i < data.results.length; i++) {
  		var username = data.results[i].username || "anonymous";
  		var domNode = $("<li><div class='message'>"+username+": "+data.results[i].text+"</div></li>");
  		$('#main-ul').append(domNode);
  		//createdAt, objectId, text, updatedAt, username  		
  	}
    console.log(data.results);
    
  },
  error: function(data) {
    console.log('Ajax request failed');
  }
});

// $(function() {
//   $('form#message').submit(function(event) {
  	
//     var form = $(this);
//     $.ajax(function(event, jqXHR, settings) {
// 		var newData = {
// 			createdAt: Date.now(),
// 			updatedAt: Date.now(),
// 			username: username,
// 			text: text
// 		}
// 		var index = data.results.length;
// 		data.results[index] = newData;
// 		console.log(newData);
// 	});
// });



