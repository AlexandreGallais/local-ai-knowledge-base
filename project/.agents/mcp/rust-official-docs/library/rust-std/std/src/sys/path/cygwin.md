---
title: "std::sys::path::cygwin"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/path/cygwin.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::path::cygwin

## fn is_verbatim_sep

```rust
pub const fn is_verbatim_sep(b: u8) -> bool
```

Cygwin always prefers `/` over `\`, and it always converts all `/` to `\`
internally when calling Win32 APIs. Therefore, the server component of path
`\\?\UNC\localhost/share` is `localhost/share` on Win32, but `localhost`
on Cygwin.
