---
title: "Boolean.prototype.valueOf()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/boolean/valueof/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Boolean.prototype.valueOf()

The **`valueOf()`** method of `Boolean` values returns the primitive value of a
`Boolean` object.

```js
const x = new Boolean();

console.log(x.valueOf());
// Expected output: false

const y = new Boolean("Mozilla");

console.log(y.valueOf());
// Expected output: true
```

## Syntax

```js
valueOf()
```

### Parameters

None.

### Return value

The primitive value of the given `Boolean` object.

## Description

The `valueOf()` method of `Boolean` returns the primitive value
of a `Boolean` object or literal `Boolean` as a Boolean data type.

This method is usually called internally by JavaScript and not explicitly in code.

## Examples

### Using `valueOf()`

```js
const x = new Boolean();
const myVar = x.valueOf(); // assigns false to myVar
```

## See also

- `Object.prototype.valueOf()`
