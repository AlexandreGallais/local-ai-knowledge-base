---
title: "SocketImpl class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/SocketImpl.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SocketImpl class (java.net)

```java
public abstract class SocketImpl implements SocketOptions
```

The abstract class `SocketImpl` is a common superclass
of all classes that actually implement sockets. It is used to
create both client and server sockets.

**Since:** 1.0

## SocketImpl.fd

```java
protected FileDescriptor fd
```

The file descriptor object for this socket.

## SocketImpl.address

```java
protected InetAddress address
```

The IP address of the remote end of this socket.

## SocketImpl.port

```java
protected int port
```

The port number on the remote host to which this socket is connected.

## SocketImpl.localport

```java
protected int localport
```

The local port number to which this socket is connected.

## SocketImpl.SocketImpl()

```java
public SocketImpl()
```

Initialize a new instance of this class

## SocketImpl.create(boolean)

```java
protected abstract void create(boolean stream) throws IOException
```

Creates a stream socket.

Parameters:

- `stream`: must be `true`.

**API note:** The `stream` parameter provided a way in early JDK releases
to create a `Socket` that used a datagram socket.
The Socket API no longer provides a way to do this, so the
`create` method will always be called with a `stream`
value of `true`.

Throws:

- `IOException`: if an I/O error occurs while creating the socket.

## SocketImpl.connect(String, int)

```java
protected abstract void connect(String host, int port) throws IOException
```

Connects this socket to the specified port on the named host.

Parameters:

- `host`: the name of the remote host.
- `port`: the port number.

Throws:

- `IOException`: if an I/O error occurs when connecting to the remote host.

## SocketImpl.connect(InetAddress, int)

```java
protected abstract void connect(InetAddress address, int port) throws IOException
```

Connects this socket to the specified port number on the specified host.

Parameters:

- `address`: the IP address of the remote host.
- `port`: the port number.

Throws:

- `IOException`: if an I/O error occurs when attempting a connection.

## SocketImpl.connect(SocketAddress, int)

```java
protected abstract void connect(SocketAddress address, int timeout) throws IOException
```

Connects this socket to the specified port number on the specified host.
A timeout of zero is interpreted as an infinite timeout. The connection
will then block until established or an error occurs.

Parameters:

- `address`: the Socket address of the remote host.
- `timeout`: the timeout value, in milliseconds, or zero for no timeout.

**Since:** 1.4

Throws:

- `IOException`: if an I/O error occurs when attempting a connection.

## SocketImpl.bind(InetAddress, int)

```java
protected abstract void bind(InetAddress host, int port) throws IOException
```

Binds this socket to the specified local IP address and port number.

Parameters:

- `host`: an IP address that belongs to a local interface.
- `port`: the port number.

Throws:

- `IOException`: if an I/O error occurs when binding this socket.

## SocketImpl.listen(int)

```java
protected abstract void listen(int backlog) throws IOException
```

Sets the maximum queue length for incoming connection indications
(a request to connect) to the `count` argument. If a
connection indication arrives when the queue is full, the
connection is refused.

Parameters:

- `backlog`: the maximum length of the queue.

Throws:

- `IOException`: if an I/O error occurs when creating the queue.

## SocketImpl.accept(SocketImpl)

```java
protected abstract void accept(SocketImpl s) throws IOException
```

Accepts a connection.

Parameters:

- `s`: the accepted connection.

Throws:

- `IOException`: if an I/O error occurs when accepting the connection.

## SocketImpl.getInputStream()

```java
protected abstract InputStream getInputStream() throws IOException
```

Returns an input stream for this socket.

**Returns:** a stream for reading from this socket.

Throws:

- `IOException`: if an I/O error occurs when creating the input stream.

## SocketImpl.getOutputStream()

```java
protected abstract OutputStream getOutputStream() throws IOException
```

Returns an output stream for this socket.

**Returns:** an output stream for writing to this socket.

Throws:

- `IOException`: if an I/O error occurs when creating the output stream.

## SocketImpl.available()

```java
protected abstract int available() throws IOException
```

Returns the number of bytes that can be read from this socket
without blocking.

**Returns:** the number of bytes that can be read from this socket
            without blocking.

Throws:

- `IOException`: if an I/O error occurs when determining the number of bytes available.

## SocketImpl.close()

```java
protected abstract void close() throws IOException
```

Closes this socket.

Throws:

- `IOException`: if an I/O error occurs when closing this socket.

## SocketImpl.shutdownInput()

```java
protected void shutdownInput() throws IOException
```

Places the input stream for this socket at "end of stream".
Any data sent to this socket is acknowledged and then
silently discarded.

If you read from a socket input stream after invoking this method on the
socket, the stream's `available` method will return 0, and its
`read` methods will return `-1` (end of stream).

**See also:** java.net.Socket#shutdownOutput()

