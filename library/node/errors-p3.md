---
title: "Errors (part 3 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/errors.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Errors (part 3 of 7)

## Node.js error codes

### `ABORT_ERR`

Used when an operation has been aborted (typically using an `AbortController`).

APIs _not_ using `AbortSignal`s typically do not raise an error with this code.

This code does not use the regular `ERR_*` convention Node.js errors use in
order to be compatible with the web platform's `AbortError`.

### `ERR_ACCESS_DENIED`

A special type of error that is triggered whenever Node.js tries to get access
to a resource restricted by the Permission Model.

### `ERR_AMBIGUOUS_ARGUMENT`

A function argument is being used in a way that suggests that the function
signature may be misunderstood. This is thrown by the `node:assert` module when
the `message` parameter in `assert.throws(block, message)` matches the error
message thrown by `block` because that usage suggests that the user believes
`message` is the expected message rather than the message the `AssertionError`
will display if `block` does not throw.

### `ERR_ARG_NOT_ITERABLE`

An iterable argument (i.e. a value that works with `for...of` loops) was
required, but not provided to a Node.js API.

### `ERR_ASSERTION`

A special type of error that can be triggered whenever Node.js detects an
exceptional logic violation that should never occur. These are raised typically
by the `node:assert` module.

### `ERR_ASYNC_CALLBACK`

An attempt was made to register something that is not a function as an
`AsyncHooks` callback.

### `ERR_ASYNC_LOADER_REQUEST_NEVER_SETTLED`

An operation related to module loading is customized by an asynchronous loader
hook that never settled the promise before the loader thread exits.

### `ERR_ASYNC_TYPE`

The type of an asynchronous resource was invalid. Users are also able
to define their own types if using the public embedder API.

### `ERR_BROTLI_COMPRESSION_FAILED`

Data passed to a Brotli stream was not successfully compressed.

### `ERR_BROTLI_INVALID_PARAM`

An invalid parameter key was passed during construction of a Brotli stream.

### `ERR_BUFFER_CONTEXT_NOT_AVAILABLE`

An attempt was made to create a Node.js `Buffer` instance from addon or embedder
code, while in a JS engine Context that is not associated with a Node.js
instance. The data passed to the `Buffer` method will have been released
by the time the method returns.

When encountering this error, a possible alternative to creating a `Buffer`
instance is to create a normal `Uint8Array`, which only differs in the
prototype of the resulting object. `Uint8Array`s are generally accepted in all
Node.js core APIs where `Buffer`s are; they are available in all Contexts.

### `ERR_BUFFER_OUT_OF_BOUNDS`

An operation outside the bounds of a `Buffer` was attempted.

### `ERR_BUFFER_TOO_LARGE`

An attempt has been made to create a `Buffer` larger than the maximum allowed
size.

### `ERR_CANNOT_WATCH_SIGINT`

Node.js was unable to watch for the `SIGINT` signal.

### `ERR_CHILD_CLOSED_BEFORE_REPLY`

A child process was closed before the parent received a reply.

### `ERR_CHILD_PROCESS_IPC_REQUIRED`

Used when a child process is being forked without specifying an IPC channel.

### `ERR_CHILD_PROCESS_STDIO_MAXBUFFER`

Used when the main process is trying to read data from the child process's
STDERR/STDOUT, and the data's length is longer than the `maxBuffer` option.

### `ERR_CLOSED_MESSAGE_PORT`

There was an attempt to use a `MessagePort` instance in a closed
state, usually after `.close()` has been called.

### `ERR_CONSOLE_WRITABLE_STREAM`

`Console` was instantiated without `stdout` stream, or `Console` has a
non-writable `stdout` or `stderr` stream.

### `ERR_CONSTRUCT_CALL_INVALID`

A class constructor was called that is not callable.

### `ERR_CONSTRUCT_CALL_REQUIRED`

A constructor for a class was called without `new`.

### `ERR_CONTEXT_NOT_INITIALIZED`

The vm context passed into the API is not yet initialized. This could happen
when an error occurs (and is caught) during the creation of the
context, for example, when the allocation fails or the maximum call stack
size is reached when the context is created.

### `ERR_CPU_PROFILE_ALREADY_STARTED`

The CPU profile with the given name is already started.

### `ERR_CPU_PROFILE_NOT_STARTED`

The CPU profile with the given name is not started.

