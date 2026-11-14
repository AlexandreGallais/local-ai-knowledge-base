---
title: "pathlib --- Object-oriented filesystem paths (part 2 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/pathlib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# pathlib --- Object-oriented filesystem paths (part 2 of 6)

## Pure paths

Pure path objects provide path-handling operations which don't actually
access a filesystem.  There are three ways to access these classes, which
we also call *flavours*:

### class `PurePath(*pathsegments)`

A generic class that represents the system's path flavour (instantiating
it creates either a `PurePosixPath` or a `PureWindowsPath`):

```
>>> PurePath('setup.py')      # Running on a Unix machine
PurePosixPath('setup.py')
```

Each element of *pathsegments* can be either a string representing a
path segment, or an object implementing the `os.PathLike` interface
where the `__fspath__()` method returns a string,
such as another path object:

```
>>> PurePath('foo', 'some/path', 'bar')
PurePosixPath('foo/some/path/bar')
>>> PurePath(Path('foo'), Path('bar'))
PurePosixPath('foo/bar')
```

When *pathsegments* is empty or consists only of empty strings,
the current directory is assumed:

```
>>> PurePath(), PurePath('')
(PurePosixPath('.'), PurePosixPath('.'))
```

If a segment is an absolute path, all previous segments are ignored
(like `os.path.join()`):

```
>>> PurePath('/etc', '/usr', 'lib64')
PurePosixPath('/usr/lib64')
>>> PureWindowsPath('c:/Windows', 'd:bar')
PureWindowsPath('d:bar')
```

On Windows, the drive is not reset when a rooted relative path
segment (e.g., `r'\foo'`) is encountered:

```
>>> PureWindowsPath('c:/Windows', '/Program Files')
PureWindowsPath('c:/Program Files')
```

Spurious slashes and single dots are collapsed, but double dots (`'..'`)
and leading double slashes (`'//'`) are not, since this would change the
meaning of a path for various reasons (e.g. symbolic links, UNC paths):

```
>>> PurePath('foo//bar')
PurePosixPath('foo/bar')
>>> PurePath('//foo/bar')
PurePosixPath('//foo/bar')
>>> PurePath('foo/./bar')
PurePosixPath('foo/bar')
>>> PurePath('foo/../bar')
PurePosixPath('foo/../bar')
```

(a naïve approach would make `PurePosixPath('foo/../bar')` equivalent
to `PurePosixPath('bar')`, which is wrong if `foo` is a symbolic link
to another directory)

Pure path objects implement the `os.PathLike` interface, allowing them
to be used anywhere the interface is accepted.

> *Changed in version 3.6.*
> Added support for the `os.PathLike` interface.

### class `PurePosixPath(*pathsegments)`

A subclass of `PurePath`, this path flavour represents non-Windows
filesystem paths:

```
>>> PurePosixPath('/etc/hosts')
PurePosixPath('/etc/hosts')
```

*pathsegments* is specified similarly to `PurePath`.

### class `PureWindowsPath(*pathsegments)`

A subclass of `PurePath`, this path flavour represents Windows
filesystem paths, including UNC paths:

```
>>> PureWindowsPath('c:/', 'Users', 'Ximénez')
PureWindowsPath('c:/Users/Ximénez')
>>> PureWindowsPath('//server/share/file')
PureWindowsPath('//server/share/file')
```

*pathsegments* is specified similarly to `PurePath`.

Regardless of the system you're running on, you can instantiate all of
these classes, since they don't provide any operation that does system calls.

### General properties

Paths are immutable and hashable.  Paths of a same flavour are comparable
and orderable.  These properties respect the flavour's case-folding
semantics:

```
>>> PurePosixPath('foo') == PurePosixPath('FOO')
False
>>> PureWindowsPath('foo') == PureWindowsPath('FOO')
True
>>> PureWindowsPath('FOO') in { PureWindowsPath('foo') }
True
>>> PureWindowsPath('C:') < PureWindowsPath('d:')
True
```

Paths of a different flavour compare unequal and cannot be ordered:

```
>>> PureWindowsPath('foo') == PurePosixPath('foo')
False
>>> PureWindowsPath('foo') < PurePosixPath('foo')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: '<' not supported between instances of 'PureWindowsPath' and 'PurePosixPath'
```

### Operators

The slash operator helps create child paths, like `os.path.join()`.
If the argument is an absolute path, the previous path is ignored.
On Windows, the drive is not reset when the argument is a rooted
relative path (e.g., `r'\foo'`):

```
>>> p = PurePath('/etc')
>>> p
PurePosixPath('/etc')
>>> p / 'init.d' / 'apache2'
PurePosixPath('/etc/init.d/apache2')
>>> q = PurePath('bin')
>>> '/usr' / q
PurePosixPath('/usr/bin')
>>> p / '/an_absolute_path'
PurePosixPath('/an_absolute_path')
>>> PureWindowsPath('c:/Windows', '/Program Files')
PureWindowsPath('c:/Program Files')
```

A path object can be used anywhere an object implementing `os.PathLike`
is accepted:

```
>>> import os
>>> p = PurePath('/etc')
>>> os.fspath(p)
'/etc'
```

