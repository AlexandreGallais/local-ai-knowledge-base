---
title: "FFI (part 1 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/ffi.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# FFI

> Stability: 1 - Experimental

The `node:ffi` module provides an experimental foreign function interface for
loading dynamic libraries and calling native symbols from JavaScript.

This API is unsafe. Passing invalid pointers, using an incorrect symbol
signature, or accessing memory after it has been freed can crash the process
or corrupt memory.

To access it:

```mjs
import ffi from 'node:ffi';
```

```cjs
const ffi = require('node:ffi');
```

This module is only available under the `node:` scheme in builds with FFI
support. It can be disabled with the `--no-experimental-ffi` flag.

Building Node.js with `node:ffi` support is available via the bundled `libffi` on
platforms where `libffi` provides a compatible static backend, or via a
shared `libffi` using the `--shared-ffi` configure flag.
The unofficial GN build does not support `node:ffi`.

The following targets are not supported by bundled libffi:

* `s390x`.
* `mips`, `mipsel`, and `mips64el` on targets other than FreeBSD, Linux, and
  OpenBSD.
* `ppc64` on Android, CloudABI, iOS, OpenHarmony, OS/400, Solaris, and Windows.

When using the Permission Model, FFI APIs are
restricted unless the `--allow-ffi` flag is provided.

Some FFI operations require runtime allocation of executable memory. If an
otherwise eligible Fast API function cannot be created because executable memory
is unavailable, creation throws
`ERR_RX_MEMORY_NOT_SUPPORTED` rather than
selecting another call path. Callback allocation can also report this error.
Loading the module or a library does not itself require generated trampolines.

## Overview

The `node:ffi` module exposes two groups of APIs:

* Dynamic library APIs for loading libraries, resolving symbols, and creating
  callable JavaScript wrappers.
* Raw memory helpers for reading and writing primitive values through pointers,
  converting pointers to JavaScript strings, `Buffer` instances, and
  `ArrayBuffer` instances, and for copying data back into native memory.

## Type names

FFI signatures use string type names.

Supported type names:

* `void`
* `char`
* `int8`
* `uint8`
* `int16`
* `uint16`
* `int32`
* `uint32`
* `int64`
* `uint64`
* `float32`
* `float64`
* `pointer`
* `string`
* `buffer`
* `arraybuffer`
* `function`

**Alternative spellings**

* `i8` for `int8`
* `u8` and `bool` for `uint8`
* `i16` for `int16`
* `u16` for `uint16`
* `i32` for `int32`
* `u32` for `uint32`
* `i64` for `int64`
* `u64` for `uint64`
* `f32` and `float` for `float32`
* `f64` and `double` for `float64`
* `ptr` for `pointer`
* `str` for `string`

These type names are also exposed as constants on `ffi.types`:

* `ffi.types.VOID` = `'void'`
* `ffi.types.POINTER` = `'pointer'`
* `ffi.types.BUFFER` = `'buffer'`
* `ffi.types.ARRAY_BUFFER` = `'arraybuffer'`
* `ffi.types.FUNCTION` = `'function'`
* `ffi.types.BOOL` = `'bool'`
* `ffi.types.CHAR` = `'char'`
* `ffi.types.STRING` = `'string'`
* `ffi.types.FLOAT` = `'float'`
* `ffi.types.DOUBLE` = `'double'`
* `ffi.types.INT_8` = `'int8'`
* `ffi.types.UINT_8` = `'uint8'`
* `ffi.types.INT_16` = `'int16'`
* `ffi.types.UINT_16` = `'uint16'`
* `ffi.types.INT_32` = `'int32'`
* `ffi.types.UINT_32` = `'uint32'`
* `ffi.types.INT_64` = `'int64'`
* `ffi.types.UINT_64` = `'uint64'`
* `ffi.types.FLOAT_32` = `'float32'`
* `ffi.types.FLOAT_64` = `'float64'`

Pointer-like types (`pointer`, `string`, `buffer`, `arraybuffer`, and
`function`) are all passed through the native layer as pointers.

When `Buffer`, `ArrayBuffer`, or typed array values are passed as pointer-like
arguments, Node.js borrows a raw pointer to their backing memory for the
duration of the native call. The caller must ensure that backing store remains
valid and stable for the entire call.

It is unsupported and dangerous to resize, transfer, detach, or otherwise
invalidate that backing store while the native call is active, including
through reentrant JavaScript such as FFI callbacks. Doing so may crash the
process, produce incorrect output, or corrupt memory.

The `char` type follows the platform C ABI. On platforms where plain C `char`
is signed it behaves like `int8`; otherwise it behaves like `uint8`.

The `bool` type is marshaled as an 8-bit unsigned integer. Pass <example-value> values
such as `0` and `1`; JavaScript `true` and `false` are not accepted.

