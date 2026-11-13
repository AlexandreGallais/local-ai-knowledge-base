---
title: "primitiveUnits"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/primitiveunits/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# primitiveUnits

The **`primitiveUnits`** attribute specifies the coordinate system for the various length values within the filter primitives and for the attributes that define the filter primitive subregion.

You can use this attribute with the following SVG elements:

- `<filter>`

## Usage notes

       | Value
       | `userSpaceOnUse` | `objectBoundingBox`

       | Default value
       | `userSpaceOnUse`

       | Animatable
       | Yes

- userSpaceOnUse
    This value indicates that any length values within the filter definitions represent values in the current user coordinate system in place at the time when the `<filter>` element is referenced (i.e., the user coordinate system for the element referencing the `<filter>` element via a `filter` attribute).
- objectBoundingBox
    This value indicates that any length values within the filter definitions represent fractions or percentages of the bounding box on the referencing element.
