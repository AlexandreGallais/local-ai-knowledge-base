---
title: "std::sys::path::windows"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/path/windows.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::path::windows

## struct WCStr

```rust
pub struct WCStr([u16])
```

A null terminated wide string.

## WCStr::from_wchars_with_null_unchecked

```rust
pub unsafe fn from_wchars_with_null_unchecked(s: &[u16]) -> &Self
```

Convert a slice to a WCStr without checks.

Though it is memory safe, the slice should also not contain interior nulls
as this may lead to unwanted truncation.

# Safety

The slice must end in a null.
