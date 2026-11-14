---
title: "Selection: deleteFromDocument() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/selection/deletefromdocument/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection: deleteFromDocument() method

The **`deleteFromDocument()`** method of the
`Selection` interface invokes the `Range.deleteContents()` method on the selected `Range`.

## Syntax

```js
deleteFromDocument()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

This example lets you delete selected text and/or nodes by clicking a button. Upon clicking the
button, the
`Window.getSelection()` method gets the selected content, and the
`deleteFromDocument()` method removes it.

### HTML

```html
<p>Try highlighting some of the elements in these paragraphs.</p>
<p>
  Once you do, you can remove the selected content by clicking the button below.
</p>
<h2>All of the selected text/nodes will be removed.</h2>
<button>Delete selected text</button>
```

### JavaScript

```js
let button = document.querySelector("button");
button.addEventListener("click", deleteSelection);

function deleteSelection() {
  let selection = window.getSelection();
  selection.deleteFromDocument();
}
```

## See also

- `Selection`, the interface defining this method
