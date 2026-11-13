---
title: "CSSUnparsedValue: entries() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssunparsedvalue/entries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSUnparsedValue: entries() method

The **`entries()`** method of the `CSSUnparsedValue` interface returns a new _array iterator_ that yields `[index, value]` pairs for each item in the object.

## Syntax

```js
entries()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Examples

### Iterating over index/value pairs

```js
const value = new CSSUnparsedValue(["1em", "#445566", "-45px"]);

for (const [index, fragment] of value.entries()) {
  console.log(index, fragment);
}
// 0 "1em"
// 1 "#445566"
// 2 "-45px"
```

## See also

- `CSSUnparsedValue()`
- `CSSUnparsedValue.forEach()`
- `CSSUnparsedValue.keys()`
- `CSSUnparsedValue.length`
- `CSSUnparsedValue.values()`
- Using the CSS Typed OM
- CSS Typed Object Model API
