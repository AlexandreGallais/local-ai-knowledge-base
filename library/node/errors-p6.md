---
title: "Errors (part 6 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/errors.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Errors (part 6 of 7)

### `ERR_SYSTEM_ERROR`

An unspecified or non-specific system error has occurred within the Node.js
process. The error object will have an `err.info` object property with
additional details.

### `ERR_TEST_FAILURE`

This error represents a failed test. Additional information about the failure
is available via the `cause` property. The `failureType` property specifies
what the test was doing when the failure occurred.

### `ERR_THROTTLED`

A call was dropped because a throttled function could not invoke it immediately
or its pending queue was full.

### `ERR_TLS_ALPN_CALLBACK_INVALID_RESULT`

This error is thrown when an `ALPNCallback` returns a value that is not in the
list of ALPN protocols offered by the client.

### `ERR_TLS_ALPN_CALLBACK_WITH_PROTOCOLS`

This error is thrown when creating a `TLSServer` if the TLS options include
both `ALPNProtocols` and `ALPNCallback`. These options are mutually exclusive.

### `ERR_TLS_CERT_ALTNAME_FORMAT`

This error is thrown by `checkServerIdentity` if a user-supplied
`subjectaltname` property violates encoding rules. Certificate objects produced
by Node.js itself always comply with encoding rules and will never cause
this error.

### `ERR_TLS_CERT_ALTNAME_INVALID`

While using TLS, the host name/IP of the peer did not match any of the
`subjectAltNames` in its certificate.

### `ERR_TLS_DH_PARAM_SIZE`

While using TLS, the parameter offered for the Diffie-Hellman (`DH`)
key-agreement protocol is too small. By default, the key <example-value> must be greater
than or equal to 1024 bits to avoid vulnerabilities, even though it is strongly
recommended to use 2048 bits or larger for stronger security.

### `ERR_TLS_HANDSHAKE_TIMEOUT`

A TLS/SSL handshake timed out. In this case, the server must also abort the
connection.

### `ERR_TLS_INVALID_CONTEXT`

The context must be a `SecureContext`.

### `ERR_TLS_INVALID_PROTOCOL_METHOD`

The specified `secureProtocol` method is invalid. It is either unknown, or
disabled because it is insecure.

### `ERR_TLS_INVALID_PROTOCOL_VERSION`

Valid TLS protocol versions are `'TLSv1'`, `'TLSv1.1'`, or `'TLSv1.2'`.

### `ERR_TLS_INVALID_STATE`

The TLS socket must be connected and securely established. Ensure the 'secure'
event is emitted before continuing.

### `ERR_TLS_PROTOCOL_VERSION_CONFLICT`

Attempting to set a TLS protocol `minVersion` or `maxVersion` conflicts with an
attempt to set the `secureProtocol` explicitly. Use one mechanism or the other.

### `ERR_TLS_PSK_SET_IDENTITY_HINT_FAILED`

Failed to set PSK identity hint. Hint may be too long.

### `ERR_TLS_RENEGOTIATION_DISABLED`

An attempt was made to renegotiate TLS on a socket instance with renegotiation
disabled.

### `ERR_TLS_RENEGOTIATION_UNSUPPORTED`

An attempt was made to renegotiate TLS, but the TLS implementation does not
support caller-initiated renegotiation.

### `ERR_TLS_REQUIRED_SERVER_NAME`

While using TLS, the `server.addContext()` method was called without providing
a host name in the first parameter.

### `ERR_TLS_SESSION_ATTACK`

An excessive amount of TLS renegotiations is detected, which is a potential
vector for denial-of-service attacks.

### `ERR_TLS_SNI_FROM_SERVER`

An attempt was made to issue Server Name Indication from a TLS server-side
socket, which is only valid from a client.

### `ERR_TRACE_EVENTS_CATEGORY_REQUIRED`

The `trace_events.createTracing()` method requires at least one trace event
category.

### `ERR_TRACE_EVENTS_UNAVAILABLE`

The `node:trace_events` module could not be loaded because Node.js was compiled
with the `--without-v8-platform` flag, or because the process was initialized by
an embedder that provides its own V8 platform.

### `ERR_TRAILING_JUNK_AFTER_STREAM_END`

Trailing junk found after the end of the compressed stream.
This error is thrown when extra, unexpected data is detected
after the end of a compressed stream (for example, in zlib
or gzip decompression).

### `ERR_TRANSFORM_ALREADY_TRANSFORMING`

A `Transform` stream finished while it was still transforming.

### `ERR_TRANSFORM_WITH_LENGTH_0`

A `Transform` stream finished with data still in the write buffer.

### `ERR_TTY_INIT_FAILED`

The initialization of a TTY failed due to a system error.

### `ERR_UNAVAILABLE_DURING_EXIT`

Function was called within a `process.on('exit')` handler that shouldn't be
called within `process.on('exit')` handler.

