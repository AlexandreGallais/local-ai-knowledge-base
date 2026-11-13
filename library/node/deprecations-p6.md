---
title: "Deprecated APIs (part 6 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/deprecations.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Deprecated APIs (part 6 of 6)

### DEP0203: Passing `CryptoKey` to `node:crypto` APIs

Type: Runtime

Passing a `CryptoKey` to `node:crypto` functions is deprecated and
will throw an error in a future version. This includes
`crypto.createPublicKey()`, `crypto.createPrivateKey()`,
`crypto.sign()`, `crypto.verify()`,
`crypto.publicEncrypt()`, `crypto.publicDecrypt()`,
`crypto.privateEncrypt()`, `crypto.privateDecrypt()`,
`Sign.prototype.sign()`, `Verify.prototype.verify()`,
`crypto.createHmac()`, `crypto.createCipheriv()`,
`crypto.createDecipheriv()`, `crypto.encapsulate()`, and
`crypto.decapsulate()`.

### DEP0204: `KeyObject.from()` with non-extractable `CryptoKey`

Type: Runtime

Passing a non-extractable `CryptoKey` to `KeyObject.from()` is
deprecated and will throw an error in a future version.

### DEP0205: `module.register()`

Type: Runtime

`module.register()` is deprecated. Use `module.registerHooks()`
instead.

The `module.register()` API provides off-thread async hooks for customizing ES modules;
the `module.registerHooks()` API provides similar hooks that are synchronous, in-thread, and
work for all types of modules.
Supporting async hooks has proven to be complex, involving worker threads orchestration, and there are issues
that have proven unresolvable. See caveats of asynchronous customization hooks. Please migrate to
`module.registerHooks()` as soon as possible as `module.register()` will be
removed in a future version of Node.js.

### DEP0206: Calling `digest()` on an already-finalized `Hmac` instance

Type: Documentation-only

Calling `hmac.digest()` more than once returns an empty buffer instead of
throwing an error. This behavior is inconsistent with `hash.digest()` and
may lead to subtle bugs. Calling `hmac.digest()` on a finalized `Hmac` instance
will throw an error in a future version.

### DEP0208: `Server.prototype._listen2`

Type: Documentation-only

`net.Server.prototype._listen2` is an undocumented alias for an internal
function that sets up the listening handle. It is kept only so that code
replacing it keeps being called by `server.listen()`, and it will be
removed in a future version of Node.js. Use `server.listen()` instead of
calling or overriding `_listen2`.

### DEP0209: Using `AbortSignal` to dispose of resources

Type: Documentation-only

Using `AbortSignal` to destroy long-lived resources is deprecated. Prefer
`using` for resource cleanup.

`AbortSignal` is still a good fit for canceling actions, propagating
cancellation from the outside, and timeouts.

```js
// Deprecated
async function example() {
  const ac = new AbortController();
  const server = http.createServer(handler);
  server.listen({ port: 3000, signal: ac.signal });

  await doWork();
  ac.abort();
}
```

```js
// Use this instead
async function example() {
  await using server = http.createServer(handler);
  server.listen(3000);

  await doWork();
}
```

```js
// Deprecated
async function example() {
  const ac = new AbortController();
  const stream = addAbortSignal(ac.signal, fs.createReadStream(file));

  await consume(stream);
  ac.abort();
}
```

```js
// Use this instead
async function example() {
  await using stream = fs.createReadStream(file);

  await consume(stream);
}
```

```js
// Deprecated
async function example() {
  const ac = new AbortController();
  const child = spawn(command, args, { signal: ac.signal });

  await doWork();
  ac.abort();
}
```

```js
// Use this instead
async function example() {
  using child = spawn(command, args);

  await doWork();
}
```

### DEP0210: `sqlite.DatabaseSync`

Type: Documentation-only

`node:sqlite`'s `DatabaseSync` class was renamed to `Database`. `DatabaseSync`
is kept as a deprecated alias. Use `Database` instead.

### DEP0211: `sqlite.StatementSync`

Type: Documentation-only

`node:sqlite`'s `StatementSync` class was renamed to `Statement`.
`StatementSync` is kept as a deprecated alias. Use `Statement` instead.
