---
title: "std::net::tests"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/net/tests.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::net::tests

## const LOCALHOST_IP4

```rust
pub const LOCALHOST_IP4: SocketAddr = SocketAddr::V4(SocketAddrV4::new(Ipv4Addr::new(127, 0, 0, 1), 0))
```

A localhost address whose port will be picked automatically by the OS.

## const LOCALHOST_IP6

```rust
pub const LOCALHOST_IP6: SocketAddr = SocketAddr::V6(SocketAddrV6::new(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 1), 0, 0, 0))
```

A localhost address whose port will be picked automatically by the OS.

## struct ZeroedMmap

```rust
pub struct ZeroedMmap
```

A read-only anonymous mapping of `len` zero bytes.

The tests that need a buffer larger than `c_int::MAX` use this instead of a
`Vec`: the pages are demand-zero and never written, so they stay mapped to
the shared zero page and the mapping doesn't actually consume `len` bytes of
physical memory.
