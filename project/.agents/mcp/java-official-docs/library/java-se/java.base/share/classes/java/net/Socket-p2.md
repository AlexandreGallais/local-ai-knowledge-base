---
title: "Socket class (java.net) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/Socket.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Socket class (java.net) (part 2 of 3)

## Socket.getRemoteSocketAddress()

```java
public SocketAddress getRemoteSocketAddress()
```

Returns the address of the endpoint this socket is connected to, or
`null` if it is unconnected.

If the socket was connected prior to being closed,
then this method will continue to return the connected address
after the socket is closed.

**Returns:** a `SocketAddress` representing the remote endpoint of this
        socket, or `null` if it is not connected yet.

**See also:** #getInetAddress()

**See also:** #getPort()

**See also:** #connect(SocketAddress, int)

**See also:** #connect(SocketAddress)

**Since:** 1.4

## Socket.getLocalSocketAddress()

```java
public SocketAddress getLocalSocketAddress()
```

Returns the address of the endpoint this socket is bound to.

If a socket bound to an endpoint represented by an
`InetSocketAddress` is closed,
then this method will continue to return an `InetSocketAddress`
after the socket is closed. In that case the returned
`InetSocketAddress`'s address is the
wildcard address
and its port is the local port that it was bound to.

**Returns:** a `SocketAddress` representing the local endpoint of
        this socket, or `null` if the socket is not bound yet.

**See also:** #getLocalAddress()

**See also:** #getLocalPort()

**See also:** #bind(SocketAddress)

**Since:** 1.4

## Socket.getChannel()

```java
public SocketChannel getChannel()
```

Returns the unique SocketChannel
object associated with this socket, if any.

 A socket will have a channel if, and only if, the channel itself was
created via the SocketChannel.open or ServerSocketChannel.accept
methods.

**Returns:** the socket channel associated with this socket,
         or `null` if this socket was not created
         for a channel

**Since:** 1.4

## Socket.getInputStream()

```java
public InputStream getInputStream() throws IOException
```

Returns an input stream for this socket.

 If this socket has an associated channel then the resulting input
stream delegates all of its operations to the channel.  If the channel
is in non-blocking mode then the input stream's `read` operations
will throw an `java.nio.channels.IllegalBlockingModeException`.

 Reading from the input stream is interruptible in the following circumstances:

-  The socket is associated with
       a SocketChannel.
       In that case, interrupting a thread reading from the input stream
       will close the underlying channel and cause the read method to
       throw `ClosedByInterruptException` with the interrupt
       status set.

-  The socket uses the system-default socket implementation and a
       virtual thread is reading from the
       input stream. In that case, interrupting the virtual thread will
       cause it to wakeup and close the socket. The read method will then
       throw `SocketException` with the interrupt status set.

Under abnormal conditions the underlying connection may be
broken by the remote host or the network software (for example
a connection reset in the case of TCP connections). When a
broken connection is detected by the network software the
following applies to the returned input stream :-

-

The network software may discard bytes that are buffered
  by the socket. Bytes that aren't discarded by the network
  software can be read using read.

-

If there are no bytes buffered on the socket, or all
  buffered bytes have been consumed by
  read, then all subsequent
  calls to read will throw an
  IOException.

-

If there are no bytes buffered on the socket, and the
  socket has not been closed using close, then
  available will
  return `0`.

 Closing the returned InputStream
will close the associated socket.

**Returns:** an input stream for reading bytes from this socket.

Throws:

- `IOException`: if an I/O error occurs when creating the input stream, the socket is closed, the socket is not connected, or the socket input has been shutdown using `shutdownInput()`

## Socket.getOutputStream()

```java
public OutputStream getOutputStream() throws IOException
```

Returns an output stream for this socket.

 If this socket has an associated channel then the resulting output
stream delegates all of its operations to the channel.  If the channel
is in non-blocking mode then the output stream's `write`
operations will throw an `java.nio.channels.IllegalBlockingModeException`.

 Writing to the output stream is interruptible in the following circumstances:

