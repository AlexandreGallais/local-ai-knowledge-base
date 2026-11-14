---
title: "Window: cancelIdleCallback() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/cancelidlecallback/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: cancelIdleCallback() method

The **`window.cancelIdleCallback()`** method cancels a callback
previously scheduled with `window.requestIdleCallback()`.

## Syntax

```js
cancelIdleCallback(handle)
```

### Parameters

- `handle`
    The ID value returned by `window.requestIdleCallback()` when the
    callback was established.

### Return value

None (`undefined`).

## Examples

See our complete example
in the article Cooperative Scheduling of Background Tasks API.
