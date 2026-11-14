---
title: "DatagramSocket class (java.net) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/DatagramSocket.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DatagramSocket class (java.net) (part 2 of 3)

## DatagramSocket.getPort()

```java
public int getPort()
```

Returns the port number to which this socket is connected.
Returns `-1` if the socket is not connected.

If the socket was connected prior to being closed,
then this method will continue to return the connected port number
after the socket is closed.

**Returns:** the port number to which this socket is connected.

**Since:** 1.2

## DatagramSocket.getRemoteSocketAddress()

```java
public SocketAddress getRemoteSocketAddress()
```

Returns the address of the endpoint this socket is connected to, or
`null` if it is unconnected.

If the socket was connected prior to being closed,
then this method will continue to return the connected address
after the socket is closed.

**Returns:** a `SocketAddress` representing the remote
        endpoint of this socket, or `null` if it is
        not connected yet.

**See also:** #getInetAddress()

**See also:** #getPort()

**See also:** #connect(SocketAddress)

**Since:** 1.4

## DatagramSocket.getLocalSocketAddress()

```java
public SocketAddress getLocalSocketAddress()
```

Returns the address of the endpoint this socket is bound to.

If the socket was initially bound to the wildcard address and
is now connected, then the address returned
may be the local address selected as the source address for
datagrams sent on this socket instead of the wildcard address.
When `disconnect()` is called, the bound address reverts
to the wildcard address.

**Returns:** a `SocketAddress` representing the local endpoint of this
        socket, or `null` if it is closed or not bound yet.

**See also:** #getLocalAddress()

**See also:** #getLocalPort()

**See also:** #bind(SocketAddress)

**Since:** 1.4

## DatagramSocket.send(DatagramPacket)

```java
public void send(DatagramPacket p) throws IOException
```

Sends a datagram packet from this socket. The
`DatagramPacket` includes information indicating the
data to be sent, its length, the IP address of the remote host,
and the port number on the remote host.

Parameters:

- `p`: the `DatagramPacket` to be sent.

**See also:** java.net.DatagramPacket

Throws:

- `IOException`: if an I/O error occurs, or the socket is closed.
- `PortUnreachableException`: may be thrown if the socket is connected to a currently unreachable destination. Note, there is no guarantee that the exception will be thrown.
- `java.nio.channels.IllegalBlockingModeException`: if this socket has an associated channel, and the channel is in non-blocking mode.
- `IllegalArgumentException`: if the socket is connected, and connected address and packet address differ, or if the socket is not connected and the packet address is not set or if its port is out of range.

## DatagramSocket.receive(DatagramPacket)

```java
public void receive(DatagramPacket p) throws IOException
```

Receives a datagram packet from this socket. This method blocks until a
datagram is received.

When this method returns, the `DatagramPacket`'s buffer is filled
with the data received. The datagram packet also contains the sender's
IP address, and the port number on the sender's machine.
The `length` field of the datagram packet object contains
the length of the received message. If the message is longer than
the packet's length, the message is truncated.

 This method is interruptible in the
following circumstances:

-  The datagram socket is associated
       with a DatagramChannel. In that case,
       interrupting a thread receiving a datagram packet will close the
       underlying channel and cause this method to throw `java.nio.channels.ClosedByInterruptException` with the interrupt
       status set.

-  The datagram socket uses the system-default socket implementation and
       a virtual thread is receiving a
       datagram packet. In that case, interrupting the virtual thread will
       cause it to wakeup and close the socket. This method will then throw
       `SocketException` with the interrupt status set.

Parameters:

- `p`: the `DatagramPacket` into which to place the incoming data.

**See also:** java.net.DatagramPacket

**See also:** java.net.DatagramSocket

Throws:

- `IOException`: if an I/O error occurs, or the socket is closed.
- `SocketTimeoutException`: if setSoTimeout was previously called and the timeout has expired.
- `PortUnreachableException`: may be thrown if the socket is connected to a currently unreachable destination. Note, there is no guarantee that the exception will be thrown.
- `java.nio.channels.IllegalBlockingModeException`: if this socket has an associated channel, and the channel is in non-blocking mode.

## DatagramSocket.getLocalAddress()

```java
public InetAddress getLocalAddress()
```

Gets the local address to which the socket is bound.