-  The socket is associated with
       a SocketChannel.
       In that case, interrupting a thread writing to the output stream
       will close the underlying channel and cause the write method to
       throw `ClosedByInterruptException` with the interrupt status
       set.

-  The socket uses the system-default socket implementation and a
       virtual thread is writing to the
       output stream. In that case, interrupting the virtual thread will
       cause it to wakeup and close the socket. The write method will then
       throw `SocketException` with the interrupt status set.

 Closing the returned OutputStream
will close the associated socket.

**Returns:** an output stream for writing bytes to this socket.

Throws:

- `IOException`: if an I/O error occurs when creating the output stream, the socket is not connected or the socket is closed.

## Socket.setTcpNoDelay(boolean)

```java
public void setTcpNoDelay(boolean on) throws SocketException
```

Enable/disable TCP_NODELAY
(disable/enable Nagle's algorithm).

Parameters:

- `on`: `true` to enable `TCP_NODELAY`, `false` to disable.

**Since:** 1.1

**See also:** #getTcpNoDelay()

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.

## Socket.getTcpNoDelay()

```java
public boolean getTcpNoDelay() throws SocketException
```

Tests if TCP_NODELAY is enabled.

**Returns:** a `boolean` indicating whether or not
        `TCP_NODELAY` is enabled.

**Since:** 1.1

**See also:** #setTcpNoDelay(boolean)

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.

## Socket.setSoLinger(boolean, int)

```java
public void setSoLinger(boolean on, int linger) throws SocketException
```

Enable/disable SO_LINGER with the
specified linger time in seconds. The maximum timeout value is platform
specific.

The setting only affects socket close.

Parameters:

- `on`: whether or not to linger on.
- `linger`: how long to linger for, if on is true.

**Since:** 1.1

**See also:** #getSoLinger()

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.
- `IllegalArgumentException`: if the linger value is negative.

## Socket.getSoLinger()

```java
public int getSoLinger() throws SocketException
```

Returns setting for SO_LINGER.
-1 returns implies that the
option is disabled.

The setting only affects socket close.

**Returns:** the setting for `SO_LINGER`.

**Since:** 1.1

**See also:** #setSoLinger(boolean, int)

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.

## Socket.sendUrgentData(int)

```java
public void sendUrgentData(int data) throws IOException
```

Send one byte of urgent data on the socket. The byte to be sent is the lowest eight
bits of the data parameter. The urgent byte is
sent after any preceding writes to the socket OutputStream
and before any future writes to the OutputStream.

Parameters:

- `data`: The byte of data to send

**Since:** 1.4

Throws:

- `IOException`: if there is an error sending the data.

## Socket.setOOBInline(boolean)

```java
public void setOOBInline(boolean on) throws SocketException
```

Enable/disable SO_OOBINLINE
(receipt of TCP urgent data)

By default, this option is disabled and TCP urgent data received on a
socket is silently discarded. If the user wishes to receive urgent data, then
this option must be enabled. When enabled, urgent data is received
inline with normal data.

Note, only limited support is provided for handling incoming urgent
data. In particular, no notification of incoming urgent data is provided
and there is no capability to distinguish between normal data and urgent
data unless provided by a higher level protocol.

Parameters:

- `on`: `true` to enable `SO_OOBINLINE`, `false` to disable.

**Since:** 1.4

**See also:** #getOOBInline()

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.

## Socket.getOOBInline()

```java
public boolean getOOBInline() throws SocketException
```

Tests if SO_OOBINLINE is enabled.

**Returns:** a `boolean` indicating whether or not
        `SO_OOBINLINE` is enabled.

**Since:** 1.4

**See also:** #setOOBInline(boolean)

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.

## Socket.setSoTimeout(int)

```java
public void setSoTimeout(int timeout) throws SocketException
```

Enable/disable SO_TIMEOUT
 with the specified timeout, in milliseconds. With this option set
 to a positive timeout value, a read() call on the InputStream associated with
 this Socket will block for only this amount of time.  If the timeout
 expires, a **java.net.SocketTimeoutException** is raised, though the
 Socket is still valid. A timeout of zero is interpreted as an infinite timeout.
 The option **must** be enabled prior to entering the blocking operation
 to have effect.

Parameters:

- `timeout`: the specified timeout, in milliseconds.

**Since:** 1.1

**See also:** #getSoTimeout()

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.
- `IllegalArgumentException`: if `timeout` is negative

## Socket.getSoTimeout()

```java
public int getSoTimeout() throws SocketException
```

Returns setting for SO_TIMEOUT.
0 returns implies that the option is disabled (i.e., timeout of infinity).

**Returns:** the setting for `SO_TIMEOUT`

**Since:** 1.1

**See also:** #setSoTimeout(int)

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.

## Socket.setSendBufferSize(int)

```java
public void setSendBufferSize(int size) throws SocketException
```

Sets the SO_SNDBUF option to the
specified value for this `Socket`.
The `SO_SNDBUF` option is used by the platform's networking code
as a hint for the size to set the underlying network I/O buffers.

Because `SO_SNDBUF` is a hint, applications that want to verify
what size the buffers were set to should call `getSendBufferSize()`.

Parameters:

- `size`: the size to which to set the send buffer size. This value must be greater than 0.

**See also:** #getSendBufferSize()

**Since:** 1.2

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.
- `IllegalArgumentException`: if the value is 0 or is negative.

## Socket.getSendBufferSize()

```java
public int getSendBufferSize() throws SocketException
```

Get value of the SO_SNDBUF option
for this `Socket`, that is the buffer size used by the platform
for output on this `Socket`.

**Returns:** the value of the `SO_SNDBUF` option for this `Socket`.

**See also:** #setSendBufferSize(int)

**Since:** 1.2

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.

## Socket.setReceiveBufferSize(int)

```java
public void setReceiveBufferSize(int size) throws SocketException
```

Sets the SO_RCVBUF option to the
specified value for this `Socket`. The
`SO_RCVBUF` option is used by the platform's networking code
as a hint for the size to set the underlying network I/O buffers.

Increasing the receive buffer size can increase the performance of
network I/O for high-volume connection, while decreasing it can
help reduce the backlog of incoming data.

Because `SO_RCVBUF` is a hint, applications that want to verify
what size the buffers were set to should call `getReceiveBufferSize()`.

The value of `SO_RCVBUF` is also used to set the TCP receive window
that is advertised to the remote peer.
Generally, the window size can be modified at any time when a socket is
connected. However, if a receive window larger than 64K is required then
this must be requested **before** the socket is connected to the
remote peer. There are two cases to be aware of:

- For sockets accepted from a ServerSocket, this must be done by calling
`ServerSocket.setReceiveBufferSize(int)` before the ServerSocket
is bound to a local address.

- For client sockets, setReceiveBufferSize() must be called before
connecting the socket to its remote peer.

Parameters:

- `size`: the size to which to set the receive buffer size. This value must be greater than 0.

**See also:** #getReceiveBufferSize()

**See also:** ServerSocket#setReceiveBufferSize(int)

**Since:** 1.2

Throws:

- `IllegalArgumentException`: if the value is 0 or is negative.
- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.

## Socket.getReceiveBufferSize()

```java
public int getReceiveBufferSize() throws SocketException
```

Gets the value of the SO_RCVBUF option
for this `Socket`, that is the buffer size used by the platform
for input on this `Socket`.

**Returns:** the value of the `SO_RCVBUF` option for this `Socket`.

**See also:** #setReceiveBufferSize(int)

**Since:** 1.2

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.

## Socket.setKeepAlive(boolean)

```java
public void setKeepAlive(boolean on) throws SocketException
```

Enable/disable SO_KEEPALIVE.

Parameters:

- `on`: whether or not to have socket keep alive turned on.

**Since:** 1.3

**See also:** #getKeepAlive()

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.

## Socket.getKeepAlive()

```java
public boolean getKeepAlive() throws SocketException
```

Tests if SO_KEEPALIVE is enabled.

**Returns:** a `boolean` indicating whether or not
        `SO_KEEPALIVE` is enabled.

**Since:** 1.3

**See also:** #setKeepAlive(boolean)

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.
