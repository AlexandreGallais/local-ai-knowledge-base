---
title: "MulticastSocket class (java.net) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/MulticastSocket.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MulticastSocket class (java.net)

```java
public class MulticastSocket extends DatagramSocket
```

A `MulticastSocket` is a datagram socket that is
convenient for sending and receiving IP multicast datagrams.
The `MulticastSocket` constructors create a socket
with appropriate socket options enabled that make
it suitable for receiving multicast datagrams.
The `MulticastSocket` class additionally defines
convenient setter and getter methods for socket options
that are commonly used by multicasting applications.

Joining one or more multicast groups makes it possible to
receive multicast datagrams sent to these groups.

An IPv4 multicast group is specified by a class D IP address
and by a standard UDP port number. Class D IP addresses
are in the range `224.0.0.0` to `239.255.255.255`,
inclusive. The address 224.0.0.0 is reserved and should not be used.

One would join a multicast group by first creating a MulticastSocket
with the desired port, then invoking the
`joinGroup` method, specifying the group address and
the network interface through which multicast datagrams will be
received:

```java
// join a Multicast group and send the group salutations
...
String msg = "Hello";
InetAddress mcastaddr = InetAddress.getByName("228.5.6.7");
InetSocketAddress group = new InetSocketAddress(mcastaddr, 6789);
NetworkInterface netIf = NetworkInterface.getByName("bge0");
MulticastSocket s = new MulticastSocket(6789);

s.joinGroup(new InetSocketAddress(mcastaddr, 0), netIf);
byte[] msgBytes = msg.getBytes(StandardCharsets.UTF_8);
DatagramPacket hi = new DatagramPacket(msgBytes, msgBytes.length, group);
s.send(hi);
// get their responses!
byte[] buf = new byte[1000];
DatagramPacket recv = new DatagramPacket(buf, buf.length);
s.receive(recv);
...
// OK, I'm done talking - leave the group...
s.leaveGroup(group, netIf);
```

When one sends a message to a multicast group, **all** subscribing
recipients to that host and port receive the message (within the
time-to-live range of the packet, see below). The socket needn't
be a member of the multicast group to send messages to it.

When a socket subscribes to a multicast group/port, it receives
datagrams sent by other hosts to the group/port, as do all other
members of the group and port.  A socket relinquishes membership
in a group by the leaveGroup(SocketAddress mcastaddr, NetworkInterface netIf)
method.
**Multiple MulticastSockets** may subscribe to a multicast group
and port concurrently, and they will all receive group datagrams.

 The `DatagramSocket` and `MulticastSocket`
classes define convenience methods to set and get several
socket options. Like `DatagramSocket` this class also
supports the Object) setOption
and getOption methods to set
and query socket options.
The set of supported socket options
is defined in `DatagramSocket`.
Additional (implementation specific) options may also be supported.

**API note:** `DatagramSocket` may be used directly for
         sending and receiving multicast datagrams.
         `DatagramChannel` implements the `MulticastChannel` interface
         and provides an alternative API for sending and receiving multicast datagrams.
         The `MulticastChannel` API supports both NetworkInterface) any-source and
         NetworkInterface, InetAddress) source-specific multicast. Consider using `DatagramChannel` for
         multicasting.

**Since:** 1.1

## MulticastSocket.MulticastSocket()

```java
public MulticastSocket() throws IOException
```

Constructs a multicast socket and binds it to any available port
on the local host machine.  The socket will be bound to the
wildcard address.

When the socket is created the
`DatagramSocket.setReuseAddress(boolean)` method is called to
enable the SO_REUSEADDR socket option.

**See also:** java.net.DatagramSocket#setReuseAddress(boolean)

**See also:** java.net.DatagramSocketImpl#setOption(SocketOption, Object)

Throws:

- `IOException`: if an I/O exception occurs while creating the MulticastSocket

## MulticastSocket.MulticastSocket(int)

```java
public MulticastSocket(int port) throws IOException
```

Constructs a multicast socket and binds it to the specified port
on the local host machine. The socket will be bound to the
wildcard address.

When the socket is created the
`DatagramSocket.setReuseAddress(boolean)` method is
called to enable the SO_REUSEADDR socket option.

Parameters:

- `port`: port to use

**See also:** java.net.DatagramSocket#setReuseAddress(boolean)

Throws:

- `IOException`: if an I/O exception occurs while creating the MulticastSocket
- `IllegalArgumentException`: if port is  out of range.

## MulticastSocket.MulticastSocket(SocketAddress)

