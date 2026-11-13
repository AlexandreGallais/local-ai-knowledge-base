---
title: "Util (part 10 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/util.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Util (part 10 of 10)

### `util.types.isStringObject(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a string object, e.g. created
by `new String()`.

```js
util.types.isStringObject('foo');  // Returns false
util.types.isStringObject(new String('foo'));   // Returns true
```

### `util.types.isSymbolObject(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a symbol object, created
by calling `Object()` on a `Symbol` primitive.

```js
const symbol = Symbol('foo');
util.types.isSymbolObject(symbol);  // Returns false
util.types.isSymbolObject(Object(symbol));   // Returns true
```

### `util.types.isTypedArray(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a built-in {TypedArray} instance.

```js
util.types.isTypedArray(new ArrayBuffer());  // Returns false
util.types.isTypedArray(new Uint8Array());  // Returns true
util.types.isTypedArray(new Float64Array());  // Returns true
```

See also `ArrayBuffer.isView()`.

### `util.types.isUint8Array(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a built-in {Uint8Array} instance.

```js
util.types.isUint8Array(new ArrayBuffer());  // Returns false
util.types.isUint8Array(new Uint8Array());  // Returns true
util.types.isUint8Array(new Float64Array());  // Returns false
```

### `util.types.isUint8ClampedArray(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a built-in {Uint8ClampedArray} instance.

```js
util.types.isUint8ClampedArray(new ArrayBuffer());  // Returns false
util.types.isUint8ClampedArray(new Uint8ClampedArray());  // Returns true
util.types.isUint8ClampedArray(new Float64Array());  // Returns false
```

### `util.types.isUint16Array(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a built-in {Uint16Array} instance.

```js
util.types.isUint16Array(new ArrayBuffer());  // Returns false
util.types.isUint16Array(new Uint16Array());  // Returns true
util.types.isUint16Array(new Float64Array());  // Returns false
```

### `util.types.isUint32Array(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a built-in {Uint32Array} instance.

```js
util.types.isUint32Array(new ArrayBuffer());  // Returns false
util.types.isUint32Array(new Uint32Array());  // Returns true
util.types.isUint32Array(new Float64Array());  // Returns false
```

### `util.types.isWeakMap(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a built-in {WeakMap} instance.

```js
util.types.isWeakMap(new WeakMap());  // Returns true
```

### `util.types.isWeakSet(value)`

* `value` {any}
* Returns: {boolean}

Returns `true` if the value is a built-in {WeakSet} instance.

```js
util.types.isWeakSet(new WeakSet());  // Returns true
```

## Deprecated APIs

The following APIs are deprecated and should no longer be used. Existing
applications and modules should be updated to find alternative approaches.

### `util._extend(target, source)`

> Stability: 0 - Deprecated: Use `Object.assign()` instead.

* `target` {Object}
* `source` {Object}

The `util._extend()` method was never intended to be used outside of internal
Node.js modules. The community found and used it anyway.

It is deprecated and should not be used in new code. JavaScript comes with very
similar built-in functionality through `Object.assign()`.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-extend-to-object-assign
```

### `util.isArray(object)`

> Stability: 0 - Deprecated: Use `Array.isArray()` instead.

* `object` {any}
* Returns: {boolean}

Alias for `Array.isArray()`.

Returns `true` if the given `object` is an `Array`. Otherwise, returns `false`.

```js
const util = require('node:util');

util.isArray([]);
// Returns: true
util.isArray(new Array());
// Returns: true
util.isArray({});
// Returns: false
```

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-is
```
