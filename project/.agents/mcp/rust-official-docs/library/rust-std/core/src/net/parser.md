---
title: "core::net::parser"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/net/parser.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::net::parser

A private parser implementation of IPv4, IPv6, and socket addresses.

This module is "publicly exported" through the `FromStr` implementations
below.

## struct AddrParseError

```rust
pub struct AddrParseError(AddrKind)
```

An error which can be returned when parsing an IP address or a socket address.

This error is used as the error type for the `FromStr` implementation for
`IpAddr`, `Ipv4Addr`, `Ipv6Addr`, `SocketAddr`, `SocketAddrV4`, and
`SocketAddrV6`.

# Potential causes

`AddrParseError` may be thrown because the provided string does not parse as the given type,
often because it includes information only handled by a different address type.

```rust
use std::net::IpAddr;
let _foo: IpAddr = "127.0.0.1:8080".parse().expect("Cannot handle the socket port");
```

`IpAddr` doesn't handle the port. Use `SocketAddr` instead.

```rust
use std::net::SocketAddr;

// No problem, the `panic!` message has disappeared.
let _foo: SocketAddr = "127.0.0.1:8080".parse().expect("`parse` should succeed");
```
