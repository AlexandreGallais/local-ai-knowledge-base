---
title: "Process (part 8 of 10)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/process.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Process (part 8 of 10)

## `process.permission`

* Type: {Object}

This API is available through the `--permission` or
`--permission-audit` flags.

`process.permission` is an object whose methods are used to manage permissions
for the current process. Additional documentation is available in the
Permission Model.

### `process.permission.has(scope[, reference])`

* `scope` {string}
* `reference` {string|URL|Uint8Array}
* Returns: {boolean}

Verifies that the process is able to access the given scope and reference.
If no reference is provided, a global scope is assumed, for instance,
`process.permission.has('fs.read')` will check if the process has ALL
file system read permissions.

In audit mode (`--permission-audit`), this method still returns the actual
permission status, but denied operations will not throw `ERR_ACCESS_DENIED`.

The reference has a meaning based on the provided scope. For example,
the reference when the scope is File System means files and folders.

For File System scopes, a `URL` reference must use the `file:` protocol and is
converted to a path, while a `Uint8Array` reference is treated as the raw bytes
of a path. Other scopes ignore the reference.

The available scopes are:

* `fs` - All File System
* `fs.read` - File System read operations
* `fs.write` - File System write operations
* `child` - Child process spawning operations
* `openssl.store` - Loading keys through OpenSSL STORE loaders
* `worker` - Worker thread spawning operation
* `net` - Network operations
* `inspector` - Inspector operations
* `wasi` - WASI operations
* `addon` - Native addon operations
* `ffi` - Foreign function interface operations

```js
// Check if the process has permission to read the README file
process.permission.has('fs.read', './README.md');
// Check if the process has read permission operations
process.permission.has('fs.read');
```

### `process.permission.drop(scope[, reference])`

> Stability: 1.1 - Active Development

* `scope` {string}
* `reference` {string|URL|Uint8Array}

Drops the specified permission from the current process. This operation is
**irreversible** — once a permission is dropped, it cannot be restored through
any Node.js API.

In audit mode (`--permission-audit`), dropping a permission takes effect,
but since denied operations do not throw, the impact is limited to changing the
return value of `permission.has()`.

If no reference is provided, the entire scope is dropped. For example,
`process.permission.drop('fs.read')` will revoke ALL file system read
permissions.

When a reference is provided, only the permission for that specific resource
is dropped. For example, `process.permission.drop('fs.read', '/etc/myapp')`
will revoke read access to that directory while keeping other read
permissions intact.

**Important:** You can only drop the exact resource that was explicitly
granted. The reference passed to `drop()` must match the original grant:

* If a permission was granted using a wildcard (`*`), such as
  `--allow-fs-read=*`, individual paths cannot be dropped - only the entire
  scope can be dropped (by calling `drop()` without a reference).
* If a directory was granted (e.g. `--allow-fs-read=/my/folder`), you cannot
  drop access to individual files inside it. You must drop the same directory
  that was granted. Any remaining grants continue to apply.

The available scopes are the same as `process.permission.has()`:

* `fs` - All File System (drops both read and write)
* `fs.read` - File System read operations
* `fs.write` - File System write operations
* `child` - Child process spawning operations
* `openssl.store` - Loading keys through OpenSSL STORE loaders
* `worker` - Worker thread spawning operation
* `net` - Network operations
* `inspector` - Inspector operations
* `wasi` - WASI operations
* `addon` - Native addon operations
* `ffi` - Foreign function interface operations

```js
const fs = require('node:fs');

// Read configuration during startup
const config = fs.readFileSync('/etc/myapp/config.json', 'utf8');

// Drop read access to the config directory after initialization
process.permission.drop('fs.read', '/etc/myapp');

// This will now throw ERR_ACCESS_DENIED
fs.readFileSync('/etc/myapp/config.json');
```

## `process.pid`

* Type: {integer}

The `process.pid` property returns the PID of the process.

```mjs
import { pid } from 'node:process';

console.log(`This process is pid ${pid}`);
```

```cjs
const { pid } = require('node:process');

console.log(`This process is pid ${pid}`);
```

## `process.platform`

