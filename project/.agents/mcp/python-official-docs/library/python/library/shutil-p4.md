---
title: "shutil --- High-level file operations (part 4 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/shutil.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# shutil --- High-level file operations (part 4 of 4)

## Archiving operations

> *Added in version 3.2.*

> *Changed in version 3.5.*
> Added support for the *xztar* format.

High-level utilities to create and read compressed and archived files are also
provided.  They rely on the `zipfile` and `tarfile` modules.

### `make_archive(base_name, format, [root_dir, [base_dir, [verbose, [dry_run, [owner, [group, [logger]]]]]]])`

Create an archive file (such as zip or tar) and return its name.

*base_name* is a string or path-like object specifying the name of
the file to create, including the path, minus any format-specific extension.

*format* is the archive format: one of
"zip" (if the `zlib` module is available), "tar", "gztar" (if the
`zlib` module is available), "bztar" (if the `bz2` module is
available), "xztar" (if the `lzma` module is available), or "zstdtar"
(if the `compression.zstd` module is available).

*root_dir* is a string or path-like object specifying a directory
that will be the root directory of the archive, all paths in the archive
will be relative to it; for example, we typically chdir into *root_dir*
before creating the archive.

*base_dir* is a string or path-like object specifying a directory
where we start archiving from; i.e. *base_dir* will be the common prefix of
all files and directories in the archive.  *base_dir* must be given relative
to *root_dir*.  See shutil-archiving-example-with-basedir for how to
use *base_dir* and *root_dir* together.

*root_dir* and *base_dir* both default to the current directory.

If *dry_run* is true, no archive is created, but the operations that would be
executed are logged to *logger*.

*owner* and *group* are used when creating a tar archive. By default,
uses the current owner and group.

*logger* must be an object compatible with PEP 282, usually an instance of
`logging.Logger`.

The *verbose* argument is unused and deprecated.

> **Note:** This function is not thread-safe when custom archivers registered
> with `register_archive_format()` do not support the *root_dir*
> argument.  In this case it
> temporarily changes the current working directory of the process
> to *root_dir* to perform archiving.

> *Changed in version 3.8.*
> The modern pax (POSIX.1-2001) format is now used instead of
> the legacy GNU format for archives created with `format="tar"`.

> *Changed in version 3.10.6.*
> This function is now made thread-safe during creation of standard
> `.zip` and tar archives.

> *Changed in version 3.15.*
> Accepts a path-like object for *base_name*, *root_dir* and
> *base_dir*.

### `get_archive_formats()`

Return a list of supported formats for archiving.
Each element of the returned sequence is a tuple `(name, description)`.

By default `shutil` provides these formats:

- *zip*: ZIP file (if the `zlib` module is available).
- *tar*: Uncompressed tar file. Uses POSIX.1-2001 pax format for new archives.
- *gztar*: gzip'ed tar-file (if the `zlib` module is available).
- *bztar*: bzip2'ed tar-file (if the `bz2` module is available).
- *xztar*: xz'ed tar-file (if the `lzma` module is available).
- *zstdtar*: Zstandard compressed tar-file (if the `compression.zstd`
module is available).

You can register new formats or provide your own archiver for any existing
formats, by using `register_archive_format()`.

### `register_archive_format(name, function, [extra_args, [description]])`

Register an archiver for the format *name*.

*function* is the callable that will be used to create archives. The callable
will receive the *base_name* of the file to create, followed by the
*base_dir* (which defaults to `os.curdir`) to start archiving from.
Further arguments are passed as keyword arguments: *owner*, *group*,
*dry_run* and *logger* (as passed in `make_archive()`).

If *function* has the custom attribute `function.supports_root_dir` set to `True`,
the *root_dir* argument is passed as a keyword argument.
Otherwise the current working directory of the process is temporarily
changed to *root_dir* before calling *function*.
In this case `make_archive()` is not thread-safe.

If given, *extra_args* is a sequence of `(name, value)` pairs that will be
used as extra keywords arguments when the archiver callable is used.

*description* is used by `get_archive_formats()` which returns the
list of archivers.  Defaults to an empty string.

> *Changed in version 3.12.*
> Added support for functions supporting the *root_dir* argument.

### `unregister_archive_format(name)`

Remove the archive format *name* from the list of supported formats.

### `unpack_archive(filename[, extract_dir[, format[, filter]]])`

Unpack an archive. *filename* is the full path of the archive.

*extract_dir* is the name of the target directory where the archive is
unpacked. If not provided, the current working directory is used.

*format* is the archive format: one of "zip", "tar", "gztar", "bztar",
"xztar", or "zstdtar".  Or any other format registered with
`register_unpack_format()`.  If not provided, `unpack_archive()`
will use the archive file name extension and see if an unpacker was
registered for that extension.  In case none is found,
a `ValueError` is raised.

The keyword-only *filter* argument is passed to the underlying unpacking
function. For zip files, *filter* is not accepted.
For tar files, it is recommended to use `'data'` (default since Python
3.14), unless using features specific to tar and UNIX-like filesystems.
(See tarfile-extraction-filter for details.)

