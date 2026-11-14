---
title: "io --- Core tools for working with streams (part 2 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/io.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# io --- Core tools for working with streams (part 2 of 4)

## Class hierarchy

The implementation of I/O streams is organized as a hierarchy of classes.  First
abstract base classes (ABCs), which are used to
specify the various categories of streams, then concrete classes providing the
standard stream implementations.

> **Note:** The abstract base classes also provide default implementations of some
> methods in order to help implementation of concrete stream classes.  For
> example, `BufferedIOBase` provides unoptimized implementations of
> `readinto()` and `readline()`.

At the top of the I/O hierarchy is the abstract base class `IOBase`.  It
defines the basic <example-value> to a stream.  Note, however, that there is no
separation between reading and writing to streams; implementations are allowed
to raise `UnsupportedOperation` if they do not support a given operation.

The `RawIOBase` ABC extends `IOBase`.  It deals with the reading
and writing of bytes to a stream.  `FileIO` subclasses `RawIOBase`
to provide an interface to files in the machine's file system.

The `BufferedIOBase` ABC extends `IOBase`.  It deals with
buffering on a raw binary stream (`RawIOBase`).  Its subclasses,
`BufferedWriter`, `BufferedReader`, and `BufferedRWPair`
buffer raw binary streams that are writable, readable, and both readable and writable,
respectively. `BufferedRandom` provides a buffered interface to seekable streams.
Another `BufferedIOBase` subclass, `BytesIO`, is a stream of
in-memory bytes.

The `TextIOBase` ABC extends `IOBase`.  It deals with
streams whose bytes represent text, and handles encoding and decoding to and
from strings.  `TextIOWrapper`, which extends `TextIOBase`, is a buffered text
interface to a buffered raw stream (`BufferedIOBase`).  Finally,
`StringIO` is an in-memory stream for text.

Argument names are not part of the specification, and only the arguments of
`open()` are intended to be used as keyword arguments.

The following table summarizes the ABCs provided by the `io` module:

```text
=========================  ==================  ========================  ==================================================
ABC                        Inherits            Stub Methods              Mixin Methods and Properties
=========================  ==================  ========================  ==================================================
:class:`IOBase`                                ``fileno``, ``seek``,     ``close``, ``closed``, ``__enter__``,
                                               and ``truncate``          ``__exit__``, ``flush``, ``isatty``, ``__iter__``,
                                                                         ``__next__``, ``readable``, ``readline``,
                                                                         ``readlines``, ``seekable``, ``tell``,
                                                                         ``writable``, and ``writelines``
:class:`RawIOBase`         :class:`IOBase`     ``readinto`` and          Inherited :class:`IOBase` methods, ``read``,
                                               ``write``                 and ``readall``
:class:`BufferedIOBase`    :class:`IOBase`     ``detach``, ``read``,     Inherited :class:`IOBase` methods, ``readinto``,
                                               ``read1``, and ``write``  and ``readinto1``
:class:`TextIOBase`        :class:`IOBase`     ``detach``, ``read``,     Inherited :class:`IOBase` methods, ``encoding``,
                                               ``readline``, and         ``errors``, and ``newlines``
                                               ``write``
=========================  ==================  ========================  ==================================================
```

### class `IOBase`

The abstract base class for all I/O classes.

This class provides empty abstract implementations for many methods
that derived classes can override selectively; the default
implementations represent a file that cannot be read, written or
seeked.

Even though `IOBase` does not declare `read()`
or `write()` because their signatures will vary, implementations and
clients should consider those methods part of the interface.  Also,
implementations may raise a `ValueError` (or `UnsupportedOperation`)
when operations they do not support are called.

The basic type used for binary data read from or written to a file is
`bytes`.  Other bytes-like objects are
accepted as method arguments too.  Text I/O classes work with `str` data.

Note that calling any method (even inquiries) on a closed stream is
undefined.  Implementations may raise `ValueError` in this case.

`IOBase` (and its subclasses) supports the iterator protocol, meaning
that an `IOBase` object can be iterated over yielding the lines in a
stream.  Lines are defined slightly differently depending on whether the
stream is a binary stream (yielding bytes), or a text stream (yielding
character strings).  See `readline()` below.