### `ERR_UNCAUGHT_EXCEPTION_CAPTURE_ALREADY_SET`

`process.setUncaughtExceptionCaptureCallback()` was called twice,
without first resetting the callback to `null`.

This error is designed to prevent accidentally overwriting a callback registered
from another module.

### `ERR_UNESCAPED_CHARACTERS`

A string that contained unescaped characters was received.

### `ERR_UNHANDLED_ERROR`

An unhandled error occurred (for instance, when an `'error'` event is emitted
by an `EventEmitter` but an `'error'` handler is not registered).

### `ERR_UNKNOWN_BUILTIN_MODULE`

Used to identify a specific kind of internal Node.js error that should not
typically be triggered by user code. Instances of this error point to an
internal bug within the Node.js binary itself.

### `ERR_UNKNOWN_CREDENTIAL`

A Unix group or user identifier that does not exist was passed.

### `ERR_UNKNOWN_ENCODING`

An invalid or unknown encoding option was passed to an API.

### `ERR_UNKNOWN_FILE_EXTENSION`

An attempt was made to load a module with an unknown or unsupported file
extension.

### `ERR_UNKNOWN_MODULE_FORMAT`

An attempt was made to load a module with an unknown or unsupported format.

### `ERR_UNKNOWN_SIGNAL`

An invalid or unknown process signal was passed to an API expecting a valid
signal (such as `subprocess.kill()`).

### `ERR_UNSUPPORTED_DIR_IMPORT`

`import` a directory URL is unsupported. Instead,
self-reference a package using its name and define a custom subpath in
the `"exports"` field of the `package.json` file.

```mjs
import './'; // unsupported
import './index.js'; // supported
import 'package-name'; // supported
```

### `ERR_UNSUPPORTED_ESM_URL_SCHEME`

`import` with URL schemes other than `file` and `data` is unsupported.

### `ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING`

Type stripping is not supported for files descendant of a `node_modules` directory.

### `ERR_UNSUPPORTED_RESOLVE_REQUEST`

An attempt was made to resolve an invalid module referrer. This can happen when
importing or calling `import.meta.resolve()` with either:

* a bare specifier that is not a builtin module from a module whose URL scheme
  is not `file`.
* a relative URL from a module whose URL scheme is not a special scheme.

```mjs
try {
  // Trying to import the package 'bare-specifier' from a `data:` URL module:
  await import('data:text/javascript,import "bare-specifier"');
} catch (e) {
  console.log(e.code); // ERR_UNSUPPORTED_RESOLVE_REQUEST
}
```

### `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`

The provided TypeScript syntax is unsupported.
This could happen when using TypeScript syntax that requires
transformation with type-stripping.

### `ERR_USE_AFTER_CLOSE`

An attempt was made to use something that was already closed.

### `ERR_VALID_PERFORMANCE_ENTRY_TYPE`

While using the Performance Timing API (`perf_hooks`), no valid performance
entry types are found.

### `ERR_VFS_INVALID_TARGET`

A `--vfs-load` source does not exist, is neither a regular file nor a
directory, or is a source no provider claims.

### `ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING`

A dynamic import callback was not specified.

### `ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING_FLAG`

A dynamic import callback was invoked without `--experimental-vm-modules`.

### `ERR_VM_MODULE_ALREADY_LINKED`

The module attempted to be linked is not eligible for linking, because of one of
the following reasons:

* It has already been linked (`linkingStatus` is `'linked'`)
* It is being linked (`linkingStatus` is `'linking'`)
* Linking has failed for this module (`linkingStatus` is `'errored'`)

### `ERR_VM_MODULE_CACHED_DATA_REJECTED`

The `cachedData` option passed to a module constructor is invalid.

### `ERR_VM_MODULE_CANNOT_CREATE_CACHED_DATA`

Cached data cannot be created for modules which have already been evaluated.

### `ERR_VM_MODULE_DIFFERENT_CONTEXT`

The module being returned from the linker function is from a different context
than the parent module. Linked modules must share the same context.

### `ERR_VM_MODULE_LINK_FAILURE`

The module was unable to be linked due to a failure.

### `ERR_VM_MODULE_NOT_MODULE`

The fulfilled value of a linking promise is not a `vm.Module` object.

### `ERR_VM_MODULE_STATUS`

The current module's status does not allow for this operation. The specific
meaning of the error depends on the specific function.

### `ERR_WASI_ALREADY_STARTED`

The WASI instance has already started.

### `ERR_WASI_NOT_STARTED`

The WASI instance has not been started.

### `ERR_WEBASSEMBLY_NOT_SUPPORTED`

A feature requiring WebAssembly was used, but WebAssembly is not supported or
has been disabled in the current environment (for example, when running with
`--jitless`).

TypeScript parsing and WebAssembly module imports, including source phase
imports, report this error when WebAssembly is unavailable. Node.js does not
provide an alternative implementation for these operations. This error can be
caught without terminating the process.

