---
title: "HTMLMediaElement: encrypted event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/encrypted_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: encrypted event

The `encrypted` event is fired when initialization data is found in the media that indicates it is encrypted.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("encrypted", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onencrypted = (event) => { }
```

## Event type

A `MediaEncryptedEvent`. Inherits from `Event`.

## See also

- `HTMLAudioElement`
- `HTMLVideoElement`
- `<audio>`
- ``
- `MediaEncryptedEvent`
