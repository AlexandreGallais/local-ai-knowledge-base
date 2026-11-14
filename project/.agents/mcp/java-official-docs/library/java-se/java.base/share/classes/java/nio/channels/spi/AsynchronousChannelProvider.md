---
title: "AsynchronousChannelProvider class (java.nio.channels.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/spi/AsynchronousChannelProvider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AsynchronousChannelProvider class (java.nio.channels.spi)

```java
public abstract class AsynchronousChannelProvider
```

Service-provider class for asynchronous channels.

 An asynchronous channel provider is a concrete subclass of this class that
has a zero-argument constructor and implements the abstract methods specified
below.  A given invocation of the Java virtual machine maintains a single
system-wide default provider instance, which is returned by the provider method.  The first invocation of that method will locate
the default provider as specified below.

 All of the methods in this class are safe for use by multiple concurrent
threads.

**Since:** 1.7

## AsynchronousChannelProvider.AsynchronousChannelProvider()

```java
protected AsynchronousChannelProvider()
```

Initializes a new instance of this class.

## AsynchronousChannelProvider.provider()

```java
public static AsynchronousChannelProvider provider()
```

Returns the system-wide default asynchronous channel provider for this
invocation of the Java virtual machine.

 The first invocation of this method locates the default provider
object as follows:

-

 If the system property
  `java.nio.channels.spi.AsynchronousChannelProvider` is
  defined then it is taken to be the fully-qualified name of a concrete
  provider class. The class is loaded and instantiated; if this process
  fails then an unspecified error is thrown.

-

 If a provider class has been installed in a jar file that is
  visible to the system class loader, and that jar file contains a
  provider-configuration file named
  `java.nio.channels.spi.AsynchronousChannelProvider` in the resource
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

**Returns:** The system-wide default AsynchronousChannel provider

## AsynchronousChannelProvider.openAsynchronousChannelGroup(int, ThreadFactory)

```java
public abstract AsynchronousChannelGroup openAsynchronousChannelGroup(int nThreads, ThreadFactory threadFactory) throws IOException
```

Constructs a new asynchronous channel group with a fixed thread pool.

Parameters:

- `nThreads`: The number of threads in the pool
- `threadFactory`: The factory to use when creating new threads

**Returns:** A new asynchronous channel group

**See also:** AsynchronousChannelGroup#withFixedThreadPool

Throws:

- `IllegalArgumentException`: If `nThreads <= 0`
- `IOException`: If an I/O error occurs

## AsynchronousChannelProvider.openAsynchronousChannelGroup(ExecutorService, int)

```java
public abstract AsynchronousChannelGroup openAsynchronousChannelGroup(ExecutorService executor, int initialSize) throws IOException
```

Constructs a new asynchronous channel group with the given thread pool.

Parameters:

- `executor`: The thread pool
- `initialSize`: A value `>=0` or a negative value for implementation specific default

**Returns:** A new asynchronous channel group

**See also:** AsynchronousChannelGroup#withCachedThreadPool

Throws:

- `IOException`: If an I/O error occurs

## AsynchronousChannelProvider.openAsynchronousServerSocketChannel(AsynchronousChannelGroup)

```java
public abstract AsynchronousServerSocketChannel openAsynchronousServerSocketChannel (AsynchronousChannelGroup group) throws IOException
```

Opens an asynchronous server-socket channel.

Parameters:

- `group`: The group to which the channel is bound, or `null` to bind to the default group

**Returns:** The new channel

Throws:

- `IllegalChannelGroupException`: If the provider that created the group differs from this provider
- `ShutdownChannelGroupException`: The group is shutdown
- `IOException`: If an I/O error occurs

## AsynchronousChannelProvider.openAsynchronousSocketChannel(AsynchronousChannelGroup)

```java
public abstract AsynchronousSocketChannel openAsynchronousSocketChannel (AsynchronousChannelGroup group) throws IOException
```

Opens an asynchronous socket channel.

Parameters:

- `group`: The group to which the channel is bound, or `null` to bind to the default group

**Returns:** The new channel

Throws:

- `IllegalChannelGroupException`: If the provider that created the group differs from this provider
- `ShutdownChannelGroupException`: The group is shutdown
- `IOException`: If an I/O error occurs
