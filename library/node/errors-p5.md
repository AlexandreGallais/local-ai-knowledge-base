---
title: "Errors (part 5 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/errors.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Errors (part 5 of 7)

### `ERR_MISSING_PASSPHRASE`

An attempt was made to read an encrypted key <example-value> specifying a passphrase.

### `ERR_MISSING_PLATFORM_FOR_WORKER`

The V8 platform used by this instance of Node.js does not support creating
Workers. This is caused by lack of embedder support for Workers. In particular,
this error will not occur with standard builds of Node.js.

### `ERR_MODULE_LINK_MISMATCH`

A module can not be linked because the same module requests in it are not
resolved to the same module.

### `ERR_MODULE_NOT_FOUND`

A module file could not be resolved by the ECMAScript modules loader while
attempting an `import` operation or when loading the program entry point.

### `ERR_MULTIPLE_CALLBACK`

A callback was called more than once.

A callback is almost always meant to only be called once as the query
can either be fulfilled or rejected but not both at the same time. The latter
would be possible by calling a callback more than once.

### `ERR_NAPI_CONS_FUNCTION`

While using `Node-API`, a constructor passed was not a function.

### `ERR_NAPI_INVALID_DATAVIEW_ARGS`

While calling `napi_create_dataview()`, a given `offset` was outside the bounds
of the dataview or `offset + length` was larger than a length of given `buffer`.

### `ERR_NAPI_INVALID_TYPEDARRAY_ALIGNMENT`

While calling `napi_create_typedarray()`, the provided `offset` was not a
multiple of the element size.

### `ERR_NAPI_INVALID_TYPEDARRAY_LENGTH`

While calling `napi_create_typedarray()`, `(length * size_of_element) +
byte_offset` was larger than the length of given `buffer`.

### `ERR_NAPI_TSFN_CALL_JS`

An error occurred while invoking the JavaScript portion of the thread-safe
function.

### `ERR_NAPI_TSFN_GET_UNDEFINED`

An error occurred while attempting to retrieve the JavaScript `undefined`
value.

### `ERR_NON_CONTEXT_AWARE_DISABLED`

A non-context-aware native addon was loaded in a process that disallows them.

### `ERR_NOT_BUILDING_SNAPSHOT`

An attempt was made to use operations that can only be used when building
V8 startup snapshot even though Node.js isn't building one.

### `ERR_NOT_IN_SINGLE_EXECUTABLE_APPLICATION`

The operation cannot be performed when it's not in a single-executable
application.

### `ERR_NOT_SUPPORTED_IN_SNAPSHOT`

An attempt was made to perform operations that are not supported when
building a startup snapshot.

### `ERR_NO_CRYPTO`

An attempt was made to use crypto features while Node.js was not compiled with
OpenSSL crypto support.

### `ERR_NO_ICU`

An attempt was made to use features that require ICU, but Node.js was not
compiled with ICU support.

### `ERR_NO_TEMPORAL`

An attempt was made to use features that require `Temporal`, but Node.js was not
compiled with `Temporal` support or it has been disabled in the current environment
(for example, when running with `--no-harmony-temporal`).

### `ERR_NO_TYPESCRIPT`

An attempt was made to use features that require Native TypeScript support, but Node.js was not
compiled with TypeScript support.

### `ERR_OPERATION_FAILED`

An operation failed. This is typically used to signal the general failure
of an asynchronous operation.

### `ERR_OPTIONS_BEFORE_BOOTSTRAPPING`

An attempt was made to get options before the bootstrapping was completed.

### `ERR_OUT_OF_RANGE`

A given value is out of the accepted range.

### `ERR_PACKAGE_IMPORT_NOT_DEFINED`

The `package.json` `"imports"` field does not define the given internal
package specifier mapping.

### `ERR_PACKAGE_MAP_EXTERNAL_FILE`

A module attempted to resolve a bare specifier using the package map, but
the importing file is not located within any package defined in the map.

