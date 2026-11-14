---
title: "SVGPatternElement: patternTransform property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgpatternelement/patterntransform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGPatternElement: patternTransform property

The **`patternTransform`** read-only property of the `SVGPatternElement` interface reflects the `patternTransform` attribute of the given `<pattern>` element. This property holds the transformation applied to the pattern itself, allowing for operations like `translate`, `rotate`, `scale`, and `skew`.

## Value

An `SVGAnimatedTransformList` object.

## Example

In this example, the pattern is rotated by 20 degrees, skewed on the X-axis by 30 degrees, and scaled by a factor of 1 horizontally and 0.5 vertically:

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Apply a transform on the tile -->
  <pattern
    id="p1"
    width=".25"
    height=".25"
    patternTransform="rotate(20)
                      skewX(30)
                      scale(1 0.5)">
    <circle cx="10" cy="10" r="10" />
  </pattern>

  <!-- Apply the transformed pattern tile -->
  <rect x="10" y="10" width="80" height="80" fill="url(#p1)" />
</svg>
```

## See also

- `SVGAnimatedEnumeration`
- `SVGUnitTypes`
