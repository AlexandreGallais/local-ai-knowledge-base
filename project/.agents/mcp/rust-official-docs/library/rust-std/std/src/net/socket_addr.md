---
title: "std::net::socket_addr"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/std/src/net/socket_addr.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# std::net::socket_addr

## trait ToSocketAddrs

```rust
pub trait ToSocketAddrs
```

A trait for objects which can be converted or resolved to one or more
`SocketAddr` values.

This trait is used for generic address resolution when constructing network
objects. By default it is implemented for the following types:

 * `SocketAddr`: `to_socket_addrs` is the identity function.

 * `SocketAddrV4`, `SocketAddrV6`, `([IpAddr], [u16])`,
   `([Ipv4Addr], [u16])`, `([Ipv6Addr], [u16])`:
   `to_socket_addrs` constructs a `SocketAddr` trivially.

 * `(&[str], [u16])`: `&[str]` should be either a string representation
   of an `IpAddr` address as expected by `FromStr` implementation or a host
   name. `u16` is the port number.

 * `&[str]`: the string should be either a string representation of a
   `SocketAddr` as expected by its `FromStr` implementation or a string like
   `<host_name>:<port>` pair where `<port>` is a `u16` value.

 * `&[[SocketAddr]]`: all `SocketAddr` values in the slice will be used.

This trait allows constructing network objects like `TcpStream` or
`UdpSocket` easily with values of various types for the bind/connection
address. It is needed because sometimes one type is more appropriate than
the other: for simple uses a string like `"localhost:12345"` is much nicer
than manual construction of the corresponding `SocketAddr`, but sometimes
`SocketAddr` value is *the* main source of the address, and converting it to
some other type (e.g., a string) just for it to be converted back to
`SocketAddr` in constructor methods is pointless.

Addresses returned by the operating system that are not IP addresses are
silently ignored.

# Examples

Creating a `SocketAddr` iterator that yields one item:

```rust
use std::net::{ToSocketAddrs, SocketAddr};

let addr = SocketAddr::from(([127, 0, 0, 1], 443));
let mut addrs_iter = addr.to_socket_addrs().unwrap();

assert_eq!(Some(addr), addrs_iter.next());
assert!(addrs_iter.next().is_none());
```

Creating a `SocketAddr` iterator from a hostname:

```rust
use std::net::{SocketAddr, ToSocketAddrs};

// assuming 'localhost' resolves to 127.0.0.1
let mut addrs_iter = "localhost:443".to_socket_addrs().unwrap();
assert_eq!(addrs_iter.next(), Some(SocketAddr::from(([127, 0, 0, 1], 443))));
assert!(addrs_iter.next().is_none());

// assuming 'foo' does not resolve
assert!("foo:443".to_socket_addrs().is_err());
```

Creating a `SocketAddr` iterator that yields multiple items:

```rust
use std::net::{SocketAddr, ToSocketAddrs};

let addr1 = SocketAddr::from(([0, 0, 0, 0], 80));
let addr2 = SocketAddr::from(([127, 0, 0, 1], 443));
let addrs = vec![addr1, addr2];

let mut addrs_iter = (&addrs[..]).to_socket_addrs().unwrap();

assert_eq!(Some(addr1), addrs_iter.next());
assert_eq!(Some(addr2), addrs_iter.next());
assert!(addrs_iter.next().is_none());
```

Attempting to create a `SocketAddr` iterator from an improperly formatted
socket address `&str` (missing the port):

```rust
use std::io;
use std::net::ToSocketAddrs;

let err = "127.0.0.1".to_socket_addrs().unwrap_err();
assert_eq!(err.kind(), io::ErrorKind::InvalidInput);
```

`TcpStream::connect` is an example of a function that utilizes
`ToSocketAddrs` as a trait bound on its parameter in order to accept
different types:

```rust
use std::net::{TcpStream, Ipv4Addr};

let stream = TcpStream::connect(("127.0.0.1", 443));
// or
let stream = TcpStream::connect("127.0.0.1:443");
// or
let stream = TcpStream::connect((Ipv4Addr::new(127, 0, 0, 1), 443));
```

## ToSocketAddrs::Iter

```rust
type Iter: Iterator<Item = SocketAddr>
```

Returned iterator over socket addresses which this type may correspond
to.

## ToSocketAddrs::to_socket_addrs

```rust
fn to_socket_addrs(&self) -> io::Result<Self::Iter>
```

Converts this object to an iterator of resolved `SocketAddr`s.

The returned iterator might not actually yield any values depending on the
outcome of any resolution performed.

Note that this function may block the current thread while resolution is
performed.
