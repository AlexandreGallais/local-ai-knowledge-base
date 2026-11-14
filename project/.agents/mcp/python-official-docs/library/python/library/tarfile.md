---
title: "tarfile --- Read and write tar archive files (part 1 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tarfile.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `tarfile` --- Read and write tar archive files

Module `tarfile`.

**Source code:** Lib/tarfile.py

The `tarfile` module makes it possible to read and write tar
archives, including those using gzip, bz2 and lzma compression.
Use the `zipfile` module to read or write `.zip` files, or the
higher-level functions in shutil.

Some facts and figures:

- reads and writes `gzip`, `bz2`, `compression.zstd`, and
`lzma` compressed archives if the respective modules are available.

If any of these optional modules are missing from
your copy of CPython, look for documentation from your distributor (that is,
whoever provided Python to you).
If you are the distributor, see optional-module-requirements.

- read/write support for the POSIX.1-1988 (ustar) format.

- read/write support for the GNU tar format including *longname* and *longlink*
extensions, read-only support for all variants of the *sparse* extension
including restoration of sparse files.

- read/write support for the POSIX.1-2001 (pax) format.

- handles directories, regular files, hardlinks, symbolic links, fifos,
character devices and block devices and is able to acquire and restore file
information like timestamp, access permissions and owner.

> *Changed in version 3.3.*
> Added support for `lzma` compression.

> *Changed in version 3.12.*
> Archives are extracted using a filter,
> which makes it possible to either limit surprising/dangerous features,
> or to acknowledge that they are expected and the archive is fully trusted.

> *Changed in version 3.14.*
> Set the default extraction filter to `data()`,
> which disallows some dangerous features such as links to absolute paths
> or paths outside of the destination. Previously, the filter strategy
> was equivalent to `fully_trusted()`.

> *Changed in version 3.14.*
> Added support for Zstandard compression using `compression.zstd`.

### `open(name=None, mode='r', fileobj=None, bufsize=10240, **kwargs)`

Return a `TarFile` object for the pathname *name*. For detailed
information on `TarFile` objects and the keyword arguments that are
allowed, see tarfile-objects.

*mode* has to be a string of the form `'filemode[:compression]'`, it defaults
to `'r'`. Here is a full list of mode combinations:

```text
+------------------+---------------------------------------------+
| mode             | action                                      |
+==================+=============================================+
| ``'r'`` or       | Open for reading with transparent           |
| ``'r:*'``        | compression (recommended).                  |
+------------------+---------------------------------------------+
| ``'r:'``         | Open for reading exclusively without        |
|                  | compression.                                |
+------------------+---------------------------------------------+
| ``'r:gz'``       | Open for reading with gzip compression.     |
+------------------+---------------------------------------------+
| ``'r:bz2'``      | Open for reading with bzip2 compression.    |
+------------------+---------------------------------------------+
| ``'r:xz'``       | Open for reading with lzma compression.     |
+------------------+---------------------------------------------+
| ``'r:zst'``      | Open for reading with Zstandard compression.|
+------------------+---------------------------------------------+
| ``'x'`` or       | Create a tarfile exclusively without        |
| ``'x:'``         | compression.                                |
|                  | Raise a :exc:`FileExistsError` exception    |
|                  | if it already exists.                       |
+------------------+---------------------------------------------+
| ``'x:gz'``       | Create a tarfile with gzip compression.     |
|                  | Raise a :exc:`FileExistsError` exception    |
|                  | if it already exists.                       |
+------------------+---------------------------------------------+
| ``'x:bz2'``      | Create a tarfile with bzip2 compression.    |
|                  | Raise a :exc:`FileExistsError` exception    |
|                  | if it already exists.                       |
+------------------+---------------------------------------------+
| ``'x:xz'``       | Create a tarfile with lzma compression.     |
|                  | Raise a :exc:`FileExistsError` exception    |
|                  | if it already exists.                       |
+------------------+---------------------------------------------+
| ``'x:zst'``      | Create a tarfile with Zstandard compression.|
|                  | Raise a :exc:`FileExistsError` exception    |
|                  | if it already exists.                       |
+------------------+---------------------------------------------+
| ``'a'`` or       | Open for appending with no compression. The |
| ``'a:'``         | file is created if it does not exist.       |
+------------------+---------------------------------------------+
| ``'w'`` or       | Open for uncompressed writing.              |
| ``'w:'``         |                                             |
+------------------+---------------------------------------------+
| ``'w:gz'``       | Open for gzip compressed writing.           |
+------------------+---------------------------------------------+
| ``'w:bz2'``      | Open for bzip2 compressed writing.          |
+------------------+---------------------------------------------+
| ``'w:xz'``       | Open for lzma compressed writing.           |
+------------------+---------------------------------------------+
| ``'w:zst'``      | Open for Zstandard compressed writing.      |
+------------------+---------------------------------------------+
```

