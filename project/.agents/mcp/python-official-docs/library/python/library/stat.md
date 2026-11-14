---
title: "stat --- Interpreting stat() results"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/stat.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `stat` --- Interpreting `stat()` results

Module `stat`.

**Source code:** Lib/stat.py

The `stat` module defines constants and functions for interpreting the
results of `os.stat()`, `os.fstat()` and `os.lstat()` (if they
exist).  For complete details about the `stat`, `fstat` and
`lstat` calls, consult the documentation for your system.

> *Changed in version 3.4.*
> The stat module is backed by a C implementation.

The `stat` module defines the following functions to test for specific file
types:

### `S_ISDIR(mode)`

Return non-zero if the mode is from a directory.

### `S_ISCHR(mode)`

Return non-zero if the mode is from a character special device file.

### `S_ISBLK(mode)`

Return non-zero if the mode is from a block special device file.

### `S_ISREG(mode)`

Return non-zero if the mode is from a regular file.

### `S_ISFIFO(mode)`

Return non-zero if the mode is from a FIFO (named pipe).

### `S_ISLNK(mode)`

Return non-zero if the mode is from a symbolic link.

### `S_ISSOCK(mode)`

Return non-zero if the mode is from a socket.

### `S_ISDOOR(mode)`

Return non-zero if the mode is from a door.

> *Added in version 3.4.*

### `S_ISPORT(mode)`

Return non-zero if the mode is from an event port.

> *Added in version 3.4.*

### `S_ISWHT(mode)`

Return non-zero if the mode is from a whiteout.

> *Added in version 3.4.*

Two additional functions are defined for more general manipulation of the file's
mode:

### `S_IMODE(mode)`

Return the portion of the file's mode that can be set by
`os.chmod()`---that is, the file's permission bits, plus the sticky
bit, set-group-id, and set-user-id bits (on systems that support them).

### `S_IFMT(mode)`

Return the portion of the file's mode that describes the file type (used by the
`S_IS*()` functions above).

Normally, you would use the `os.path.is*()` functions for testing the type
of a file; the functions here are useful when you are doing multiple tests of
the same file and wish to avoid the overhead of the `stat` system call
for each test.  These are also useful when checking for information about a file
that isn't handled by `os.path`, like the tests for block and character
devices.

Example:

```
import os, sys
from stat import *

def walktree(top, callback):
    '''recursively descend the directory tree rooted at top,
       calling the callback function for each regular file'''

    for f in os.listdir(top):
        pathname = os.path.join(top, f)
        mode = os.lstat(pathname).st_mode
        if S_ISDIR(mode):
            # It's a directory, recurse into it
            walktree(pathname, callback)
        elif S_ISREG(mode):
            # It's a file, call the callback function
            callback(pathname)
        else:
            # Unknown file type, print a message
            print('Skipping %s' % pathname)

def visitfile(file):
    print('visiting', file)

if __name__ == '__main__':
    walktree(sys.argv[1], visitfile)
```

An additional utility function is provided to convert a file's mode in a human
readable string:

### `filemode(mode)`

Convert a file's mode to a string of the form '-rwxrwxrwx'.

> *Added in version 3.3.*

> *Changed in version 3.4.*
> The function supports `S_IFDOOR`, `S_IFPORT` and
> `S_IFWHT`.

All the variables below are simply symbolic indexes into the 10-tuple returned
by `os.stat()`, `os.fstat()` or `os.lstat()`.

### `ST_MODE`

Inode protection mode.

### `ST_INO`

Inode number.

### `ST_DEV`

Device inode resides on.

### `ST_NLINK`

Number of links to the inode.

### `ST_UID`

User id of the owner.

### `ST_GID`

Group id of the owner.

### `ST_SIZE`

Size in bytes of a plain file; amount of data waiting on some special files.

### `ST_ATIME`

Time of last access.

### `ST_MTIME`

Time of last modification.

### `ST_CTIME`

The "ctime" as reported by the operating system.  On some systems (like Unix) is
the time of the last metadata change, and, on others (like Windows), is the
creation time (see platform documentation for details).

The interpretation of "file size" changes according to the file type.  For plain
files this is the size of the file in bytes.  For FIFOs and sockets under most
flavors of Unix (including Linux in particular), the "size" is the number of
bytes waiting to be read at the time of the call to `os.stat()`,
`os.fstat()`, or `os.lstat()`; this can sometimes be useful, especially
for polling one of these special files after a non-blocking open.  The meaning
of the size field for other character and block devices varies more, depending
on the implementation of the underlying system call.

The variables below define the flags used in the `ST_MODE` field.

Use of the functions above is more portable than use of the first set of flags:

### `S_IFSOCK`

Socket.

### `S_IFLNK`

Symbolic link.

### `S_IFREG`

Regular file.

### `S_IFBLK`

Block device.

### `S_IFDIR`

Directory.

### `S_IFCHR`

Character device.

### `S_IFIFO`

FIFO.

### `S_IFDOOR`

Door.

> *Added in version 3.4.*

### `S_IFPORT`

Event port.

> *Added in version 3.4.*

### `S_IFWHT`

Whiteout.

> *Added in version 3.4.*

> **Note:** `S_IFDOOR`, `S_IFPORT` or `S_IFWHT` are defined as
> 0 when the platform does not have support for the file types.

The following flags can also be used in the *mode* argument of `os.chmod()`:

### `S_ISUID`

Set UID bit.

### `S_ISGID`

Set-group-ID bit.  This bit has several special uses.  For a directory
it indicates that BSD semantics is to be used for that directory:
files created there inherit their group ID from the directory, not
from the effective group ID of the creating process, and directories
created there will also get the `S_ISGID` bit set.  For a
file that does not have the group execution bit (`S_IXGRP`)
set, the set-group-ID bit indicates mandatory file/record locking
(see also `S_ENFMT`).

