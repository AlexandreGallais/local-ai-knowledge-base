---
title: "AbstractQueuedLongSynchronizer class (java.util.concurrent.locks) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/locks/AbstractQueuedLongSynchronizer.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AbstractQueuedLongSynchronizer class (java.util.concurrent.locks)

```java
public abstract class AbstractQueuedLongSynchronizer extends AbstractOwnableSynchronizer implements java.io.Serializable
```

A version of `AbstractQueuedSynchronizer` in
which synchronization state is maintained as a `long`.
This class has exactly the same structure, properties, and methods
as `AbstractQueuedSynchronizer` with the exception
that all state-related parameters and results are defined
as `long` rather than `int`. This class
may be useful when creating synchronizers such as
multilevel locks and barriers that require
64 bits of state.

See `AbstractQueuedSynchronizer` for usage
notes and examples.

**Since:** 1.6

## AbstractQueuedLongSynchronizer.AbstractQueuedLongSynchronizer()

```java
public AbstractQueuedLongSynchronizer()
```

Constructor for subclasses to call.

## AbstractQueuedLongSynchronizer.isReleasable()

```java
public final boolean isReleasable()
```

Allows Conditions to be used in ForkJoinPools without
risking fixed pool exhaustion. This is usable only for
untimed Condition waits, not timed versions.

## AbstractQueuedLongSynchronizer.getState()

```java
protected final long getState()
```

Returns the current value of synchronization state.
This operation has memory semantics of a `volatile` read.

**Returns:** current state value

## AbstractQueuedLongSynchronizer.setState(long)

```java
protected final void setState(long newState)
```

Sets the value of synchronization state.
This operation has memory semantics of a `volatile` write.

Parameters:

- `newState`: the new state value

## AbstractQueuedLongSynchronizer.compareAndSetState(long, long)

```java
protected final boolean compareAndSetState(long expect, long update)
```

Atomically sets synchronization state to the given updated
value if the current state value equals the expected value.
This operation has memory semantics of a `volatile` read
and write.

Parameters:

- `expect`: the expected value
- `update`: the new value

**Returns:** `true` if successful. False return indicates that the actual
        value was not equal to the expected value.

## AbstractQueuedLongSynchronizer.tryAcquire(long)

```java
protected boolean tryAcquire(long arg)
```

Attempts to acquire in exclusive mode. This method should query
if the state of the object permits it to be acquired in the
exclusive mode, and if so to acquire it.

This method is always invoked by the thread performing
acquire.  If this method reports failure, the acquire method
may queue the thread, if it is not already queued, until it is
signalled by a release from some other thread. This can be used
to implement method `Lock.tryLock()`.

The default
implementation throws `UnsupportedOperationException`.

Parameters:

- `arg`: the acquire argument. This value is always the one passed to an acquire method, or is the value saved on entry to a condition wait. The value is otherwise uninterpreted and can represent anything you like.

**Returns:** `true` if successful. Upon success, this object has
        been acquired.

Throws:

- `IllegalMonitorStateException`: if acquiring would place this synchronizer in an illegal state. This exception must be thrown in a consistent fashion for synchronization to work correctly.
- `UnsupportedOperationException`: if exclusive mode is not supported

## AbstractQueuedLongSynchronizer.tryRelease(long)

```java
protected boolean tryRelease(long arg)
```

Attempts to set the state to reflect a release in exclusive
mode.

This method is always invoked by the thread performing release.

The default implementation throws
`UnsupportedOperationException`.

Parameters:

- `arg`: the release argument. This value is always the one passed to a release method, or the current state value upon entry to a condition wait. The value is otherwise uninterpreted and can represent anything you like.

**Returns:** `true` if this object is now in a fully released
        state, so that any waiting threads may attempt to acquire;
        and `false` otherwise.

Throws:

- `IllegalMonitorStateException`: if releasing would place this synchronizer in an illegal state. This exception must be thrown in a consistent fashion for synchronization to work correctly.
- `UnsupportedOperationException`: if exclusive mode is not supported

## AbstractQueuedLongSynchronizer.tryAcquireShared(long)

```java
protected long tryAcquireShared(long arg)
```

Attempts to acquire in shared mode. This method should query if
the state of the object permits it to be acquired in the shared
mode, and if so to acquire it.

This method is always invoked by the thread performing
acquire.  If this method reports failure, the acquire method
may queue the thread, if it is not already queued, until it is
signalled by a release from some other thread.

