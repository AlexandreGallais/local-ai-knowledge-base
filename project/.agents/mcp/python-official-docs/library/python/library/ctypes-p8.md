---
title: "ctypes --- A foreign function library for Python (part 8 of 9)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ctypes.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ctypes --- A foreign function library for Python (part 8 of 9)

### Windows data types

Module `ctypes.wintypes`.

**Source code:** Lib/ctypes/wintypes.py

The `ctypes.wintypes` module provides types for use with Windows APIs.
Most are aliases for types defined in `ctypes`.
See Microsoft's `Windows data types
<https://learn.microsoft.com/en-us/windows/win32/winprog/windows-data-types>`_
documentation for the corresponding C definitions.
On non-Windows platforms, the sizes and layouts of these types may differ
from their Windows counterparts.

> *Changed in version 3.14.*
> Added `HCONV`, `HCONVLIST`, `HCURSOR`,
> `HDDEDATA`, `HDROP`, `HFILE`, `HRESULT`,
> and `HSZ`.

For example:

```
>>> from ctypes import POINTER
>>> from ctypes.wintypes import LPRECT, RECT, SHORT
>>> SHORT(-1).value
-1
>>> rect = RECT(0, 0, 100, 50)
>>> rect.right, rect.bottom
(100, 50)
>>> LPRECT is POINTER(RECT)
True
```

#### Simple types

The following names are aliases for fundamental `ctypes` types:

- - Windows types
- `ctypes` type

- - .. class:: BYTE
BOOLEAN
- `c_ubyte`

- - .. class:: CHAR
- `c_char`

- - .. class:: WCHAR
- `c_wchar`

- - .. class:: WORD
USHORT
ATOM
LANGID
- `c_ushort`

- - .. class:: DWORD
ULONG
COLORREF
LCID
LCTYPE
LGRPID
- `c_ulong`

- - .. class:: BOOL
LONG
HRESULT
- `c_long`

- - .. class:: INT
HFILE
- `c_int`

- - .. class:: UINT
- `c_uint`

- - .. class:: SHORT
- `c_short`

- - .. class:: DOUBLE
- `c_double`

- - .. class:: FLOAT
- `c_float`

- - .. class:: LARGE_INTEGER
- `c_longlong`

- - .. class:: ULARGE_INTEGER
- `c_ulonglong`

- - .. class:: LPCSTR
LPSTR
- `c_char_p`

- - .. class:: LPCOLESTR
LPOLESTR
OLESTR
LPCWSTR
LPWSTR
- `c_wchar_p`

- - .. class:: LPCVOID
LPVOID
- `c_void_p`

`LARGE_INTEGER` and `ULARGE_INTEGER` expose an integer
`value` attribute, with no `LowPart`, `HighPart`, or `QuadPart`
fields.

### class `WPARAM`

An unsigned integer type with the same size as `c_void_p`.

### class `LPARAM`

A signed integer type with the same size as `c_void_p`.

### class `VARIANT_BOOL`

A 16-bit Boolean type whose `value` attribute is a Python
`bool`.  Assigning to `value` stores `-1` for a true value
and `0` for a false value.

#### Handle types

### class `HANDLE`

An alias for `c_void_p`, used to represent Windows handles.

### class `HACCEL`

```python
HBITMAP
HBRUSH
HCOLORSPACE
HCONV
HCONVLIST
HCURSOR
HDC
HDDEDATA
HDESK
HDROP
HDWP
HENHMETAFILE
HFONT
HGDIOBJ
HGLOBAL
HHOOK
HICON
HINSTANCE
HKEY
HKL
HLOCAL
HMENU
HMETAFILE
HMODULE
HMONITOR
HPALETTE
HPEN
HRGN
HRSRC
HSTR
HSZ
HTASK
HWINSTA
HWND
SC_HANDLE
SERVICE_STATUS_HANDLE
```

Aliases for `HANDLE` for use with specific Windows APIs.
`HFILE` is an alias for `INT` and is listed among the
simple types above.

#### Structures

The following types are subclasses of `ctypes.Structure`.

### class `RECT`

```python
RECTL
tagRECT
```

A rectangle with `left`, `top`, `right`, and `bottom` fields,
all of type `LONG`.

### class `SMALL_RECT`

