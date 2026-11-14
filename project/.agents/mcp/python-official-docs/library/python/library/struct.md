---
title: "struct --- Interpret bytes as packed binary data (part 1 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/struct.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `struct` --- Interpret bytes as packed binary data

Module `struct`.

**Source code:** Lib/struct.py

This module converts between Python values and C structs represented
as Python `bytes` objects.  Compact format strings
describe the intended conversions to/from Python values.
The module's functions and objects can be used for two largely
distinct applications, data exchange with external sources (files or
network connections), or data transfer between the Python application
and the C layer.

> **Note:** When no prefix character is given, native mode is the default. It
> packs or unpacks data based on the platform and compiler on which
> the Python interpreter was built.
> The result of packing a given C struct includes pad bytes which
> maintain proper alignment for the C types involved; similarly,
> alignment is taken into account when unpacking.  In contrast, when
> communicating data between external sources, the programmer is
> responsible for defining byte ordering and padding between elements.
> See struct-alignment for details.

Several `struct` functions (and methods of `Struct`) take a *buffer*
argument.  This refers to objects that implement the bufferobjects and
provide either a readable or read-writable buffer.  The most common types used
for that purpose are `bytes` and `bytearray`, but many other types
that can be viewed as an array of bytes implement the buffer protocol, so that
they can be read/filled without additional copying from a `bytes` object.

## Functions and Exceptions

The module defines the following exception and functions:

### exception `error`

Exception raised on various occasions; argument is a string describing what
is wrong.

### `pack(format, v1, v2, ...)`

Return a bytes object containing the values *v1*, *v2*, ... packed according
to the format string *format*.  The arguments must match the values required by
the format exactly.

### `pack_into(format, buffer, offset, v1, v2, ...)`

Pack the values *v1*, *v2*, ... according to the format string *format* and
write the packed bytes into the writable buffer *buffer* starting at
position *offset*.  Note that *offset* is a required argument.
A negative *offset* counts from the end of *buffer*.

### `unpack(format, buffer)`

Unpack from the buffer *buffer* (presumably packed by `pack(format, ...)`)
according to the format string *format*.  The result is a tuple even if it
contains exactly one item.  The buffer's size in bytes must match the
size required by the format, as reflected by `calcsize()`.

### `unpack_from(format, /, buffer, offset=0)`

Unpack from *buffer* starting at position *offset*, according to the format
string *format*.  The result is a tuple even if it contains exactly one
item.  The buffer's size in bytes, starting at position *offset*, must be at
least the size required by the format, as reflected by `calcsize()`.
A negative *offset* counts from the end of *buffer*.

### `iter_unpack(format, buffer)`

Iteratively unpack from the buffer *buffer* according to the format
string *format*.  This function returns an iterator which will read
equally sized chunks from the buffer until all its contents have been
consumed.  The buffer's size in bytes must be a multiple of the size
required by the format, as reflected by `calcsize()`.

Each iteration yields a tuple as specified by the format string.

> *Added in version 3.4.*

### `calcsize(format)`

Return the size of the struct (and hence of the bytes object produced by
`pack(format, ...)`) corresponding to the format string *format*.
