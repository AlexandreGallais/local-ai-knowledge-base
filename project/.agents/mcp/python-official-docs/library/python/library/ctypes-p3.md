---
title: "ctypes --- A foreign function library for Python (part 3 of 9)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ctypes.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ctypes --- A foreign function library for Python (part 3 of 9)

### Specifying the required argument types (function prototypes)

It is possible to specify the required argument types of functions exported from
DLLs by setting the `argtypes` attribute.

`argtypes` must be a sequence of C data types (the `printf()` function is
probably not a good example here, because it takes a variable number and
different types of parameters depending on the format string, on the other hand
this is quite handy to experiment with this feature):

```
>>> printf.argtypes = [c_char_p, c_char_p, c_int, c_double]
>>> printf(b"String '%s', Int %d, Double %f\n", b"Hi", 10, 2.2)
String 'Hi', Int 10, Double 2.200000
37
>>>
```

Specifying a format protects against incompatible argument types (just as a
prototype for a C function), and tries to convert the arguments to valid types:

```
>>> printf(b"%d %d %d", 1, 2, 3)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ctypes.ArgumentError: argument 2: TypeError: 'int' object cannot be interpreted as ctypes.c_char_p
>>> printf(b"%s %d %f\n", b"X", 2, 3)
X 2 3.000000
13
>>>
```

Setting `argtypes` also causes `ctypes` to raise
`TypeError` if too few arguments are passed:

```
>>> printf(b"%s %d %f\n", b"X", 2)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: this function takes at least 4 arguments (3 given)
```

Functions using the `stdcall` calling convention require exactly as many
arguments as there are items in `argtypes`. Functions using
the `cdecl` calling convention accept additional arguments, to support
variadic functions. The declaration must match the function's actual signature;
ctypes cannot verify this.

If you have defined your own classes which you pass to function calls, you have
to implement a `from_param()` class method for them to be able to use them
in the `argtypes` sequence. The `from_param()` class method receives
the Python object passed to the function call, it should do a typecheck or
whatever is needed to make sure this object is acceptable, and then return the
object itself, its `_as_parameter_` attribute, or whatever you want to
pass as the C function argument in this case. Again, the result should be an
integer, string, bytes, a `ctypes` instance, or an object with an
`_as_parameter_` attribute.

### Return types

By default functions are assumed to return the C `int` type.  Other
return types can be specified by setting the `restype` attribute of the
function object.

The C prototype of `time` is `time_t time(time_t *)`. Because `time_t`
might be of a different type than the default return type `int`, you should
specify the `restype` attribute:

```
>>> libc.time.restype = c_time_t
```

The argument types can be specified using `argtypes`:

```
>>> libc.time.argtypes = (POINTER(c_time_t),)
```

To call the function with a `NULL` pointer as first argument, use `None`:

```
>>> print(libc.time(None))  # doctest: +SKIP
1150640792
```

Here is a more advanced example, it uses the `strchr()` function, which expects
a string pointer and a char, and returns a pointer to a string:

```
>>> strchr = libc.strchr
>>> strchr(b"abcdef", ord("d"))  # doctest: +SKIP
8059983
>>> strchr.restype = c_char_p    # c_char_p is a pointer to a string
>>> strchr(b"abcdef", ord("d"))
b'def'
>>> print(strchr(b"abcdef", ord("x")))
None
>>>
```

If you want to avoid the `ord("x")` calls above, you can set the
`argtypes` attribute, and the second argument will be converted from a
single character Python bytes object into a C char:

```python

>>> strchr.restype = c_char_p
>>> strchr.argtypes = [c_char_p, c_char]
>>> strchr(b"abcdef", b"d")
b'def'
>>> strchr(b"abcdef", b"def")
Traceback (most recent call last):
ctypes.ArgumentError: argument 2: TypeError: one character bytes, bytearray or integer expected
>>> print(strchr(b"abcdef", b"x"))
None
>>> strchr(b"abcdef", b"d")
b'def'
>>>
```

You can also use a callable Python object (a function or a class for example) as
the `restype` attribute, if the foreign function returns an integer.  The
callable will be called with the *integer* the C function returns, and the
result of this call will be used as the result of your function call. This is
useful to check for error return values and automatically raise an exception:

```
>>> GetModuleHandle = windll.kernel32.GetModuleHandleA  # doctest: +WINDOWS
>>> def ValidHandle(value):
...     if value == 0:
...         raise WinError()
...     return value
...
>>>
>>> GetModuleHandle.restype = ValidHandle  # doctest: +WINDOWS
>>> GetModuleHandle(None)  # doctest: +WINDOWS
486539264
>>> GetModuleHandle("something silly")  # doctest: +WINDOWS
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<stdin>", line 3, in ValidHandle
OSError: [Errno 126] The specified module could not be found.
>>>
```

