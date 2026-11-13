---
title: "File system (part 19 of 20)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/fs.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# File system (part 19 of 20)

### `fs.constants`

* Type: {Object}

Returns an object containing commonly used constants for file system
operations.

#### FS constants

The following constants are exported by `fs.constants` and `fsPromises.constants`.

Not every constant will be available on every operating system;
this is especially important for Windows, where many of the POSIX specific
definitions are not available.
For portable applications it is recommended to check for their presence
before use.

To use more than one constant, use the bitwise OR `|` operator.

Example:

```mjs
import { open, constants } from 'node:fs';

const {
  O_RDWR,
  O_CREAT,
  O_EXCL,
} = constants;

open('/path/to/my/file', O_RDWR | O_CREAT | O_EXCL, (err, fd) => {
  // ...
});
```

##### File access constants

The following constants are meant for use as the `mode` parameter passed to
`fsPromises.access()`, `fs.access()`, and `fs.accessSync()`.

     | Constant
     | Description

     | `F_OK`
     | Flag indicating that the file is visible to the calling process.
     This is useful for determining if a file exists, but says nothing
     about `rwx` permissions. Default if no mode is specified.

     | `R_OK`
     | Flag indicating that the file can be read by the calling process.

     | `W_OK`
     | Flag indicating that the file can be written by the calling
    process.

     | `X_OK`
     | Flag indicating that the file can be executed by the calling
    process. This has no effect on Windows
    (will behave like `fs.constants.F_OK`).

The definitions are also available on Windows.

##### File copy constants

The following constants are meant for use with `fs.copyFile()`.

     | Constant
     | Description

     | `COPYFILE_EXCL`
     | If present, the copy operation will fail with an error if the
    destination path already exists.

     | `COPYFILE_FICLONE`
     | If present, the copy operation will attempt to create a
    copy-on-write reflink. If the underlying platform does not support
    copy-on-write, then a fallback copy mechanism is used.

     | `COPYFILE_FICLONE_FORCE`
     | If present, the copy operation will attempt to create a
    copy-on-write reflink. If the underlying platform does not support
    copy-on-write, then the operation will fail with an error.

The definitions are also available on Windows.

##### File open constants

The following constants are meant for use with `fs.open()`.

     | Constant
     | Description

     | `O_RDONLY`
     | Flag indicating to open a file for read-only access.

     | `O_WRONLY`
     | Flag indicating to open a file for write-only access.

     | `O_RDWR`
     | Flag indicating to open a file for read-write access.

     | `O_CREAT`
     | Flag indicating to create the file if it does not already exist.

     | `O_EXCL`
     | Flag indicating that opening a file should fail if the
    `O_CREAT` flag is set and the file already exists.

     | `O_NOCTTY`
     | Flag indicating that if path identifies a terminal device, opening the
    path shall not cause that terminal to become the controlling terminal for
    the process (if the process does not already have one).

     | `O_TRUNC`
     | Flag indicating that if the file exists and is a regular file, and the
    file is opened successfully for write access, its length shall be truncated
    to zero.

     | `O_APPEND`
     | Flag indicating that data will be appended to the end of the file.

     | `O_DIRECTORY`
     | Flag indicating that the open should fail if the path is not a
    directory.

   | `O_NOATIME`
     | Flag indicating reading accesses to the file system will no longer
    result in an update to the `atime` information associated with
    the file. This flag is available on Linux operating systems only.

     | `O_NOFOLLOW`
     | Flag indicating that the open should fail if the path is a symbolic
    link.

     | `O_SYNC`
     | Flag indicating that the file is opened for synchronized I/O with write
    operations waiting for file integrity. On Windows, this maps to
    `FILE_FLAG_WRITE_THROUGH`.

     | `O_DSYNC`
     | Flag indicating that the file is opened for synchronized I/O with write
    operations waiting for data integrity. On Windows, this maps to
    `FILE_FLAG_WRITE_THROUGH`.

     | `O_SYMLINK`
     | Flag indicating to open the symbolic link itself rather than the
    resource it is pointing to.

     | `O_DIRECT`
     | When set, an attempt will be made to minimize caching effects of file
    I/O. On Windows, this maps to `FILE_FLAG_NO_BUFFERING`.

     | `O_NONBLOCK`
     | Flag indicating to open the file in nonblocking mode when possible.

     | `UV_FS_O_FILEMAP`
     | When set, a memory file mapping is used to access the file. This flag
    is available on Windows operating systems only. On other operating systems,
    this flag is ignored.

     | `UV_FS_O_TEMPORARY`
     | When set, the file is deleted automatically when the last handle to it
    is closed. This flag is available on Windows operating systems only. On
    other operating systems, this flag is ignored.

     | `UV_FS_O_SHORT_LIVED`
     | Hint that the file is short-lived, so the system avoids flushing it to
    disk when possible. This flag is available on Windows operating systems
    only. On other operating systems, this flag is ignored.

     | `UV_FS_O_SEQUENTIAL`
     | Hint that the file is accessed sequentially from beginning to end, to
    optimize caching. This flag is available on Windows operating systems only.
    On other operating systems, this flag is ignored.

     | `UV_FS_O_RANDOM`
     | Hint that the file is accessed randomly, to optimize caching. This flag
    is available on Windows operating systems only. On other operating systems,
    this flag is ignored.

On Windows, only `O_APPEND`, `O_CREAT`, `O_EXCL`, `O_RDONLY`, `O_RDWR`,
`O_TRUNC`, `O_WRONLY`, `UV_FS_O_FILEMAP`, `UV_FS_O_TEMPORARY`,
`UV_FS_O_SHORT_LIVED`, `UV_FS_O_SEQUENTIAL`, and `UV_FS_O_RANDOM` are
available.

##### File type constants

The following constants are meant for use with the {fs.Stats} object's
`mode` property for determining a file's type.

     | Constant
     | Description

     | `S_IFMT`
     | Bit mask used to extract the file type code.

     | `S_IFREG`
     | File type constant for a regular file.

     | `S_IFDIR`
     | File type constant for a directory.

     | `S_IFCHR`
     | File type constant for a character-oriented device file.

     | `S_IFBLK`
     | File type constant for a block-oriented device file.

     | `S_IFIFO`
     | File type constant for a FIFO/pipe.

     | `S_IFLNK`
     | File type constant for a symbolic link.

     | `S_IFSOCK`
     | File type constant for a socket.

On Windows, only `S_IFCHR`, `S_IFDIR`, `S_IFLNK`, `S_IFMT`, and `S_IFREG`,
are available.

##### File mode constants

The following constants are meant for use with the {fs.Stats} object's
`mode` property for determining the access permissions for a file.

     | Constant
     | Description

     | `S_IRWXU`
     | File mode indicating readable, writable, and executable by owner.

     | `S_IRUSR`
     | File mode indicating readable by owner.

     | `S_IWUSR`
     | File mode indicating writable by owner.

     | `S_IXUSR`
     | File mode indicating executable by owner.

     | `S_IRWXG`
     | File mode indicating readable, writable, and executable by group.

     | `S_IRGRP`
     | File mode indicating readable by group.

     | `S_IWGRP`
     | File mode indicating writable by group.

     | `S_IXGRP`
     | File mode indicating executable by group.

     | `S_IRWXO`
     | File mode indicating readable, writable, and executable by others.

     | `S_IROTH`
     | File mode indicating readable by others.

     | `S_IWOTH`
     | File mode indicating writable by others.

     | `S_IXOTH`
     | File mode indicating executable by others.

On Windows, only `S_IRUSR` and `S_IWUSR` are available.
