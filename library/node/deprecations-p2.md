---
title: "Deprecated APIs (part 2 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/deprecations.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Deprecated APIs (part 2 of 6)

## List of deprecated APIs

### DEP0001: `http.OutgoingMessage.prototype.flush`

Type: End-of-Life

`OutgoingMessage.prototype.flush()` has been removed. Use
`OutgoingMessage.prototype.flushHeaders()` instead.

### DEP0002: `require('_linklist')`

Type: End-of-Life

The `_linklist` module is deprecated. Please use a userland alternative.

### DEP0003: `_writableState.buffer`

Type: End-of-Life

The `_writableState.buffer` has been removed. Use `_writableState.getBuffer()`
instead.

### DEP0004: `CryptoStream.prototype.readyState`

Type: End-of-Life

The `CryptoStream.prototype.readyState` property was removed.

### DEP0005: `Buffer()` constructor

Type: Application (non-`node_modules` code only)

The `Buffer()` function and `new Buffer()` constructor are deprecated due to
API usability issues that can lead to accidental security issues.

As an alternative, use one of the following methods of constructing `Buffer`
objects:

* [`Buffer.alloc(size[, fill[, encoding]])`][alloc]: Create a `Buffer` with
  _initialized_ memory.
* `Buffer.allocUnsafe(size)`: Create a `Buffer` with
  _uninitialized_ memory.
* `Buffer.allocUnsafeSlow(size)`: Create a `Buffer` with _uninitialized_
  memory.
* `Buffer.from(array)`: Create a `Buffer` with a copy of `array`
* [`Buffer.from(arrayBuffer[, byteOffset[, length]])`][from_arraybuffer] -
  Create a `Buffer` that wraps the given `arrayBuffer`.
* `Buffer.from(buffer)`: Create a `Buffer` that copies `buffer`.
* `Buffer.from(string[, encoding])`: Create a `Buffer`
  that copies `string`.

Without `--pending-deprecation`, runtime warnings occur only for code not in
`node_modules`. This means there will not be deprecation warnings for
`Buffer()` usage in dependencies. With `--pending-deprecation`, a runtime
warning results no matter where the `Buffer()` usage occurs.

### DEP0006: `child_process` `options.customFds`

Type: End-of-Life

Within the `child_process` module's `spawn()`, `fork()`, and `exec()`
methods, the `options.customFds` option is deprecated. The `options.stdio`
option should be used instead.

### DEP0007: Replace `cluster` `worker.suicide` with `worker.exitedAfterDisconnect`

Type: End-of-Life

In an earlier version of the Node.js `cluster`, a boolean property with the name
`suicide` was added to the `Worker` object. The intent of this property was to
provide an indication of how and why the `Worker` instance exited. In Node.js
6.0.0, the old property was deprecated and replaced with a new
`worker.exitedAfterDisconnect` property. The old property name did not
precisely describe the actual semantics and was unnecessarily emotion-laden.

### DEP0008: `require('node:constants')`

Type: Documentation-only

The `node:constants` module is deprecated. When requiring access to constants
relevant to specific Node.js builtin modules, developers should instead refer
to the `constants` property exposed by the relevant module. For instance,
`require('node:fs').constants` and `require('node:os').constants`.

### DEP0009: `crypto.pbkdf2` without digest

Type: End-of-Life

Use of the `crypto.pbkdf2()` API without specifying a digest was deprecated
in Node.js 6.0 because the method defaulted to using the non-recommended
`'SHA1'` digest. Previously, a deprecation warning was printed. Starting in
Node.js 8.0.0, calling `crypto.pbkdf2()` or `crypto.pbkdf2Sync()` with
`digest` set to `undefined` will throw a `TypeError`.

Beginning in Node.js 11.0.0, calling these functions with `digest` set to
`null` would print a deprecation warning to align with the behavior when `digest`
is `undefined`.

Now, however, passing either `undefined` or `null` will throw a `TypeError`.

### DEP0010: `crypto.createCredentials`

Type: End-of-Life

The `crypto.createCredentials()` API was removed. Please use
`tls.createSecureContext()` instead.

### DEP0011: `crypto.Credentials`

Type: End-of-Life

The `crypto.Credentials` class was removed. Please use `tls.SecureContext`
instead.

### DEP0012: `Domain.dispose`

Type: End-of-Life

`Domain.dispose()` has been removed. Recover from failed I/O actions
explicitly via error event handlers set on the domain instead.

### DEP0013: `fs` asynchronous function without callback

Type: End-of-Life