`WinError` is a function which will call Windows `FormatMessage()` api to
get the string representation of an error code, and *returns* an exception.
`WinError` takes an optional error code parameter, if no one is used, it calls
`GetLastError()` to retrieve it.

Please note that a much more powerful error checking mechanism is available
through the `errcheck` attribute;
see the reference manual for details.

### Passing pointers (or: passing parameters by reference)

Sometimes a C api function expects a *pointer* to a data type as parameter,
probably to write into the corresponding location, or if the data is too large
to be passed by value. This is also known as *passing parameters by reference*.

`ctypes` exports the `byref()` function which is used to pass <example-value>
by reference.  The same effect can be achieved with the `pointer()` function,
although `pointer()` does a lot more work since it constructs a real pointer
object, so it is faster to use `byref()` if you don't need the pointer
object in Python itself:

```
>>> i = c_int()
>>> f = c_float()
>>> s = create_string_buffer(b'\000' * 32)
>>> print(i.value, f.value, repr(s.value))
0 0.0 b''
>>> libc.sscanf(b"1 3.14 Hello", b"%d %f %s",
...             byref(i), byref(f), s)
3
>>> print(i.value, f.value, repr(s.value))
1 3.1400001049 b'Hello'
>>>
```

### Structures and unions

Structures and unions must derive from the `Structure` and `Union`
base classes which are defined in the `ctypes` module. Each subclass must
define a `_fields_ attribute.  fields_` must be a list of
*2-tuples*, containing a *field name* and a *field type*.

The field type must be a `ctypes` type like `c_int`, or any other
derived `ctypes` type: structure, union, array, pointer.

Here is a simple example of a POINT structure, which contains two integers named
*x* and *y*, and also shows how to initialize a structure in the constructor:

```
>>> from ctypes import *
>>> class POINT(Structure):
...     _fields_ = [("x", c_int),
...                 ("y", c_int)]
...
>>> point = POINT(10, 20)
>>> print(point.x, point.y)
10 20
>>> point = POINT(y=5)
>>> print(point.x, point.y)
0 5
>>> POINT(1, 2, 3)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: too many initializers
>>>
```

You can, however, build much more complicated structures.  A structure can
itself contain other structures by using a structure as a field type.

Here is a RECT structure which contains two POINTs named *upperleft* and
*lowerright*:

```
>>> class RECT(Structure):
...     _fields_ = [("upperleft", POINT),
...                 ("lowerright", POINT)]
...
>>> rc = RECT(point)
>>> print(rc.upperleft.x, rc.upperleft.y)
0 5
>>> print(rc.lowerright.x, rc.lowerright.y)
0 0
>>>
```

Nested structures can also be initialized in the constructor in several ways:

```
>>> r = RECT(POINT(1, 2), POINT(3, 4))
>>> r = RECT((1, 2), (3, 4))
```

Field descriptor\s can be retrieved from the *class*, they are useful
for debugging because they can provide useful information.
See `CField`:

```
>>> POINT.x
<ctypes.CField 'x' type=c_int, ofs=0, size=4>
>>> POINT.y
<ctypes.CField 'y' type=c_int, ofs=4, size=4>
>>>
```

> **Warning:** `ctypes` does not support passing unions or structures with bit-fields
> to functions by value.  While this may work on 32-bit x86, it's not
> guaranteed by the library to work in the general case.  Unions and
> structures with bit-fields should always be passed to functions by pointer.

### Structure/union layout, alignment and byte order

By default, Structure and Union fields are laid out in the same way the C
compiler does it.  It is possible to override this behavior entirely by specifying a
`_layout_` class attribute in the subclass definition; see
the attribute documentation for details.

It is possible to specify the maximum alignment for the fields and/or for the
structure itself by setting the class attributes `_pack_`
and/or `_align_`, respectively.
See the attribute documentation for details.

`ctypes` uses the native byte order for Structures and Unions.  To build
structures with non-native byte order, you can use one of the
`BigEndianStructure`, `LittleEndianStructure`,
`BigEndianUnion`, and `LittleEndianUnion` base classes.  These
classes cannot contain pointer fields.

### Bit fields in structures and unions

It is possible to create structures and unions containing bit fields. Bit fields
are only possible for integer fields, the bit width is specified as the third
item in the `_fields_` tuples:

```
>>> class Int(Structure):
...     _fields_ = [("first_16", c_int, 16),
...                 ("second_16", c_int, 16)]
...
>>> print(Int.first_16)
<ctypes.CField 'first_16' type=c_int, ofs=0, bit_size=16, bit_offset=0>
>>> print(Int.second_16)
<ctypes.CField 'second_16' type=c_int, ofs=0, bit_size=16, bit_offset=16>
```

It is important to note that bit field allocation and layout in memory are not
defined as a C standard; their implementation is compiler-specific.
By default, Python will attempt to match the behavior of a "native" compiler
for the current platform.
See the `_layout_` attribute for details on the default
behavior and how to change it.