```console
$ node --experimental-package-map=./package-map.json /tmp/script.js
Error [ERR_PACKAGE_MAP_EXTERNAL_FILE]: Cannot resolve "dep-a" from "/tmp/script.js": file is not within any package defined in /path/to/package-map.json
```

To fix this error, ensure the importing file is inside one of the package
directories listed in the package map, or add a new package entry whose `url`
covers the importing file.

### `ERR_PACKAGE_MAP_INVALID`

The package map configuration file is invalid. This can occur when:

* The file does not exist at the specified path.
* The file contains invalid JSON.
* The file is missing the required `packages` object.
* A package entry is missing the required `url` field.
* Two package entries have the same `url` value.

```console
$ node --experimental-package-map=./missing.json app.js
Error [ERR_PACKAGE_MAP_INVALID]: Invalid package map at "./missing.json": file not found
```

### `ERR_PACKAGE_MAP_KEY_NOT_FOUND`

A package's `dependencies` object in the package map references a package
key that is not defined in the `packages` object.

```json
{
  "packages": {
    "app": {
      "url": "./app",
      "dependencies": {
        "foo": "nonexistent"
      }
    }
  }
}
```

In this example, `"nonexistent"` is referenced as a dependency target but not
defined in `packages`, which will throw this error.

To fix this error, ensure all package keys referenced in `dependencies` values
are defined in the `packages` object.

### `ERR_PACKAGE_PATH_NOT_EXPORTED`

The `package.json` `"exports"` field does not export the requested subpath.
Because exports are encapsulated, private internal modules that are not exported
cannot be imported through the package resolution, unless using an absolute URL.

### `ERR_PARSE_ARGS_INVALID_OPTION_VALUE`

When `strict` set to `true`, thrown by `util.parseArgs()` if a {boolean}
value is provided for an option of type {string}, or if a {string}
value is provided for an option of type {boolean}.

### `ERR_PARSE_ARGS_UNEXPECTED_POSITIONAL`

Thrown by `util.parseArgs()`, when a positional argument is provided and
`allowPositionals` is set to `false`.

### `ERR_PARSE_ARGS_UNKNOWN_OPTION`

When `strict` set to `true`, thrown by `util.parseArgs()` if an argument
is not configured in `options`.

### `ERR_PERFORMANCE_INVALID_TIMESTAMP`

An invalid timestamp value was provided for a performance mark or measure.

### `ERR_PERFORMANCE_MEASURE_INVALID_OPTIONS`

Invalid options were provided for a performance measure.

### `ERR_PROTO_ACCESS`

Accessing `Object.prototype.__proto__` has been forbidden using
`--disable-proto=throw`. `Object.getPrototypeOf` and
`Object.setPrototypeOf` should be used to get and set the prototype of an
object.

### `ERR_PROXY_INVALID_CONFIG`

Failed to proxy a request because the proxy configuration is invalid.

### `ERR_PROXY_TUNNEL`

Failed to establish proxy tunnel when `NODE_USE_ENV_PROXY` or `--use-env-proxy` is enabled.

### `ERR_QUIC_APPLICATION_ERROR`

> Stability: 1 - Experimental

A QUIC application error occurred.

### `ERR_QUIC_CONNECTION_FAILED`

> Stability: 1 - Experimental

Establishing a QUIC connection failed.

### `ERR_QUIC_ENDPOINT_CLOSED`

> Stability: 1 - Experimental

A QUIC Endpoint closed with an error.

### `ERR_QUIC_OPEN_STREAM_FAILED`

> Stability: 1 - Experimental

Opening a QUIC stream failed.

### `ERR_QUIC_STREAM_ABORTED`

> Stability: 1 - Experimental

The Node.js error code for a `QuicError` thrown to abort a QUIC stream
or session with an explicit application or transport error code.

### `ERR_QUIC_STREAM_RESET`

> Stability: 1 - Experimental

A QUIC stream was reset by the peer. The error includes the reset code
provided by the peer.

