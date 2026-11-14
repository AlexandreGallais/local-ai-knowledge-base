---
title: "ctypes --- A foreign function library for Python (part 2 of 9)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ctypes.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ctypes --- A foreign function library for Python (part 2 of 9)

## ctypes tutorial

Note: Some code samples reference the ctypes `c_int` type.  On platforms
where `sizeof(long) == sizeof(int)` it is an alias to `c_long`.
So, you should not be confused if `c_long` is printed if you would expect
`c_int` --- they are actually the same type.

### Loading dynamic link libraries

`ctypes` exports the `cdll`, and on Windows
`windll` and `oledll`
objects, for loading dynamic link libraries.

You load libraries by accessing them as attributes of these objects.
`cdll` loads libraries which export functions using the
standard `cdecl` calling convention, while `windll`
libraries call functions using the `stdcall`
calling convention.
`oledll` also uses the `stdcall` calling convention, and
assumes the functions return a Windows `HRESULT` error code. The error
code is used to automatically raise an `OSError` exception when the
function call fails.

> *Changed in version 3.3.*
> Windows errors used to raise `WindowsError`, which is now an alias
> of `OSError`.

Here are some examples for Windows. Note that `msvcrt` is the MS standard C
library containing most standard C functions, and uses the `cdecl` calling
convention:

```
>>> from ctypes import *
>>> print(windll.kernel32)  # doctest: +WINDOWS
<WinDLL 'kernel32', handle ... at ...>
>>> print(cdll.msvcrt)      # doctest: +WINDOWS
<CDLL 'msvcrt', handle ... at ...>
>>> libc = cdll.msvcrt      # doctest: +WINDOWS
>>>
```

Windows appends the usual `.dll` file suffix automatically.

> **Note:** Accessing the standard C library through `cdll.msvcrt` will use an
> outdated version of the library that may be incompatible with the one
> being used by Python. Where possible, use native Python functionality,
> or else import and use the `msvcrt` module.

Other systems require the filename *including* the extension to
load a library, so attribute access can not be used to load libraries. Either the
`LoadLibrary()` method of the dll loaders should be used,
or you should load the library by creating an instance of `CDLL`
by calling the constructor.

For example, on Linux:

```
>>> cdll.LoadLibrary("libc.so.6")  # doctest: +LINUX
<CDLL 'libc.so.6', handle ... at ...>
>>> libc = CDLL("libc.so.6")       # doctest: +LINUX
>>> libc                           # doctest: +LINUX
<CDLL 'libc.so.6', handle ... at ...>
>>>
```

On macOS:

```
>>> cdll.LoadLibrary("libc.dylib")  # doctest: +MACOS
<CDLL 'libc.dylib', handle ... at ...>
>>> libc = CDLL("libc.dylib")       # doctest: +MACOS
>>> libc                            # doctest: +MACOS
<CDLL 'libc.dylib', handle ... at ...>
```

### Accessing functions from loaded dlls

Functions are accessed as attributes of dll objects:

```
>>> libc.printf
<_FuncPtr object at 0x...>
>>> print(windll.kernel32.GetModuleHandleA)  # doctest: +WINDOWS
<_FuncPtr object at 0x...>
>>> print(windll.kernel32.MyOwnFunction)     # doctest: +WINDOWS
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "ctypes.py", line 239, in __getattr__
    func = _StdcallFuncPtr(name, self)
AttributeError: function 'MyOwnFunction' not found
>>>
```

Note that win32 system dlls like `kernel32` and `user32` often export ANSI
as well as UNICODE versions of a function. The UNICODE version is exported with
a `W` appended to the name, while the ANSI version is exported with an `A`
appended to the name. The win32 `GetModuleHandle` function, which returns a
*module handle* for a given module name, has the following C prototype, and a
macro is used to expose one of them as `GetModuleHandle` depending on whether
UNICODE is defined or not:

```
/* ANSI version */
HMODULE GetModuleHandleA(LPCSTR lpModuleName);
/* UNICODE version */
HMODULE GetModuleHandleW(LPCWSTR lpModuleName);
```

*windll* does not try to select one of them by magic, you must access the
version you need by specifying `GetModuleHandleA` or `GetModuleHandleW`
explicitly, and then call it with bytes or string objects respectively.

Sometimes, dlls export functions with names which aren't valid Python
identifiers, like `"??2@YAPAXI@Z"`. In this case you have to use
`getattr()` to retrieve the function:

```
>>> getattr(cdll.msvcrt, "??2@YAPAXI@Z")  # doctest: +WINDOWS
<_FuncPtr object at 0x...>
>>>
```

On Windows, some dlls export functions not by name but by ordinal. These
functions can be accessed by indexing the dll object with the ordinal number:

```
>>> cdll.kernel32[1]  # doctest: +WINDOWS
<_FuncPtr object at 0x...>
>>> cdll.kernel32[0]  # doctest: +WINDOWS
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "ctypes.py", line 310, in __getitem__
    func = _StdcallFuncPtr(name, self)
AttributeError: function ordinal 0 not found
>>>
```

