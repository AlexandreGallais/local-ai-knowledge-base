# core::net::socket_addr

## enum SocketAddr

```rust
pub enum SocketAddr
```

An internet socket address, either IPv4 or IPv6.

Internet socket addresses consist of an [IP address], a 16-bit port number, as well
as possibly some version-dependent additional information. See [`SocketAddrV4`]'s and
[`SocketAddrV6`]'s respective documentation for more details.

[IP address]: IpAddr

# Portability

`SocketAddr` is intended to be a portable representation of socket addresses and is likely not
the same as the internal socket address type used by the target operating system's API. Like all
`repr(Rust)` structs, however, its exact layout remains undefined and should not be relied upon
between builds.

# Examples

```
use std::net::{IpAddr, Ipv4Addr, SocketAddr};

let socket = SocketAddr::new(IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1)), 8080);

assert_eq!("127.0.0.1:8080".parse(), Ok(socket));
assert_eq!(socket.port(), 8080);
assert_eq!(socket.is_ipv4(), true);
```

## struct SocketAddrV4

```rust
pub struct SocketAddrV4
```

An IPv4 socket address.

IPv4 socket addresses consist of an [`IPv4` address] and a 16-bit port number, as
stated in [IETF RFC 793].

See [`SocketAddr`] for a type encompassing both IPv4 and IPv6 socket addresses.

[IETF RFC 793]: https://tools.ietf.org/html/rfc793
[`IPv4` address]: Ipv4Addr

# Portability

`SocketAddrV4` is intended to be a portable representation of socket addresses and is likely not
the same as the internal socket address type used by the target operating system's API. Like all
`repr(Rust)` structs, however, its exact layout remains undefined and should not be relied upon
between builds.

# Textual representation

`SocketAddrV4` provides a [`FromStr`](crate::str::FromStr) implementation.
It accepts an IPv4 address in its [textual representation], followed by a
single `:`, followed by the port encoded as a decimal integer.  Other
formats are not accepted.

[textual representation]: Ipv4Addr#textual-representation

# Examples

```
use std::net::{Ipv4Addr, SocketAddrV4};

let socket = SocketAddrV4::new(Ipv4Addr::new(127, 0, 0, 1), 8080);

assert_eq!("127.0.0.1:8080".parse(), Ok(socket));
assert_eq!(socket.ip(), &Ipv4Addr::new(127, 0, 0, 1));
assert_eq!(socket.port(), 8080);
```

## struct SocketAddrV6

```rust
pub struct SocketAddrV6
```

An IPv6 socket address.

IPv6 socket addresses consist of an [`IPv6` address], a 16-bit port number, as well
as fields containing the traffic class, the flow label, and a scope identifier
(see [IETF RFC 2553, Section 3.3] for more details).

See [`SocketAddr`] for a type encompassing both IPv4 and IPv6 socket addresses.

[IETF RFC 2553, Section 3.3]: https://tools.ietf.org/html/rfc2553#section-3.3
[`IPv6` address]: Ipv6Addr

# Portability

`SocketAddrV6` is intended to be a portable representation of socket addresses and is likely not
the same as the internal socket address type used by the target operating system's API. Like all
`repr(Rust)` structs, however, its exact layout remains undefined and should not be relied upon
between builds.

# Textual representation

`SocketAddrV6` provides a [`FromStr`](crate::str::FromStr) implementation,
based on the bracketed format recommended by [IETF RFC 5952],
with scope identifiers based on those specified in [IETF RFC 4007].

It accepts addresses consisting of the following elements, in order:
  - A left square bracket (`[`)
  - The [textual representation] of an IPv6 address
  - _Optionally_, a percent sign (`%`) followed by the scope identifier
    encoded as a decimal integer
  - A right square bracket (`]`)
  - A colon (`:`)
  - The port, encoded as a decimal integer.

For example, the string `[2001:db8::413]:443` represents a `SocketAddrV6`
with the address `2001:db8::413` and port `443`.  The string
`[2001:db8::413%612]:443` represents the same address and port, with a
scope identifier of `612`.

Other formats are not accepted.

[IETF RFC 5952]: https://tools.ietf.org/html/rfc5952#section-6
[IETF RFC 4007]: https://tools.ietf.org/html/rfc4007#section-11
[textual representation]: Ipv6Addr#textual-representation

# Examples

```
use std::net::{Ipv6Addr, SocketAddrV6};

let socket = SocketAddrV6::new(Ipv6Addr::new(0x2001, 0xdb8, 0, 0, 0, 0, 0, 1), 8080, 0, 0);

assert_eq!("[2001:db8::1]:8080".parse(), Ok(socket));
assert_eq!(socket.ip(), &Ipv6Addr::new(0x2001, 0xdb8, 0, 0, 0, 0, 0, 1));
assert_eq!(socket.port(), 8080);

let mut with_scope = socket.clone();
with_scope.set_scope_id(3);
assert_eq!("[2001:db8::1%3]:8080".parse(), Ok(with_scope));
```

## SocketAddr::new

```rust
pub const fn new(ip: IpAddr, port: u16) -> SocketAddr
```

