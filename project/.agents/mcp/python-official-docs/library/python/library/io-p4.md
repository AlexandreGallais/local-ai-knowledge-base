---
title: "io --- Core tools for working with streams (part 4 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/io.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# io --- Core tools for working with streams (part 4 of 4)

### `reconfigure(*, encoding=None, errors=None, newline=None, \`

```python
line_buffering=None, write_through=None)
```

Reconfigure this text stream using new settings for *encoding*,
*errors*, *newline*, *line_buffering* and *write_through*.

Parameters not specified keep current settings, except
`errors='strict'` is used when *encoding* is specified but
*errors* is not specified.

It is not possible to change the encoding or newline if some data
has already been read from the stream. On the other hand, changing
encoding after write is possible.

This method does an implicit stream flush before setting the
new parameters.

> *Added in version 3.7.*

> *Changed in version 3.11.*
> The method supports `encoding="locale"` option.

### `seek(cookie, whence=os.SEEK_SET, /)`

Set the stream position.
Return the new stream position as an `int`.

Four operations are supported,
given by the following argument combinations:

- `seek(0, SEEK_SET)`: Rewind to the start of the stream.
- `seek(cookie, SEEK_SET)`: Restore a previous position;
*cookie* **must be** a number returned by `tell()`.
- `seek(0, SEEK_END)`: Fast-forward to the end of the stream.
- `seek(0, SEEK_CUR)`: Leave the current stream position unchanged.

Any other argument combinations are invalid,
and may raise exceptions.

> **See also:** `os.SEEK_SET`, `os.SEEK_CUR`, and `os.SEEK_END`.

### `tell()`

Return the stream position as an opaque number.
The return value of `tell()` can be given as input to `seek()`,
to restore a previous stream position.

### class `StringIO(initial_value='', newline='\n')`

A text stream using an in-memory text buffer.  It inherits from
`TextIOBase`.

The text buffer is discarded when the `close()` method is
called.

The initial value of the buffer can be set by providing *initial_value*.
If newline translation is enabled, newlines will be encoded as if by
`write()`.  The stream is positioned at the start of the
buffer which emulates opening an existing file in a `w+` mode, making it
ready for an immediate write from the beginning or for a write that
would overwrite the initial value.  To emulate opening a file in an `a+`
mode ready for appending, use `f.seek(0, io.SEEK_END)` to reposition the
stream at the end of the buffer.

The *newline* argument works like that of `TextIOWrapper`,
except that when writing output to the stream, if *newline* is `None`,
newlines are written as `\n` on all platforms.

`StringIO` provides this method in addition to those from
`TextIOBase` and `IOBase`:

### `getvalue()`

Return a `str` containing the entire contents of the buffer.
Newlines are decoded as if by `read()`, although
the stream position is not changed.

Example usage:

```
import io

output = io.StringIO()
output.write('First line.\n')
print('Second line.', file=output)

# Retrieve file contents -- this will be
# 'First line.\nSecond line.\n'
contents = output.getvalue()

# Close object and discard memory buffer --
# .getvalue() will now raise an exception.
output.close()
```

### class `IncrementalNewlineDecoder`

A helper codec that decodes newlines for universal newlines mode.
It inherits from `codecs.IncrementalDecoder`.

## Static typing

The following protocols can be used for annotating function and method
arguments for simple stream reading or writing operations. They are decorated
with typing.runtime_checkable.

### class `Reader[T]`

Generic protocol for reading from a file or other input stream. `T` will
usually be `str` or `bytes`, but can be any type that is
read from the stream.

> *Added in version 3.14.*

### `read()`

```python
read(size, /)
```

Read data from the input stream and return it. If *size* is
specified, it should be an integer, and at most *size* items
(bytes/characters) will be read.

For example:

```
def read_it(reader: Reader[str]):
    data = reader.read(11)
    assert isinstance(data, str)
```

### class `Writer[T]`

Generic protocol for writing to a file or other output stream. `T` will
usually be `str` or `bytes`, but can be any type that can be
written to the stream.

> *Added in version 3.14.*

### `write(data, /)`

Write *data* to the output stream and return the number of items
(bytes/characters) written.

For example:

```
def write_binary(writer: Writer[bytes]):
    writer.write(b"Hello world!\n")
```

See typing-io for other I/O related protocols and classes that can be
used for static type checking.

## Performance

This section discusses the performance of the provided concrete I/O
implementations.

### Binary I/O

By reading and writing only large chunks of data even when the user asks for a
single byte, buffered I/O hides any inefficiency in calling and executing the
operating system's unbuffered I/O routines.  The gain depends on the OS and the
kind of I/O which is performed.  For example, on some modern OSes such as Linux,
unbuffered disk I/O can be as fast as buffered I/O.  The bottom line, however,
is that buffered I/O offers predictable performance regardless of the platform
and the backing device.  Therefore, it is almost always preferable to use
buffered I/O rather than unbuffered I/O for binary data.

### Text I/O

Text I/O over a binary storage (such as a file) is significantly slower than
binary I/O over the same storage, because it requires conversions between
unicode and binary data using a character codec.  This can become noticeable
handling huge amounts of text data like large log files.  Also,
`tell()` and `seek()` are both quite slow
due to the reconstruction algorithm used.

`StringIO`, however, is a native in-memory unicode container and will
exhibit similar speed to `BytesIO`.

### Multi-threading

`FileIO` objects are thread-safe to the extent that the operating system
calls (such as read(2) under Unix) they wrap are thread-safe too.

Binary buffered objects (instances of `BufferedReader`,
`BufferedWriter`, `BufferedRandom` and `BufferedRWPair`)
protect their internal structures using a lock; it is therefore safe to call
them from multiple threads at once.

`TextIOWrapper` objects are not thread-safe.

### Reentrancy

Binary buffered objects (instances of `BufferedReader`,
`BufferedWriter`, `BufferedRandom` and `BufferedRWPair`)
are not reentrant.  While reentrant calls will not happen in normal situations,
they can arise from doing I/O in a `signal` handler.  If a thread tries to
re-enter a buffered object which it is already accessing, a `RuntimeError`
is raised.  Note this doesn't prohibit a different thread from entering the
buffered object.

The above implicitly extends to text files, since the `open()` function
will wrap a buffered object inside a `TextIOWrapper`.  This includes
standard streams and therefore affects the built-in `print()` function as
well.
