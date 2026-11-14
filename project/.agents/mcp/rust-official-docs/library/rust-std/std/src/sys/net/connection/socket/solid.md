---
title: "std::sys::net::connection::socket::solid"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/net/connection/socket/solid.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::net::connection::socket::solid

## fn cvt_gai

```rust
pub fn cvt_gai(err: c_int) -> io::Result<()>
```

A variant of `cvt` for `getaddrinfo` which return 0 for a success.

## fn cvt_r

```rust
pub fn cvt_r<T, F>(mut f: F) -> io::Result<T> where T: IsMinusOne, F: FnMut() -> T,
```

Just to provide the same interface as sys/pal/unix/net.rs
