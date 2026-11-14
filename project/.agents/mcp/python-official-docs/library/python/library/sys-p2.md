---
title: "sys --- System-specific parameters and functions (part 2 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/sys.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# sys --- System-specific parameters and functions (part 2 of 6)

### `excepthook(type, value, traceback)`

This function prints out a given traceback and exception to `sys.stderr`.

When an exception other than `SystemExit` is raised and uncaught, the interpreter calls
`sys.excepthook` with three arguments, the exception class, exception
instance, and a traceback object.  In an interactive session this happens just
before control is returned to the prompt; in a Python program this happens just
before the program exits.  The handling of such top-level exceptions can be
customized by assigning another three-argument function to `sys.excepthook`.

> **See also:** The `sys.unraisablehook()` function handles unraisable exceptions
> and the `threading.excepthook()` function handles exception raised
> by `threading.Thread.run()`.

### `__breakpointhook__`

```python
__displayhook__
__excepthook__
__unraisablehook__
```

These objects contain the original values of `breakpointhook`,
`displayhook`, `excepthook`, and `unraisablehook` at the start of the
program.  They are saved so that `breakpointhook`, `displayhook` and
`excepthook`, `unraisablehook` can be restored in case they happen to
get replaced with broken or alternative objects.

> *Added in version 3.7.*
> __breakpointhook__

> *Added in version 3.8.*
> __unraisablehook__

### `exception()`

This function, when called while an exception handler is executing (such as
an `except` or `except*` clause), returns the exception instance that
was caught by this handler. When exception handlers are nested within one
another, only the exception handled by the innermost handler is accessible.

If no exception handler is executing, this function returns `None`.

> *Added in version 3.11.*

### `exc_info()`

This function returns the old-style representation of the handled
exception. If an exception `e` is currently handled (so
`exception()` would return `e`), `exc_info()` returns the
tuple `(type(e), e, e.__traceback__)`.
That is, a tuple containing the type of the exception (a subclass of
`BaseException`), the exception itself, and a :ref:`traceback
object <traceback-objects>` which typically encapsulates the call
stack at the point where the exception last occurred.

If no exception is being handled anywhere on the stack, this function
return a tuple containing three `None` values.

> *Changed in version 3.11.*
> The `type` and `traceback` fields are now derived from the `value`
> (the exception instance), so when an exception is modified while it is
> being handled, the changes are reflected in the results of subsequent
> calls to `exc_info()`.

### `exec_prefix`

A string giving the site-specific directory prefix where the platform-dependent
Python files are installed; by default, this is also `'/usr/local'`.  This can
be set at build time with the `--exec-prefix` argument to the
`configure` script.  Specifically, all configuration files (e.g. the
`pyconfig.h` header file) are installed in the directory
`{exec_prefix}/lib/python{X.Y}/config`, and shared library modules are
installed in `{exec_prefix}/lib/python{X.Y}/lib-dynload`, where *X.Y*
is the version number of Python, for example `3.2`.

> **Note:** If a virtual environment is in effect, this `exec_prefix`
> will point to the virtual environment. The value for the Python installation
> will still be available, via `base_exec_prefix`.
> Refer to sys-path-init-virtual-environments for more information.

> *Changed in version 3.14.*
> When running under a virtual environment,
> `prefix` and `exec_prefix` are now set to the virtual
> environment prefix by the path initialization,
> instead of `site`. This means that `prefix` and
> `exec_prefix` always point to the virtual environment, even when
> `site` is disabled (`-S`).

### `executable`

A string giving the absolute path of the executable binary for the Python
interpreter, on systems where this makes sense. If Python is unable to retrieve
the real path to its executable, `sys.executable` will be an empty string
or `None`.

### `exit([arg])`

Raise a `SystemExit` exception, signaling an intention to exit the interpreter.

The optional argument *arg* can be an integer giving the exit status
(defaulting to zero), or another type of object.  If it is an integer, zero
is considered "successful termination" and any nonzero value is considered
"abnormal termination" by shells and the like.  Most systems require it to be
in the range 0--127, and produce undefined results otherwise.  Some systems
have a convention for assigning specific meanings to specific exit codes, but
these are generally underdeveloped; Unix programs generally use 2 for command
line syntax errors and 1 for all other kinds of errors.  If another type of
object is passed, `None` is equivalent to passing zero, and any other
object is printed to `stderr` and results in an exit code of 1.  In
particular, `sys.exit("some error message")` is a quick way to exit a
program when an error occurs.

Since `exit()` ultimately "only" raises an exception, it will only exit
the process when called from the main thread, and the exception is not
intercepted. Cleanup actions specified by `finally` clauses of
`try` statements are honored, and it is possible to intercept the
exit attempt at an outer level.

> *Changed in version 3.6.*
> If an error occurs in the cleanup after the Python interpreter
> has caught `SystemExit` (such as an error flushing buffered data
> in the standard streams), the exit status is changed to 120.

