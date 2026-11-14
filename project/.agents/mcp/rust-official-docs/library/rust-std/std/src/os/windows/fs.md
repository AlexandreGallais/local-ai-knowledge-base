---
title: "std::os::windows::fs"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/windows/fs.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::windows::fs

Windows-specific extensions to primitives in the `std::fs` module.

## trait FileExt

```rust
pub trait FileExt
```

Windows-specific extensions to `fs::File`.

## FileExt::seek_read

```rust
fn seek_read(&self, buf: &mut [u8], offset: u64) -> io::Result<usize>
```

use std::io;
use std::fs::File;
use std::os::windows::prelude::*;

fn main() -> io::Result<()> {
    let mut file = File::open("foo.txt")?;
    let mut buffer = [0; 10];

    // Read 10 bytes, starting 72 bytes from the
    // start of the file.
    file.seek_read(&mut buffer[..], 72)?;
    Ok(())
}
```rust

## FileExt::seek_write

```rust
fn seek_write(&self, buf: &[u8], offset: u64) -> io::Result<usize>
```

use std::fs::File;
use std::os::windows::prelude::*;

fn main() -> std::io::Result<()> {
    let mut buffer = File::create("foo.txt")?;

    // Write a byte string starting 72 bytes from
    // the start of the file.
    buffer.seek_write(b"some bytes", 72)?;
    Ok(())
}
```rust

## OpenOptionsExt::access_mode

```rust
fn access_mode(&mut self, access: u32) -> &mut Self
```

use std::fs::OpenOptions;
use std::os::windows::prelude::*;

// Open without read and write permission, for example if you only need
// to call `stat` on the file
let file = OpenOptions::new().access_mode(0).open("foo.txt");
```rust

`CreateFile`: https://docs.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-createfilea

## OpenOptionsExt::share_mode

```rust
fn share_mode(&mut self, val: u32) -> &mut Self
```

use std::fs::OpenOptions;
use std::os::windows::prelude::*;

// Do not allow others to read or modify this file while we have it open
// for writing.
let file = OpenOptions::new()
    .write(true)
    .share_mode(0)
    .open("foo.txt");
```rust

`CreateFile`: https://docs.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-createfilea

## OpenOptionsExt::custom_flags

```rust
fn custom_flags(&mut self, flags: u32) -> &mut Self
```

# #![allow(unexpected_cfgs)]
# #[cfg(for_demonstration_only)]
extern crate winapi;
# mod winapi { pub const FILE_FLAG_DELETE_ON_CLOSE: u32 = 0x04000000; }

use std::fs::OpenOptions;
use std::os::windows::prelude::*;

let file = OpenOptions::new()
    .create(true)
    .write(true)
    .custom_flags(winapi::FILE_FLAG_DELETE_ON_CLOSE)
    .open("foo.txt");
```rust

`CreateFile`: https://docs.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-createfilea
`CreateFile2`: https://docs.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-createfile2

## OpenOptionsExt::attributes

```rust
fn attributes(&mut self, val: u32) -> &mut Self
```

# #![allow(unexpected_cfgs)]
# #[cfg(for_demonstration_only)]
extern crate winapi;
# mod winapi { pub const FILE_ATTRIBUTE_HIDDEN: u32 = 2; }

use std::fs::OpenOptions;
use std::os::windows::prelude::*;

let file = OpenOptions::new()
    .write(true)
    .create(true)
    .attributes(winapi::FILE_ATTRIBUTE_HIDDEN)
    .open("foo.txt");
```rust

`CreateFile`: https://docs.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-createfilea
`CreateFile2`: https://docs.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-createfile2

## OpenOptionsExt::security_qos_flags

```rust
fn security_qos_flags(&mut self, flags: u32) -> &mut Self
```

# #![allow(unexpected_cfgs)]
# #[cfg(for_demonstration_only)]
extern crate winapi;
# mod winapi { pub const SECURITY_IDENTIFICATION: u32 = 0; }
use std::fs::OpenOptions;
use std::os::windows::prelude::*;

let file = OpenOptions::new()
    .write(true)
    .create(true)

    // Sets the flag value to `SecurityIdentification`.
    .security_qos_flags(winapi::SECURITY_IDENTIFICATION)

    .open(r"\\.\pipe\MyPipe");