`IOBase` is also a context manager and therefore supports the
`with` statement.  In this example, *file* is closed after the
`with` statement's suite is finished---even if an exception occurs:

```
with open('spam.txt', 'w') as file:
    file.write('Spam and eggs!')
```

`IOBase` provides these data attributes and methods:

### `close()`

Flush and close this stream. This method has no effect if the file is
already closed. Once the file is closed, any operation on the file
(e.g. reading or writing) will raise a `ValueError`.

As a convenience, it is allowed to call this method more than once;
only the first call, however, will have an effect.

### `closed`

`True` if the stream is closed.

### `fileno()`

Return the underlying file descriptor (an integer) of the stream if it
exists.  An `OSError` is raised if the IO object does not use a file
descriptor.

### `flush()`

Flush the write buffers of the stream if applicable.  This does nothing
for read-only and non-blocking streams.

### `isatty()`

Return `True` if the stream is interactive (i.e., connected to
a terminal/tty device).

### `readable()`

Return `True` if the stream can be read from.
If `False`, `read()` will raise `OSError`.

### `readline(size=-1, /)`

Read and return one line from the stream.  If *size* is specified, at
most *size* bytes will be read.

The line terminator is always `b'\n'` for binary files; for text files,
the *newline* argument to `open()` can be used to select the line
terminator(s) recognized.

### `readlines(hint=-1, /)`

Read and return a list of lines from the stream.  *hint* can be specified
to control the number of lines read: no more lines will be read if the
total size (in bytes/characters) of all lines so far exceeds *hint*.

*hint* values of `0` or less, as well as `None`, are treated as no
hint.

Note that it's already possible to iterate on file objects using ``for
line in file: ...`` without calling `file.readlines()`.

### `seek(offset, whence=os.SEEK_SET, /)`

Change the stream position to the given byte *offset*,
interpreted relative to the position indicated by *whence*,
and return the new absolute position.
Values for *whence* are:

- `os.SEEK_SET` or `0` -- start of the stream (the default);
*offset* should be zero or positive
- `os.SEEK_CUR` or `1` -- current stream position;
*offset* may be negative
- `os.SEEK_END` or `2` -- end of the stream;
*offset* is usually negative

> *Added in version 3.1.*
> The `SEEK_*` constants.

> *Added in version 3.3.*
> Some operating systems could support additional values, like
> `os.SEEK_HOLE` or `os.SEEK_DATA`. The valid values
> for a file could depend on it being open in text or binary mode.

### `seekable()`

Return `True` if the stream supports random access.  If `False`,
`seek()`, `tell()` and `truncate()` will raise `OSError`.

### `tell()`

Return the current stream position.

### `truncate(size=None, /)`

Resize the stream to the given *size* in bytes (or the current position
if *size* is not specified).  The current stream position isn't changed.
This resizing can extend or reduce the current file size.  In case of
extension, the contents of the new file area depend on the platform
(on most systems, additional bytes are zero-filled).  The new file size
is returned.

> *Changed in version 3.5.*
> Windows will now zero-fill files when extending.

### `writable()`

Return `True` if the stream supports writing.  If `False`,
`write()` and `truncate()` will raise `OSError`.

### `writelines(lines, /)`

Write a list of lines to the stream.  Line separators are not added, so it
is usual for each of the lines provided to have a line separator at the
end.

### `__del__()`

Prepare for object destruction. `IOBase` provides a default
implementation of this method that calls the instance's
`close()` method.

### class `RawIOBase`

Base class for raw binary streams.  It inherits from `IOBase`.

Raw binary streams typically provide low-level access to an underlying OS
device or API, and do not try to encapsulate it in high-level primitives
(this functionality is done at a higher-level in buffered binary streams and text streams, described later
in this page).

`RawIOBase` provides these methods in addition to those from
`IOBase`:

### `read(size=-1, /)`

Read up to *size* bytes from the object and return them.  As a convenience,
if *size* is unspecified or -1, all bytes until EOF are returned.

Attempts to make only one system call but will retry if interrupted and
the signal handler does not raise an exception (see PEP 475 for the
rationale). This means fewer than *size* bytes may be returned if the
operating system call returns fewer than *size* bytes.

If 0 bytes are returned, and *size* was not 0, this indicates end of file.
If the object is in non-blocking mode and no bytes are available,
`None` is returned.

