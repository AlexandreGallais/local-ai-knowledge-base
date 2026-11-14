---
title: "DatagramSocket class (java.net) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/DatagramSocket.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DatagramSocket class (java.net)

```java
public class DatagramSocket implements java.io.Closeable
```

This class represents a socket for sending and receiving datagram packets.

A datagram socket is the sending or receiving point for a packet
delivery service. Each packet sent or received on a datagram socket
is individually addressed and routed. Multiple packets sent from
one machine to another may be routed differently, and may arrive in
any order.

 Where possible, a newly constructed `DatagramSocket` has the
SO_BROADCAST socket option enabled so as
to allow the transmission of broadcast datagrams. In order to receive
broadcast packets a DatagramSocket should be bound to the wildcard address.
In some implementations, broadcast packets may also be received when
a DatagramSocket is bound to a more specific address.

Example:

```java
             DatagramSocket s = new DatagramSocket(null);
             s.bind(new InetSocketAddress(8888));
```

Which is equivalent to:

```java
             DatagramSocket s = new DatagramSocket(8888);
```

Both cases will create a DatagramSocket able to receive broadcasts on
UDP port 8888.

 The `DatagramSocket` class defines convenience
methods to set and get several socket options. This class also
defines the setOption
and getOption methods to set
and query socket options.
A `DatagramSocket` supports the following socket options:

Socket options

    Option Name
    Description

     SO_SNDBUF
     The size of the socket send buffer in bytes

     SO_RCVBUF
     The size of the socket receive buffer in bytes

     SO_REUSEADDR
     Re-use address

     SO_BROADCAST
     Allow transmission of broadcast datagrams

     IP_TOS
     The Type of Service (ToS) octet in the Internet Protocol (IP) header

 In addition, the `DatagramSocket` class defines methods to NetworkInterface) join and NetworkInterface) leave a multicast group, and
supports multicast options which
are useful when NetworkInterface) joining,
NetworkInterface) leaving, or sending datagrams
to a multicast group.
The following multicast options are supported:

Multicast options

    Option Name
    Description

     IP_MULTICAST_IF
     The network interface for Internet Protocol (IP) multicast datagrams

     IP_MULTICAST_TTL
     The *time-to-live* for Internet Protocol (IP) multicast
      datagrams

     IP_MULTICAST_LOOP
     Loopback for Internet Protocol (IP) multicast datagrams

An implementation may also support additional options.

**API note:** **Multicasting with DatagramSocket**

 `DatagramChannel` implements the `MulticastChannel` interface
and provides an alternative API for sending and receiving multicast datagrams.
The `MulticastChannel` API supports both NetworkInterface) any-source and
NetworkInterface, InetAddress) source-specific multicast. Consider using `DatagramChannel` for
multicasting.

 `DatagramSocket` can be used directly for multicasting. However,
contrarily to `MulticastSocket`, `DatagramSocket` doesn't call the
`DatagramSocket.setReuseAddress(boolean)` method to enable the SO_REUSEADDR
socket option by default. If creating a `DatagramSocket` intended to
later join a multicast group, the caller should consider explicitly enabling
the SO_REUSEADDR option.

 An instance of `DatagramSocket` can be used to send or
receive multicast datagram packets. It is not necessary to join a multicast
group in order to send multicast datagrams. Before sending out multicast
datagram packets however, the default outgoing interface for sending
multicast datagram should first be configured using
Object) setOption and
`StandardSocketOptions.IP_MULTICAST_IF`:

```java
   DatagramSocket sender = new DatagramSocket(new InetSocketAddress(0));
   NetworkInterface outgoingIf = NetworkInterface.getByName("en0");
   sender.setOption(StandardSocketOptions.IP_MULTICAST_IF, outgoingIf);

   // optionally configure multicast TTL; the TTL defines the scope of a
   // multicast datagram, for example, confining it to host local (0) or
   // link local (1) etc...
   int ttl = ...; // a number between 0 and 255
   sender.setOption(StandardSocketOptions.IP_MULTICAST_TTL, ttl);

   // send a packet to a multicast group
   byte[] msgBytes = ...;
   InetAddress mcastaddr = InetAddress.getByName("228.5.6.7");
   int port = 6789;
   InetSocketAddress dest = new InetSocketAddress(mcastaddr, port);
   DatagramPacket hi = new DatagramPacket(msgBytes, msgBytes.length, dest);
   sender.send(hi);
```

 An instance of `DatagramSocket` can also be used to receive
