---
title: "Symbol.for()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/symbol/for/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Symbol.for()

The **`Symbol.for()`** static method searches for existing symbols
in a runtime-wide symbol registry with the given key and returns it if found. Otherwise
a new symbol gets created in the global symbol registry with this key.

```js
console.log(Symbol.for("bar") === Symbol.for("bar"));
// Expected output: true

console.log(Symbol("bar") === Symbol("bar"));
// Expected output: false

const symbol1 = Symbol.for("foo");

console.log(symbol1.toString());
// Expected output: "Symbol(foo)"
```

## Syntax

```js
Symbol.for(key)
```

### Parameters

- `key`
    String, required. The key for the symbol (and also used for the description of the
    symbol).

### Return value

An existing symbol with the given key if found; otherwise, a new symbol is created and
returned.

## Description

In contrast to `Symbol()`, the `Symbol.for()` function creates a
symbol available in a global symbol registry list. `Symbol.for()` does also
not necessarily create a new symbol on every call, but checks first if a symbol with the
given `key` is already present in the registry. In that case, that symbol is
returned. If no symbol with the given key is found, `Symbol.for()` will
create a new global symbol.

## Examples

### Using Symbol.for()

```js
Symbol.for("foo"); // create a new global symbol
Symbol.for("foo"); // retrieve the already created symbol

// Same global symbol, but not locally
Symbol.for("bar") === Symbol.for("bar"); // true
Symbol("bar") === Symbol("bar"); // false

// The key is also used as the description
const sym = Symbol.for("mario");
sym.toString(); // "Symbol(mario)"
```

To avoid name clashes with your global symbol keys and other (library code) global
symbols, it might be a good idea to prefix your symbols:

```js
Symbol.for("mdn.foo");
Symbol.for("mdn.bar");
```

## See also

- `Symbol.keyFor()`