### `S_ISVTX`

Sticky bit.  When this bit is set on a directory it means that a file
in that directory can be renamed or deleted only by the owner of the
file, by the owner of the directory, or by a privileged process.

### `S_IRWXU`

Mask for file owner permissions.

### `S_IRUSR`

Owner has read permission.

### `S_IWUSR`

Owner has write permission.

### `S_IXUSR`

Owner has execute permission.

### `S_IRWXG`

Mask for group permissions.

### `S_IRGRP`

Group has read permission.

### `S_IWGRP`

Group has write permission.

### `S_IXGRP`

Group has execute permission.

### `S_IRWXO`

Mask for permissions for others (not in group).

### `S_IROTH`

Others have read permission.

### `S_IWOTH`

Others have write permission.

### `S_IXOTH`

Others have execute permission.

### `S_ENFMT`

System V file locking enforcement.  This flag is shared with `S_ISGID`:
file/record locking is enforced on files that do not have the group
execution bit (`S_IXGRP`) set.

### `S_IREAD`

Unix V7 synonym for `S_IRUSR`.

### `S_IWRITE`

Unix V7 synonym for `S_IWUSR`.

### `S_IEXEC`

Unix V7 synonym for `S_IXUSR`.

The following flags can be used in the *flags* argument of `os.chflags()`:

### `UF_SETTABLE`

All user settable flags.

> *Added in version 3.13.*

### `UF_NODUMP`

Do not dump the file.

### `UF_IMMUTABLE`

The file may not be changed.

### `UF_APPEND`

The file may only be appended to.

### `UF_OPAQUE`

The directory is opaque when viewed through a union stack.

### `UF_NOUNLINK`

The file may not be renamed or deleted.

### `UF_COMPRESSED`

The file is stored compressed (macOS 10.6+).

### `UF_TRACKED`

Used for handling document IDs (macOS)

> *Added in version 3.13.*

### `UF_DATAVAULT`

The file needs an entitlement for reading or writing (macOS 10.13+)

> *Added in version 3.13.*

### `UF_HIDDEN`

The file should not be displayed in a GUI (macOS 10.5+).

### `SF_SETTABLE`

All super-user changeable flags

> *Added in version 3.13.*

### `SF_SUPPORTED`

All super-user supported flags

> **Availability:** macOS

> *Added in version 3.13.*

### `SF_SYNTHETIC`

All super-user read-only synthetic flags

> **Availability:** macOS

> *Added in version 3.13.*

### `SF_ARCHIVED`

The file may be archived.

### `SF_IMMUTABLE`

The file may not be changed.

### `SF_APPEND`

The file may only be appended to.

### `SF_RESTRICTED`

The file needs an entitlement to write to (macOS 10.13+)

> *Added in version 3.13.*

### `SF_NOUNLINK`

The file may not be renamed or deleted.

### `SF_SNAPSHOT`

The file is a snapshot file.

### `SF_FIRMLINK`

The file is a firmlink (macOS 10.15+)

> *Added in version 3.13.*

### `SF_DATALESS`

The file is a dataless object (macOS 10.15+)

> *Added in version 3.13.*

See the *BSD or macOS systems man page chflags(2) for more information.

On Windows, the following file attribute constants are available for use when
testing bits in the `st_file_attributes` member returned by `os.stat()`.
See the `Windows API documentation
<https://msdn.microsoft.com/en-us/library/windows/desktop/gg258117.aspx>`_
for more detail on the meaning of these constants.

### `FILE_ATTRIBUTE_ARCHIVE`

```python
FILE_ATTRIBUTE_COMPRESSED
FILE_ATTRIBUTE_DEVICE
FILE_ATTRIBUTE_DIRECTORY
FILE_ATTRIBUTE_ENCRYPTED
FILE_ATTRIBUTE_HIDDEN
FILE_ATTRIBUTE_INTEGRITY_STREAM
FILE_ATTRIBUTE_NORMAL
FILE_ATTRIBUTE_NOT_CONTENT_INDEXED
FILE_ATTRIBUTE_NO_SCRUB_DATA
FILE_ATTRIBUTE_OFFLINE
FILE_ATTRIBUTE_READONLY
FILE_ATTRIBUTE_REPARSE_POINT
FILE_ATTRIBUTE_SPARSE_FILE
FILE_ATTRIBUTE_SYSTEM
FILE_ATTRIBUTE_TEMPORARY
FILE_ATTRIBUTE_VIRTUAL
```

> *Added in version 3.5.*

On Windows, the following constants are available for comparing against the
`st_reparse_tag` member returned by `os.lstat()`. These are well-known
constants, but are not an exhaustive list.

### `IO_REPARSE_TAG_SYMLINK`

```python
IO_REPARSE_TAG_MOUNT_POINT
IO_REPARSE_TAG_APPEXECLINK
```

> *Added in version 3.8.*

On Linux, the following file attribute constants are available for use when
testing bits in the `stx_attributes` and
`stx_attributes_mask` members returned by
`os.statx()`.  See the statx(2) man page for more detail on the
meaning of these constants.

### `STATX_ATTR_COMPRESSED`

```python
STATX_ATTR_IMMUTABLE
STATX_ATTR_APPEND
STATX_ATTR_NODUMP
STATX_ATTR_ENCRYPTED
STATX_ATTR_AUTOMOUNT
STATX_ATTR_MOUNT_ROOT
STATX_ATTR_VERITY
STATX_ATTR_DAX
STATX_ATTR_WRITE_ATOMIC
```

> *Added in version 3.15.*
