---
title: "pathlib --- Object-oriented filesystem paths (part 5 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/pathlib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# pathlib --- Object-oriented filesystem paths (part 5 of 6)

### `Path.iterdir()`

When the path points to a directory, yield path objects of the directory
contents:

```
>>> p = Path('docs')
>>> for child in p.iterdir(): child
...
PosixPath('docs/conf.py')
PosixPath('docs/_templates')
PosixPath('docs/make.bat')
PosixPath('docs/index.rst')
PosixPath('docs/_build')
PosixPath('docs/_static')
PosixPath('docs/Makefile')
```

The children are yielded in arbitrary order, and the special entries
`'.'` and `'..'` are not included.  If a file is removed from or added
to the directory after creating the iterator, it is unspecified whether
a path object for that file is included.

If the path is not a directory or otherwise inaccessible, `OSError` is
raised.

### `Path.glob(pattern, *, case_sensitive=None, recurse_symlinks=False)`

Glob the given relative *pattern* in the directory represented by this path,
yielding all matching files (of any kind):

```
>>> sorted(Path('.').glob('*.py'))
[PosixPath('pathlib.py'), PosixPath('setup.py'), PosixPath('test_pathlib.py')]
>>> sorted(Path('.').glob('*/*.py'))
[PosixPath('docs/conf.py')]
>>> sorted(Path('.').glob('**/*.py'))
[PosixPath('build/lib/pathlib.py'),
 PosixPath('docs/conf.py'),
 PosixPath('pathlib.py'),
 PosixPath('setup.py'),
 PosixPath('test_pathlib.py')]
```

> **Note:** The paths are returned in no particular order.
> If you need a specific order, sort the results.

> **See also:** pathlib-pattern-language documentation.

By default, or when the *case_sensitive* keyword-only argument is set to
`None`, this method matches paths using platform-specific casing rules:
typically, case-sensitive on POSIX, and case-insensitive on Windows.
Set *case_sensitive* to `True` or `False` to override this behaviour.

By default, or when the *recurse_symlinks* keyword-only argument is set to
`False`, this method follows symlinks except when expanding "`**`"
wildcards. Set *recurse_symlinks* to `True` to always follow symlinks.

> **Note:** Any `OSError` exceptions raised from scanning the filesystem are
> suppressed. This includes `PermissionError` when accessing
> directories without read permission.

> *Changed in version 3.12.*
> The *case_sensitive* parameter was added.

> *Changed in version 3.13.*
> The *recurse_symlinks* parameter was added.

> *Changed in version 3.13.*
> The *pattern* parameter accepts a path-like object.

> *Changed in version 3.13.*
> Any `OSError` exceptions raised from scanning the filesystem are
> suppressed. In previous versions, such exceptions are suppressed in many
> cases, but not all.

### `Path.rglob(pattern, *, case_sensitive=None, recurse_symlinks=False)`

Glob the given relative *pattern* recursively.  This is like calling
`Path.glob()` with "`**/`" added in front of the *pattern*.

> **Note:** The paths are returned in no particular order.
> If you need a specific order, sort the results.

> **Note:** Any `OSError` exceptions raised from scanning the filesystem are
> suppressed. This includes `PermissionError` when accessing
> directories without read permission.

> **See also:** pathlib-pattern-language and `Path.glob()` documentation.

> *Changed in version 3.12.*
> The *case_sensitive* parameter was added.

> *Changed in version 3.13.*
> The *recurse_symlinks* parameter was added.

> *Changed in version 3.13.*
> The *pattern* parameter accepts a path-like object.

### `Path.walk(top_down=True, on_error=None, follow_symlinks=False)`

Generate the file names in a directory tree by walking the tree
either top-down or bottom-up.

For each directory in the directory tree rooted at *self* (including
*self* but excluding '.' and '..'), the method yields a 3-tuple of
`(dirpath, dirnames, filenames)`.

*dirpath* is a `Path` to the directory currently being walked,
*dirnames* is a list of strings for the names of subdirectories in *dirpath*
(excluding `'.'` and `'..'`), and *filenames* is a list of strings for
the names of the non-directory files in *dirpath*. To get a full path
(which begins with *self*) to a file or directory in *dirpath*, do
`dirpath / name`. Whether or not the lists are sorted is file
system-dependent.

If the optional argument *top_down* is true (which is the default), the triple for a
directory is generated before the triples for any of its subdirectories
(directories are walked top-down).  If *top_down* is false, the triple
for a directory is generated after the triples for all of its subdirectories
(directories are walked bottom-up). No matter the value of *top_down*, the
list of subdirectories is retrieved before the triples for the directory and
its subdirectories are walked.

