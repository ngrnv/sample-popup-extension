chrome.runtime.onMessage.addListener(async (message) => {
  switch (message.type) {
    case "log":
      console.log(`[${message.type}]`, message.data);
      break;
  }

  return true;
});