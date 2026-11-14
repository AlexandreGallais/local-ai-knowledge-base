---
title: "VideoDecoder: reset() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videodecoder/reset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoDecoder: reset() method

The **`reset()`** method of the `VideoDecoder` interface resets all states including configuration, control messages in the control message queue, and all pending callbacks.

## Syntax

```js
reset()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

The following example resets the `VideoDecoder`.

```js
VideoDecoder.reset();
```
