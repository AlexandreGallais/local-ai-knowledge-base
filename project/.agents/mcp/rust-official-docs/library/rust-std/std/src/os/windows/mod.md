---
title: "std::os::windows"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/windows/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::windows

Platform-specific extensions to `std` for Windows.

Provides access to platform-level information for Windows, and exposes
Windows-specific idioms that would otherwise be inappropriate as part
the core `std` library. These extensions allow developers to use
`std` types and idioms with Windows in a way that the normal
platform-agnostic idioms would not normally support.

#### Examples

use std::fs::File;
use std::os::windows::prelude::*;

fn main() -> std::io::Result<()> {
    let f = File::create("foo.txt")?;
    let handle = f.as_raw_handle();

    // use handle with native windows bindings

    Ok(())
}
```rust
