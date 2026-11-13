---
title: "HTMLMediaElement: waitingforkey event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/waitingforkey_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: waitingforkey event

The `waitingforkey` event is fired at a media element when it is first unable to play because it needs a key to decode the following data, and playback is stopped.

If the video frame and/or audio data for the current playback position have been decoded, `readyState` is set to `HAVE_CURRENT_DATA`.
Otherwise, including if the data was previously available but isn't anymore, the `readyState` is set to `HAVE_METADATA`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("waitingforkey", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onwaitingforkey = (event) => { }
```

## Event type

An `Event`.

## See also

- `HTMLAudioElement`
- `HTMLVideoElement`
- `<audio>`
- ``
