---
title: "Deprecated APIs (part 3 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/deprecations.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Deprecated APIs (part 3 of 6)

### DEP0062: `node --debug`

Type: End-of-Life

`--debug` activates the legacy V8 debugger interface, which was removed as
of V8 5.8. It is replaced by Inspector which is activated with `--inspect`
instead.

### DEP0063: `ServerResponse.prototype.writeHeader()`

Type: End-of-Life

The `node:http` module `ServerResponse.prototype.writeHeader()` API is
deprecated. Please use `ServerResponse.prototype.writeHead()` instead.

The `ServerResponse.prototype.writeHeader()` method was never documented as an
officially supported API.

### DEP0064: `tls.createSecurePair()`

Type: End-of-Life

The `tls.createSecurePair()` API was deprecated in documentation in Node.js
0.11.3. Users should use `tls.Socket` instead.

An automated migration is available (source):

```bash
npx codemod @nodejs/tls-create-secure-pair-to-tls-socket
```

### DEP0065: `repl.REPL_MODE_MAGIC` and `NODE_REPL_MODE=magic`

Type: End-of-Life

The `node:repl` module's `REPL_MODE_MAGIC` constant, used for `replMode` option,
has been removed. Its behavior has been functionally identical to that of
`REPL_MODE_SLOPPY` since Node.js 6.0.0, when V8 5.0 was imported. Please use
`REPL_MODE_SLOPPY` instead.

The `NODE_REPL_MODE` environment variable is used to set the underlying
`replMode` of an interactive `node` session. Its value, `magic`, is also
removed. Please use `sloppy` instead.

### DEP0066: `OutgoingMessage.prototype._headers, OutgoingMessage.prototype._headerNames`

Type: End-of-Life

The `node:http` module `OutgoingMessage.prototype._headers` and
`OutgoingMessage.prototype._headerNames` properties are deprecated. Use one of
the public methods (e.g. `OutgoingMessage.prototype.getHeader()`,
`OutgoingMessage.prototype.getHeaders()`,
`OutgoingMessage.prototype.getHeaderNames()`,
`OutgoingMessage.prototype.getRawHeaderNames()`,
`OutgoingMessage.prototype.hasHeader()`,
`OutgoingMessage.prototype.removeHeader()`,
`OutgoingMessage.prototype.setHeader()`) for working with outgoing headers.

The `OutgoingMessage.prototype._headers` and
`OutgoingMessage.prototype._headerNames` properties were never documented as
officially supported properties.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/http-outgoingmessage-headers
```

### DEP0067: `OutgoingMessage.prototype._renderHeaders`

Type: Documentation-only

The `node:http` module `OutgoingMessage.prototype._renderHeaders()` API is
deprecated.

The `OutgoingMessage.prototype._renderHeaders` property was never documented as
an officially supported API.

### DEP0068: `node debug`

Type: End-of-Life

`node debug` corresponds to the legacy CLI debugger which has been replaced with
a V8-inspector based CLI debugger available through `node inspect`.

### DEP0069: `vm.runInDebugContext(string)`

Type: End-of-Life

DebugContext has been removed in V8 and is not available in Node.js 10+.

DebugContext was an experimental API.

### DEP0070: `async_hooks.currentId()`

Type: End-of-Life

`async_hooks.currentId()` was renamed to `async_hooks.executionAsyncId()` for
clarity.

This change was made while `async_hooks` was an experimental API.

### DEP0071: `async_hooks.triggerId()`

Type: End-of-Life

`async_hooks.triggerId()` was renamed to `async_hooks.triggerAsyncId()` for
clarity.

This change was made while `async_hooks` was an experimental API.

### DEP0072: `async_hooks.AsyncResource.triggerId()`

Type: End-of-Life

`async_hooks.AsyncResource.triggerId()` was renamed to
`async_hooks.AsyncResource.triggerAsyncId()` for clarity.

This change was made while `async_hooks` was an experimental API.

### DEP0073: Several internal properties of `net.Server`

Type: End-of-Life

Accessing several internal, undocumented properties of `net.Server` instances
with inappropriate names is deprecated.

As the original API was undocumented and not generally useful for non-internal
code, no replacement API is provided.

### DEP0074: `REPLServer.bufferedCommand`

Type: End-of-Life

The `REPLServer.bufferedCommand` property was deprecated in favor of
`REPLServer.clearBufferedCommand()`.

### DEP0075: `REPLServer.parseREPLKeyword()`

Type: End-of-Life

`REPLServer.parseREPLKeyword()` was removed from userland visibility.

### DEP0076: `tls.parseCertString()`

Type: End-of-Life

`tls.parseCertString()` was a trivial parsing helper that was made public by
mistake. While it was supposed to parse certificate subject and issuer strings,
it never handled multi-value Relative Distinguished Names correctly.

Earlier versions of this document suggested using `querystring.parse()` as an
alternative to `tls.parseCertString()`. However, `querystring.parse()` also does
not handle all certificate subjects correctly and should not be used.

### DEP0077: `Module._debug()`

Type: End-of-Life

`Module._debug()` has been removed.

The `Module._debug()` function was never documented as an officially
supported API.

### DEP0078: `REPLServer.turnOffEditorMode()`

Type: End-of-Life

`REPLServer.turnOffEditorMode()` was removed from userland visibility.

### DEP0079: Custom inspection function on objects via `.inspect()`

Type: End-of-Life

Using a property named `inspect` on an object to specify a custom inspection
function for `util.inspect()` is deprecated. Use `util.inspect.custom`
instead. For backward compatibility with Node.js prior to version 6.4.0, both
can be specified.

### DEP0080: `path._makeLong()`

Type: Documentation-only

The internal `path._makeLong()` was not intended for public use. However,
userland modules have found it useful. The internal API is deprecated
and replaced with an identical, public `path.toNamespacedPath()` method.

### DEP0081: `fs.truncate()` using a file descriptor

Type: End-of-Life

`fs.truncate()` `fs.truncateSync()` usage with a file descriptor is
deprecated. Please use `fs.ftruncate()` or `fs.ftruncateSync()` to work with
file descriptors.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/fs-truncate-fd-deprecation
```