A rectangle with `Left`, `Top`, `Right`, and `Bottom` fields,
all of type `SHORT`.

### class `POINT`

```python
POINTL
tagPOINT
```

A point with `x` and `y` fields, both of type `LONG`.

### class `SIZE`

```python
SIZEL
tagSIZE
```

Dimensions with `cx` and `cy` fields, both of type `LONG`.

### class `FILETIME`

A file time with `dwLowDateTime` and `dwHighDateTime` fields,
both of type `DWORD`.

### class `MSG`

```python
tagMSG
```

A Windows message with the following fields:

- - Field
- Type
- - `hWnd`
- `HWND`
- - `message`
- `UINT`
- - `wParam`
- `WPARAM`
- - `lParam`
- `LPARAM`
- - `time`
- `DWORD`
- - `pt`
- `POINT`

### class `WIN32_FIND_DATAA`

```python
WIN32_FIND_DATAW
```

Structures used by Windows file-search functions, with the following
fields.  `WIN32_FIND_DATAA` uses `CHAR` for its file names,
and `WIN32_FIND_DATAW` uses `WCHAR`.

- - Fields
- Type
- - `dwFileAttributes`
- `DWORD`
- - `ftCreationTime`, `ftLastAccessTime`, `ftLastWriteTime`
- `FILETIME`
- - `nFileSizeHigh`, `nFileSizeLow`
- `DWORD`
- - `dwReserved0`, `dwReserved1`
- `DWORD`
- - `cFileName`
- An array of `MAX_PATH` characters
- - `cAlternateFileName`
- An array of 14 characters

#### Pointer types

The following names are aliases for `ctypes.POINTER(T)`, where *T* is the
type in the second column:

- - Pointer types
- Referenced type

- - .. class:: LPBOOL
PBOOL
- `BOOL`

- - .. class:: PBOOLEAN
- `BOOLEAN`

- - .. class:: LPBYTE
PBYTE
- `BYTE`

- - .. class:: PCHAR
- `CHAR`

- - .. class:: LPCOLORREF
- `COLORREF`

- - .. class:: LPDWORD
PDWORD
- `DWORD`

- - .. class:: LPFILETIME
PFILETIME
- `FILETIME`

- - .. class:: PFLOAT
- `FLOAT`

- - .. class:: LPHANDLE
PHANDLE
- `HANDLE`

- - .. class:: PHKEY
- `HKEY`

- - .. class:: LPHKL
- `HKL`

- - .. class:: LPINT
PINT
- `INT`

- - .. class:: PLARGE_INTEGER
- `LARGE_INTEGER`

- - .. class:: PLCID
- `LCID`

- - .. class:: LPLONG
PLONG
- `LONG`

- - .. class:: LPMSG
PMSG
- `MSG`

- - .. class:: LPPOINT
PPOINT
- `POINT`

- - .. class:: PPOINTL
- `POINTL`

- - .. class:: LPRECT
PRECT
- `RECT`

- - .. class:: LPRECTL
PRECTL
- `RECTL`

- - .. class:: LPSC_HANDLE
- `SC_HANDLE`

- - .. class:: PSHORT
- `SHORT`

- - .. class:: LPSIZE
PSIZE
- `SIZE`

- - .. class:: LPSIZEL
PSIZEL
- `SIZEL`

- - .. class:: PSMALL_RECT
- `SMALL_RECT`

- - .. class:: LPUINT
PUINT
- `UINT`

- - .. class:: PULARGE_INTEGER
- `ULARGE_INTEGER`

- - .. class:: PULONG
- `ULONG`

- - .. class:: PUSHORT
- `USHORT`

- - .. class:: PWCHAR
- `WCHAR`

- - .. class:: LPWIN32_FIND_DATAA
PWIN32_FIND_DATAA
- `WIN32_FIND_DATAA`

- - .. class:: LPWIN32_FIND_DATAW
PWIN32_FIND_DATAW
- `WIN32_FIND_DATAW`

- - .. class:: LPWORD
PWORD
- `WORD`

#### Constants and functions

### `MAX_PATH`

The value `260`, used as the size of the file-name arrays in
`WIN32_FIND_DATAA` and `WIN32_FIND_DATAW`.

### `RGB(red, green, blue)`

Return a `COLORREF` value as a Python integer.  The *red*, *green*,
and *blue* arguments are integers from `0` to `255`, specifying the
intensity of each color component:

