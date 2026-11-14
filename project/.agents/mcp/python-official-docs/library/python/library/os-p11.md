---
title: "os --- Miscellaneous operating system interfaces (part 11 of 16)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/os.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# os --- Miscellaneous operating system interfaces (part 11 of 16)

### `supports_fd`

A `set` object indicating which functions in the
`os` module permit specifying their *path* parameter as an open file
descriptor on the local platform.  Different platforms provide different
features, and the underlying functionality Python uses to accept open file
descriptors as *path* arguments is not available on all platforms Python
supports.

To determine whether a particular function permits specifying an open file
descriptor for its *path* parameter, use the `in` operator on
`supports_fd`. As an example, this expression evaluates to `True` if
`os.chdir()` accepts open file descriptors for *path* on your local
platform:

```
os.chdir in os.supports_fd
```

> *Added in version 3.3.*

### `supports_follow_symlinks`

A `set` object indicating which functions in the `os` module
accept `False` for their *follow_symlinks* parameter on the local platform.
Different platforms provide different features, and the underlying
functionality Python uses to implement *follow_symlinks* is not available
on all platforms Python supports.  For consistency's sake, functions that
may support *follow_symlinks* always allow specifying the parameter, but
will throw an exception if the functionality is used when it's not locally
available.  (Specifying `True` for *follow_symlinks* is always supported
on all platforms.)

To check whether a particular function accepts `False` for its
*follow_symlinks* parameter, use the `in` operator on
`supports_follow_symlinks`.  As an example, this expression evaluates
to `True` if you may specify `follow_symlinks=False` when calling
`os.stat()` on the local platform:

```
os.stat in os.supports_follow_symlinks
```

> *Added in version 3.3.*

### `symlink(src, dst, target_is_directory=False, *, dir_fd=None)`

Create a symbolic link pointing to *src* named *dst*.

The *src* parameter refers to the target of the link (the file or directory being linked to),
and *dst* is the name of the link being created.

On Windows, a symlink represents either a file or a directory, and does not
morph to the target dynamically.  If the target is present, the type of the
symlink will be created to match. Otherwise, the symlink will be created
as a directory if *target_is_directory* is `True` or a file symlink (the
default) otherwise.  On non-Windows platforms, *target_is_directory* is ignored.

This function can support :ref:`paths relative to directory descriptors
<dir_fd>`.

> **Note:** On newer versions of Windows 10, unprivileged accounts can create symlinks
> if Developer Mode is enabled. When Developer Mode is not available/enabled,
> the *SeCreateSymbolicLinkPrivilege* privilege is required, or the process
> must be run as an administrator.
>
>
> `OSError` is raised when the function is called by an unprivileged
> user.

> **Availability:** Unix, Windows.
>
> The function is limited on WASI, see wasm-availability for more
> information.

> *Changed in version 3.2.*
> Added support for Windows 6.0 (Vista) symbolic links.

> *Changed in version 3.3.*
> Added the *dir_fd* parameter, and now allow *target_is_directory*
> on non-Windows platforms.

> *Changed in version 3.6.*
> Accepts a path-like object for *src* and *dst*.

> *Changed in version 3.8.*
> Added support for unelevated symlinks on Windows with Developer Mode.

### `sync()`

Force write of everything to disk.

> **Availability:** Unix.

> *Added in version 3.3.*

### `truncate(path, length)`

Truncate the file corresponding to *path*, so that it is at most
*length* bytes in size.

This function can support specifying a file descriptor.

> **Availability:** Unix, Windows.

> *Added in version 3.3.*

> *Changed in version 3.5.*
> Added support for Windows

> *Changed in version 3.6.*
> Accepts a path-like object.

### `unlink(path, *, dir_fd=None)`

Remove (delete) the file *path*.  This function is semantically
identical to `remove()`; the `unlink` name is its
traditional Unix name.  Please see the documentation for
`remove()` for further information.

> *Changed in version 3.3.*
> Added the *dir_fd* parameter.

> *Changed in version 3.6.*
> Accepts a path-like object.

### `utime(path, times=None, *[, ns], dir_fd=None, follow_symlinks=True)`

Set the access and modified times of the file specified by *path*.

`utime()` takes two optional parameters, *times* and *ns*.
These specify the times set on *path* and are used as follows:

- If *ns* is specified,
it must be a 2-tuple of the form `(atime_ns, mtime_ns)`
where each member is an int expressing nanoseconds.
- If *times* is not `None`,
it must be a 2-tuple of the form `(atime, mtime)`
where each member is a real number expressing seconds,
rounded down to nanoseconds.
- If *times* is `None` and *ns* is unspecified,
this is equivalent to specifying `ns=(atime_ns, mtime_ns)`
where both times are the current time.

It is an error to specify tuples for both *times* and *ns*.

