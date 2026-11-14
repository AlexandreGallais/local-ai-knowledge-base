---
title: "Window: clearImmediate() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/clearimmediate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: clearImmediate() method

This method clears the action specified by `window.setImmediate`.

## Syntax

```js
clearImmediate(immediateID)
```

### Parameters

- `immediateID`
    The ID returned by `window.setImmediate`.

### Return value

None (`undefined`).

## Examples

```js
let immediateID = setImmediate(() => {
  // Run some code
});

document.getElementById("button").addEventListener(() => {
  clearImmediate(immediateID);
});
```

## Specifications

Not part of any current specifications.
The Efficient Script Yielding
specification is no longer being worked on.

## See also

- Polyfill of `clearImmediate` in `core-js`
- `Window.setImmediate()`
