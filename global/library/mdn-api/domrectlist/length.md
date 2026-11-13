---
title: "DOMRectList: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domrectlist/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMRectList: length property

The read-only **`length`** property of the `DOMRectList` interface returns the number of `DOMRect` objects in the list.

## Value

A positive integer representing the count of `DOMRect` objects in the `DOMRectList`. If there are no rectangles in the list, `length` is `0`.

## Examples

In the following example, we retrieve the list of rectangles for a `` element using `Element.getClientRects()`. We then display the number of rectangles in the list within another `` element on the page.

First, the HTML:

```html
<div id="box"></div>
<div id="output"></div>
```

```css
#box {
  width: 50px;
  height: 20px;
  border: 1px solid black;
}
```

Now the JavaScript:

```js
const box = document.getElementById("box");
const rects = box.getClientRects();
const output = document.getElementById("output");

output.textContent = `Number of rectangles: ${rects.length}`;
```

The output looks like this:
