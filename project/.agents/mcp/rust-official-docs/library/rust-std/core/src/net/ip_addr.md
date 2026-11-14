# core::net::ip_addr

## enum IpAddr

```rust
pub enum IpAddr
```

An IP address, either IPv4 or IPv6.

This enum can contain either an [`Ipv4Addr`] or an [`Ipv6Addr`], see their
respective documentation for more details.

# Examples

```
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

See [`IpAddr`] for a type encompassing both IPv4 and IPv6 addresses.

[IETF RFC 791]: https://tools.ietf.org/html/rfc791

# Textual representation

`Ipv4Addr` provides a [`FromStr`] implementation. The four octets are in decimal
notation, divided by `.` (this is called "dot-decimal notation").
Notably, octal numbers (which are indicated with a leading `0`) and hexadecimal numbers (which
are indicated with a leading `0x`) are not allowed per [IETF RFC 6943].

[IETF RFC 6943]: https://tools.ietf.org/html/rfc6943#section-3.1.1
[`FromStr`]: crate::str::FromStr

# Examples

```
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

[IETF RFC 4291]: https://tools.ietf.org/html/rfc4291

# Embedding IPv4 Addresses

See [`IpAddr`] for a type encompassing both IPv4 and IPv6 addresses.

To assist in the transition from IPv4 to IPv6 two types of IPv6 addresses that embed an IPv4 address were defined:
IPv4-compatible and IPv4-mapped addresses. Of these IPv4-compatible addresses have been officially deprecated.

Both types of addresses are not assigned any special meaning by this implementation,
other than what the relevant standards prescribe. This means that an address like `::ffff:127.0.0.1`,
while representing an IPv4 loopback address, is not itself an IPv6 loopback address; only `::1` is.
To handle these so called "IPv4-in-IPv6" addresses, they have to first be converted to their canonical IPv4 address.

### IPv4-Compatible IPv6 Addresses

IPv4-compatible IPv6 addresses are defined in [IETF RFC 4291 Section 2.5.5.1], and have been officially deprecated.
The RFC describes the format of an "IPv4-Compatible IPv6 address" as follows:

```text
|                80 bits               | 16 |      32 bits        |
+--------------------------------------+--------------------------+
|0000..............................0000|0000|    IPv4 address     |
+--------------------------------------+----+---------------------+
```
So `::a.b.c.d` would be an IPv4-compatible IPv6 address representing the IPv4 address `a.b.c.d`.

To convert from an IPv4 address to an IPv4-compatible IPv6 address, use [`Ipv4Addr::to_ipv6_compatible`].
Use [`Ipv6Addr::to_ipv4`] to convert an IPv4-compatible IPv6 address to the canonical IPv4 address.

[IETF RFC 4291 Section 2.5.5.1]: https://datatracker.ietf.org/doc/html/rfc4291#section-2.5.5.1

### IPv4-Mapped IPv6 Addresses

IPv4-mapped IPv6 addresses are defined in [IETF RFC 4291 Section 2.5.5.2].
The RFC describes the format of an "IPv4-Mapped IPv6 address" as follows:

```text
|                80 bits               | 16 |      32 bits        |
+--------------------------------------+--------------------------+
|0000..............................0000|FFFF|    IPv4 address     |
+--------------------------------------+----+---------------------+
```
So `::ffff:a.b.c.d` would be an IPv4-mapped IPv6 address representing the IPv4 address `a.b.c.d`.

To convert from an IPv4 address to an IPv4-mapped IPv6 address, use [`Ipv4Addr::to_ipv6_mapped`].
Use [`Ipv6Addr::to_ipv4`] to convert an IPv4-mapped IPv6 address to the canonical IPv4 address.
Note that this will also convert the IPv6 loopback address `::1` to `0.0.0.1`. Use
[`Ipv6Addr::to_ipv4_mapped`] to avoid this.

[IETF RFC 4291 Section 2.5.5.2]: https://datatracker.ietf.org/doc/html/rfc4291#section-2.5.5.2

# Textual representation

