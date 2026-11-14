---
title: "Iterator.prototype[Symbol.dispose]()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/iterator/symbol.dispose/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Iterator.prototype[Symbol.dispose]()

The **`Symbol.dispose`** method of `Iterator` instances implements the _disposable protocol_ and allows it to be disposed when used with `using`. It calls the `return()` method of `this`, if it exists.

## Syntax

```js
iterator[Symbol.dispose]()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Declaring an iterator with `using`

The `Symbol.dispose` method is intended to be automatically called in a `using` declaration. This is useful if you have an iterator that you manually iterate over by calling its `next()` method; if you iterate it with `for...of` or something similar, then error handling and cleanup is done automatically.

```js
function* generateNumbers() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } finally {
    console.log("Cleaning up");
  }
}

function doSomething() {
  using numbers = generateNumbers();
  const res1 = numbers.next();
  // Not iterating the rest of the numbers
  // Before the function exits, the async iterator is disposed
  // Logs "Cleaning up"
}

doSomething();
```

## See also

- Polyfill of `Iterator.prototype[Symbol.dispose]` in `core-js`
- JavaScript resource management
- `Symbol.dispose`
- `using`
