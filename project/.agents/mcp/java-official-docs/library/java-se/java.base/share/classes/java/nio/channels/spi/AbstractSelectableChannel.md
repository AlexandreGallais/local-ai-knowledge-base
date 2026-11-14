---
title: "AbstractSelectableChannel class (java.nio.channels.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/spi/AbstractSelectableChannel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AbstractSelectableChannel class (java.nio.channels.spi)

```java
public abstract class AbstractSelectableChannel extends SelectableChannel
```

Base implementation class for selectable channels.

 This class defines methods that handle the mechanics of channel
registration, deregistration, and closing.  It maintains the current
blocking mode of this channel as well as its current set of selection keys.
It performs all of the synchronization required to implement the `java.nio.channels.SelectableChannel` specification.  Implementations of the
protected abstract methods defined in this class need not synchronize
against other threads that might be engaged in the same operations.

**Since:** 1.4

## AbstractSelectableChannel.AbstractSelectableChannel(SelectorProvider)

```java
protected AbstractSelectableChannel(SelectorProvider provider)
```

Initializes a new instance of this class.

Parameters:

- `provider`: The provider that created this channel

## AbstractSelectableChannel.provider()

```java
public final SelectorProvider provider()
```

Returns the provider that created this channel.

**Returns:** The provider that created this channel

## AbstractSelectableChannel.register(Selector, int, Object)

```java
public final SelectionKey register(Selector sel, int ops, Object att) throws ClosedChannelException
```

Registers this channel with the given selector, returning a selection key.

  This method first verifies that this channel is open and that the
given initial interest set is valid.

 If this channel is already registered with the given selector then
the selection key <example-value> that registration is returned after
setting its interest set to the given value.

 Otherwise this channel has not yet been registered with the given
selector, so the register method of
the selector is invoked while holding the appropriate locks.  The
resulting key is added to this channel's key set before being returned.

Throws:

- `ClosedSelectorException`: (inherited documentation)
- `IllegalBlockingModeException`: (inherited documentation)
- `IllegalSelectorException`: (inherited documentation)
- `CancelledKeyException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## AbstractSelectableChannel.implCloseChannel()

```java
protected final void implCloseChannel() throws IOException
```

Closes this channel.

 This method, which is specified in the `AbstractInterruptibleChannel` class and is invoked by the close method, in turn invokes the
implCloseSelectableChannel method in
order to perform the actual work of closing this channel.  It then
cancels all of this channel's keys.

## AbstractSelectableChannel.implCloseSelectableChannel()

```java
protected abstract void implCloseSelectableChannel() throws IOException
```

Closes this selectable channel.

 This method is invoked by the close method in order to perform the actual work of closing the
channel.  This method is only invoked if the channel has not yet been
closed, and it is never invoked more than once.

 An implementation of this method must arrange for any other thread
that is blocked in an I/O operation upon this channel to return
immediately, either by throwing an exception or by returning normally.

Throws:

- `IOException`: If an I/O error occurs

## AbstractSelectableChannel.configureBlocking(boolean)

```java
public final SelectableChannel configureBlocking(boolean block) throws IOException
```

Adjusts this channel's blocking mode.

 If the given blocking mode is different from the current blocking
mode then this method invokes the implConfigureBlocking method, while holding the appropriate locks, in
order to change the mode.

Throws:

- `ClosedChannelException`: (inherited documentation)

## AbstractSelectableChannel.implConfigureBlocking(boolean)

```java
protected abstract void implConfigureBlocking(boolean block) throws IOException
```

Adjusts this channel's blocking mode.

 This method is invoked by the configureBlocking method in order to perform the actual work of
changing the blocking mode.  This method is only invoked if the new mode
is different from the current mode.

Parameters:

- `block`: If `true` then this channel will be placed in blocking mode; if `false` then it will be placed non-blocking mode

Throws:

- `IOException`: If an I/O error occurs