**See also:** java.net.Socket#close()

**See also:** java.net.Socket#setSoLinger(boolean, int)

**Since:** 1.3

Throws:

- `IOException`: if an I/O error occurs when shutting down this socket.

## SocketImpl.shutdownOutput()

```java
protected void shutdownOutput() throws IOException
```

Disables the output stream for this socket.
For a TCP socket, any previously written data will be sent
followed by TCP's normal connection termination sequence.

If you write to a socket output stream after invoking
shutdownOutput() on the socket, the stream will throw
an IOException.

**See also:** java.net.Socket#shutdownInput()

**See also:** java.net.Socket#close()

**See also:** java.net.Socket#setSoLinger(boolean, int)

**Since:** 1.3

Throws:

- `IOException`: if an I/O error occurs when shutting down this socket.

## SocketImpl.getFileDescriptor()

```java
protected FileDescriptor getFileDescriptor()
```

Returns the value of this socket's `fd` field.

**Returns:** the value of this socket's `fd` field.

**See also:** java.net.SocketImpl#fd

## SocketImpl.getInetAddress()

```java
protected InetAddress getInetAddress()
```

Returns the value of this socket's `address` field.

**Returns:** the value of this socket's `address` field.

**See also:** java.net.SocketImpl#address

## SocketImpl.getPort()

```java
protected int getPort()
```

Returns the value of this socket's `port` field.

**Returns:** the value of this socket's `port` field.

**See also:** java.net.SocketImpl#port

## SocketImpl.supportsUrgentData()

```java
protected boolean supportsUrgentData ()
```

Returns whether or not this SocketImpl supports sending
urgent data. By default, false is returned
unless the method is overridden in a sub-class

**Returns:** true if urgent data supported

**See also:** java.net.SocketImpl#address

**Since:** 1.4

## SocketImpl.sendUrgentData(int)

```java
protected abstract void sendUrgentData (int data) throws IOException
```

Send one byte of urgent data on the socket.
The byte to be sent is the low eight bits of the parameter

Parameters:

- `data`: The byte of data to send

**Since:** 1.4

Throws:

- `IOException`: if there is an error sending the data.

## SocketImpl.getLocalPort()

```java
protected int getLocalPort()
```

Returns the value of this socket's `localport` field.

**Returns:** the value of this socket's `localport` field.

**See also:** java.net.SocketImpl#localport

## SocketImpl.toString()

```java
public String toString()
```

Returns the address and port of this socket as a `String`.

**Returns:** a string representation of this socket.

## SocketImpl.setPerformancePreferences(int, int, int)

```java
protected void setPerformancePreferences(int connectionTime, int latency, int bandwidth)
```

Sets performance preferences for this socket.

 Sockets use the TCP/IP protocol by default.  Some implementations
may offer alternative protocols which have different performance
characteristics than TCP/IP.  This method allows the application to
express its own preferences as to how these tradeoffs should be made
when the implementation chooses from the available protocols.

 Performance preferences are described by three integers
whose values indicate the relative importance of short connection time,
low latency, and high bandwidth.  The absolute values of the integers
are irrelevant; in order to choose a protocol the values are simply
compared, with larger values indicating stronger preferences. Negative
values represent a lower priority than positive values. If the
application prefers short connection time over both low latency and high
bandwidth, for example, then it could invoke this method with the values
`(1, 0, 0)`.  If the application prefers high bandwidth above low
latency, and low latency above short connection time, then it could
invoke this method with the values `(0, 1, 2)`.

By default, this method does nothing, unless it is overridden in
a sub-class.

Parameters:

- `connectionTime`: An `int` expressing the relative importance of a short connection time
- `latency`: An `int` expressing the relative importance of low latency
- `bandwidth`: An `int` expressing the relative importance of high bandwidth

**Since:** 1.5

## SocketImpl.setOption(SocketOption<T>, T)

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

- `UnsupportedOperationException`: if the SocketImpl does not support the option
- `IllegalArgumentException`: if the value is not valid for the option
- `IOException`: if an I/O error occurs, or if the socket is closed
- `NullPointerException`: if name is `null`

## SocketImpl.getOption(SocketOption<T>)

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

**Returns:** the value of the named option

**Since:** 9

Throws:

- `UnsupportedOperationException`: if the SocketImpl does not support the option
- `IOException`: if an I/O error occurs, or if the socket is closed
- `NullPointerException`: if name is `null`

## SocketImpl.supportedOptions()

```java
protected Set<SocketOption<?>> supportedOptions()
```

Returns a set of SocketOptions supported by this impl
and by this impl's socket (Socket or ServerSocket)

**Implementation requirements:** The default implementation of this method returns an empty set.
Subclasses should override this method with an appropriate implementation.

**Returns:** a Set of SocketOptions

**Since:** 9
