---
title: "std::sys::process::windows"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/process/windows.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::process::windows

## struct Process

```rust
pub struct Process
```

A value representing a child process.

The lifetime of this value is linked to the lifetime of the actual
process - the Process destructor calls self.finish() which waits
for the process to terminate.