### DEP0082: `REPLServer.prototype.memory()`

Type: End-of-Life

`REPLServer.prototype.memory()` is only necessary for the internal mechanics of
the `REPLServer` itself. Do not use this function.

### DEP0083: Disabling ECDH by setting `ecdhCurve` to `false`

Type: End-of-Life

The `ecdhCurve` option to `tls.createSecureContext()` and `tls.TLSSocket` could
be set to `false` to disable ECDH entirely on the server only. This mode was
deprecated in preparation for migrating to OpenSSL 1.1.0 and consistency with
the client and is now unsupported. Use the `ciphers` parameter instead.

### DEP0084: requiring bundled internal dependencies

Type: End-of-Life

Since Node.js versions 4.4.0 and 5.2.0, several modules only intended for
internal usage were mistakenly exposed to user code through `require()`. These
modules were:

* `v8/tools/codemap`
* `v8/tools/consarray`
* `v8/tools/csvparser`
* `v8/tools/logreader`
* `v8/tools/profile_view`
* `v8/tools/profile`
* `v8/tools/SourceMap`
* `v8/tools/splaytree`
* `v8/tools/tickprocessor-driver`
* `v8/tools/tickprocessor`
* `node-inspect/lib/_inspect` (from 7.6.0)
* `node-inspect/lib/internal/inspect_client` (from 7.6.0)
* `node-inspect/lib/internal/inspect_repl` (from 7.6.0)

The `v8/*` modules do not have any exports, and if not imported in a specific
order would in fact throw errors. As such there are virtually no legitimate use
cases for importing them through `require()`.

On the other hand, `node-inspect` can be installed locally through a package
manager, as it is published on the npm registry under the same name. No source
code modification is necessary if that is done.

### DEP0085: AsyncHooks sensitive API

Type: End-of-Life

The AsyncHooks sensitive API was never documented and had various minor issues.
Use the `AsyncResource` API instead. See
<https://github.com/nodejs/node/issues/15572>.

### DEP0086: Remove `runInAsyncIdScope`

Type: End-of-Life

`runInAsyncIdScope` doesn't emit the `'before'` or `'after'` event and can thus
cause a lot of issues. See <https://github.com/nodejs/node/issues/14328>.

### DEP0089: `require('node:assert')`

Type: Deprecation revoked

Importing assert directly was not recommended as the exposed functions use
loose equality checks. The deprecation was revoked because use of the
`node:assert` module is not discouraged, and the deprecation caused developer
confusion.

### DEP0090: Invalid GCM authentication tag lengths

Type: End-of-Life

Node.js used to support all GCM authentication tag lengths which are accepted by
OpenSSL when calling `decipher.setAuthTag()`. Beginning with Node.js
v11.0.0, only authentication tag lengths of 128, 120, 112, 104, 96, 64, and 32
bits are allowed. Authentication tags of other lengths are invalid per
NIST SP 800-38D.

### DEP0091: `crypto.DEFAULT_ENCODING`

Type: End-of-Life

The `crypto.DEFAULT_ENCODING` property only existed for compatibility with
Node.js releases prior to versions 0.9.3 and has been removed.

### DEP0092: Top-level `this` bound to `module.exports`

Type: Documentation-only

Assigning properties to the top-level `this` as an alternative
to `module.exports` is deprecated. Developers should use `exports`
or `module.exports` instead.

### DEP0093: `crypto.fips` is deprecated and replaced

Type: Runtime

The `crypto.fips` property is deprecated. Please use `crypto.setFips()`
and `crypto.getFips()` instead.

An automated migration is available (source).

```bash
npx codemod@latest @nodejs/crypto-fips-to-getFips
```

### DEP0094: Using `assert.fail()` with more than one argument

Type: End-of-Life