Calling an asynchronous function without a callback throws a `TypeError`
in Node.js 10.0.0 onwards. See <https://github.com/nodejs/node/pull/12562>.

### DEP0014: `fs.read` legacy String interface

Type: End-of-Life

The `fs.read()` legacy `String` interface is deprecated. Use the `Buffer`
API as mentioned in the documentation instead.

### DEP0015: `fs.readSync` legacy String interface

Type: End-of-Life

The `fs.readSync()` legacy `String` interface is deprecated. Use the
`Buffer` API as mentioned in the documentation instead.

### DEP0016: `GLOBAL`/`root`

Type: End-of-Life

The `GLOBAL` and `root` aliases for the `global` property were deprecated
in Node.js 6.0.0 and have since been removed.

### DEP0017: `Intl.v8BreakIterator`

Type: End-of-Life

`Intl.v8BreakIterator` was a non-standard extension and has been removed.
See `Intl.Segmenter`.

### DEP0018: Unhandled promise rejections

Type: End-of-Life

Unhandled promise rejections are deprecated. By default, promise rejections
that are not handled terminate the Node.js process with a non-zero exit
code. To change the way Node.js treats unhandled rejections, use the
`--unhandled-rejections` command-line option.

### DEP0019: `require('.')` resolved outside directory

Type: End-of-Life

In certain cases, `require('.')` could resolve outside the package directory.
This behavior has been removed.

### DEP0020: `Server.connections`

Type: End-of-Life

The `Server.connections` property was deprecated in Node.js 0.9.7 and has
been removed. Please use the `Server.getConnections()` method instead.

### DEP0021: `Server.listenFD`

Type: End-of-Life

The `Server.listenFD()` method was deprecated and removed. Please use
`Server.listen({fd: <number>})` instead.

### DEP0022: `os.tmpDir()`

Type: End-of-Life

The `os.tmpDir()` API was deprecated in Node.js 7.0.0 and has since been
removed. Please use `os.tmpdir()` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/tmpDir-to-tmpdir
```

### DEP0023: `os.getNetworkInterfaces()`

Type: End-of-Life

The `os.getNetworkInterfaces()` method is deprecated. Please use the
`os.networkInterfaces()` method instead.

### DEP0024: `REPLServer.prototype.convertToContext()`

Type: End-of-Life

The `REPLServer.prototype.convertToContext()` API has been removed.

### DEP0025: `require('node:sys')`

Type: Runtime

The `node:sys` module is deprecated. Please use the `util` module instead.

### DEP0026: `util.print()`

Type: End-of-Life

`util.print()` has been removed. Please use `console.log()` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-print-to-console-log
```

### DEP0027: `util.puts()`

Type: End-of-Life

`util.puts()` has been removed. Please use `console.log()` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-print-to-console-log
```

### DEP0028: `util.debug()`

Type: End-of-Life

`util.debug()` has been removed. Please use `console.error()` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-print-to-console-log
```

### DEP0029: `util.error()`

Type: End-of-Life

