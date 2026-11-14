---
title: "HTMLImageElement: x property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlimageelement/x/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLImageElement: x property

The read-only **`x`** property of the `HTMLImageElement` interface indicates the x-coordinate of the `` element's left border edge relative to the root element's origin.

## Value

An integer value indicating the distance in pixels from the left edge of the element's nearest root element to the left edge of the `` element's border box. The nearest root element is the outermost `<html>` element that contains the image. If the image is in an ``, its `x` is relative to that frame.

In the diagram below, the left border edge is the left edge of the blue padding area. So the value returned by `x` would be the distance from that point to the left edge of the content area.

## Examples

The example below demonstrates the use of the `HTMLImageElement` properties `x` and `y`.

### HTML

```html
<img id="avatar" src="/shared-assets/images/examples/grapefruit-slice.jpg" />
<pre id="log"></pre>
```

### CSS

The CSS defining the image size and its position:

```css
img {
  margin-left: 30px;
  margin-top: 20px;
  max-width: 4em;
}
```

### JavaScript

The JavaScript code that fetches the image and looks up its `x` and `y` values is below.

```js
const logBox = document.querySelector("pre");

const log = (msg) => {
  logBox.innerText += `${msg}\n`;
};

const image = document.getElementById("avatar");

log(`Image's global X: ${image.x}`);
log(`Image's global Y: ${image.y}`);
```

Finally, we can look up and display the values of the `HTMLImageElement`'s `x` and `y` properties.

### Result

The resulting image looks like this:

## See also

- `HTMLImageElement.y`
