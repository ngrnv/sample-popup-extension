document.getElementById("clicker").addEventListener("click", onCLick);

export function onCLick() {
  chrome.tabs
    .create({
      url: "https://www.google.com/",
      active: false,
    })
    .then((tab) => {
      window.document.getElementById("output").innerHTML = tab.id
      chrome.runtime.sendMessage({ type: "log", data: ['tab opened', tab.id] });
    })
    .catch((err) => (window.document.getElementById("output").innerHTML = err.message));
}