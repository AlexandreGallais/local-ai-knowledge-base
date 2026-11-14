---
title: "ctypes --- A foreign function library for Python (part 6 of 9)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ctypes.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ctypes --- A foreign function library for Python (part 6 of 9)

### `argtypes`

Assign a tuple of ctypes types to specify the argument types that the
function accepts. `TypeError` is raised if the function is called
with fewer arguments than the length of this tuple. Functions using the
`stdcall` calling convention also raise `TypeError` if called with
more arguments; functions using the `cdecl` calling convention accept
additional, unspecified arguments as well.

When a foreign function is called, each actual argument is passed to the
`from_param()` class method of the items in the `argtypes`
tuple, this method allows adapting the actual argument to an object that
the foreign function accepts.  For example, a `c_char_p` item in
the `argtypes` tuple will convert a string passed as argument into
a bytes object using ctypes conversion rules.

New: It is now possible to put items in argtypes which are not ctypes
types, but each item must have a `from_param()` method which returns a
value usable as argument (integer, string, ctypes instance).  This allows
defining adapters that can adapt custom objects as function parameters.

### `errcheck`

Assign a Python function or another callable to this attribute. The
callable will be called with three or more arguments:

### `callable(result, func, arguments)`

*result* is what the foreign function returns, as specified by the
`restype` attribute.

*func* is the foreign function object itself, this allows reusing the
same callable object to check or post process the results of several
functions.

*arguments* is a tuple containing the parameters passed to the
function call, including any output parameters that `ctypes`
created for the call; this allows specializing the behavior on the
arguments used.

If the callable returns the *arguments* tuple it received, unchanged,
`ctypes` continues its normal processing of the result, which
includes returning output parameters (see
ctypes-function-prototypes). Any other object returned by the
callable is returned from the foreign function call instead. The
callable can also check the result value and raise an exception if the
foreign function call failed.

For example, this callable raises an exception when the foreign function
signals failure with a negative return value, and otherwise leaves the
result to `ctypes`:

```
def errcheck(result, func, arguments):
    if result < 0:
        raise RuntimeError(f"call failed with error {result}")
    return arguments
```

This one instead replaces the result, converting a C `int` used as a
boolean into a `bool`:

```
def errcheck(result, func, arguments):
    return result != 0
```

### Function prototypes

Foreign functions can also be created by instantiating function prototypes.
Function prototypes are similar to function prototypes in C; they describe a
function (return type, argument types, calling convention) without defining an
implementation.  The factory functions must be called with the desired result
type and the argument types of the function, and can be used as decorator
factories, and as such, be applied to functions through the `@wrapper` syntax.
See ctypes-callback-functions for examples.

### `CFUNCTYPE(restype, *argtypes, use_errno=False, use_last_error=False)`

The returned function prototype creates functions that use the standard C
calling convention.  The function will release the GIL during the call.  If
*use_errno* is set to true, the ctypes private copy of the system
`errno` variable is exchanged with the real `errno` value before
and after the call; *use_last_error* does the same for the Windows error
code.

### `WINFUNCTYPE(restype, *argtypes, use_errno=False, use_last_error=False)`

The returned function prototype creates functions that use the
`stdcall` calling convention.  The function will
release the GIL during the call.  *use_errno* and *use_last_error* have the
same meaning as above.

> **Availability:** Windows

### `PYFUNCTYPE(restype, *argtypes)`

The returned function prototype creates functions that use the Python calling
convention.  Unlike `CFUNCTYPE()` and `WINFUNCTYPE()`, ctypes does
*not* release the GIL before calling the foreign function, so the function
may safely use the Python C API. Note that this does not prevent the GIL
from being released *during* the call.

Function prototypes created by these factory functions can be instantiated in
different ways, depending on the type and number of the parameters in the call:

### `prototype(address)`

Returns a foreign function at the specified address which must be an integer.

### `prototype(callable)`

Create a C callable function (a callback function) from a Python *callable*.

### `prototype(func_spec[, paramflags])`

Returns a foreign function exported by a shared library. *func_spec* must
be a 2-tuple `(name_or_ordinal, library)`. The first item is the name of
the exported function as string, or the ordinal of the exported function
as small integer.  The second item is the shared library instance.

### `prototype(vtbl_index, name[, paramflags[, iid]])`

Returns a foreign function that will call a COM method. *vtbl_index* is
the index into the virtual function table, a small non-negative
integer. *name* is name of the COM method. *iid* is an optional pointer to
the interface identifier which is used in extended error reporting.

