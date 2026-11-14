---
title: "core::net"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/net/mod.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::net

Networking primitives for IP communication.

This module provides types for IP and socket addresses.

#### Organization

* `IpAddr` represents IP addresses of either IPv4 or IPv6; `Ipv4Addr` and
  `Ipv6Addr` are respectively IPv4 and IPv6 addresses
* `SocketAddr` represents socket addresses of either IPv4 or IPv6; `SocketAddrV4`
  and `SocketAddrV6` are respectively IPv4 and IPv6 socket addresses
