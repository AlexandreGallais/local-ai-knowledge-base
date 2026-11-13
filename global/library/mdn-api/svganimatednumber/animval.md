---
title: "SVGAnimatedNumber: animVal property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimatednumber/animval/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedNumber: animVal property

The **`animVal`** read-only property of the `SVGAnimatedNumber` interface represents the animated value of an SVG element's numeric attribute.

Some animatable SVG attributes accept a single number, such as the `radius` attribute of the `<circle>` or `<ellipse>` elements and the `width` and `height` attributes of the `<rect>` element, and many others. The `animVal` attribute provides access to the current animated value of the animatable numeric attribute during animations.

## Value

A `number`; the current value of the animated attribute as a float.

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

console.log(path.pathLength.animVal); // output: 50
console.log(path.pathLength.baseVal); // output: 90
```

We use the `animVal` property to access the current value of the animating `pathLength`, while the `SVGAnimatedNumber.baseVal` reflects the base (non-animating) value of the `pathLength`.

## See also

- `SVGAnimatedInteger`
- `SVGElement`
