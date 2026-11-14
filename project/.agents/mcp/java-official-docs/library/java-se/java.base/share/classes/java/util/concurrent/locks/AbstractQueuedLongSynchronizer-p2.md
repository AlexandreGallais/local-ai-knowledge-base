---
title: "AbstractQueuedLongSynchronizer class (java.util.concurrent.locks) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/locks/AbstractQueuedLongSynchronizer.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AbstractQueuedLongSynchronizer class (java.util.concurrent.locks) (part 2 of 2)

## AbstractQueuedLongSynchronizer.hasQueuedPredecessors()

```java
public final boolean hasQueuedPredecessors()
```

Queries whether any threads have been waiting to acquire longer
than the current thread.

An invocation of this method is equivalent to (but may be
more efficient than):

```java
getFirstQueuedThread() != Thread.currentThread()
  && hasQueuedThreads()
```

Note that because cancellations due to interrupts and
timeouts may occur at any time, a `true` return does not
guarantee that some other thread will acquire before the current
thread.  Likewise, it is possible for another thread to win a
race to enqueue after this method has returned `false`,
due to the queue being empty.

This method is designed to be used by a fair synchronizer to
avoid barging.
Such a synchronizer's `tryAcquire` method should return
`false`, and its `tryAcquireShared` method should
return a negative value, if this method returns `true`
(unless this is a reentrant acquire).  For example, the `tryAcquire` method for a fair, reentrant, exclusive mode
synchronizer might look like this:

```java
protected boolean tryAcquire(long arg) {
  if (isHeldExclusively()) {
    // A reentrant acquire; increment hold count
    return true;
  } else if (hasQueuedPredecessors()) {
    return false;
  } else {
    // try to acquire normally
  }
}
```

**Returns:** `true` if there is a queued thread preceding the
        current thread, and `false` if the current thread
        is at the head of the queue or the queue is empty

**Since:** 1.7

## AbstractQueuedLongSynchronizer.getQueueLength()

```java
public final int getQueueLength()
```

Returns an estimate of the number of threads waiting to
acquire.  The value is only an estimate because the number of
threads may change dynamically while this method traverses
internal data structures.  This method is designed for use in
monitoring system state, not for synchronization control.

**Returns:** the estimated number of threads waiting to acquire

## AbstractQueuedLongSynchronizer.getQueuedThreads()

```java
public final Collection<Thread> getQueuedThreads()
```

Returns a collection containing threads that may be waiting to
acquire.  Because the actual set of threads may change
dynamically while constructing this result, the returned
collection is only a best-effort estimate.  The elements of the
returned collection are in no particular order.  This method is
designed to facilitate construction of subclasses that provide
more extensive monitoring facilities.

**Returns:** the collection of threads

## AbstractQueuedLongSynchronizer.getExclusiveQueuedThreads()

```java
public final Collection<Thread> getExclusiveQueuedThreads()
```

Returns a collection containing threads that may be waiting to
acquire in exclusive mode. This has the same properties
as `getQueuedThreads` except that it only returns
those threads waiting due to an exclusive acquire.

**Returns:** the collection of threads

## AbstractQueuedLongSynchronizer.getSharedQueuedThreads()

```java
public final Collection<Thread> getSharedQueuedThreads()
```

Returns a collection containing threads that may be waiting to
acquire in shared mode. This has the same properties
as `getQueuedThreads` except that it only returns
those threads waiting due to a shared acquire.

**Returns:** the collection of threads

## AbstractQueuedLongSynchronizer.toString()

```java
public String toString()
```

Returns a string identifying this synchronizer, as well as its state.
The state, in brackets, includes the String `"State ="`
followed by the current value of `getState`, and either
`"nonempty"` or `"empty"` depending on whether the
queue is empty.

**Returns:** a string identifying this synchronizer, as well as its state

## AbstractQueuedLongSynchronizer.owns(ConditionObject)

```java
public final boolean owns(ConditionObject condition)
```

Queries whether the given ConditionObject
uses this synchronizer as its lock.

Parameters:

- `condition`: the condition

**Returns:** `true` if owned

Throws:

- `NullPointerException`: if the condition is null

## AbstractQueuedLongSynchronizer.hasWaiters(ConditionObject)

```java
public final boolean hasWaiters(ConditionObject condition)
```

Queries whether any threads are waiting on the given condition
associated with this synchronizer. Note that because timeouts
and interrupts may occur at any time, a `true` return
does not guarantee that a future `signal` will awaken
any threads.  This method is designed primarily for use in
monitoring of the system state.

Parameters:

- `condition`: the condition

**Returns:** `true` if there are any waiting threads

Throws:

- `IllegalMonitorStateException`: if exclusive synchronization is not held
- `IllegalArgumentException`: if the given condition is not associated with this synchronizer
- `NullPointerException`: if the condition is null

## AbstractQueuedLongSynchronizer.getWaitQueueLength(ConditionObject)

```java
public final int getWaitQueueLength(ConditionObject condition)
```

Returns an estimate of the number of threads waiting on the
given condition associated with this synchronizer. Note that
because timeouts and interrupts may occur at any time, the
estimate serves only as an upper bound on the actual number of
waiters.  This method is designed for use in monitoring system
state, not for synchronization control.

Parameters:

- `condition`: the condition

**Returns:** the estimated number of waiting threads

Throws:

