---
title: "SVGTextPathElement: startOffset property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgtextpathelement/startoffset/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGTextPathElement: startOffset property

The **`startOffset`** read-only property of the `SVGTextPathElement` interface reflects the X component of the `startOffset` attribute of the given `<textPath>`, which defines an offset from the start of the path for the initial current text position along the path after converting the path to the `<textPath>` element's coordinate system.

## Value

An `SVGAnimatedLength` object.

## Examples

### Accessing the `startOffset` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <defs>
    <path id="myPath" d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" />
  </defs>
  <text font-size="20" fill="blue">
    <textPath id="myTextPath" href="#myPath" startOffset="25%">
      This text follows a path!
    </textPath>
  </text>
</svg>
```

```js
const textPath = document.getElementById("myTextPath");

// Access the startOffset property
console.log(textPath.startOffset.baseVal.valueAsString); // Output: "25%"
```

## See also

- SVG `startOffset` attribute