* Type: {string}

The `process.platform` property returns a string identifying the operating
system platform for which the Node.js binary was compiled.

Currently possible values are:

* `'aix'`
* `'darwin'`
* `'freebsd'`
* `'linux'`
* `'openbsd'`
* `'sunos'`
* `'win32'`

```mjs
import { platform } from 'node:process';

console.log(`This platform is ${platform}`);
```

```cjs
const { platform } = require('node:process');

console.log(`This platform is ${platform}`);
```

The value `'android'` may also be returned if Node.js is built on the
Android operating system. However, Android support in Node.js
is experimental.

## `process.ppid`

* Type: {integer}

The `process.ppid` property returns the PID of the parent of the
current process.

```mjs
import { ppid } from 'node:process';

console.log(`The parent process is pid ${ppid}`);
```

```cjs
const { ppid } = require('node:process');

console.log(`The parent process is pid ${ppid}`);
```

## `process.ref(maybeRefable)`

* `maybeRefable` {any} An object that may be "refable".

An object is "refable" if it implements the Node.js "Refable protocol".
Specifically, this means that the object implements the `Symbol.for('nodejs.ref')`
and `Symbol.for('nodejs.unref')` methods. "Ref'd" objects will keep the Node.js
event loop alive, while "unref'd" objects will not. Historically, this was
implemented by using `ref()` and `unref()` methods directly on the objects.
This pattern, however, is being deprecated in favor of the "Refable protocol"
in order to better support Web Platform API types whose APIs cannot be modified
to add `ref()` and `unref()` methods but still need to support that behavior.

## `process.release`

* Type: {Object}

The `process.release` property returns an `Object` containing metadata related
to the current release, including URLs for the source tarball and headers-only
tarball.

`process.release` contains the following properties:

* `name` {string} A value that will always be `'node'`.
* `sourceUrl` {string} an absolute URL pointing to a _`.tar.gz`_ file containing
  the source code of the current release.
* `headersUrl`{string} an absolute URL pointing to a _`.tar.gz`_ file containing
  only the source header files for the current release. This file is
  significantly smaller than the full source file and can be used for compiling
  Node.js native add-ons.
* `libUrl` {string|undefined} an absolute URL pointing to a _`node.lib`_ file
  matching the architecture and version of the current release. This file is
  used for compiling Node.js native add-ons. _This property is only present on
  Windows builds of Node.js and will be missing on all other platforms._
* `lts` {string|undefined} a string label identifying the LTS label for this
  release. This property only exists for LTS releases and is `undefined` for all
  other release types, including _Current_ releases. Valid values include the
  LTS Release code names (including those that are no longer supported).
  * `'Fermium'` for the 14.x LTS line beginning with 14.15.0.
  * `'Gallium'` for the 16.x LTS line beginning with 16.13.0.
  * `'Hydrogen'` for the 18.x LTS line beginning with 18.12.0.
    For other LTS Release code names, see Node.js Changelog Archive

```json
{
  "name": "node",
  "lts": "Hydrogen",
  "sourceUrl": "https://nodejs.org/download/release/v18.12.0/node-v18.12.0.tar.gz",
  "headersUrl": "https://nodejs.org/download/release/v18.12.0/node-v18.12.0-headers.tar.gz",
  "libUrl": "https://nodejs.org/download/release/v18.12.0/win-x64/node.lib"
}
```

In custom builds from non-release versions of the source tree, only the
`name` property may be present. The additional properties should not be
relied upon to exist.

## `process.report`

* Type: {Object}

`process.report` is an object whose methods are used to generate diagnostic
reports for the current process. Additional documentation is available in the
report documentation.

### `process.report.compact`

* Type: {boolean}

Write reports in a compact format, single-line JSON, more easily consumable
by log processing systems than the default multi-line format designed for
human consumption.

```mjs
import { report } from 'node:process';

console.log(`Reports are compact? ${report.compact}`);
```

```cjs
const { report } = require('node:process');

console.log(`Reports are compact? ${report.compact}`);
```

### `process.report.directory`

* Type: {string}

