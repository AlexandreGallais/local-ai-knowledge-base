---
title: "std::sys::pal::unix::weak::dlsym"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/unix/weak/dlsym.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::unix::weak::dlsym

## DlsymWeak::new

```rust
pub const unsafe fn new(name: &'static CStr) -> Self
```

# Safety

If the signature of `F` does not match the signature of the symbol (if
it exists), calling the function pointer returned by `get()` is
undefined behaviour.
