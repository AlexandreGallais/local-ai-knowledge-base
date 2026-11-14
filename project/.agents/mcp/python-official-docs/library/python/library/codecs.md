---
title: "codecs --- Codec registry and base classes (part 1 of 8)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/codecs.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `codecs` --- Codec registry and base classes

Module `codecs`.

**Source code:** Lib/codecs.py

This module defines base classes for standard Python codecs (encoders and
decoders) and provides access to the internal Python codec registry, which
manages the codec and error handling lookup process. Most standard codecs
are text encodings, which encode text to bytes (and
decode bytes to text), but there are also codecs provided that encode text to
text, and bytes to bytes. Custom codecs may encode and decode between arbitrary
types, but some module features are restricted to be used specifically with
text encodings or with codecs that encode to
`bytes`.

The module defines the following functions for encoding and decoding with
any codec:

### `encode(obj, encoding='utf-8', errors='strict')`

Encodes *obj* using the codec registered for *encoding*.

*Errors* may be given to set the desired error handling scheme. The
default error handler is `'strict'` meaning that encoding errors raise
`ValueError` (or a more codec specific subclass, such as
`UnicodeEncodeError`). Refer to codec-base-classes for more
information on codec error handling.

### `decode(obj, encoding='utf-8', errors='strict')`

Decodes *obj* using the codec registered for *encoding*.

*Errors* may be given to set the desired error handling scheme. The
default error handler is `'strict'` meaning that decoding errors raise
`ValueError` (or a more codec specific subclass, such as
`UnicodeDecodeError`). Refer to codec-base-classes for more
information on codec error handling.

### `charmap_build(string)`

Return a mapping suitable for encoding with a custom single-byte encoding.
Given a `str` *string* of up to 256 characters representing a
decoding table, returns either a compact internal mapping object
`EncodingMap` or a `dictionary` mapping character ordinals
to byte values. Raises a `TypeError` on invalid input.

The full details for each codec can also be looked up directly:

### `lookup(encoding, /)`

Looks up the codec info in the Python codec registry and returns a
`CodecInfo` object as defined below.

This function first normalizes the *encoding*: all ASCII letters are
converted to lower case, spaces are replaced with hyphens.
Then encoding is looked up in the registry's cache. If not found, the list of
registered search functions is scanned. If no `CodecInfo` object is
found, a `LookupError` is raised. Otherwise, the `CodecInfo` object
is stored in the cache and returned to the caller.

> *Changed in version 3.9.*
> Any characters except ASCII letters and digits and a dot are converted to underscore.

> *Changed in version 3.15.*
> No characters are converted to underscore anymore.
> Spaces are converted to hyphens.

### class `CodecInfo(encode, decode, streamreader=None, streamwriter=None, incrementalencoder=None, incrementaldecoder=None, name=None)`

Codec details when looking up the codec registry. The constructor
arguments are stored in attributes of the same name:

### `name`

The name of the encoding.

### `encode`

```python
decode
```

The stateless encoding and decoding functions. These must be
functions or methods which have the same interface as
the `encode()` and `decode()` methods of Codec
instances (see Codec Interface).
The functions or methods are expected to work in a stateless mode.

### `incrementalencoder`

```python
incrementaldecoder
```

Incremental encoder and decoder classes or factory functions.
These have to provide the interface defined by the base classes
`IncrementalEncoder` and `IncrementalDecoder`,
respectively. Incremental codecs can maintain state.

### `streamwriter`

```python
streamreader
```

Stream writer and reader classes or factory functions. These have to
provide the interface defined by the base classes
`StreamWriter` and `StreamReader`, respectively.
Stream codecs can maintain state.

To simplify access to the various codec components, the module provides
these additional functions which use `lookup()` for the codec lookup:

### `getencoder(encoding)`

Look up the codec for the given encoding and return its encoder function.

Raises a `LookupError` in case the encoding cannot be found.

### `getdecoder(encoding)`

Look up the codec for the given encoding and return its decoder function.

Raises a `LookupError` in case the encoding cannot be found.

### `getincrementalencoder(encoding)`

Look up the codec for the given encoding and return its incremental encoder
class or factory function.

Raises a `LookupError` in case the encoding cannot be found or the codec
doesn't support an incremental encoder.

### `getincrementaldecoder(encoding)`

Look up the codec for the given encoding and return its incremental decoder
class or factory function.

Raises a `LookupError` in case the encoding cannot be found or the codec
doesn't support an incremental decoder.

### `getreader(encoding)`

Look up the codec for the given encoding and return its `StreamReader`
class or factory function.

Raises a `LookupError` in case the encoding cannot be found.

### `getwriter(encoding)`

