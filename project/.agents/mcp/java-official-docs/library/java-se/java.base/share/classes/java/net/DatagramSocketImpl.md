---
title: "DatagramSocketImpl class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/DatagramSocketImpl.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DatagramSocketImpl class (java.net)

```java
public abstract class DatagramSocketImpl implements SocketOptions
```

Abstract datagram and multicast socket implementation base class.

**Since:** 1.1

## DatagramSocketImpl.DatagramSocketImpl()

```java
public DatagramSocketImpl()
```

Constructor for subclasses to call.

## DatagramSocketImpl.localPort

```java
protected int localPort
```

The local port number.

## DatagramSocketImpl.fd

```java
protected FileDescriptor fd
```

The file descriptor object.

## DatagramSocketImpl.create()

```java
protected abstract void create() throws SocketException
```

Creates a datagram socket.

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error.

## DatagramSocketImpl.bind(int, InetAddress)

```java
protected abstract void bind(int lport, InetAddress laddr) throws SocketException
```

Binds a datagram socket to a local port and address.

Parameters:

- `lport`: the local port
- `laddr`: the local address

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error.

## DatagramSocketImpl.send(DatagramPacket)

```java
protected abstract void send(DatagramPacket p) throws IOException
```

Sends a datagram packet. The packet contains the data and the
destination address to send the packet to.

Parameters:

- `p`: the packet to be sent.

Throws:

- `IOException`: if an I/O exception occurs while sending the datagram packet.
- `PortUnreachableException`: may be thrown if the socket is connected to a currently unreachable destination. Note, there is no guarantee that the exception will be thrown.

## DatagramSocketImpl.connect(InetAddress, int)

```java
protected void connect(InetAddress address, int port) throws SocketException
```

Connects a datagram socket to a remote destination. This associates the remote
address with the local socket so that datagrams may only be sent to this destination
and received from this destination. This may be overridden to call a native
system connect.

If the remote destination to which the socket is connected does not
exist, or is otherwise unreachable, and if an ICMP destination unreachable
packet has been received for that address, then a subsequent call to
send or receive may throw a PortUnreachableException.
Note, there is no guarantee that the exception will be thrown.

Parameters:

- `address`: the remote InetAddress to connect to
- `port`: the remote port number

**Implementation requirements:** The default implementation of this method throws `SocketException`.

**Since:** 1.4

Throws:

- `SocketException`: may be thrown if the socket cannot be connected to the remote destination

## DatagramSocketImpl.disconnect()

```java
protected void disconnect()
```

Disconnects a datagram socket from its remote destination.

**Implementation requirements:** The default implementation of this method throws `UncheckedIOException`.

**Since:** 1.4

Throws:

- `UncheckedIOException`: if disconnect fails or no implementation is provided

## DatagramSocketImpl.peek(InetAddress)

```java
protected abstract int peek(InetAddress i) throws IOException
```

Peek at the packet to see who it is from. Updates the specified `InetAddress`
to the address which the packet came from.

Parameters:

- `i`: an InetAddress object

**Returns:** the port number which the packet came from.

Throws:

- `IOException`: if an I/O exception occurs
- `PortUnreachableException`: may be thrown if the socket is connected to a currently unreachable destination. Note, there is no guarantee that the exception will be thrown.

## DatagramSocketImpl.peekData(DatagramPacket)

```java
protected abstract int peekData(DatagramPacket p) throws IOException
```

Peek at the packet to see who it is from. The data is copied into the specified
`DatagramPacket`. The data is returned,
but not consumed, so that a subsequent peekData/receive operation
will see the same data.

Parameters:

- `p`: the Packet Received.

**Returns:** the port number which the packet came from.

**Since:** 1.4

Throws:

- `IOException`: if an I/O exception occurs
- `PortUnreachableException`: may be thrown if the socket is connected to a currently unreachable destination. Note, there is no guarantee that the exception will be thrown.

## DatagramSocketImpl.receive(DatagramPacket)

```java
protected abstract void receive(DatagramPacket p) throws IOException
```

Receive the datagram packet.

Parameters:

- `p`: the Packet Received.

Throws:

- `IOException`: if an I/O exception occurs while receiving the datagram packet.
- `PortUnreachableException`: may be thrown if the socket is connected to a currently unreachable destination. Note, there is no guarantee that the exception will be thrown.

## DatagramSocketImpl.setTTL(byte)

```java
protected abstract void setTTL(byte ttl) throws IOException
```

Set the TTL (time-to-live) option.

Parameters:

- `ttl`: a byte specifying the TTL value

**Deprecated:** use setTimeToLive instead.

**See also:** #getTTL()

Throws:

- `IOException`: if an I/O exception occurs while setting the time-to-live option.

## DatagramSocketImpl.getTTL()

```java
protected abstract byte getTTL() throws IOException
```

