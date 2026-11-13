---
title: "Window: history property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/history/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: history property

The `Window.history` read-only property returns a reference to the `History` object, which provides an interface for manipulating the browser _session history_ (pages visited in the tab or frame that the current page is loaded in).

See Manipulating the browser history for examples and details. In particular, that article explains security features of the `pushState()` and `replaceState()` methods that you should be aware of before using them.

## Value

A reference to the `History` object.

## Examples

```js
history.back(); // equivalent to clicking back button
history.go(-1); // equivalent to history.back();
```

## Notes

For top-level pages you can see the list of pages in the session history, accessible via the `History` object, in the browser's dropdowns next to the back and forward buttons.

For security reasons the `History` object doesn't allow the non-privileged code to access the URLs of other pages in the session history, but it does allow it to navigate the session history.

There is no way to clear the session history or to disable the back/forward navigation from unprivileged code. The closest available solution is the `location.replace()` method, which replaces the current item of the session history with the provided URL.
