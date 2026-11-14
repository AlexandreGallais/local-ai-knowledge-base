# SelectorProvider class (java.nio.channels.spi)

```java
public abstract class SelectorProvider
```

Service-provider class for selectors and selectable channels.

<p> A selector provider is a concrete subclass of this class that has a
zero-argument constructor and implements the abstract methods specified
below.  A given invocation of the Java virtual machine maintains a single
system-wide default provider instance, which is returned by the {@link
#provider() provider} method.  The first invocation of that method will locate
the default provider as specified below.

<p> The system-wide default provider is used by the static {@code open}
methods of the {@link java.nio.channels.DatagramChannel#open
DatagramChannel}, {@link java.nio.channels.Pipe#open Pipe}, {@link
java.nio.channels.Selector#open Selector}, {@link
java.nio.channels.ServerSocketChannel#open ServerSocketChannel}, and {@link
java.nio.channels.SocketChannel#open SocketChannel} classes.  It is also
used by the {@link java.lang.System#inheritedChannel System.inheritedChannel()}
method. A program may make use of a provider other than the default provider
by instantiating that provider and then directly invoking the {@code open}
methods defined in this class.

<p> All of the methods in this class are safe for use by multiple concurrent
threads.  </p>


@author Mark Reinhold
@author JSR-51 Expert Group
@since 1.4

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

<p> The first invocation of this method locates the default provider
object as follows: </p>

<ol>

  <li><p> If the system property
  {@systemProperty java.nio.channels.spi.SelectorProvider} is defined
  then it is taken to be the fully-qualified name of a concrete provider
  class. The class is loaded and instantiated; if this process fails then
  an unspecified error is thrown.  </p></li>

  <li><p> If a provider class has been installed in a jar file that is
  visible to the system class loader, and that jar file contains a
  provider-configuration file named
  {@code java.nio.channels.spi.SelectorProvider} in the resource
  directory {@code META-INF/services}, then the first class name
  specified in that file is taken.  The class is loaded and
  instantiated; if this process fails then an unspecified error is
  thrown.  </p></li>

  <li><p> Finally, if no provider has been specified by any of the above
  means then the system-default provider class is instantiated and the
  result is returned.  </p></li>

</ol>

<p> Subsequent invocations of this method return the provider that was
returned by the first invocation.  </p>

@return  The system-wide default selector provider

## SelectorProvider.openDatagramChannel()

```java
public abstract DatagramChannel openDatagramChannel() throws IOException
```

Opens a datagram channel.

@return  The new channel

@throws  IOException
         If an I/O error occurs

## SelectorProvider.openDatagramChannel(ProtocolFamily)

```java
public abstract DatagramChannel openDatagramChannel(ProtocolFamily family) throws IOException
```

Opens a datagram channel.

@param   family
         The protocol family

@return  A new datagram channel

@throws  UnsupportedOperationException
         If the specified protocol family is not supported
@throws  IOException
         If an I/O error occurs

@since 1.7

## SelectorProvider.openPipe()

```java
public abstract Pipe openPipe() throws IOException
```

Opens a pipe.

@return  The new pipe

@throws  IOException
         If an I/O error occurs

## SelectorProvider.openSelector()

```java
public abstract AbstractSelector openSelector() throws IOException
```

Opens a selector.

@return  The new selector

@throws  IOException
         If an I/O error occurs

## SelectorProvider.openServerSocketChannel()

```java
public abstract ServerSocketChannel openServerSocketChannel() throws IOException
```

Opens a server-socket channel.

@return  The new channel

@throws  IOException
         If an I/O error occurs

## SelectorProvider.openSocketChannel()

```java
public abstract SocketChannel openSocketChannel() throws IOException
```

Opens a socket channel.

@return  The new channel

@throws  IOException
         If an I/O error occurs

## SelectorProvider.inheritedChannel()

```java
public Channel inheritedChannel() throws IOException
```

Returns the channel inherited from the entity that created this
Java virtual machine.

<p> On many operating systems a process, such as a Java virtual
machine, can be started in a manner that allows the process to
inherit a channel from the entity that created the process. The
manner in which this is done is system dependent, as are the
possible entities to which the channel may be connected. For example,
on UNIX systems, the Internet services daemon (<i>inetd</i>) is used to
start programs to service requests when a request arrives on an
associated network port. In this example, the process that is started,
inherits a channel representing a network socket.

<p> In cases where the inherited channel is for an <i>Internet protocol</i>
socket then the {@link Channel Channel} type returned
by this method is determined as follows:

<ul>

 <li><p> If the inherited channel is for a stream-oriented connected
 socket then a {@link SocketChannel SocketChannel} is returned. The
 socket channel is, at least initially, in blocking mode, bound
 to a socket address, and connected to a peer.
 </p></li>

 <li><p> If the inherited channel is for a stream-oriented listening
 socket then a {@link ServerSocketChannel ServerSocketChannel} is returned.
 The server-socket channel is, at least initially, in blocking mode,
 and bound to a socket address.
 </p></li>

 <li><p> If the inherited channel is a datagram-oriented socket then a
 {@link DatagramChannel DatagramChannel} is returned. The datagram channel
 is, at least initially, in blocking mode, and bound to a socket address.
 </p></li>

</ul>

<p> In cases where the inherited channel is for a <i>Unix domain</i>
socket then the {@link Channel} type returned is the same as for
<i>Internet protocol</i> sockets as described above, except that
datagram-oriented sockets are not supported.

<p> In addition to the two types of socket just described, this method
may return other types in the future.

<p> The first invocation of this method creates the channel that is
returned. Subsequent invocations of this method return the same
channel. </p>

@implSpec The default implementation of this method returns
{@code null}.

@return  The inherited channel, if any, otherwise {@code null}.

@throws  IOException
         If an I/O error occurs

@since 1.5

## SelectorProvider.openSocketChannel(ProtocolFamily)

```java
public SocketChannel openSocketChannel(ProtocolFamily family) throws IOException
```

Opens a socket channel.

@implSpec The default implementation of this method first checks that
the given protocol {@code family} is not {@code null},
then throws {@link UnsupportedOperationException}.

@param   family
         The protocol family

@return  The new channel

@throws  UnsupportedOperationException
         If the specified protocol family is not supported
@throws  IOException
         If an I/O error occurs

@since 15

## SelectorProvider.openServerSocketChannel(ProtocolFamily)

```java
public ServerSocketChannel openServerSocketChannel(ProtocolFamily family) throws IOException
```

Opens a server-socket channel.

@implSpec The default implementation of this method first checks that
the given protocol {@code family} is not {@code null},
then throws {@link UnsupportedOperationException}.

@param   family
         The protocol family

@return  The new channel

@throws  UnsupportedOperationException
         If the specified protocol family is not supported
@throws  IOException
         If an I/O error occurs

@since 15