When *top_down* is true, the caller can modify the *dirnames* list in-place
(for example, using `del` or slice assignment), and `Path.walk()`
will only recurse into the subdirectories whose names remain in *dirnames*.
This can be used to prune the search, or to impose a specific order of visiting,
or even to inform `Path.walk()` about directories the caller creates or
renames before it resumes `Path.walk()` again. Modifying *dirnames* when
*top_down* is false has no effect on the behavior of `Path.walk()` since the
directories in *dirnames* have already been generated by the time *dirnames*
is yielded to the caller.

By default, errors from `os.scandir()` are ignored.  If the optional
argument *on_error* is specified, it should be a callable; it will be
called with one argument, an `OSError` instance. The callable can handle the
error to continue the walk or re-raise it to stop the walk. Note that the
filename is available as the `filename` attribute of the exception object.

By default, `Path.walk()` does not follow symbolic links, and instead adds them
to the *filenames* list. Set *follow_symlinks* to true to resolve symlinks
and place them in *dirnames* and *filenames* as appropriate for their targets, and
consequently visit directories pointed to by symlinks (where supported).

> **Note:** Be aware that setting *follow_symlinks* to true can lead to infinite
> recursion if a link points to a parent directory of itself. `Path.walk()`
> does not keep track of the directories it has already visited.

> **Note:** `Path.walk()` assumes the directories it walks are not modified during
> execution. For example, if a directory from *dirnames* has been replaced
> with a symlink and *follow_symlinks* is false, `Path.walk()` will
> still try to descend into it. To prevent such behavior, remove directories
> from *dirnames* as appropriate.

> **Note:** Unlike `os.walk()`, `Path.walk()` lists symlinks to directories in
> *filenames* if *follow_symlinks* is false.

This example displays the number of bytes used by all files in each directory,
while ignoring `__pycache__` directories:

```
from pathlib import Path
for root, dirs, files in Path("cpython/Lib/concurrent").walk(on_error=print):
  print(
      root,
      "consumes",
      sum((root / file).stat().st_size for file in files),
      "bytes in",
      len(files),
      "non-directory files"
  )
  if '__pycache__' in dirs:
        dirs.remove('__pycache__')
```

This next example is a simple implementation of `shutil.rmtree()`.
Walking the tree bottom-up is essential as `rmdir()` doesn't allow
deleting a directory before it is empty:

```
# Delete everything reachable from the directory "top".
# CAUTION:  This is dangerous! For example, if top == Path('/'),
# it could delete all of your files.
for root, dirs, files in top.walk(top_down=False):
    for name in files:
        (root / name).unlink()
    for name in dirs:
        (root / name).rmdir()
```

> *Added in version 3.12.*

### `Path.touch(mode=0o666, exist_ok=True)`

Create a file at this given path.  If *mode* is given, it is combined
with the process's `umask` value to determine the file mode and access
flags.  If the file already exists, the function succeeds when *exist_ok*
is true (and its modification time is updated to the current time),
otherwise `FileExistsError` is raised.

> **See also:** The `open()`, `write_text()` and
> `write_bytes()` methods are often used to create files.

### `Path.mkdir(mode=0o777, parents=False, exist_ok=False, *, \`

```python
parent_mode=None)
```

Create a new directory at this given path.  If *mode* is given, it is
combined with the process's `umask` value to determine the file mode
and access flags.  If the path already exists, `FileExistsError`
is raised.

If *parents* is true, any missing parents of this path are created
as needed; they are created with the default permissions without taking
*mode* into account (mimicking the POSIX `mkdir -p` command).

If *parent_mode* is not `None`, it is used as the mode for any
newly-created, intermediate-level directories when *parents* is true.
Like *mode*, it is combined with the process's `umask` value.
Otherwise, intermediate directories are created with the default
permissions (also subject to the umask).

If *parents* is false (the default), a missing parent raises
`FileNotFoundError`.

If *exist_ok* is false (the default), `FileExistsError` is
raised if the target directory already exists.

If *exist_ok* is true, `FileExistsError` will not be raised unless the given
path already exists in the file system and is not a directory (same
behavior as the POSIX `mkdir -p` command).

> *Changed in version 3.5.*
> The *exist_ok* parameter was added.

> *Added in version 3.15.*
> The *parent_mode* parameter.

### `Path.symlink_to(target, target_is_directory=False)`

Make this path a symbolic link pointing to *target*.

