---
title: "Window: resizeTo() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/resizeto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: resizeTo() method

The **`Window.resizeTo()`** method dynamically resizes the
window.

## Syntax

```js
resizeTo(width, height)
```

### Parameters

- `width`
    An integer representing the new `outerWidth` in
    pixels (including scroll bars, title bars, etc.).
- `height`
    An integer value representing the new
    `outerHeight` in pixels (including scroll bars,
    title bars, etc.).

### Return value

None (`undefined`).

## Examples

This function resizes the window so that it takes up one quarter of the available
screen. See the `Screen.availWidth` and `Screen.availHeight`
properties.

```js
function quarter() {
  window.resizeTo(window.screen.availWidth / 2, window.screen.availHeight / 2);
}
```

## Browser compatibility

Note: It's not possible to resize a window or tab that wasn't created by
**`window.open()`**. It's also not possible to resize when the
window has multiple tabs.

> **Note:**
> This function might not resize the window synchronously.
> In some environments (like mobile) it might not resize the window at all. You
> can listen to the `resize` event to see
> if/when the window got resized.

## See also

- `window.resizeBy()`
