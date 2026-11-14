---
title: "std::sys::thread_local::destructors::list"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/thread_local/destructors/list.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::thread_local::destructors::list

## fn run

```rust
pub unsafe fn run()
```

The `guard` module contains platform-specific functions which will run this
function on thread exit if `guard::enable` has been called.

# Safety

May only be run on thread exit to guarantee that there are no live references
to TLS variables while they are destroyed.
