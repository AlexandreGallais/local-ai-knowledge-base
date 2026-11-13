---
title: "SVGAnimatedNumber: baseVal property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimatednumber/baseval/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedNumber: baseVal property

The **`baseVal`** property of the `SVGAnimatedNumber` interface represents the base (non-animated) value of an animatable numeric attribute.

Some animatable SVG attributes accept a single numeric value, such as the `radius` attribute of the `<circle>` or `<ellipse>` elements and the `width` and `height` attributes of the `<rect>` element, and many others. The `baseVal` property reflects and updates the base, or non-animated, value of the numeric attribute.

## Value

A `number`; the base value of the attribute as a float.

## Examples

This example includes a `` element with a nested `<animate>` element that animates the value of the path's `pathLength` attribute:

```html
<path d="M 0,40 h100" pathLength="90" id="path">
  <animate
    attributeName="pathLength"
    values="50; 90; 50;"
    dur="10s"
    repeatCount="indefinite" />
</path>
```

```js
const path = document.querySelector("path");

console.log(path.pathLength.baseVal); // output: 90
path.pathLength.baseVal = 50; // updates the value
console.log(path.pathLength.baseVal); // output: 90
```

The `baseVal` reflect that value of the `pathLength` attribute. We also use the `baseVal` property to access the base (non-animating) value of the animating `pathLength`.

To access the current value of the `pathLength` value as it animates, use the `SVGAnimatedNumber.animVal` property.

## See also

- `SVGAnimatedInteger`
- `SVGElement`
