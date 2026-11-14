---
title: "ipaddress --- IPv4/IPv6 manipulation library (part 1 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ipaddress.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `ipaddress` --- IPv4/IPv6 manipulation library

Module `ipaddress`.

**Source code:** Lib/ipaddress.py

`ipaddress` provides the capabilities to create, manipulate and
operate on IPv4 and IPv6 addresses and networks.

The functions and classes in this module make it straightforward to handle
various tasks related to IP addresses, including checking whether or not two
hosts are on the same subnet, iterating over all hosts in a particular
subnet, checking whether or not a string represents a valid IP address or
network definition, and so on.

This is the full module API reference—for an overview and introduction, see
ipaddress-howto.

> *Added in version 3.3.*

## Convenience factory functions

The `ipaddress` module provides factory functions to conveniently create
IP addresses, networks and interfaces:

### `ip_address(address)`

Return an `IPv4Address` or `IPv6Address` object depending on
the IP address passed as argument.  Either IPv4 or IPv6 addresses may be
supplied; integers less than `2**32` will be considered to be IPv4 by default.
A `ValueError` is raised if *address* does not represent a valid IPv4
or IPv6 address.

```python
>>> ipaddress.ip_address('192.168.0.1')
IPv4Address('192.168.0.1')
>>> ipaddress.ip_address('2001:db8::')
IPv6Address('2001:db8::')
```

### `ip_network(address, strict=True)`

Return an `IPv4Network` or `IPv6Network` object depending on
the IP address passed as argument.  *address* is a string or integer
representing the IP network.  Either IPv4 or IPv6 networks may be supplied;
integers less than `2**32` will be considered to be IPv4 by default.  *strict*
is passed to `IPv4Network` or `IPv6Network` constructor.  A
`ValueError` is raised if *address* does not represent a valid IPv4 or
IPv6 address, or if the network has host bits set.

```python
>>> ipaddress.ip_network('192.168.0.0/28')
IPv4Network('192.168.0.0/28')
```

### `ip_interface(address)`

Return an `IPv4Interface` or `IPv6Interface` object depending
on the IP address passed as argument.  *address* is a string or integer
representing the IP address.  Either IPv4 or IPv6 addresses may be supplied;
integers less than `2**32` will be considered to be IPv4 by default.  A
`ValueError` is raised if *address* does not represent a valid IPv4 or
IPv6 address.

One downside of these convenience functions is that the need to handle both
IPv4 and IPv6 formats means that error messages provide minimal
information on the precise error, as the functions don't know whether the
IPv4 or IPv6 format was intended. More detailed error reporting can be
obtained by calling the appropriate version specific class constructors
directly.

## IP Addresses

### Address objects

The `IPv4Address` and `IPv6Address` objects share a lot of common
attributes.  Some attributes that are only meaningful for IPv6 addresses are
also implemented by `IPv4Address` objects, in order to make it easier to
write code that handles both IP versions correctly.  Address objects are
hashable, so they can be used as keys in dictionaries.

### class `IPv4Address(address)`

Construct an IPv4 address.  An `AddressValueError` is raised if
*address* is not a valid IPv4 address.

The following constitutes a valid IPv4 address:

1. A string in decimal-dot notation, consisting of four decimal integers in
the inclusive range 0--255, separated by dots (e.g. `192.168.0.1`). Each
integer represents an octet (byte) in the address. Leading zeroes are
not tolerated to prevent confusion with octal notation.
1. An integer that fits into 32 bits.
1. An integer packed into a `bytes` object of length 4 (most
significant octet first).

```python
>>> ipaddress.IPv4Address('192.168.0.1')
IPv4Address('192.168.0.1')
>>> ipaddress.IPv4Address(3232235521)
IPv4Address('192.168.0.1')
>>> ipaddress.IPv4Address(b'\xC0\xA8\x00\x01')
IPv4Address('192.168.0.1')
```

> *Changed in version 3.8.*
> Leading zeros are tolerated, even in ambiguous cases that look like
> octal notation.

> *Changed in version 3.9.5.*
> Leading zeros are no longer tolerated and are treated as an error.
> IPv4 address strings are now parsed as strict as glibc
> `inet_pton()`.

### `version`

The appropriate version number: `4` for IPv4, `6` for IPv6.

> *Changed in version 3.14.*
> Made available on the class.

### `max_prefixlen`

The total number of bits in the address representation for this
version: `32` for IPv4, `128` for IPv6.

The prefix defines the number of leading bits in an  address that
are compared to determine whether or not an address is part of a
network.

> *Changed in version 3.14.*
> Made available on the class.

### `exploded`

The string representation in dotted decimal notation. Leading zeroes
are never included in the representation.

As IPv4 does not define a shorthand notation for addresses with octets
set to zero, these two attributes are always the same as `str(addr)`
for IPv4 addresses. Exposing these attributes makes it easier to
write display code that can handle both IPv4 and IPv6 addresses.

