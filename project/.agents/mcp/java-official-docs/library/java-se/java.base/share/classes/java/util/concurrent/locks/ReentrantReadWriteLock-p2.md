---
title: "ReentrantReadWriteLock class (java.util.concurrent.locks) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/locks/ReentrantReadWriteLock.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ReentrantReadWriteLock class (java.util.concurrent.locks) (part 2 of 3)

## ReentrantReadWriteLock.tryLock()

```java
public boolean tryLock()
```

Acquires the write lock only if it is not held by another thread
at the time of invocation.

Acquires the write lock if neither the read nor write lock
are held by another thread
and returns immediately with the value `true`,
setting the write lock hold count to one. Even when this lock has
been set to use a fair ordering policy, a call to
`tryLock()` *will* immediately acquire the
lock if it is available, whether or not other threads are
currently waiting for the write lock.  This "barging"
behavior can be useful in certain circumstances, even
though it breaks fairness. If you want to honor the
fairness setting for this lock, then use TimeUnit) tryLock(0, TimeUnit.SECONDS)
which is almost equivalent (it also detects interruption).

If the current thread already holds this lock then the
hold count is incremented by one and the method returns
`true`.

If the lock is held by another thread then this method
will return immediately with the value `false`.

**Returns:** `true` if the lock was free and was acquired
by the current thread, or the write lock was already held
by the current thread; and `false` otherwise.

## ReentrantReadWriteLock.tryLock(long, TimeUnit)

```java
public boolean tryLock(long timeout, TimeUnit unit) throws InterruptedException
```

Acquires the write lock if it is not held by another thread
within the given waiting time and the current thread has
not been interrupted.

Acquires the write lock if neither the read nor write lock
are held by another thread
and returns immediately with the value `true`,
setting the write lock hold count to one. If this lock has been
set to use a fair ordering policy then an available lock
*will not* be acquired if any other threads are
waiting for the write lock. This is in contrast to the `tryLock()` method. If you want a timed `tryLock`
that does permit barging on a fair lock then combine the
timed and un-timed forms together:

```java
if (lock.tryLock() ||
    lock.tryLock(timeout, unit)) {
  ...
}
```

If the current thread already holds this lock then the
hold count is incremented by one and the method returns
`true`.

If the lock is held by another thread then the current
thread becomes disabled for thread scheduling purposes and
lies dormant until one of three things happens:

- The write lock is acquired by the current thread; or

- Some other thread interrupts
the current thread; or

- The specified waiting time elapses

If the write lock is acquired then the value `true` is
returned and the write lock hold count is set to one.

If the current thread:

- has its interrupted status set on entry to this method;
or

- is interrupted while
acquiring the write lock,

then `InterruptedException` is thrown and the current
thread's interrupted status is cleared.

If the specified waiting time elapses then the value
`false` is returned.  If the time is less than or
equal to zero, the method will not wait at all.

In this implementation, as this method is an explicit
interruption point, preference is given to responding to
the interrupt over normal or reentrant acquisition of the
lock, and over reporting the elapse of the waiting time.

Parameters:

- `timeout`: the time to wait for the write lock
- `unit`: the time unit of the timeout argument

**Returns:** `true` if the lock was free and was acquired
by the current thread, or the write lock was already held by the
current thread; and `false` if the waiting time
elapsed before the lock could be acquired.

Throws:

- `InterruptedException`: if the current thread is interrupted
- `NullPointerException`: if the time unit is null

## ReentrantReadWriteLock.unlock()

```java
public void unlock()
```

Attempts to release this lock.

If the current thread is the holder of this lock then
the hold count is decremented. If the hold count is now
zero then the lock is released.  If the current thread is
not the holder of this lock then `IllegalMonitorStateException` is thrown.

Throws:

- `IllegalMonitorStateException`: if the current thread does not hold this lock

## ReentrantReadWriteLock.newCondition()

```java
public Condition newCondition()
```

