---
title: "Command-line API (part 3 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/cli.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Command-line API (part 3 of 10)

### `--build-snapshot`

Generates a snapshot blob when the process exits and writes it to
disk, which can be loaded later with `--snapshot-blob`.

When building the snapshot, if `--snapshot-blob` is not specified,
the generated blob will be written, by default, to `snapshot.blob`
in the current working directory. Otherwise it will be written to
the path specified by `--snapshot-blob`.

```console
$ echo "globalThis.foo = 'I am from the snapshot'" > snapshot.js

# Run snapshot.js to initialize the application and snapshot the
# state of it into snapshot.blob.
$ node --snapshot-blob snapshot.blob --build-snapshot snapshot.js

$ echo "console.log(globalThis.foo)" > index.js

# Load the generated snapshot and start the application from index.js.
$ node --snapshot-blob snapshot.blob index.js
I am from the snapshot
```

The `v8.startupSnapshot` API can be used to specify an entry point at
snapshot building time, thus avoiding the need of an additional entry
script at deserialization time:

```console
$ echo "require('v8').startupSnapshot.setDeserializeMainFunction(() => console.log('I am from the snapshot'))" > snapshot.js
$ node --snapshot-blob snapshot.blob --build-snapshot snapshot.js
$ node --snapshot-blob snapshot.blob
I am from the snapshot
```

For more information, check out the `v8.startupSnapshot` API documentation.

The snapshot currently only supports loading a single entrypoint during the
snapshot building process, which can load built-in modules, but not additional user-land modules.
Users can bundle their applications into a single script with their bundler
of choice before building a snapshot.

As it's complicated to ensure the serializablility of all built-in modules,
which are also growing over time, only a subset of the built-in modules are
well tested to be serializable during the snapshot building process.
The Node.js core test suite checks that a few fairly complex applications
can be snapshotted. The list of built-in modules being
captured by the built-in snapshot of Node.js is considered supported.
When the snapshot builder encounters a built-in module that cannot be
serialized, it may crash the snapshot building process. In that case a typical
workaround would be to delay loading that module until
runtime, using either `v8.startupSnapshot.setDeserializeMainFunction()` or
`v8.startupSnapshot.addDeserializeCallback()`. If serialization for
an additional module during the snapshot building process is needed,
please file a request in the Node.js issue tracker and link to it in the
tracking issue for user-land snapshots.

### `--build-snapshot-config`

Specifies the path to a JSON configuration file which configures snapshot
creation behavior.

The following options are currently supported:

* `builder` {string} Required. Provides the name to the script that is executed
  before building the snapshot, as if `--build-snapshot` had been passed
  with `builder` as the main script name.
* `withoutCodeCache` {boolean} Optional. Including the code cache reduces the
  time spent on compiling functions included in the snapshot at the expense
  of a bigger snapshot size and potentially breaking portability of the
  snapshot.

When using this flag, additional script files provided on the command line will
not be executed and instead be interpreted as regular command line arguments.

### `-c`, `--check`

Syntax check the script without executing.

### `--completion-bash`

Print source-able bash completion script for Node.js.

```bash
node --completion-bash > node_bash_completion
source node_bash_completion
```

### `-C condition`, `--conditions=condition`

Provide custom conditional exports resolution conditions.

Any number of custom string condition names are permitted.

The default Node.js conditions of `"node"`, `"default"`, `"import"`, and
`"require"` will always apply as defined.

For example, to run a module with "development" resolutions:

```bash
node -C development app.js
```

### `--config-file=path`, `--config-file`

If present, Node.js will look for a configuration file at the specified path.
If the path is not specified, Node.js will look for a `node.config.json` file
in the current working directory.
To specify a custom path, use the `--config-file=path` form.
The space-separated `--config-file path` form is not supported.
Node.js will read the configuration file and apply the settings. The
configuration file should be a JSON file with the following structure. `vX.Y.Z`
in the `$schema` must be replaced with the version of Node.js you are using or
`latest-vX.x` for the latest version of that major release line.

```json
{
  "$schema": "https://nodejs.org/dist/vX.Y.Z/docs/node-config-schema.json",
  "nodeOptions": {
    "import": [
      "amaro/strip"
    ],
    "watch-path": "src",
    "watch-preserve-output": true
  },
  "test": {
    "test-isolation": "process"
  },
  "watch": {
    "watch-preserve-output": true
  }
}
```

The configuration file supports namespace-specific options:

* The `nodeOptions` field contains CLI flags that are allowed in `NODE_OPTIONS`.