`Ipv6Addr` provides a [`FromStr`] implementation. There are many ways to represent
an IPv6 address in text, but in general, each segments is written in hexadecimal
notation, and segments are separated by `:`. For more information, see
[IETF RFC 5952].

[`FromStr`]: crate::str::FromStr
[IETF RFC 5952]: https://tools.ietf.org/html/rfc5952

# Examples

```
use std::net::Ipv6Addr;

let localhost = Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 1);
assert_eq!("::1".parse(), Ok(localhost));
assert_eq!(localhost.is_loopback(), true);
```

## IpAddr::is_unspecified

```rust
pub const fn is_unspecified(&self) -> bool
```

Returns [`true`] for the special 'unspecified' address.

See the documentation for [`Ipv4Addr::is_unspecified()`] and
[`Ipv6Addr::is_unspecified()`] for more details.

# Examples

```
use std::net::{IpAddr, Ipv4Addr, Ipv6Addr};

assert_eq!(IpAddr::V4(Ipv4Addr::new(0, 0, 0, 0)).is_unspecified(), true);
assert_eq!(IpAddr::V6(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 0)).is_unspecified(), true);
```

## IpAddr::is_loopback

```rust
pub const fn is_loopback(&self) -> bool
```

Returns [`true`] if this is a loopback address.

See the documentation for [`Ipv4Addr::is_loopback()`] and
[`Ipv6Addr::is_loopback()`] for more details.

# Examples

```
use std::net::{IpAddr, Ipv4Addr, Ipv6Addr};

assert_eq!(IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1)).is_loopback(), true);
assert_eq!(IpAddr::V6(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 0x1)).is_loopback(), true);
```

## IpAddr::is_multicast

```rust
pub const fn is_multicast(&self) -> bool
```

Returns [`true`] if this is a multicast address.

See the documentation for [`Ipv4Addr::is_multicast()`] and
[`Ipv6Addr::is_multicast()`] for more details.

# Examples

```
use std::net::{IpAddr, Ipv4Addr, Ipv6Addr};

assert_eq!(IpAddr::V4(Ipv4Addr::new(224, 254, 0, 0)).is_multicast(), true);
assert_eq!(IpAddr::V6(Ipv6Addr::new(0xff00, 0, 0, 0, 0, 0, 0, 0)).is_multicast(), true);
```

## IpAddr::is_ipv4

```rust
pub const fn is_ipv4(&self) -> bool
```

Returns [`true`] if this address is an [`IPv4` address], and [`false`]
otherwise.

[`IPv4` address]: IpAddr::V4

# Examples

```
use std::net::{IpAddr, Ipv4Addr, Ipv6Addr};

assert_eq!(IpAddr::V4(Ipv4Addr::new(203, 0, 113, 6)).is_ipv4(), true);
assert_eq!(IpAddr::V6(Ipv6Addr::new(0x2001, 0xdb8, 0, 0, 0, 0, 0, 0)).is_ipv4(), false);
```

## IpAddr::is_ipv6

```rust
pub const fn is_ipv6(&self) -> bool
```

Returns [`true`] if this address is an [`IPv6` address], and [`false`]
otherwise.

[`IPv6` address]: IpAddr::V6

# Examples

```
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

```
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

```
use std::net::Ipv4Addr;

let addr = Ipv4Addr::new(127, 0, 0, 1);
```

## Ipv4Addr::BITS

```rust
pub const BITS: u32 = 32
```

The size of an IPv4 address in bits.

# Examples

```
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

```
use std::net::Ipv4Addr;

let addr = Ipv4Addr::new(0x12, 0x34, 0x56, 0x78);
assert_eq!(0x12345678, addr.to_bits());
```

```
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

See [`Ipv4Addr::to_bits`] for an explanation on endianness.

# Examples

```
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

```
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

```
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

```
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

```
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

```
use std::net::Ipv4Addr;

let addr = Ipv4Addr::from_octets([13u8, 12u8, 11u8, 10u8]);
assert_eq!(Ipv4Addr::new(13, 12, 11, 10), addr);
```

## Ipv4Addr::is_unspecified

```rust
pub const fn is_unspecified(&self) -> bool
```

Returns [`true`] for the special 'unspecified' address (`0.0.0.0`).

This property is defined in _UNIX Network Programming, Second Edition_,
W. Richard Stevens, p. 891; see also [ip7].

[ip7]: https://man7.org/linux/man-pages/man7/ip.7.html

# Examples

```
use std::net::Ipv4Addr;

