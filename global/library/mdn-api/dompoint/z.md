---
title: "DOMPoint: z property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dompoint/z/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMPoint: z property

The **`DOMPoint`** interface's
**`z`** property specifies the depth coordinate of a point in
space.

Unless transforms have changed the orientation, a `z` of 0 is
the plane of the screen, with positive values extending outward toward the user from the
screen, and negative values receding into the distance behind the screen.

## Value

A double-precision floating-point value indicating the _z_ coordinate's value
for the point. This value is **unrestricted**, meaning that it is allowed
to be infinite or invalid (that is, its value may be `NaN` or
`±Infinity`).

## See also

- The other coordinate properties: `x`,
  `y`, and the perspective value, `w`.
