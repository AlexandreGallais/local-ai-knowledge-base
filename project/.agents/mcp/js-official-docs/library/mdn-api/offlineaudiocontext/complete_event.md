---
title: "OfflineAudioContext: complete event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/offlineaudiocontext/complete_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OfflineAudioContext: complete event

The `complete` event of the `OfflineAudioContext` interface is fired when the rendering of an offline audio context is complete.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("complete", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oncomplete = (event) => { }
```

## Event type

An `OfflineAudioCompletionEvent`. Inherits from `Event`.

## Examples

When processing is complete, you might want to use the `complete` event handler to prompt the user that the audio can now be played, and enable the play button:

```js
const offlineAudioCtx = new OfflineAudioContext(2, 44100 * 40, 44100);

offlineAudioCtx.addEventListener("complete", () => {
  console.log("Offline audio processing now complete");
  alert("Song processed and ready to play");
  playBtn.disabled = false;
});
```

You can also set up the event handler using the `oncomplete` property (but note that this replaces other event listeners added using `oncomplete`, if any):

```js
const offlineAudioCtx = new OfflineAudioContext(2, 44100 * 40, 44100);

offlineAudioCtx.oncomplete = () => {
  console.log("Offline audio processing now complete");
  alert("Song processed and ready to play");
  playBtn.disabled = false;
};
```

## See also

- Web Audio API
