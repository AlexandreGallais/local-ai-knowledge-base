---
title: "FFI (part 2 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/ffi.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# FFI (part 2 of 3)

## Class: `DynamicLibrary`

Represents a loaded dynamic library.

### `new DynamicLibrary(path)`

* `path` {string|null} Path to a dynamic library, or `null` to resolve symbols
  from the current process image.

Loads the dynamic library without resolving any functions eagerly.

On Windows passing `null` is not supported.

A `path` inside a mounted virtual file system loads the same way as
with `ffi.dlopen()`.

```cjs
const { DynamicLibrary, suffix } = require('node:ffi');

const lib = new DynamicLibrary(`./mylib.${suffix}`);
```

### `library.path`

* {string}

The path used to load the library.

### `library.functions`

* {Object}

An object containing previously resolved function wrappers.

### `library.symbols`

* {Object}

An object containing previously resolved symbol addresses as `bigint` values.

### `library.close()`

Closes the library handle.

`DynamicLibrary` implements the explicit resource management protocol, so a
library instance can be managed with the `using` declaration. Leaving the
enclosing scope invokes `library.close()` automatically.

```mjs
import { DynamicLibrary, suffix } from 'node:ffi';

{
  using lib = new DynamicLibrary(`./mylib.${suffix}`);
  // Use `lib` here; `lib.close()` is called when the block exits.
}
```

Calling `library.close()` (or disposing the library) more than once is a no-op.

After a library has been closed:

* Resolved function wrappers become invalid.
* Further symbol and function resolution throws.
* Registered callbacks are invalidated.

Closing a library does not make previously exported callback pointers safe to
reuse. Node.js does not track or revoke callback pointers that have already
been handed to native code.

If native code still holds a callback pointer after `library.close()` or after
`library.unregisterCallback(pointer)`, invoking that pointer has undefined
behavior, is not allowed, and is dangerous: it can crash the process, produce
incorrect output, or corrupt memory. Native code must stop using callback
addresses before the library is closed or before the callback is unregistered.

Calling `library.close()` from one of the library's active callbacks is
unsupported and dangerous. The callback must return before the library is
closed.

### `librarySymbol.dispose`

Calls `library.close()`. This allows `DynamicLibrary` instances to be used with
the `using` declaration for automatic cleanup when the enclosing scope
exits. It is a no-op on a library that has already been closed.

### `library.getFunction(name, signature)`

* `name` {string}
* `signature` {Object}
* Returns: {Function}

Resolves a symbol and returns a callable JavaScript wrapper.

The returned function has a `.pointer` property containing the native function
address as a `bigint`.

If the same symbol has already been resolved, requesting it again with a
different signature throws. Requesting it again with the same signature returns
the same function, as does reading it from `library.functions`.

```cjs
const { DynamicLibrary, suffix } = require('node:ffi');

const lib = new DynamicLibrary(`./mylib.${suffix}`);
const add = lib.getFunction('add_i32', {
  arguments: ['int32', 'int32'],
  return: 'int32',
});

console.log(add(20, 22));
console.log(add.pointer);
```

### `library.getFunctions([definitions])`

* `definitions` {Object}
* Returns: {Object}

When `definitions` is provided, resolves each named symbol and returns an
object containing callable wrappers.

When `definitions` is omitted, returns wrappers for all functions that have
already been resolved on the library.

### `library.getSymbol(name)`

* `name` {string}
* Returns: {bigint}

Resolves a symbol and returns its native address as a `bigint`.

### `library.getSymbols()`

* Returns: {Object}

Returns an object containing all previously resolved symbol addresses.

### `library.registerCallback([signature,] callback)`

* `signature` {Object}
* `callback` {Function}
* Returns: {bigint}

Creates a native callback pointer backed by a JavaScript function.

If libffi cannot allocate a closure and executable memory is unavailable, this
method throws `ERR_RX_MEMORY_NOT_SUPPORTED`.
Other closure allocation failures throw `ERR_FFI_CALL_FAILED`. Platform-specific
libffi implementations may provide callbacks without dynamically generated code.