### `ERR_WEBASSEMBLY_RESPONSE`

The `Response` that has been passed to `WebAssembly.compileStreaming` or to
`WebAssembly.instantiateStreaming` is not a valid WebAssembly response.

### `ERR_WORKER_HANDLE_NOT_TRANSFERABLE`

An attempt was made to transfer a `net.Socket`, `net.Server` or
`net.BoundSocket` to another thread via a `worker_threads` `postMessage()` call
while it was not in a transferable state, for example because it had already
started reading, had buffered data, or had already been adopted.

### `ERR_WORKER_INIT_FAILED`

The `Worker` initialization failed.

### `ERR_WORKER_INVALID_EXEC_ARGV`

The `execArgv` option passed to the `Worker` constructor contains
invalid flags.

### `ERR_WORKER_MESSAGING_ERRORED`

> Stability: 1.1 - Active development

The destination thread threw an error while processing a message sent via `postMessageToThread()`.

### `ERR_WORKER_MESSAGING_FAILED`

> Stability: 1.1 - Active development

The thread requested in `postMessageToThread()` is invalid or has no `workerMessage` listener.

### `ERR_WORKER_MESSAGING_SAME_THREAD`

> Stability: 1.1 - Active development

The thread id requested in `postMessageToThread()` is the current thread id.

### `ERR_WORKER_MESSAGING_TIMEOUT`

> Stability: 1.1 - Active development

Sending a message via `postMessageToThread()` timed out.

### `ERR_WORKER_NOT_RUNNING`

An operation failed because the `Worker` instance is not currently running.

### `ERR_WORKER_OUT_OF_MEMORY`

The `Worker` instance terminated because it reached its memory limit.

### `ERR_WORKER_PATH`

The path for the main script of a worker is neither an absolute path
nor a relative path starting with `./` or `../`.

### `ERR_WORKER_UNSERIALIZABLE_ERROR`

All attempts at serializing an uncaught exception from a worker thread failed.

### `ERR_WORKER_UNSUPPORTED_OPERATION`

The requested functionality is not supported in worker threads.

### `ERR_ZIP_ARCHIVE_TOO_LARGE`

An archive-level structure exceeds a limit: the archive comment exceeds the
65,535-byte encoded length that the ZIP format allows, or the archive's
central directory is too large to buffer in memory.

### `ERR_ZIP_ENTRY_CORRUPT`

A ZIP archive entry failed CRC-32 verification, or produced more or fewer
bytes than its declared uncompressed size, while being read.

### `ERR_ZIP_ENTRY_NOT_FOUND`

A named entry was requested from a `ZipFile` or `ZipBuffer` that does
not contain an entry with that name.

### `ERR_ZIP_ENTRY_TOO_LARGE`

A ZIP archive entry's declared size exceeds the configured limit, or a
provided entry name or comment exceeds the 65,535-byte encoded length that
the ZIP format allows.

### `ERR_ZIP_INVALID_ARCHIVE`

Data that was expected to be a ZIP archive, or a structure within one, is
missing, out of bounds, or otherwise inconsistent with the ZIP format.

### `ERR_ZIP_NOT_WRITABLE`

A mutating method (such as `zipFile.addEntry()` or `zipFile.delete()`) was
called on a `ZipFile` that was not opened with `{ writable: true }`.

### `ERR_ZIP_UNSUPPORTED_FEATURE`

A ZIP archive uses a feature outside of what this implementation supports,
such as entry encryption, an unsupported compression method, or a multi-disk
archive.

### `ERR_ZLIB_INITIALIZATION_FAILED`

Creation of a `zlib` object failed due to incorrect configuration.

### `ERR_ZSTD_INVALID_PARAM`

An invalid parameter key was passed during construction of a Zstd stream.

### `HPE_CHUNK_EXTENSIONS_OVERFLOW`

Too much data was received for a chunk extensions. In order to protect against
malicious or malconfigured clients, if more than 16 KiB of data is received
then an `Error` with this code will be emitted.

### `HPE_HEADER_OVERFLOW`

Too much HTTP header data was received. In order to protect against malicious or
malconfigured clients, if more than `maxHeaderSize` of HTTP header data is received then
HTTP parsing will abort without a request or response object being created, and
an `Error` with this code will be emitted.

### `HPE_UNEXPECTED_CONTENT_LENGTH`

Server is sending both a `Content-Length` header and `Transfer-Encoding: chunked`.

`Transfer-Encoding: chunked` allows the server to maintain an HTTP persistent
connection for dynamically generated content.
In this case, the `Content-Length` HTTP header cannot be used.

Use `Content-Length` or `Transfer-Encoding: chunked`.

### `MODULE_NOT_FOUND`

A module file could not be resolved by the CommonJS modules loader while
attempting a `require()` operation or when loading the program entry point.
