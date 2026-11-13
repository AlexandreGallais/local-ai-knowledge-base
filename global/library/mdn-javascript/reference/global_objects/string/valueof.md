---
title: "String.prototype.valueOf()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/string/valueof/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# String.prototype.valueOf()

The **`valueOf()`** method of `String` values returns this string value.

```js
const stringObj = new String("foo");

console.log(stringObj);
// Expected output: String { "foo" }

console.log(stringObj.valueOf());
// Expected output: "foo"
```

## Syntax

```js
valueOf()
```

### Parameters

None.

### Return value

A string representing the primitive value of a given `String` object.

## Description

The `valueOf()` method of `String` returns the primitive value
of a `String` object as a string data type. This value is equivalent to
`String.prototype.toString()`.

This method is usually called internally by JavaScript and not explicitly in code.

## Examples

### Using `valueOf()`

```js
const x = new String("Hello world");
console.log(x.valueOf()); // 'Hello world'
```

## See also

- `String.prototype.toString()`
- `Object.prototype.valueOf()`
