# std::os::wasi::net

WASI-specific networking functionality

## trait TcpListenerExt

```rust
pub trait TcpListenerExt
```

WASI-specific extensions to [`std::net::TcpListener`].

[`std::net::TcpListener`]: crate::net::TcpListener

## TcpListenerExt::sock_accept

```rust
fn sock_accept(&self, flags: u16) -> io::Result<u32>
```

Accept a socket.

This corresponds to the `sock_accept` syscall.