### Calling functions

You can call these functions like any other Python callable. This example uses
the `rand()` function, which takes no arguments and returns a pseudo-random integer:

```
>>> print(libc.rand())  # doctest: +SKIP
1804289383
```

On Windows, you can call the `GetModuleHandleA()` function, which returns a win32 module
handle (passing `None` as single argument to call it with a `NULL` pointer):

```
>>> print(hex(windll.kernel32.GetModuleHandleA(None)))  # doctest: +WINDOWS
0x1d000000
>>>
```

`ctypes` cannot determine a function's calling convention or signature.
Consult the function's C header file or documentation to choose the correct calling
convention and set the `argtypes` attribute, as described in
ctypes-specifying-required-argument-types. Without
`argtypes`, the number of arguments is not checked. Calling a
function with an incorrect calling convention or with incorrect arguments can
corrupt memory or crash Python.

On Windows, `ctypes` uses win32 structured exception handling to prevent
crashes from general protection faults when functions are called with invalid
argument values:

```
>>> windll.kernel32.GetModuleHandleA(32)  # doctest: +WINDOWS
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
OSError: exception: access violation reading 0x00000020
>>>
```

The `faulthandler` module can help debug crashes,
such as segmentation faults produced by erroneous C library calls.

`None`, integers, bytes objects and (unicode) strings are the only native
Python objects that can directly be used as parameters in these function calls.
`None` is passed as a C `NULL` pointer, bytes objects and strings are passed
as pointer to the memory block that contains their data (`char *` or
`wchar_t *`).  Python integers are passed as the platform's default C
`int` type, their value is masked to fit into the C type.

Before we move on calling functions with other parameter types, we have to learn
more about `ctypes` data types.

### Fundamental data types

`ctypes` defines a number of primitive C compatible data types:

- - ctypes type
- C type
- Python type
- `_type_`
- - `c_bool`
- `_Bool`
- `bool`
- `'?'`
- - `c_char`
- `char`
- 1-character `bytes`
- `'c'`
- - `c_wchar`
- `wchar_t`
- 1-character `str`
- `'u'`
- - `c_byte`
- `char`
- `int`
- `'b'`
- - `c_ubyte`
- `unsigned char`
- `int`
- `'B'`
- - `c_short`
- `short`
- `int`
- `'h'`
- - `c_ushort`
- `unsigned short`
- `int`
- `'H'`
- - `c_int`
- `int`
- `int`
- `'i'` *
- - `c_int8`
- `int8_t`
- `int`
- *
- - `c_int16`
- `int16_t`
- `int`
- *
- - `c_int32`
- `int32_t`
- `int`
- *
- - `c_int64`
- `int64_t`
- `int`
- *
- - `c_uint`
- `unsigned int`
- `int`
- `'I'` *
- - `c_uint8`
- `uint8_t`
- `int`
- *
- - `c_uint16`
- `uint16_t`
- `int`
- *
- - `c_uint32`
- `uint32_t`
- `int`
- *
- - `c_uint64`
- `uint64_t`
- `int`
- *
- - `c_long`
- `long`
- `int`
- `'l'`
- - `c_ulong`
- `unsigned long`
- `int`
- `'L'`
- - `c_longlong`
- `long long`
- `int`
- `'q'` *
- - `c_ulonglong`
- `unsigned long long`
- `int`
- `'Q'` *
- - `c_size_t`
- `size_t`
- `int`
- *
- - `c_ssize_t`
- `Py_ssize_t`
- `int`
- *
- - `c_time_t`
- `time_t`
- `int`
- *
- - `c_float`
- `float`
- `float`
- `'f'`
- - `c_double`
- `double`
- `float`
- `'d'`
- - `c_longdouble`
- `long double`
- `float`
- `'g'` *
- - `c_char_p`
- `char *` (NUL terminated)
- `bytes` or `None`
- `'z'`
- - `c_wchar_p`
- `wchar_t *` (NUL terminated)
- `str` or `None`
- `'Z'`
- - `c_void_p`
- `void *`
- `int` or `None`
- `'P'`
- - `py_object`
- `PyObject *`
- `object`
- `'O'`
- - VARIANT_BOOL
- `short int`
- `bool`
- `'v'`

Additionally, if IEC 60559 compatible complex arithmetic (Annex G) is supported
in both C and `libffi`, the following complex types are available:

- - ctypes type
- C type
- Python type
- `_type_`
- - `c_float_complex`
- `float complex`
- `complex`
- `'Zf'`
- - `c_double_complex`
- `double complex`
- `complex`
- `'Zd'`
- - `c_longdouble_complex`
- `long double complex`
- `complex`
- `'Zg'`

> *Changed in version 3.15.*
> The `_type_` types `F`, `D` and `G` have been
> replaced with `Zf`, `Zd` and `Zg`.