```java
public MulticastSocket(SocketAddress bindaddr) throws IOException
```

Creates a multicast socket, bound to the specified local
socket address.

If the address is `null` an unbound socket will be created.

When the socket is created the
`DatagramSocket.setReuseAddress(boolean)` method is
called to enable the SO_REUSEADDR socket option.

Parameters:

- `bindaddr`: Socket address to bind to, or `null` for an unbound socket.

**See also:** java.net.DatagramSocket#setReuseAddress(boolean)

**Since:** 1.4

Throws:

- `IOException`: if an I/O exception occurs while creating the MulticastSocket

## MulticastSocket.setTTL(byte)

```java
public void setTTL(byte ttl) throws IOException
```

Set the default time-to-live for multicast packets sent out
on this `MulticastSocket` in order to control the
scope of the multicasts.

The ttl is an **unsigned** 8-bit quantity, and so **must** be
in the range `0 <= ttl <= 0xFF`.

Parameters:

- `ttl`: the time-to-live

**Deprecated:** use the `setTimeToLive(int)` method instead, which uses
            **int** instead of **byte** as the type for ttl.

**See also:** #getTTL()

Throws:

- `IOException`: if an I/O exception occurs while setting the default time-to-live value, or the socket is closed.

## MulticastSocket.setTimeToLive(int)

```java
public void setTimeToLive(int ttl) throws IOException
```

Set the default time-to-live for multicast packets sent out
on this `MulticastSocket` in order to control the
scope of the multicasts.

 The ttl **must** be in the range `0 <= ttl <= 255` or an `IllegalArgumentException` will be thrown.
Multicast packets sent with a TTL of `0` are not transmitted
on the network but may be delivered locally.

Parameters:

- `ttl`: the time-to-live

**API note:** This method is equivalent to calling Object) setOption(StandardSocketOptions.IP_MULTICAST_TTL, ttl).

**See also:** #getTimeToLive()

**See also:** StandardSocketOptions#IP_MULTICAST_TTL

**Since:** 1.2

Throws:

- `IOException`: if an I/O exception occurs while setting the default time-to-live value, or the socket is closed.

## MulticastSocket.getTTL()

```java
public byte getTTL() throws IOException
```

Get the default time-to-live for multicast packets sent out on
the socket.

**Returns:** the default time-to-live value

**Deprecated:** use the `getTimeToLive()` method instead,
which returns an **int** instead of a **byte**.

**See also:** #setTTL(byte)

Throws:

- `IOException`: if an I/O exception occurs while getting the default time-to-live value, or the socket is closed.

## MulticastSocket.getTimeToLive()

```java
public int getTimeToLive() throws IOException
```

Get the default time-to-live for multicast packets sent out on
the socket.

**API note:** This method is equivalent to calling getOption(StandardSocketOptions.IP_MULTICAST_TTL).

**Returns:** the default time-to-live value

**See also:** #setTimeToLive(int)

**See also:** StandardSocketOptions#IP_MULTICAST_TTL

**Since:** 1.2

Throws:

- `IOException`: if an I/O exception occurs while getting the default time-to-live value, or the socket is closed.

## MulticastSocket.joinGroup(InetAddress)

```java
public void joinGroup(InetAddress mcastaddr) throws IOException
```

Joins a multicast group. Its behavior may be affected by
`setInterface` or `setNetworkInterface`.

Parameters:

- `mcastaddr`: is the multicast address to join

**API note:** Calling this method is equivalent to calling
NetworkInterface) joinGroup(new InetSocketAddress(mcastaddr, 0), null).

**Deprecated:** This method does not accept the network interface on
            which to join the multicast group. Use
            NetworkInterface) instead.

Throws:

- `IOException`: if there is an error joining, or when the address is not a multicast address, or the platform does not support multicasting, or the socket is closed.

## MulticastSocket.leaveGroup(InetAddress)

```java
public void leaveGroup(InetAddress mcastaddr) throws IOException
```

Leave a multicast group. Its behavior may be affected by
`setInterface` or `setNetworkInterface`.

Parameters:

- `mcastaddr`: is the multicast address to leave

**API note:** Calling this method is equivalent to calling
NetworkInterface) leaveGroup(new InetSocketAddress(mcastaddr, 0), null).

**Deprecated:** This method does not accept the network interface on which
            to leave the multicast group. Use
            NetworkInterface) instead.

Throws:

- `IOException`: if there is an error leaving or when the address is not a multicast address, or the socket is closed.

