---
title: "VideoEncoder: reset() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videoencoder/reset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoEncoder: reset() method

The **`reset()`** method of the `VideoEncoder` interface synchronously cancels all pending encodes and callbacks, frees all underlying resources and sets the `state` to "unconfigured".
After calling `reset()`, `configure()` must be called before resuming `encode()` calls.

> **Note:**
> To avoid discarding frames queued via `encode()`, `flush()` should be called and completed before calling `reset()`.

## Syntax

```js
reset()
```

### Parameters

None.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the `state` is `"closed"`.

## Examples

The following example resets the `VideoEncoder`.

```js
VideoEncoder.reset();
```
