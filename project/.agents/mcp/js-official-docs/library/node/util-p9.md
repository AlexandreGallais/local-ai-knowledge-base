---
title: "Util (part 9 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/util.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Util (part 9 of 10)

## `util.types`

`util.types` provides type checks for different kinds of built-in objects.
Unlike `instanceof` or `Object.prototype.toString.call(value)`, these checks do
not inspect properties of the object that are accessible from JavaScript (like
their prototype), and usually have the overhead of calling into C++.

The result generally does not make any guarantees about what kinds of
properties or behavior a value exposes in JavaScript. They are primarily
useful for addon developers who prefer to do type checking in JavaScript.

The API is accessible via `require('node:util').types` or `require('node:util/types')`.

### `util.types.isAnyArrayBuffer(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a built-in {ArrayBuffer} or
{SharedArrayBuffer} instance.

See also `util.types.isArrayBuffer()` and
`util.types.isSharedArrayBuffer()`.

```js
util.types.isAnyArrayBuffer(new ArrayBuffer());  // Returns true
util.types.isAnyArrayBuffer(new SharedArrayBuffer());  // Returns true
```

### `util.types.isArrayBufferView(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is an instance of one of the {ArrayBuffer}
views, such as typed array objects or {DataView}. Equivalent to
`ArrayBuffer.isView()`.

```js
util.types.isArrayBufferView(new Int8Array());  // true
util.types.isArrayBufferView(Buffer.from('hello world')); // true
util.types.isArrayBufferView(new DataView(new ArrayBuffer(16)));  // true
util.types.isArrayBufferView(new ArrayBuffer());  // false
```

### `util.types.isArgumentsObject(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is an `arguments` object.

```js
function foo() {
  util.types.isArgumentsObject(arguments);  // Returns true
}
```

### `util.types.isArrayBuffer(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a built-in {ArrayBuffer} instance.
This does _not_ include {SharedArrayBuffer} instances. Usually, it is
desirable to test for both; See `util.types.isAnyArrayBuffer()` for that.

```js
util.types.isArrayBuffer(new ArrayBuffer());  // Returns true
util.types.isArrayBuffer(new SharedArrayBuffer());  // Returns false
```

### `util.types.isAsyncFunction(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is an async function.
This only reports back what the JavaScript engine is seeing;
in particular, the return value may not match the original source code if
a transpilation tool was used.

```js
util.types.isAsyncFunction(function foo() {});  // Returns false
util.types.isAsyncFunction(async function foo() {});  // Returns true
```

### `util.types.isBigInt64Array(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a `BigInt64Array` instance.

```js
util.types.isBigInt64Array(new BigInt64Array());   // Returns true
util.types.isBigInt64Array(new BigUint64Array());  // Returns false
```

### `util.types.isBigIntObject(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a BigInt object, e.g. created
by `Object(BigInt(123))`.

```js
util.types.isBigIntObject(Object(BigInt(123)));   // Returns true
util.types.isBigIntObject(BigInt(123));   // Returns false
util.types.isBigIntObject(123);  // Returns false
```

### `util.types.isBigUint64Array(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a `BigUint64Array` instance.

```js
util.types.isBigUint64Array(new BigInt64Array());   // Returns false
util.types.isBigUint64Array(new BigUint64Array());  // Returns true
```

### `util.types.isBooleanObject(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a boolean object, e.g. created
by `new Boolean()`.

```js
util.types.isBooleanObject(false);  // Returns false
util.types.isBooleanObject(true);   // Returns false
util.types.isBooleanObject(new Boolean(false)); // Returns true
util.types.isBooleanObject(new Boolean(true));  // Returns true
util.types.isBooleanObject(Boolean(false)); // Returns false
util.types.isBooleanObject(Boolean(true));  // Returns false
```

### `util.types.isBoxedPrimitive(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is any boxed primitive object, e.g. created
by `new Boolean()`, `new String()` or `Object(Symbol())`.

For example:

```js
util.types.isBoxedPrimitive(false); // Returns false
util.types.isBoxedPrimitive(new Boolean(false)); // Returns true
util.types.isBoxedPrimitive(Symbol('foo')); // Returns false
util.types.isBoxedPrimitive(Object(Symbol('foo'))); // Returns true
util.types.isBoxedPrimitive(Object(BigInt(5))); // Returns true
```

