---
title: "SharedArrayBuffer() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/sharedarraybuffer/sharedarraybuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SharedArrayBuffer() constructor

> **Note:**
> The `SharedArrayBuffer` constructor may not always be globally available unless certain security requirements are met.

The **`SharedArrayBuffer()`** constructor creates `SharedArrayBuffer` objects.

## Syntax

```js
new SharedArrayBuffer(length)
new SharedArrayBuffer(length, options)
```

> **Note:**
> `SharedArrayBuffer()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`.

### Parameters

- `length`
    The size, in bytes, of the array buffer to create.
- `options` (optional)
    An object, which can contain the following properties:
    - `maxByteLength` (optional)
        The maximum size, in bytes, that the shared array buffer can be resized to.

### Return value

A new `SharedArrayBuffer` object of the specified size, with its `maxByteLength` property set to the specified `maxByteLength` if one was specified. Its contents are initialized to 0.

## Examples

Note that these examples cannot be run directly from the console or an arbitrary web page, because `SharedArrayBuffer` is not defined unless its security requirements are met.

### Basic usage

Create a buffer specifying its size in bytes.

```js
// Create a SharedArrayBuffer with a size in bytes
const buffer = new SharedArrayBuffer(8);

console.log(buffer.byteLength); // 8
```

### Always use the new operator to create a SharedArrayBuffer

`SharedArrayBuffer` constructors are required to be constructed with a `new` operator. Calling a `SharedArrayBuffer` constructor as a function without `new` will throw a `TypeError`.

```js
const sab = SharedArrayBuffer(1024);
// TypeError: calling a builtin SharedArrayBuffer constructor
// without new is forbidden
```

```js
const sab = new SharedArrayBuffer(1024);
```

### Growing a growable SharedArrayBuffer

In this example, we create an 8-byte buffer that is growable to a max length of 16 bytes, then `grow()` it to 12 bytes:

```js
const buffer = new SharedArrayBuffer(8, { maxByteLength: 16 });

buffer.grow(12);
```

> **Note:**
> It is recommended that `maxByteLength` is set to the smallest value possible for your use case. It should never exceed `1073741824` (1GB), to reduce the risk of out-of-memory errors.

## See also

- `Atomics`
- `ArrayBuffer`
- JavaScript typed arrays guide
