
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "parse") {
      parseUrl(request.url);
    }
});

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {identifier: "extensionPressed"}, function(response) {
      console.log(response);
    });
  });
});


function parseUrl(url) {
  $.ajax({
      url: 'https://immense-earth-17384.herokuapp.com/products/parse',
      type: 'post',
      data: {
          url: url
      },
      dataType: 'json',
      success: function(data) {
        notifySuccessfulParse(data);
      },
      error: function(err) {
        console.log(err);
      }
  });
}

function notifySuccessfulParse(data) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {parseResult: "success", data: data}, function(response) {
      console.log(response);
    });
  });
}
