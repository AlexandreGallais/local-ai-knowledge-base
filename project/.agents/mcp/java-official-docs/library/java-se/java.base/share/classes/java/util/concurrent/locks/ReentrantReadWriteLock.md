---
title: "ReentrantReadWriteLock class (java.util.concurrent.locks) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/locks/ReentrantReadWriteLock.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ReentrantReadWriteLock class (java.util.concurrent.locks)

```java
public class ReentrantReadWriteLock implements ReadWriteLock, java.io.Serializable
```

An implementation of `ReadWriteLock` supporting similar
semantics to `ReentrantLock`.

This class has the following properties:

- **Acquisition order**

This class does not impose a reader or writer preference
ordering for lock access.  However, it does support an optional
*fairness* policy.

***Non-fair mode (default)***
When constructed as non-fair (the default), the order of entry
to the read and write lock is unspecified, subject to reentrancy
constraints.  A nonfair lock that is continuously contended may
indefinitely postpone one or more reader or writer threads, but
will normally have higher throughput than a fair lock.

***Fair mode***
When constructed as fair, threads contend for entry using an
approximately arrival-order policy. When the currently held lock
is released, either the longest-waiting single writer thread will
be assigned the write lock, or if there is a group of reader threads
waiting longer than all waiting writer threads, that group will be
assigned the read lock.

A thread that tries to acquire a fair read lock (non-reentrantly)
will block if either the write lock is held, or there is a waiting
writer thread. The thread will not acquire the read lock until
after the oldest currently waiting writer thread has acquired and
released the write lock. Of course, if a waiting writer abandons
its wait, leaving one or more reader threads as the longest waiters
in the queue with the write lock free, then those readers will be
assigned the read lock.

A thread that tries to acquire a fair write lock (non-reentrantly)
will block unless both the read lock and write lock are free (which
implies there are no waiting threads).  (Note that the non-blocking
`ReadLock.tryLock()` and `WriteLock.tryLock()` methods
do not honor this fair setting and will immediately acquire the lock
if it is possible, regardless of waiting threads.)

- **Reentrancy**

This lock allows both readers and writers to reacquire read or
write locks in the style of a `ReentrantLock`. Non-reentrant
readers are not allowed until all write locks held by the writing
thread have been released.

Additionally, a writer can acquire the read lock, but not
vice-versa.  Among other applications, reentrancy can be useful
when write locks are held during calls or callbacks to methods that
perform reads under read locks.  If a reader tries to acquire the
write lock it will never succeed.

- **Lock downgrading**

Reentrancy also allows downgrading from the write lock to a read lock,
by acquiring the write lock, then the read lock and then releasing the
write lock. However, upgrading from a read lock to the write lock is
**not** possible.

- **Interruption of lock acquisition**

The read lock and write lock both support interruption during lock
acquisition.

- **`Condition` support**

The write lock provides a `Condition` implementation that
behaves in the same way, with respect to the write lock, as the
`Condition` implementation provided by
`ReentrantLock.newCondition` does for `ReentrantLock`.
This `Condition` can, of course, only be used with the write lock.

The read lock does not support a `Condition` and
`readLock().newCondition()` throws
`UnsupportedOperationException`.

- **Instrumentation**

This class supports methods to determine whether locks
are held or contended. These methods are designed for monitoring
system state, not for synchronization control.

Serialization of this class behaves in the same way as built-in
locks: a deserialized lock is in the unlocked state, regardless of
its state when serialized.

**Sample usages.** Here is a code sketch showing how to perform
lock downgrading after updating a cache (exception handling is
particularly tricky when handling multiple locks in a non-nested
fashion):

```java
class CachedData {
  Object data;
  boolean cacheValid;
  final ReentrantReadWriteLock rwl = new ReentrantReadWriteLock();

  void processCachedData() {
    rwl.readLock().lock();
    // Code between the lock() above, and the unlock() below must not throw
    if (!cacheValid) {
      // Must release read lock before acquiring write lock
      rwl.readLock().unlock();
      rwl.writeLock().lock();
      try {
        // Recheck state because another thread might have
        // acquired write lock and changed state before we did.
        if (!cacheValid) {
          data = ...;
          cacheValid = true;
        }
        // Downgrade by acquiring read lock before releasing write lock
        rwl.readLock().lock();
      } finally {
        rwl.writeLock().unlock(); // Unlock write, still hold read
      }
    }
    // Make sure that code that could throw is executed inside the try block
    try {
      use(data);
    } finally {
      rwl.readLock().unlock();
    }
  }
}
```

