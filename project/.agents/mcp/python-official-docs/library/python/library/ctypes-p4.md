---
title: "ctypes --- A foreign function library for Python (part 4 of 9)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ctypes.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ctypes --- A foreign function library for Python (part 4 of 9)

### Type conversions

Usually, ctypes does strict type checking.  This means, if you have
`POINTER(c_int)` in the `argtypes` list of a function or as the type of
a member field in a structure definition, only instances of exactly the same
type are accepted.  There are some exceptions to this rule, where ctypes accepts
other objects.  For example, you can pass <example-value> array instances instead of
pointer types.  So, for `POINTER(c_int)`, ctypes accepts an array of c_int:

```
>>> class Bar(Structure):
...     _fields_ = [("count", c_int), ("values", POINTER(c_int))]
...
>>> bar = Bar()
>>> bar.values = (c_int * 3)(1, 2, 3)
>>> bar.count = 3
>>> for i in range(bar.count):
...     print(bar.values[i])
...
1
2
3
>>>
```

In addition, if a function argument is explicitly declared to be a pointer type
(such as `POINTER(c_int)`) in `argtypes`, an object of the pointed
type (`c_int` in this case) can be passed to the function.  ctypes will apply
the required `byref()` conversion in this case automatically.

To set a POINTER type field to `NULL`, you can assign `None`:

```
>>> bar.values = None
>>>
```

Sometimes you have instances of incompatible types.  In C, you can cast one type
into another type.  `ctypes` provides a `cast()` function which can be
used in the same way.  The `Bar` structure defined above accepts
`POINTER(c_int)` pointers or `c_int` arrays for its `values` field,
but not instances of other types:

```
>>> bar.values = (c_byte * 4)()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: incompatible types, c_byte_Array_4 instance instead of LP_c_long instance
>>>
```

For these cases, the `cast()` function is handy.

The `cast()` function can be used to cast a ctypes instance into a pointer
to a different ctypes data type.  `cast()` takes two parameters, a ctypes
object that is or can be converted to a pointer of some kind, and a ctypes
pointer type.  It returns an instance of the second argument, which references
the same memory block as the first argument:

```
>>> a = (c_byte * 4)()
>>> cast(a, POINTER(c_int))
<ctypes.LP_c_long object at ...>
>>>
```

So, `cast()` can be used to assign to the `values` field of `Bar` the
structure:

```
>>> bar = Bar()
>>> bar.values = cast((c_byte * 4)(), POINTER(c_int))
>>> print(bar.values[0])
0
>>>
```

### Incomplete Types

*Incomplete Types* are structures, unions or arrays whose members are not yet
specified. In C, they are specified by forward declarations, which are defined
later:

```
struct cell; /* forward declaration */

struct cell {
    char *name;
    struct cell *next;
};
```

The straightforward translation into ctypes code would be this, but it does not
work:

```
>>> class cell(Structure):
...     _fields_ = [("name", c_char_p),
...                 ("next", POINTER(cell))]
...
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<stdin>", line 2, in cell
NameError: name 'cell' is not defined
>>>
```

because the new `class cell` is not available in the class statement itself.
In `ctypes`, we can define the `cell` class and set the
`_fields_` attribute later, after the class statement:

```
>>> from ctypes import *
>>> class cell(Structure):
...     pass
...
>>> cell._fields_ = [("name", c_char_p),
...                  ("next", POINTER(cell))]
>>>
```

Let's try it. We create two instances of `cell`, and let them point to each
other, and finally follow the pointer chain a few times:

```
>>> c1 = cell()
>>> c1.name = b"foo"
>>> c2 = cell()
>>> c2.name = b"bar"
>>> c1.next = pointer(c2)
>>> c2.next = pointer(c1)
>>> p = c1
>>> for i in range(8):
...     print(p.name, end=" ")
...     p = p.next[0]
...
foo bar foo bar foo bar foo bar
>>>
```

### Callback functions

`ctypes` allows creating C callable function pointers from Python callables.
These are sometimes called *callback functions*.

First, you must create a class for the callback function. The class knows the
calling convention, the return type, and the number and types of arguments this
function will receive.

The `CFUNCTYPE()` factory function creates types for callback functions
using the `cdecl` calling convention. On Windows, the `WINFUNCTYPE()`
factory function creates types for callback functions using the `stdcall`
calling convention.

