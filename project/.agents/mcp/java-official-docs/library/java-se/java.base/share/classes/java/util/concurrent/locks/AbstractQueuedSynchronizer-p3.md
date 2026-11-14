---
title: "AbstractQueuedSynchronizer class (java.util.concurrent.locks) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/locks/AbstractQueuedSynchronizer.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AbstractQueuedSynchronizer class (java.util.concurrent.locks) (part 3 of 3)

## AbstractQueuedSynchronizer.getWaitQueueLength(ConditionObject)

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

## AbstractQueuedSynchronizer.getWaitingThreads(ConditionObject)

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

## AbstractQueuedSynchronizer.ConditionObject()

```java
public ConditionObject()
```

Creates a new `ConditionObject` instance.

## AbstractQueuedSynchronizer.signal()

```java
public final void signal()
```

Moves the longest-waiting thread, if one exists, from the
wait queue for this condition to the wait queue for the
owning lock.

Throws:

- `IllegalMonitorStateException`: if `isHeldExclusively` returns `false`

## AbstractQueuedSynchronizer.signalAll()

```java
public final void signalAll()
```

Moves all threads from the wait queue for this condition to
the wait queue for the owning lock.

Throws:

- `IllegalMonitorStateException`: if `isHeldExclusively` returns `false`

## AbstractQueuedSynchronizer.awaitUninterruptibly()

```java
public final void awaitUninterruptibly()
```

Implements uninterruptible condition wait.

- Save lock state returned by `getState`.

- Invoke `release` with saved state as argument,
    throwing IllegalMonitorStateException if it fails.

- Block until signalled.

- Reacquire by invoking underlying version of
    `acquire(int)` with saved state as argument.

## AbstractQueuedSynchronizer.await()

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
    `acquire(int)` with saved state as argument.

- If interrupted while blocked in step 4, throw InterruptedException.

## AbstractQueuedSynchronizer.awaitNanos(long)

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
    `acquire(int)` with saved state as argument.

- If interrupted while blocked in step 4, throw InterruptedException.

## AbstractQueuedSynchronizer.awaitUntil(Date)

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
    `acquire(int)` with saved state as argument.

- If interrupted while blocked in step 4, throw InterruptedException.

- If timed out while blocked in step 4, return false, else true.

## AbstractQueuedSynchronizer.await(long, TimeUnit)

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
    `acquire(int)` with saved state as argument.

- If interrupted while blocked in step 4, throw InterruptedException.

- If timed out while blocked in step 4, return false, else true.

## AbstractQueuedSynchronizer.hasWaiters()

```java
protected final boolean hasWaiters()
```

Queries whether any threads are waiting on this condition.
Implements `AbstractQueuedSynchronizer.hasWaiters(ConditionObject)`.

**Returns:** `true` if there are any waiting threads

Throws:

- `IllegalMonitorStateException`: if `isHeldExclusively` returns `false`

## AbstractQueuedSynchronizer.getWaitQueueLength()

```java
protected final int getWaitQueueLength()
```

Returns an estimate of the number of threads waiting on
this condition.
Implements `AbstractQueuedSynchronizer.getWaitQueueLength(ConditionObject)`.

**Returns:** the estimated number of waiting threads

Throws:

- `IllegalMonitorStateException`: if `isHeldExclusively` returns `false`

## AbstractQueuedSynchronizer.getWaitingThreads()

```java
protected final Collection<Thread> getWaitingThreads()
```

Returns a collection containing those threads that may be
waiting on this Condition.
Implements `AbstractQueuedSynchronizer.getWaitingThreads(ConditionObject)`.

**Returns:** the collection of threads

Throws:

- `IllegalMonitorStateException`: if `isHeldExclusively` returns `false`
