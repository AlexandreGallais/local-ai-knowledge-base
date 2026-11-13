---
title: "Command-line API (part 2 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/cli.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Command-line API (part 2 of 10)

## Options

> Stability: 2 - Stable

All options, including V8 options, allow words to be separated by both
dashes (`-`) or underscores (`_`). For example, `--pending-deprecation` is
equivalent to `--pending_deprecation`.

If an option that takes a single value (such as `--max-http-header-size`) is
passed more than once, then the last passed value is used. Options from the
command line take precedence over options passed through the `NODE_OPTIONS`
environment variable.

### `-`

Alias for stdin. Analogous to the use of `-` in other command-line utilities,
meaning that the script is read from stdin, and the rest of the options
are passed to that script.

### `--`

Indicate the end of node options. Pass the rest of the arguments to the script.
If no script filename or eval/print script is supplied prior to this, then
the next argument is used as a script filename.

### `--abort-on-uncaught-exception`

Aborting instead of exiting causes a core file to be generated for post-mortem
analysis using a debugger (such as `lldb`, `gdb`, and `mdb`).

If this flag is passed, the behavior can still be set to not abort through
`process.setUncaughtExceptionCaptureCallback()` (and through usage of the
`node:domain` module that uses it).

### `--allow-addons`

> Stability: 1.1 - Active development

When using the Permission Model, the process will not be able to use
native addons by default.
Attempts to do so will throw an `ERR_DLOPEN_DISABLED` unless the
user explicitly passes the `--allow-addons` flag when starting Node.js.

Example:

```cjs
// Attempt to require an native addon
require('nodejs-addon-example');
```

```console
$ node --permission --allow-fs-read=* index.js
node:internal/modules/cjs/loader:1319
  return process.dlopen(module, path.toNamespacedPath(filename));
                 ^

Error: Cannot load native addon because loading addons is disabled.
    at Module._extensions..node (node:internal/modules/cjs/loader:1319:18)
    at Module.load (node:internal/modules/cjs/loader:1091:32)
    at Module._load (node:internal/modules/cjs/loader:938:12)
    at Module.require (node:internal/modules/cjs/loader:1115:19)
    at require (node:internal/modules/helpers:130:18)
    at Object.<anonymous> (/home/index.js:1:15)
    at Module._compile (node:internal/modules/cjs/loader:1233:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1287:10)
    at Module.load (node:internal/modules/cjs/loader:1091:32)
    at Module._load (node:internal/modules/cjs/loader:938:12) {
  code: 'ERR_DLOPEN_DISABLED'
}
```

### `--allow-child-process`

> Stability: 1.1 - Active development

When using the Permission Model, the process will not be able to spawn any
child process by default.
Attempts to do so will throw an `ERR_ACCESS_DENIED` unless the
user explicitly passes the `--allow-child-process` flag when starting Node.js.

Example:

```js
const childProcess = require('node:child_process');
// Attempt to bypass the permission
childProcess.spawn('node', ['-e', 'require("fs").writeFileSync("/new-file", "example")']);
```

```console
$ node --permission --allow-fs-read=* index.js
node:internal/child_process:388
  const err = this._handle.spawn(options);
                           ^
Error: Access to this API has been restricted
    at ChildProcess.spawn (node:internal/child_process:388:28)
    at node:internal/main/run_main_module:17:47 {
  code: 'ERR_ACCESS_DENIED',
  permission: 'ChildProcess'
}
```

The `child_process.fork()` API inherits the execution arguments from the
parent process. This means that if Node.js is started with the Permission
Model enabled and the `--allow-child-process` flag is set, any child process
created using `child_process.fork()` will automatically receive all relevant
Permission Model flags.

This behavior also applies to `child_process.spawn()`, but in that case, the
flags are propagated via the `NODE_OPTIONS` environment variable rather than
directly through the process arguments.

### `--allow-ffi`

> Stability: 1.1 - Active development

When using the Permission Model, the process will not be able to use FFI
APIs by default. Attempts to use FFI APIs will throw an `ERR_ACCESS_DENIED`
exception unless the user explicitly passes the `--allow-ffi` flag when
starting Node.js. The `node:ffi` module is only available in builds with
FFI support.

Example:

