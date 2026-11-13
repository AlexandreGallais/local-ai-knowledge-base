---
title: "Deprecated APIs (part 4 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/deprecations.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Deprecated APIs (part 4 of 6)

### DEP0111: `process.binding()`

Type: Documentation-only (supports `--pending-deprecation`)

`process.binding()` is for use by Node.js internal code only.

While `process.binding()` has not reached End-of-Life status in general, it is
unavailable when the permission model is enabled.

### DEP0112: `dgram` private APIs

Type: End-of-Life

The `node:dgram` module previously contained several APIs that were never meant
to accessed outside of Node.js core: `Socket.prototype._handle`,
`Socket.prototype._receiving`, `Socket.prototype._bindState`,
`Socket.prototype._queue`, `Socket.prototype._reuseAddr`,
`Socket.prototype._healthCheck()`, `Socket.prototype._stopReceiving()`, and
`dgram._createSocketHandle()`. These have been removed.

### DEP0113: `Cipher.setAuthTag()`, `Decipher.getAuthTag()`

Type: End-of-Life

`Cipher.setAuthTag()` and `Decipher.getAuthTag()` are no longer available. They
were never documented and would throw when called.

### DEP0114: `crypto._toBuf()`

Type: End-of-Life

The `crypto._toBuf()` function was not designed to be used by modules outside
of Node.js core and was removed.

### DEP0115: `crypto.prng()`, `crypto.pseudoRandomBytes()`, `crypto.rng()`

Type: Documentation-only (supports `--pending-deprecation`)

In recent versions of Node.js, there is no difference between
`crypto.randomBytes()` and `crypto.pseudoRandomBytes()`. The latter is
deprecated along with the undocumented aliases `crypto.prng()` and
`crypto.rng()` in favor of `crypto.randomBytes()` and might be removed in a
future release.

### DEP0116: Legacy URL API

Type: Deprecation revoked

The legacy URL API is deprecated. This includes `url.format()`,
`url.parse()`, `url.resolve()`, and the legacy `urlObject`. Please
use the WHATWG URL API instead.

An automated migration is available (source).

```bash
npx codemod@latest @nodejs/node-url-to-whatwg-url
```

### DEP0117: Native crypto handles

Type: End-of-Life

Previous versions of Node.js exposed handles to internal native objects through
the `_handle` property of the `Cipher`, `Decipher`, `DiffieHellman`,
`DiffieHellmanGroup`, `ECDH`, `Hash`, `Hmac`, `Sign`, and `Verify` classes.
The `_handle` property has been removed because improper use of the native
object can lead to crashing the application.

### DEP0118: `dns.lookup()` support for a falsy host name

Type: End-of-Life

Previous versions of Node.js supported `dns.lookup()` with a falsy host name
like `dns.lookup(false)` due to backward compatibility. This has been removed.

### DEP0119: `process.binding('uv').errname()` private API

Type: Documentation-only (supports `--pending-deprecation`)

`process.binding('uv').errname()` is deprecated. Please use
`util.getSystemErrorName()` instead.

### DEP0120: Windows Performance Counter support

Type: End-of-Life

Windows Performance Counter support has been removed from Node.js. The
undocumented `COUNTER_NET_SERVER_CONNECTION()`,
`COUNTER_NET_SERVER_CONNECTION_CLOSE()`, `COUNTER_HTTP_SERVER_REQUEST()`,
`COUNTER_HTTP_SERVER_RESPONSE()`, `COUNTER_HTTP_CLIENT_REQUEST()`, and
`COUNTER_HTTP_CLIENT_RESPONSE()` functions have been deprecated.

### DEP0121: `net._setSimultaneousAccepts()`

Type: End-of-Life

The undocumented `net._setSimultaneousAccepts()` function was originally
intended for debugging and performance tuning when using the
`node:child_process` and `node:cluster` modules on Windows. The function is not
generally useful and is being removed. See discussion here:
<https://github.com/nodejs/node/issues/18391>

### DEP0122: `tls` `Server.prototype.setOptions()`

Type: End-of-Life

Please use `Server.prototype.setSecureContext()` instead.

### DEP0123: setting the TLS ServerName to an IP address

Type: End-of-Life

Setting the TLS ServerName to an IP address is not permitted by
RFC 6066.

### DEP0124: using `REPLServer.rli`

Type: End-of-Life

This property is a reference to the instance itself.

### DEP0125: `require('node:_stream_wrap')`

Type: End-of-Life

The `node:_stream_wrap` module is deprecated.

### DEP0126: `timers.active()`

Type: End-of-Life

The previously undocumented `timers.active()` has been removed.
Please use the publicly documented `timeout.refresh()` instead.
If re-referencing the timeout is necessary, `timeout.ref()` can be used
with no performance impact since Node.js 10.

An automated migration is available (source).