### `packed`

The binary representation of this address - a `bytes` object of
the appropriate length (most significant octet first). This is 4 bytes
for IPv4 and 16 bytes for IPv6.

### `reverse_pointer`

The name of the reverse DNS PTR record for the IP address, e.g.:

```
>>> ipaddress.ip_address("127.0.0.1").reverse_pointer
'1.0.0.127.in-addr.arpa'
>>> ipaddress.ip_address("2001:db8::1").reverse_pointer
'1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa'
```

This is the name that could be used for performing a PTR lookup, not the
resolved hostname itself.

> *Added in version 3.5.*

### `is_multicast`

`True` if the address is reserved for multicast use.  See
3171 (for IPv4) or 2373 (for IPv6).

### `is_private`

`True` if the address is defined as not globally reachable by
iana-ipv4-special-registry_ (for IPv4) or iana-ipv6-special-registry_
(for IPv6) with the following exceptions:

- `is_private` is `False` for the shared address space (`100.64.0.0/10`)
- For IPv4-mapped IPv6-addresses the `is_private` value is determined by the
semantics of the underlying IPv4 addresses and the following condition holds
(see `IPv6Address.ipv4_mapped`):

```
address.is_private == address.ipv4_mapped.is_private
```

`is_private` has value opposite to `is_global`, except for the shared address space
(`100.64.0.0/10` range) where they are both `False`.

> *Changed in version 3.13.*
> Fixed some false positives and false negatives.
>
> - `192.0.0.0/24` is considered private with the exception of `192.0.0.9/32` and
> `192.0.0.10/32` (previously: only the `192.0.0.0/29` sub-range was considered private).
> - `64:ff9b:1::/48` is considered private.
> - `2002::/16` is considered private.
> - There are exceptions within `2001::/23` (otherwise considered private): `2001:1::1/128`,
> `2001:1::2/128`, `2001:3::/32`, `2001:4:112::/48`, `2001:20::/28`, `2001:30::/28`.
> The exceptions are not considered private.

### `is_global`

`True` if the address is defined as globally reachable by
iana-ipv4-special-registry_ (for IPv4) or iana-ipv6-special-registry_
(for IPv6) with the following exception:

For IPv4-mapped IPv6-addresses the `is_private` value is determined by the
semantics of the underlying IPv4 addresses and the following condition holds
(see `IPv6Address.ipv4_mapped`):

```
address.is_global == address.ipv4_mapped.is_global
```

`is_global` has value opposite to `is_private`, except for the shared address space
(`100.64.0.0/10` range) where they are both `False`.

> *Added in version 3.4.*

> *Changed in version 3.13.*
> Fixed some false positives and false negatives, see `is_private` for details.

### `is_unspecified`

`True` if the address is unspecified.  See 5735 (for IPv4)
or 2373 (for IPv6).

### `is_reserved`

`True` if the address is noted as reserved by the IETF.
For IPv4, this is only `240.0.0.0/4`, the `Reserved` address block.
For IPv6, this is all addresses allocated as
`Reserved by IETF` for future use.

> **Note:** For IPv4, `is_reserved` is not related to the address block value of the
> `Reserved-by-Protocol` column in iana-ipv4-special-registry_.

> **Caution:** For IPv6, `fec0::/10` a former Site-Local scoped address prefix is
> currently excluded from that list (see `is_site_local` & RFC 3879).

### `is_loopback`

`True` if this is a loopback address.  See 3330 (for IPv4)
or 2373 (for IPv6).

### `is_link_local`

`True` if the address is reserved for link-local usage.  See
3927.

### `ipv6_mapped`

`IPv6Address` object representing the IPv4-mapped IPv6 address. See 4291.

> *Added in version 3.13.*

### `IPv4Address.__format__(fmt)`

Returns a string representation of the IP address, controlled by
an explicit format string.
*fmt* can be one of the following: `'s'`, the default option,
equivalent to `str()`, `'b'` for a zero-padded binary string,
`'X'` or `'x'` for an uppercase or lowercase hexadecimal
representation, or `'n'`, which is equivalent to `'b'` for IPv4
addresses and `'x'` for IPv6. For binary and hexadecimal
representations, the form specifier `'#'` and the grouping option
`'_'` are available. `__format__` is used by `format`, `str.format`
and f-strings.

```python
>>> format(ipaddress.IPv4Address('192.168.0.1'))
'192.168.0.1'
>>> '{:#b}'.format(ipaddress.IPv4Address('192.168.0.1'))
'0b11000000101010000000000000000001'
>>> f'{ipaddress.IPv6Address("2001:db8::1000"):s}'
'2001:db8::1000'
>>> format(ipaddress.IPv6Address('2001:db8::1000'), '_X')
'2001_0DB8_0000_0000_0000_0000_0000_1000'
>>> '{:#_n}'.format(ipaddress.IPv6Address('2001:db8::1000'))
'0x2001_0db8_0000_0000_0000_0000_0000_1000'
```

