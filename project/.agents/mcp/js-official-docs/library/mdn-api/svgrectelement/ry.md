---
title: "SVGRectElement: ry property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgrectelement/ry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGRectElement: ry property

The **`ry`** read-only property of the `SVGRectElement` interface describes the vertical curve of the corners of an SVG rectangle as a `SVGAnimatedLength`. The length is in user coordinate system units along the y-axis. Its syntax is the same as that for `<length>`.

It reflects the `<rect>` element's `ry` presentational attribute. The CSS `ry` property takes precedence over the SVG `ry` presentational attribute, so the value may not reflect the actual size of the rounded corners. The default value is `0`, which draws a rectangle with square corners.

## Value

An `SVGAnimatedLength`.

## Example

Given the following SVG:

```html
<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="60" height="60" rx="15" ry="15" />
  <rect x="60" y="0" width="60" height="60" rx="15%" ry="15%" />
</svg>
```

We can access the computed values of the `ry` attributes:

```js
const rectangles = document.querySelectorAll("rect");
const rySize0 = rectangle[0].ry;
const rySize1 = rectangle[1].ry;
console.log(rySize0.baseVal.value); // output: 15 (the value of `ry`)
console.log(rySize1.baseVal.value); // output: 30 (15% of 200)
```

## See also

- `SVGRectElement.rx`
