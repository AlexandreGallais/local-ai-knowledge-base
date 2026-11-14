---
title: "compression.zstd --- Compression compatible with the Zstandard format (part 1 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/compression.zstd.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `compression.zstd` --- Compression compatible with the Zstandard format

Module `compression.zstd`.

> *Added in version 3.14.*

**Source code:** Lib/compression/zstd/__init__.py

This module provides classes and functions for compressing and decompressing
data using the Zstandard (or *zstd*) compression algorithm. The
zstd manual
describes Zstandard as "a fast lossless compression algorithm, targeting
real-time compression scenarios at zlib-level and better compression ratios."
Also included is a file interface that supports reading and writing the
contents of `.zst` files created by the `zstd` utility, as well as
raw zstd compressed streams.

The `compression.zstd` module contains:

- The `.open()` function and `ZstdFile` class for reading and
writing compressed files.
- The `ZstdCompressor` and `ZstdDecompressor` classes for
incremental (de)compression.
- The `compress()` and `decompress()` functions for one-shot
(de)compression.
- The `train_dict()` and `finalize_dict()` functions and the
`ZstdDict` class to train and manage Zstandard dictionaries.
- The `CompressionParameter`, `DecompressionParameter`, and
`Strategy` classes for setting advanced (de)compression parameters.

## Exceptions

### exception `ZstdError`

This exception is raised when an error occurs during compression or
decompression, or while initializing the (de)compressor state.

## Reading and writing compressed files

### `open(file, /, mode='rb', *, level=None, options=None, \`

```python
zstd_dict=None, encoding=None, errors=None, newline=None)
```

Open a Zstandard-compressed file in binary or text mode, returning a
file object.

The *file* argument can be either a file name (given as a
`str`, `bytes` or path-like
object), in which case the named file is opened, or it can be an existing
file object to read from or write to.

The mode argument can be either `'rb'` for reading (default), `'wb'` for
overwriting, `'ab'` for appending, or `'xb'` for exclusive creation.
These can equivalently be given as `'r'`, `'w'`, `'a'`, and `'x'`
respectively. You may also open in text mode with `'rt'`, `'wt'`,
`'at'`, and `'xt'` respectively.

When reading, the *options* argument can be a dictionary providing advanced
decompression parameters; see `DecompressionParameter` for detailed
information about supported
parameters. The *zstd_dict* argument is a `ZstdDict` instance to be
used during decompression. When reading, if the *level*
argument is not None, a `TypeError` will be raised.

When writing, the *options* argument can be a dictionary
providing advanced compression parameters; see
`CompressionParameter` for detailed information about supported
parameters. The *level* argument is the compression level to use when
writing compressed data. Only one of *level* or *options* may be non-None.
The *zstd_dict* argument is a `ZstdDict` instance to be used during
compression.

In binary mode, this function is equivalent to the `ZstdFile`
constructor: `ZstdFile(file, mode, ...)`. In this case, the
*encoding*, *errors*, and *newline* parameters must not be provided.

In text mode, a `ZstdFile` object is created, and wrapped in an
`io.TextIOWrapper` instance with the specified encoding, error
handling behavior, and line endings.

### class `ZstdFile(file, /, mode='rb', *, level=None, options=None, \`

```python
zstd_dict=None)
```

Open a Zstandard-compressed file in binary mode.

A `ZstdFile` can wrap an already-open file object, or operate
directly on a named file. The *file* argument specifies either the file
object to wrap, or the name of the file to open (as a `str`,
`bytes` or path-like object). If
wrapping an existing file object, the wrapped file will not be closed when
the `ZstdFile` is closed.

The *mode* argument can be either `'rb'` for reading (default), `'wb'`
for overwriting, `'xb'` for exclusive creation, or `'ab'` for appending.
These can equivalently be given as `'r'`, `'w'`, `'x'` and `'a'`
respectively.

If *file* is a file object (rather than an actual file name), a mode of
`'w'` does not truncate the file, and is instead equivalent to `'a'`.

When reading, the *options* argument can be a dictionary
providing advanced decompression parameters; see
`DecompressionParameter` for detailed information about supported
parameters. The *zstd_dict* argument is a `ZstdDict` instance to be
used during decompression. When reading, if the *level*
argument is not None, a `TypeError` will be raised.

