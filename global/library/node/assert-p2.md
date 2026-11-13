---
title: "Assert (part 2 of 5)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/assert.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Assert (part 2 of 5)

## `assert.deepStrictEqual(actual, expected[, message])`

* `actual` {any}
* `expected` {any}
* `message` {string|Error|Function}

Tests for deep equality between the `actual` and `expected` parameters.
"Deep" equality means that the enumerable "own" properties of child objects
are recursively evaluated also by the following rules.

### Comparison details

* Primitive values are compared using `Object.is()`.
* Type tags of objects should be the same.
* [`[[Prototype]]`][prototype-spec] of objects are compared using
  the `===` operator.
* Only enumerable "own" properties are considered.
* Object constructors are compared when available.
* {Error} names, messages, causes, and errors are always compared,
  even if these are not enumerable properties.
  `errors` is also compared.
* Enumerable own {Symbol} properties are compared as well.
* Object wrappers are compared both as objects and unwrapped values.
* `Object` properties are compared unordered.
* {Map} keys and {Set} items are compared unordered.
* Recursion stops when both sides differ or either side encounters a circular
  reference.
* {WeakMap}, {WeakSet} and {Promise} instances are **not** compared
  structurally. They are only equal if they reference the same object. Any
  comparison between different `WeakMap`, `WeakSet`, or `Promise` instances
  will result in inequality, even if they contain the same content.
* {RegExp} lastIndex, flags, and source are always compared, even if these
  are not enumerable properties.

```mjs
import assert from 'node:assert/strict';

// This fails because 1 !== '1'.
assert.deepStrictEqual({ a: 1 }, { a: '1' });
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
//   {
// +   a: 1
// -   a: '1'
//   }

// The following objects don't have own properties
const date = new Date();
const object = {};
const fakeDate = {};
Object.setPrototypeOf(fakeDate, Date.prototype);

// Different [[Prototype]]:
assert.deepStrictEqual(object, fakeDate);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
// + {}
// - Date {}

// Different type tags:
assert.deepStrictEqual(date, fakeDate);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
// + 2018-04-26T00:49:08.604Z
// - Date {}

assert.deepStrictEqual(NaN, NaN);
// OK because Object.is(NaN, NaN) is true.

// Different unwrapped numbers:
assert.deepStrictEqual(new Number(1), new Number(2));
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
// + [Number: 1]
// - [Number: 2]

assert.deepStrictEqual(new String('foo'), Object('foo'));
// OK because the object and the string are identical when unwrapped.

assert.deepStrictEqual(-0, -0);
// OK

// Different zeros:
assert.deepStrictEqual(0, -0);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
// + 0
// - -0

const symbol1 = Symbol();
const symbol2 = Symbol();
assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol1]: 1 });
// OK, because it is the same symbol on both objects.

assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol2]: 1 });
// AssertionError [ERR_ASSERTION]: Inputs identical but not reference equal:
//
// {
//   Symbol(): 1
// }

const weakMap1 = new WeakMap();
const weakMap2 = new WeakMap();
const obj = {};

weakMap1.set(obj, 'value');
weakMap2.set(obj, 'value');

// Comparing different instances fails, even with same contents
assert.deepStrictEqual(weakMap1, weakMap2);
// AssertionError: Values have same structure but are not reference-equal:
//
// WeakMap {
//   <items unknown>
// }

// Comparing the same instance to itself succeeds
assert.deepStrictEqual(weakMap1, weakMap1);
// OK

const weakSet1 = new WeakSet();
const weakSet2 = new WeakSet();
weakSet1.add(obj);
weakSet2.add(obj);

// Comparing different instances fails, even with same contents
assert.deepStrictEqual(weakSet1, weakSet2);
// AssertionError: Values have same structure but are not reference-equal:
// + actual - expected
//
// WeakSet {
//   <items unknown>
// }

// Comparing the same instance to itself succeeds
assert.deepStrictEqual(weakSet1, weakSet1);
// OK
```

