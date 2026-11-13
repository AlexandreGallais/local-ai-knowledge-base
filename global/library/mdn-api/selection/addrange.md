---
title: "Selection: addRange() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/selection/addrange/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Selection: addRange() method

The **`Selection.addRange()`** method adds a
`Range` to a `Selection`.

## Syntax

```js
addRange(range)
```

### Parameters

- `range`
    A `Range` object that will be added to the `Selection`.

### Return value

None (`undefined`).

## Examples

Note that only Firefox supports multiple selection ranges. In this example, other browsers will not add new ranges to the selection if it already contains one.

### HTML

```html
<p>
  I <strong>insist</strong> that you <strong>try</strong> selecting the
  <strong>strong words</strong>.
</p>
<button>Select strong words</button>
```

### JavaScript

```js
let button = document.querySelector("button");

button.addEventListener("click", () => {
  const selection = window.getSelection();
  const strongElems = document.getElementsByTagName("strong");

  if (selection.rangeCount > 0) {
    selection.removeAllRanges();
  }

  for (const node of strongElems) {
    const range = document.createRange();
    range.selectNode(node);
    selection.addRange(range);
  }
});
```

## See also

- `Selection`, the interface this method belongs to
