---
title: "std::fs (part 4 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/fs.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::fs (part 4 of 5)

## Permissions::set_readonly

```rust
pub fn set_readonly(&mut self, readonly: bool)
```

Modifies the readonly flag for this set of permissions. If the
`readonly` argument is `true`, using the resulting `Permission` will
update file permissions to forbid writing. Conversely, if it's `false`,
using the resulting `Permission` will update file permissions to allow
writing.

This operation does **not** modify the files attributes. This only
changes the in-memory value of these attributes for this `Permissions`
instance. To modify the files attributes use the `set_permissions`
function which commits these attribute changes to the file.

# Note

`set_readonly(false)` makes the file *world-writable* on Unix.
You can use the `PermissionsExt` trait on Unix to avoid this issue.

It also does not take Access Control Lists (ACLs) or Unix group
membership into account.

# Windows

On Windows this sets or clears `FILE_ATTRIBUTE_READONLY`.
If `FILE_ATTRIBUTE_READONLY` is set then writes to the file will fail
but the user may still have permission to change this flag. If
`FILE_ATTRIBUTE_READONLY` is *not* set then the write may still fail if
the user does not have permission to write to the file.

In Windows 7 and earlier this attribute prevents deleting empty
directories. It does not prevent modifying the directory contents.
On later versions of Windows this attribute is ignored for directories.

# Unix (including macOS)

On Unix-based platforms this sets or clears the write access bit for
the owner, group *and* others, equivalent to `chmod a+w <file>`
or `chmod a-w <file>` respectively. The latter will grant write access
to all users! You can use the `PermissionsExt` trait on Unix
to avoid this issue.

# Examples

```rust
use std::fs::File;

fn main() -> std::io::Result<()> {
    let f = File::create("foo.txt")?;
    let metadata = f.metadata()?;
    let mut permissions = metadata.permissions();

    permissions.set_readonly(true);

    // filesystem doesn't change, only the in memory state of the
    // readonly permission
    assert_eq!(false, metadata.permissions().readonly());

    // just this particular `permissions`.
    assert_eq!(true, permissions.readonly());
    Ok(())
}
```

## FileType::is_dir

```rust
pub fn is_dir(&self) -> bool
```

Tests whether this file type represents a directory. The
result is mutually exclusive to the results of
`is_file` and `is_symlink`; only zero or one of these
tests may pass.

# Examples

```rust
fn main() -> std::io::Result<()> {
    use std::fs;

    let metadata = fs::metadata("foo.txt")?;
    let file_type = metadata.file_type();

    assert_eq!(file_type.is_dir(), false);
    Ok(())
}
```

## FileType::is_file

```rust
pub fn is_file(&self) -> bool
```

Tests whether this file type represents a regular file.
The result is mutually exclusive to the results of
`is_dir` and `is_symlink`; only zero or one of these
tests may pass.

When the goal is simply to read from (or write to) the source, the most
reliable way to test the source can be read (or written to) is to open
it. Only using `is_file` can break workflows like `diff <( prog_a )` on
a Unix-like system for example. See `File::open` or
`OpenOptions::open` for more information.

# Examples

```rust
fn main() -> std::io::Result<()> {
    use std::fs;

    let metadata = fs::metadata("foo.txt")?;
    let file_type = metadata.file_type();

    assert_eq!(file_type.is_file(), true);
    Ok(())
}
```

## FileType::is_symlink

```rust
pub fn is_symlink(&self) -> bool
```

Tests whether this file type represents a symbolic link.
The result is mutually exclusive to the results of
`is_dir` and `is_file`; only zero or one of these
tests may pass.

The underlying `Metadata` struct needs to be retrieved
with the `fs::symlink_metadata` function and not the
`fs::metadata` function. The `fs::metadata` function
follows symbolic links, so `is_symlink` would always
return `false` for the target file.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    let metadata = fs::symlink_metadata("foo.txt")?;
    let file_type = metadata.file_type();

    assert_eq!(file_type.is_symlink(), false);
    Ok(())
}
```

## DirEntry::path

```rust
pub fn path(&self) -> PathBuf
```

Returns the full path to the file that this entry represents.

The full path is created by joining the original path to `read_dir`
with the filename of this entry.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    for entry in fs::read_dir(".")? {
        let dir = entry?;
        println!("{:?}", dir.path());
    }
    Ok(())
}
```

This prints output like:

```
"./whatever.txt"
"./foo.html"
"./hello_world.rs"
```rust

The exact text, of course, depends on what files you have in `.`.