### `flags`

The named tuple *flags* exposes the status of command line
flags.  Flags should only be accessed only by name and not by index.  The
attributes are read only.

- - .. attribute:: flags.debug
- `-d`

- - .. attribute:: flags.inspect
- `-i`

- - .. attribute:: flags.interactive
- `-i`

- - .. attribute:: flags.isolated
- `-I`

- - .. attribute:: flags.optimize
- `-O` or `-OO`

- - .. attribute:: flags.dont_write_bytecode
- `-B`

- - .. attribute:: flags.no_user_site
- `-s`

- - .. attribute:: flags.no_site
- `-S`

- - .. attribute:: flags.ignore_environment
- `-E`

- - .. attribute:: flags.verbose
- `-v`

- - .. attribute:: flags.bytes_warning
- `-b`

- - .. attribute:: flags.quiet
- `-q`

- - .. attribute:: flags.hash_randomization
- `-R`

- - .. attribute:: flags.dev_mode
- `-X dev` (Python Development Mode)

- - .. attribute:: flags.utf8_mode
- `-X utf8`

- - .. attribute:: flags.safe_path
- `-P`

- - .. attribute:: flags.int_max_str_digits
- `-X int_max_str_digits`
(integer string conversion length limitation)

- - .. attribute:: flags.warn_default_encoding
- `-X warn_default_encoding`

- - .. attribute:: flags.gil
- `-X gil` and `PYTHON_GIL`

- - .. attribute:: flags.thread_inherit_context
- `-X thread_inherit_context` and
`PYTHON_THREAD_INHERIT_CONTEXT`

- - .. attribute:: flags.context_aware_warnings
- `-X context_aware_warnings` and
`PYTHON_CONTEXT_AWARE_WARNINGS`

- - .. attribute:: flags.lazy_imports
- `-X lazy_imports` and `PYTHON_LAZY_IMPORTS`
(`1` for `all`, `-1` otherwise; not changed by
`set_lazy_imports()`)

> *Changed in version 3.2.*
> Added `quiet` attribute for the new `-q` flag.

> *Added in version 3.2.3.*
> The `hash_randomization` attribute.

> *Changed in version 3.3.*
> Removed obsolete `division_warning` attribute.

> *Changed in version 3.4.*
> Added `isolated` attribute for `-I` `isolated` flag.

> *Changed in version 3.7.*
> Added the `dev_mode` attribute for the new :ref:`Python Development
> Mode <devmode>` and the `utf8_mode` attribute for the new  `-X`
> `utf8` flag.

> *Changed in version 3.10.*
> Added `warn_default_encoding` attribute for `-X` `warn_default_encoding` flag.

> *Changed in version 3.11.*
> Added the `safe_path` attribute for `-P` option.

> *Changed in version 3.11.*
> Added the `int_max_str_digits` attribute.

> *Changed in version 3.13.*
> Added the `gil` attribute.

> *Changed in version 3.14.*
> Added the `thread_inherit_context` attribute.

> *Changed in version 3.14.*
> Added the `context_aware_warnings` attribute.

> *Changed in version 3.15.*
> Added the `lazy_imports` attribute.

### `float_info`

A named tuple holding information about the float type. It
contains low level information about the precision and internal
representation.  The values correspond to the various floating-point
constants defined in the standard header file `float.h` for the 'C'
programming language; see section 5.2.4.2.2 of the 1999 ISO/IEC C standard
[C99]_, 'Characteristics of floating types', for details.

Attributes of the `float_info` named tuple

- - attribute
- float.h macro
- explanation

- - .. attribute:: float_info.epsilon
- `DBL_EPSILON`
- difference between 1.0 and the least value greater than 1.0 that is
representable as a float.

See also `math.ulp()`.

- - .. attribute:: float_info.dig
- `DBL_DIG`
- The maximum number of decimal digits that can be faithfully
represented in a float; see below.

- - .. attribute:: float_info.mant_dig
- `DBL_MANT_DIG`
- Float precision: the number of base-`radix` digits in the
significand of a float.

- - .. attribute:: float_info.max
- `DBL_MAX`
- The maximum representable positive finite float.

- - .. attribute:: float_info.max_exp
- `DBL_MAX_EXP`
- The maximum integer *e* such that `radix**(e-1)` is a representable
finite float.

- - .. attribute:: float_info.max_10_exp
- `DBL_MAX_10_EXP`
- The maximum integer *e* such that `10**e` is in the range of
representable finite floats.

- - .. attribute:: float_info.min
- `DBL_MIN`
- The minimum representable positive *normalized* float.

Use `math.ulp(0.0)` to get the smallest positive
*denormalized* representable float.

- - .. attribute:: float_info.min_exp
- `DBL_MIN_EXP`
- The minimum integer *e* such that `radix**(e-1)` is a normalized
float.

- - .. attribute:: float_info.min_10_exp
- `DBL_MIN_10_EXP`
- The minimum integer *e* such that `10**e` is a normalized float.

