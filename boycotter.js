var tabUrl = null;

var identifiers = {};

window.onload = function() {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.parseResult && request.parseResult == "success") {
      console.log("Successful parse!");
      console.log(request.data);
      identifiers = request.data.identifiers;
      displayIdentifiers(identifiers)
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

function displayIdentifiers(identifiers) {
    var asinText = "n/a";
    if (identifiers["ASIN"]) {
      asinText = identifiers["ASIN"];
    }

    var upcText = "n/a";
    if (identifiers["UPC"]) {
      upcText = identifiers["UPC"];
    }

    var otherText = "n/a";
    if (identifiers["unknown"]) {
      otherText = identifiers["unknown"];
    }

    var text = "ASIN: " + asinText + ", UPC: " + upcText + ".";
    alert(text);
}
