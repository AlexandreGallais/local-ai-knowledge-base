---
title: "ServerSocket class (java.net) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/ServerSocket.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ServerSocket class (java.net)

```java
public class ServerSocket implements java.io.Closeable
```

This class implements server sockets. A server socket waits for
requests to come in over the network. It performs some operation
based on that request, and then possibly returns a result to the requester.

The actual work of the server socket is performed by an instance
of the `SocketImpl` class.

 The `ServerSocket` class defines convenience
methods to set and get several socket options. This class also
defines the Object) setOption
and getOption methods to set
and query socket options.
A `ServerSocket` supports the following options:

Socket options

    Option Name
    Description

     SO_RCVBUF
     The size of the socket receive buffer

     SO_REUSEADDR
     Re-use address

Additional (implementation specific) options may also be supported.

**See also:** java.net.SocketImpl

**See also:** java.nio.channels.ServerSocketChannel

**Since:** 1.0

## ServerSocket.ServerSocket(SocketImpl)

```java
protected ServerSocket(SocketImpl impl)
```

Creates a server socket with a user-specified `SocketImpl`.

Parameters:

- `impl`: an instance of a SocketImpl to use on the ServerSocket.

**Since:** 12

Throws:

- `NullPointerException`: if impl is `null`.

## ServerSocket.ServerSocket()

```java
public ServerSocket() throws IOException
```

Creates an unbound server socket.

Throws:

- `IOException`: IO error when opening the socket.

## ServerSocket.ServerSocket(int)

```java
public ServerSocket(int port) throws IOException
```

Creates a server socket, bound to the specified port. A port number
of `0` means that the port number is automatically
allocated, typically from an ephemeral port range. This port
number can then be retrieved by calling getLocalPort.

The maximum queue length for incoming connection indications (a
request to connect) is set to `50`. If a connection
indication arrives when the queue is full, the connection is refused.

If the application has specified a server socket implementation factory, that factory's
createSocketImpl method
is called to create the actual socket implementation. Otherwise a system-default
socket implementation is created.

Parameters:

- `port`: the port number, or `0` to use a port number that is automatically allocated.

Throws:

- `IOException`: if an I/O error occurs when opening the socket.
- `IllegalArgumentException`: if the port parameter is outside the specified range of valid port values, which is between 0 and 65535, inclusive.

## ServerSocket.ServerSocket(int, int)

```java
public ServerSocket(int port, int backlog) throws IOException
```

Creates a server socket and binds it to the specified local port
number, with the specified backlog.
A port number of `0` means that the port number is
automatically allocated, typically from an ephemeral port range.
This port number can then be retrieved by calling
getLocalPort.

The maximum queue length for incoming connection indications (a
request to connect) is set to the `backlog` parameter. If
a connection indication arrives when the queue is full, the
connection is refused.

If the application has specified a server socket implementation factory, that factory's
createSocketImpl method
is called to create the actual socket implementation. Otherwise a system-default
socket implementation is created.

The `backlog` argument is the requested maximum number of
pending connections on the socket. Its exact semantics are implementation
specific. In particular, an implementation may impose a maximum length
or may choose to ignore the parameter altogether. The value provided
should be greater than `0`. If it is less than or equal to
`0`, then an implementation specific default will be used.

Parameters:

- `port`: the port number, or `0` to use a port number that is automatically allocated.
- `backlog`: requested maximum length of the queue of incoming connections.

Throws:

- `IOException`: if an I/O error occurs when opening the socket.
- `IllegalArgumentException`: if the port parameter is outside the specified range of valid port values, which is between 0 and 65535, inclusive.

## ServerSocket.ServerSocket(int, int, InetAddress)

```java
public ServerSocket(int port, int backlog, InetAddress bindAddr) throws IOException
```

Create a server with the specified port, listen backlog, and
local IP address to bind to.  The *bindAddr* argument
can be used on a multi-homed host for a ServerSocket that
will only accept connect requests to one of its addresses.
If *bindAddr* is null, it will default accepting
connections on any/all local addresses.
The port must be between 0 and 65535, inclusive.
A port number of `0` means that the port number is
automatically allocated, typically from an ephemeral port range.
This port number can then be retrieved by calling
getLocalPort.

