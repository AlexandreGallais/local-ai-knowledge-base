---
title: "FFI (part 3 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/ffi.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# FFI (part 3 of 3)

## Call paths

When a symbol is resolved through `ffi.dlopen()`,
`library.getFunction()`, or `library.getFunctions()`, Node.js selects
one of three native call paths for the returned wrapper. The selection is based
on the declared signature, on the current platform, and on the capabilities of
the current process. It is made once when the function is created, cannot be
configured, and is not observable from JavaScript.

The call paths are designed to accept the same JavaScript values for each
type name, to perform the same validation, and to throw the same
errors, so that applications do not need to know which call path a particular
function uses. They differ in how much work is done per call. The paths exist
so that common signatures can be called with as little overhead as possible
while every supported signature keeps working.

Node.js tries the call paths in the following order and uses the first one that
supports the signature:

1. The Fast API call path, which lets optimized JavaScript call the native
   symbol directly through a generated per-signature trampoline.
2. The shared buffer call path, which passes arguments through a
   preallocated buffer instead of converting each argument across the
   JavaScript and C++ boundary on every call.
3. The generic call path, which converts each argument in C++ and calls the
   symbol through `libffi`. This path supports every signature.

The contributor guide FFI Fast API internals describes the implementation of
these call paths in detail.

### Fast API call path

The Fast API call path binds the wrapper as a V8 Fast API function. When
JavaScript code calling the wrapper is optimized by V8, the call goes from the
optimized code straight into a small native trampoline that Node.js generates
for the exact signature when the function is created. The trampoline moves the
arguments into the registers expected by the native symbol and calls it. For
the scalar entry point, there is no intermediate argument conversion in C++.

Functions on this path keep a conventional native entry point as well. Calls
from code that V8 has not optimized, or that V8 deoptimizes, use that entry
point, which behaves like the generic call path. This is transparent to the
caller.

Pointer-like arguments are prepared in JavaScript before the trampoline runs:

* `null` and `undefined` become null pointers.
* `string` values are copied into temporary NUL-terminated UTF-8 buffers for
  the duration of the call.
* `Buffer`, typed array, `DataView`, and `ArrayBuffer` values are converted to
  raw pointer `bigint` values, unless the alternate entry point described below
  handles them.
* `bigint` values are passed through unchanged.

For signatures with a single `pointer`, `buffer`, or `arraybuffer` argument,
Node.js also creates an alternate Fast API entry point that receives `Buffer`,
typed array, `DataView`, and `ArrayBuffer` values directly. The JavaScript
wrapper dispatches to it when the argument is such a value, and a native helper
extracts the pointer from the backing store instead of converting the value in
JavaScript.

A function uses this call path only when all of the following conditions are
met:

* The process runs on a supported 64-bit architecture: AArch64, x86-64,
  PPC64LE, LoongArch64, RISC-V 64, or s390x. 32-bit platforms and big-endian
  PPC64 always use another call path.
* The process can allocate executable memory. Node.js checks once per process
  whether it can allocate memory and mark it executable. If that check fails,
  creating an otherwise eligible function throws
  `ERR_RX_MEMORY_NOT_SUPPORTED`.
* Neither the return type nor any argument type is `function`.
* The signature has at most 8 arguments, and every argument fits in the
  argument registers available to the trampoline on the current platform.
  Arguments that would have to be passed on the native stack are not supported.

The register limits are platform-specific. Integer and pointer-like arguments
share one set of registers, and floating-point arguments share another. The
limits for each architecture are listed in Type names.

A signature that is unsupported by the Fast API types, argument limits, or
platform is not an error. The function is created on the next call path that
supports it. Missing executable-memory support is checked only after signature
and platform eligibility and does not select another call path.

### Shared buffer call path

The shared buffer call path is used for signatures that the Fast API call path
does not support. When the function is created, Node.js allocates a small
per-function buffer with one 8-byte slot for the return value and one 8-byte
slot for each argument. On every call, the JavaScript wrapper validates the
arguments, writes them into their slots, invokes the native symbol through
`libffi` without passing any JavaScript arguments, and then reads the return
value back from the buffer. This avoids converting each argument individually
across the JavaScript and C++ boundary.

A function uses this call path when all of the following conditions are met:

* The Fast API call path is not available for the signature.
* The host is little-endian.
* The signature has at least one argument. Zero-argument functions gain nothing
  from the shared buffer and use another call path instead.

All type names are supported on this path, and there is no limit on the number
of arguments.

