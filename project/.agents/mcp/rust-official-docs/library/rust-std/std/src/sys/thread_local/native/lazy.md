---
title: "std::sys::thread_local::native::lazy"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/thread_local/native/lazy.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::thread_local::native::lazy

## Storage::get_or_init

```rust
pub unsafe fn get_or_init(&self, i: Option<&mut Option<T>>, f: impl FnOnce() -> T) -> *const T
```

Gets a pointer to the TLS value, potentially initializing it with the
provided parameters. If the TLS variable has been destroyed, a null
pointer is returned.

The resulting pointer may not be used after reentrant inialialization
or thread destruction has occurred.

# Safety
The `self` reference must remain valid until the TLS destructor is run.
