---
title: "Object.getOwnPropertySymbols()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/object/getownpropertysymbols/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Object.getOwnPropertySymbols()

The **`Object.getOwnPropertySymbols()`** static method returns an array of all symbol properties found directly upon a given object.

```js
const object = {};
const a = Symbol("a");
const b = Symbol.for("b");

object[a] = "localSymbol";
object[b] = "globalSymbol";

const objectSymbols = Object.getOwnPropertySymbols(object);

console.log(objectSymbols.length);
// Expected output: 2
```

## Syntax

```js
Object.getOwnPropertySymbols(obj)
```

### Parameters

- `obj`
    The object whose symbol properties are to be returned.

### Return value

An array of all symbol properties found directly upon the given object.

## Description

Similar to `Object.getOwnPropertyNames()`, you can get all symbol properties of a given object as an array of symbols. Note that `Object.getOwnPropertyNames()` itself does not contain the symbol properties of an object and only the string properties.

As all objects have no own symbol properties initially, `Object.getOwnPropertySymbols()` returns an empty array unless you have set symbol properties on your object.

## Examples

### Using Object.getOwnPropertySymbols()

```js
const obj = {};
const a = Symbol("a");
const b = Symbol.for("b");

obj[a] = "localSymbol";
obj[b] = "globalSymbol";

const objectSymbols = Object.getOwnPropertySymbols(obj);

console.log(objectSymbols.length); // 2
console.log(objectSymbols); // [Symbol(a), Symbol(b)]
console.log(objectSymbols[0]); // Symbol(a)
```

## See also

- Polyfill of `Object.getOwnPropertySymbols` in `core-js`
- `Object.getOwnPropertyNames()`
- `Symbol`
