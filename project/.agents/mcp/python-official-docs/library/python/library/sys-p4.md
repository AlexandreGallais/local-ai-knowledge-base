---
title: "sys --- System-specific parameters and functions (part 4 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/sys.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# sys --- System-specific parameters and functions (part 4 of 6)

### `_jit.is_available()`

Return `True` if the current Python executable supports JIT compilation,
and `False` otherwise.  This can be controlled by building CPython with
the `--experimental-jit` option on Windows, and the
`--enable-experimental-jit` option on all other platforms.

### `_jit.is_enabled()`

Return `True` if JIT compilation is enabled for the current Python
process (implies `sys._jit.is_available()`), and `False` otherwise.
If JIT compilation is available, this can be controlled by setting the
`PYTHON_JIT` environment variable to `0` (disabled) or `1`
(enabled) at interpreter startup.

### `_jit.is_active()`

Return `True` if the topmost Python frame is currently executing JIT
code (implies `sys._jit.is_enabled()`), and `False` otherwise.

> **Note:** This function is intended for testing and debugging the JIT itself.
> It should be avoided for any other purpose.

> **Note:** Due to the nature of tracing JIT compilers, repeated calls to this
> function may give surprising results. For example, branching on its
> return value will likely lead to unexpected behavior (if doing so
> causes JIT code to be entered or exited):
>
>
> ```pycon
> >>> for warmup in range(BIG_NUMBER):
> ...     # This line is "hot", and is eventually JIT-compiled:
> ...     if sys._jit.is_active():
> ...         # This line is "cold", and is run in the interpreter:
> ...         assert sys._jit.is_active()
> ...
> Traceback (most recent call last):
>   File "<stdin>", line 5, in <module>
>     assert sys._jit.is_active()
>            ~~~~~~~~~~~~~~~~~~^^
> AssertionError
> ```
>

### `last_exc`

This variable is not always defined; it is set to the exception instance
when an exception is not handled and the interpreter prints an error message
and a stack traceback.  Its intended use is to allow an interactive user to
import a debugger module and engage in post-mortem debugging without having
to re-execute the command that caused the error.  (Typical use is
`import pdb; pdb.pm()` to enter the post-mortem debugger; see `pdb`
module for more information.)

> *Added in version 3.12.*

### `_is_immortal(op)`

Return `True` if the given object is immortal, `False`
otherwise.

> **Note:** Objects that are immortal (and thus return `True` upon being passed
> to this function) are not guaranteed to be immortal in future versions,
> and vice versa for mortal objects.

> *Added in version 3.14.*

> **CPython implementation detail:** This function should be used for specialized purposes only.
> It is not guaranteed to exist in all implementations of Python.

### `_is_interned(string)`

Return `True` if the given string is "interned", `False`
otherwise.

> *Added in version 3.13.*

> **CPython implementation detail:** It is not guaranteed to exist in all implementations of Python.

### `last_type`

```python
last_value
last_traceback
```

These three variables are deprecated; use `sys.last_exc` instead.
They hold the legacy representation of `sys.last_exc`, as returned
from `exc_info()` above.

### `lazy_modules`

A `set` of fully qualified module name strings that have been lazily
imported in the current interpreter but not yet loaded.
When a lazily imported module is accessed for the first time, its name is
typically removed from this set.

The set may contain some additional strings.
It is intended for debugging and introspection, and consumers are expected
to verify each entry's status.

> **CPython implementation detail:** Currently, `lazy_modules` may also contain:
>
> - names of *attributes* (non-modules), such as `"pathlib.Path"` after
> running `lazy from pathlib import Path`, and
> - names of items than have already been accessed.
>
> In future versions of Python, these may be removed, and/or additional
> extras may be added.

See also `set_lazy_imports()` and PEP 810.

> *Added in version 3.15.*

### `maxsize`

An integer giving the maximum value a variable of type `Py_ssize_t` can
take.  It's usually `2**31 - 1` on a 32-bit platform and `2**63 - 1` on a
64-bit platform.

### `maxunicode`

An integer giving the value of the largest Unicode code point,
i.e. `1114111` (`0x10FFFF` in hexadecimal).

> *Changed in version 3.3.*
> Before PEP 393, `sys.maxunicode` used to be either `0xFFFF`
> or `0x10FFFF`, depending on the configuration option that specified
> whether Unicode characters were stored as UCS-2 or UCS-4.

### `meta_path`

