---
title: "Command-line API (part 4 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/cli.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Command-line API (part 4 of 10)

### `--entry-url`

> Stability: 1 - Experimental

When present, Node.js will interpret the entry point as a URL, rather than a
path.

Follows ECMAScript module resolution rules.

Any query parameter or hash in the URL will be accessible via `import.meta.url`.

```bash
node --entry-url 'file:///path/to/file.js?queryparams=work#and-hashes-too'
node --entry-url 'file.ts?query#hash'
node --entry-url 'data:text/javascript,console.log("Hello")'
```

### `--env-file-if-exists=file`

Behavior is the same as `--env-file`, but an error is not thrown if the file
does not exist.

### `--env-file=file`

Loads environment variables from a file relative to the current directory,
making them available to applications on `process.env`. The environment
variables which configure Node.js, such as `NODE_OPTIONS`,
are parsed and applied. If the same variable is defined in the environment and
in the file, the value from the environment takes precedence.

You can pass <example-value> `--env-file` arguments. Subsequent files override
pre-existing variables defined in previous files.

An error is thrown if the file does not exist.

```bash
node --env-file=.env --env-file=.development.env index.js
```

The format of the file should be one line per key-value pair of environment
variable name and value separated by `=`:

```text
PORT=3000
```

Any text after a `#` is treated as a comment:

```text
# This is a comment
PORT=3000 # This is also a comment
```

Values can start and end with the following quotes: `` ` ``, `"` or `'`.
They are omitted from the values.

```text
USERNAME="nodejs" # will result in `nodejs` as the value.
```

Multi-line values are supported:

```text
MULTI_LINE="THIS IS
A MULTILINE"
# will result in `THIS IS\nA MULTILINE` as the value.
```

Export keyword before a key is ignored:

```text
export USERNAME="nodejs" # will result in `nodejs` as the value.
```

If you want to load environment variables from a file that may not exist, you
can use the `--env-file-if-exists` flag instead.

### `-e`, `--eval "script"`

Evaluate the following argument as JavaScript. The modules which are
predefined in the REPL can also be used in `script`.

If `script` starts with `-`, pass it using `=` (for example,
`node --print --eval=-42`) so it is parsed as the value of `--eval`.

On Windows, using `cmd.exe` a single quote will not work correctly because it
only recognizes double `"` for quoting. In Powershell or Git bash, both `'`
and `"` are usable.

It is possible to run code containing inline types unless the
`--no-strip-types` flag is provided.

### `--experimental-addon-modules`

> Stability: 1.2 - Release candidate

Enable experimental import support for `.node` addons.

### `--experimental-bench`

> Stability: 1 - Experimental

Enable the experimental `node:bench` module and command-line benchmark runner.

### `--experimental-dtls`

> Stability: 1 - Experimental

Enable experimental support for the DTLS protocol. See the
dtls documentation for details.

### `--experimental-eventsource`

Enable exposition of EventSource Web API on the global scope.

### `--experimental-import-meta-resolve`

Enable experimental `import.meta.resolve()` parent URL support, which allows
passing a second `parentURL` argument for contextual resolution.

Previously gated the entire `import.meta.resolve` feature.

### `--experimental-import-text`

> Stability: 1.0 - Early development

Enable experimental support for importing modules with
`with { type: 'text' }`.

### `--experimental-inspector-network-resource`

> Stability: 1.1 - Active Development

Enable experimental support for inspector network resources.

### `--experimental-loader=module`

> This flag is discouraged and may be removed in a future version of Node.js.
> Please use
> `--import` with `register()` instead.

Specify the `module` containing exported asynchronous module customization hooks.
`module` may be any string accepted as an `import` specifier.

This feature requires `--allow-worker` if used with the Permission Model.

### `--experimental-network-inspection`

> Stability: 1 - Experimental

Enable experimental support for the network inspection with Chrome DevTools.

### `--experimental-package-map=`

> Stability: 1 - Experimental

Enable experimental package map resolution. The `path` argument specifies the
location of a JSON configuration file that defines package resolution mappings.

```bash
node --experimental-package-map=./package-map.json app.js
```

When enabled, bare specifier resolution consults the package map for resolution.
This allows explicit control over which packages can import which dependencies.

See Package maps for details on the configuration file format and
resolution algorithm.

### `--experimental-print-required-tla`

If the ES module graph cannot be `require()`'d because it contains any top-level `await`,
this flag allows Node.js to locate and print their locations.

### `--experimental-quic`

> Stability: 1.1 - Active development