Using `assert.fail()` with more than one argument is deprecated. Use
`assert.fail()` with only one argument or use a different `node:assert` module
method.

### DEP0095: `timers.enroll()`

Type: End-of-Life

`timers.enroll()` has been removed. Please use the publicly documented
`setTimeout()` or `setInterval()` instead.

An automated migration is available (source).

```bash
npx codemod @nodejs/timers-deprecations
```

### DEP0096: `timers.unenroll()`

Type: End-of-Life

`timers.unenroll()` has been removed. Please use the publicly documented
`clearTimeout()` or `clearInterval()` instead.

An automated migration is available (source).

```bash
npx codemod @nodejs/timers-deprecations
```

### DEP0097: `MakeCallback` with `domain` property

Type: Runtime

Users of `MakeCallback` that add the `domain` property to carry context,
should start using the `async_context` variant of `MakeCallback` or
`CallbackScope`, or the high-level `AsyncResource` class.

### DEP0098: AsyncHooks embedder `AsyncResource.emitBefore` and `AsyncResource.emitAfter` APIs

Type: End-of-Life

The embedded API provided by AsyncHooks exposes `.emitBefore()` and
`.emitAfter()` methods which are very easy to use incorrectly which can lead
to unrecoverable errors.

Use `asyncResource.runInAsyncScope()` API instead which provides a much
safer, and more convenient, alternative. See
<https://github.com/nodejs/node/pull/18513>.

### DEP0099: Async context-unaware `node::MakeCallback` C++ APIs

Type: Compile-time

Certain versions of `node::MakeCallback` APIs available to native addons are
deprecated. Please use the versions of the API that accept an `async_context`
parameter.

### DEP0100: `process.assert()`

Type: End-of-Life

`process.assert()` is deprecated. Please use the `assert` module instead.

This was never a documented feature.

An automated migration is available (source).

```bash
npx codemod@latest @nodejs/process-assert-to-node-assert
```

### DEP0101: `--with-lttng`

Type: End-of-Life

The `--with-lttng` compile-time option has been removed.

### DEP0102: Using `noAssert` in `Buffer#(read|write)` operations

Type: End-of-Life

Using the `noAssert` argument has no functionality anymore. All input is
verified regardless of the value of `noAssert`. Skipping the verification
could lead to hard-to-find errors and crashes.

### DEP0103: `process.binding('util').is[...]` typechecks

Type: Documentation-only (supports `--pending-deprecation`)

Using `process.binding()` in general should be avoided. The type checking
methods in particular can be replaced by using `util.types`.

This deprecation has been superseded by the deprecation of the
`process.binding()` API (DEP0111).

### DEP0104: `process.env` string coercion

Type: Documentation-only (supports `--pending-deprecation`)

When assigning a non-string property to `process.env`, the assigned value is
implicitly converted to a string. This behavior is deprecated if the assigned
value is not a string, boolean, or number. In the future, such assignment might
result in a thrown error. Please convert the property to a string before
assigning it to `process.env`.

### DEP0105: `decipher.finaltol`

Type: End-of-Life

`decipher.finaltol()` has never been documented and was an alias for
`decipher.final()`. This API has been removed, and it is recommended to use
`decipher.final()` instead.

### DEP0106: `crypto.createCipher` and `crypto.createDecipher`

Type: End-of-Life

`crypto.createCipher()` and `crypto.createDecipher()` have been removed
as they use a weak key <example-value> function (MD5 with no salt) and static
initialization vectors.
It is recommended to derive a key using
`crypto.pbkdf2()` or `crypto.scrypt()` with random salts and to use
`crypto.createCipheriv()` and `crypto.createDecipheriv()` to obtain the
`Cipheriv` and `Decipheriv` objects respectively.

An automated migration is available (source):

```bash
npx codemod @nodejs/crypto-createcipheriv-migration
```

### DEP0107: `tls.convertNPNProtocols()`

Type: End-of-Life

This was an undocumented helper function not intended for use outside Node.js
core and obsoleted by the removal of NPN (Next Protocol Negotiation) support.

### DEP0108: `zlib.bytesRead`

Type: End-of-Life

Deprecated alias for `zlib.bytesWritten`. This original name was chosen
because it also made sense to interpret the value as the number of bytes
read by the engine, but is inconsistent with other streams in Node.js that
expose values under these names.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/zlib-bytesread-to-byteswritten
```

### DEP0109: `http`, `https`, and `tls` support for invalid URLs

Type: End-of-Life

Some previously supported (but strictly invalid) URLs were accepted through the
`http.request()`, `http.get()`, `https.request()`,
`https.get()`, and `tls.checkServerIdentity()` APIs because those were
accepted by the legacy `url.parse()` API. The mentioned APIs now use the WHATWG
URL parser that requires strictly valid URLs. Passing an invalid URL is
deprecated and support will be removed in the future.

### DEP0110: `vm.Script` cached data

Type: Documentation-only

The `produceCachedData` option is deprecated. Use
`script.createCachedData()` instead.
