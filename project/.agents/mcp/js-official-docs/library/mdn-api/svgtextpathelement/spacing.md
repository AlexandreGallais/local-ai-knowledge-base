---
title: "SVGTextPathElement: spacing property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgtextpathelement/spacing/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGTextPathElement: spacing property

The **`spacing`** read-only property of the `SVGTextPathElement` interface represents the spacing between typographic characters that are to be rendered along a path.

Note that the `spacing.baseVal` property reflects the `spacing` attribute of the given `<textPath>` element, as an enumerated value.
While `spacing` is read-only, you can use `spacing.baseVal` to modify the value of the corresponding attribute.

In SVG 2, `spacing.animVal` also reflects the non-animated value of the attribute.

## Value

An `SVGAnimatedEnumeration` object.

The following static properties indicate the values that can be returned from `spacing.baseVal` (and `spacing.animVal`):

- `SVGTextPathElement.TEXTPATH_SPACINGTYPE_UNKNOWN` (0)
    The type is not one of the predefined types.
    This value cannot be set.
- `SVGTextPathElement.TEXTPATH_SPACINGTYPE_AUTO` (1)
    Corresponds to the value `auto`.
- `SVGTextPathElement.TEXTPATH_SPACINGTYPE_EXACT` (2)
    Corresponds to the value `exact`.

Note that `baseVal` cannot be set to `0` (`TEXTPATH_SPACINGTYPE_UNKNOWN`) or any value other than those listed above.
`animVal` is read-only and with throw if you attempt to write to it.

## Examples

### Accessing the `spacing` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <defs>
    <path id="myPath" d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" />
  </defs>
  <text font-size="20" fill="blue">
    <textPath id="myTextPath" href="#myPath" spacing="auto">
      This text follows a path!
    </textPath>
  </text>
</svg>
```

```js
const textPath = document.getElementById("myTextPath");

// Access the spacing property
console.log(textPath.spacing.baseVal); // Output: 1 (TEXTPATH_SPACINGTYPE_AUTO)
```

## See also

- `SVGTextPathElement.method`
- `SVGTextPathElement.side`
- `SVGTextPathElement` spacing types
