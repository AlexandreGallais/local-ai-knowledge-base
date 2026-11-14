# ServerSocket class (java.net)

```java
public class ServerSocket implements java.io.Closeable
```

This class implements server sockets. A server socket waits for
requests to come in over the network. It performs some operation
based on that request, and then possibly returns a result to the requester.
<p>
The actual work of the server socket is performed by an instance
of the {@code SocketImpl} class.

<p> The {@code ServerSocket} class defines convenience
methods to set and get several socket options. This class also
defines the {@link #setOption(SocketOption, Object) setOption}
and {@link #getOption(SocketOption) getOption} methods to set
and query socket options.
A {@code ServerSocket} supports the following options:
<blockquote>
<table class="striped">
<caption style="display:none">Socket options</caption>
<thead>
  <tr>
    <th scope="col">Option Name</th>
    <th scope="col">Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <th scope="row"> {@link java.net.StandardSocketOptions#SO_RCVBUF SO_RCVBUF} </th>
    <td> The size of the socket receive buffer </td>
  </tr>
  <tr>
    <th scope="row"> {@link java.net.StandardSocketOptions#SO_REUSEADDR SO_REUSEADDR} </th>
    <td> Re-use address </td>
  </tr>
</tbody>
</table>
</blockquote>
Additional (implementation specific) options may also be supported.

@see     java.net.SocketImpl
@see     java.nio.channels.ServerSocketChannel
@since   1.0

## ServerSocket.ServerSocket(SocketImpl)

```java
protected ServerSocket(SocketImpl impl)
```

Creates a server socket with a user-specified {@code SocketImpl}.

@param      impl an instance of a SocketImpl to use on the ServerSocket.

@throws     NullPointerException if impl is {@code null}.

@since 12

## ServerSocket.ServerSocket()

```java
public ServerSocket() throws IOException
```

Creates an unbound server socket.

@throws    IOException IO error when opening the socket.

## ServerSocket.ServerSocket(int)

```java
public ServerSocket(int port) throws IOException
```

Creates a server socket, bound to the specified port. A port number
of {@code 0} means that the port number is automatically
allocated, typically from an ephemeral port range. This port
number can then be retrieved by calling {@link #getLocalPort getLocalPort}.
<p>
The maximum queue length for incoming connection indications (a
request to connect) is set to {@code 50}. If a connection
indication arrives when the queue is full, the connection is refused.
<p>
If the application has specified a {@linkplain SocketImplFactory server
socket implementation factory}, that factory's
{@linkplain SocketImplFactory#createSocketImpl() createSocketImpl} method
is called to create the actual socket implementation. Otherwise a system-default
socket implementation is created.

@param      port  the port number, or {@code 0} to use a port
                  number that is automatically allocated.

@throws     IOException  if an I/O error occurs when opening the socket.
@throws     IllegalArgumentException if the port parameter is outside
            the specified range of valid port values, which is between
            0 and 65535, inclusive.

## ServerSocket.ServerSocket(int, int)

```java
public ServerSocket(int port, int backlog) throws IOException
```

Creates a server socket and binds it to the specified local port
number, with the specified backlog.
A port number of {@code 0} means that the port number is
automatically allocated, typically from an ephemeral port range.
This port number can then be retrieved by calling
{@link #getLocalPort getLocalPort}.
<p>
The maximum queue length for incoming connection indications (a
request to connect) is set to the {@code backlog} parameter. If
a connection indication arrives when the queue is full, the
connection is refused.
<p>
If the application has specified a {@linkplain SocketImplFactory server
socket implementation factory}, that factory's
{@linkplain SocketImplFactory#createSocketImpl() createSocketImpl} method
is called to create the actual socket implementation. Otherwise a system-default
socket implementation is created.

The {@code backlog} argument is the requested maximum number of
pending connections on the socket. Its exact semantics are implementation
specific. In particular, an implementation may impose a maximum length
or may choose to ignore the parameter altogether. The value provided
should be greater than {@code 0}. If it is less than or equal to
{@code 0}, then an implementation specific default will be used.

@param      port     the port number, or {@code 0} to use a port
                     number that is automatically allocated.
@param      backlog  requested maximum length of the queue of incoming
                     connections.

@throws     IOException  if an I/O error occurs when opening the socket.
@throws     IllegalArgumentException if the port parameter is outside
            the specified range of valid port values, which is between
            0 and 65535, inclusive.

## ServerSocket.ServerSocket(int, int, InetAddress)

```java
public ServerSocket(int port, int backlog, InetAddress bindAddr) throws IOException
```

Create a server with the specified port, listen backlog, and
local IP address to bind to.  The <i>bindAddr</i> argument
can be used on a multi-homed host for a ServerSocket that
will only accept connect requests to one of its addresses.
If <i>bindAddr</i> is null, it will default accepting
connections on any/all local addresses.
The port must be between 0 and 65535, inclusive.
A port number of {@code 0} means that the port number is
automatically allocated, typically from an ephemeral port range.
This port number can then be retrieved by calling
{@link #getLocalPort getLocalPort}.

The {@code backlog} argument is the requested maximum number of
pending connections on the socket. Its exact semantics are implementation
specific. In particular, an implementation may impose a maximum length
or may choose to ignore the parameter altogether. The value provided
should be greater than {@code 0}. If it is less than or equal to
{@code 0}, then an implementation specific default will be used.

@param port  the port number, or {@code 0} to use a port
             number that is automatically allocated.
@param backlog requested maximum length of the queue of incoming
               connections.
@param bindAddr the local InetAddress the server will bind to

@throws  IOException if an I/O error occurs when opening the socket.
@throws     IllegalArgumentException if the port parameter is outside
            the specified range of valid port values, which is between
            0 and 65535, inclusive.
@since   1.1

## ServerSocket.bind(SocketAddress)

```java
public void bind(SocketAddress endpoint) throws IOException
```

Binds the {@code ServerSocket} to a specific address
(IP address and port number).
<p>
If the address is {@code null}, then the system will pick up
an ephemeral port and a valid local address to bind the socket.

@param   endpoint        The IP address and port number to bind to.
@throws  IOException if the bind operation fails, the socket
                     is already bound or the socket is closed.
@throws  IllegalArgumentException if endpoint is a
         SocketAddress subclass not supported by this socket
@since 1.4

## ServerSocket.bind(SocketAddress, int)

```java
public void bind(SocketAddress endpoint, int backlog) throws IOException
```

Binds the {@code ServerSocket} to a specific address
(IP address and port number).
<p>
If the address is {@code null}, then the system will pick up
an ephemeral port and a valid local address to bind the socket.
<P>
The {@code backlog} argument is the requested maximum number of
pending connections on the socket. Its exact semantics are implementation
specific. In particular, an implementation may impose a maximum length
or may choose to ignore the parameter altogether. The value provided
should be greater than {@code 0}. If it is less than or equal to
{@code 0}, then an implementation specific default will be used.
@param   endpoint        The IP address and port number to bind to.
@param   backlog         requested maximum length of the queue of
                         incoming connections.
@throws  IOException if the bind operation fails, the socket
                     is already bound or the socket is closed.
@throws  IllegalArgumentException if endpoint is a
         SocketAddress subclass not supported by this socket
@since 1.4

## ServerSocket.getInetAddress()

```java
public InetAddress getInetAddress()
```

Returns the local address of this server socket.
<p>
If the socket was bound prior to being {@link #close closed},
then this method will continue to return the local address
after the socket is closed.

@return  the address to which this socket is bound,
         or {@code null} if the socket is unbound.

## ServerSocket.getLocalPort()

```java
public int getLocalPort()
```

Returns the port number on which this socket is listening.
<p>
If the socket was bound prior to being {@link #close closed},
then this method will continue to return the port number
after the socket is closed.

@return  the port number to which this socket is listening or
         -1 if the socket is not bound yet.

## ServerSocket.getLocalSocketAddress()

```java
public SocketAddress getLocalSocketAddress()
```

Returns the address of the endpoint this socket is bound to.
<p>
If the socket was bound prior to being {@link #close closed},
then this method will continue to return the address of the endpoint
after the socket is closed.

@return a {@code SocketAddress} representing the local endpoint of
        this socket, or {@code null} if the socket is not bound yet.

@see #getInetAddress()
@see #getLocalPort()
@see #bind(SocketAddress)
@since 1.4

## ServerSocket.accept()

```java
public Socket accept() throws IOException
```

Listens for a connection to be made to this socket and accepts
it. The method blocks until a connection is made.

<p> This method is {@linkplain Thread#interrupt() interruptible} in the
following circumstances:
<ol>
  <li> The socket is {@linkplain ServerSocketChannel#socket() associated}
       with a {@link ServerSocketChannel ServerSocketChannel}. In that
       case, interrupting a thread accepting a connection will close the
       underlying channel and cause this method to throw {@link
       java.nio.channels.ClosedByInterruptException} with the interrupt
       status set.
  <li> The socket uses the system-default socket implementation and a
       {@linkplain Thread#isVirtual() virtual thread} is accepting a
       connection. In that case, interrupting the virtual thread will
       cause it to wakeup and close the socket. This method will then throw
       {@code SocketException} with the interrupt status set.
</ol>

@implNote
An instance of this class using a system-default {@code SocketImpl}
accepts sockets with a {@code SocketImpl} of the same type, regardless
of the {@linkplain Socket#setSocketImplFactory(SocketImplFactory)
client socket implementation factory}, if one has been set.

@throws     IOException  if an I/O error occurs when waiting for a
              connection, the socket is not bound or the socket is closed.
@throws     SocketTimeoutException if a timeout was previously set with setSoTimeout and
            the timeout has been reached.
@throws     java.nio.channels.IllegalBlockingModeException
            if this socket has an associated channel, the channel is in
            non-blocking mode, and there is no connection ready to be
            accepted

@return the new Socket

## ServerSocket.implAccept(Socket)

```java
protected final void implAccept(Socket s) throws IOException
```

Subclasses of ServerSocket use this method to override accept()
to return their own subclass of socket.  So a FooServerSocket
will typically hand this method a newly created, unbound, FooSocket.
On return from implAccept the FooSocket will be connected to a client.

<p> The behavior of this method is unspecified when invoked with a
socket that is not newly created and unbound. Any socket options set
on the given socket prior to invoking this method may or may not be
preserved when the connection is accepted. It may not be possible to
accept a connection when this socket has a {@code SocketImpl} of one
type and the given socket has a {@code SocketImpl} of a completely
different type.

@implNote
An instance of this class using a system-default {@code SocketImpl}
can accept a connection with a Socket using a {@code SocketImpl} of
the same type: {@code IOException} is thrown if the Socket is using
a custom {@code SocketImpl}. An instance of this class using a
custom {@code SocketImpl} cannot accept a connection with a Socket
using a system-default {@code SocketImpl}.

@param s the Socket
@throws java.nio.channels.IllegalBlockingModeException
        if this socket has an associated channel,
        and the channel is in non-blocking mode
@throws IOException if an I/O error occurs when waiting
        for a connection, or if it is not possible for this socket
        to accept a connection with the given socket

@since   1.1

## ServerSocket.close()

```java
public void close() throws IOException
```

Closes this socket.

Any thread currently blocked in {@link #accept()} will throw
a {@link SocketException}.

<p> If this socket has an associated channel then the channel is closed
as well.

<p> Once closed, several of the methods defined by this class will throw
an exception if invoked on the closed socket.

@throws     IOException  if an I/O error occurs when closing the socket.

## ServerSocket.getChannel()

```java
public ServerSocketChannel getChannel()
```

Returns the unique {@link java.nio.channels.ServerSocketChannel} object
associated with this socket, if any.

<p> A server socket will have a channel if, and only if, the channel
itself was created via the {@link
java.nio.channels.ServerSocketChannel#open ServerSocketChannel.open}
method.

@return  the server-socket channel associated with this socket,
         or {@code null} if this socket was not created
         for a channel

@since 1.4

## ServerSocket.isBound()

```java
public boolean isBound()
```

Returns the binding state of the ServerSocket.
<p>
If the socket was bound prior to being {@linkplain #close closed},
then this method will continue to return {@code true}
after the socket is closed.

@return true if the ServerSocket successfully bound to an address
@since 1.4

## ServerSocket.isClosed()

```java
public boolean isClosed()
```

Returns the closed state of the ServerSocket.

@return true if the socket has been closed
@since 1.4

## ServerSocket.setSoTimeout(int)

```java
public void setSoTimeout(int timeout) throws SocketException
```

Enable/disable {@link SocketOptions#SO_TIMEOUT SO_TIMEOUT} with the
specified timeout, in milliseconds.  With this option set to a positive
timeout value, a call to accept() for this ServerSocket
will block for only this amount of time.  If the timeout expires,
a {@link java.net.SocketTimeoutException} is raised, though the
ServerSocket is still valid. A timeout of zero is interpreted as an
infinite timeout.
The option <B>must</B> be enabled prior to entering the blocking
operation to have effect.

@param timeout the specified timeout, in milliseconds
@throws SocketException if there is an error in the underlying protocol,
        such as a TCP error, or the socket is closed.
@throws  IllegalArgumentException  if {@code timeout} is negative
@since   1.1
@see #getSoTimeout()

## ServerSocket.getSoTimeout()

```java
public int getSoTimeout() throws IOException
```

Retrieve setting for {@link SocketOptions#SO_TIMEOUT SO_TIMEOUT}.
0 returns implies that the option is disabled (i.e., timeout of infinity).
@return the {@link SocketOptions#SO_TIMEOUT SO_TIMEOUT} value
@throws IOException if an I/O error occurs or the socket is closed.
@since   1.1
@see #setSoTimeout(int)

## ServerSocket.setReuseAddress(boolean)

```java
public void setReuseAddress(boolean on) throws SocketException
```

Enable/disable the {@link StandardSocketOptions#SO_REUSEADDR SO_REUSEADDR}
socket option.
<p>
When a TCP connection is closed the connection may remain
in a timeout state for a period of time after the connection
is closed (typically known as the {@code TIME_WAIT} state
or {@code 2MSL} wait state).
For applications using a well known socket address or port
it may not be possible to bind a socket to the required
{@code SocketAddress} if there is a connection in the
timeout state involving the socket address or port.
<p>
Enabling {@code SO_REUSEADDR} prior to binding the socket using
{@link #bind(SocketAddress)} allows the socket to be bound even
though a previous connection is in a timeout state.
<p>
When a {@code ServerSocket} is created the initial setting
of {@code SO_REUSEADDR} is not defined. Applications can use
{@link #getReuseAddress()} to determine the initial
setting of {@code SO_REUSEADDR}.
<p>
The behaviour when {@code SO_REUSEADDR} is enabled or disabled
after a socket is bound (See {@link #isBound()})
is not defined.

@param on  whether to enable or disable the socket option
@throws    SocketException if an error occurs enabling or
           disabling the {@code SO_REUSEADDR}
           socket option, or the socket is closed.
@since 1.4
@see #getReuseAddress()
@see #bind(SocketAddress)
@see #isBound()
@see #isClosed()

## ServerSocket.getReuseAddress()

```java
public boolean getReuseAddress() throws SocketException
```

Tests if {@link StandardSocketOptions#SO_REUSEADDR SO_REUSEADDR} is enabled.

@return a {@code boolean} indicating whether or not
        {@code SO_REUSEADDR} is enabled.
@throws SocketException if there is an error in the underlying protocol, such as a TCP error,
        or the socket is closed.
@since   1.4
@see #setReuseAddress(boolean)

## ServerSocket.toString()

```java
public String toString()
```

Returns the implementation address and implementation port of
this socket as a {@code String}.

@return  a string representation of this socket.

## ServerSocket.setSocketFactory(SocketImplFactory)

```java
public static synchronized void setSocketFactory(SocketImplFactory fac) throws IOException
```

Sets the server socket implementation factory for the
application. The factory can be specified only once.
<p>
When an application creates a new server socket, the socket
implementation factory's {@code createSocketImpl} method is
called to create the actual socket implementation.
<p>
Passing {@code null} to the method is a no-op unless the factory
was already set.

@param      fac   the desired factory.
@throws     IOException  if an I/O error occurs when setting the
              socket factory.
@throws     SocketException  if the factory has already been defined.
@see        java.net.SocketImplFactory#createSocketImpl()
@deprecated Use a {@link javax.net.ServerSocketFactory} and subclass {@code ServerSocket}
   directly.
   <br> This method provided a way in early JDK releases to replace the
   system wide implementation of {@code ServerSocket}. It has been mostly
   obsolete since Java 1.4. If required, a {@code ServerSocket} can be
   created to use a custom implementation by extending {@code ServerSocket}
   and using the {@linkplain #ServerSocket(SocketImpl) protected
   constructor} that takes an {@linkplain SocketImpl implementation}
   as a parameter.

## ServerSocket.setReceiveBufferSize(int)

```java
public void setReceiveBufferSize(int size) throws SocketException
```

Sets a default proposed value for the
{@link StandardSocketOptions#SO_RCVBUF SO_RCVBUF} option for sockets
accepted from this {@code ServerSocket}. The value actually set
in the accepted socket must be determined by calling
{@link Socket#getReceiveBufferSize()} after the socket
is returned by {@link #accept()}.
<p>
The value of {@code SO_RCVBUF} is used both to set the size of
the internal socket receive buffer, and to set the size
of the TCP receive window that is advertised to the remote peer.
<p>
It is possible to change the value subsequently, by calling
{@link Socket#setReceiveBufferSize(int)}. However, if the application
wishes to allow a receive window larger than 64K bytes, as defined by RFC1323
then the proposed value must be set in the ServerSocket <B>before</B>
it is bound to a local address. This implies, that the ServerSocket must be
created with the no-argument constructor, then setReceiveBufferSize() must
be called and lastly the ServerSocket is bound to an address by calling bind().
<p>
Failure to do this will not cause an error, and the buffer size may be set to the
requested value but the TCP receive window in sockets accepted from
this ServerSocket will be no larger than 64K bytes.

@throws SocketException if there is an error in the underlying protocol,
        such as a TCP error, or the socket is closed.

@param size the size to which to set the receive buffer
size. This value must be greater than 0.

@throws    IllegalArgumentException if the
value is 0 or is negative.

@since 1.4
@see #getReceiveBufferSize

## ServerSocket.getReceiveBufferSize()

```java
public int getReceiveBufferSize() throws SocketException
```

Gets the value of the {@link StandardSocketOptions#SO_RCVBUF SO_RCVBUF} option
for this {@code ServerSocket}, that is the proposed buffer size that
will be used for Sockets accepted from this {@code ServerSocket}.

<p>Note, the value actually set in the accepted socket is determined by
calling {@link Socket#getReceiveBufferSize()}.
@return the value of the {@code SO_RCVBUF} option for this {@code Socket}.
@throws SocketException if there is an error in the underlying protocol,
        such as a TCP error, or the socket is closed.
@see #setReceiveBufferSize(int)
@since 1.4

## ServerSocket.setPerformancePreferences(int, int, int)

```java
public void setPerformancePreferences(int connectionTime, int latency, int bandwidth)
```

Sets performance preferences for this ServerSocket.

<p> Sockets use the TCP/IP protocol by default.  Some implementations
may offer alternative protocols which have different performance
characteristics than TCP/IP.  This method allows the application to
express its own preferences as to how these tradeoffs should be made
when the implementation chooses from the available protocols.

<p> Performance preferences are described by three integers
whose values indicate the relative importance of short connection time,
low latency, and high bandwidth.  The absolute values of the integers
are irrelevant; in order to choose a protocol the values are simply
compared, with larger values indicating stronger preferences.  If the
application prefers short connection time over both low latency and high
bandwidth, for example, then it could invoke this method with the values
{@code (1, 0, 0)}.  If the application prefers high bandwidth above low
latency, and low latency above short connection time, then it could
invoke this method with the values {@code (0, 1, 2)}.

<p> Invoking this method after this socket has been bound
will have no effect. This implies that in order to use this capability
requires the socket to be created with the no-argument constructor.

@param  connectionTime
        An {@code int} expressing the relative importance of a short
        connection time

@param  latency
        An {@code int} expressing the relative importance of low
        latency

@param  bandwidth
        An {@code int} expressing the relative importance of high
        bandwidth

@since 1.5

## ServerSocket.setOption(SocketOption<T>, T)

```java
public <T> ServerSocket setOption(SocketOption<T> name, T value) throws IOException
```

Sets the value of a socket option.

@param <T> The type of the socket option value
@param name The socket option
@param value The value of the socket option. A value of {@code null}
             may be valid for some options.
@return this ServerSocket

@throws UnsupportedOperationException if the server socket does not
        support the option.

@throws IllegalArgumentException if the value is not valid for
        the option.

@throws IOException if an I/O error occurs, or if the socket is closed.

@throws NullPointerException if name is {@code null}

@since 9

## ServerSocket.getOption(SocketOption<T>)

```java
public <T> T getOption(SocketOption<T> name) throws IOException
```

Returns the value of a socket option.

@param <T> The type of the socket option value
@param name The socket option

@return The value of the socket option.

@throws UnsupportedOperationException if the server socket does not
        support the option.

@throws IOException if an I/O error occurs, or if the socket is closed.

@throws NullPointerException if name is {@code null}

@since 9

## ServerSocket.supportedOptions()

```java
public Set<SocketOption<?>> supportedOptions()
```

Returns a set of the socket options supported by this server socket.

This method will continue to return the set of options even after
the socket has been closed.

@return A set of the socket options supported by this socket. This set
        may be empty if the socket's SocketImpl cannot be created.

@since 9