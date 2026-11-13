---
title: "MediaStreamTrackEvent: track property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamtrackevent/track/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamTrackEvent: track property

The **`track`** read-only property of the `MediaStreamTrackEvent` interface returns the `MediaStreamTrack` associated with this event.

## Value

A `MediaStreamTrack` object.

## Examples

```js
const stream = new MediaStream();

stream.addEventListener("removetrack", (event) => {
  console.log(`${event.track.kind} track removed`);
});
```

## See also

- `addtrack` and `removetrack` events
- `MediaStreamTrack`
