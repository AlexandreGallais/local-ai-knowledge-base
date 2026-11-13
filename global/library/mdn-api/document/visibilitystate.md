---
title: "Document: visibilityState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/visibilitystate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: visibilityState property

The **`Document.visibilityState`**
read-only property returns the visibility of the document. It can be used to check whether the document is in the background or in a minimized window, or is otherwise not visible to the user.

When the value of this property changes, the `visibilitychange` event is sent to the `Document`.

The `Document.hidden` property provides an alternative way to determine whether the page is hidden.

## Value

A string with one of the following values:

- `visible`
    The page content may be at least partially visible. In practice this means that the
    page is the foreground tab of a non-minimized window.
- `hidden`
    The page content is not visible to the user. In practice this means that the
    document is either a background tab or part of a minimized window, or the OS screen
    lock is active.

## Examples

```js
document.addEventListener("visibilitychange", () => {
  console.log(document.visibilityState);
  // Modify behavior…
});
```

## See also

- `Document.hidden`
- Page Visibility API
