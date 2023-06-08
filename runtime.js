document.getElementById("clicker").addEventListener("click", onCLick);

export async function onCLick() {
  await chrome.runtime.sendMessage({ type: "log", data: 'onCLick' }); // only this one is logged in service worker

  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabCapture.getMediaStreamId(
    {
      // consumerTabId: controllerTab.id,
      targetTabId: activeTab.id,
    },
    async (streamId) => {
      console.log('[alna] streamId', streamId);
      chrome.offscreen
        .createDocument({
          url: chrome.runtime.getURL('controller.html'),
          reasons: ['USER_MEDIA'],
          justification: 'Tab recording'
        })
        .then(async () => {
          // this never get called
          window.document.getElementById("output").innerHTML = 'offscreen tab opened';
          await chrome.runtime.sendMessage({ type: "log", data: ['offscreen tab opened'] });
          return chrome.runtime.sendMessage({ type: "popup-start", data: streamId });
        })
        .catch((err) => {
          // and this
          window.document.getElementById("output").innerHTML = err.message;
          return chrome.runtime.sendMessage({ type: "log", data: ['error', err.message] });
        })
        // and this
        .finally(() => chrome.runtime.sendMessage({ type: "log", data: 'finally' }))
    }
  );
}