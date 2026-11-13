---
title: "SVGAnimatedNumberList: animVal property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimatednumberlist/animval/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedNumberList: animVal property

The **`animVal`** read-only property of the `SVGAnimatedNumberList` interface represents the current animated value of an animatable attribute that accepts a list of `<number>` values.

This property reflects the `viewBox` attribute of the `` element, the `values` attribute of the `feColorMatrix` element and the `points` attribute of the `<rect>`, `<polygon>`, or `<polyline>` element as a readonly `SVGNumberList`, providing access to a dynamically updated list of points defined by the `points` attribute.

## Value

An `SVGNumberList` object representing the animated value of the attribute. The list contains one or more numbers corresponding to the individual number values specified in the attribute.

## Examples

```js
const rect = document.querySelector("rect");

// Set the animatable 'points' attribute with number values
rect.setAttribute("points", "10,10 20,10 20,20 10,20");

// Access the SVGAnimatedNumberList object
const points = rect.points;

console.dir(points.animVal); // the animated state
```

## See also

- `SVGAnimatedNumber`