> **Warning:** Never extract archives from untrusted sources without prior inspection.
> It is possible that files are created outside of the path specified in
> the *extract_dir* argument, for example, members that have absolute filenames
> or filenames with ".." components.
>
> Since Python 3.14, the defaults for both built-in formats (zip and tar
> files) will prevent the most dangerous of such security issues,
> but will not prevent *all* unintended behavior.
> Read the tarfile-further-verification
> section for tar-specific details.

> *Changed in version 3.7.*
> Accepts a path-like object for *filename* and *extract_dir*.

> *Changed in version 3.12.*
> Added the *filter* argument.

### `register_unpack_format(name, extensions, function[, extra_args[, description]])`

Registers an unpack format. *name* is the name of the format and
*extensions* is a list of extensions corresponding to the format, like
`.zip` for Zip files.

*function* is the callable that will be used to unpack archives. The
callable will receive:

- the path of the archive, as a positional argument;
- the directory the archive must be extracted to, as a positional argument;
- possibly a *filter* keyword argument, if it was given to
`unpack_archive()`;
- additional keyword arguments, specified by *extra_args* as a sequence
of `(name, value)` tuples.

*description* can be provided to describe the format, and will be returned
by the `get_unpack_formats()` function.

### `unregister_unpack_format(name)`

Unregister an unpack format. *name* is the name of the format.

### `get_unpack_formats()`

Return a list of all registered formats for unpacking.
Each element of the returned sequence is a tuple
`(name, extensions, description)`.

By default `shutil` provides these formats:

- *zip*: ZIP file (unpacking compressed files works only if the corresponding
module is available).
- *tar*: uncompressed tar file.
- *gztar*: gzip'ed tar-file (if the `zlib` module is available).
- *bztar*: bzip2'ed tar-file (if the `bz2` module is available).
- *xztar*: xz'ed tar-file (if the `lzma` module is available).
- *zstdtar*: Zstandard compressed tar-file (if the `compression.zstd`
module is available).

You can register new formats or provide your own unpacker for any existing
formats, by using `register_unpack_format()`.

### Archiving example

In this example, we create a gzip'ed tar-file archive containing all files
found in the `.ssh` directory of the user:

```
>>> from shutil import make_archive
>>> import os
>>> archive_name = os.path.expanduser(os.path.join('~', 'myarchive'))
>>> root_dir = os.path.expanduser(os.path.join('~', '.ssh'))
>>> make_archive(archive_name, 'gztar', root_dir)
'/Users/tarek/myarchive.tar.gz'
```

The resulting archive contains:

```shell-session
$ tar -tzvf /Users/tarek/myarchive.tar.gz
drwx------ tarek/staff       0 2010-02-01 16:23:40 ./
-rw-r--r-- tarek/staff     609 2008-06-09 13:26:54 ./authorized_keys
-rwxr-xr-x tarek/staff      65 2008-06-09 13:26:54 ./config
-rwx------ tarek/staff     668 2008-06-09 13:26:54 ./id_dsa
-rwxr-xr-x tarek/staff     609 2008-06-09 13:26:54 ./id_dsa.pub
-rw------- tarek/staff    1675 2008-06-09 13:26:54 ./id_rsa
-rw-r--r-- tarek/staff     397 2008-06-09 13:26:54 ./id_rsa.pub
-rw-r--r-- tarek/staff   37192 2010-02-06 18:23:10 ./known_hosts
```

### Archiving example with *base_dir*

In this example, similar to the one above,
we show how to use `make_archive()`, but this time with the usage of
*base_dir*.  We now have the following directory structure:

```shell-session
$ tree tmp
tmp
└── root
    └── structure
        ├── content
            └── please_add.txt
        └── do_not_add.txt
```

In the final archive, `please_add.txt` should be included, but
`do_not_add.txt` should not.  Therefore we use the following:

```
>>> from shutil import make_archive
>>> import os
>>> archive_name = os.path.expanduser(os.path.join('~', 'myarchive'))
>>> make_archive(
...     archive_name,
...     'tar',
...     root_dir='tmp/root',
...     base_dir='structure/content',
... )
'/Users/tarek/myarchive.tar'
```

Listing the files in the resulting archive gives us:

```shell-session
$ python -m tarfile -l /Users/tarek/myarchive.tar
structure/content/
structure/content/please_add.txt
```

## Querying the size of the output terminal

### `get_terminal_size(fallback=(columns, lines))`

Get the size of the terminal window.

For each of the two dimensions, the environment variable, `COLUMNS`
and `LINES` respectively, is checked. If the variable is defined and
the value is a positive integer, it is used.

When `COLUMNS` or `LINES` is not defined, which is the common case,
the terminal connected to `sys.__stdout__` is queried
by invoking `os.get_terminal_size()`.

If the terminal size cannot be successfully queried, either because
the system doesn't support querying, or because we are not
connected to a terminal, the value given in `fallback` parameter
is used. `fallback` defaults to `(80, 24)` which is the default
size used by many terminal emulators.

The value returned is a named tuple of type `os.terminal_size`.

See also: The Single UNIX Specification, Version 2,
Other Environment Variables.

> *Added in version 3.3.*

> *Changed in version 3.11.*
> The `fallback` values are also used if `os.get_terminal_size()`
> returns zeroes.
