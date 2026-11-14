---
title: "ReentrantLock class (java.util.concurrent.locks) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/locks/ReentrantLock.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ReentrantLock class (java.util.concurrent.locks) (part 2 of 2)

## ReentrantLock.getQueuedThreads()

```java
protected Collection<Thread> getQueuedThreads()
```

Returns a collection containing threads that may be waiting to
acquire this lock.  Because the actual set of threads may change
dynamically while constructing this result, the returned
collection is only a best-effort estimate.  The elements of the
returned collection are in no particular order.  This method is
designed to facilitate construction of subclasses that provide
more extensive monitoring facilities.

**Returns:** the collection of threads

## ReentrantLock.hasWaiters(Condition)

```java
public boolean hasWaiters(Condition condition)
```

Queries whether any threads are waiting on the given condition
associated with this lock. Note that because timeouts and
interrupts may occur at any time, a `true` return does
not guarantee that a future `signal` will awaken any
threads.  This method is designed primarily for use in
monitoring of the system state.

Parameters:

- `condition`: the condition

**Returns:** `true` if there are any waiting threads

Throws:

- `IllegalMonitorStateException`: if this lock is not held
- `IllegalArgumentException`: if the given condition is not associated with this lock
- `NullPointerException`: if the condition is null

## ReentrantLock.getWaitQueueLength(Condition)

```java
public int getWaitQueueLength(Condition condition)
```

Returns an estimate of the number of threads waiting on the
given condition associated with this lock. Note that because
timeouts and interrupts may occur at any time, the estimate
serves only as an upper bound on the actual number of waiters.
This method is designed for use in monitoring of the system
state, not for synchronization control.

Parameters:

- `condition`: the condition

**Returns:** the estimated number of waiting threads

Throws:

- `IllegalMonitorStateException`: if this lock is not held
- `IllegalArgumentException`: if the given condition is not associated with this lock
- `NullPointerException`: if the condition is null

## ReentrantLock.getWaitingThreads(Condition)

```java
protected Collection<Thread> getWaitingThreads(Condition condition)
```

Returns a collection containing those threads that may be
waiting on the given condition associated with this lock.
Because the actual set of threads may change dynamically while
constructing this result, the returned collection is only a
best-effort estimate. The elements of the returned collection
are in no particular order.  This method is designed to
facilitate construction of subclasses that provide more
extensive condition monitoring facilities.

Parameters:

- `condition`: the condition

**Returns:** the collection of threads

Throws:

- `IllegalMonitorStateException`: if this lock is not held
- `IllegalArgumentException`: if the given condition is not associated with this lock
- `NullPointerException`: if the condition is null

## ReentrantLock.toString()

```java
public String toString()
```

Returns a string identifying this lock, as well as its lock state.
The state, in brackets, includes either the String `"Unlocked"`
or the String `"Locked by"` followed by the
name of the owning thread.

**Returns:** a string identifying this lock, as well as its lock state
