---
title: "std::sys::pal::windows::c"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/windows/c.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::windows::c

C definitions used by libnative that don't belong in liblibc

## struct REPARSE_DATA_BUFFER

```rust
pub struct REPARSE_DATA_BUFFER
```

NB: Use carefully! In general using this as a reference is likely to get the
provenance wrong for the `rest` field!

## struct SYMBOLIC_LINK_REPARSE_BUFFER

```rust
pub struct SYMBOLIC_LINK_REPARSE_BUFFER
```

NB: Use carefully! In general using this as a reference is likely to get the
provenance wrong for the `PathBuffer` field!
