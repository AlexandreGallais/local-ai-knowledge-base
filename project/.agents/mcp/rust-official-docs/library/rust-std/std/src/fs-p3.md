---
title: "std::fs (part 3 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/fs.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::fs (part 3 of 5)

## File::set_times

```rust
pub fn set_times(&self, times: FileTimes) -> io::Result<()>
```

Changes the timestamps of the underlying file.

# Platform-specific behavior

This function currently corresponds to the `futimens` function on Unix (falling back to
`futimes` on macOS before 10.13) and the `SetFileTime` function on Windows. Note that this
may change in the future.

On most platforms, including UNIX and Windows platforms, this function can also change the
timestamps of a directory. To get a `File` representing a directory in order to call
`set_times`, open the directory with `File::open` without attempting to obtain write
permission.

# Errors

This function will return an error if the user lacks permission to change timestamps on the
underlying file. It may also return an error in other os-specific unspecified cases.

This function may return an error if the operating system lacks support to change one or
more of the timestamps set in the `FileTimes` structure.

# Examples

```rust
fn main() -> std::io::Result<()> {
    use std::fs::{self, File, FileTimes};

    let src = fs::metadata("src")?;
    let dest = File::open("dest")?;
    let times = FileTimes::new()
        .set_accessed(src.accessed()?)
        .set_modified(src.modified()?);
    dest.set_times(times)?;
    Ok(())
}
```

## File::set_modified

```rust
pub fn set_modified(&self, time: SystemTime) -> io::Result<()>
```

Changes the modification time of the underlying file.

This is an alias for `set_times(FileTimes::new().set_modified(time))`.

## OpenOptions::new

```rust
pub fn new() -> Self
```

Creates a blank new set of options ready for configuration.

All options are initially set to `false`.

# Examples

```rust
use std::fs::OpenOptions;

let mut options = OpenOptions::new();
let file = options.read(true).open("foo.txt");
```

## OpenOptions::read

```rust
pub fn read(&mut self, read: bool) -> &mut Self
```

Sets the option for read access.

This option, when true, will indicate that the file should be
`read`-able if opened.

# Examples

```rust
use std::fs::OpenOptions;

let file = OpenOptions::new().read(true).open("foo.txt");
```

## OpenOptions::write

```rust
pub fn write(&mut self, write: bool) -> &mut Self
```

Sets the option for write access.

This option, when true, will indicate that the file should be
`write`-able if opened.

If the file already exists, any write calls on it will overwrite its
contents, without truncating it.

# Examples

```rust
use std::fs::OpenOptions;

let file = OpenOptions::new().write(true).open("foo.txt");
```

## OpenOptions::append

```rust
pub fn append(&mut self, append: bool) -> &mut Self
```

Sets the option for the append mode.

This option, when true, means that writes will append to a file instead
of overwriting previous contents.
Note that setting `.write(true).append(true)` has the same effect as
setting only `.append(true)`.

Append mode guarantees that writes will be positioned at the current end of file,
even when there are other processes or threads appending to the same file. This is
unlike `[seek]\([SeekFrom]::[End]\(0))` followed by `write()`, which
has a race between seeking and writing during which another writer can write, with
our `write()` overwriting their data.

Keep in mind that this does not necessarily guarantee that data appended by
different processes or threads does not interleave. The amount of data accepted a
single `write()` call depends on the operating system and file system. A
successful `write()` is allowed to write only part of the given data, so even if
you're careful to provide the whole message in a single call to `write()`, there
is no guarantee that it will be written out in full. If you rely on the filesystem
accepting the message in a single write, make sure that all data that belongs
together is written in one operation. This can be done by concatenating strings
before passing them to `write()`.

If a file is opened with both read and append access, beware that after
opening, and after every write, the position for reading may be set at the
end of the file. So, before writing, save the current position (using
`[Seek]::[stream_position]`), and restore it before the next read.

## Note

This function doesn't create the file if it doesn't exist. Use the
`OpenOptions::create` method to do so.

# Examples

```rust
use std::fs::OpenOptions;

let file = OpenOptions::new().append(true).open("foo.txt");
```

## OpenOptions::truncate

```rust
pub fn truncate(&mut self, truncate: bool) -> &mut Self
```

Sets the option for truncating a previous file.

If a file is successfully opened with this option set to true, it will truncate
the file to 0 length if it already exists.

The file must be opened with write access for truncate to work.

# Examples

```rust
use std::fs::OpenOptions;

let file = OpenOptions::new().write(true).truncate(true).open("foo.txt");
```

## OpenOptions::create

