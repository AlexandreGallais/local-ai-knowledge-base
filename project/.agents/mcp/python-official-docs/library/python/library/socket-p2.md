---
title: "socket --- Low-level networking interface (part 2 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/socket.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# socket --- Low-level networking interface (part 2 of 7)

## Module contents

The module `socket` exports the following elements.

### exception `error`

A deprecated alias of `OSError`.

> *Changed in version 3.3.*
> Following PEP 3151, this class was made an alias of `OSError`.

### exception `herror`

A subclass of `OSError`, this exception is raised for
address-related errors, i.e. for functions that use *h_errno* in the POSIX
C API, including `gethostbyname_ex()` and `gethostbyaddr()`.
The accompanying value is a pair `(h_errno, string)` representing an
error returned by a library call.  *h_errno* is a numeric value, while
*string* represents the description of *h_errno*, as returned by the
`hstrerror` C function.

> *Changed in version 3.3.*
> This class was made a subclass of `OSError`.

### exception `gaierror`

A subclass of `OSError`, this exception is raised for
address-related errors by `getaddrinfo()` and `getnameinfo()`.
The accompanying value is a pair `(error, string)` representing an error
returned by a library call.  *string* represents the description of
*error*, as returned by the `gai_strerror` C function.  The
numeric *error* value will match one of the `EAI_*` constants
defined in this module.

> *Changed in version 3.3.*
> This class was made a subclass of `OSError`.

### exception `timeout`

A deprecated alias of `TimeoutError`.

A subclass of `OSError`, this exception is raised when a timeout
occurs on a socket which has had timeouts enabled via a prior call to
`settimeout()` (or implicitly through
`setdefaulttimeout()`).  The accompanying value is a string
whose value is currently always "timed out".

> *Changed in version 3.3.*
> This class was made a subclass of `OSError`.

> *Changed in version 3.10.*
> This class was made an alias of `TimeoutError`.

### Constants

The AF_* and SOCK_* constants are now `AddressFamily` and
`SocketKind` `.IntEnum` collections.

> *Added in version 3.4.*

### `AF_UNIX`

```python
AF_INET
AF_INET6
```

These constants represent the address (and protocol) families, used for the
first argument to `socket()`.  If the `AF_UNIX` constant is not
defined then this protocol is unsupported.  More constants may be available
depending on the system.

### `AF_UNSPEC`

`AF_UNSPEC` means that
`getaddrinfo()` should return socket addresses for any
address family (either IPv4, IPv6, or any other) that can be used.

### `SOCK_STREAM`

```python
SOCK_DGRAM
SOCK_RAW
SOCK_RDM
SOCK_SEQPACKET
```

These constants represent the socket types, used for the second argument to
`socket()`.  More constants may be available depending on the system.
(Only `SOCK_STREAM` and `SOCK_DGRAM` appear to be generally
useful.)

### `SOCK_CLOEXEC`

```python
SOCK_NONBLOCK
```

These two constants, if defined, can be combined with the socket types and
allow you to set some flags atomically (thus avoiding possible race
conditions and the need for separate calls).

> **See also:** Secure File Descriptor Handling
> for a more thorough explanation.

> **Availability:** Linux >= 2.6.27.

> *Added in version 3.2.*

### `SO_*`

```python
SOMAXCONN
MSG_*
SOL_*
SCM_*
IPPROTO_*
IPPORT_*
INADDR_*
IP_*
IPV6_*
EAI_*
AI_*
NI_*
TCP_*
```

Many constants of these forms, documented in the Unix documentation on sockets
and/or the IP protocol, are also defined in the socket module. They are
generally used in arguments to the `setsockopt()` and `getsockopt()`
methods of socket objects.  In most cases, only those symbols that are defined
in the Unix header files are defined; for a few symbols, default values are
provided.

> *Changed in version 3.6.*
> `SO_DOMAIN`, `SO_PROTOCOL`, `SO_PEERSEC`, `SO_PASSSEC`,
> `TCP_USER_TIMEOUT`, `TCP_CONGESTION` were added.

> *Changed in version 3.6.5.*
> Added support for `TCP_FASTOPEN`, `TCP_KEEPCNT` on Windows platforms
> when available.

