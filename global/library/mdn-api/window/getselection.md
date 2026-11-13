---
title: "Window: getSelection() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/getselection/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: getSelection() method

The **`getSelection()`** method of the `Window` interface returns the `Selection` object associated with the window's `document`, representing the range of text selected by the user, or the current position of the caret.

`window.getSelection()` is a shorthand for `window.document.getSelection()`. Read `Document.getSelection()` for more information.

## Syntax

```js
getSelection()
```

### Parameters

None.

### Return value

A `Selection` object, or `null` if the associated document has no browsing context (for example, the window is an `` that is not attached to a document).

When called on an `` that is not displayed (e.g., where `display: none` is set) Firefox returns `null`, whereas other browsers returns a `Selection` object with `Selection.type` set to `None`.

## Examples

### Getting a Selection object

```js
const selection = window.getSelection();
const selRange = selection.getRangeAt(0);
// do stuff with the range

console.log(selection); // Selection object
```

## See also

- Selection API
- `Selection`
- `Range`
- `Document.getSelection()`
- `HTMLInputElement.setSelectionRange()`
