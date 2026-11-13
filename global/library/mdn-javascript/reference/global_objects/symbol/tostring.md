---
title: "Symbol.prototype.toString()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/symbol/tostring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Symbol.prototype.toString()

The **`toString()`** method of `Symbol` values returns a string representing this symbol value.

```js
console.log(Symbol("desc").toString());
// Expected output: "Symbol(desc)"

console.log(Symbol.iterator.toString());
// Expected output: "Symbol(Symbol.iterator)

console.log(Symbol.for("foo").toString());
// Expected output: "Symbol(foo)"

// console.log(Symbol('foo') + 'bar');
// Expected output: Error: Can't convert symbol to string
```

## Syntax

```js
toString()
```

### Parameters

None.

### Return value

A string representing the specified symbol value.

## Description

The `Symbol` object overrides the `toString` method of `Object`; it does not inherit
`Object.prototype.toString()`. For `Symbol` values, the `toString` method returns a descriptive string in the form `"Symbol(description)"`, where `description` is the symbol's description.

The `toString()` method requires its `this` value to be a `Symbol` primitive or wrapper object. It throws a `TypeError` for other `this` values without attempting to coerce them to symbol values.

Because `Symbol` has a `[Symbol.toPrimitive]()` method, that method always takes priority over `toString()` when a `Symbol` object is coerced to a string. However, because `Symbol.prototypeSymbol.toPrimitive` returns a symbol primitive, and symbol primitives throw a `TypeError` when implicitly converted to a string, the `toString()` method is never implicitly called by the language. To stringify a symbol, you must explicitly call its `toString()` method or use the `String()` function.

## Examples

### Using toString()

```js
Symbol("desc").toString(); // "Symbol(desc)"

// well-known symbols
Symbol.iterator.toString(); // "Symbol(Symbol.iterator)"

// global symbols
Symbol.for("foo").toString(); // "Symbol(foo)"
```

### Implicitly calling toString()

The only way to make JavaScript implicitly call `toString()` instead of `[Symbol.toPrimitive]()` on a symbol wrapper object is by deleting the `Symbol.toPrimitive` method first.

> **Warning:**
> You should not do this in practice. Never mutate built-in objects unless you know exactly what you're doing.

```js
delete Symbol.prototype[Symbol.toPrimitive];
console.log(`${Object(Symbol("foo"))}`); // "Symbol(foo)"
```

## See also

- `Object.prototype.toString()`
