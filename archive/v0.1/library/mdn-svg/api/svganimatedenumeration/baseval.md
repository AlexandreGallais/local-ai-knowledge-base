---
title: "SVGAnimatedEnumeration: baseVal property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimatedenumeration/baseval/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedEnumeration: baseVal property

The **`baseVal`** property of the `SVGAnimatedEnumeration` interface represents the value of an SVG enumeration.

## Value

An integer representing the base value of the enumeration.
This is the non-animated content value of the corresponding attribute.

The allowed values depend on the attribute that is reflected.

## Exceptions

- `TypeError`
    Thrown if the property is set to a constant that is not in the set of defined enumerations, or to `0`, which represents the "unknown attribute" value.

## Examples

### Basic usage

Consider this snippet with a `<clipPath>` element: Its `clipPathUnits` is associated with an `SVGAnimatedEnumeration` object.

```html
<svg viewBox="0 0 100 100" width="200" height="200">
  <clipPath id="clip1" clipPathUnits="userSpaceOnUse">
    <circle cx="50" cy="50" r="35" />
  </clipPath>

  <!-- Some reference rect to materialized to clip path -->
  <rect id="r1" x="0" y="0" width="45" height="45" />
</svg>
```

The following JavaScript gets the element, and logs the `baseVal` of the `SVGClipPathElement.clipPathUnits` property.

```js
const clipPathElt = document.getElementById("clip1");
console.log(clipPathElt.clipPathUnits.baseVal); // Logs 1 that correspond to userSpaceOnUse
```

## See also

- `SVGAnimatedEnumeration.animVal`
