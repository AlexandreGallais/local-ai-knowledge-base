---
title: "Command-line API (part 5 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/cli.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Command-line API (part 5 of 10)

### `--insecure-http-parser`

Enable leniency flags on the HTTP parser. This may allow
interoperability with non-conformant HTTP implementations.

When enabled, the parser will accept the following:

* Invalid HTTP headers values.
* Invalid HTTP versions.
* Allow message containing both `Transfer-Encoding`
  and `Content-Length` headers.
* Allow extra data after message when `Connection: close` is present.
* Allow extra transfer encodings after `chunked` has been provided.
* Allow `\n` to be used as token <example-value> instead of `\r\n`.
* Allow `\r\n` not to be provided after a chunk.
* Allow spaces to be present after a chunk size and before `\r\n`.

All the above will expose your application to request smuggling
or poisoning attack. Avoid using this option.

### `--inspect-brk[=[host:]port]`

Activate inspector on `host:port` and break at start of user script.
Default `host:port` is `127.0.0.1:9229`. If port `0` is specified,
a random available port will be used.

See V8 Inspector integration for Node.js for further explanation on Node.js debugger.

See the security warning below regarding the `host`
parameter usage.

### `--inspect-port=[host:]port`

Set the `host:port` to be used when the inspector is activated.
Useful when activating the inspector by sending the `SIGUSR1` signal.
Except when `--disable-sigusr1` is passed.

Default host is `127.0.0.1`. If port `0` is specified,
a random available port will be used.

See the security warning below regarding the `host`
parameter usage.

### `--inspect-publish-uid=stderr,http`

Specify ways of the inspector web socket url exposure.

By default inspector websocket url is available in stderr and under `/json/list`
endpoint on `http://host:port/json/list`.

### `--inspect-wait[=[host:]port]`

Activate inspector on `host:port` and wait for debugger to be attached.
Default `host:port` is `127.0.0.1:9229`. If port `0` is specified,
a random available port will be used.

See V8 Inspector integration for Node.js for further explanation on Node.js debugger.

See the security warning below regarding the `host`
parameter usage.

### `--inspect[=[host:]port]`

Activate inspector on `host:port`. Default is `127.0.0.1:9229`. If port `0` is
specified, a random available port will be used.

V8 inspector integration allows tools such as Chrome DevTools and IDEs to debug
and profile Node.js instances. The tools attach to Node.js instances via a
tcp port and communicate using the Chrome DevTools Protocol.
See V8 Inspector integration for Node.js for further explanation on Node.js debugger.

#### Warning: binding inspector to a public IP:port combination is insecure

Binding the inspector to a public IP (including `0.0.0.0`) with an open port is
insecure, as it allows external hosts to connect to the inspector and perform
a remote code execution attack.

If specifying a host, make sure that either:

* The host is not accessible from public networks.
* A firewall disallows unwanted connections on the port.

**More specifically, `--inspect=0.0.0.0` is insecure if the port (`9229` by
default) is not firewall-protected.**

See the debugging security implications section for more information.

### `-i`, `--interactive`

Opens the REPL even if stdin does not appear to be a terminal.

### `--jitless`

> Stability: 1 - Experimental. This flag is inherited from V8 and is subject to
> change upstream.

Disable runtime allocation of executable memory. This may be
required on some platforms for security reasons. It can also reduce attack
surface on other platforms, but the performance impact may be severe.

When WebAssembly is unavailable in this mode, TypeScript parsing and WebAssembly
module imports throw `ERR_WEBASSEMBLY_NOT_SUPPORTED`. Node.js does not
guarantee alternative implementations of features that require WebAssembly or
runtime allocation of executable memory when those capabilities are unavailable.

This flag controls V8's runtime code generation. It does not impose an
operating-system restriction on executable memory allocated by native addons or
`node:ffi`. FFI operations that require unavailable executable memory can
throw `ERR_RX_MEMORY_NOT_SUPPORTED`.

### `--localstorage-file=file`

> Stability: 1.2 - Release candidate.

The file used to store `localStorage` data. If the file does not exist, it is
created the first time `localStorage` is accessed. The same file may be shared
between multiple Node.js processes concurrently.

