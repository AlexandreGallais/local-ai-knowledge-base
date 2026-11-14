---
title: "maskUnits"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/maskunits/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# maskUnits

The **`maskUnits`** attribute indicates which coordinate system to use for the geometry properties of the `<mask>` element.

You can use this attribute with the following SVG elements:

- `<mask>`

## mask

For `<mask>`, `maskUnits` defines the coordinate system in use for the geometry attributes (`x`, `y`, `width` and `height`) of the element.

       | Value
       | `userSpaceOnUse` | `objectBoundingBox`

       | Default value
       | `objectBoundingBox`

       | Animatable
       | Yes

- `userSpaceOnUse`
    This value indicates that all coordinates for the geometry attributes refer to the user coordinate system as defined when the mask was created.
- `objectBoundingBox`
    This value indicates that all coordinates for the geometry attributes represent fractions or percentages of the bounding box of the element to which the mask is applied. A bounding box could be considered the same as if the content of the `<mask>` were bound to a `"0 0 1 1"` `viewBox`.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <mask
    id="myMask1"
    maskUnits="userSpaceOnUse"
    x="20%"
    y="20%"
    width="60%"
    height="60%">
    <rect fill="black" x="0" y="0" width="100%" height="100%" />
    <circle fill="white" cx="50" cy="50" r="35" />
  </mask>

  <mask
    id="myMask2"
    maskUnits="objectBoundingBox"
    x="20%"
    y="20%"
    width="60%"
    height="60%">
    <rect fill="black" x="0" y="0" width="100%" height="100%" />
    <circle fill="white" cx="50" cy="50" r="35" />
  </mask>

  <!-- Some reference rect to materialized the mask -->
  <rect id="r1" x="0" y="0" width="45" height="45" />
  <rect id="r2" x="0" y="55" width="45" height="45" />
  <rect id="r3" x="55" y="55" width="45" height="45" />
  <rect id="r4" x="55" y="0" width="45" height="45" />

  <!-- The first 3 rect are masked with useSpaceOnUse units -->
  <use mask="url(#myMask1)" href="#r1" fill="red" />
  <use mask="url(#myMask1)" href="#r2" fill="red" />
  <use mask="url(#myMask1)" href="#r3" fill="red" />

  <!-- The last rect is masked with objectBoundingBox units -->
  <use mask="url(#myMask2)" href="#r4" fill="red" />
</svg>
```
