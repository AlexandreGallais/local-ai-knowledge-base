---
title: "pathlib --- Object-oriented filesystem paths (part 4 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/pathlib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# pathlib --- Object-oriented filesystem paths (part 4 of 6)

## Concrete paths

Concrete paths are subclasses of the pure path classes.  In addition to
operations provided by the latter, they also provide methods to do system
calls on path objects.  There are three ways to instantiate concrete paths:

### class `Path(*pathsegments)`

A subclass of `PurePath`, this class represents concrete paths of
the system's path flavour (instantiating it creates either a
`PosixPath` or a `WindowsPath`):

```
>>> Path('setup.py')
PosixPath('setup.py')
```

*pathsegments* is specified similarly to `PurePath`.

### class `PosixPath(*pathsegments)`

A subclass of `Path` and `PurePosixPath`, this class
represents concrete non-Windows filesystem paths:

```
>>> PosixPath('/etc/hosts')
PosixPath('/etc/hosts')
```

*pathsegments* is specified similarly to `PurePath`.

> *Changed in version 3.13.*
> Raises `UnsupportedOperation` on Windows. In previous versions,
> `NotImplementedError` was raised instead.

### class `WindowsPath(*pathsegments)`

A subclass of `Path` and `PureWindowsPath`, this class
represents concrete Windows filesystem paths:

```
>>> WindowsPath('c:/', 'Users', 'Ximénez')
WindowsPath('c:/Users/Ximénez')
```

*pathsegments* is specified similarly to `PurePath`.

> *Changed in version 3.13.*
> Raises `UnsupportedOperation` on non-Windows platforms. In previous
> versions, `NotImplementedError` was raised instead.

You can only instantiate the class flavour that corresponds to your system
(allowing system calls on non-compatible path flavours could lead to
bugs or failures in your application):

```
>>> import os
>>> os.name
'posix'
>>> Path('setup.py')
PosixPath('setup.py')
>>> PosixPath('setup.py')
PosixPath('setup.py')
>>> WindowsPath('setup.py')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "pathlib.py", line 798, in __new__
    % (cls.__name__,))
UnsupportedOperation: cannot instantiate 'WindowsPath' on your system
```

Some concrete path methods can raise an `OSError` if a system call fails
(for example because the path doesn't exist).

### Parsing and generating URIs

Concrete path objects can be created from, and represented as, 'file' URIs
conforming to RFC 8089.

> **Note:** File URIs are not portable across machines with different
> filesystem encodings.

### classmethod `Path.from_uri(uri)`

Return a new path object from parsing a 'file' URI. For example:

```
>>> p = Path.from_uri('file:///etc/hosts')
PosixPath('/etc/hosts')
```

On Windows, DOS device and UNC paths may be parsed from URIs:

```
>>> p = Path.from_uri('file:///c:/windows')
WindowsPath('c:/windows')
>>> p = Path.from_uri('file://server/share')
WindowsPath('//server/share')
```

Several variant forms are supported:

```
>>> p = Path.from_uri('file:////server/share')
WindowsPath('//server/share')
>>> p = Path.from_uri('file://///server/share')
WindowsPath('//server/share')
>>> p = Path.from_uri('file:c:/windows')
WindowsPath('c:/windows')
>>> p = Path.from_uri('file:/c|/windows')
WindowsPath('c:/windows')
```

`ValueError` is raised if the URI does not start with `file:`, or
the parsed path isn't absolute.

> *Added in version 3.13.*

> *Changed in version 3.14.*
> The URL authority is discarded if it matches the local hostname.
> Otherwise, if the authority isn't empty or `localhost`, then on
> Windows a UNC path is returned (as before), and on other platforms a
> `ValueError` is raised.

### `Path.as_uri()`

Represent the path as a 'file' URI.  `ValueError` is raised if
the path isn't absolute.

```pycon
>>> p = PosixPath('<example-value>')
>>> p.as_uri()
'<example-value>'
>>> p = WindowsPath('c:/Windows')
>>> p.as_uri()
'file:///c:/Windows'
```

> *Deprecated since version 3.14, removed in version 3.19.*
> Calling this method from `PurePath` rather than `Path` is
> possible but deprecated. The method's use of `os.fsencode()` makes
> it strictly impure.

### classmethod `Path.home()`

Return a new path object representing the user's home directory (as
returned by `os.path.expanduser()` with `~` construct). If the home
directory can't be resolved, `RuntimeError` is raised.

```
>>> Path.home()
PosixPath('/home/antoine')
```

> *Added in version 3.5.*

### `Path.expanduser()`

Return a new path with expanded `~` and `~user` constructs,
as returned by `os.path.expanduser()`. If a home directory can't be
resolved, `RuntimeError` is raised.

```
>>> p = PosixPath('~/films/Monty Python')
>>> p.expanduser()
PosixPath('/home/eric/films/Monty Python')
```

