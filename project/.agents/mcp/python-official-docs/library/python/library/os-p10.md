---
title: "os --- Miscellaneous operating system interfaces (part 10 of 16)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/os.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# os --- Miscellaneous operating system interfaces (part 10 of 16)

### `st_reparse_tag`

When `st_file_attributes` has the `FILE_ATTRIBUTE_REPARSE_POINT`
set, this field contains the tag identifying the type of reparse point.
See the `IO_REPARSE_TAG_*`
constants in the `stat` module.

The standard module `stat` defines functions and constants that are
useful for extracting information from a `stat` structure. (On
Windows, some items are filled with dummy values.)

For backward compatibility, a `stat_result` instance is also
accessible as a tuple of at least 10 integers giving the most important (and
portable) members of the `stat` structure, in the order
`st_mode`, `st_ino`, `st_dev`, `st_nlink`,
`st_uid`, `st_gid`, `st_size`, `st_atime`,
`st_mtime`, `st_ctime`. More items may be added at the end by
some implementations. For compatibility with older Python versions,
accessing `stat_result` as a tuple always returns integers.

> *Changed in version 3.5.*
> Windows now returns the file index as `st_ino` when
> available.

> *Changed in version 3.7.*
> Added the `st_fstype` member to Solaris/derivatives.

> *Changed in version 3.8.*
> Added the `st_reparse_tag` member on Windows.

> *Changed in version 3.8.*
> On Windows, the `st_mode` member now identifies special
> files as `S_IFCHR`, `S_IFIFO` or
> `S_IFBLK` as appropriate.

> *Changed in version 3.12.*
> On Windows, `st_ctime` is deprecated. Eventually, it will
> contain the last metadata change time, for consistency with other
> platforms, but for now still contains creation time.
> Use `st_birthtime` for the creation time.
> On Windows, `st_ino` may now be up to 128 bits, depending
> on the file system. Previously it would not be above 64 bits, and
> larger file identifiers would be arbitrarily packed.
>
> On Windows, `st_rdev` no longer returns a value. Previously
> it would contain the same as `st_dev`, which was incorrect.
>
> Added the `st_birthtime` member on Windows.

### `statx(path, mask, *, flags=0, dir_fd=None, follow_symlinks=True)`

Get the status of a file or file descriptor by performing a `statx`
system call on the given path.

*path* is a path-like object or an open file descriptor. *mask* is a
combination of the module-level `STATX_*` constants
specifying the information to retrieve. *flags* is a combination of the
module-level `AT_STATX_*` constants and/or
`AT_NO_AUTOMOUNT`. Returns a `statx_result` object whose
`stx_mask` attribute specifies the information
actually retrieved (which may differ from *mask*).

This function supports specifying a file descriptor,
paths relative to directory descriptors, and
not following symlinks.

> **See also:** The statx(2) man page.

> **Availability:** Linux >= 4.11 with glibc >= 2.28.

> *Added in version 3.15.*

### class `statx_result`

Information about a file returned by `os.statx()`.

`statx_result` has the following attributes:

### `stx_atime`

Time of most recent access expressed in seconds.

Equal to `None` if `STATX_ATIME` is missing from
`stx_mask`.

### `stx_atime_ns`

Time of most recent access expressed in nanoseconds as an integer.

Equal to `None` if `STATX_ATIME` is missing from
`stx_mask`.

### `stx_atomic_write_segments_max`

Maximum iovecs for direct I/O with torn-write protection.

Equal to `None` if `STATX_WRITE_ATOMIC` is missing from
`stx_mask`.

> **Availability:** Linux >= 4.11 with glibc >= 2.28 and build-time kernel
> userspace API headers >= 6.11.

### `stx_atomic_write_unit_max`

Maximum size for direct I/O with torn-write protection.

Equal to `None` if `STATX_WRITE_ATOMIC` is missing from
`stx_mask`.

> **Availability:** Linux >= 4.11 with glibc >= 2.28 and build-time kernel
> userspace API headers >= 6.11.