The string representation of a path is the raw filesystem path itself
(in native form, e.g. with backslashes under Windows), which you can
pass to any function taking a file path as a string:

```
>>> p = PurePath('/etc')
>>> str(p)
'/etc'
>>> p = PureWindowsPath('c:/Program Files')
>>> str(p)
'c:\\Program Files'
```

Similarly, calling `bytes` on a path gives the raw filesystem path as a
bytes object, as encoded by `os.fsencode()`:

```
>>> bytes(p)
b'/etc'
```

> **Note:** Calling `bytes` is only recommended under Unix.  Under Windows,
> the unicode form is the canonical representation of filesystem paths.

### Accessing individual parts

To access the individual "parts" (components) of a path, use the following
property:

### `PurePath.parts`

A tuple giving access to the path's various components:

```
>>> p = PurePath('/usr/bin/python3')
>>> p.parts
('/', 'usr', 'bin', 'python3')

>>> p = PureWindowsPath('c:/Program Files/PSF')
>>> p.parts
('c:\\', 'Program Files', 'PSF')
```

(note how the drive and local root are regrouped in a single part)

### Methods and properties

The `parent`, `name`,
`stem`, and `suffix` properties describe
different parts of a path.  For example, given:

```
>>> p = PurePosixPath('/srv/holy/grail.tar.gz')
```

The stem excludes only the final suffix: in this example, it includes `.tar`.

Pure paths provide the following methods and properties:

### `PurePath.parser`

The implementation of the `os.path` module used for low-level path
parsing and joining: either `posixpath` or `ntpath`.

> *Added in version 3.13.*

### `PurePath.drive`

A string representing the drive letter or name, if any:

```
>>> PureWindowsPath('c:/Program Files/').drive
'c:'
>>> PureWindowsPath('/Program Files/').drive
''
>>> PurePosixPath('/etc').drive
''
```

UNC shares are also considered drives:

```
>>> PureWindowsPath('//host/share/foo.txt').drive
'\\\\host\\share'
```

### `PurePath.root`

A string representing the (local or global) root, if any:

```
>>> PureWindowsPath('c:/Program Files/').root
'\\'
>>> PureWindowsPath('c:Program Files/').root
''
>>> PurePosixPath('/etc').root
'/'
```

UNC shares always have a root:

```
>>> PureWindowsPath('//host/share').root
'\\'
```

If the path starts with more than two successive slashes,
`PurePosixPath` collapses them:

```
>>> PurePosixPath('//etc').root
'//'
>>> PurePosixPath('///etc').root
'/'
>>> PurePosixPath('////etc').root
'/'
```

> **Note:** This behavior conforms to *The Open Group Base Specifications Issue 6*,
> paragraph `4.11 Pathname Resolution
> <https://pubs.opengroup.org/onlinepubs/009695399/basedefs/xbd_chap04.html#tag_04_11>`_:
>
> *"A pathname that begins with two successive slashes may be interpreted in
> an implementation-defined manner, although more than two leading slashes
> shall be treated as a single slash."*

### `PurePath.anchor`

The concatenation of the drive and root:

```
>>> PureWindowsPath('c:/Program Files/').anchor
'c:\\'
>>> PureWindowsPath('c:Program Files/').anchor
'c:'
>>> PurePosixPath('/etc').anchor
'/'
>>> PureWindowsPath('//host/share').anchor
'\\\\host\\share\\'
```

### `PurePath.parents`

An immutable sequence providing access to the logical ancestors of
the path:

```
>>> p = PureWindowsPath('c:/foo/bar/setup.py')
>>> p.parents[0]
PureWindowsPath('c:/foo/bar')
>>> p.parents[1]
PureWindowsPath('c:/foo')
>>> p.parents[2]
PureWindowsPath('c:/')
```

> *Changed in version 3.10.*
> The parents sequence now supports slices and negative index values.

### `PurePath.parent`

The logical parent of the path:

```
>>> p = PurePosixPath('/a/b/c/d')
>>> p.parent
PurePosixPath('/a/b/c')
```

You cannot go past an anchor, or empty path:

```
>>> p = PurePosixPath('/')
>>> p.parent
PurePosixPath('/')
>>> p = PurePosixPath('.')
>>> p.parent
PurePosixPath('.')
```

> **Note:** This is a purely lexical operation, hence the following behaviour:
>
>
> ```
> >>> p = PurePosixPath('foo/..')
> >>> p.parent
> PurePosixPath('foo')
> ```
>
>
> If you want to walk an arbitrary filesystem path upwards, it is
> recommended to first call `Path.resolve()` so as to resolve
> symlinks and eliminate `".."` components.

### `PurePath.name`

A string representing the final path component, excluding the drive and
root, if any:

```
>>> PurePosixPath('my/library/setup.py').name
'setup.py'
```

UNC drive names are not considered:

```
>>> PureWindowsPath('//some/share/setup.py').name
'setup.py'
>>> PureWindowsPath('//some/share').name
''
```

### `PurePath.suffix`

The last dot-separated portion of the final component, if any:

