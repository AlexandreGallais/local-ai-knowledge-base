---
title: "std::sys::thread::windows"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/thread/windows.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::thread::windows

## fn set_name_wide

```rust
pub unsafe fn set_name_wide(name: &[u16])
```

# Safety

`name` must end with a zero value