ReentrantReadWriteLocks can be used to improve concurrency in some
uses of some kinds of Collections. This is typically worthwhile
only when the collections are expected to be large, accessed by
more reader threads than writer threads, and entail operations with
overhead that outweighs synchronization overhead. For example, here
is a class using a TreeMap that is expected to be large and
concurrently accessed.

```java
class RWDictionary {
  private final Map<String, Data> m = new TreeMap<>();
  private final ReentrantReadWriteLock rwl = new ReentrantReadWriteLock();
  private final Lock r = rwl.readLock();
  private final Lock w = rwl.writeLock();

  public Data get(String key) {
    r.lock();
    try { return m.get(key); }
    finally { r.unlock(); }
  }
  public List<String> allKeys() {
    r.lock();
    try { return new ArrayList<>(m.keySet()); }
    finally { r.unlock(); }
  }
  public Data put(String key, Data value) {
    w.lock();
    try { return m.put(key, value); }
    finally { w.unlock(); }
  }
  public void clear() {
    w.lock();
    try { m.clear(); }
    finally { w.unlock(); }
  }
}
```

#### Implementation Notes

This lock supports a maximum of `Integer.MAX_VALUE` recursive write locks
and `Integer.MAX_VALUE` read locks. Attempts to exceed these limits result in
`Error` throws from locking methods.

**Since:** 1.5

## ReentrantReadWriteLock.ReentrantReadWriteLock()

```java
public ReentrantReadWriteLock()
```

Creates a new `ReentrantReadWriteLock` with
default (nonfair) ordering properties.

## ReentrantReadWriteLock.ReentrantReadWriteLock(boolean)

```java
public ReentrantReadWriteLock(boolean fair)
```

Creates a new `ReentrantReadWriteLock` with
the given fairness policy.

Parameters:

- `fair`: `true` if this lock should use a fair ordering policy

## ReentrantReadWriteLock.ReadLock(ReentrantReadWriteLock)

```java
protected ReadLock(ReentrantReadWriteLock lock)
```

Constructor for use by subclasses.

Parameters:

- `lock`: the outer lock object

Throws:

- `NullPointerException`: if the lock is null

## ReentrantReadWriteLock.lock()

```java
public void lock()
```

Acquires the read lock.

Acquires the read lock if the write lock is not held by
another thread and returns immediately.

If the write lock is held by another thread then
the current thread becomes disabled for thread scheduling
purposes and lies dormant until the read lock has been acquired.

## ReentrantReadWriteLock.lockInterruptibly()

```java
public void lockInterruptibly() throws InterruptedException
```

Acquires the read lock unless the current thread is
interrupted.

Acquires the read lock if the write lock is not held
by another thread and returns immediately.

If the write lock is held by another thread then the
current thread becomes disabled for thread scheduling
purposes and lies dormant until one of two things happens:

- The read lock is acquired by the current thread; or

- Some other thread interrupts
the current thread.

If the current thread:

- has its interrupted status set on entry to this method; or

- is interrupted while
acquiring the read lock,

then `InterruptedException` is thrown and the current
thread's interrupted status is cleared.

In this implementation, as this method is an explicit
interruption point, preference is given to responding to
the interrupt over normal or reentrant acquisition of the
lock.

Throws:

- `InterruptedException`: if the current thread is interrupted

## ReentrantReadWriteLock.tryLock()

```java
public boolean tryLock()
```

Acquires the read lock only if the write lock is not held by
another thread at the time of invocation.

Acquires the read lock if the write lock is not held by
another thread and returns immediately with the value
`true`. Even when this lock has been set to use a
fair ordering policy, a call to `tryLock()`
*will* immediately acquire the read lock if it is
available, whether or not other threads are currently
waiting for the read lock.  This "barging" behavior
can be useful in certain circumstances, even though it
breaks fairness. If you want to honor the fairness setting
for this lock, then use TimeUnit) tryLock(0, TimeUnit.SECONDS) which is almost equivalent
(it also detects interruption).

If the write lock is held by another thread then
this method will return immediately with the value
`false`.

**Returns:** `true` if the read lock was acquired

## ReentrantReadWriteLock.tryLock(long, TimeUnit)

