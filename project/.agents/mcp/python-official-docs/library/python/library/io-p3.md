---
title: "io --- Core tools for working with streams (part 3 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/io.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# io --- Core tools for working with streams (part 3 of 4)

### `readinto1(b, /)`

Read bytes into a pre-allocated, writable
bytes-like object *b*, using at most one call to
the underlying raw stream's `read()` (or
`readinto()`) method. Return the number of bytes read.

A `BlockingIOError` is raised if the underlying raw stream is in non
blocking-mode, and has no data available at the moment.

> *Added in version 3.5.*

### `write(b, /)`

Write the given bytes-like object, *b*, and return the number
of bytes written (always equal to the length of *b* in bytes, since if
the write fails an `OSError` will be raised).  Depending on the
actual implementation, these bytes may be readily written to the
underlying stream, or held in a buffer for performance and latency
reasons.

When in non-blocking mode, a `BlockingIOError` is raised if the
data needed to be written to the raw stream but it couldn't accept
all the data without blocking.

The caller may release or mutate *b* after this method returns,
so the implementation should only access *b* during the method call.

### class `FileIO(name, mode='r', closefd=True, opener=None)`

A raw binary stream representing an OS-level file containing bytes data.  It
inherits from `RawIOBase` and implements its low-level access design.
This means `write()` does not guarantee all bytes are written
and `read()` may read less bytes than requested even when more
bytes may be present in the underlying file. To get "write all" and
"read at least" behavior, use binary-io.

The *name* can be one of two things:

- a character string or `bytes` object representing the path to the
file which will be opened. In this case closefd must be `True` (the default)
otherwise an error will be raised.
- an integer representing the number of an existing OS-level file descriptor
to which the resulting `FileIO` object will give access. When the
FileIO object is closed this fd will be closed as well, unless *closefd*
is set to `False`.

The *mode* can be `'r'`, `'w'`, `'x'` or `'a'` for reading
(default), writing, exclusive creation or appending. The file will be
created if it doesn't exist when opened for writing or appending; it will be
truncated when opened for writing. `FileExistsError` will be raised if
it already exists when opened for creating. Opening a file for creating
implies writing, so this mode behaves in a similar way to `'w'`. Add a
`'+'` to the mode to allow simultaneous reading and writing.

A custom opener can be used by passing a callable as *opener*. The underlying
file descriptor for the file object is then obtained by calling *opener* with
(*name*, *flags*). *opener* must return an open file descriptor (passing
`os.open` as *opener* results in functionality similar to passing
`None`).

The newly created file is non-inheritable.

See the `open()` built-in function for examples on using the *opener*
parameter.

> **Warning:** `FileIO` is a low-level I/O object and members, such as
> `read()` and `write()`, need to have their
> return values checked explicitly in a retry loop to implement "write all"
> and "read at least" behavior. High-level I/O objects binary-io and
> text-io implement retry behavior.

> *Changed in version 3.3.*
> The *opener* parameter was added.
> The `'x'` mode was added.

> *Changed in version 3.4.*
> The file is now non-inheritable.

`FileIO` provides these data attributes in addition to those from
`RawIOBase` and `IOBase`:

### `mode`

The mode as given in the constructor.

### `name`

The file name.  This is the file descriptor of the file when no name is
given in the constructor.

### Buffered streams

Buffered I/O streams provide a higher-level interface to an I/O device
than raw I/O does.

### class `BytesIO(initial_bytes=b'')`

A binary stream using an in-memory bytes buffer.  It inherits from
`BufferedIOBase`.  The buffer is discarded when the
`close()` method is called.

The optional argument *initial_bytes* is a bytes-like object that
contains initial data.

Methods may be used from multiple threads without external locking in
free-threaded builds.

`BytesIO` provides or overrides these methods in addition to those
from `BufferedIOBase` and `IOBase`:

### `getbuffer()`

Return a readable and writable view over the contents of the buffer
without copying them.  Also, mutating the view will transparently
update the contents of the buffer:

```
>>> b = io.BytesIO(b"abcdef")
>>> view = b.getbuffer()
>>> view[2:4] = b"56"
>>> b.getvalue()
b'ab56ef'
```

> **Note:** As long as the view exists, the `BytesIO` object cannot be
> resized or closed.

> *Added in version 3.2.*

### `getvalue()`

Return `bytes` containing the entire contents of the buffer.

### `read1(size=-1, /)`

In `BytesIO`, this is the same as `read()`.

> *Changed in version 3.7.*
> The *size* argument is now optional.

### `readinto1(b, /)`

In `BytesIO`, this is the same as `readinto()`.

> *Added in version 3.5.*

### class `BufferedReader(raw, buffer_size=DEFAULT_BUFFER_SIZE)`