```
>>> from ctypes.wintypes import RGB
>>> hex(RGB(255, 128, 0))
'0x80ff'
```

### class `Union(*args, **kw)`

Abstract base class for unions in native byte order.

Unions share common attributes and behavior with structures;
see `Structure` documentation for details.

### class `BigEndianUnion(*args, **kw)`

Abstract base class for unions in *big endian* byte order.

> *Added in version 3.11.*

### class `LittleEndianUnion(*args, **kw)`

Abstract base class for unions in *little endian* byte order.

> *Added in version 3.11.*

### class `BigEndianStructure(*args, **kw)`

Abstract base class for structures in *big endian* byte order.

### class `LittleEndianStructure(*args, **kw)`

Abstract base class for structures in *little endian* byte order.

Structures and unions with non-native byte order cannot contain pointer type
fields, or any other data types containing pointer type fields.

### class `Structure(*args, **kw)`

Abstract base class for structures in *native* byte order.

Concrete structure and union types must be created by subclassing one of these
types, and at least define a `_fields_` class variable. `ctypes` will
create descriptor\s which allow reading and writing the fields by direct
attribute accesses.  These are the

### `_fields_`

A sequence defining the structure fields.  The items must be 2-tuples or
3-tuples.  The first item is the name of the field, the second item
specifies the type of the field; it can be any ctypes data type.

For integer type fields like `c_int`, a third optional item can be
given.  It must be a small positive integer defining the bit width of the
field.

Field names must be unique within one structure or union.  This is not
checked, only one field can be accessed when names are repeated.

It is possible to define the `_fields_` class variable *after* the
class statement that defines the Structure subclass, this allows creating
data types that directly or indirectly reference themselves:

```
class List(Structure):
    pass
List._fields_ = [("pnext", POINTER(List)),
                 ...
                ]
```

The `_fields_` class variable can only be set once.
Later assignments will raise an `AttributeError`.

Additionally, the `_fields_` class variable must be defined before
the structure or union type is first used: an instance or subclass is
created, `sizeof()` is called on it, and so on.
Later assignments to `_fields_` will raise an `AttributeError`.
If `_fields_` has not been set before such use,
the structure or union will have no own fields, as if `_fields_`
was empty.

Sub-subclasses of structure types inherit the fields of the base class
plus the `_fields_` defined in the sub-subclass, if any.

### `_pack_`

An optional small integer that allows overriding the alignment of
structure fields in the instance.

This is only implemented for the MSVC-compatible memory layout
(see `_layout_`).

Setting `_pack_` to 0 is the same as not setting it at all.
Otherwise, the value must be a positive power of two.
The effect is equivalent to `#pragma pack(N)` in C, except
`ctypes` may allow larger *n* than what the compiler accepts.

`_pack_` must already be defined
when `_fields_` is assigned, otherwise it will have no effect.

> *Deprecated since version 3.14, removed in version 3.19.*
> For historical reasons, if `_pack_` is non-zero,
> the MSVC-compatible layout will be used by default.
> On non-Windows platforms, this default is deprecated and is slated to
> become an error in Python 3.19.
> If it is intended, set `_layout_` to `'ms'`
> explicitly.

### `_align_`

An optional small integer that allows increasing the alignment of
the structure when being packed or unpacked to/from memory.

The value must not be negative.
The effect is equivalent to `__attribute__((aligned(N)))` on GCC
or `#pragma align(N)` on MSVC, except `ctypes` may allow
values that the compiler would reject.

`_align_` can only *increase* a structure's alignment
requirements. Setting it to 0 or 1 has no effect.

Using values that are not powers of two is discouraged and may lead to
surprising behavior.

`_align_` must already be defined
when `_fields_` is assigned, otherwise it will have no effect.

> *Added in version 3.13.*

### `_layout_`

An optional string naming the struct/union layout. It can currently
be set to:

- `"ms"`: the layout used by the Microsoft compiler (MSVC).
On GCC and Clang, this layout can be selected with
`__attribute__((ms_struct))`.
- `"gcc-sysv"`: the layout used by GCC with the System V or “SysV-like”
data model, as used on Linux and macOS.
With this layout, `_pack_` must be unset or zero.

