---
title: "std::net"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/net/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::net

Networking primitives for TCP/UDP communication.

This module provides networking functionality for the Transmission Control and User
Datagram Protocols, as well as types for IP and socket addresses and functions related
to network properties.

#### Organization

* `TcpListener` and `TcpStream` provide functionality for communication over TCP
* `UdpSocket` provides functionality for communication over UDP
* `IpAddr` represents IP addresses of either IPv4 or IPv6; `Ipv4Addr` and
  `Ipv6Addr` are respectively IPv4 and IPv6 addresses
* `SocketAddr` represents socket addresses of either IPv4 or IPv6; `SocketAddrV4`
  and `SocketAddrV6` are respectively IPv4 and IPv6 socket addresses
* `ToSocketAddrs` is a trait that is used for generic address resolution when interacting
  with networking objects like `TcpListener`, `TcpStream` or `UdpSocket`
* Other types are return or parameter types for various methods in this module

Rust disables inheritance of socket objects to child processes by default when possible.  For
example, through the use of the `CLOEXEC` flag in UNIX systems or the `HANDLE_FLAG_INHERIT`
flag on Windows.

## enum Shutdown

```rust
pub enum Shutdown
```

Possible values which can be passed to the `TcpStream::shutdown` method.