`util.error()` has been removed. Please use `console.error()` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-print-to-console-log
```

### DEP0030: `SlowBuffer`

Type: End-of-Life

The `SlowBuffer` class has been removed. Please use
`Buffer.allocUnsafeSlow(size)` instead.

An automated migration is available (source).

```bash
npx codemod@latest @nodejs/slow-buffer-to-buffer-alloc-unsafe-slow
```

### DEP0031: `ecdh.setPublicKey()`

Type: Runtime

The `ecdh.setPublicKey()` method is now deprecated as its inclusion in
the API is not useful.

### DEP0032: `node:domain` module

Type: Documentation-only

The `domain` module is deprecated and should not be used.

### DEP0033: `EventEmitter.listenerCount()`

Type: Revoked

The `events.listenerCount(emitter, eventName)` API was deprecated, as it
provided identical functionality to `emitter.listenerCount(eventName)`. The
deprecation was revoked because this function has been repurposed to also
accept {EventTarget} arguments.

### DEP0034: `fs.exists(path, callback)`

Type: Documentation-only

The `fs.exists(path, callback)` API is deprecated. Please use
`fs.stat()` or `fs.access()` instead.

### DEP0035: `fs.lchmod(path, mode, callback)`

Type: Documentation-only

The `fs.lchmod(path, mode, callback)` API is deprecated.

### DEP0036: `fs.lchmodSync(path, mode)`

Type: Documentation-only

The `fs.lchmodSync(path, mode)` API is deprecated.

### DEP0037: `fs.lchown(path, uid, gid, callback)`

Type: Deprecation revoked

The `fs.lchown(path, uid, gid, callback)` API was deprecated. The
deprecation was revoked because the requisite supporting APIs were added in
libuv.

### DEP0038: `fs.lchownSync(path, uid, gid)`

Type: Deprecation revoked

The `fs.lchownSync(path, uid, gid)` API was deprecated. The deprecation was
revoked because the requisite supporting APIs were added in libuv.

### DEP0039: `require.extensions`

Type: Documentation-only

The `require.extensions` property is deprecated.

### DEP0040: `node:punycode` module

Type: Application (non-`node_modules` code only)

The `punycode` module is deprecated. Please use a userland alternative
instead.

### DEP0041: `NODE_REPL_HISTORY_FILE` environment variable

Type: End-of-Life

The `NODE_REPL_HISTORY_FILE` environment variable was removed. Please use
`NODE_REPL_HISTORY` instead.

### DEP0042: `tls.CryptoStream`

Type: End-of-Life

The `tls.CryptoStream` class was removed. Please use
`tls.TLSSocket` instead.

### DEP0043: `tls.SecurePair`

Type: End-of-Life

The `tls.SecurePair` class is deprecated. Please use
`tls.TLSSocket` instead.

### DEP0044: `util.isArray()`

Type: Runtime

The `util.isArray()` API is deprecated. Please use `Array.isArray()`
instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0045: `util.isBoolean()`

Type: End-of-Life

The `util.isBoolean()` API has been removed. Please use
`typeof arg === 'boolean'` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0046: `util.isBuffer()`

Type: End-of-Life

The `util.isBuffer()` API has been removed. Please use
`Buffer.isBuffer()` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0047: `util.isDate()`

Type: End-of-Life

The `util.isDate()` API has been removed. Please use
`arg instanceof Date` instead.

Also for stronger approaches, consider using:
`Date.prototype.toString.call(arg) === '[object Date]' && !isNaN(arg)`.
This can also be used in a `try/catch` block to handle invalid date objects.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0048: `util.isError()`

Type: End-of-Life

The `util.isError()` API has been removed. Please use `Error.isError(arg)`.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0049: `util.isFunction()`

Type: End-of-Life

The `util.isFunction()` API has been removed. Please use
`typeof arg === 'function'` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0050: `util.isNull()`

Type: End-of-Life

The `util.isNull()` API has been removed. Please use
`arg === null` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0051: `util.isNullOrUndefined()`

Type: End-of-Life

The `util.isNullOrUndefined()` API has been removed. Please use
`arg === null || arg === undefined` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0052: `util.isNumber()`

Type: End-of-Life

The `util.isNumber()` API has been removed. Please use
`typeof arg === 'number'` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0053: `util.isObject()`

Type: End-of-Life

The `util.isObject()` API has been removed. Please use
`arg && typeof arg === 'object'` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0054: `util.isPrimitive()`

Type: End-of-Life

The `util.isPrimitive()` API has been removed. Please use `Object(arg) !== arg` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0055: `util.isRegExp()`

Type: End-of-Life

The `util.isRegExp()` API has been removed. Please use
`arg instanceof RegExp` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0056: `util.isString()`

Type: End-of-Life

The `util.isString()` API has been removed. Please use
`typeof arg === 'string'` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0057: `util.isSymbol()`

Type: End-of-Life

The `util.isSymbol()` API has been removed. Please use
`typeof arg === 'symbol'` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0058: `util.isUndefined()`

Type: End-of-Life

The `util.isUndefined()` API has been removed. Please use
`arg === undefined` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-is
```

### DEP0059: `util.log()`

Type: End-of-Life

The `util.log()` API has been removed because it's an unmaintained
legacy API that was exposed to user land by accident. Instead,
consider the following alternatives based on your specific needs:

* **Third-Party Logging Libraries**

* **Use `console.log(new Date().toLocaleString(), message)`**

By adopting one of these alternatives, you can transition away from `util.log()`
and choose a logging strategy that aligns with the specific
requirements and complexity of your application.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-log-to-console-log
```

### DEP0060: `util._extend()`

Type: Runtime

The `util._extend()` API is deprecated because it's an unmaintained
legacy API that was exposed to user land by accident.
Please use `target = Object.assign(target, source)` instead.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/util-extend-to-object-assign
```

### DEP0061: `fs.SyncWriteStream`

Type: End-of-Life

The `fs.SyncWriteStream` class was never intended to be a publicly accessible
API and has been removed. No alternative API is available. Please use a userland
alternative.
