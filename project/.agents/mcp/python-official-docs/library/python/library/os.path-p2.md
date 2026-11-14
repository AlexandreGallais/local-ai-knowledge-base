---
title: "os.path --- Common pathname manipulations (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/os.path.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# os.path --- Common pathname manipulations (part 2 of 2)

### `realpath(path, /, *, strict=False)`

Return the canonical path of the specified filename, eliminating any symbolic
links encountered in the path (if they are supported by the operating
system). On Windows, this function will also resolve MS-DOS (also called 8.3)
style names such as `C:\PROGRA~1` to `C:\Program Files`.
The returned path uses the case reported by the operating system,
which can differ from the case of *path*,
in particular the drive letter is capitalized.

By default, the path is evaluated up to the first component that does not
exist, is a symlink loop, or whose evaluation raises `OSError`.
All such components are appended unchanged to the existing part of the path.

Some errors that are handled this way include "access denied", "not a
directory", or "bad argument to internal function". Thus, the
resulting path may be missing or inaccessible, may still contain
links or loops, and may traverse non-directories.

This behavior can be modified by keyword arguments:

If *strict* is `True`, the first error encountered when evaluating the path is
re-raised.
In particular, `FileNotFoundError` is raised if *path* does not exist,
or another `OSError` if it is otherwise inaccessible.
If *strict* is `ALL_BUT_LAST`, the last component of the path
is allowed to be missing, but all other errors are raised.

If *strict* is `os.path.ALLOW_MISSING`, errors other than
`FileNotFoundError` are re-raised (as with `strict=True`).
Thus, the returned path will not contain any symbolic links, but the named
file and some of its parent directories may be missing.

> **Note:** This function emulates the operating system's procedure for making a path
> canonical, which differs slightly between Windows and UNIX with respect
> to how links and subsequent path components interact.
>
> Operating system APIs make paths canonical as needed, so it's not
> normally necessary to call this function.

> *Changed in version 3.6.*
> Accepts a path-like object.

> *Changed in version 3.8.*
> Symbolic links and junctions are now resolved on Windows.

> *Changed in version 3.10.*
> The *strict* parameter was added.

> *Changed in version 3.15.*
> The `ALL_BUT_LAST` and `ALLOW_MISSING` values for
> the *strict* parameter was added.

### `ALL_BUT_LAST`

Special value used for the *strict* argument in `realpath()`.

> *Added in version 3.15.*

### `ALLOW_MISSING`

Special value used for the *strict* argument in `realpath()`.

> *Added in version 3.15.*

### `relpath(path, start=os.curdir)`

Return a relative filepath to *path* either from the current directory or
from an optional *start* directory.  This is a path computation:  the
filesystem is not accessed to confirm the existence or nature of *path* or
*start*.  On Windows, `ValueError` is raised when *path* and *start*
are on different drives.

*start* defaults to `os.curdir`.

> *Changed in version 3.6.*
> Accepts a path-like object.

### `samefile(path1, path2, /)`

Return `True` if both pathname arguments refer to the same file or directory.
This is determined by the device number and i-node number and raises an
exception if an `os.stat()` call on either pathname fails.

> *Changed in version 3.2.*
> Added Windows support.

> *Changed in version 3.4.*
> Windows now uses the same implementation as all other platforms.

> *Changed in version 3.6.*
> Accepts a path-like object.

### `sameopenfile(fp1, fp2)`

Return `True` if the file descriptors *fp1* and *fp2* refer to the same file.

> *Changed in version 3.2.*
> Added Windows support.

> *Changed in version 3.6.*
> Accepts a path-like object.

### `samestat(stat1, stat2, /)`

Return `True` if the stat tuples *stat1* and *stat2* refer to the same file.
These structures may have been returned by `os.fstat()`,
`os.lstat()`, or `os.stat()`.  This function implements the
underlying comparison used by `samefile()` and `sameopenfile()`.

> *Changed in version 3.4.*
> Added Windows support.

### `split(path, /)`

Split the pathname *path* into a pair, `(head, tail)` where *tail* is the
last pathname component and *head* is everything leading up to that.  The
*tail* part will never contain a slash; if *path* ends in a slash, *tail*
will be empty.  If there is no slash in *path*, *head* will be empty.  If
*path* is empty, both *head* and *tail* are empty.  Trailing slashes are
stripped from *head* unless it is the root (one or more slashes only).  In
all cases, `join(head, tail)` returns a path to the same location as *path*
(but the strings may differ).  Also see the functions `join()`,
`dirname()` and `basename()`.

> *Changed in version 3.6.*
> Accepts a path-like object.

### `splitdrive(path, /)`

Split the pathname *path* into a pair `(drive, tail)` where *drive* is either
a mount point or the empty string.  On systems which do not use drive
specifications, *drive* will always be the empty string.  In all cases, ``drive
+ tail`` will be the same as *path*.

On Windows, splits a pathname into drive/UNC sharepoint and relative path.

If the path contains a drive letter, drive will contain everything
up to and including the colon:

```
>>> splitdrive("c:/dir")
("c:", "/dir")
```

If the path contains a UNC path, drive will contain the host name
and share:

```
>>> splitdrive("//host/computer/dir")
("//host/computer", "/dir")
```

> *Changed in version 3.6.*
> Accepts a path-like object.

### `splitroot(path, /)`

Split the pathname *path* into a 3-item tuple `(drive, root, tail)` where
*drive* is a device name or mount point, *root* is a string of separators
after the drive, and *tail* is everything after the root. Any of these
items may be the empty string. In all cases, `drive + root + tail` will
be the same as *path*.

On POSIX systems, *drive* is always empty. The *root* may be empty (if *path* is
relative), a single forward slash (if *path* is absolute), or two forward slashes
(implementation-defined per `IEEE Std 1003.1-2017; 4.13 Pathname Resolution
<https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap04.html#tag_04_13>`_.)
For example:

```
>>> splitroot('/home/sam')
('', '/', 'home/sam')
>>> splitroot('//home/sam')
('', '//', 'home/sam')
>>> splitroot('///home/sam')
('', '/', '//home/sam')
```

On Windows, *drive* may be empty, a drive-letter name, a UNC share, or a device
name. The *root* may be empty, a forward slash, or a backward slash. For
example:

```
>>> splitroot('C:/Users/Sam')
('C:', '/', 'Users/Sam')
>>> splitroot('//Server/Share/Users/Sam')
('//Server/Share', '/', 'Users/Sam')
```

> *Added in version 3.12.*

### `splitext(path, /)`

Split the pathname *path* into a pair `(root, ext)`  such that ``root + ext ==
path``, and the extension, *ext*, is empty or begins with a period and contains at
most one period.

If the path contains no extension, *ext* will be `''`:

```
>>> splitext('bar')
('bar', '')
```

If the path contains an extension, then *ext* will be set to this extension,
including the leading period. Note that previous periods will be ignored:

```
>>> splitext('foo.bar.exe')
('foo.bar', '.exe')
>>> splitext('/foo/bar.exe')
('/foo/bar', '.exe')
```

Leading periods of the last component of the path are considered to
be part of the root:

```
>>> splitext('.cshrc')
('.cshrc', '')
>>> splitext('/foo/....jpg')
('/foo/....jpg', '')
```

> *Changed in version 3.6.*
> Accepts a path-like object.

### `supports_unicode_filenames`

`True` if arbitrary Unicode strings can be used as file names (within limitations
imposed by the file system).
