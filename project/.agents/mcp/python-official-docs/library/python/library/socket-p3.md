---
title: "socket --- Low-level networking interface (part 3 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/socket.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# socket --- Low-level networking interface (part 3 of 7)

### `create_connection(address, timeout=GLOBAL_DEFAULT, source_address=None, *, all_errors=False)`

Connect to a TCP service listening on the internet *address* (a 2-tuple
`(host, port)`), and return the socket object.  This is a higher-level
function than `socket.connect()`: if *host* is a non-numeric hostname,
it will try to resolve it for both `AF_INET` and `AF_INET6`,
and then try to connect to all possible addresses in turn until a
connection succeeds.  This makes it easy to write clients that are
compatible to both IPv4 and IPv6.

Passing the optional *timeout* parameter will set the timeout on the
socket instance before attempting to connect.  If no *timeout* is
supplied, the global default timeout setting returned by
`getdefaulttimeout()` is used.

If supplied, *source_address* must be a 2-tuple `(host, port)` for the
socket to bind to as its source address before connecting.  If host or port
are '' or 0 respectively the OS default behavior will be used.

When a connection cannot be created, an exception is raised. By default,
it is the exception from the last address in the list. If *all_errors*
is `True`, it is an `ExceptionGroup` containing the errors of all
attempts.

> *Changed in version 3.2.*
> *source_address* was added.

> *Changed in version 3.11.*
> *all_errors* was added.

### `create_server(address, *, family=AF_INET, backlog=None, reuse_port=False, dualstack_ipv6=False)`

Convenience function which creates a TCP socket bound to *address* (a 2-tuple
`(host, port)`) and returns the socket object.

*family* should be either `AF_INET` or `AF_INET6`.
*backlog* is the queue size passed to `socket.listen()`; if not specified
, a default reasonable value is chosen.
*reuse_port* dictates whether to set the `SO_REUSEPORT` socket option.

If *dualstack_ipv6* is true, *family* is `AF_INET6` and the platform
supports it the socket will be able to accept both IPv4 and IPv6 connections,
else it will raise `ValueError`. Most POSIX platforms and Windows are
supposed to support this functionality.
When this functionality is enabled the address returned by
`socket.getpeername()` when an IPv4 connection occurs will be an IPv6
address represented as an IPv4-mapped IPv6 address.
If *dualstack_ipv6* is false it will explicitly disable this functionality
on platforms that enable it by default (e.g. Linux).
This parameter can be used in conjunction with `has_dualstack_ipv6()`:

```
import socket

addr = ("", 8080)  # all interfaces, port 8080
if socket.has_dualstack_ipv6():
    s = socket.create_server(addr, family=socket.AF_INET6, dualstack_ipv6=True)
else:
    s = socket.create_server(addr)
```

> **Note:** On POSIX platforms the `SO_REUSEADDR` socket option is set in order to
> immediately reuse previous sockets which were bound on the same *address*
> and remained in TIME_WAIT state.

> *Added in version 3.8.*

### `has_dualstack_ipv6()`

Return `True` if the platform supports creating a TCP socket which can
handle both IPv4 and IPv6 connections.

> *Added in version 3.8.*

### `fromfd(fd, family, type, proto=0)`

Duplicate the file descriptor *fd* (an integer as returned by a file object's
`fileno()` method) and build a socket object from the result.  Address
family, socket type and protocol number are as for the `socket()` function.
The file descriptor should refer to a socket, but this is not checked ---
subsequent operations on the object may fail if the file descriptor is invalid.
This function is rarely needed, but can be used to get or set socket options on
a socket passed to a program as standard input or output (such as a server
started by the Unix inet daemon).  The socket is assumed to be in blocking mode.

The newly created socket is non-inheritable.

> *Changed in version 3.4.*
> The returned socket is now non-inheritable.

### `fromshare(data)`

Instantiate a socket from data obtained from the `socket.share()`
method.  The socket is assumed to be in blocking mode.

> **Availability:** Windows.

> *Added in version 3.3.*

#### Other functions

The `socket` module also offers various network-related services:

### `close(fd)`

Close a socket file descriptor. This is like `os.close()`, but for
sockets. On some platforms (most notably Windows) `os.close()`
does not work for socket file descriptors.

> *Added in version 3.7.*

### `getaddrinfo(host, port, family=AF_UNSPEC, type=0, proto=0, flags=0)`

This function wraps the C function `getaddrinfo` of the underlying system.