Enable experimental support for the QUIC protocol.

### `--experimental-sea-config`

> Stability: 1 - Experimental

Use this flag to generate a blob that can be injected into the Node.js
binary to produce a single executable application. See the documentation
about this configuration for details.

### `--experimental-shadow-realm`

Use this flag to enable ShadowRealm support.

### `--experimental-storage-inspection`

> Stability: 1.1 - Active Development

Enable experimental support for storage inspection

### `--experimental-stream-iter`

> Stability: 1 - Experimental

Enable the experimental `node:stream/iter` module.

### `--experimental-test-coverage`

When used in conjunction with the `node:test` module, a code coverage report is
generated as part of the test runner output. If no tests are run, a coverage
report is not generated. See the documentation on
collecting code coverage from tests for more details.

### `--experimental-test-module-mocks`

> Stability: 1.0 - Early development

Enable module mocking in the test runner.

This feature requires `--allow-worker` if used with the Permission Model.

### `--experimental-test-tag-filter='<expr>'`

> Stability: 1.0 - Early development

Run only tests that match the provided boolean tag-filter expression. Tests
declare tags via the `tags` option on `test()`, `it()`, `suite()`, or
`describe()`. Tags inherit from suites to nested tests by union.

The expression supports boolean operators (`and`/`&&`, `or`/`||`,
`not`/`!`), parentheses for grouping, and `*` wildcards inside identifiers.
Standard precedence applies: `not` binds tighter than `and`, which binds
tighter than `or`. See Test tags for the full grammar and behavior.

The flag may be specified more than once; multiple expressions are combined
with AND, so a test must satisfy every expression to run.

A malformed expression causes the test runner to exit with a non-zero status
before running any tests.

### `--experimental-vfs`

> Stability: 1 - Experimental

Enable the experimental `node:vfs` module.

### `--experimental-vm-modules`

Enable experimental ES Module support in the `node:vm` module.

### `--experimental-wasi-unstable-preview1`

Enable experimental WebAssembly System Interface (WASI) support.

### `--experimental-web-worker`

Enable experimental support for the Web Worker API.

### `--experimental-worker-inspection`

> Stability: 1.1 - Active Development

Enable experimental support for the worker inspection with Chrome DevTools.

### `--force-context-aware`

Disable loading native addons that are not context-aware.

### `--force-fips[=mode]`

Enable FIPS mode at startup and prevent it from being disabled from script
code. The same OpenSSL requirements as `--enable-fips` apply.

An optional mode can be specified using `--force-fips=mode`:

* `provider`: Preserve the OpenSSL FIPS provider's configured handling of
  non-approved operations. This is the current default when the mode is
  omitted.
* `strict`: Reject non-approved operations reported through the OpenSSL FIPS
  indicator callback. This mode requires OpenSSL 3.4 or later.

The `strict` mode only covers operations reported through the callback for
OpenSSL's default library context. It does not cover native addons that use
another `OSSL_LIB_CTX` or another copy of `libcrypto`, nor operation-specific
indicators that do not invoke the callback.

### `--force-node-api-uncaught-exceptions-policy`

Enforces `uncaughtException` event on Node-API asynchronous callbacks.

To prevent from an existing add-on from crashing the process, this flag is not
enabled by default. In the future, this flag will be enabled by default to
enforce the correct behavior.

### `--frozen-intrinsics`

> Stability: 1 - Experimental

Enable experimental frozen intrinsics like `Array` and `Object`.

Only the root context is supported. There is no guarantee that
`globalThis.Array` is indeed the default intrinsic reference. Code may break
under this flag.

To allow polyfills to be added,
`--require` and `--import` both run before freezing intrinsics.

### `--heap-prof`

Starts the V8 heap profiler on start up, and writes the heap profile to disk
before exit.

If `--heap-prof-dir` is not specified, the generated profile is placed
in the current working directory.

If `--heap-prof-name` is not specified, the generated profile is
named `Heap.${yyyymmdd}.${hhmmss}.${pid}.${tid}.${seq}.heapprofile`.

```console
$ node --heap-prof index.js
$ ls *.heapprofile
Heap.20190409.202950.15293.0.001.heapprofile
```

### `--heap-prof-dir`

Specify the directory where the heap profiles generated by `--heap-prof` will
be placed.

The default value is controlled by the
`--diagnostic-dir` command-line option.

### `--heap-prof-interval`

Specify the average sampling interval in bytes for the heap profiles generated
by `--heap-prof`. The default is 512 \* 1024 bytes.