### `ERR_CPU_PROFILE_TOO_MANY`

There are too many CPU profiles being collected.

### `ERR_CRYPTO_ARGON2_NOT_SUPPORTED`

Argon2 is not supported by the current version of OpenSSL being used.

### `ERR_CRYPTO_CUSTOM_ENGINE_NOT_SUPPORTED`

An OpenSSL engine was requested (for example, through the `clientCertEngine` or
`privateKeyEngine` TLS options) that is not supported by the version of OpenSSL
being used, likely due to the compile-time flag `OPENSSL_NO_ENGINE`.

### `ERR_CRYPTO_ECDH_INVALID_FORMAT`

An invalid value for the `format` argument was passed to the `crypto.ECDH()`
class `getPublicKey()` method.

### `ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY`

An invalid value for the `key` argument has been passed to the
`crypto.ECDH()` class `computeSecret()` method. It means that the public
key lies outside of the elliptic curve.

### `ERR_CRYPTO_ENGINE_UNKNOWN`

An invalid crypto engine identifier was passed to
`require('node:crypto').setEngine()`.

### `ERR_CRYPTO_FIPS_FORCED`

The `--force-fips` command-line argument was used but there was an attempt
to enable or disable FIPS mode in the `node:crypto` module.

### `ERR_CRYPTO_FIPS_UNAVAILABLE`

An attempt was made to enable or disable FIPS mode, but FIPS mode was not
available.

### `ERR_CRYPTO_HASH_FINALIZED`

`hash.digest()` was called multiple times. The `hash.digest()` method must
be called no more than one time per instance of a `Hash` object.

### `ERR_CRYPTO_HASH_UPDATE_FAILED`

`hash.update()` failed for an unspecified reason.

### `ERR_CRYPTO_INCOMPATIBLE_KEY`

The given crypto keys are incompatible with the attempted operation.

### `ERR_CRYPTO_INCOMPATIBLE_KEY_OPTIONS`

The selected public or private key encoding is incompatible with other options.

### `ERR_CRYPTO_INITIALIZATION_FAILED`

Initialization of the crypto subsystem failed.

### `ERR_CRYPTO_INVALID_AUTH_TAG`

An invalid authentication tag was provided.

### `ERR_CRYPTO_INVALID_COUNTER`

An invalid counter was provided for a counter-mode cipher.

### `ERR_CRYPTO_INVALID_CURVE`

An invalid elliptic-curve was provided.

### `ERR_CRYPTO_INVALID_DIGEST`

An invalid crypto digest algorithm was specified.

### `ERR_CRYPTO_INVALID_IV`

An invalid initialization vector was provided.

### `ERR_CRYPTO_INVALID_JWK`

An invalid JSON Web Key was provided.

### `ERR_CRYPTO_INVALID_KEYLEN`

An invalid key length was provided.

### `ERR_CRYPTO_INVALID_KEYPAIR`

An invalid key pair was provided.

### `ERR_CRYPTO_INVALID_KEYTYPE`

An invalid key type was provided.

### `ERR_CRYPTO_INVALID_KEY_OBJECT_TYPE`

The given crypto key object's type is invalid for the attempted operation.

### `ERR_CRYPTO_INVALID_MAC`

An invalid MAC algorithm was specified.

### `ERR_CRYPTO_INVALID_MESSAGELEN`

An invalid message length was provided.

### `ERR_CRYPTO_INVALID_SCRYPT_PARAMS`

One or more `crypto.scrypt()` or `crypto.scryptSync()` parameters are
outside their legal range.

### `ERR_CRYPTO_INVALID_STATE`

A crypto method was used on an object that was in an invalid state. For
instance, calling `cipher.getAuthTag()` before calling `cipher.final()`.

### `ERR_CRYPTO_INVALID_TAG_LENGTH`

An invalid authentication tag length was provided.

### `ERR_CRYPTO_JOB_INIT_FAILED`

Initialization of an asynchronous crypto operation failed.

### `ERR_CRYPTO_JWK_UNSUPPORTED_CURVE`

Key's Elliptic Curve is not registered for use in the
JSON Web Key Elliptic Curve Registry.

### `ERR_CRYPTO_JWK_UNSUPPORTED_KEY_TYPE`

Key's Asymmetric Key Type is not registered for use in the
JSON Web Key Types Registry.

