---
title: "Assert (part 1 of 5)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/assert.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Assert

> Stability: 2 - Stable

The `node:assert` module provides a set of assertion functions for verifying
invariants.

## Strict assertion mode

In strict assertion mode, non-strict methods behave like their corresponding
strict methods. For example, `assert.deepEqual()` will behave like
`assert.deepStrictEqual()`.

In strict assertion mode, error messages for objects display a diff. In legacy
assertion mode, error messages for objects display the objects, often truncated.

### Message parameter semantics

For assertion methods that accept an optional `message` parameter, the message
may be provided in one of the following forms:

* **string**: Used as-is. If additional arguments are supplied after the
  `message` string, they are treated as printf-like substitutions (see
  `util.format()`).
* **Error**: If an `Error` instance is provided as `message`, that error is
  thrown directly instead of an `AssertionError`.
* **function**: A function of the form `(actual, expected) => string`. It is
  called only when the assertion fails and should return a string to be used as
  the error message. Non-string return values are ignored and the default
  message is used instead.

If additional arguments are passed along with an `Error` or a function as
`message`, the call is rejected with `ERR_AMBIGUOUS_ARGUMENT`.

If the first item is neither a string, `Error`, nor function, `ERR_INVALID_ARG_TYPE`
is thrown.

To use strict assertion mode:

```mjs
import { strict as assert } from 'node:assert';
```

```cjs
const assert = require('node:assert').strict;
```

```mjs
import assert from 'node:assert/strict';
```

```cjs
const assert = require('node:assert/strict');
```

Example error diff:

```mjs
import { strict as assert } from 'node:assert';

assert.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected ... Lines skipped
//
//   [
//     [
// ...
//       2,
// +     3
// -     '3'
//     ],
// ...
//     5
//   ]
```

```cjs
const assert = require('node:assert/strict');

assert.deepEqual([[[1, 2, 3]], 4, 5], [[[1, 2, '3']], 4, 5]);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected ... Lines skipped
//
//   [
//     [
// ...
//       2,
// +     3
// -     '3'
//     ],
// ...
//     5
//   ]
```

To deactivate the colors, use the `NO_COLOR` or `NODE_DISABLE_COLORS`
environment variables. This will also deactivate the colors in the REPL. For
more on color support in terminal environments, read the tty
`getColorDepth()` documentation.

## Legacy assertion mode

Legacy assertion mode uses the `==` operator in:

* `assert.deepEqual()`
* `assert.equal()`
* `assert.notDeepEqual()`
* `assert.notEqual()`

To use legacy assertion mode:

```mjs
import assert from 'node:assert';
```

```cjs
const assert = require('node:assert');
```

Legacy assertion mode may have surprising results, especially when using
`assert.deepEqual()`:

```cjs
// WARNING: This does not throw an AssertionError in legacy assertion mode!
assert.deepEqual(/a/gi, new Date());
```

## Class: `assert.AssertionError`

* Extends: {errors.Error}

Indicates the failure of an assertion. All errors thrown by the `node:assert`
module will be instances of the `AssertionError` class.

### `new assert.AssertionError(options)`

* `options` {Object}
  * `message` {string} If provided, the error message is set to this value.
  * `actual` {any} The `actual` property on the error instance.
  * `expected` {any} The `expected` property on the error instance.
  * `operator` {string} The `operator` property on the error instance.
  * `stackStartFn` {Function} If provided, the generated stack trace omits
    frames before this function.
  * `diff` {string} If set to `'full'`, shows the full diff in assertion errors. Defaults to `'simple'`.
    Accepted values: `'simple'`, `'full'`.

A subclass of {Error} that indicates the failure of an assertion.

All instances contain the built-in `Error` properties (`message` and `name`)
and:

* `actual` {any} Set to the `actual` argument for methods such as
  `assert.strictEqual()`.
* `expected` {any} Set to the `expected` value for methods such as
  `assert.strictEqual()`.