### `stx_atomic_write_unit_max_opt`

Maximum optimized size for direct I/O with torn-write protection.

Equal to `None` if `STATX_WRITE_ATOMIC` is missing from
`stx_mask`.

> **Availability:** Linux >= 4.11 with glibc >= 2.28 and build-time kernel
> userspace API headers >= 6.16.

### `stx_atomic_write_unit_min`

Minimum size for direct I/O with torn-write protection.

Equal to `None` if `STATX_WRITE_ATOMIC` is missing from
`stx_mask`.

> **Availability:** Linux >= 4.11 with glibc >= 2.28 and build-time kernel
> userspace API headers >= 6.11.

### `stx_attributes`

Bitmask of `STATX_ATTR_*` constants
specifying the attributes of this file.

### `stx_attributes_mask`

A mask indicating which bits in `stx_attributes` are supported by
the VFS and the filesystem.

### `stx_blksize`

"Preferred" blocksize for efficient file system I/O. Writing to a file in
smaller chunks may cause an inefficient read-modify-rewrite.

### `stx_blocks`

Number of 512-byte blocks allocated for file.
This may be smaller than `stx_size`/512 when the file has holes.

Equal to `None` if `STATX_BLOCKS` is missing from
`stx_mask`.

### `stx_btime`

Time of file creation expressed in seconds.

Equal to `None` if `STATX_BTIME` is missing from
`stx_mask`.

### `stx_btime_ns`

Time of file creation expressed in nanoseconds as an integer.

Equal to `None` if `STATX_BTIME` is missing from
`stx_mask`.

### `stx_ctime`

Time of most recent metadata change expressed in seconds.

Equal to `None` if `STATX_CTIME` is missing from
`stx_mask`.

### `stx_ctime_ns`

Time of most recent metadata change expressed in nanoseconds as an
integer.

Equal to `None` if `STATX_CTIME` is missing from
`stx_mask`.

### `stx_dev`

Identifier of the device on which this file resides.

### `stx_dev_major`

Major number of the device on which this file resides.

### `stx_dev_minor`

Minor number of the device on which this file resides.

### `stx_dio_mem_align`

Direct I/O memory buffer alignment requirement.

Equal to `None` if `STATX_DIOALIGN` is missing from
`stx_mask`.

> **Availability:** Linux >= 4.11 with glibc >= 2.28 and build-time kernel
> userspace API headers >= 6.1.

### `stx_dio_offset_align`

Direct I/O file offset alignment requirement.

Equal to `None` if `STATX_DIOALIGN` is missing from
`stx_mask`.

> **Availability:** Linux >= 4.11 with glibc >= 2.28 and build-time kernel
> userspace API headers >= 6.1.

### `stx_dio_read_offset_align`

Direct I/O file offset alignment requirement for reads.

Equal to `None` if `STATX_DIO_READ_ALIGN` is missing from
`stx_mask`.

> **Availability:** Linux >= 4.11 with glibc >= 2.28 and build-time kernel
> userspace API headers >= 6.14.

### `stx_gid`

Group identifier of the file owner.

Equal to `None` if `STATX_GID` is missing from
`stx_mask`.

### `stx_ino`

Inode number.

Equal to `None` if `STATX_INO` is missing from
`stx_mask`.

### `stx_mask`

Bitmask of `STATX_*` constants specifying the
information retrieved, which may differ from what was requested.

### `stx_mnt_id`

Mount identifier.

Equal to `None` if `STATX_MNT_ID` is missing from
`stx_mask`.

> **Availability:** Linux >= 4.11 with glibc >= 2.28 and build-time kernel
> userspace API headers >= 5.8.

### `stx_mode`

File mode: file type and file mode bits (permissions).

Equal to `None` if `STATX_TYPE | STATX_MODE`
is missing from `stx_mask`.

### `stx_mtime`

Time of most recent content modification expressed in seconds.

Equal to `None` if `STATX_MTIME` is missing from
`stx_mask`.

### `stx_mtime_ns`

