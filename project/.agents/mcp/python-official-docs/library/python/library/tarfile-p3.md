---
title: "tarfile --- Read and write tar archive files (part 3 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tarfile.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tarfile --- Read and write tar archive files (part 3 of 4)

## TarInfo Objects

A `TarInfo` object represents one member in a `TarFile`. Aside
from storing all required attributes of a file (like file type, size, time,
permissions, owner etc.), it provides some useful methods to determine its type.
It does *not* contain the file's data itself.

`TarInfo` objects are returned by `TarFile`'s methods
`getmember()`, `getmembers()` and
`gettarinfo()`.

Modifying the objects returned by `getmember()` or
`getmembers()` will affect all subsequent
operations on the archive.
For cases where this is unwanted, you can use `copy.copy()` or
call the `replace()` method to create a modified copy in one step.

Several attributes can be set to `None` to indicate that a piece of metadata
is unused or unknown.
Different `TarInfo` methods handle `None` differently:

- The `extract()` or `extractall()` methods will
ignore the corresponding metadata, leaving it set to a default.
- `addfile()` will fail.
- `list()` will print a placeholder string.

### class `TarInfo(name="")`

Create a `TarInfo` object.

### classmethod `TarInfo.frombuf(buf, encoding, errors)`

Create and return a `TarInfo` object from string buffer *buf*.

Raises `HeaderError` if the buffer is invalid.

### classmethod `TarInfo.fromtarfile(tarfile)`

Read the next member from the `TarFile` object *tarfile* and return it as
a `TarInfo` object.

### `TarInfo.tobuf(format=DEFAULT_FORMAT, encoding=ENCODING, errors='surrogateescape')`

Create a string buffer from a `TarInfo` object. For information on the
arguments see the constructor of the `TarFile` class.

> *Changed in version 3.2.*
> Use `'surrogateescape'` as the default for the *errors* argument.

A `TarInfo` object has the following public data attributes:

### `TarInfo.name`

Name of the archive member.

### `TarInfo.size`

Size in bytes.

### `TarInfo.mtime`

Time of last modification in seconds since the epoch,
as in `os.stat_result.st_mtime`.

> *Changed in version 3.12.*
> Can be set to `None` for `extract()` and
> `extractall()`, causing extraction to skip applying this
> attribute.

### `TarInfo.mode`

Permission bits, as for `os.chmod()`.

> *Changed in version 3.12.*
> Can be set to `None` for `extract()` and
> `extractall()`, causing extraction to skip applying this
> attribute.

### `TarInfo.type`

File type.  *type* is usually one of these constants: `REGTYPE`,
`AREGTYPE`, `LNKTYPE`, `SYMTYPE`, `DIRTYPE`,
`FIFOTYPE`, `CONTTYPE`, `CHRTYPE`, `BLKTYPE`,
`GNUTYPE_SPARSE`.  To determine the type of a `TarInfo` object
more conveniently, use the `is*()` methods below.

### `TarInfo.linkname`

Name of the target file name, which is only present in `TarInfo` objects
of type `LNKTYPE` and `SYMTYPE`.

For symbolic links (`SYMTYPE`), the *linkname* is relative to the directory
that contains the link.
For hard links (`LNKTYPE`), the *linkname* is relative to the root of
the archive.

### `TarInfo.uid`

User ID of the user who originally stored this member.

> *Changed in version 3.12.*
> Can be set to `None` for `extract()` and
> `extractall()`, causing extraction to skip applying this
> attribute.

### `TarInfo.gid`

Group ID of the user who originally stored this member.

> *Changed in version 3.12.*
> Can be set to `None` for `extract()` and
> `extractall()`, causing extraction to skip applying this
> attribute.

### `TarInfo.uname`

User name.

> *Changed in version 3.12.*
> Can be set to `None` for `extract()` and
> `extractall()`, causing extraction to skip applying this
> attribute.

### `TarInfo.gname`

Group name.

> *Changed in version 3.12.*
> Can be set to `None` for `extract()` and
> `extractall()`, causing extraction to skip applying this
> attribute.

### `TarInfo.chksum`

Header checksum.

### `TarInfo.devmajor`

Device major number.

### `TarInfo.devminor`

Device minor number.

### `TarInfo.offset`

The tar header starts here.

### `TarInfo.offset_data`

The file's data starts here.

### `TarInfo.sparse`

Sparse member information.

### `TarInfo.pax_headers`

A dictionary containing key-value pairs of an associated pax extended header.

### `TarInfo.replace(name=..., mtime=..., mode=..., linkname=..., \`

```python
uid=..., gid=..., uname=..., gname=..., \
deep=True)
```

> *Added in version 3.12.*