The `backlog` argument is the requested maximum number of
pending connections on the socket. Its exact semantics are implementation
specific. In particular, an implementation may impose a maximum length
or may choose to ignore the parameter altogether. The value provided
should be greater than `0`. If it is less than or equal to
`0`, then an implementation specific default will be used.

Parameters:

- `port`: the port number, or `0` to use a port number that is automatically allocated.
- `backlog`: requested maximum length of the queue of incoming connections.
- `bindAddr`: the local InetAddress the server will bind to

**Since:** 1.1

Throws:

- `IOException`: if an I/O error occurs when opening the socket.
- `IllegalArgumentException`: if the port parameter is outside the specified range of valid port values, which is between 0 and 65535, inclusive.

## ServerSocket.bind(SocketAddress)

```java
public void bind(SocketAddress endpoint) throws IOException
```

Binds the `ServerSocket` to a specific address
(IP address and port number).

If the address is `null`, then the system will pick up
an ephemeral port and a valid local address to bind the socket.

Parameters:

- `endpoint`: The IP address and port number to bind to.

**Since:** 1.4

Throws:

- `IOException`: if the bind operation fails, the socket is already bound or the socket is closed.
- `IllegalArgumentException`: if endpoint is a SocketAddress subclass not supported by this socket

## ServerSocket.bind(SocketAddress, int)

```java
public void bind(SocketAddress endpoint, int backlog) throws IOException
```

Binds the `ServerSocket` to a specific address
(IP address and port number).

If the address is `null`, then the system will pick up
an ephemeral port and a valid local address to bind the socket.

The `backlog` argument is the requested maximum number of
pending connections on the socket. Its exact semantics are implementation
specific. In particular, an implementation may impose a maximum length
or may choose to ignore the parameter altogether. The value provided
should be greater than `0`. If it is less than or equal to
`0`, then an implementation specific default will be used.

Parameters:

- `endpoint`: The IP address and port number to bind to.
- `backlog`: requested maximum length of the queue of incoming connections.

**Since:** 1.4

Throws:

- `IOException`: if the bind operation fails, the socket is already bound or the socket is closed.
- `IllegalArgumentException`: if endpoint is a SocketAddress subclass not supported by this socket

## ServerSocket.getInetAddress()

```java
public InetAddress getInetAddress()
```

Returns the local address of this server socket.

If the socket was bound prior to being closed,
then this method will continue to return the local address
after the socket is closed.

**Returns:** the address to which this socket is bound,
         or `null` if the socket is unbound.

## ServerSocket.getLocalPort()

```java
public int getLocalPort()
```

Returns the port number on which this socket is listening.

If the socket was bound prior to being closed,
then this method will continue to return the port number
after the socket is closed.

**Returns:** the port number to which this socket is listening or
         -1 if the socket is not bound yet.

## ServerSocket.getLocalSocketAddress()

```java
public SocketAddress getLocalSocketAddress()
```

Returns the address of the endpoint this socket is bound to.

If the socket was bound prior to being closed,
then this method will continue to return the address of the endpoint
after the socket is closed.

**Returns:** a `SocketAddress` representing the local endpoint of
        this socket, or `null` if the socket is not bound yet.

**See also:** #getInetAddress()

**See also:** #getLocalPort()

**See also:** #bind(SocketAddress)

**Since:** 1.4

## ServerSocket.accept()

```java
public Socket accept() throws IOException
```

Listens for a connection to be made to this socket and accepts
it. The method blocks until a connection is made.

 This method is interruptible in the
following circumstances:

-  The socket is associated
       with a ServerSocketChannel. In that
       case, interrupting a thread accepting a connection will close the
       underlying channel and cause this method to throw `java.nio.channels.ClosedByInterruptException` with the interrupt
       status set.

-  The socket uses the system-default socket implementation and a
       virtual thread is accepting a
       connection. In that case, interrupting the virtual thread will
       cause it to wakeup and close the socket. This method will then throw
       `SocketException` with the interrupt status set.

**Implementation note:** An instance of this class using a system-default `SocketImpl`
accepts sockets with a `SocketImpl` of the same type, regardless
of the client socket implementation factory, if one has been set.