assert_eq!(Ipv4Addr::new(0, 0, 0, 0).is_unspecified(), true);
assert_eq!(Ipv4Addr::new(45, 22, 13, 197).is_unspecified(), false);
```

## Ipv4Addr::is_loopback

```rust
pub const fn is_loopback(&self) -> bool
```

Returns [`true`] if this is a loopback address (`127.0.0.0/8`).

This property is defined by [IETF RFC 1122].

[IETF RFC 1122]: https://tools.ietf.org/html/rfc1122

# Examples

```
use std::net::Ipv4Addr;

assert_eq!(Ipv4Addr::new(127, 0, 0, 1).is_loopback(), true);
assert_eq!(Ipv4Addr::new(45, 22, 13, 197).is_loopback(), false);
```

## Ipv4Addr::is_private

```rust
pub const fn is_private(&self) -> bool
```

Returns [`true`] if this is a private address.

The private address ranges are defined in [IETF RFC 1918] and include:

 - `10.0.0.0/8`
 - `172.16.0.0/12`
 - `192.168.0.0/16`

[IETF RFC 1918]: https://tools.ietf.org/html/rfc1918

# Examples

```
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

Returns [`true`] if the address is link-local (`169.254.0.0/16`).

This property is defined by [IETF RFC 3927].

[IETF RFC 3927]: https://tools.ietf.org/html/rfc3927

# Examples

```
use std::net::Ipv4Addr;

assert_eq!(Ipv4Addr::new(169, 254, 0, 0).is_link_local(), true);
assert_eq!(Ipv4Addr::new(169, 254, 10, 65).is_link_local(), true);
assert_eq!(Ipv4Addr::new(16, 89, 10, 65).is_link_local(), false);
```

## Ipv4Addr::is_multicast

```rust
pub const fn is_multicast(&self) -> bool
```

Returns [`true`] if this is a multicast address (`224.0.0.0/4`).

Multicast addresses have a most significant octet between `224` and `239`,
and is defined by [IETF RFC 5771].

[IETF RFC 5771]: https://tools.ietf.org/html/rfc5771

# Examples

```
use std::net::Ipv4Addr;

assert_eq!(Ipv4Addr::new(224, 254, 0, 0).is_multicast(), true);
assert_eq!(Ipv4Addr::new(236, 168, 10, 65).is_multicast(), true);
assert_eq!(Ipv4Addr::new(172, 16, 10, 65).is_multicast(), false);
```

## Ipv4Addr::is_broadcast

```rust
pub const fn is_broadcast(&self) -> bool
```

Returns [`true`] if this is a broadcast address (`255.255.255.255`).

A broadcast address has all octets set to `255` as defined in [IETF RFC 919].

[IETF RFC 919]: https://tools.ietf.org/html/rfc919

# Examples

```
use std::net::Ipv4Addr;

assert_eq!(Ipv4Addr::new(255, 255, 255, 255).is_broadcast(), true);
assert_eq!(Ipv4Addr::new(236, 168, 10, 65).is_broadcast(), false);
```

## Ipv4Addr::is_documentation

```rust
pub const fn is_documentation(&self) -> bool
```

Returns [`true`] if this address is in a range designated for documentation.

This is defined in [IETF RFC 5737]:

- `192.0.2.0/24` (TEST-NET-1)
- `198.51.100.0/24` (TEST-NET-2)
- `203.0.113.0/24` (TEST-NET-3)

[IETF RFC 5737]: https://tools.ietf.org/html/rfc5737

# Examples

```
use std::net::Ipv4Addr;

assert_eq!(Ipv4Addr::new(192, 0, 2, 255).is_documentation(), true);
assert_eq!(Ipv4Addr::new(198, 51, 100, 65).is_documentation(), true);
assert_eq!(Ipv4Addr::new(203, 0, 113, 6).is_documentation(), true);
assert_eq!(Ipv4Addr::new(193, 34, 17, 19).is_documentation(), false);
```

