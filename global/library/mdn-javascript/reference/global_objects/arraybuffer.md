---
title: "ArrayBuffer"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/arraybuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ArrayBuffer

The **`ArrayBuffer`** object is used to represent a generic raw binary data buffer.

It is an array of bytes, often referred to in other languages as a "byte array". You cannot directly manipulate the contents of an `ArrayBuffer`; instead, you create one of the typed array objects or a `DataView` object which represents the buffer in a specific format, and use that to read and write the contents of the buffer.

The `ArrayBuffer()` constructor creates a new `ArrayBuffer` of the given length in bytes. You can also get an array buffer from existing data, for example, from a Base64 string or from a local file.

`ArrayBuffer` is a transferable object.

## Description

### Resizing ArrayBuffers

`ArrayBuffer` objects can be made resizable by including the `maxByteLength` option when calling the `ArrayBuffer()` constructor. You can query whether an `ArrayBuffer` is resizable and what its maximum size is by accessing its `resizable` and `maxByteLength` properties, respectively. You can assign a new size to a resizable `ArrayBuffer` with a `resize()` call. New bytes are initialized to 0.

These features make resizing `ArrayBuffer`s more efficient — otherwise, you have to make a copy of the buffer with a new size. It also gives JavaScript parity with WebAssembly in this regard (Wasm linear memory can be resized with `WebAssembly.Memory.prototype.grow()`).

### Transferring ArrayBuffers

`ArrayBuffer` objects can be transferred between different execution contexts, like Web Workers or Service Workers, using the structured clone algorithm. This is done by passing the `ArrayBuffer` as a transferable object in a call to `Worker.postMessage()` or `ServiceWorker.postMessage()`. In pure JavaScript, you can also transfer the ownership of memory from one `ArrayBuffer` to another using its `transfer()` or `transferToFixedLength()` method.

When an `ArrayBuffer` is transferred, its original copy becomes _detached_ — this means it is no longer usable. At any moment, there will only be one copy of the `ArrayBuffer` that actually has access to the underlying memory. Detached buffers have the following behaviors:

- `byteLength` becomes 0 (in both the buffer and the associated typed array views).
- Methods, such as `resize()` and `slice()`, throw a `TypeError` when invoked. The associated typed array views' methods also throw a `TypeError`.

You can check whether an `ArrayBuffer` is detached by its `detached` property.

## Constructor

- `ArrayBuffer()`
    Creates a new `ArrayBuffer` object.

## Static properties

- `ArrayBuffer[Symbol.species]`
    The constructor function that is used to create derived objects.

## Static methods

- `ArrayBuffer.isView()`
    Returns `true` if `arg` is one of the ArrayBuffer views, such as typed array objects or a `DataView`. Returns `false` otherwise.

## Instance properties

These properties are defined on `ArrayBuffer.prototype` and shared by all `ArrayBuffer` instances.

- `ArrayBuffer.prototype.byteLength`
    The size, in bytes, of the `ArrayBuffer`. This is established when the array is constructed and can only be changed using the `ArrayBuffer.prototype.resize()` method if the `ArrayBuffer` is resizable.
- `ArrayBuffer.prototype.constructor`
    The constructor function that created the instance object. For `ArrayBuffer` instances, the initial value is the `ArrayBuffer` constructor.
- `ArrayBuffer.prototype.detached`
    Read-only. Returns `true` if the `ArrayBuffer` has been detached (transferred), or `false` if not.
- `ArrayBuffer.prototype.maxByteLength`
    The read-only maximum length, in bytes, that the `ArrayBuffer` can be resized to. This is established when the array is constructed and cannot be changed.
- `ArrayBuffer.prototype.resizable`
    Read-only. Returns `true` if the `ArrayBuffer` can be resized, or `false` if not.
- `ArrayBuffer.prototype[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"ArrayBuffer"`. This property is used in `Object.prototype.toString()`.

## Instance methods

- `ArrayBuffer.prototype.resize()`
    Resizes the `ArrayBuffer` to the specified size, in bytes.
- `ArrayBuffer.prototype.slice()`
    Returns a new `ArrayBuffer` whose contents are a copy of this `ArrayBuffer`'s bytes from `begin` (inclusive) up to `end` (exclusive). If either `begin` or `end` is negative, it refers to an index from the end of the array, as opposed to from the beginning.
- `ArrayBuffer.prototype.transfer()`
    Creates a new `ArrayBuffer` with the same byte content as this buffer, then detaches this buffer.
- `ArrayBuffer.prototype.transferToFixedLength()`
    Creates a new non-resizable `ArrayBuffer` with the same byte content as this buffer, then detaches this buffer.

## Examples

### Creating an ArrayBuffer

In this example, we create a 8-byte buffer with an `Int32Array` view referring to the buffer:

```js
const buffer = new ArrayBuffer(8);
const view = new Int32Array(buffer);
```

## See also

- Polyfill of `ArrayBuffer` in `core-js`
- JavaScript typed arrays guide
- `SharedArrayBuffer`
- RangeError: invalid array length
