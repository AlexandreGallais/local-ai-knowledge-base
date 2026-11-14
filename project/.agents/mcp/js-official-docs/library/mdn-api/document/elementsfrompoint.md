---
title: "Document: elementsFromPoint() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/elementsfrompoint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: elementsFromPoint() method

The **`elementsFromPoint()`** method
of the `Document` interface returns an array of all elements
at the specified coordinates (relative to the viewport).
The elements are ordered from the topmost to the bottommost box of the viewport.

It operates in a similar way to the `elementFromPoint()` method.

## Syntax

```js
elementsFromPoint(x, y)
```

### Parameters

- `x`
    The horizontal coordinate of a point.
- `y`
    The vertical coordinate of a point.

### Return value

An array of `Element` objects, ordered from the topmost to the bottommost box of the viewport.

## Examples

### HTML

```html
<div>
  <p>Some text</p>
</div>
<p>Elements at point 30, 20:</p>
<div id="output"></div>
```

### JavaScript

```js
let output = document.getElementById("output");
if (document.elementsFromPoint) {
  let elements = document.elementsFromPoint(30, 20);
  elements.forEach((elt, i) => {
    output.textContent += elt.localName;
    if (i < elements.length - 1) {
      output.textContent += " < ";
    }
  });
} else {
  output.innerHTML = `<span style="color: red">
  Browser does not support
  <code>document.elementsFromPoint()</code>
</span>
`;
}
```

## See also

- `Document.elementFromPoint()`
