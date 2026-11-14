---
title: "StampedLock class (java.util.concurrent.locks) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/locks/StampedLock.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StampedLock class (java.util.concurrent.locks) (part 2 of 2)

## StampedLock.tryUnlockRead()

```java
public boolean tryUnlockRead()
```

Releases one hold of the read lock if it is held, without
requiring a stamp value. This method may be useful for recovery
after errors.

**Returns:** `true` if the read lock was held, else false

## StampedLock.isWriteLocked()

```java
public boolean isWriteLocked()
```

Returns `true` if the lock is currently held exclusively.

**Returns:** `true` if the lock is currently held exclusively

## StampedLock.isReadLocked()

```java
public boolean isReadLocked()
```

Returns `true` if the lock is currently held non-exclusively.

**Returns:** `true` if the lock is currently held non-exclusively

## StampedLock.isWriteLockStamp(long)

```java
public static boolean isWriteLockStamp(long stamp)
```

Tells whether a stamp represents holding a lock exclusively.
This method may be useful in conjunction with
`tryConvertToWriteLock`, for example:

```java
long stamp = sl.tryOptimisticRead();
try {
  ...
  stamp = sl.tryConvertToWriteLock(stamp);
  ...
} finally {
  if (StampedLock.isWriteLockStamp(stamp))
    sl.unlockWrite(stamp);
}
```

Parameters:

- `stamp`: a stamp returned by a previous StampedLock operation

**Returns:** `true` if the stamp was returned by a successful
  write-lock operation

**Since:** 10

## StampedLock.isReadLockStamp(long)

```java
public static boolean isReadLockStamp(long stamp)
```

Tells whether a stamp represents holding a lock non-exclusively.
This method may be useful in conjunction with
`tryConvertToReadLock`, for example:

```java
long stamp = sl.tryOptimisticRead();
try {
  ...
  stamp = sl.tryConvertToReadLock(stamp);
  ...
} finally {
  if (StampedLock.isReadLockStamp(stamp))
    sl.unlockRead(stamp);
}
```

Parameters:

- `stamp`: a stamp returned by a previous StampedLock operation

**Returns:** `true` if the stamp was returned by a successful
  read-lock operation

**Since:** 10

## StampedLock.isLockStamp(long)

```java
public static boolean isLockStamp(long stamp)
```

Tells whether a stamp represents holding a lock.
This method may be useful in conjunction with
`tryConvertToReadLock` and `tryConvertToWriteLock`,
for example:

```java
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
}
```

Parameters:

- `stamp`: a stamp returned by a previous StampedLock operation

**Returns:** `true` if the stamp was returned by a successful
  read-lock or write-lock operation

**Since:** 10

## StampedLock.isOptimisticReadStamp(long)

```java
public static boolean isOptimisticReadStamp(long stamp)
```

Tells whether a stamp represents a successful optimistic read.

Parameters:

- `stamp`: a stamp returned by a previous StampedLock operation

**Returns:** `true` if the stamp was returned by a successful
  optimistic read operation, that is, a non-zero return from
  `tryOptimisticRead()` or
  `tryConvertToOptimisticRead(long)`

**Since:** 10

## StampedLock.getReadLockCount()

```java
public int getReadLockCount()
```

Queries the number of read locks held for this lock. This
method is designed for use in monitoring system state, not for
synchronization control.

**Returns:** the number of read locks held

## StampedLock.toString()

```java
public String toString()
```

Returns a string identifying this lock, as well as its lock
state.  The state, in brackets, includes the String `"Unlocked"` or the String `"Write-locked"` or the String
`"Read-locks:"` followed by the current number of
read-locks held.

**Returns:** a string identifying this lock, as well as its lock state

## StampedLock.asReadLock()

```java
public Lock asReadLock()
```

Returns a plain `Lock` view of this StampedLock in which
the `Lock.lock` method is mapped to `readLock`,
and similarly for other methods. The returned Lock does not
support a `Condition`; method `Lock.newCondition()`
throws `UnsupportedOperationException`.

**Returns:** the lock

## StampedLock.asWriteLock()

```java
public Lock asWriteLock()
```

Returns a plain `Lock` view of this StampedLock in which
the `Lock.lock` method is mapped to `writeLock`,
and similarly for other methods. The returned Lock does not
support a `Condition`; method `Lock.newCondition()`
throws `UnsupportedOperationException`.

**Returns:** the lock

## StampedLock.asReadWriteLock()

```java
public ReadWriteLock asReadWriteLock()
```

Returns a `ReadWriteLock` view of this StampedLock in
which the `ReadWriteLock.readLock()` method is mapped to
`asReadLock()`, and `ReadWriteLock.writeLock()` to
`asWriteLock()`.

**Returns:** the lock
