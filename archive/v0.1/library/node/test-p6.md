---
title: "Test runner (part 6 of 14)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/test.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Test runner (part 6 of 14)

## `it.only(name[, fn])`

Shorthand for marking a test as `only`,
same as `it([name], { only: true }[, fn])`.

## `before(fn)`

* `fn` {Function|AsyncFunction} The hook function.
  If the hook uses callbacks,
  the callback function is passed as the second argument. **Default:** A no-op
  function.
* `options` {Object} Configuration options for the hook. The following
  properties are supported:
  * `signal` {AbortSignal} Allows aborting an in-progress hook.
  * `timeout` {number} A number of milliseconds the hook will fail after.
    If unspecified, subtests inherit this value from their parent.
    **Default:** `Infinity`.

This function creates a hook that runs before executing a suite.

```js
describe('tests', async () => {
  before(() => console.log('about to run some test'));
  it('is a subtest', () => {
    // Some relevant assertions here
  });
});
```

## `after(fn)`

* `fn` {Function|AsyncFunction} The hook function.
  If the hook uses callbacks,
  the callback function is passed as the second argument. **Default:** A no-op
  function.
* `options` {Object} Configuration options for the hook. The following
  properties are supported:
  * `signal` {AbortSignal} Allows aborting an in-progress hook.
  * `timeout` {number} A number of milliseconds the hook will fail after.
    If unspecified, subtests inherit this value from their parent.
    **Default:** `Infinity`.

This function creates a hook that runs after executing a suite.

```js
describe('tests', async () => {
  after(() => console.log('finished running tests'));
  it('is a subtest', () => {
    // Some relevant assertion here
  });
});
```

**Note:** The `after` hook is guaranteed to run,
even if tests within the suite fail.

## `beforeEach(fn)`

* `fn` {Function|AsyncFunction} The hook function.
  If the hook uses callbacks,
  the callback function is passed as the second argument. **Default:** A no-op
  function.
* `options` {Object} Configuration options for the hook. The following
  properties are supported:
  * `signal` {AbortSignal} Allows aborting an in-progress hook.
  * `timeout` {number} A number of milliseconds the hook will fail after.
    If unspecified, subtests inherit this value from their parent.
    **Default:** `Infinity`.

This function creates a hook that runs before each test in the current suite.

```js
describe('tests', async () => {
  beforeEach(() => console.log('about to run a test'));
  it('is a subtest', () => {
    // Some relevant assertion here
  });
});
```

## `afterEach(fn)`

* `fn` {Function|AsyncFunction} The hook function.
  If the hook uses callbacks,
  the callback function is passed as the second argument. **Default:** A no-op
  function.
* `options` {Object} Configuration options for the hook. The following
  properties are supported:
  * `signal` {AbortSignal} Allows aborting an in-progress hook.
  * `timeout` {number} A number of milliseconds the hook will fail after.
    If unspecified, subtests inherit this value from their parent.
    **Default:** `Infinity`.

This function creates a hook that runs after each test in the current suite.
The `afterEach()` hook is run even if the test fails.

```js
describe('tests', async () => {
  afterEach(() => console.log('finished running a test'));
  it('is a subtest', () => {
    // Some relevant assertion here
  });
});
```

## `assert`

An object whose methods are used to configure available assertions on the
`TestContext` objects in the current process. The methods from `node:assert`
and snapshot testing functions are available by default.

It is possible to apply the same configuration to all files by placing common
configuration code in a module
preloaded with `--require` or `--import`.

### `assert.register(name, fn)`

Defines a new assertion function with the provided name and function. If an
assertion already exists with the same name, it is overwritten.

## `snapshot`

An object whose methods are used to configure default snapshot settings in the
current process. It is possible to apply the same configuration to all files by
placing common configuration code in a module preloaded with `--require` or
`--import`.

### `snapshot.setDefaultSnapshotSerializers(serializers)`

* `serializers` {Array} An array of synchronous functions used as the default
  serializers for snapshot tests.

This function is used to customize the default serialization mechanism used by
the test runner. By default, the test runner performs serialization by calling
`JSON.stringify(value, null, 2)` on the provided value. `JSON.stringify()` does
have limitations regarding circular structures and supported data types. If a
more robust serialization mechanism is required, this function should be used.

### `snapshot.setResolveSnapshotPath(fn)`

* `fn` {Function} A function used to compute the location of the snapshot file.
  The function receives the path of the test file as its only argument. If the
  test is not associated with a file (for example in the REPL), the input is
  undefined. `fn()` must return a string specifying the location of the snapshot file.

This function is used to customize the location of the snapshot file used for
snapshot testing. By default, the snapshot filename is the same as the entry
point filename with a `.snapshot` file extension.

## Class: `MockFunctionContext`

The `MockFunctionContext` class is used to inspect or manipulate the behavior of
mocks created via the `MockTracker` APIs.

### `ctx.calls`

* Type: {Array}

A getter that returns a copy of the internal array used to track calls to the
mock. Each entry in the array is an object with the following properties.

* `arguments` {Array} An array of the arguments passed to the mock function.
* `error` {any} If the mocked function threw then this property contains the
  thrown value. **Default:** `undefined`.
* `result` {any} The value returned by the mocked function.
* `stack` {Error} An `Error` object whose stack can be used to determine the
  callsite of the mocked function invocation.