> *Added in version 3.5.*

### classmethod `Path.cwd()`

Return a new path object representing the current directory (as returned
by `os.getcwd()`):

```
>>> Path.cwd()
PosixPath('/home/antoine/pathlib')
```

### `Path.absolute()`

Make the path absolute, without normalization or resolving symlinks.
Returns a new path object:

```
>>> p = Path('tests')
>>> p
PosixPath('tests')
>>> p.absolute()
PosixPath('/home/antoine/pathlib/tests')
```

### `Path.resolve(strict=False)`

Make the path absolute, resolving any symlinks.  A new path object is
returned:

```
>>> p = Path()
>>> p
PosixPath('.')
>>> p.resolve()
PosixPath('/home/antoine/pathlib')
```

"`..`" components are also eliminated (this is the only method to do so):

```
>>> p = Path('docs/../setup.py')
>>> p.resolve()
PosixPath('/home/antoine/pathlib/setup.py')
```

If a path doesn't exist or a symlink loop is encountered, and *strict* is
`True`, `OSError` is raised.  If *strict* is `False`, the path is
resolved as far as possible and any remainder is appended without checking
whether it exists.

> *Changed in version 3.6.*
> The *strict* parameter was added (pre-3.6 behavior is strict).

> *Changed in version 3.13.*
> Symlink loops are treated like other errors: `OSError` is raised in
> strict mode, and no exception is raised in non-strict mode. In previous
> versions, `RuntimeError` is raised no matter the value of *strict*.

### `Path.readlink()`

Return the path to which the symbolic link points (as returned by
`os.readlink()`):

```
>>> p = Path('mylink')
>>> p.symlink_to('setup.py')
>>> p.readlink()
PosixPath('setup.py')
```

> *Added in version 3.9.*

> *Changed in version 3.13.*
> Raises `UnsupportedOperation` if `os.readlink()` is not
> available. In previous versions, `NotImplementedError` was raised.

### Querying file type and status

> *Changed in version 3.8.*
> `exists()`, `is_dir()`, `is_file()`,
> `is_mount()`, `is_symlink()`,
> `is_block_device()`, `is_char_device()`,
> `is_fifo()`, `is_socket()` now return `False`
> instead of raising an exception for paths that contain characters
> unrepresentable at the OS level.

> *Changed in version 3.14.*
> The methods given above now return `False` instead of raising any
> `OSError` exception from the operating system. In previous versions,
> some kinds of `OSError` exception are raised, and others suppressed.
> The new behaviour is consistent with `os.path.exists()`,
> `os.path.isdir()`, etc. Use `stat()` to retrieve the file
> status without suppressing exceptions.

### `Path.stat(*, follow_symlinks=True)`

Return an `os.stat_result` object containing information about this path, like `os.stat()`.
The result is looked up at each call to this method.

This method normally follows symlinks; to stat a symlink add the argument
`follow_symlinks=False`, or use `lstat()`.

```
>>> p = Path('setup.py')
>>> p.stat().st_size
956
>>> p.stat().st_mtime
1327883547.852554
```

> *Changed in version 3.10.*
> The *follow_symlinks* parameter was added.

### `Path.lstat()`

Like `Path.stat()` but, if the path points to a symbolic link, return
the symbolic link's information rather than its target's.

### `Path.exists(*, follow_symlinks=True)`

Return `True` if the path points to an existing file or directory and
`False` if the path is invalid, inaccessible or missing.
Use `Path.stat()` to distinguish between these cases.

This method normally follows symlinks; to check if a symlink exists, add
the argument `follow_symlinks=False`.

```
>>> Path('').exists()  # The current directory.
True
>>> Path('.').exists()
True
>>> Path('setup.py').exists()
True
>>> Path('/etc').exists()
True
>>> Path('nonexistentfile').exists()
False
```

> *Changed in version 3.12.*
> The *follow_symlinks* parameter was added.

### `Path.is_file(*, follow_symlinks=True)`

Return `True` if the path points to a regular file. `False` will be
returned if the path is invalid, inaccessible or missing, or if it points
to something other than a regular file. Use `Path.stat()` to
distinguish between these cases.

This method normally follows symlinks; to exclude symlinks, add the
argument `follow_symlinks=False`.

> *Changed in version 3.13.*
> The *follow_symlinks* parameter was added.

### `Path.is_dir(*, follow_symlinks=True)`

Return `True` if the path points to a directory. `False` will be
returned if the path is invalid, inaccessible or missing, or if it points
to something other than a directory. Use `Path.stat()` to distinguish
between these cases.

This method normally follows symlinks; to exclude symlinks to directories,
add the argument `follow_symlinks=False`.

> *Changed in version 3.13.*
> The *follow_symlinks* parameter was added.

### `Path.is_symlink()`

Return `True` if the path points to a symbolic link, even if that symlink
is broken. `False` will be returned if the path is invalid, inaccessible
or missing, or if it points to something other than a symbolic link. Use
`Path.stat()` to distinguish between these cases.

