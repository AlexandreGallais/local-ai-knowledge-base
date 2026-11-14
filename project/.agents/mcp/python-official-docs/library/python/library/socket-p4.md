---
title: "socket --- Low-level networking interface (part 4 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/socket.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# socket --- Low-level networking interface (part 4 of 7)

### `inet_pton(address_family, ip_string)`

Convert an IP address from its family-specific string format to a packed,
binary format. `inet_pton()` is useful when a library or network protocol
calls for an object of type `in_addr` (similar to
`inet_aton()`) or `in6_addr`.

Supported values for *address_family* are currently `AF_INET` and
`AF_INET6`. If the IP address string *ip_string* is invalid,
`OSError` will be raised. Note that exactly what is valid depends on
both the value of *address_family* and the underlying implementation of
`inet_pton`.

> **Availability:** Unix, Windows.

> *Changed in version 3.4.*
> Windows support added

### `inet_ntop(address_family, packed_ip)`

Convert a packed IP address (a bytes-like object of some number of
bytes) to its standard, family-specific string representation (for
example, `'7.10.0.5'` or `'5aef:2b::8'`).
`inet_ntop()` is useful when a library or network protocol returns an
object of type `in_addr` (similar to `inet_ntoa()`) or
`in6_addr`.

Supported values for *address_family* are currently `AF_INET` and
`AF_INET6`. If the bytes object *packed_ip* is not the correct
length for the specified address family, `ValueError` will be raised.
`OSError` is raised for errors from the call to `inet_ntop()`.

> **Availability:** Unix, Windows.

> *Changed in version 3.4.*
> Windows support added

> *Changed in version 3.5.*
> Writable bytes-like object is now accepted.

### `CMSG_LEN(length)`

Return the total length, without trailing padding, of an ancillary
data item with associated data of the given *length*.  This value
can often be used as the buffer size for `recvmsg()` to
receive a single item of ancillary data, but RFC 3542 requires
portable applications to use `CMSG_SPACE()` and thus include
space for padding, even when the item will be the last in the
buffer.  Raises `OverflowError` if *length* is outside the
permissible range of values.

> **Availability:** Unix, not WASI.
>
> Most Unix platforms.

> *Added in version 3.3.*

### `CMSG_SPACE(length)`

Return the buffer size needed for `recvmsg()` to
receive an ancillary data item with associated data of the given
*length*, along with any trailing padding.  The buffer space needed
to receive multiple items is the sum of the `CMSG_SPACE()`
values for their associated data lengths.  Raises
`OverflowError` if *length* is outside the permissible range
of values.

Note that some systems might support ancillary data without
providing this function.  Also note that setting the buffer size
using the results of this function may not precisely limit the
amount of ancillary data that can be received, since additional
data may be able to fit into the padding area.

> **Availability:** Unix, not WASI.
>
> most Unix platforms.

> *Added in version 3.3.*

### `getdefaulttimeout()`

Return the default timeout in seconds (float) for new socket objects. A value
of `None` indicates that new socket objects have no timeout. When the socket
module is first imported, the default is `None`.

### `setdefaulttimeout(timeout)`

Set the default timeout in seconds (real number) for new socket objects.  When
the socket module is first imported, the default is `None`.  See
`settimeout()` for possible values and their respective
meanings.

> *Changed in version 3.15.*
> Accepts any real number, not only integer or float.

### `sethostname(name)`

Set the machine's hostname to *name*.  This will raise an
`OSError` if you don't have enough rights.

> **Availability:** Unix, not Android.

> *Added in version 3.3.*

### `if_nameindex()`

Return a list of network interface information
(index int, name string) tuples.
`OSError` if the system call fails.

> **Availability:** Unix, Windows, not WASI.

> *Added in version 3.3.*

> *Changed in version 3.8.*
> Windows support was added.

> **Note:** On Windows network interfaces have different names in different contexts
> (all names are examples):
>
> - UUID: `{FB605B73-AAC2-49A6-9A2F-25416AEA0573}`
> - name: `ethernet_32770`
> - friendly name: `vEthernet (nat)`
> - description: `Hyper-V Virtual Ethernet Adapter`
>
> This function returns names of the second form from the list, `ethernet_32770`
> in this example case.

### `if_nametoindex(if_name)`

Return a network interface index number corresponding to an
interface name.
`OSError` if no interface with the given name exists.

> **Availability:** Unix, Windows, not WASI.

> *Added in version 3.3.*

> *Changed in version 3.8.*
> Windows support was added.

> **See also:** "Interface name" is a name as documented in `if_nameindex()`.

### `if_indextoname(if_index)`

Return a network interface name corresponding to an
interface index number.
`OSError` if no interface with the given index exists.

> **Availability:** Unix, Windows, not WASI.

> *Added in version 3.3.*

> *Changed in version 3.8.*
> Windows support was added.

> **See also:** "Interface name" is a name as documented in `if_nameindex()`.

### `send_fds(sock, buffers, fds[, flags[, address]])`

Send the list of file descriptors *fds* over an `AF_UNIX` socket *sock*.
The *fds* parameter is a sequence of file descriptors.
Consult `sendmsg()` for the documentation of these parameters.

> **Availability:** Unix, not WASI.
>
> Unix platforms supporting `sendmsg()`
> and `SCM_RIGHTS` mechanism.

> *Added in version 3.9.*

### `recv_fds(sock, bufsize, maxfds[, flags])`

Receive up to *maxfds* file descriptors from an `AF_UNIX` socket *sock*.
Return `(msg, list(fds), flags, addr)`.
Consult `recvmsg()` for the documentation of these parameters.

> **Availability:** Unix, not WASI.
>
> Unix platforms supporting `recvmsg()`
> and `SCM_RIGHTS` mechanism.

> *Added in version 3.9.*

> **Note:** Any truncated integers at the end of the list of file descriptors.