- - .. attribute:: float_info.radix
- `FLT_RADIX`
- The radix of exponent representation.

- - .. attribute:: float_info.rounds
- `FLT_ROUNDS`
- An integer representing the rounding mode for floating-point arithmetic.
This reflects the value of the system `FLT_ROUNDS` macro
at interpreter startup time:

- `-1`: indeterminable
- `0`: toward zero
- `1`: to nearest
- `2`: toward positive infinity
- `3`: toward negative infinity

All other values for `FLT_ROUNDS` characterize
implementation-defined rounding behavior.

The attribute `sys.float_info.dig` needs further explanation.  If
`s` is any string representing a decimal number with at most
`sys.float_info.dig` significant digits, then converting `s` to a
float and back again will recover a string representing the same decimal
value:

```
>>> import sys
>>> sys.float_info.dig
15
>>> s = '3.14159265358979'    # decimal string with 15 significant digits
>>> format(float(s), '.15g')  # convert to float and back -> same value
'3.14159265358979'
```

But for strings with more than `sys.float_info.dig` significant digits,
this isn't always true:

```
>>> s = '<example-card-number>'    # 16 significant digits is too many!
>>> format(float(s), '.16g')  # conversion changes value
'<example-card-number>'
```

### `float_repr_style`

A string indicating how the `repr()` function behaves for
floats.  If the string has value `'short'` then for a finite
float `x`, `repr(x)` aims to produce a short string with the
property that `float(repr(x)) == x`.  This is the usual behaviour
in Python 3.1 and later.  Otherwise, `float_repr_style` has value
`'legacy'` and `repr(x)` behaves in the same way as it did in
versions of Python prior to 3.1.

> *Added in version 3.1.*

### `getallocatedblocks()`

Return the number of memory blocks currently allocated by the interpreter,
regardless of their size.  This function is mainly useful for tracking
and debugging memory leaks.  Because of the interpreter's internal
caches, the result can vary from call to call; you may have to call
`_clear_internal_caches()` and `gc.collect()` to get more
predictable results.

If a Python build or implementation cannot reasonably compute this
information, `getallocatedblocks()` is allowed to return 0 instead.

> *Added in version 3.4.*

### `getunicodeinternedsize()`

Return the number of unicode objects that have been interned.

> *Added in version 3.12.*

### `getandroidapilevel()`

Return the build-time API level of Android as an integer. This represents the
minimum version of Android this build of Python can run on. For runtime
version information, see `platform.android_ver()`.

> **Availability:** Android.

> *Added in version 3.7.*

### `getdefaultencoding()`

Return `'utf-8'`. This is the name of the default string encoding, used
in methods like `str.encode()`.

### `getdlopenflags()`

Return the current value of the flags that are used for
`dlopen` calls.  Symbolic names for the flag values can be
found in the `os` module (`RTLD_{xxx}` constants, e.g.
`os.RTLD_LAZY`).

> **Availability:** Unix.

### `getfilesystemencoding()`

Get the filesystem encoding:
the encoding used with the :term:`filesystem error handler <filesystem
encoding and error handler>` to convert between Unicode filenames and bytes
filenames. The filesystem error handler is returned from
`getfilesystemencodeerrors()`.

For best compatibility, str should be used for filenames in all cases,
although representing filenames as bytes is also supported. Functions
accepting or returning filenames should support either str or bytes and
internally convert to the system's preferred representation.

`os.fsencode()` and `os.fsdecode()` should be used to ensure that
the correct encoding and errors mode are used.

The filesystem encoding and error handler are configured at Python
startup by the `PyConfig_Read` function: see
`filesystem_encoding` and
`filesystem_errors` members of `PyConfig`.

> *Changed in version 3.2.*
> `getfilesystemencoding()` result cannot be `None` anymore.

> *Changed in version 3.6.*
> Windows is no longer guaranteed to return `'mbcs'`. See PEP 529
> and `_enablelegacywindowsfsencoding()` for more information.

> *Changed in version 3.7.*
> Return `'utf-8'` if the Python UTF-8 Mode is
> enabled.

### `getfilesystemencodeerrors()`

Get the :term:`filesystem error handler <filesystem encoding and error
handler>`: the error handler used with the :term:`filesystem encoding
<filesystem encoding and error handler>` to convert between Unicode
filenames and bytes filenames. The filesystem encoding is returned from
`getfilesystemencoding()`.

`os.fsencode()` and `os.fsdecode()` should be used to ensure that
the correct encoding and errors mode are used.

The filesystem encoding and error handler are configured at Python
startup by the `PyConfig_Read` function: see
`filesystem_encoding` and
`filesystem_errors` members of `PyConfig`.

> *Added in version 3.6.*

### `get_int_max_str_digits()`

Returns the current value for the :ref:`integer string conversion length
limitation <int_max_str_digits>`. See also `set_int_max_str_digits()`.

> *Added in version 3.11.*
