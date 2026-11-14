---
title: "MediaStreamEvent: stream property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamevent/stream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamEvent: stream property

The read-only property **`MediaStreamEvent.stream`** returns
the `MediaStream` associated with the event.

## Example

```js
pc.onaddstream = (ev) => {
  alert(`A stream (id: '${ev.stream.id}') has been added to this connection.`);
};
```

## See also

- `addstream`, `removestream`
- `RTCPeerConnection`