### `util.types.isCryptoKey(value)`

* `value` {Object}
* Returns: {boolean}

Returns `true` if `value` is a {CryptoKey}, `false` otherwise.

### `util.types.isDataView(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a built-in {DataView} instance.

```js
const ab = new ArrayBuffer(20);
util.types.isDataView(new DataView(ab));  // Returns true
util.types.isDataView(new Float64Array());  // Returns false
```

See also `ArrayBuffer.isView()`.

### `util.types.isDate(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a built-in {Date} instance.

```js
util.types.isDate(new Date());  // Returns true
```

### `util.types.isExternal(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a native `External` value.

A native `External` value is a special type of object that contains a
raw C++ pointer (`void*`) for access from native code, and has no other
properties. Such objects are created either by Node.js internals or native
addons. In JavaScript, they are frozen objects with a
`null` prototype.

```c
#include <js_native_api.h>
#include <stdlib.h>
napi_value result;
static napi_value MyNapi(napi_env env, napi_callback_info info) {
  int* raw = (int*) malloc(1024);
  napi_status status = napi_create_external(env, (void*) raw, NULL, NULL, &result);
  if (status != napi_ok) {
    napi_throw_error(env, NULL, "napi_create_external failed");
    return NULL;
  }
  return result;
}
...
DECLARE_NAPI_PROPERTY("myNapi", MyNapi)
...
```

```mjs
import native from 'napi_addon.node';
import { types } from 'node:util';

const data = native.myNapi();
types.isExternal(data); // returns true
types.isExternal(0); // returns false
types.isExternal(new String('foo')); // returns false
```

```cjs
const native = require('napi_addon.node');
const { types } = require('node:util');

const data = native.myNapi();
types.isExternal(data); // returns true
types.isExternal(0); // returns false
types.isExternal(new String('foo')); // returns false
```

For further information on `napi_create_external`, refer to
`napi_create_external()`.

### `util.types.isFloat16Array(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a built-in {Float16Array} instance.

```js
util.types.isFloat16Array(new ArrayBuffer());  // Returns false
util.types.isFloat16Array(new Float16Array());  // Returns true
util.types.isFloat16Array(new Float32Array());  // Returns false
```

### `util.types.isFloat32Array(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a built-in {Float32Array} instance.

```js
util.types.isFloat32Array(new ArrayBuffer());  // Returns false
util.types.isFloat32Array(new Float32Array());  // Returns true
util.types.isFloat32Array(new Float64Array());  // Returns false
```

### `util.types.isFloat64Array(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a built-in {Float64Array} instance.

```js
util.types.isFloat64Array(new ArrayBuffer());  // Returns false
util.types.isFloat64Array(new Uint8Array());  // Returns false
util.types.isFloat64Array(new Float64Array());  // Returns true
```

### `util.types.isGeneratorFunction(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a generator function.
This only reports back what the JavaScript engine is seeing;
in particular, the return value may not match the original source code if
a transpilation tool was used.

```js
util.types.isGeneratorFunction(function foo() {});  // Returns false
util.types.isGeneratorFunction(function* foo() {});  // Returns true
```

### `util.types.isGeneratorObject(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a generator object as returned from a
built-in generator function.
This only reports back what the JavaScript engine is seeing;
in particular, the return value may not match the original source code if
a transpilation tool was used.

```js
function* foo() {}
const generator = foo();
util.types.isGeneratorObject(generator);  // Returns true
```

### `util.types.isInt8Array(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a built-in {Int8Array} instance.

```js
util.types.isInt8Array(new ArrayBuffer());  // Returns false
util.types.isInt8Array(new Int8Array());  // Returns true
util.types.isInt8Array(new Float64Array());  // Returns false
```

### `util.types.isInt16Array(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a built-in {Int16Array} instance.

```js
util.types.isInt16Array(new ArrayBuffer());  // Returns false
util.types.isInt16Array(new Int16Array());  // Returns true
util.types.isInt16Array(new Float64Array());  // Returns false
```

### `util.types.isInt32Array(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a built-in {Int32Array} instance.

```js
util.types.isInt32Array(new ArrayBuffer());  // Returns false
util.types.isInt32Array(new Int32Array());  // Returns true
util.types.isInt32Array(new Float64Array());  // Returns false
```

