---
title: "SVGTextPathElement: href property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgtextpathelement/href/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGTextPathElement: href property

The **`href`** read-only property of the `SVGTextPathElement` interface reflects the `href` attribute (or the deprecated `xlink:href` attribute) of the given `<textPath>` element.

## Value

An `SVGAnimatedString` object.

## Examples

### Accessing the `href` property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
  <defs>
    <path id="myPath" d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" />
  </defs>
  <text font-size="20" fill="blue">
    <textPath id="myTextPath" href="#myPath">
      This text follows a path!
    </textPath>
  </text>
</svg>
```

```js
const textPath = document.getElementById("myTextPath");

// Access the href property
console.log(textPath.href.baseVal); // Output: "#myPath"
```

## See also

- SVG `href` attribute
