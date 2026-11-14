---
title: "sys --- System-specific parameters and functions (part 6 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/sys.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# sys --- System-specific parameters and functions (part 6 of 6)

### `thread_info`

A named tuple holding information about the thread
implementation.

### `thread_info.name`

The name of the thread implementation:

- `"nt"`: Windows threads
- `"pthread"`: POSIX threads
- `"pthread-stubs"`: stub POSIX threads
(on WebAssembly platforms without threading support)
- `"solaris"`: Solaris threads

### `thread_info.lock`

The name of the lock implementation:

- `"semaphore"`: a lock uses a semaphore (Python 3.14 and older)
- `"mutex+cond"`: a lock uses a mutex and a condition variable (Python 3.14 and older)
- `"pymutex"`: a lock uses the `PyMutex` implementation (Python 3.15 and newer)
- `None` if this information is unknown

### `thread_info.version`

The name and version of the thread library.
It is a string, or `None` if this information is unknown.

> *Added in version 3.3.*

### `tracebacklimit`

When this variable is set to an integer value, it determines the maximum number
of levels of traceback information printed when an unhandled exception occurs.
The default is `1000`.  When set to `0` or less, all traceback information
is suppressed and only the exception type and value are printed.

### `unraisablehook(unraisable, /)`

Handle an unraisable exception.

Called when an exception has occurred but there is no way for Python to
handle it. For example, when a destructor raises an exception or during
garbage collection (`gc.collect()`).

The *unraisable* argument has the following attributes:

- `exc_type`: Exception type.
- `exc_value`: Exception value, can be `None`.
- `exc_traceback`: Exception traceback, can be `None`.
- `err_msg`: Error message, can be `None`.
- `object`: Object causing the exception, can be `None`.

The default hook formats `err_msg` and `object` as:
`f'{err_msg}: {object!r}'`; use "Exception ignored in" error message
if `err_msg` is `None`. Similar to the `traceback` module,
this adds color to exceptions by default. This can be disabled using
environment variables.

`sys.unraisablehook()` can be overridden to control how unraisable
exceptions are handled.

> *Changed in version 3.15.*
> Exceptions are now printed with colorful text.

> **See also:** `excepthook()` which handles uncaught exceptions.

> **Warning:** Storing `exc_value` using a custom hook can create a reference cycle.
> It should be cleared explicitly to break the reference cycle when the
> exception is no longer needed.
>
> Storing `object` using a custom hook can resurrect it if it is set to an
> object which is being finalized. Avoid storing `object` after the custom
> hook completes to avoid resurrecting objects.

> *Added in version 3.8.*

### `version`

A string containing the version number of the Python interpreter plus additional
information on the build number and compiler used.  This string is displayed
when the interactive interpreter is started.  Do not extract version information
out of it, rather, use `version_info` and the functions provided by the
`platform` module.

### `api_version`

The C API version, equivalent to the C macro `PYTHON_API_VERSION`.
Defined for backwards compatibility.

Currently, this constant is not updated in new Python versions, and is not
useful for versioning. This may change in the future.

### `version_info`

A tuple containing the five components of the version number: *major*, *minor*,
*micro*, *releaselevel*, and *serial*.  All values except *releaselevel* are
integers; the release level is `'alpha'`, `'beta'`, `'candidate'`, or
`'final'`.  The `version_info` value corresponding to the Python version 2.0
is `(2, 0, 0, 'final', 0)`.  The components can also be accessed by name,
so `sys.version_info[0]` is equivalent to `sys.version_info.major`
and so on.

> *Changed in version 3.1.*
> Added named component attributes.

### `warnoptions`

This is an implementation detail of the warnings framework; do not modify this
value.  Refer to the `warnings` module for more information on the warnings
framework.

### `winver`

The version number used to form registry keys on Windows platforms. This is
stored as string resource 1000 in the Python DLL.  The value is normally the
major and minor versions of the running Python interpreter.  It is provided in the `sys`
module for informational purposes; modifying this value has no effect on the
registry keys used by Python.

> **Availability:** Windows.

### `monitoring`

Namespace containing functions and constants for register callbacks
and controlling monitoring events.
See  `sys.monitoring` for details.

### `_xoptions`

A dictionary of the various implementation-specific flags passed through
the `-X` command-line option.  Option names are either mapped to
their values, if given explicitly, or to `True`.  Example:

```shell-session
$ ./python -Xa=b -Xc
Python 3.2a3+ (py3k, Oct 16 2010, 20:14:50)
[GCC 4.4.3] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import sys
>>> sys._xoptions
{'a': 'b', 'c': True}
```

> **CPython implementation detail:** This is a CPython-specific way of accessing options passed through
> `-X`.  Other implementations may export them through other
> means, or not at all.

> *Added in version 3.2.*

**Citations**