## MulticastSocket.joinGroup(SocketAddress, NetworkInterface)

```java
public void joinGroup(SocketAddress mcastaddr, NetworkInterface netIf) throws IOException
```

(inherited documentation)

**See also:** DatagramChannel#join(InetAddress, NetworkInterface)

**See also:** StandardSocketOptions#IP_MULTICAST_IF

**See also:** #setNetworkInterface(NetworkInterface)

**See also:** #setInterface(InetAddress)

**Since:** 1.4

Throws:

- `IOException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## MulticastSocket.leaveGroup(SocketAddress, NetworkInterface)

```java
public void leaveGroup(SocketAddress mcastaddr, NetworkInterface netIf) throws IOException
```

(inherited documentation)

**API note:** (inherited documentation)

**See also:** #joinGroup(SocketAddress, NetworkInterface)

**Since:** 1.4

Throws:

- `IOException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## MulticastSocket.setInterface(InetAddress)

```java
public void setInterface(InetAddress inf) throws SocketException
```

Set the multicast network interface used by methods
whose behavior would be affected by the value of the
network interface. Useful for multihomed hosts.

Parameters:

- `inf`: the InetAddress

**Deprecated:** The InetAddress may not uniquely identify
            the network interface. Use
            `setNetworkInterface(NetworkInterface)` instead.

**See also:** #getInterface()

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.

## MulticastSocket.getInterface()

```java
public InetAddress getInterface() throws SocketException
```

Retrieve the address of the network interface used for
multicast packets.

**Returns:** An `InetAddress` representing the address
            of the network interface used for multicast packets,
            or if no interface has been set, an `InetAddress`
            representing any local address.

**Deprecated:** The network interface may not be uniquely identified by
            the InetAddress returned.
            Use `getNetworkInterface()` instead.

**See also:** #setInterface(java.net.InetAddress)

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.

## MulticastSocket.setNetworkInterface(NetworkInterface)

```java
public void setNetworkInterface(NetworkInterface netIf) throws SocketException
```

Specify the network interface for outgoing multicast datagrams
sent on this socket.

Parameters:

- `netIf`: the interface

**API note:** This method is equivalent to calling Object) setOption(StandardSocketOptions.IP_MULTICAST_IF, netIf).

**See also:** #getNetworkInterface()

**See also:** StandardSocketOptions#IP_MULTICAST_IF

**Since:** 1.4

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.

## MulticastSocket.getNetworkInterface()

```java
public NetworkInterface getNetworkInterface() throws SocketException
```

Get the multicast network interface set for outgoing multicast
datagrams sent from this socket.

**API note:** When an interface is set, this method is equivalent
to calling getOption(StandardSocketOptions.IP_MULTICAST_IF).

**Returns:** The multicast `NetworkInterface` currently set. A placeholder
        NetworkInterface is returned when there is no interface set; it has
        a single InetAddress to represent any local address.

**See also:** #setNetworkInterface(NetworkInterface)

**See also:** StandardSocketOptions#IP_MULTICAST_IF

**Since:** 1.4

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.

## MulticastSocket.setLoopbackMode(boolean)

```java
public void setLoopbackMode(boolean disable) throws SocketException
```

Disable/Enable local loopback of multicast datagrams.
The option is used by the platform's networking code as a hint
for setting whether multicast data will be looped back to
the local socket.

Because this option is a hint, applications that want to
verify what loopback mode is set to should call
`getLoopbackMode()`

Parameters:

- `disable`: `true` to disable the LoopbackMode

**Since:** 1.4

**Deprecated:** Use Object) with
            `java.net.StandardSocketOptions.IP_MULTICAST_LOOP`
            instead. The loopback mode is enabled by default,
            `MulticastSocket.setOption(StandardSocketOptions.IP_MULTICAST_LOOP, false)`
            disables it.

**See also:** #getLoopbackMode

Throws:

- `SocketException`: if an error occurs while setting the value, or the socket is closed.

## MulticastSocket.getLoopbackMode()

```java
public boolean getLoopbackMode() throws SocketException
```

Get the setting for local loopback of multicast datagrams.

**Returns:** true if the LoopbackMode has been disabled

**Since:** 1.4

**Deprecated:** Use `getOption(SocketOption)` with
            `java.net.StandardSocketOptions.IP_MULTICAST_LOOP`
            instead.

**See also:** #setLoopbackMode

Throws:

- `SocketException`: if an error occurs while getting the value, or the socket is closed.