```rust
pub fn create(&mut self, create: bool) -> &mut Self
```

Sets the option to create a new file, or open it if it already exists.

In order for the file to be created, `OpenOptions::write` or
`OpenOptions::append` access must be used.

See also `std::fs::write()`[self::write] for a simple function to
create a file with some given data.

# Errors

If `.create(true)` is set without `.write(true)` or `.append(true)`,
calling `open` will fail with `InvalidInput` error.
# Examples

```rust
use std::fs::OpenOptions;

let file = OpenOptions::new().write(true).create(true).open("foo.txt");
```

## OpenOptions::create_new

```rust
pub fn create_new(&mut self, create_new: bool) -> &mut Self
```

Sets the option to create a new file, failing if it already exists.

No file is allowed to exist at the target location, also no (dangling) symlink. In this
way, if the call succeeds, the file returned is guaranteed to be new.
If a file exists at the target location, creating a new file will fail with `AlreadyExists`
or another error based on the situation. See `OpenOptions::open` for a
non-exhaustive list of likely errors.

This option is useful because it is atomic. Otherwise between checking
whether a file exists and creating a new one, the file may have been
created by another process (a [TOCTOU] race condition / attack).

If `.create_new(true)` is set, `.create()` and `.truncate()` are
ignored.

The file must be opened with write or append access in order to create
a new file.

# Examples

```rust
use std::fs::OpenOptions;

let file = OpenOptions::new().write(true)
                             .create_new(true)
                             .open("foo.txt");
```

## OpenOptions::open

```rust
pub fn open<P: AsRef<Path>>(&self, path: P) -> io::Result<File>
```

Opens a file at `path` with the options specified by `self`.

# Errors

This function will return an error under a number of different
circumstances. Some of these error conditions are listed here, together
with their `io::ErrorKind`. The mapping to `io::ErrorKind`s is not
part of the compatibility contract of the function.

* `NotFound`: The specified file does not exist and neither `create`
  or `create_new` is set.
* `NotFound`: One of the directory components of the file path does
  not exist.
* `PermissionDenied`: The user lacks permission to get the specified
  access rights for the file.
* `PermissionDenied`: The user lacks permission to open one of the
  directory components of the specified path.
* `AlreadyExists`: `create_new` was specified and the file already
  exists.
* `InvalidInput`: Invalid combinations of open options (truncate
  without write access, create without write or append access,
  no access mode set, etc.).

The following errors don't match any existing `io::ErrorKind` at the moment:
* One of the directory components of the specified file path
  was not, in fact, a directory.
* Filesystem-level errors: full disk, write permission
  requested on a read-only file system, exceeded disk quota, too many
  open files, too long filename, too many symbolic links in the
  specified path (Unix-like systems only), etc.

# Examples

```rust
use std::fs::OpenOptions;

let file = OpenOptions::new().read(true).open("foo.txt");
```

## Metadata::file_type

```rust
pub fn file_type(&self) -> FileType
```

Returns the file type for this metadata.

# Examples

```rust
fn main() -> std::io::Result<()> {
    use std::fs;

    let metadata = fs::metadata("foo.txt")?;

    println!("{:?}", metadata.file_type());
    Ok(())
}
```

## Metadata::is_dir

```rust
pub fn is_dir(&self) -> bool
```

Returns `true` if this metadata is for a directory. The
result is mutually exclusive to the result of
`Metadata::is_file`, and will be false for symlink metadata
obtained from `symlink_metadata`.

# Examples

```rust
fn main() -> std::io::Result<()> {
    use std::fs;

    let metadata = fs::metadata("foo.txt")?;

    assert!(!metadata.is_dir());
    Ok(())
}
```

## Metadata::is_file

```rust
pub fn is_file(&self) -> bool
```

Returns `true` if this metadata is for a regular file. The
result is mutually exclusive to the result of
`Metadata::is_dir`, and will be false for symlink metadata
obtained from `symlink_metadata`.

When the goal is simply to read from (or write to) the source, the most
reliable way to test the source can be read (or written to) is to open
it. Only using `is_file` can break workflows like `diff <( prog_a )` on
a Unix-like system for example. See `File::open` or
`OpenOptions::open` for more information.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    let metadata = fs::metadata("foo.txt")?;

    assert!(metadata.is_file());
    Ok(())
}
```

## Metadata::is_symlink

```rust
pub fn is_symlink(&self) -> bool
```

use std::fs;
use std::path::Path;
use std::os::unix::fs::symlink;

fn main() -> std::io::Result<()> {
    let link_path = Path::new("link");
    symlink("/origin_does_not_exist/", link_path)?;

    let metadata = fs::symlink_metadata(link_path)?;

    assert!(metadata.is_symlink());
    Ok(())
}
```rust