### `--max-http-header-size=size`

Specify the maximum size, in bytes, of HTTP headers. Defaults to 16 KiB.

### `--max-old-space-size-percentage=percentage`

Sets the maximum memory size of V8's old memory section as a percentage of available system memory.
This flag takes precedence over `--max-old-space-size` when both are specified.

The `percentage` parameter must be a number greater than 0 and up to 100, representing the percentage
of available system memory to allocate to the V8 heap.

**Note:** This flag utilizes `--max-old-space-size`, which may be unreliable on 32-bit platforms due to
integer overflow issues.

```bash
# Using 50% of available system memory
node --max-old-space-size-percentage=50 index.js

# Using 75% of available system memory
node --max-old-space-size-percentage=75 index.js
```

### `--network-family-autoselection-attempt-timeout`

Sets the default value for the network family autoselection attempt timeout.
For more information, see `net.getDefaultAutoSelectFamilyAttemptTimeout()`.

### `--no-addons`

Disable the `node-addons` exports condition as well as disable loading
native addons. When `--no-addons` is specified, calling `process.dlopen` or
requiring a native C++ addon will fail and throw an exception.

### `--no-async-context-frame`

Disables the use of `AsyncLocalStorage` backed by `AsyncContextFrame` and
uses the prior implementation which relied on async\_hooks. The previous model
is retained for compatibility with Electron and for cases where the context
flow may differ. However, if a difference in flow is found please report it.

### `--no-deprecation`

Silence deprecation warnings.

### `--no-experimental-detect-module`

Disable using syntax detection to determine module type.

### `--no-experimental-ffi`

> Stability: 1 - Experimental

Disable the experimental `node:ffi` module.

This flag is only available in builds with FFI support.

### `--no-experimental-global-navigator`

> Stability: 1 - Experimental

Disable exposition of Navigator API on the global scope.

### `--no-experimental-repl-await`

Use this flag to disable top-level await in REPL.

### `--no-experimental-require-module`

> Stability: 3 - Legacy: Use `--no-require-module` instead.

Legacy alias for `--no-require-module`.

### `--no-experimental-sqlite`

Disable the experimental `node:sqlite` module.

### `--no-experimental-websocket`

Disable exposition of {WebSocket} on the global scope.

### `--no-experimental-webstorage`

> Stability: 1.2 - Release candidate.

Disable `Web Storage` support.

### `--no-extra-info-on-fatal-exception`

Hide extra information on fatal exception that causes exit.

### `--no-force-async-hooks-checks`

Disables runtime checks for `async_hooks`. These will still be enabled
dynamically when `async_hooks` is enabled.

### `--no-global-search-paths`

Do not search modules from global paths like `$HOME/.node_modules` and
`$NODE_PATH`.

### `--no-network-family-autoselection`

Disables the family autoselection algorithm unless connection options explicitly
enables it.

### `--no-require-module`

Disable support for loading a synchronous ES module graph in `require()`.

See Loading ECMAScript modules using `require()`.

### `--no-strip-types`

Disable type-stripping for TypeScript files.
For more information, see the TypeScript type-stripping documentation.

### `--no-warnings`

Silence all process warnings (including deprecations).

### `--no-worker-snapshot`

> Stability: 1 - Experimental

Start worker threads by running the internal bootstrap from scratch instead of
deserializing the bootstrapped context from the built-in startup snapshot.

### `--node-memory-debug`

Enable extra debug checks for memory leaks in Node.js internals. This is
usually only useful for developers debugging Node.js itself.

### `--openssl-config=file`

Load an OpenSSL configuration file on startup. The file can activate an
OpenSSL 3 FIPS provider or configure a FIPS-capable OpenSSL 1.1.1 build. See
FIPS mode.

This option takes precedence over the `OPENSSL_CONF` environment variable.

### `--openssl-legacy-provider`

Enable OpenSSL 3.0 legacy provider. For more information please see
OSSL\_PROVIDER-legacy.

### `--openssl-shared-config`

