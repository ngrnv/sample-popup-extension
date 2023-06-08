chrome.runtime.onMessage.addListener(async (message) => {
  switch (message.type) {
    case "log":
      console.log(`[${message.type}]`, message.data);
      break;

    case "popup-start":
      console.log('tabs', await chrome.tabs.query({}));
      chrome.runtime.sendMessage({ type: "start", data: message.data });
      break;
  }

  return true;
});