A list of meta path finder objects that have their
`find_spec()` methods called to see if one
of the objects can find the module to be imported. By default, it holds entries
that implement Python's default import semantics. The
`find_spec()` method is called with at
least the absolute name of the module being imported. If the module to be
imported is contained in a package, then the parent package's
`__path__`
attribute is passed in as a second argument. The method returns a
module spec, or `None` if the module cannot be found.

> **See also:** `importlib.abc.MetaPathFinder`
> The abstract base class defining the interface of finder objects on
> `meta_path`.
> `importlib.machinery.ModuleSpec`
> The concrete class which
> `find_spec()` should return
> instances of.

> *Changed in version 3.4.*
> Module specs were introduced in Python 3.4, by
> PEP 451.

> *Changed in version 3.12.*
> Removed the fallback that looked for a `find_module()` method
> if a `meta_path` entry didn't have a
> `find_spec()` method.

### `modules`

This is a dictionary that maps module names to modules which have already been
loaded.  This can be manipulated to force reloading of modules and other tricks.
However, replacing the dictionary will not necessarily work as expected and
deleting essential items from the dictionary may cause Python to fail.  If
you want to iterate over this global dictionary always use
`sys.modules.copy()` or `tuple(sys.modules)` to avoid exceptions as its
size may change during iteration as a side effect of code or activity in
other threads.

### `orig_argv`

The list of the original command line arguments passed to the Python
executable.

The elements of `sys.orig_argv` are the arguments to the Python interpreter,
while the elements of `sys.argv` are the arguments to the user's program.
Arguments consumed by the interpreter itself will be present in `sys.orig_argv`
and missing from `sys.argv`.

> *Added in version 3.10.*

### `path`

A list of strings that specifies the search path for modules. Initialized from
the environment variable `PYTHONPATH`, plus an installation-dependent
default.

By default, as initialized upon program startup, a potentially unsafe path
is prepended to `sys.path` (*before* the entries inserted as a result
of `PYTHONPATH`):

- `python -m module` command line: prepend the current working
directory.
- `python script.py` command line: prepend the script's directory.
If it's a symbolic link, resolve symbolic links.
- `python -c code` and `python` (REPL) command lines: prepend an empty
string, which means the current working directory.

To not prepend this potentially unsafe path, use the `-P` command
line option or the `PYTHONSAFEPATH` environment variable.

A program is free to modify this list for its own purposes.  Only strings
should be added to `sys.path`; all other data types are
ignored during import.

> **See also:** - Module `site` This describes how to use .pth files to
> extend `sys.path`.

### `path_hooks`

A list of callables that take a path argument to try to create a
finder for the path. If a finder can be created, it is to be
returned by the callable, else raise `ImportError`.

Originally specified in PEP 302.

### `path_importer_cache`

A dictionary acting as a cache for finder objects. The keys are
paths that have been passed to `sys.path_hooks` and the values are
the finders that are found. If a path is a valid file system path but no
finder is found on `sys.path_hooks` then `None` is
stored.

Originally specified in PEP 302.

### `platform`

A string containing a platform identifier. Known values are:

```text
================ ===========================
System           ``platform`` value
================ ===========================
AIX              ``'aix'``
Android          ``'android'``
Emscripten       ``'emscripten'``
FreeBSD          ``'freebsd'``
iOS              ``'ios'``
Linux            ``'linux'``
macOS            ``'darwin'``
Windows          ``'win32'``
Windows/Cygwin   ``'cygwin'``
WASI             ``'wasi'``
================ ===========================
```

On Unix systems not listed in the table, the value is the lowercased OS name
as returned by `uname -s`, with the first part of the version as returned by
`uname -r` appended, e.g. `'sunos5'`, *at the time when Python was built*.
Unless you want to test for a specific system version, it is therefore
recommended to use the following idiom:

```
if sys.platform.startswith('sunos'):
    # SunOS-specific code here...
```

> *Changed in version 3.3.*
> On Linux, `sys.platform` doesn't contain the major version anymore.
> It is always `'linux'`, instead of `'linux2'` or `'linux3'`.

> *Changed in version 3.8.*
> On AIX, `sys.platform` doesn't contain the major version anymore.
> It is always `'aix'`, instead of `'aix5'` or `'aix7'`.

> *Changed in version 3.13.*
> On Android, `sys.platform` now returns `'android'` rather than
> `'linux'`.

> *Changed in version 3.14.*
> On FreeBSD, `sys.platform` doesn't contain the major version anymore.
> It is always `'freebsd'`, instead of `'freebsd13'` or `'freebsd14'`.