On optimized Fast FFI calls, `pointer` and `function` parameters accept raw
pointer `bigint` values. For pointer-like parameters, `null`, `undefined`,
strings, `Buffer`, typed array, `DataView`, and `ArrayBuffer` values are converted
on the JavaScript side before calling the optimized native wrapper.

Optimized Fast FFI calls fall back to another call path when a
function's arguments or return type do not fit the platform-specific fast
trampoline. Fast FFI calls support at most 8 total arguments, and the
register and argument limits differ per architecture:

| Architecture               | Max integer/pointer args                  | Max floating-point args | Buffer-shaped args | Buffer-shaped + FP together | Narrow (8/16-bit) return |
| -------------------------- | ----------------------------------------- | ----------------------- | ------------------ | --------------------------- | ------------------------ |
| AArch64                    | 7 (6 when a buffer-shaped arg is present) | 8                       | Supported          | Not supported               | Supported                |
| x86-64, Linux/macOS (SysV) | 6 (4 when a buffer-shaped arg is present) | 8                       | Supported          | Not supported               | Supported                |
| x86-64, Windows (Win64)    | 3 (total arguments also capped at 3)      | 3                       | Not supported      | N/A                         | Supported                |
| s390x                      | 4                                         | 4                       | Not supported      | N/A                         | Not supported            |
| PPC64LE                    | 7                                         | 8                       | Not supported      | N/A                         | Not supported            |
| LoongArch64                | 7                                         | 8                       | Not supported      | N/A                         | Not supported            |
| RISC-V (64-bit)            | 7                                         | 8                       | Not supported      | N/A                         | Not supported            |

PPC64BE has no fast-call trampoline and always uses the generic call path.
"Buffer-shaped args" means `Buffer`, typed array, `DataView`, or `ArrayBuffer`
values passed as pointer-like arguments. Functions whose argument or return
types exceed the limits for the current platform use one of the other
call paths instead.

## Signature objects

Functions and callbacks are described with signature objects.

Signature objects may contain the following properties, both of which are
optional:

* `return` {string} A type name specifying the return type of the
  function or callback. **Default:** `'void'`.
* `arguments` {string\[]} An array of type names specifying the argument
  type list of the function or callback. **Default:** `[]`.

```js
const signature = {
  return: 'int32',
  arguments: ['int32', 'int32'],
};
```

## `ffi.suffix`

* {string}

The native shared library suffix for the current platform:

* `'dylib'` on macOS
* `'so'` on Unix-like platforms
* `'dll'` on Windows

This can be used to build portable library paths:

```cjs
const { suffix } = require('node:ffi');

const path = `libsqlite3.${suffix}`;
```

## `ffi.dlopen(path[, definitions])`

* `path` {string|null} Path to a dynamic library, or `null` to resolve symbols
  from the current process image.
* `definitions` {Object} Symbol definitions to resolve immediately.
* Returns: {Object}

Loads a dynamic library and resolves the requested function definitions.

On Windows passing `null` is not supported.

A `path` inside a mounted virtual file system is supported: the
operating system's dynamic loader cannot open a virtual path, so the
library's bytes are read from the VFS and loaded from a private,
self-cleaning temporary image instead, while `lib.path` keeps reporting
the virtual path. Libraries on the real file system are unaffected and
load directly.

When `definitions` is omitted, `functions` is returned as an empty object until
symbols are resolved explicitly.

The returned object contains:

* `lib` {DynamicLibrary} The loaded library handle.
* `functions` {Object} Callable wrappers for the requested symbols.

The returned object also implements the explicit resource management protocol,
so it can be used with the `using` declaration. Disposing the returned
object closes the library handle.

```mjs
import { dlopen, suffix } from 'node:ffi';

{
  using handle = dlopen(`./mylib.${suffix}`, {
    add_i32: { arguments: ['int32', 'int32'], return: 'int32' },
  });
  console.log(handle.functions.add_i32(20, 22));
} // handle.lib.close() is invoked automatically here.
```

```mjs
import { dlopen, suffix } from 'node:ffi';

const { lib, functions } = dlopen(`./mylib.${suffix}`, {
  add_i32: { arguments: ['int32', 'int32'], return: 'int32' },
  string_length: { arguments: ['pointer'], return: 'uint64' },
});

console.log(functions.add_i32(20, 22));
```

```cjs
const { dlopen, suffix } = require('node:ffi');

const { lib, functions } = dlopen(`./mylib.${suffix}`, {
  add_i32: { arguments: ['int32', 'int32'], return: 'int32' },
  string_length: { arguments: ['pointer'], return: 'uint64' },
});

console.log(functions.add_i32(20, 22));
```

## `ffi.dlclose(handle)`

* `handle` {DynamicLibrary}

Closes a dynamic library.

This is equivalent to calling `handle.close()`.

## `ffi.dlsym(handle, symbol)`

* `handle` {DynamicLibrary}
* `symbol` {string}
* Returns: {bigint}

Resolves a symbol address from a loaded library.

This is equivalent to calling `handle.getSymbol(symbol)`.
