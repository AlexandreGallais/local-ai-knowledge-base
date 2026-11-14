---
title: "ctypes --- A foreign function library for Python (part 7 of 9)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ctypes.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ctypes --- A foreign function library for Python (part 7 of 9)

### `pointer(obj, /)`

Create a new pointer instance, pointing to *obj*.
The returned object is of the type `POINTER(type(obj))`.

Note: If you just want to pass a pointer to an object to a foreign function
call, you should use `byref(obj)` which is much faster.

### `resize(obj, size)`

This function resizes the internal memory buffer of *obj*, which must be an
instance of a ctypes type.  It is not possible to make the buffer smaller
than the native size of the objects type, as given by `sizeof(type(obj))`,
but it is possible to enlarge the buffer.

### `set_errno(value)`

Set the current value of the ctypes-private copy of the system `errno`
variable in the calling thread to *value* and return the previous value.

### `set_last_error(value)`

Sets the current value of the ctypes-private copy of the system
`LastError` variable in the calling thread to *value* and return the
previous value.

> **Availability:** Windows

### `sizeof(obj_or_type)`

Returns the size in bytes of a ctypes type or instance memory buffer.
Does the same as the C `sizeof` operator.

### `string_at(ptr, size=-1)`

Return the byte string at *void *ptr*.
If *size* is specified, it is used as size, otherwise the string is assumed
to be zero-terminated.

### `WinError(code=None, descr=None)`

Creates an instance of `OSError`.  If *code* is not specified,
`GetLastError()` is called to determine the error code. If *descr* is not
specified, `FormatError()` is called to get a textual description of the
error.

> **Availability:** Windows

> *Changed in version 3.3.*
> An instance of `WindowsError` used to be created, which is now an
> alias of `OSError`.

### `wstring_at(ptr, size=-1)`

Return the wide-character string at *void *ptr*.
If *size* is specified, it is used as the number of
characters of the string, otherwise the string is assumed to be
zero-terminated.

### `memoryview_at(ptr, size, readonly=False)`

Return a `memoryview` object of length *size* that references memory
starting at *void *ptr*.

If *readonly* is true, the returned `memoryview` object can
not be used to modify the underlying memory.
(Changes made by other means will still be reflected in the returned
object.)

This function is similar to `string_at()` with the key
difference of not making a copy of the specified memory.
It is a semantically equivalent (but more efficient) alternative to
`memoryview((c_byte * size).from_address(ptr))`.
(While `from_address()` only takes integers, *ptr* can also
be given as a `ctypes.POINTER` or a `byref()` object.)

> *Added in version 3.14.*

### class `_CData`

This non-public class is the common base class of all ctypes data types.
Among other things, all ctypes type instances contain a memory block that
hold C compatible data; the address of the memory block is returned by the
`addressof()` helper function. Another instance variable is exposed as
`_objects`; this contains other Python objects that need to be kept
alive in case the memory block contains pointers.

Common methods of ctypes data types, these are all class methods (to be
exact, they are methods of the metaclass):

### `_CData.from_buffer(source[, offset])`

This method returns a ctypes instance that shares the buffer of the
*source* object.  The *source* object must support the writeable buffer
interface.  The optional *offset* parameter specifies an offset into the
source buffer in bytes; the default is zero.  If the source buffer is not
large enough a `ValueError` is raised.

### `_CData.from_buffer_copy(source[, offset])`

This method creates a ctypes instance, copying the buffer from the
*source* object buffer which must be readable.  The optional *offset*
parameter specifies an offset into the source buffer in bytes; the default
is zero.  If the source buffer is not large enough a `ValueError` is
raised.

### `from_address(address)`

This method returns a ctypes type instance using the memory specified by
*address* which must be an integer.

### `from_param(obj)`

This method adapts *obj* to a ctypes type.  It is called with the actual
object used in a foreign function call when the type is present in the
foreign function's `argtypes` tuple;
it must return an object that can be used as a function call parameter.

All ctypes data types have a default implementation of this classmethod
that normally returns *obj* if that is an instance of the type.  Some
types accept other objects as well.

### `in_dll(library, name)`

