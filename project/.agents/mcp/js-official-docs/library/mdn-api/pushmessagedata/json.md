---
title: "PushMessageData: json() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pushmessagedata/json/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PushMessageData: json() method

The **`json()`** method of the `PushMessageData` interface extracts push message data by parsing it as a JSON string and returning the result.

## Syntax

```js
json()
```

### Parameters

None.

### Return value

The result of parsing push event data as JSON. This could be anything that can be represented by JSON — an object, an array, a string, a number…

## Examples

```js
self.addEventListener("push", (event) => {
  const myData = event.data.json();

  // do something with your data
});
```
