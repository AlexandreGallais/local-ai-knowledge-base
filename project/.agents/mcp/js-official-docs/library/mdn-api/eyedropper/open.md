---
title: "EyeDropper: open() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/eyedropper/open/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EyeDropper: open() method

The **`EyeDropper.open()`** method starts the eyedropper mode, returning a promise which is fulfilled once the user has selected a color and exited the eyedropper mode.

## Syntax

```js
open()
open(options)
```

### Parameters

- `options` (optional)
    An options object to pass an `AbortSignal` signal:
    - `signal` (optional)
        An `AbortSignal`. The eyedropper mode will be aborted when the `AbortSignal`'s `abort()` method is called.

### Return value

A `Promise` that eventually resolves when the user selects a pixel color from the screen.

The promise resolves to an object with the following property:

- `sRGBHex`
    A string representing the selected color, in hexadecimal sRGB format (`#aabbcc`).

### Exceptions

Exceptions are not thrown but returned when the `Promise` is rejected.

- `NotAllowedError` `DOMException`
    Thrown if `open()` is not called via a transient user activation.
- `InvalidStateError` `DOMException`
    Thrown if another eye dropper has already opened.
- `AbortError` `DOMException`
    Thrown if the user aborts the selection by pressing the `Esc` key or if the selection is aborted by an `AbortController` being passed as an argument to `open()`.
- `OperationError` `DOMException`
    Thrown if the selection fails for other reasons.

## See also

- The `EyeDropper` interface it belongs to.
