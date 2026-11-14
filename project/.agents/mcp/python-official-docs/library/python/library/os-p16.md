---
title: "os --- Miscellaneous operating system interfaces (part 16 of 16)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/os.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# os --- Miscellaneous operating system interfaces (part 16 of 16)

## Miscellaneous System Information

### `confstr(name, /)`

Return string-valued system configuration values. *name* specifies the
configuration value to retrieve; it may be a string which is the name of a
defined system value; these names are specified in a number of standards (POSIX,
Unix 95, Unix 98, and others).  Some platforms define additional names as well.
The names known to the host operating system are given as the keys of the
`confstr_names` dictionary.  For configuration variables not included in that
mapping, passing an integer for *name* is also accepted.

If the configuration value specified by *name* isn't defined, `None` is
returned.

If *name* is a string and is not known, `ValueError` is raised.  If a
specific value for *name* is not supported by the host system, even if it is
included in `confstr_names`, an `OSError` is raised with
`errno.EINVAL` for the error number.

> **Availability:** Unix.

### `confstr_names`

Dictionary mapping names accepted by `confstr()` to the integer values
defined for those names by the host operating system. This can be used to
determine the set of names known to the system.

> **Availability:** Unix.

### `cpu_count()`

Return the number of logical CPUs in the **system**. Returns `None` if
undetermined.

The `process_cpu_count()` function can be used to get the number of
logical CPUs usable by the calling thread of the **current process**.

> *Added in version 3.4.*

> *Changed in version 3.13.*
> If `-X cpu_count` is given or `PYTHON_CPU_COUNT` is set,
> `cpu_count()` returns the override value *n*.

### `getloadavg()`

Return the number of processes in the system run queue averaged over the last
1, 5, and 15 minutes or raises `OSError` if the load average was
unobtainable.

> **Availability:** Unix.

### `process_cpu_count()`

Get the number of logical CPUs usable by the calling thread of the **current
process**. Returns `None` if undetermined. It can be less than
`cpu_count()` depending on the CPU affinity.

The `cpu_count()` function can be used to get the number of logical CPUs
in the **system**.

If `-X cpu_count` is given or `PYTHON_CPU_COUNT` is set,
`process_cpu_count()` returns the override value *n*.

See also the `sched_getaffinity()` function.

> *Added in version 3.13.*

### `sysconf(name, /)`

Return integer-valued system configuration values. If the configuration value
specified by *name* isn't defined, `-1` is returned.  The comments regarding
the *name* parameter for `confstr()` apply here as well; the dictionary that
provides information on the known names is given by `sysconf_names`.

> **Availability:** Unix.

### `sysconf_names`

Dictionary mapping names accepted by `sysconf()` to the integer values
defined for those names by the host operating system. This can be used to
determine the set of names known to the system.

> **Availability:** Unix.

> *Changed in version 3.11.*
> Add `'SC_MINSIGSTKSZ'` name.

The following data values are used to support path manipulation operations.  These
are defined for all platforms.

Higher-level operations on pathnames are defined in the `os.path` module.

### `curdir`

The constant string used by the operating system to refer to the current
directory. This is `'.'` for Windows and POSIX. Also available via
`os.path`.

### `pardir`

The constant string used by the operating system to refer to the parent
directory. This is `'..'` for Windows and POSIX. Also available via
`os.path`.

### `sep`

The character used by the operating system to separate pathname components.
This is `'/'` for POSIX and `'\'` for Windows.  Note that knowing this
is not sufficient to be able to parse or concatenate pathnames --- use
`os.path.split()` and `os.path.join()` --- but it is occasionally
useful. Also available via `os.path`.

### `altsep`

An alternative character used by the operating system to separate pathname
components, or `None` if only one separator character exists.  This is set to
`'/'` on Windows systems where `sep` is a backslash. Also available via
`os.path`.

### `extsep`

The character which separates the base filename from the extension; for example,
the `'.'` in `os.py`. Also available via `os.path`.

### `pathsep`

The character conventionally used by the operating system to separate search
path components (as in `PATH`), such as `':'` for POSIX or `';'` for
Windows. Also available via `os.path`.

