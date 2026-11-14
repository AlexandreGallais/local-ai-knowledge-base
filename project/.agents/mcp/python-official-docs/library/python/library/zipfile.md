---
title: "zipfile --- Work with ZIP archives (part 1 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/zipfile.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `zipfile` --- Work with ZIP archives

Module `zipfile`.

**Source code:** Lib/zipfile/

The ZIP file format is a common archive and compression standard. This module
provides tools to create, read, write, append, and list a ZIP file.  Any
advanced use of this module will require an understanding of the format, as
defined in PKZIP Application Note.

This module does not handle multipart ZIP files.
It can handle ZIP files that use the ZIP64 extensions
(that is ZIP files that are more than 4 GiB in size).  It supports
decryption of encrypted files in ZIP archives, but it cannot
create an encrypted file.  Decryption is extremely slow as it is
implemented in native Python rather than C.

Handling compressed archives requires optional modules
such as `zlib`, `bz2`, `lzma`, and `compression.zstd`.
If any of them are missing from your copy of CPython,
look for documentation from your distributor (that is,
whoever provided Python to you).
If you are the distributor, see optional-module-requirements.

The module defines the following items:

### exception `BadZipFile`

The error raised for bad ZIP files.

> *Added in version 3.2.*

### exception `BadZipfile`

Alias of `BadZipFile`, for compatibility with older Python versions.

> *Deprecated since version 3.2.*

### exception `LargeZipFile`

The error raised when a ZIP file would require ZIP64 functionality but that has
not been enabled.

### class `ZipFile`

The class for reading and writing ZIP files.  See section
zipfile-objects for constructor details.

### class `Path`

Class that implements a subset of the interface provided by
`pathlib.Path`, including the full
`importlib.resources.abc.Traversable` interface.

> *Added in version 3.8.*

### class `PyZipFile`

Class for creating ZIP archives containing Python libraries.

### class `ZipInfo(filename='NoName', date_time=(1980,1,1,0,0,0))`

Class used to represent information about a member of an archive. Instances
of this class are returned by the `.getinfo()` and `.infolist()`
methods of `ZipFile` objects.  Most users of the `zipfile` module
will not need to create these, but only use those created by this
module. *filename* should be the full name of the archive member, and
*date_time* should be a tuple containing six fields which describe the time
of the last modification to the file; the fields are described in section
zipinfo-objects.

> *Changed in version 3.13.*
> A public `compress_level` attribute has been added to expose the
> formerly protected `_compresslevel`.  The older protected name
> continues to work as a property for backwards compatibility.

### `_for_archive(archive)`

Resolve the date_time, compression attributes, and external attributes
to suitable defaults as used by `ZipFile.writestr()`.

Returns self for chaining.

> *Added in version 3.14.*

### `is_zipfile(filename)`

Returns `True` if *filename* is a valid ZIP file based on its magic number,
otherwise returns `False`.  *filename* may be a file or file-like object too.

> *Changed in version 3.1.*
> Support for file and file-like objects.

### `ZIP_STORED`

The numeric constant for an uncompressed archive member.

### `ZIP_DEFLATED`

The numeric constant for the usual ZIP compression method.  This requires the
`zlib` module.

### `ZIP_BZIP2`

The numeric constant for the BZIP2 compression method.  This requires the
`bz2` module.

> *Added in version 3.3.*

### `ZIP_LZMA`

The numeric constant for the LZMA compression method.  This requires the
`lzma` module.

> *Added in version 3.3.*

### `ZIP_ZSTANDARD`

The numeric constant for Zstandard compression. This requires the
`compression.zstd` module.

> **Note:** In APPNOTE 6.3.7, the method ID `20` was assigned to Zstandard
> compression. This was changed in APPNOTE 6.3.8 to method ID `93` to
> avoid conflicts, with method ID `20` being deprecated. For
> compatibility, the `zipfile` module reads both method IDs but will
> only write data with method ID `93`.

> *Added in version 3.14.*

> **Note:** The ZIP file format specification has included support for bzip2 compression
> since 2001, for LZMA compression since 2006, and Zstandard compression since
> 2020. However, some tools (including older Python releases) do not support
> these compression methods, and may either refuse to process the ZIP file
> altogether, or fail to extract individual files.

> **See also:** PKZIP Application Note
> Documentation on the ZIP file format by Phil Katz, the creator of the format and
> algorithms used.
>
> Info-ZIP Home Page
> Information about the Info-ZIP project's ZIP archive programs and development
> libraries.