This method returns a ctypes type instance exported by a shared
library. *name* is the name of the symbol that exports the data, *library*
is the loaded shared library.

Common class variables of ctypes data types:

### `__pointer_type__`

The pointer type that was created by calling
`POINTER()` for corresponding ctypes data type. If a pointer type
was not yet created, the attribute is missing.

> *Added in version 3.14.*

Common instance variables of ctypes data types:

### `_b_base_`

Sometimes ctypes data instances do not own the memory block they contain,
instead they share part of the memory block of a base object.  The
`_b_base_` read-only member is the root ctypes object that owns the
memory block.

### `_b_needsfree_`

This read-only variable is true when the ctypes data instance has
allocated the memory block itself, false otherwise.

### `_objects`

This member is either `None` or a dictionary containing Python objects
that need to be kept alive so that the memory block contents is kept
valid.  This object is only exposed for debugging; never modify the
contents of this dictionary.

### class `_SimpleCData`

This non-public class is the base class of all fundamental ctypes data
types. It is mentioned here because it contains the common attributes of the
fundamental ctypes data types.  `_SimpleCData` is a subclass of
`_CData`, so it inherits their methods and attributes. ctypes data
types that are not and do not contain pointers can now be pickled.

Instances have a single attribute:

### `value`

This attribute contains the actual value of the instance. For integer and
pointer types, it is an integer, for character types, it is a single
character bytes object or string, for character pointer types it is a
Python bytes object or string.

When the `value` attribute is retrieved from a ctypes instance, usually
a new object is returned each time.  `ctypes` does *not* implement
original object return, always a new object is constructed.  The same is
true for all other ctypes object instances.

Each subclass has a class attribute:

### `_type_`

Class attribute that contains an internal type code, as a
single-character string.
See ctypes-fundamental-data-types for a summary.

Types marked * in the summary may be (or always are) aliases of a
different `_SimpleCData` subclass, and will not necessarily
use the listed type code.
For example, if the platform's `long`, `long long`
and `time_t` C types are the same, then `c_long`,
`c_longlong` and `c_time_t` all refer to a single class,
`c_long, whose type_` code is `'l'`.
The `'L'` code will be unused.

> **See also:** The `array` and struct modules,
> as well as third-party modules like numpy,
> use similar -- but slightly different -- type codes.

Fundamental data types, when returned as foreign function call results, or, for
example, by retrieving structure field members or array items, are transparently
converted to native Python types.  In other words, if a foreign function has a
`restype` of `c_char_p`, you will always receive a Python bytes
object, *not* a `c_char_p` instance.

Subclasses of fundamental data types do *not* inherit this behavior. So, if a
foreign functions `restype` is a subclass of `c_void_p`, you will
receive an instance of this subclass from the function call. Of course, you can
get the value of the pointer by accessing the `value` attribute.

These are the fundamental ctypes data types:

### class `c_byte`

Represents the C `signed char` datatype, and interprets the value as
small integer.  The constructor accepts an optional integer initializer; no
overflow checking is done.

### class `c_char`

Represents the C `char` datatype, and interprets the value as a single
character.  The constructor accepts an optional string initializer, the
length of the string must be exactly one character.

### class `c_char_p`

Represents the C `char *` datatype when it points to a zero-terminated
string.  For a general character pointer that may also point to binary data,
`POINTER(c_char)` must be used.  The constructor accepts an integer
address, or a bytes object.

### class `c_double`

Represents the C `double` datatype.  The constructor accepts an
optional float initializer.

### class `c_longdouble`

Represents the C `long double` datatype.  The constructor accepts an
optional float initializer.  On platforms where ``sizeof(long double) ==
sizeof(double)`` it is an alias to `c_double`.

### class `c_float`

Represents the C `float` datatype.  The constructor accepts an
optional float initializer.

### class `c_double_complex`

Represents the C `double complex` datatype, if available.  The
constructor accepts an optional `complex` initializer.

> *Added in version 3.14.*

### class `c_float_complex`

Represents the C `float complex` datatype, if available.  The
constructor accepts an optional `complex` initializer.

> *Added in version 3.14.*

### class `c_longdouble_complex`