### `util.types.isKeyObject(value)`

* `value` {Object}
* Returns: {boolean}

Returns `true` if `value` is a {KeyObject}, `false` otherwise.

### `util.types.isMap(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a built-in {Map} instance.

```js
util.types.isMap(new Map());  // Returns true
```

### `util.types.isMapIterator(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is an iterator returned for a built-in
{Map} instance.

```js
const map = new Map();
util.types.isMapIterator(map.keys());  // Returns true
util.types.isMapIterator(map.values());  // Returns true
util.types.isMapIterator(map.entries());  // Returns true
util.types.isMapIterator(map[Symbol.iterator]());  // Returns true
```

### `util.types.isModuleNamespaceObject(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is an instance of a Module Namespace Object.

```mjs
import * as ns from './a.js';

util.types.isModuleNamespaceObject(ns);  // Returns true
```

### `util.types.isNativeError(value)`

> Stability: 0 - Deprecated: Use `Error.isError` instead.

**Note:** As of Node.js 24, `Error.isError()` is currently slower than `util.types.isNativeError()`.
If performance is critical, consider benchmarking both in your environment.

* `value` {any}
* Returns: {boolean}

Returns `true` if the value was returned by the constructor of a
built-in `Error` type.

```js
console.log(util.types.isNativeError(new Error()));  // true
console.log(util.types.isNativeError(new TypeError()));  // true
console.log(util.types.isNativeError(new RangeError()));  // true
```

Subclasses of the native error types are also native errors:

```js
class MyError extends Error {}
console.log(util.types.isNativeError(new MyError()));  // true
```

A value being `instanceof` a native error class is not equivalent to `isNativeError()`
returning `true` for that value. `isNativeError()` returns `true` for errors
which come from a different realm while `instanceof Error` returns `false`
for these errors:

```mjs
import { createContext, runInContext } from 'node:vm';
import { types } from 'node:util';

const context = createContext({});
const myError = runInContext('new Error()', context);
console.log(types.isNativeError(myError)); // true
console.log(myError instanceof Error); // false
```

```cjs
const { createContext, runInContext } = require('node:vm');
const { types } = require('node:util');

const context = createContext({});
const myError = runInContext('new Error()', context);
console.log(types.isNativeError(myError)); // true
console.log(myError instanceof Error); // false
```

Conversely, `isNativeError()` returns `false` for all objects which were not
returned by the constructor of a native error. That includes values
which are `instanceof` native errors:

```js
const myError = { __proto__: Error.prototype };
console.log(util.types.isNativeError(myError)); // false
console.log(myError instanceof Error); // true
```

### `util.types.isNumberObject(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a number object, e.g. created
by `new Number()`.

```js
util.types.isNumberObject(0);  // Returns false
util.types.isNumberObject(new Number(0));   // Returns true
```

### `util.types.isPromise(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a built-in {Promise}.

```js
util.types.isPromise(Promise.resolve(42));  // Returns true
```

### `util.types.isProxy(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a {Proxy} instance.

```js
const target = {};
const proxy = new Proxy(target, {});
util.types.isProxy(target);  // Returns false
util.types.isProxy(proxy);  // Returns true
```

### `util.types.isRegExp(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a regular expression object.

```js
util.types.isRegExp(/abc/);  // Returns true
util.types.isRegExp(new RegExp('abc'));  // Returns true
```

### `util.types.isSet(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a built-in {Set} instance.

```js
util.types.isSet(new Set());  // Returns true
```

### `util.types.isSetIterator(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is an iterator returned for a built-in
{Set} instance.

```js
const set = new Set();
util.types.isSetIterator(set.keys());  // Returns true
util.types.isSetIterator(set.values());  // Returns true
util.types.isSetIterator(set.entries());  // Returns true
util.types.isSetIterator(set[Symbol.iterator]());  // Returns true
```

### `util.types.isSharedArrayBuffer(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a built-in {SharedArrayBuffer} instance.
This does _not_ include {ArrayBuffer} instances. Usually, it is
desirable to test for both; See `util.types.isAnyArrayBuffer()` for that.

```js
util.types.isSharedArrayBuffer(new ArrayBuffer());  // Returns false
util.types.isSharedArrayBuffer(new SharedArrayBuffer());  // Returns true
```
