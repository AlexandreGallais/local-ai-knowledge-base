---
title: "Socket class (java.net) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/Socket.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Socket class (java.net)

```java
public class Socket implements java.io.Closeable
```

This class implements client sockets (also called just
"sockets"). A socket is an endpoint for communication
between two machines.

The actual work of the socket is performed by an instance of the
`SocketImpl` class.

 The `Socket` class defines convenience
methods to set and get several socket options. This class also
defines the Object) setOption
and getOption methods to set
and query socket options.
A `Socket` support the following options:

Socket options

    Option Name
    Description

     SO_SNDBUF
     The size of the socket send buffer

     SO_RCVBUF
     The size of the socket receive buffer

     SO_KEEPALIVE
     Keep connection alive

     SO_REUSEADDR
     Re-use address

     SO_LINGER
     Linger on close if data is present (when configured in blocking mode
         only)

     TCP_NODELAY
     Disable the Nagle algorithm

Additional (implementation specific) options may also be supported.

**See also:** java.net.SocketImpl

**See also:** java.nio.channels.SocketChannel

**Since:** 1.0

## Socket.Socket()

```java
public Socket()
```

Creates an unconnected Socket.

If the application has specified a client socket implementation factory, that factory's
createSocketImpl
method is called to create the actual socket implementation. Otherwise
a system-default socket implementation is created.

**Since:** 1.1

## Socket.Socket(Proxy)

```java
public Socket(Proxy proxy)
```

Creates an unconnected socket, specifying the type of proxy, if any,
that should be used regardless of any other settings.

Examples:

- `Socket s = new Socket(Proxy.NO_PROXY);` will create
a plain socket ignoring any other proxy configuration.

- `Socket s = new Socket(new Proxy(Proxy.Type.SOCKS, new InetSocketAddress("socks.mydom.com", 1080)));`
will create a socket connecting through the specified SOCKS proxy
server.

Parameters:

- `proxy`: a Proxy object specifying what kind of proxying should be used.

**See also:** java.net.ProxySelector

**See also:** java.net.Proxy

**Since:** 1.5

Throws:

- `IllegalArgumentException`: if the proxy is of an invalid type or `null`.

## Socket.Socket(SocketImpl)

```java
protected Socket(SocketImpl impl) throws SocketException
```

Creates an unconnected Socket with a user-specified
SocketImpl.

Parameters:

- `impl`: an instance of a **SocketImpl** the subclass wishes to use on the Socket.

**Since:** 1.1

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error.

## Socket.Socket(String, int)

```java
public Socket(String host, int port) throws UnknownHostException, IOException
```

Creates a stream socket and connects it to the specified port
number on the named host.

If the specified host is `null` it is the equivalent of
specifying the address as
InetAddress.getByName`(null)`.
In other words, it is equivalent to specifying an address of the
loopback interface.

If the application has specified a client socket implementation factory, that factory's
createSocketImpl
method is called to create the actual socket implementation. Otherwise
a system-default socket implementation is created.

Parameters:

- `host`: the host name, or `null` for the loopback address.
- `port`: the port number.

Throws:

- `UnknownHostException`: if the IP address of the host could not be determined.
- `IOException`: if an I/O error occurs when creating the socket.
- `IllegalArgumentException`: if the port parameter is outside the specified range of valid port values, which is between 0 and 65535, inclusive.

## Socket.Socket(InetAddress, int)

```java
public Socket(InetAddress address, int port) throws IOException
```

Creates a stream socket and connects it to the specified port
number at the specified IP address.

If the application has specified a client socket implementation factory, that factory's
createSocketImpl
method is called to create the actual socket implementation. Otherwise
a system-default socket implementation is created.

Parameters:

- `address`: the IP address.
- `port`: the port number.

Throws:

- `IOException`: if an I/O error occurs when creating the socket.
- `IllegalArgumentException`: if the port parameter is outside the specified range of valid port values, which is between 0 and 65535, inclusive.
- `NullPointerException`: if `address` is null.

## Socket.Socket(String, int, InetAddress, int)

```java
public Socket(String host, int port, InetAddress localAddr, int localPort) throws IOException
```