Creates a new socket address from an [IP address] and a port number.

[IP address]: IpAddr

# Examples

```
use std::net::{IpAddr, Ipv4Addr, SocketAddr};

let socket = SocketAddr::new(IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1)), 8080);
assert_eq!(socket.ip(), IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1)));
assert_eq!(socket.port(), 8080);
```

## SocketAddr::ip

```rust
pub const fn ip(&self) -> IpAddr
```

Returns the IP address associated with this socket address.

# Examples

```
use std::net::{IpAddr, Ipv4Addr, SocketAddr};

let socket = SocketAddr::new(IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1)), 8080);
assert_eq!(socket.ip(), IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1)));
```

## SocketAddr::set_ip

```rust
pub const fn set_ip(&mut self, new_ip: IpAddr)
```

Changes the IP address associated with this socket address.

# Examples

```
use std::net::{IpAddr, Ipv4Addr, SocketAddr};

let mut socket = SocketAddr::new(IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1)), 8080);
socket.set_ip(IpAddr::V4(Ipv4Addr::new(10, 10, 0, 1)));
assert_eq!(socket.ip(), IpAddr::V4(Ipv4Addr::new(10, 10, 0, 1)));
```

## SocketAddr::port

```rust
pub const fn port(&self) -> u16
```

Returns the port number associated with this socket address.

# Examples

```
use std::net::{IpAddr, Ipv4Addr, SocketAddr};

let socket = SocketAddr::new(IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1)), 8080);
assert_eq!(socket.port(), 8080);
```

## SocketAddr::set_port

```rust
pub const fn set_port(&mut self, new_port: u16)
```

Changes the port number associated with this socket address.

# Examples

```
use std::net::{IpAddr, Ipv4Addr, SocketAddr};

let mut socket = SocketAddr::new(IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1)), 8080);
socket.set_port(1025);
assert_eq!(socket.port(), 1025);
```

## SocketAddr::is_ipv4

```rust
pub const fn is_ipv4(&self) -> bool
```

Returns [`true`] if the [IP address] in this `SocketAddr` is an
[`IPv4` address], and [`false`] otherwise.

[IP address]: IpAddr
[`IPv4` address]: IpAddr::V4

# Examples

```
use std::net::{IpAddr, Ipv4Addr, SocketAddr};

let socket = SocketAddr::new(IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1)), 8080);
assert_eq!(socket.is_ipv4(), true);
assert_eq!(socket.is_ipv6(), false);
```

## SocketAddr::is_ipv6

```rust
pub const fn is_ipv6(&self) -> bool
```

Returns [`true`] if the [IP address] in this `SocketAddr` is an
[`IPv6` address], and [`false`] otherwise.

[IP address]: IpAddr
[`IPv6` address]: IpAddr::V6

# Examples

```
use std::net::{IpAddr, Ipv6Addr, SocketAddr};

let socket = SocketAddr::new(IpAddr::V6(Ipv6Addr::new(0, 0, 0, 0, 0, 65535, 0, 1)), 8080);
assert_eq!(socket.is_ipv4(), false);
assert_eq!(socket.is_ipv6(), true);
```

## SocketAddrV4::new

```rust
pub const fn new(ip: Ipv4Addr, port: u16) -> SocketAddrV4
```

Creates a new socket address from an [`IPv4` address] and a port number.

[`IPv4` address]: Ipv4Addr

# Examples

```
use std::net::{SocketAddrV4, Ipv4Addr};

let socket = SocketAddrV4::new(Ipv4Addr::new(127, 0, 0, 1), 8080);
```

## SocketAddrV4::ip

```rust
pub const fn ip(&self) -> &Ipv4Addr
```

Returns the IP address associated with this socket address.

# Examples

```
use std::net::{SocketAddrV4, Ipv4Addr};

let socket = SocketAddrV4::new(Ipv4Addr::new(127, 0, 0, 1), 8080);
assert_eq!(socket.ip(), &Ipv4Addr::new(127, 0, 0, 1));
```

## SocketAddrV4::set_ip

```rust
pub const fn set_ip(&mut self, new_ip: Ipv4Addr)
```

Changes the IP address associated with this socket address.

# Examples

```
use std::net::{SocketAddrV4, Ipv4Addr};

let mut socket = SocketAddrV4::new(Ipv4Addr::new(127, 0, 0, 1), 8080);
socket.set_ip(Ipv4Addr::new(192, 168, 0, 1));
assert_eq!(socket.ip(), &Ipv4Addr::new(192, 168, 0, 1));
```

## SocketAddrV4::port

```rust
pub const fn port(&self) -> u16
```

Returns the port number associated with this socket address.

# Examples

```
use std::net::{SocketAddrV4, Ipv4Addr};

let socket = SocketAddrV4::new(Ipv4Addr::new(127, 0, 0, 1), 8080);
assert_eq!(socket.port(), 8080);
```

## SocketAddrV4::set_port

```rust
pub const fn set_port(&mut self, new_port: u16)
```

Changes the port number associated with this socket address.

# Examples