multicast datagram packets. A `DatagramSocket` that is created
with the intent of receiving multicast datagrams should be created
*unbound*. Before binding the socket, setReuseAddress(true) should be configured:

```java
   DatagramSocket socket = new DatagramSocket(null); // unbound
   socket.setReuseAddress(true); // set reuse address before binding
   socket.bind(new InetSocketAddress(6789)); // bind

   // joinGroup 228.5.6.7
   InetAddress mcastaddr = InetAddress.getByName("228.5.6.7");
   InetSocketAddress group = new InetSocketAddress(mcastaddr, 0);
   NetworkInterface netIf = NetworkInterface.getByName("en0");
   socket.joinGroup(group, netIf);
   byte[] msgBytes = new byte[1024]; // up to 1024 bytes
   DatagramPacket packet = new DatagramPacket(msgBytes, msgBytes.length);
   socket.receive(packet);
   ....
   // eventually leave group
   socket.leaveGroup(group, netIf);
```

**Platform dependencies**

The multicast implementation is intended to map directly to the native
multicasting facility. Consequently, the following items should be considered
when developing an application that receives IP multicast datagrams:

-  Contrarily to `DatagramChannel`, the constructors of `DatagramSocket`
       do not allow to specify the `ProtocolFamily` of the underlying socket.
       Consequently, the protocol family of the underlying socket may not
       correspond to the protocol family of the multicast groups that
       the `DatagramSocket` will attempt to join.

       There is no guarantee that a `DatagramSocket` with an underlying
       socket created in one protocol family can join and receive multicast
       datagrams when the address of the multicast group corresponds to
       another protocol family. For example, it is implementation specific if a
       `DatagramSocket` to an IPv6 socket can join an IPv4 multicast group
       and receive multicast datagrams sent to the group.

-  Before joining a multicast group, the `DatagramSocket` should be
       bound to the wildcard address.
       If the socket is bound to a specific address, rather than the wildcard address
       then it is implementation specific if multicast datagrams are received
       by the socket.

-  The SO_REUSEADDR option should be enabled prior to binding the socket.
       This is required to allow multiple members of the group to bind to the same address.

**See also:** java.net.DatagramPacket

**See also:** java.nio.channels.DatagramChannel

**Since:** 1.0

## DatagramSocket.DatagramSocket()

```java
public DatagramSocket() throws SocketException
```

Constructs a datagram socket and binds it to any available port
on the local host machine.  The socket will be bound to the
wildcard address.

Throws:

- `SocketException`: if the socket could not be opened, or the socket could not be bound.

## DatagramSocket.DatagramSocket(DatagramSocketImpl)

```java
protected DatagramSocket(DatagramSocketImpl impl)
```

Creates an unbound datagram socket with the specified
DatagramSocketImpl.

Parameters:

- `impl`: an instance of a **DatagramSocketImpl** the subclass wishes to use on the DatagramSocket.

**Since:** 1.4

## DatagramSocket.DatagramSocket(SocketAddress)

```java
public DatagramSocket(SocketAddress bindaddr) throws SocketException
```

Creates a datagram socket, bound to the specified local
socket address.

If the address is `null` an unbound socket will be created.

Parameters:

- `bindaddr`: local socket address to bind, or `null` for an unbound socket.

**Since:** 1.4

Throws:

- `SocketException`: if the socket could not be opened, or the socket could not bind to the specified local port.
- `IllegalArgumentException`: if bindaddr is a SocketAddress subclass not supported by this socket.

## DatagramSocket.DatagramSocket(int)

```java
public DatagramSocket(int port) throws SocketException
```

Constructs a datagram socket and binds it to the specified port
on the local host machine.  The socket will be bound to the
wildcard address.

Parameters:

- `port`: local port to use in the bind operation.

Throws:

- `SocketException`: if the socket could not be opened, or the socket could not bind to the specified local port.
- `IllegalArgumentException`: if port is  out of range.

## DatagramSocket.DatagramSocket(int, InetAddress)

```java
public DatagramSocket(int port, InetAddress laddr) throws SocketException
```

Creates a datagram socket, bound to the specified local
address.

The local port must be between 0 and
65535 inclusive. A port number of `zero` will let the system pick
up an ephemeral port in a `bind` operation.

If the IP address is a wildcard
address, or is `null`, the socket will be bound to the wildcard
address.

Parameters:

- `port`: local port to use in the bind operation.
- `laddr`: local address to bind (can be `null`)

