---
title: "ipaddress --- IPv4/IPv6 manipulation library (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ipaddress.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ipaddress --- IPv4/IPv6 manipulation library (part 3 of 3)

## Interface objects

Interface objects are hashable, so they can be used as keys in
dictionaries.

### class `IPv4Interface(address)`

Construct an IPv4 interface.  The meaning of *address* is as in the
constructor of `IPv4Network`, except that arbitrary host addresses
are always accepted.

`IPv4Interface` is a subclass of `IPv4Address`, so it inherits
all the attributes from that class.  In addition, the following attributes
are available:

### `ip`

The address (`IPv4Address`) without network information.

```python
>>> interface = IPv4Interface('192.0.2.5/24')
>>> interface.ip
IPv4Address('192.0.2.5')
```

### `network`

The network (`IPv4Network`) this interface belongs to.

```python
>>> interface = IPv4Interface('192.0.2.5/24')
>>> interface.network
IPv4Network('192.0.2.0/24')
```

### `with_prefixlen`

A string representation of the interface with the mask in prefix notation.

```python
>>> interface = IPv4Interface('192.0.2.5/24')
>>> interface.with_prefixlen
'192.0.2.5/24'
```

### `with_netmask`

A string representation of the interface with the network as a net mask.

```python
>>> interface = IPv4Interface('192.0.2.5/24')
>>> interface.with_netmask
'192.0.2.5/255.255.255.0'
```

### `with_hostmask`

A string representation of the interface with the network as a host mask.

```python
>>> interface = IPv4Interface('192.0.2.5/24')
>>> interface.with_hostmask
'192.0.2.5/0.0.0.255'
```

### class `IPv6Interface(address)`

Construct an IPv6 interface.  The meaning of *address* is as in the
constructor of `IPv6Network`, except that arbitrary host addresses
are always accepted.

`IPv6Interface` is a subclass of `IPv6Address`, so it inherits
all the attributes from that class.  In addition, the following attributes
are available:

### `with_hostmask`

Refer to the corresponding attribute documentation in
`IPv4Interface`.

### Operators

Interface objects support some operators.  Unless stated otherwise, operators
can only be applied between compatible objects (i.e. IPv4 with IPv4, IPv6 with
IPv6).

#### Logical operators

Interface objects can be compared with the usual set of logical operators.

For equality comparison (`==` and `!=`), both the IP address and network
must be the same for the objects to be equal.  An interface will not compare
equal to any address or network object.

For ordering (`<`, `>`, etc) the rules are different.  Interface and
address objects with the same IP version can be compared, and the address
objects will always sort before the interface objects.  Two interface objects
are first compared by their networks and, if those are the same, then by their
IP addresses.

## Other Module Level Functions

The module also provides the following module level functions:

### `v4_int_to_packed(address)`

Represent an address as 4 packed bytes in network (big-endian) order.
*address* is an integer representation of an IPv4 IP address.  A
`ValueError` is raised if the integer is negative or too large to be an
IPv4 IP address.

```python
>>> ipaddress.ip_address(3221225985)
IPv4Address('192.0.2.1')
>>> ipaddress.v4_int_to_packed(3221225985)
b'\xc0\x00\x02\x01'
```

### `v6_int_to_packed(address)`

Represent an address as 16 packed bytes in network (big-endian) order.
*address* is an integer representation of an IPv6 IP address.  A
`ValueError` is raised if the integer is negative or too large to be an
IPv6 IP address.

### `summarize_address_range(first, last)`

Return an iterator of the summarized network range given the first and last
IP addresses.  *first* is the first `IPv4Address` or
`IPv6Address` in the range and *last* is the last `IPv4Address`
or `IPv6Address` in the range.  A `TypeError` is raised if
*first* or *last* are not IP addresses or are not of the same version.  A
`ValueError` is raised if *last* is not greater than *first* or if
*first* address version is not 4 or 6.

```python
>>> [ipaddr for ipaddr in ipaddress.summarize_address_range(
...    ipaddress.IPv4Address('192.0.2.0'),
...    ipaddress.IPv4Address('192.0.2.130'))]
[IPv4Network('192.0.2.0/25'), IPv4Network('192.0.2.128/31'), IPv4Network('192.0.2.130/32')]
```

### `collapse_addresses(addresses)`

Return an iterator of the collapsed `IPv4Network` or
`IPv6Network` objects.  *addresses* is an iterable of
`IPv4Network` or `IPv6Network` objects.  A `TypeError` is
raised if *addresses* contains mixed version objects.

```python
>>> [ipaddr for ipaddr in
... ipaddress.collapse_addresses([ipaddress.IPv4Network('192.0.2.0/25'),
... ipaddress.IPv4Network('192.0.2.128/25')])]
[IPv4Network('192.0.2.0/24')]
```

### `get_mixed_type_key(obj)`

Return a key <example-value> for sorting between networks and addresses.  Address
and Network objects are not sortable by default; they're fundamentally
different, so the expression:

```
IPv4Address('192.0.2.0') <= IPv4Network('192.0.2.0/24')
```

doesn't make sense.  There are some times however, where you may wish to
have `ipaddress` sort these anyway.  If you need to do this, you can use
this function as the *key* argument to `sorted()`.

*obj* is either a network or address object.

## Custom Exceptions

To support more specific error reporting from class constructors, the
module defines the following exceptions:

### exception `AddressValueError(ValueError)`

Any value error related to the address.

### exception `NetmaskValueError(ValueError)`

Any value error related to the net mask.
