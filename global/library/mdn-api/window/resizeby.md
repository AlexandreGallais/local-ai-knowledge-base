---
title: "Window: resizeBy() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/resizeby/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: resizeBy() method

The **`Window.resizeBy()`** method resizes the current window
by a specified amount.

## Syntax

```js
resizeBy(xDelta, yDelta)
```

### Parameters

- `xDelta`
    The number of pixels to grow the window horizontally.
- `yDelta`
    The number of pixels to grow the window vertically.

### Return value

None (`undefined`).

## Examples

```js
// Shrink the window
window.resizeBy(-200, -200);
```

## Notes

This method resizes the window relative to its current size. To resize the window in
absolute terms, use `window.resizeTo()`.

### Creating and resizing an external window

For security reasons, it's no longer possible in Firefox for a website to change the
default size of a window in a browser if the window wasn't created by
`window.open()`, or contains more than one tab. See the compatibility table
for details on the change.

Even if you create window by `window.open()` **it is not resizable by
default.** To make the window resizable, you must open it with the
`"resizable"` feature.

```js
// Create resizable window
myExternalWindow = window.open(
  "https://example.com",
  "myWindowName",
  "resizable",
);

// Resize window to 500x500
myExternalWindow.resizeTo(500, 500);

// Make window relatively smaller to 400x400
myExternalWindow.resizeBy(-100, -100);
```

The window you create must respect the Same Origin Policy. If the window you open is
not in the same origin as the current window, you will not be able to resize, or access
any information on, that window/tab.

## Browser compatibility

> **Note:**
> This function might not resize the window synchronously.
> In some environments (like mobile) it might not resize the window at all. You
> can listen to the `resize` event to see
> if/when the window got resized.
