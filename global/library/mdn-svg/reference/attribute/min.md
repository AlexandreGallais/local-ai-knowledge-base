---
title: "min"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/min/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# min

The **`min`** attribute specifies the minimum value of the active animation duration.

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
<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <circle cx="60" cy="10" r="10">
    <animate
      attributeName="cx"
      dur="4s"
      min="2s"
      repeatCount="indefinite"
      values="60 ; 110 ; 60 ; 10 ; 60"
      keyTimes="0 ; 0.25 ; 0.5 ; 0.75 ; 1" />
    <animate
      attributeName="cy"
      dur="4s"
      min="2s"
      repeatCount="indefinite"
      values="10 ; 60 ; 110 ; 60 ; 10"
      keyTimes="0 ; 0.25 ; 0.5 ; 0.75 ; 1" />
  </circle>
</svg>
```

## Usage notes

       | Value
       |
        <code
          >&#x3C;clock-value></code
        >

       | Default value
       | `0`

       | Animatable
       | No

- `<clock-value>`
    Specifies the length of the minimum value of the active duration, measured in local time. The value must be greater than 0.
