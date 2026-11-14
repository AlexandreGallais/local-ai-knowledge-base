---
title: "zipfile --- Work with ZIP archives (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/zipfile.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# zipfile --- Work with ZIP archives (part 3 of 3)

## Path objects

### class `Path(root, at='')`

Construct a Path object from a `root` zipfile (which may be a
`ZipFile` instance or `file` suitable for passing to
the `ZipFile` constructor).

`at` specifies the location of this Path within the zipfile,
e.g. 'dir/file.txt', 'dir/', or ''. Defaults to the empty string,
indicating the root.

> **Note:** The `Path` class does not sanitize filenames within the ZIP archive. Unlike
> the `ZipFile.extract()` and `ZipFile.extractall()` methods, it is the
> caller's responsibility to validate or sanitize filenames to prevent path traversal
> vulnerabilities (for example, absolute paths or paths with ".." components). When handling
> untrusted archives, consider resolving filenames using `os.path.abspath()`
> and checking against the target directory with `os.path.commonpath()`.

Path objects expose the following features of `pathlib.Path`
objects:

Path objects are traversable using the `/` operator or `joinpath`.

### `Path.name`

The final path component.

### `Path.open(mode='<example-value>', *, pwd, **)`

Invoke `ZipFile.open()` on the current path.
Allows opening for read or write, text or binary
through supported modes: 'r', 'w', 'rb', 'wb'.
Positional and keyword arguments are passed through to
`io.TextIOWrapper` when opened as text and
ignored otherwise.
`pwd` is the `pwd` parameter to
`ZipFile.open()`.

> *Changed in version 3.9.*
> Added support for text and binary modes for open. Default
> mode is now text.

> *Changed in version 3.11.2.*
> The `encoding` parameter can be supplied as a positional argument
> without causing a `TypeError`. As it could in 3.9. Code needing to
> be compatible with unpatched 3.10 and 3.11 versions must pass all
> `io.TextIOWrapper` arguments, `encoding` included, as keywords.

### `Path.iterdir()`

Enumerate the children of the current directory.

### `Path.is_dir()`

Return `True` if the current context references a directory.

### `Path.is_file()`

Return `True` if the current context references a file.

### `Path.is_symlink()`

Return `True` if the current context references a symbolic link.

> *Added in version 3.12.*

> *Changed in version 3.13.*
> Previously, `is_symlink` would unconditionally return `False`.

### `Path.exists()`

Return `True` if the current context references a file or
directory in the zip file.

### `Path.suffix`

The last dot-separated portion of the final component, if any.
This is commonly called the file extension.

> *Added in version 3.11.*
> Added `Path.suffix` property.

### `Path.stem`

The final path component, without its suffix.

> *Added in version 3.11.*
> Added `Path.stem` property.

### `Path.suffixes`

A list of the path’s suffixes, commonly called file extensions.

> *Added in version 3.11.*
> Added `Path.suffixes` property.

### `Path.read_text(*, **)`

Read the current file as unicode text. Positional and
keyword arguments are passed through to
`io.TextIOWrapper` (except `buffer`, which is
implied by the context).

> *Changed in version 3.11.2.*
> The `encoding` parameter can be supplied as a positional argument
> without causing a `TypeError`. As it could in 3.9. Code needing to
> be compatible with unpatched 3.10 and 3.11 versions must pass all
> `io.TextIOWrapper` arguments, `encoding` included, as keywords.

### `Path.read_bytes()`

Read the current file as bytes.

### `Path.joinpath(*other)`

Return a new Path object with each of the *other* arguments
joined. The following are equivalent:

```python
>>> Path(...).joinpath('child').joinpath('grandchild')
>>> Path(...).joinpath('child', 'grandchild')
>>> Path(...) / 'child' / 'grandchild'
```

> *Changed in version 3.10.*
> Prior to 3.10, `joinpath` was undocumented and accepted
> exactly one parameter.

The zipp project provides backports
of the latest path object functionality to older Pythons. Use
`zipp.Path` in place of `zipfile.Path` for early access to
changes.

## PyZipFile objects

The `PyZipFile` constructor takes the same parameters as the
`ZipFile` constructor, and one additional parameter, *optimize*.