The default implementation throws `UnsupportedOperationException`.

Parameters:

- `arg`: the acquire argument. This value is always the one passed to an acquire method, or is the value saved on entry to a condition wait. The value is otherwise uninterpreted and can represent anything you like.

**Returns:** a negative value on failure; zero if acquisition in shared
        mode succeeded but no subsequent shared-mode acquire can
        succeed; and a positive value if acquisition in shared
        mode succeeded and subsequent shared-mode acquires might
        also succeed, in which case a subsequent waiting thread
        must check availability. (Support for three different
        return values enables this method to be used in contexts
        where acquires only sometimes act exclusively.)  Upon
        success, this object has been acquired.

Throws:

- `IllegalMonitorStateException`: if acquiring would place this synchronizer in an illegal state. This exception must be thrown in a consistent fashion for synchronization to work correctly.
- `UnsupportedOperationException`: if shared mode is not supported

## AbstractQueuedLongSynchronizer.tryReleaseShared(long)

```java
protected boolean tryReleaseShared(long arg)
```

Attempts to set the state to reflect a release in shared mode.

This method is always invoked by the thread performing release.

The default implementation throws
`UnsupportedOperationException`.

Parameters:

- `arg`: the release argument. This value is always the one passed to a release method, or the current state value upon entry to a condition wait. The value is otherwise uninterpreted and can represent anything you like.

**Returns:** `true` if this release of shared mode may permit a
        waiting acquire (shared or exclusive) to succeed; and
        `false` otherwise

Throws:

- `IllegalMonitorStateException`: if releasing would place this synchronizer in an illegal state. This exception must be thrown in a consistent fashion for synchronization to work correctly.
- `UnsupportedOperationException`: if shared mode is not supported

## AbstractQueuedLongSynchronizer.isHeldExclusively()

```java
protected boolean isHeldExclusively()
```

Returns `true` if synchronization is held exclusively with
respect to the current (calling) thread.  This method is invoked
upon each call to a `ConditionObject` method.

The default implementation throws `UnsupportedOperationException`. This method is invoked
internally only within `ConditionObject` methods, so need
not be defined if conditions are not used.

**Returns:** `true` if synchronization is held exclusively;
        `false` otherwise

Throws:

- `UnsupportedOperationException`: if conditions are not supported

## AbstractQueuedLongSynchronizer.acquire(long)

```java
public final void acquire(long arg)
```

Acquires in exclusive mode, ignoring interrupts.  Implemented
by invoking at least once `tryAcquire`,
returning on success.  Otherwise the thread is queued, possibly
repeatedly blocking and unblocking, invoking `tryAcquire` until success.  This method can be used
to implement method `Lock.lock`.

Parameters:

- `arg`: the acquire argument. This value is conveyed to `tryAcquire` but is otherwise uninterpreted and can represent anything you like.

## AbstractQueuedLongSynchronizer.acquireInterruptibly(long)

```java
public final void acquireInterruptibly(long arg) throws InterruptedException
```

Acquires in exclusive mode, aborting if interrupted.
Implemented by first checking interrupt status, then invoking
at least once `tryAcquire`, returning on
success.  Otherwise the thread is queued, possibly repeatedly
blocking and unblocking, invoking `tryAcquire`
until success or the thread is interrupted.  This method can be
used to implement method `Lock.lockInterruptibly`.

Parameters:

- `arg`: the acquire argument. This value is conveyed to `tryAcquire` but is otherwise uninterpreted and can represent anything you like.

Throws:

- `InterruptedException`: if the current thread is interrupted

## AbstractQueuedLongSynchronizer.tryAcquireNanos(long, long)

```java
public final boolean tryAcquireNanos(long arg, long nanosTimeout) throws InterruptedException
```

Attempts to acquire in exclusive mode, aborting if interrupted,
and failing if the given timeout elapses.  Implemented by first
checking interrupt status, then invoking at least once `tryAcquire`, returning on success.  Otherwise, the thread is
queued, possibly repeatedly blocking and unblocking, invoking
`tryAcquire` until success or the thread is interrupted
or the timeout elapses.  This method can be used to implement
method TimeUnit).

Parameters:

- `arg`: the acquire argument. This value is conveyed to `tryAcquire` but is otherwise uninterpreted and can represent anything you like.
- `nanosTimeout`: the maximum number of nanoseconds to wait

**Returns:** `true` if acquired; `false` if timed out

Throws:

- `InterruptedException`: if the current thread is interrupted

