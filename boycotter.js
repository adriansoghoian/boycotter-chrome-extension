var tabUrl = null;

var identifiers = {};

window.onload = function() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.parseResult && request.parseResult == "success") {
      console.log("Successful parse!");
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