* Namespace fields like `test`, `watch`, and `permission` contain configuration specific to that subsystem.

The configuration file can target a specific Node.js major version with
`nodeVersion`:

```json
{
  "nodeVersion": 25,
  "nodeOptions": {
    "watch-path": "src"
  }
}
```

To keep multiple version-specific configurations in the same file, use the
`configs` array. Node.js will use the first entry whose `nodeVersion` matches
the current Node.js major version:

```json
{
  "$schema": "https://nodejs.org/dist/latest-v26.x/docs/node-config-schema.json",
  "configs": [
    {
      "nodeVersion": 25,
      "config": {
        "$schema": "https://nodejs.org/dist/latest-v25.x/docs/node-config-schema.json",
        "nodeOptions": {
          "watch-path": "src"
        }
      }
    }
  ]
}
```

When `configs` is used, the top level may only contain `$schema` and
`configs`. Each `configs` item must define an integer `nodeVersion` and an
object `config`. A single top-level config does not require `nodeVersion`, but
if present it must match the current Node.js major version.

When a namespace is present in the
configuration file, Node.js automatically enables the corresponding flag
(e.g., `--test`, `--watch`, `--permission`). This allows you to configure
subsystem-specific options without explicitly passing the flag on the command line.

For example:

```json
{
  "test": {
    "test-isolation": "process"
  }
}
```

is equivalent to:

```bash
node --test --test-isolation=process
```

To disable the automatic flag while still using namespace options, you can
explicitly set the flag to `false` within the namespace:

```json
{
  "test": {
    "test": false,
    "test-isolation": "process"
  }
}
```

No-op flags are not supported.
Not all V8 flags are currently supported.

It is possible to use the official JSON schema
to validate the configuration file, which may vary depending on the Node.js version.
Each key in the configuration file corresponds to a flag that can be passed
as a command-line argument. The value of the key is the value that would be
passed to the flag.

For example, the configuration file above is equivalent to
the following command-line arguments:

```bash
node --import amaro/strip --watch-path=src --watch-preserve-output --test-isolation=process
```

The priority in configuration is as follows:

1. NODE\_OPTIONS and command-line options
2. Dotenv NODE\_OPTIONS
3. Configuration file

Values in the configuration file will not override the values in the environment
variables, command-line options, or the `NODE_OPTIONS` env file parsed by the
`--env-file` flag.

Keys cannot be duplicated within the same or different namespaces.

The configuration parser will throw an error if the configuration file contains
unknown keys or keys that cannot be used in a namespace.

Node.js will not sanitize or perform validation on the user-provided configuration,
so **NEVER** use untrusted configuration files.

### `--cpu-prof`

Starts the V8 CPU profiler on start up, and writes the CPU profile to disk
before exit.

If `--cpu-prof-dir` is not specified, the generated profile is placed
in the current working directory.

If `--cpu-prof-name` is not specified, the generated profile is
named `CPU.${yyyymmdd}.${hhmmss}.${pid}.${tid}.${seq}.cpuprofile`.

```console
$ node --cpu-prof index.js
$ ls *.cpuprofile
CPU.20190409.202950.15293.0.0.cpuprofile
```

If `--cpu-prof-name` is specified, the provided value is used as a template
for the file name. The following placeholder is supported and will be
substituted at runtime:

* `${pid}` — the current process ID

```console
$ node --cpu-prof --cpu-prof-name 'CPU.${pid}.cpuprofile' index.js
$ ls *.cpuprofile
CPU.15293.cpuprofile
```

### `--cpu-prof-dir`

Specify the directory where the CPU profiles generated by `--cpu-prof` will
be placed.

The default value is controlled by the
`--diagnostic-dir` command-line option.

### `--cpu-prof-interval`

Specify the sampling interval in microseconds for the CPU profiles generated
by `--cpu-prof`. The default is 1000 microseconds.

### `--cpu-prof-name`

Specify the file name of the CPU profile generated by `--cpu-prof`.

### `--diagnostic-dir=directory`

Set the directory to which all diagnostic output files are written.
Defaults to current working directory.

Affects the default output directory of:

* `--cpu-prof-dir`
* `--heap-prof-dir`
* `--redirect-warnings`

### `--disable-proto=mode`

Disable the `Object.prototype.__proto__` property. If `mode` is `delete`, the
property is removed entirely. If `mode` is `throw`, accesses to the
property throw an exception with the code `ERR_PROTO_ACCESS`.

### `--disable-sigusr1`

Disable the ability of starting a debugging session by sending a
`SIGUSR1` signal to the process.