```cjs
const assert = require('node:assert/strict');

// This fails because 1 !== '1'.
assert.deepStrictEqual({ a: 1 }, { a: '1' });
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
//   {
// +   a: 1
// -   a: '1'
//   }

// The following objects don't have own properties
const date = new Date();
const object = {};
const fakeDate = {};
Object.setPrototypeOf(fakeDate, Date.prototype);

// Different [[Prototype]]:
assert.deepStrictEqual(object, fakeDate);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
// + {}
// - Date {}

// Different type tags:
assert.deepStrictEqual(date, fakeDate);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
// + 2018-04-26T00:49:08.604Z
// - Date {}

assert.deepStrictEqual(NaN, NaN);
// OK because Object.is(NaN, NaN) is true.

// Different unwrapped numbers:
assert.deepStrictEqual(new Number(1), new Number(2));
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
// + [Number: 1]
// - [Number: 2]

assert.deepStrictEqual(new String('foo'), Object('foo'));
// OK because the object and the string are identical when unwrapped.

assert.deepStrictEqual(-0, -0);
// OK

// Different zeros:
assert.deepStrictEqual(0, -0);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
// + 0
// - -0

const symbol1 = Symbol();
const symbol2 = Symbol();
assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol1]: 1 });
// OK, because it is the same symbol on both objects.

assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol2]: 1 });
// AssertionError [ERR_ASSERTION]: Inputs identical but not reference equal:
//
// {
//   Symbol(): 1
// }

const weakMap1 = new WeakMap();
const weakMap2 = new WeakMap();
const obj = {};

weakMap1.set(obj, 'value');
weakMap2.set(obj, 'value');

// Comparing different instances fails, even with same contents
assert.deepStrictEqual(weakMap1, weakMap2);
// AssertionError: Values have same structure but are not reference-equal:
//
// WeakMap {
//   <items unknown>
// }

// Comparing the same instance to itself succeeds
assert.deepStrictEqual(weakMap1, weakMap1);
// OK

const weakSet1 = new WeakSet();
const weakSet2 = new WeakSet();
weakSet1.add(obj);
weakSet2.add(obj);

// Comparing different instances fails, even with same contents
assert.deepStrictEqual(weakSet1, weakSet2);
// AssertionError: Values have same structure but are not reference-equal:
// + actual - expected
//
// WeakSet {
//   <items unknown>
// }

// Comparing the same instance to itself succeeds
assert.deepStrictEqual(weakSet1, weakSet1);
// OK
```

If the values are not equal, an `AssertionError` is thrown with a `message`
property set equal to the value of the `message` parameter. If the `message`
parameter is undefined, a default error message is assigned. If the `message`
parameter is an instance of {Error} then it will be thrown instead of the
`AssertionError`.

## `assert.doesNotMatch(string, regexp[, message])`

* `string` {string}
* `regexp` {RegExp}
* `message` {string|Error|Function}

Expects the `string` input not to match the regular expression.

```mjs
import assert from 'node:assert/strict';

assert.doesNotMatch('I will fail', /fail/);
// AssertionError [ERR_ASSERTION]: The input was expected to not match the ...

assert.doesNotMatch(123, /pass/);
// AssertionError [ERR_ASSERTION]: The "string" argument must be of type string.

assert.doesNotMatch('I will pass', /different/);
// OK
```

```cjs
const assert = require('node:assert/strict');

assert.doesNotMatch('I will fail', /fail/);
// AssertionError [ERR_ASSERTION]: The input was expected to not match the ...

assert.doesNotMatch(123, /pass/);
// AssertionError [ERR_ASSERTION]: The "string" argument must be of type string.

assert.doesNotMatch('I will pass', /different/);
// OK
```

If the values do match, or if the `string` argument is of another type than
`string`, an `AssertionError` is thrown with a `message` property set equal
to the value of the `message` parameter. If the `message` parameter is
undefined, a default error message is assigned. If the `message` parameter is an
instance of {Error} then it will be thrown instead of the
`AssertionError`.

## `assert.doesNotReject(asyncFn, error)`

* `asyncFn` {Function|Promise}
* `error` {RegExp|Function}
* `message` {string}
* Returns: {Promise}

Awaits the `asyncFn` promise or, if `asyncFn` is a function, immediately
calls the function and awaits the returned promise to complete. It will then
check that the promise is not rejected.

If `asyncFn` is a function and it throws an error synchronously,
`assert.doesNotReject()` will return a rejected `Promise` with that error. If
the function does not return a promise, `assert.doesNotReject()` will return a
rejected `Promise` with an `ERR_INVALID_RETURN_VALUE` error. In both cases
the error handler is skipped.

Using `assert.doesNotReject()` is actually not useful because there is little
benefit in catching a rejection and then rejecting it again. Instead, consider
adding a comment next to the specific code path that should not reject and keep
error messages as expressive as possible.

If specified, `error` can be a `Class`, {RegExp} or a validation
function. See `assert.throws()` for more details.

Aside from asynchronously awaiting completion, it behaves identically to
`assert.doesNotThrow()`.

```mjs
import assert from 'node:assert/strict';

await assert.doesNotReject(
  async () => {
    throw new TypeError('Wrong value');
  },
  SyntaxError,
);
```

```cjs
const assert = require('node:assert/strict');

(async () => {
  await assert.doesNotReject(
    async () => {
      throw new TypeError('Wrong value');
    },
    SyntaxError,
  );
})();
```

```mjs
import assert from 'node:assert/strict';

assert.doesNotReject(Promise.reject(new TypeError('Wrong value')))
  .then(() => {
    // ...
  });
```

