---
title: "std::os::wasi"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/wasi/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::wasi

Platform-specific extensions to `std` for the WebAssembly System Interface (WASI).

Provides access to platform-level information on WASI, and exposes
WASI-specific functions that would otherwise be inappropriate as
part of the core `std` library.

It exposes more ways to deal with platform-specific strings (`OsStr`,
`OsString`), allows to set permissions more granularly, extract low-level
file descriptors from files and sockets, and has platform-specific helpers
for spawning processes.

#### Examples

use std::fs::File;
use std::os::wasi::prelude::*;

fn main() -> std::io::Result<()> {
    let f = File::create("foo.txt")?;
    let fd = f.as_raw_fd();

    // use fd with native WASI bindings

    Ok(())
}
```rust

`OsStr`: crate::ffi::OsStr
`OsString`: crate::ffi::OsString
