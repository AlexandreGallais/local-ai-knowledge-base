---
title: "std::fs (part 2 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/fs.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::fs (part 2 of 5)

## File::options

```rust
pub fn options() -> OpenOptions
```

Returns a new OpenOptions object.

This function returns a new OpenOptions object that you can use to
open or create a file with specific options if `open()` or `create()`
are not appropriate.

It is equivalent to `OpenOptions::new()`, but allows you to write more
readable code. Instead of
`OpenOptions::new().append(true).open("example.log")`,
you can write `File::options().append(true).open("example.log")`. This
also avoids the need to import `OpenOptions`.

See the `OpenOptions::new` function for more details.

# Examples

```rust
use std::fs::File;
use std::io::Write;

fn main() -> std::io::Result<()> {
    let mut f = File::options().append(true).open("example.log")?;
    writeln!(&mut f, "new line")?;
    Ok(())
}
```

## File::sync_all

```rust
pub fn sync_all(&self) -> io::Result<()>
```

Attempts to sync all OS-internal file content and metadata to disk.

This function will attempt to ensure that all in-memory data reaches the
filesystem before returning.

This can be used to handle errors that would otherwise only be caught
when the `File` is closed, as dropping a `File` will ignore all errors.
Note, however, that `sync_all` is generally more expensive than closing
a file by dropping it, because the latter is not required to block until
the data has been written to the filesystem.

If synchronizing the metadata is not required, use `sync_data` instead.

# Examples

```rust
use std::fs::File;
use std::io::prelude::*;

fn main() -> std::io::Result<()> {
    let mut f = File::create("foo.txt")?;
    f.write_all(b"Hello, world!")?;

    f.sync_all()?;
    Ok(())
}
```

## File::sync_data

```rust
pub fn sync_data(&self) -> io::Result<()>
```

This function is similar to `sync_all`, except that it might not
synchronize file metadata to the filesystem.

This is intended for use cases that must synchronize content, but don't
need the metadata on disk. The goal of this method is to reduce disk
operations.

Note that some platforms may simply implement this in terms of
`sync_all`.

# Examples

```rust
use std::fs::File;
use std::io::prelude::*;

fn main() -> std::io::Result<()> {
    let mut f = File::create("foo.txt")?;
    f.write_all(b"Hello, world!")?;

    f.sync_data()?;
    Ok(())
}
```

## File::lock

```rust
pub fn lock(&self) -> io::Result<()>
```

Acquire an exclusive lock on the file. Blocks until the lock can be acquired.

This acquires an exclusive lock. No *other* file handle to this file, in this or any other
process, may acquire another lock.
If this file handle/descriptor, or a clone of it, already holds a lock, the exact behavior
is unspecified and platform dependent, including the possibility that it will deadlock.
However, if this method returns, then an exclusive lock is held.

This lock may be advisory or mandatory. This lock is meant to interact with `lock`,
`try_lock`, `lock_shared`, `try_lock_shared`, and `unlock`. Its interactions with
other methods, such as `read` and `write` are platform specific, and it may or may not
cause non-lockholders to block.

If the file is not open for writing, it is unspecified whether this function returns an error.

The lock will be released when this file (along with any other file descriptors/handles
duplicated or inherited from it) is closed, or if the `unlock` method is called.

# Platform-specific behavior

This function currently corresponds to the `flock` function on Unix with the `LOCK_EX` flag,
and the `LockFileEx` function on Windows with the `LOCKFILE_EXCLUSIVE_LOCK` flag. Note that,
this may change in the future.

On Windows, locking a file will fail if the file is opened only for append. To lock a file,
open it with one of `.read(true)`, `.read(true).append(true)`, or `.write(true)`.

# Examples

```rust
use std::fs::File;

fn main() -> std::io::Result<()> {
    let f = File::create("foo.txt")?;
    f.lock()?;
    Ok(())
}
```

## File::lock_shared

```rust
pub fn lock_shared(&self) -> io::Result<()>
```

Acquire a shared (non-exclusive) lock on the file. Blocks until the lock can be acquired.

This acquires a shared lock. More than one file handle to this file, in this or any other
process, may hold a shared lock, but no *other* file handle may hold an exclusive lock at
the same time.
If this file handle/descriptor, or a clone of it, already holds a lock, the exact
behavior is unspecified and platform dependent, including the possibility that it will
deadlock. However, if this method returns, then a shared lock is held.