- `IllegalMonitorStateException`: if exclusive synchronization is not held
- `IllegalArgumentException`: if the given condition is not associated with this synchronizer
- `NullPointerException`: if the condition is null

## AbstractQueuedLongSynchronizer.getWaitingThreads(ConditionObject)

```java
public final Collection<Thread> getWaitingThreads(ConditionObject condition)
```

Returns a collection containing those threads that may be
waiting on the given condition associated with this
synchronizer.  Because the actual set of threads may change
dynamically while constructing this result, the returned
collection is only a best-effort estimate. The elements of the
returned collection are in no particular order.

Parameters:

- `condition`: the condition

**Returns:** the collection of threads

Throws:

- `IllegalMonitorStateException`: if exclusive synchronization is not held
- `IllegalArgumentException`: if the given condition is not associated with this synchronizer
- `NullPointerException`: if the condition is null

## AbstractQueuedLongSynchronizer.ConditionObject()

```java
public ConditionObject()
```

Creates a new `ConditionObject` instance.

## AbstractQueuedLongSynchronizer.signal()

```java
public final void signal()
```

Moves the longest-waiting thread, if one exists, from the
wait queue for this condition to the wait queue for the
owning lock.

Throws:

- `IllegalMonitorStateException`: if `isHeldExclusively` returns `false`

## AbstractQueuedLongSynchronizer.signalAll()

```java
public final void signalAll()
```

Moves all threads from the wait queue for this condition to
the wait queue for the owning lock.

Throws:

- `IllegalMonitorStateException`: if `isHeldExclusively` returns `false`

## AbstractQueuedLongSynchronizer.awaitUninterruptibly()

```java
public final void awaitUninterruptibly()
```

Implements uninterruptible condition wait.

- Save lock state returned by `getState`.

- Invoke `release` with saved state as argument,
    throwing IllegalMonitorStateException if it fails.

- Block until signalled.

- Reacquire by invoking underlying version of
    `acquire(long)` with saved state as argument.

## AbstractQueuedLongSynchronizer.await()

```java
public final void await() throws InterruptedException
```

Implements interruptible condition wait.

- If current thread is interrupted, throw InterruptedException.

- Save lock state returned by `getState`.

- Invoke `release` with saved state as argument,
    throwing IllegalMonitorStateException if it fails.

- Block until signalled or interrupted.

- Reacquire by invoking underlying version of
    `acquire(long)` with saved state as argument.

- If interrupted while blocked in step 4, throw InterruptedException.

## AbstractQueuedLongSynchronizer.awaitNanos(long)

```java
public final long awaitNanos(long nanosTimeout) throws InterruptedException
```

Implements timed condition wait.

- If current thread is interrupted, throw InterruptedException.

- Save lock state returned by `getState`.

- Invoke `release` with saved state as argument,
    throwing IllegalMonitorStateException if it fails.

- Block until signalled, interrupted, or timed out.

- Reacquire by invoking underlying version of
    `acquire(long)` with saved state as argument.

- If interrupted while blocked in step 4, throw InterruptedException.

## AbstractQueuedLongSynchronizer.awaitUntil(Date)

```java
public final boolean awaitUntil(Date deadline) throws InterruptedException
```

Implements absolute timed condition wait.

- If current thread is interrupted, throw InterruptedException.

- Save lock state returned by `getState`.

- Invoke `release` with saved state as argument,
    throwing IllegalMonitorStateException if it fails.

- Block until signalled, interrupted, or timed out.

- Reacquire by invoking underlying version of
    `acquire(long)` with saved state as argument.

- If interrupted while blocked in step 4, throw InterruptedException.

- If timed out while blocked in step 4, return false, else true.

## AbstractQueuedLongSynchronizer.await(long, TimeUnit)

```java
public final boolean await(long time, TimeUnit unit) throws InterruptedException
```

Implements timed condition wait.

- If current thread is interrupted, throw InterruptedException.

- Save lock state returned by `getState`.

- Invoke `release` with saved state as argument,
    throwing IllegalMonitorStateException if it fails.

- Block until signalled, interrupted, or timed out.

- Reacquire by invoking underlying version of
    `acquire(long)` with saved state as argument.

- If interrupted while blocked in step 4, throw InterruptedException.

- If timed out while blocked in step 4, return false, else true.

## AbstractQueuedLongSynchronizer.hasWaiters()

```java
protected final boolean hasWaiters()
```

Queries whether any threads are waiting on this condition.
Implements `AbstractQueuedLongSynchronizer.hasWaiters(ConditionObject)`.

**Returns:** `true` if there are any waiting threads

Throws:

- `IllegalMonitorStateException`: if `isHeldExclusively` returns `false`

## AbstractQueuedLongSynchronizer.getWaitQueueLength()

```java
protected final int getWaitQueueLength()
```

Returns an estimate of the number of threads waiting on
this condition.
Implements `AbstractQueuedLongSynchronizer.getWaitQueueLength(ConditionObject)`.

**Returns:** the estimated number of waiting threads

Throws:

- `IllegalMonitorStateException`: if `isHeldExclusively` returns `false`

## AbstractQueuedLongSynchronizer.getWaitingThreads()

```java
protected final Collection<Thread> getWaitingThreads()
```

Returns a collection containing those threads that may be
waiting on this Condition.
Implements `AbstractQueuedLongSynchronizer.getWaitingThreads(ConditionObject)`.

**Returns:** the collection of threads

Throws:

- `IllegalMonitorStateException`: if `isHeldExclusively` returns `false`
