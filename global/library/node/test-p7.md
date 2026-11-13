---
title: "Test runner (part 7 of 14)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/test.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Test runner (part 7 of 14)

## Class: `MockTracker`

The `MockTracker` class is used to manage mocking functionality. The test runner
module provides a top level `mock` export which is a `MockTracker` instance.
Each test also provides its own `MockTracker` instance via the test context's
`mock` property.

### `mock.fn(original[, implementation])`

* `original` {Function|AsyncFunction} An optional function to create a mock on.
  **Default:** A no-op function.
* `implementation` {Function|AsyncFunction} An optional function used as the
  mock implementation for `original`. This is useful for creating mocks that
  exhibit one behavior for a specified number of calls and then restore the
  behavior of `original`. **Default:** The function specified by `original`.
* `options` {Object} Optional configuration options for the mock function. The
  following properties are supported:
  * `times` {integer} The number of times that the mock will use the behavior of
    `implementation`. Once the mock function has been called `times` times, it
    will automatically restore the behavior of `original`. This value must be an
    integer greater than zero. **Default:** `Infinity`.
* Returns: {Proxy} The mocked function. The mocked function contains a special
  `mock` property, which is an instance of `MockFunctionContext`, and can
  be used for inspecting and changing the behavior of the mocked function.

This function is used to create a mock function.

The following example creates a mock function that increments a counter by one
on each invocation. The `times` option is used to modify the mock behavior such
that the first two invocations add two to the counter instead of one.

```js
test('mocks a counting function', (t) => {
  let cnt = 0;

  function addOne() {
    cnt++;
    return cnt;
  }

  function addTwo() {
    cnt += 2;
    return cnt;
  }

  const fn = t.mock.fn(addOne, addTwo, { times: 2 });

  assert.strictEqual(fn(), 2);
  assert.strictEqual(fn(), 4);
  assert.strictEqual(fn(), 5);
  assert.strictEqual(fn(), 6);
});
```

### `mock.getter(object, methodName, implementation)`

This function is syntax sugar for `MockTracker.method` with `options.getter`
set to `true`.

### `mock.method(object, methodName, implementation)`

* `object` {Object} The object whose method is being mocked.
* `methodName` {string|symbol} The identifier of the method on `object` to mock.
  If `object[methodName]` is not a function, an error is thrown.
* `implementation` {Function|AsyncFunction} An optional function used as the
  mock implementation for `object[methodName]`. **Default:** The original method
  specified by `object[methodName]`.
* `options` {Object} Optional configuration options for the mock method. The
  following properties are supported:
  * `getter` {boolean} If `true`, `object[methodName]` is treated as a getter.
    This option cannot be used with the `setter` option. **Default:** false.
  * `setter` {boolean} If `true`, `object[methodName]` is treated as a setter.
    This option cannot be used with the `getter` option. **Default:** false.
  * `times` {integer} The number of times that the mock will use the behavior of
    `implementation`. Once the mocked method has been called `times` times, it
    will automatically restore the original behavior. This value must be an
    integer greater than zero. **Default:** `Infinity`.
* Returns: {Proxy} The mocked method. The mocked method contains a special
  `mock` property, which is an instance of `MockFunctionContext`, and can
  be used for inspecting and changing the behavior of the mocked method.

This function is used to create a mock on an existing object method. The
following example demonstrates how a mock is created on an existing object
method.

```js
test('spies on an object method', (t) => {
  const number = {
    value: 5,
    subtract(a) {
      return this.value - a;
    },
  };

  t.mock.method(number, 'subtract');
  assert.strictEqual(number.subtract.mock.callCount(), 0);
  assert.strictEqual(number.subtract(3), 2);
  assert.strictEqual(number.subtract.mock.callCount(), 1);

  const call = number.subtract.mock.calls[0];

  assert.deepStrictEqual(call.arguments, [3]);
  assert.strictEqual(call.result, 2);
  assert.strictEqual(call.error, undefined);
  assert.strictEqual(call.target, undefined);
  assert.strictEqual(call.this, number);
});
```

### `mock.module(specifier[, options])`

> Stability: 1.0 - Early development