* `generatedMessage` {boolean} Indicates if the message was auto-generated
  (`true`) or not.
* `code` {string} Value is always `ERR_ASSERTION` to show that the error is an
  assertion error.
* `operator` {string} Set to the passed in operator value.

```mjs
import assert from 'node:assert';

// Generate an AssertionError to compare the error message later:
const { message } = new assert.AssertionError({
  actual: 1,
  expected: 2,
  operator: 'strictEqual',
});

// Verify error output:
try {
  assert.strictEqual(1, 2);
} catch (err) {
  assert(err instanceof assert.AssertionError);
  assert.strictEqual(err.message, message);
  assert.strictEqual(err.name, 'AssertionError');
  assert.strictEqual(err.actual, 1);
  assert.strictEqual(err.expected, 2);
  assert.strictEqual(err.code, 'ERR_ASSERTION');
  assert.strictEqual(err.operator, 'strictEqual');
  assert.strictEqual(err.generatedMessage, true);
}
```

```cjs
const assert = require('node:assert');

// Generate an AssertionError to compare the error message later:
const { message } = new assert.AssertionError({
  actual: 1,
  expected: 2,
  operator: 'strictEqual',
});

// Verify error output:
try {
  assert.strictEqual(1, 2);
} catch (err) {
  assert(err instanceof assert.AssertionError);
  assert.strictEqual(err.message, message);
  assert.strictEqual(err.name, 'AssertionError');
  assert.strictEqual(err.actual, 1);
  assert.strictEqual(err.expected, 2);
  assert.strictEqual(err.code, 'ERR_ASSERTION');
  assert.strictEqual(err.operator, 'strictEqual');
  assert.strictEqual(err.generatedMessage, true);
}
```

## Class: `assert.Assert`

The `Assert` class allows creating independent assertion instances with custom options.

### `new assert.Assert([options])`

* `options` {Object}
  * `diff` {string} If set to `'full'`, shows the full diff in assertion errors. Defaults to `'simple'`.
    Accepted values: `'simple'`, `'full'`.
  * `strict` {boolean} If set to `true`, non-strict methods behave like their
    corresponding strict methods. Defaults to `true`.
  * `skipPrototype` {boolean} If set to `true`, skips prototype and constructor
    comparison in deep equality checks. Defaults to `false`.

Creates a new assertion instance. The `diff` option controls the verbosity of diffs in assertion error messages.

```js
const { Assert } = require('node:assert');
const assertInstance = new Assert({ diff: 'full' });
assertInstance.deepStrictEqual({ a: 1 }, { a: 2 });
// Shows a full diff in the error message.
```

**Important**: When destructuring assertion methods from an `Assert` instance,
the methods lose their connection to the instance's configuration options (such
as `diff`, `strict`, and `skipPrototype` settings).
The destructured methods will fall back to default behavior instead.

```js
const myAssert = new Assert({ diff: 'full' });

// This works as expected - uses 'full' diff
myAssert.strictEqual({ a: 1 }, { b: { c: 1 } });

// This loses the 'full' diff setting - falls back to default 'simple' diff
const { strictEqual } = myAssert;
strictEqual({ a: 1 }, { b: { c: 1 } });
```

The `skipPrototype` option affects all deep equality methods:

```js
class Foo {
  constructor(a) {
    this.a = a;
  }
}

class Bar {
  constructor(a) {
    this.a = a;
  }
}

const foo = new Foo(1);
const bar = new Bar(1);

// Default behavior - fails due to different constructors
const assert1 = new Assert();
assert1.deepStrictEqual(foo, bar); // AssertionError

// Skip prototype comparison - passes if properties are equal
const assert2 = new Assert({ skipPrototype: true });
assert2.deepStrictEqual(foo, bar); // OK
```

When destructured, methods lose access to the instance's `this` context and revert to the default assertion behavior
(diff: 'simple', non-strict mode).
To maintain custom options when using destructured methods, avoid
destructuring and call methods directly on the instance.

