---
title: "DOMPointReadOnly: z property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dompointreadonly/z/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMPointReadOnly: z property

The **`DOMPointReadOnly`** interface's
**`z`** property holds the depth coordinate, z, for a
read-only point in space.

If your script needs to be able to change the value
of this property, you should instead use the `DOMPoint` object.

In general, positive values of `z` mean toward the user (out from the
screen), and negative values of `z` mean away from the user (into the
screen), assuming no transforms have resulted in a reversal.

## Value

A double-precision floating-point value indicating the z coordinate's value for the
point. This value is **unrestricted**, meaning that it is allowed to be
infinite or invalid (that is, its value may be `NaN` or `±Infinity`).

## See also

- The other coordinate properties: `x`,
  `y`, and the perspective value,
  `w`.
