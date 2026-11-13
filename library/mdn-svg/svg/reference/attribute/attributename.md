---
title: "attributeName"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/attributename/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# attributeName

The **`attributeName`** attribute indicates the name of the CSS property or attribute of the target element that is going to be changed during an animation.

You can use this attribute with the following SVG elements:

- `<animate>`
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
<svg viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
  <rect x="50" y="50" width="100" height="100">
    <animate
      attributeType="XML"
      attributeName="y"
      from="0"
      to="50"
      dur="5s"
      repeatCount="indefinite" />
  </rect>
</svg>
```

## Usage notes

       | Value
       | `&#x3C;name>`

       | Default value
       | None

       | Animatable
       | No

- `<name>`
    This value indicates the name of the CSS property or attribute of the target element to be animated.

## See also

- SVG animation with SMIL