> *Added in version 3.9.*

### class `IPv6Address(address)`

Construct an IPv6 address.  An `AddressValueError` is raised if
*address* is not a valid IPv6 address.

The following constitutes a valid IPv6 address:

1. A string consisting of eight groups of four hexadecimal digits, each
group representing 16 bits.  The groups are separated by colons.
This describes an *exploded* (longhand) notation.  The string can
also be *compressed* (shorthand notation) by various means.  See
4291 for details.  For example,
`"0000:0000:0000:0000:0000:0abc:0007:0def"` can be compressed to
`"::abc:7:def"`.

Optionally, the string may also have a scope zone ID, expressed
with a suffix `%scope_id`. If present, the scope ID must be non-empty,
and may not contain `%`.
See 4007 for details.
For example, `fe80::1234%1` might identify address `fe80::1234` on the first link of the node.
1. An integer that fits into 128 bits.
1. An integer packed into a `bytes` object of length 16, big-endian.

```python
>>> ipaddress.IPv6Address('2001:db8::1000')
IPv6Address('2001:db8::1000')
>>> ipaddress.IPv6Address('ff02::5678%1')
IPv6Address('ff02::5678%1')
```

### `compressed`

The short form of the address representation, with leading zeroes in
groups omitted and the longest sequence of groups consisting entirely of
zeroes collapsed to a single empty group.

This is also the value returned by `str(addr)` for IPv6 addresses.

### `exploded`

The long form of the address representation, with all leading zeroes and
groups consisting entirely of zeroes included.

For the following attributes and methods, see the corresponding
documentation of the `IPv4Address` class:

### `is_global`

> *Added in version 3.4.*

### `is_site_local`

`True` if the address is reserved for site-local usage.  Note that
the site-local address space has been deprecated by 3879. Use
`is_private` to test if this address is in the
space of unique local addresses as defined by 4193.

### `ipv4_mapped`

For addresses that appear to be IPv4 mapped addresses in the range
`::FFFF:0:0/96` as defined by 4291, this property reports the
embedded IPv4 address. For any other address, this property will be `None`.

### `scope_id`

For scoped addresses as defined by 4007, this property identifies
the particular zone of the address's scope that the address belongs to,
as a string. When no scope zone is specified, this property will be `None`.

### `sixtofour`

For addresses that appear to be 6to4 addresses  (starting with
`2002::/16`) as defined by 3056, this property will report
the embedded IPv4 address.  For any other address, this property will
be `None`.

### `teredo`

For addresses that appear to be Teredo addresses (starting with
`2001::/32`) as defined by 4380, this property will report
the embedded `(server, client)` IP address pair.  For any other
address, this property will be `None`.

### `IPv6Address.__format__(fmt)`

Refer to the corresponding method documentation in
`IPv4Address`.

> *Added in version 3.9.*

### Conversion to Strings and Integers

To interoperate with networking interfaces such as the socket module,
addresses must be converted to strings or integers. This is handled using
the `str()` and `int()` builtin functions:

```
>>> str(ipaddress.IPv4Address('192.168.0.1'))
'192.168.0.1'
>>> int(ipaddress.IPv4Address('192.168.0.1'))
3232235521
>>> str(ipaddress.IPv6Address('::1'))
'::1'
>>> int(ipaddress.IPv6Address('::1'))
1
```

Note that IPv6 scoped addresses are converted to integers without scope zone ID.

### Operators

Address objects support some operators.  Unless stated otherwise, operators can
only be applied between compatible objects (i.e. IPv4 with IPv4, IPv6 with
IPv6).

#### Comparison operators

Address objects can be compared with the usual set of comparison operators.
Same IPv6 addresses with different scope zone IDs are not equal.
Some examples:

```
>>> IPv4Address('127.0.0.2') > IPv4Address('127.0.0.1')
True
>>> IPv4Address('127.0.0.2') == IPv4Address('127.0.0.1')
False
>>> IPv4Address('127.0.0.2') != IPv4Address('127.0.0.1')
True
>>> IPv6Address('fe80::1234') == IPv6Address('fe80::1234%1')
False
>>> IPv6Address('fe80::1234%1') != IPv6Address('fe80::1234%2')
True
```

#### Arithmetic operators

Integers can be added to or subtracted from address objects.  Some examples:

```
>>> IPv4Address('127.0.0.2') + 3
IPv4Address('127.0.0.5')
>>> IPv4Address('127.0.0.2') - 3
IPv4Address('126.255.255.255')
>>> IPv4Address('255.255.255.255') + 1
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ipaddress.AddressValueError: 4294967296 (>= 2**32) is not permitted as an IPv4 address
```
