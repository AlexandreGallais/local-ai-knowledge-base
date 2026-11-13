---
title: "Selection: selectAllChildren() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/selection/selectallchildren/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection: selectAllChildren() method

The **`Selection.selectAllChildren()`** method adds all the
children of the specified node to the selection. Previous selection is lost.

## Syntax

```js
selectAllChildren(parentNode)
```

### Parameters

- `parentNode`
    All children of `parentNode` will be selected. `parentNode`
    itself is not part of the selection.

### Return value

None (`undefined`).

## Examples

### HTML

```html
<main>
  <button>Select Footer</button>
  <p>Welcome to my website.</p>
  <p>I hope you enjoy your visit.</p>
</main>
<footer>
  <address>user@example.com</address>
  <p>© 2019</p>
</footer>
```

### JavaScript

```js
const button = document.querySelector("button");
const footer = document.querySelector("footer");

button.addEventListener("click", (e) => {
  window.getSelection().selectAllChildren(footer);
});
```

## See also

- `Selection`, the interface it belongs to.
