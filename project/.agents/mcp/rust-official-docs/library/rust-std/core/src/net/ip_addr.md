---
title: "core::net::ip_addr (part 1 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/net/ip_addr.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::net::ip_addr

## enum IpAddr

```rust
pub enum IpAddr
```

An IP address, either IPv4 or IPv6.

This enum can contain either an `Ipv4Addr` or an `Ipv6Addr`, see their
respective documentation for more details.

# Examples

```rust
use std::net::{IpAddr, Ipv4Addr, Ipv6Addr};

let localhost_v4 = IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1));
let localhost_v6 = IpAddr::V6(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 1));

assert_eq!("127.0.0.1".parse(), Ok(localhost_v4));
assert_eq!("::1".parse(), Ok(localhost_v6));

assert_eq!(localhost_v4.is_ipv6(), false);
assert_eq!(localhost_v4.is_ipv4(), true);
```

## struct Ipv4Addr

```rust
pub struct Ipv4Addr
```

An IPv4 address.

IPv4 addresses are defined as 32-bit integers in [IETF RFC 791].
They are usually represented as four octets.

See `IpAddr` for a type encompassing both IPv4 and IPv6 addresses.

# Textual representation

`Ipv4Addr` provides a `FromStr` implementation. The four octets are in decimal
notation, divided by `.` (this is called "dot-decimal notation").
Notably, octal numbers (which are indicated with a leading `0`) and hexadecimal numbers (which
are indicated with a leading `0x`) are not allowed per [IETF RFC 6943].

# Examples

```rust
use std::net::Ipv4Addr;

let localhost = Ipv4Addr::new(127, 0, 0, 1);
assert_eq!("127.0.0.1".parse(), Ok(localhost));
assert_eq!(localhost.is_loopback(), true);
assert!("012.004.002.000".parse::<Ipv4Addr>().is_err()); // all octets are in octal
assert!("0000000.0.0.0".parse::<Ipv4Addr>().is_err()); // first octet is a zero in octal
assert!("0xcb.0x0.0x71.0x00".parse::<Ipv4Addr>().is_err()); // all octets are in hex
```

## struct Ipv6Addr

```rust
pub struct Ipv6Addr
```

An IPv6 address.

IPv6 addresses are defined as 128-bit integers in [IETF RFC 4291].
They are usually represented as eight 16-bit segments.

# Embedding IPv4 Addresses

See `IpAddr` for a type encompassing both IPv4 and IPv6 addresses.

To assist in the transition from IPv4 to IPv6 two types of IPv6 addresses that embed an IPv4 address were defined:
IPv4-compatible and IPv4-mapped addresses. Of these IPv4-compatible addresses have been officially deprecated.

Both types of addresses are not assigned any special meaning by this implementation,
other than what the relevant standards prescribe. This means that an address like `::ffff:127.0.0.1`,
while representing an IPv4 loopback address, is not itself an IPv6 loopback address; only `::1` is.
To handle these so called "IPv4-in-IPv6" addresses, they have to first be converted to their canonical IPv4 address.

### IPv4-Compatible IPv6 Addresses

IPv4-compatible IPv6 addresses are defined in [IETF RFC 4291 Section 2.5.5.1], and have been officially deprecated.
The RFC describes the format of an "IPv4-Compatible IPv6 address" as follows:

```
|                80 bits               | 16 |      32 bits        |
+--------------------------------------+--------------------------+
|0000..............................0000|0000|    IPv4 address     |
+--------------------------------------+----+---------------------+
```rust
So `::a.b.c.d` would be an IPv4-compatible IPv6 address representing the IPv4 address `a.b.c.d`.

To convert from an IPv4 address to an IPv4-compatible IPv6 address, use `Ipv4Addr::to_ipv6_compatible`.
Use `Ipv6Addr::to_ipv4` to convert an IPv4-compatible IPv6 address to the canonical IPv4 address.

[IETF RFC 4291 Section 2.5.5.1]: https://datatracker.ietf.org/doc/html/rfc4291#section-2.5.5.1

### IPv4-Mapped IPv6 Addresses

IPv4-mapped IPv6 addresses are defined in [IETF RFC 4291 Section 2.5.5.2].
The RFC describes the format of an "IPv4-Mapped IPv6 address" as follows:

```
|                80 bits               | 16 |      32 bits        |
+--------------------------------------+--------------------------+
|0000..............................0000|FFFF|    IPv4 address     |
+--------------------------------------+----+---------------------+
```rust
So `::ffff:a.b.c.d` would be an IPv4-mapped IPv6 address representing the IPv4 address `a.b.c.d`.

