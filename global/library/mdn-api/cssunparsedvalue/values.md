---
title: "CSSUnparsedValue: values() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssunparsedvalue/values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSUnparsedValue: values() method

The **`values()`** method of the `CSSUnparsedValue` interface returns a new _array iterator_ that yields each item in the object.

## Syntax

```js
values()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Examples

### Iterating over values

```js
const value = new CSSUnparsedValue(["1em", "#445566", "-45px"]);

for (const fragment of value.values()) {
  console.log(fragment);
}
// "1em"
// "#445566"
// "-45px"
```

## See also

- `CSSUnparsedValue()`
- `CSSUnparsedValue.entries()`
- `CSSUnparsedValue.forEach()`
- `CSSUnparsedValue.keys()`
- `CSSUnparsedValue.length`
- Using the CSS Typed OM
- CSS Typed Object Model API
