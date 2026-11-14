# StampedLock class (java.util.concurrent.locks)

```java
public class StampedLock implements java.io.Serializable
```

A capability-based lock with three modes for controlling read/write
access.  The state of a StampedLock consists of a version and mode.
Lock acquisition methods return a stamp that represents and
controls access with respect to a lock state; "try" versions of
these methods may instead return the special value zero to
represent failure to acquire access. Lock release and conversion
methods require stamps as arguments, and fail if they do not match
the state of the lock. The three modes are:

<ul>

 <li><b>Writing.</b> Method {@link #writeLock} possibly blocks
  waiting for exclusive access, returning a stamp that can be used
  in method {@link #unlockWrite} to release the lock. Untimed and
  timed versions of {@code tryWriteLock} are also provided. When
  the lock is held in write mode, no read locks may be obtained,
  and all optimistic read validations will fail.

 <li><b>Reading.</b> Method {@link #readLock} possibly blocks
  waiting for non-exclusive access, returning a stamp that can be
  used in method {@link #unlockRead} to release the lock. Untimed
  and timed versions of {@code tryReadLock} are also provided.

 <li><b>Optimistic Reading.</b> Method {@link #tryOptimisticRead}
  returns a non-zero stamp only if the lock is not currently held in
  write mode.  Method {@link #validate} returns true if the lock has not
  been acquired in write mode since obtaining a given stamp, in which
  case all actions prior to the most recent write lock release
  happen-before actions following the call to {@code tryOptimisticRead}.
  This mode can be thought of as an extremely weak version of a
  read-lock, that can be broken by a writer at any time.  The use of
  optimistic read mode for short read-only code segments often reduces
  contention and improves throughput.  However, its use is inherently
  fragile.  Optimistic read sections should only read fields and hold
  them in local variables for later use after validation. Fields read
  while in optimistic read mode may be wildly inconsistent, so usage
  applies only when you are familiar enough with data representations to
  check consistency and/or repeatedly invoke method {@code validate()}.
  For example, such steps are typically required when first reading an
  object or array reference, and then accessing one of its fields,
  elements or methods.

</ul>

<p>This class also supports methods that conditionally provide
conversions across the three modes. For example, method {@link
#tryConvertToWriteLock} attempts to "upgrade" a mode, returning
a valid write stamp if (1) already in writing mode (2) in reading
mode and there are no other readers or (3) in optimistic read mode
and the lock is available. The forms of these methods are designed to
help reduce some of the code bloat that otherwise occurs in
retry-based designs.

<p>StampedLocks are designed for use as internal utilities in the
development of thread-safe components. Their use relies on
knowledge of the internal properties of the data, objects, and
methods they are protecting.  They are not reentrant, so locked
bodies should not call other unknown methods that may try to
re-acquire locks (although you may pass a stamp to other methods
that can use or convert it).  The use of read lock modes relies on
the associated code sections being side-effect-free.  Unvalidated
optimistic read sections cannot call methods that are not known to
tolerate potential inconsistencies.  Stamps use finite
representations, and are not cryptographically secure (i.e., a
valid stamp may be guessable). Stamp values may recycle after (no
sooner than) one year of continuous operation. A stamp held without
use or validation for longer than this period may fail to validate
correctly.  StampedLocks are serializable, but always deserialize
into initial unlocked state, so they are not useful for remote
locking.

<p>Like {@link java.util.concurrent.Semaphore Semaphore}, but unlike most
{@link Lock} implementations, StampedLocks have no notion of ownership.
Locks acquired in one thread can be released or converted in another.

<p>The scheduling policy of StampedLock does not consistently
prefer readers over writers or vice versa.  All "try" methods are
best-effort and do not necessarily conform to any scheduling or
fairness policy. A zero return from any "try" method for acquiring
or converting locks does not carry any information about the state
of the lock; a subsequent invocation may succeed.

<p>Because it supports coordinated usage across multiple lock
modes, this class does not directly implement the {@link Lock} or
{@link ReadWriteLock} interfaces. However, a StampedLock may be
viewed {@link #asReadLock()}, {@link #asWriteLock()}, or {@link
#asReadWriteLock()} in applications requiring only the associated
set of functionality.

<p><b>Memory Synchronization.</b> Methods with the effect of
successfully locking in any mode have the same memory
synchronization effects as a <em>Lock</em> action, as described in
Chapter 17 of <cite>The Java Language Specification</cite>.
Methods successfully unlocking in write mode have the same memory
synchronization effects as an <em>Unlock</em> action.  In optimistic
read usages, actions prior to the most recent write mode unlock action
are guaranteed to happen-before those following a tryOptimisticRead
only if a later validate returns true; otherwise there is no guarantee
that the reads between tryOptimisticRead and validate obtain a
consistent snapshot.

<p><b>Sample Usage.</b> The following illustrates some usage idioms
in a class that maintains simple two-dimensional points. The sample
code illustrates some try/catch conventions even though they are
not strictly needed here because no exceptions can occur in their
bodies.

<pre> {@code
class Point {
  private double x, y;
  private final StampedLock sl = new StampedLock();

  // an exclusively locked method
  void move(double deltaX, double deltaY) {
    long stamp = sl.writeLock();
    try {
      x += deltaX;
      y += deltaY;
    } finally {
      sl.unlockWrite(stamp);
    }
  }

  // a read-only method
  // upgrade from optimistic read to read lock
  double distanceFromOrigin() {
    long stamp = sl.tryOptimisticRead();
    try {
      retryHoldingLock: for (;; stamp = sl.readLock()) {
        if (stamp == 0L)
          continue retryHoldingLock;
        // possibly racy reads
        double currentX = x;
        double currentY = y;
        if (!sl.validate(stamp))
          continue retryHoldingLock;
        return Math.hypot(currentX, currentY);
      }
    } finally {
      if (StampedLock.isReadLockStamp(stamp))
        sl.unlockRead(stamp);
    }
  }

  // upgrade from optimistic read to write lock
  void moveIfAtOrigin(double newX, double newY) {
    long stamp = sl.tryOptimisticRead();
    try {
      retryHoldingLock: for (;; stamp = sl.writeLock()) {
        if (stamp == 0L)
          continue retryHoldingLock;
        // possibly racy reads
        double currentX = x;
        double currentY = y;
        if (!sl.validate(stamp))
          continue retryHoldingLock;
        if (currentX != 0.0 || currentY != 0.0)
          break;
        stamp = sl.tryConvertToWriteLock(stamp);
        if (stamp == 0L)
          continue retryHoldingLock;
        // exclusive access
        x = newX;
        y = newY;
        return;
      }
    } finally {
      if (StampedLock.isWriteLockStamp(stamp))
        sl.unlockWrite(stamp);
    }
  }

  // upgrade read lock to write lock
  void moveIfAtOrigin2(double newX, double newY) {
    long stamp = sl.readLock();
    try {
      while (x == 0.0 && y == 0.0) {
        long ws = sl.tryConvertToWriteLock(stamp);
        if (ws != 0L) {
          stamp = ws;
          x = newX;
          y = newY;
          break;
        }
        else {
          sl.unlockRead(stamp);
          stamp = sl.writeLock();
        }
      }
    } finally {
      sl.unlock(stamp);
    }
  }
}}</pre>

@jls 17.4 Memory Model
@since 1.8
@author Doug Lea

## StampedLock.StampedLock()

```java
public StampedLock()
```

Creates a new lock, initially in unlocked state.

## StampedLock.writeLock()

```java
public long writeLock()
```

Exclusively acquires the lock, blocking if necessary
until available.

@return a write stamp that can be used to unlock or convert mode

## StampedLock.tryWriteLock()

```java
public long tryWriteLock()
```

Exclusively acquires the lock if it is immediately available.

@return a write stamp that can be used to unlock or convert mode,
or zero if the lock is not available

## StampedLock.tryWriteLock(long, TimeUnit)

```java
public long tryWriteLock(long time, TimeUnit unit) throws InterruptedException
```

Exclusively acquires the lock if it is available within the
given time and the current thread has not been interrupted.
Behavior under timeout and interruption matches that specified
for method {@link Lock#tryLock(long,TimeUnit)}.

@param time the maximum time to wait for the lock
@param unit the time unit of the {@code time} argument
@return a write stamp that can be used to unlock or convert mode,
or zero if the lock is not available
@throws InterruptedException if the current thread is interrupted
before acquiring the lock

## StampedLock.writeLockInterruptibly()

```java
public long writeLockInterruptibly() throws InterruptedException
```

Exclusively acquires the lock, blocking if necessary
until available or the current thread is interrupted.
Behavior under interruption matches that specified
for method {@link Lock#lockInterruptibly()}.

@return a write stamp that can be used to unlock or convert mode
@throws InterruptedException if the current thread is interrupted
before acquiring the lock

## StampedLock.readLock()

```java
public long readLock()
```

Non-exclusively acquires the lock, blocking if necessary
until available.

@return a read stamp that can be used to unlock or convert mode

## StampedLock.tryReadLock()

```java
public long tryReadLock()
```

Non-exclusively acquires the lock if it is immediately available.

@return a read stamp that can be used to unlock or convert mode,
or zero if the lock is not available

## StampedLock.tryReadLock(long, TimeUnit)

```java
public long tryReadLock(long time, TimeUnit unit) throws InterruptedException
```

Non-exclusively acquires the lock if it is available within the
given time and the current thread has not been interrupted.
Behavior under timeout and interruption matches that specified
for method {@link Lock#tryLock(long,TimeUnit)}.

@param time the maximum time to wait for the lock
@param unit the time unit of the {@code time} argument
@return a read stamp that can be used to unlock or convert mode,
or zero if the lock is not available
@throws InterruptedException if the current thread is interrupted
before acquiring the lock

## StampedLock.readLockInterruptibly()

```java
public long readLockInterruptibly() throws InterruptedException
```

Non-exclusively acquires the lock, blocking if necessary
until available or the current thread is interrupted.
Behavior under interruption matches that specified
for method {@link Lock#lockInterruptibly()}.

@return a read stamp that can be used to unlock or convert mode
@throws InterruptedException if the current thread is interrupted
before acquiring the lock

## StampedLock.tryOptimisticRead()

```java
public long tryOptimisticRead()
```

Returns a stamp that can later be validated, or zero
if exclusively locked.

@return a valid optimistic read stamp, or zero if exclusively locked

## StampedLock.validate(long)

```java
public boolean validate(long stamp)
```

Returns true if the lock has not been exclusively acquired
since issuance of the given stamp. Always returns false if the
stamp is zero. Always returns true if the stamp represents a
currently held lock. Invoking this method with a value not
obtained from {@link #tryOptimisticRead} or a locking method
for this lock has no defined effect or result.

@param stamp a stamp
@return {@code true} if the lock has not been exclusively acquired
since issuance of the given stamp; else false

## StampedLock.unlockWrite(long)

```java
public void unlockWrite(long stamp)
```

If the lock state matches the given stamp, releases the
exclusive lock.

@param stamp a stamp returned by a write-lock operation
@throws IllegalMonitorStateException if the stamp does
not match the current state of this lock

## StampedLock.unlockRead(long)

```java
public void unlockRead(long stamp)
```

If the lock state matches the given stamp, releases the
non-exclusive lock.

@param stamp a stamp returned by a read-lock operation
@throws IllegalMonitorStateException if the stamp does
not match the current state of this lock

## StampedLock.unlock(long)

```java
public void unlock(long stamp)
```

If the lock state matches the given stamp, releases the
corresponding mode of the lock.

@param stamp a stamp returned by a lock operation
@throws IllegalMonitorStateException if the stamp does
not match the current state of this lock

## StampedLock.tryConvertToWriteLock(long)

```java
public long tryConvertToWriteLock(long stamp)
```

If the lock state matches the given stamp, atomically performs one of
the following actions. If the stamp represents holding a write
lock, returns it.  Or, if a read lock, if the write lock is
available, releases the read lock and returns a write stamp.
Or, if an optimistic read, returns a write stamp only if
immediately available. This method returns zero in all other
cases.

@param stamp a stamp
@return a valid write stamp, or zero on failure

## StampedLock.tryConvertToReadLock(long)

```java
public long tryConvertToReadLock(long stamp)
```

If the lock state matches the given stamp, atomically performs one of
the following actions. If the stamp represents holding a write
lock, releases it and obtains a read lock.  Or, if a read lock,
returns it. Or, if an optimistic read, acquires a read lock and
returns a read stamp only if immediately available. This method
returns zero in all other cases.

@param stamp a stamp
@return a valid read stamp, or zero on failure

## StampedLock.tryConvertToOptimisticRead(long)

```java
public long tryConvertToOptimisticRead(long stamp)
```

If the lock state matches the given stamp then, atomically, if the stamp
represents holding a lock, releases it and returns an
observation stamp.  Or, if an optimistic read, returns it if
validated. This method returns zero in all other cases, and so
may be useful as a form of "tryUnlock".

@param stamp a stamp
@return a valid optimistic read stamp, or zero on failure

## StampedLock.tryUnlockWrite()

```java
public boolean tryUnlockWrite()
```

Releases the write lock if it is held, without requiring a
stamp value. This method may be useful for recovery after
errors.

@return {@code true} if the lock was held, else false

## StampedLock.tryUnlockRead()

```java
public boolean tryUnlockRead()
```

Releases one hold of the read lock if it is held, without
requiring a stamp value. This method may be useful for recovery
after errors.

@return {@code true} if the read lock was held, else false

## StampedLock.isWriteLocked()

```java
public boolean isWriteLocked()
```

Returns {@code true} if the lock is currently held exclusively.

@return {@code true} if the lock is currently held exclusively

## StampedLock.isReadLocked()

```java
public boolean isReadLocked()
```

Returns {@code true} if the lock is currently held non-exclusively.

@return {@code true} if the lock is currently held non-exclusively

## StampedLock.isWriteLockStamp(long)

```java
public static boolean isWriteLockStamp(long stamp)
```

Tells whether a stamp represents holding a lock exclusively.
This method may be useful in conjunction with
{@link #tryConvertToWriteLock}, for example: <pre> {@code
long stamp = sl.tryOptimisticRead();
try {
  ...
  stamp = sl.tryConvertToWriteLock(stamp);
  ...
} finally {
  if (StampedLock.isWriteLockStamp(stamp))
    sl.unlockWrite(stamp);
}}</pre>

@param stamp a stamp returned by a previous StampedLock operation
@return {@code true} if the stamp was returned by a successful
  write-lock operation
@since 10

## StampedLock.isReadLockStamp(long)

```java
public static boolean isReadLockStamp(long stamp)
```

Tells whether a stamp represents holding a lock non-exclusively.
This method may be useful in conjunction with
{@link #tryConvertToReadLock}, for example: <pre> {@code
long stamp = sl.tryOptimisticRead();
try {
  ...
  stamp = sl.tryConvertToReadLock(stamp);
  ...
} finally {
  if (StampedLock.isReadLockStamp(stamp))
    sl.unlockRead(stamp);
}}</pre>

@param stamp a stamp returned by a previous StampedLock operation
@return {@code true} if the stamp was returned by a successful
  read-lock operation
@since 10

## StampedLock.isLockStamp(long)

```java
public static boolean isLockStamp(long stamp)
```

Tells whether a stamp represents holding a lock.
This method may be useful in conjunction with
{@link #tryConvertToReadLock} and {@link #tryConvertToWriteLock},
for example: <pre> {@code
long stamp = sl.tryOptimisticRead();
try {
  ...
  stamp = sl.tryConvertToReadLock(stamp);
  ...
  stamp = sl.tryConvertToWriteLock(stamp);
  ...
} finally {
  if (StampedLock.isLockStamp(stamp))
    sl.unlock(stamp);
}}</pre>

@param stamp a stamp returned by a previous StampedLock operation
@return {@code true} if the stamp was returned by a successful
  read-lock or write-lock operation
@since 10

## StampedLock.isOptimisticReadStamp(long)

```java
public static boolean isOptimisticReadStamp(long stamp)
```

Tells whether a stamp represents a successful optimistic read.

@param stamp a stamp returned by a previous StampedLock operation
@return {@code true} if the stamp was returned by a successful
  optimistic read operation, that is, a non-zero return from
  {@link #tryOptimisticRead()} or
  {@link #tryConvertToOptimisticRead(long)}
@since 10

## StampedLock.getReadLockCount()

```java
public int getReadLockCount()
```

Queries the number of read locks held for this lock. This
method is designed for use in monitoring system state, not for
synchronization control.
@return the number of read locks held

## StampedLock.toString()

```java
public String toString()
```

Returns a string identifying this lock, as well as its lock
state.  The state, in brackets, includes the String {@code
"Unlocked"} or the String {@code "Write-locked"} or the String
{@code "Read-locks:"} followed by the current number of
read-locks held.

@return a string identifying this lock, as well as its lock state

## StampedLock.asReadLock()

```java
public Lock asReadLock()
```

Returns a plain {@link Lock} view of this StampedLock in which
the {@link Lock#lock} method is mapped to {@link #readLock},
and similarly for other methods. The returned Lock does not
support a {@link Condition}; method {@link Lock#newCondition()}
throws {@code UnsupportedOperationException}.

@return the lock

## StampedLock.asWriteLock()

```java
public Lock asWriteLock()
```

Returns a plain {@link Lock} view of this StampedLock in which
the {@link Lock#lock} method is mapped to {@link #writeLock},
and similarly for other methods. The returned Lock does not
support a {@link Condition}; method {@link Lock#newCondition()}
throws {@code UnsupportedOperationException}.

@return the lock

## StampedLock.asReadWriteLock()

```java
public ReadWriteLock asReadWriteLock()
```

Returns a {@link ReadWriteLock} view of this StampedLock in
which the {@link ReadWriteLock#readLock()} method is mapped to
{@link #asReadLock()}, and {@link ReadWriteLock#writeLock()} to
{@link #asWriteLock()}.

@return the lock