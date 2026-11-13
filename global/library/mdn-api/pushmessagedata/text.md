---
title: "PushMessageData: text() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pushmessagedata/text/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PushMessageData: text() method

The **`text()`** method of the `PushMessageData` interface extracts push message data as a plain text string.

## Syntax

```js
text()
```

### Parameters

None.

### Return value

A string.

## Examples

```js
self.addEventListener("push", (event) => {
  const textObj = event.data.text();

  // do something with your text
});
```