### `--disable-warning=code-or-type`

> Stability: 2 - Stable

Disable specific process warnings by `code` or `type`.

Warnings emitted from `process.emitWarning()` may contain a
`code` and a `type`. This option will not-emit warnings that have a matching
`code` or `type`.

List of deprecation warnings.

The Node.js core warning types are: `DeprecationWarning` and
`ExperimentalWarning`

For example, the following script will not emit
DEP0025 `require('node:sys')` when executed with
`node --disable-warning=DEP0025`:

```mjs
import sys from 'node:sys';
```

```cjs
const sys = require('node:sys');
```

For example, the following script will emit the
DEP0025 `require('node:sys')`, but not any Experimental
Warnings (such as
ExperimentalWarning: `vm.measureMemory` is an experimental feature
in <=v21) when executed with `node --disable-warning=ExperimentalWarning`:

```mjs
import sys from 'node:sys';
import vm from 'node:vm';

vm.measureMemory();
```

```cjs
const sys = require('node:sys');
const vm = require('node:vm');

vm.measureMemory();
```

### `--disable-wasm-trap-handler`

Node.js enables V8's trap-handler-based WebAssembly bound checks on 64-bit platforms,
which significantly improves WebAssembly performance by eliminating the need for
inline bound checks. This optimization requires allocating a large virtual memory
cage per WebAssembly memory instance (currently typically 8GB for 32-bit WebAssembly memory,
16GB for 64-bit WebAssembly memory) to trap out-of-bound accesses. On most 64-bit
platforms, the virtual memory address space is usually large enough (around 128TB)
to accommodate typical WebAssembly usages, but if the machine has manual limits
on virtual memory (e.g. through `ulimit -v`), WebAssembly memory allocation is
more likely to fail with `WebAssembly.Memory(): could not allocate memory`.

At startup, Node.js automatically checks whether there is enough virtual memory
available to allocate at least one cage, and if not, the trap-handler optimization
is automatically disabled so that WebAssembly can still run using inline
bound checks (with less optimal performance). But if the application needs to create
many WebAssembly memory instances and the machine still configures a relatively high
limit on virtual memory, allocation of WebAssembly memory instances may still fail
more quickly than expected due to the raised virtual memory usage.

`--disable-wasm-trap-handler` fully disables this optimization so that WebAssembly memory
instances always use inline bound checks instead of reserving large virtual memory cages.
This allows more instances to be created when the virtual memory address space available
to the Node.js process is limited.

### `--disallow-code-generation-from-strings`

Make built-in language features like `eval` and `new Function` that generate
code from strings throw an exception instead. This does not affect the Node.js
`node:vm` module.

### `--dns-result-order=order`

Set the default value of `order` in `dns.lookup()` and
`dnsPromises.lookup()`. The value could be:

* `ipv4first`: sets default `order` to `ipv4first`.
* `ipv6first`: sets default `order` to `ipv6first`.
* `verbatim`: sets default `order` to `verbatim`.

The default is `verbatim` and `dns.setDefaultResultOrder()` have higher
priority than `--dns-result-order`.

### `--enable-fips`

Enable FIPS mode at startup. With OpenSSL 3, a configured provider named
`fips` must be available and initialize successfully. With OpenSSL 1.1.1,
Node.js must be built against a FIPS-capable OpenSSL.

### `--enable-fips-indicator-events`

Publish OpenSSL FIPS indicator results to the
`'crypto.fips.indicator'` diagnostics channel. This option requires OpenSSL
3.4 or later. It does not enable FIPS mode or change whether an operation
is permitted.

### `--enable-source-maps`

Enable Source Map support for stack traces.

When using a transpiler, such as TypeScript, stack traces thrown by an
application reference the transpiled code, not the original source position.
`--enable-source-maps` enables caching of Source Maps and makes a best
effort to report stack traces relative to the original source file.

Overriding `Error.prepareStackTrace` may prevent `--enable-source-maps` from
modifying the stack trace. Call and return the results of the original
`Error.prepareStackTrace` in the overriding function to modify the stack trace
with source maps.

```js
const originalPrepareStackTrace = Error.prepareStackTrace;
Error.prepareStackTrace = (error, trace) => {
  // Modify error and trace and format stack trace with
  // original Error.prepareStackTrace.
  return originalPrepareStackTrace(error, trace);
};
```

Note, enabling source maps can introduce latency to your application
when `Error.stack` is accessed. If you access `Error.stack` frequently
in your application, take into account the performance implications
of `--enable-source-maps`.
