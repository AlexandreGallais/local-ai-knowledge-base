---
title: "ScreenOrientation: unlock() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/screenorientation/unlock/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ScreenOrientation: unlock() method

The **`unlock()`** method of the `ScreenOrientation` interface unlocks the orientation of the containing document, effectively locking it to the default screen orientation.

## Syntax

```js
unlock()
```

### Parameters

None.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the document is not fully active.
- `SecurityError` `DOMException`
    Thrown if the document's visibility state is hidden or if the document is forbidden to use the feature (for example, by omitting the keyword `allow-orientation-lock` of the `sandbox` attribute of the `iframe` element).