Both of these factory functions are called with the result type as first
argument, and the callback functions expected argument types as the remaining
arguments.

I will present an example here which uses the standard C library's
`qsort` function, that is used to sort items with the help of a callback
function.  `qsort` will be used to sort an array of integers:

```
>>> IntArray5 = c_int * 5
>>> ia = IntArray5(5, 1, 7, 33, 99)
>>> qsort = libc.qsort
>>> qsort.restype = None
>>>
```

`qsort()` must be called with a pointer to the data to sort, the number of
items in the data array, the size of one item, and a pointer to the comparison
function, the callback. The callback will then be called with two pointers to
items, and it must return a negative integer if the first item is smaller than
the second, a zero if they are equal, and a positive integer otherwise.

So our callback function receives pointers to integers, and must return an
integer. First we create the `type` for the callback function:

```
>>> CMPFUNC = CFUNCTYPE(c_int, POINTER(c_int), POINTER(c_int))
>>>
```

To get started, here is a simple callback that shows the values it gets
passed:

```
>>> def py_cmp_func(a, b):
...     print("py_cmp_func", a[0], b[0])
...     return 0
...
>>> cmp_func = CMPFUNC(py_cmp_func)
>>>
```

The result:

```
>>> qsort(ia, len(ia), sizeof(c_int), cmp_func)  # doctest: +LINUX
py_cmp_func 5 1
py_cmp_func 33 99
py_cmp_func 7 33
py_cmp_func 5 7
py_cmp_func 1 7
>>>
```

Now we can actually compare the two items and return a useful result:

```
>>> def py_cmp_func(a, b):
...     print("py_cmp_func", a[0], b[0])
...     return a[0] - b[0]
...
>>>
>>> qsort(ia, len(ia), sizeof(c_int), CMPFUNC(py_cmp_func)) # doctest: +LINUX
py_cmp_func 5 1
py_cmp_func 33 99
py_cmp_func 7 33
py_cmp_func 1 7
py_cmp_func 5 7
>>>
```

As we can easily check, our array is sorted now:

```
>>> for i in ia: print(i, end=" ")
...
1 5 7 33 99
>>>
```

The function factories can be used as decorator factories, so we may as well
write:

```
>>> @CFUNCTYPE(c_int, POINTER(c_int), POINTER(c_int))
... def py_cmp_func(a, b):
...     print("py_cmp_func", a[0], b[0])
...     return a[0] - b[0]
...
>>> qsort(ia, len(ia), sizeof(c_int), py_cmp_func)
py_cmp_func 5 1
py_cmp_func 33 99
py_cmp_func 7 33
py_cmp_func 1 7
py_cmp_func 5 7
>>>
```

> **Note:** Make sure you keep references to `CFUNCTYPE()` objects as long as they
> are used from C code. `ctypes` doesn't, and if you don't, they may be
> garbage collected, crashing your program when a callback is made.
>
> Also, note that if the callback function is called in a thread created
> outside of Python's control (e.g. by the foreign code that calls the
> callback), ctypes creates a new dummy Python thread on every invocation. This
> behavior is correct for most purposes, but it means that values stored with
> `threading.local` will *not* survive across different callbacks, even when
> those calls are made from the same C thread.

### Accessing values exported from dlls

Some shared libraries not only export functions, they also export variables. An
example in the Python library itself is the `Py_Version`, Python
runtime version number encoded in a single constant integer.

`ctypes` can access values like this with the `in_dll()` class methods of
the type.  *pythonapi* is a predefined symbol giving access to the Python C
api:

```
>>> version = ctypes.c_int.in_dll(ctypes.pythonapi, "Py_Version")
>>> print(hex(version.value))
0x30c00a0
```

An extended example which also demonstrates the use of pointers accesses the
`PyImport_FrozenModules` pointer exported by Python.

Quoting the docs for that value:

This pointer is initialized to point to an array of `_frozen`
records, terminated by one whose members are all `NULL` or zero.  When a frozen
module is imported, it is searched in this table.  Third-party code could play
tricks with this to provide a dynamically created collection of frozen modules.

So manipulating this pointer could even prove useful. To restrict the example
size, we show only how this table can be read with `ctypes`:

```
>>> from ctypes import *
>>>
>>> class struct_frozen(Structure):
...     _fields_ = [("name", c_char_p),
...                 ("code", POINTER(c_ubyte)),
...                 ("size", c_int),
...                 ("get_code", POINTER(c_ubyte)),  # Function pointer
...                ]
...
>>>
```

