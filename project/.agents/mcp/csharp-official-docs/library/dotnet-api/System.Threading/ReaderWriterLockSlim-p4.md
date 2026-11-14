---
title: "ReaderWriterLockSlim class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ReaderWriterLockSlim.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReaderWriterLockSlim class (part 4 of 5)

## ReaderWriterLockSlim.ExitWriteLock() method

```csharp
public void ExitWriteLock ();
```

Reduces the recursion count for write mode, and exits write mode if the resulting count is 0 (zero).

Exceptions:

- `SynchronizationLockException`: The current thread has not entered the lock in write mode.

#### Remarks
This method is not sensitive to recursion order. For example, if a thread enters a lock in upgradeable mode and then enters the lock in write mode, the order in which the thread exits the two modes does not matter. If a lock allows recursion, a thread can enter the lock in write mode and then enter it recursively in read mode; the order in which the thread exits read mode and write mode does not matter.

Exiting the lock might signal other waiting threads.

#### Examples
The following example shows how to use a `finally` block to execute the `ReaderWriterLockSlim.ExitWriteLock` method, ensuring that the caller exits write mode. The method shown in the example adds a new key/value pair to the synchronized cache. If the key is already in the cache, the exception thrown by the inner `Dictionary<T1,T2>` is allowed to terminate the method. The `ReaderWriterLockSlim.EnterWriteLock` method is used to enter the lock in write mode.

This code is part of a larger example provided for the `ReaderWriterLockSlim` class.

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/Overview/source.cs._

## ReaderWriterLockSlim.TryEnterReadLock(Int32) method

```csharp
public bool TryEnterReadLock (int millisecondsTimeout);
```

Tries to enter the lock in read mode, with an optional integer time-out.

Parameters:

- `millisecondsTimeout`: The number of milliseconds to wait, or -1 (`Timeout.Infinite`) to wait indefinitely.

Returns: `true` if the calling thread entered read mode, otherwise, `false`.

Exceptions:

- `LockRecursionException`: The `ReaderWriterLockSlim.RecursionPolicy` property is `LockRecursionPolicy.NoRecursion` and the current thread has already entered the lock.

-or-

The recursion number would exceed the capacity of the counter. The limit is so large that applications should never encounter it.
- `ArgumentOutOfRangeException`: The value of `millisecondsTimeout` is negative, but it is not equal to `Timeout.Infinite` (-1), which is the only negative value allowed.
- `ObjectDisposedException`: The `ReaderWriterLockSlim` object has been disposed.

#### Remarks
If `millisecondsTimeout` is 0 (zero), this method checks the lock state and returns `false` immediately if the desired state is unavailable.

Multiple threads can enter read mode at the same time.

If one or more threads are waiting to enter write mode, a thread that calls the `ReaderWriterLockSlim.TryEnterReadLock` method blocks until those threads have either timed out or entered write mode and then exited from it, or until the calling thread's own time-out interval expires.

> **Note:**
> If a lock allows recursion, a thread that has entered the lock in read mode can enter read mode recursively, even if other threads are waiting to enter write mode.

One thread can be in upgradeable mode while other threads are in read mode. If additional threads are waiting to enter upgradeable mode, and there are no threads waiting to enter write mode, threads that call the `ReaderWriterLockSlim.TryEnterReadLock` method enter read mode immediately and do not block.

## ReaderWriterLockSlim.TryEnterReadLock(TimeSpan) method

```csharp
public bool TryEnterReadLock (TimeSpan timeout);
```

Tries to enter the lock in read mode, with an optional time-out.

Parameters:

- `timeout`: The interval to wait, or -1 milliseconds to wait indefinitely.

Returns: `true` if the calling thread entered read mode, otherwise, `false`.

Exceptions:

- `LockRecursionException`: The `ReaderWriterLockSlim.RecursionPolicy` property is `LockRecursionPolicy.NoRecursion` and the current thread has already entered the lock.

-or-

