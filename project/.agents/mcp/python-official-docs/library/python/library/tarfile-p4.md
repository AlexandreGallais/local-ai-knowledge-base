---
title: "tarfile --- Read and write tar archive files (part 4 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/tarfile.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# tarfile --- Read and write tar archive files (part 4 of 4)

## Command-Line Interface

> *Added in version 3.4.*

The `tarfile` module provides a simple command-line interface to interact
with tar archives.

If you want to create a new tar archive, specify its name after the `-c`
option and then list the filename(s) that should be included:

```shell-session
$ python -m tarfile -c monty.tar  spam.txt eggs.txt
```

Passing a directory is also acceptable:

```shell-session
$ python -m tarfile -c monty.tar life-of-brian_1979/
```

If you want to extract a tar archive into the current directory, use
the `-e` option:

```shell-session
$ python -m tarfile -e monty.tar
```

You can also extract a tar archive into a different directory by passing the
directory's name:

```shell-session
$ python -m tarfile -e monty.tar  other-dir/
```

For a list of the files in a tar archive, use the `-l` option:

```shell-session
$ python -m tarfile -l monty.tar
```

### option `-l <tarfile>`

```python
--list <tarfile>
```

List files in a tarfile.

### option `-c <tarfile> <source1> ... <sourceN>`

```python
--create <tarfile> <source1> ... <sourceN>
```

Create tarfile from source files.

### option `-e <tarfile> [<output_dir>]`

```python
--extract <tarfile> [<output_dir>]
```

Extract tarfile into the current directory if *output_dir* is not specified.

### option `-t <tarfile>`

```python
--test <tarfile>
```

Test whether the tarfile is valid or not.

### option `-v, --verbose`

Verbose output.

### option `--filter <filtername>`

Specifies the *filter* for `--extract`.
See tarfile-extraction-filter for details.
Only string names are accepted (that is, `fully_trusted`, `tar`,
and `data`).

## Examples

### Reading examples

How to extract an entire tar archive to the current working directory:

```
import tarfile
tar = tarfile.open("sample.tar.gz")
tar.extractall(filter='data')
tar.close()
```

How to extract a subset of a tar archive with `TarFile.extractall()` using
a generator function instead of a list:

```
import os
import tarfile

def py_files(members):
    for tarinfo in members:
        if os.path.splitext(tarinfo.name)[1] == ".py":
            yield tarinfo

tar = tarfile.open("sample.tar.gz")
tar.extractall(members=py_files(tar))
tar.close()
```

How to read a gzip compressed tar archive and display some member information:

```
import tarfile
tar = tarfile.open("sample.tar.gz", "r:gz")
for tarinfo in tar:
    print(tarinfo.name, "is", tarinfo.size, "bytes in size and is ", end="")
    if tarinfo.isreg():
        print("a regular file.")
    elif tarinfo.isdir():
        print("a directory.")
    else:
        print("something else.")
tar.close()
```

### Writing examples

How to create an uncompressed tar archive from a list of filenames:

```
import tarfile
tar = tarfile.open("sample.tar", "w")
for name in ["foo", "bar", "quux"]:
    tar.add(name)
tar.close()
```

The same example using the `with` statement:

```
import tarfile
with tarfile.open("sample.tar", "w") as tar:
    for name in ["foo", "bar", "quux"]:
        tar.add(name)
```

How to create and write an archive to stdout using
`sys.stdout.buffer` in the *fileobj* parameter
in `TarFile.add()`:

```
import sys
import tarfile
with tarfile.open("sample.tar.gz", "w|gz", fileobj=sys.stdout.buffer) as tar:
    for name in ["foo", "bar", "quux"]:
        tar.add(name)
```

How to create an archive and reset the user information using the *filter*
parameter in `TarFile.add()`:

```
import tarfile
def reset(tarinfo):
    tarinfo.uid = tarinfo.gid = 0
    tarinfo.uname = tarinfo.gname = "root"
    return tarinfo
tar = tarfile.open("sample.tar.gz", "w:gz")
tar.add("foo", filter=reset)
tar.close()
```

## Supported tar formats

There are three tar formats that can be created with the `tarfile` module:

- The POSIX.1-1988 ustar format (`USTAR_FORMAT`). It supports filenames
up to a length of at best 256 characters and linknames up to 100 characters.
The maximum file size is 8 GiB. This is an old and limited but widely
supported format.

- The GNU tar format (`GNU_FORMAT`). It supports long filenames and
linknames, files bigger than 8 GiB and sparse files. It is the de facto
standard on GNU/Linux systems. `tarfile` fully supports the GNU tar
extensions for long names, sparse file support is read-only.

- The POSIX.1-2001 pax format (`PAX_FORMAT`). It is the most flexible
format with virtually no limits. It supports long filenames and linknames, large
files and stores pathnames in a portable way. Modern tar implementations,
including GNU tar, bsdtar/libarchive and star, fully support extended *pax*
features; some old or unmaintained libraries may not, but should treat
*pax* archives as if they were in the universally supported *ustar* format.
It is the current default format for new archives.

It extends the existing *ustar* format with extra headers for information
that cannot be stored otherwise. There are two flavours of pax headers:
Extended headers only affect the subsequent file header, global
headers are valid for the complete archive and affect all following files.
All the data in a pax header is encoded in *UTF-8* for portability reasons.

There are some more variants of the tar format which can be read, but not
created:

- The ancient V7 format. This is the first tar format from Unix Seventh Edition,
storing only regular files and directories. Names must not be longer than 100
characters, there is no user/group name information. Some archives have
miscalculated header checksums in case of fields with non-ASCII characters.

- The SunOS tar extended format. This format is a variant of the POSIX.1-2001
pax format, but is not compatible.

## Unicode issues

The tar format was originally conceived to make backups on tape drives with the
main focus on preserving file system information. Nowadays tar archives are
commonly used for file distribution and exchanging archives over networks. One
problem of the original format (which is the basis of all other formats) is
that there is no concept of supporting different character encodings. For
example, an ordinary tar archive created on a *UTF-8* system cannot be read
correctly on a *Latin-1* system if it contains non-*ASCII* characters. Textual
metadata (like filenames, linknames, user/group names) will appear damaged.
Unfortunately, there is no way to autodetect the encoding of an archive. The
pax format was designed to solve this problem. It stores non-ASCII metadata
using the universal character encoding *UTF-8*.

The details of character conversion in `tarfile` are controlled by the
*encoding* and *errors* keyword arguments of the `TarFile` class.

*encoding* defines the character encoding to use for the metadata in the
archive. The default value is `sys.getfilesystemencoding()` or `'ascii'`
as a fallback. Depending on whether the archive is read or written, the
metadata must be either decoded or encoded. If *encoding* is not set
appropriately, this conversion may fail.

The *errors* argument defines how characters are treated that cannot be
converted. Possible values are listed in section error-handlers.
The default scheme is `'surrogateescape'` which Python also uses for its
file system calls, see os-filenames.

For `PAX_FORMAT` archives (the default), *encoding* is generally not needed
because all the metadata is stored using *UTF-8*. *encoding* is only used in
the rare cases when binary pax headers are decoded or when strings with
surrogate characters are stored.
