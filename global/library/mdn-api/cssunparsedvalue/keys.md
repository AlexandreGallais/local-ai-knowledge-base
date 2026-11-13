---
title: "CSSUnparsedValue: keys() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssunparsedvalue/keys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSUnparsedValue: keys() method

The **`keys()`** method of the `CSSUnparsedValue` interface returns a new _array iterator_ that yields the index of each item in the object.

## Syntax

```js
keys()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Examples

### Iterating over indexes

```js
const value = new CSSUnparsedValue(["1em", "#445566", "-45px"]);

for (const index of value.keys()) {
  console.log(index);
}
// 0
// 1
// 2
```

## See also

- `CSSUnparsedValue()`
- `CSSUnparsedValue.entries()`
- `CSSUnparsedValue.forEach()`
- `CSSUnparsedValue.length`
- `CSSUnparsedValue.values()`
- Using the CSS Typed OM
- CSS Typed Object Model API
