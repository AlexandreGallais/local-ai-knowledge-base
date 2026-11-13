---
title: "Document: elementFromPoint() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/elementfrompoint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: elementFromPoint() method

The **`elementFromPoint()`**
method, available on the `Document` object, returns the topmost `Element` at the specified coordinates
(relative to the viewport).

If the element at the specified point belongs to another document (for example, the
document of an ``), that document's parent element is returned
(the `` itself). If the element at the given point is anonymous
or XBL generated content, such as a textbox's scroll bars, then the first non-anonymous
ancestor element (for example, the textbox) is returned.

Elements with `pointer-events` set to `none` will be ignored,
and the element below it will be returned.

If the method is run on another document (like an ``'s
subdocument), the coordinates are relative to the document where the method is being
called.

If the specified point is outside the visible bounds of the document or either
coordinate is negative, the result is `null`.

If you need to find the specific position inside the element, use
`Document.caretPositionFromPoint()`.

## Syntax

```js
elementFromPoint(x, y)
```

### Parameters

- `x`
    The horizontal coordinate of a point, relative to the left edge of the current
    viewport.
- `y`
    The vertical coordinate of a point, relative to the top edge of the current
    viewport.

### Return value

The topmost `Element` object located at the specified coordinates.

## Examples

This example creates two buttons which let you set the current color of the paragraph
element located under the coordinates `(2, 2)`.

### HTML

```html
<p id="para1">Some text here</p>
<button>Blue</button>
<button>Red</button>
```

The HTML provides the paragraph whose color will be affected, as well as two buttons:
one to change the color to blue, and another to change the color to red.

### JavaScript

```js
function changeColor(newColor) {
  const elem = document.elementFromPoint(2, 2);
  elem.style.color = newColor;
}

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", (event) => {
    changeColor(event.target.textContent.toLowerCase());
  });
});
```

The `changeColor()` method obtains the element located at the specified
point, then sets that element's current foreground `color` property to the
color specified by the `newColor` parameter.

## See also

- `Document.elementsFromPoint()`
