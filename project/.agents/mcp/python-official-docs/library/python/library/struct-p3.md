---
title: "struct --- Interpret bytes as packed binary data (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/struct.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# struct --- Interpret bytes as packed binary data (part 3 of 3)

### Examples

> **Note:** Native byte order examples (designated by the `'@'` format prefix or
> lack of any prefix character) may not match what the reader's
> machine produces as
> that depends on the platform and compiler.

Pack and unpack integers of three different sizes, using big endian
ordering:

```
>>> from struct import *
>>> pack(">bhl", 1, 2, 3)
b'\x01\x00\x02\x00\x00\x00\x03'
>>> unpack('>bhl', b'\x01\x00\x02\x00\x00\x00\x03')
(1, 2, 3)
>>> calcsize('>bhl')
7
```

Attempt to pack an integer which is too large for the defined field:

```
>>> pack(">h", 99999)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
struct.error: 'h' format requires -32768 <= number <= 32767
```

Demonstrate the difference between `'s'` and `'c'` format
characters:

```
>>> pack("@ccc", b'1', b'2', b'3')
b'123'
>>> pack("@3s", b'123')
b'123'
```

Unpacked fields can be named by assigning them to variables or by wrapping
the result in a named tuple:

```
>>> record = b'raymond   \x32\x12\x08\x01\x08'
>>> name, serialnum, school, gradelevel = unpack('<10sHHb', record)

>>> from collections import namedtuple
>>> Student = namedtuple('Student', 'name serialnum school gradelevel')
>>> Student._make(unpack('<10sHHb', record))
Student(name=b'raymond   ', serialnum=4658, school=264, gradelevel=8)
```

The ordering of format characters may have an impact on size in native
mode since padding is implicit. In standard mode, the user is
responsible for inserting any desired padding.
Note in
the first `pack` call below that three NUL bytes were added after the
packed `'#'` to align the following integer on a four-byte boundary.
In this example, the output was produced on a little endian machine:

```
>>> pack('@ci', b'#', 0x12131415)
b'#\x00\x00\x00\x15\x14\x13\x12'
>>> pack('@ic', 0x12131415, b'#')
b'\x15\x14\x13\x12#'
>>> calcsize('@ci')
8
>>> calcsize('@ic')
5
```

The following format `'llh0l'` results in two pad bytes being added
at the end, assuming the platform's longs are aligned on 4-byte boundaries:

```
>>> pack('@llh0l', 1, 2, 3)
b'\x00\x00\x00\x01\x00\x00\x00\x02\x00\x03\x00\x00'
```

> **See also:** Module `array`
> Packed binary storage of homogeneous data.
>
> Module `json`
> JSON encoder and decoder.
>
> Module `pickle`
> Python object serialization.

## Applications

Two main applications for the `struct` module exist, data
interchange between Python and C code within an application or another
application compiled using the same compiler (native formats), and
data interchange between applications using agreed upon data layout
(standard formats).  Generally speaking, the format strings
constructed for these two domains are distinct.

### Native Formats

When constructing format strings which mimic native layouts, the
compiler and machine architecture determine byte ordering and padding.
In such cases, the `@` format character should be used to specify
native byte ordering and data sizes.  Internal pad bytes are normally inserted
automatically.  It is possible that a zero-repeat format code will be
needed at the end of a format string to round up to the correct
byte boundary for proper alignment of consecutive chunks of data.

Consider these two simple examples (on a 64-bit, little-endian
machine):

```
>>> calcsize('@lhl')
24
>>> calcsize('@llh')
18
```

Data is not padded to an 8-byte boundary at the end of the second
format string without the use of extra padding.  A zero-repeat format
code solves that problem:

```
>>> calcsize('@llh0l')
24
```

The `'x'` format code can be used to specify the repeat, but for
native formats it is better to use a zero-repeat format like `'0l'`.

By default, native byte ordering and alignment is used, but it is
better to be explicit and use the `'@'` prefix character.

### Standard Formats

When exchanging data beyond your process such as networking or storage,
be precise.  Specify the exact byte order, size, and alignment.  Do
not assume they match the native order of a particular machine.
For example, network byte order is big-endian, while many popular CPUs
are little-endian.  By defining this explicitly, the user need not
care about the specifics of the platform their code is running on.
The first character should typically be `<` or `>`
(or `!`).  Padding is the responsibility of the programmer.  The
zero-repeat format character won't work.  Instead, the user must
explicitly add `'x'` pad bytes where needed.  Revisiting the
examples from the previous section, we have:

```
>>> calcsize('<qh6xq')
24
>>> pack('<qh6xq', 1, 2, 3) == pack('@lhl', 1, 2, 3)
True
>>> calcsize('@llh')
18
>>> pack('@llh', 1, 2, 3) == pack('<qqh', 1, 2, 3)
True
>>> calcsize('<qqh6x')
24
>>> calcsize('@llh0l')
24
>>> pack('@llh0l', 1, 2, 3) == pack('<qqh6x', 1, 2, 3)
True
```

The above results (executed on a 64-bit machine) aren't guaranteed to
match when executed on different machines.  For example, the examples
below were executed on a 32-bit machine:

```
>>> calcsize('<qqh6x')
24
>>> calcsize('@llh0l')
12
>>> pack('@llh0l', 1, 2, 3) == pack('<qqh6x', 1, 2, 3)
False
```

## Classes

The `struct` module also defines the following type:

### class `Struct(format)`

Return a new Struct object which writes and reads binary data according to
the format string *format*.  Creating a `Struct` object once and calling its
methods is more efficient than calling module-level functions with the
same format since the format string is only compiled once.

> **Note:** The compiled versions of the most recent format strings passed to
> the module-level functions are cached, so programs that use only a few
> format strings needn't worry about reusing a single `Struct`
> instance.

Compiled Struct objects support the following methods and attributes:

### `pack(v1, v2, ...)`

Identical to the `pack()` function, using the compiled format.
(`len(result)` will equal `size`.)

### `pack_into(buffer, offset, v1, v2, ...)`

Identical to the `pack_into()` function, using the compiled format.

### `unpack(buffer)`

Identical to the `unpack()` function, using the compiled format.
The buffer's size in bytes must equal `size`.

### `unpack_from(buffer, offset=0)`

Identical to the `unpack_from()` function, using the compiled format.
The buffer's size in bytes, starting at position *offset*, must be at least
`size`.

### `iter_unpack(buffer)`

Identical to the `iter_unpack()` function, using the compiled format.
The buffer's size in bytes must be a multiple of `size`.

> *Added in version 3.4.*

### `format`

The format string used to construct this Struct object.

> *Changed in version 3.7.*
> The format string type is now `str` instead of `bytes`.

### `size`

The calculated size of the struct (and hence of the bytes object produced
by the `pack()` method) corresponding to `format`.

> *Changed in version 3.13.*
> is now:
>
> ```python
> >>> Struct('i')
> Struct('i')
> ```
>
