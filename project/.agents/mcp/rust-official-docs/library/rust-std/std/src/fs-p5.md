---
title: "std::fs (part 5 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/fs.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::fs (part 5 of 5)

## fn soft_link

```rust
pub fn soft_link<P: AsRef<Path>, Q: AsRef<Path>>(original: P, link: Q) -> io::Result<()>
```

Creates a new symbolic link on the filesystem.

The `link` path will be a symbolic link pointing to the `original` path.
On Windows, this will be a file symlink, not a directory symlink;
for this reason, the platform-specific `std::os::unix::fs::symlink`
and `std::os::windows::fs::symlink_file` or `symlink_dir` should be
used instead to make the intent explicit.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    fs::soft_link("a.txt", "b.txt")?;
    Ok(())
}
```

## fn read_link

```rust
pub fn read_link<P: AsRef<Path>>(path: P) -> io::Result<PathBuf>
```

Reads a symbolic link, returning the file that the link points to.

# Platform-specific behavior

This function currently corresponds to the `readlink` function on Unix
and the `CreateFile` function with `FILE_FLAG_OPEN_REPARSE_POINT` and
`FILE_FLAG_BACKUP_SEMANTICS` flags on Windows.
Note that, this may change in the future.

# Errors

This function will return an error in the following situations, but is not
limited to just these cases:

* `path` is not a symbolic link.
* `path` does not exist.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    let path = fs::read_link("a.txt")?;
    Ok(())
}
```

## fn canonicalize

```rust
pub fn canonicalize<P: AsRef<Path>>(path: P) -> io::Result<PathBuf>
```

Returns the canonical, absolute form of a path with all intermediate
components normalized and symbolic links resolved.

# Platform-specific behavior

This function currently corresponds to the `realpath` function on Unix
and the `CreateFile` and `GetFinalPathNameByHandle` functions on Windows.
Note that this may change in the future.

On Windows, this converts the path to use extended length path
syntax, which allows your program to use longer path names, but means you
can only join backslash-delimited paths to it, and it may be incompatible
with other applications (if passed to the application on the command-line,
or written to a file another application may read).

# Errors

This function will return an error in the following situations, but is not
limited to just these cases:

* `path` does not exist.
* A non-final component in path is not a directory.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    let path = fs::canonicalize("../a/../foo.txt")?;
    Ok(())
}
```

## fn create_dir

```rust
pub fn create_dir<P: AsRef<Path>>(path: P) -> io::Result<()>
```

Creates a new, empty directory at the provided path.

# Platform-specific behavior

This function currently corresponds to the `mkdir` function on Unix
and the `CreateDirectoryW` function on Windows.
Note that, this may change in the future.

**NOTE**: If a parent of the given path doesn't exist, this function will
return an error. To create a directory and all its missing parents at the
same time, use the `create_dir_all` function.

# Errors

This function will return an error in the following situations, but is not
limited to just these cases:

* User lacks permissions to create directory at `path`.
* A parent of the given path doesn't exist. (To create a directory and all
  its missing parents at the same time, use the `create_dir_all`
  function.)
* `path` already exists.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    fs::create_dir("/some/dir")?;
    Ok(())
}
```

## fn create_dir_all

```rust
pub fn create_dir_all<P: AsRef<Path>>(path: P) -> io::Result<()>
```

Recursively create a directory and all of its parent components if they
are missing.

This function is not atomic. If it returns an error, any parent components it was able to create
will remain.

If the empty path is passed to this function, it always succeeds without
creating any directories.

# Platform-specific behavior

This function currently corresponds to multiple calls to the `mkdir`
function on Unix and the `CreateDirectoryW` function on Windows.

Note that, this may change in the future.

# Errors

The function will return an error if any directory specified in path does not exist and
could not be created. There may be other error conditions; see `fs::create_dir` for specifics.