To convert from an IPv4 address to an IPv4-mapped IPv6 address, use `Ipv4Addr::to_ipv6_mapped`.
Use `Ipv6Addr::to_ipv4` to convert an IPv4-mapped IPv6 address to the canonical IPv4 address.
Note that this will also convert the IPv6 loopback address `::1` to `0.0.0.1`. Use
`Ipv6Addr::to_ipv4_mapped` to avoid this.

[IETF RFC 4291 Section 2.5.5.2]: https://datatracker.ietf.org/doc/html/rfc4291#section-2.5.5.2

`Ipv6Addr` provides a `FromStr` implementation. There are many ways to represent
an IPv6 address in text, but in general, each segments is written in hexadecimal
notation, and segments are separated by `:`. For more information, see
[IETF RFC 5952].

`FromStr`: crate::str::FromStr
[IETF RFC 5952]: https://tools.ietf.org/html/rfc5952

```
use std::net::Ipv6Addr;

let localhost = Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 1);
assert_eq!("::1".parse(), Ok(localhost));
assert_eq!(localhost.is_loopback(), true);
```rust

## IpAddr::is_unspecified

```rust
pub const fn is_unspecified(&self) -> bool
```

Returns `true` for the special 'unspecified' address.

See the documentation for `Ipv4Addr::is_unspecified()` and
`Ipv6Addr::is_unspecified()` for more details.

# Examples

```rust
use std::net::{IpAddr, Ipv4Addr, Ipv6Addr};

assert_eq!(IpAddr::V4(Ipv4Addr::new(0, 0, 0, 0)).is_unspecified(), true);
assert_eq!(IpAddr::V6(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 0)).is_unspecified(), true);
```

## IpAddr::is_loopback

```rust
pub const fn is_loopback(&self) -> bool
```

Returns `true` if this is a loopback address.

See the documentation for `Ipv4Addr::is_loopback()` and
`Ipv6Addr::is_loopback()` for more details.

# Examples

```rust
use std::net::{IpAddr, Ipv4Addr, Ipv6Addr};

assert_eq!(IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1)).is_loopback(), true);
assert_eq!(IpAddr::V6(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 0x1)).is_loopback(), true);
```

## IpAddr::is_multicast

```rust
pub const fn is_multicast(&self) -> bool
```

Returns `true` if this is a multicast address.

See the documentation for `Ipv4Addr::is_multicast()` and
`Ipv6Addr::is_multicast()` for more details.

# Examples

```rust
use std::net::{IpAddr, Ipv4Addr, Ipv6Addr};

assert_eq!(IpAddr::V4(Ipv4Addr::new(224, 254, 0, 0)).is_multicast(), true);
assert_eq!(IpAddr::V6(Ipv6Addr::new(0xff00, 0, 0, 0, 0, 0, 0, 0)).is_multicast(), true);
```

## IpAddr::is_ipv4

```rust
pub const fn is_ipv4(&self) -> bool
```

Returns `true` if this address is an [`IPv4` address], and `false`
otherwise.

# Examples

```rust
use std::net::{IpAddr, Ipv4Addr, Ipv6Addr};

assert_eq!(IpAddr::V4(Ipv4Addr::new(203, 0, 113, 6)).is_ipv4(), true);
assert_eq!(IpAddr::V6(Ipv6Addr::new(0x2001, 0xdb8, 0, 0, 0, 0, 0, 0)).is_ipv4(), false);
```

## IpAddr::is_ipv6

```rust
pub const fn is_ipv6(&self) -> bool
```

Returns `true` if this address is an [`IPv6` address], and `false`
otherwise.

# Examples

```rust
use std::net::{IpAddr, Ipv4Addr, Ipv6Addr};

assert_eq!(IpAddr::V4(Ipv4Addr::new(203, 0, 113, 6)).is_ipv6(), false);
assert_eq!(IpAddr::V6(Ipv6Addr::new(0x2001, 0xdb8, 0, 0, 0, 0, 0, 0)).is_ipv6(), true);
```

## IpAddr::to_canonical

```rust
pub const fn to_canonical(&self) -> IpAddr
```

Converts this address to an `IpAddr::V4` if it is an IPv4-mapped IPv6
address, otherwise returns `self` as-is.

# Examples

```rust
use std::net::{IpAddr, Ipv4Addr, Ipv6Addr};

let localhost_v4 = Ipv4Addr::new(127, 0, 0, 1);

assert_eq!(IpAddr::V4(localhost_v4).to_canonical(), localhost_v4);
assert_eq!(IpAddr::V6(localhost_v4.to_ipv6_mapped()).to_canonical(), localhost_v4);
assert_eq!(IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1)).to_canonical().is_loopback(), true);
assert_eq!(IpAddr::V6(Ipv6Addr::new(0, 0, 0, 0, 0, 0xffff, 0x7f00, 0x1)).is_loopback(), false);
assert_eq!(IpAddr::V6(Ipv6Addr::new(0, 0, 0, 0, 0, 0xffff, 0x7f00, 0x1)).to_canonical().is_loopback(), true);
```