If not set explicitly, `ctypes` will use a default that
matches the platform conventions. This default may change in future
Python releases (for example, when a new platform gains official support,
or when a difference between similar platforms is found).
Currently the default will be:

- On Windows: `"ms"`
- When `_pack_` is specified: `"ms"`.
(This is deprecated; see `_pack_` documentation.)
- Otherwise: `"gcc-sysv"`

`_layout_` must already be defined when
`_fields_` is assigned, otherwise it will have no effect.

> *Added in version 3.14.*

### `_anonymous_`

An optional sequence that lists the names of unnamed (anonymous) fields.
`_anonymous_ must be already defined when fields_` is
assigned, otherwise it will have no effect.

The fields listed in this variable must be structure or union type fields.
`ctypes` will create descriptors in the structure type that allows
accessing the nested fields directly, without the need to create the
structure or union field.

Here is an example type (Windows):

```
class _U(Union):
    _fields_ = [("lptdesc", POINTER(TYPEDESC)),
                ("lpadesc", POINTER(ARRAYDESC)),
                ("hreftype", HREFTYPE)]

class TYPEDESC(Structure):
    _anonymous_ = ("u",)
    _fields_ = [("u", _U),
                ("vt", VARTYPE)]
```

The `TYPEDESC` structure describes a COM data type, the `vt` field
specifies which one of the union fields is valid.  Since the `u` field
is defined as anonymous field, it is now possible to access the members
directly off the TYPEDESC instance. `td.lptdesc` and `td.u.lptdesc`
are equivalent, but the former is faster since it does not need to create
a temporary union instance:

```
td = TYPEDESC()
td.vt = VT_PTR
td.lptdesc = POINTER(some_type)
td.u.lptdesc = POINTER(some_type)
```

It is possible to define sub-subclasses of structures, they inherit the
fields of the base class.  If the subclass definition has a separate
`_fields_` variable, the fields specified in this are appended to the
fields of the base class.

Structure and union constructors accept both positional and keyword
arguments.  Positional arguments are used to initialize member fields in the
same order as they are appear in `_fields_`.  Keyword arguments in the
constructor are interpreted as attribute assignments, so they will initialize
`_fields_` with the same name, or create new attributes for names not
present in `_fields_`.

### class `CField(*args, **kw)`

Descriptor for fields of a `Structure` and `Union`.
For example:

```
>>> class Color(Structure):
...     _fields_ = (
...         ('red', c_uint8),
...         ('green', c_uint8),
...         ('blue', c_uint8),
...         ('intense', c_bool, 1),
...         ('blinking', c_bool, 1),
...    )
...
>>> Color.red
<ctypes.CField 'red' type=c_ubyte, ofs=0, size=1>
>>> Color.green.type
<class 'ctypes.c_ubyte'>
>>> Color.blue.byte_offset
2
>>> Color.intense
<ctypes.CField 'intense' type=c_bool, ofs=3, bit_size=1, bit_offset=0>
>>> Color.blinking.bit_offset
1
```

All attributes are read-only.

`CField objects are created via fields_`;
do not instantiate the class directly.

> *Added in version 3.14.*
> Previously, descriptors only had `offset` and `size` attributes
> and a readable string representation; the `CField` class was not
> available directly.

### `name`

Name of the field, as a string.

### `type`

Type of the field, as a ctypes class.

### `offset`

```python
byte_offset
```

Offset of the field, in bytes.

For bitfields, this is the offset of the underlying byte-aligned
*storage unit*; see `bit_offset`.

### `byte_size`

Size of the field, in bytes.

For bitfields, this is the size of the underlying *storage unit*.
Typically, it has the same size as the bitfield's type.

### `size`

For non-bitfields, equivalent to `byte_size`.

For bitfields, this contains a backwards-compatible bit-packed
value that combines `bit_size` and
`bit_offset`.
Prefer using the explicit attributes instead.

### `is_bitfield`

True if this is a bitfield.

### `bit_offset`

```python
bit_size
```

The location of a bitfield within its *storage unit*, that is, within
`byte_size` bytes of memory starting at
`byte_offset`.

To get the field's value, read the storage unit as an integer,
shift left by `bit_offset` and
take the `bit_size` least significant bits.

For non-bitfields, `bit_offset` is zero
and `bit_size` is equal to `byte_size * 8`.
