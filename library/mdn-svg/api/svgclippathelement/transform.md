---
title: "SVGClipPathElement: transform property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgclippathelement/transform/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGClipPathElement: transform property

The read-only **`transform`** property of the `SVGClipPathElement` interface reflects the `transform` attribute of a `<clipPath>` element, that is a list of transformations applied to the element.

## Value

An `SVGTransformList`.

## Examples

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<div>
  <svg viewBox="0 0 100 100" width="200" height="200">
    <clipPath
      id="clip1"
      clipPathUnits="objectBoundingBox"
      transform="skewX(40) scale(1 0.5)">
      <circle cx=".5" cy=".5" r=".35" />
    </clipPath>

    <rect id="r1" x="0" y="0" width="100" height="100" />

    <use clip-path="url(#clip1)" href="#r1" fill="lightblue" />
  </svg>
</div>
<pre id="log"></pre>
```

```js
const translateType = [
  "unknown",
  "matrix()",
  "translate()",
  "scale()",
  "rotate()",
  "skewx()",
  "skewy()",
];

const clipPath1 = document.getElementById("clip1");

const log = document.getElementById("log");

let result = "The following transformation have been applied:\n";
for (const transform of clipPath1.transform.baseVal) {
  result += `- A transform of type '${translateType[transform.type]}' found.\n`;
}

log.textContent = result;
```

## See also

- `clipPathUnits`
- `<clipPath>`