Return a *new* copy of the `TarInfo` object with the given attributes
changed. For example, to return a `TarInfo` with the group name set to
`'staff'`, use:

```
new_tarinfo = old_tarinfo.replace(gname='staff')
```

By default, a deep copy is made.
If *deep* is false, the copy is shallow, i.e. `pax_headers`
and any custom attributes are shared with the original `TarInfo` object.

A `TarInfo` object also provides some convenient query methods:

### `TarInfo.isfile()`

Return `True` if the `TarInfo` object is a regular file.

### `TarInfo.isreg()`

Same as `isfile()`.

### `TarInfo.isdir()`

Return `True` if it is a directory.

### `TarInfo.issym()`

Return `True` if it is a symbolic link.

### `TarInfo.islnk()`

Return `True` if it is a hard link.

### `TarInfo.ischr()`

Return `True` if it is a character device.

### `TarInfo.isblk()`

Return `True` if it is a block device.

### `TarInfo.isfifo()`

Return `True` if it is a FIFO.

### `TarInfo.isdev()`

Return `True` if it is one of character device, block device or FIFO.

## Extraction filters

> *Added in version 3.12.*

The *tar* format is designed to capture all details of a UNIX-like filesystem,
which makes it very powerful.
Unfortunately, the features make it easy to create tar files that have
unintended -- and possibly malicious -- effects when extracted.
For example, extracting a tar file can overwrite arbitrary files in various
ways (e.g.  by using absolute paths, `..` path components, or symlinks that
affect later members).

In most cases, the full functionality is not needed.
Therefore, *tarfile* supports extraction filters: a mechanism to limit
functionality, and thus mitigate some of the security issues.

> **Warning:** None of the available filters blocks *all* dangerous archive features.
> Never extract archives from untrusted sources without prior inspection.
> See also tarfile-further-verification.

> **See also:** PEP 706
> Contains further motivation and rationale behind the design.

The *filter* argument to `TarFile.extract()` or `extractall()`
can be:

- the string `'fully_trusted'`: Honor all metadata as specified in the
archive.
Should be used if the user trusts the archive completely, or implements
their own complex verification.

- the string `'tar'`: Honor most *tar*-specific features (i.e. features of
UNIX-like filesystems), but block features that are very likely to be
surprising or malicious. See `tar_filter()` for details.

- the string `'data'`: Ignore or block most features specific to UNIX-like
filesystems. Intended for extracting cross-platform data archives.
See `data_filter()` for details.

- `None` (default): Use `TarFile.extraction_filter`.

If that is also `None` (the default), the `'data'` filter will be used.

> *Changed in version 3.14.*
> The default filter is set to `data()`.
> Previously, the default was equivalent to
> `fully_trusted()`.

- A callable which will be called for each extracted member with a
TarInfo describing the member and the destination
path to where the archive is extracted (i.e. the same path is used for all
members):

```
filter(member: TarInfo, path: str, /) -> TarInfo | None
```

The callable is called just before each member is extracted, so it can
take the current state of the disk into account.
It can:

- return a `TarInfo` object which will be used instead of the metadata
in the archive, or
- return `None`, in which case the member will be skipped, or
- raise an exception to abort the operation or skip the member,
depending on `errorlevel`.
Note that when extraction is aborted, `extractall()` may leave
the archive partially extracted. It does not attempt to clean up.

### Default named filters

The pre-defined, named filters are available as functions, so they can be
reused in custom filters:

### `fully_trusted_filter(member, path)`

Return *member* unchanged.

This implements the `'fully_trusted'` filter.

### `tar_filter(member, path)`

Implements the `'tar'` filter.

- Strip leading slashes (`/` and `os.sep`) from filenames.
- Refuse to extract files with absolute
paths (in case the name is absolute
even after stripping slashes, e.g. `C:/foo` on Windows).
This raises `AbsolutePathError`.
- Normalize filenames (`TarInfo.name`) that contain `..` components
using `os.path.normpath()`.
Note that this removes internal `..` components, which may change the
meaning of the name if it traverses symbolic links.
- Refuse to extract files whose absolute
path (after following symlinks) would end up outside the destination.
This raises `OutsideDestinationError`.
- Refuse to extract links (hard or soft)
whose name refers to the destination directory itself.
This raises `OutsideDestinationError`.
Note that such files are refused even on platforms that do not support
symbolic links.
- Clear high mode bits (setuid, setgid, sticky) and group/other write bits
(`S_IWGRP` | `S_IWOTH`).

Return the modified `TarInfo` member.

> *Changed in version 3.15.*
> Filenames containing `..` components are now normalized.

### `data_filter(member, path)`

