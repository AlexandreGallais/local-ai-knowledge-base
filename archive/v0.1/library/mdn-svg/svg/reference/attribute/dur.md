---
title: "dur"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/dur/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# dur

The **`dur`** attribute indicates the simple duration of an animation.

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
      repeatCount="indefinite" />
  </rect>
  <rect x="120" y="0" width="100" height="100">
    <animate
      attributeType="XML"
      attributeName="y"
      from="0"
      to="50"
      dur="3s"
      repeatCount="indefinite" />
  </rect>
</svg>
```

## Usage notes

       | Value
       |
        <code
          >&#x3C;clock-value></code
        >
        | `media` | `indefinite`

       | Default value
       | `indefinite`

       | Animatable
       | No

- `<clock-value>`
    This value specifies the length of the simple duration. The value must be greater than 0 and can be expressed with hours (`h`), minutes (`m`), seconds (`s`) or milliseconds (`ms`). It's possible to combine those time representations to create some complex durations like `hh:mm:ss.iii` or `mm:ss.iii`.
- `media`
    This value specifies the simple duration as the intrinsic media duration. This is only valid for elements that define media.
    (For animation elements the attribute will be ignored if `media` is specified.)
- `indefinite`
    This value specifies the simple duration as indefinite.

> **Note:**
> The interpolation will not work if the simple duration is indefinite (although this may still be useful for `<set>` elements).
