---
title: "SVGTextPathElement: method property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgtextpathelement/method/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGTextPathElement: method property

The **`method`** read-only property of the `SVGTextPathElement` interface represents the method by which text should be rendered along the path.

Note that the `method.baseVal` property reflects the `method` attribute of the given `<textPath>` element, as an enumerated value.
While `method` is read-only, you can use `method.baseVal` to modify the value of the corresponding attribute.

In SVG 2, `side.method` also reflects the non-animated value of the attribute.

## Value

An `SVGAnimatedEnumeration` object.

The following static properties indicate the values that can be returned from `method.baseVal` (and `method.animVal`):

- `SVGTextPathElement.TEXTPATH_METHODTYPE_UNKNOWN` (0)
    The type is not one of the predefined types.
- `SVGTextPathElement.TEXTPATH_METHODTYPE_ALIGN` (1)
    Corresponds to the value `align`.
- `SVGTextPathElement.TEXTPATH_METHODTYPE_STRETCH` (2)
    Corresponds to the value `stretch`.

Note that `baseVal` cannot be set to `0` (`TEXTPATH_METHODTYPE_UNKNOWN`) or any value other than those listed above.
`animVal` is read-only and with throw if you attempt to write to it.

## Examples

### Accessing the `method` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <defs>
    <path id="myPath" d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" />
  </defs>
  <text font-size="20" fill="blue">
    <textPath id="myTextPath" href="#myPath" method="align">
      This text follows a path!
    </textPath>
  </text>
</svg>
```

```js
const textPath = document.getElementById("myTextPath");

// Access the method property
console.log(textPath.method.baseVal); // Output: 1 (TEXTPATH_METHODTYPE_ALIGN)
```

## See also

- `SVGTextPathElement.spacing`
- `SVGTextPathElement` method types