## AbstractQueuedLongSynchronizer.release(long)

```java
public final boolean release(long arg)
```

Releases in exclusive mode.  Implemented by unblocking one or
more threads if `tryRelease` returns true.
This method can be used to implement method `Lock.unlock`.

Parameters:

- `arg`: the release argument. This value is conveyed to `tryRelease` but is otherwise uninterpreted and can represent anything you like.

**Returns:** the value returned from `tryRelease`

## AbstractQueuedLongSynchronizer.acquireShared(long)

```java
public final void acquireShared(long arg)
```

Acquires in shared mode, ignoring interrupts.  Implemented by
first invoking at least once `tryAcquireShared`,
returning on success.  Otherwise the thread is queued, possibly
repeatedly blocking and unblocking, invoking `tryAcquireShared` until success.

Parameters:

- `arg`: the acquire argument. This value is conveyed to `tryAcquireShared` but is otherwise uninterpreted and can represent anything you like.

## AbstractQueuedLongSynchronizer.acquireSharedInterruptibly(long)

```java
public final void acquireSharedInterruptibly(long arg) throws InterruptedException
```

Acquires in shared mode, aborting if interrupted.  Implemented
by first checking interrupt status, then invoking at least once
`tryAcquireShared`, returning on success.  Otherwise the
thread is queued, possibly repeatedly blocking and unblocking,
invoking `tryAcquireShared` until success or the thread
is interrupted.

Parameters:

- `arg`: the acquire argument. This value is conveyed to `tryAcquireShared` but is otherwise uninterpreted and can represent anything you like.

Throws:

- `InterruptedException`: if the current thread is interrupted

## AbstractQueuedLongSynchronizer.tryAcquireSharedNanos(long, long)

```java
public final boolean tryAcquireSharedNanos(long arg, long nanosTimeout) throws InterruptedException
```

Attempts to acquire in shared mode, aborting if interrupted, and
failing if the given timeout elapses.  Implemented by first
checking interrupt status, then invoking at least once `tryAcquireShared`, returning on success.  Otherwise, the
thread is queued, possibly repeatedly blocking and unblocking,
invoking `tryAcquireShared` until success or the thread
is interrupted or the timeout elapses.

Parameters:

- `arg`: the acquire argument. This value is conveyed to `tryAcquireShared` but is otherwise uninterpreted and can represent anything you like.
- `nanosTimeout`: the maximum number of nanoseconds to wait

**Returns:** `true` if acquired; `false` if timed out

Throws:

- `InterruptedException`: if the current thread is interrupted

## AbstractQueuedLongSynchronizer.releaseShared(long)

```java
public final boolean releaseShared(long arg)
```

Releases in shared mode.  Implemented by unblocking one or more
threads if `tryReleaseShared` returns true.

Parameters:

- `arg`: the release argument. This value is conveyed to `tryReleaseShared` but is otherwise uninterpreted and can represent anything you like.

**Returns:** the value returned from `tryReleaseShared`

## AbstractQueuedLongSynchronizer.hasQueuedThreads()

```java
public final boolean hasQueuedThreads()
```

Queries whether any threads are waiting to acquire. Note that
because cancellations due to interrupts and timeouts may occur
at any time, a `true` return does not guarantee that any
other thread will ever acquire.

**Returns:** `true` if there may be other threads waiting to acquire

## AbstractQueuedLongSynchronizer.hasContended()

```java
public final boolean hasContended()
```

Queries whether any threads have ever contended to acquire this
synchronizer; that is, if an acquire method has ever blocked.

In this implementation, this operation returns in
constant time.

**Returns:** `true` if there has ever been contention

## AbstractQueuedLongSynchronizer.getFirstQueuedThread()

```java
public final Thread getFirstQueuedThread()
```

Returns the first (longest-waiting) thread in the queue, or
`null` if no threads are currently queued.

In this implementation, this operation normally returns in
constant time, but may iterate upon contention if other threads are
concurrently modifying the queue.

**Returns:** the first (longest-waiting) thread in the queue, or
        `null` if no threads are currently queued

## AbstractQueuedLongSynchronizer.isQueued(Thread)

```java
public final boolean isQueued(Thread thread)
```

Returns true if the given thread is currently queued.

This implementation traverses the queue to determine
presence of the given thread.

Parameters:

- `thread`: the thread

**Returns:** `true` if the given thread is on the queue

Throws:

- `NullPointerException`: if the thread is null
