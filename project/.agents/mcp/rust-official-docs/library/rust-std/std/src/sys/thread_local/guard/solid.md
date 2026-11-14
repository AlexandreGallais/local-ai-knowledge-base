---
title: "std::sys::thread_local::guard::solid"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/thread_local/guard/solid.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::thread_local::guard::solid

SOLID, just like macOS, has an API to register TLS destructors. But since
it does not allow specifying an argument to that function, and will not run
destructors for terminated tasks, we still keep our own list.
