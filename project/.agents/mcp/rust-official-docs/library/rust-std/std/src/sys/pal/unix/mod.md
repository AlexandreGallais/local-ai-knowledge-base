---
title: "std::sys::pal::unix"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/pal/unix/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::pal::unix

## fn cvt

```rust
pub fn cvt<T: IsMinusOne>(t: T) -> io::Result<T>
```

Converts native return values to Result using the *-1 means error is in `errno`*  convention.
Non-error values are `Ok`-wrapped.

## fn cvt_r

```rust
pub fn cvt_r<T, F>(mut f: F) -> io::Result<T> where T: IsMinusOne, F: FnMut() -> T,
```

`-1` → look at `errno` → retry on `EINTR`. Otherwise `Ok()`-wrap the closure return value.

## fn cvt_nz

```rust
pub fn cvt_nz(error: libc::c_int) -> io::Result<()>
```

Zero means `Ok()`, all other values are treated as raw OS errors. Does not look at `errno`.