On Windows, a symlink represents either a file or a directory, and does not
morph to the target dynamically.  If the target is present, the type of the
symlink will be created to match. Otherwise, the symlink will be created
as a directory if *target_is_directory* is true or a file symlink (the
default) otherwise.  On non-Windows platforms, *target_is_directory* is ignored.

```
>>> p = Path('mylink')
>>> p.symlink_to('setup.py')
>>> p.resolve()
PosixPath('/home/antoine/pathlib/setup.py')
>>> p.stat().st_size
956
>>> p.lstat().st_size
8
```

> **Note:** The order of arguments (link, target) is the reverse
> of `os.symlink()`'s.

> *Changed in version 3.13.*
> Raises `UnsupportedOperation` if `os.symlink()` is not
> available. In previous versions, `NotImplementedError` was raised.

### `Path.hardlink_to(target)`

Make this path a hard link to the same file as *target*.

> **Note:** The order of arguments (link, target) is the reverse
> of `os.link()`'s.

> *Added in version 3.10.*

> *Changed in version 3.13.*
> Raises `UnsupportedOperation` if `os.link()` is not
> available. In previous versions, `NotImplementedError` was raised.

### `Path.copy(target, *, follow_symlinks=True, preserve_metadata=False)`

Copy this file or directory tree to the given *target*, and return a new
`Path` instance pointing to *target*.

If the source is a file, the target will be replaced if it is an existing
file. If the source is a symlink and *follow_symlinks* is true (the
default), the symlink's target is copied. Otherwise, the symlink is
recreated at the destination.

If *preserve_metadata* is false (the default), only directory structures
and file data are guaranteed to be copied. Set *preserve_metadata* to true
to ensure that file and directory permissions, flags, last access and
modification times, and extended attributes are copied where supported.
This argument has no effect when copying files on Windows (where
metadata is always preserved).

> **Note:** Where supported by the operating system and file system, this method
> performs a lightweight copy, where data blocks are only copied when
> modified. This is known as copy-on-write.

> *Added in version 3.14.*

### `Path.copy_into(target_dir, *, follow_symlinks=True, \`

```python
preserve_metadata=False)
```

Copy this file or directory tree into the given *target_dir*, which should
be an existing directory. Other arguments are handled identically to
`Path.copy()`. Returns a new `Path` instance pointing to the
copy.

> *Added in version 3.14.*

### `Path.rename(target)`

Rename this file or directory to the given *target*, and return a new
`Path` instance pointing to *target*.  On Unix, if *target* exists
and is a file, it will be replaced silently if the user has permission.
On Windows, if *target* exists, `FileExistsError` will be raised.
*target* can be either a string or another path object:

```
>>> p = Path('foo')
>>> p.open('w').write('some text')
9
>>> target = Path('bar')
>>> p.rename(target)
PosixPath('bar')
>>> target.open().read()
'some text'
```

The target path may be absolute or relative. Relative paths are interpreted
relative to the current working directory, *not* the directory of the
`Path` object.

It is implemented in terms of `os.rename()` and gives the same guarantees.

> *Changed in version 3.8.*
> Added return value, return the new `Path` instance.

### `Path.replace(target)`

Rename this file or directory to the given *target*, and return a new
`Path` instance pointing to *target*.  If *target* points to an
existing file or empty directory, it will be unconditionally replaced.

The target path may be absolute or relative. Relative paths are interpreted
relative to the current working directory, *not* the directory of the
`Path` object.

> *Changed in version 3.8.*
> Added return value, return the new `Path` instance.

### `Path.move(target)`

Move this file or directory tree to the given *target*, and return a new
`Path` instance pointing to *target*.

If the *target* doesn't exist it will be created. If both this path and the
*target* are existing files, then the target is overwritten. If both paths
point to the same file or directory, or the *target* is a non-empty
directory, then `OSError` is raised.

If both paths are on the same filesystem, the move is performed with
`os.replace()`. Otherwise, this path is copied (preserving metadata and
symlinks) and then deleted.

> *Added in version 3.14.*

### `Path.move_into(target_dir)`

Move this file or directory tree into the given *target_dir*, which should
be an existing directory. Returns a new `Path` instance pointing to
the moved path.

> *Added in version 3.14.*

### `Path.unlink(missing_ok=False)`

Remove this file or symbolic link.  If the path points to a directory,
use `Path.rmdir()` instead.

If *missing_ok* is false (the default), `FileNotFoundError` is
raised if the path does not exist.

If *missing_ok* is true, `FileNotFoundError` exceptions will be
ignored (same behavior as the POSIX `rm -f` command).

> *Changed in version 3.8.*
> The *missing_ok* parameter was added.

### `Path.rmdir()`

Remove this directory.  The directory must be empty.
