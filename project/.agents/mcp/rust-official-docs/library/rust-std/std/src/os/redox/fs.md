# std::os::redox::fs

## trait MetadataExt

```rust
pub trait MetadataExt
```

OS-specific extensions to [`fs::Metadata`].

[`fs::Metadata`]: crate::fs::Metadata

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
```

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
```

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
```

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
```

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
```

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
```

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
```

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
```

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
```

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
```

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
```

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
```

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
```

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
```

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
```

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
```

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
```