Translate the *host*/*port* argument into a sequence of 5-tuples that contain
all the necessary arguments for creating a socket connected to that service.
*host* is a domain name, a string representation of an IPv4/v6 address
or `None`. *port* is a string service name such as `'http'`, a numeric
port number or `None`.  By passing `None` as the value of *host*
and *port*, you can pass `NULL` to the underlying C API.

The *family*, *type* and *proto* arguments can be optionally specified
in order to provide options and limit the list of addresses returned.
Pass their default values (`AF_UNSPEC`, 0, and 0, respectively)
to not limit the results. See the note below for details.

The *flags* argument can be one or several of the `AI_*` constants,
and will influence how results are computed and returned.
For example, `AI_NUMERICHOST` will disable domain name resolution
and will raise an error if *host* is a domain name.

The function returns a list of 5-tuples with the following structure:

`(family, type, proto, canonname, sockaddr)`

In these tuples, *family*, *type*, *proto* are all integers and are
meant to be passed to the `socket()` function.  *canonname* will be
a string representing the canonical name of the *host* if
`AI_CANONNAME` is part of the *flags* argument; else *canonname*
will be empty.  *sockaddr* is a tuple describing a socket address, whose
format depends on the returned *family* and flags Python was compiled with,
and is meant to be passed to the `socket.connect()` method.

*sockaddr* can be one of the following:

- a `(address, port)` 2-tuple for `AF_INET`
- a `(address, port, flowinfo, scope_id)` 4-tuple for `AF_INET6` if
Python was compiled with `--enable-ipv6` (the default)
- a 2-tuple containing raw data for `AF_INET6` if Python was
compiled with `--disable-ipv6`

> **Note:** If you intend to use results from `getaddrinfo()` to create a socket
> (rather than, for example, retrieve *canonname*),
> consider limiting the results by *type* (e.g. `SOCK_STREAM` or
> `SOCK_DGRAM`) and/or *proto* (e.g. `IPPROTO_TCP` or
> `IPPROTO_UDP`) that your application can handle.
>
> The behavior with default values of *family*, *type*, *proto*
> and *flags* is system-specific.
>
> Many systems (for example, most Linux configurations) will return a sorted
> list of all matching addresses.
> These addresses should generally be tried in order until a connection succeeds
> (possibly tried in parallel, for example, using a Happy Eyeballs algorithm).
> In these cases, limiting the *type* and/or *proto* can help eliminate
> unsuccessful or unusable connection attempts.
>
> Some systems will, however, only return a single address.
> (For example, this was reported on Solaris and AIX configurations.)
> On these systems, limiting the *type* and/or *proto* helps ensure that
> this address is usable.

The following example fetches address information for a hypothetical TCP
connection to `example.org` on port 80 (results may differ on your
system if IPv6 isn't enabled):

```
>>> socket.getaddrinfo("example.org", 80, proto=socket.IPPROTO_TCP)
[(socket.AF_INET6, socket.SOCK_STREAM,
 6, '', ('2606:2800:220:1:248:1893:25c8:1946', 80, 0, 0)),
 (socket.AF_INET, socket.SOCK_STREAM,
 6, '', ('93.184.216.34', 80))]
```

> *Changed in version 3.2.*
> parameters can now be passed using keyword arguments.

> *Changed in version 3.7.*
> for IPv6 multicast addresses, string representing an address will not
> contain `%scope_id` part.

### `getfqdn([name])`

Return a fully qualified domain name for *name*. If *name* is omitted or empty,
it is interpreted as the local host.  To find the fully qualified name, the
hostname returned by `gethostbyaddr()` is checked, followed by aliases for the
host, if available.  The first name which includes a period is selected.  In
case no fully qualified domain name is available and *name* was provided,
it is returned unchanged.  If *name* was empty or equal to `'0.0.0.0'`,
the hostname from `gethostname()` is returned.

### `gethostbyname(hostname)`

Translate a host name to IPv4 address format.  The IPv4 address is returned as a
string, such as  `'100.50.200.5'`.  If the host name is an IPv4 address itself
it is returned unchanged.  See `gethostbyname_ex()` for a more complete
interface. `gethostbyname()` does not support IPv6 name resolution, and
`getaddrinfo()` should be used instead for IPv4/v6 dual stack support.

> **Availability:** not WASI.

### `gethostbyname_ex(hostname)`

Translate a host name to IPv4 address format, extended interface. Return a
3-tuple `(hostname, aliaslist, ipaddrlist)` where *hostname* is the host's
primary host name, *aliaslist* is a (possibly
empty) list of alternative host names for the same address, and *ipaddrlist* is
a list of IPv4 addresses for the same interface on the same host (often but not
always a single address). `gethostbyname_ex()` does not support IPv6 name
resolution, and `getaddrinfo()` should be used instead for IPv4/v6 dual
stack support.

> **Availability:** not WASI.

### `gethostname()`

Return a string containing the hostname of the machine where  the Python
interpreter is currently executing.

Note: `gethostname()` doesn't always return the fully qualified domain
name; use `getfqdn()` for that.

> **Availability:** not WASI.

### `gethostbyaddr(ip_address)`

Return a 3-tuple `(hostname, aliaslist, ipaddrlist)` where *hostname* is the
primary host name responding to the given *ip_address*, *aliaslist* is a
(possibly empty) list of alternative host names for the same address, and
*ipaddrlist* is a list of IPv4/v6 addresses for the same interface on the same
host (most likely containing only a single address). To find the fully qualified
domain name, use the function `getfqdn()`. `gethostbyaddr()` supports
both IPv4 and IPv6.

> **Availability:** not WASI.

### `getnameinfo(sockaddr, flags)`

Translate a socket address *sockaddr* into a 2-tuple `(host, port)`. Depending
on the settings of *flags*, the result can contain a fully qualified domain name
or numeric address representation in *host*.  Similarly, *port* can contain a
string port name or a numeric port number.

For IPv6 addresses, `%scope_id` is appended to the host part if *sockaddr*
contains meaningful *scope_id*. Usually this happens for multicast addresses.

For more information about *flags* you can consult getnameinfo(3).

> **Availability:** not WASI.

### `getprotobyname(protocolname)`

Translate an internet protocol name (for example, `'icmp'`) to a constant
suitable for passing as the (optional) third argument to the `socket()`
function.  This is usually only needed for sockets opened in "raw" mode
(`SOCK_RAW`); for the normal socket modes, the correct protocol is chosen
automatically if the protocol is omitted or zero.

> **Availability:** not WASI.

### `getservbyname(servicename[, protocolname])`

Translate an internet service name and protocol name to a port number for that
service.  The optional protocol name, if given, should be `'tcp'` or
`'udp'`, otherwise any protocol will match.

> **Availability:** not WASI.

### `getservbyport(port[, protocolname])`

Translate an internet port number and protocol name to a service name for that
service.  The optional protocol name, if given, should be `'tcp'` or
`'udp'`, otherwise any protocol will match.

> **Availability:** not WASI.

### `ntohl(x)`

Convert 32-bit positive integers from network to host byte order.  On machines
where the host byte order is the same as network byte order, this is a no-op;
otherwise, it performs a 4-byte swap operation.

### `ntohs(x)`

Convert 16-bit positive integers from network to host byte order.  On machines
where the host byte order is the same as network byte order, this is a no-op;
otherwise, it performs a 2-byte swap operation.

> *Changed in version 3.10.*
> Raises `OverflowError` if *x* does not fit in a 16-bit unsigned
> integer.

### `htonl(x)`

Convert 32-bit positive integers from host to network byte order.  On machines
where the host byte order is the same as network byte order, this is a no-op;
otherwise, it performs a 4-byte swap operation.

### `htons(x)`

Convert 16-bit positive integers from host to network byte order.  On machines
where the host byte order is the same as network byte order, this is a no-op;
otherwise, it performs a 2-byte swap operation.

> *Changed in version 3.10.*
> Raises `OverflowError` if *x* does not fit in a 16-bit unsigned
> integer.

### `inet_aton(ip_string)`

Convert an IPv4 address from dotted-quad string format (for example,
'123.45.67.89') to 32-bit packed binary format, as a bytes object four characters in
length.  This is useful when conversing with a program that uses the standard C
library and needs objects of type `in_addr`, which is the C type
for the 32-bit packed binary this function returns.

`inet_aton()` also accepts strings with less than three dots; see the
Unix manual page inet(3) for details.

If the IPv4 address string passed to this function is invalid,
`OSError` will be raised. Note that exactly what is valid depends on
the underlying C implementation of `inet_aton`.

`inet_aton()` does not support IPv6, and `inet_pton()` should be used
instead for IPv4/v6 dual stack support.

### `inet_ntoa(packed_ip)`

Convert a 32-bit packed IPv4 address (a bytes-like object four
bytes in length) to its standard dotted-quad string representation (for example,
'123.45.67.89').  This is useful when conversing with a program that uses the
standard C library and needs objects of type `in_addr`, which
is the C type for the 32-bit packed binary data this function takes as an
argument.

If the byte sequence passed to this function is not exactly 4 bytes in
length, `OSError` will be raised. `inet_ntoa()` does not
support IPv6, and `inet_ntop()` should be used instead for IPv4/v6 dual
stack support.

> *Changed in version 3.5.*
> Writable bytes-like object is now accepted.