If the socket was initially bound to the wildcard address and
is now connected, then the address returned
may be the local address selected as the source address for
datagrams sent on the socket instead of the wildcard address.
When `disconnect()` is called, the bound address reverts
to the wildcard address.

**Returns:** the local address to which the socket is bound,
         `null` if the socket is closed, or
         an `InetAddress` representing
         wildcard
         address if the socket is not bound

**Since:** 1.1

## DatagramSocket.getLocalPort()

```java
public int getLocalPort()
```

Returns the port number on the local host to which this socket
is bound.

**Returns:** the port number on the local host to which this socket is bound,
         `-1` if the socket is closed, or
         `0` if it is not bound yet.

## DatagramSocket.setSoTimeout(int)

```java
public void setSoTimeout(int timeout) throws SocketException
```

Enable/disable SO_TIMEOUT with the specified timeout, in
milliseconds. With this option set to a positive timeout value,
a call to receive() for this DatagramSocket
will block for only this amount of time.  If the timeout expires,
a **java.net.SocketTimeoutException** is raised, though the
DatagramSocket is still valid. A timeout of zero is interpreted
as an infinite timeout.
The option **must** be enabled prior to entering the blocking
operation to have effect.

Parameters:

- `timeout`: the specified timeout in milliseconds.

**Since:** 1.1

**See also:** #getSoTimeout()

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as an UDP error, or the socket is closed.
- `IllegalArgumentException`: if `timeout` is negative

## DatagramSocket.getSoTimeout()

```java
public int getSoTimeout() throws SocketException
```

Retrieve setting for SO_TIMEOUT.  0 returns implies that the
option is disabled (i.e., timeout of infinity).

**Returns:** the setting for SO_TIMEOUT

**Since:** 1.1

**See also:** #setSoTimeout(int)

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as an UDP error, or the socket is closed.

## DatagramSocket.setSendBufferSize(int)

```java
public void setSendBufferSize(int size) throws SocketException
```

Sets the SO_SNDBUF option to the specified value for this
`DatagramSocket`. The SO_SNDBUF option is used by the
network implementation as a hint to size the underlying
network I/O buffers. The SO_SNDBUF setting may also be used
by the network implementation to determine the maximum size
of the packet that can be sent on this socket.

As SO_SNDBUF is a hint, applications that want to verify
what size the buffer is should call `getSendBufferSize()`.

Increasing the buffer size may allow multiple outgoing packets
to be queued by the network implementation when the send rate
is high.

Note: If `send(DatagramPacket)` is used to send a
`DatagramPacket` that is larger than the setting
of SO_SNDBUF then it is implementation specific if the
packet is sent or discarded.

Parameters:

- `size`: the size to which to set the send buffer size, in bytes. This value must be greater than 0.

**API note:** If `size > 0`, this method is equivalent to calling
Object) setOption(StandardSocketOptions.SO_SNDBUF, size).

**See also:** #getSendBufferSize()

**See also:** StandardSocketOptions#SO_SNDBUF

**Since:** 1.2

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as an UDP error, or the socket is closed.
- `IllegalArgumentException`: if the value is 0 or is negative.

## DatagramSocket.getSendBufferSize()

```java
public int getSendBufferSize() throws SocketException
```

Get value of the SO_SNDBUF option for this `DatagramSocket`, that is the
buffer size, in bytes, used by the platform for output on this `DatagramSocket`.

**API note:** This method is equivalent to calling getOption(StandardSocketOptions.SO_SNDBUF).

**Returns:** the value of the SO_SNDBUF option for this `DatagramSocket`

**See also:** #setSendBufferSize

**See also:** StandardSocketOptions#SO_SNDBUF

**Since:** 1.2

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as an UDP error, or the socket is closed.

## DatagramSocket.setReceiveBufferSize(int)

```java
public void setReceiveBufferSize(int size) throws SocketException
```

Sets the SO_RCVBUF option to the specified value for this
`DatagramSocket`. The SO_RCVBUF option is used by
the network implementation as a hint to size the underlying
network I/O buffers. The SO_RCVBUF setting may also be used
by the network implementation to determine the maximum size
of the packet that can be received on this socket.

Because SO_RCVBUF is a hint, applications that want to
verify what size the buffers were set to should call
`getReceiveBufferSize()`.

Increasing SO_RCVBUF may allow the network implementation
to buffer multiple packets when packets arrive faster than
are being received using `receive(DatagramPacket)`.