```bash
npx codemod @nodejs/timers-deprecations
```

### DEP0127: `timers._unrefActive()`

Type: End-of-Life

The previously undocumented and "private" `timers._unrefActive()` has been removed.
Please use the publicly documented `timeout.refresh()` instead.
If unreferencing the timeout is necessary, `timeout.unref()` can be used
with no performance impact since Node.js 10.

An automated migration is available (source).

```bash
npx codemod @nodejs/timers-deprecations
```

### DEP0128: modules with an invalid `main` entry and an `index.js` file

Type: Runtime

Modules that have an invalid `main` entry (e.g., `./does-not-exist.js`) and
also have an `index.js` file in the top level directory will resolve the
`index.js` file. That is deprecated and is going to throw an error in future
Node.js versions.

### DEP0129: `ChildProcess._channel`

Type: End-of-Life

The `_channel` property of child process objects returned by `spawn()` and
similar functions is not intended for public use. Use `ChildProcess.channel`
instead.

### DEP0130: `Module.createRequireFromPath()`

Type: End-of-Life

Use `module.createRequire()` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/create-require-from-path
```

### DEP0131: Legacy HTTP parser

Type: End-of-Life

The legacy HTTP parser, used by default in versions of Node.js prior to 12.0.0,
is deprecated and has been removed in v13.0.0. Prior to v13.0.0, the
`--http-parser=legacy` command-line flag could be used to revert to using the
legacy parser.

### DEP0132: `worker.terminate()` with callback

Type: End-of-Life

Passing a callback to `worker.terminate()` is deprecated. Use the returned
`Promise` instead, or a listener to the worker's `'exit'` event.

### DEP0133: `http` `connection`

Type: Documentation-only

Prefer `response.socket` over `response.connection` and
`request.socket` over `request.connection`.

### DEP0134: `process._tickCallback`

Type: Documentation-only (supports `--pending-deprecation`)

The `process._tickCallback` property was never documented as
an officially supported API.

### DEP0135: `WriteStream.open()` and `ReadStream.open()` are internal

Type: End-of-Life

`WriteStream.open()` and `ReadStream.open()` are undocumented internal
APIs that do not make sense to use in userland. File streams should always be
opened through their corresponding factory methods `fs.createWriteStream()`
and `fs.createReadStream()`) or by passing a file descriptor in options.

### DEP0136: `http` `finished`

Type: Documentation-only

`response.finished` indicates whether `response.end()` has been
called, not whether `'finish'` has been emitted and the underlying data
is flushed.

Use `response.writableFinished` or `response.writableEnded`
accordingly instead to avoid the ambiguity.

To maintain existing behavior `response.finished` should be replaced with
`response.writableEnded`.

### DEP0137: Closing fs.FileHandle on garbage collection

Type: End-of-Life

Allowing a `fs.FileHandle` object to be closed on garbage collection used
to be allowed, but now throws an error.

Please ensure that all `fs.FileHandle` objects are explicitly closed using
`FileHandle.prototype.close()` when the `fs.FileHandle` is no longer needed:

```js
const fsPromises = require('node:fs').promises;
async function openAndClose() {
  let filehandle;
  try {
    filehandle = await fsPromises.open('thefile.txt', 'r');
  } finally {
    if (filehandle !== undefined)
      await filehandle.close();
  }
}
```

### DEP0138: `process.mainModule`

Type: Documentation-only

`process.mainModule` is a CommonJS-only feature while `process` global
object is shared with non-CommonJS environment. Its use within ECMAScript
modules is unsupported.

It is deprecated in favor of `require.main`, because it serves the same
purpose and is only available on CommonJS environment.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/process-main-module
```

### DEP0139: `process.umask()` with no arguments

Type: Documentation-only

Calling `process.umask()` with no argument causes the process-wide umask to be
written twice. This introduces a race condition between threads, and is a
potential security vulnerability. There is no safe, cross-platform alternative
API.

### DEP0140: Use `request.destroy()` instead of `request.abort()`

Type: Documentation-only

Use `request.destroy()` instead of `request.abort()`.

### DEP0141: `repl.inputStream` and `repl.outputStream`

Type: Documentation-only (supports `--pending-deprecation`)

The `node:repl` module exported the input and output stream twice. Use `.input`
instead of `.inputStream` and `.output` instead of `.outputStream`.

### DEP0142: `repl._builtinLibs`

Type: Documentation-only (supports `--pending-deprecation`)

