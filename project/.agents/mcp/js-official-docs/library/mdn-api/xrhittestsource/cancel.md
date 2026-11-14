---
title: "XRHitTestSource: cancel() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrhittestsource/cancel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRHitTestSource: cancel() method

The **`cancel()`** method of the `XRHitTestSource` interface unsubscribes a hit test.

## Syntax

```js
cancel()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Unsubscribe from hit test

The `cancel()` method unsubscribes from a hit test source. Since the `XRHitTestSource` object will no longer be usable, you can clean up and set it to `null`.

```js
hitTestSource.cancel();
hitTestSource = null;
```
