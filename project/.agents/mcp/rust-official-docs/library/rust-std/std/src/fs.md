---
title: "std::fs (part 1 of 5)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/fs.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::fs

Filesystem manipulation operations.

This module contains basic <example-value> to manipulate the contents of the local
filesystem. All methods in this module represent cross-platform filesystem
operations. Extra platform-specific functionality can be found in the
extension traits of `std::os::$platform`.

#### Time of Check to Time of Use (TOCTOU)

Many filesystem operations are subject to a race condition known as "Time of Check to Time of Use"
(TOCTOU). This occurs when a program checks a condition (like file existence or permissions)
and then uses the result of that check to make a decision, but the condition may have changed
between the check and the use.

For example, checking if a file exists and then creating it if it doesn't is vulnerable to
TOCTOU - another process could create the file between your check and creation attempt.

Another example is with symbolic links: when removing a directory, if another process replaces
the directory with a symbolic link between the check and the removal operation, the removal
might affect the wrong location. This is why operations like `remove_dir_all` need to use
atomic operations to prevent such race conditions.

To avoid TOCTOU issues:
- Be aware that metadata operations (like `metadata` or `symlink_metadata`) may be affected by
changes made by other processes.
- Use atomic operations when possible (like `File::create_new` instead of checking existence then creating).
- Keep file open for the duration of operations.

## struct File

```rust
pub struct File
```

An object providing access to an open file on the filesystem.

An instance of a `File` can be read and/or written depending on what options
it was opened with. Files also implement `Seek` to alter the logical cursor
that the file contains internally.

Files are automatically closed when they go out of scope.  Errors detected
on closing are ignored by the implementation of `Drop`.  Use the method
`sync_all` if these errors must be manually handled.

`File` does not buffer reads and writes. For efficiency, consider wrapping the
file in a `BufReader` or `BufWriter` when performing many small `read`
or `write` calls, unless unbuffered reads and writes are required.

# Examples

Creates a new file and write bytes to it (you can also use `write`):

```rust
use std::fs::File;
use std::io::prelude::*;

fn main() -> std::io::Result<()> {
    let mut file = File::create("foo.txt")?;
    file.write_all(b"Hello, world!")?;
    Ok(())
}
```

Reads the contents of a file into a `String` (you can also use `read`):

```rust
use std::fs::File;
use std::io::prelude::*;

fn main() -> std::io::Result<()> {
    let mut file = File::open("foo.txt")?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    assert_eq!(contents, "Hello, world!");
    Ok(())
}
```

Using a buffered `Read`er:

```rust
use std::fs::File;
use std::io::BufReader;
use std::io::prelude::*;

fn main() -> std::io::Result<()> {
    let file = File::open("foo.txt")?;
    let mut buf_reader = BufReader::new(file);
    let mut contents = String::new();
    buf_reader.read_to_string(&mut contents)?;
    assert_eq!(contents, "Hello, world!");
    Ok(())
}
```

Note that, although read and write methods require a `&mut File`, because
of the interfaces for `Read` and `Write`, the holder of a `&File` can
still modify the file, either through methods that take `&File` or by
retrieving the underlying OS object and modifying the file that way.
Additionally, many operating systems allow concurrent modification of files
by different processes. Avoid assuming that holding a `&File` means that the
file will not change.

# Platform-specific behavior

On Windows, the implementation of `Read` and `Write` traits for `File`
perform synchronous I/O operations. Therefore the underlying file must not
have been opened for asynchronous I/O (e.g. by using `FILE_FLAG_OVERLAPPED`).

## enum TryLockError

```rust
pub enum TryLockError
```

An enumeration of possible errors which can occur while trying to acquire a lock
from the `try_lock` method and `try_lock_shared` method on a `File`.

## struct Metadata

```rust
pub struct Metadata(fs_imp::FileAttr)
```

Metadata information about a file.

This structure is returned from the `metadata` or
`symlink_metadata` function or method and represents known
metadata about a file such as its permissions, size, modification
times, etc.

## struct ReadDir

```rust
pub struct ReadDir(fs_imp::ReadDir)
```

Iterator over the entries in a directory.

This iterator is returned from the `read_dir` function of this module and
will yield instances of <code>[io::Result]<[DirEntry]></code>. Through a `DirEntry`
information like the entry's path and possibly other metadata can be
learned.

The order in which this iterator returns entries is platform and filesystem
dependent.

# Errors
This `io::Result` will be an `Err` if an error occurred while fetching
the next entry from the OS.

