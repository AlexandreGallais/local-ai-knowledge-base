---
title: "zipfile --- Work with ZIP archives (part 2 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/zipfile.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# zipfile --- Work with ZIP archives (part 2 of 3)

## ZipFile objects

### class `ZipFile(file, mode='r', compression=ZIP_STORED, allowZip64=True, \`

```python
compresslevel=None, *, strict_timestamps=True, \
metadata_encoding=None)
```

Open a ZIP file, where *file* can be a path to a file (a string), a
file-like object or a path-like object.

The *mode* parameter should be `'r'` to read an existing
file, `'w'` to truncate and write a new file, `'a'` to append to an
existing file, or `'x'` to exclusively create and write a new file.
If *mode* is `'x'` and *file* refers to an existing file,
a `FileExistsError` will be raised.
If *mode* is `'a'` and *file* refers to an existing ZIP
file, then additional files are added to it.  If *file* does not refer to a
ZIP file, then a new ZIP archive is appended to the file.  This is meant for
adding a ZIP archive to another file (such as `python.exe`).  If
*mode* is `'a'` and the file does not exist at all, it is created.
If *mode* is `'r'` or `'a'`, the file should be seekable.

*compression* is the ZIP compression method to use when writing the archive,
and should be `ZIP_STORED`, `ZIP_DEFLATED`,
`ZIP_BZIP2`, `ZIP_LZMA`, or `ZIP_ZSTANDARD`;
unrecognized values will cause `NotImplementedError` to be raised.  If
`ZIP_DEFLATED`, `ZIP_BZIP2`, `ZIP_LZMA`, or
`ZIP_ZSTANDARD` is specified but the corresponding module
(`zlib`, `bz2`, `lzma`, or `compression.zstd`) is not
available, `RuntimeError` is raised. The default is `ZIP_STORED`.

If *allowZip64* is `True` (the default) zipfile will create ZIP files that
use the ZIP64 extensions when the zipfile is larger than 4 GiB. If it is
`false` `zipfile` will raise an exception when the ZIP file would
require ZIP64 extensions.

The *compresslevel* parameter controls the compression level to use when
writing files to the archive.
When using `ZIP_STORED` or `ZIP_LZMA` it has no effect.
When using `ZIP_DEFLATED` integers `0` through `9` are accepted
(see `zlib` for more information).
When using `ZIP_BZIP2` integers `1` through `9` are accepted
(see `bz2` for more information).
When using `ZIP_ZSTANDARD` integers `-131072` through `22` are
commonly accepted (see
`CompressionParameter.compression_level`
for more on retrieving valid values and their meaning).

The *strict_timestamps* argument, when set to `False`, allows to
zip files older than 1980-01-01 at the cost of setting the
timestamp to 1980-01-01.
Similar behavior occurs with files newer than 2107-12-31,
the timestamp is also set to the limit.

When mode is `'r'`, *metadata_encoding* may be set to the name of a codec,
which will be used to decode metadata such as the names of members and ZIP
comments.

If the file is created with mode `'w'`, `'x'` or `'a'` and then
`closed()` without adding any files to the archive, the appropriate
ZIP structures for an empty archive will be written to the file.

ZipFile is also a context manager and therefore supports the
`with` statement.  In the example, *myzip* is closed after the
`with` statement's suite is finished---even if an exception occurs:

```
with ZipFile('spam.zip', 'w') as myzip:
    myzip.write('eggs.txt')
```

> **Note:** *metadata_encoding* is an instance-wide setting for the ZipFile.
> It is not possible to set this on a per-member basis.
>
> This attribute is a workaround for legacy implementations which produce
> archives with names in the current locale encoding or code page (mostly
> on Windows).  According to the .ZIP standard, the encoding of metadata
> may be specified to be either IBM code page (default) or UTF-8 by a flag
> in the archive header.
> That flag takes precedence over *metadata_encoding*, which is
> a Python-specific extension.

> *Changed in version 3.2.*
> Added the ability to use `ZipFile` as a context manager.

> *Changed in version 3.3.*
> Added support for `bzip2` and `lzma` compression.

> *Changed in version 3.4.*
> ZIP64 extensions are enabled by default.

> *Changed in version 3.5.*
> Added support for writing to unseekable streams.
> Added support for the `'x'` mode.

> *Changed in version 3.6.*
> Previously, a plain `RuntimeError` was raised for unrecognized
> compression values.

> *Changed in version 3.6.2.*
> The *file* parameter accepts a path-like object.

> *Changed in version 3.7.*
> Add the *compresslevel* parameter.

> *Changed in version 3.8.*
> The *strict_timestamps* keyword-only parameter.

> *Changed in version 3.11.*
> Added support for specifying member name encoding for reading
> metadata in the zipfile's directory and file headers.

### `ZipFile.close()`

Close the archive file.  You must call `close()` before exiting your program
or essential records will not be written.

### `ZipFile.getinfo(name)`