```
use std::net::{SocketAddrV4, Ipv4Addr};

let mut socket = SocketAddrV4::new(Ipv4Addr::new(127, 0, 0, 1), 8080);
socket.set_port(4242);
assert_eq!(socket.port(), 4242);
```

## SocketAddrV6::new

```rust
pub const fn new(ip: Ipv6Addr, port: u16, flowinfo: u32, scope_id: u32) -> SocketAddrV6
```

Creates a new socket address from an [`IPv6` address], a 16-bit port number,
and the `flowinfo` and `scope_id` fields.

For more information on the meaning and layout of the `flowinfo` and `scope_id`
parameters, see [IETF RFC 2553, Section 3.3].

[IETF RFC 2553, Section 3.3]: https://tools.ietf.org/html/rfc2553#section-3.3
[`IPv6` address]: Ipv6Addr

# Examples

```
use std::net::{SocketAddrV6, Ipv6Addr};

let socket = SocketAddrV6::new(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 1), 8080, 0, 0);
```

## SocketAddrV6::ip

```rust
pub const fn ip(&self) -> &Ipv6Addr
```

Returns the IP address associated with this socket address.

# Examples

```
use std::net::{SocketAddrV6, Ipv6Addr};

let socket = SocketAddrV6::new(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 1), 8080, 0, 0);
assert_eq!(socket.ip(), &Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 1));
```

## SocketAddrV6::set_ip

```rust
pub const fn set_ip(&mut self, new_ip: Ipv6Addr)
```

Changes the IP address associated with this socket address.

# Examples

```
use std::net::{SocketAddrV6, Ipv6Addr};

let mut socket = SocketAddrV6::new(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 1), 8080, 0, 0);
socket.set_ip(Ipv6Addr::new(76, 45, 0, 0, 0, 0, 0, 0));
assert_eq!(socket.ip(), &Ipv6Addr::new(76, 45, 0, 0, 0, 0, 0, 0));
```

## SocketAddrV6::port

```rust
pub const fn port(&self) -> u16
```

Returns the port number associated with this socket address.

# Examples

```
use std::net::{SocketAddrV6, Ipv6Addr};

let socket = SocketAddrV6::new(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 1), 8080, 0, 0);
assert_eq!(socket.port(), 8080);
```

## SocketAddrV6::set_port

```rust
pub const fn set_port(&mut self, new_port: u16)
```

Changes the port number associated with this socket address.

# Examples

```
use std::net::{SocketAddrV6, Ipv6Addr};

let mut socket = SocketAddrV6::new(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 1), 8080, 0, 0);
socket.set_port(4242);
assert_eq!(socket.port(), 4242);
```

## SocketAddrV6::flowinfo

```rust
pub const fn flowinfo(&self) -> u32
```

Returns the flow information associated with this address.

This information corresponds to the `sin6_flowinfo` field in C's `netinet/in.h`,
as specified in [IETF RFC 2553, Section 3.3].
It combines information about the flow label and the traffic class as specified
in [IETF RFC 2460], respectively [Section 6] and [Section 7].

[IETF RFC 2553, Section 3.3]: https://tools.ietf.org/html/rfc2553#section-3.3
[IETF RFC 2460]: https://tools.ietf.org/html/rfc2460
[Section 6]: https://tools.ietf.org/html/rfc2460#section-6
[Section 7]: https://tools.ietf.org/html/rfc2460#section-7

# Examples

```
use std::net::{SocketAddrV6, Ipv6Addr};

let socket = SocketAddrV6::new(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 1), 8080, 10, 0);
assert_eq!(socket.flowinfo(), 10);
```

## SocketAddrV6::set_flowinfo

```rust
pub const fn set_flowinfo(&mut self, new_flowinfo: u32)
```

Changes the flow information associated with this socket address.

See [`SocketAddrV6::flowinfo`]'s documentation for more details.

# Examples

```
use std::net::{SocketAddrV6, Ipv6Addr};

let mut socket = SocketAddrV6::new(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 1), 8080, 10, 0);
socket.set_flowinfo(56);
assert_eq!(socket.flowinfo(), 56);
```

## SocketAddrV6::scope_id

```rust
pub const fn scope_id(&self) -> u32
```

Returns the scope ID associated with this address.

This information corresponds to the `sin6_scope_id` field in C's `netinet/in.h`,
as specified in [IETF RFC 2553, Section 3.3].

[IETF RFC 2553, Section 3.3]: https://tools.ietf.org/html/rfc2553#section-3.3

# Examples

```
use std::net::{SocketAddrV6, Ipv6Addr};

let socket = SocketAddrV6::new(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 1), 8080, 0, 78);
assert_eq!(socket.scope_id(), 78);
```

## SocketAddrV6::set_scope_id

```rust
pub const fn set_scope_id(&mut self, new_scope_id: u32)
```

Changes the scope ID associated with this socket address.

See [`SocketAddrV6::scope_id`]'s documentation for more details.

# Examples

```
use std::net::{SocketAddrV6, Ipv6Addr};

let mut socket = SocketAddrV6::new(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 1), 8080, 0, 78);
socket.set_scope_id(42);
assert_eq!(socket.scope_id(), 42);
```