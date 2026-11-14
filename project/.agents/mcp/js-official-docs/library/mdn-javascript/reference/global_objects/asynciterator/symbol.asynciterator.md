---
title: "AsyncIterator.prototype[Symbol.asyncIterator]()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/asynciterator/symbol.asynciterator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AsyncIterator.prototype[Symbol.asyncIterator]()

The **`Symbol.asyncIterator`** method of `AsyncIterator` instances implements the async iterable protocol and allows built-in async iterators to be consumed by most syntaxes expecting async iterables, such as `for await...of` loops. It returns the value of `this`, which is the async iterator object itself.

## Syntax

```js
asyncIterator[Symbol.asyncIterator]()
```

### Parameters

None.

### Return value

The value of `this`, which is the async iterator object itself.

## Examples

### Iteration using for await...of loop

Note that you seldom need to call this method directly. The existence of the `Symbol.asyncIterator` method makes all built-in async iterators async iterable, and iterating syntaxes like the `for await...of` loop automatically calls this method to obtain the async iterator to loop over.

```js
const asyncIterator = (async function* () {
  yield 1;
  yield 2;
  yield 3;
})();
(async () => {
  for await (const value of asyncIterator) {
    console.log(value);
  }
})();
// Logs: 1, 2, 3
```

## See also

- `for await...of`