Retrieve the TTL (time-to-live) option.

**Deprecated:** use getTimeToLive instead.

**Returns:** a byte representing the TTL value

**See also:** #setTTL(byte)

Throws:

- `IOException`: if an I/O exception occurs while retrieving the time-to-live option

## DatagramSocketImpl.setTimeToLive(int)

```java
protected abstract void setTimeToLive(int ttl) throws IOException
```

Set the TTL (time-to-live) option.

Parameters:

- `ttl`: an `int` specifying the time-to-live value

**See also:** #getTimeToLive()

Throws:

- `IOException`: if an I/O exception occurs while setting the time-to-live option.

## DatagramSocketImpl.getTimeToLive()

```java
protected abstract int getTimeToLive() throws IOException
```

Retrieve the TTL (time-to-live) option.

**Returns:** an `int` representing the time-to-live value

**See also:** #setTimeToLive(int)

Throws:

- `IOException`: if an I/O exception occurs while retrieving the time-to-live option

## DatagramSocketImpl.join(InetAddress)

```java
protected abstract void join(InetAddress inetaddr) throws IOException
```

Join the multicast group.

Parameters:

- `inetaddr`: multicast address to join.

Throws:

- `IOException`: if an I/O exception occurs while joining the multicast group.

## DatagramSocketImpl.leave(InetAddress)

```java
protected abstract void leave(InetAddress inetaddr) throws IOException
```

Leave the multicast group.

Parameters:

- `inetaddr`: multicast address to leave.

Throws:

- `IOException`: if an I/O exception occurs while leaving the multicast group.

## DatagramSocketImpl.joinGroup(SocketAddress, NetworkInterface)

```java
protected abstract void joinGroup(SocketAddress mcastaddr, NetworkInterface netIf) throws IOException
```

Join the multicast group.

Parameters:

- `mcastaddr`: address to join.
- `netIf`: specifies the local interface to receive multicast datagram packets

**Since:** 1.4

Throws:

- `IOException`: if an I/O exception occurs while joining the multicast group

## DatagramSocketImpl.leaveGroup(SocketAddress, NetworkInterface)

```java
protected abstract void leaveGroup(SocketAddress mcastaddr, NetworkInterface netIf) throws IOException
```

Leave the multicast group.

Parameters:

- `mcastaddr`: address to leave.
- `netIf`: specified the local interface to leave the group at

**Since:** 1.4

Throws:

- `IOException`: if an I/O exception occurs while leaving the multicast group

## DatagramSocketImpl.close()

```java
protected abstract void close()
```

Close the socket.

## DatagramSocketImpl.getLocalPort()

```java
protected int getLocalPort()
```

Gets the local port.

**Returns:** an `int` representing the local port value

## DatagramSocketImpl.getFileDescriptor()

```java
protected FileDescriptor getFileDescriptor()
```

Gets the datagram socket file descriptor.

**Returns:** a `FileDescriptor` object representing the datagram socket
file descriptor

## DatagramSocketImpl.setOption(SocketOption<T>, T)

```java
protected <T> void setOption(SocketOption<T> name, T value) throws IOException
```

Called to set a socket option.

Parameters:

- `<T>`: The type of the socket option value
- `name`: The socket option
- `value`: The value of the socket option. A value of `null` may be valid for some options.

**Implementation requirements:** The default implementation of this method first checks that the given
socket option `name` is not null, then throws `UnsupportedOperationException`. Subclasses should override this method
with an appropriate implementation.

**Since:** 9

Throws:

- `UnsupportedOperationException`: if the DatagramSocketImpl does not support the option
- `IllegalArgumentException`: if the value is not valid for the option
- `IOException`: if an I/O error occurs, or if the socket is closed
- `NullPointerException`: if name is `null`

## DatagramSocketImpl.getOption(SocketOption<T>)

```java
protected <T> T getOption(SocketOption<T> name) throws IOException
```

Called to get a socket option.

Parameters:

- `<T>`: The type of the socket option value
- `name`: The socket option

**Implementation requirements:** The default implementation of this method first checks that the given
socket option `name` is not null, then throws `UnsupportedOperationException`. Subclasses should override this method
with an appropriate implementation.

**Returns:** the socket option

**Since:** 9

Throws:

- `UnsupportedOperationException`: if the DatagramSocketImpl does not support the option
- `IOException`: if an I/O error occurs, or if the socket is closed
- `NullPointerException`: if name is `null`

## DatagramSocketImpl.supportedOptions()

```java
protected Set<SocketOption<?>> supportedOptions()
```

Returns a set of SocketOptions supported by this impl
and by this impl's socket (DatagramSocket or MulticastSocket)

**Implementation requirements:** The default implementation of this method returns an empty set.
Subclasses should override this method with an appropriate implementation.

**Returns:** a Set of SocketOptions

**Since:** 9
