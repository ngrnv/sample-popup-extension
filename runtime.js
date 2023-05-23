document.getElementById("clicker").addEventListener("click", onCLick);

export async function onCLick() {
  await chrome.runtime.sendMessage({ type: "log", data: 'onCLick' }); // only this one is logged in service worker
  chrome.tabs
    .create({
      url: "https://www.google.com/",
      active: false,
    })
    .then((tab) => {
      // this never get called
      window.document.getElementById("output").innerHTML = tab.id
      return chrome.runtime.sendMessage({ type: "log", data: ['tab opened', tab.id] });
    })
    .catch((err) => {
      // and this
      window.document.getElementById("output").innerHTML = err.message;
      return chrome.runtime.sendMessage({ type: "log", data: ['error', err.message] });
    })
    // and this
    .finally(() => chrome.runtime.sendMessage({ type: "log", data: 'finally' }))
}