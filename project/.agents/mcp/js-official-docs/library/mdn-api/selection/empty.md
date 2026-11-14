---
title: "Selection: empty() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/selection/empty/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection: empty() method

The **`Selection.empty()`** method removes all ranges from the selection, leaving the `anchorNode` and `focusNode` properties equal to `null` and nothing selected. When this method is called, a `selectionchange` event is fired at the document.

> **Note:**
> This method is an alias for the `Selection.removeAllRanges()` method.

## Syntax

```js
empty()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

This example displays a message when something is selected on the page or not. It does this by listening to the `selectionchange` event on the document. There also is a button that clears any selection by calling `Selection.empty()`. When this happens, the selection is changed and the message is updated.

```html
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse laoreet
  urna eget sapien venenatis, eget facilisis diam mattis.
</p>
<button>Clear selection</button>
<pre id="log"></pre>
```

```js
const log = document.getElementById("log");

// The selection object is a singleton associated with the document
const selection = document.getSelection();

// Logs if there is a selection or not
function newSelectionHandler() {
  if (selection.rangeCount !== 0) {
    log.textContent = "Some text is selected.";
  } else {
    log.textContent = "No selection on this document.";
  }
}

document.addEventListener("selectionchange", () => {
  newSelectionHandler();
});

newSelectionHandler();

// The button cancel all selection ranges
const button = document.querySelector("button");
button.addEventListener("click", () => {
  selection.empty();
});
```

## See also

- `Selection.removeAllRanges()`
- `selectionchange`
