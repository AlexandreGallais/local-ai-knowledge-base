---
title: "Window: moveTo() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/moveto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: moveTo() method

The **`moveTo()`** method of the `Window`
interface moves the current window to the specified coordinates.

> **Note:**
> This function moves the window to an absolute location. In
> contrast, `window.moveBy()` moves the window relative to its current
> location.

## Syntax

```js
moveTo(x, y)
```

### Parameters

- `x`
    The horizontal coordinate to be moved to.
- `y`
    The vertical coordinate to be moved to.

### Return value

None (`undefined`).

## Examples

This example moves the window to the top-left corner of the screen.

```js
function origin() {
  window.moveTo(0, 0);
}
```

## Browser compatibility

As of Firefox 7, websites can no longer move a browser window in the following cases:

1. You can't move a window or tab that wasn't created by `Window.open()`.
2. You can't move a window or tab when it's in a window with more than one tab.

> **Note:**
> This function might not move the window synchronously.
> In some environments (like Wayland, or mobile) it might not move the window
> at all. Currently there's no way to listen to a move event, see
> CSS Working Group issue #7693.

## See also

- `Window.moveBy()`