> **See also:** `os.name` has a coarser granularity.  `os.uname()` gives
> system-dependent version information.
>
> The `platform` module provides detailed checks for the
> system's identity.

### `platlibdir`

Name of the platform-specific library directory. It is used to build the
path of standard library and the paths of installed extension modules.

It is equal to `"lib"` on most platforms. On Fedora and SuSE, it is equal
to `"lib64"` on 64-bit platforms which gives the following `sys.path`
paths (where `X.Y` is the Python `major.minor` version):

- `/usr/lib64/pythonX.Y/`:
Standard library (like `os.py` of the `os` module)
- `/usr/lib64/pythonX.Y/lib-dynload/`:
C extension modules of the standard library (like the `errno` module,
the exact filename is platform specific)
- `/usr/lib/pythonX.Y/site-packages/` (always use `lib`, not
`sys.platlibdir`): Third-party modules
- `/usr/lib64/pythonX.Y/site-packages/`:
C extension modules of third-party packages

> *Added in version 3.9.*

### `prefix`

A string giving the site-specific directory prefix where the platform
independent Python files are installed; on Unix, the default is
`/usr/local`. This can be set at build time with the `--prefix`
argument to the `configure` script.  See
installation_paths for derived paths.

> **Note:** If a virtual environment is in effect, this `prefix`
> will point to the virtual environment. The value for the Python installation
> will still be available, via `base_prefix`.
> Refer to sys-path-init-virtual-environments for more information.

> *Changed in version 3.14.*
> When running under a virtual environment,
> `prefix` and `exec_prefix` are now set to the virtual
> environment prefix by the path initialization,
> instead of `site`. This means that `prefix` and
> `exec_prefix` always point to the virtual environment, even when
> `site` is disabled (`-S`).

### `ps1`

```python
ps2
```

Strings specifying the primary and secondary prompt of the interpreter.  These
are only defined if the interpreter is in interactive mode.  Their initial
values in this case are `'>>> '` and `'... '`.  If a non-string object is
assigned to either variable, its `str()` is re-evaluated each time the
interpreter prepares to read a new interactive command; this can be used to
implement a dynamic prompt.

### `setdlopenflags(n)`

Set the flags used by the interpreter for `dlopen` calls, such as when
the interpreter loads extension modules.  Among other things, this will enable a
lazy resolving of symbols when importing a module, if called as
`sys.setdlopenflags(0)`.  To share symbols across extension modules, call as
`sys.setdlopenflags(os.RTLD_GLOBAL)`.  Symbolic names for the flag values
can be found in the `os` module (`RTLD_{xxx}` constants, e.g.
`os.RTLD_LAZY`).

> **Availability:** Unix.

### `set_int_max_str_digits(maxdigits)`

Set the :ref:`integer string conversion length limitation
<int_max_str_digits>` used by this interpreter. See also
`get_int_max_str_digits()`.

> *Added in version 3.11.*

### `set_lazy_imports(mode)`

Sets the global lazy imports mode. The *mode* parameter must be one of
the following strings:

- `"normal"`: Only imports explicitly marked with the `lazy` keyword
are lazy
- `"all"`: All top-level imports become potentially lazy

This function is intended for advanced users who need to control lazy
imports across their entire application. Library developers should
generally not use this function as it affects the runtime execution of
applications.

In addition to the mode, lazy imports can be controlled via the filter
provided by `set_lazy_imports_filter()`.

See also `get_lazy_imports()` and PEP 810.

> *Added in version 3.15.*

### `set_lazy_imports_filter(filter)`

Sets the lazy imports filter callback. The *filter* parameter must be a
callable or `None` to clear the filter.

The filter function is called for every potentially lazy import to
determine whether it should actually be lazy. It should have the following
signature:

```
def filter(importing_module: str, imported_module: str,
           fromlist: tuple[str, ...] | None) -> bool
```

The function is called with three positional arguments:

- *importing_module* is the name of the module doing the import
- *imported_module* is the resolved name of the module being imported
(for example, `lazy from .spam import eggs` passes
`package.spam`)
- *fromlist* is the tuple of names being imported (for `from ... import`
statements), or `None` for regular imports

The filter should return `True` to allow the import to be lazy, or
`False` to force an eager import.

This is an advanced feature intended for specialized users who need
fine-grained control over lazy import behavior.

See also `get_lazy_imports_filter()` and PEP 810.

> *Added in version 3.15.*
