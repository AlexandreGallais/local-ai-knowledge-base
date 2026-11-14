---
title: "std::sys::fd::sgx"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/fd/sgx.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::fd::sgx

## FileDesc::into_raw

```rust
pub fn into_raw(self) -> Fd
```

Extracts the actual file descriptor without closing it.