A buffered binary stream providing higher-level access to a readable, non
seekable `RawIOBase` raw binary stream.  It inherits from
`BufferedIOBase`.

When reading data from this object, a larger amount of data may be
requested from the underlying raw stream, and kept in an internal buffer.
The buffered data can then be returned directly on subsequent reads.

The constructor creates a `BufferedReader` for the given readable
*raw* stream and *buffer_size*.  If *buffer_size* is omitted,
`DEFAULT_BUFFER_SIZE` is used.

`BufferedReader` provides or overrides these methods in addition to
those from `BufferedIOBase` and `IOBase`:

### `peek(size=0, /)`

Return bytes from the stream without advancing the position. The number of
bytes returned may be less or more than requested. If the underlying raw
stream is non-blocking and the operation would block, returns empty bytes.

### `read(size=-1, /)`

In `BufferedReader` this is the same as `io.BufferedIOBase.read()`

### `read1(size=-1, /)`

In `BufferedReader` this is the same as `io.BufferedIOBase.read1()`

> *Changed in version 3.7.*
> The *size* argument is now optional.

### class `BufferedWriter(raw, buffer_size=DEFAULT_BUFFER_SIZE)`

A buffered binary stream providing higher-level access to a writeable, non
seekable `RawIOBase` raw binary stream.  It inherits from
`BufferedIOBase`.

When writing to this object, data is normally placed into an internal
buffer.  The buffer will be written out to the underlying `RawIOBase`
object under various conditions, including:

- when the buffer gets too small for all pending data;
- when `flush()` is called;
- when a `seek()` is requested (for `BufferedRandom` objects);
- when the `BufferedWriter` object is closed or destroyed.

The constructor creates a `BufferedWriter` for the given writeable
*raw* stream.  If the *buffer_size* is not given, it defaults to
`DEFAULT_BUFFER_SIZE`.

`BufferedWriter` provides or overrides these methods in addition to
those from `BufferedIOBase` and `IOBase`:

### `flush()`

Force bytes held in the buffer into the raw stream.  A
`BlockingIOError` should be raised if the raw stream blocks.

### `write(b, /)`

Write the bytes-like object, *b*, and return the
number of bytes written.  When in non-blocking mode, a
`BlockingIOError` with `BlockingIOError.characters_written` set
is raised if the buffer needs to be written out but the raw stream blocks.

### class `BufferedRandom(raw, buffer_size=DEFAULT_BUFFER_SIZE)`

A buffered binary stream implementing `BufferedIOBase` interfaces
providing higher-level access to a seekable `RawIOBase` raw binary
stream.

The constructor creates a reader and writer for a seekable raw stream, given
in the first argument.  If the *buffer_size* is omitted it defaults to
`DEFAULT_BUFFER_SIZE`.

`BufferedRandom` is capable of anything `BufferedReader` or
`BufferedWriter` can do.  In addition, `seek()` and
`tell()` are guaranteed to be implemented.

### class `BufferedRWPair(reader, writer, buffer_size=DEFAULT_BUFFER_SIZE, /)`

A buffered binary stream providing higher-level access to two non seekable
`RawIOBase` raw binary streams---one readable, the other writeable.
It inherits from `BufferedIOBase`.

*reader* and *writer* are `RawIOBase` objects that are readable and
writeable respectively.  If the *buffer_size* is omitted it defaults to
`DEFAULT_BUFFER_SIZE`.

`BufferedRWPair` implements all of `BufferedIOBase`\'s methods
except for `detach()`, which raises
`UnsupportedOperation`.

> **Warning:** `BufferedRWPair` does not attempt to synchronize accesses to
> its underlying raw streams.  You should not pass it the same object
> as reader and writer; use `BufferedRandom` instead.

### class `TextIOBase`

Base class for text streams.  This class provides a character and line based
interface to stream I/O.  It inherits from `IOBase`.

`TextIOBase` provides or overrides these data attributes and
methods in addition to those from `IOBase`:

### `encoding`

The name of the encoding used to decode the stream's bytes into
strings, and to encode strings into bytes.

### `errors`

The error setting of the decoder or encoder.

### `newlines`

A string, a tuple of strings, or `None`, indicating the newlines
translated so far.  Depending on the implementation and the initial
constructor flags, this may not be available.

### `buffer`

The underlying binary buffer (a `BufferedIOBase`
or `RawIOBase` instance) that `TextIOBase` deals with.
This is not part of the `TextIOBase` API and may not exist
in some implementations.

### `detach()`

Separate the underlying binary buffer from the `TextIOBase` and
return it.

After the underlying buffer has been detached, the `TextIOBase` is
in an unusable state.

