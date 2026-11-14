---
title: "Symbol.prototype[Symbol.toPrimitive]()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/symbol/symbol.toprimitive/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Symbol.prototype[Symbol.toPrimitive]()

The **`Symbol.toPrimitive`** method of `Symbol` values returns this symbol value.

## Syntax

```js
symbolValue[Symbol.toPrimitive](hint)
```

### Parameters

- `hint`
    A string value indicating the primitive value to return. The value is ignored.

### Return value

The primitive value of the specified `Symbol` object.

## Description

The `Symbol.toPrimitive` method of `Symbol` returns the primitive
value of a Symbol object as a Symbol data type. The `hint`
argument is not used.

JavaScript calls the `Symbol.toPrimitive` method to convert an object to a
primitive value. You rarely need to invoke the `Symbol.toPrimitive` method
yourself; JavaScript automatically invokes it when encountering an object where a
primitive value is expected.

## Examples

### Using `Symbol.toPrimitive`

```js
const sym = Symbol("example");
sym === sym[Symbol.toPrimitive](); // true
```

## See also

- `Symbol.toPrimitive`
