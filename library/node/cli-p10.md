---
title: "Command-line API (part 10 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/cli.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Command-line API (part 10 of 10)

### `OPENSSL_CONF=file`

Load an OpenSSL configuration file on startup. The file can be used as part of
a FIPS mode configuration.

If the variable is set to an empty value, Node.js starts without loading any
OpenSSL configuration file. This is a way past a default configuration file
that exists but cannot be read, for example when `/etc/ssl` is not accessible
to the user Node.js runs as, which is otherwise fatal at startup. No
configuration is applied in that case, including any FIPS mode setup the
file would have performed.

If the `--openssl-config` command-line option is used, the environment
variable is ignored, and an empty value has no effect.

### `SSL_CERT_DIR=dir`

If `--use-openssl-ca` is enabled, or if `--use-system-ca` is enabled on
platforms other than macOS and Windows, this overrides and sets OpenSSL's directory
containing trusted certificates.

Be aware that unless the child environment is explicitly set, this environment
variable will be inherited by any child processes, and if they use OpenSSL, it
may cause them to trust the same CAs as node.

### `SSL_CERT_FILE=file`

If `--use-openssl-ca` is enabled, or if `--use-system-ca` is enabled on
platforms other than macOS and Windows, this overrides and sets OpenSSL's file
containing trusted certificates.

Be aware that unless the child environment is explicitly set, this environment
variable will be inherited by any child processes, and if they use OpenSSL, it
may cause them to trust the same CAs as node.

### `TZ`

The `TZ` environment variable is used to specify the timezone configuration.

While Node.js does not support all of the various ways that `TZ` is handled in
other environments, it does support basic <example-value> IDs (such as
`'Etc/UTC'`, `'Europe/Paris'`, or `'America/New_York'`).
It may support a few other abbreviations or aliases, but these are strongly
discouraged and not guaranteed.

```console
$ TZ=Europe/Dublin node -pe "new Date().toString()"
Wed May 12 2021 20:30:48 GMT+0100 (Irish Standard Time)
```

### `UV_THREADPOOL_SIZE=size`

Set the number of threads used in libuv's threadpool to `size` threads.

Asynchronous system APIs are used by Node.js whenever possible, but where they
do not exist, libuv's threadpool is used to create asynchronous node APIs based
on synchronous system APIs. Node.js APIs that use the threadpool are:

* all `fs` APIs, other than the file watcher APIs and those that are explicitly
  synchronous
* asynchronous crypto APIs such as `crypto.pbkdf2()`, `crypto.scrypt()`,
  `crypto.randomBytes()`, `crypto.randomFill()`, `crypto.generateKeyPair()`
* `dns.lookup()`
* all `zlib` APIs, other than those that are explicitly synchronous

Because libuv's threadpool has a fixed size, it means that if for whatever
reason any of these APIs takes a long time, other (seemingly unrelated) APIs
that run in libuv's threadpool will experience degraded performance. In order to
mitigate this issue, one potential solution is to increase the size of libuv's
threadpool by setting the `'UV_THREADPOOL_SIZE'` environment variable to a value
greater than `4` (its current default value). However, setting this from inside
the process using `process.env.UV_THREADPOOL_SIZE=size` is not guaranteed to work
as the threadpool would have been created as part of the runtime initialisation
much before user code is run. For more information, see the libuv threadpool documentation.

## Useful V8 options

V8 has its own set of CLI options. Any V8 CLI option that is provided to `node`
will be passed on to V8 to handle. V8's options have _no stability guarantee_.
The V8 team themselves don't consider them to be part of their formal API,
and reserve the right to change them at any time. Likewise, they are not
covered by the Node.js stability guarantees. Many of the V8
options are of interest only to V8 developers. Despite this, there is a small
set of V8 options that are widely applicable to Node.js, and they are
documented here:

### `--max-heap-size`

Specifies the maximum heap size (in megabytes) for the process.

This option is typically used to limit the amount of memory the process can use for its JavaScript heap.

### `--max-old-space-size=SIZE` (in MiB)

Sets the max memory size of V8's old memory section. As memory
consumption approaches the limit, V8 will spend more time on
garbage collection in an effort to free unused memory.

On a machine with 2 GiB of memory, consider setting this to
1536 (1.5 GiB) to leave some memory for other uses and avoid swapping.

```bash
node --max-old-space-size=1536 index.js
```

### `--max-semi-space-size=SIZE` (in MiB)

Sets the maximum semi-space size for V8's scavenge garbage collector in
MiB (mebibytes).
Increasing the max size of a semi-space may improve throughput for Node.js at
the cost of more memory consumption.

Since the young generation size of the V8 heap is three times (see
`YoungGenerationSizeFromSemiSpaceSize` in V8) the size of the semi-space,
an increase of 1 MiB to semi-space applies to each of the three individual
semi-spaces and causes the heap size to increase by 3 MiB. The throughput
improvement depends on your workload (see #42511).

The default value depends on the memory limit. For example, on 64-bit systems
with a memory limit of 512 MiB, the max size of a semi-space defaults to 1 MiB.
For memory limits up to and including 2GiB, the default max size of a
semi-space will be less than 16 MiB on 64-bit systems.

To get the best configuration for your application, you should try different
max-semi-space-size values when running benchmarks for your application.

For example, benchmark on a 64-bit systems:

```bash
for MiB in 16 32 64 128; do
    node --max-semi-space-size=$MiB index.js
done
```

### `--stack-trace-limit=limit`

The maximum number of stack frames to collect in an error's stack trace.
Setting it to 0 disables stack trace collection. The default value is 10.

```bash
node --stack-trace-limit=12 -p -e "Error.stackTraceLimit" # prints 12
```
