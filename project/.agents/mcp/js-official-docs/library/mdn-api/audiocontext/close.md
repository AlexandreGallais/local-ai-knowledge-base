---
title: "AudioContext: close() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiocontext/close/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioContext: close() method

The `close()` method of the `AudioContext` Interface closes the audio context, releasing any system audio resources that it uses.

This function does not automatically release all `AudioContext`-created objects, unless other references have been released as well; however, it will forcibly release any system audio resources that might prevent additional `AudioContexts` from being created and used, suspend the progression of audio time in the audio context, and stop processing audio data. The returned `Promise` resolves when all `AudioContext`-creation-blocking resources have been released. This method throws an `INVALID_STATE_ERR` exception if called on an `OfflineAudioContext`.

## Syntax

```js
close()
```

### Parameters

None.

### Return value

A `Promise` that resolves with `undefined`.

## Examples

The following snippet is taken from our AudioContext states demo (see it running live.) When the stop button is clicked, `close()` is called. When the promise resolves, the example is reset to its beginning state.

```js
stopBtn.onclick = () => {
  audioCtx.close().then(() => {
    startBtn.removeAttribute("disabled");
    susResBtn.setAttribute("disabled", "disabled");
    stopBtn.setAttribute("disabled", "disabled");
  });
};
```

## See also

- Using the Web Audio API
- Web Audio API