Notable exception is made for situations where any of the directories
specified in the `path` could not be created as it was being created concurrently.
Such cases are considered to be successful. That is, calling `create_dir_all`
concurrently from multiple threads or processes is guaranteed not to fail
due to a race condition with itself.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    fs::create_dir_all("/some/dir")?;
    Ok(())
}
```

## fn remove_dir

```rust
pub fn remove_dir<P: AsRef<Path>>(path: P) -> io::Result<()>
```

Removes an empty directory.

If you want to remove a directory that is not empty, as well as all
of its contents recursively, consider using `remove_dir_all`
instead.

# Platform-specific behavior

This function currently corresponds to the `rmdir` function on Unix
and the `RemoveDirectory` function on Windows.
Note that, this may change in the future.

# Errors

This function will return an error in the following situations, but is not
limited to just these cases:

* `path` doesn't exist.
* `path` isn't a directory.
* The user lacks permissions to remove the directory at the provided `path`.
* The directory isn't empty.

This function will only ever return an error of kind `NotFound` if the given
path does not exist. Note that the inverse is not true,
i.e. if a path does not exist, its removal may fail for a number of reasons,
such as insufficient permissions.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    fs::remove_dir("/some/dir")?;
    Ok(())
}
```

## fn remove_dir_all

```rust
pub fn remove_dir_all<P: AsRef<Path>>(path: P) -> io::Result<()>
```

Removes a directory at this path, after removing all its contents. Use
carefully!

This function does **not** follow symbolic links and it will simply remove the
symbolic link itself.

# Platform-specific behavior

These implementation details may change in the future.

- "Unix-like": By default, this function currently corresponds to
`openat`, `fdopendir`, `unlinkat` and `lstat`
on Unix-family platforms, except where noted otherwise.
- "Windows": This function currently corresponds to `CreateFileW`,
`GetFileInformationByHandleEx`, `SetFileInformationByHandle`, and `NtCreateFile`.

## Time-of-check to time-of-use (TOCTOU) race conditions
See the module-level TOCTOU explanation.

On most platforms, `fs::remove_dir_all` protects against symlink TOCTOU races by default.
However, on the following platforms, this protection is not provided and the function should
not be used in security-sensitive contexts:
- **Miri**: Even when emulating targets where the underlying implementation will protect against
  TOCTOU races, Miri will not do so.
- **ESP-IDF**, **Horizon**, **PS Vita**, **QNX**, **Redox OS**, **VxWorks**: This function does
  not protect against TOCTOU races, as the underlying platform does not implement the required
  platform support to do so.

# Errors

See `fs::remove_file` and `fs::remove_dir`.

`remove_dir_all` will fail if `remove_dir` or `remove_file` fail on *any* constituent
paths, *including* the root `path`. Consequently,

- The directory you are deleting *must* exist, meaning that this function is *not idempotent*.
- `remove_dir_all` will fail if the `path` is *not* a directory.

Consider ignoring the error if validating the removal is not required for your use case.

This function may return `io::ErrorKind::DirectoryNotEmpty` if the directory is concurrently
written into, which typically indicates some contents were removed but not all.
`io::ErrorKind::NotFound` is only returned if no removal occurs.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    fs::remove_dir_all("/some/dir")?;
    Ok(())
}
```

## fn read_dir

```rust
pub fn read_dir<P: AsRef<Path>>(path: P) -> io::Result<ReadDir>
```

Returns an iterator over the entries within a directory.

The iterator will yield instances of <code>[io::Result]<[DirEntry]></code>.
New errors may be encountered after an iterator is initially constructed.
Entries for the current and parent directories (typically `.` and `..`) are
skipped.

The order in which `read_dir` returns entries can change between calls. If reproducible
ordering is required, the entries should be explicitly sorted.

# Platform-specific behavior

This function currently corresponds to the `opendir` function on Unix
and the `FindFirstFileEx` function on Windows. Advancing the iterator
currently corresponds to `readdir` on Unix and `FindNextFile` on Windows.
Note that, this may change in the future.

The order in which this iterator returns entries is platform and filesystem
dependent.

# Errors

This function will return an error in the following situations, but is not
limited to just these cases:

* The provided `path` doesn't exist.
* The process lacks permissions to view the contents.
* The `path` points at a non-directory file.

# Examples

```rust
use std::io;
use std::fs::{self, DirEntry};
use std::path::Path;