If *iid* is not specified, an `OSError` is raised if the COM method
call fails. If *iid* is specified, a `COMError` is raised
instead.

COM methods use a special calling convention: They require a pointer to
the COM interface as first argument, in addition to those parameters that
are specified in the `argtypes` tuple.

> **Availability:** Windows

The optional *paramflags* parameter creates foreign function wrappers with much
more functionality than the features described above.

*paramflags* must be a tuple of the same length as `argtypes`.

Each item in this tuple contains further information about a parameter, it must
be a tuple containing one, two, or three items.

The first item is an integer containing a combination of direction
flags for the parameter:

1
Specifies an input parameter to the function.

2
Output parameter.  The foreign function fills in a value.

4
Input parameter which defaults to the integer zero.

The optional second item is the parameter name as string.  If this is specified,
the foreign function can be called with named parameters.

The optional third item is the default value for this parameter.

The following example demonstrates how to wrap the Windows `MessageBoxW` function so
that it supports default parameters and named arguments. The C declaration from
the windows header file is this:

```
WINUSERAPI int WINAPI
MessageBoxW(
    HWND hWnd,
    LPCWSTR lpText,
    LPCWSTR lpCaption,
    UINT uType);
```

Here is the wrapping with `ctypes`:

```
>>> from ctypes import c_int, WINFUNCTYPE, windll
>>> from ctypes.wintypes import HWND, LPCWSTR, UINT
>>> prototype = WINFUNCTYPE(c_int, HWND, LPCWSTR, LPCWSTR, UINT)
>>> paramflags = (1, "hwnd", 0), (1, "text", "Hi"), (1, "caption", "Hello from ctypes"), (1, "flags", 0)
>>> MessageBox = prototype(("MessageBoxW", windll.user32), paramflags)
```

The `MessageBox` foreign function can now be called in these ways:

```
>>> MessageBox()
>>> MessageBox(text="Spam, spam, spam")
>>> MessageBox(flags=2, text="foo bar")
```

A second example demonstrates output parameters.  The win32 `GetWindowRect`
function retrieves the dimensions of a specified window by copying them into
`RECT` structure that the caller has to supply.  Here is the C declaration:

```
WINUSERAPI BOOL WINAPI
GetWindowRect(
     HWND hWnd,
     LPRECT lpRect);
```

Here is the wrapping with `ctypes`:

```
>>> from ctypes import POINTER, WINFUNCTYPE, windll, WinError
>>> from ctypes.wintypes import BOOL, HWND, RECT
>>> prototype = WINFUNCTYPE(BOOL, HWND, POINTER(RECT))
>>> paramflags = (1, "hwnd"), (2, "lprect")
>>> GetWindowRect = prototype(("GetWindowRect", windll.user32), paramflags)
>>>
```

Functions with output parameters will automatically return the output parameter
value if there is a single one, or a tuple containing the output parameter
values when there are more than one, so the GetWindowRect function now returns a
RECT instance, when called.

Output parameters can be combined with the `errcheck` protocol to do
further output processing and error checking.  The win32 `GetWindowRect` api
function returns a `BOOL` to signal success or failure, so this function could
do the error checking, and raises an exception when the api call failed:

```
>>> def errcheck(result, func, args):
...     if not result:
...         raise WinError()
...     return args
...
>>> GetWindowRect.errcheck = errcheck
>>>
```

If the `errcheck` function returns the argument tuple it receives
unchanged, `ctypes` continues the normal processing it does on the output
parameters.  If you want to return a tuple of window coordinates instead of a
`RECT` instance, you can retrieve the fields in the function and return them
instead, the normal processing will no longer take place:

```
>>> def errcheck(result, func, args):
...     if not result:
...         raise WinError()
...     rc = args[1]
...     return rc.left, rc.top, rc.bottom, rc.right
...
>>> GetWindowRect.errcheck = errcheck
>>>
```

### `addressof(obj)`

Returns the address of the memory buffer as integer.  *obj* must be an
instance of a ctypes type.

### `alignment(obj_or_type)`

Returns the alignment requirements of a ctypes type. *obj_or_type* must be a
ctypes type or instance.

### `byref(obj[, offset])`

Returns a light-weight pointer to *obj*, which must be an instance of a
ctypes type.  *offset* defaults to zero, and must be an integer that will be
added to the internal pointer value.

`byref(obj, offset)` corresponds to this C code:

```
(((char *)&obj) + offset)
```

The returned object can only be used as a foreign function call parameter.
It behaves similar to `pointer(obj)`, but the construction is a lot faster.