```js
const { DynamicLibrary, suffix } = require('node:ffi');
const lib = new DynamicLibrary(`./mylib.${suffix}`);
```

```console
$ node --permission index.js
Error: Access to this API has been restricted. Use --allow-ffi to manage permissions.
    at node:internal/main/run_main_module:17:47 {
  code: 'ERR_ACCESS_DENIED',
  permission: 'FFI'
}
```

### `--allow-fs-read`

This flag configures file system read permissions using
the Permission Model.

The valid arguments for the `--allow-fs-read` flag are:

* `*` - To allow all `FileSystemRead` operations.
* Multiple paths can be allowed using multiple `--allow-fs-read` flags.
  Example `--allow-fs-read=/folder1/ --allow-fs-read=/folder2/`

Examples can be found in the File System Permissions documentation.

The initializer module and custom `--require` modules has a implicit
read permission.

```console
$ node --permission -r custom-require.js -r custom-require-2.js index.js
```

* The `custom-require.js`, `custom-require-2.js`, and `index.js` will be
  by default in the allowed read list.

```js
process.permission.has('fs.read', 'index.js'); // true
process.permission.has('fs.read', 'custom-require.js'); // true
process.permission.has('fs.read', 'custom-require-2.js'); // true
```

### `--allow-fs-vfs`

> Stability: 1.1 - Active development

When using the Permission Model, a virtual file system cannot be
mounted by default: `vfs.mount()` throws `ERR_INVALID_STATE` unless the
user explicitly passes the `--allow-fs-vfs` flag when starting Node.js.

A mounted VFS serves paths that the file system permissions do not describe,
so mounting one is gated on its own flag rather than on `--allow-fs-read` or
`--allow-fs-write`.

```console
$ node --experimental-vfs --permission --allow-fs-vfs app.js
```

### `--allow-fs-write`

This flag configures file system write permissions using
the Permission Model.

The valid arguments for the `--allow-fs-write` flag are:

* `*` - To allow all `FileSystemWrite` operations.
* Multiple paths can be allowed using multiple `--allow-fs-write` flags.
  Example `--allow-fs-write=/folder1/ --allow-fs-write=/folder2/`

Paths delimited by comma (`,`) are no longer allowed.
When passing a single flag with a comma a warning will be displayed.

Examples can be found in the File System Permissions documentation.

### `--allow-inspector`

> Stability: 1.0 - Early development

When using the Permission Model, the process will not be able to connect
through inspector protocol.

Attempts to do so will throw an `ERR_ACCESS_DENIED` unless the
user explicitly passes the `--allow-inspector` flag when starting Node.js.

Example:

```js
const { Session } = require('node:inspector/promises');

const session = new Session();
session.connect();
```

```console
$ node --permission index.js
Error: connect ERR_ACCESS_DENIED Access to this API has been restricted. Use --allow-inspector to manage permissions.
  code: 'ERR_ACCESS_DENIED',
}
```

### `--allow-net`

> Stability: 1.1 - Active development

When using the Permission Model, the process will not be able to access
network by default.
Attempts to do so will throw an `ERR_ACCESS_DENIED` unless the
user explicitly passes the `--allow-net` flag when starting Node.js.

Example:

```js
const http = require('node:http');
// Attempt to bypass the permission
const req = http.get('http://example.com', () => {});

req.on('error', (err) => {
  console.log('err', err);
});
```

```console
$ node --permission index.js
Error: connect ERR_ACCESS_DENIED Access to this API has been restricted. Use --allow-net to manage permissions.
  code: 'ERR_ACCESS_DENIED',
}
```

### `--allow-openssl-store`

> Stability: 1.1 - Active development

When using the Permission Model, the process will not be able to use
OpenSSL STORE loaders by default, for example to load a private key from a
{URL} passed to `crypto.createPrivateKey()`. Attempts to do so will throw
an `ERR_ACCESS_DENIED` unless the user explicitly passes the
`--allow-openssl-store` flag. This permission can be dropped at runtime via
`permission.drop()`.

This flag grants broad authority to configured OpenSSL STORE loaders. A loader
may access files, devices, tokens, or the network. Access performed by a loader
is not constrained by the `fs.read`, `fs.write`, or `net` permission scopes.

### `--allow-wasi`

> Stability: 1.1 - Active development

