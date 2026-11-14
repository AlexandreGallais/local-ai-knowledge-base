---
title: "Selector class (java.nio.channels) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/Selector.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Selector class (java.nio.channels) (part 2 of 2)

## Selector.select(Consumer<SelectionKey>, long)

```java
public int select(Consumer<SelectionKey> action, long timeout) throws IOException
```

Selects and performs an action on the keys whose corresponding channels
are ready for I/O operations.

 This method performs a blocking selection
operation.  It wakes up from querying the operating system only when
at least one channel is selected, this selector's wakeup
method is invoked, the current thread is interrupted, or the given
timeout period expires, whichever comes first.

 The specified *action*'s accept
method is invoked with the key for each channel that is ready to perform
an operation identified by its key's interest set.  The `accept`
method may be invoked more than once for the same key but with the
ready-operation set containing a subset of the operations for which the
channel is ready (as described above).  The `accept` method is
invoked while synchronized on the selector and its selected-key set.
Great care must be taken to avoid deadlocking with other threads that
also synchronize on these objects.  Selection operations are not reentrant
in general and consequently the *action* should take great care not
to attempt a selection operation on the same selector.  The behavior when
attempting a reentrant selection operation is implementation specific and
therefore not specified.  If the *action* closes the selector then
`ClosedSelectorException` is thrown when the action completes.
The *action* is not prohibited from closing channels registered with
the selector, nor prohibited from cancelling keys or changing a key's
interest set.  If a channel is selected but its key is cancelled or its
interest set changed before the *action* is performed on the key
then it is implementation specific as to whether the *action* is
invoked (it may be invoked with an invalid
key).  Exceptions thrown by the action are relayed to the caller.

 This method does not offer real-time guarantees: It schedules the
timeout as if by invoking the `Object.wait(long)` method.

Parameters:

- `action`: The action to perform
- `timeout`: If positive, block for up to `timeout` milliseconds, more or less, while waiting for a channel to become ready; if zero, block indefinitely; must not be negative

**Implementation requirements:** The default implementation removes all keys from the
selected-key set, invokes select(long) with the
given timeout and then performs the action for each key added to the
selected-key set.  The default implementation does not detect the action
performing a reentrant selection operation.  The selected-key set may
or may not be empty on completion of the default implementation.

**Returns:** The number of unique keys consumed, possibly zero

**Since:** 11

Throws:

- `IOException`: If an I/O error occurs
- `ClosedSelectorException`: If this selector is closed or is closed by the action
- `IllegalArgumentException`: If the value of the timeout argument is negative

## Selector.select(Consumer<SelectionKey>)

```java
public int select(Consumer<SelectionKey> action) throws IOException
```

Selects and performs an action on the keys whose corresponding channels
are ready for I/O operations.

 This method performs a blocking selection
operation.  It wakes up from querying the operating system only when
at least one channel is selected, this selector's wakeup
method is invoked, or the current thread is interrupted, whichever comes
first.

 This method is equivalent to invoking the 2-arg
long) select method with a timeout of `0`
to block indefinitely.

Parameters:

- `action`: The action to perform

**Implementation requirements:** The default implementation invokes the 2-arg `select`
method with a timeout of `0`.

**Returns:** The number of unique keys consumed, possibly zero

**Since:** 11

Throws:

- `IOException`: If an I/O error occurs
- `ClosedSelectorException`: If this selector is closed or is closed by the action

## Selector.selectNow(Consumer<SelectionKey>)

```java
public int selectNow(Consumer<SelectionKey> action) throws IOException
```

Selects and performs an action on the keys whose corresponding channels
are ready for I/O operations.

 This method performs a non-blocking selection
operation.

 Invoking this method clears the effect of any previous invocations
of the wakeup method.

Parameters:

- `action`: The action to perform

**Implementation requirements:** The default implementation removes all keys from the
selected-key set, invokes selectNow() and then
performs the action for each key added to the selected-key set.  The
default implementation does not detect the action performing a reentrant
selection operation.  The selected-key set may or may not be empty on
completion of the default implementation.

**Returns:** The number of unique keys consumed, possibly zero

**Since:** 11

Throws:

- `IOException`: If an I/O error occurs
- `ClosedSelectorException`: If this selector is closed or is closed by the action

## Selector.wakeup()

```java
public abstract Selector wakeup()
```

Causes the first selection operation that has not yet returned to return
immediately.

 If another thread is currently blocked in a selection operation then
that invocation will return immediately.  If no selection operation is
currently in progress then the next invocation of a selection operation
will return immediately unless `selectNow()` or `selectNow(Consumer)` is invoked in the meantime.  In any case the value
returned by that invocation may be non-zero.  Subsequent selection
operations will block as usual unless this method is invoked again in the
meantime.

 Invoking this method more than once between two successive selection
operations has the same effect as invoking it just once.

**Returns:** This selector

## Selector.close()

```java
public abstract void close() throws IOException
```

Closes this selector.

 If a thread is currently blocked in one of this selector's selection
methods then it is interrupted as if by invoking the selector's wakeup method.

 Any uncancelled keys still associated with this selector are
invalidated, their channels are deregistered, and any other resources
associated with this selector are released.

 If this selector is already closed then invoking this method has no
effect.

 After a selector is closed, any further attempt to use it, except by
invoking this method or the wakeup method, will cause a
`ClosedSelectorException` to be thrown.

Throws:

- `IOException`: If an I/O error occurs
