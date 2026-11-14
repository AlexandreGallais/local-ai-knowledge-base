---
title: "Assert (part 3 of 5)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/assert.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Assert (part 3 of 5)

## `assert.ifError(value)`

* `value` {any}

Throws `value` if `value` is not `undefined` or `null`. This is useful when
testing the `error` argument in callbacks. The stack trace contains all frames
from the error passed to `ifError()` including the potential new frames for
`ifError()` itself.

```mjs
import assert from 'node:assert/strict';

assert.ifError(null);
// OK
assert.ifError(0);
// AssertionError [ERR_ASSERTION]: ifError got unwanted exception: 0
assert.ifError('error');
// AssertionError [ERR_ASSERTION]: ifError got unwanted exception: 'error'
assert.ifError(new Error());
// AssertionError [ERR_ASSERTION]: ifError got unwanted exception: Error

// Create some random error frames.
let err;
(function errorFrame() {
  err = new Error('test error');
})();

(function ifErrorFrame() {
  assert.ifError(err);
})();
// AssertionError [ERR_ASSERTION]: ifError got unwanted exception: test error
//     at ifErrorFrame
//     at errorFrame
```

```cjs
const assert = require('node:assert/strict');

assert.ifError(null);
// OK
assert.ifError(0);
// AssertionError [ERR_ASSERTION]: ifError got unwanted exception: 0
assert.ifError('error');
// AssertionError [ERR_ASSERTION]: ifError got unwanted exception: 'error'
assert.ifError(new Error());
// AssertionError [ERR_ASSERTION]: ifError got unwanted exception: Error

// Create some random error frames.
let err;
(function errorFrame() {
  err = new Error('test error');
})();

(function ifErrorFrame() {
  assert.ifError(err);
})();
// AssertionError [ERR_ASSERTION]: ifError got unwanted exception: test error
//     at ifErrorFrame
//     at errorFrame
```

## `assert.match(string, regexp[, message])`

* `string` {string}
* `regexp` {RegExp}
* `message` {string|Error|Function}

Expects the `string` input to match the regular expression.

```mjs
import assert from 'node:assert/strict';

assert.match('I will fail', /pass/);
// AssertionError [ERR_ASSERTION]: The input did not match the regular ...

assert.match(123, /pass/);
// AssertionError [ERR_ASSERTION]: The "string" argument must be of type string.

assert.match('I will pass', /pass/);
// OK
```

```cjs
const assert = require('node:assert/strict');

assert.match('I will fail', /pass/);
// AssertionError [ERR_ASSERTION]: The input did not match the regular ...

assert.match(123, /pass/);
// AssertionError [ERR_ASSERTION]: The "string" argument must be of type string.

assert.match('I will pass', /pass/);
// OK
```

If the values do not match, or if the `string` argument is of another type than
`string`, an `AssertionError` is thrown with a `message` property set equal
to the value of the `message` parameter. If the `message` parameter is
undefined, a default error message is assigned. If the `message` parameter is an
instance of {Error} then it will be thrown instead of the
`AssertionError`.

## `assert.notDeepEqual(actual, expected[, message])`

* `actual` {any}
* `expected` {any}
* `message` {string|Error|Function}

**Strict assertion mode**

An alias of `assert.notDeepStrictEqual()`.

**Legacy assertion mode**

> Stability: 3 - Legacy: Use `assert.notDeepStrictEqual()` instead.

Tests for any deep inequality. Opposite of `assert.deepEqual()`.

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

assert.notDeepEqual(obj1, obj1);
// AssertionError: { a: { b: 1 } } notDeepEqual { a: { b: 1 } }

assert.notDeepEqual(obj1, obj2);
// OK

assert.notDeepEqual(obj1, obj3);
// AssertionError: { a: { b: 1 } } notDeepEqual { a: { b: 1 } }

assert.notDeepEqual(obj1, obj4);
// OK
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

assert.notDeepEqual(obj1, obj1);
// AssertionError: { a: { b: 1 } } notDeepEqual { a: { b: 1 } }

assert.notDeepEqual(obj1, obj2);
// OK

assert.notDeepEqual(obj1, obj3);
// AssertionError: { a: { b: 1 } } notDeepEqual { a: { b: 1 } }