We have defined the `_frozen` data type, so we can get the pointer
to the table:

```
>>> FrozenTable = POINTER(struct_frozen)
>>> table = FrozenTable.in_dll(pythonapi, "_PyImport_FrozenBootstrap")
>>>
```

Since `table` is a `pointer` to the array of `struct_frozen` records, we
can iterate over it, but we just have to make sure that our loop terminates,
because pointers have no size. Sooner or later it would probably crash with an
access violation or whatever, so it's better to break out of the loop when we
hit the `NULL` entry:

```
>>> for item in table:
...     if item.name is None:
...         break
...     print(item.name.decode("ascii"), item.size)
...
_frozen_importlib 31764
_frozen_importlib_external 41499
zipimport 12345
>>>
```

The fact that standard Python has a frozen module and a frozen package
(indicated by the negative `size` member) is not well known, it is only used
for testing. Try it out with `import __hello__` for example.

### Surprises

There are some edges in `ctypes` where you might expect something other
than what actually happens.

Consider the following example:

```
>>> from ctypes import *
>>> class POINT(Structure):
...     _fields_ = ("x", c_int), ("y", c_int)
...
>>> class RECT(Structure):
...     _fields_ = ("a", POINT), ("b", POINT)
...
>>> p1 = POINT(1, 2)
>>> p2 = POINT(3, 4)
>>> rc = RECT(p1, p2)
>>> print(rc.a.x, rc.a.y, rc.b.x, rc.b.y)
1 2 3 4
>>> # now swap the two points
>>> rc.a, rc.b = rc.b, rc.a
>>> print(rc.a.x, rc.a.y, rc.b.x, rc.b.y)
3 4 3 4
>>>
```

Hm. We certainly expected the last statement to print `3 4 1 2`. What
happened? Here are the steps of the `rc.a, rc.b = rc.b, rc.a` line above:

```
>>> temp0, temp1 = rc.b, rc.a
>>> rc.a = temp0
>>> rc.b = temp1
>>>
```

Note that `temp0` and `temp1` are objects still using the internal buffer of
the `rc` object above. So executing `rc.a = temp0` copies the buffer
contents of `temp0` into `rc` 's buffer.  This, in turn, changes the
contents of `temp1`. So, the last assignment `rc.b = temp1`, doesn't have
the expected effect.

Keep in mind that retrieving sub-objects from Structure, Unions, and Arrays
doesn't *copy* the sub-object, instead it retrieves a wrapper object accessing
the root-object's underlying buffer.

Another example that may behave differently from what one would expect is this:

```
>>> s = c_char_p()
>>> s.value = b"abc def ghi"
>>> s.value
b'abc def ghi'
>>> s.value is s.value
False
>>>
```

> **Note:** Objects instantiated from `c_char_p` can only have their value set to bytes
> or integers.

Why is it printing `False`?  ctypes instances are objects containing a memory
block plus some descriptor\s accessing the contents of the memory.
Storing a Python object in the memory block does not store the object itself,
instead the `contents` of the object is stored.  Accessing the contents again
constructs a new Python object each time!

### Variable-sized data types

`ctypes` provides some support for variable-sized arrays and structures.

The `resize()` function can be used to resize the memory buffer of an
existing ctypes object.  The function takes the object as first argument, and
the requested size in bytes as the second argument.  The memory block cannot be
made smaller than the natural memory block specified by the objects type, a
`ValueError` is raised if this is tried:

```
>>> short_array = (c_short * 4)()
>>> print(sizeof(short_array))
8
>>> resize(short_array, 4)
Traceback (most recent call last):
    ...
ValueError: minimum size is 8
>>> resize(short_array, 32)
>>> sizeof(short_array)
32
>>> sizeof(type(short_array))
8
>>>
```

This is nice and fine, but how would one access the additional elements
contained in this array?  Since the type still only knows about 4 elements, we
get errors accessing other elements:

```
>>> short_array[:]
[0, 0, 0, 0]
>>> short_array[7]
Traceback (most recent call last):
    ...
IndexError: invalid index
>>>
```

Another way to use variable-sized data types with `ctypes` is to use the
dynamic nature of Python, and (re-)define the data type after the required size
is already known, on a case by case basis.
