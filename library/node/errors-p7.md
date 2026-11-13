---
title: "Errors (part 7 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/errors.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Errors (part 7 of 7)

## Legacy Node.js error codes

> Stability: 0 - Deprecated. These error codes are either inconsistent, or have
> been removed.

### `ERR_CANNOT_TRANSFER_OBJECT`

The value passed to `postMessage()` contained an object that is not supported
for transferring.

### `ERR_CPU_USAGE`

The native call from `process.cpuUsage` could not be processed.

### `ERR_CRYPTO_HASH_DIGEST_NO_UTF16`

The UTF-16 encoding was used with `hash.digest()`. While the
`hash.digest()` method does allow an `encoding` argument to be passed in,
causing the method to return a string rather than a `Buffer`, the UTF-16
encoding (e.g. `ucs` or `utf16le`) is not supported.

### `ERR_CRYPTO_SCRYPT_INVALID_PARAMETER`

An incompatible combination of options was passed to `crypto.scrypt()` or
`crypto.scryptSync()`. New versions of Node.js use the error code
`ERR_INCOMPATIBLE_OPTION_PAIR` instead, which is consistent with other APIs.

### `ERR_FS_INVALID_SYMLINK_TYPE`

An invalid symlink type was passed to the `fs.symlink()` or
`fs.symlinkSync()` methods.

### `ERR_HTTP2_FRAME_ERROR`

Used when a failure occurs sending an individual frame on the HTTP/2
session.

### `ERR_HTTP2_HEADERS_OBJECT`

Used when an HTTP/2 Headers Object is expected.

### `ERR_HTTP2_HEADER_REQUIRED`

Used when a required header is missing in an HTTP/2 message.

### `ERR_HTTP2_INFO_HEADERS_AFTER_RESPOND`

HTTP/2 informational headers must only be sent _prior_ to calling the
`Http2Stream.prototype.respond()` method.

### `ERR_HTTP2_STREAM_CLOSED`

Used when an action has been performed on an HTTP/2 Stream that has already
been closed.

### `ERR_HTTP_INVALID_CHAR`

Used when an invalid character is found in an HTTP response status message
(reason phrase).

### `ERR_IMPORT_ASSERTION_TYPE_FAILED`

An import assertion has failed, preventing the specified module to be imported.

### `ERR_IMPORT_ASSERTION_TYPE_MISSING`

An import assertion is missing, preventing the specified module to be imported.

### `ERR_IMPORT_ASSERTION_TYPE_UNSUPPORTED`

An import attribute is not supported by this version of Node.js.

### `ERR_INDEX_OUT_OF_RANGE`

A given index was out of the accepted range (e.g. negative offsets).

### `ERR_INVALID_OPT_VALUE`

An invalid or unexpected value was passed in an options object.

### `ERR_INVALID_OPT_VALUE_ENCODING`

An invalid or unknown file encoding was passed.

### `ERR_INVALID_PERFORMANCE_MARK`

While using the Performance Timing API (`perf_hooks`), a performance mark is
invalid.

### `ERR_INVALID_TRANSFER_OBJECT`

An invalid transfer object was passed to `postMessage()`.

### `ERR_MANIFEST_ASSERT_INTEGRITY`

An attempt was made to load a resource, but the resource did not match the
integrity defined by the policy manifest. See the documentation for policy
manifests for more information.

### `ERR_MANIFEST_DEPENDENCY_MISSING`

An attempt was made to load a resource, but the resource was not listed as a
dependency from the location that attempted to load it. See the documentation
for policy manifests for more information.

### `ERR_MANIFEST_INTEGRITY_MISMATCH`

An attempt was made to load a policy manifest, but the manifest had multiple
entries for a resource which did not match each other. Update the manifest
entries to match in order to resolve this error. See the documentation for
policy manifests for more information.

### `ERR_MANIFEST_INVALID_RESOURCE_FIELD`

A policy manifest resource had an invalid value for one of its fields. Update
the manifest entry to match in order to resolve this error. See the
documentation for policy manifests for more information.

### `ERR_MANIFEST_INVALID_SPECIFIER`

A policy manifest resource had an invalid value for one of its dependency
mappings. Update the manifest entry to match to resolve this error. See the
documentation for policy manifests for more information.