Note that the exact times you set here may not be returned by a subsequent
`stat()` call, depending on the resolution with which your operating
system records access and modification times; see `stat()`. The best
way to preserve exact times is to use the *st_atime_ns* and *st_mtime_ns*
fields from the `os.stat()` result object with the *ns* parameter to
`utime()`.

This function can support specifying a file descriptor,
paths relative to directory descriptors and :ref:`not
following symlinks <follow_symlinks>`.

> *Changed in version 3.3.*
> Added support for specifying *path* as an open file descriptor,
> and the *dir_fd*, *follow_symlinks*, and *ns* parameters.

> *Changed in version 3.6.*
> Accepts a path-like object.

> *Changed in version 3.15.*
> Accepts any real numbers as *times*, not only integers or floats.

### `walk(top, topdown=True, onerror=None, followlinks=False)`

Generate the file names in a directory tree by walking the tree
either top-down or bottom-up. For each directory in the tree rooted at directory
*top* (including *top* itself), it yields a 3-tuple ``(dirpath, dirnames,
filenames)``.

*dirpath* is a string, the path to the directory.  *dirnames* is a list of the
names of the subdirectories in *dirpath* (including symlinks to directories,
and excluding `'.'` and `'..'`).
*filenames* is a list of the names of the non-directory files in *dirpath*.
Note that the names in the lists contain no path components.  To get a full path
(which begins with *top*) to a file or directory in *dirpath*, do
`os.path.join(dirpath, name)`.  Whether or not the lists are sorted
depends on the file system.  If a file is removed from or added to the
*dirpath* directory during generating the lists, whether a name for that
file be included is unspecified.

If optional argument *topdown* is `True` or not specified, the triple for a
directory is generated before the triples for any of its subdirectories
(directories are generated top-down).  If *topdown* is `False`, the triple
for a directory is generated after the triples for all of its subdirectories
(directories are generated bottom-up). No matter the value of *topdown*, the
list of subdirectories is retrieved before the tuples for the directory and
its subdirectories are generated.

When *topdown* is `True`, the caller can modify the *dirnames* list in-place
(perhaps using `del` or slice assignment), and `walk()` will only
recurse into the subdirectories whose names remain in *dirnames*; this can be
used to prune the search, impose a specific order of visiting, or even to inform
`walk()` about directories the caller creates or renames before it resumes
`walk()` again.  Modifying *dirnames* when *topdown* is `False` has
no effect on the behavior of the walk, because in bottom-up mode the directories
in *dirnames* are generated before *dirpath* itself is generated.

By default, errors from the `scandir()` call are ignored.  If optional
argument *onerror* is specified, it should be a function; it will be called with
one argument, an `OSError` instance.  It can report the error to continue
with the walk, or raise the exception to abort the walk.  Note that the filename
is available as the `filename` attribute of the exception object.

By default, `walk()` will not walk down into symbolic links that resolve to
directories. Set *followlinks* to `True` to visit directories pointed to by
symlinks, on systems that support them.

> **Note:** Be aware that setting *followlinks* to `True` can lead to infinite
> recursion if a link points to a parent directory of itself. `walk()`
> does not keep track of the directories it visited already.

> **Note:** If you pass a relative pathname, don't change the current working directory
> between resumptions of `walk()`.  `walk()` never changes the current
> directory, and assumes that its caller doesn't either.

This example displays the number of bytes taken by non-directory files in each
directory under the starting directory, except that it doesn't look under any
`__pycache__` subdirectory:

```
import os
from os.path import join, getsize
for root, dirs, files in os.walk('python/Lib/xml'):
    print(root, "consumes", end=" ")
    print(sum(getsize(join(root, name)) for name in files), end=" ")
    print("bytes in", len(files), "non-directory files")
    if '__pycache__' in dirs:
        dirs.remove('__pycache__')  # don't visit __pycache__ directories
```

In the next example (simple implementation of `shutil.rmtree()`),
walking the tree bottom-up is essential, `rmdir()` doesn't allow
deleting a directory before the directory is empty:

```
# Delete everything reachable from the directory named in "top",
# assuming there are no symbolic links.
# CAUTION:  This is dangerous!  For example, if top == '/', it
# could delete all your disk files.
import os
for root, dirs, files in os.walk(top, topdown=False):
    for name in files:
        os.remove(os.path.join(root, name))
    for name in dirs:
        os.rmdir(os.path.join(root, name))
os.rmdir(top)
```

> *Changed in version 3.5.*
> This function now calls `os.scandir()` instead of `os.listdir()`,
> making it faster by reducing the number of calls to `os.stat()`.

> *Changed in version 3.6.*
> Accepts a path-like object.

### `fwalk(top='.', topdown=True, onerror=None, *, follow_symlinks=False, dir_fd=None)`

This behaves exactly like `walk()`, except that it yields a 4-tuple
`(dirpath, dirnames, filenames, dirfd)`, and it supports `dir_fd`.

*dirpath*, *dirnames* and *filenames* are identical to `walk()` output,
and *dirfd* is a file descriptor referring to the directory *dirpath*.

