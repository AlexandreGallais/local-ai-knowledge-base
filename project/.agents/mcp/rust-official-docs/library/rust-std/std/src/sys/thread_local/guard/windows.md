---
title: "std::sys::thread_local::guard::windows"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/thread_local/guard/windows.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::thread_local::guard::windows

Support for Windows TLS destructors.

Windows has an API to provide a destructor for a FLS (fiber local storage) variable,
which behaves similarly to a TLS variable for our purpose [1].

All TLS destructors are tracked by *us*, not the Windows runtime.
This means that we have a global list of destructors for
each TLS key or variable that we know about.

## fn enable

```rust
pub fn enable()
```

Set up the current thread to invoke `cleanup` when it finishes.
