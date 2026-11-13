---
title: "Command-line API (part 7 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/cli.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Command-line API (part 7 of 10)

### `--test-shard`

Test suite shard to execute in a format of `<index>/<total>`, where

* `index` is a positive integer, index of divided parts.
* `total` is a positive integer, total of divided part.

This command will divide all tests files into `total` equal parts,
and will run only those that happen to be in an `index` part.

For example, to split your tests suite into three parts, use this:

```bash
node --test --test-shard=1/3
node --test --test-shard=2/3
node --test --test-shard=3/3
```

### `--test-skip-pattern`

A regular expression that configures the test runner to skip tests
whose name matches the provided pattern. See the documentation on
filtering tests by name for more details.

If both `--test-name-pattern` and `--test-skip-pattern` are supplied,
tests must satisfy **both** requirements in order to be executed.

### `--test-timeout`

A number of milliseconds the test execution will fail after. If unspecified,
subtests inherit this value from their parent. The default value is `Infinity`.

### `--test-update-snapshots`

Regenerates the snapshot files used by the test runner for snapshot testing.

### `--throw-deprecation`

Throw errors for deprecations.

### `--title=title`

Set `process.title` on startup.

### `--tls-cipher-list=list`

Specify an alternative default TLS cipher list. Requires Node.js to be built
with crypto support (default).

### `--tls-keylog=file`

Log TLS key material to a file. The key material is in NSS `SSLKEYLOGFILE`
format and can be used by software (such as Wireshark) to decrypt the TLS
traffic.

### `--tls-max-v1.2`

Set `tls.DEFAULT_MAX_VERSION` to 'TLSv1.2'. Use to disable support for
TLSv1.3.

### `--tls-max-v1.3`

Set default `tls.DEFAULT_MAX_VERSION` to 'TLSv1.3'. Use to enable support
for TLSv1.3.

### `--tls-min-v1.0`

Set default `tls.DEFAULT_MIN_VERSION` to 'TLSv1'. Use for compatibility with
old TLS clients or servers.

### `--tls-min-v1.1`

Set default `tls.DEFAULT_MIN_VERSION` to 'TLSv1.1'. Use for compatibility
with old TLS clients or servers.

### `--tls-min-v1.2`

Set default `tls.DEFAULT_MIN_VERSION` to 'TLSv1.2'. This is the default for
12.x and later, but the option is supported for compatibility with older Node.js
versions.

### `--tls-min-v1.3`

Set default `tls.DEFAULT_MIN_VERSION` to 'TLSv1.3'. Use to disable support
for TLSv1.2, which is not as secure as TLSv1.3.

### `--trace-deprecation`

Print stack traces for deprecations.

### `--trace-env`

Print information about any access to environment variables done in the current Node.js
instance to stderr, including:

* The environment variable reads that Node.js does internally.
* Writes in the form of `process.env.KEY = "SOME VALUE"`.
* Reads in the form of `process.env.KEY`.
* Definitions in the form of `Object.defineProperty(process.env, 'KEY', {...})`.
* Queries in the form of `Object.hasOwn(process.env, 'KEY')`,
  `process.env.hasOwnProperty('KEY')` or `'KEY' in process.env`.
* Deletions in the form of `delete process.env.KEY`.
* Enumerations inf the form of `...process.env` or `Object.keys(process.env)`.

Only the names of the environment variables being accessed are printed. The values are not printed.

To print the stack trace of the access, use `--trace-env-js-stack` and/or
`--trace-env-native-stack`.

### `--trace-env-js-stack`

In addition to what `--trace-env` does, this prints the JavaScript stack trace of the access.

### `--trace-env-native-stack`

In addition to what `--trace-env` does, this prints the native stack trace of the access.

### `--trace-event-categories`

A comma separated list of categories that should be traced when trace event
tracing is enabled using `--trace-events-enabled`.

### `--trace-event-file-pattern`

Template string specifying the filepath for the trace event data, it
supports `${rotation}` and `${pid}`.

### `--trace-events-enabled`

Enables the collection of trace event tracing information.

### `--trace-exit`

Prints a stack trace whenever an environment is exited proactively,
i.e. invoking `process.exit()`.

### `--trace-require-module=mode`

Prints information about usage of Loading ECMAScript modules using `require()`.

When `mode` is `all`, all usage is printed. When `mode` is `no-node-modules`, usage
from the `node_modules` folder is excluded.

### `--trace-sigint`

