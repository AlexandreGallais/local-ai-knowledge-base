---
title: "std::os::solaris::fs"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/solaris/fs.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::solaris::fs

## trait MetadataExt

```rust
pub trait MetadataExt
```

OS-specific extensions to `fs::Metadata`.

## MetadataExt::as_raw_stat

```rust
fn as_raw_stat(&self) -> &raw::stat
```

Gain a reference to the underlying `stat` structure which contains
the raw information returned by the OS.

The contents of the returned `stat` are **not** consistent across
Unix platforms. The `os::unix::fs::MetadataExt` trait contains the
cross-Unix abstractions contained within the raw stat.
