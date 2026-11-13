---
title: "<feMergeNode>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/element/femergenode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <feMergeNode>

The **`<feMergeNode>`** SVG takes the result of another filter to be processed by its parent `<feMerge>`.

## Attributes

- `in`

## DOM Interface

This element implements the `SVGFEMergeNodeElement` interface.

## Example

```html
<svg
  width="200"
  height="200"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <filter id="feOffset" x="-40" y="-20" width="100" height="200">
    <feOffset in="SourceGraphic" dx="60" dy="60" />
    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur2" />
    <feMerge>
      <feMergeNode in="blur2" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>

  <rect
    x="40"
    y="40"
    width="100"
    height="100"
    stroke="black"
    fill="green"
    filter="url(#feOffset)" />
  <rect x="40" y="40" width="100" height="100" stroke="black" fill="green" />
</svg>
```

## See also

- `<filter>`
- `<animate>`
- `<set>`
- `<feMerge>`
- SVG tutorial: Filter effects
