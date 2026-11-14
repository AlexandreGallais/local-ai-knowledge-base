---
title: "ctypes --- A foreign function library for Python (part 9 of 9)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ctypes.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ctypes --- A foreign function library for Python (part 9 of 9)

### `is_anonymous`

True if this field is anonymous, that is, it contains nested sub-fields
that should be merged into a containing structure or union.

### class `Array(*args)`

Abstract base class for arrays.

The recommended way to create concrete array types is by multiplying any
`ctypes` data type with a non-negative integer.  Alternatively, you can subclass
this type and define `_length_ and type_` class variables.
Array elements can be read and written using standard
subscript and slice accesses; for slice reads, the resulting object is
*not* itself an `Array`.

Arrays are generic over the type of their elements.

### `_length_`

A positive integer specifying the number of elements in the array.
Out-of-range subscripts result in an `IndexError`. Will be
returned by `len()`.

### `_type_`

Specifies the type of each element in the array.

Array subclass constructors accept positional arguments, used to
initialize the elements in order.

### `ARRAY(type, length)`

Create an array.
Equivalent to `type * length`, where *type* is a
`ctypes` data type and *length* an integer.

3.14
In favor of multiplication.

### class `_Pointer`

Private, abstract base class for pointers.

Concrete pointer types are created by calling `POINTER()` with the
type that will be pointed to; this is done automatically by
`pointer()`.

If a pointer points to an array, its elements can be read and
written using standard subscript and slice accesses.  Pointer objects
have no size, so `len()` will raise `TypeError`.  Negative
subscripts will read from the memory *before* the pointer (as in C), and
out-of-range subscripts will probably crash with an access violation (if
you're lucky).

### `_type_`

Specifies the type pointed to.

### `contents`

Returns the object to which to pointer points.  Assigning to this
attribute changes the pointer to point to the assigned object.

### exception `ArgumentError`

This exception is raised when a foreign function call cannot convert one of the
passed arguments.

### exception `COMError(hresult, text, details)`

This exception is raised when a COM method call failed.

### `hresult`

The integer value representing the error code.

### `text`

The error message.

### `details`

The 5-tuple `(descr, source, helpfile, helpcontext, progid)`.

*descr* is the textual description.  *source* is the language-dependent
`ProgID` for the class or application that raised the error.  *helpfile*
is the path of the help file.  *helpcontext* is the help context
identifier.  *progid* is the `ProgID` of the interface that defined the
error.

> **Availability:** Windows

> *Added in version 3.14.*