```cjs
const assert = require('node:assert/strict');

assert.doesNotReject(Promise.reject(new TypeError('Wrong value')))
  .then(() => {
    // ...
  });
```

## `assert.doesNotThrow(fn, error)`

* `fn` {Function}
* `error` {RegExp|Function}
* `message` {string}

Asserts that the function `fn` does not throw an error.

Using `assert.doesNotThrow()` is actually not useful because there
is no benefit in catching an error and then rethrowing it. Instead, consider
adding a comment next to the specific code path that should not throw and keep
error messages as expressive as possible.

When `assert.doesNotThrow()` is called, it will immediately call the `fn`
function.

If an error is thrown and it is the same type as that specified by the `error`
parameter, then an `AssertionError` is thrown. If the error is of a
different type, or if the `error` parameter is undefined, the error is
propagated back to the caller.

If specified, `error` can be a `Class`, {RegExp}, or a validation
function. See `assert.throws()` for more details.

The following, for instance, will throw the {TypeError} because there is no
matching error type in the assertion:

```mjs
import assert from 'node:assert/strict';

assert.doesNotThrow(
  () => {
    throw new TypeError('Wrong value');
  },
  SyntaxError,
);
```

```cjs
const assert = require('node:assert/strict');

assert.doesNotThrow(
  () => {
    throw new TypeError('Wrong value');
  },
  SyntaxError,
);
```

However, the following will result in an `AssertionError` with the message
'Got unwanted exception...':

```mjs
import assert from 'node:assert/strict';

assert.doesNotThrow(
  () => {
    throw new TypeError('Wrong value');
  },
  TypeError,
);
```

```cjs
const assert = require('node:assert/strict');

assert.doesNotThrow(
  () => {
    throw new TypeError('Wrong value');
  },
  TypeError,
);
```

If an `AssertionError` is thrown and a value is provided for the `message`
parameter, the value of `message` will be appended to the `AssertionError`
message:

```mjs
import assert from 'node:assert/strict';

assert.doesNotThrow(
  () => {
    throw new TypeError('Wrong value');
  },
  /Wrong value/,
  'Whoops',
);
// Throws: AssertionError: Got unwanted exception: Whoops
```

```cjs
const assert = require('node:assert/strict');

assert.doesNotThrow(
  () => {
    throw new TypeError('Wrong value');
  },
  /Wrong value/,
  'Whoops',
);
// Throws: AssertionError: Got unwanted exception: Whoops
```

## `assert.equal(actual, expected[, message])`

* `actual` {any}
* `expected` {any}
* `message` {string|Error|Function}

**Strict assertion mode**

An alias of `assert.strictEqual()`.

**Legacy assertion mode**

> Stability: 3 - Legacy: Use `assert.strictEqual()` instead.

Tests shallow, coercive equality between the `actual` and `expected` parameters
using the `==` operator. `NaN` is specially handled
and treated as being identical if both sides are `NaN`.

```mjs
import assert from 'node:assert';

assert.equal(1, 1);
// OK, 1 == 1
assert.equal(1, '1');
// OK, 1 == '1'
assert.equal(NaN, NaN);
// OK

assert.equal(1, 2);
// AssertionError: 1 == 2
assert.equal({ a: { b: 1 } }, { a: { b: 1 } });
// AssertionError: { a: { b: 1 } } == { a: { b: 1 } }
```

```cjs
const assert = require('node:assert');

assert.equal(1, 1);
// OK, 1 == 1
assert.equal(1, '1');
// OK, 1 == '1'
assert.equal(NaN, NaN);
// OK

assert.equal(1, 2);
// AssertionError: 1 == 2
assert.equal({ a: { b: 1 } }, { a: { b: 1 } });
// AssertionError: { a: { b: 1 } } == { a: { b: 1 } }
```

If the values are not equal, an `AssertionError` is thrown with a `message`
property set equal to the value of the `message` parameter. If the `message`
parameter is undefined, a default error message is assigned. If the `message`
parameter is an instance of {Error} then it will be thrown instead of the
`AssertionError`.

## `assert.fail([message])`

* `message` {string|Error} **Default:** `'Failed'`

Throws an `AssertionError` with the provided error message or a default
error message. If the `message` parameter is an instance of {Error} then
it will be thrown instead of the `AssertionError`.

```mjs
import assert from 'node:assert/strict';

assert.fail();
// AssertionError [ERR_ASSERTION]: Failed

assert.fail('boom');
// AssertionError [ERR_ASSERTION]: boom

assert.fail(new TypeError('need array'));
// TypeError: need array
```

```cjs
const assert = require('node:assert/strict');

assert.fail();
// AssertionError [ERR_ASSERTION]: Failed

assert.fail('boom');
// AssertionError [ERR_ASSERTION]: boom

assert.fail(new TypeError('need array'));
// TypeError: need array
```