### `ERR_QUIC_TRANSPORT_ERROR`

> Stability: 1 - Experimental

A QUIC transport error occurred.

### `ERR_QUIC_VERSION_NEGOTIATION_ERROR`

> Stability: 1 - Experimental

A QUIC session failed because version negotiation is required.

### `ERR_REQUIRE_ASYNC_MODULE`

When trying to `require()` an ES Module, the module turns out to be asynchronous.
That is, it contains top-level await.

When uncaught, the flag `--experimental-print-required-tla` prints
the locations of the top-level awaits in the graph to stderr.

This error has the following additional non-enumerable properties:

* `requireStack` {string\[]} The chain of modules that led to the failing
  `require()`, starting with the module that required the asynchronous module.
* `topLevelAwaitLocations` {Object\[]} The locations of the top-level awaits in
  the graph. Only populated when `--experimental-print-required-tla` is enabled.
  Each entry has the following properties:
  * `url` {string} The URL of the module containing the top-level await.
  * `line` {number} The 1-based line number of the top-level await.
  * `column` {number} The 1-based column number of the top-level await.
  * `sourceLine` {string} The source line containing the top-level await.

### `ERR_REQUIRE_CYCLE_MODULE`

When trying to `require()` an ES Module, a CommonJS to ESM or ESM to CommonJS edge
participates in an immediate cycle.
This is not allowed because ES Modules cannot be evaluated while they are
already being evaluated.

To avoid the cycle, the `require()` call involved in a cycle should not happen
at the top-level of either an ES Module (via `createRequire()`) or a CommonJS
module, and should be done lazily in an inner function.

### `ERR_REQUIRE_ESM`

> Stability: 0 - Deprecated

An attempt was made to `require()` an ES Module.

This error has been deprecated since `require()` now supports loading synchronous
ES modules. When `require()` encounters an ES module that contains top-level
`await`, it will throw `ERR_REQUIRE_ASYNC_MODULE` instead.

### `ERR_REQUIRE_ESM_RACE_CONDITION`

> Stability: 1 - Experimental.

An attempt was made to `require()` an ES Module while another `import()` call
was already in progress to load it asynchronously.

### `ERR_RX_MEMORY_NOT_SUPPORTED`

A feature requiring runtime allocation of executable memory was used in an
environment where that capability is unavailable. This includes creating an
otherwise eligible FFI Fast API function, or allocating an FFI callback when
libffi cannot provide a closure and executable memory is unavailable.

Node.js does not guarantee a non-generated-code fallback for these operations.
This error can be caught without terminating the process.

### `ERR_SCRIPT_EXECUTION_INTERRUPTED`

Script execution was interrupted by `SIGINT` (For
example, `Ctrl`+`C` was pressed.)

### `ERR_SCRIPT_EXECUTION_TIMEOUT`

Script execution timed out, possibly due to bugs in the script being executed.

### `ERR_SERVER_ALREADY_LISTEN`

The `server.listen()` method was called while a `net.Server` was already
listening. This applies to all instances of `net.Server`, including HTTP, HTTPS,
and HTTP/2 `Server` instances.

### `ERR_SERVER_NOT_RUNNING`

The `server.close()` method was called when a `net.Server` was not
running. This applies to all instances of `net.Server`, including HTTP, HTTPS,
and HTTP/2 `Server` instances.

### `ERR_SINGLE_EXECUTABLE_APPLICATION_ASSET_NOT_FOUND`

A key was passed to single executable application APIs to identify an asset,
but no match could be found.

### `ERR_SOCKET_ALREADY_BOUND`

An attempt was made to bind a socket that has already been bound.

### `ERR_SOCKET_BAD_BUFFER_SIZE`

An invalid (negative) size was passed for either the `recvBufferSize` or
`sendBufferSize` options in `dgram.createSocket()`.

### `ERR_SOCKET_BAD_PORT`

An API function expecting a port >= 0 and < 65536 received an invalid value.

### `ERR_SOCKET_BAD_TYPE`