**Returns:** the new Socket

Throws:

- `IOException`: if an I/O error occurs when waiting for a connection, the socket is not bound or the socket is closed.
- `SocketTimeoutException`: if a timeout was previously set with setSoTimeout and the timeout has been reached.
- `java.nio.channels.IllegalBlockingModeException`: if this socket has an associated channel, the channel is in non-blocking mode, and there is no connection ready to be accepted

## ServerSocket.implAccept(Socket)

```java
protected final void implAccept(Socket s) throws IOException
```

Subclasses of ServerSocket use this method to override accept()
to return their own subclass of socket.  So a FooServerSocket
will typically hand this method a newly created, unbound, FooSocket.
On return from implAccept the FooSocket will be connected to a client.

 The behavior of this method is unspecified when invoked with a
socket that is not newly created and unbound. Any socket options set
on the given socket prior to invoking this method may or may not be
preserved when the connection is accepted. It may not be possible to
accept a connection when this socket has a `SocketImpl` of one
type and the given socket has a `SocketImpl` of a completely
different type.

Parameters:

- `s`: the Socket

**Implementation note:** An instance of this class using a system-default `SocketImpl`
can accept a connection with a Socket using a `SocketImpl` of
the same type: `IOException` is thrown if the Socket is using
a custom `SocketImpl`. An instance of this class using a
custom `SocketImpl` cannot accept a connection with a Socket
using a system-default `SocketImpl`.

**Since:** 1.1

Throws:

- `java.nio.channels.IllegalBlockingModeException`: if this socket has an associated channel, and the channel is in non-blocking mode
- `IOException`: if an I/O error occurs when waiting for a connection, or if it is not possible for this socket to accept a connection with the given socket

## ServerSocket.close()

```java
public void close() throws IOException
```

Closes this socket.

Any thread currently blocked in `accept()` will throw
a `SocketException`.

 If this socket has an associated channel then the channel is closed
as well.

 Once closed, several of the methods defined by this class will throw
an exception if invoked on the closed socket.

Throws:

- `IOException`: if an I/O error occurs when closing the socket.

## ServerSocket.getChannel()

```java
public ServerSocketChannel getChannel()
```

Returns the unique `java.nio.channels.ServerSocketChannel` object
associated with this socket, if any.

 A server socket will have a channel if, and only if, the channel
itself was created via the ServerSocketChannel.open
method.

**Returns:** the server-socket channel associated with this socket,
         or `null` if this socket was not created
         for a channel

**Since:** 1.4

## ServerSocket.isBound()

```java
public boolean isBound()
```

Returns the binding state of the ServerSocket.

If the socket was bound prior to being closed,
then this method will continue to return `true`
after the socket is closed.

**Returns:** true if the ServerSocket successfully bound to an address

**Since:** 1.4

## ServerSocket.isClosed()

```java
public boolean isClosed()
```

Returns the closed state of the ServerSocket.

**Returns:** true if the socket has been closed

**Since:** 1.4

## ServerSocket.setSoTimeout(int)

```java
public void setSoTimeout(int timeout) throws SocketException
```

Enable/disable SO_TIMEOUT with the
specified timeout, in milliseconds.  With this option set to a positive
timeout value, a call to accept() for this ServerSocket
will block for only this amount of time.  If the timeout expires,
a `java.net.SocketTimeoutException` is raised, though the
ServerSocket is still valid. A timeout of zero is interpreted as an
infinite timeout.
The option **must** be enabled prior to entering the blocking
operation to have effect.

Parameters:

- `timeout`: the specified timeout, in milliseconds

**Since:** 1.1

**See also:** #getSoTimeout()

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.
- `IllegalArgumentException`: if `timeout` is negative

## ServerSocket.getSoTimeout()

```java
public int getSoTimeout() throws IOException
```

Retrieve setting for SO_TIMEOUT.
0 returns implies that the option is disabled (i.e., timeout of infinity).

**Returns:** the SO_TIMEOUT value

**Since:** 1.1

**See also:** #setSoTimeout(int)

Throws:

- `IOException`: if an I/O error occurs or the socket is closed.