This lock may be advisory or mandatory. This lock is meant to interact with `lock`,
`try_lock`, `lock_shared`, `try_lock_shared`, and `unlock`. Its interactions with
other methods, such as `read` and `write` are platform specific, and it may or may not
cause non-lockholders to block.

The lock will be released when this file (along with any other file descriptors/handles
duplicated or inherited from it) is closed, or if the `unlock` method is called.

# Platform-specific behavior

This function currently corresponds to the `flock` function on Unix with the `LOCK_SH` flag,
and the `LockFileEx` function on Windows. Note that, this
may change in the future.

On Windows, locking a file will fail if the file is opened only for append. To lock a file,
open it with one of `.read(true)`, `.read(true).append(true)`, or `.write(true)`.

# Examples

```rust
use std::fs::File;

fn main() -> std::io::Result<()> {
    let f = File::open("foo.txt")?;
    f.lock_shared()?;
    Ok(())
}
```

## File::try_lock

```rust
pub fn try_lock(&self) -> Result<(), TryLockError>
```

Try to acquire an exclusive lock on the file.

Returns `Err(TryLockError::WouldBlock)` if a different lock is already held on this file
(via another handle/descriptor).

This acquires an exclusive lock; no other file handle to this file, in this or any other
process, may acquire another lock.

This lock may be advisory or mandatory. This lock is meant to interact with `lock`,
`try_lock`, `lock_shared`, `try_lock_shared`, and `unlock`. Its interactions with
other methods, such as `read` and `write` are platform specific, and it may or may not
cause non-lockholders to block.

If this file handle/descriptor, or a clone of it, already holds a lock, the exact behavior
is unspecified and platform dependent, including the possibility that it will deadlock.
However, if this method returns `Ok(())`, then it has acquired an exclusive lock.

If the file is not open for writing, it is unspecified whether this function returns an error.

The lock will be released when this file (along with any other file descriptors/handles
duplicated or inherited from it) is closed, or if the `unlock` method is called.

# Platform-specific behavior

This function currently corresponds to the `flock` function on Unix with the `LOCK_EX` and
`LOCK_NB` flags, and the `LockFileEx` function on Windows with the `LOCKFILE_EXCLUSIVE_LOCK`
and `LOCKFILE_FAIL_IMMEDIATELY` flags. Note that, this
may change in the future.

On Windows, locking a file will fail if the file is opened only for append. To lock a file,
open it with one of `.read(true)`, `.read(true).append(true)`, or `.write(true)`.

# Examples

```rust
use std::fs::{File, TryLockError};

fn main() -> std::io::Result<()> {
    let f = File::create("foo.txt")?;
    // Explicit handling of the WouldBlock error
    match f.try_lock() {
        Ok(_) => (),
        Err(TryLockError::WouldBlock) => (), // Lock not acquired
        Err(TryLockError::Error(err)) => return Err(err),
    }
    // Alternately, propagate the error as an io::Error
    f.try_lock()?;
    Ok(())
}
```

## File::try_lock_shared

```rust
pub fn try_lock_shared(&self) -> Result<(), TryLockError>
```

Try to acquire a shared (non-exclusive) lock on the file.

Returns `Err(TryLockError::WouldBlock)` if a different lock is already held on this file
(via another handle/descriptor).

This acquires a shared lock; more than one file handle, in this or any other process, may
hold a shared lock, but none may hold an exclusive lock at the same time.

This lock may be advisory or mandatory. This lock is meant to interact with `lock`,
`try_lock`, `lock_shared`, `try_lock_shared`, and `unlock`. Its interactions with
other methods, such as `read` and `write` are platform specific, and it may or may not
cause non-lockholders to block.

If this file handle, or a clone of it, already holds a lock, the exact behavior is
unspecified and platform dependent, including the possibility that it will deadlock.
However, if this method returns `Ok(())`, then it has acquired a shared lock.

The lock will be released when this file (along with any other file descriptors/handles
duplicated or inherited from it) is closed, or if the `unlock` method is called.

# Platform-specific behavior

This function currently corresponds to the `flock` function on Unix with the `LOCK_SH` and
`LOCK_NB` flags, and the `LockFileEx` function on Windows with the
`LOCKFILE_FAIL_IMMEDIATELY` flag. Note that, this
may change in the future.

On Windows, locking a file will fail if the file is opened only for append. To lock a file,
open it with one of `.read(true)`, `.read(true).append(true)`, or `.write(true)`.

# Examples