### `Path.is_junction()`

Return `True` if the path points to a junction, and `False` for any other
type of file. Currently only Windows supports junctions.

> *Added in version 3.12.*

### `Path.is_mount()`

Return `True` if the path is a mount point: a point in a
file system where a different file system has been mounted.  On POSIX, the
function checks whether *path*'s parent, `path/..`, is on a different
device than *path*, or whether `path/..` and *path* point to the same
i-node on the same device --- this should detect mount points for all Unix
and POSIX variants.  On Windows, a mount point is considered to be a drive
letter root (e.g. `c:\`), a UNC share (e.g. `\server\share`), or a
mounted filesystem directory.

> *Added in version 3.7.*

> *Changed in version 3.12.*
> Windows support was added.

### `Path.is_socket()`

Return `True` if the path points to a Unix socket. `False` will be
returned if the path is invalid, inaccessible or missing, or if it points
to something other than a Unix socket. Use `Path.stat()` to
distinguish between these cases.

### `Path.is_fifo()`

Return `True` if the path points to a FIFO. `False` will be returned if
the path is invalid, inaccessible or missing, or if it points to something
other than a FIFO. Use `Path.stat()` to distinguish between these
cases.

### `Path.is_block_device()`

Return `True` if the path points to a block device. `False` will be
returned if the path is invalid, inaccessible or missing, or if it points
to something other than a block device. Use `Path.stat()` to
distinguish between these cases.

### `Path.is_char_device()`

Return `True` if the path points to a character device. `False` will be
returned if the path is invalid, inaccessible or missing, or if it points
to something other than a character device. Use `Path.stat()` to
distinguish between these cases.

### `Path.samefile(other_path)`

Return whether this path points to the same file as *other_path*, which
can be either a Path object, or a string.  The semantics are similar
to `os.path.samefile()` and `os.path.samestat()`.

An `OSError` can be raised if either file cannot be accessed for some
reason.

```
>>> p = Path('spam')
>>> q = Path('eggs')
>>> p.samefile(q)
False
>>> p.samefile('spam')
True
```

> *Added in version 3.5.*

### `Path.info`

A `PathInfo` object that supports querying file type
information. The object exposes methods that cache their results, which can
help reduce the number of system calls needed when switching on file type.
For example:

```
>>> p = Path('src')
>>> if p.info.is_symlink():
...     print('symlink')
... elif p.info.is_dir():
...     print('directory')
... elif p.info.exists():
...     print('something else')
... else:
...     print('not found')
...
directory
```

If the path was generated from `Path.iterdir()` then this attribute is
initialized with some information about the file type gleaned from scanning
the parent directory. Merely accessing `Path.info` does not perform
any filesystem queries.

To fetch up-to-date information, it's best to call `Path.is_dir()`,
`is_file()` and `is_symlink()` rather than methods of
this attribute. There is no way to reset the cache; instead you can create
a new path object with an empty info cache via `p = Path(p)`.

> *Added in version 3.14.*

### `Path.open(mode='r', buffering=-1, encoding=None, errors=None, newline=None)`

Open the file pointed to by the path, like the built-in `open()`
function does:

```
>>> p = Path('setup.py')
>>> with p.open() as f:
...     f.readline()
...
'#!/usr/bin/env python3\n'
```

### `Path.read_text(encoding=None, errors=None, newline=None)`

Return the decoded contents of the pointed-to file as a string:

```
>>> p = Path('my_text_file')
>>> p.write_text('Text file contents')
18
>>> p.read_text()
'Text file contents'
```

The file is opened and then closed. The optional parameters have the same
meaning as in `open()`.

> *Added in version 3.5.*

> *Changed in version 3.13.*
> The *newline* parameter was added.

### `Path.read_bytes()`

Return the binary contents of the pointed-to file as a bytes object:

```
>>> p = Path('my_binary_file')
>>> p.write_bytes(b'Binary file contents')
20
>>> p.read_bytes()
b'Binary file contents'
```

> *Added in version 3.5.*

### `Path.write_text(data, encoding=None, errors=None, newline=None)`

Open the file pointed to in text mode, write *data* to it, and close the
file:

```
>>> p = Path('my_text_file')
>>> p.write_text('Text file contents')
18
>>> p.read_text()
'Text file contents'
```

An existing file of the same name is overwritten. The optional parameters
have the same meaning as in `open()`.

> *Added in version 3.5.*

> *Changed in version 3.10.*
> The *newline* parameter was added.

### `Path.write_bytes(data)`

Open the file pointed to in bytes mode, write *data* to it, and close the
file:

```
>>> p = Path('my_binary_file')
>>> p.write_bytes(b'Binary file contents')
20
>>> p.read_bytes()
b'Binary file contents'
```

An existing file of the same name is overwritten.

> *Added in version 3.5.*