```
>>> PurePosixPath('my/library/setup.py').suffix
'.py'
>>> PurePosixPath('my/library.tar.gz').suffix
'.gz'
>>> PurePosixPath('my/library').suffix
''
```

This is commonly called the file extension.

> *Changed in version 3.14.*
> A single dot ("`.`") is considered a valid suffix.

### `PurePath.suffixes`

A list of the path's suffixes, often called file extensions:

```
>>> PurePosixPath('my/library.tar.gar').suffixes
['.tar', '.gar']
>>> PurePosixPath('my/library.tar.gz').suffixes
['.tar', '.gz']
>>> PurePosixPath('my/library').suffixes
[]
```

> *Changed in version 3.14.*
> A single dot ("`.`") is considered a valid suffix.

### `PurePath.stem`

The final path component, without its suffix:

```
>>> PurePosixPath('my/library.tar.gz').stem
'library.tar'
>>> PurePosixPath('my/library.tar').stem
'library'
>>> PurePosixPath('my/library').stem
'library'
```

> *Changed in version 3.14.*
> A single dot ("`.`") is considered a valid suffix.

### `PurePath.as_posix()`

Return a string representation of the path with forward slashes (`/`):

```
>>> p = PureWindowsPath('c:\\windows')
>>> str(p)
'c:\\windows'
>>> p.as_posix()
'c:/windows'
```

### `PurePath.is_absolute()`

Return whether the path is absolute or not.  A path is considered absolute
if it has both a root and (if the flavour allows) a drive:

```
>>> PurePosixPath('/a/b').is_absolute()
True
>>> PurePosixPath('a/b').is_absolute()
False

>>> PureWindowsPath('c:/a/b').is_absolute()
True
>>> PureWindowsPath('/a/b').is_absolute()
False
>>> PureWindowsPath('c:').is_absolute()
False
>>> PureWindowsPath('//some/share').is_absolute()
True
```

### `PurePath.is_relative_to(other)`

Return whether or not this path is relative to the *other* path.

```python
>>> p = PurePath('<example-value>')
>>> p.is_relative_to('/etc')
True
>>> p.is_relative_to('/usr')
False
```

This method is string-based; it neither accesses the filesystem nor treats
"`..`" segments specially. The following code is equivalent:

```python
>>> u = PurePath('/usr')
>>> u == p or u in p.parents
False
```

> *Added in version 3.9.*

> *Deprecated since version 3.12, removed in version 3.14.*
> Passing additional arguments is deprecated; if supplied, they are joined
> with *other*.

### `PurePath.joinpath(*pathsegments)`

Calling this method is equivalent to combining the path with each of
the given *pathsegments* in turn:

```
>>> PurePosixPath('<example-value>').joinpath('<example-value>')
PurePosixPath('<example-value>')
>>> PurePosixPath('<example-value>').joinpath(PurePosixPath('<example-value>'))
PurePosixPath('<example-value>')
>>> PurePosixPath('/etc').joinpath('init.d', 'apache2')
PurePosixPath('/etc/init.d/apache2')
>>> PureWindowsPath('c:').joinpath('/Program Files')
PureWindowsPath('c:/Program Files')
```

### `PurePath.full_match(pattern, *, case_sensitive=None)`

Match this path against the provided glob-style pattern.  Return `True`
if matching is successful, `False` otherwise.  For example:

```
>>> PurePath('a/b.py').full_match('a/*.py')
True
>>> PurePath('a/b.py').full_match('*.py')
False
>>> PurePath('/a/b/c.py').full_match('**/*.py')
True
>>> PurePath('/a/b/c.py').full_match('/a/**')
True
```

Patterns ending in "`/**`", as in the example above, may surprise when
passed to `full_match`. Even though "`**`" can match 0 segments,
"`.../**`" requires a separator to match. Hence "`/a/**`" does not
match path "`/a`". Since `PurePath` drops trailing slashes, this
pattern also does not match "`/a/`".

```
>>> PurePath('/a').full_match('/a/**')
False
>>> PurePath('/a/').full_match('/a/**')
False
```

> **See also:** pathlib-pattern-language documentation.

As with other methods, case-sensitivity follows platform defaults:

```
>>> PurePosixPath('b.py').full_match('*.PY')
False
>>> PureWindowsPath('b.py').full_match('*.PY')
True
```

Set *case_sensitive* to `True` or `False` to override this behaviour.

> *Added in version 3.13.*

### `PurePath.match(pattern, *, case_sensitive=None)`

Match this path against the provided non-recursive glob-style pattern.
Return `True` if matching is successful, `False` otherwise.

This method is similar to `full_match()`, but empty patterns
aren't allowed (`ValueError` is raised), the recursive wildcard
"`**`" isn't supported (it acts like non-recursive "`*`"), and if a
relative pattern is provided, then matching is done from the right:

```
>>> PurePath('a/b.py').match('*.py')
True
>>> PurePath('/a/b/c.py').match('b/*.py')
True
>>> PurePath('/a/b/c.py').match('a/*.py')
False
```

> *Changed in version 3.12.*
> The *pattern* parameter accepts a path-like object.

> *Changed in version 3.12.*
> The *case_sensitive* parameter was added.
