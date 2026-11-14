---
title: "AbstractOwnableSynchronizer class (java.util.concurrent.locks)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/locks/AbstractOwnableSynchronizer.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AbstractOwnableSynchronizer class (java.util.concurrent.locks)

```java
public abstract class AbstractOwnableSynchronizer implements java.io.Serializable
```

A synchronizer that may be exclusively owned by a thread.  This
class provides a basis for creating locks and related synchronizers
that may entail a notion of ownership.  The
`AbstractOwnableSynchronizer` class itself does not manage or
use this information. However, subclasses and tools may use
appropriately maintained values to help control and monitor access
and provide diagnostics.

**Since:** 1.6

## AbstractOwnableSynchronizer.AbstractOwnableSynchronizer()

```java
protected AbstractOwnableSynchronizer()
```

Empty constructor for use by subclasses.

## AbstractOwnableSynchronizer.setExclusiveOwnerThread(Thread)

```java
protected final void setExclusiveOwnerThread(Thread thread)
```

Sets the thread that currently owns exclusive access.
A `null` argument indicates that no thread owns access.
This method does not otherwise impose any synchronization or
`volatile` field accesses.

Parameters:

- `thread`: the owner thread

## AbstractOwnableSynchronizer.getExclusiveOwnerThread()

```java
protected final Thread getExclusiveOwnerThread()
```

Returns the thread last set by `setExclusiveOwnerThread`,
or `null` if never set.  This method does not otherwise
impose any synchronization or `volatile` field accesses.

**Returns:** the owner thread
