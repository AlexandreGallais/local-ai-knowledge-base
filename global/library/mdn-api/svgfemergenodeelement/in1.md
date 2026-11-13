---
title: "SVGFEMergeNodeElement: in1 property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfemergenodeelement/in1/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEMergeNodeElement: in1 property

The **`in1`** read-only property of the `SVGFEMergeNodeElement` interface reflects the `in` attribute of the given `<feMergeNode>` element.

## Value

An `SVGAnimatedString` object.

## Examples

### Accessing the `in` Property of `feMergeNode` Element

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="mergeFilter">
      <!-- Merges two inputs -->
      <feMerge>
        <feMergeNode in="SourceGraphic" />
        <feMergeNode in="BackgroundImage" />
      </feMerge>
    </filter>
  </defs>
  <rect
    x="20"
    y="20"
    width="100"
    height="100"
    fill="lightblue"
    filter="url(#mergeFilter)" />
</svg>
```

We can access the `in` attribute of the `feMergeNode` element.

```js
// Select the first feMergeNode element
const mergeNode = document.querySelector("feMergeNode");
console.log(mergeNode.in1.baseVal); // Output: "SourceGraphic"
```

## See also

- `SVGAnimatedString`