Note that `'a:gz'`, `'a:bz2'` or `'a:xz'` is not possible. If *mode*
is not suitable to open a certain (compressed) file for reading,
`ReadError` is raised. Use *mode* `'r'` to avoid this.  If a
compression method is not supported, `CompressionError` is raised.

If *fileobj* is specified, it is used as an alternative to a file object
opened in binary mode for *name*. It is supposed to be at position 0.

For modes `'w:gz'`, `'x:gz'`, `'w|gz'`, `'w:bz2'`, `'x:bz2'`,
`'w|bz2'`, `tarfile.open()` accepts the keyword argument
*compresslevel* (default `6`) to specify the compression level of the file.

For modes `'w:xz'`, `'x:xz'` and `'w|xz'`, `tarfile.open()` accepts the
keyword argument *preset* to specify the compression level of the file.

For modes `'w:zst'`, `'x:zst'` and `'w|zst'`, `tarfile.open()`
accepts the keyword argument *level* to specify the compression level of
the file. The keyword argument *options* may also be passed, providing
advanced Zstandard compression parameters described by
`CompressionParameter`. The keyword argument
*zstd_dict* can be passed to provide a `ZstdDict`,
a Zstandard dictionary used to improve compression of smaller amounts of
data.

For modes `'w:gz'` and `'w|gz'`, `tarfile.open()` accepts the
keyword argument *mtime* to create a gzip archive header with that mtime. By
default, the mtime is set to the time of creation of the archive. Use
*mtime* `0` to generate a compressed stream that does not depend on
creation time, for reproducible output.

For special purposes, there is a second format for *mode*:
`'filemode|[compression]'`.  `tarfile.open()` will return a `TarFile`
object that processes its data as a stream of blocks.  No random seeking will
be done on the file. If given, *fileobj* may be any object that has a
`read()` or `write()` method
(depending on the *mode*) that works with bytes.
*bufsize* specifies the blocksize and defaults to `20 * 512` bytes.
Use this variant in combination with e.g. `sys.stdin.buffer`, a socket
file object or a tape device.
However, such a `TarFile` object is limited in that it does
not allow random access, see tar-examples.  The currently
possible modes:

```text
+-------------+--------------------------------------------+
| Mode        | Action                                     |
+=============+============================================+
| ``'r|*'``   | Open a *stream* of tar blocks for reading  |
|             | with transparent compression.              |
+-------------+--------------------------------------------+
| ``'r|'``    | Open a *stream* of uncompressed tar blocks |
|             | for reading.                               |
+-------------+--------------------------------------------+
| ``'r|gz'``  | Open a gzip compressed *stream* for        |
|             | reading.                                   |
+-------------+--------------------------------------------+
| ``'r|bz2'`` | Open a bzip2 compressed *stream* for       |
|             | reading.                                   |
+-------------+--------------------------------------------+
| ``'r|xz'``  | Open an lzma compressed *stream* for       |
|             | reading.                                   |
+-------------+--------------------------------------------+
| ``'r|zst'`` | Open a Zstandard compressed *stream* for   |
|             | reading.                                   |
+-------------+--------------------------------------------+
| ``'w|'``    | Open an uncompressed *stream* for writing. |
+-------------+--------------------------------------------+
| ``'w|gz'``  | Open a gzip compressed *stream* for        |
|             | writing.                                   |
+-------------+--------------------------------------------+
| ``'w|bz2'`` | Open a bzip2 compressed *stream* for       |
|             | writing.                                   |
+-------------+--------------------------------------------+
| ``'w|xz'``  | Open an lzma compressed *stream* for       |
|             | writing.                                   |
+-------------+--------------------------------------------+
| ``'w|zst'`` | Open a Zstandard compressed *stream* for   |
|             | writing.                                   |
+-------------+--------------------------------------------+
```

