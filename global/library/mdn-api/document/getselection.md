---
title: "Document: getSelection() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/getselection/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: getSelection() method

The **`getSelection()`** method of the `Document` interface returns the `Selection` object associated with this document, representing the range of text selected by the user, or the current position of the caret.

## Syntax

```js
getSelection()
```

### Parameters

None.

### Return value

A `Selection` object, or `null` if the document has no browsing context (for example, it is the document of an `` that is not attached to a document).

## Usage notes

You can call `Window.getSelection()`, which is identical to `window.document.getSelection()`.

Currently, `getSelection()` doesn't work on the content of `<textarea>` and `` elements in Firefox.
`HTMLInputElement.setSelectionRange()` or the `selectionStart` and `selectionEnd` properties could be used to work around this.

Notice also the difference between _selection_ and _focus_. `Document.activeElement` returns the focused element.

## Examples

### Getting a Selection object

```js
const selection = document.getSelection();
const selRange = selection.getRangeAt(0);
// do stuff with the range

console.log(selection); // Selection object
```

## See also

- Selection API
- `Selection`
- `Range`
- `Window.getSelection()`
- `HTMLInputElement.setSelectionRange()`
