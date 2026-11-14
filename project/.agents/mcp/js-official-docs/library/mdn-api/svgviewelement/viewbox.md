---
title: "SVGViewElement: viewBox property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgviewelement/viewbox/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGViewElement: viewBox property

The **`viewBox`** read-only property of the `SVGViewElement` interface reflects the `viewBox` attribute of the given `<view>` element. It represents the `x`, `y`, `width`, and `height` values defining the area to be used for the `view`'s `viewBox`.

## Value

An `SVGAnimatedRect` object.

## Example

Given the following SVG, we can use the `viewBox` property to retrieve the dimensions of the `viewBox` for a `view` element:

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <view id="view1" viewBox="0 0 50 50"></view>
  <circle cx="100" cy="100" r="80" fill="blue" />
</svg>
```

We can access the `viewBox` attribute:

```js
const view = document.querySelector("view");

console.log(view.viewBox.baseVal); // output: DOMRect {x: 0, y: 0, width: 50, height: 50}
```

## See also

- `viewBox`