// one possible implementation of walking a directory only visiting files
fn visit_dirs(dir: &Path, cb: &dyn Fn(&DirEntry)) -> io::Result<()> {
    if dir.is_dir() {
        for entry in fs::read_dir(dir)? {
            let entry = entry?;
            let path = entry.path();
            if path.is_dir() {
                visit_dirs(&path, cb)?;
            } else {
                cb(&entry);
            }
        }
    }
    Ok(())
}
```

```rust
use std::{fs, io};

fn main() -> io::Result<()> {
    let mut entries = fs::read_dir(".")?
        .map(|res| res.map(|e| e.path()))
        .collect::<Result<Vec<_>, io::Error>>()?;

    // The order in which `read_dir` returns entries is not guaranteed. If reproducible
    // ordering is required the entries should be explicitly sorted.

    entries.sort();

    // The entries have now been sorted by their path.

    Ok(())
}
```

## fn set_permissions

```rust
pub fn set_permissions<P: AsRef<Path>>(path: P, perm: Permissions) -> io::Result<()>
```

Changes the permissions found on a file or a directory.

# Platform-specific behavior

This function currently corresponds to the `chmod` function on Unix
and the `SetFileAttributes` function on Windows.
Note that, this may change in the future.

## Symlinks
On UNIX-like systems, this function will update the permission bits
of the file pointed to by the symlink.

Note that this behavior can lead to privilege escalation vulnerabilities,
where the ability to create a symlink in one directory allows you to
cause the permissions of another file or directory to be modified.

For this reason, using this function with symlinks should be avoided.
When possible, permissions should be set at creation time instead.

# Rationale
POSIX does not specify an `lchmod` function,
and symlinks can be followed regardless of what permission bits are set.

# Errors

This function will return an error in the following situations, but is not
limited to just these cases:

* `path` does not exist.
* The user lacks the permission to change attributes of the file.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    let mut perms = fs::metadata("foo.txt")?.permissions();
    perms.set_readonly(true);
    fs::set_permissions("foo.txt", perms)?;
    Ok(())
}
```

## DirBuilder::new

```rust
pub fn new() -> DirBuilder
```

Creates a new set of options with default mode/security settings for all
platforms and also non-recursive.

# Examples

```rust
use std::fs::DirBuilder;

let builder = DirBuilder::new();
```

## DirBuilder::recursive

```rust
pub fn recursive(&mut self, recursive: bool) -> &mut Self
```

Indicates that directories should be created recursively, creating all
parent directories. Parents that do not exist are created with the same
security and permissions settings.

This option defaults to `false`.

# Examples

```rust
use std::fs::DirBuilder;

let mut builder = DirBuilder::new();
builder.recursive(true);
```

## DirBuilder::create

```rust
pub fn create<P: AsRef<Path>>(&self, path: P) -> io::Result<()>
```

Creates the specified directory with the options configured in this
builder.

It is considered an error if the directory already exists unless
recursive mode is enabled.

# Examples

```rust
use std::fs::{self, DirBuilder};

let path = "/tmp/foo/bar/baz";
DirBuilder::new()
    .recursive(true)
    .create(path).unwrap();

assert!(fs::metadata(path).unwrap().is_dir());
```

## fn exists

```rust
pub fn exists<P: AsRef<Path>>(path: P) -> io::Result<bool>
```

Returns `Ok(true)` if the path points at an existing entity.

This function will traverse symbolic links to query information about the
destination file. In case of broken symbolic links this will return `Ok(false)`.

As opposed to the `Path::exists` method, this will only return `Ok(true)` or `Ok(false)`
if the path was _verified_ to exist or not exist. If its existence can neither be confirmed
nor denied, an `Err(_)` will be propagated instead. This can be the case if e.g. listing
permission is denied on one of the parent directories.

Note that while this avoids some pitfalls of the `exists()` method, it still can not
prevent time-of-check to time-of-use ([TOCTOU]) bugs. You should only use it in scenarios
where those bugs are not an issue.

# Examples

```rust
use std::fs;

assert!(!fs::exists("does_not_exist.txt").expect("Can't check existence of file does_not_exist.txt"));
assert!(fs::exists("<example-value>").is_err());
```