> *Changed in version 3.5.*
> The `'x'` (exclusive creation) mode was added.

> *Changed in version 3.6.*
> The *name* parameter accepts a path-like object.

> *Changed in version 3.12.*
> The *compresslevel* keyword argument also works for streams.

> *Changed in version 3.14.*
> The *preset* keyword argument also works for streams.

> *Changed in version 3.15.*
> The default compression level was reduced to 6 (down from 9).
> It is the default level used by most compression tools and a better
> tradeoff between speed and performance.

### class `TarFile`

Class for reading and writing tar archives. Do not use this class directly:
use `tarfile.open()` instead. See tarfile-objects.

### `is_tarfile(name)`

Return `True` if *name* is a tar archive file, that the `tarfile`
module can read. *name* may be a `str`, file, or file-like object.

> *Changed in version 3.9.*
> Support for file and file-like objects.

The `tarfile` module defines the following exceptions:

### exception `TarError`

Base class for all `tarfile` exceptions.

### exception `ReadError`

Is raised when a tar archive is opened, that either cannot be handled by the
`tarfile` module or is somehow invalid.

### exception `CompressionError`

Is raised when a compression method is not supported or when the data cannot be
decoded properly.

### exception `StreamError`

Is raised for the limitations that are typical for stream-like `TarFile`
objects.

### exception `ExtractError`

Is raised for *non-fatal* errors when using `TarFile.extract()`, but only if
`TarFile.errorlevel``== 2`.

### exception `HeaderError`

Is raised by `TarInfo.frombuf()` if the buffer it gets is invalid.

### exception `FilterError`

Base class for members refused by
filters.

### `tarinfo`

Information about the member that the filter refused to extract,
as TarInfo.

### exception `AbsolutePathError`

Raised to refuse extracting a member with an absolute path.

### exception `OutsideDestinationError`

Raised to refuse extracting a member outside the destination directory.

### exception `SpecialFileError`

Raised to refuse extracting a special file (e.g. a device or pipe).

### exception `AbsoluteLinkError`

Raised to refuse extracting a symbolic link with an absolute path.

### exception `LinkOutsideDestinationError`

Raised to refuse extracting a symbolic link pointing outside the destination
directory.

### exception `LinkFallbackError`

Raised to refuse emulating a link (hard or symbolic) by extracting another
archive member, when that member would be rejected by the filter location.
The exception that was raised to reject the replacement member is available
as `BaseException.__context__`.

> *Added in version 3.15.*

The following constants are available at the module level:

### `ENCODING`

The default character encoding: `'utf-8'` on Windows, the value returned by
`sys.getfilesystemencoding()` otherwise.

### `REGTYPE`

```python
AREGTYPE
```

A regular file `type`.

### `LNKTYPE`

A link (inside tarfile) `type`.

### `SYMTYPE`

A symbolic link `type`.

### `CHRTYPE`

A character special device `type`.

### `BLKTYPE`

A block special device `type`.

### `DIRTYPE`

A directory `type`.

### `FIFOTYPE`

A FIFO special device `type`.

### `CONTTYPE`

A contiguous file `type`.

### `GNUTYPE_LONGNAME`

A GNU tar longname `type`.

### `GNUTYPE_LONGLINK`

A GNU tar longlink `type`.

### `GNUTYPE_SPARSE`

A GNU tar sparse file `type`.

Each of the following constants defines a tar archive format that the
`tarfile` module is able to create. See section tar-formats for
details.

### `USTAR_FORMAT`

POSIX.1-1988 (ustar) format.

### `GNU_FORMAT`

GNU tar format.

### `PAX_FORMAT`

POSIX.1-2001 (pax) format.

### `DEFAULT_FORMAT`

The default format for creating archives. This is currently `PAX_FORMAT`.

> *Changed in version 3.8.*
> The default format for new archives was changed to
> `PAX_FORMAT` from `GNU_FORMAT`.

> **See also:** Module `zipfile`
> Documentation of the `zipfile` standard module.
>
> archiving-operations
> Documentation of the higher-level archiving facilities provided by the
> standard `shutil` module.
>
> GNU tar manual, Basic Tar Format
> Documentation for tar archive files, including GNU tar extensions.