## Ipv4Addr::to_ipv6_compatible

```rust
pub const fn to_ipv6_compatible(&self) -> Ipv6Addr
```

Converts this address to an [IPv4-compatible] [`IPv6` address].

`a.b.c.d` becomes `::a.b.c.d`

Note that IPv4-compatible addresses have been officially deprecated.
If you don't explicitly need an IPv4-compatible address for legacy reasons, consider using `to_ipv6_mapped` instead.

[IPv4-compatible]: Ipv6Addr#ipv4-compatible-ipv6-addresses
[`IPv6` address]: Ipv6Addr

# Examples

```
use std::net::{Ipv4Addr, Ipv6Addr};

assert_eq!(
    Ipv4Addr::new(192, 0, 2, 255).to_ipv6_compatible(),
    Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0xc000, 0x2ff)
);
```

## Ipv4Addr::to_ipv6_mapped

```rust
pub const fn to_ipv6_mapped(&self) -> Ipv6Addr
```

Converts this address to an [IPv4-mapped] [`IPv6` address].

`a.b.c.d` becomes `::ffff:a.b.c.d`

[IPv4-mapped]: Ipv6Addr#ipv4-mapped-ipv6-addresses
[`IPv6` address]: Ipv6Addr

# Examples

```
use std::net::{Ipv4Addr, Ipv6Addr};

assert_eq!(Ipv4Addr::new(192, 0, 2, 255).to_ipv6_mapped(),
           Ipv6Addr::new(0, 0, 0, 0, 0, 0xffff, 0xc000, 0x2ff));
```

## Ipv6Addr::new

```rust
pub const fn new(a: u16, b: u16, c: u16, d: u16, e: u16, f: u16, g: u16, h: u16) -> Ipv6Addr
```

Creates a new IPv6 address from eight 16-bit segments.

The result will represent the IP address `a:b:c:d:e:f:g:h`.

# Examples

```
use std::net::Ipv6Addr;

let addr = Ipv6Addr::new(0, 0, 0, 0, 0, 0xffff, 0xc00a, 0x2ff);
```

## Ipv6Addr::BITS

```rust
pub const BITS: u32 = 128
```

The size of an IPv6 address in bits.

# Examples

```
use std::net::Ipv6Addr;

assert_eq!(Ipv6Addr::BITS, 128);
```

## Ipv6Addr::to_bits

```rust
pub const fn to_bits(self) -> u128
```

Converts an IPv6 address into a `u128` representation using native byte order.

Although IPv6 addresses are big-endian, the `u128` value will use the target platform's
native byte order. That is, the `u128` value is an integer representation of the IPv6
address and not an integer interpretation of the IPv6 address's big-endian bitstring. This
means that the `u128` value masked with `0xffffffffffffffffffffffffffff0000_u128` will set
the last segment in the address to 0, regardless of the target platform's endianness.

# Examples

```
use std::net::Ipv6Addr;

let addr = Ipv6Addr::new(
    0x1020, 0x3040, 0x5060, 0x7080,
    0x90A0, 0xB0C0, 0xD0E0, 0xF00D,
);
assert_eq!(0x102030405060708090A0B0C0D0E0F00D_u128, addr.to_bits());
```

```
use std::net::Ipv6Addr;

let addr = Ipv6Addr::new(
    0x1020, 0x3040, 0x5060, 0x7080,
    0x90A0, 0xB0C0, 0xD0E0, 0xF00D,
);
let addr_bits = addr.to_bits() & 0xffffffffffffffffffffffffffff0000_u128;
assert_eq!(
    Ipv6Addr::new(
        0x1020, 0x3040, 0x5060, 0x7080,
        0x90A0, 0xB0C0, 0xD0E0, 0x0000,
    ),
    Ipv6Addr::from_bits(addr_bits));

```

## Ipv6Addr::from_bits

```rust
pub const fn from_bits(bits: u128) -> Ipv6Addr
```

Converts a native byte order `u128` into an IPv6 address.

See [`Ipv6Addr::to_bits`] for an explanation on endianness.

# Examples

