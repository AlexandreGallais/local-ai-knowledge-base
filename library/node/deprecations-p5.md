---
title: "Deprecated APIs (part 5 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/deprecations.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Deprecated APIs (part 5 of 6)

### DEP0158: `buffer.slice(start, end)`

Type: Documentation-only

This method was deprecated because it is not compatible with
`Uint8Array.prototype.slice()`, which is a superclass of `Buffer`.

Use `buffer.subarray` which does the same thing instead.

### DEP0159: `ERR_INVALID_CALLBACK`

Type: End-of-Life

This error code was removed due to adding more confusion to
the errors used for value type validation.

An automated migration is available (source):

```bash
npx codemod @nodejs/err-invalid-callback
```

### DEP0160: `process.on('multipleResolves', handler)`

Type: End-of-Life

This event was deprecated and removed because it did not work with V8 promise
combinators which diminished its usefulness.

### DEP0161: `process._getActiveRequests()` and `process._getActiveHandles()`

Type: Documentation-only

The `process._getActiveHandles()` and `process._getActiveRequests()`
functions are not intended for public use and can be removed in future
releases.

Use `process.getActiveResourcesInfo()` to get a list of types of active
resources and not the actual references.

### DEP0162: `fs.write()`, `fs.writeFileSync()` coercion to string

Type: End-of-Life

Implicit coercion of objects with own `toString` property, passed as second
parameter in `fs.write()`, `fs.writeFile()`, `fs.appendFile()`,
`fs.writeFileSync()`, and `fs.appendFileSync()` is deprecated.
Convert them to primitive strings.

### DEP0163: `channel.subscribe(onMessage)`, `channel.unsubscribe(onMessage)`

Type: Deprecation revoked

These methods were deprecated because their use could leave the channel object
vulnerable to being garbage-collected if not strongly referenced by the user.
The deprecation was revoked because channel objects are now resistant to
garbage collection when the channel has active subscribers.

### DEP0164: `process.exit(code)`, `process.exitCode` coercion to integer

Type: End-of-Life

Values other than `undefined`, `null`, integer numbers, and integer strings
(e.g., `'1'`) are deprecated as value for the `code` parameter in
`process.exit()` and as value to assign to `process.exitCode`.

### DEP0165: `--trace-atomics-wait`

Type: End-of-Life

The `--trace-atomics-wait` flag has been removed because
it uses the V8 hook `SetAtomicsWaitCallback`,
that will be removed in a future V8 release.

### DEP0166: Double slashes in imports and exports targets

Type: Runtime

Package imports and exports targets mapping into paths including a double slash
(of _"/"_ or _"\\"_) are deprecated and will fail with a resolution validation
error in a future release. This same deprecation also applies to pattern matches
starting or ending in a slash.

### DEP0167: Weak `DiffieHellmanGroup` instances (`modp1`, `modp2`, `modp5`)

Type: Documentation-only

The well-known MODP groups `modp1`, `modp2`, and `modp5` are deprecated because
they are not secure against practical attacks. See RFC 8247 Section 2.4 for
details.

These groups might be removed in future versions of Node.js. Applications that
rely on these groups should evaluate using stronger MODP groups instead.

### DEP0168: Unhandled exception in Node-API callbacks

Type: Runtime

The implicit suppression of uncaught exceptions in Node-API callbacks is now
deprecated.

Set the flag `--force-node-api-uncaught-exceptions-policy` to force Node.js
to emit an `'uncaughtException'` event if the exception is not handled in
Node-API callbacks.

### DEP0169: Insecure url.parse()

Type: Application (non-`node_modules` code only)

`url.parse()` behavior is not standardized and prone to errors that
have security implications. Use the WHATWG URL API instead. CVEs are not
issued for `url.parse()` vulnerabilities.

Calling `url.format(urlString)` or `url.resolve()` invokes `url.parse()`
internally, and is therefore also covered by this deprecation.

### DEP0170: Invalid port when using `url.parse()`

Type: End-of-Life

`url.parse()` used to accept URLs with ports that are not numbers. This
behavior might result in host name spoofing with unexpected input. These URLs
will throw an error (which the WHATWG URL API also does).

### DEP0171: Setters for `http.IncomingMessage` headers and trailers

Type: Documentation-only

In a future version of Node.js, `message.headers`,
`message.headersDistinct`, `message.trailers`, and
`message.trailersDistinct` will be read-only.

### DEP0172: The `asyncResource` property of `AsyncResource` bound functions

Type: End-of-Life

Older versions of Node.js would add the `asyncResource` when a function is
bound to an `AsyncResource`. It no longer does.

### DEP0173: the `assert.CallTracker` class

Type: End-of-Life

The `assert.CallTracker` API has been removed.

