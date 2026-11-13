---
title: "CSSUnparsedValue: CSSUnparsedValue() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssunparsedvalue/cssunparsedvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSUnparsedValue: CSSUnparsedValue() constructor

The **`CSSUnparsedValue()`** constructor creates a new `CSSUnparsedValue` object, which represents a property value that can't be parsed into a more specific type — typically the value of a custom property.

## Syntax

```js
new CSSUnparsedValue(members)
```

### Parameters

- `members`
    An array whose values must be either a string or a `CSSVariableReferenceValue`.

## Examples

### Basic usage

```js
const value = new CSSUnparsedValue(["4deg"]);
const values = new CSSUnparsedValue(["1em", "#445566", "-45px"]);

console.log(value); // CSSUnparsedValue {0: "4deg", length: 1}
console.log(values); // CSSUnparsedValue {0: "1em", 1: "#445566", 2: "-45px", length: 3}
```

### `CSSUnparsedValue` with a variable reference

A member can also be a `CSSVariableReferenceValue`, representing a `var()` reference embedded in the value.
This example builds a `CSSUnparsedValue` for a declaration equivalent to `10px var(--bar, blue)`.

```js
const fallback = new CSSUnparsedValue(["blue"]);
const varRef = new CSSVariableReferenceValue("--bar", fallback);

const value = new CSSUnparsedValue(["10px ", varRef]);

console.log(value.length); // 2
console.log(value[0]); // "10px "
console.log(value[1].variable); // "--bar"
console.log(value[1].fallback[0]); // "blue"
```

## See also

- `CSSVariableReferenceValue`
- `CSSUnparsedValue.entries()`
- `CSSUnparsedValue.forEach()`
- `CSSUnparsedValue.keys()`
- `CSSUnparsedValue.length`
- `CSSUnparsedValue.values()`
- Using the CSS Typed OM
- CSS Typed Object Model API