assert.notDeepEqual(obj1, obj4);
// OK
```

If the values are deeply equal, an `AssertionError` is thrown with a
`message` property set equal to the value of the `message` parameter. If the
`message` parameter is undefined, a default error message is assigned. If the
`message` parameter is an instance of {Error} then it will be thrown
instead of the `AssertionError`.

## `assert.notDeepStrictEqual(actual, expected[, message])`

* `actual` {any}
* `expected` {any}
* `message` {string|Error|Function}

Tests for deep strict inequality. Opposite of `assert.deepStrictEqual()`.

```mjs
import assert from 'node:assert/strict';

assert.notDeepStrictEqual({ a: 1 }, { a: '1' });
// OK
```

```cjs
const assert = require('node:assert/strict');

assert.notDeepStrictEqual({ a: 1 }, { a: '1' });
// OK
```

If the values are deeply and strictly equal, an `AssertionError` is thrown
with a `message` property set equal to the value of the `message` parameter. If
the `message` parameter is undefined, a default error message is assigned. If
the `message` parameter is an instance of {Error} then it will be thrown
instead of the `AssertionError`.

## `assert.notEqual(actual, expected[, message])`

* `actual` {any}
* `expected` {any}
* `message` {string|Error|Function}

**Strict assertion mode**

An alias of `assert.notStrictEqual()`.

**Legacy assertion mode**

> Stability: 3 - Legacy: Use `assert.notStrictEqual()` instead.

Tests shallow, coercive inequality with the `!=` operator. `NaN` is
specially handled and treated as being identical if both sides are `NaN`.

```mjs
import assert from 'node:assert';

assert.notEqual(1, 2);
// OK

assert.notEqual(1, 1);
// AssertionError: 1 != 1

assert.notEqual(1, '1');
// AssertionError: 1 != '1'
```

```cjs
const assert = require('node:assert');

assert.notEqual(1, 2);
// OK

assert.notEqual(1, 1);
// AssertionError: 1 != 1

assert.notEqual(1, '1');
// AssertionError: 1 != '1'
```

If the values are equal, an `AssertionError` is thrown with a `message`
property set equal to the value of the `message` parameter. If the `message`
parameter is undefined, a default error message is assigned. If the `message`
parameter is an instance of {Error} then it will be thrown instead of the
`AssertionError`.

## `assert.notStrictEqual(actual, expected[, message])`

* `actual` {any}
* `expected` {any}
* `message` {string|Error|Function}

Tests strict inequality between the `actual` and `expected` parameters as
determined by `Object.is()`.

```mjs
import assert from 'node:assert/strict';

assert.notStrictEqual(1, 2);
// OK

assert.notStrictEqual(1, 1);
// AssertionError [ERR_ASSERTION]: Expected "actual" to be strictly unequal to:
//
// 1

assert.notStrictEqual(1, '1');
// OK
```

```cjs
const assert = require('node:assert/strict');

assert.notStrictEqual(1, 2);
// OK

assert.notStrictEqual(1, 1);
// AssertionError [ERR_ASSERTION]: Expected "actual" to be strictly unequal to:
//
// 1

assert.notStrictEqual(1, '1');
// OK
```

If the values are strictly equal, an `AssertionError` is thrown with a
`message` property set equal to the value of the `message` parameter. If the
`message` parameter is undefined, a default error message is assigned. If the
`message` parameter is an instance of {Error} then it will be thrown
instead of the `AssertionError`.

## `assert.ok(value[, message])`

* `value` {any}
* `message` {string|Error|Function}

Tests if `value` is truthy. It is equivalent to
`assert.equal(!!value, true, message)`.

If `value` is not truthy, an `AssertionError` is thrown with a `message`
property set equal to the value of the `message` parameter. If the `message`
parameter is `undefined`, a default error message is assigned. If the `message`
parameter is an instance of {Error} then it will be thrown instead of the
`AssertionError`.
If no arguments are passed in at all `message` will be set to the string:
``'No value argument passed to `assert.ok()`'``.

Be aware that in the `repl` the error message will be different to the one
thrown in a file! See below for further details.

```mjs
import assert from 'node:assert/strict';

assert.ok(true);
// OK
assert.ok(1);
// OK

assert.ok();
// AssertionError: No value argument passed to `assert.ok()`

assert.ok(false, 'it\'s false');
// AssertionError: it's false

// In the repl:
assert.ok(typeof 123 === 'string');
// AssertionError: false == true

