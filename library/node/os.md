---
title: "OS (part 1 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/os.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# OS

> Stability: 2 - Stable

The `node:os` module provides operating system-related utility methods and
properties. It can be accessed using:

```mjs
import os from 'node:os';
```

```cjs
const os = require('node:os');
```

## `os.EOL`

* Type: {string}

The operating system-specific end-of-line marker.

* `\n` on POSIX
* `\r\n` on Windows

## `os.availableParallelism()`

* Returns: {integer}

Returns an estimate of the default amount of parallelism a program should use.
Always returns a value greater than zero.

This function is a small wrapper about libuv's `uv_available_parallelism()`.

## `os.arch()`

* Returns: {string}

Returns the operating system CPU architecture for which the Node.js binary was
compiled. Possible values are `'arm'`, `'arm64'`, `'ia32'`, `'loong64'`,
`'mips'`, `'mipsel'`, `'ppc64'`, `'riscv64'`, `'s390x'`, and `'x64'`.

The return value is equivalent to `process.arch`.

## `os.constants`

* Type: {Object}

Contains commonly used operating system-specific constants for error codes,
process signals, and so on. The specific constants defined are described in
OS constants.

## `os.cpus()`

* Returns: {Object\[]}

Returns an array of objects containing information about each logical CPU core.
The array will be empty if no CPU information is available, such as if the
`/proc` file system is unavailable.

The properties included on each object include:

* `model` {string}
* `speed` {number} (in MHz)
* `times` {Object}
  * `user` {number} The number of milliseconds the CPU has spent in user mode.
  * `nice` {number} The number of milliseconds the CPU has spent in nice mode.
  * `sys` {number} The number of milliseconds the CPU has spent in sys mode.
  * `idle` {number} The number of milliseconds the CPU has spent in idle mode.
  * `irq` {number} The number of milliseconds the CPU has spent in irq mode.

```js
[
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 252020,
      nice: 0,
      sys: 30340,
      idle: 1070356870,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 306960,
      nice: 0,
      sys: 26980,
      idle: 1071569080,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 248450,
      nice: 0,
      sys: 21750,
      idle: 1070919370,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 256880,
      nice: 0,
      sys: 19430,
      idle: 1070905480,
      irq: 20,
    },
  },
];
```

`nice` values are POSIX-only. On Windows, the `nice` values of all processors
are always 0.

`os.cpus().length` should not be used to calculate the amount of parallelism
available to an application. Use
`os.availableParallelism()` for this purpose.

## `os.devNull`

* Type: {string}

The platform-specific file path of the null device.

* `\\.\nul` on Windows
* `/dev/null` on POSIX

## `os.endianness()`

* Returns: {string}

Returns a string identifying the endianness of the CPU for which the Node.js
binary was compiled.

Possible values are `'BE'` for big endian and `'LE'` for little endian.

## `os.freemem()`

* Returns: {integer}

Returns the amount of free system memory in bytes as an integer.

## `os.getPriority([pid])`

* `pid` {integer} The process ID to retrieve scheduling priority for.
  **Default:** `0`.
* Returns: {integer}

Returns the scheduling priority for the process specified by `pid`. If `pid` is
not provided or is `0`, the priority of the current process is returned.

## `os.homedir()`

* Returns: {string}

Returns the string path of the current user's home directory.

On POSIX, it uses the `$HOME` environment variable if defined. Otherwise it
uses the effective UID to look up the user's home directory.

On Windows, it uses the `USERPROFILE` environment variable if defined.
Otherwise it uses the path to the profile directory of the current user.

## `os.hostname()`

* Returns: {string}

Returns the host name of the operating system as a string.

## `os.loadavg()`

* Returns: {number\[]}

Returns an array containing the 1, 5, and 15 minute load averages.

The load average is a measure of system activity calculated by the operating
system and expressed as a fractional number.

The load average is a Unix-specific concept. On Windows, the return value is
always `[0, 0, 0]`.

## `os.machine()`

* Returns: {string}

Returns the machine type as a string, such as `arm`, `arm64`, `aarch64`,
`mips`, `mips64`, `ppc64`, `ppc64le`, `s390x`, `i386`, `i686`, `x86_64`.

On POSIX systems, the machine type is determined by calling
`uname(3)`. On Windows, `RtlGetVersion()` is used, and if it is not
available, `GetVersionExW()` will be used. See
<https://en.wikipedia.org/wiki/Uname#Examples> for more information.

## `os.networkInterfaces()`

* Returns: {Object}

Returns an object containing network interfaces that have been assigned a
network address.

Each key on the returned object identifies a network interface. The associated
value is an array of objects that each describe an assigned network address.

The properties available on the assigned network address object include:

* `address` {string} The assigned IPv4 or IPv6 address
* `netmask` {string} The IPv4 or IPv6 network mask
* `family` {string} Either `IPv4` or `IPv6`
* `mac` {string} The MAC address of the network interface
* `internal` {boolean} `true` if the network interface is a loopback or
  similar interface that is not remotely accessible; otherwise `false`
* `scopeid` {number} The numeric IPv6 scope ID (only specified when `family`
  is `IPv6`)