The recursion number would exceed the capacity of the counter. The limit is so large that applications should never encounter it.
- `ArgumentOutOfRangeException`: The value of `timeout` is negative, but it is not equal to -1 milliseconds, which is the only negative value allowed.

-or-

The value of `timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> milliseconds.
- `ObjectDisposedException`: The `ReaderWriterLockSlim` object has been disposed.

#### Remarks
If `timeout` is 0 (zero), this method checks the lock state and returns `false` immediately if the desired state is unavailable.

Multiple threads can enter the lock in read mode at the same time.

If one or more threads are queued to enter write mode, a thread that calls the `ReaderWriterLockSlim.TryEnterReadLock` method blocks until those threads have either timed out or entered write mode and then exited from it, or until the calling thread's own time-out interval expires.

> **Note:**
> If a lock allows recursion, a thread that has entered the lock in read mode can enter read mode recursively, even if other threads are waiting to enter write mode.

One thread can be in upgradeable mode while other threads are in read mode. If additional threads are waiting to enter upgradeable mode, and there are no threads waiting to enter write mode, threads that call the `ReaderWriterLockSlim.TryEnterReadLock` method enter read mode immediately and do not block.

## ReaderWriterLockSlim.TryEnterUpgradeableReadLock(Int32) method

```csharp
public bool TryEnterUpgradeableReadLock (int millisecondsTimeout);
```

Tries to enter the lock in upgradeable mode, with an optional time-out.

Parameters:

- `millisecondsTimeout`: The number of milliseconds to wait, or -1 (`Timeout.Infinite`) to wait indefinitely.

Returns: `true` if the calling thread entered upgradeable mode, otherwise, `false`.

Exceptions:

- `LockRecursionException`: The `ReaderWriterLockSlim.RecursionPolicy` property is `LockRecursionPolicy.NoRecursion` and the current thread has already entered the lock.

-or-

The current thread initially entered the lock in read mode, and therefore trying to enter upgradeable mode would create the possibility of a deadlock.

-or-

The recursion number would exceed the capacity of the counter. The limit is so large that applications should never encounter it.
- `ArgumentOutOfRangeException`: The value of `millisecondsTimeout` is negative, but it is not equal to `Timeout.Infinite` (-1), which is the only negative value allowed.
- `ObjectDisposedException`: The `ReaderWriterLockSlim` object has been disposed.

#### Remarks
If `millisecondsTimeout` is 0 (zero), this method checks the lock state and returns `false` immediately if the desired state is unavailable.

Use upgradeable mode when a thread usually accesses the resource that is protected by the `ReaderWriterLockSlim` in read mode, but may need to enter write mode if certain conditions are met. A thread in upgradeable mode can upgrade to write mode or downgrade to read mode.

Only one thread can enter a lock in upgradeable mode at any given time. If a thread is in upgradeable mode, and there are no threads waiting to enter write mode, any number of other threads can enter read mode, even if there are threads waiting to enter upgradeable mode.

If one or more threads are waiting to enter write mode, a thread that calls the `ReaderWriterLockSlim.TryEnterUpgradeableReadLock` method blocks until those threads have either timed out or entered write mode and then exited from it, or until the calling thread's own time-out interval expires.

> **Note:**
> If a lock allows recursion, a thread that has entered the lock in upgradeable mode can enter upgradeable mode recursively, even if other threads are waiting to enter write mode.

## ReaderWriterLockSlim.TryEnterUpgradeableReadLock(TimeSpan) method

```csharp
public bool TryEnterUpgradeableReadLock (TimeSpan timeout);
```

Tries to enter the lock in upgradeable mode, with an optional time-out.

Parameters:

- `timeout`: The interval to wait, or -1 milliseconds to wait indefinitely.

Returns: `true` if the calling thread entered upgradeable mode, otherwise, `false`.

Exceptions:

- `LockRecursionException`: The `ReaderWriterLockSlim.RecursionPolicy` property is `LockRecursionPolicy.NoRecursion` and the current thread has already entered the lock.

-or-

The current thread initially entered the lock in read mode, and therefore trying to enter upgradeable mode would create the possibility of a deadlock.

-or-

The recursion number would exceed the capacity of the counter. The limit is so large that applications should never encounter it.
- `ArgumentOutOfRangeException`: The value of `timeout` is negative, but it is not equal to -1 milliseconds, which is the only negative value allowed.

-or-

The value of `timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> milliseconds.
- `ObjectDisposedException`: The `ReaderWriterLockSlim` object has been disposed.

