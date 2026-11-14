---
title: "SocketOptions interface (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/SocketOptions.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SocketOptions interface (java.net)

```java
public interface SocketOptions
```

Interface of methods to get/set socket options.  This interface is
implemented by `SocketImpl` and `DatagramSocketImpl`.
Subclasses of these two classes should override the `getOption(int)` and
Object) methods of this interface in order to support their own options.

The methods and constants defined in this interface are
for implementation only. If you're not subclassing `SocketImpl` or
`DatagramSocketImpl`, then you won't use these directly. There are
type-safe methods to get/set each of these options in `Socket`, `ServerSocket`,
 `DatagramSocket` and `MulticastSocket`.

**Since:** 1.1

## SocketOptions.setOption(int, Object)

```java
public void setOption(int optID, Object value) throws SocketException
```

Enable/disable the option specified by `optID`. If the option
is to be enabled, and it takes an option-specific "value", this is passed in `value`.
The actual type of `value` is option-specific, and it is an error to pass <example-value>
that isn't of the expected type:

If the requested option is binary, it can be set using this method by a `Boolean`:

Any option can be disabled using this method with a `Boolean.FALSE`:

For an option that has a notion of on and off, and requires a non-boolean parameter, setting
its value to anything other than `Boolean.FALSE` implicitly enables it.

Parameters:

- `optID`: identifies the option
- `value`: the parameter of the socket option

**See also:** #getOption(int)

Throws:

- `SocketException`: if the option is unrecognized, the socket is closed, or some low-level error occurred

## SocketOptions.getOption(int)

```java
public Object getOption(int optID) throws SocketException
```

Fetch the value of an option. Binary options will return `Boolean.TRUE` if enabled,
`Boolean.FALSE` if disabled, e.g.:

For options that take a particular type as a parameter, this method will return the
parameter's value, else it will return `Boolean.FALSE`:

Parameters:

- `optID`: an `int` identifying the option to fetch

**Returns:** the value of the option

**See also:** #setOption(int, java.lang.Object)

Throws:

- `SocketException`: if the socket is closed or if `optID` is unknown along the protocol stack

## SocketOptions.TCP_NODELAY

```java
public static final int TCP_NODELAY
```

See `StandardSocketOptions.TCP_NODELAY` for description of this socket option.

**See also:** Socket#setTcpNoDelay

**See also:** Socket#getTcpNoDelay

## SocketOptions.SO_BINDADDR

```java
public static final int SO_BINDADDR
```

Fetch the local address binding of a socket. This option cannot be set and can only be
fetched. The default local address of a socket is
INADDR_ANY, meaning any local
address on a multi-homed host. A multi-homed host can use this option to accept
connections to only one of its addresses (in the case of a
`ServerSocket` or `DatagramSocket`), or to specify its return address
to the peer (for a `Socket` or `DatagramSocket`). The type of this option's
value is an `InetAddress`.

**See also:** Socket#getLocalAddress

**See also:** DatagramSocket#getLocalAddress

## SocketOptions.SO_REUSEADDR

```java
public static final int SO_REUSEADDR
```

See `StandardSocketOptions.SO_REUSEADDR` for description of this socket option.

## SocketOptions.SO_REUSEPORT

```java
public static final int SO_REUSEPORT
```

See `StandardSocketOptions.SO_REUSEPORT` for description of this socket option.

**Since:** 9

## SocketOptions.SO_BROADCAST

```java
public static final int SO_BROADCAST
```

See `StandardSocketOptions.SO_BROADCAST` for description of this socket option.

**Since:** 1.4

## SocketOptions.IP_MULTICAST_IF

```java
public static final int IP_MULTICAST_IF
```

See `StandardSocketOptions.IP_MULTICAST_IF` for description of this socket option.

**See also:** MulticastSocket#setInterface(InetAddress)

**See also:** MulticastSocket#getInterface()

## SocketOptions.IP_MULTICAST_IF2

```java
public static final int IP_MULTICAST_IF2
```

This option is used to both set and fetch the outgoing interface on which the multicast
packets are sent. Useful on hosts with multiple network interfaces, where applications
want to use other than the system default. This option supports setting outgoing interfaces
with either IPv4 and IPv6 addresses.

**See also:** MulticastSocket#setNetworkInterface(NetworkInterface)

**See also:** MulticastSocket#getNetworkInterface()

**Since:** 1.4

## SocketOptions.IP_MULTICAST_LOOP

```java
public static final int IP_MULTICAST_LOOP
```

See `StandardSocketOptions.IP_MULTICAST_LOOP` for description of this socket option.

**Since:** 1.4

## SocketOptions.IP_TOS

```java
public static final int IP_TOS
```

See `StandardSocketOptions.IP_TOS` for description of this socket option.

**Since:** 1.4

## SocketOptions.SO_LINGER

```java
public static final int SO_LINGER
```

See `StandardSocketOptions.SO_LINGER` for description of this socket option.

Set the value to `Boolean.FALSE` or an integer less than `0` with
Object) to disable this option. An integer greater than or equal to
`0` will enable the option and will represent the linger interval.

If this option is enabled then `getOption(int)` will return an integer value
representing the linger interval, else the return value will be `Boolean.FALSE`.

**See also:** Socket#setSoLinger

**See also:** Socket#getSoLinger

## SocketOptions.SO_TIMEOUT

```java
public static final int SO_TIMEOUT
```

This option is used to both set and fetch a timeout value on blocking
`Socket` operations:

- ServerSocket.accept()

- Socket InputStream.read()

- DatagramSocket.receive()

This option must be set prior to entering a blocking operation to take effect. If the
timeout expires and the operation would continue to block, then
`java.io.InterruptedIOException` is raised. The `Socket` is not closed
in such cases.

**See also:** Socket#setSoTimeout

**See also:** ServerSocket#setSoTimeout

**See also:** DatagramSocket#setSoTimeout

## SocketOptions.SO_SNDBUF

```java
public static final int SO_SNDBUF
```

See `StandardSocketOptions.SO_SNDBUF` for description of this socket option.

**See also:** Socket#setSendBufferSize

**See also:** Socket#getSendBufferSize

**See also:** DatagramSocket#setSendBufferSize

**See also:** DatagramSocket#getSendBufferSize

## SocketOptions.SO_RCVBUF

```java
public static final int SO_RCVBUF
```

See `StandardSocketOptions.SO_RCVBUF` for description of this socket option.

**See also:** Socket#setReceiveBufferSize

**See also:** Socket#getReceiveBufferSize

**See also:** DatagramSocket#setReceiveBufferSize

**See also:** DatagramSocket#getReceiveBufferSize

## SocketOptions.SO_KEEPALIVE

```java
public static final int SO_KEEPALIVE
```

See `StandardSocketOptions.SO_KEEPALIVE` for description of this socket option.

**See also:** Socket#setKeepAlive

**See also:** Socket#getKeepAlive

## SocketOptions.SO_OOBINLINE

```java
public static final int SO_OOBINLINE
```

When this option is set, any TCP urgent data received on the socket will be received
through the socket input stream. When the option is disabled (which is the default)
urgent data is silently discarded.

**See also:** Socket#setOOBInline

**See also:** Socket#getOOBInline