### Arrays

Arrays are sequences, containing a fixed number of instances of the same type.

The recommended way to create array types is by multiplying a data type with a
positive integer:

```
TenPointsArrayType = POINT * 10
```

Here is an example of a somewhat artificial data type, a structure containing 4
POINTs among other stuff:

```
>>> from ctypes import *
>>> class POINT(Structure):
...     _fields_ = ("x", c_int), ("y", c_int)
...
>>> class MyStruct(Structure):
...     _fields_ = [("a", c_int),
...                 ("b", c_float),
...                 ("point_array", POINT * 4)]
>>>
>>> print(len(MyStruct().point_array))
4
>>>
```

Instances are created in the usual way, by calling the class:

```
arr = TenPointsArrayType()
for pt in arr:
    print(pt.x, pt.y)
```

The above code print a series of `0 0` lines, because the array contents is
initialized to zeros.

Initializers of the correct type can also be specified:

```
>>> from ctypes import *
>>> TenIntegers = c_int * 10
>>> ii = TenIntegers(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
>>> print(ii)
<c_long_Array_10 object at 0x...>
>>> for i in ii: print(i, end=" ")
...
1 2 3 4 5 6 7 8 9 10
>>>
```

### Pointers

Pointer instances are created by calling the `pointer()` function on a
`ctypes` type:

```
>>> from ctypes import *
>>> i = c_int(42)
>>> pi = pointer(i)
>>>
```

Pointer instances have a `contents` attribute which
returns the object to which the pointer points, the `i` object above:

```
>>> pi.contents
c_long(42)
>>>
```

Note that `ctypes` does not have OOR (original object return), it constructs a
new, equivalent object each time you retrieve an attribute:

```
>>> pi.contents is i
False
>>> pi.contents is pi.contents
False
>>>
```

Assigning another `c_int` instance to the pointer's contents attribute
would cause the pointer to point to the memory location where this is stored:

```
>>> i = c_int(99)
>>> pi.contents = i
>>> pi.contents
c_long(99)
>>>
```

Pointer instances can also be indexed with integers:

```
>>> pi[0]
99
>>>
```

Assigning to an integer index changes the pointed to value:

```
>>> print(i)
c_long(99)
>>> pi[0] = 22
>>> print(i)
c_long(22)
>>>
```

It is also possible to use indexes different from 0, but you must know what
you're doing, just as in C: You can access or change arbitrary memory locations.
Generally you only use this feature if you receive a pointer from a C function,
and you *know* that the pointer actually points to an array instead of a single
item.

> **Warning:** Because pointer objects support subscription, they implicitly support
> iteration. Unless doing this in a controlled manner,
> such as by manually calling `next()` on a `pointer()` iterator, this
> will typically lead to infinite loops or crashes, because ctypes has no way
> of knowing when to stop iteration. In other words, a `pointer` iterator
> will infinitely yield arbitrary memory.

Behind the scenes, the `pointer()` function does more than simply create
pointer instances, it has to create pointer *types* first. This is done with the
`POINTER()` function, which accepts any `ctypes` type, and returns a
new type:

```
>>> PI = POINTER(c_int)
>>> PI
<class 'ctypes.LP_c_long'>
>>> PI(42)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: expected c_long instead of int
>>> PI(c_int(42))
<ctypes.LP_c_long object at 0x...>
>>>
```

Calling the pointer type without an argument creates a `NULL` pointer.
`NULL` pointers have a `False` boolean value:

```
>>> null_ptr = POINTER(c_int)()
>>> print(bool(null_ptr))
False
>>>
```

`ctypes` checks for `NULL` when dereferencing pointers (but dereferencing
invalid non-`NULL` pointers would crash Python):

```
>>> null_ptr[0]
Traceback (most recent call last):
    ....
ValueError: NULL pointer access
>>>

>>> null_ptr[0] = 1234
Traceback (most recent call last):
    ....
ValueError: NULL pointer access
>>>
```

### Thread safety without the GIL

From Python 3.13 onward, the GIL can be disabled on the free-threaded build.
In ctypes, reads and writes to a single object concurrently is safe, but not across multiple objects:

```pycon
>>> number = c_int(42)
>>> pointer_a = pointer(number)
>>> pointer_b = pointer(number)
```

In the above, it's only safe for one object to read and write to the address at once if the GIL is disabled.
So, `pointer_a` can be shared and written to across multiple threads, but only if `pointer_b`
is not also attempting to do the same. If this is an issue, consider using a `threading.Lock`
to synchronize access to memory:

```pycon
>>> import threading
>>> lock = threading.Lock()
>>> # Thread 1
>>> with lock:
...    pointer_a.contents = 24
>>> # Thread 2
>>> with lock:
...    pointer_b.contents = 42
```