> *Changed in version 3.7.*
> `TCP_NOTSENT_LOWAT` was added.
> Added support for `TCP_KEEPIDLE`, `TCP_KEEPINTVL` on Windows platforms
> when available.

> *Changed in version 3.10.*
> `IP_RECVTOS` was added.
> Added `TCP_KEEPALIVE`. On MacOS this constant can be used in the same
> way that `TCP_KEEPIDLE` is used on Linux.

> *Changed in version 3.11.*
> Added `TCP_CONNECTION_INFO`. On MacOS this constant can be used in the
> same way that `TCP_INFO` is used on Linux and BSD.

> *Changed in version 3.12.*
> Added `SO_RTABLE` and `SO_USER_COOKIE`. On OpenBSD
> and FreeBSD respectively those constants can be used in the same way that
> `SO_MARK` is used on Linux. Also added missing TCP socket options from
> Linux: `TCP_MD5SIG`, `TCP_THIN_LINEAR_TIMEOUTS`, `TCP_THIN_DUPACK`,
> `TCP_REPAIR`, `TCP_REPAIR_QUEUE`, `TCP_QUEUE_SEQ`,
> `TCP_REPAIR_OPTIONS`, `TCP_TIMESTAMP`, `TCP_CC_INFO`,
> `TCP_SAVE_SYN`, `TCP_SAVED_SYN`, `TCP_REPAIR_WINDOW`,
> `TCP_FASTOPEN_CONNECT`, `TCP_ULP`, `TCP_MD5SIG_EXT`,
> `TCP_FASTOPEN_KEY`, `TCP_FASTOPEN_NO_COOKIE`,
> `TCP_ZEROCOPY_RECEIVE`, `TCP_INQ`, `TCP_TX_DELAY`.
> Added `IP_PKTINFO`, `IP_UNBLOCK_SOURCE`, `IP_BLOCK_SOURCE`,
> `IP_ADD_SOURCE_MEMBERSHIP`, `IP_DROP_SOURCE_MEMBERSHIP`.

> *Changed in version 3.13.*
> Added `SO_BINDTOIFINDEX`. On Linux this constant can be used in the
> same way that `SO_BINDTODEVICE` is used, but with the index of a
> network interface instead of its name.

> *Changed in version 3.14.*
> Added missing `IP_FREEBIND`, `IP_RECVERR`, `IPV6_RECVERR`,
> `IP_RECVTTL`, and `IP_RECVORIGDSTADDR` on Linux.

> *Changed in version 3.14.*
> Added support for `TCP_QUICKACK` on Windows platforms when available.

> *Changed in version 3.15.*
> `IPV6_HDRINCL` was added.
> Added support for `SO_PASSRIGHTS` on Linux platforms when available.

### `AF_CAN`

```python
PF_CAN
SOL_CAN_*
CAN_*
```

Many constants of these forms, documented in the Linux documentation, are
also defined in the socket module.

> **Availability:** Linux >= 2.6.25, NetBSD >= 8.

> *Added in version 3.3.*

> *Changed in version 3.11.*
> NetBSD support was added.

> *Changed in version 3.14.*
> Restored missing `CAN_RAW_ERR_FILTER` on Linux.

### `CAN_BCM`

```python
CAN_BCM_*
```

CAN_BCM, in the CAN protocol family, is the broadcast manager (BCM) protocol.
Broadcast manager constants, documented in the Linux documentation, are also
defined in the socket module.

> **Availability:** Linux >= 2.6.25.

> **Note:** The `CAN_BCM_CAN_FD_FRAME` flag is only available on Linux >= 4.8.

> *Added in version 3.4.*

### `CAN_RAW_FD_FRAMES`

Enables CAN FD support in a CAN_RAW socket. This is disabled by default.
This allows your application to send both CAN and CAN FD frames; however,
you must accept both CAN and CAN FD frames when reading from the socket.

This constant is documented in the Linux documentation.

> **Availability:** Linux >= 3.6.

> *Added in version 3.5.*

### `CAN_RAW_JOIN_FILTERS`

Joins the applied CAN filters such that only CAN frames that match all
given CAN filters are passed to user space.

This constant is documented in the Linux documentation.

> **Availability:** Linux >= 4.1.

> *Added in version 3.9.*

### `CAN_ISOTP`

