---
title: "gradientTransform"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/gradienttransform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# gradientTransform

The **`gradientTransform`** attribute contains the definition of an optional additional transformation from the gradient coordinate system onto the target coordinate system (i.e., userSpaceOnUse or objectBoundingBox). This allows for things such as skewing the gradient. This additional transformation matrix is post-multiplied to (i.e., inserted to the right of) any previously defined transformations, including the implicit transformation necessary to convert from object bounding box units to user space.

You can use this attribute with the following SVG elements:

- `<linearGradient>`
- `<radialGradient>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
  <radialGradient
    id="gradient1"
    gradientUnits="userSpaceOnUse"
    cx="100"
    cy="100"
    r="100"
    fx="100"
    fy="100">
    <stop offset="0%" stop-color="darkblue" />
    <stop offset="50%" stop-color="skyblue" />
    <stop offset="100%" stop-color="darkblue" />
  </radialGradient>
  <radialGradient
    id="gradient2"
    gradientUnits="userSpaceOnUse"
    cx="100"
    cy="100"
    r="100"
    fx="100"
    fy="100"
    gradientTransform="skewX(20) translate(185, 0)">
    <stop offset="0%" stop-color="darkblue" />
    <stop offset="50%" stop-color="skyblue" />
    <stop offset="100%" stop-color="darkblue" />
  </radialGradient>

  <rect x="0" y="0" width="200" height="200" fill="url(#gradient1)" />
  <rect x="220" y="0" width="200" height="200" fill="url(#gradient2)" />
</svg>
```

## Usage notes

       | Default value
       | Identity transform

       | Value
       | `&#x3C;transform-list>`

       | Animatable
       | Yes

- `<transform-list>`
    A list of transformation functions specifying some additional transformation from the gradient coordinate system onto the target coordinate system.

## See also

- `transform-function`