When using the Permission Model, the process will not be capable of creating
any WASI instances by default.
For security reasons, the call will throw an `ERR_ACCESS_DENIED` unless the
user explicitly passes the flag `--allow-wasi` in the main Node.js process.

Example:

```js
const { WASI } = require('node:wasi');
// Attempt to bypass the permission
new WASI({
  version: 'preview1',
  // Attempt to mount the whole filesystem
  preopens: {
    '/': '/',
  },
});
```

```console
$ node --permission --allow-fs-read=* index.js

Error: Access to this API has been restricted
    at node:internal/main/run_main_module:30:49 {
  code: 'ERR_ACCESS_DENIED',
  permission: 'WASI',
}
```

### `--allow-worker`

> Stability: 1.1 - Active development

When using the Permission Model, the process will not be able to create any
worker threads by default.
For security reasons, the call will throw an `ERR_ACCESS_DENIED` unless the
user explicitly pass the flag `--allow-worker` in the main Node.js process.

Example:

```js
const { Worker } = require('node:worker_threads');
// Attempt to bypass the permission
new Worker(__filename);
```

```console
$ node --permission --allow-fs-read=* index.js

Error: Access to this API has been restricted
    at node:internal/main/run_main_module:17:47 {
  code: 'ERR_ACCESS_DENIED',
  permission: 'WorkerThreads'
}
```

### `--bench`

> Stability: 1 - Experimental

Starts the Node.js command-line benchmark runner. At least one explicit file or
glob pattern is required:

```console
node --experimental-bench --bench benchmark.mjs
node --experimental-bench --bench 'benchmarks/**/*.js'
```

The `--experimental-bench` flag is required to use this flag or any other
`--bench-*` option.

Quote glob patterns to prevent expansion by the shell. Matching files are
sorted and executed serially. By default, each file runs in a separate child
process. Benchmark files declare benchmarks using `node:bench`; they must not
call `run()` themselves. See the benchmark runner documentation for more
details.

This flag cannot be combined with `--test`, `--watch`, `--watch-path`,
`--check`, `--eval`, or `--interactive`.

### `--bench-isolation=mode`

> Stability: 1 - Experimental

Configures benchmark file isolation. When `mode` is `'process'`, each matching
file runs in a separate child process. This is the default. Files are still run
serially so their measured work does not overlap.

When `mode` is `'none'`, all matching files and benchmarks run serially in the
benchmark runner process. This reduces startup overhead but allows module,
heap, and process state to carry between files. User writes to stdout or stderr
also share destinations with benchmark reporters in this mode.

The supported modes are `'process'` and `'none'`.

### `--bench-name-pattern=pattern`

> Stability: 1 - Experimental

Only runs benchmarks whose full hierarchical name matches the JavaScript
regular expression `pattern`. Non-matching benchmarks are reported as skipped.

### `--bench-reporter-destination=destination`

> Stability: 1 - Experimental

Specifies the destination for the corresponding benchmark reporter. The value
can be `stdout`, `stderr`, or a file path. A single reporter defaults to
`stdout` when no destination is specified.

### `--bench-reporter=reporter`

> Stability: 1 - Experimental

Specifies a benchmark reporter. The built-in reporters are `spec` and `json`.
The `json` reporter emits newline-delimited JSON. A custom reporter can be
specified using a module specifier resolved from the current working directory.

This option can be repeated. When multiple reporters are specified, each must
have a corresponding `--bench-reporter-destination`. The default reporter is
`spec`.

### `--bench-samples=count`

> Stability: 1 - Experimental

Overrides the maximum number of measured callback invocations for every
selected benchmark. A benchmark may finish earlier by calling
`context.done()`. `count` must be an integer between `1` and `4294967295`.

### `--bench-warmup=count`

> Stability: 1 - Experimental

Overrides the number of unreported warmup callback invocations for every
selected benchmark. `count` must be an integer between `0` and `4294967295`.
Without this option, each benchmark uses its own `warmup` value, which defaults
to `10`.

### `--build-sea=config`

> Stability: 1.1 - Active development

Generates a single executable application from a JSON
configuration file. The argument must be a path to the configuration file. If
the path is not absolute, it is resolved relative to the current working
directory.

For configuration fields, cross-platform notes, and asset APIs, see
the single executable application documentation.
