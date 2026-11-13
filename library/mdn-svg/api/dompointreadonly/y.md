---
title: "DOMPointReadOnly: y property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/dompointreadonly/y/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMPointReadOnly: y property

The **`DOMPointReadOnly`** interface's
**`y`** property holds the vertical coordinate, y, for a
read-only point in space.

If your script needs to be able to change the value
of this property, you should instead use the `DOMPoint` object.

In general, positive values of `y` mean downward, and negative values of
`y` mean upward, assuming no transforms have resulted in a reversal.

## Value

A double-precision floating-point value indicating the y coordinate's value for the
point. This value is **unrestricted**, meaning that it is allowed to be
infinite or invalid (that is, its value may be `NaN` or `±Infinity`).

## See also

- The other coordinate properties: `x`,
  `z`, and the perspective value,
  `w`.
