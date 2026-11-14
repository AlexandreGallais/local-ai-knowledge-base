---
title: "Document: fullscreen property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/fullscreen/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: fullscreen property

The obsolete `Document` interface's **`fullscreen`** read-only property reports whether or not the document is currently displaying content in fullscreen mode.

Although this property is read-only, it will not throw if it is modified (even in strict mode); the setter is a no-operation and it will be ignored.

> **Note:**
> Since this property is deprecated, you can determine if fullscreen mode is active on the document by checking to see if `Document.fullscreenElement` is not `null`.

## Value

A Boolean value which is `true` if the document is currently displaying an element in fullscreen mode; otherwise, the value is `false`.

## Examples

This simple function reports whether or not fullscreen mode is currently active, using the obsolete `fullscreen` property.

```js
function isDocumentInFullScreenMode() {
  return document.fullscreen;
}
```

This next example, on the other hand, uses the current `fullscreenElement` property to determine the same thing:

```js
function isDocumentInFullScreenMode() {
  return document.fullscreenElement !== null;
}
```

If `fullscreenElement` isn't `null`, this returns `true`, indicating that fullscreen mode is in effect.

## See also

- Fullscreen API
- Guide to the Fullscreen API
- `Document.fullscreenEnabled`