CAN_ISOTP, in the CAN protocol family, is the ISO-TP (ISO 15765-2) protocol.
ISO-TP constants, documented in the Linux documentation.

> **Availability:** Linux >= 2.6.25.

> *Added in version 3.7.*

### `CAN_J1939`

CAN_J1939, in the CAN protocol family, is the SAE J1939 protocol.
J1939 constants, documented in the Linux documentation.

> **Availability:** Linux >= 5.4.

> *Added in version 3.9.*

### `AF_DIVERT`

```python
PF_DIVERT
```

These two constants, documented in the FreeBSD divert(4) manual page, are
also defined in the socket module.

> **Availability:** FreeBSD >= 14.0.

> *Added in version 3.12.*

### `AF_PACKET`

```python
PF_PACKET
PACKET_*
```

Many constants of these forms, documented in the Linux documentation, are
also defined in the socket module.

> **Availability:** Linux >= 2.2.

### `ETH_P_ALL`

`ETH_P_ALL` can be used in the `socket`
constructor as *proto* for the `AF_PACKET` family in order to
capture every packet, regardless of protocol.

For more information, see the packet(7) manpage.

> **Availability:** Linux.

> *Added in version 3.12.*

### `AF_RDS`

```python
PF_RDS
SOL_RDS
RDS_*
```

Many constants of these forms, documented in the Linux documentation, are
also defined in the socket module.

> **Availability:** Linux >= 2.6.30.

> *Added in version 3.3.*

### `SIO_RCVALL`

```python
SIO_KEEPALIVE_VALS
SIO_LOOPBACK_FAST_PATH
RCVALL_*
```

Constants for Windows' WSAIoctl(). The constants are used as arguments to the
`ioctl()` method of socket objects.

> *Changed in version 3.6.*
> `SIO_LOOPBACK_FAST_PATH` was added.

### `TIPC_*`

TIPC related constants, matching the ones exported by the C socket API. See
the TIPC documentation for more information.

### `AF_ALG`

```python
SOL_ALG
ALG_*
```

Constants for Linux Kernel cryptography.

> **Availability:** Linux >= 2.6.38.

> *Added in version 3.6.*

### `AF_VSOCK`

```python
IOCTL_VM_SOCKETS_GET_LOCAL_CID
VMADDR*
SO_VM*
```

Constants for Linux host/guest communication.

> **Availability:** Linux >= 4.8.

> *Added in version 3.7.*

### `AF_LINK`

> **Availability:** BSD, macOS.

> *Added in version 3.4.*

### `has_ipv6`

This constant contains a boolean value which indicates if IPv6 is supported on
this platform.

### `AF_BLUETOOTH`

```python
BTPROTO_L2CAP
BTPROTO_RFCOMM
BTPROTO_HCI
BTPROTO_SCO
```

Integer constants for use with Bluetooth addresses.

### `BDADDR_ANY`

```python
BDADDR_LOCAL
```

These are string constants containing Bluetooth addresses with special
meanings. For example, `BDADDR_ANY` can be used to indicate
any address when specifying the binding socket with
`BTPROTO_RFCOMM`.

### `BDADDR_BREDR`

```python
BDADDR_LE_PUBLIC
BDADDR_LE_RANDOM
```

These constants describe the Bluetooth address type when binding or
connecting a `BTPROTO_L2CAP` socket.

> **Availability:** Linux, FreeBSD

> *Added in version 3.14.*

### `SOL_RFCOMM`

```python
SOL_L2CAP
SOL_HCI
SOL_SCO
SOL_BLUETOOTH
```

Used in the level argument to the `setsockopt()` and
`getsockopt()` methods of Bluetooth socket objects.

`SOL_BLUETOOTH` is only available on Linux. Other constants
are available if the corresponding protocol is supported.

### `SO_L2CAP_*`

```python
L2CAP_LM
L2CAP_LM_*
SO_RFCOMM_*
RFCOMM_LM_*
SO_SCO_*
SO_BTH_*
BT_*
```

Used in the option name and value argument to the `setsockopt()`
and `getsockopt()` methods of Bluetooth socket objects.

`BT_*` and `L2CAP_LM` are only available on Linux.
`SO_BTH_*` are only available on Windows.
Other constants may be available on Linux and various BSD platforms.