The default implementation defers to `readall()` and
`readinto()`.

### `readall()`

Read and return all the bytes from the stream until EOF, using multiple
calls to the stream if necessary.

If `0` bytes are returned this indicates end of file. If the object is in
non-blocking mode and the underlying `read()` returns `None`
indicating no bytes are available, `None` is returned.

### `readinto(b, /)`

Read bytes into a pre-allocated, writable
bytes-like object *b*, and return the
number of bytes read.  For example, *b* might be a `bytearray`.

If `0` is returned and `len(b)` is not `0`, this indicates end of file. If
the object is in non-blocking mode and no bytes are available, `None` is
returned.

### `write(b, /)`

Write the given bytes-like object, *b*, to the
underlying raw stream, and return the number of
bytes written.  This can be less than the length of *b* in
bytes, depending on specifics of the underlying raw
stream, and especially if it is in non-blocking mode.  `None` is
returned if the raw stream is set not to block and no single byte could
be readily written to it.  The caller may release or mutate *b* after
this method returns, so the implementation should only access *b*
during the method call.

> **Warning:** This function does not ensure all bytes are written or an exception is
> thrown. Callers may implement that behavior by checking the return
> value and, if it is less than the length of *b*, looping with additional
> write calls until all unwritten bytes are written. High-level I/O
> objects like binary-io and text-io implement retry behavior.

### class `BufferedIOBase`

Base class for binary streams that support some kind of buffering.
It inherits from `IOBase`.

The main difference with `RawIOBase` is that methods `read()`,
`readinto()` and `write()` will try (respectively) to read
as much input as requested or to emit all provided data.

In addition, if the underlying raw stream is in non-blocking mode, when the
system returns would block `write()` will raise `BlockingIOError`
with `BlockingIOError.characters_written` and `read()` will return
data read so far or `None` if no data is available.

Besides, the `read()` method does not have a default
implementation that defers to `readinto()`.

A typical `BufferedIOBase` implementation should not inherit from a
`RawIOBase` implementation, but wrap one, like
`BufferedWriter` and `BufferedReader` do.

`BufferedIOBase` provides or overrides these data attributes and
methods in addition to those from `IOBase`:

### `raw`

The underlying raw stream (a `RawIOBase` instance) that
`BufferedIOBase` deals with.  This is not part of the
`BufferedIOBase` API and may not exist on some implementations.

### `detach()`

Separate the underlying raw stream from the buffer and return it.

After the raw stream has been detached, the buffer is in an unusable
state.

Some buffers, like `BytesIO`, do not have the concept of a single
raw stream to return from this method.  They raise
`UnsupportedOperation`.

> *Added in version 3.1.*

### `read(size=-1, /)`

Read and return up to *size* bytes. If the argument is omitted, `None`,
or negative read as much as possible.

Fewer bytes may be returned than requested. An empty `bytes` object
is returned if the stream is already at EOF. More than one read may be
made and calls may be retried if specific errors are encountered, see
`os.read()` and PEP 475 for more details. Less than size bytes
being returned does not imply that EOF is imminent.

When reading as much as possible the default implementation will use
`raw.readall` if available (which should implement
`RawIOBase.readall()`), otherwise will read in a loop until read
returns `None`, an empty `bytes`, or a non-retryable error. For
most streams this is to EOF, but for non-blocking streams more data may
become available.

> **Note:** When the underlying raw stream is non-blocking, implementations may
> either raise `BlockingIOError` or return `None` if no data is
> available. `io` implementations return `None`.

### `read1(size=-1, /)`

Read and return up to *size* bytes, calling `readinto()`
which may retry if `EINTR` is encountered per
PEP 475. If *size* is `-1` or not provided, the implementation will
choose an arbitrary value for *size*.

> **Note:** When the underlying raw stream is non-blocking, implementations may
> either raise `BlockingIOError` or return `None` if no data is
> available. `io` implementations return `None`.

### `readinto(b, /)`

Read bytes into a pre-allocated, writable
bytes-like object *b* and return the number of bytes read.
For example, *b* might be a `bytearray`.

Like `read()`, multiple reads may be issued to the underlying raw
stream, unless the latter is interactive.

A `BlockingIOError` is raised if the underlying raw stream is in non
blocking-mode, and has no data available at the moment.
