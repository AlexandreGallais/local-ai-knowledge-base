---
title: "EncodedVideoChunk: timestamp property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/encodedvideochunk/timestamp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EncodedVideoChunk: timestamp property

The **`timestamp`** read-only property of the `EncodedVideoChunk` interface returns an integer indicating the timestamp of the video in microseconds.

## Value

An integer.

## Examples

In the following example the `timestamp` is printed to the console.

```js
const init = {
  type: "key",
  data: videoBuffer,
  timestamp: 23000000,
  duration: 2000000,
};
const chunk = new EncodedVideoChunk(init);
console.log(chunk.timestamp); // 23000000
```