```rust
use std::fs::{File, TryLockError};

fn main() -> std::io::Result<()> {
    let f = File::open("foo.txt")?;
    // Explicit handling of the WouldBlock error
    match f.try_lock_shared() {
        Ok(_) => (),
        Err(TryLockError::WouldBlock) => (), // Lock not acquired
        Err(TryLockError::Error(err)) => return Err(err),
    }
    // Alternately, propagate the error as an io::Error
    f.try_lock_shared()?;

    Ok(())
}
```

## File::unlock

```rust
pub fn unlock(&self) -> io::Result<()>
```

Release all locks on the file.

All locks are released when the file (along with any other file descriptors/handles
duplicated or inherited from it) is closed. This method allows releasing locks without
closing the file.

If no lock is currently held via this file descriptor/handle, this method may return an
error, or may return successfully without taking any action.

# Platform-specific behavior

This function currently corresponds to the `flock` function on Unix with the `LOCK_UN` flag,
and the `UnlockFile` function on Windows. Note that, this
may change in the future.

On Windows, locking a file will fail if the file is opened only for append. To lock a file,
open it with one of `.read(true)`, `.read(true).append(true)`, or `.write(true)`.

# Examples

```rust
use std::fs::File;

fn main() -> std::io::Result<()> {
    let f = File::open("foo.txt")?;
    f.lock()?;
    f.unlock()?;
    Ok(())
}
```

## File::set_len

```rust
pub fn set_len(&self, size: u64) -> io::Result<()>
```

Truncates or extends the underlying file, updating the size of
this file to become `size`.

If the `size` is less than the current file's size, then the file will
be shrunk. If it is greater than the current file's size, then the file
will be extended to `size` and have all of the intermediate data filled
in with 0s.

The file's cursor isn't changed. In particular, if the cursor was at the
end and the file is shrunk using this operation, the cursor will now be
past the end.

# Errors

This function will return an error if the file is not opened for writing.
Also, `std::io::ErrorKind::InvalidInput`
will be returned if the desired length would cause an overflow due to
the implementation specifics.

# Examples

```rust
use std::fs::File;

fn main() -> std::io::Result<()> {
    let mut f = File::create("foo.txt")?;
    f.set_len(10)?;
    Ok(())
}
```

Note that this method alters the content of the underlying file, even
though it takes `&self` rather than `&mut self`.

## File::metadata

```rust
pub fn metadata(&self) -> io::Result<Metadata>
```

Queries metadata about the underlying file.

# Examples

```rust
use std::fs::File;

fn main() -> std::io::Result<()> {
    let mut f = File::open("foo.txt")?;
    let metadata = f.metadata()?;
    Ok(())
}
```

## File::try_clone

```rust
pub fn try_clone(&self) -> io::Result<File>
```

Creates a new `File` instance that shares the same underlying file handle
as the existing `File` instance. Reads, writes, and seeks will affect
both `File` instances simultaneously.

# Examples

Creates two handles for a file named `foo.txt`:

```rust
use std::fs::File;

fn main() -> std::io::Result<()> {
    let mut file = File::open("foo.txt")?;
    let file_copy = file.try_clone()?;
    Ok(())
}
```

Assuming there’s a file named `foo.txt` with contents `abcdef\n`, create
two handles, seek one of them, and read the remaining bytes from the
other handle:

```rust
use std::fs::File;
use std::io::SeekFrom;
use std::io::prelude::*;

fn main() -> std::io::Result<()> {
    let mut file = File::open("foo.txt")?;
    let mut file_copy = file.try_clone()?;

    file.seek(SeekFrom::Start(3))?;

    let mut contents = vec![];
    file_copy.read_to_end(&mut contents)?;
    assert_eq!(contents, b"def\n");
    Ok(())
}
```

## File::set_permissions

```rust
pub fn set_permissions(&self, perm: Permissions) -> io::Result<()>
```

Changes the permissions on the underlying file.

# Platform-specific behavior

This function currently corresponds to the `fchmod` function on Unix and
the `SetFileInformationByHandle` function on Windows. Note that, this
may change in the future.

# Errors

This function will return an error if the user lacks permission change
attributes on the underlying file. It may also return an error in other
os-specific unspecified cases.

# Examples

```rust
fn main() -> std::io::Result<()> {
    use std::fs::File;

    let file = File::open("foo.txt")?;
    let mut perms = file.metadata()?.permissions();
    perms.set_readonly(true);
    file.set_permissions(perms)?;
    Ok(())
}
```

Note that this method alters the permissions of the underlying file,
even though it takes `&self` rather than `&mut self`.
