---
title: "core::net::ip_addr (part 2 of 2)"
tool: "rust-std"
version: "1.100"
source: "https://github.com/rust-lang/rust/blob/0ef1bc386059596dada8fb65b50425aab2ea637a/library/core/src/net/ip_addr.rs"
commit: "0ef1bc386059596dada8fb65b50425aab2ea637a"
license: "MIT OR Apache-2.0"
---

# core::net::ip_addr (part 2 of 2)

## Ipv4Addr::to_ipv6_compatible

```rust
pub const fn to_ipv6_compatible(&self) -> Ipv6Addr
```

Converts this address to an [IPv4-compatible] [`IPv6` address].

`a.b.c.d` becomes `::a.b.c.d`

Note that IPv4-compatible addresses have been officially deprecated.
If you don't explicitly need an IPv4-compatible address for legacy reasons, consider using `to_ipv6_mapped` instead.

# Examples

```rust
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

# Examples

```rust
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

```rust
use std::net::Ipv6Addr;

let addr = Ipv6Addr::new(0, 0, 0, 0, 0, 0xffff, 0xc00a, 0x2ff);
```

## Ipv6Addr::BITS

```rust
pub const BITS: u32 = 128
```

The size of an IPv6 address in bits.

# Examples

```rust
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

```rust
use std::net::Ipv6Addr;

let addr = Ipv6Addr::new(
    0x1020, 0x3040, 0x5060, 0x7080,
    0x90A0, 0xB0C0, 0xD0E0, 0xF00D,
);
assert_eq!(0x102030405060708090A0B0C0D0E0F00D_u128, addr.to_bits());
```

```rust
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

See `Ipv6Addr::to_bits` for an explanation on endianness.

# Examples

```rust
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

```rust
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

```rust
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

```rust
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

```rust
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

Returns `true` for the special 'unspecified' address (`::`).

This property is defined in [IETF RFC 4291].

# Examples

```rust
use std::net::Ipv6Addr;

assert_eq!(Ipv6Addr::new(0, 0, 0, 0, 0, 0xffff, 0xc00a, 0x2ff).is_unspecified(), false);
assert_eq!(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 0).is_unspecified(), true);
```

## Ipv6Addr::is_loopback

```rust
pub const fn is_loopback(&self) -> bool
```

Returns `true` if this is the [loopback address] (`::1`),
as defined in [IETF RFC 4291 section 2.5.3].

Contrary to IPv4, in IPv6 there is only one loopback address.

# Examples

```rust
use std::net::Ipv6Addr;

assert_eq!(Ipv6Addr::new(0, 0, 0, 0, 0, 0xffff, 0xc00a, 0x2ff).is_loopback(), false);
assert_eq!(Ipv6Addr::new(0, 0, 0, 0, 0, 0, 0, 0x1).is_loopback(), true);
```

## Ipv6Addr::is_unique_local

```rust
pub const fn is_unique_local(&self) -> bool
```

Returns `true` if this is a unique local address (`fc00::/7`).

This property is defined in [IETF RFC 4193].

# Examples

```rust
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

```
| 10 bits  |         54 bits         |          64 bits           |
+----------+-------------------------+----------------------------+
|1111111010|           0             |       interface ID         |
+----------+-------------------------+----------------------------+
```rust
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
```rust

## Ipv6Addr::is_multicast

```rust
pub const fn is_multicast(&self) -> bool
```

Returns `true` if this is a multicast address (`ff00::/8`).

This property is defined by [IETF RFC 4291].

# Examples

```rust
use std::net::Ipv6Addr;

assert_eq!(Ipv6Addr::new(0xff00, 0, 0, 0, 0, 0, 0, 0).is_multicast(), true);
assert_eq!(Ipv6Addr::new(0, 0, 0, 0, 0, 0xffff, 0xc00a, 0x2ff).is_multicast(), false);
```

## Ipv6Addr::to_ipv4_mapped

```rust
pub const fn to_ipv4_mapped(&self) -> Option<Ipv4Addr>
```

Converts this address to an [`IPv4` address] if it's an [IPv4-mapped] address,
as defined in [IETF RFC 4291 section 2.5.5.2], otherwise returns `None`.

`::ffff:a.b.c.d` becomes `a.b.c.d`.
All addresses *not* starting with `::ffff` will return `None`.

# Examples

```rust
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
otherwise returns `None`.

Note that this will return an [`IPv4` address] for the IPv6 loopback address `::1`. Use
`Ipv6Addr::to_ipv4_mapped` to avoid this.

`::a.b.c.d` and `::ffff:a.b.c.d` become `a.b.c.d`. `::1` becomes `0.0.0.1`.
All addresses *not* starting with either all zeroes or `::ffff` will return `None`.

# Examples

```rust
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

```rust
use std::net::Ipv6Addr;

assert_eq!(Ipv6Addr::new(0, 0, 0, 0, 0, 0xffff, 0x7f00, 0x1).is_loopback(), false);
assert_eq!(Ipv6Addr::new(0, 0, 0, 0, 0, 0xffff, 0x7f00, 0x1).to_canonical().is_loopback(), true);
```

## Ipv6Addr::octets

```rust
pub const fn octets(&self) -> [u8; 16]
```

Returns the sixteen eight-bit integers the IPv6 address consists of.

```rust
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

```rust
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