### `ERR_MANIFEST_PARSE_POLICY`

An attempt was made to load a policy manifest, but the manifest was unable to
be parsed. See the documentation for policy manifests for more information.

### `ERR_MANIFEST_TDZ`

An attempt was made to read from a policy manifest, but the manifest
initialization has not yet taken place. This is likely a bug in Node.js.

### `ERR_MANIFEST_UNKNOWN_ONERROR`

A policy manifest was loaded, but had an unknown value for its "onerror"
behavior. See the documentation for policy manifests for more information.

### `ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST`

This error code was replaced by `ERR_MISSING_TRANSFERABLE_IN_TRANSFER_LIST`
in Node.js 15.0.0, because it is no longer accurate as other types of
transferable objects also exist now.

### `ERR_MISSING_TRANSFERABLE_IN_TRANSFER_LIST`

An object that needs to be explicitly listed in the `transferList` argument
is in the object passed to a `postMessage()` call, but is not provided
in the `transferList` for that call. Usually, this is a `MessagePort`.

In Node.js versions prior to v15.0.0, the error code being used here was
`ERR_MISSING_MESSAGE_PORT_IN_TRANSFER_LIST`. However, the set of
transferable object types has been expanded to cover more types than
`MessagePort`.

### `ERR_NAPI_CONS_PROTOTYPE_OBJECT`

Used by the `Node-API` when `Constructor.prototype` is not an object.

### `ERR_NAPI_TSFN_START_IDLE_LOOP`

On the main thread, values are removed from the queue associated with the
thread-safe function in an idle loop. This error indicates that an error
has occurred when attempting to start the loop.

### `ERR_NAPI_TSFN_STOP_IDLE_LOOP`

Once no more items are left in the queue, the idle loop must be suspended. This
error indicates that the idle loop has failed to stop.

### `ERR_NO_LONGER_SUPPORTED`

A Node.js API was called in an unsupported manner, such as
`Buffer.write(string, encoding, offset[, length])`.

### `ERR_OUTOFMEMORY`

Used generically to identify that an operation caused an out of memory
condition.

### `ERR_PARSE_HISTORY_DATA`

The `node:repl` module was unable to parse data from the REPL history file.

### `ERR_SOCKET_CANNOT_SEND`

Data could not be sent on a socket.

### `ERR_STDERR_CLOSE`

An attempt was made to close the `process.stderr` stream. By design, Node.js
does not allow `stdout` or `stderr` streams to be closed by user code.

### `ERR_STDOUT_CLOSE`

An attempt was made to close the `process.stdout` stream. By design, Node.js
does not allow `stdout` or `stderr` streams to be closed by user code.

### `ERR_STREAM_READ_NOT_IMPLEMENTED`

Used when an attempt is made to use a readable stream that has not implemented
`readable._read()`.

### `ERR_TAP_LEXER_ERROR`

An error representing a failing lexer state.

### `ERR_TAP_PARSER_ERROR`

An error representing a failing parser state. Additional information about
the token causing the error is available via the `cause` property.

### `ERR_TAP_VALIDATION_ERROR`

This error represents a failed TAP validation.

### `ERR_TLS_RENEGOTIATION_FAILED`

Used when a TLS renegotiation request has failed in a non-specific way.

### `ERR_TRANSFERRING_EXTERNALIZED_SHAREDARRAYBUFFER`

A `SharedArrayBuffer` whose memory is not managed by the JavaScript engine
or by Node.js was encountered during serialization. Such a `SharedArrayBuffer`
cannot be serialized.

This can only happen when native addons create `SharedArrayBuffer`s in
"externalized" mode, or put existing `SharedArrayBuffer` into externalized mode.

### `ERR_UNKNOWN_STDIN_TYPE`

An attempt was made to launch a Node.js process with an unknown `stdin` file
type. This error is usually an indication of a bug within Node.js itself,
although it is possible for user code to trigger it.

### `ERR_UNKNOWN_STREAM_TYPE`

An attempt was made to launch a Node.js process with an unknown `stdout` or
`stderr` file type. This error is usually an indication of a bug within Node.js
itself, although it is possible for user code to trigger it.

### `ERR_V8BREAKITERATOR`

