---
title: "Channel interface (java.nio.channels)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/Channel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Channel interface (java.nio.channels)

```java
public interface Channel extends Closeable
```

A nexus for I/O operations.

 A channel represents an open connection to an entity such as a hardware
device, a file, a network socket, or a program component that is capable of
performing one or more distinct I/O operations, for example reading or
writing.

 A channel is either open or closed.  A channel is open upon creation,
and once closed it remains closed.  Once a channel is closed, any attempt to
invoke an I/O operation upon it will cause a `ClosedChannelException`
to be thrown.  Whether or not a channel is open may be tested by invoking
its isOpen method.

 Channels are, in general, intended to be safe for multithreaded access
as described in the specifications of the interfaces and classes that extend
and implement this interface.

**Since:** 1.4

## Channel.isOpen()

```java
public boolean isOpen()
```

Tells whether or not this channel is open.

**Returns:** `true` if, and only if, this channel is open

## Channel.close()

```java
public void close() throws IOException
```

Closes this channel.

 After a channel is closed, any further attempt to invoke I/O
operations upon it will cause a `ClosedChannelException` to be
thrown.

 If this channel is already closed then invoking this method has no
effect.

 This method may be invoked at any time.  If some other thread has
already invoked it, however, then another invocation will block until
the first invocation is complete, after which it will return without
effect.

Throws:

- `IOException`: If an I/O error occurs
