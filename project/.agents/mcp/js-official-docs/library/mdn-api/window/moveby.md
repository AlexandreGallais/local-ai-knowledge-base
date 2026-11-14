---
title: "Window: moveBy() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/moveby/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: moveBy() method

The **`moveBy()`** method of the `Window`
interface moves the current window by a specified amount.

> **Note:**
> This function moves the window relative to its current
> location. In contrast, `window.moveTo()` moves the window to an absolute
> location.

## Syntax

```js
moveBy(deltaX, deltaY)
```

### Parameters

- `deltaX`
    The number of pixels to move the window horizontally.
    Positive values are to the right, while negative values are to the left.
- `deltaY`
    The number of pixels to move the window vertically. Positive
    values are down, while negative values are up.

### Return value

None (`undefined`).

## Examples

This example moves the window 10 pixels to the right and 10 pixels up.

```js
function budge() {
  moveBy(10, -10);
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

- `Window.moveTo()`
