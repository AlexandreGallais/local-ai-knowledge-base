---
title: "VideoDecoder: decodeQueueSize property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videodecoder/decodequeuesize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoDecoder: decodeQueueSize property

The **`decodeQueueSize`** read-only property of the `VideoDecoder` interface returns the number of pending decode requests in the queue.

## Value

An integer containing the number of requests.

## Examples

The following example prints the size of the queue to the console.

```js
console.log(VideoDecoder.decodeQueueSize);
```