This function always supports :ref:`paths relative to directory descriptors
<dir_fd>` and not following symlinks.  Note however
that, unlike other functions, the `fwalk()` default value for
*follow_symlinks* is `False`.

> **Note:** Since `fwalk()` yields file descriptors, those are only valid until
> the next iteration step, so you should duplicate them (e.g. with
> `dup()`) if you want to keep them longer.

This example displays the number of bytes taken by non-directory files in each
directory under the starting directory, except that it doesn't look under any
`__pycache__` subdirectory:

```
import os
for root, dirs, files, rootfd in os.fwalk('python/Lib/xml'):
    print(root, "consumes", end=" ")
    print(sum([os.stat(name, dir_fd=rootfd).st_size for name in files]),
          end=" ")
    print("bytes in", len(files), "non-directory files")
    if '__pycache__' in dirs:
        dirs.remove('__pycache__')  # don't visit __pycache__ directories
```

In the next example, walking the tree bottom-up is essential:
`rmdir()` doesn't allow deleting a directory before the directory is
empty:

```
# Delete everything reachable from the directory named in "top",
# assuming there are no symbolic links.
# CAUTION:  This is dangerous!  For example, if top == '/', it
# could delete all your disk files.
import os
for root, dirs, files, rootfd in os.fwalk(top, topdown=False):
    for name in files:
        os.unlink(name, dir_fd=rootfd)
    for name in dirs:
        os.rmdir(name, dir_fd=rootfd)
```

> **Availability:** Unix.

> *Added in version 3.3.*

> *Changed in version 3.6.*
> Accepts a path-like object.

> *Changed in version 3.7.*
> Added support for `bytes` paths.

### `memfd_create(name[, flags=os.MFD_CLOEXEC])`

Create an anonymous file and return a file descriptor that refers to it.
*flags* must be one of the `os.MFD_*` constants available on the system
(or a bitwise ORed combination of them).  By default, the new file
descriptor is non-inheritable.

The name supplied in *name* is used as a filename and will be displayed as
the target of the corresponding symbolic link in the directory
`/proc/self/fd/`. The displayed name is always prefixed with `memfd:`
and serves only for debugging purposes. Names do not affect the behavior of
the file descriptor, and as such multiple files can have the same name
without any side effects.

> **Availability:** Linux >= 3.17 with glibc >= 2.27.

> *Added in version 3.8.*

### `MFD_CLOEXEC`

```python
MFD_ALLOW_SEALING
MFD_HUGETLB
MFD_HUGE_SHIFT
MFD_HUGE_MASK
MFD_HUGE_64KB
MFD_HUGE_512KB
MFD_HUGE_1MB
MFD_HUGE_2MB
MFD_HUGE_8MB
MFD_HUGE_16MB
MFD_HUGE_32MB
MFD_HUGE_256MB
MFD_HUGE_512MB
MFD_HUGE_1GB
MFD_HUGE_2GB
MFD_HUGE_16GB
```

These flags can be passed to `memfd_create()`.

> **Availability:** Linux >= 3.17 with glibc >= 2.27
>
> The `MFD_HUGE*` flags are only available since Linux 4.14.

> *Added in version 3.8.*

### `eventfd(initval[, flags=os.EFD_CLOEXEC])`

Create and return an event file descriptor. The file descriptors supports
raw `read()` and `write()` with a buffer size of 8,
`select()`, `poll()` and similar. See man page
eventfd(2) for more information.  By default, the
new file descriptor is non-inheritable.

*initval* is the initial value of the event counter. The initial value
must be a 32 bit unsigned integer. Please note that the initial value is
limited to a 32 bit unsigned int although the event counter is an unsigned
64 bit integer with a maximum value of 264-2.

*flags* can be constructed from `EFD_CLOEXEC`,
`EFD_NONBLOCK`, and `EFD_SEMAPHORE`.

If `EFD_SEMAPHORE` is specified and the event counter is non-zero,
`eventfd_read()` returns 1 and decrements the counter by one.

If `EFD_SEMAPHORE` is not specified and the event counter is
non-zero, `eventfd_read()` returns the current event counter value and
resets the counter to zero.

If the event counter is zero and `EFD_NONBLOCK` is not
specified, `eventfd_read()` blocks.

`eventfd_write()` increments the event counter. Write blocks if the
write operation would increment the counter to a value larger than
264-2.

Example:

```
import os

# semaphore with start value '1'
fd = os.eventfd(1, os.EFD_SEMAPHORE | os.EFD_CLOEXEC)
try:
    # acquire semaphore
    v = os.eventfd_read(fd)
    try:
        do_work()
    finally:
        # release semaphore
        os.eventfd_write(fd, v)
finally:
    os.close(fd)
```

> **Availability:** Linux >= 2.6.27 with glibc >= 2.8

> *Added in version 3.10.*