## struct DirEntry

```rust
pub struct DirEntry(fs_imp::DirEntry)
```

Entries returned by the `ReadDir` iterator.

An instance of `DirEntry` represents an entry inside of a directory on the
filesystem. Each entry can be inspected via methods to learn about the full
path or possibly other metadata through per-platform extension traits.

# Platform-specific behavior

On Unix, the `DirEntry` struct contains an internal reference to the open
directory. Holding `DirEntry` objects will consume a file handle even
after the `ReadDir` iterator is dropped.

Note that this may change in the future.

## struct OpenOptions

```rust
pub struct OpenOptions(fs_imp::OpenOptions)
```

Options and flags which can be used to configure how a file is opened.

This builder exposes the ability to configure how a `File` is opened and
what operations are permitted on the open file. The `File::open` and
`File::create` methods are aliases for commonly used options using this
builder.

Generally speaking, when using `OpenOptions`, you'll first call
`OpenOptions::new`, then chain calls to methods to set each option, then
call `OpenOptions::open`, passing the path of the file you're trying to
open. This will give you a `io::Result` with a `File` inside that you
can further operate on.

# Examples

Opening a file to read:

```rust
use std::fs::OpenOptions;

let file = OpenOptions::new().read(true).open("foo.txt");
```

Opening a file for both reading and writing, as well as creating it if it
doesn't exist:

```rust
use std::fs::OpenOptions;

let file = OpenOptions::new()
            .read(true)
            .write(true)
            .create(true)
            .open("foo.txt");
```

## struct FileTimes

```rust
pub struct FileTimes(fs_imp::FileTimes)
```

Representation of the various timestamps on a file.

## struct Permissions

```rust
pub struct Permissions(fs_imp::FilePermissions)
```

Representation of the various permissions on a file.

This module only currently provides one bit of information,
`Permissions::readonly`, which is exposed on all currently supported
platforms. Unix-specific functionality, such as mode bits, is available
through the `PermissionsExt` trait.

## struct FileType

```rust
pub struct FileType(fs_imp::FileType)
```

A structure representing a type of file with accessors for each file type.
It is returned by `Metadata::file_type` method.

## struct DirBuilder

```rust
pub struct DirBuilder
```

A builder used to create directories in various manners.

This builder also supports platform-specific options.

## fn read

```rust
pub fn read<P: AsRef<Path>>(path: P) -> io::Result<Vec<u8>>
```

Reads the entire contents of a file into a bytes vector.

This is a convenience function for using `File::open` and `read_to_end`
with fewer imports and without an intermediate variable.

# Errors

This function will return an error if `path` does not already exist.
Other errors may also be returned according to `OpenOptions::open`.

While reading from the file, this function handles `io::ErrorKind::Interrupted`
with automatic retries. See [io::Read] documentation for details.

# Examples

```rust
use std::fs;

fn main() -> Result<(), Box<dyn std::error::Error + 'static>> {
    let data: Vec<u8> = fs::read("image.jpg")?;
    assert_eq!(data[0..3], [0xFF, 0xD8, 0xFF]);
    Ok(())
}
```

## fn read_to_string

```rust
pub fn read_to_string<P: AsRef<Path>>(path: P) -> io::Result<String>
```

Reads the entire contents of a file into a string.

This is a convenience function for using `File::open` and `read_to_string`
with fewer imports and without an intermediate variable.

# Errors

This function will return an error if `path` does not already exist.
Other errors may also be returned according to `OpenOptions::open`.

If the contents of the file are not valid UTF-8, then an error will also be
returned.

While reading from the file, this function handles `io::ErrorKind::Interrupted`
with automatic retries. See [io::Read] documentation for details.

# Examples

```rust
use std::fs;
use std::error::Error;

fn main() -> Result<(), Box<dyn Error>> {
    let message: String = fs::read_to_string("message.txt")?;
    println!("{}", message);
    Ok(())
}
```

## fn write

```rust
pub fn write<P: AsRef<Path>, C: AsRef<[u8]>>(path: P, contents: C) -> io::Result<()>
```

Writes a slice as the entire contents of a file.

This function will create a file if it does not exist,
and will entirely replace its contents if it does.

Depending on the platform, this function may fail if the
full directory path does not exist.

This is a convenience function for using `File::create` and `write_all`
with fewer imports.

# Examples

```rust
use std::fs;

fn main() -> std::io::Result<()> {
    fs::write("foo.txt", b"Lorem ipsum")?;
    fs::write("bar.txt", "dolor sit")?;
    Ok(())
}
```

