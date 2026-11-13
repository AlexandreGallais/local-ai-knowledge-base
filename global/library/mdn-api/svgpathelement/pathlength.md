---
title: "SVGPathElement: pathLength property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgpathelement/pathlength/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGPathElement: pathLength property

The **`pathLength`** read-only property of the `SVGPathElement` interface reflects the `pathLength` attribute of the given `` element.

## Value

An `SVGAnimatedNumber`.

## Examples

### Accessing the `pathLength` Property

```html
<svg width="200" height="100">
  <path id="myPath" d="M 0,30 h100" pathLength="50" />
</svg>
```

```js
const pathElement = document.getElementById("myPath");

// Access the pathLength property
const animatedNumber = pathElement.pathLength;

// The base value of the pathLength attribute
console.log(animatedNumber.baseVal); // Output: 100
```

## See also

- `SVGGeometryElement.pathLength`
- `pathLength`
- `SVGAnimatedLength`
