---
title: "filterUnits"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/filterunits/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# filterUnits

The **`filterUnits`** attribute defines the coordinate system for the attributes `x`, `y`, `width` and `height`.

You can use this attribute with the following SVG elements:

- `<filter>`

## Usage notes

       | Value
       | `userSpaceOnUse` | `objectBoundingBox`

       | Default value
       | `objectBoundingBox`

       | Animatable
       | Yes

- `userSpaceOnUse`
    `x`, `y`, `width` and `height` represent values in the current coordinate system that results from taking the current user coordinate system in place at the time when the `<filter>` element is referenced (i.e., the user coordinate system for the element referencing the `<filter>` element via a `filter` attribute).
- `objectBoundingBox`
    In that case, `x`, `y`, `width` and `height` represent fractions or percentages of the bounding box on the referencing element.