## fn set_times

```rust
pub fn set_times<P: AsRef<Path>>(path: P, times: FileTimes) -> io::Result<()>
```

Changes the timestamps of the file or directory at the specified path.

This function will attempt to set the access and modification times
to the times specified. If the path refers to a symbolic link, this function
will follow the link and change the timestamps of the target file.

# Platform-specific behavior

This function currently corresponds to the `utimensat` function on Unix platforms, the
`setattrlist` function on Apple platforms, and the `SetFileTime` function on Windows.

# Errors

This function will return an error if the user lacks permission to change timestamps on the
target file or symlink. It may also return an error if the OS does not support it.

# Examples

```rust
use std::fs::{self, FileTimes};
use std::time::SystemTime;

fn main() -> std::io::Result<()> {
    let now = SystemTime::now();
    let times = FileTimes::new()
        .set_accessed(now)
        .set_modified(now);
    fs::set_times("foo.txt", times)?;
    Ok(())
}
```

## fn set_times_nofollow

```rust
pub fn set_times_nofollow<P: AsRef<Path>>(path: P, times: FileTimes) -> io::Result<()>
```

Changes the timestamps of the file or symlink at the specified path.

This function will attempt to set the access and modification times
to the times specified. Differ from `set_times`, if the path refers to a symbolic link,
this function will change the timestamps of the symlink itself, not the target file.

# Platform-specific behavior

This function currently corresponds to the `utimensat` function with `AT_SYMLINK_NOFOLLOW` on
Unix platforms, the `setattrlist` function with `FSOPT_NOFOLLOW` on Apple platforms, and the
`SetFileTime` function on Windows.

# Errors

This function will return an error if the user lacks permission to change timestamps on the
target file or symlink. It may also return an error if the OS does not support it.

# Examples

```rust
use std::fs::{self, FileTimes};
use std::time::SystemTime;

fn main() -> std::io::Result<()> {
    let now = SystemTime::now();
    let times = FileTimes::new()
        .set_accessed(now)
        .set_modified(now);
    fs::set_times_nofollow("symlink.txt", times)?;
    Ok(())
}
```

## File::open

```rust
pub fn open<P: AsRef<Path>>(path: P) -> io::Result<File>
```

Attempts to open a file in read-only mode.

See the `OpenOptions::open` method for more details.

If you only need to read the entire file contents,
consider `std::fs::read()`[self::read] or
`std::fs::read_to_string()`[self::read_to_string] instead.

# Errors

This function will return an error if `path` does not already exist.
Other errors may also be returned according to `OpenOptions::open`.

# Examples

```rust
use std::fs::File;
use std::io::Read;

fn main() -> std::io::Result<()> {
    let mut f = File::open("foo.txt")?;
    let mut data = vec![];
    f.read_to_end(&mut data)?;
    Ok(())
}
```

## File::create

```rust
pub fn create<P: AsRef<Path>>(path: P) -> io::Result<File>
```

Opens a file in write-only mode.

This function will create a file if it does not exist,
and will truncate it if it does.

Depending on the platform, this function may fail if the
full directory path does not exist.
See the `OpenOptions::open` function for more details.

See also `std::fs::write()`[self::write] for a simple function to
create a file with some given data.

# Examples

```rust
use std::fs::File;
use std::io::Write;

fn main() -> std::io::Result<()> {
    let mut f = File::create("foo.txt")?;
    f.write_all(&1234_u32.to_be_bytes())?;
    Ok(())
}
```

## File::create_new

```rust
pub fn create_new<P: AsRef<Path>>(path: P) -> io::Result<File>
```

Creates a new file in read-write mode; error if the file exists.

This function will create a file if it does not exist, or return an error if it does. This
way, if the call succeeds, the file returned is guaranteed to be new.
If a file exists at the target location, creating a new file will fail with `AlreadyExists`
or another error based on the situation. See `OpenOptions::open` for a
non-exhaustive list of likely errors.

This option is useful because it is atomic. Otherwise between checking whether a file
exists and creating a new one, the file may have been created by another process (a [TOCTOU]
race condition / attack).

This can also be written using
`File::options().read(true).write(true).create_new(true).open(...)`.

# Examples

```rust
use std::fs::File;
use std::io::Write;

fn main() -> std::io::Result<()> {
    let mut f = File::create_new("foo.txt")?;
    f.write_all("Hello, world!".as_bytes())?;
    Ok(())
}
```