The V8 `BreakIterator` API was used but the full ICU data set is not installed.

### `ERR_VALUE_OUT_OF_RANGE`

Used when a given value is out of the accepted range.

### `ERR_VM_MODULE_LINKING_ERRORED`

The linker function returned a module for which linking has failed.

### `ERR_VM_MODULE_NOT_LINKED`

The module must be successfully linked before instantiation.

### `ERR_WORKER_UNSUPPORTED_EXTENSION`

The pathname used for the main script of a worker has an
unknown file extension.

### `ERR_ZLIB_BINDING_CLOSED`

Used when an attempt is made to use a `zlib` object after it has already been
closed.

## OpenSSL Error Codes

### Time Validity Errors

#### `CERT_NOT_YET_VALID`

The certificate is not yet valid: the notBefore date is after the current time.

#### `CERT_HAS_EXPIRED`

The certificate has expired: the notAfter date is before the current time.

#### `CRL_NOT_YET_VALID`

The certificate revocation list (CRL) has a future issue date.

#### `CRL_HAS_EXPIRED`

The certificate revocation list (CRL) has expired.

#### `CERT_REVOKED`

The certificate has been revoked; it is on a certificate revocation list (CRL).

### Trust or Chain Related Errors

#### `UNABLE_TO_GET_ISSUER_CERT`

The issuer certificate of a looked up certificate could not be found. This
normally means the list of trusted certificates is not complete.

#### `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`

The certificate’s issuer is not known. This is the case if the issuer is not
included in the trusted certificate list.

#### `DEPTH_ZERO_SELF_SIGNED_CERT`

The passed certificate is self-signed and the same certificate cannot be found
in the list of trusted certificates.

#### `SELF_SIGNED_CERT_IN_CHAIN`

The certificate’s issuer is not known. This is the case if the issuer is not
included in the trusted certificate list.

#### `CERT_CHAIN_TOO_LONG`

The certificate chain length is greater than the maximum depth.

#### `UNABLE_TO_GET_CRL`

The CRL reference by the certificate could not be found.

#### `UNABLE_TO_VERIFY_LEAF_SIGNATURE`

No signatures could be verified because the chain contains only one certificate
and it is not self signed.

#### `CERT_UNTRUSTED`

The root certificate authority (CA) is not marked as trusted for the specified
purpose.

### Basic Extension Errors

#### `INVALID_CA`

A CA certificate is invalid. Either it is not a CA or its extensions are not
consistent with the supplied purpose.

#### `PATH_LENGTH_EXCEEDED`

The basicConstraints pathlength parameter has been exceeded.

### Name Related Errors

#### `HOSTNAME_MISMATCH`

Certificate does not match provided name.

### Usage and Policy Errors

#### `INVALID_PURPOSE`

The supplied certificate cannot be used for the specified purpose.

#### `CERT_REJECTED`

The root CA is marked to reject the specified purpose.

### Formatting Errors

#### `CERT_SIGNATURE_FAILURE`

The signature of the certificate is invalid.

#### `CRL_SIGNATURE_FAILURE`

The signature of the certificate revocation list (CRL) is invalid.

#### `ERROR_IN_CERT_NOT_BEFORE_FIELD`

The certificate notBefore field contains an invalid time.

#### `ERROR_IN_CERT_NOT_AFTER_FIELD`

The certificate notAfter field contains an invalid time.

#### `ERROR_IN_CRL_LAST_UPDATE_FIELD`

The CRL lastUpdate field contains an invalid time.

#### `ERROR_IN_CRL_NEXT_UPDATE_FIELD`

The CRL nextUpdate field contains an invalid time.

#### `UNABLE_TO_DECRYPT_CERT_SIGNATURE`

The certificate signature could not be decrypted. This means that the actual
signature value could not be determined rather than it not matching the expected
value, this is only meaningful for RSA keys.

#### `UNABLE_TO_DECRYPT_CRL_SIGNATURE`

The certificate revocation list (CRL) signature could not be decrypted: this
means that the actual signature value could not be determined rather than it not
matching the expected value.

#### `UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY`

The public key in the certificate SubjectPublicKeyInfo could not be read.

### Other OpenSSL Errors

#### `OUT_OF_MEM`

An error occurred trying to allocate memory. This should never happen.
