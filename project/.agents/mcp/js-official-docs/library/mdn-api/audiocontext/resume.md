---
title: "AudioContext: resume() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiocontext/resume/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioContext: resume() method

The **`resume()`** method of the `AudioContext`
interface resumes the progression of time in an audio context that has previously been
suspended.

This method will cause an `INVALID_STATE_ERR` exception to be thrown if
called on an `OfflineAudioContext`.

## Syntax

```js
resume()
```

### Parameters

None.

### Return value

A `Promise` that resolves when the context has resumed. The promise is
rejected if the context has already been closed.

## Examples

The following snippet is taken from our AudioContext states demo (see it running live.) When the suspend/resume button is clicked, the
`AudioContext.state` is queried — if it is `running`,
`suspend()` is called; if it is
`suspended`, `resume()` is called. In each case, the text label of
the button is updated as appropriate once the promise resolves.

```js
susResBtn.onclick = () => {
  if (audioCtx.state === "running") {
    audioCtx.suspend().then(() => {
      susResBtn.textContent = "Resume context";
    });
  } else if (audioCtx.state === "suspended") {
    audioCtx.resume().then(() => {
      susResBtn.textContent = "Suspend context";
    });
  }
};
```

## See also

- Using the Web Audio API
- Web Audio API