Time of most recent content modification expressed in nanoseconds as an
integer.

Equal to `None` if `STATX_MTIME` is missing from
`stx_mask`.

### `stx_nlink`

Number of hard links.

Equal to `None` if `STATX_NLINK` is missing from
`stx_mask`.

### `stx_rdev`

Type of device if an inode device.

### `stx_rdev_major`

Major number of the device this file represents.

### `stx_rdev_minor`

Minor number of the device this file represents.

### `stx_size`

Size of the file in bytes, if it is a regular file or a symbolic link.
The size of a symbolic link is the length of the pathname it contains,
without a terminating null byte.

Equal to `None` if `STATX_SIZE` is missing from
`stx_mask`.

### `stx_subvol`

Subvolume identifier.

Equal to `None` if `STATX_SUBVOL` is missing from
`stx_mask`.

> **Availability:** Linux >= 4.11 with glibc >= 2.28 and build-time kernel
> userspace API headers >= 6.10.

### `stx_uid`

User identifier of the file owner.

Equal to `None` if `STATX_UID` is missing from
`stx_mask`.

> **See also:** The statx(2) man page.

> **Availability:** Linux >= 4.11 with glibc >= 2.28.

> *Added in version 3.15.*

### `STATX_TYPE`

```python
STATX_MODE
STATX_NLINK
STATX_UID
STATX_GID
STATX_ATIME
STATX_MTIME
STATX_CTIME
STATX_INO
STATX_SIZE
STATX_BLOCKS
STATX_BASIC_STATS
STATX_BTIME
STATX_MNT_ID
STATX_DIOALIGN
STATX_MNT_ID_UNIQUE
STATX_SUBVOL
STATX_WRITE_ATOMIC
STATX_DIO_READ_ALIGN
```

Bitflags for use in the *mask* parameter to `os.statx()`.  Some of these
flags may be available even when their corresponding members in
`statx_result` are not available.

> **Availability:** Linux >= 4.11 with glibc >= 2.28.

> *Added in version 3.15.*

### `AT_STATX_FORCE_SYNC`

A flag for the `os.statx()` function.  Requests that the kernel return
up-to-date information even when doing so is expensive (for example,
requiring a round trip to the server for a file on a network filesystem).

> **Availability:** Linux >= 4.11 with glibc >= 2.28.

> *Added in version 3.15.*

### `AT_STATX_DONT_SYNC`

A flag for the `os.statx()` function.  Requests that the kernel return
cached information if possible.

> **Availability:** Linux >= 4.11 with glibc >= 2.28.

> *Added in version 3.15.*

### `AT_STATX_SYNC_AS_STAT`

A flag for the `os.statx()` function.  This flag is defined as `0`, so
it has no effect, but it can be used to explicitly indicate neither
`AT_STATX_FORCE_SYNC` nor `AT_STATX_DONT_SYNC` is being passed.
In the absence of the other two flags, the kernel will generally return
information as fresh as `os.stat()` would return.

> **Availability:** Linux >= 4.11 with glibc >= 2.28.

> *Added in version 3.15.*

### `AT_NO_AUTOMOUNT`

If the final component of a path is an automount point, operate on the
automount point instead of performing the automount.  On Linux,
`os.stat()`, `os.fstat()` and `os.lstat()` always behave this
way.

> **Availability:** Linux.

> *Added in version 3.15.*

### `statvfs(path)`

Perform a statvfs(3) system call on the given path.  The return value
is a `statvfs_result` whose attributes describe the filesystem
on the given path and correspond to the members of the `statvfs`
structure.

This function can support specifying a file descriptor.

> **Availability:** Unix.

> *Changed in version 3.3.*
> Added support for specifying *path* as an open file descriptor.

> *Changed in version 3.6.*
> Accepts a path-like object.

### class `statvfs_result`

Filesystem statistics returned by `os.statvfs()` and `os.fstatvfs()`.
See statvfs(3) for more details.

### `f_bsize`

Block size.

### `f_frsize`

Fragment size.