When writing, the *options* argument can be a dictionary
providing advanced compression parameters; see
`CompressionParameter` for detailed information about supported
parameters. The *level* argument is the compression level to use when
writing compressed data. Only one of *level* or *options* may be passed. The
*zstd_dict* argument is a `ZstdDict` instance to be used during
compression.

`ZstdFile` supports all the members specified by
`io.BufferedIOBase`, except for `detach()`
and `truncate()`.
Iteration and the `with` statement are supported.

The following method and attributes are also provided:

### `peek(size=-1)`

Return buffered data without advancing the file position. At least one
byte of data will be returned, unless EOF has been reached. The exact
number of bytes returned is unspecified (the *size* argument is ignored).

> **Note:** While calling `peek()` does not change the file position of
> the `ZstdFile`, it may change the position of the underlying
> file object (for example, if the `ZstdFile` was constructed by
> passing a file object for *file*).

### `mode`

`'rb'` for reading and `'wb'` for writing.

### `name`

The name of the Zstandard file. Equivalent to the `name`
attribute of the underlying file object.

## Compressing and decompressing data in memory

### `compress(data, level=None, options=None, zstd_dict=None)`

Compress *data* (a bytes-like object), returning the compressed
data as a `bytes` object.

The *level* argument is an integer controlling the level of
compression. *level* is an alternative to setting
`CompressionParameter.compression_level` in *options*. Use
`bounds()` on
`compression_level` to get the values that can
be passed for *level*. If advanced compression options are needed, the
*level* argument must be omitted and in the *options* dictionary the
`CompressionParameter.compression_level` parameter should be set.

The *options* argument is a Python dictionary containing advanced
compression parameters. The valid keys and values for compression parameters
are documented as part of the `CompressionParameter` documentation.

The *zstd_dict* argument is an instance of `ZstdDict`
containing trained data to improve compression efficiency. The
function `train_dict()` can be used to generate a Zstandard dictionary.

### `decompress(data, zstd_dict=None, options=None)`

Decompress *data* (a bytes-like object), returning the uncompressed
data as a `bytes` object.

The *options* argument is a Python dictionary containing advanced
decompression parameters. The valid keys and values for compression
parameters are documented as part of the `DecompressionParameter`
documentation.

The *zstd_dict* argument is an instance of `ZstdDict`
containing trained data used during compression. This must be
the same Zstandard dictionary used during compression.

If *data* is the concatenation of multiple distinct compressed frames,
decompress all of these frames, and return the concatenation of the results.

### class `ZstdCompressor(level=None, options=None, zstd_dict=None)`

Create a compressor object, which can be used to compress data
incrementally.

For a more convenient way of compressing a single chunk of data, see the
module-level function `compress()`.

The *level* argument is an integer controlling the level of
compression. *level* is an alternative to setting
`CompressionParameter.compression_level` in *options*. Use
`bounds()` on
`compression_level` to get the values that can
be passed for *level*. If advanced compression options are needed, the
*level* argument must be omitted and in the *options* dictionary the
`CompressionParameter.compression_level` parameter should be set.

The *options* argument is a Python dictionary containing advanced
compression parameters. The valid keys and values for compression parameters
are documented as part of the `CompressionParameter` documentation.

The *zstd_dict* argument is an optional instance of `ZstdDict`
containing trained data to improve compression efficiency. The
function `train_dict()` can be used to generate a Zstandard dictionary.

### `compress(data, mode=ZstdCompressor.CONTINUE)`

Compress *data* (a bytes-like object), returning a `bytes`
object with compressed data if possible, or otherwise an empty
`bytes` object. Some of *data* may be buffered internally, for
use in later calls to `compress()` and `flush()`. The returned
data should be concatenated with the output of any previous calls to
`compress()`.

The *mode* argument is a `ZstdCompressor` attribute, either
`CONTINUE`, `FLUSH_BLOCK`,
or `FLUSH_FRAME`.

When all data has been provided to the compressor, call the
`flush()` method to finish the compression process. If
`compress()` is called with *mode* set to `FLUSH_FRAME`,
`flush()` should not be called, as it would write out a new empty
frame.