## Ipv4Addr::new

```rust
pub const fn new(a: u8, b: u8, c: u8, d: u8) -> Ipv4Addr
```

Creates a new IPv4 address from four eight-bit octets.

The result will represent the IP address `a`.`b`.`c`.`d`.

# Examples

```rust
use std::net::Ipv4Addr;

let addr = Ipv4Addr::new(127, 0, 0, 1);
```

## Ipv4Addr::BITS

```rust
pub const BITS: u32 = 32
```

The size of an IPv4 address in bits.

# Examples

```rust
use std::net::Ipv4Addr;

assert_eq!(Ipv4Addr::BITS, 32);
```

## Ipv4Addr::to_bits

```rust
pub const fn to_bits(self) -> u32
```

Converts an IPv4 address into a `u32` representation using native byte order.

Although IPv4 addresses are big-endian, the `u32` value will use the target platform's
native byte order. That is, the `u32` value is an integer representation of the IPv4
address and not an integer interpretation of the IPv4 address's big-endian bitstring. This
means that the `u32` value masked with `0xffffff00` will set the last octet in the address
to 0, regardless of the target platform's endianness.

# Examples

```rust
use std::net::Ipv4Addr;

let addr = Ipv4Addr::new(0x12, 0x34, 0x56, 0x78);
assert_eq!(0x12345678, addr.to_bits());
```

```rust
use std::net::Ipv4Addr;

let addr = Ipv4Addr::new(0x12, 0x34, 0x56, 0x78);
let addr_bits = addr.to_bits() & 0xffffff00;
assert_eq!(Ipv4Addr::new(0x12, 0x34, 0x56, 0x00), Ipv4Addr::from_bits(addr_bits));

```

## Ipv4Addr::from_bits

```rust
pub const fn from_bits(bits: u32) -> Ipv4Addr
```

Converts a native byte order `u32` into an IPv4 address.

See `Ipv4Addr::to_bits` for an explanation on endianness.

# Examples

```rust
use std::net::Ipv4Addr;

let addr = Ipv4Addr::from_bits(0x12345678);
assert_eq!(Ipv4Addr::new(0x12, 0x34, 0x56, 0x78), addr);
```

## Ipv4Addr::LOCALHOST

```rust
pub const LOCALHOST: Self = Ipv4Addr::new(127, 0, 0, 1)
```

An IPv4 address with the address pointing to localhost: `127.0.0.1`

# Examples

```rust
use std::net::Ipv4Addr;

let addr = Ipv4Addr::LOCALHOST;
assert_eq!(addr, Ipv4Addr::new(127, 0, 0, 1));
```

## Ipv4Addr::UNSPECIFIED

```rust
pub const UNSPECIFIED: Self = Ipv4Addr::new(0, 0, 0, 0)
```

An IPv4 address representing an unspecified address: `0.0.0.0`

This corresponds to the constant `INADDR_ANY` in other languages.

# Examples

```rust
use std::net::Ipv4Addr;

let addr = Ipv4Addr::UNSPECIFIED;
assert_eq!(addr, Ipv4Addr::new(0, 0, 0, 0));
```

## Ipv4Addr::BROADCAST

```rust
pub const BROADCAST: Self = Ipv4Addr::new(255, 255, 255, 255)
```

An IPv4 address representing the broadcast address: `255.255.255.255`.

# Examples

```rust
use std::net::Ipv4Addr;

let addr = Ipv4Addr::BROADCAST;
assert_eq!(addr, Ipv4Addr::new(255, 255, 255, 255));
```

## Ipv4Addr::octets

```rust
pub const fn octets(&self) -> [u8; 4]
```

Returns the four eight-bit integers that make up this address.

# Examples

```rust
use std::net::Ipv4Addr;

let addr = Ipv4Addr::new(127, 0, 0, 1);
assert_eq!(addr.octets(), [127, 0, 0, 1]);
```

## Ipv4Addr::from_octets

```rust
pub const fn from_octets(octets: [u8; 4]) -> Ipv4Addr
```

Creates an `Ipv4Addr` from a four element byte array.

# Examples

```rust
use std::net::Ipv4Addr;

let addr = Ipv4Addr::from_octets([13u8, 12u8, 11u8, 10u8]);
assert_eq!(Ipv4Addr::new(13, 12, 11, 10), addr);
```