```
use std::net::Ipv6Addr;

let addr = Ipv6Addr::from_bits(0x102030405060708090A0B0C0D0E0F00D_u128);
assert_eq!(
    Ipv6Addr::new(
        0x1020, 0x3040, 0x5060, 0x7080,
        0x90A0, 0xB0C0, 0xD0E0, 0xF00D,
    ),
    addr);
```

## Ipv6Addr::LOCALHOST

```rust
pub const LOCALHOST: Self = Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 1)
```

An IPv6 address representing localhost: `::1`.

This corresponds to constant `IN6ADDR_LOOPBACK_INIT` or `in6addr_loopback` in other
languages.

# Examples

```
use std::net::Ipv6Addr;

let addr = Ipv6Addr::LOCALHOST;
assert_eq!(addr, Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 1));
```

## Ipv6Addr::UNSPECIFIED

```rust
pub const UNSPECIFIED: Self = Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 0)
```

An IPv6 address representing the unspecified address: `::`.

This corresponds to constant `IN6ADDR_ANY_INIT` or `in6addr_any` in other languages.

# Examples

```
use std::net::Ipv6Addr;

let addr = Ipv6Addr::UNSPECIFIED;
assert_eq!(addr, Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 0));
```

## Ipv6Addr::segments

```rust
pub const fn segments(&self) -> [u16; 8]
```

Returns the eight 16-bit segments that make up this address.

# Examples

```
use std::net::Ipv6Addr;

assert_eq!(Ipv6Addr::new(0, 0, 0, 0, 0, 0xffff, 0xc00a, 0x2ff).segments(),
           [0, 0, 0, 0, 0, 0xffff, 0xc00a, 0x2ff]);
```

## Ipv6Addr::from_segments

```rust
pub const fn from_segments(segments: [u16; 8]) -> Ipv6Addr
```

Creates an `Ipv6Addr` from an eight element 16-bit array.

# Examples

```
use std::net::Ipv6Addr;

let addr = Ipv6Addr::from_segments([
    0x20du16, 0x20cu16, 0x20bu16, 0x20au16,
    0x209u16, 0x208u16, 0x207u16, 0x206u16,
]);
assert_eq!(
    Ipv6Addr::new(
        0x20d, 0x20c, 0x20b, 0x20a,
        0x209, 0x208, 0x207, 0x206,
    ),
    addr
);
```

## Ipv6Addr::is_unspecified

```rust
pub const fn is_unspecified(&self) -> bool
```

Returns [`true`] for the special 'unspecified' address (`::`).

This property is defined in [IETF RFC 4291].

[IETF RFC 4291]: https://tools.ietf.org/html/rfc4291

# Examples

```
use std::net::Ipv6Addr;

assert_eq!(Ipv6Addr::new(0, 0, 0, 0, 0, 0xffff, 0xc00a, 0x2ff).is_unspecified(), false);
assert_eq!(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 0).is_unspecified(), true);
```

## Ipv6Addr::is_loopback

```rust
pub const fn is_loopback(&self) -> bool
```

Returns [`true`] if this is the [loopback address] (`::1`),
as defined in [IETF RFC 4291 section 2.5.3].

Contrary to IPv4, in IPv6 there is only one loopback address.

[loopback address]: Ipv6Addr::LOCALHOST
[IETF RFC 4291 section 2.5.3]: https://tools.ietf.org/html/rfc4291#section-2.5.3

# Examples

```
use std::net::Ipv6Addr;

assert_eq!(Ipv6Addr::new(0, 0, 0, 0, 0, 0xffff, 0xc00a, 0x2ff).is_loopback(), false);
assert_eq!(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 0x1).is_loopback(), true);
```

## Ipv6Addr::is_unique_local

```rust
pub const fn is_unique_local(&self) -> bool
```

Returns [`true`] if this is a unique local address (`fc00::/7`).

This property is defined in [IETF RFC 4193].

[IETF RFC 4193]: https://tools.ietf.org/html/rfc4193

# Examples

