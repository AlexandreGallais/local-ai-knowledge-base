---
title: "DOMPointReadOnly: w property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dompointreadonly/w/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMPointReadOnly: w property

The **`DOMPointReadOnly`** interface's
**`w`** property holds the point's perspective value,
`w`, for a read-only point in space.

If your script needs to be able
to change the value of this property, you should instead use the `DOMPoint`
object.

## Value

A double-precision floating-point value indicating the `w` perspective value
for the point. This value is **unrestricted**, meaning that it is allowed
to be infinite or invalid (that is, its value may be `NaN` or
`±Infinity`). The default is `1.0`.

## See also

- The other coordinate properties: `x`,
  `y`, and `z`.