Look up the codec for the given encoding and return its `StreamWriter`
class or factory function.

Raises a `LookupError` in case the encoding cannot be found.

Custom codecs are made available by registering a suitable codec search
function:

### `register(search_function, /)`

Register a codec search function. Search functions are expected to take one
argument, being the encoding name in all lower case letters with spaces
converted to hyphens, and return a `CodecInfo` object.
In case a search function cannot find a given encoding, it should return
`None`.

### `unregister(search_function, /)`

Unregister a codec search function and clear the registry's cache.
If the search function is not registered, do nothing.

> *Added in version 3.10.*

While the builtin `open()` and the associated `io` module are the
recommended approach for working with encoded text files, this module
provides additional utility functions and classes that allow the use of a
wider range of codecs when working with binary files:

### `open(filename, mode='r', encoding=None, errors='strict', buffering=-1)`

Open an encoded file using the given *mode* and return an instance of
`StreamReaderWriter`, providing transparent encoding/decoding.
The default file mode is `'r'`, meaning to open the file in read mode.

> **Note:** If *encoding* is not `None`, then the
> underlying encoded files are always opened in binary mode.
> No automatic conversion of `'\n'` is done on reading and writing.
> The *mode* argument may be any binary mode acceptable to the built-in
> `open()` function; the `'b'` is automatically added.

*encoding* specifies the encoding which is to be used for the file.
Any encoding that encodes to and decodes from bytes is allowed, and
the data types supported by the file methods depend on the codec used.

*errors* may be given to define the error handling. It defaults to `'strict'`
which causes a `ValueError` to be raised in case an encoding error occurs.

*buffering* has the same meaning as for the built-in `open()` function.
It defaults to -1 which means that the default buffer size will be used.

> *Changed in version 3.11.*
> The `'U'` mode has been removed.

> *Deprecated since version 3.14.*
> `codecs.open()` has been superseded by `open()`.

### `EncodedFile(file, data_encoding, file_encoding=None, errors='strict')`

Return a `StreamRecoder` instance, a wrapped version of *file*
which provides transparent transcoding. The original file is closed
when the wrapped version is closed.

Data written to the wrapped file is decoded according to the given
*data_encoding* and then written to the original file as bytes using
*file_encoding*. Bytes read from the original file are decoded
according to *file_encoding*, and the result is encoded
using *data_encoding*.

If *file_encoding* is not given, it defaults to *data_encoding*.

*errors* may be given to define the error handling. It defaults to
`'strict'`, which causes `ValueError` to be raised in case an encoding
error occurs.

### `iterencode(iterator, encoding, errors='strict', **kwargs)`

Uses an incremental encoder to iteratively encode the input provided by
*iterator*. *iterator* must yield `str` objects.
This function is a generator. The *errors* argument (as well as any
other keyword argument) is passed through to the incremental encoder.

This function requires that the codec accept text `str` objects
to encode. Therefore it does not support bytes-to-bytes encoders such as
`base64_codec`.

### `iterdecode(iterator, encoding, errors='strict', **kwargs)`

Uses an incremental decoder to iteratively decode the input provided by
*iterator*. *iterator* must yield `bytes` objects.
This function is a generator. The *errors* argument (as well as any
other keyword argument) is passed through to the incremental decoder.

This function requires that the codec accept `bytes` objects
to decode. Therefore it does not support text-to-text encoders such as
`rot_13`, although `rot_13` may be used equivalently with
`iterencode()`.

### `readbuffer_encode(buffer, errors=None, /)`

Return a `tuple` containing the raw bytes of *buffer*, a
buffer-compatible object or `str`
(encoded to UTF-8 before processing), and their length in bytes.

The *errors* argument is ignored.

```pycon
>>> codecs.readbuffer_encode(b"Zito")
(b'Zito', 4)
```

The module also provides the following constants which are useful for reading
and writing to platform dependent files:

### `BOM`

```python
BOM_BE
BOM_LE
BOM_UTF8
BOM_UTF16
BOM_UTF16_BE
BOM_UTF16_LE
BOM_UTF32
BOM_UTF32_BE
BOM_UTF32_LE
```

These constants define various byte sequences,
being Unicode byte order marks (BOMs) for several encodings. They are
used in UTF-16 and UTF-32 data streams to indicate the byte order used,
and in UTF-8 as a Unicode signature. `BOM_UTF16` is either
`BOM_UTF16_BE` or `BOM_UTF16_LE` depending on the platform's
native byte order, `BOM` is an alias for `BOM_UTF16`,
`BOM_LE` for `BOM_UTF16_LE` and `BOM_BE` for
`BOM_UTF16_BE`. The others represent the BOM in UTF-8 and UTF-32
encodings.