Enable OpenSSL default configuration section, `openssl_conf` to be read from
the OpenSSL configuration file. The default configuration file is named
`openssl.cnf` but this can be changed using the environment variable
`OPENSSL_CONF`, or by using the command line option `--openssl-config`.
The location of the default OpenSSL configuration file depends on how OpenSSL
is being linked to Node.js. Sharing the OpenSSL configuration may have unwanted
implications and it is recommended to use a configuration section specific to
Node.js which is `nodejs_conf` and is default when this option is not used.

### `--pending-deprecation`

Emit pending deprecation warnings.

Pending deprecations are generally identical to a runtime deprecation with the
notable exception that they are turned _off_ by default and will not be emitted
unless either the `--pending-deprecation` command-line flag, or the
`NODE_PENDING_DEPRECATION=1` environment variable, is set. Pending deprecations
are used to provide a kind of selective "early warning" mechanism that
developers may leverage to detect deprecated API usage.

### `--permission`

Enable the Permission Model for current process. When enabled, the
following permissions are restricted:

> See also `--permission-audit` for an audit-only mode
> that logs violations without denying access.

* File System - manageable through
  `--allow-fs-read`, `--allow-fs-write` flags
* Network - manageable through `--allow-net` flag
* Child Process - manageable through `--allow-child-process` flag
* Worker Threads - manageable through `--allow-worker` flag
* WASI - manageable through `--allow-wasi` flag
* Addons - manageable through `--allow-addons` flag
* FFI - manageable through `--allow-ffi` flag
* OpenSSL STORE loaders - manageable through `--allow-openssl-store` flag

### `--permission-audit`

Enable audit mode for the permission model. When enabled, permission checks
are performed but access is **not** denied — no `ERR_ACCESS_DENIED` error is
thrown. Instead, each permission violation is published through the
`node:diagnostics_channel` module, and execution continues normally.

This flag does not require `--permission` to be specified. The
`--allow-*` flags are not needed in audit mode, since no
access is denied.

Audit mode is useful for discovering what permissions your application
requires before deploying with `--permission`. See the
Permission Model documentation for the list of diagnostics channel names
and the message format.

If both `--permission` and `--permission-audit` are specified,
`--permission` takes precedence and the Permission Model runs in enforce mode.

### `--preserve-symlinks`

Instructs the module loader to preserve symbolic links when resolving and
caching modules.

By default, when Node.js loads a module from a path that is symbolically linked
to a different on-disk location, Node.js will dereference the link and use the
actual on-disk "real path" of the module as both an identifier and as a root
path to locate other dependency modules. In most cases, this default behavior
is acceptable. However, when using symbolically linked peer dependencies, as
illustrated in the example below, the default behavior causes an exception to
be thrown if `moduleA` attempts to require `moduleB` as a peer dependency:

```text
{appDir}
 ├── app
 │   ├── index.js
 │   └── node_modules
 │       ├── moduleA -> {appDir}/moduleA
 │       └── moduleB
 │           ├── index.js
 │           └── package.json
 └── moduleA
     ├── index.js
     └── package.json
```

The `--preserve-symlinks` command-line flag instructs Node.js to use the
symlink path for modules as opposed to the real path, allowing symbolically
linked peer dependencies to be found.

Note, however, that using `--preserve-symlinks` can have other side effects.
Specifically, symbolically linked _native_ modules can fail to load if those
are linked from more than one location in the dependency tree (Node.js would
see those as two separate modules and would attempt to load the module multiple
times, causing an exception to be thrown).

The `--preserve-symlinks` flag does not apply to the main module, which allows
`node --preserve-symlinks node_module/.bin/<foo>` to work. To apply the same
behavior for the main module, also use `--preserve-symlinks-main`.

### `--preserve-symlinks-main`

Instructs the module loader to preserve symbolic links when resolving and
caching the main module (`require.main`).

This flag exists so that the main module can be opted-in to the same behavior
that `--preserve-symlinks` gives to all other imports; they are separate flags,
however, for backward compatibility with older Node.js versions.

`--preserve-symlinks-main` does not imply `--preserve-symlinks`; use
`--preserve-symlinks-main` in addition to
`--preserve-symlinks` when it is not desirable to follow symlinks before
resolving relative paths.

See `--preserve-symlinks` for more information.

### `-p`, `--print "script"`

Identical to `-e` but prints the result.
