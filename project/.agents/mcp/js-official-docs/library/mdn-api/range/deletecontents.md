---
title: "Range: deleteContents() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/deletecontents/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range: deleteContents() method

The **`Range.deleteContents()`** method removes all completely-selected `nodes` within this range from the document. For the partially selected nodes at the start or end of the range, only the selected portion of the text is deleted, while the node itself remains intact. Afterwards, the range is collapsed to the end of the last selected node.

```plain
<p>paragraph 1</p><p>paragraph 2</p><p>paragraph 3</p>
       ^----------- selection ------------^

deleteContents() returns:

<p>para</p><p>graph 3</p>
```

Unlike `Range.extractContents()`, this method does not return a `DocumentFragment` containing the deleted content.

## Syntax

```js
deleteContents()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Using deleteContents()

Select some text, possibly spanning multiple paragraphs, and then click the button to delete the selected text. Open your DOM inspector to check the updated DOM structure.

```html
<p>paragraph 1</p>
<p>paragraph 2</p>
<p>paragraph 3</p>
<button id="delete">Delete selected text</button>
<button id="reset">Reset</button>
```

```js
const button = document.getElementById("delete");
const reset = document.getElementById("reset");
const output = document.getElementById("output");

button.addEventListener("click", () => {
  const range = document.getSelection().getRangeAt(0);
  range.deleteContents();
});

reset.addEventListener("click", () => {
  window.location.reload();
});
```

## See also

- The DOM interfaces index