### class `PyZipFile(file, mode='r', compression=ZIP_STORED, allowZip64=True, \`

```python
optimize=-1)
```

> *Changed in version 3.2.*
> Added the *optimize* parameter.

> *Changed in version 3.4.*
> ZIP64 extensions are enabled by default.

Instances have one method in addition to those of `ZipFile` objects:

### `PyZipFile.writepy(pathname, basename='', filterfunc=None)`

Search for files `*.py` and add the corresponding file to the
archive.

If the *optimize* parameter to `PyZipFile` was not given or `-1`,
the corresponding file is a `*.pyc` file, compiling if necessary.

If the *optimize* parameter to `PyZipFile` was `0`, `1` or
`2`, only files with that optimization level (see `compile()`) are
added to the archive, compiling if necessary.

If *pathname* is a file, the filename must end with `.py`, and
just the (corresponding `*.pyc`) file is added at the top level
(no path information).  If *pathname* is a file that does not end with
`.py`, a `RuntimeError` will be raised.  If it is a directory,
and the directory is not a package directory, then all the files
`*.pyc` are added at the top level.  If the directory is a
package directory, then all `*.pyc` are added under the package
name as a file path, and if any subdirectories are package directories,
all of these are added recursively in sorted order.

*basename* is intended for internal use only.

*filterfunc*, if given, must be a function taking a single string
argument.  It will be passed each path (including each individual full
file path) before it is added to the archive.  If *filterfunc* returns a
false value, the path will not be added, and if it is a directory its
contents will be ignored.  For example, if our test files are all either
in `test` directories or start with the string `test_`, we can use a
*filterfunc* to exclude them:

```
>>> zf = PyZipFile('myprog.zip')
>>> def notests(s):
...     fn = os.path.basename(s)
...     return (not (fn == 'test' or fn.startswith('test_')))
...
>>> zf.writepy('myprog', filterfunc=notests)
```

The `writepy()` method makes archives with file names like
this:

```
string.pyc                   # Top level name
test/__init__.pyc            # Package directory
test/testall.pyc             # Module test.testall
test/bogus/__init__.pyc      # Subpackage directory
test/bogus/myfile.pyc        # Submodule test.bogus.myfile
```

> *Changed in version 3.4.*
> Added the *filterfunc* parameter.

> *Changed in version 3.6.2.*
> The *pathname* parameter accepts a path-like object.

> *Changed in version 3.7.*
> Recursion sorts directory entries.

## ZipInfo objects

Instances of the `ZipInfo` class are returned by the `.getinfo()` and
`.infolist()` methods of `ZipFile` objects.  Each object stores
information about a single member of the ZIP archive.

There is one classmethod to make a `ZipInfo` instance for a filesystem
file:

### classmethod `ZipInfo.from_file(filename, arcname=None, *, \`

```python
strict_timestamps=True)
```

Construct a `ZipInfo` instance for a file on the filesystem, in
preparation for adding it to a zip file.

*filename* should be the path to a file or directory on the filesystem.

If *arcname* is specified, it is used as the name within the archive.
If *arcname* is not specified, the name will be the same as *filename*, but
with any drive letter and leading path separators removed.

The *strict_timestamps* argument, when set to `False`, allows to
zip files older than 1980-01-01 at the cost of setting the
timestamp to 1980-01-01.
Similar behavior occurs with files newer than 2107-12-31,
the timestamp is also set to the limit.

> *Added in version 3.6.*

> *Changed in version 3.6.2.*
> The *filename* parameter accepts a path-like object.

> *Changed in version 3.8.*
> Added the *strict_timestamps* keyword-only parameter.

Instances have the following methods and attributes:

### `ZipInfo.is_dir()`

Return `True` if this archive member is a directory.

This uses the entry's name: directories should always end with `/`.

> *Added in version 3.6.*

### `ZipInfo.filename`

Name of the file in the archive.

### `ZipInfo.date_time`

The time and date of the last modification to the archive member.  This is a
tuple of six values representing the "last [modified] file time" and "last [modified] file date"
fields from the ZIP file's central directory.

The tuple contains:

