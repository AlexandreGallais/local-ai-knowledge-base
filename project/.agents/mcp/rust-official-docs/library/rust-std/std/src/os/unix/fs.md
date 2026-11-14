---
title: "std::os::unix::fs"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/unix/fs.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::unix::fs

Unix-specific extensions to primitives in the `std::fs` module.

## trait FileExt

```rust
pub trait FileExt
```

Unix-specific extensions to `fs::File`.

## FileExt::read_at

```rust
fn read_at(&self, buf: &mut [u8], offset: u64) -> io::Result<usize>
```

use std::io;
use std::fs::File;
use std::os::unix::prelude::FileExt;

fn main() -> io::Result<()> {
    let mut buf = [0u8; 8];
    let file = File::open("foo.txt")?;

    // We now read 8 bytes from the offset 10.
    let num_bytes_read = file.read_at(&mut buf, 10)?;
    println!("read {num_bytes_read} bytes: {buf:?}");
    Ok(())
}
```rust

## FileExt::read_exact_at

```rust
fn read_exact_at(&self, mut buf: &mut [u8], mut offset: u64) -> io::Result<()>
```

use std::io;
use std::fs::File;
use std::os::unix::prelude::FileExt;

fn main() -> io::Result<()> {
    let mut buf = [0u8; 8];
    let file = File::open("foo.txt")?;

    // We now read exactly 8 bytes from the offset 10.
    file.read_exact_at(&mut buf, 10)?;
    println!("read {} bytes: {:?}", buf.len(), buf);
    Ok(())
}
```rust

## FileExt::write_at

```rust
fn write_at(&self, buf: &[u8], offset: u64) -> io::Result<usize>
```

use std::fs::File;
use std::io;
use std::os::unix::prelude::FileExt;

fn main() -> io::Result<()> {
    let file = File::create("foo.txt")?;

    // We now write at the offset 10.
    file.write_at(b"sushi", 10)?;
    Ok(())
}
```rust

## FileExt::write_all_at

```rust
fn write_all_at(&self, mut buf: &[u8], mut offset: u64) -> io::Result<()>
```

use std::fs::File;
use std::io;
use std::os::unix::prelude::FileExt;

fn main() -> io::Result<()> {
    let file = File::open("foo.txt")?;

    // We now write at the offset 10.
    file.write_all_at(b"sushi", 10)?;
    Ok(())
}
```rust

## trait PermissionsExt

```rust
pub trait PermissionsExt
```

use std::fs::Permissions;
use std::os::unix::fs::PermissionsExt;

// read/write for owner and read for others
let my_mode = 0o644;
let mut permissions = Permissions::from_mode(my_mode);
assert_eq!(permissions.mode(), my_mode);

// read/write/execute for owner
let other_mode = 0o700;
permissions.set_mode(other_mode);
assert_eq!(permissions.mode(), other_mode);
```rust

## PermissionsExt::mode

```rust
fn mode(&self) -> u32
```

Returns the mode permission bits

## PermissionsExt::set_mode

```rust
fn set_mode(&mut self, mode: u32)
```

Sets the mode permission bits.

## PermissionsExt::from_mode

```rust
fn from_mode(mode: u32) -> Self
```

Creates a new instance from the given mode permission bits.

## trait OpenOptionsExt

```rust
pub trait OpenOptionsExt
```

Unix-specific extensions to `fs::OpenOptions`.

## OpenOptionsExt::mode

```rust
fn mode(&mut self, mode: u32) -> &mut Self
```

use std::fs::OpenOptions;
use std::os::unix::fs::OpenOptionsExt;

# fn main() {
let mut options = OpenOptions::new();
options.mode(0o644); // Give read/write for owner and read for others.
let file = options.open("foo.txt");
# }
```rust

## OpenOptionsExt::custom_flags

```rust
fn custom_flags(&mut self, flags: i32) -> &mut Self
```

# mod libc { pub const O_NOFOLLOW: i32 = 0; }
use std::fs::OpenOptions;
use std::os::unix::fs::OpenOptionsExt;