When `signature` is omitted, the callback uses a default `void ()` signature.

The return value is the callback pointer address as a `bigint`. It can be
passed to native functions expecting a callback pointer.

```cjs
const { DynamicLibrary, suffix } = require('node:ffi');

const lib = new DynamicLibrary(`./mylib.${suffix}`);

const callback = lib.registerCallback(
  { arguments: ['int32'], return: 'int32' },
  (value) => value * 2,
);
```

Callbacks are subject to the following restrictions:

* They must be invoked on the same system thread where they were created.
* They must not throw exceptions.
* They must not return promises.
* They must return a value compatible with the declared return type.
* They must not call `library.close()` on their owning library while running.
* They must not unregister themselves while running.

Closing the owning library or unregistering the currently executing callback
from inside the callback is unsupported and dangerous. Doing so may crash the
process, produce incorrect output, or corrupt memory.

If the thread running a callback is stopped while the callback executes, for
example by `worker.terminate()`, by `process.exit()` in a Worker, or by the
main thread exiting, only that thread stops. The callback returns to native
code without a value: non-void return values are zero-initialized, so native
code receives `0`, `false`, or a null pointer. Native code that does not
handle such a value, for example by dereferencing a returned null pointer, can
crash the process.

### `library.unregisterCallback(pointer)`

* `pointer` {bigint}

Releases a callback previously created with `library.registerCallback()`.

Calling `library.unregisterCallback(pointer)` for a callback that is currently
executing is unsupported and dangerous. The callback must return before it is
unregistered.

After `library.unregisterCallback(pointer)` returns, invoking that callback
pointer from native code has undefined behavior, is not allowed, and is
dangerous: it can crash the process, produce incorrect output, or corrupt
memory.

### `library.refCallback(pointer)`

* `pointer` {bigint}

Keeps the callback strongly referenced by JavaScript.

Throws `ERR_INVALID_ARG_VALUE` if the callback function has already been
garbage collected after a previous `library.unrefCallback(pointer)` call, since
a collected function cannot be referenced again.

### `library.unrefCallback(pointer)`

* `pointer` {bigint}

Allows the callback to become weakly referenced by JavaScript.

If the callback function is later garbage collected, subsequent native
invocations become a no-op. Non-void return values are zero-initialized before
returning to native code.

Throws `ERR_INVALID_ARG_VALUE` if the callback function has already been
garbage collected.

## Calling native functions

Argument conversion depends on the declared FFI type.

For 8-, 16-, and 32-bit integer types and for floating-point types, pass
JavaScript `number` values that match the declared type.

For 64-bit integer types (`int64` and `uint64`), pass <example-value> `bigint`
values within the declared type's range or safe integer `number` values.
For `int64`, numbers must be between `Number.MIN_SAFE_INTEGER` and
`Number.MAX_SAFE_INTEGER`, inclusive. For `uint64`, numbers must be between
`0` and `Number.MAX_SAFE_INTEGER`, inclusive. This allows buffer lengths such
as `buffer.byteLength` to be passed without an explicit `BigInt()` conversion.
Use `bigint` for integers outside JavaScript's safe integer range.

Invalid arguments, including fractional numbers, `NaN`, infinities, and values
outside these ranges, throw `ERR_INVALID_ARG_VALUE`. Return values for 64-bit
integer types are always exposed as `bigint` values.

For pointer-like arguments:

* `null` and `undefined` are passed as null pointers.
* `string` values are copied to temporary NUL-terminated UTF-8 strings for the
  duration of the call.
* `Buffer`, typed arrays, and `DataView` instances pass a pointer to their
  backing memory.
* `ArrayBuffer` passes a pointer to its backing memory.
* `bigint` values are passed as raw pointer addresses.

Pointer return values are exposed as `bigint` addresses.
