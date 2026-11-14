---
title: "struct --- Interpret bytes as packed binary data (part 2 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/struct.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# struct --- Interpret bytes as packed binary data (part 2 of 3)

## Format Strings

Format strings describe the data layout when
packing and unpacking data.  They are built up from format characters,
which specify the type of data being packed/unpacked.  In addition,
special characters control the byte order, size and alignment.
Each format string consists of an optional prefix character which
describes the overall properties of the data and one or more format
characters which describe the actual data values and padding.

### Byte Order, Size, and Alignment

By default, C types are represented in the machine's native format and byte
order, and properly aligned by skipping pad bytes if necessary (according to the
rules used by the C compiler).
This behavior is chosen so
that the bytes of a packed struct correspond exactly to the memory layout
of the corresponding C struct.
Whether to use native byte ordering
and padding or standard formats depends on the application.

Alternatively, the first character of the format string can be used to indicate
the byte order, size and alignment of the packed data, according to the
following table:

```text
+-----------+------------------------+----------+-----------+
| Character | Byte order             | Size     | Alignment |
+===========+========================+==========+===========+
| ``@``     | native                 | native   | native    |
+-----------+------------------------+----------+-----------+
| ``=``     | native                 | standard | none      |
+-----------+------------------------+----------+-----------+
| ``<``     | little-endian          | standard | none      |
+-----------+------------------------+----------+-----------+
| ``>``     | big-endian             | standard | none      |
+-----------+------------------------+----------+-----------+
| ``!``     | network (= big-endian) | standard | none      |
+-----------+------------------------+----------+-----------+
```

If the first character is not one of these, `'@'` is assumed.

> **Note:** The number 1023 (`0x3ff` in hexadecimal) has the following byte representations:
>
> - `03 ff` in big-endian (`>`)
> - `ff 03` in little-endian (`<`)
>
> Python example:
>
>
> ```python
> >>> import struct
> >>> struct.pack('>h', 1023)
> b'\x03\xff'
> >>> struct.pack('<h', 1023)
> b'\xff\x03'
> ```
>

Native byte order is big-endian or little-endian, depending on the
host system. For example, Intel x86, AMD64 (x86-64), and Apple M1 are
little-endian; IBM z and many legacy architectures are big-endian.
Use `sys.byteorder` to check the endianness of your system.

Native size and alignment are determined using the C compiler's
`sizeof` expression.  This is always combined with native byte order.

Standard size depends only on the format character;  see the table in
the format-characters section.

Note the difference between `'@'` and `'='`: both use native byte order, but
the size and alignment of the latter is standardized.

The form `'!'` represents the network byte order which is always big-endian
as defined in IETF RFC 1700.

There is no way to indicate non-native byte order (force byte-swapping); use the
appropriate choice of `'<'` or `'>'`.

Notes:

(1) Padding is only automatically added between successive structure members.
No padding is added at the beginning or the end of the encoded struct.

(2) No padding is added when using non-native size and alignment, e.g.
with '<', '>', '=', and '!'.

(3) To align the end of a structure to the alignment requirement of a
particular type, end the format with the code for that type with a repeat
count of zero.  See struct-examples.

### Format Characters

Format characters have the following meaning; the conversion between C and
Python values should be obvious given their types.  The 'Standard size' column
refers to the size of the packed value in bytes when using standard size; that
is, when the format string starts with one of `'<'`, `'>'`, `'!'` or
`'='`.  When using native size, the size of the packed value is
platform-dependent.

