---
title: "std::sys::net::connection::socket"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/sys/net/connection/socket/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::sys::net::connection::socket

## fn setsockopt

```rust
pub unsafe fn setsockopt<T>( sock: &Socket, level: c_int, option_name: c_int, option_value: T, ) -> io::Result<()>
```

Sets the value of a socket option.

# Safety
`T` must be the type associated with the given socket option.

## fn getsockopt

```rust
pub unsafe fn getsockopt<T: Copy>( sock: &Socket, level: c_int, option_name: c_int, ) -> io::Result<T>
```

Gets the value of a socket option.

# Safety
`T` must be the type associated with the given socket option.