## DirEntry::metadata

```rust
pub fn metadata(&self) -> io::Result<Metadata>
```

Returns the metadata for the file that this entry points at.

This function will not traverse symlinks if this entry points at a
symlink. To traverse symlinks use `fs::metadata` or `fs::File::metadata`.

# Platform-specific behavior

On Windows this function is cheap to call (no extra system calls
needed), but on Unix platforms this function is the equivalent of
calling `symlink_metadata` on the path.

# Examples

```rust
use std::fs;

if let Ok(entries) = fs::read_dir(".") {
    for entry in entries {
        if let Ok(entry) = entry {
            // Here, `entry` is a `DirEntry`.
            if let Ok(metadata) = entry.metadata() {
                // Now let's show our entry's permissions!
                println!("{:?}: {:?}", entry.path(), metadata.permissions());
            } else {
                println!("Couldn't get metadata for {:?}", entry.path());
            }
        }
    }
}
```

## DirEntry::file_type

```rust
pub fn file_type(&self) -> io::Result<FileType>
```

Returns the file type for the file that this entry points at.

This function will not traverse symlinks if this entry points at a
symlink.

# Platform-specific behavior

On Windows and most Unix platforms this function is free (no extra
system calls needed), but some Unix platforms may require the equivalent
call to `symlink_metadata` to learn about the target file type.

# Examples

```rust
use std::fs;

if let Ok(entries) = fs::read_dir(".") {
    for entry in entries {
        if let Ok(entry) = entry {
            // Here, `entry` is a `DirEntry`.
            if let Ok(file_type) = entry.file_type() {
                // Now let's show our entry's file type!
                println!("{:?}: {:?}", entry.path(), file_type);
            } else {
                println!("Couldn't get file type for {:?}", entry.path());
            }
        }
    }
}
```

## DirEntry::file_name

```rust
pub fn file_name(&self) -> OsString
```

Returns the file name of this directory entry without any
leading path component(s).

As an example,
the output of the function will result in "foo" for all the following paths:
- "./foo"
- "/the/foo"
- "../../foo"

# Examples

```rust
use std::fs;

if let Ok(entries) = fs::read_dir(".") {
    for entry in entries {
        if let Ok(entry) = entry {
            // Here, `entry` is a `DirEntry`.
            println!("{:?}", entry.file_name());
        }
    }
}
```

## fn remove_file

```rust
pub fn remove_file<P: AsRef<Path>>(path: P) -> io::Result<()>
```

Removes a file from the filesystem.

Note that there is no
guarantee that the file is immediately deleted (e.g., depending on
platform, other open file descriptors may prevent immediate removal).

# Platform-specific behavior

This function currently corresponds to the `unlink` function on Unix.
On Windows, `DeleteFile` is used or `CreateFileW` and `SetInformationByHandle` for readonly files.
Note that, this may change in the future.

# Errors

This function will return an error in the following situations, but is not
limited to just these cases:

* `path` points to a directory.
* The file doesn't exist.
* The user lacks permissions to remove the file.

This function will only ever return an error of kind `NotFound` if the given
path does not exist. Note that the inverse is not true,
i.e. if a path does not exist, its removal may fail for a number of reasons,
such as insufficient permissions.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    fs::remove_file("a.txt")?;
    Ok(())
}
```

## fn metadata

```rust
pub fn metadata<P: AsRef<Path>>(path: P) -> io::Result<Metadata>
```

Given a path, queries the file system to get information about a file,
directory, etc.

This function will traverse symbolic links to query information about the
destination file. To query metadata about the path itself without following
symbolic links, use `symlink_metadata`.

# Platform-specific behavior

This function currently corresponds to the `stat` function on Unix
and the `GetFileInformationByHandle` function on Windows.
Note that, this may change in the future.

# Errors

This function will return an error in the following situations, but is not
limited to just these cases:

* The user lacks permissions to perform `metadata` call on `path`.
* `path` does not exist.
* `path` is a symbolic link, but the destination file cannot be resolved.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    let attr = fs::metadata("/some/file/path.txt")?;
    // inspect attr ...
    Ok(())
}
```

## fn symlink_metadata

```rust
pub fn symlink_metadata<P: AsRef<Path>>(path: P) -> io::Result<Metadata>
```

Queries the metadata about a file without following symlinks.

This function will return the `Metadata` of the exact path without
traversing symbolic links to a resolved destination file. Using this function
on a path that is a file or directory (not a symbolic link) will behave the
same as `metadata`.

