---
title: "limitingConeAngle"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/limitingconeangle/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# limitingConeAngle

The **`limitingConeAngle`** attribute represents the angle in degrees between the spot light axis (i.e., the axis between the light source and the point to which it is pointing at) and the spot light cone. So it defines a limiting cone which restricts the region where the light is projected. No light is projected outside the cone.

You can use this attribute with the following SVG elements:

- `<feSpotLight>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="spotLight1" x="0" y="0" width="100%" height="100%">
    <feDiffuseLighting diffuseConstant="2">
      <feSpotLight
        x="10"
        y="10"
        z="50"
        pointsAtX="100"
        pointsAtY="100"
        limitingConeAngle="10" />
    </feDiffuseLighting>
  </filter>
  <filter id="spotLight2" x="0" y="0" width="100%" height="100%">
    <feDiffuseLighting diffuseConstant="2">
      <feSpotLight
        x="10"
        y="10"
        z="50"
        pointsAtX="100"
        pointsAtY="100"
        limitingConeAngle="40" />
    </feDiffuseLighting>
  </filter>

  <rect x="0" y="0" width="200" height="200" filter="url(#spotLight1)" />
  <rect x="220" y="0" width="200" height="200" filter="url(#spotLight2)" />
</svg>
```

## Usage notes

       | Value
       | `number`

       | Default value
       | `0`

       | Animatable
       | Yes
