---
title: "patternContentUnits"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/patterncontentunits/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# patternContentUnits

The **`patternContentUnits`** attribute indicates which coordinate system to use for the contents of the `<pattern>` element.

> **Note:**
> That this attribute has no effect if attribute `viewBox` is specified on the `<pattern>` element.

You can use this attribute with the following SVG elements:

- `<pattern>`

## Elements

You can use this attribute with the SVG elements described in the sections below.

### `<pattern>`

For `<pattern>`, `patternContentUnits` defines the coordinate system in use for the content of the element.

       | Value
       | `userSpaceOnUse` | `objectBoundingBox`

       | Default value
       | `userSpaceOnUse`

       | Animatable
       | Yes

- `userSpaceOnUse`
    This value indicates that all coordinates inside the `<pattern>` element refer to the user coordinate system as defined when the pattern tile was created.
- `objectBoundingBox`
    This value indicates that all coordinates inside the `<pattern>` element are relative to the bounding box of the element the pattern is applied to. A bounding box could be considered the same as if the content of the `<pattern>` were bound to a `"0 0 1 1"` `viewBox` for a pattern tile of width and height of 100%.

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
  <!--
  A pattern tile that content coordinates and values are
  computed against the current coordinate user space.
  Note that the size of the tile is computed against
  the bounding box of the target element
  -->
  <pattern
    id="p1"
    width="20%"
    height="20%"
    patternContentUnits="userSpaceOnUse">
    <circle cx="10" cy="10" r="10" />
  </pattern>

  <!--
  A pattern tile that content coordinates and values are
  computed against the bounding box of the target element.
  Note that the size of the tile is also computed against
  the bounding box of the target element
  -->
  <pattern
    id="p2"
    width="20%"
    height="20%"
    patternContentUnits="objectBoundingBox">
    <circle cx=".1" cy=".1" r=".1" />
  </pattern>

  <!-- Left square with user space tiles -->
  <rect x="10" y="10" width="80" height="80" fill="url(#p1)" />

  <!-- Right square with bounding box tiles -->
  <rect x="110" y="10" width="80" height="80" fill="url(#p2)" />
</svg>
```