## `assert(value[, message])`

* `value` {any} The input that is checked for being truthy.
* `message` {string|Error|Function}

An alias of `assert.ok()`.

## `assert.deepEqual(actual, expected[, message])`

* `actual` {any}
* `expected` {any}
* `message` {string|Error|Function}

**Strict assertion mode**

An alias of `assert.deepStrictEqual()`.

**Legacy assertion mode**

> Stability: 3 - Legacy: Use `assert.deepStrictEqual()` instead.

Tests for deep equality between the `actual` and `expected` parameters. Consider
using `assert.deepStrictEqual()` instead. `assert.deepEqual()` can have
surprising results.

_Deep equality_ means that the enumerable "own" properties of child objects
are also recursively evaluated by the following rules.

### Comparison details

* Primitive values are compared with the `==` operator,
  except for {NaN}, which is treated as identical when both
  sides are {NaN}.
* Type tags of objects should be the same.
* Only enumerable "own" properties are considered.
* Object constructors are compared when available.
* {Error} names, messages, causes, and errors are always compared,
  even if these are not enumerable properties.
* Object wrappers are compared both as objects and unwrapped values.
* `Object` properties are compared unordered.
* {Map} keys and {Set} items are compared unordered.
* Recursion stops when both sides differ or either side encounters a circular
  reference.
* Implementation does not test the [`[[Prototype]]`][prototype-spec] of
  objects.
* {Symbol} properties are not compared.
* {WeakMap}, {WeakSet} and {Promise} instances are **not** compared
  structurally. They are only equal if they reference the same object. Any
  comparison between different `WeakMap`, `WeakSet`, or `Promise` instances
  will result in inequality, even if they contain the same content.
* {RegExp} lastIndex, flags, and source are always compared, even if these
  are not enumerable properties.

The following example does not throw an `AssertionError` because the
primitives are compared using the `==` operator.

```mjs
import assert from 'node:assert';
// WARNING: This does not throw an AssertionError!

assert.deepEqual('+00000000', false);
```

```cjs
const assert = require('node:assert');
// WARNING: This does not throw an AssertionError!

assert.deepEqual('+00000000', false);
```

"Deep" equality means that the enumerable "own" properties of child objects
are evaluated also:

```mjs
import assert from 'node:assert';

const obj1 = {
  a: {
    b: 1,
  },
};
const obj2 = {
  a: {
    b: 2,
  },
};
const obj3 = {
  a: {
    b: 1,
  },
};
const obj4 = { __proto__: obj1 };

assert.deepEqual(obj1, obj1);
// OK

// Values of b are different:
assert.deepEqual(obj1, obj2);
// AssertionError: { a: { b: 1 } } deepEqual { a: { b: 2 } }

assert.deepEqual(obj1, obj3);
// OK

// Prototypes are ignored:
assert.deepEqual(obj1, obj4);
// AssertionError: { a: { b: 1 } } deepEqual {}
```

```cjs
const assert = require('node:assert');

const obj1 = {
  a: {
    b: 1,
  },
};
const obj2 = {
  a: {
    b: 2,
  },
};
const obj3 = {
  a: {
    b: 1,
  },
};
const obj4 = { __proto__: obj1 };

assert.deepEqual(obj1, obj1);
// OK

// Values of b are different:
assert.deepEqual(obj1, obj2);
// AssertionError: { a: { b: 1 } } deepEqual { a: { b: 2 } }

assert.deepEqual(obj1, obj3);
// OK

// Prototypes are ignored:
assert.deepEqual(obj1, obj4);
// AssertionError: { a: { b: 1 } } deepEqual {}
```

If the values are not equal, an `AssertionError` is thrown with a `message`
property set equal to the value of the `message` parameter. If the `message`
parameter is undefined, a default error message is assigned. If the `message`
parameter is an instance of {Error} then it will be thrown instead of the
`AssertionError`.
