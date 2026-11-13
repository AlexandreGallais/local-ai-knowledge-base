---
title: "repeatDur"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/repeatdur/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# repeatDur

The **`repeatDur`** attribute specifies the total duration for repeating an animation.

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
      repeatDur="5s" />
  </rect>
  <rect x="120" y="0" width="100" height="100">
    <animate
      attributeType="XML"
      attributeName="y"
      from="0"
      to="50"
      dur="1s"
      repeatDur="indefinite" />
  </rect>
</svg>
```

## Usage notes

       | Value
       |
        <code
          >&#x3C;clock-value></code
        >
        | `indefinite`

       | Default values
       | None

       | Animatable
       | No

- `<clock-value>`
    This value specifies the duration in presentation time to repeat the animation.
- `indefinite`
    This value indicates that the animation will be repeated indefinitely (i.e., until the document ends).