// In a file (e.g. test.js):
assert.ok(typeof 123 === 'string');
// AssertionError: The expression evaluated to a falsy value:
//
//   assert.ok(typeof 123 === 'string')

assert.ok(false);
// AssertionError: The expression evaluated to a falsy value:
//
//   assert.ok(false)

assert.ok(0);
// AssertionError: The expression evaluated to a falsy value:
//
//   assert.ok(0)
```

```cjs
const assert = require('node:assert/strict');

assert.ok(true);
// OK
assert.ok(1);
// OK

assert.ok();
// AssertionError: No value argument passed to `assert.ok()`

assert.ok(false, 'it\'s false');
// AssertionError: it's false

// In the repl:
assert.ok(typeof 123 === 'string');
// AssertionError: false == true

// In a file (e.g. test.js):
assert.ok(typeof 123 === 'string');
// AssertionError: The expression evaluated to a falsy value:
//
//   assert.ok(typeof 123 === 'string')

assert.ok(false);
// AssertionError: The expression evaluated to a falsy value:
//
//   assert.ok(false)

assert.ok(0);
// AssertionError: The expression evaluated to a falsy value:
//
//   assert.ok(0)
```

```mjs
import assert from 'node:assert/strict';

// Using `assert()` works the same:
assert(2 + 2 > 5);
// AssertionError: The expression evaluated to a falsy value:
//
//   assert(2 + 2 > 5)
```

```cjs
const assert = require('node:assert');

// Using `assert()` works the same:
assert(2 + 2 > 5);
// AssertionError: The expression evaluated to a falsy value:
//
//   assert(2 + 2 > 5)
```

## `assert.rejects(asyncFn, error)`

* `asyncFn` {Function|Promise}
* `error` {RegExp|Function|Object|Error}
* `message` {string}
* Returns: {Promise}

Awaits the `asyncFn` promise or, if `asyncFn` is a function, immediately
calls the function and awaits the returned promise to complete. It will then
check that the promise is rejected.

If `asyncFn` is a function and it throws an error synchronously,
`assert.rejects()` will return a rejected `Promise` with that error. If the
function does not return a promise, `assert.rejects()` will return a rejected
`Promise` with an `ERR_INVALID_RETURN_VALUE` error. In both cases the error
handler is skipped.

Besides the async nature to await the completion behaves identically to
`assert.throws()`.

If specified, `error` can be a `Class`, {RegExp}, a validation function,
an object where each property will be tested for, or an instance of error where
each property will be tested for including the non-enumerable `message` and
`name` properties.

If specified, `message` will be the message provided by the `AssertionError`
if the `asyncFn` fails to reject.

```mjs
import assert from 'node:assert/strict';

await assert.rejects(
  async () => {
    throw new TypeError('Wrong value');
  },
  {
    name: 'TypeError',
    message: 'Wrong value',
  },
);
```

```cjs
const assert = require('node:assert/strict');

(async () => {
  await assert.rejects(
    async () => {
      throw new TypeError('Wrong value');
    },
    {
      name: 'TypeError',
      message: 'Wrong value',
    },
  );
})();
```

```mjs
import assert from 'node:assert/strict';

await assert.rejects(
  async () => {
    throw new TypeError('Wrong value');
  },
  (err) => {
    assert.strictEqual(err.name, 'TypeError');
    assert.strictEqual(err.message, 'Wrong value');
    return true;
  },
);
```

```cjs
const assert = require('node:assert/strict');

(async () => {
  await assert.rejects(
    async () => {
      throw new TypeError('Wrong value');
    },
    (err) => {
      assert.strictEqual(err.name, 'TypeError');
      assert.strictEqual(err.message, 'Wrong value');
      return true;
    },
  );
})();
```

```mjs
import assert from 'node:assert/strict';

assert.rejects(
  Promise.reject(new Error('Wrong value')),
  Error,
).then(() => {
  // ...
});
```

```cjs
const assert = require('node:assert/strict');

assert.rejects(
  Promise.reject(new Error('Wrong value')),
  Error,
).then(() => {
  // ...
});
```

`error` cannot be a string. If a string is provided as the second
argument, then `error` is assumed to be omitted and the string will be used for
`message` instead. This can lead to easy-to-miss mistakes. Please read the
example in `assert.throws()` carefully if using a string as the second
argument gets considered.