## Metadata::len

```rust
pub fn len(&self) -> u64
```

Returns the size of the file, in bytes, this metadata is for.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    let metadata = fs::metadata("foo.txt")?;

    assert_eq!(0, metadata.len());
    Ok(())
}
```

## Metadata::permissions

```rust
pub fn permissions(&self) -> Permissions
```

Returns the permissions of the file this metadata is for.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    let metadata = fs::metadata("foo.txt")?;

    assert!(!metadata.permissions().readonly());
    Ok(())
}
```

## Metadata::modified

```rust
pub fn modified(&self) -> io::Result<SystemTime>
```

Returns the last modification time listed in this metadata.

The returned value corresponds to the `mtime` field of `stat` on Unix
platforms and the `ftLastWriteTime` field on Windows platforms.

# Errors

This field might not be available on all platforms, and will return an
`Err` on platforms where it is not available.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    let metadata = fs::metadata("foo.txt")?;

    if let Ok(time) = metadata.modified() {
        println!("{time:?}");
    } else {
        println!("Not supported on this platform");
    }
    Ok(())
}
```

## Metadata::accessed

```rust
pub fn accessed(&self) -> io::Result<SystemTime>
```

Returns the last access time of this metadata.

The returned value corresponds to the `atime` field of `stat` on Unix
platforms and the `ftLastAccessTime` field on Windows platforms.

Note that not all platforms will keep this field update in a file's
metadata, for example Windows has an option to disable updating this
time when files are accessed and Linux similarly has `noatime`.

# Errors

This field might not be available on all platforms, and will return an
`Err` on platforms where it is not available.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    let metadata = fs::metadata("foo.txt")?;

    if let Ok(time) = metadata.accessed() {
        println!("{time:?}");
    } else {
        println!("Not supported on this platform");
    }
    Ok(())
}
```

## Metadata::created

```rust
pub fn created(&self) -> io::Result<SystemTime>
```

Returns the creation time listed in this metadata.

The returned value corresponds to the `btime` field of `statx` on
Linux kernel starting from to 4.11, the `birthtime` field of `stat` on other
Unix platforms, and the `ftCreationTime` field on Windows platforms.

# Errors

This field might not be available on all platforms, and will return an
`Err` on platforms or filesystems where it is not available.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    let metadata = fs::metadata("foo.txt")?;

    if let Ok(time) = metadata.created() {
        println!("{time:?}");
    } else {
        println!("Not supported on this platform or filesystem");
    }
    Ok(())
}
```

## FileTimes::new

```rust
pub fn new() -> Self
```

Creates a new `FileTimes` with no times set.

Using the resulting `FileTimes` in `File::set_times` will not modify any timestamps.

## FileTimes::set_accessed

```rust
pub fn set_accessed(mut self, t: SystemTime) -> Self
```

Set the last access time of a file.

## FileTimes::set_modified

```rust
pub fn set_modified(mut self, t: SystemTime) -> Self
```

Set the last modified time of a file.

## Permissions::readonly

```rust
pub fn readonly(&self) -> bool
```

Returns `true` if these permissions describe a readonly (unwritable) file.

# Note

This function does not take Access Control Lists (ACLs), Unix group
membership and other nuances into account.
Therefore the return value of this function cannot be relied upon
to predict whether attempts to read or write the file will actually succeed.

# Windows

On Windows this returns `FILE_ATTRIBUTE_READONLY`.
If `FILE_ATTRIBUTE_READONLY` is set then writes to the file will fail
but the user may still have permission to change this flag. If
`FILE_ATTRIBUTE_READONLY` is *not* set then writes may still fail due
to lack of write permission.
The behavior of this attribute for directories depends on the Windows
version.

# Unix (including macOS)

On Unix-based platforms this checks if *any* of the owner, group or others
write permission bits are set. It does not consider anything else, including:

* Whether the current user is in the file's assigned group.
* Permissions granted by ACL.
* That `root` user can write to files that do not have any write bits set.
* Writable files on a filesystem that is mounted read-only.

The `PermissionsExt` trait gives direct access to the permission bits but
also does not read ACLs.

# Examples

```rust
use std::fs::File;

fn main() -> std::io::Result<()> {
    let mut f = File::create("foo.txt")?;
    let metadata = f.metadata()?;

    assert_eq!(false, metadata.permissions().readonly());
    Ok(())
}
```
