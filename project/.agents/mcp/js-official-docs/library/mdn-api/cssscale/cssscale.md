---
title: "CSSScale: CSSScale() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssscale/cssscale/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSScale: CSSScale() constructor

The **`CSSScale()`** constructor creates a new `CSSScale` object representing the `scale()` and `scale3d()` values of the individual `transform` property in CSS.

## Syntax

```js
new CSSScale(x, y)
new CSSScale(x, y, z)
```

### Parameters

- `x`
    A value for the x-axis of the `CSSScale` object to be constructed.
    This must either be a number (which is wrapped into a `CSSUnitValue` of `unit: "number"`) or a `CSSNumericValue`.
- `y`
    A value for the y-axis of the `CSSScale` object to be constructed.
    This must either be a number (which is wrapped into a `CSSUnitValue` of `unit: "number"`) or a `CSSNumericValue`.
- `z` (optional)
    A value for the z-axis of the `CSSScale` object to be constructed.
    This must either be a number (which is wrapped into a `CSSUnitValue` of `unit: "number"`) or a `CSSNumericValue`. If a value is passed, the value of `is2D` will be set to false.

## Examples

To do