Returns a `Condition` instance for use with this
`Lock` instance.

The returned `Condition` instance supports the same
usages as do the `Object` monitor methods (wait, notify, and notifyAll) when used with the built-in
monitor lock.

- If this write lock is not held when any `Condition` method is called then an `IllegalMonitorStateException` is thrown.  (Read locks are
held independently of write locks, so are not checked or
affected. However it is essentially always an error to
invoke a condition waiting method when the current thread
has also acquired read locks, since other threads that
could unblock it will not be able to acquire the write
lock.)

- When the condition waiting
methods are called the write lock is released and, before
they return, the write lock is reacquired and the lock hold
count restored to what it was when the method was called.

- If a thread is interrupted while
waiting then the wait will terminate, an `InterruptedException` will be thrown, and the thread's
interrupted status will be cleared.

- Waiting threads are signalled in FIFO order.

- The ordering of lock reacquisition for threads returning
from waiting methods is the same as for threads initially
acquiring the lock, which is in the default case not specified,
but for *fair* locks favors those threads that have been
waiting the longest.

**Returns:** the Condition object

## ReentrantReadWriteLock.toString()

```java
public String toString()
```

Returns a string identifying this lock, as well as its lock
state.  The state, in brackets includes either the String
`"Unlocked"` or the String `"Locked by"`
followed by the name of the owning thread.

**Returns:** a string identifying this lock, as well as its lock state

## ReentrantReadWriteLock.isHeldByCurrentThread()

```java
public boolean isHeldByCurrentThread()
```

Queries if this write lock is held by the current thread.
Identical in effect to `ReentrantReadWriteLock.isWriteLockedByCurrentThread`.

**Returns:** `true` if the current thread holds this lock and
        `false` otherwise

**Since:** 1.6

## ReentrantReadWriteLock.getHoldCount()

```java
public int getHoldCount()
```

Queries the number of holds on this write lock by the current
thread.  A thread has a hold on a lock for each lock action
that is not matched by an unlock action.  Identical in effect
to `ReentrantReadWriteLock.getWriteHoldCount`.

**Returns:** the number of holds on this lock by the current thread,
        or zero if this lock is not held by the current thread

**Since:** 1.6

## ReentrantReadWriteLock.isFair()

```java
public final boolean isFair()
```

Returns `true` if this lock has fairness set true.

**Returns:** `true` if this lock has fairness set true

## ReentrantReadWriteLock.getOwner()

```java
protected Thread getOwner()
```

Returns the thread that currently owns the write lock, or
`null` if not owned. When this method is called by a
thread that is not the owner, the return value reflects a
best-effort approximation of current lock status. For example,
the owner may be momentarily `null` even if there are
threads trying to acquire the lock but have not yet done so.
This method is designed to facilitate construction of
subclasses that provide more extensive lock monitoring
facilities.

**Returns:** the owner, or `null` if not owned

## ReentrantReadWriteLock.getReadLockCount()

```java
public int getReadLockCount()
```

Queries the number of read locks held for this lock. This
method is designed for use in monitoring system state, not for
synchronization control.

**Returns:** the number of read locks held

## ReentrantReadWriteLock.isWriteLocked()

```java
public boolean isWriteLocked()
```

Queries if the write lock is held by any thread. This method is
designed for use in monitoring system state, not for
synchronization control.

**Returns:** `true` if any thread holds the write lock and
        `false` otherwise

## ReentrantReadWriteLock.isWriteLockedByCurrentThread()

```java
public boolean isWriteLockedByCurrentThread()
```

Queries if the write lock is held by the current thread.

**Returns:** `true` if the current thread holds the write lock and
        `false` otherwise

## ReentrantReadWriteLock.getWriteHoldCount()

```java
public int getWriteHoldCount()
```

Queries the number of reentrant write holds on this lock by the
current thread.  A writer thread has a hold on a lock for
each lock action that is not matched by an unlock action.

