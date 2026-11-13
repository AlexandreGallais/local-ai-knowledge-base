---
title: "SVGSVGElement: viewBox property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgsvgelement/viewbox/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGSVGElement: viewBox property

The **`viewBox`** read-only property of the `SVGSVGElement` interface reflects the `` element's `viewBox` attribute as an `SVGAnimatedRect`.

The property describes the `` element's `viewBox` attribute, which is used to define the x-coordinate, y-coordinate, width, and height of an `` element. The `SVGAnimatedRect.baseVal` and `SVGAnimatedRect.animVal` properties are both `SVGRect` objects, or `null` if the `viewBox` is not defined. These objects' components may differ from the `SVGSVGElement.x`, `SVGSVGElement.y`, `SVGSVGElement.width` and `SVGSVGElement.height` properties, as the `x`, `y`, `width`, and `height` attributes take precedence over the `viewBox` attribute.

For non-nested SVG elements, the values of the CSS `x`, `y`, `width`, and `height` properties take precedence over any element attributes, so the values defined by the `viewBox` may not be reflected in the element's appearance.

## Value

An `SVGAnimatedRect`.

## Example

Give the following SVG opening tag:

```html
<svg viewBox="-12 -18 200 300" x="5" y="5" height="400" width="600"></svg>
```

We can retrieve the `viewBox` values, but they differ from the `x`, `y`, `width`, and `height` properties:

```js
const svg = document.querySelector("svg");
const vBox = svg.viewBox;

// The SVGSVGElement viewBox property
console.dir(vBox); // SVGAnimatedRect { baseVal: SVGRect, animVal: SVGRect }
console.log(vBox.baseVal.x); // -12
console.log(vBox.baseVal.y); // -18
console.log(vBox.baseVal.width); // 200
console.log(vBox.baseVal.height); // 300

// Other SVGSVGElement properties
console.log(svg.x); // 5
console.log(svg.y); // 5
console.log(svg.width); // 400
console.log(svg.height); // 600
```

## See also

- `SVGAnimatedRect.baseVal`
- `SVGAnimatedRect.animVal`
- `preserveAspectRatio`