## Ipv4Addr::is_unspecified

```rust
pub const fn is_unspecified(&self) -> bool
```

Returns `true` for the special 'unspecified' address (`0.0.0.0`).

This property is defined in _UNIX Network Programming, Second Edition_,
W. Richard Stevens, p. 891; see also [ip7].

# Examples

```rust
use std::net::Ipv4Addr;

assert_eq!(Ipv4Addr::new(0, 0, 0, 0).is_unspecified(), true);
assert_eq!(Ipv4Addr::new(45, 22, 13, 197).is_unspecified(), false);
```

## Ipv4Addr::is_loopback

```rust
pub const fn is_loopback(&self) -> bool
```

Returns `true` if this is a loopback address (`127.0.0.0/8`).

This property is defined by [IETF RFC 1122].

# Examples

```rust
use std::net::Ipv4Addr;

assert_eq!(Ipv4Addr::new(127, 0, 0, 1).is_loopback(), true);
assert_eq!(Ipv4Addr::new(45, 22, 13, 197).is_loopback(), false);
```

## Ipv4Addr::is_private

```rust
pub const fn is_private(&self) -> bool
```

Returns `true` if this is a private address.

The private address ranges are defined in [IETF RFC 1918] and include:

 - `10.0.0.0/8`
 - `172.16.0.0/12`
 - `192.168.0.0/16`

# Examples

```rust
use std::net::Ipv4Addr;

assert_eq!(Ipv4Addr::new(10, 0, 0, 1).is_private(), true);
assert_eq!(Ipv4Addr::new(10, 10, 10, 10).is_private(), true);
assert_eq!(Ipv4Addr::new(172, 16, 10, 10).is_private(), true);
assert_eq!(Ipv4Addr::new(172, 29, 45, 14).is_private(), true);
assert_eq!(Ipv4Addr::new(172, 32, 0, 2).is_private(), false);
assert_eq!(Ipv4Addr::new(192, 168, 0, 2).is_private(), true);
assert_eq!(Ipv4Addr::new(192, 169, 0, 2).is_private(), false);
```

## Ipv4Addr::is_link_local

```rust
pub const fn is_link_local(&self) -> bool
```

Returns `true` if the address is link-local (`169.254.0.0/16`).

This property is defined by [IETF RFC 3927].

# Examples

```rust
use std::net::Ipv4Addr;

assert_eq!(Ipv4Addr::new(169, 254, 0, 0).is_link_local(), true);
assert_eq!(Ipv4Addr::new(169, 254, 10, 65).is_link_local(), true);
assert_eq!(Ipv4Addr::new(16, 89, 10, 65).is_link_local(), false);
```

## Ipv4Addr::is_multicast

```rust
pub const fn is_multicast(&self) -> bool
```

Returns `true` if this is a multicast address (`224.0.0.0/4`).

Multicast addresses have a most significant octet between `224` and `239`,
and is defined by [IETF RFC 5771].

# Examples

```rust
use std::net::Ipv4Addr;

assert_eq!(Ipv4Addr::new(224, 254, 0, 0).is_multicast(), true);
assert_eq!(Ipv4Addr::new(236, 168, 10, 65).is_multicast(), true);
assert_eq!(Ipv4Addr::new(172, 16, 10, 65).is_multicast(), false);
```

## Ipv4Addr::is_broadcast

```rust
pub const fn is_broadcast(&self) -> bool
```

Returns `true` if this is a broadcast address (`255.255.255.255`).

A broadcast address has all octets set to `255` as defined in [IETF RFC 919].

# Examples

```rust
use std::net::Ipv4Addr;

assert_eq!(Ipv4Addr::new(255, 255, 255, 255).is_broadcast(), true);
assert_eq!(Ipv4Addr::new(236, 168, 10, 65).is_broadcast(), false);
```

## Ipv4Addr::is_documentation

```rust
pub const fn is_documentation(&self) -> bool
```

Returns `true` if this address is in a range designated for documentation.

This is defined in [IETF RFC 5737]:

- `192.0.2.0/24` (TEST-NET-1)
- `198.51.100.0/24` (TEST-NET-2)
- `203.0.113.0/24` (TEST-NET-3)

# Examples

```rust
use std::net::Ipv4Addr;

assert_eq!(Ipv4Addr::new(192, 0, 2, 255).is_documentation(), true);
assert_eq!(Ipv4Addr::new(198, 51, 100, 65).is_documentation(), true);
assert_eq!(Ipv4Addr::new(203, 0, 113, 6).is_documentation(), true);
assert_eq!(Ipv4Addr::new(193, 34, 17, 19).is_documentation(), false);
```
