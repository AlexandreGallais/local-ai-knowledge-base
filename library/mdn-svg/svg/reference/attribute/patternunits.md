---
title: "patternUnits"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/patternunits/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# patternUnits

The **`patternUnits`** attribute indicates which coordinate system to use for the geometry properties of the `<pattern>` element.

You can use this attribute with the following SVG elements:

- `<pattern>`

## Elements

You can use this attribute with the SVG elements described in the sections below.

### `<pattern>`

For `<pattern>`, `patternUnits` defines the coordinate system in use for the geometry properties (`x`, `y`, `width` and `height`) of the element.

       | Value
       | `userSpaceOnUse` | `objectBoundingBox`

       | Default value
       | `objectBoundingBox`

       | Animatable
       | Yes

- `userSpaceOnUse`
    This value indicates that all coordinates for the geometry properties refer to the user coordinate system as defined when the pattern was applied.
- `objectBoundingBox`
    This value indicates that all coordinates for the geometry properties represent fractions or percentages of the bounding box of the element to which the pattern is applied. A bounding box could be considered the same as if the content of the `<pattern>` were bound to a `"0 0 1 1"` `viewBox`.

## Examples

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <!-- All geometry properties are relative to the current user space -->
  <pattern
    id="p1"
    x="12.5"
    y="12.5"
    width="25"
    height="25"
    patternUnits="userSpaceOnUse">
    <circle cx="10" cy="10" r="10" />
  </pattern>

  <!-- All geometry properties are relative to the target bounding box -->
  <pattern
    id="p2"
    x=".125"
    y=".125"
    width=".25"
    height=".25"
    patternUnits="objectBoundingBox">
    <circle cx="10" cy="10" r="10" />
  </pattern>

  <!-- Left square with user space tiles -->
  <rect x="10" y="10" width="80" height="80" fill="url(#p1)" />

  <!-- Right square with bounding box tiles -->
  <rect x="110" y="10" width="80" height="80" fill="url(#p2)" />
</svg>
```
