---
title: "std::sys::process::unix::vxworks"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/process/unix/vxworks.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::process::unix::vxworks

## struct Process

```rust
pub struct Process
```

The unique id of the process (this should never be negative).

## struct ExitStatus

```rust
pub struct ExitStatus(c_int)
```

Unix exit statuses
