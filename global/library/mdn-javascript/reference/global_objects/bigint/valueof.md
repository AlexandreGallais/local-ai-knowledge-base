---
title: "BigInt.prototype.valueOf()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/bigint/valueof/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BigInt.prototype.valueOf()

The **`valueOf()`** method of `BigInt` values returns the wrapped primitive value
of a `BigInt` object.

```js
console.log(typeof Object(1n));
// Expected output: "object"

console.log(typeof Object(1n).valueOf());
// Expected output: "bigint"
```

## Syntax

```js
valueOf()
```

### Parameters

None.

### Return value

A BigInt representing the primitive value of the specified `BigInt` object.

## Examples

### Using `valueOf`

```js
typeof Object(1n); // object
typeof Object(1n).valueOf(); // bigint
```

## See also

- `BigInt.prototype.toString()`