### `ERR_CRYPTO_KEM_NOT_SUPPORTED`

Attempted to use KEM operations while Node.js was not compiled with
OpenSSL with KEM support.

### `ERR_CRYPTO_MAC_FINALIZED`

An operation was attempted on a `Mac` object after finalization was attempted
or an underlying MAC update failed.

### `ERR_CRYPTO_MAC_NOT_SUPPORTED`

Node.js was built without support for the OpenSSL `EVP_MAC` API.

### `ERR_CRYPTO_MAC_UPDATE_FAILED`

`mac.update()` failed for an unspecified reason.

### `ERR_CRYPTO_OPERATION_FAILED`

A crypto operation failed for an otherwise unspecified reason.

### `ERR_CRYPTO_PBKDF2_ERROR`

The PBKDF2 algorithm failed for unspecified reasons. OpenSSL does not provide
more details and therefore neither does Node.js.

### `ERR_CRYPTO_SCRYPT_NOT_SUPPORTED`

Node.js was compiled without `scrypt` support. Not possible with the official
release binaries but can happen with custom builds, including distro builds.

### `ERR_CRYPTO_SIGN_KEY_REQUIRED`

A signing `key` was not provided to the `sign.sign()` method.

### `ERR_CRYPTO_TIMING_SAFE_EQUAL_LENGTH`

`crypto.timingSafeEqual()` was called with `Buffer`, `TypedArray`, or
`DataView` arguments of different lengths.

### `ERR_CRYPTO_UNKNOWN_CIPHER`

An unknown cipher was specified.

### `ERR_CRYPTO_UNKNOWN_DH_GROUP`

An unknown Diffie-Hellman group name was given. See
`crypto.getDiffieHellman()` for a list of valid group names.

### `ERR_CRYPTO_UNSUPPORTED_OPERATION`

An attempt to invoke an unsupported crypto operation was made.

### `ERR_DEBUGGER_ERROR`

An error occurred with the debugger.

### `ERR_DEBUGGER_STARTUP_ERROR`

The debugger timed out waiting for the required host/port to be free.

### `ERR_DIR_CLOSED`

The `fs.Dir` was previously closed.

### `ERR_DIR_CONCURRENT_OPERATION`

A synchronous read or close call was attempted on an `fs.Dir` which has
ongoing asynchronous operations.

### `ERR_DLOPEN_DISABLED`

Loading native addons has been disabled using `--no-addons`.

### `ERR_DLOPEN_FAILED`

A call to `process.dlopen()` failed.

### `ERR_DNS_SET_SERVERS_FAILED`

`c-ares` failed to set the DNS server.

### `ERR_DOMAIN_CALLBACK_NOT_AVAILABLE`

The `node:domain` module was not usable since it could not establish the
required error handling hooks, because
`process.setUncaughtExceptionCaptureCallback()` had been called at an
earlier point in time.

### `ERR_DOMAIN_CANNOT_SET_UNCAUGHT_EXCEPTION_CAPTURE`

`process.setUncaughtExceptionCaptureCallback()` could not be called
because the `node:domain` module has been loaded at an earlier point in time.

The stack trace is extended to include the point in time at which the
`node:domain` module had been loaded.

### `ERR_DUPLICATE_STARTUP_SNAPSHOT_MAIN_FUNCTION`

`v8.startupSnapshot.setDeserializeMainFunction()` could not be called
because it had already been called before.

### `ERR_ENCODING_INVALID_ENCODED_DATA`

Data provided to `TextDecoder()` API was invalid according to the encoding
provided.

### `ERR_ENCODING_NOT_SUPPORTED`

Encoding provided to `TextDecoder()` API was not one of the
WHATWG Supported Encodings.

### `ERR_EVAL_ESM_CANNOT_PRINT`

`--print` cannot be used with ESM input.

### `ERR_EVENT_RECURSION`

Thrown when an attempt is made to recursively dispatch an event on `EventTarget`.

### `ERR_EXECUTION_ENVIRONMENT_NOT_AVAILABLE`

The JS execution context is not associated with a Node.js environment.
This may occur when Node.js is used as an embedded library and some hooks
for the JS engine are not set up properly.

### `ERR_FALSY_VALUE_REJECTION`

A `Promise` that was callbackified via `util.callbackify()` was rejected with a
falsy value.