### DEP0174: calling `promisify` on a function that returns a `Promise`

Type: Runtime

Calling `util.promisify` on a function that returns a `Promise` will ignore
the result of said promise, which can lead to unhandled promise rejections.

### DEP0175: `util.toUSVString`

Type: Documentation-only

The `util.toUSVString()` API is deprecated. Please use
`String.prototype.toWellFormed` instead.

### DEP0176: `fs.F_OK`, `fs.R_OK`, `fs.W_OK`, `fs.X_OK`

Type: End-of-Life

`F_OK`, `R_OK`, `W_OK` and `X_OK` getters exposed directly on `node:fs` were
removed. Get them from `fs.constants` or `fs.promises.constants` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/fs-access-mode-constants
```

### DEP0177: `util.types.isWebAssemblyCompiledModule`

Type: End-of-Life

The `util.types.isWebAssemblyCompiledModule` API has been removed.
Please use `value instanceof WebAssembly.Module` instead.

### DEP0178: `dirent.path`

Type: End-of-Life

The `dirent.path` property has been removed due to its lack of consistency across
release lines. Please use `dirent.parentPath` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/dirent-path-to-parent-path
```

### DEP0179: `Hash` constructor

Type: Runtime

Calling `Hash` class directly with `Hash()` or `new Hash()` is
deprecated due to being internals, not intended for public use.
Please use the `crypto.createHash()` method to create Hash instances.

### DEP0180: `fs.Stats` constructor

Type: Runtime

Calling `fs.Stats` class directly with `Stats()` or `new Stats()` is
deprecated due to being internals, not intended for public use.

### DEP0181: `Hmac` constructor

Type: Runtime

Calling `Hmac` class directly with `Hmac()` or `new Hmac()` is
deprecated due to being internals, not intended for public use.
Please use the `crypto.createHmac()` method to create Hmac instances.

### DEP0182: Short GCM authentication tags without explicit `authTagLength`

Type: End-of-Life

For ciphers in GCM mode, the `decipher.setAuthTag()` function used to accept
authentication tags of any valid length (see also DEP0090). This
exception has been removed to better align with recommendations per
NIST SP 800-38D, and applications that intend to use authentication tags
that are shorter than the default authentication tag length (i.e., shorter than
16 bytes for AES-GCM) must explicitly set the `authTagLength` option of the
`crypto.createDecipheriv()` function to the appropriate length.

### DEP0183: OpenSSL engine-based APIs

Type: Documentation-only

OpenSSL 3 has deprecated support for custom engines with a recommendation to
switch to its new provider model. The `clientCertEngine` option for
`https.request()`, `tls.createSecureContext()`, and `tls.createServer()`;
the `privateKeyEngine` and `privateKeyIdentifier` for `tls.createSecureContext()`;
and `crypto.setEngine()` all depend on this functionality from OpenSSL.

### DEP0184: Instantiating `node:zlib` classes without `new`

Type: Runtime

Instantiating classes without the `new` qualifier exported by the `node:zlib` module is deprecated.
It is recommended to use the `new` qualifier instead. This applies to all Zlib classes, such as `Deflate`,
`DeflateRaw`, `Gunzip`, `Inflate`, `InflateRaw`, `Unzip`, and `Zlib`.

### DEP0185: Instantiating `node:repl` classes without `new`

Type: End-of-Life

Instantiating classes without the `new` qualifier exported by the `node:repl` module is deprecated.
The `new` qualifier must be used instead. This applies to all REPL classes, including
`REPLServer` and `Recoverable`.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/repl-classes-with-new
```

### DEP0187: Passing invalid argument types to `fs.existsSync`

Type: Runtime

Passing non-supported argument types is deprecated and, instead of returning `false`,
will throw an error in a future version.

### DEP0188: `process.features.ipv6` and `process.features.uv`

Type: Documentation-only

These properties are unconditionally `true`. Any checks based on these properties are redundant.

### DEP0189: `process.features.tls_*`

Type: Documentation-only

`process.features.tls_alpn`, `process.features.tls_ocsp`, and `process.features.tls_sni` are
deprecated, as their values are guaranteed to be identical to that of `process.features.tls`.

### DEP0190: Passing `args` to `node:child_process` `execFile`/`spawn` with `shell` option

Type: Runtime

When an `args` array is passed to `child_process.execFile` or `child_process.spawn` with the option
`{ shell: true }` or `{ shell: '/path/to/shell' }`, the values are not escaped, only space-separated,
which can lead to shell injection.

### DEP0191: `repl.builtinModules`

Type: Documentation-only (supports `--pending-deprecation`)

The `node:repl` module exports a `builtinModules` property that contains an array
of built-in modules. This was incomplete and matched the already deprecated
`repl._builtinLibs` (DEP0142) instead it's better to rely
upon `require('node:module').builtinModules`.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/repl-builtin-modules
```

