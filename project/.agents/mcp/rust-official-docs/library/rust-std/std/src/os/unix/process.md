---
title: "std::os::unix::process"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/unix/process.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::unix::process

Unix-specific extensions to primitives in the `std::process` module.

## fn parent_id

```rust
pub fn parent_id() -> u32
```

Returns the OS-assigned process identifier associated with this process's parent.