```
use std::net::Ipv6Addr;

assert_eq!(Ipv6Addr::new(0, 0, 0, 0, 0, 0xffff, 0xc00a, 0x2ff).is_unique_local(), false);
assert_eq!(Ipv6Addr::new(0xfc02, 0, 0, 0, 0, 0, 0, 0).is_unique_local(), true);
```

## Ipv6Addr::is_unicast_link_local

```rust
pub const fn is_unicast_link_local(&self) -> bool
```

Returns `true` if the address is a unicast address with link-local scope,
as defined in [RFC 4291].

A unicast address has link-local scope if it has the prefix `fe80::/10`, as per [RFC 4291 section 2.4].
Note that this encompasses more addresses than those defined in [RFC 4291 section 2.5.6],
which describes "Link-Local IPv6 Unicast Addresses" as having the following stricter format:

```text
| 10 bits  |         54 bits         |          64 bits           |
+----------+-------------------------+----------------------------+
|1111111010|           0             |       interface ID         |
+----------+-------------------------+----------------------------+
```
So while currently the only addresses with link-local scope an application will encounter are all in `fe80::/64`,
this might change in the future with the publication of new standards. More addresses in `fe80::/10` could be allocated,
and those addresses will have link-local scope.

Also note that while [RFC 4291 section 2.5.3] mentions about the [loopback address] (`::1`) that "it is treated as having Link-Local scope",
this does not mean that the loopback address actually has link-local scope and this method will return `false` on it.

[RFC 4291]: https://tools.ietf.org/html/rfc4291
[RFC 4291 section 2.4]: https://tools.ietf.org/html/rfc4291#section-2.4
[RFC 4291 section 2.5.3]: https://tools.ietf.org/html/rfc4291#section-2.5.3
[RFC 4291 section 2.5.6]: https://tools.ietf.org/html/rfc4291#section-2.5.6
[loopback address]: Ipv6Addr::LOCALHOST

# Examples

```
use std::net::Ipv6Addr;

// The loopback address (`::1`) does not actually have link-local scope.
assert_eq!(Ipv6Addr::LOCALHOST.is_unicast_link_local(), false);

// Only addresses in `fe80::/10` have link-local scope.
assert_eq!(Ipv6Addr::new(0x2001, 0xdb8, 0, 0, 0, 0, 0, 0).is_unicast_link_local(), false);
assert_eq!(Ipv6Addr::new(0xfe80, 0, 0, 0, 0, 0, 0, 0).is_unicast_link_local(), true);

// Addresses outside the stricter `fe80::/64` also have link-local scope.
assert_eq!(Ipv6Addr::new(0xfe80, 0, 0, 1, 0, 0, 0, 0).is_unicast_link_local(), true);
assert_eq!(Ipv6Addr::new(0xfe81, 0, 0, 0, 0, 0, 0, 0).is_unicast_link_local(), true);
```

## Ipv6Addr::is_multicast

```rust
pub const fn is_multicast(&self) -> bool
```

Returns [`true`] if this is a multicast address (`ff00::/8`).

This property is defined by [IETF RFC 4291].

[IETF RFC 4291]: https://tools.ietf.org/html/rfc4291

# Examples

```
use std::net::Ipv6Addr;

assert_eq!(Ipv6Addr::new(0xff00, 0, 0, 0, 0, 0, 0, 0).is_multicast(), true);
assert_eq!(Ipv6Addr::new(0, 0, 0, 0, 0, 0xffff, 0xc00a, 0x2ff).is_multicast(), false);
```

## Ipv6Addr::to_ipv4_mapped

```rust
pub const fn to_ipv4_mapped(&self) -> Option<Ipv4Addr>
```

Converts this address to an [`IPv4` address] if it's an [IPv4-mapped] address,
as defined in [IETF RFC 4291 section 2.5.5.2], otherwise returns [`None`].

`::ffff:a.b.c.d` becomes `a.b.c.d`.
All addresses *not* starting with `::ffff` will return `None`.

[`IPv4` address]: Ipv4Addr
[IPv4-mapped]: Ipv6Addr
[IETF RFC 4291 section 2.5.5.2]: https://tools.ietf.org/html/rfc4291#section-2.5.5.2

# Examples

