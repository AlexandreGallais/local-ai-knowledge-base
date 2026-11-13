---
title: "AudioEncoder: encode() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audioencoder/encode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioEncoder: encode() method

The **`encode()`** method of the `AudioEncoder` interface enqueues a control message to encode a given `AudioData` object.

## Syntax

```js
encode(data)
```

### Parameters

- `data`
    An `AudioData` object.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the `state` is not `"configured"`.
- `TypeError`
    Thrown if the `AudioData` object has been transferred.

## Examples

In the following example `encode` is passed an `AudioData` object.

```js
encoder.encode(data);
```