* `cidr` {string} The assigned IPv4 or IPv6 address with the routing prefix
  in CIDR notation. If the `netmask` is invalid, this property is set
  to `null`.

```json
{
  "lo": [
    {
      "address": "127.0.0.1",
      "netmask": "255.0.0.0",
      "family": "IPv4",
      "mac": "00:00:00:00:00:00",
      "internal": true,
      "cidr": "127.0.0.1/8"
    },
    {
      "address": "::1",
      "netmask": "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff",
      "family": "IPv6",
      "mac": "00:00:00:00:00:00",
      "scopeid": 0,
      "internal": true,
      "cidr": "::1/128"
    }
  ],
  "eth0": [
    {
      "address": "192.168.1.108",
      "netmask": "255.255.255.0",
      "family": "IPv4",
      "mac": "01:02:03:0a:0b:0c",
      "internal": false,
      "cidr": "192.168.1.108/24"
    },
    {
      "address": "fe80::a00:27ff:fe4e:66a1",
      "netmask": "ffff:ffff:ffff:ffff::",
      "family": "IPv6",
      "mac": "01:02:03:0a:0b:0c",
      "scopeid": 1,
      "internal": false,
      "cidr": "fe80::a00:27ff:fe4e:66a1/64"
    }
  ]
}
```

## `os.platform()`

* Returns: {string}

Returns a string identifying the operating system platform for which
the Node.js binary was compiled. The value is set at compile time.
Possible values are `'aix'`, `'darwin'`, `'freebsd'`,`'linux'`,
`'openbsd'`, `'sunos'`, and `'win32'`.

The return value is equivalent to `process.platform`.

The value `'android'` may also be returned if Node.js is built on the Android
operating system. Android support is experimental.

## `os.release()`

* Returns: {string}

Returns the operating system as a string.

On POSIX systems, the operating system release is determined by calling
`uname(3)`. On Windows, `GetVersionExW()` is used. See
<https://en.wikipedia.org/wiki/Uname#Examples> for more information.

## `os.setPriority([pid, ]priority)`

* `pid` {integer} The process ID to set scheduling priority for.
  **Default:** `0`.
* `priority` {integer} The scheduling priority to assign to the process.

Attempts to set the scheduling priority for the process specified by `pid`. If
`pid` is not provided or is `0`, the process ID of the current process is used.

The `priority` input must be an integer between `-20` (high priority) and `19`
(low priority). Due to differences between Unix priority levels and Windows
priority classes, `priority` is mapped to one of six priority constants in
`os.constants.priority`. When retrieving a process priority level, this range
mapping may cause the return value to be slightly different on Windows. To avoid
confusion, set `priority` to one of the priority constants.

On Windows, setting priority to `PRIORITY_HIGHEST` requires elevated user
privileges. Otherwise the set priority will be silently reduced to
`PRIORITY_HIGH`.

## `os.tmpdir()`

* Returns: {string}

Returns the operating system's default directory for temporary files as a
string.

On Windows, the result can be overridden by `TEMP` and `TMP` environment variables, and
`TEMP` takes precedence over `TMP`. If neither is set, it defaults to `%SystemRoot%\temp`
or `%windir%\temp`.

On non-Windows platforms, `TMPDIR`, `TMP` and `TEMP` environment variables will be checked
to override the result of this method, in the described order. If none of them is set, it
defaults to `/tmp`.

Some operating system distributions would either configure `TMPDIR` (non-Windows) or
`TEMP` and `TMP` (Windows) by default without additional configurations by the system
administrators. The result of `os.tmpdir()` typically reflects the system preference
unless it's explicitly overridden by the users.

## `os.totalmem()`

* Returns: {integer}

Returns the total amount of system memory in bytes as an integer.

## `os.type()`

* Returns: {string}

Returns the operating system name as returned by `uname(3)`. For example, it
returns `'Linux'` on Linux, `'Darwin'` on macOS, and `'Windows_NT'` on Windows.

See <https://en.wikipedia.org/wiki/Uname#Examples> for additional information
about the output of running `uname(3)` on various operating systems.

## `os.uptime()`

* Returns: {integer}

Returns the system uptime in number of seconds.

## `os.userInfo([options])`

* `options` {Object}
  * `encoding` {string} Character encoding used to interpret resulting strings.
    If `encoding` is set to `'buffer'`, the `username`, `shell`, and `homedir`
    values will be `Buffer` instances. **Default:** `'utf8'`.
* Returns: {Object}

Returns information about the currently effective user. On POSIX platforms,
this is typically a subset of the password file. The returned object includes
the `username`, `uid`, `gid`, `shell`, and `homedir`. On Windows, the `uid` and
`gid` fields are `-1`, and `shell` is `null`.

The value of `homedir` returned by `os.userInfo()` is provided by the operating
system. This differs from the result of `os.homedir()`, which queries
environment variables for the home directory before falling back to the
operating system response.

Throws a `SystemError` if a user has no `username` or `homedir`.

## `os.version()`

* Returns: {string}

Returns a string identifying the kernel version.

On POSIX systems, the operating system release is determined by calling
`uname(3)`. On Windows, `RtlGetVersion()` is used, and if it is not
available, `GetVersionExW()` will be used. See
<https://en.wikipedia.org/wiki/Uname#Examples> for more information.