Implements the `'data'` filter.
In addition to what `tar_filter` does:

- Normalize link targets (`TarInfo.linkname`) using
`os.path.normpath()`.
Note that this removes internal `..` components, which may change the
meaning of the link if the path in `TarInfo.linkname` traverses
symbolic links.

- Refuse to extract links (hard or soft)
that link to absolute paths, or ones that link outside the destination.

This raises `AbsoluteLinkError` or
`LinkOutsideDestinationError`.

Note that such files are refused even on platforms that do not support
symbolic links.

- Refuse to extract device files
(including pipes).
This raises `SpecialFileError`.

- For regular files, including hard links:

- Set the owner read and write permissions
(`S_IRUSR` | `S_IWUSR`).
- Remove the group & other executable permission
(`S_IXGRP` | `S_IXOTH`)
if the owner doesn’t have it (`S_IXUSR`).

- For other files (directories), set `mode` to `None`, so
that extraction methods skip applying permission bits.
- Set user and group info (`uid`, `gid`, `uname`, `gname`)
to `None`, so that extraction methods skip setting it.

Return the modified `TarInfo` member.

Note that this filter does not block *all* dangerous archive features.
See tarfile-further-verification  for details.

> *Changed in version 3.15.*
> Link targets are now normalized.

### Filter errors

When a filter refuses to extract a file, it will raise an appropriate exception,
a subclass of `FilterError`.
This will abort the extraction if `TarFile.errorlevel` is 1 or more.
With `errorlevel=0` the error will be logged and the member will be skipped,
but extraction will continue.

### Hints for further verification

Even with `filter='data'`, *tarfile* is not suited for extracting untrusted
files without prior inspection.
Among other issues, the pre-defined filters do not prevent denial-of-service
attacks. Users should do additional checks.

Here is an incomplete list of things to consider:

- Extract to a `new temporary directory()`
to prevent e.g. exploiting pre-existing links, and to make it easier to
clean up after a failed extraction.
- Disallow symbolic links if you do not need the functionality.
- When working with untrusted data, use external (e.g. OS-level) limits on
disk, memory and CPU usage.
- Check filenames against an allow-list of characters
(to filter out control characters, confusables, foreign path separators,
and so on).
- Check that filenames have expected extensions (discouraging files that
execute when you “click on them”, or extension-less files like Windows
special device names).
- Limit the number of extracted files, total size of extracted data,
filename length (including symlink length), and size of individual files.
- Check for files that would be shadowed on case-insensitive filesystems.

Also note that:

- Tar files may contain multiple versions of the same file.
Later ones are expected to overwrite any earlier ones.
This feature is crucial to allow updating tape archives, but can be abused
maliciously.
- *tarfile* does not protect against issues with “live” data,
e.g. an attacker tinkering with the destination (or source) directory while
extraction (or archiving) is in progress.

### Supporting older Python versions

Extraction filters were added to Python 3.12, but may be backported to older
versions as security updates.
To check whether the feature is available, use e.g.
`hasattr(tarfile, 'data_filter')` rather than checking the Python version.

The following examples show how to support Python versions with and without
the feature.
Note that setting `extraction_filter` will affect any subsequent operations.

- Fully trusted archive::

my_tarfile.extraction_filter = (lambda member, path: member)
my_tarfile.extractall()

- Use the `'data'` filter if available, but revert to Python 3.11 behavior
(`'fully_trusted'`) if this feature is not available:

```
my_tarfile.extraction_filter = getattr(tarfile, 'data_filter',
                                       (lambda member, path: member))
my_tarfile.extractall()
```

- Use the `'data'` filter; *fail* if it is not available::

my_tarfile.extractall(filter=tarfile.data_filter)

or:

```
my_tarfile.extraction_filter = tarfile.data_filter
my_tarfile.extractall()
```

- Use the `'data'` filter; *warn* if it is not available::

if hasattr(tarfile, 'data_filter'):
my_tarfile.extractall(filter='data')
else:
# remove this when no longer needed
warn_the_user('Extracting may be unsafe; consider updating Python')
my_tarfile.extractall()

### Stateful extraction filter example

While *tarfile*'s extraction methods take a simple *filter* callable,
custom filters may be more complex objects with an internal state.
It may be useful to write these as context managers, to be used like this:

```
with StatefulFilter() as filter_func:
    tar.extractall(path, filter=filter_func)
```

Such a filter can be written as, for example:

```
class StatefulFilter:
    def __init__(self):
        self.file_count = 0

    def __enter__(self):
        return self

    def __call__(self, member, path):
        self.file_count += 1
        return member

    def __exit__(self, *exc_info):
        print(f'{self.file_count} files extracted')
```

tarfile