#### Remarks
If `timeout` is 0 (zero), this method checks the lock state and returns `false` immediately if the desired state is unavailable.

Use upgradeable mode when a thread usually accesses the resource protected by the `ReaderWriterLockSlim` in read mode, but may need to enter write mode if certain conditions are met. A thread in upgradeable mode can upgrade to write mode or downgrade to read mode.

Only one thread can enter a lock in upgradeable mode at any given time. If a thread is in upgradeable mode, and there are no threads waiting to enter write mode, any number of other threads can enter read mode, even if there are threads waiting to enter upgradeable mode.

If one or more threads are waiting to enter write mode, a thread that calls the `ReaderWriterLockSlim.TryEnterUpgradeableReadLock` method blocks until those threads have either timed out or entered write mode and then exited from it, or until the calling thread's own time-out interval expires.

> **Note:**
> If a lock allows recursion, a thread that has entered the lock in upgradeable mode can enter upgradeable mode recursively, even if other threads are waiting to enter write mode.

## ReaderWriterLockSlim.TryEnterWriteLock(Int32) method

```csharp
public bool TryEnterWriteLock (int millisecondsTimeout);
```

Tries to enter the lock in write mode, with an optional time-out.

Parameters:

- `millisecondsTimeout`: The number of milliseconds to wait, or -1 (`Timeout.Infinite`) to wait indefinitely.

Returns: `true` if the calling thread entered write mode, otherwise, `false`.

Exceptions:

- `LockRecursionException`: The `ReaderWriterLockSlim.RecursionPolicy` property is `LockRecursionPolicy.NoRecursion` and the current thread has already entered the lock.

-or-

The current thread initially entered the lock in read mode, and therefore trying to enter write mode would create the possibility of a deadlock.

-or-

The recursion number would exceed the capacity of the counter. The limit is so large that applications should never encounter it.
- `ArgumentOutOfRangeException`: The value of `millisecondsTimeout` is negative, but it is not equal to `Timeout.Infinite` (-1), which is the only negative value allowed.
- `ObjectDisposedException`: The `ReaderWriterLockSlim` object has been disposed.

#### Remarks
If `millisecondsTimeout` is 0 (zero), this method checks the lock state and returns `false` immediately if the desired state is unavailable.

If other threads have entered the lock in read mode, a thread that calls the `ReaderWriterLockSlim.TryEnterWriteLock` method blocks until those threads have exited read mode or until the time-out interval has elapsed. While threads are blocked waiting to enter write mode, additional threads that try to enter read mode or upgradeable mode block until all the threads waiting to enter write mode have either timed out or entered write mode and then exited from it.

> **Note:**
> If a lock allows recursion, a thread that has entered the lock in write mode can enter write mode recursively, even if other threads are waiting to enter write mode.

#### Examples
The following example shows how to use the `ReaderWriterLockSlim.TryEnterWriteLock` method to enter the lock in write mode, with a time-out. The method shown in the example adds a new key/value pair to the synchronized cache. If the specified time-out interval elapses before the thread enters the lock, the method returns `false`. The method returns `true` if the key/value pair is added.

If the key is already in the cache, the exception thrown by the inner `Dictionary<T1,T2>` is allowed to terminate the method. A `finally` block is used to execute the `ReaderWriterLockSlim.ExitWriteLock` method, ensuring that the caller exits the lock.

This code is part of a larger example provided for the `ReaderWriterLockSlim` class.

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/Overview/source.cs._
