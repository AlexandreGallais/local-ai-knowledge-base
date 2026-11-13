---
title: "repeatCount"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/repeatcount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# repeatCount

The **`repeatCount`** attribute indicates the number of times an animation will take place.

You can use this attribute with the following SVG elements:

- `<animate>`
- `<animateMotion>`
- `<animateTransform>`
- `<set>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="100" height="100">
    <animate
      attributeType="XML"
      attributeName="y"
      from="0"
      to="50"
      dur="1s"
      repeatCount="5" />
  </rect>
  <rect x="120" y="0" width="100" height="100">
    <animate
      attributeType="XML"
      attributeName="y"
      from="0"
      to="50"
      dur="1s"
      repeatCount="indefinite" />
  </rect>
</svg>
```

## Usage notes

       | Value
       | `number` | `indefinite`

       | Default value
       | None

       | Animatable
       | No

- `<number>`
    This value specifies the number of iterations. It can include partial iterations expressed as fraction values. A fractional value describes a portion of the simple duration. Values must be greater than `0`.
- `indefinite`
    This value indicates that the animation will be repeated indefinitely (i.e., until the document ends).
