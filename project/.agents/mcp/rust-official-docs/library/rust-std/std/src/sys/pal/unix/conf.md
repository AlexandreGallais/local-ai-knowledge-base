---
title: "std::sys::pal::unix::conf"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/unix/conf.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::unix::conf

## fn confstr

```rust
pub fn confstr( key: crate::ffi::c_int, size_hint: Option<usize>, ) -> crate::io::Result<crate::ffi::OsString>
```

Returns the value for `confstr(key, ...)`[posix_confstr]. Currently only
used on Darwin, but should work on any unix (in case we need to get
`_CS_PATH` or `_CS_V[67]_ENV` in the future).
