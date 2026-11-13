---
title: "VideoEncoder: encodeQueueSize property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videoencoder/encodequeuesize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoEncoder: encodeQueueSize property

The **`encodeQueueSize`** read-only property of the `VideoEncoder` interface returns the number of pending encode requests in the queue.

## Value

An integer containing the number of requests.

## Examples

The following example prints the size of the queue to the console.

```js
console.log(VideoEncoder.encodeQueueSize);
```