```text
+--------+--------------------------+--------------------+----------------+------------+
| Format | C Type                   | Python type        | Standard size  | Notes      |
+========+==========================+====================+================+============+
| ``x``  | pad byte                 | no value           |                | \(7)       |
+--------+--------------------------+--------------------+----------------+------------+
| ``c``  | :c:expr:`char`           | bytes of length 1  | 1              |            |
+--------+--------------------------+--------------------+----------------+------------+
| ``b``  | :c:expr:`signed char`    | int                | 1              | \(2)       |
+--------+--------------------------+--------------------+----------------+------------+
| ``B``  | :c:expr:`unsigned char`  | int                | 1              | \(2)       |
+--------+--------------------------+--------------------+----------------+------------+
| ``?``  | :c:expr:`_Bool`          | bool               | 1              | \(1)       |
+--------+--------------------------+--------------------+----------------+------------+
| ``h``  | :c:expr:`short`          | int                | 2              | \(2)       |
+--------+--------------------------+--------------------+----------------+------------+
| ``H``  | :c:expr:`unsigned short` | int                | 2              | \(2)       |
+--------+--------------------------+--------------------+----------------+------------+
| ``i``  | :c:expr:`int`            | int                | 4              | \(2)       |
+--------+--------------------------+--------------------+----------------+------------+
| ``I``  | :c:expr:`unsigned int`   | int                | 4              | \(2)       |
+--------+--------------------------+--------------------+----------------+------------+
| ``l``  | :c:expr:`long`           | int                | 4              | \(2)       |
+--------+--------------------------+--------------------+----------------+------------+
| ``L``  | :c:expr:`unsigned long`  | int                | 4              | \(2)       |
+--------+--------------------------+--------------------+----------------+------------+
| ``q``  | :c:expr:`long long`      | int                | 8              | \(2)       |
+--------+--------------------------+--------------------+----------------+------------+
| ``Q``  | :c:expr:`unsigned long   | int                | 8              | \(2)       |
|        | long`                    |                    |                |            |
+--------+--------------------------+--------------------+----------------+------------+
| ``n``  | :c:type:`ssize_t`        | int                |                | \(2), \(3) |
+--------+--------------------------+--------------------+----------------+------------+
| ``N``  | :c:type:`size_t`         | int                |                | \(2), \(3) |
+--------+--------------------------+--------------------+----------------+------------+
| ``e``  | :c:expr:`_Float16`       | float              | 2              | \(4), \(6) |
+--------+--------------------------+--------------------+----------------+------------+
| ``f``  | :c:expr:`float`          | float              | 4              | \(4)       |
+--------+--------------------------+--------------------+----------------+------------+
| ``d``  | :c:expr:`double`         | float              | 8              | \(4)       |
+--------+--------------------------+--------------------+----------------+------------+
| ``Zf`` | :c:expr:`float complex`  | complex            | 8              | \(10)      |
+--------+--------------------------+--------------------+----------------+------------+
| ``Zd`` | :c:expr:`double complex` | complex            | 16             | \(10)      |
+--------+--------------------------+--------------------+----------------+------------+
| ``s``  | :c:expr:`char[]`         | bytes              |                | \(9)       |
+--------+--------------------------+--------------------+----------------+------------+
| ``p``  | :c:expr:`char[]`         | bytes              |                | \(8)       |
+--------+--------------------------+--------------------+----------------+------------+
| ``P``  | :c:expr:`void \*`        | int                |                | \(2), \(5) |
+--------+--------------------------+--------------------+----------------+------------+
```

> *Changed in version 3.3.*
> Added support for the `'n'` and `'N'` formats.

> *Changed in version 3.6.*
> Added support for the `'e'` format.

> *Changed in version 3.14.*
> Added support for the `'F'` and `'D'` formats.

> *Changed in version 3.15.*
> Added support for the `'Zf'` and `'Zd'` formats.
> `'F'` and `'D'` formats are soft deprecated.

> **See also:** The `array` and ctypes modules,
> as well as third-party modules like numpy,
> use similar -- but slightly different -- type codes.

Notes:

(1)

The `'?'` conversion code corresponds to the `_Bool` type
defined by C standards since C99.  In standard mode, it is
represented by one byte.

(2)
When attempting to pack a non-integer using any of the integer conversion
codes, if the non-integer has a `__index__()` method then that method is
called to convert the argument to an integer before packing.

> *Changed in version 3.2.*
> Added use of the `__index__()` method for non-integers.

(3)
The `'n'` and `'N'` conversion codes are only available for the native
size (selected as the default or with the `'@'` byte order character).
For the standard size, you can use whichever of the other integer formats
fits your application.