### `defpath`

The default search path used by `exec*p*()` and
`spawn*p*()` if the environment doesn't have a `'PATH'`
key. Also available via `os.path`.

### `linesep`

The string used to separate (or, rather, terminate) lines on the current
platform.  This may be a single character, such as `'\n'` for POSIX, or
multiple characters, for example, `'\r\n'` for Windows. Do not use
*os.linesep* as a line terminator when writing files opened in text mode (the
default); use a single `'\n'` instead, on all platforms.

### `devnull`

The file path of the null device. For example: `'/dev/null'` for
POSIX, `'nul'` for Windows.  Also available via `os.path`.

### `RTLD_LAZY`

```python
RTLD_NOW
RTLD_GLOBAL
RTLD_LOCAL
RTLD_NODELETE
RTLD_NOLOAD
RTLD_DEEPBIND
```

Flags for use with the `setdlopenflags()` and
`getdlopenflags()` functions.  See the Unix manual page
dlopen(3) for what the different flags mean.

> *Added in version 3.3.*

## Random numbers

### `getrandom(size, flags=0)`

Get up to *size* random bytes. The function can return less bytes than
requested.

These bytes can be used to seed user-space random number generators or for
cryptographic purposes.

`getrandom()` relies on entropy gathered from device drivers and other
sources of environmental noise. Unnecessarily reading large quantities of
data will have a negative impact on  other users  of the `/dev/random` and
`/dev/urandom` devices.

The flags argument is a bit mask that can contain zero or more of the
following values ORed together: `os.GRND_RANDOM` and
`GRND_NONBLOCK`.

See also the `Linux getrandom() manual page
<https://man7.org/linux/man-pages/man2/getrandom.2.html>`_.

> **Availability:** Linux >= 3.17.

> *Added in version 3.6.*

### `urandom(size, /)`

Return a bytestring of *size* random bytes suitable for cryptographic use.

This function returns random bytes from an OS-specific randomness source.  The
returned data should be unpredictable enough for cryptographic applications,
though its exact quality depends on the OS implementation.

On Linux, if the `getrandom()` syscall is available, it is used in
blocking mode: block until the system urandom entropy pool is initialized
(128 bits of entropy are collected by the kernel). See the PEP 524 for
the rationale. On Linux, the `getrandom()` function can be used to get
random bytes in non-blocking mode (using the `GRND_NONBLOCK` flag) or
to poll until the system urandom entropy pool is initialized.

On a Unix-like system, random bytes are read from the `/dev/urandom`
device. If the `/dev/urandom` device is not available or not readable, the
`NotImplementedError` exception is raised.

On Windows, it will use `BCryptGenRandom()`.

> **See also:** The `secrets` module provides higher level functions. For an
> easy-to-use interface to the random number generator provided by your
> platform, please see `random.SystemRandom`.

> *Changed in version 3.5.*
> On Linux 3.17 and newer, the `getrandom()` syscall is now used
> when available.  On OpenBSD 5.6 and newer, the C `getentropy()`
> function is now used. These functions avoid the usage of an internal file
> descriptor.

> *Changed in version 3.5.2.*
> On Linux, if the `getrandom()` syscall blocks (the urandom entropy pool
> is not initialized yet), fall back on reading `/dev/urandom`.

> *Changed in version 3.6.*
> On Linux, `getrandom()` is now used in blocking mode to increase the
> security.

> *Changed in version 3.11.*
> On Windows, `BCryptGenRandom()` is used instead of `CryptGenRandom()`
> which is deprecated.

### `GRND_NONBLOCK`

By  default, when reading from `/dev/random`, `getrandom()` blocks if
no random bytes are available, and when reading from `/dev/urandom`, it blocks
if the entropy pool has not yet been initialized.

If the `GRND_NONBLOCK` flag is set, then `getrandom()` does not
block in these cases, but instead immediately raises `BlockingIOError`.

> *Added in version 3.6.*

### `GRND_RANDOM`

If  this  bit  is  set,  then  random bytes are drawn from the
`/dev/random` pool instead of the `/dev/urandom` pool.

> *Added in version 3.6.*
