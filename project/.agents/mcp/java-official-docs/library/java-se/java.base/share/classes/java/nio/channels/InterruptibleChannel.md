---
title: "InterruptibleChannel interface (java.nio.channels)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/InterruptibleChannel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InterruptibleChannel interface (java.nio.channels)

```java
public interface InterruptibleChannel extends Channel
```

A channel that can be asynchronously closed and interrupted.

 A channel that implements this interface is *asynchronously
closeable:* If a thread is blocked in an I/O operation on an
interruptible channel then another thread may invoke the channel's close method.  This will cause the blocked thread to receive an
`AsynchronousCloseException`.

 A channel that implements this interface is also *interruptible:*
If a thread is blocked in an I/O operation on an interruptible channel then
another thread may invoke the blocked thread's interrupt method.  This will cause the channel to be closed, the blocked
thread to receive a `ClosedByInterruptException`, and the blocked
thread's interrupt status to be set.

 If a thread's interrupt status is already set and it invokes a blocking
I/O operation upon a channel then the channel will be closed and the thread
will immediately receive a `ClosedByInterruptException`; its interrupt
status will remain set.

 A channel supports asynchronous closing and interruption if, and only
if, it implements this interface.  This can be tested at runtime, if
necessary, via the `instanceof` operator.

**Since:** 1.4

## InterruptibleChannel.close()

```java
public void close() throws IOException
```

Closes this channel.

 Any thread currently blocked in an I/O operation upon this channel
will receive an `AsynchronousCloseException`.

 This method otherwise behaves exactly as specified by the Channel interface.

Throws:

- `IOException`: If an I/O error occurs
