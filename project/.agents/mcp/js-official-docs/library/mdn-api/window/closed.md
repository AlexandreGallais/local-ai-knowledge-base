---
title: "Window: closed property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/closed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: closed property

The **`Window.closed`** read-only property indicates whether
the referenced window is closed or not.

## Value

A boolean value. Possible values:

- `true`: The window has been closed.
- `false`: The window is open.

## Examples

### Change the URL of a window from a popup

The following example demonstrates how a popup window can change the URL of the window
that opened it. Before attempting to change the URL, it checks that the current window
has an opener using the `window.opener` property and that the opener isn't
closed:

```js
// Check that an opener exists and is not closed
if (window.opener && !window.opener.closed) {
  window.opener.location.href = "https://www.mozilla.org";
}
```

Note that popups can only access the window that opened them.

### Refreshing a previously opened popup

In this example the function `refreshPopupWindow()` calls the
`reload()` method of the popup's location object to refresh its data. If the
popup hasn't been opened yet or the user has closed it a new window is opened.

```js
let popupWindow = null;

function refreshPopupWindow() {
  if (popupWindow && !popupWindow.closed) {
    // popupWindow is open, refresh it
    popupWindow.location.reload(true);
  } else {
    // Open a new popup window
    popupWindow = window.open("popup.html", "dataWindow");
  }
}
```