```
use std::net::{Ipv4Addr, Ipv6Addr};

assert_eq!(Ipv6Addr::new(0xff00, 0, 0, 0, 0, 0, 0, 0).to_ipv4_mapped(), None);
assert_eq!(Ipv6Addr::new(0, 0, 0, 0, 0, 0xffff, 0xc00a, 0x2ff).to_ipv4_mapped(),
           Some(Ipv4Addr::new(192, 10, 2, 255)));
assert_eq!(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 1).to_ipv4_mapped(), None);
```

## Ipv6Addr::to_ipv4

```rust
pub const fn to_ipv4(&self) -> Option<Ipv4Addr>
```

Converts this address to an [`IPv4` address] if it is either
an [IPv4-compatible] address as defined in [IETF RFC 4291 section 2.5.5.1],
or an [IPv4-mapped] address as defined in [IETF RFC 4291 section 2.5.5.2],
otherwise returns [`None`].

Note that this will return an [`IPv4` address] for the IPv6 loopback address `::1`. Use
[`Ipv6Addr::to_ipv4_mapped`] to avoid this.

`::a.b.c.d` and `::ffff:a.b.c.d` become `a.b.c.d`. `::1` becomes `0.0.0.1`.
All addresses *not* starting with either all zeroes or `::ffff` will return `None`.

[`IPv4` address]: Ipv4Addr
[IPv4-compatible]: Ipv6Addr#ipv4-compatible-ipv6-addresses
[IPv4-mapped]: Ipv6Addr#ipv4-mapped-ipv6-addresses
[IETF RFC 4291 section 2.5.5.1]: https://tools.ietf.org/html/rfc4291#section-2.5.5.1
[IETF RFC 4291 section 2.5.5.2]: https://tools.ietf.org/html/rfc4291#section-2.5.5.2

# Examples

```
use std::net::{Ipv4Addr, Ipv6Addr};

assert_eq!(Ipv6Addr::new(0xff00, 0, 0, 0, 0, 0, 0, 0).to_ipv4(), None);
assert_eq!(Ipv6Addr::new(0, 0, 0, 0, 0, 0xffff, 0xc00a, 0x2ff).to_ipv4(),
           Some(Ipv4Addr::new(192, 10, 2, 255)));
assert_eq!(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 1).to_ipv4(),
           Some(Ipv4Addr::new(0, 0, 0, 1)));
```

## Ipv6Addr::to_canonical

```rust
pub const fn to_canonical(&self) -> IpAddr
```

Converts this address to an `IpAddr::V4` if it is an IPv4-mapped address,
otherwise returns self wrapped in an `IpAddr::V6`.

# Examples

```
use std::net::Ipv6Addr;

assert_eq!(Ipv6Addr::new(0, 0, 0, 0, 0, 0xffff, 0x7f00, 0x1).is_loopback(), false);
assert_eq!(Ipv6Addr::new(0, 0, 0, 0, 0, 0xffff, 0x7f00, 0x1).to_canonical().is_loopback(), true);
```

## Ipv6Addr::octets

```rust
pub const fn octets(&self) -> [u8; 16]
```

Returns the sixteen eight-bit integers the IPv6 address consists of.

```
use std::net::Ipv6Addr;

assert_eq!(Ipv6Addr::new(0xff00, 0, 0, 0, 0, 0, 0, 0).octets(),
           [0xff, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
```

## Ipv6Addr::from_octets

```rust
pub const fn from_octets(octets: [u8; 16]) -> Ipv6Addr
```

Creates an `Ipv6Addr` from a sixteen element byte array.

# Examples

```
use std::net::Ipv6Addr;

let addr = Ipv6Addr::from_octets([
    0x19u8, 0x18u8, 0x17u8, 0x16u8, 0x15u8, 0x14u8, 0x13u8, 0x12u8,
    0x11u8, 0x10u8, 0x0fu8, 0x0eu8, 0x0du8, 0x0cu8, 0x0bu8, 0x0au8,
]);
assert_eq!(
    Ipv6Addr::new(
        0x1918, 0x1716, 0x1514, 0x1312,
        0x1110, 0x0f0e, 0x0d0c, 0x0b0a,
    ),
    addr
);
```