# Platform-specific behavior

This function currently corresponds to the `lstat` function on Unix
and the `GetFileInformationByHandle` function on Windows.
Note that, this may change in the future.

# Errors

This function will return an error in the following situations, but is not
limited to just these cases:

* The user lacks permissions to perform `metadata` call on `path`.
* `path` does not exist.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    let attr = fs::symlink_metadata("/some/file/path.txt")?;
    // inspect attr ...
    Ok(())
}
```

## fn rename

```rust
pub fn rename<P: AsRef<Path>, Q: AsRef<Path>>(from: P, to: Q) -> io::Result<()>
```

Renames a file or directory to a new name, replacing the original file if
`to` already exists.

This will not work if the new name is on a different mount point.

# Platform-specific behavior

This function currently corresponds to the [rename] function on Unix, and
`MoveFileExW` with a fallback to `SetFileInformationByHandle` on Windows.
The exact behavior differs:

- If `to` does not exist, `from` can be anything.
- On Unix, when `from` is a directory and `to` exists, `to` must be an empty directory.
- On Unix, when `from` is not a directory and `to` exists, `to` may not be a directory.
- On Windows 10 version 1607 and above, the behavior is the same as Unix if the
  filesystem supports  `FileRenameInfoEx`.
- Otherwise on Windows, `from` can be anything but `to` must not be a directory.

Note that, this may change in the future.

# Errors

This function will return an error in the following situations, but is not
limited to just these cases:

* `from` does not exist.
* The user lacks permissions to view contents.
* `from` and `to` are on separate filesystems.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    fs::rename("a.txt", "b.txt")?; // Rename a.txt to b.txt
    Ok(())
}
```

## fn copy

```rust
pub fn copy<P: AsRef<Path>, Q: AsRef<Path>>(from: P, to: Q) -> io::Result<u64>
```

Copies the contents of one file to another. This function will also
copy the permission bits of the original file to the destination file.

This function will **overwrite** the contents of `to`.

Note that if `from` and `to` both point to the same file, then the file
will likely get truncated by this operation.

On success, the total number of bytes copied is returned and it is equal to
the length of the `to` file as reported by `metadata`.

If you want to copy the contents of one file to another and you’re
working with `File`s, see the `io::copy`) function.

# Platform-specific behavior

This function currently corresponds to the `open` function in Unix
with `O_RDONLY` for `from` and `O_WRONLY`, `O_CREAT`, and `O_TRUNC` for `to`.
`O_CLOEXEC` is set for returned file descriptors.

On Linux (including Android), this function uses copy_file_range(2),
sendfile(2), or splice(2) syscalls to move data directly between files
if possible.

On Windows, this function currently corresponds to `CopyFileEx`. Alternate
NTFS streams are copied but only the size of the main stream is returned by
this function.

On MacOS, this function corresponds to `fclonefileat` and `fcopyfile`.

Note that platform-specific behavior may change in the future.

# Errors

This function will return an error in the following situations, but is not
limited to just these cases:

* `from` is neither a regular file nor a symlink to a regular file.
* `from` does not exist.
* The current process does not have the permission rights to read
  `from` or write `to`.
* The parent directory of `to` doesn't exist.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    fs::copy("foo.txt", "bar.txt")?;  // Copy foo.txt to bar.txt
    Ok(())
}
```

## fn hard_link

```rust
pub fn hard_link<P: AsRef<Path>, Q: AsRef<Path>>(original: P, link: Q) -> io::Result<()>
```

Creates a new hard link on the filesystem.

The `link` path will be a link pointing to the `original` path. Note that
systems often require these two paths to both be located on the same
filesystem.

If `original` names a symbolic link, it is platform-specific whether the
symbolic link is followed. On platforms where it's possible to not follow
it, it is not followed, and the created hard link points to the symbolic
link itself.

# Platform-specific behavior

This function currently corresponds to the `CreateHardLink` function on Windows.
On most Unix systems, it corresponds to the `linkat` function with no flags.
On VxWorks and Redox, it instead corresponds to the `link` function.
On MacOS, it uses the `linkat` function if it is available, but on very old
systems where `linkat` is not available, `link` is selected at runtime instead.
Note that, this may change in the future.

# Errors

This function will return an error in the following situations, but is not
limited to just these cases:

* The `original` path is not a file or doesn't exist.
* The 'link' path already exists.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    fs::hard_link("a.txt", "b.txt")?; // Hard link a.txt to b.txt
    Ok(())
}
```