**Since:** 1.1

Throws:

- `SocketException`: if the socket could not be opened, or the socket could not bind to the specified local port.
- `IllegalArgumentException`: if port is  out of range.

## DatagramSocket.bind(SocketAddress)

```java
public void bind(SocketAddress addr) throws SocketException
```

Binds this DatagramSocket to a specific address and port.

If the address is `null`, then the system will pick up
an ephemeral port and a valid local address to bind the socket.

Parameters:

- `addr`: The address and port to bind to.

**Since:** 1.4

Throws:

- `SocketException`: if any error happens during the bind, or if the socket is already bound or is closed.
- `IllegalArgumentException`: if addr is a SocketAddress subclass not supported by this socket.

## DatagramSocket.connect(InetAddress, int)

```java
public void connect(InetAddress address, int port)
```

Connects the socket to a remote address for this socket. When a
socket is connected to a remote address, packets may only be
sent to or received from that address. By default a datagram
socket is not connected. If the socket is already closed,
then this method has no effect.

 If this socket is not bound then this method will first cause the
socket to be bound to an address that is assigned automatically,
as if invoking the bind method with a parameter of
`null`. If the remote destination to which the socket is connected
does not exist, or is otherwise unreachable, and if an ICMP destination
unreachable packet has been received for that address, then a subsequent
call to send or receive may throw a PortUnreachableException. Note,
there is no guarantee that the exception will be thrown.

 If this socket is already connected, then this method will attempt to
connect to the given address. If this connect fails then the state of
this socket is unknown - it may or may not be connected to the address
that it was previously connected to.

 When the socket is connected, the send method checks that the
packet's address matches the remote address that the socket is
connected to. A socket connected to a multicast address may only
be used to send packets. Datagrams in the socket's socket receive buffer, which
have not been received before invoking
this method, may be discarded.

Parameters:

- `address`: the remote address for the socket
- `port`: the remote port for the socket.

**See also:** #disconnect

**Since:** 1.2

Throws:

- `IllegalArgumentException`: if the address is null, or the port is  out of range.
- `UncheckedIOException`: if the port is 0 or connect fails, for example, if the destination address is non-routable

## DatagramSocket.connect(SocketAddress)

```java
public void connect(SocketAddress addr) throws SocketException
```

Connects this socket to a remote socket address (IP address + port number).

 If given an InetSocketAddress, this method
behaves as if invoking connect(InetAddress,int)
with the given socket addresses IP address and port number, except that the
`SocketException` that may be raised is not wrapped in an
`UncheckedIOException`. Datagrams in the socket's socket receive buffer, which
have not been received before invoking
this method, may be discarded.

 If this socket is already connected, then this method will attempt to
connect to the given address. If this connect fails then the state of
this socket is unknown - it may or may not be connected to the address
that it was previously connected to.

Parameters:

- `addr`: The remote address.

**Since:** 1.4

Throws:

- `SocketException`: if the connect fails
- `IllegalArgumentException`: if `addr` is `null`, or `addr` is a SocketAddress subclass not supported by this socket

## DatagramSocket.disconnect()

```java
public void disconnect()
```

Disconnects the socket. If the socket is closed or not connected,
then this method has no effect.

**API note:** If this method throws an UncheckedIOException, the socket
         may be left in an unspecified state. It is strongly
         recommended that the socket be closed when disconnect
         fails.

**See also:** #connect

**Since:** 1.2

Throws:

- `UncheckedIOException`: may be thrown if disconnect fails to dissolve the association and restore the socket to a consistent state.

## DatagramSocket.isBound()

```java
public boolean isBound()
```

Returns the binding state of the socket.

If the socket was bound prior to being closed,
then this method will continue to return `true`
after the socket is closed.

**Returns:** true if the socket successfully bound to an address

**Since:** 1.4

## DatagramSocket.isConnected()

```java
public boolean isConnected()
```

Returns the connection state of the socket.

If the socket was connected prior to being closed,
then this method will continue to return `true`
after the socket is closed.

**Returns:** true if the socket successfully connected to a server

**Since:** 1.4

## DatagramSocket.getInetAddress()

```java
public InetAddress getInetAddress()
```

Returns the address to which this socket is connected. Returns
`null` if the socket is not connected.

If the socket was connected prior to being closed,
then this method will continue to return the connected address
after the socket is closed.

**Returns:** the address to which this socket is connected.

**Since:** 1.2
