---
title: "AbstractSelector class (java.nio.channels.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/spi/AbstractSelector.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AbstractSelector class (java.nio.channels.spi)

```java
public abstract class AbstractSelector extends Selector
```

Base implementation class for selectors.

 This class encapsulates the low-level machinery required to implement
the interruption of selection operations.  A concrete selector class must
invoke the begin and end methods before and
after, respectively, invoking an I/O operation that might block
indefinitely.  In order to ensure that the end method is always
invoked, these methods should be used within a
`try` ... `finally` block:

 This class also defines methods for maintaining a selector's
cancelled-key set and for removing a key from its channel's key set, and
declares the abstract register method that is invoked by a
selectable channel's register
method in order to perform the actual work of registering a channel.

**Since:** 1.4

## AbstractSelector.AbstractSelector(SelectorProvider)

```java
protected AbstractSelector(SelectorProvider provider)
```

Initializes a new instance of this class.

Parameters:

- `provider`: The provider that created this selector

## AbstractSelector.close()

```java
public final void close() throws IOException
```

Closes this selector.

 If the selector has already been closed then this method returns
immediately.  Otherwise it marks the selector as closed and then invokes
the implCloseSelector method in order to
complete the close operation.

Throws:

- `IOException`: If an I/O error occurs

## AbstractSelector.implCloseSelector()

```java
protected abstract void implCloseSelector() throws IOException
```

Closes this selector.

 This method is invoked by the close method in order
to perform the actual work of closing the selector.  This method is only
invoked if the selector has not yet been closed, and it is never invoked
more than once.

 An implementation of this method must arrange for any other thread
that is blocked in a selection operation upon this selector to return
immediately as if by invoking the wakeup method.

Throws:

- `IOException`: If an I/O error occurs while closing the selector

## AbstractSelector.provider()

```java
public final SelectorProvider provider()
```

Returns the provider that created this channel.

**Returns:** The provider that created this channel

## AbstractSelector.cancelledKeys()

```java
protected final Set<SelectionKey> cancelledKeys()
```

Retrieves this selector's cancelled-key set.

 This set should only be used while synchronized upon it.

**Returns:** The cancelled-key set

## AbstractSelector.register(AbstractSelectableChannel, int, Object)

```java
protected abstract SelectionKey register(AbstractSelectableChannel ch, int ops, Object att)
```

Registers the given channel with this selector.

 This method is invoked by a channel's register method in order to perform
the actual work of registering the channel with this selector.

Parameters:

- `ch`: The channel to be registered
- `ops`: The initial interest set, which must be valid
- `att`: The initial attachment for the resulting key

**Returns:** A new key <example-value> the registration of the given channel
         with this selector

## AbstractSelector.deregister(AbstractSelectionKey)

```java
protected final void deregister(AbstractSelectionKey key)
```

Removes the given key from its channel's key set.

 This method must be invoked by the selector for each channel that it
deregisters.

Parameters:

- `key`: The selection key to be removed

## AbstractSelector.begin()

```java
protected final void begin()
```

Marks the beginning of an I/O operation that might block indefinitely.

 This method should be invoked in tandem with the end
method, using a `try` ... `finally` block as
shown above, in order to implement interruption for
this selector.

 Invoking this method arranges for the selector's wakeup method to be invoked if a thread's interrupt method is invoked while the thread is
blocked in an I/O operation upon the selector.

## AbstractSelector.end()

```java
protected final void end()
```

Marks the end of an I/O operation that might block indefinitely.

 This method should be invoked in tandem with the begin
method, using a `try` ... `finally` block as
shown above, in order to implement interruption for
this selector.
