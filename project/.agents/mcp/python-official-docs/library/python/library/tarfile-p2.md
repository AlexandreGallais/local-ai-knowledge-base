---
title: "tarfile --- Read and write tar archive files (part 2 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tarfile.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tarfile --- Read and write tar archive files (part 2 of 4)

## TarFile Objects

The `TarFile` object provides an interface to a tar archive. A tar
archive is a sequence of blocks. An archive member (a stored file) is made up of
a header block followed by data blocks. It is possible to store a file in a tar
archive several times. Each archive member is represented by a `TarInfo`
object, see tarinfo-objects for details.

A `TarFile` object can be used as a context manager in a `with`
statement. It will automatically be closed when the block is completed. Please
note that in the event of an exception an archive opened for writing will not
be finalized; only the internally used file object will be closed. See the
tar-examples section for a use case.

> *Added in version 3.2.*
> Added support for the context management protocol.

### class `TarFile(name=None, mode='r', fileobj=None, format=DEFAULT_FORMAT, tarinfo=TarInfo, dereference=False, ignore_zeros=False, encoding=ENCODING, errors='surrogateescape', pax_headers=None, debug=0, errorlevel=1, stream=False)`

All following arguments are optional and can be accessed as instance attributes
as well.

*name* is the pathname of the archive. *name* may be a path-like object.
It can be omitted if *fileobj* is given.
In this case, the file object's `name` attribute is used if it exists.

*mode* is either `'r'` to read from an existing archive, `'a'` to append
data to an existing file, `'w'` to create a new file overwriting an existing
one, or `'x'` to create a new file only if it does not already exist.

If *fileobj* is given, it is used for reading or writing data. If it can be
determined, *mode* is overridden by *fileobj*'s mode. *fileobj* will be used
from position 0.

> **Note:** *fileobj* is not closed, when `TarFile` is closed.

*format* controls the archive format for writing. It must be one of the constants
`USTAR_FORMAT`, `GNU_FORMAT` or `PAX_FORMAT` that are
defined at module level. When reading, format will be automatically detected, even
if different formats are present in a single archive.

The *tarinfo* argument can be used to replace the default `TarInfo` class
with a different one.

If *dereference* is `False`, add symbolic and hard links to the archive. If it
is `True`, add the content of the target files to the archive. This has no
effect on systems that do not support symbolic links.

If *ignore_zeros* is `False`, treat an empty block as the end of the archive.
If it is `True`, skip empty (and invalid) blocks and try to get as many members
as possible. This is only useful for reading concatenated or damaged archives.

*debug* can be set from `0` (no debug messages) up to `3` (all debug
messages). The messages are written to `sys.stderr`.

*errorlevel* controls how extraction errors are handled,
see `the corresponding attribute`.

The *encoding* and *errors* arguments define the character encoding to be
used for reading or writing the archive and how conversion errors are going
to be handled. The default settings will work for most users.
See section tar-unicode for in-depth information.

The *pax_headers* argument is an optional dictionary of strings which
will be added as a pax global header if *format* is `PAX_FORMAT`.

If *stream* is set to `True` then while reading the archive info about files
in the archive are not cached, saving memory.

> *Changed in version 3.2.*
> Use `'surrogateescape'` as the default for the *errors* argument.

> *Changed in version 3.5.*
> The `'x'` (exclusive creation) mode was added.

> *Changed in version 3.6.*
> The *name* parameter accepts a path-like object.

> *Changed in version 3.13.*
> Add the *stream* parameter.

### classmethod `TarFile.open(...)`

Alternative constructor. The `tarfile.open()` function is actually a
shortcut to this classmethod.

### `TarFile.getmember(name)`

Return a `TarInfo` object for member *name*. If *name* can not be found
in the archive, `KeyError` is raised.

> **Note:** If a member occurs more than once in the archive, its last occurrence is assumed
> to be the most up-to-date version.

### `TarFile.getmembers()`

Return the members of the archive as a list of `TarInfo` objects. The
list has the same order as the members in the archive.

### `TarFile.getnames()`

Return the members as a list of their names. It has the same order as the list
returned by `getmembers()`.

### `TarFile.list(verbose=True, *, members=None)`

Print a table of contents to `sys.stdout`. If *verbose* is `False`,
only the names of the members are printed. If it is `True`, output
similar to that of `ls -l` is produced. If optional *members* is
given, it must be a subset of the list returned by `getmembers()`.

> *Changed in version 3.5.*
> Added the *members* parameter.

### `TarFile.next()`

Return the next member of the archive as a `TarInfo` object, when
`TarFile` is opened for reading. Return `None` if there is no more
available.

### `TarFile.extractall(path=".", members=None, *, numeric_owner=False, filter=None)`

Extract all members from the archive to the current working directory or
directory *path*. If optional *members* is given, it must be a subset of the
list returned by `getmembers()`. Directory information like owner,
modification time and permissions are set after all members have been extracted.
This is done to work around two problems: A directory's modification time is
reset each time a file is created in it. And, if a directory's permissions do
not allow writing, extracting files to it will fail.

If *numeric_owner* is `True`, the uid and gid numbers from the tarfile
are used to set the owner/group for the extracted files. Otherwise, the named
values from the tarfile are used.

The *filter* argument specifies how `members` are modified or rejected
before extraction.
See tarfile-extraction-filter for details.
It is recommended to set this explicitly only if specific *tar* features
are required, or as `filter='data'` to support Python versions with a less
secure default (3.13 and lower).

> **Warning:** Never extract archives from untrusted sources without prior inspection.
>
> Since Python 3.14, the default (`data()`) will prevent
> the most dangerous security issues.
> However, it will not prevent *all* unintended or insecure behavior.
> Read the tarfile-extraction-filter section for details.