Some `TextIOBase` implementations, like `StringIO`, may not
have the concept of an underlying buffer and calling this method will
raise `UnsupportedOperation`.

> *Added in version 3.1.*

### `read(size=-1, /)`

Read and return at most *size* characters from the stream as a single
`str`.  If *size* is negative or `None`, reads until EOF.

### `readline(size=-1, /)`

Read until newline or EOF and return a single `str`.  If the stream is
already at EOF, an empty string is returned.

If *size* is specified, at most *size* characters will be read.

### `seek(offset, whence=SEEK_SET, /)`

Change the stream position to the given *offset*.  Behaviour depends on
the *whence* parameter.  The default value for *whence* is
`SEEK_SET`.

- `SEEK_SET` or `0`: seek from the start of the stream
(the default); *offset* must either be a number returned by
`TextIOBase.tell()`, or zero.  Any other *offset* value
produces undefined behaviour.
- `SEEK_CUR` or `1`: "seek" to the current position;
*offset* must be zero, which is a no-operation (all other values
are unsupported).
- `SEEK_END` or `2`: seek to the end of the stream;
*offset* must be zero (all other values are unsupported).

Return the new absolute position as an opaque number.

> *Added in version 3.1.*
> The `SEEK_*` constants.

### `tell()`

Return the current stream position as an opaque number.  The number
does not usually represent a number of bytes in the underlying
binary storage.

### `write(s, /)`

Write the string *s* to the stream and return the number of characters
written.

### class `TextIOWrapper(buffer, encoding=None, errors=None, newline=None, \`

```python
line_buffering=False, write_through=False)
```

A buffered text stream providing higher-level access to a
`BufferedIOBase` buffered binary stream.  It inherits from
`TextIOBase`.

*encoding* gives the name of the encoding that the stream will be decoded or
encoded with.  This defaults to UTF-8; if UTF-8 Mode is
disabled, it defaults to `locale.getencoding()`.
`encoding="locale"` can be used to specify the current locale's encoding
explicitly. See io-text-encoding for more information.

*errors* is an optional string that specifies how encoding and decoding
errors are to be handled.  Pass `'strict'` to raise a `ValueError`
exception if there is an encoding error (the default of `None` has the same
effect), or pass `'ignore'` to ignore errors.  (Note that ignoring encoding
errors can lead to data loss.)  `'replace'` causes a replacement marker
(such as `'?'`) to be inserted where there is malformed data.
`'backslashreplace'` causes malformed data to be replaced by a
backslashed escape sequence.  When writing, `'xmlcharrefreplace'`
(replace with the appropriate XML character reference)  or `'namereplace'`
(replace with `\N{...}` escape sequences) can be used.  Any other error
handling name that has been registered with
`codecs.register_error()` is also valid.

*newline* controls how line endings are handled.  It can be `None`,
`''`, `'\n'`, `'\r'`, and `'\r\n'`.  It works as follows:

- When reading input from the stream, if *newline* is `None`,
universal newlines mode is enabled.  Lines in the input can end in
`'\n'`, `'\r'`, or `'\r\n'`, and these are translated into `'\n'`
before being returned to the caller.  If *newline* is `''`, universal
newlines mode is enabled, but line endings are returned to the caller
untranslated.  If *newline* has any of the other legal values, input lines
are only terminated by the given string, and the line ending is returned to
the caller untranslated.

- When writing output to the stream, if *newline* is `None`, any `'\n'`
characters written are translated to the system default line separator,
`os.linesep`.  If *newline* is `''` or `'\n'`, no translation
takes place.  If *newline* is any of the other legal values, any `'\n'`
characters written are translated to the given string.

If *line_buffering* is `True`, `flush()` is implied when a call to
write contains a newline character or a carriage return.

If *write_through* is `True`, calls to `write()` are guaranteed
not to be buffered: any data written on the `TextIOWrapper`
object is immediately handled to its underlying binary *buffer*.

> *Changed in version 3.3.*
> The *write_through* argument has been added.

> *Changed in version 3.3.*
> The default *encoding* is now `locale.getpreferredencoding(False)`
> instead of `locale.getpreferredencoding()`. Don't change temporary the
> locale encoding using `locale.setlocale()`, use the current locale
> encoding instead of the user preferred encoding.

> *Changed in version 3.10.*
> The *encoding* argument now supports the `"locale"` dummy encoding name.

> **Note:** When the underlying raw stream is non-blocking, a `BlockingIOError`
> may be raised if a read operation cannot be completed immediately.

`TextIOWrapper` provides these data attributes and methods in
addition to those from `TextIOBase` and `IOBase`:

### `line_buffering`

Whether line buffering is enabled.

### `write_through`

Whether writes are passed immediately to the underlying binary
buffer.

> *Added in version 3.7.*
