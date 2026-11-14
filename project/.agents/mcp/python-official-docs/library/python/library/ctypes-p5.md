---
title: "ctypes --- A foreign function library for Python (part 5 of 9)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ctypes.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ctypes --- A foreign function library for Python (part 5 of 9)

## ctypes reference

### Loading shared libraries

There are several ways to load shared libraries into the Python process.  One
way is to instantiate `CDLL` or one of its subclasses:

### class `CDLL(name, mode=DEFAULT_MODE, handle=None, use_errno=False, use_last_error=False, winmode=None)`

Represents a loaded shared library.

Functions in this library use the standard C calling convention, and are
assumed to return `int`.
The Python global interpreter lock is released before calling any
function exported by these libraries, and reacquired afterwards.
For different function behavior, use a subclass: `OleDLL`,
`WinDLL`, or `PyDLL`.

If you have an existing `handle` to an already
loaded shared library, it can be passed as the *handle* argument to wrap
the opened library in a new `CDLL` object.
In this case, *name* is only used to set the `_name`
attribute, but it may be adjusted and/or validated.

If *handle* is `None`, the underlying platform's dlopen(3) or
LoadLibraryExW function is used to load the library into
the process, and to get a handle to it.

*name* is the pathname of the shared library to open.
If *name* does not contain a path separator, the library is found
in a platform-specific way.

On Windows, the `.DLL` suffix may be missing. (For details, see
LoadLibraryExW documentation.)
Other platform-specific prefixes and suffixes (for example, `lib`,
`.so`, `.dylib`, or version numbers) must be present in *name*;
they are not added automatically.
See ctypes-finding-shared-libraries for more information.

On non-Windows systems, *name* can  be `None`. In this case,
`dlopen` is called with `NULL`, which opens the main program
as a "library".
(Some systems do the same if *name* is empty; `None`/`NULL` is more
portable.)

> **CPython implementation detail:** Since CPython is linked to `libc`, a `None` *name* is often used
> to access the C standard library:
>
>
> ```
> >>> printf = ctypes.CDLL(None).printf
> >>> printf.argtypes = [ctypes.c_char_p]
> >>> printf(b"hello\n")
> hello
> 6
> ```
>
>
> To access the Python C API, prefer `ctypes.pythonapi` which
> works across platforms.

The *mode* parameter can be used to specify how the library is loaded.  For
details, consult the dlopen(3) manpage.  On Windows, *mode* is
ignored.  On posix systems, RTLD_NOW is always added, and is not
configurable.

The *use_errno* parameter, when set to true, enables a ctypes mechanism that
allows accessing the system `errno` error number in a safe way.
`ctypes` maintains a thread-local copy of the system's `errno`
variable; if you call foreign functions created with `use_errno=True` then the
`errno` value before the function call is swapped with the ctypes private
copy, the same happens immediately after the function call. This mechanism only
works for libraries that use the same C runtime library as the interpreter itself.
A library linked against a different C runtime (for example, a different CRT on
Windows) has its own `errno`, which `ctypes` cannot observe.

The function `ctypes.get_errno()` returns the value of the ctypes private
copy, and the function `ctypes.set_errno()` changes the ctypes private copy
to a new value and returns the former value.

The *use_last_error* parameter, when set to true, enables the same mechanism for
the Windows error code which is managed by the `GetLastError()` and
`SetLastError()` Windows API functions; `ctypes.get_last_error()` and
`ctypes.set_last_error()` are used to request and change the ctypes private
copy of the windows error code.

The *winmode* parameter is used on Windows to specify how the library is loaded
(since *mode* is ignored). It takes any value that is valid for the Win32 API
LoadLibraryExW flags parameter. When omitted, the default is to use the
flags that result in the most secure DLL load, which avoids issues such as DLL
hijacking. Passing the full path to the DLL is the safest way to ensure the
correct library and dependencies are loaded.

On Windows creating a `CDLL` instance may fail even if the DLL name
exists. When a dependent DLL of the loaded DLL is not found, a
`OSError` error is raised with the message *"[WinError 126] The
specified module could not be found".* This error message does not contain
the name of the missing DLL because the Windows API does not return this
information making this error hard to diagnose. To resolve this error and
determine which DLL is not found, you need to find the list of dependent
DLLs and determine which one is not found using Windows debugging and
tracing tools.