Prints a stack trace on SIGINT.

### `--trace-sync-io`

Prints a stack trace whenever synchronous I/O is detected after the first turn
of the event loop.

### `--trace-tls`

Prints TLS packet trace information to `stderr`. This can be used to debug TLS
connection problems.

### `--trace-uncaught`

Print stack traces for uncaught exceptions; usually, the stack trace associated
with the creation of an `Error` is printed, whereas this makes Node.js also
print the stack trace associated with throwing the value (which does not need
to be an `Error` instance).

Enabling this option may affect garbage collection behavior negatively.

### `--trace-warnings`

Print stack traces for process warnings (including deprecations).

### `--track-heap-objects`

Track heap object allocations for heap snapshots.

### `--unhandled-rejections=mode`

Using this flag allows to change what should happen when an unhandled rejection
occurs. One of the following modes can be chosen:

* `throw`: Emit `unhandledRejection`. If this hook is not set, raise the
  unhandled rejection as an uncaught exception. This is the default.
* `strict`: Raise the unhandled rejection as an uncaught exception. If the
  exception is handled, `unhandledRejection` is emitted.
* `warn`: Always trigger a warning, no matter if the `unhandledRejection`
  hook is set or not but do not print the deprecation warning.
* `warn-with-error-code`: Emit `unhandledRejection`. If this hook is not
  set, trigger a warning, and set the process exit code to 1.
* `none`: Silence all warnings.

If a rejection happens during the command line entry point's ES module static
loading phase, it will always raise it as an uncaught exception.

### `--use-bundled-ca`, `--use-openssl-ca`

Use bundled Mozilla CA store as supplied by current Node.js version
or use OpenSSL's default CA store. The default store is selectable
at build-time.

The bundled CA store, as supplied by Node.js, is a snapshot of Mozilla CA store
that is fixed at release time. It is identical on all supported platforms.

Using OpenSSL store allows for external modifications of the store. For most
Linux and BSD distributions, this store is maintained by the distribution
maintainers and system administrators. OpenSSL CA store location is dependent on
configuration of the OpenSSL library but this can be altered at runtime using
environment variables.

See `SSL_CERT_DIR` and `SSL_CERT_FILE`.

### `--use-env-proxy`

> Stability: 1.1 - Active Development

When enabled, Node.js parses the `HTTP_PROXY`, `HTTPS_PROXY` and `NO_PROXY`
environment variables during startup, and routes requests through the
specified proxy.

Use this only with proxies that are trusted and authorized for the deployment.
Proxy support is intended for reaching external networks through authorized
proxy servers, for example when a firewall requires one. It is not for hiding
traffic or evading network policy. See Built-in Proxy Support.

This is equivalent to setting the `NODE_USE_ENV_PROXY=1` environment variable.
When both are set, `--use-env-proxy` takes precedence.

### `--use-largepages=mode`

This option is no longer supported and a no-op. It used to re-map the Node.js
static code to large memory pages at startup.

It still accepts the following values for compatibility:

* `off`: No mapping will be attempted. This is the default.
* `on`: No mapping will be attempted and a message will be printed to
  standard error stating it's no longer supported.
* `silent`: Same as `off`.

### `--use-system-ca`

Node.js uses the trusted CA certificates present in the system store along with
the `--use-bundled-ca` option and the `NODE_EXTRA_CA_CERTS` environment variable.
On platforms other than Windows and macOS, this loads certificates from the directory
and file trusted by OpenSSL, similar to `--use-openssl-ca`, with the difference being
that it caches the certificates after first load.

On Windows and macOS, the certificate trust policy is similar to
Chromium's policy for locally trusted certificates, but with some differences:

On macOS, the following settings are respected:

* Default and System Keychains
  * Trust:
    * Any certificate where the “When using this certificate” flag is set to “Always Trust” or
    * Any certificate where the “Secure Sockets Layer (SSL)” flag is set to “Always Trust”.
  * The certificate must also be valid, with "X.509 Basic Policy" set to  “Always Trust”.

On Windows, the following settings are respected:

* Local Machine (accessed via `certlm.msc`)
  * Trust:
    * Trusted Root Certification Authorities
    * Trusted People
    * Enterprise Trust -> Enterprise -> Trusted Root Certification Authorities
    * Enterprise Trust -> Enterprise -> Trusted People
    * Enterprise Trust -> Group Policy -> Trusted Root Certification Authorities
    * Enterprise Trust -> Group Policy -> Trusted People
