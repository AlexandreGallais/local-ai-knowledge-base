---
title: "CSSUnitValue: unit property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssunitvalue/unit/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSUnitValue: unit property

The **`unit`** read-only property of the `CSSUnitValue` interface returns a string indicating the unit type.

## Value

A string indicating the unit type, such as `"em"`, `"px"`, `"percent"`, etc.

## Examples

### Basic usage

The following code creates a `CSSPositionValue` from individual `CSSUnitValue` constructors, then queries the `CSSUnitValue.unit`.

```js
const pos = new CSSPositionValue(
  new CSSUnitValue(5, "px"),
  new CSSUnitValue(10, "em"),
);

console.log(pos.x.unit); // "px"
console.log(pos.y.unit); // "em"
```

## See also

- `CSSUnitValue.value`
- CSS numeric data types
- CSS values and units, a listing of all possible unit types
- Using the CSS Typed OM
- CSS Typed Object Model API