> **See also:** Microsoft DUMPBIN tool
> -- A tool to find DLL dependents.

> *Changed in version 3.8.*
> Added *winmode* parameter.

> *Changed in version 3.12.*
> The *name* parameter can now be a path-like object.

Instances of this class have no public methods.  Functions exported by the
shared library can be accessed as attributes or by index.  Please note that
accessing the function through an attribute caches the result and therefore
accessing it repeatedly returns the same object each time.  On the other hand,
accessing it through an index returns a new object each time:

```
>>> from ctypes import CDLL
>>> libc = CDLL("libc.so.6")  # On Linux
>>> libc.time == libc.time
True
>>> libc['time'] == libc['time']
False
```

The following public attributes are available. Their name starts with an
underscore to not clash with exported function names:

### `_handle`

The system handle used to access the library.

### `_name`

The name of the library passed in the constructor.

### class `OleDLL`

See `CDLL`, the superclass, for common information.

Functions in this library use the `stdcall` calling convention, and are
assumed to return the windows specific `HRESULT` code.  `HRESULT`
values contain information specifying whether the function call failed or
succeeded, together with additional error code.  If the return value signals a
failure, an `OSError` is automatically raised.

> **Availability:** Windows

> *Changed in version 3.3.*
> `WindowsError` used to be raised,
> which is now an alias of `OSError`.

### class `WinDLL`

See `CDLL`, the superclass, for common information.

Functions in these libraries use the `stdcall` calling convention, and are
assumed to return `int` by default.

> **Availability:** Windows

### class `PyDLL`

See `CDLL`, the superclass, for common information.

When functions in this library are called, the
Python GIL is *not* released during the function call, and after the function
execution the Python error flag is checked. If the error flag is set, a Python
exception is raised.

Thus, this is only useful to call Python C API functions directly.

### `RTLD_GLOBAL`

Flag to use as *mode* parameter.  On platforms where this flag is not available,
it is defined as the integer zero.

### `RTLD_LOCAL`

Flag to use as *mode* parameter.  On platforms where this is not available, it
is the same as *RTLD_GLOBAL*.

### `DEFAULT_MODE`

The default mode which is used to load shared libraries.  On OSX 10.3, this is
*RTLD_GLOBAL*, otherwise it is the same as *RTLD_LOCAL*.

Shared libraries can also be loaded by using one of the prefabricated objects,
which are instances of the `LibraryLoader` class, either by calling the
`LoadLibrary()` method, or by retrieving the library as
attribute of the loader instance.

### class `LibraryLoader(dlltype)`

Class which loads shared libraries.  *dlltype* should be one of the
`CDLL`, `PyDLL`, `WinDLL`, or `OleDLL` types.

`__getattr__()` has special behavior: It allows loading a shared library by
accessing it as attribute of a library loader instance.  The result is cached,
so repeated attribute accesses return the same library each time.

### `LoadLibrary(name)`

Load a shared library into the process and return it.  This method always
returns a new instance of the library.

These prefabricated library loaders are available:

### `cdll`

Creates `CDLL` instances.

### `windll`

Creates `WinDLL` instances.

> **Availability:** Windows

### `oledll`

Creates `OleDLL` instances.

> **Availability:** Windows

### `pydll`

Creates `PyDLL` instances.

### `pythonapi`

An instance of `PyDLL` that exposes Python C API functions as
attributes.  Note that all these functions are assumed to return C
`int`, which is of course not always the truth, so you have to assign
the correct `restype` attribute to use these functions.

> **Note:** If the Python interpreter is statically linked, this may be `None`.

### Finding shared libraries

When programming in a compiled language, shared libraries are accessed when
compiling/linking a program, and when the program is run.
The programmer specifies a short name; the C compiler, linker, and
runtime dynamic library loader then interact in system-specific ways to find
the filename of the library to load.

While the mapping from short names to filenames is not consistently exposed
by platforms, the `ctypes.util` module provides a function,
`find_library()`, that attempts to match it.
However, as backwards compatibility concerns make it difficult to adjust
its behavior for new platforms and configurations, the function
is soft deprecated.

If wrapping a shared library with `ctypes`, consider determining the
shared library name at development time, and hardcoding it into the wrapper
module instead of using `find_library()` to locate the library
at runtime.
Also consider adding a configuration option or environment variable to let
users select a library to use, and then perhaps use `find_library()`
as a default or fallback.

