---
title: "std::os::redox::fs"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/redox/fs.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::redox::fs

## trait MetadataExt

```rust
pub trait MetadataExt
```

OS-specific extensions to `fs::Metadata`.

## MetadataExt::as_raw_stat

```rust
fn as_raw_stat(&self) -> &raw::stat
```

use std::fs;
use std::io;
use std::os::redox::fs::MetadataExt;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    let stat = meta.as_raw_stat();
    Ok(())
}
```rust

## MetadataExt::st_dev

```rust
fn st_dev(&self) -> u64
```

use std::fs;
use std::io;
use std::os::redox::fs::MetadataExt;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    println!("{}", meta.st_dev());
    Ok(())
}
```rust

## MetadataExt::st_ino

```rust
fn st_ino(&self) -> u64
```

use std::fs;
use std::io;
use std::os::redox::fs::MetadataExt;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    println!("{}", meta.st_ino());
    Ok(())
}
```rust

## MetadataExt::st_mode

```rust
fn st_mode(&self) -> u32
```

use std::fs;
use std::io;
use std::os::redox::fs::MetadataExt;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    println!("{}", meta.st_mode());
    Ok(())
}
```rust

## MetadataExt::st_nlink

```rust
fn st_nlink(&self) -> u64
```

use std::fs;
use std::io;
use std::os::redox::fs::MetadataExt;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    println!("{}", meta.st_nlink());
    Ok(())
}
```rust

## MetadataExt::st_uid

```rust
fn st_uid(&self) -> u32
```

use std::fs;
use std::io;
use std::os::redox::fs::MetadataExt;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    println!("{}", meta.st_uid());
    Ok(())
}
```rust

## MetadataExt::st_gid

```rust
fn st_gid(&self) -> u32
```

use std::fs;
use std::io;
use std::os::redox::fs::MetadataExt;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    println!("{}", meta.st_gid());
    Ok(())
}
```rust

## MetadataExt::st_rdev

```rust
fn st_rdev(&self) -> u64
```

use std::fs;
use std::io;
use std::os::redox::fs::MetadataExt;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    println!("{}", meta.st_rdev());
    Ok(())
}
```rust

## MetadataExt::st_size

```rust
fn st_size(&self) -> u64
```

use std::fs;
use std::io;
use std::os::redox::fs::MetadataExt;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    println!("{}", meta.st_size());
    Ok(())
}
```rust

## MetadataExt::st_atime

```rust
fn st_atime(&self) -> i64
```

use std::fs;
use std::io;
use std::os::redox::fs::MetadataExt;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    println!("{}", meta.st_atime());
    Ok(())
}
```rust

## MetadataExt::st_atime_nsec

```rust
fn st_atime_nsec(&self) -> i64
```

use std::fs;
use std::io;
use std::os::redox::fs::MetadataExt;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    println!("{}", meta.st_atime_nsec());
    Ok(())
}
```rust

## MetadataExt::st_mtime

```rust
fn st_mtime(&self) -> i64
```

use std::fs;
use std::io;
use std::os::redox::fs::MetadataExt;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    println!("{}", meta.st_mtime());
    Ok(())
}
```rust

## MetadataExt::st_mtime_nsec

```rust
fn st_mtime_nsec(&self) -> i64
```

use std::fs;
use std::io;
use std::os::redox::fs::MetadataExt;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    println!("{}", meta.st_mtime_nsec());
    Ok(())
}
```rust

## MetadataExt::st_ctime

```rust
fn st_ctime(&self) -> i64
```

use std::fs;
use std::io;
use std::os::redox::fs::MetadataExt;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    println!("{}", meta.st_ctime());
    Ok(())
}
```rust

## MetadataExt::st_ctime_nsec

```rust
fn st_ctime_nsec(&self) -> i64
```

use std::fs;
use std::io;
use std::os::redox::fs::MetadataExt;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    println!("{}", meta.st_ctime_nsec());
    Ok(())
}
```rust

## MetadataExt::st_blksize

```rust
fn st_blksize(&self) -> u64
```

use std::fs;
use std::io;
use std::os::redox::fs::MetadataExt;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    println!("{}", meta.st_blksize());
    Ok(())
}
```rust

## MetadataExt::st_blocks

```rust
fn st_blocks(&self) -> u64
```

use std::fs;
use std::io;
use std::os::redox::fs::MetadataExt;

fn main() -> io::Result<()> {
    let meta = fs::metadata("some_file")?;
    println!("{}", meta.st_blocks());
    Ok(())
}
```rust