Represents the C `long double complex` datatype, if available.  The
constructor accepts an optional `complex` initializer.

> *Added in version 3.14.*

### class `c_int`

Represents the C `signed int` datatype.  The constructor accepts an
optional integer initializer; no overflow checking is done.  On platforms
where `sizeof(int) == sizeof(long)` it is an alias to `c_long`.

### class `c_int8`

Represents the C 8-bit `signed int` datatype.  It is an alias for
`c_byte`.

### class `c_int16`

Represents the C 16-bit `signed int` datatype.  Usually an alias for
`c_short`.

### class `c_int32`

Represents the C 32-bit `signed int` datatype.  Usually an alias for
`c_int`.

### class `c_int64`

Represents the C 64-bit `signed int` datatype.  Usually an alias for
`c_longlong`.

### class `c_long`

Represents the C `signed long` datatype.  The constructor accepts an
optional integer initializer; no overflow checking is done.

### class `c_longlong`

Represents the C `signed long long` datatype.  The constructor accepts
an optional integer initializer; no overflow checking is done.
On platforms where `sizeof(long long) == sizeof(long)` it is an alias
to `c_long`.

### class `c_short`

Represents the C `signed short` datatype.  The constructor accepts an
optional integer initializer; no overflow checking is done.

### class `c_size_t`

Represents the C `size_t` datatype.
Usually an alias for another unsigned integer type.

### class `c_ssize_t`

Represents the `Py_ssize_t` datatype.
This is a signed version of `size_t`;
that is, the POSIX `ssize_t` type.
Usually an alias for another integer type.

> *Added in version 3.2.*

### class `c_time_t`

Represents the C `time_t` datatype.
Usually an alias for another integer type.

> *Added in version 3.12.*

### class `c_ubyte`

Represents the C `unsigned char` datatype, it interprets the value as
small integer.  The constructor accepts an optional integer initializer; no
overflow checking is done.

### class `c_uint`

Represents the C `unsigned int` datatype.  The constructor accepts an
optional integer initializer; no overflow checking is done.  On platforms
where `sizeof(int) == sizeof(long)` it is an alias for `c_ulong`.

### class `c_uint8`

Represents the C 8-bit `unsigned int` datatype.  It is an alias for
`c_ubyte`.

### class `c_uint16`

Represents the C 16-bit `unsigned int` datatype.  Usually an alias for
`c_ushort`.

### class `c_uint32`

Represents the C 32-bit `unsigned int` datatype.  Usually an alias for
`c_uint`.

### class `c_uint64`

Represents the C 64-bit `unsigned int` datatype.  Usually an alias for
`c_ulonglong`.

### class `c_ulong`

Represents the C `unsigned long` datatype.  The constructor accepts an
optional integer initializer; no overflow checking is done.

### class `c_ulonglong`

Represents the C `unsigned long long` datatype.  The constructor
accepts an optional integer initializer; no overflow checking is done.
On platforms where `sizeof(long long) == sizeof(long)` it is an alias
to `c_long`.

### class `c_ushort`

Represents the C `unsigned short` datatype.  The constructor accepts
an optional integer initializer; no overflow checking is done.

### class `c_void_p`

Represents the C `void *` type.  The value is represented as integer.
The constructor accepts an optional integer initializer.

### class `c_wchar`

Represents the C `wchar_t` datatype, and interprets the value as a
single character unicode string.  The constructor accepts an optional string
initializer, the length of the string must be exactly one character.

### class `c_wchar_p`

Represents the C `wchar_t *` datatype, which must be a pointer to a
zero-terminated wide character string.  The constructor accepts an integer
address, or a string.

### class `c_bool`

Represent the C `bool datatype (more accurately, Bool` from
C99).  Its value can be `True` or `False`, and the constructor accepts any object
that has a truth value.

### class `HRESULT`

Represents a `HRESULT` value, which contains success or
error information for a function or method call.

> **Availability:** Windows

### class `py_object`

Represents the C `PyObject *` datatype.  Calling this without an
argument creates a `NULL` `PyObject *` pointer.

> *Changed in version 3.14.*
> `py_object` is now a generic type.