The `node:repl` module exports a `_builtinLibs` property that contains an array
of built-in modules. It was incomplete so far and instead it's better to rely
upon `require('node:module').builtinModules`.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/repl-builtin-modules
```

### DEP0143: `Transform._transformState`

Type: End-of-Life

`Transform._transformState` will be removed in future versions where it is
no longer required due to simplification of the implementation.

### DEP0144: `module.parent`

Type: Documentation-only (supports `--pending-deprecation`)

A CommonJS module can access the first module that required it using
`module.parent`. This feature is deprecated because it does not work
consistently in the presence of ECMAScript modules and because it gives an
inaccurate representation of the CommonJS module graph.

Some modules use it to check if they are the entry point of the current process.
Instead, it is recommended to compare `require.main` and `module`:

```js
if (require.main === module) {
  // Code section that will run only if current file is the entry point.
}
```

When looking for the CommonJS modules that have required the current one,
`require.cache` and `module.children` can be used:

```js
const moduleParents = Object.values(require.cache)
  .filter((m) => m.children.includes(module));
```

### DEP0145: `socket.bufferSize`

Type: Documentation-only

`socket.bufferSize` is just an alias for `writable.writableLength`.

### DEP0146: `new crypto.Certificate()`

Type: Documentation-only

The `crypto.Certificate()` constructor is deprecated. Use
static methods of `crypto.Certificate()` instead.

### DEP0147: `fs.rmdir(path, { recursive: true })`

Type: End-of-Life

The `fs.rmdir`, `fs.rmdirSync`, and `fs.promises.rmdir` methods used
to support a `recursive` option. That option has been removed.

Use `fs.rm(path, { recursive: true, force: true })`,
`fs.rmSync(path, { recursive: true, force: true })` or
`fs.promises.rm(path, { recursive: true, force: true })` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/rmdir
```

### DEP0148: Folder mappings in `"exports"` (trailing `"/"`)

Type: End-of-Life

Using a trailing `"/"` to define subpath folder mappings in the
subpath exports or subpath imports fields is no longer supported.
Use subpath patterns instead.

### DEP0149: `http.IncomingMessage#connection`

Type: Documentation-only

Prefer `message.socket` over `message.connection`.

### DEP0150: Changing the value of `process.config`

Type: End-of-Life

The `process.config` property provides access to Node.js compile-time settings.
However, the property is mutable and therefore subject to tampering. The ability
to change the value will be removed in a future version of Node.js.

### DEP0151: Main index lookup and extension searching

Type: Runtime

Previously, `index.js` and extension searching lookups would apply to
`import 'pkg'` main entry point resolution, even when resolving ES modules.

With this deprecation, all ES module main entry point resolutions require
an explicit `"exports"` or `"main"` entry with the exact file extension.

### DEP0152: Extension PerformanceEntry properties

Type: End-of-Life

The `'gc'`, `'http2'`, and `'http'` {PerformanceEntry} object types used to have
additional properties assigned to them that provide additional information.
These properties are now available within the standard `detail` property
of the `PerformanceEntry` object. The deprecated accessors have been
removed.

### DEP0153: `dns.lookup` and `dnsPromises.lookup` options type coercion

Type: End-of-Life

Using a non-nullish non-integer value for `family` option, a non-nullish
non-number value for `hints` option, a non-nullish non-boolean value for `all`
option, or a non-nullish non-boolean value for `verbatim` option in
`dns.lookup()` and `dnsPromises.lookup()` throws an
`ERR_INVALID_ARG_TYPE` error.

### DEP0154: RSA-PSS generate key pair options

Type: End-of-Life

Use  `'hashAlgorithm'` instead of `'hash'`, and `'mgf1HashAlgorithm'` instead of `'mgf1Hash'`.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/crypto-rsa-pss-update
```

### DEP0155: Trailing slashes in pattern specifier resolutions

Type: Runtime

The remapping of specifiers ending in `"/"` like `import 'pkg/x/'` is deprecated
for package `"exports"` and `"imports"` pattern resolutions.

### DEP0156: `.aborted` property and `'abort'`, `'aborted'` event in `http`

Type: Documentation-only

Move to {Stream} API instead, as the `http.ClientRequest`,
`http.ServerResponse`, and `http.IncomingMessage` are all stream-based.
Check `stream.destroyed` instead of the `.aborted` property, and listen for
`'close'` instead of `'abort'`, `'aborted'` event.

The `.aborted` property and `'abort'` event are only useful for detecting
`.abort()` calls. For closing a request early, use the Stream
`.destroy([error])` then check the `.destroyed` property and `'close'` event
should have the same effect. The receiving end should also check the
`readable.readableEnded` value on `http.IncomingMessage` to get whether
it was an aborted or graceful destroy.

### DEP0157: Thenable support in streams

Type: End-of-Life

An undocumented feature of Node.js streams was to support thenables in
implementation methods. This is now deprecated, use callbacks instead and avoid
use of async function for streams implementation methods.

This feature caused users to encounter unexpected problems where the user
implements the function in callback style but uses e.g. an async method which
would cause an error since mixing promise and callback semantics is not valid.

```js
const w = new Writable({
  async final(callback) {
    await someOp();
    callback();
  },
});
```