An API function expecting a socket type (`udp4` or `udp6`) received an invalid
value.

### `ERR_SOCKET_BUFFER_SIZE`

While using `dgram.createSocket()`, the size of the receive or send `Buffer`
could not be determined.

### `ERR_SOCKET_CLOSED`

An attempt was made to operate on an already closed socket.

### `ERR_SOCKET_CLOSED_BEFORE_CONNECTION`

When calling `net.Socket.write()` on a connecting socket and the socket was
closed before the connection was established.

### `ERR_SOCKET_CONNECTION_TIMEOUT`

The socket was unable to connect to any address returned by the DNS within the
allowed timeout when using the family autoselection algorithm.

### `ERR_SOCKET_DGRAM_IS_CONNECTED`

A `dgram.connect()` call was made on an already connected socket.

### `ERR_SOCKET_DGRAM_NOT_CONNECTED`

A `dgram.disconnect()` or `dgram.remoteAddress()` call was made on a
disconnected socket.

### `ERR_SOCKET_DGRAM_NOT_RUNNING`

A call was made and the UDP subsystem was not running.

### `ERR_SOCKET_HANDLE_ADOPTED`

An operation was attempted on a `BoundSocket` that had already been adopted
by a `net.Server` or `net.Socket`, or transferred to another thread.
Once a bound socket is adopted or transferred, its `address()` and `close()`
methods can no longer be used.

### `ERR_SOURCE_MAP_CORRUPT`

The source map could not be parsed because it does not exist, or is corrupt.

### `ERR_SOURCE_MAP_MISSING_SOURCE`

A file imported from a source map was not found.

### `ERR_SOURCE_PHASE_NOT_DEFINED`

The provided module import does not provide a source phase imports representation for source phase
import syntax `import source x from 'x'` or `import.source(x)`.

### `ERR_SQLITE_ERROR`

An error was returned from SQLite.

### `ERR_SRI_PARSE`

A string was provided for a Subresource Integrity check, but was unable to be
parsed. Check the format of integrity attributes by looking at the
Subresource Integrity specification.

### `ERR_STREAM_ALREADY_FINISHED`

A stream method was called that cannot complete because the stream was
finished.

### `ERR_STREAM_CANNOT_PIPE`

An attempt was made to call `stream.pipe()` on a `Writable` stream.

### `ERR_STREAM_DESTROYED`

A stream method was called that cannot complete because the stream was
destroyed using `stream.destroy()`.

### `ERR_STREAM_ITER_MISSING_FLAG`

A stream/iter API was used without the `--experimental-stream-iter` CLI flag
enabled.

### `ERR_STREAM_NULL_VALUES`

An attempt was made to call `stream.write()` with a `null` chunk.

### `ERR_STREAM_PREMATURE_CLOSE`

An error returned by `stream.finished()` and `stream.pipeline()`, when a stream
or a pipeline ends non gracefully with no explicit error.

### `ERR_STREAM_PUSH_AFTER_EOF`

An attempt was made to call `stream.push()` after a `null`(EOF) had been
pushed to the stream.

### `ERR_STREAM_UNABLE_TO_PIPE`

An attempt was made to pipe to a closed or destroyed stream in a pipeline.

### `ERR_STREAM_UNSHIFT_AFTER_END_EVENT`

An attempt was made to call `stream.unshift()` after the `'end'` event was
emitted.

### `ERR_STREAM_WRAP`

Prevents an abort if a string decoder was set on the Socket or if the decoder
is in `objectMode`.

```js
const Socket = require('node:net').Socket;
const instance = new Socket();

instance.setEncoding('utf8');
```

### `ERR_STREAM_WRITE_AFTER_END`

An attempt was made to call `stream.write()` after `stream.end()` has been
called.

### `ERR_STRING_TOO_LONG`

An attempt has been made to create a string longer than the maximum allowed
length.

### `ERR_SYNTHETIC`

An artificial error object used to capture the call stack for diagnostic
reports.