# fn main() {
let mut options = OpenOptions::new();
options.write(true);
options.custom_flags(libc::O_NOFOLLOW);
let file = options.open("foo.txt");
# }
```rust

## trait MetadataExt

```rust
pub trait MetadataExt
```

Unix-specific extensions to `fs::Metadata`.

## MetadataExt::dev

```rust
fn dev(&self) -> u64
```

use std::io;
use std::fs;
use std::os::unix::fs::MetadataExt;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    let dev_id = meta.dev();
    Ok(())
}
```rust

## MetadataExt::ino

```rust
fn ino(&self) -> u64
```

use std::fs;
use std::os::unix::fs::MetadataExt;
use std::io;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    let inode = meta.ino();
    Ok(())
}
```rust

## MetadataExt::mode

```rust
fn mode(&self) -> u32
```

use std::fs;
use std::os::unix::fs::MetadataExt;
use std::io;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    let mode = meta.mode();
    let user_has_write_access      = mode & 0o200;
    let user_has_read_write_access = mode & 0o600;
    let group_has_read_access      = mode & 0o040;
    let others_have_exec_access    = mode & 0o001;
    Ok(())
}
```rust

## MetadataExt::nlink

```rust
fn nlink(&self) -> u64
```

use std::fs;
use std::os::unix::fs::MetadataExt;
use std::io;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    let nb_hard_links = meta.nlink();
    Ok(())
}
```rust

## MetadataExt::uid

```rust
fn uid(&self) -> u32
```

use std::fs;
use std::os::unix::fs::MetadataExt;
use std::io;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    let user_id = meta.uid();
    Ok(())
}
```rust

## MetadataExt::gid

```rust
fn gid(&self) -> u32
```

use std::fs;
use std::os::unix::fs::MetadataExt;
use std::io;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    let group_id = meta.gid();
    Ok(())
}
```rust

## MetadataExt::rdev

```rust
fn rdev(&self) -> u64
```

use std::fs;
use std::os::unix::fs::MetadataExt;
use std::io;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    let device_id = meta.rdev();
    Ok(())
}
```rust

## MetadataExt::size

```rust
fn size(&self) -> u64
```

use std::fs;
use std::os::unix::fs::MetadataExt;
use std::io;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    let file_size = meta.size();
    Ok(())
}
```rust

## MetadataExt::atime

```rust
fn atime(&self) -> i64
```

use std::fs;
use std::os::unix::fs::MetadataExt;
use std::io;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    let last_access_time = meta.atime();
    Ok(())
}
```rust

## MetadataExt::atime_nsec

```rust
fn atime_nsec(&self) -> i64
```

use std::fs;
use std::os::unix::fs::MetadataExt;
use std::io;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    let nano_last_access_time = meta.atime_nsec();
    Ok(())
}
```rust

## MetadataExt::mtime

```rust
fn mtime(&self) -> i64
```

use std::fs;
use std::os::unix::fs::MetadataExt;
use std::io;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    let last_modification_time = meta.mtime();
    Ok(())
}
```rust

## MetadataExt::mtime_nsec

```rust
fn mtime_nsec(&self) -> i64
```

use std::fs;
use std::os::unix::fs::MetadataExt;
use std::io;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    let nano_last_modification_time = meta.mtime_nsec();
    Ok(())
}
```rust

## MetadataExt::ctime

```rust
fn ctime(&self) -> i64
```

use std::fs;
use std::os::unix::fs::MetadataExt;
use std::io;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    let last_status_change_time = meta.ctime();
    Ok(())
}
```rust

## MetadataExt::ctime_nsec

```rust
fn ctime_nsec(&self) -> i64
```

use std::fs;
use std::os::unix::fs::MetadataExt;
use std::io;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    let nano_last_status_change_time = meta.ctime_nsec();
    Ok(())
}
```rust

## MetadataExt::blksize

```rust
fn blksize(&self) -> u64
```

use std::fs;
use std::os::unix::fs::MetadataExt;
use std::io;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    let block_size = meta.blksize();
    Ok(())
}
```rust

## MetadataExt::blocks

```rust
fn blocks(&self) -> u64
```

