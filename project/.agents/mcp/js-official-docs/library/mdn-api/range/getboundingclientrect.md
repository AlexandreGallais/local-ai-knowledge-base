---
title: "Range: getBoundingClientRect() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/range/getboundingclientrect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Range: getBoundingClientRect() method

The **`Range.getBoundingClientRect()`** method returns a `DOMRect` object that bounds the contents of the range; this is a rectangle
enclosing the union of the bounding rectangles for all the elements in the range.

This method is useful for determining the viewport coordinates of the cursor or
selection inside a text box. See `Element.getBoundingClientRect()` for
details on the returned value.

## Syntax

```js
getBoundingClientRect()
```

### Parameters

None.

### Return value

A `DOMRect` object that encloses the union of the bounding rectangles for all elements in the range.

## Examples

### HTML

```html
<div id="highlight"></div>
<p>
  This example positions a "highlight" rectangle behind the contents of a range.
  The range's content <em>starts here</em> and continues on until it
  <em>ends here</em>. The bounding client rectangle contains everything selected
  in the range.
</p>
```

### CSS

```css
#highlight {
  background: yellow;
  position: absolute;
  z-index: -1;
}

p {
  width: 200px;
}
```

### JavaScript

```js
const range = document.createRange();
range.setStartBefore(document.getElementsByTagName("em").item(0));
range.setEndAfter(document.getElementsByTagName("em").item(1));

const clientRect = range.getBoundingClientRect();
const highlight = document.getElementById("highlight");
highlight.style.left = `${clientRect.x}px`;
highlight.style.top = `${clientRect.y}px`;
highlight.style.width = `${clientRect.width}px`;
highlight.style.height = `${clientRect.height}px`;
```

## See also

- `Range.getClientRects()` - finer-grained result for non-rectangular
  ranges (e.g., when the selection wraps onto the next line);
- `Element.getBoundingClientRect()`
- `Document.caretPositionFromPoint()` - to get the (node, offset) from
  viewport coordinates.
