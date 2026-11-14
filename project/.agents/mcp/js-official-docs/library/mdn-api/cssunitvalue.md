---
title: "CSSUnitValue"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssunitvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSUnitValue

The **`CSSUnitValue`** interface of the CSS Typed Object Model API represents values that contain a single unit type.

For example, the value `42px` (a `<dimension>`) would be represented by a `CSSNumericValue`.

## Constructor

- `CSSUnitValue()`
    Creates a new `CSSUnitValue` object.

## Instance properties

- `CSSUnitValue.value`
    A number representing the number of units.
    For a `CSSNumericValue` representing `42px`, this would be `42`.
- `CSSUnitValue.unit` (read-only)
    Returns a string indicating the type of unit. For a `CSSNumericValue` representing `42px`, this would be `"px"`.

## Static methods

_Also inherits methods from its parent interface, `CSSNumericValue`._

## Instance methods

_Also inherits methods from its parent interface, `CSSNumericValue`._

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

- CSS numeric data types
- CSS values and units, a listing of all possible units and data types