use std::fs;
use std::os::unix::fs::MetadataExt;
use std::io;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    let blocks = meta.blocks();
    Ok(())
}
```rust

## trait FileTypeExt

```rust
pub trait FileTypeExt
```

Unix-specific extensions for `fs::FileType`.

Adds support for special Unix file types such as block/character devices,
pipes, and sockets.

## FileTypeExt::is_block_device

```rust
fn is_block_device(&self) -> bool
```

use std::fs;
use std::os::unix::fs::FileTypeExt;
use std::io;

fn main() -> io::Result<()> {
    let meta = fs::metadata("block_device_file")?;
    let file_type = meta.file_type();
    assert!(file_type.is_block_device());
    Ok(())
}
```rust

## FileTypeExt::is_char_device

```rust
fn is_char_device(&self) -> bool
```

use std::fs;
use std::os::unix::fs::FileTypeExt;
use std::io;

fn main() -> io::Result<()> {
    let meta = fs::metadata("char_device_file")?;
    let file_type = meta.file_type();
    assert!(file_type.is_char_device());
    Ok(())
}
```rust

## FileTypeExt::is_fifo

```rust
fn is_fifo(&self) -> bool
```

use std::fs;
use std::os::unix::fs::FileTypeExt;
use std::io;

fn main() -> io::Result<()> {
    let meta = fs::metadata("fifo_file")?;
    let file_type = meta.file_type();
    assert!(file_type.is_fifo());
    Ok(())
}
```rust

## FileTypeExt::is_socket

```rust
fn is_socket(&self) -> bool
```

use std::fs;
use std::os::unix::fs::FileTypeExt;
use std::io;

fn main() -> io::Result<()> {
    let meta = fs::metadata("unix.socket")?;
    let file_type = meta.file_type();
    assert!(file_type.is_socket());
    Ok(())
}
```rust

## trait DirEntryExt

```rust
pub trait DirEntryExt
```

Unix-specific extension methods for `fs::DirEntry`.

## DirEntryExt::ino

```rust
fn ino(&self) -> u64
```

use std::fs;
use std::os::unix::fs::DirEntryExt;

if let Ok(entries) = fs::read_dir(".") {
    for entry in entries {
        if let Ok(entry) = entry {
            // Here, `entry` is a `DirEntry`.
            println!("{:?}: {}", entry.file_name(), entry.ino());
        }
    }
}
```rust

## fn symlink

```rust
pub fn symlink<P: AsRef<Path>, Q: AsRef<Path>>(original: P, link: Q) -> io::Result<()>
```

use std::os::unix::fs;

fn main() -> std::io::Result<()> {
    fs::symlink("a.txt", "b.txt")?;
    Ok(())
}
```rust

## trait DirBuilderExt

```rust
pub trait DirBuilderExt
```

Unix-specific extensions to `fs::DirBuilder`.

## DirBuilderExt::mode

```rust
fn mode(&mut self, mode: u32) -> &mut Self
```

use std::fs::DirBuilder;
use std::os::unix::fs::DirBuilderExt;

let mut builder = DirBuilder::new();
builder.mode(0o755);
```rust

## fn chown

```rust
pub fn chown<P: AsRef<Path>>(dir: P, uid: Option<u32>, gid: Option<u32>) -> io::Result<()>
```

use std::os::unix::fs;

fn main() -> std::io::Result<()> {
    fs::chown("/sandbox", Some(0), Some(0))?;
    Ok(())
}
```rust

## fn fchown

```rust
pub fn fchown<F: AsFd>(fd: F, uid: Option<u32>, gid: Option<u32>) -> io::Result<()>
```

use std::os::unix::fs;

fn main() -> std::io::Result<()> {
    let f = std::fs::File::open("/file")?;
    fs::fchown(&f, Some(0), Some(0))?;
    Ok(())
}
```rust

## fn lchown

```rust
pub fn lchown<P: AsRef<Path>>(dir: P, uid: Option<u32>, gid: Option<u32>) -> io::Result<()>
```

use std::os::unix::fs;

fn main() -> std::io::Result<()> {
    fs::lchown("/symlink", Some(0), Some(0))?;
    Ok(())
}
```rust

## fn chroot

```rust
pub fn chroot<P: AsRef<Path>>(dir: P) -> io::Result<()>
```

use std::os::unix::fs;

fn main() -> std::io::Result<()> {
    fs::chroot("/sandbox")?;
    std::env::set_current_dir("/")?;
    // continue working in sandbox
    Ok(())
}
```rust