```rust

`CreateFile`: https://docs.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-createfilea
`CreateFile2`: https://docs.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-createfile2
[Impersonation Levels]:
    https://docs.microsoft.com/en-us/windows/win32/api/winnt/ne-winnt-security_impersonation_level

## trait MetadataExt

```rust
pub trait MetadataExt
```

Windows-specific extensions to `fs::Metadata`.

The data members that this trait exposes correspond to the members
of the `BY_HANDLE_FILE_INFORMATION` structure.

`BY_HANDLE_FILE_INFORMATION`:
    https://docs.microsoft.com/windows/win32/api/fileapi/ns-fileapi-by_handle_file_information

## MetadataExt::file_attributes

```rust
fn file_attributes(&self) -> u32
```

use std::io;
use std::fs;
use std::os::windows::prelude::*;

fn main() -> io::Result<()> {
    let metadata = fs::metadata("foo.txt")?;
    let attributes = metadata.file_attributes();
    Ok(())
}
```rust

[File Attribute Constants]:
    https://docs.microsoft.com/windows/win32/fileio/file-attribute-constants

## MetadataExt::creation_time

```rust
fn creation_time(&self) -> u64
```

use std::io;
use std::fs;
use std::os::windows::prelude::*;

fn main() -> io::Result<()> {
    let metadata = fs::metadata("foo.txt")?;
    let creation_time = metadata.creation_time();
    Ok(())
}
```rust

`FILETIME`: https://docs.microsoft.com/windows/win32/api/minwinbase/ns-minwinbase-filetime

## MetadataExt::last_access_time

```rust
fn last_access_time(&self) -> u64
```

use std::io;
use std::fs;
use std::os::windows::prelude::*;

fn main() -> io::Result<()> {
    let metadata = fs::metadata("foo.txt")?;
    let last_access_time = metadata.last_access_time();
    Ok(())
}
```rust

`FILETIME`: https://docs.microsoft.com/windows/win32/api/minwinbase/ns-minwinbase-filetime

## MetadataExt::last_write_time

```rust
fn last_write_time(&self) -> u64
```

use std::io;
use std::fs;
use std::os::windows::prelude::*;

fn main() -> io::Result<()> {
    let metadata = fs::metadata("foo.txt")?;
    let last_write_time = metadata.last_write_time();
    Ok(())
}
```rust

`FILETIME`: https://docs.microsoft.com/windows/win32/api/minwinbase/ns-minwinbase-filetime

## MetadataExt::file_size

```rust
fn file_size(&self) -> u64
```

use std::io;
use std::fs;
use std::os::windows::prelude::*;

fn main() -> io::Result<()> {
    let metadata = fs::metadata("foo.txt")?;
    let file_size = metadata.file_size();
    Ok(())
}
```rust

## fn symlink_file

```rust
pub fn symlink_file<P: AsRef<Path>, Q: AsRef<Path>>(original: P, link: Q) -> io::Result<()>
```

use std::os::windows::fs;

fn main() -> std::io::Result<()> {
    fs::symlink_file("a.txt", "b.txt")?;
    Ok(())
}
```rust

Windows treats symlink creation as a [privileged action][symlink-security],
therefore this function is likely to fail unless the user makes changes to
their system to permit symlink creation. Users can try enabling Developer
Mode, granting the `SeCreateSymbolicLinkPrivilege` privilege, or running
the process as an administrator.

[symlink-security]: https://docs.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/create-symbolic-links

## fn symlink_dir

```rust
pub fn symlink_dir<P: AsRef<Path>, Q: AsRef<Path>>(original: P, link: Q) -> io::Result<()>
```

use std::os::windows::fs;

fn main() -> std::io::Result<()> {
    fs::symlink_dir("a", "b")?;
    Ok(())
}
```rust

Windows treats symlink creation as a [privileged action][symlink-security],
therefore this function is likely to fail unless the user makes changes to
their system to permit symlink creation. Users can try enabling Developer
Mode, granting the `SeCreateSymbolicLinkPrivilege` privilege, or running
the process as an administrator.

[symlink-security]: https://docs.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/create-symbolic-links
