---
title: "Window: setImmediate() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/setimmediate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: setImmediate() method

This method is used to break up long-running operations and run a callback function immediately after the browser has completed other operations such as events and display updates.

## Syntax

```js
setImmediate(func)
setImmediate(func, param1)
setImmediate(func, param1, param2)
setImmediate(func, param1, param2, /* …, */ paramN)
```

### Parameters

- `func`
    The function you wish to call.

- `param1`, …, `paramN`
    All parameters will be passed directly to your function.

### Return value

The ID of the immediate which can be used later with `window.clearImmediate`.

## Notes

The `clearImmediate()` method can be used to clear the immediate actions, just like `clearTimeout()` for `setTimeout()`.

This method can be used instead of the `setTimeout(fn, 0)` method to execute heavy operations.

The feature can be emulated in a few different ways:

- `postMessage()` can be used to trigger an immediate but yielding callback.
- `MessageChannel` can be used reliably inside of Web Workers whereas the
  semantics of postMessage mean it cannot be used there.
- `setTimeout(fn, 0)` _can_ potentially be used, however as it is clamped to 4ms for timers nested more than 5 levels deep per the HTML spec, it does not make for a suitable polyfill for the natural immediacy of `setImmediate`.

All of these techniques are incorporated into a robust setImmediate polyfill.

## Specifications

Not part of any current specifications.
The Efficient Script Yielding specification is no longer being worked on.

## See also

- Polyfill of `setImmediate` in `core-js`
- Microsoft `setImmediate` API Demo
- `Window.clearImmediate()`
- `Window.requestIdleCallback()`
