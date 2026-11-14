---
title: "io --- Core tools for working with streams (part 1 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/io.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `io` --- Core tools for working with streams

Module `io`.

**Source code:** Lib/io.py

## Overview

The `io` module provides Python's main facilities for dealing with various
types of I/O.  There are three main types of I/O: *text I/O*, *binary I/O*
and *raw I/O*.  These are generic categories, and various backing stores can
be used for each of them.  A concrete object belonging to any of these
categories is called a file object.  Other common terms are *stream*
and *file-like object*.

Independent of its category, each concrete stream object will also have
various capabilities: it can be read-only, write-only, or read-write. It can
also allow arbitrary random access (seeking forwards or backwards to any
location), or only sequential access (for example in the case of a socket or
pipe).

All streams are careful about the type of data you give to them.  For example
giving a `str` object to the `write()` method of a binary stream
will raise a `TypeError`.  So will giving a `bytes` object to the
`write()` method of a text stream.

> *Changed in version 3.3.*
> Operations that used to raise `IOError` now raise `OSError`, since
> `IOError` is now an alias of `OSError`.

### Text I/O

Text I/O expects and produces `str` objects.  This means that whenever
the backing store is natively made of bytes (such as in the case of a file),
encoding and decoding of data is made transparently as well as optional
translation of platform-specific newline characters.

The easiest way to create a text stream is with `open()`, optionally
specifying an encoding:

```
f = open("myfile.txt", "r", encoding="utf-8")
```

In-memory text streams are also available as `StringIO` objects:

```
f = io.StringIO("some initial text data")
```

> **Note:** When working with a non-blocking stream, be aware that read operations on text I/O objects
> might raise a `BlockingIOError` if the stream cannot perform the operation
> immediately.

The text stream API is described in detail in the documentation of
`TextIOBase`.

### Binary I/O

Binary I/O (also called *buffered I/O*) expects
bytes-like objects and produces `bytes`
objects.  No encoding, decoding, or newline translation is performed.  This
category of streams can be used for all kinds of non-text data, and also when
manual control over the handling of text data is desired.

The easiest way to create a binary stream is with `open()` with `'b'` in
the mode string:

```
f = open("myfile.jpg", "rb")
```

In-memory binary streams are also available as `BytesIO` objects:

```
f = io.BytesIO(b"some initial binary data: \x00\x01")
```

The binary stream API is described in detail in the docs of
`BufferedIOBase`.

Other library modules may provide additional ways to create text or binary
streams.  See `socket.socket.makefile()` for example.

### Raw I/O

Raw I/O (also called *unbuffered I/O*) is generally used as a low-level
building-block for binary and text streams; it is rarely useful to directly
manipulate a raw stream from user code.  Nevertheless, you can create a raw
stream by opening a file in binary mode with buffering disabled:

```
f = open("myfile.jpg", "rb", buffering=0)
```

The raw stream API is described in detail in the docs of `RawIOBase`.

> **Warning:** Raw I/O is a low-level interface and methods generally must have their return
> values checked and be explicitly retried to ensure an operation completes.
> For instance `write()` returns the number of bytes written
> which may be less than the number of bytes provided (a partial write).
> High-level I/O objects like binary-io and text-io implement
> retry behavior.

## Text encoding

The default encoding of `TextIOWrapper` and `open()` is UTF-8.
If Python UTF-8 Mode is disabled, the default encoding
is locale-specific (`locale.getencoding()`).

> **See also:** utf8-mode
> Python UTF-8 Mode ignores the locale encoding and forces the use
> of UTF-8.
>
> PEP 686
> Python 3.15 made utf8-mode the default.

### Opt-in EncodingWarning

> *Added in version 3.10.*
> See PEP 597 for more details.

To find where the default encoding is used, you can enable
the `-X warn_default_encoding` command line option or set the
`PYTHONWARNDEFAULTENCODING` environment variable, which will
emit an `EncodingWarning` when the default encoding is used.

If you are providing an API that uses `open()` or
`TextIOWrapper` and passes `encoding=None` as a parameter, you
can use `text_encoding()` so that callers of the API will emit an
`EncodingWarning` if they don't pass an `encoding`. However,
please consider using UTF-8 by default (i.e. `encoding="utf-8"`) for
new APIs.

## High-level module interface

### `DEFAULT_BUFFER_SIZE`

An int containing the default buffer size used by the module's buffered I/O
classes.  `open()` uses the file's blksize (as obtained by
`os.stat()`) if possible.

### `open(file, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)`

This is an alias for the builtin `open()` function.

### `open_code(path)`

Opens the provided file with mode `'rb'`. This function should be used
when the intent is to treat the contents as executable code.

*path* should be a `str` and an absolute path.

The behavior of this function may be overridden by an earlier call to the
`PyFile_SetOpenCodeHook`. However, assuming that *path* is a
`str` and an absolute path, `open_code(path)` should always behave
the same as `open(path, 'rb')`. Overriding the behavior is intended for
additional validation or preprocessing of the file.

> *Added in version 3.8.*

### `text_encoding(encoding, stacklevel=2, /)`

This is a helper function for callables that use `open()` or
`TextIOWrapper` and have an `encoding=None` parameter.

This function returns *encoding* if it is not `None`.
Otherwise, it returns `"locale"` or `"utf-8"` depending on
UTF-8 Mode.

This function emits an `EncodingWarning` if
`sys.flags.warn_default_encoding` is true and *encoding*
is `None`. *stacklevel* specifies where the warning is emitted.
For example:

```
def read_text(path, encoding=None):
    encoding = io.text_encoding(encoding)  # stacklevel=2
    with open(path, encoding) as f:
        return f.read()
```

In this example, an `EncodingWarning` is emitted for the caller of
`read_text()`.

See io-text-encoding for more information.

> *Added in version 3.10.*

> *Changed in version 3.11.*
> `text_encoding()` returns "utf-8" when UTF-8 mode is enabled and
> *encoding* is `None`.

### exception `BlockingIOError`

This is a compatibility alias for the builtin `BlockingIOError`
exception.

### exception `UnsupportedOperation`

An exception inheriting `OSError` and `ValueError` that is raised
when an unsupported operation is called on a stream.

> **See also:** `sys`
> contains the standard IO streams: `sys.stdin`, `sys.stdout`,
> and `sys.stderr`.
