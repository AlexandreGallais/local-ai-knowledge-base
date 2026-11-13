---
title: "SVGAnimatedNumberList: baseVal property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimatednumberlist/baseval/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedNumberList: baseVal property

The **`baseVal`** read-only property of the `SVGAnimatedNumberList` interface represents the base (non-animated) value of an animatable attribute that accepts a list of `<number>` values.

This property reflects the `viewBox` attribute of the `` element, the `values` attribute of the `feColorMatrix` element and the `points` attribute of the `<rect>`, `<polygon>`, or `<polyline>` element as a readonly `SVGNumberList`, providing access to a static list of points defined by the `points` attribute.

## Value

An `SVGNumberList` object representing the base value of the attribute. The list contains one or more numbers corresponding to the individual number values specified in the attribute.

## Examples

```js
const rect = document.querySelector("rect");

// Set the animatable 'points' attribute with number values
rect.setAttribute("points", "10,10 20,10 20,20 10,20");

// Access the SVGAnimatedNumberList object
const points = rect.points;

// Modify the base value
points.baseVal = [10, 15, 25, 30];

// Verify the reflected attribute value
console.log(rect.getAttribute("points")); // Output: "10,15 25,30"
```

## See also

- `SVGAnimatedNumber`
