---
title: "NetworkChannel interface (java.nio.channels)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/NetworkChannel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NetworkChannel interface (java.nio.channels)

```java
public interface NetworkChannel extends Channel
```

A channel to a network socket.

 A channel that implements this interface is a channel to a network
socket. The bind method is used to bind the
socket to a local address, the getLocalAddress method returns the address that the socket is bound to, and
the setOption and getOption methods are used to set and query socket
options.  An implementation of this interface should specify the socket options
that it supports.

 The bind and setOption methods that do
not otherwise have a value to return are specified to return the network
channel upon which they are invoked. This allows method invocations to be
chained. Implementations of this interface should specialize the return type
so that method invocations on the implementation class can be chained.

**Since:** 1.7

## NetworkChannel.bind(SocketAddress)

```java
NetworkChannel bind(SocketAddress local) throws IOException
```

Binds the channel's socket to a local address.

 This method is used to establish an association between the socket and
a local address. Once an association is established then the socket remains
bound until the channel is closed. If the `local` parameter has the
value `null` then the socket will be bound to an address that is
assigned automatically.

Parameters:

- `local`: The address to bind the socket, or `null` to bind the socket to an automatically assigned socket address

**Returns:** This channel

**See also:** #getLocalAddress

Throws:

- `AlreadyBoundException`: If the socket is already bound
- `UnsupportedAddressTypeException`: If the type of the given address is not supported
- `ClosedChannelException`: If the channel is closed
- `IOException`: If some other I/O error occurs

## NetworkChannel.getLocalAddress()

```java
SocketAddress getLocalAddress() throws IOException
```

Returns the socket address that this channel's socket is bound to.

 Where the channel is bound to an Internet Protocol
socket address then the return value from this method is of type `java.net.InetSocketAddress`.

**Returns:** The socket address that the socket is bound to, or `null`
         if the channel's socket is not bound

Throws:

- `ClosedChannelException`: If the channel is closed
- `IOException`: If an I/O error occurs

## NetworkChannel.setOption(SocketOption<T>, T)

```java
<T> NetworkChannel setOption(SocketOption<T> name, T value) throws IOException
```

Sets the value of a socket option.

Parameters:

- `<T>`: The type of the socket option value
- `name`: The socket option
- `value`: The value of the socket option. A value of `null` may be a valid value for some socket options.

**Returns:** This channel

**See also:** java.net.StandardSocketOptions

Throws:

- `UnsupportedOperationException`: If the socket option is not supported by this channel
- `IllegalArgumentException`: If the value is not a valid value for this socket option
- `ClosedChannelException`: If this channel is closed
- `IOException`: If an I/O error occurs

## NetworkChannel.getOption(SocketOption<T>)

```java
<T> T getOption(SocketOption<T> name) throws IOException
```

Returns the value of a socket option.

Parameters:

- `<T>`: The type of the socket option value
- `name`: The socket option

**Returns:** The value of the socket option. A value of `null` may be
         a valid value for some socket options.

**See also:** java.net.StandardSocketOptions

Throws:

- `UnsupportedOperationException`: If the socket option is not supported by this channel
- `ClosedChannelException`: If this channel is closed
- `IOException`: If an I/O error occurs

## NetworkChannel.supportedOptions()

```java
Set<SocketOption<?>> supportedOptions()
```

Returns a set of the socket options supported by this channel.

 This method will continue to return the set of options even after the
channel has been closed.

**Returns:** A set of the socket options supported by this channel
