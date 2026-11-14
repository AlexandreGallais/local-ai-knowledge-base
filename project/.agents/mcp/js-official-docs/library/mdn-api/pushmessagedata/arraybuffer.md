---
title: "PushMessageData: arrayBuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pushmessagedata/arraybuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PushMessageData: arrayBuffer() method

The **`arrayBuffer()`** method of the `PushMessageData` interface extracts push message data as an `ArrayBuffer` object.

## Syntax

```js
arrayBuffer()
```

### Parameters

None.

### Return value

An `ArrayBuffer`.

## Examples

```js
self.addEventListener("push", (event) => {
  const buffer = event.data.arrayBuffer();

  // do something with your array buffer
});
```