### `ERR_FEATURE_UNAVAILABLE_ON_PLATFORM`

Used when a feature that is not available
to the current platform which is running Node.js is used.

### `ERR_FFI_CALL_FAILED`

A low-level FFI call failed.

### `ERR_FFI_INVALID_POINTER`

An invalid pointer was passed to an FFI operation.

### `ERR_FFI_LIBRARY_CLOSED`

An operation was attempted on an FFI dynamic library after it was closed.

### `ERR_FS_CP_DIR_TO_NON_DIR`

An attempt was made to copy a directory to a non-directory (file, symlink,
etc.) using `fs.cp()`.

### `ERR_FS_CP_EEXIST`

An attempt was made to copy over a file that already existed with
`fs.cp()`, with the `force` and `errorOnExist` set to `true`.

### `ERR_FS_CP_EINVAL`

When using `fs.cp()`, `src` or `dest` pointed to an invalid path.

### `ERR_FS_CP_FIFO_PIPE`

An attempt was made to copy a named pipe with `fs.cp()`.

### `ERR_FS_CP_NON_DIR_TO_DIR`

An attempt was made to copy a non-directory (file, symlink, etc.) to a directory
using `fs.cp()`.

### `ERR_FS_CP_SOCKET`

An attempt was made to copy to a socket with `fs.cp()`.

### `ERR_FS_CP_SYMLINK_TO_SUBDIRECTORY`

When using `fs.cp()`, a symlink in `dest` pointed to a subdirectory
of `src`.

### `ERR_FS_CP_UNKNOWN`

An attempt was made to copy to an unknown file type with `fs.cp()`.

### `ERR_FS_EISDIR`

Path is a directory.

### `ERR_FS_FILE_TOO_LARGE`

An attempt was made to read a file larger than the supported 2 GiB limit for
`fs.readFile()`. This is not a limitation of `Buffer`, but an internal I/O constraint.
For handling larger files, consider using `fs.createReadStream()` to read the
file in chunks.

### `ERR_FS_WATCH_QUEUE_OVERFLOW`

The number of file system events queued without being handled exceeded the size specified in
`maxQueue` in `fs.watch()`.

### `ERR_HTTP2_ALTSVC_INVALID_ORIGIN`

HTTP/2 ALTSVC frames require a valid origin.

### `ERR_HTTP2_ALTSVC_LENGTH`

HTTP/2 ALTSVC frames are limited to a maximum of 16,382 payload bytes.

### `ERR_HTTP2_CONNECT_AUTHORITY`

For HTTP/2 requests using the `CONNECT` method, the `:authority` pseudo-header
is required.

### `ERR_HTTP2_CONNECT_PATH`

For HTTP/2 requests using the `CONNECT` method, the `:path` pseudo-header is
forbidden.

### `ERR_HTTP2_CONNECT_SCHEME`

For HTTP/2 requests using the `CONNECT` method, the `:scheme` pseudo-header is
forbidden.

### `ERR_HTTP2_ERROR`

A non-specific HTTP/2 error has occurred.

### `ERR_HTTP2_GOAWAY_SESSION`

New HTTP/2 Streams may not be opened after the `Http2Session` has received a
`GOAWAY` frame from the connected peer.

### `ERR_HTTP2_HEADERS_AFTER_RESPOND`

Additional headers were specified after an HTTP/2 response was initiated.

### `ERR_HTTP2_HEADERS_SENT`

An attempt was made to send multiple response headers.

### `ERR_HTTP2_HEADER_SINGLE_VALUE`

Multiple values were provided for an HTTP/2 header field that was required to
have only a single value.

### `ERR_HTTP2_INFO_STATUS_NOT_ALLOWED`

Informational HTTP status codes (`1xx`) may not be set as the response status
code on HTTP/2 responses.

### `ERR_HTTP2_INVALID_CONNECTION_HEADERS`

HTTP/1 connection specific headers are forbidden to be used in HTTP/2
requests and responses.

### `ERR_HTTP2_INVALID_HEADER_VALUE`

An invalid HTTP/2 header value was specified.

### `ERR_HTTP2_INVALID_INFO_STATUS`

An invalid HTTP informational status code has been specified. Informational
status codes must be an integer between `100` and `199` (inclusive).

### `ERR_HTTP2_INVALID_ORIGIN`

HTTP/2 `ORIGIN` frames require a valid origin.
