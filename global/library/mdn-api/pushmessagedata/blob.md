---
title: "PushMessageData: blob() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pushmessagedata/blob/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PushMessageData: blob() method

The **`blob()`** method of the `PushMessageData` interface extracts push message data as a `Blob` object.

## Syntax

```js
blob()
```

### Parameters

None.

### Return value

A `Blob`.

## Examples

```js
self.addEventListener("push", (event) => {
  const blob = event.data.blob();

  // do something with your Blob
});
```
