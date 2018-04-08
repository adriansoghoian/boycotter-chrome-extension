var tabUrl = null;

var identifiers = {};

window.onload = function() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.parseResult && request.parseResult == "success") {
      console.log("Successful parse!");
      console.log(request.data);
      identifiers = request.data.identifiers;
      displayIdentifiers(request.data.domain, identifiers)
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

function displayIdentifiers(domain, identifiers) {
    var identifiers_text = "None :(";
    if (identifiers.length > 0) {
      identifiers_text = identifiers.join(", ");
    }
    var text = "DOMAIN: " + domain + ". IDENTIFIERS: " + identifiers_text;
    alert(text);
}
