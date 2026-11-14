---
title: "SelectorProvider class (java.nio.channels.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/spi/SelectorProvider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SelectorProvider class (java.nio.channels.spi)

```java
public abstract class SelectorProvider
```

Service-provider class for selectors and selectable channels.

 A selector provider is a concrete subclass of this class that has a
zero-argument constructor and implements the abstract methods specified
below.  A given invocation of the Java virtual machine maintains a single
system-wide default provider instance, which is returned by the provider method.  The first invocation of that method will locate
the default provider as specified below.

 The system-wide default provider is used by the static `open`
methods of the DatagramChannel, Pipe, Selector, ServerSocketChannel, and SocketChannel classes.  It is also
used by the System.inheritedChannel()
method. A program may make use of a provider other than the default provider
by instantiating that provider and then directly invoking the `open`
methods defined in this class.

 All of the methods in this class are safe for use by multiple concurrent
threads.

**Since:** 1.4

## SelectorProvider.SelectorProvider()

```java
protected SelectorProvider()
```

Initializes a new instance of this class.

## SelectorProvider.provider()

```java
public static SelectorProvider provider()
```

Returns the system-wide default selector provider for this invocation of
the Java virtual machine.

 The first invocation of this method locates the default provider
object as follows:

-

 If the system property
  `java.nio.channels.spi.SelectorProvider` is defined
  then it is taken to be the fully-qualified name of a concrete provider
  class. The class is loaded and instantiated; if this process fails then
  an unspecified error is thrown.

-

 If a provider class has been installed in a jar file that is
  visible to the system class loader, and that jar file contains a
  provider-configuration file named
  `java.nio.channels.spi.SelectorProvider` in the resource
  directory `META-INF/services`, then the first class name
  specified in that file is taken.  The class is loaded and
  instantiated; if this process fails then an unspecified error is
  thrown.

-

 Finally, if no provider has been specified by any of the above
  means then the system-default provider class is instantiated and the
  result is returned.

 Subsequent invocations of this method return the provider that was
returned by the first invocation.

**Returns:** The system-wide default selector provider

## SelectorProvider.openDatagramChannel()

```java
public abstract DatagramChannel openDatagramChannel() throws IOException
```

Opens a datagram channel.

**Returns:** The new channel

Throws:

- `IOException`: If an I/O error occurs

## SelectorProvider.openDatagramChannel(ProtocolFamily)

```java
public abstract DatagramChannel openDatagramChannel(ProtocolFamily family) throws IOException
```

Opens a datagram channel.

Parameters:

- `family`: The protocol family

**Returns:** A new datagram channel

**Since:** 1.7

Throws:

- `UnsupportedOperationException`: If the specified protocol family is not supported
- `IOException`: If an I/O error occurs

## SelectorProvider.openPipe()

```java
public abstract Pipe openPipe() throws IOException
```

Opens a pipe.

**Returns:** The new pipe

Throws:

- `IOException`: If an I/O error occurs

## SelectorProvider.openSelector()

```java
public abstract AbstractSelector openSelector() throws IOException
```

Opens a selector.

**Returns:** The new selector

Throws:

- `IOException`: If an I/O error occurs

## SelectorProvider.openServerSocketChannel()

```java
public abstract ServerSocketChannel openServerSocketChannel() throws IOException
```

Opens a server-socket channel.

**Returns:** The new channel

Throws:

- `IOException`: If an I/O error occurs

## SelectorProvider.openSocketChannel()

```java
public abstract SocketChannel openSocketChannel() throws IOException
```

Opens a socket channel.

**Returns:** The new channel

Throws:

- `IOException`: If an I/O error occurs

## SelectorProvider.inheritedChannel()

```java
public Channel inheritedChannel() throws IOException
```

Returns the channel inherited from the entity that created this
Java virtual machine.

 On many operating systems a process, such as a Java virtual
machine, can be started in a manner that allows the process to
inherit a channel from the entity that created the process. The
manner in which this is done is system dependent, as are the
possible entities to which the channel may be connected. For example,
on UNIX systems, the Internet services daemon (*inetd*) is used to
start programs to service requests when a request arrives on an
associated network port. In this example, the process that is started,
inherits a channel representing a network socket.

 In cases where the inherited channel is for an *Internet protocol*
socket then the Channel type returned
by this method is determined as follows:

-

 If the inherited channel is for a stream-oriented connected
 socket then a SocketChannel is returned. The
 socket channel is, at least initially, in blocking mode, bound
 to a socket address, and connected to a peer.

-

 If the inherited channel is for a stream-oriented listening
 socket then a ServerSocketChannel is returned.
 The server-socket channel is, at least initially, in blocking mode,
 and bound to a socket address.

-

 If the inherited channel is a datagram-oriented socket then a
 DatagramChannel is returned. The datagram channel
 is, at least initially, in blocking mode, and bound to a socket address.

 In cases where the inherited channel is for a *Unix domain*
socket then the `Channel` type returned is the same as for
*Internet protocol* sockets as described above, except that
datagram-oriented sockets are not supported.

 In addition to the two types of socket just described, this method
may return other types in the future.

 The first invocation of this method creates the channel that is
returned. Subsequent invocations of this method return the same
channel.

**Implementation requirements:** The default implementation of this method returns
`null`.

**Returns:** The inherited channel, if any, otherwise `null`.

**Since:** 1.5

Throws:

- `IOException`: If an I/O error occurs

## SelectorProvider.openSocketChannel(ProtocolFamily)

```java
public SocketChannel openSocketChannel(ProtocolFamily family) throws IOException
```

Opens a socket channel.

Parameters:

- `family`: The protocol family

**Implementation requirements:** The default implementation of this method first checks that
the given protocol `family` is not `null`,
then throws `UnsupportedOperationException`.

**Returns:** The new channel

**Since:** 15

Throws:

- `UnsupportedOperationException`: If the specified protocol family is not supported
- `IOException`: If an I/O error occurs

## SelectorProvider.openServerSocketChannel(ProtocolFamily)

```java
public ServerSocketChannel openServerSocketChannel(ProtocolFamily family) throws IOException
```

Opens a server-socket channel.

Parameters:

- `family`: The protocol family

**Implementation requirements:** The default implementation of this method first checks that
the given protocol `family` is not `null`,
then throws `UnsupportedOperationException`.

**Returns:** The new channel

**Since:** 15

Throws:

- `UnsupportedOperationException`: If the specified protocol family is not supported
- `IOException`: If an I/O error occurs