All these types can be created by calling them with an optional initializer of
the correct type and value:

```
>>> c_int()
c_long(0)
>>> c_wchar_p("Hello, World")
c_wchar_p(140018365411392)
>>> c_ushort(-3)
c_ushort(65533)
>>>
```

The constructors for numeric types will convert input using
`__bool__()`,
`__index__()` (for `int`),
`__float__() or complex__()`.
This means `c_bool` accepts any object with a truth value:

```
>>> empty_list = []
>>> c_bool(empty_list)
c_bool(False)
```

Since these types are mutable, their value can also be changed afterwards:

```
>>> i = c_int(42)
>>> print(i)
c_long(42)
>>> print(i.value)
42
>>> i.value = -99
>>> print(i.value)
-99
>>>
```

Assigning a new value to instances of the pointer types `c_char_p`,
`c_wchar_p`, and `c_void_p` changes the *memory location* they
point to, *not the contents* of the memory block (of course not, because Python
string objects are immutable):

```
>>> s = "Hello, World"
>>> c_s = c_wchar_p(s)
>>> print(c_s)
c_wchar_p(139966785747344)
>>> print(c_s.value)
Hello World
>>> c_s.value = "Hi, there"
>>> print(c_s)              # the memory location has changed
c_wchar_p(139966783348904)
>>> print(c_s.value)
Hi, there
>>> print(s)                # first object is unchanged
Hello, World
>>>
```

You should be careful, however, not to pass them to functions expecting pointers
to mutable memory. If you need mutable memory blocks, ctypes has a
`create_string_buffer()` function which creates these in various ways.  The
current memory block contents can be accessed (or changed) with the `raw`
property; if you want to access it as NUL terminated string, use the `value`
property:

```
>>> from ctypes import *
>>> p = create_string_buffer(3)            # create a 3 byte buffer, initialized to NUL bytes
>>> print(sizeof(p), repr(p.raw))
3 b'\x00\x00\x00'
>>> p = create_string_buffer(b"Hello")     # create a buffer containing a NUL terminated string
>>> print(sizeof(p), repr(p.raw))
6 b'Hello\x00'
>>> print(repr(p.value))
b'Hello'
>>> p = create_string_buffer(b"Hello", 10) # create a 10 byte buffer
>>> print(sizeof(p), repr(p.raw))
10 b'Hello\x00\x00\x00\x00\x00'
>>> p.value = b"Hi"
>>> print(sizeof(p), repr(p.raw))
10 b'Hi\x00lo\x00\x00\x00\x00\x00'
>>>
```

The `create_string_buffer()` function replaces the old `c_buffer()`
function (which is still available as an alias).  To create a mutable memory
block containing unicode characters of the C type `wchar_t`, use the
`create_unicode_buffer()` function.

### Calling functions, continued

Note that printf prints to the real standard output channel, *not* to
`sys.stdout`, so these examples will only work at the console prompt, not
from within *IDLE* or *PythonWin*:

```
>>> printf = libc.printf
>>> printf(b"Hello, %s\n", b"World!")
Hello, World!
14
>>> printf(b"Hello, %S\n", "World!")
Hello, World!
14
>>> printf(b"%d bottles of beer\n", 42)
42 bottles of beer
19
>>> printf(b"%f bottles of beer\n", 42.5)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ctypes.ArgumentError: argument 2: TypeError: Don't know how to convert parameter 2
>>>
```

As has been mentioned before, all Python types except integers, strings, and
bytes objects have to be wrapped in their corresponding `ctypes` type, so
that they can be converted to the required C data type:

```
>>> printf(b"An int %d, a double %f\n", 1234, c_double(3.14))
An int 1234, a double 3.140000
31
>>>
```

### Calling variadic functions

On a lot of platforms calling variadic functions through ctypes is exactly the same
as calling functions with a fixed number of parameters. On some platforms, and in
particular ARM64 for Apple Platforms, the calling convention for variadic functions
is different than that for regular functions.

On those platforms it is required to specify the `argtypes`
attribute for the regular, non-variadic, function arguments:

```python3
libc.printf.argtypes = [ctypes.c_char_p]
```

Because specifying the attribute does not inhibit portability it is advised to always
specify `argtypes` for all variadic functions.

### Calling functions with your own custom data types

You can also customize `ctypes` argument conversion to allow instances of
your own classes be used as function arguments. `ctypes` looks for an
`_as_parameter_` attribute and uses this as the function argument. The
attribute must be an integer, string, bytes, a `ctypes` instance, or an
object with an `_as_parameter_` attribute:

```
>>> class Bottles:
...     def __init__(self, number):
...         self._as_parameter_ = number
...
>>> bottles = Bottles(42)
>>> printf(b"%d bottles of beer\n", bottles)
42 bottles of beer
19
>>>
```

If you don't want to store the instance's data in the `_as_parameter_`
instance variable, you could define a property which makes the
attribute available on request.
