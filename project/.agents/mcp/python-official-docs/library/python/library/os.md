---
title: "os --- Miscellaneous operating system interfaces (part 1 of 16)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/os.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `os` --- Miscellaneous operating system interfaces

Module `os`.

**Source code:** Lib/os.py

This module provides a portable way of using operating system dependent
functionality.  If you just want to read or write a file see `open()`, if
you want to manipulate paths, see the `os.path` module, and if you want to
read all the lines in all the files on the command line see the `fileinput`
module.  For creating temporary files and directories see the `tempfile`
module, and for high-level file and directory handling see the `shutil`
module.

Notes on the availability of these functions:

- The design of all built-in operating system dependent modules of Python is
such that as long as the same functionality is available, it uses the same
interface; for example, the function `os.stat(path)` returns stat
information about *path* in the same format (which happens to have originated
with the POSIX interface).

- Extensions peculiar to a particular operating system are also available
through the `os` module, but using them is of course a threat to
portability.

- All functions accepting path or file names accept both bytes and string
objects, and result in an object of the same type, if a path or file name is
returned.

- On VxWorks, os.popen, os.fork, os.execv and os.spawn*p* are not supported.

- On WebAssembly platforms, Android and iOS, large parts of the `os` module are
not available or behave differently. APIs related to processes (e.g.
`fork()`, `execve()`) and resources (e.g. `nice()`)
are not available. Others like `getuid()` and `getpid()` are
emulated or stubs. WebAssembly platforms also lack support for signals (e.g.
`kill()`, `wait()`).

> **Note:** All functions in this module raise `OSError` (or subclasses thereof) in
> the case of invalid or inaccessible file names and paths, or other arguments
> that have the correct type, but are not accepted by the operating system.

### exception `error`

An alias for the built-in `OSError` exception.

### `name`

The name of the operating system dependent module imported.  The following
names have currently been registered: `'posix'`, `'nt'`,
`'java'`.

> **See also:** `sys.platform` has a finer granularity.  `os.uname()` gives
> system-dependent version information.
>
> The `platform` module provides detailed checks for the
> system's identity.

## File Names, Command Line Arguments, and Environment Variables

In Python, file names, command line arguments, and environment variables are
represented using the string type. On some systems, decoding these strings to
and from bytes is necessary before passing them to the operating system. Python
uses the filesystem encoding and error handler to perform this
conversion (see `sys.getfilesystemencoding()`).

The filesystem encoding and error handler are configured at Python
startup by the `PyConfig_Read` function: see
`filesystem_encoding` and
`filesystem_errors` members of `PyConfig`.

> *Changed in version 3.1.*
> On some systems, conversion using the file system encoding may fail. In this
> case, Python uses the :ref:`surrogateescape encoding error handler
> <surrogateescape>`, which means that undecodable bytes are replaced by a
> Unicode character U+DC*xx* on decoding, and these are again
> translated to the original byte on encoding.

The file system encoding must
guarantee to successfully decode all bytes below 128. If the file system
encoding fails to provide this guarantee, API functions can raise
`UnicodeError`.

See also the locale encoding.

## Python UTF-8 Mode

> *Added in version 3.7.*
> See PEP 540 for more details.

> *Changed in version 3.15.*
> Python UTF-8 mode is now enabled by default (PEP 686).
> It may be disabled by setting `PYTHONUTF8=0` as
> an environment variable or by using the `-X utf8=0` command line option.

The Python UTF-8 Mode ignores the locale encoding and forces the usage
of the UTF-8 encoding:

- Use UTF-8 as the :term:`filesystem encoding <filesystem encoding and error
handler>`.
- `sys.getfilesystemencoding()` returns `'utf-8'`.
- `locale.getpreferredencoding()` returns `'utf-8'` (the *do_setlocale*
argument has no effect).
- `sys.stdin`, `sys.stdout`, and `sys.stderr` all use
UTF-8 as their text encoding, with the `surrogateescape`
error handler being enabled for `sys.stdin`
and `sys.stdout` (`sys.stderr` continues to use
`backslashreplace` as it does in the default locale-aware mode)
- On Unix, `os.device_encoding()` returns `'utf-8'` rather than the
device encoding.

Note that the standard stream settings in UTF-8 mode can be overridden by
`PYTHONIOENCODING` (just as they can be in the default locale-aware
mode).

As a consequence of the changes in those lower level APIs, other higher
level APIs also exhibit different default behaviours:

- Command line arguments, environment variables and filenames are decoded
to text using the UTF-8 encoding.
- `os.fsdecode()` and `os.fsencode()` use the UTF-8 encoding.
- `open()`, `io.open()`, and `codecs.open()` use the UTF-8
encoding by default. However, they still use the strict error handler by
default so that attempting to open a binary file in text mode is likely
to raise an exception rather than producing nonsense data.

The Python UTF-8 Mode is enabled by default.
It can be disabled using the `-X utf8=0` command line
option or the `PYTHONUTF8=0` environment variable.
The Python UTF-8 Mode can only be disabled at Python startup. Its value
can be read from `sys.flags.utf8_mode`.

If the UTF-8 mode is disabled, the interpreter defaults to using
the current locale settings, *unless* the current locale is identified
as a legacy ASCII-based locale (as described for `PYTHONCOERCECLOCALE`),
and locale coercion is either disabled or fails.
In such legacy locales, the interpreter will default to enabling UTF-8 mode
unless explicitly instructed not to do so.

See also the UTF-8 mode on Windows
and the filesystem encoding and error handler.