Note: It is implementation specific if a packet larger
than SO_RCVBUF can be received.

Parameters:

- `size`: the size to which to set the receive buffer size, in bytes. This value must be greater than 0.

**API note:** If `size > 0`, this method is equivalent to calling
Object) setOption(StandardSocketOptions.SO_RCVBUF, size).

**See also:** #getReceiveBufferSize()

**See also:** StandardSocketOptions#SO_RCVBUF

**Since:** 1.2

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as an UDP error, or the socket is closed.
- `IllegalArgumentException`: if the value is 0 or is negative.

## DatagramSocket.getReceiveBufferSize()

```java
public int getReceiveBufferSize() throws SocketException
```

Get value of the SO_RCVBUF option for this `DatagramSocket`, that is the
buffer size, in bytes, used by the platform for input on this `DatagramSocket`.

**API note:** This method is equivalent to calling getOption(StandardSocketOptions.SO_RCVBUF).

**Returns:** the value of the SO_RCVBUF option for this `DatagramSocket`

**See also:** #setReceiveBufferSize(int)

**See also:** StandardSocketOptions#SO_RCVBUF

**Since:** 1.2

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as an UDP error, or the socket is closed.

## DatagramSocket.setReuseAddress(boolean)

```java
public void setReuseAddress(boolean on) throws SocketException
```

Enable/disable the SO_REUSEADDR socket option.

For UDP sockets it may be necessary to bind more than one
socket to the same socket address. This is typically for the
purpose of receiving multicast packets
(See `java.net.MulticastSocket`). The
`SO_REUSEADDR` socket option allows multiple
sockets to be bound to the same socket address if the
`SO_REUSEADDR` socket option is enabled prior
to binding the socket using `bind(SocketAddress)`.

Note: This functionality is not supported by all existing platforms,
so it is implementation specific whether this option will be ignored
or not. However, if it is not supported then
`getReuseAddress()` will always return `false`.

When a `DatagramSocket` is created the initial setting
of `SO_REUSEADDR` is disabled.

The behaviour when `SO_REUSEADDR` is enabled or
disabled after a socket is bound (See `isBound()`)
is not defined.

Parameters:

- `on`: whether to enable or disable the

**API note:** This method is equivalent to calling Object) setOption(StandardSocketOptions.SO_REUSEADDR, on).

**Since:** 1.4

**See also:** #getReuseAddress()

**See also:** #bind(SocketAddress)

**See also:** #isBound()

**See also:** #isClosed()

**See also:** StandardSocketOptions#SO_REUSEADDR

Throws:

- `SocketException`: if an error occurs enabling or disabling the `SO_REUSEADDR` socket option, or the socket is closed.

## DatagramSocket.getReuseAddress()

```java
public boolean getReuseAddress() throws SocketException
```

Tests if SO_REUSEADDR is enabled.

**API note:** This method is equivalent to calling getOption(StandardSocketOptions.SO_REUSEADDR).

**Returns:** a `boolean` indicating whether or not SO_REUSEADDR is enabled.

**Since:** 1.4

**See also:** #setReuseAddress(boolean)

**See also:** StandardSocketOptions#SO_REUSEADDR

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as an UDP error, or the socket is closed.

## DatagramSocket.setBroadcast(boolean)

```java
public void setBroadcast(boolean on) throws SocketException
```

Enable/disable SO_BROADCAST.

 Some operating systems may require that the Java virtual machine be
started with implementation specific privileges to enable this option or
send broadcast datagrams.

Parameters:

- `on`: whether or not to have broadcast turned on.

**API note:** This method is equivalent to calling Object) setOption(StandardSocketOptions.SO_BROADCAST, on).

**Since:** 1.4

**See also:** #getBroadcast()

**See also:** StandardSocketOptions#SO_BROADCAST

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as an UDP error, or the socket is closed.

## DatagramSocket.getBroadcast()

```java
public boolean getBroadcast() throws SocketException
```

Tests if SO_BROADCAST is enabled.

**API note:** This method is equivalent to calling getOption(StandardSocketOptions.SO_BROADCAST).

**Returns:** a `boolean` indicating whether or not SO_BROADCAST is enabled.

**Since:** 1.4

**See also:** #setBroadcast(boolean)

**See also:** StandardSocketOptions#SO_BROADCAST

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as an UDP error, or the socket is closed.
