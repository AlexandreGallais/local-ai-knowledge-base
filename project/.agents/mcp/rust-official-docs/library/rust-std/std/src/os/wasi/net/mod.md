---
title: "std::os::wasi::net"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/os/wasi/net/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::os::wasi::net

WASI-specific networking functionality

## trait TcpListenerExt

```rust
pub trait TcpListenerExt
```

WASI-specific extensions to `std::net::TcpListener`.

## TcpListenerExt::sock_accept

```rust
fn sock_accept(&self, flags: u16) -> io::Result<u32>
```

Accept a socket.

This corresponds to the `sock_accept` syscall.