Pointer-like arguments (`pointer`, `string`, `buffer`, `arraybuffer`, and
`function`) are written to the shared buffer only when the value is a `bigint`,
`null`, or `undefined`. When a call passes a string, `Buffer`, typed array,
`DataView`, or `ArrayBuffer` to a pointer-like parameter, that individual call
is handed off to the generic call path, which performs the conversion in
C++. The function itself stays on the shared buffer call path for later calls.

The shared buffer is private to each function. Reentrant calls to the same
function, for example from an FFI callback, are safe because the native side
copies the arguments out of the buffer before invoking the symbol.

### Generic call path

The generic call path converts each JavaScript argument to its native
representation in C++ and calls the symbol through `libffi`. It supports every
signature that `node:ffi` accepts and is the reference implementation for the
argument validation and error behavior that the other call paths reproduce.

A function is created directly on this call path when the Fast API call path
is unavailable and either the host is big-endian or the signature has no
arguments.

The generic call path also serves individual calls handed off by the other call
paths, such as unoptimized or deoptimized call sites of a Fast API function and
shared buffer calls that pass non-`bigint` pointer-like values.

Callbacks created with `library.registerCallback()` are always implemented
with `libffi` closures. They are independent of the call path used by any
function.

## Primitive memory access helpers

The following helpers read and write primitive values at a native pointer,
optionally with a byte offset:

* `ffi.getInt8(pointer[, offset])`
* `ffi.getUint8(pointer[, offset])`
* `ffi.getInt16(pointer[, offset])`
* `ffi.getUint16(pointer[, offset])`
* `ffi.getInt32(pointer[, offset])`
* `ffi.getUint32(pointer[, offset])`
* `ffi.getInt64(pointer[, offset])`
* `ffi.getUint64(pointer[, offset])`
* `ffi.getFloat32(pointer[, offset])`
* `ffi.getFloat64(pointer[, offset])`
* `ffi.setInt8(pointer, offset, value)`
* `ffi.setUint8(pointer, offset, value)`
* `ffi.setInt16(pointer, offset, value)`
* `ffi.setUint16(pointer, offset, value)`
* `ffi.setInt32(pointer, offset, value)`
* `ffi.setUint32(pointer, offset, value)`
* `ffi.setInt64(pointer, offset, value)`
* `ffi.setUint64(pointer, offset, value)`
* `ffi.setFloat32(pointer, offset, value)`
* `ffi.setFloat64(pointer, offset, value)`

These helpers perform direct memory reads and writes. `pointer` must be a
`bigint` referring to valid readable or writable native memory. `offset`, when
provided, is interpreted as a byte offset from `pointer`.

The getter helpers return JavaScript `number` values for 8-, 16-, and 32-bit
integer types and for floating-point types. They return `bigint` values for
64-bit integer types.

The setter helpers require an explicit byte offset and validate the supplied
JavaScript value against the target native type before writing it into memory.
For `setInt64()` and `setUint64()`, `bigint` values are accepted directly;
numeric inputs must be integers within JavaScript's safe integer range.

```cjs
const {
  getInt32,
  setInt32,
} = require('node:ffi');

setInt32(ptr, 0, 42);
console.log(getInt32(ptr, 0));
```

Like the other raw memory helpers in this module, these APIs do not track
ownership, bounds, or lifetime. Passing an invalid pointer, using the wrong
offset, or writing through a stale pointer can corrupt memory or crash the
process.

## `ffi.toString(pointer)`

* `pointer` {bigint}
* Returns: {string|null}

Reads a NUL-terminated UTF-8 string from native memory.

If `pointer` is `0n`, `null` is returned.

This function does not validate that `pointer` refers to readable memory or
that the pointed-to data is terminated with `\0`. Passing an invalid pointer,
a pointer to freed memory, or a pointer to bytes without a terminating NUL can
read unrelated memory, crash the process, or produce truncated or garbled
output.

```cjs
const { toString } = require('node:ffi');

const value = toString(ptr);
```

## `ffi.toBuffer(pointer, length[, copy])`

* `pointer` {bigint}
* `length` {number}
* `copy` {boolean} When `false`, creates a zero-copy view. **Default:** `true`.
* Returns: {Buffer}

Creates a `Buffer` from native memory.

When `copy` is `true`, the returned `Buffer` owns its own copied memory.
When `copy` is `false`, the returned `Buffer` references the original native
memory directly.

Using `copy: false` is a zero-copy escape hatch. The returned `Buffer` is a
writable view onto foreign memory, so writes in JavaScript update the original
native memory directly. The caller must guarantee that:

