---
title: "Command-line API (part 9 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/cli.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Command-line API (part 9 of 10)

## Environment variables

> Stability: 2 - Stable

### `FORCE_COLOR=[1, 2, 3]`

The `FORCE_COLOR` environment variable is used to
enable ANSI colorized output. The value may be:

* `1`, `true`, or the empty string `''` indicate 16-color support,
* `2` to indicate 256-color support, or
* `3` to indicate 16 million-color support.

When `FORCE_COLOR` is used and set to a supported value, both the `NO_COLOR`,
and `NODE_DISABLE_COLORS` environment variables are ignored.

Any other value will result in colorized output being disabled.

### `NODE_COMPILE_CACHE=dir`

Enable the module compile cache for the Node.js instance. See the documentation of
module compile cache for details.

### `NODE_COMPILE_CACHE_PORTABLE=1`

When set to 1, the module compile cache can be reused across different directory
locations as long as the module layout relative to the cache directory remains the same,
and by any user (the cache subdirectory is not suffixed with the creating user's uid).

### `NODE_COMPILE_CACHE_READONLY=1`

When set to 1, the module compile cache only reads existing entries from
its directory: nothing is written to it and it is not created if missing.

### `NODE_DEBUG=module[,…]`

`','`-separated list of core modules that should print debug information.

### `NODE_DEBUG_NATIVE=module[,…]`

`','`-separated list of core C++ modules that should print debug information.

### `NODE_DISABLE_COLORS=1`

When set, colors will not be used in the REPL.

### `NODE_DISABLE_COMPILE_CACHE=1`

> Stability: 1.1 - Active Development

Disable the module compile cache for the Node.js instance. See the documentation of
module compile cache for details.

### `NODE_EXTRA_CA_CERTS=file`

When set, the well known "root" CAs (like VeriSign) will be extended with the
extra certificates in `file`. The file should consist of one or more trusted
certificates in PEM format. A message will be emitted (once) with
`process.emitWarning()` if the file is missing or
malformed, but any errors are otherwise ignored.

Neither the well known nor extra certificates are used when the `ca`
options property is explicitly specified for a TLS or HTTPS client or server.

This environment variable is ignored when `node` runs as setuid root or
has Linux file capabilities set.

The `NODE_EXTRA_CA_CERTS` environment variable is only read when the Node.js
process is first launched. Changing the value at runtime using
`process.env.NODE_EXTRA_CA_CERTS` has no effect on the current process.

### `NODE_ICU_DATA=file`

Data path for ICU (`Intl` object) data. Will extend linked-in data when compiled
with small-icu support.

### `NODE_NO_WARNINGS=1`

When set to `1`, process warnings are silenced.

### `NODE_OPTIONS=options...`

A space-separated list of command-line options. `options...` are interpreted
before command-line options, so command-line options will override or
compound after anything in `options...`. Node.js will exit with an error if
an option that is not allowed in the environment is used, such as `-p` or a
script file.

If an option value contains a space, it can be escaped using double quotes:

```bash
NODE_OPTIONS='--require "./my path/file.js"'
```

A singleton flag passed as a command-line option will override the same flag
passed into `NODE_OPTIONS`:

```bash
# The inspector will be available on port 5555
NODE_OPTIONS='--inspect=localhost:4444' node --inspect=localhost:5555
```

A flag that can be passed multiple times will be treated as if its
`NODE_OPTIONS` instances were passed first, and then its command-line
instances afterwards:

```bash
NODE_OPTIONS='--require "./a.js"' node --require "./b.js"
# is equivalent to:
node --require "./a.js" --require "./b.js"
```

Node.js options that are allowed are in the following list. If an option
supports both --XX and --no-XX variants, they are both supported but only
one is included in the list below.

* `--allow-addons`
* `--allow-child-process`
* `--allow-ffi`
* `--allow-fs-read`
* `--allow-fs-vfs`
* `--allow-fs-write`
* `--allow-inspector`
* `--allow-net`
* `--allow-openssl-store`
* `--allow-wasi`
* `--allow-worker`
* `--bench-isolation`
* `--bench-name-pattern`
* `--bench-reporter-destination`
* `--bench-reporter`
* `--bench-samples`
* `--bench-warmup`
* `--conditions`, `-C`
* `--cpu-prof-dir`
* `--cpu-prof-interval`
* `--cpu-prof-name`
* `--cpu-prof`
* `--diagnostic-dir`
* `--disable-proto`
* `--disable-sigusr1`
* `--disable-warning`
* `--disable-wasm-trap-handler`
* `--dns-result-order`
* `--enable-fips-indicator-events`
* `--enable-fips`
* `--enable-network-family-autoselection`
* `--enable-source-maps`
* `--entry-url`
* `--experimental-abortcontroller`
* `--experimental-addon-modules`
* `--experimental-bench`
* `--experimental-detect-module`
* `--experimental-dtls`
* `--experimental-eventsource`
* `--experimental-import-meta-resolve`
* `--experimental-import-text`
* `--experimental-json-modules`
* `--experimental-loader`
* `--experimental-modules`
* `--experimental-package-map`
* `--experimental-print-required-tla`
* `--experimental-quic`
* `--experimental-require-module`
* `--experimental-shadow-realm`
* `--experimental-specifier-resolution`
* `--experimental-stream-iter`
* `--experimental-test-isolation`
* `--experimental-top-level-await`
* `--experimental-vfs`
* `--experimental-vm-modules`
* `--experimental-wasi-unstable-preview1`
* `--experimental-web-worker`
* `--force-context-aware`
* `--force-fips`
* `--force-node-api-uncaught-exceptions-policy`
* `--frozen-intrinsics`
* `--heap-prof-dir`
* `--heap-prof-interval`
* `--heap-prof-name`
* `--heap-prof`
* `--heapsnapshot-near-heap-limit`
* `--heapsnapshot-signal`
* `--http-parser`
* `--icu-data-dir`
* `--import`
* `--input-type`
* `--insecure-http-parser`
* `--inspect-brk`
* `--inspect-port`, `--debug-port`
* `--inspect-publish-uid`
* `--inspect-wait`
* `--inspect`
* `--localstorage-file`
* `--max-http-header-size`
* `--max-old-space-size-percentage`
* `--network-family-autoselection-attempt-timeout`
* `--no-addons`
* `--no-async-context-frame`
* `--no-deprecation`
* `--no-experimental-ffi`
* `--no-experimental-global-navigator`
* `--no-experimental-repl-await`
* `--no-experimental-sqlite`
* `--no-experimental-strip-types`
* `--no-experimental-websocket`
* `--no-experimental-webstorage`
* `--no-extra-info-on-fatal-exception`
* `--no-force-async-hooks-checks`
* `--no-global-search-paths`
* `--no-network-family-autoselection`
* `--no-strip-types`
* `--no-warnings`
* `--no-webstorage`
* `--no-worker-snapshot`
* `--node-memory-debug`
* `--openssl-config`
* `--openssl-legacy-provider`
* `--openssl-shared-config`
* `--pending-deprecation`
* `--permission-audit`
* `--permission`
* `--preserve-symlinks-main`
* `--preserve-symlinks`
* `--prof-process`
* `--redirect-warnings`
* `--report-compact`
* `--report-dir`, `--report-directory`
* `--report-exclude-env`
* `--report-exclude-network`
* `--report-filename`
* `--report-on-fatalerror`
* `--report-on-signal`
* `--report-signal`
* `--report-uncaught-exception`
* `--require-module`
* `--require`, `-r`
* `--secure-heap-min`
* `--secure-heap`
* `--snapshot-blob`
* `--test-coverage-branches`
* `--test-coverage-exclude`
* `--test-coverage-functions`
* `--test-coverage-include-all`
* `--test-coverage-include`
* `--test-coverage-lines`
* `--test-global-setup`
* `--test-isolation`
* `--test-name-pattern`
* `--test-only`
* `--test-random-seed`
* `--test-randomize`
* `--test-reporter-destination`
* `--test-reporter`
* `--test-rerun-failures`
* `--test-shard`
* `--test-skip-pattern`
* `--throw-deprecation`
* `--title`
* `--tls-cipher-list`
* `--tls-keylog`
* `--tls-max-v1.2`
* `--tls-max-v1.3`
* `--tls-min-v1.0`
* `--tls-min-v1.1`
* `--tls-min-v1.2`
* `--tls-min-v1.3`
* `--trace-deprecation`
* `--trace-env-js-stack`
* `--trace-env-native-stack`
* `--trace-env`
* `--trace-event-categories`
* `--trace-event-file-pattern`
* `--trace-events-enabled`
* `--trace-exit`
* `--trace-require-module`
* `--trace-sigint`
* `--trace-sync-io`
* `--trace-tls`
* `--trace-uncaught`
* `--trace-warnings`
* `--track-heap-objects`
* `--unhandled-rejections`
* `--use-bundled-ca`
* `--use-env-proxy`
* `--use-largepages`
* `--use-openssl-ca`
* `--use-system-ca`
* `--v8-pool-size`
* `--watch-kill-signal`
* `--watch-path`
* `--watch-preserve-output`
* `--watch`
* `--zero-fill-buffers`

V8 options that are allowed are:

* `--abort-on-uncaught-exception`
* `--disallow-code-generation-from-strings`
* `--enable-etw-stack-walking`
* `--expose-gc`
* `--interpreted-frames-native-stack`
* `--jitless`
* `--max-heap-size`
* `--max-old-space-size`
* `--max-semi-space-size`
* `--perf-basic-prof-only-functions`
* `--perf-basic-prof`
* `--perf-prof-unwinding-info`
* `--perf-prof`
* `--stack-trace-limit`

`--perf-basic-prof-only-functions`, `--perf-basic-prof`,
`--perf-prof-unwinding-info`, and `--perf-prof` are only available on Linux.

`--enable-etw-stack-walking` is only available on Windows.

### `NODE_PATH=path[:…]`

`':'`-separated list of directories prefixed to the module search path.

On Windows, this is a `';'`-separated list instead.

### `NODE_PENDING_DEPRECATION=1`

When set to `1`, emit pending deprecation warnings.

Pending deprecations are generally identical to a runtime deprecation with the
notable exception that they are turned _off_ by default and will not be emitted
unless either the `--pending-deprecation` command-line flag, or the
`NODE_PENDING_DEPRECATION=1` environment variable, is set. Pending deprecations
are used to provide a kind of selective "early warning" mechanism that
developers may leverage to detect deprecated API usage.

### `NODE_PENDING_PIPE_INSTANCES=instances`

Set the number of pending pipe instance handles when the pipe server is waiting
for connections. This setting applies to Windows only.

### `NODE_PRESERVE_SYMLINKS=1`

When set to `1`, instructs the module loader to preserve symbolic links when
resolving and caching modules.

### `NODE_REDIRECT_WARNINGS=file`

When set, process warnings will be emitted to the given file instead of
printing to stderr. The file will be created if it does not exist, and will be
appended to if it does. If an error occurs while attempting to write the
warning to the file, the warning will be written to stderr instead. This is
equivalent to using the `--redirect-warnings=file` command-line flag.

### `NODE_REPL_EXTERNAL_MODULE=file`

Path to a Node.js module which will be loaded in place of the built-in REPL.
Overriding this value to an empty string (`''`) will use the built-in REPL.

### `NODE_REPL_HISTORY=file`

Path to the file used to store the persistent REPL history. The default path is
`~/.node_repl_history`, which is overridden by this variable. Setting the value
to an empty string (`''` or `' '`) disables persistent REPL history.

### `NODE_SKIP_PLATFORM_CHECK=value`

If `value` equals `'1'`, the check for a supported platform is skipped during
Node.js startup. Node.js might not execute correctly. Any issues encountered
on unsupported platforms will not be fixed.

### `NODE_TEST_CONTEXT=value`

If `value` equals `'child'`, test reporter options will be overridden and test
output will be sent to stdout in the TAP format. If any other value is provided,
Node.js makes no guarantees about the reporter format used or its stability.

### `NODE_TLS_REJECT_UNAUTHORIZED=value`

If `value` equals `'0'`, certificate validation is disabled for TLS connections.
This makes TLS, and HTTPS by extension, insecure. The use of this environment
variable is strongly discouraged.

### `NODE_USE_ENV_PROXY=1`

> Stability: 1.1 - Active Development

When enabled, Node.js parses the `HTTP_PROXY`, `HTTPS_PROXY` and `NO_PROXY`
environment variables during startup, and routes requests through the
specified proxy.

Use this only with proxies that are trusted and authorized for the deployment.
Proxy support is intended for reaching external networks through authorized
proxy servers, for example when a firewall requires one. It is not for hiding
traffic or evading network policy. See Built-in Proxy Support.

This can also be enabled using the `--use-env-proxy` command-line flag.
When both are set, `--use-env-proxy` takes precedence.

### `NODE_USE_SYSTEM_CA=1`

Node.js uses the trusted CA certificates present in the system store along with
the `--use-bundled-ca` option and the `NODE_EXTRA_CA_CERTS` environment variable.

This can also be enabled using the `--use-system-ca` command-line flag.
When both are set, `--use-system-ca` takes precedence.

### `NODE_V8_COVERAGE=dir`

When set, Node.js will begin outputting V8 JavaScript code coverage and
Source Map data to the directory provided as an argument (coverage
information is written as JSON to files with a `coverage` prefix).

`NODE_V8_COVERAGE` will automatically propagate to subprocesses, making it
easier to instrument applications that call the `child_process.spawn()` family
of functions. `NODE_V8_COVERAGE` can be set to an empty string, to prevent
propagation.

#### Coverage output

Coverage is output as an array of ScriptCoverage objects on the top-level
key `result`:

```json
{
  "result": [
    {
      "scriptId": "67",
      "url": "internal/tty.js",
      "functions": []
    }
  ]
}
```

#### Source map cache

> Stability: 1 - Experimental

If found, source map data is appended to the top-level key `source-map-cache`
on the JSON coverage object.

`source-map-cache` is an object with keys representing the files source maps
were extracted from, and values which include the raw source-map URL
(in the key `url`), the parsed Source Map v3 information (in the key `data`),
and the line lengths of the source file (in the key `lineLengths`).

```json
{
  "result": [
    {
      "scriptId": "68",
      "url": "file:///absolute/path/to/source.js",
      "functions": []
    }
  ],
  "source-map-cache": {
    "file:///absolute/path/to/source.js": {
      "url": "./path-to-map.json",
      "data": {
        "version": 3,
        "sources": [
          "file:///absolute/path/to/original.js"
        ],
        "names": [
          "Foo",
          "console",
          "info"
        ],
        "mappings": "MAAMA,IACJC,YAAaC",
        "sourceRoot": "./"
      },
      "lineLengths": [
        13,
        62,
        38,
        27
      ]
    }
  }
}
```

### `NO_COLOR=<any>`

`NO_COLOR`  is an alias for `NODE_DISABLE_COLORS`. The value of the
environment variable is arbitrary.
