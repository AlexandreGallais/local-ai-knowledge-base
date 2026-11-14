---
title: "Range: selectNodeContents() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/selectnodecontents/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range: selectNodeContents() method

The **`Range.selectNodeContents()`** method sets the `Range` to contain the contents of a `Node`.

The parent `Node` of the start and end of the `Range` will be the
reference node. The `startOffset` is 0, and the `endOffset` is the
number of child `Node`s or number of characters contained in the reference
node.

## Syntax

```js
selectNodeContents(referenceNode)
```

### Parameters

- `referenceNode`
    The `Node` whose contents will be selected within a `Range`.

### Return value

None (`undefined`).

## Examples

```js
const range = document.createRange();
const referenceNode = document.querySelector("div");
range.selectNodeContents(referenceNode);
```

### Live sample

This example lets the user select and deselect a paragraph with buttons.
`Document.createRange()`, `Range.selectNodeContents()`, and
`Selection.addRange()` are used to select the content.
`Window.getSelection()` and `Selection.removeAllRanges()` are
used to deselect it.

#### HTML

```html
<p id="p">
  <strong>Use the buttons below</strong> to select or deselect the contents of
  this paragraph.
</p>
<button id="select-button">Select paragraph</button>
<button id="deselect-button">Deselect paragraph</button>
```

#### JavaScript

```js
const p = document.getElementById("p");
const selectButton = document.getElementById("select-button");
const deselectButton = document.getElementById("deselect-button");

selectButton.addEventListener("click", (e) => {
  // Clear any current selection
  const selection = window.getSelection();
  selection.removeAllRanges();

  // Select paragraph
  const range = document.createRange();
  range.selectNodeContents(p);
  selection.addRange(range);
});

deselectButton.addEventListener("click", (e) => {
  const selection = window.getSelection();
  selection.removeAllRanges();
});
```

#### Result

## See also

- The DOM interfaces index