### `CopyComPointer(src, dst)`

Copies a COM pointer from *src* to *dst* and returns the Windows specific
`HRESULT` value.

If *src* is not `NULL`, its `AddRef` method is called, incrementing the
reference count.

In contrast, the reference count of *dst* will not be decremented before
assigning the new value. Unless *dst* is `NULL`, the caller is responsible
for decrementing the reference count by calling its `Release` method when
necessary.

> **Availability:** Windows

> *Added in version 3.14.*

### `cast(obj, type)`

This function is similar to the cast operator in C. It returns a new instance
of *type* which points to the same memory block as *obj*.  *type* must be a
pointer type, and *obj* must be an object that can be interpreted as a
pointer.

### `create_string_buffer(init, size=None)`

```python
create_string_buffer(size)
```

This function creates a mutable character buffer. The returned object is a
ctypes array of `c_char`.

If *size* is given (and not `None`), it must be an `int`.
It specifies the size of the returned array.

If the *init* argument is given, it must be `bytes`. It is used
to initialize the array items. Bytes not initialized this way are
set to zero (NUL).

If *size* is not given (or if it is `None`), the buffer is made one element
larger than *init*, effectively adding a NUL terminator.

If both arguments are given, *size* must not be less than `len(init)`.

> **Warning:** If *size* is equal to `len(init)`, a NUL terminator is
> not added. Do not treat such a buffer as a C string.

For example:

```
>>> bytes(create_string_buffer(2))
b'\x00\x00'
>>> bytes(create_string_buffer(b'ab'))
b'ab\x00'
>>> bytes(create_string_buffer(b'ab', 2))
b'ab'
>>> bytes(create_string_buffer(b'ab', 4))
b'ab\x00\x00'
>>> bytes(create_string_buffer(b'abcdef', 2))
Traceback (most recent call last):
   ...
ValueError: byte string too long
```

### `create_unicode_buffer(init, size=None)`

```python
create_unicode_buffer(size)
```

This function creates a mutable unicode character buffer. The returned object is
a ctypes array of `c_wchar`.

The function takes the same arguments as `create_string_buffer()` except
*init* must be a string and *size* counts `c_wchar`.

### `DllCanUnloadNow()`

This function is a hook which allows implementing in-process
COM servers with ctypes.  It is called from the DllCanUnloadNow function that
the _ctypes extension dll exports.

> **Availability:** Windows

### `DllGetClassObject()`

This function is a hook which allows implementing in-process
COM servers with ctypes.  It is called from the DllGetClassObject function
that the `_ctypes` extension dll exports.

> **Availability:** Windows

### `dllist()`

Try to provide a list of paths of the shared libraries loaded into the current
process.  These paths are not normalized or processed in any way.  The function
can raise `OSError` if the underlying platform APIs fail.
The exact functionality is system dependent.

On most platforms, the first element of the list represents the current
executable file. It may be an empty string.

> **Availability:** Windows, macOS, iOS, glibc, BSD libc, musl

> *Added in version 3.14.*

### `FormatError([code])`

Returns a textual description of the error code *code*.  If no error code is
specified, the last error code is used by calling the Windows API function
`GetLastError()`.

> **Availability:** Windows

### `GetLastError()`

Returns the last error code set by Windows in the calling thread.
This function calls the Windows `GetLastError()` function directly,
it does not return the ctypes-private copy of the error code.

> **Availability:** Windows

### `get_errno()`

Returns the current value of the ctypes-private copy of the system
`errno` variable in the calling thread.

### `get_last_error()`

Returns the current value of the ctypes-private copy of the system
`LastError` variable in the calling thread.

> **Availability:** Windows

### `memmove(dst, src, count)`

Same as the standard C memmove library function: copies *count* bytes from
*src* to *dst*. *dst* and *src* must be integers or ctypes instances that can
be converted to pointers.

### `memset(dst, c, count)`

Same as the standard C memset library function: fills the memory block at
address *dst* with *count* bytes of value *c*. *dst* must be an integer
specifying an address, or a ctypes instance.

### `POINTER(type, /)`

Create or return a ctypes pointer type. Pointer types are cached and
reused internally, so calling this function repeatedly is cheap.
*type* must be a ctypes type.

> **CPython implementation detail:** The resulting pointer type is cached in the `__pointer_type__`
> attribute of *type*.
> It is possible to set this attribute before the first call to
> `POINTER` in order to set a custom pointer type.
> However, doing this is discouraged: manually creating a suitable
> pointer type is difficult without relying on implementation
> details that may change in future Python versions.
