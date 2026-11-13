---
title: "<animateTransform>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/element/animatetransform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <animateTransform>

The **`<animateTransform>`** SVG element animates a transformation attribute on its target element, thereby allowing animations to control translation, scaling, rotation, and/or skewing.

## Attributes

- `by`
- `from`
- `to`
- `type`

## DOM Interface

This element implements the `SVGAnimateTransformElement` interface.

## Example

```html
<svg
  width="120"
  height="120"
  viewBox="0 0 120 120"
  xmlns="http://www.w3.org/2000/svg">
  <polygon points="60,30 90,90 30,90">
    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="rotate"
      from="0 60 70"
      to="360 60 70"
      dur="10s"
      repeatCount="indefinite" />
  </polygon>
</svg>
```
