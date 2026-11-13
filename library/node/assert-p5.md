---
title: "Assert (part 5 of 5)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/assert.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Assert (part 5 of 5)

## `assert.partialDeepStrictEqual(actual, expected[, message])`

* `actual` {any}
* `expected` {any}
* `message` {string|Error|Function}

Tests for partial deep equality between the `actual` and `expected` parameters.
"Deep" equality means that the enumerable "own" properties of child objects
are recursively evaluated also by the following rules. "Partial" equality means
that only properties that exist on the `expected` parameter are going to be
compared.

This method always passes the same test cases as `assert.deepStrictEqual()`,
behaving as a super set of it.

### Comparison details

* Primitive values are compared using `Object.is()`.
* Type tags of objects should be the same.
* [`[[Prototype]]`][prototype-spec] of objects are not compared.
* Only enumerable "own" properties are considered.
* {Error} names, messages, causes, and errors are always compared,
  even if these are not enumerable properties.
  `errors` is also compared.
* Enumerable own {Symbol} properties are compared as well.
* Object wrappers are compared both as objects and unwrapped values.
* `Object` properties are compared unordered.
* {Map} keys and {Set} items are compared unordered.
* Recursion stops when both sides differ or both sides encounter a circular
  reference.
* {WeakMap}, {WeakSet} and {Promise} instances are **not** compared
  structurally. They are only equal if they reference the same object. Any
  comparison between different `WeakMap`, `WeakSet`, or `Promise` instances
  will result in inequality, even if they contain the same content.
* {RegExp} lastIndex, flags, and source are always compared, even if these
  are not enumerable properties.
* Holes in sparse arrays are ignored.

```mjs
import assert from 'node:assert';

assert.partialDeepStrictEqual(
  { a: { b: { c: 1 } } },
  { a: { b: { c: 1 } } },
);
// OK

assert.partialDeepStrictEqual(
  { a: 1, b: 2, c: 3 },
  { b: 2 },
);
// OK

assert.partialDeepStrictEqual(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [4, 5, 8],
);
// OK

assert.partialDeepStrictEqual(
  new Set([{ a: 1 }, { b: 1 }]),
  new Set([{ a: 1 }]),
);
// OK

assert.partialDeepStrictEqual(
  new Map([['key1', 'value1'], ['key2', 'value2']]),
  new Map([['key2', 'value2']]),
);
// OK

assert.partialDeepStrictEqual(123n, 123n);
// OK

assert.partialDeepStrictEqual(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [5, 4, 8],
);
// AssertionError

assert.partialDeepStrictEqual(
  { a: 1 },
  { a: 1, b: 2 },
);
// AssertionError

assert.partialDeepStrictEqual(
  { a: { b: 2 } },
  { a: { b: '2' } },
);
// AssertionError
```

```cjs
const assert = require('node:assert');

assert.partialDeepStrictEqual(
  { a: { b: { c: 1 } } },
  { a: { b: { c: 1 } } },
);
// OK

assert.partialDeepStrictEqual(
  { a: 1, b: 2, c: 3 },
  { b: 2 },
);
// OK

assert.partialDeepStrictEqual(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [4, 5, 8],
);
// OK

assert.partialDeepStrictEqual(
  new Set([{ a: 1 }, { b: 1 }]),
  new Set([{ a: 1 }]),
);
// OK

assert.partialDeepStrictEqual(
  new Map([['key1', 'value1'], ['key2', 'value2']]),
  new Map([['key2', 'value2']]),
);
// OK

assert.partialDeepStrictEqual(123n, 123n);
// OK

assert.partialDeepStrictEqual(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [5, 4, 8],
);
// AssertionError

assert.partialDeepStrictEqual(
  { a: 1 },
  { a: 1, b: 2 },
);
// AssertionError

assert.partialDeepStrictEqual(
  { a: { b: 2 } },
  { a: { b: '2' } },
);
// AssertionError
```