```text
+-------+--------------------------+
| Index | Value                    |
+=======+==========================+
| ``0`` | Year (>= 1980)           |
+-------+--------------------------+
| ``1`` | Month (one-based)        |
+-------+--------------------------+
| ``2`` | Day of month (one-based) |
+-------+--------------------------+
| ``3`` | Hours (zero-based)       |
+-------+--------------------------+
| ``4`` | Minutes (zero-based)     |
+-------+--------------------------+
| ``5`` | Seconds (zero-based)     |
+-------+--------------------------+
```

> **Note:** The ZIP format supports multiple timestamp fields in different locations
> (central directory, extra fields for NTFS/UNIX systems, etc.). This attribute
> specifically returns the timestamp from the central directory. The central
> directory timestamp format in ZIP files does not support timestamps before
> 1980. While some extra field formats (such as UNIX timestamps) can represent
> earlier dates, this attribute only returns the central directory timestamp.
>
> The central directory timestamp is interpreted as representing local
> time, rather than UTC time, to match the behavior of other zip tools.

### `ZipInfo.compress_type`

Type of compression for the archive member.

### `ZipInfo.comment`

Comment for the individual archive member as a `bytes` object.

### `ZipInfo.extra`

Expansion field data.  The PKZIP Application Note contains
some comments on the internal structure of the data contained in this
`bytes` object.

### `ZipInfo.create_system`

System which created ZIP archive.

### `ZipInfo.create_version`

PKZIP version which created ZIP archive.

### `ZipInfo.extract_version`

PKZIP version needed to extract archive.

### `ZipInfo.reserved`

Must be zero.

### `ZipInfo.flag_bits`

ZIP flag bits.

### `ZipInfo.volume`

Volume number of file header.

### `ZipInfo.internal_attr`

Internal attributes.

### `ZipInfo.external_attr`

External file attributes.

### `ZipInfo.header_offset`

Byte offset to the file header.

### `ZipInfo.CRC`

CRC-32 of the uncompressed file.

### `ZipInfo.compress_size`

Size of the compressed data.

### `ZipInfo.file_size`

Size of the uncompressed file.

zipfile

## Command-line interface

The `zipfile` module provides a simple command-line interface to interact
with ZIP archives.

If you want to create a new ZIP archive, specify its name after the `-c`
option and then list the filename(s) that should be included:

```shell-session
$ python -m zipfile -c monty.zip spam.txt eggs.txt
```

Passing a directory is also acceptable:

```shell-session
$ python -m zipfile -c monty.zip life-of-brian_1979/
```

If you want to extract a ZIP archive into the specified directory, use
the `-e` option:

```shell-session
$ python -m zipfile -e monty.zip target-dir/
```

For a list of the files in a ZIP archive, use the `-l` option:

```shell-session
$ python -m zipfile -l monty.zip
```

### option `-l <zipfile>`

```python
--list <zipfile>
```

List files in a zipfile.

### option `-c <zipfile> <source1> ... <sourceN>`

```python
--create <zipfile> <source1> ... <sourceN>
```

Create zipfile from source files.

### option `-e <zipfile> <output_dir>`

```python
--extract <zipfile> <output_dir>
```

Extract zipfile into target directory.

### option `-t <zipfile>`

```python
--test <zipfile>
```

Test whether the zipfile is valid or not.

### option `--metadata-encoding <encoding>`

Specify encoding of member names for `-l`, `-e` and
`-t`.

> *Added in version 3.11.*

## Decompression pitfalls

The extraction in zipfile module might fail due to some pitfalls listed below.

### From file itself

Decompression may fail due to incorrect password / CRC checksum / ZIP format or
unsupported compression method / decryption.

### File system limitations

Exceeding limitations on different file systems can cause decompression failed.
Such as allowable characters in the directory entries, length of the file name,
length of the pathname, size of a single file, and number of files, etc.

### Resources limitations

The lack of memory or disk volume would lead to decompression
failed. For example, decompression bombs (aka ZIP bomb)
apply to zipfile library that can cause disk volume exhaustion.

### Interruption

Interruption during the decompression, such as pressing control-C or killing the
decompression process may result in incomplete decompression of the archive.

### Default behaviors of extraction

Not knowing the default extraction behaviors
can cause unexpected decompression results.
For example, when extracting the same archive twice,
it overwrites files without asking.