(4)
For the `'f'`, `'d'` and `'e'` conversion codes, the packed
representation uses the IEEE 754 binary32, binary64 or binary16 format (for
`'f'`, `'d'` or `'e'` respectively), regardless of the floating-point
format used by the platform.

(5)
The `'P'` format character is only available for the native byte ordering
(selected as the default or with the `'@'` byte order character). The byte
order character `'='` chooses to use little- or big-endian ordering based
on the host system. The struct module does not interpret this as native
ordering, so the `'P'` format is not available.

(6)
The IEEE 754 binary16 "half precision" type was introduced in the 2008
revision of the IEEE 754 standard. It has a sign
bit, a 5-bit exponent and 11-bit precision (with 10 bits explicitly stored),
and can represent numbers between approximately `6.1e-05` and `6.5e+04`
at full precision. This type is not widely supported by C compilers:
it's available as `_Float16` type, if the compiler supports the Annex H
of the C23 standard.  On a
typical machine, an unsigned short can be used for storage, but not for math
operations. See the Wikipedia page on the `half-precision floating-point
format <half precision format_>`_ for more information.

(7)
When packing, `'x'` inserts one NUL byte.

(8)
The `'p'` format character encodes a "Pascal string", meaning a short
variable-length string stored in a *fixed number of bytes*, given by the count.
The first byte stored is the length of the string, or 255, whichever is
smaller.  The bytes of the string follow.  If the byte string passed in to
`pack()` is too long (longer than the count minus 1), only the leading
`count-1` bytes of the string are stored.  If the byte string is shorter than
`count-1`, it is padded with null bytes so that exactly count bytes in all
are used.  Note that for `unpack()`, the `'p'` format character consumes
`count` bytes, but that the `bytes` object returned can never contain more than 255
bytes.
When packing, arguments of types `bytes` and `bytearray`
are accepted.

(9)
For the `'s'` format character, the count is interpreted as the length of the
byte string, not a repeat count like for the other format characters; for example,
`'10s'` means a single 10-byte string mapping to or from a single
Python byte string, while `'10c'` means 10
separate one byte character elements (e.g., `cccccccccc`) mapping
to or from ten different Python byte objects. (See struct-examples
for a concrete demonstration of the difference.)
If a count is not given, it defaults to 1.  For packing, the byte string is
truncated or padded with null bytes as appropriate to make it fit. For
unpacking, the resulting `bytes` object always has exactly the specified number
of bytes.  As a special case, `'0s'` means a single, empty byte string (while
`'0c'` means 0 characters).
When packing, arguments of types `bytes` and `bytearray`
are accepted.

(10)
For the `'Zf'` and `'Zd'` type codes, the packed representation uses
the IEEE 754 binary32 and binary64 format for components of the complex
number, regardless of the floating-point format used by the platform.
Note that complex types are available unconditionally,
despite complex types being an optional feature in C.
As specified in the C11 standard, each complex type is represented by a
two-element C array containing, respectively, the real and imaginary parts.
The `'F'` and `'D'` (for `'Zf'` and `'Zd'`, respectively) format
characters are supported for compatibility.

A format character may be preceded by an integral repeat count.  For example,
the format string `'4h'` means exactly the same as `'hhhh'`.

Whitespace characters between formats are ignored; a count and its format must
not contain whitespace though.

When packing a value `x` using one of the integer formats (`'b'`,
`'B'`, `'h'`, `'H'`, `'i'`, `'I'`, `'l'`, `'L'`,
`'q'`, `'Q'`), if `x` is outside the valid range for that format
then `struct.error` is raised.

> *Changed in version 3.1.*
> Previously, some of the integer formats wrapped out-of-range values and
> raised `DeprecationWarning` instead of `struct.error`.

For the `'?'` format character, the return value is either `True` or
`False`. When packing, the truth value of the argument object is used.
Either 0 or 1 in the native or standard bool representation will be packed, and
any non-zero value will be `True` when unpacking.