* `pointer` remains valid for the entire lifetime of the returned `Buffer`.
* `length` stays within the allocated native region.
* no native code frees or repurposes that memory while JavaScript still uses
  the `Buffer`.
* Memory protection is observed. For example, read-only memory pages must not
  be written to.

If these guarantees are not met, reading or writing the `Buffer` can corrupt
memory or crash the process.

## `ffi.toArrayBuffer(pointer, length[, copy])`

* `pointer` {bigint}
* `length` {number}
* `copy` {boolean} When `false`, creates a zero-copy view. **Default:** `true`.
* Returns: {ArrayBuffer}

Creates an `ArrayBuffer` from native memory.

When `copy` is `true`, the returned `ArrayBuffer` contains copied bytes.
When `copy` is `false`, the returned `ArrayBuffer` references the original
native memory directly.

The same lifetime and bounds requirements described for
`ffi.toBuffer(pointer, length, copy)` apply
here. With `copy: false`, the
returned `ArrayBuffer` is a zero-copy view of foreign memory and is only safe
while that memory remains allocated, unchanged in layout, and valid for the
entire exposed range.

## `ffi.exportString(string, pointer, length[, encoding])`

* `string` {string}
* `pointer` {bigint}
* `length` {number}
* `encoding` {string} **Default:** `'utf8'`.

Copies a JavaScript string into native memory and appends a trailing NUL
terminator.

`length` must be large enough to hold the full encoded string plus the trailing
NUL terminator. For UTF-16 and UCS-2 encodings, the trailing terminator uses
two zero bytes.

`pointer` must refer to writable native memory with at least `length` bytes of
available storage. This function does not allocate memory on its own.

`string` must be a JavaScript string. `encoding` must be a string.

## `ffi.exportBuffer(buffer, pointer, length)`

* `buffer` {Buffer}
* `pointer` {bigint}
* `length` {number}

Copies bytes from a `Buffer` into native memory.

`length` must be at least `buffer.length`.

`pointer` must refer to writable native memory with at least `length` bytes of
available storage. This function does not allocate memory on its own.

`buffer` must be a Node.js `Buffer`.

## `ffi.exportArrayBuffer(arrayBuffer, pointer, length)`

* `arrayBuffer` {ArrayBuffer}
* `pointer` {bigint}
* `length` {number}

Copies bytes from an `ArrayBuffer` into native memory.

`length` must be at least `arrayBuffer.byteLength`.

`pointer` must refer to writable native memory with at least `length` bytes of
available storage. This function does not allocate memory on its own.

## `ffi.exportArrayBufferView(arrayBufferView, pointer, length)`

* `arrayBufferView` {ArrayBufferView}
* `pointer` {bigint}
* `length` {number}

Copies bytes from an `ArrayBufferView` into native memory.

`length` must be at least `arrayBufferView.byteLength`.

`pointer` must refer to writable native memory with at least `length` bytes of
available storage. This function does not allocate memory on its own.

## `ffi.getRawPointer(source)`

* `source` {Buffer|ArrayBuffer|SharedArrayBuffer|ArrayBufferView}
* Returns: {bigint}

Returns the raw memory address of JavaScript-managed byte storage.

This is unsafe and dangerous. The returned pointer can become invalid if the
underlying memory is detached, resized, transferred, or otherwise invalidated.
Using stale pointers can cause memory corruption or process crashes.

## `ffi.getCurrentEventLoop()`

* Returns: {bigint}

Returns the address of the current thread's `uv_loop_t` as a `bigint`.

The returned address is for the current Node.js environment. In the main thread,
this is the main thread event loop. In a worker thread, this is that worker's
event loop.

This is unsafe and dangerous. The returned pointer is only valid for the lifetime
of the current environment. Using it after the environment exits, or from native
code that assumes a different thread or lifetime, can crash the process or
corrupt memory.

## Safety notes

The `node:ffi` module does not track pointer validity, memory ownership, or
native object lifetimes.

In particular:

* Do not read from or write to freed memory.
* Do not use zero-copy views after the native memory has been released.
* Do not declare incorrect signatures for native symbols.
* Do not unregister callbacks while native code may still call them.
* Do not call callback pointers after `library.close()` or
  `library.unregisterCallback(pointer)`.
* Assume undefined callback behavior can crash the process, produce incorrect
  output, or corrupt memory.
* Do not assume pointer return values imply ownership; whether the caller must
  free the returned address depends entirely on the native API.

As a general rule, prefer copied values unless zero-copy access is required,
and keep callback and pointer lifetimes explicit on the native side.
