---
title: "CSSUnitValue: value property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssunitvalue/value/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSUnitValue: value property

The **`value`** property of the `CSSUnitValue` interface represents the number of units.

## Value

A number.

## Examples

### Basic usage

The following code creates a `CSSPositionValue` from individual `CSSUnitValue` constructors, then queries the `CSSUnitValue.value`.

```js
const pos = new CSSPositionValue(
  new CSSUnitValue(5, "px"),
  new CSSUnitValue(10, "px"),
);

console.log(pos.x.value); // 5
console.log(pos.y.value); // 10
```

## See also

- `CSSUnitValue.unit`
- Using the CSS Typed OM
- CSS Typed Object Model API