Return a `ZipInfo` object with information about the archive member
*name*.  Calling `getinfo()` for a name not currently contained in the
archive will raise a `KeyError`.

### `ZipFile.infolist()`

Return a list containing a `ZipInfo` object for each member of the
archive.  The objects are in the same order as their entries in the actual ZIP
file on disk if an existing archive was opened.

### `ZipFile.namelist()`

Return a list of archive members by name.

### `ZipFile.open(name, mode='<example-value>', pwd=None, *, force_zip64=False)`

Access a member of the archive as a binary file-like object.  *name*
can be either the name of a file within the archive or a `ZipInfo`
object.  The *mode* parameter, if included, must be `'r'` (the default)
or `'<example-value>'`.  *pwd* is the password used to decrypt encrypted ZIP files as a
`bytes` object.

`open()` is also a context manager and therefore supports the
`with` statement:

```
with ZipFile('spam.zip') as myzip:
    with myzip.open('eggs.txt') as myfile:
        print(myfile.read())
```

With *mode* `'r'` the file-like object
(`ZipExtFile`) is read-only and provides the following methods:
`read()`, `readline()`,
`readlines()`, `seek()`,
`tell(), iter__(), next__()`.
These objects can operate independently of the ZipFile.

With `mode='w'`, a writable file handle is returned, which supports the
`write()` method.  While a writable file handle is open,
attempting to read or write other files in the ZIP file will raise a
`ValueError`.

In both cases the file-like object has also attributes `name`,
which is equivalent to the name of a file within the archive, and
`mode`, which is `'rb'` or `'wb'` depending on the input mode.

When writing a file, if the file size is not known in advance but may exceed
2 GiB, pass `force_zip64=True` to ensure that the header format is
capable of supporting large files.  If the file size is known in advance,
construct a `ZipInfo` object with `file_size` set, and
use that as the *name* parameter.

> **Note:** The `.open()`, `read()` and `extract()` methods can take a filename
> or a `ZipInfo` object.  You will appreciate this when trying to read a
> ZIP file that contains members with duplicate names.

> *Changed in version 3.6.*
> Removed support of `mode='U'`.  Use `io.TextIOWrapper` for reading
> compressed text files in universal newlines mode.

> *Changed in version 3.6.*
> `ZipFile.open()` can now be used to write files into the archive with the
> `mode='w'` option.

> *Changed in version 3.6.*
> Calling `.open()` on a closed ZipFile will raise a `ValueError`.
> Previously, a `RuntimeError` was raised.

> *Changed in version 3.13.*
> Added attributes `name` and `mode` for the writeable
> file-like object.
> The value of the `mode` attribute for the readable file-like
> object was changed from `'r'` to `'rb'`.

### `ZipFile.extract(member, path=None, pwd=None)`

Extract a member from the archive to the current working directory; *member*
must be its full name or a `ZipInfo` object.  Its file information is
extracted as accurately as possible.  *path* specifies a different directory
to extract to.  *member* can be a filename or a `ZipInfo` object.
*pwd* is the password used for encrypted files as a `bytes` object.

Returns the normalized path created (a directory or new file).

> **Note:** If a member filename is an absolute path, a drive/UNC sharepoint and
> leading (back)slashes will be stripped, e.g.: `///foo/bar` becomes
> `foo/bar` on Unix, and `C:\foo\bar` becomes `foo\bar` on Windows.
> And all `".."` components in a member filename will be removed, e.g.:
> `../../foo../../ba..r` becomes `foo../ba..r`.  On Windows illegal
> characters (`:`, `<`, `>`, `|`, `"`, `?`, and `*`)
> replaced by underscore (`_`).

> *Changed in version 3.6.*
> Calling `extract()` on a closed ZipFile will raise a
> `ValueError`.  Previously, a `RuntimeError` was raised.

> *Changed in version 3.6.2.*
> The *path* parameter accepts a path-like object.

### `ZipFile.extractall(path=None, members=None, pwd=None)`

Extract all members from the archive to the current working directory.  *path*
specifies a different directory to extract to.  *members* is optional and must
be a subset of the list returned by `namelist()`.  *pwd* is the password
used for encrypted files as a `bytes` object.

> **Warning:** Never extract archives from untrusted sources without prior inspection.
> It is possible that files are created outside of *path*, for example, members
> that have absolute filenames or filenames with ".." components.
> This module attempts to prevent that.
> See `extract()` note.

> *Changed in version 3.6.*
> Calling `extractall()` on a closed ZipFile will raise a
> `ValueError`.  Previously, a `RuntimeError` was raised.

> *Changed in version 3.6.2.*
> The *path* parameter accepts a path-like object.

### `ZipFile.printdir()`

Print a table of contents for the archive to `sys.stdout`.

### `ZipFile.setpassword(pwd)`

Set *pwd* (a `bytes` object) as default password to extract encrypted files.

### `ZipFile.read(name, pwd=None)`