### `flush(mode=ZstdCompressor.FLUSH_FRAME)`

Finish the compression process, returning a `bytes` object
containing any data stored in the compressor's internal buffers.

The *mode* argument is a `ZstdCompressor` attribute, either
`FLUSH_BLOCK`, or `FLUSH_FRAME`.

### `set_pledged_input_size(size)`

Specify the amount of uncompressed data *size* that will be provided for
the next frame. *size* will be written into the frame header of the next
frame unless `CompressionParameter.content_size_flag` is `False`
or `0`. A size of `0` means that the frame is empty. If *size* is
`None`, the frame header will omit the frame size. Frames that include
the uncompressed data size require less memory to decompress, especially
at higher compression levels.

If `last_mode` is not `FLUSH_FRAME`, a
`ValueError` is raised as the compressor is not at the start of
a frame. If the pledged size does not match the actual size of data
provided to `.compress()`, future calls to `compress()` or
`flush()` may raise `ZstdError` and the last chunk of data may
be lost.

After `flush()` or `.compress()` are called with mode
`FLUSH_FRAME`, the next frame will not include the frame size into
the header unless `set_pledged_input_size()` is called again.

### `CONTINUE`

Collect more data for compression, which may or may not generate output
immediately. This mode optimizes the compression ratio by maximizing the
amount of data per block and frame.

### `FLUSH_BLOCK`

Complete and write a block to the data stream. The data returned so far
can be immediately decompressed. Past data can still be referenced in
future blocks generated by calls to `compress()`,
improving compression.

### `FLUSH_FRAME`

Complete and write out a frame. Future data provided to
`compress()` will be written into a new frame and
*cannot* reference past data.

### `last_mode`

The last mode passed to either `compress()` or `flush()`.
The value can be one of `CONTINUE`, `FLUSH_BLOCK`, or
`FLUSH_FRAME`. The initial value is `FLUSH_FRAME`,
signifying that the compressor is at the start of a new frame.

### class `ZstdDecompressor(zstd_dict=None, options=None)`

Create a decompressor object, which can be used to decompress data
incrementally.

For a more convenient way of decompressing an entire compressed stream at
once, see the module-level function `decompress()`.

The *options* argument is a Python dictionary containing advanced
decompression parameters. The valid keys and values for compression
parameters are documented as part of the `DecompressionParameter`
documentation.

The *zstd_dict* argument is an instance of `ZstdDict`
containing trained data used during compression. This must be
the same Zstandard dictionary used during compression.

> **Note:** This class does not transparently handle inputs containing multiple
> compressed frames, unlike the `decompress()` function and
> `ZstdFile` class. To decompress a multi-frame input, you should
> use `decompress()`, `ZstdFile` if working with a
> file object, or multiple `ZstdDecompressor` instances.

### `decompress(data, max_length=-1)`

Decompress *data* (a bytes-like object), returning
uncompressed data as bytes. Some of *data* may be buffered
internally, for use in later calls to `decompress()`.
The returned data should be concatenated with the output of any previous
calls to `decompress()`.

If *max_length* is non-negative, the method returns at most *max_length*
bytes of decompressed data. If this limit is reached and further
output can be produced (or EOF is reached), the `needs_input`
attribute will be set to `False`. In this case, the next call to
`decompress()` may provide *data* as `b''` to obtain
more of the output. The full content can thus be read like:

```
process_output(d.decompress(data, max_length))
while not d.eof and not d.needs_input:
    process_output(d.decompress(b"", max_length))
```

If all of the input data was decompressed and returned (either
because this was less than *max_length* bytes, or because
*max_length* was negative), the `needs_input` attribute
will be set to `True`.

Attempting to decompress data after the end of a frame will raise a
`EOFError`. Any data found after the end of the frame is ignored
and saved in the `unused_data` attribute.

### `eof`

`True` if the end-of-stream marker has been reached.

### `unused_data`

Data found after the end of the compressed stream.

Before the end of the stream is reached, this will be `b''`.

### `needs_input`

`False` if the `.decompress()` method can provide more
decompressed data before requiring new compressed input.
