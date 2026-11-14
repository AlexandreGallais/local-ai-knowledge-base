---
title: "Symbol.keyFor()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/symbol/keyfor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Symbol.keyFor()

The **`Symbol.keyFor()`** static method retrieves a shared symbol
key from the global symbol registry for the given symbol.

```js
const globalSym = Symbol.for("foo"); // Global symbol

console.log(Symbol.keyFor(globalSym));
// Expected output: "foo"

const localSym = Symbol(); // Local symbol

console.log(Symbol.keyFor(localSym));
// Expected output: undefined

console.log(Symbol.keyFor(Symbol.iterator));
// Expected output: undefined
```

## Syntax

```js
Symbol.keyFor(sym)
```

### Parameters

- `sym`
    Symbol, required. The symbol to find a key for.

### Return value

A string representing the key for the given symbol if one is found on the global registry; otherwise, `undefined`.

## Examples

### Using keyFor()

```js
const globalSym = Symbol.for("foo"); // create a new global symbol
Symbol.keyFor(globalSym); // "foo"

const localSym = Symbol();
Symbol.keyFor(localSym); // undefined

// well-known symbols are not symbols registered
// in the global symbol registry
Symbol.keyFor(Symbol.iterator); // undefined
```

## See also

- `Symbol.for()`