> *Added in version 3.14.*

### `HCI_FILTER`

```python
HCI_TIME_STAMP
HCI_DATA_DIR
SO_HCI_EVT_FILTER
SO_HCI_PKT_FILTER
```

Option names for use with `BTPROTO_HCI`.
Availability and format of the option values depend on platform.

> *Changed in version 3.14.*
> Added `SO_HCI_EVT_FILTER` and `SO_HCI_PKT_FILTER`
> on NetBSD and DragonFly BSD.
> Added `HCI_DATA_DIR` on FreeBSD, NetBSD and DragonFly BSD.

### `HCI_DEV_NONE`

The `device_id` value used to create an HCI socket that isn't specific
to a single Bluetooth adapter.

> **Availability:** Linux

> *Added in version 3.14.*

### `HCI_CHANNEL_RAW`

```python
HCI_CHANNEL_USER
HCI_CHANNEL_MONITOR
HCI_CHANNEL_CONTROL
HCI_CHANNEL_LOGGING
```

Possible values for `channel` field in the `BTPROTO_HCI` address.

> **Availability:** Linux

> *Added in version 3.14.*

### `AF_QIPCRTR`

Constant for Qualcomm's IPC router protocol, used to communicate with
service providing remote processors.

> **Availability:** Linux >= 4.7.

### `SCM_CREDS2`

```python
LOCAL_CREDS
LOCAL_CREDS_PERSISTENT
```

LOCAL_CREDS and LOCAL_CREDS_PERSISTENT can be used
with SOCK_DGRAM, SOCK_STREAM sockets, equivalent to
Linux/DragonFlyBSD SO_PASSCRED, while LOCAL_CREDS
sends the credentials at first read, LOCAL_CREDS_PERSISTENT
sends for each read, SCM_CREDS2 must be then used for
the latter for the message type.

> *Added in version 3.11.*

> **Availability:** FreeBSD.

### `SO_INCOMING_CPU`

Constant to optimize CPU locality, to be used in conjunction with
`SO_REUSEPORT`.

> *Added in version 3.11.*

> **Availability:** Linux >= 3.9

### `SO_REUSEPORT_LB`

Constant to enable duplicate address and port bindings with load balancing.

> *Added in version 3.14.*

> **Availability:** FreeBSD >= 12.0

### `AF_HYPERV`

```python
HV_PROTOCOL_RAW
HVSOCKET_CONNECT_TIMEOUT
HVSOCKET_CONNECT_TIMEOUT_MAX
HVSOCKET_CONNECTED_SUSPEND
HVSOCKET_ADDRESS_FLAG_PASSTHRU
HV_GUID_ZERO
HV_GUID_WILDCARD
HV_GUID_BROADCAST
HV_GUID_CHILDREN
HV_GUID_LOOPBACK
HV_GUID_PARENT
```

Constants for Windows Hyper-V sockets for host/guest communications.

> **Availability:** Windows.

> *Added in version 3.12.*

### `ETHERTYPE_ARP`

```python
ETHERTYPE_IP
ETHERTYPE_IPV6
ETHERTYPE_VLAN
```

`IEEE 802.3 protocol number
<https://www.iana.org/assignments/ieee-802-numbers/ieee-802-numbers.txt>`_.
constants.

> **Availability:** Linux, FreeBSD, macOS.

> *Added in version 3.12.*

### `SHUT_RD`

```python
SHUT_WR
SHUT_RDWR
```

These constants are used by the `shutdown()` method of socket objects.

> **Availability:** not WASI.

### Functions

#### Creating sockets

The following functions all create socket objects.

The `socket` class constructor creates a new socket
directly; see socket-objects for its parameters and full description.

### `socketpair([family[, type[, proto]]])`

Build a pair of connected socket objects using the given address family, socket
type, and protocol number.  Address family, socket type, and protocol number are
as for the `socket()` function. The default family is `AF_UNIX`
if defined on the platform; otherwise, the default is `AF_INET`.

The newly created sockets are non-inheritable.

> *Changed in version 3.2.*
> The returned socket objects now support the whole socket API, rather
> than a subset.

> *Changed in version 3.4.*
> The returned sockets are now non-inheritable.

> *Changed in version 3.5.*
> Windows support added.