Directory where the report is written. The default value is the empty string,
indicating that reports are written to the current working directory of the
Node.js process.

```mjs
import { report } from 'node:process';

console.log(`Report directory is ${report.directory}`);
```

```cjs
const { report } = require('node:process');

console.log(`Report directory is ${report.directory}`);
```

### `process.report.filename`

* Type: {string}

Filename where the report is written. If set to the empty string, the output
filename will be comprised of a timestamp, PID, and sequence number. The default
value is the empty string.

If the value of `process.report.filename` is set to `'stdout'` or `'stderr'`,
the report is written to the stdout or stderr of the process respectively.

```mjs
import { report } from 'node:process';

console.log(`Report filename is ${report.filename}`);
```

```cjs
const { report } = require('node:process');

console.log(`Report filename is ${report.filename}`);
```

### `process.report.getReport([err])`

* `err` {Error} A custom error used for reporting the JavaScript stack.
* Returns: {Object}

Returns a JavaScript Object representation of a diagnostic report for the
running process. The report's JavaScript stack trace is taken from `err`, if
present.

```mjs
import { report } from 'node:process';
import util from 'node:util';

const data = report.getReport();
console.log(data.header.nodejsVersion);

// Similar to process.report.writeReport()
import fs from 'node:fs';
fs.writeFileSync('my-report.log', util.inspect(data), 'utf8');
```

```cjs
const { report } = require('node:process');
const util = require('node:util');

const data = report.getReport();
console.log(data.header.nodejsVersion);

// Similar to process.report.writeReport()
const fs = require('node:fs');
fs.writeFileSync('my-report.log', util.inspect(data), 'utf8');
```

Additional documentation is available in the report documentation.

### `process.report.reportOnFatalError`

* Type: {boolean}

If `true`, a diagnostic report is generated on fatal errors, such as out of
memory errors or failed C++ assertions.

```mjs
import { report } from 'node:process';

console.log(`Report on fatal error: ${report.reportOnFatalError}`);
```

```cjs
const { report } = require('node:process');

console.log(`Report on fatal error: ${report.reportOnFatalError}`);
```

### `process.report.reportOnSignal`

* Type: {boolean}

If `true`, a diagnostic report is generated when the process receives the
signal specified by `process.report.signal`.

```mjs
import { report } from 'node:process';

console.log(`Report on signal: ${report.reportOnSignal}`);
```

```cjs
const { report } = require('node:process');

console.log(`Report on signal: ${report.reportOnSignal}`);
```

### `process.report.reportOnUncaughtException`

* Type: {boolean}

If `true`, a diagnostic report is generated on uncaught exception.

```mjs
import { report } from 'node:process';

console.log(`Report on exception: ${report.reportOnUncaughtException}`);
```

```cjs
const { report } = require('node:process');

console.log(`Report on exception: ${report.reportOnUncaughtException}`);
```

### `process.report.excludeEnv`

* Type: {boolean}

If `true`, a diagnostic report is generated without the environment variables.

### `process.report.signal`

* Type: {string}

The signal used to trigger the creation of a diagnostic report. Defaults to
`'SIGUSR2'`.

```mjs
import { report } from 'node:process';

console.log(`Report signal: ${report.signal}`);
```

```cjs
const { report } = require('node:process');

console.log(`Report signal: ${report.signal}`);
```

### `process.report.writeReport(filename)`

* `filename` {string} Name of the file where the report is written. This
  should be a relative path, that will be appended to the directory specified in
  `process.report.directory`, or the current working directory of the Node.js
  process, if unspecified.

* `err` {Error} A custom error used for reporting the JavaScript stack.

* Returns: {string} Returns the filename of the generated report.

Writes a diagnostic report to a file. If `filename` is not provided, the default
filename includes the date, time, PID, and a sequence number. The report's
JavaScript stack trace is taken from `err`, if present.

If the value of `filename` is set to `'stdout'` or `'stderr'`, the report is
written to the stdout or stderr of the process respectively.

```mjs
import { report } from 'node:process';

report.writeReport();
```

```cjs
const { report } = require('node:process');

report.writeReport();
```

Additional documentation is available in the report documentation.
