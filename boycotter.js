var tabUrl = null;

var identifiers = {};
var parsed = false;

sendUrl();

window.onload = function() {
  sendUrl();

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.parseResult && request.parseResult == "success" && !parsed) {
      parsed = true;
      console.log(request.data);
      description = request.data.description;
      displayResults(description)
    }

    if (request.identifier && request.identifier == "extensionPressed") {
      sendUrl();
    }
  });
}

function sendUrl() {
  var tabUrl = window.location.toString();
  chrome.runtime.sendMessage({message: "parse", url: tabUrl}, function(response) {});
}

function displayResults(description) {
    alert(description);
}
