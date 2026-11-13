---
title: "SVGEllipseElement"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgellipseelement/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGEllipseElement

The **`SVGEllipseElement`** interface provides access to the properties of `<ellipse>` elements.

## Instance properties

_Inherits methods from its parent interface, `SVGGeometryElement`._

- `SVGEllipseElement.cx` (read-only)
    This property returns an `SVGAnimatedLength` reflecting the `cx` attribute of the given `<ellipse>` element.
- `SVGEllipseElement.cy` (read-only)
    This property returns an `SVGAnimatedLength` reflecting the `cy` attribute of the given `<ellipse>` element.
- `SVGEllipseElement.rx` (read-only)
    This property returns an `SVGAnimatedLength` reflecting the `rx` attribute of the given `<ellipse>` element.
- `SVGEllipseElement.ry` (read-only)
    This property returns an `SVGAnimatedLength` reflecting the `ry` attribute of the given `<ellipse>` element.

## Instance methods

_Inherits methods from its parent interface, `SVGGeometryElement`._

## Example

### SVG

```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="100" cy="100" rx="100" ry="60" id="ellipse" />
</svg>
```

### JavaScript

```js
const ellipse = document.getElementById("ellipse");

function outputSize() {
  // Outputs "horizontal radius: 100 vertical radius: 60"
  console.log(
    `horizontal radius: ${ellipse.rx.baseVal.valueAsString}`,
    `vertical radius: ${ellipse.ry.baseVal.valueAsString}`,
  );
}

ellipse.addEventListener("click", outputSize);
```

## See also

- `<ellipse>` SVG Element