Creates a socket and connects it to the specified remote host on
the specified remote port. The Socket will also bind() to the local
address and port supplied.

If the specified host is `null` it is the equivalent of
specifying the address as
InetAddress.getByName`(null)`.
In other words, it is equivalent to specifying an address of the
loopback interface.

A local port number of `zero` will let the system pick up a
free port in the `bind` operation.

Parameters:

- `host`: the name of the remote host, or `null` for the loopback address.
- `port`: the remote port
- `localAddr`: the local address the socket is bound to, or `null` for the `anyLocal` address.
- `localPort`: the local port the socket is bound to, or `zero` for a system selected free port.

**Since:** 1.1

Throws:

- `IOException`: if an I/O error occurs when creating the socket.
- `IllegalArgumentException`: if the port parameter or localPort parameter is outside the specified range of valid port values, which is between 0 and 65535, inclusive.

## Socket.Socket(InetAddress, int, InetAddress, int)

```java
public Socket(InetAddress address, int port, InetAddress localAddr, int localPort) throws IOException
```

Creates a socket and connects it to the specified remote address on
the specified remote port. The Socket will also bind() to the local
address and port supplied.

If the specified local address is `null` it is the equivalent of
specifying the address as the AnyLocal address
(see InetAddress.isAnyLocalAddress`()`).

A local port number of `zero` will let the system pick up a
free port in the `bind` operation.

Parameters:

- `address`: the remote address
- `port`: the remote port
- `localAddr`: the local address the socket is bound to, or `null` for the `anyLocal` address.
- `localPort`: the local port the socket is bound to or `zero` for a system selected free port.

**Since:** 1.1

Throws:

- `IOException`: if an I/O error occurs when creating the socket.
- `IllegalArgumentException`: if the port parameter or localPort parameter is outside the specified range of valid port values, which is between 0 and 65535, inclusive.
- `NullPointerException`: if `address` is null.

## Socket.Socket(String, int, boolean)

```java
public Socket(String host, int port, boolean stream) throws IOException
```

Creates a stream socket and connects it to the specified port
number on the named host.

If the specified host is `null` it is the equivalent of
specifying the address as
InetAddress.getByName`(null)`.
In other words, it is equivalent to specifying an address of the
loopback interface.

If the application has specified a client socket implementation factory, that factory's
createSocketImpl
method is called to create the actual socket implementation. Otherwise
a system-default socket implementation is created.

Parameters:

- `host`: the host name, or `null` for the loopback address.
- `port`: the port number.
- `stream`: must be true, false is not allowed.

**Deprecated:** The `stream` parameter provided a way in early JDK releases
            to create a `Socket` that used a datagram socket. This feature
            no longer exists. Instead use `DatagramSocket` for datagram sockets.

Throws:

- `IOException`: if an I/O error occurs when creating the socket.
- `IllegalArgumentException`: if the stream parameter is `false` or if the port parameter is outside the specified range of valid port values, which is between 0 and 65535, inclusive.

## Socket.Socket(InetAddress, int, boolean)

```java
public Socket(InetAddress host, int port, boolean stream) throws IOException
```

Creates a socket and connects it to the specified port number at
the specified IP address.

If the application has specified a client socket implementation factory, that factory's
createSocketImpl
method is called to create the actual socket implementation. Otherwise
a system-default socket implementation is created.

Parameters:

- `host`: the IP address.
- `port`: the port number.
- `stream`: must be true, false is not allowed.

**Deprecated:** The `stream` parameter provided a way in early JDK releases
            to create a `Socket` that used a datagram socket. This feature
            no longer exists. Instead use `DatagramSocket` for datagram sockets.

Throws:

- `IOException`: if an I/O error occurs when creating the socket.
- `IllegalArgumentException`: if the stream parameter is `false` or if the port parameter is outside the specified range of valid port values, which is between 0 and 65535, inclusive.
- `NullPointerException`: if `host` is null.

## Socket.connect(SocketAddress)

```java
public void connect(SocketAddress endpoint) throws IOException
```

Connects this socket to the server.

 If the connection cannot be established, then the socket is closed,
and an `IOException` is thrown.

 This method is interruptible in the
following circumstances:

