---
title: "<g>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/element/g/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <g>

The **``** SVG element is a container used to group other SVG elements.

Transformations applied to the `` element are performed on its child elements, and most of its presentation attributes are inherited by its children. It can also group multiple elements to be referenced later with the `<use>` element.

## Attributes

This element only includes global attributes.

Most of the presentation attributes applied to the element are inherited by its children.
However, geometry properties are only valid as presentation attributes on their designated elements — they have no effect on a `` element and are not passed to its children.

These non-inherited attributes include:

- `cx`, `cy`, `r`: `<circle>`, `<ellipse>`
- `rx`, `ry`: `<ellipse>`, `<rect>`
- `d`: ``
- `x`, `y`, `width`, `height`: `<foreignObject>`, `<image>`, `<rect>`, ``, `<symbol>`, `<use>`

Non-presentation attributes, even those that are valid on `` (such as `id` or `class`), are also not inherited.

## DOM Interface

This element implements the `SVGGElement` interface.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Using g to inherit presentation attributes -->
  <g fill="white" stroke="green" stroke-width="5">
    <circle cx="40" cy="40" r="25" />
    <circle cx="60" cy="60" r="25" />
  </g>
</svg>
```