### DEP0192: `require('node:_tls_common')` and `require('node:_tls_wrap')`

Type: Runtime

The `node:_tls_common` and `node:_tls_wrap` modules are deprecated as they should be considered
an internal nodejs implementation rather than a public facing API, use `node:tls` instead.

### DEP0193: `require('node:_stream_*')`

Type: End-of-Life

The `node:_stream_duplex`, `node:_stream_passthrough`, `node:_stream_readable`, `node:_stream_transform`,
`node:_stream_wrap` and `node:_stream_writable` modules are deprecated as they should be considered
an internal nodejs implementation rather than a public facing API, use `node:stream` instead.

### DEP0194: HTTP/2 priority signaling

Type: End-of-Life

The support for priority signaling has been removed following its deprecation in the RFC 9113.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/http2-priority-signaling
```

### DEP0195: Instantiating `node:http` classes without `new`

Type: Documentation-only

Instantiating classes without the `new` qualifier exported by the `node:http` module is deprecated.
It is recommended to use the `new` qualifier instead. This applies to all http classes, such as
`OutgoingMessage`, `IncomingMessage`, `ServerResponse` and `ClientRequest`.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/http-classes-with-new
```

### DEP0196: Calling `node:child_process` functions with `options.shell` as an empty string

Type: Documentation-only

Calling the process-spawning functions with `{ shell: '' }` is almost certainly
unintentional, and can cause aberrant behavior.

To make `child_process.execFile` or `child_process.spawn` invoke the
default shell, use `{ shell: true }`. If the intention is not to invoke a shell
(default behavior), either omit the `shell` option, or set it to `false` or a
nullish value.

To make `child_process.exec` invoke the default shell, either omit the
`shell` option, or set it to a nullish value. If the intention is not to invoke
a shell, use `child_process.execFile` instead.

### DEP0197: `util.types.isNativeError()`

Type: Documentation-only

The `util.types.isNativeError` API is deprecated. Please use `Error.isError` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/types-is-native-error
```

### DEP0198: Creating SHAKE-128 and SHAKE-256 digests without an explicit `options.outputLength`

Type: Runtime

Creating SHAKE-128 and SHAKE-256 digests without an explicit `options.outputLength` is deprecated.

### DEP0199: `require('node:_http_*')`

Type: Documentation-only

The `node:_http_agent`, `node:_http_client`, `node:_http_common`, `node:_http_incoming`,
`node:_http_outgoing` and `node:_http_server` modules are deprecated as they should be considered
an internal nodejs implementation rather than a public facing API, use `node:http` instead.

### DEP0200: Closing fs.Dir on garbage collection

Type: Documentation-only

Allowing a `fs.Dir` object to be closed on garbage collection is
deprecated. In the future, doing so might result in a thrown error that will
terminate the process.

Please ensure that all `fs.Dir` objects are explicitly closed using
`Dir.prototype.close()` or `using` keyword:

```mjs
import { opendir } from 'node:fs/promises';

{
  await using dir = await opendir('/async/disposable/directory');
} // Closed by dir[Symbol.asyncDispose]()

{
  using dir = await opendir('/sync/disposable/directory');
} // Closed by dir[Symbol.dispose]()

{
  const dir = await opendir('/unconditionally/iterated/directory');
  for await (const entry of dir) {
    // process an entry
  } // Closed by iterator
}

{
  let dir;
  try {
    dir = await opendir('/legacy/closeable/directory');
  } finally {
    await dir?.close();
  }
}
```

### DEP0201: Passing `options.type` to `Duplex.toWeb()`

Type: Runtime

Passing the `type` option to `Duplex.toWeb()` is deprecated. To specify the
type of the readable half of the constructed readable-writable pair, use the
`readableType` option instead.

### DEP0202: `Http1IncomingMessage` and `Http1ServerResponse` options of HTTP/2 servers

Type: Documentation-only

The `Http1IncomingMessage` and `Http1ServerResponse` options of
`http2.createServer()` and `http2.createSecureServer()` are
deprecated. Use `http1Options.IncomingMessage` and
`http1Options.ServerResponse` instead.

```cjs
// Deprecated
const server = http2.createSecureServer({
  allowHTTP1: true,
  Http1IncomingMessage: MyIncomingMessage,
  Http1ServerResponse: MyServerResponse,
});
```

```cjs
// Use this instead
const server = http2.createSecureServer({
  allowHTTP1: true,
  http1Options: {
    IncomingMessage: MyIncomingMessage,
    ServerResponse: MyServerResponse,
  },
});
```
