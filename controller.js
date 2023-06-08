chrome.runtime.onMessage.addListener(async (message) => {
  switch (message.type) {
    case 'start': {
      const streamId = message.data;
      console.log('[alna] start', streamId);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          // cursor: 'never',
          mandatory: {
            chromeMediaSource: 'tab',
            chromeMediaSourceId: streamId,
            maxFrameRate: 30,
            minWidth: 480 * 2,
            maxWidth: 480 * 2,
            minHeight: 480 * 2,
            maxHeight: 480 * 2,
          },
        }
      });
      console.log('[alna] stream', stream);
      await chrome.runtime.sendMessage({ type: "log", data: 'hello from offscreen tab' });
      break;
    }
  }

  return true;
});