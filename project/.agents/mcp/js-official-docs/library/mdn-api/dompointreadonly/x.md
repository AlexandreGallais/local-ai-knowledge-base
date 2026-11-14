---
title: "DOMPointReadOnly: x property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dompointreadonly/x/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMPointReadOnly: x property

The **`DOMPointReadOnly`** interface's
**`x`** property holds the horizontal coordinate, x, for a
read-only point in space. This property cannot be changed by JavaScript code in this
read-only version of the `DOMPoint` object.

In general, positive values `x` mean to the right, and negative values of
`x` means to the left, assuming no transforms have resulted in a reversal.

## Value

A double-precision floating-point value indicating the x coordinate's value for the
point. This value is **unrestricted**, meaning that it is allowed to be
infinite or invalid (that is, its value may be `NaN` or `±Infinity`).

## See also

- The other coordinate properties: `y`,
  `z`, and the perspective value,
  `w`.