### `--heap-prof-name`

Specify the file name of the heap profile generated by `--heap-prof`.

### `--heapsnapshot-near-heap-limit=max_count`

Writes a V8 heap snapshot to disk when the V8 heap usage is approaching the
heap limit. `count` should be a non-negative integer (in which case
Node.js will write no more than `max_count` snapshots to disk).

When generating snapshots, garbage collection may be triggered and bring
the heap usage down. Therefore multiple snapshots may be written to disk
before the Node.js instance finally runs out of memory. These heap snapshots
can be compared to determine what objects are being allocated during the
time consecutive snapshots are taken. It's not guaranteed that Node.js will
write exactly `max_count` snapshots to disk, but it will try
its best to generate at least one and up to `max_count` snapshots before the
Node.js instance runs out of memory when `max_count` is greater than `0`.

Generating V8 snapshots takes time and memory (both memory managed by the
V8 heap and native memory outside the V8 heap). The bigger the heap is,
the more resources it needs. Node.js will adjust the V8 heap to accommodate
the additional V8 heap memory overhead, and try its best to avoid using up
all the memory available to the process. When the process uses
more memory than the system deems appropriate, the process may be terminated
abruptly by the system, depending on the system configuration.

```console
$ node --max-old-space-size=100 --heapsnapshot-near-heap-limit=3 index.js
Wrote snapshot to Heap.20200430.100036.49580.0.001.heapsnapshot
Wrote snapshot to Heap.20200430.100037.49580.0.002.heapsnapshot
Wrote snapshot to Heap.20200430.100038.49580.0.003.heapsnapshot

<--- Last few GCs --->

[49580:0x110000000]     4826 ms: Mark-sweep 130.6 (147.8) -> 130.5 (147.8) MB, 27.4 / 0.0 ms  (average mu = 0.126, current mu = 0.034) allocation failure scavenge might not succeed
[49580:0x110000000]     4845 ms: Mark-sweep 130.6 (147.8) -> 130.6 (147.8) MB, 18.8 / 0.0 ms  (average mu = 0.088, current mu = 0.031) allocation failure scavenge might not succeed

<--- JS stacktrace --->

FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
....
```

### `--heapsnapshot-signal=signal`

Enables a signal handler that causes the Node.js process to write a heap dump
when the specified signal is received. `signal` must be a valid signal name.
Disabled by default.

```console
$ node --heapsnapshot-signal=SIGUSR2 index.js &
$ ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
node         1  5.5  6.1 787252 247004 ?       Ssl  16:43   0:02 node --heapsnapshot-signal=SIGUSR2 index.js
$ kill -USR2 1
$ ls
Heap.20190718.133405.15554.0.001.heapsnapshot
```

### `-h`, `--help`

Print node command-line options.
The output of this option is less detailed than this document.

### `--icu-data-dir=file`

Specify ICU data load path. (Overrides `NODE_ICU_DATA`.)

### `--import=module`

> Stability: 1 - Experimental

Preload the specified module at startup. If the flag is provided several times,
each module will be executed sequentially in the order they appear, starting
with the ones provided in `NODE_OPTIONS`.

Follows ECMAScript module resolution rules.
Use `--require` to load a CommonJS module.
Modules preloaded with `--require` will run before modules preloaded with `--import`.

Modules are preloaded into the main thread as well as any worker threads,
forked processes, or clustered processes.

### `--input-type=type`

This configures Node.js to interpret `--eval` or `STDIN` input as CommonJS or
as an ES module. Valid values are `"commonjs"`, `"module"`, `"module-typescript"` and `"commonjs-typescript"`.
The `"-typescript"` values are not available with the flag `--no-strip-types`.
The default is no value, or `"commonjs"` if `--no-experimental-detect-module` is passed.

If `--input-type` is not provided,
Node.js will try to detect the syntax with the following steps:

1. Run the input as CommonJS.
2. If step 1 fails, run the input as an ES module.
3. If step 2 fails with a SyntaxError, strip the types.
4. If step 3 fails with an error code `ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`
   or `ERR_INVALID_TYPESCRIPT_SYNTAX`,
   throw the error from step 2, including the TypeScript error in the message,
   else run as CommonJS.
5. If step 4 fails, run the input as an ES module.

To avoid the delay of multiple syntax detection passes, the `--input-type=type` flag can be used to specify
how the `--eval` input should be interpreted.

The REPL does not support this option. Usage of `--input-type=module` with
`--print` will throw an error, as `--print` does not support ES module
syntax.