### `f_blocks`

Number of `f_frsize` sized blocks the filesystem
can contain.

### `f_bfree`

Number of free blocks.

### `f_bavail`

Number of free blocks for unprivileged users.

### `f_files`

Number of file entries, inodes, the filesystem can contain.

### `f_ffree`

Number of free files entries.

### `f_favail`

Number of free file entries for unprivileged users.

### `f_flag`

Bit-mask of mount flags.  The following flags are defined:
`ST_RDONLY`, `ST_NOSUID`, `ST_NODEV`,
`ST_NOEXEC`, `ST_SYNCHRONOUS`, `ST_MANDLOCK`,
`ST_WRITE`, `ST_APPEND`, `ST_IMMUTABLE`,
`ST_NOATIME`, `ST_NODIRATIME`, and `ST_RELATIME`.

### `f_namemax`

Filesystem max filename length. OS specific limitations such as
Windows MAX_PATH and those described in Linux
pathname(7) may exist.

### `f_fsid`

Filesystem ID.

> *Added in version 3.7.*

The following flags are used in `statvfs_result.f_flag`.

### `ST_RDONLY`

Read-only filesystem.

> *Added in version 3.2.*

### `ST_NOSUID`

Setuid/setgid bits are disabled or not supported.

> *Added in version 3.2.*

### `ST_NODEV`

Disallow access to device special files.

> **Availability:** Linux.

> *Added in version 3.4.*

### `ST_NOEXEC`

Disallow program execution.

> **Availability:** Linux.

> *Added in version 3.4.*

### `ST_SYNCHRONOUS`

Writes are synced at once.

> **Availability:** Linux.

> *Added in version 3.4.*

### `ST_MANDLOCK`

Allow mandatory locks on an FS.

> **Availability:** Linux.

> *Added in version 3.4.*

### `ST_WRITE`

Write on file/directory/symlink.

> **Availability:** Linux.

> *Added in version 3.4.*

### `ST_APPEND`

Append-only file.

> **Availability:** Linux.

> *Added in version 3.4.*

### `ST_IMMUTABLE`

Immutable file.

> **Availability:** Linux.

> *Added in version 3.4.*

### `ST_NOATIME`

Do not update access times.

> **Availability:** Linux.

> *Added in version 3.4.*

### `ST_NODIRATIME`

Do not update directory access times.

> **Availability:** Linux.

> *Added in version 3.4.*

### `ST_RELATIME`

Update atime relative to mtime/ctime.

> **Availability:** Linux.

> *Added in version 3.4.*

### `supports_dir_fd`

A `set` object indicating which functions in the `os`
module accept an open file descriptor for their *dir_fd* parameter.
Different platforms provide different features, and the underlying
functionality Python uses to implement the *dir_fd* parameter is not
available on all platforms Python supports.  For consistency's sake,
functions that may support *dir_fd* always allow specifying the
parameter, but will throw an exception if the functionality is used
when it's not locally available. (Specifying `None` for *dir_fd*
is always supported on all platforms.)

To check whether a particular function accepts an open file descriptor
for its *dir_fd* parameter, use the `in` operator on `supports_dir_fd`.
As an example, this expression evaluates to `True` if `os.stat()`
accepts open file descriptors for *dir_fd* on the local platform:

```
os.stat in os.supports_dir_fd
```

Currently *dir_fd* parameters only work on Unix platforms;
none of them work on Windows.

> *Added in version 3.3.*

### `supports_effective_ids`

A `set` object indicating whether `os.access()` permits
specifying `True` for its *effective_ids* parameter on the local platform.
(Specifying `False` for *effective_ids* is always supported on all
platforms.)  If the local platform supports it, the collection will contain
`os.access()`; otherwise it will be empty.

This expression evaluates to `True` if `os.access()` supports
`effective_ids=True` on the local platform:

```
os.access in os.supports_effective_ids
```

Currently *effective_ids* is only supported on Unix platforms;
it does not work on Windows.

> *Added in version 3.3.*
