---
title: "CSSUnparsedValue: length property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssunparsedvalue/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSUnparsedValue: length property

The **`length`** read-only property of the `CSSUnparsedValue` interface returns the number of items in the object.

## Value

An integer.

## Examples

### Basic usage

In this example, we use the `CSSUnparsedValue()` constructor, then query the length:

```js
const value = new CSSUnparsedValue(["1em", "#445566", "-45px"]);

console.log(value.length); // 3
```

## See also

- `CSSUnparsedValue()`
- `CSSUnparsedValue.entries()`
- `CSSUnparsedValue.forEach()`
- `CSSUnparsedValue.keys()`
- `CSSUnparsedValue.values()`
- Using the CSS Typed OM
- CSS Typed Object Model API