-  The socket is associated with
       a SocketChannel.
       In that case, interrupting a thread establishing a connection will
       close the underlying channel and cause this method to throw
       `ClosedByInterruptException` with the interrupt status set.

-  The socket uses the system-default socket implementation and a
       virtual thread is establishing a
       connection. In that case, interrupting the virtual thread will
       cause it to wakeup and close the socket. This method will then throw
       `SocketException` with the interrupt status set.

Parameters:

- `endpoint`: the `SocketAddress`

**Since:** 1.4

Throws:

- `IOException`: if an error occurs during the connection, the socket is already connected or the socket is closed
- `UnknownHostException`: if the connection could not be established because the endpoint is an unresolved `InetSocketAddress`
- `java.nio.channels.IllegalBlockingModeException`: if this socket has an associated channel, and the channel is in non-blocking mode
- `IllegalArgumentException`: if endpoint is null or is a SocketAddress subclass not supported by this socket

## Socket.connect(SocketAddress, int)

```java
public void connect(SocketAddress endpoint, int timeout) throws IOException
```

Connects this socket to the server with a specified timeout value.
A timeout of zero is interpreted as an infinite timeout. The connection
will then block until established or an error occurs.

 If the connection cannot be established, or the timeout expires
before the connection is established, then the socket is closed, and an
`IOException` is thrown.

 This method is interruptible in the
following circumstances:

-  The socket is associated with
       a SocketChannel.
       In that case, interrupting a thread establishing a connection will
       close the underlying channel and cause this method to throw
       `ClosedByInterruptException` with the interrupt status set.

-  The socket uses the system-default socket implementation and a
       virtual thread is establishing a
       connection. In that case, interrupting the virtual thread will
       cause it to wakeup and close the socket. This method will then throw
       `SocketException` with the interrupt status set.

Parameters:

- `endpoint`: the `SocketAddress`
- `timeout`: the timeout value to be used in milliseconds.

**Since:** 1.4

Throws:

- `IOException`: if an error occurs during the connection, the socket is already connected or the socket is closed
- `SocketTimeoutException`: if timeout expires before connecting
- `UnknownHostException`: if the connection could not be established because the endpoint is an unresolved `InetSocketAddress`
- `java.nio.channels.IllegalBlockingModeException`: if this socket has an associated channel, and the channel is in non-blocking mode
- `IllegalArgumentException`: if endpoint is null or is a SocketAddress subclass not supported by this socket, or if `timeout` is negative

## Socket.bind(SocketAddress)

```java
public void bind(SocketAddress bindpoint) throws IOException
```

Binds the socket to a local address.

If the address is `null`, then the system will pick up
an ephemeral port and a valid local address to bind the socket.

Parameters:

- `bindpoint`: the `SocketAddress` to bind to

**Since:** 1.4

**See also:** #isBound()

Throws:

- `IOException`: if the bind operation fails, the socket is already bound or the socket is closed.
- `IllegalArgumentException`: if bindpoint is a SocketAddress subclass not supported by this socket

## Socket.getInetAddress()

```java
public InetAddress getInetAddress()
```

Returns the address to which the socket is connected.

If the socket was connected prior to being closed,
then this method will continue to return the connected address
after the socket is closed.

**Returns:** the remote IP address to which this socket is connected,
         or `null` if the socket is not connected.

## Socket.getLocalAddress()

```java
public InetAddress getLocalAddress()
```

Gets the local address to which the socket is bound.

**Returns:** the local address to which the socket is bound, or
        the wildcard address if the socket is closed or not bound yet.

**Since:** 1.1

## Socket.getPort()

```java
public int getPort()
```

Returns the remote port number to which this socket is connected.

If the socket was connected prior to being closed,
then this method will continue to return the connected port number
after the socket is closed.

**Returns:** the remote port number to which this socket is connected, or
         0 if the socket is not connected yet.

## Socket.getLocalPort()

```java
public int getLocalPort()
```

Returns the local port number to which this socket is bound.

If the socket was bound prior to being closed,
then this method will continue to return the local port number
after the socket is closed.

**Returns:** the local port number to which this socket is bound or -1
         if the socket is not bound yet.