* `specifier` {string|URL} A string identifying the module to mock.
* `options` {Object} Optional configuration options for the mock module. The
  following properties are supported:
  * `cache` {boolean} If `false`, each call to `require()` or `import()`
    generates a new mock module. If `true`, subsequent calls will return the same
    module mock, and the mock module is inserted into the CommonJS cache.
    **Default:** false.
  * `exports` {Object} Optional mocked exports. The `default` property, if
    provided, is used as the mocked module's default export. All other own
    enumerable properties are used as named exports.
    **This option cannot be used with `defaultExport` or `namedExports`.**
    * If the mock is a CommonJS or builtin module, `exports.default` is used as
      the value of `module.exports`.
    * If `exports.default` is not provided for a CommonJS or builtin mock,
      `module.exports` defaults to an empty object.
    * If named exports are provided with a non-object default export, the mock
      throws an exception when used as a CommonJS or builtin module.
  * `defaultExport` {any} An optional value used as the mocked module's default
    export. If this value is not provided, ESM mocks do not include a default
    export. If the mock is a CommonJS or builtin module, this setting is used as
    the value of `module.exports`. If this value is not provided, CJS and builtin
    mocks use an empty object as the value of `module.exports`.
    **This option cannot be used with `options.exports`.**
    This option is deprecated and will be removed in a later version.
    Prefer `options.exports.default`.
  * `namedExports` {Object} An optional object whose keys and values are used to
    create the named exports of the mock module. If the mock is a CommonJS or
    builtin module, these values are copied onto `module.exports`. Therefore, if a
    mock is created with both named exports and a non-object default export, the
    mock will throw an exception when used as a CJS or builtin module.
    **This option cannot be used with `options.exports`.**
    This option is deprecated and will be removed in a later version.
    Prefer `options.exports`.
* Returns: {MockModuleContext} An object that can be used to manipulate the mock.

This function is used to mock the exports of ECMAScript modules, CommonJS modules, JSON modules, and
Node.js builtin modules. Any references to the original module prior to mocking are not impacted. In
order to enable module mocking, Node.js must be started with the
`--experimental-test-module-mocks` command-line flag.

**Note**: module customization hooks registered via the **synchronous** API effect resolution of
the `specifier` provided to `mock.module`. Customization hooks registered via the **asynchronous**
API are currently ignored (because the test runner's loader is synchronous, and node does not
support multi-chain / cross-chain loading).

The following example demonstrates how a mock is created for a module.

```js
test('mocks a builtin module in both module systems', async (t) => {
  // Create a mock of 'node:readline' with a named export named 'foo', which
  // does not exist in the original 'node:readline' module.
  const mock = t.mock.module('node:readline', {
    exports: { foo: () => 42 },
  });

  let esmImpl = await import('node:readline');
  let cjsImpl = require('node:readline');

  // cursorTo() is an export of the original 'node:readline' module.
  assert.strictEqual(esmImpl.cursorTo, undefined);
  assert.strictEqual(cjsImpl.cursorTo, undefined);
  assert.strictEqual(esmImpl.foo(), 42);
  assert.strictEqual(cjsImpl.foo(), 42);

  mock.restore();

  // The mock is restored, so the original builtin module is returned.
  esmImpl = await import('node:readline');
  cjsImpl = require('node:readline');

  assert.strictEqual(typeof esmImpl.cursorTo, 'function');
  assert.strictEqual(typeof cjsImpl.cursorTo, 'function');
  assert.strictEqual(esmImpl.foo, undefined);
  assert.strictEqual(cjsImpl.foo, undefined);
});
```

### `mock.property(object, propertyName[, value])`

* `object` {Object} The object whose value is being mocked.
* `propertyName` {string|symbol} The identifier of the property on `object` to mock.
* `value` {any} An optional value used as the mock value
  for `object[propertyName]`. **Default:** The original property value.
* Returns: {Proxy} A proxy to the mocked object. The mocked object contains a
  special `mock` property, which is an instance of `MockPropertyContext`, and
  can be used for inspecting and changing the behavior of the mocked property.

Creates a mock for a property value on an object. This allows you to track and control access to a specific property,
including how many times it is read (getter) or written (setter), and to restore the original value after mocking.

```js
test('mocks a property value', (t) => {
  const obj = { foo: 42 };
  const prop = t.mock.property(obj, 'foo', 100);

  assert.strictEqual(obj.foo, 100);
  assert.strictEqual(prop.mock.accessCount(), 1);
  assert.strictEqual(prop.mock.accesses[0].type, 'get');
  assert.strictEqual(prop.mock.accesses[0].value, 100);

  obj.foo = 200;
  assert.strictEqual(prop.mock.accessCount(), 2);
  assert.strictEqual(prop.mock.accesses[1].type, 'set');
  assert.strictEqual(prop.mock.accesses[1].value, 200);

  prop.mock.restore();
  assert.strictEqual(obj.foo, 42);
});
```

### `mock.reset()`

This function restores the default behavior of all mocks that were previously
created by this `MockTracker` and disassociates the mocks from the
`MockTracker` instance. Once disassociated, the mocks can still be used, but the
`MockTracker` instance can no longer be used to reset their behavior or
otherwise interact with them.

After each test completes, this function is called on the test context's
`MockTracker`. If the global `MockTracker` is used extensively, calling this
function manually is recommended.

### `mock.restoreAll()`

This function restores the default behavior of all mocks that were previously
created by this `MockTracker`. Unlike `mock.reset()`, `mock.restoreAll()` does
not disassociate the mocks from the `MockTracker` instance.

### `mock.setter(object, methodName, implementation)`

This function is syntax sugar for `MockTracker.method` with `options.setter`
set to `true`.
