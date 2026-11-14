---
title: "std::sys::thread_local::no_threads"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/thread_local/no_threads.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::thread_local::no_threads

On some targets like wasm there's no threads, so no need to generate
thread locals and we can instead just use plain statics!

## LazyStorage::get

```rust
pub fn get(&'static self, i: Option<&mut Option<T>>, f: impl FnOnce() -> T) -> *const T
```

Gets a pointer to the TLS value, potentially initializing it with the
provided parameters.

The resulting pointer may not be used after reentrant inialialization
has occurred.