Return the bytes of the file *name* in the archive.  *name* is the name of the
file in the archive, or a `ZipInfo` object.  The archive must be open for
read or append. *pwd* is the password used for encrypted files as a `bytes`
object and, if specified, overrides the default password set with `setpassword()`.
Calling `read()` on a ZipFile that uses a compression method other than
`ZIP_STORED`, `ZIP_DEFLATED`, `ZIP_BZIP2`,
`ZIP_LZMA`, or `ZIP_ZSTANDARD` will raise a
`NotImplementedError`. An error will also be raised if the
corresponding compression module is not available.

> *Changed in version 3.6.*
> Calling `read()` on a closed ZipFile will raise a `ValueError`.
> Previously, a `RuntimeError` was raised.

### `ZipFile.testzip()`

Read all the files in the archive and check their CRC's and file headers.
Return the name of the first bad file, or else return `None`.

> *Changed in version 3.6.*
> Calling `testzip()` on a closed ZipFile will raise a
> `ValueError`.  Previously, a `RuntimeError` was raised.

### `ZipFile.write(filename, arcname=None, compress_type=None, \`

```python
compresslevel=None)
```

Write the file named *filename* to the archive, giving it the archive name
*arcname* (by default, this will be the same as *filename*, but without a drive
letter and with leading path separators removed).  If given, *compress_type*
overrides the value given for the *compression* parameter to the constructor for
the new entry. Similarly, *compresslevel* will override the constructor if
given.
The archive must be open with mode `'w'`, `'x'` or `'a'`.

> **Note:** The ZIP file standard historically did not specify a metadata encoding,
> but strongly recommended CP437 (the original IBM PC encoding) for
> interoperability.  Recent versions allow use of UTF-8 (only).  In this
> module, UTF-8 will automatically be used to write the member names if
> they contain any non-ASCII characters.  It is not possible to write
> member names in any encoding other than ASCII or UTF-8.

> **Note:** Archive names should be relative to the archive root, that is, they should not
> start with a path separator.

> **Note:** If `arcname` (or `filename`, if `arcname` is  not given) contains a null
> byte, the name of the file in the archive will be truncated at the null byte.

> **Note:** A leading slash in the filename may lead to the archive being impossible to
> open in some zip programs on Windows systems.

> *Changed in version 3.6.*
> Calling `write()` on a ZipFile created with mode `'r'` or
> a closed ZipFile will raise a `ValueError`.  Previously,
> a `RuntimeError` was raised.

### `ZipFile.writestr(zinfo_or_arcname, data, compress_type=None, \`

```python
compresslevel=None)
```

Write a file into the archive.  The contents is *data*, which may be either
a `str` or a `bytes` instance; if it is a `str`,
it is encoded as UTF-8 first.  *zinfo_or_arcname* is either the file
name it will be given in the archive, or a `ZipInfo` instance.  If it's
an instance, at least the filename, date, and time must be given.  If it's a
name, the date and time is set to the current date and time.
The archive must be opened with mode `'w'`, `'x'` or `'a'`.

If given, *compress_type* overrides the value given for the *compression*
parameter to the constructor for the new entry, or in the *zinfo_or_arcname*
(if that is a `ZipInfo` instance). Similarly, *compresslevel* will
override the constructor if given.

> **Note:** When passing a `ZipInfo` instance as the *zinfo_or_arcname* parameter,
> the compression method used will be that specified in the *compress_type*
> member of the given `ZipInfo` instance.  By default, the
> `ZipInfo` constructor sets this member to `ZIP_STORED`.

> *Changed in version 3.2.*
> The *compress_type* argument.

> *Changed in version 3.6.*
> Calling `writestr()` on a ZipFile created with mode `'r'` or
> a closed ZipFile will raise a `ValueError`.  Previously,
> a `RuntimeError` was raised.

> *Changed in version 3.14.*
> Now respects the `SOURCE_DATE_EPOCH` environment variable.
> If set, it uses this value as the modification timestamp for the file
> written into the ZIP archive, instead of using the current time.

### `ZipFile.mkdir(zinfo_or_directory, mode=511)`

Create a directory inside the archive.  If *zinfo_or_directory* is a string,
a directory is created inside the archive with the mode that is specified in
the *mode* argument. If, however, *zinfo_or_directory* is
a `ZipInfo` instance then the *mode* argument is ignored.

The archive must be opened with mode `'w'`, `'x'` or `'a'`.

> *Added in version 3.11.*

The following data attributes are also available:

### `ZipFile.filename`

Name of the ZIP file.

### `ZipFile.debug`

The level of debug output to use.  This may be set from `0` (the default, no
output) to `3` (the most output).  Debugging information is written to
`sys.stdout`.

### `ZipFile.comment`

The comment associated with the ZIP file as a `bytes` object.
If assigning a comment to a
`ZipFile` instance created with mode `'w'`, `'x'` or `'a'`,
it should be no longer than 65535 bytes.  Comments longer than this will be
truncated.