* Current User (accessed via `certmgr.msc`)
  * Trust:
    * Trusted Root Certification Authorities
    * Enterprise Trust -> Group Policy -> Trusted Root Certification Authorities

On Windows and macOS, Node.js would check that the user settings for the trusted
certificates do not forbid them for TLS server authentication before using them.

Node.js currently does not support distrust/revocation of certificates
from another source based on system settings.

On other systems, Node.js loads certificates from the default certificate file
(typically `/etc/ssl/cert.pem`) and default certificate directory (typically
`/etc/ssl/certs`) that the version of OpenSSL that Node.js links to respects.
This typically works with the convention on major Linux distributions and other
Unix-like systems. If the overriding OpenSSL environment variables
(typically `SSL_CERT_FILE` and `SSL_CERT_DIR`, depending on the configuration
of the OpenSSL that Node.js links to) are set, the specified paths will be used to load
certificates instead. These environment variables can be used as workarounds
if the conventional paths used by the version of OpenSSL Node.js links to are
not consistent with the system configuration that the users have for some reason.

### `--v8-options`

Print V8 command-line options.

### `--v8-pool-size=num`

Set V8's thread pool size which will be used to allocate background jobs.

If set to `0` then Node.js will choose an appropriate size of the thread pool
based on an estimate of the amount of parallelism.

The amount of parallelism refers to the number of computations that can be
carried out simultaneously in a given machine. In general, it's the same as the
amount of CPUs, but it may diverge in environments such as VMs or containers.

### `-v`, `--version`

Print node's version.

### `--vfs-load=source`

* `source` {string} A directory or an archive file to mount and run.

Requires `--experimental-vfs`. May be given at most once.

Mounts `source` as a virtual file system (`node:vfs`), and runs the entry
point and all subsequent `require()`/`import` resolution against that mount
rather than the real file system. The mount is placed at a reserved mount point
assigned by Node.js, so it never shadows real paths and no target can be
chosen. The entry point is taken from the mount the same way `node <directory>`
takes one: the mount's own `package.json` `"main"`, or `index.js`. Any
positional command-line argument is the program's own (available from
`process.argv[2]` onward), never an entry-point override.

`process.argv[1]` reports `source` rather than the reserved mount point, since
the mount point is an opaque implementation detail.

The provider backing a source is chosen from the source itself rather than from
its file name:

* A directory is mounted with a `RealFSProvider` rooted there.
* A file whose bytes are a ZIP archive is mounted with a `ZipProvider`, so
  an archive can carry any name.

Providers registered with `vfs.registerProvider()` (typically from a module
preloaded with `--require` or `--import`) are consulted first, in
reverse registration order, and may claim directories as well as files. If no
provider claims the source, Node.js exits with an error.

In worker threads `--vfs-load` mounts but does not load: a worker inherits the
mount and runs its own entry point, which may itself live in the mount.

The source is mounted at the same reserved mount point in every thread that
mounts it, whatever else that thread mounts, so a path into the mount means the
same thing in all of them.

A worker created with its own `execArgv` inherits none of the parent's options,
and so does not mount the source at all. To run a script from the mount, such a
worker must be given the same options again, `--experimental-vfs` and
`--vfs-load`; without them, that thread has no mount for the script to come
from, and the worker fails to load it. `--experimental-vfs` is also what makes
`node:vfs` available to the worker's own code. A worker whose script comes
from anywhere else, such as the real file system, needs nothing added.

`--vfs-load` is not permitted in `NODE_OPTIONS`: which entry point runs is
the command line's decision, and the environment must not be able to redirect
it.

```console
$ node --experimental-vfs --vfs-load=app.zip
```

### `--watch`

Starts Node.js in watch mode.
When in watch mode, changes in the watched files cause the Node.js process to
restart.
By default, watch mode will watch the entry point
and any required or imported module.
Use `--watch-path` to specify what paths to watch.

This flag cannot be combined with
`--check`, `--eval`, `--interactive`, or the REPL.

Note: The `--watch` flag requires a file path as an argument and is incompatible
with `--run` or inline script input, as `--run` takes precedence and ignores watch
mode. If no file is provided, Node.js will exit with status code `9`.

```bash
node --watch index.js
```

### `--watch-kill-signal`

> Stability: 1.1 - Active Development

Customizes the signal sent to the process on watch mode restarts.

```bash
node --watch --watch-kill-signal SIGINT test.js
```
