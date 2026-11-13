---
title: "CSSUnitValue: CSSUnitValue() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssunitvalue/cssunitvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSUnitValue: CSSUnitValue() constructor

The **`CSSUnitValue()`** constructor creates a new `CSSUnitValue` object which returns a new `CSSUnitValue` object which represents values that contain a single unit type.
For example, "42px" would be represented by a `CSSNumericValue`.

## Syntax

```js
new CSSUnitValue(value, unit)
```

### Parameters

- `value`
    A number indicating the number of units.
- `unit`
    A string indicating the type of unit.

## Examples

### Basic usage

The following shows a method of creating a `CSSPositionValue` from individual `CSSUnitValue` constructors.

```js
let pos = new CSSPositionValue(
  new CSSUnitValue(5, "px"),
  new CSSUnitValue(10, "px"),
);
```

## See also

- `CSSUnitValue.unit`
- `CSSUnitValue.value`
- Using the CSS Typed OM
- CSS Typed Object Model API