```java
public boolean tryLock(long timeout, TimeUnit unit) throws InterruptedException
```

Acquires the read lock if the write lock is not held by
another thread within the given waiting time and the
current thread has not been interrupted.

Acquires the read lock if the write lock is not held by
another thread and returns immediately with the value
`true`. If this lock has been set to use a fair
ordering policy then an available lock *will not* be
acquired if any other threads are waiting for the
lock. This is in contrast to the `tryLock()`
method. If you want a timed `tryLock` that does
permit barging on a fair lock then combine the timed and
un-timed forms together:

```java
if (lock.tryLock() ||
    lock.tryLock(timeout, unit)) {
  ...
}
```

If the write lock is held by another thread then the
current thread becomes disabled for thread scheduling
purposes and lies dormant until one of three things happens:

- The read lock is acquired by the current thread; or

- Some other thread interrupts
the current thread; or

- The specified waiting time elapses.

If the read lock is acquired then the value `true` is
returned.

If the current thread:

- has its interrupted status set on entry to this method; or

- is interrupted while
acquiring the read lock,

 then `InterruptedException` is thrown and the
current thread's interrupted status is cleared.

If the specified waiting time elapses then the value
`false` is returned.  If the time is less than or
equal to zero, the method will not wait at all.

In this implementation, as this method is an explicit
interruption point, preference is given to responding to
the interrupt over normal or reentrant acquisition of the
lock, and over reporting the elapse of the waiting time.

Parameters:

- `timeout`: the time to wait for the read lock
- `unit`: the time unit of the timeout argument

**Returns:** `true` if the read lock was acquired

Throws:

- `InterruptedException`: if the current thread is interrupted
- `NullPointerException`: if the time unit is null

## ReentrantReadWriteLock.unlock()

```java
public void unlock()
```

Attempts to release this lock.

If the number of readers is now zero then the lock
is made available for write lock attempts. If the current
thread does not hold this lock then `IllegalMonitorStateException` is thrown.

Throws:

- `IllegalMonitorStateException`: if the current thread does not hold this lock

## ReentrantReadWriteLock.newCondition()

```java
public Condition newCondition()
```

Throws `UnsupportedOperationException` because
`ReadLocks` do not support conditions.

Throws:

- `UnsupportedOperationException`: always

## ReentrantReadWriteLock.toString()

```java
public String toString()
```

Returns a string identifying this lock, as well as its lock state.
The state, in brackets, includes the String `"Read locks ="`
followed by the number of held read locks.

**Returns:** a string identifying this lock, as well as its lock state

## ReentrantReadWriteLock.WriteLock(ReentrantReadWriteLock)

```java
protected WriteLock(ReentrantReadWriteLock lock)
```

Constructor for use by subclasses.

Parameters:

- `lock`: the outer lock object

Throws:

- `NullPointerException`: if the lock is null

## ReentrantReadWriteLock.lock()

```java
public void lock()
```

Acquires the write lock.

Acquires the write lock if neither the read nor write lock
are held by another thread
and returns immediately, setting the write lock hold count to
one.

If the current thread already holds the write lock then the
hold count is incremented by one and the method returns
immediately.

If the lock is held by another thread then the current
thread becomes disabled for thread scheduling purposes and
lies dormant until the write lock has been acquired, at which
time the write lock hold count is set to one.

## ReentrantReadWriteLock.lockInterruptibly()

```java
public void lockInterruptibly() throws InterruptedException
```

Acquires the write lock unless the current thread is
interrupted.

Acquires the write lock if neither the read nor write lock
are held by another thread
and returns immediately, setting the write lock hold count to
one.

If the current thread already holds this lock then the
hold count is incremented by one and the method returns
immediately.

If the lock is held by another thread then the current
thread becomes disabled for thread scheduling purposes and
lies dormant until one of two things happens:

- The write lock is acquired by the current thread; or

- Some other thread interrupts
the current thread.

If the write lock is acquired by the current thread then the
lock hold count is set to one.

If the current thread:

- has its interrupted status set on entry to this method;
or

- is interrupted while
acquiring the write lock,

then `InterruptedException` is thrown and the current
thread's interrupted status is cleared.

In this implementation, as this method is an explicit
interruption point, preference is given to responding to
the interrupt over normal or reentrant acquisition of the
lock.

Throws:

- `InterruptedException`: if the current thread is interrupted
