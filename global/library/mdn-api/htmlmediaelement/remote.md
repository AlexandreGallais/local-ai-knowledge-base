---
title: "HTMLMediaElement: remote property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/remote/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: remote property

The **`remote`** read-only property of the `HTMLMediaElement` interface returns the `RemotePlayback` object associated with the media element. The `RemotePlayback` object allow the control of remote devices playing the media.

## Value

A `RemotePlayback` object associated with the media element.

## Example

```js
const el = document.createElement("audio");
const remotePlayback = el.remote;

remotePlayback.watchAvailability((availability) => {
  // Do something when the availability changes
});
```