> *Changed in version 3.5.*
> Added the *numeric_owner* parameter.

> *Changed in version 3.6.*
> The *path* parameter accepts a path-like object.

> *Changed in version 3.12.*
> Added the *filter* parameter.

> *Changed in version 3.14.*
> The *filter* parameter now defaults to `'data'`.

### `TarFile.extract(member, path="", set_attrs=True, *, numeric_owner=False, filter=None)`

Extract a member from the archive to the current working directory, using its
full name. Its file information is extracted as accurately as possible. *member*
may be a filename or a `TarInfo` object. You can specify a different
directory using *path*. *path* may be a path-like object.
File attributes (owner, mtime, mode) are set unless *set_attrs* is false.

The *numeric_owner* and *filter* arguments are the same as
for `extractall()`.

> **Note:** The `extract()` method does not take care of several extraction issues.
> In most cases you should consider using the `extractall()` method.

> **Warning:** Never extract archives from untrusted sources without prior inspection.
> See the warning for `extractall()` for details.

> *Changed in version 3.2.*
> Added the *set_attrs* parameter.

> *Changed in version 3.5.*
> Added the *numeric_owner* parameter.

> *Changed in version 3.6.*
> The *path* parameter accepts a path-like object.

> *Changed in version 3.12.*
> Added the *filter* parameter.

### `TarFile.extractfile(member)`

Extract a member from the archive as a file object. *member* may be
a filename or a `TarInfo` object. If *member* is a regular file or
a link, an `io.BufferedReader` object is returned. For all other
existing members, `None` is returned. If *member* does not appear
in the archive, `KeyError` is raised.

> *Changed in version 3.3.*
> Return an `io.BufferedReader` object.

> *Changed in version 3.13.*
> The returned `io.BufferedReader` object has the `mode`
> attribute which is always equal to `'rb'`.

### `TarFile.errorlevel`

If *errorlevel* is `0`, errors are ignored when using `TarFile.extract()`
and `TarFile.extractall()`.
Nevertheless, they appear as error messages in the debug output when
*debug* is greater than 0.
If `1` (the default), all *fatal* errors are raised as `OSError` or
`FilterError` exceptions. If `2`, all *non-fatal* errors are raised
as `TarError` exceptions as well.

Some exceptions, e.g. ones caused by wrong argument types or data
corruption, are always raised.

Custom extraction filters
should raise `FilterError` for *fatal* errors
and `ExtractError` for *non-fatal* ones.

Note that when an exception is raised, the archive may be partially
extracted. It is the user’s responsibility to clean up.

### `TarFile.extraction_filter`

> *Added in version 3.12.*

The extraction filter used
as a default for the *filter* argument of `extract()`
and `extractall()`.

The attribute may be `None` or a callable.
String names are not allowed for this attribute, unlike the *filter*
argument to `extract()`.

If `extraction_filter` is `None` (the default), extraction methods
will use the `data()` filter by default.

The attribute may be set on instances or overridden in subclasses.
It also is possible to set it on the `TarFile` class itself to set a
global default, although, since it affects all uses of *tarfile*,
it is best practice to only do so in top-level applications or
`site configuration`.
To set a global default this way, a filter function needs to be wrapped in
staticmethod to prevent injection of a `self` argument.

> *Changed in version 3.14.*
> The default filter is set to `data()`,
> which disallows some dangerous features such as links to absolute paths
> or paths outside of the destination.
> Previously, the default was equivalent to
> `fully_trusted()`.

### `TarFile.add(name, arcname=None, recursive=True, *, filter=None)`

Add the file *name* to the archive. *name* may be any type of file
(directory, fifo, symbolic link, etc.). If given, *arcname* specifies an
alternative name for the file in the archive. Directories are added
recursively by default. This can be avoided by setting *recursive* to
`False`. Recursion adds entries in sorted order.
If *filter* is given, it
should be a function that takes a `TarInfo` object argument and
returns the changed `TarInfo` object. If it instead returns
`None` the `TarInfo` object will be excluded from the
archive. See tar-examples for an example.

> *Changed in version 3.2.*
> Added the *filter* parameter.

> *Changed in version 3.7.*
> Recursion adds entries in sorted order.

### `TarFile.addfile(tarinfo, fileobj=None)`

Add the `TarInfo` object *tarinfo* to the archive. If *tarinfo* represents
a non zero-size regular file, the *fileobj* argument should be a binary file,
and `tarinfo.size` bytes are read from it and added to the archive.  You can
create `TarInfo` objects directly, or by using `gettarinfo()`.

> *Changed in version 3.13.*
> *fileobj* must be given for non-zero-sized regular files.

### `TarFile.gettarinfo(name=None, arcname=None, fileobj=None)`

Create a `TarInfo` object from the result of `os.stat()` or
equivalent on an existing file.  The file is either named by *name*, or
specified as a file object *fileobj* with a file descriptor.
*name* may be a path-like object.  If
given, *arcname* specifies an alternative name for the file in the
archive, otherwise, the name is taken from *fileobj*’s
`name` attribute, or the *name* argument.  The name
should be a text string.

You can modify
some of the `TarInfo`’s attributes before you add it using `addfile()`.
If the file object is not an ordinary file object positioned at the
beginning of the file, attributes such as `size` may need
modifying.  This is the case for objects such as `GzipFile`.
The `name` may also be modified, in which case *arcname*
could be a dummy string.

> *Changed in version 3.6.*
> The *name* parameter accepts a path-like object.

### `TarFile.close()`

Close the `TarFile`. In write mode, two finishing zero blocks are
appended to the archive.

### `TarFile.pax_headers`

A dictionary containing key-value pairs of pax global headers.
