---
title: "std::sys::thread_local::native::eager"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/thread_local/native/eager.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::thread_local::native::eager

## Storage::get

```rust
pub unsafe fn get(&self) -> *const T
```

Gets a pointer to the TLS value. If the TLS variable has been destroyed,
a null pointer is returned.

The resulting pointer may not be used after thread destruction has
occurred.

# Safety
The `self` reference must remain valid until the TLS destructor is run.