* `target` {Function|undefined} If the mocked function is a constructor, this
  field contains the class being constructed. Otherwise this will be
  `undefined`.
* `this` {any} The mocked function's `this` value.

### `ctx.callCount()`

* Returns: {integer} The number of times that this mock has been invoked.

This function returns the number of times that this mock has been invoked. This
function is more efficient than checking `ctx.calls.length` because `ctx.calls`
is a getter that creates a copy of the internal call tracking array.

### `ctx.mockImplementation(implementation)`

* `implementation` {Function|AsyncFunction} The function to be used as the
  mock's new implementation.

This function is used to change the behavior of an existing mock.

The following example creates a mock function using `t.mock.fn()`, calls the
mock function, and then changes the mock implementation to a different function.

```js
test('changes a mock behavior', (t) => {
  let cnt = 0;

  function addOne() {
    cnt++;
    return cnt;
  }

  function addTwo() {
    cnt += 2;
    return cnt;
  }

  const fn = t.mock.fn(addOne);

  assert.strictEqual(fn(), 1);
  fn.mock.mockImplementation(addTwo);
  assert.strictEqual(fn(), 3);
  assert.strictEqual(fn(), 5);
});
```

### `ctx.mockImplementationOnce(implementation[, onCall])`

* `implementation` {Function|AsyncFunction} The function to be used as the
  mock's implementation for the invocation number specified by `onCall`.
* `onCall` {integer} The invocation number that will use `implementation`. If
  the specified invocation has already occurred then an exception is thrown.
  **Default:** The number of the next invocation.

This function is used to change the behavior of an existing mock for a single
invocation. Once invocation `onCall` has occurred, the mock will revert to
whatever behavior it would have used had `mockImplementationOnce()` not been
called.

The following example creates a mock function using `t.mock.fn()`, calls the
mock function, changes the mock implementation to a different function for the
next invocation, and then resumes its previous behavior.

```js
test('changes a mock behavior once', (t) => {
  let cnt = 0;

  function addOne() {
    cnt++;
    return cnt;
  }

  function addTwo() {
    cnt += 2;
    return cnt;
  }

  const fn = t.mock.fn(addOne);

  assert.strictEqual(fn(), 1);
  fn.mock.mockImplementationOnce(addTwo);
  assert.strictEqual(fn(), 3);
  assert.strictEqual(fn(), 4);
});
```

### `ctx.resetCalls()`

Resets the call history of the mock function.

### `ctx.restore()`

Resets the implementation of the mock function to its original behavior. The
mock can still be used after calling this function.

## Class: `MockModuleContext`

> Stability: 1.0 - Early development

The `MockModuleContext` class is used to manipulate the behavior of module mocks
created via the `MockTracker` APIs.

### `ctx.restore()`

Resets the implementation of the mock module.

## Class: `MockPropertyContext`

The `MockPropertyContext` class is used to inspect or manipulate the behavior
of property mocks created via the `MockTracker` APIs.

### `ctx.accesses`

* Type: {Array}

A getter that returns a copy of the internal array used to track accesses (get/set) to
the mocked property. Each entry in the array is an object with the following properties:

* `type` {string} Either `'get'` or `'set'`, indicating the type of access.
* `value` {any} The value that was read (for `'get'`) or written (for `'set'`).
* `stack` {Error} An `Error` object whose stack can be used to determine the
  callsite of the mocked function invocation.

### `ctx.accessCount()`

* Returns: {integer} The number of times that the property was accessed (read or written).

This function returns the number of times that the property was accessed.
This function is more efficient than checking `ctx.accesses.length` because
`ctx.accesses` is a getter that creates a copy of the internal access tracking array.

### `ctx.mockImplementation(value)`

* `value` {any} The new value to be set as the mocked property value.

This function is used to change the value returned by the mocked property getter.

### `ctx.mockImplementationOnce(value[, onAccess])`

* `value` {any} The value to be used as the mock's
  implementation for the invocation number specified by `onAccess`.
* `onAccess` {integer} The invocation number that will use `value`. If
  the specified invocation has already occurred then an exception is thrown.
  **Default:** The number of the next invocation.

This function is used to change the behavior of an existing mock for a single
invocation. Once invocation `onAccess` has occurred, the mock will revert to
whatever behavior it would have used had `mockImplementationOnce()` not been
called.

The following example creates a mock function using `t.mock.property()`, calls the
mock property, changes the mock implementation to a different value for the
next invocation, and then resumes its previous behavior.

```js
test('changes a mock behavior once', (t) => {
  const obj = { foo: 1 };

  const prop = t.mock.property(obj, 'foo', 5);

  assert.strictEqual(obj.foo, 5);
  prop.mock.mockImplementationOnce(25);
  assert.strictEqual(obj.foo, 25);
  assert.strictEqual(obj.foo, 5);
});
```

#### Caveat

For consistency with the rest of the mocking API, this function treats both property gets and sets
as accesses. If a property set occurs at the same access index, the "once" value will be consumed
by the set operation, and the mocked property value will be changed to the "once" value. This may
lead to unexpected behavior if you intend the "once" value to only be used for a get operation.

### `ctx.resetAccesses()`

Resets the access history of the mocked property.

### `ctx.restore()`

Resets the implementation of the mock property to its original behavior. The
mock can still be used after calling this function.
