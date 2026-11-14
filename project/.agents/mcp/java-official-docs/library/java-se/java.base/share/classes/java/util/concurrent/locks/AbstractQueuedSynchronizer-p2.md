---
title: "AbstractQueuedSynchronizer class (java.util.concurrent.locks) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/locks/AbstractQueuedSynchronizer.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AbstractQueuedSynchronizer class (java.util.concurrent.locks) (part 2 of 3)

## AbstractQueuedSynchronizer.tryAcquireShared(int)

```java
protected int tryAcquireShared(int arg)
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

## AbstractQueuedSynchronizer.tryReleaseShared(int)

```java
protected boolean tryReleaseShared(int arg)
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

## AbstractQueuedSynchronizer.isHeldExclusively()

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

## AbstractQueuedSynchronizer.acquire(int)

```java
public final void acquire(int arg)
```

Acquires in exclusive mode, ignoring interrupts.  Implemented
by invoking at least once `tryAcquire`,
returning on success.  Otherwise the thread is queued, possibly
repeatedly blocking and unblocking, invoking `tryAcquire` until success.  This method can be used
to implement method `Lock.lock`.

Parameters:

- `arg`: the acquire argument. This value is conveyed to `tryAcquire` but is otherwise uninterpreted and can represent anything you like.

## AbstractQueuedSynchronizer.acquireInterruptibly(int)

```java
public final void acquireInterruptibly(int arg) throws InterruptedException
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

## AbstractQueuedSynchronizer.tryAcquireNanos(int, long)

```java
public final boolean tryAcquireNanos(int arg, long nanosTimeout) throws InterruptedException
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

## AbstractQueuedSynchronizer.release(int)

```java
public final boolean release(int arg)
```

Releases in exclusive mode.  Implemented by unblocking one or
more threads if `tryRelease` returns true.
This method can be used to implement method `Lock.unlock`.

Parameters:

- `arg`: the release argument. This value is conveyed to `tryRelease` but is otherwise uninterpreted and can represent anything you like.

**Returns:** the value returned from `tryRelease`

## AbstractQueuedSynchronizer.acquireShared(int)

```java
public final void acquireShared(int arg)
```

Acquires in shared mode, ignoring interrupts.  Implemented by
first invoking at least once `tryAcquireShared`,
returning on success.  Otherwise the thread is queued, possibly
repeatedly blocking and unblocking, invoking `tryAcquireShared` until success.

Parameters:

- `arg`: the acquire argument. This value is conveyed to `tryAcquireShared` but is otherwise uninterpreted and can represent anything you like.

## AbstractQueuedSynchronizer.acquireSharedInterruptibly(int)

```java
public final void acquireSharedInterruptibly(int arg) throws InterruptedException
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

## AbstractQueuedSynchronizer.tryAcquireSharedNanos(int, long)

```java
public final boolean tryAcquireSharedNanos(int arg, long nanosTimeout) throws InterruptedException
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

## AbstractQueuedSynchronizer.releaseShared(int)

```java
public final boolean releaseShared(int arg)
```

Releases in shared mode.  Implemented by unblocking one or more
threads if `tryReleaseShared` returns true.

Parameters:

- `arg`: the release argument. This value is conveyed to `tryReleaseShared` but is otherwise uninterpreted and can represent anything you like.

**Returns:** the value returned from `tryReleaseShared`

## AbstractQueuedSynchronizer.hasQueuedThreads()

```java
public final boolean hasQueuedThreads()
```

Queries whether any threads are waiting to acquire. Note that
because cancellations due to interrupts and timeouts may occur
at any time, a `true` return does not guarantee that any
other thread will ever acquire.

**Returns:** `true` if there may be other threads waiting to acquire

## AbstractQueuedSynchronizer.hasContended()

```java
public final boolean hasContended()
```

Queries whether any threads have ever contended to acquire this
synchronizer; that is, if an acquire method has ever blocked.

In this implementation, this operation returns in
constant time.

**Returns:** `true` if there has ever been contention

## AbstractQueuedSynchronizer.getFirstQueuedThread()

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

## AbstractQueuedSynchronizer.isQueued(Thread)

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

## AbstractQueuedSynchronizer.hasQueuedPredecessors()

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
protected boolean tryAcquire(int arg) {
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

## AbstractQueuedSynchronizer.getQueueLength()

```java
public final int getQueueLength()
```

Returns an estimate of the number of threads waiting to
acquire.  The value is only an estimate because the number of
threads may change dynamically while this method traverses
internal data structures.  This method is designed for use in
monitoring system state, not for synchronization control.

**Returns:** the estimated number of threads waiting to acquire

## AbstractQueuedSynchronizer.getQueuedThreads()

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

## AbstractQueuedSynchronizer.getExclusiveQueuedThreads()

```java
public final Collection<Thread> getExclusiveQueuedThreads()
```

Returns a collection containing threads that may be waiting to
acquire in exclusive mode. This has the same properties
as `getQueuedThreads` except that it only returns
those threads waiting due to an exclusive acquire.

**Returns:** the collection of threads

## AbstractQueuedSynchronizer.getSharedQueuedThreads()

```java
public final Collection<Thread> getSharedQueuedThreads()
```

Returns a collection containing threads that may be waiting to
acquire in shared mode. This has the same properties
as `getQueuedThreads` except that it only returns
those threads waiting due to a shared acquire.

**Returns:** the collection of threads

## AbstractQueuedSynchronizer.toString()

```java
public String toString()
```

Returns a string identifying this synchronizer, as well as its state.
The state, in brackets, includes the String `"State ="`
followed by the current value of `getState`, and either
`"nonempty"` or `"empty"` depending on whether the
queue is empty.

**Returns:** a string identifying this synchronizer, as well as its state

## AbstractQueuedSynchronizer.owns(ConditionObject)

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

## AbstractQueuedSynchronizer.hasWaiters(ConditionObject)

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