**Returns:** the number of holds on the write lock by the current thread,
        or zero if the write lock is not held by the current thread

## ReentrantReadWriteLock.getReadHoldCount()

```java
public int getReadHoldCount()
```

Queries the number of reentrant read holds on this lock by the
current thread.  A reader thread has a hold on a lock for
each lock action that is not matched by an unlock action.

**Returns:** the number of holds on the read lock by the current thread,
        or zero if the read lock is not held by the current thread

**Since:** 1.6

## ReentrantReadWriteLock.getQueuedWriterThreads()

```java
protected Collection<Thread> getQueuedWriterThreads()
```

Returns a collection containing threads that may be waiting to
acquire the write lock.  Because the actual set of threads may
change dynamically while constructing this result, the returned
collection is only a best-effort estimate.  The elements of the
returned collection are in no particular order.  This method is
designed to facilitate construction of subclasses that provide
more extensive lock monitoring facilities.

**Returns:** the collection of threads

## ReentrantReadWriteLock.getQueuedReaderThreads()

```java
protected Collection<Thread> getQueuedReaderThreads()
```

Returns a collection containing threads that may be waiting to
acquire the read lock.  Because the actual set of threads may
change dynamically while constructing this result, the returned
collection is only a best-effort estimate.  The elements of the
returned collection are in no particular order.  This method is
designed to facilitate construction of subclasses that provide
more extensive lock monitoring facilities.

**Returns:** the collection of threads

## ReentrantReadWriteLock.hasQueuedThreads()

```java
public final boolean hasQueuedThreads()
```

Queries whether any threads are waiting to acquire the read or
write lock. Note that because cancellations may occur at any
time, a `true` return does not guarantee that any other
thread will ever acquire a lock.  This method is designed
primarily for use in monitoring of the system state.

**Returns:** `true` if there may be other threads waiting to
        acquire the lock

## ReentrantReadWriteLock.hasQueuedThread(Thread)

```java
public final boolean hasQueuedThread(Thread thread)
```

Queries whether the given thread is waiting to acquire either
the read or write lock. Note that because cancellations may
occur at any time, a `true` return does not guarantee
that this thread will ever acquire a lock.  This method is
designed primarily for use in monitoring of the system state.

Parameters:

- `thread`: the thread

**Returns:** `true` if the given thread is queued waiting for this lock

Throws:

- `NullPointerException`: if the thread is null

## ReentrantReadWriteLock.getQueueLength()

```java
public final int getQueueLength()
```

Returns an estimate of the number of threads waiting to acquire
either the read or write lock.  The value is only an estimate
because the number of threads may change dynamically while this
method traverses internal data structures.  This method is
designed for use in monitoring system state, not for
synchronization control.

**Returns:** the estimated number of threads waiting for this lock

## ReentrantReadWriteLock.getQueuedThreads()

```java
protected Collection<Thread> getQueuedThreads()
```

Returns a collection containing threads that may be waiting to
acquire either the read or write lock.  Because the actual set
of threads may change dynamically while constructing this
result, the returned collection is only a best-effort estimate.
The elements of the returned collection are in no particular
order.  This method is designed to facilitate construction of
subclasses that provide more extensive monitoring facilities.

**Returns:** the collection of threads

## ReentrantReadWriteLock.hasWaiters(Condition)

```java
public boolean hasWaiters(Condition condition)
```

Queries whether any threads are waiting on the given condition
associated with the write lock. Note that because timeouts and
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

## ReentrantReadWriteLock.getWaitQueueLength(Condition)

```java
public int getWaitQueueLength(Condition condition)
```

Returns an estimate of the number of threads waiting on the
given condition associated with the write lock. Note that because
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

## ReentrantReadWriteLock.getWaitingThreads(Condition)

```java
protected Collection<Thread> getWaitingThreads(Condition condition)
```

Returns a collection containing those threads that may be
waiting on the given condition associated with the write lock.
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