### `find_library(name)`

Try to find a library and return a pathname.

*name* is the "short" library name without any prefix like `lib`,
suffix like `.so`, `.dylib` or version number.
(This is the form used for the posix linker option `-l`.)
The result is in a format suitable for passing to `CDLL`.

If no library can be found, return `None`.

The exact functionality is system dependent, and is *not guaranteed*
to match the behavior of the compiler, linker, and loader used for
(or by) Python.
It is recommended to only use this function as a default or fallback,

3.15

This function is kept for use in cases where it works, but not expected to
be updated for additional platforms and configurations.

On Linux, `find_library()` tries to run external
programs (`/sbin/ldconfig`, `gcc`, `objdump` and `ld`) to find the
library file.
If the output of these programs does not correspond to the dynamic
linker used by Python, the result of this function may be misleading.

> *Changed in version 3.6.*
> On Linux, the value of the environment variable `LD_LIBRARY_PATH` is used
> when searching for libraries, if a library cannot be found by any other means.

Here are some examples:

```
>>> from ctypes.util import find_library
>>> find_library("m")
'libm.so.6'
>>> find_library("c")
'libc.so.6'
>>> find_library("bz2")
'libbz2.so.1.0'
>>>
```

On macOS and Android, `find_library()` uses the system's
standard naming schemes and paths to locate the library, and returns a full
pathname if successful:

```
>>> from ctypes.util import find_library
>>> find_library("c")
'/usr/lib/libc.dylib'
>>> find_library("m")
'/usr/lib/libm.dylib'
>>> find_library("bz2")
'/usr/lib/libbz2.dylib'
>>> find_library("AGL")
'/System/Library/Frameworks/AGL.framework/AGL'
>>>
```

On Windows, `find_library()` searches along the system search path, and
returns the full pathname, but since there is no predefined naming scheme a call
like `find_library("c")` will fail and return `None`.

### `find_msvcrt()`

Returns the filename of the VC runtime library used by Python,
and by the extension modules.

If the name of the library cannot be determined, `None` is returned.
Notably, this will happen for recent versions of the VC runtime library,
which are not directly loadable.

If you need to free memory, for example, allocated by an extension module
with a call to the `free(void *)`, it is important that you use the
function in the same library that allocated the memory.

> **Availability:** Windows

### Listing loaded shared libraries

When writing code that relies on code loaded from shared libraries, it can be
useful to know which shared libraries have already been loaded into the current
process.

The `ctypes.util` module provides the `dllist()` function,
which calls the different APIs provided by the various platforms to help determine
which shared libraries have already been loaded into the current process.

The exact output of this function will be system dependent. On most platforms,
the first entry of this list represents the current process itself, which may
be an empty string.
For example, on glibc-based Linux, the return may look like:

```
>>> from ctypes.util import dllist
>>> dllist()
['', 'linux-vdso.so.1', '/lib/x86_64-linux-gnu/libm.so.6', '/lib/x86_64-linux-gnu/libc.so.6', ... ]
```

### Foreign functions

As explained in the previous section, foreign functions can be accessed as
attributes of loaded shared libraries.  The function objects created in this way
by default accept any number of arguments, accept any ctypes data instances as
arguments, and return the default result type specified by the library loader.

They are instances of a private local class `_FuncPtr` (not exposed
in `ctypes) which inherits from the private CFuncPtr` class:

```python

>>> import ctypes
>>> lib = ctypes.CDLL(None)
>>> issubclass(lib._FuncPtr, ctypes._CFuncPtr)
True
>>> lib._FuncPtr is ctypes._CFuncPtr
False
```

### class `_CFuncPtr`

Base class for C callable foreign functions.

Instances of foreign functions are also C compatible data types; they
represent C function pointers.

This behavior can be customized by assigning to special attributes of the
foreign function object.

### `restype`

Assign a ctypes type to specify the result type of the foreign function.
Use `None` for `void`, a function not returning anything.

It is possible to assign a callable Python object that is not a ctypes
type, in this case the function is assumed to return a C `int`, and
the callable will be called with this integer, allowing further
processing or error checking.  Using this is deprecated, for more flexible
post processing or error checking use a ctypes data type as
`restype` and assign a callable to the `errcheck` attribute.
