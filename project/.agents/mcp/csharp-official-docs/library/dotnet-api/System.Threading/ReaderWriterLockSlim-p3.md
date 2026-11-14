---
title: "ReaderWriterLockSlim class (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ReaderWriterLockSlim.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReaderWriterLockSlim class (part 3 of 5)

## ReaderWriterLockSlim.WaitingWriteCount property

```csharp
public int WaitingWriteCount { get; }
```

Gets the total number of threads that are waiting to enter the lock in write mode.

Returns: The total number of threads that are waiting to enter write mode.

#### Remarks
Use this property only for debugging, profiling, and logging purposes, and not to control the behavior of an algorithm. The results can change as soon as they have been calculated. Therefore, it is not safe to make decisions based on this property.

#### Examples
The following example shows how to use the `WaitingWriteCount` property to generate an event log entry if the number of threads that are blocked, waiting to enter write mode, exceeds a threshold.

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/CurrentReadCount/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/CurrentReadCount/source.cs._

## ReaderWriterLockSlim.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `ReaderWriterLockSlim` class.

Exceptions:

- `SynchronizationLockException`: `ReaderWriterLockSlim.WaitingReadCount` is greater than zero.

-or-

`ReaderWriterLockSlim.WaitingUpgradeCount` is greater than zero.

-or-

`ReaderWriterLockSlim.WaitingWriteCount` is greater than zero.

#### Remarks
Call `ReaderWriterLockSlim.Dispose` when you are finished using the `ReaderWriterLockSlim`. The `ReaderWriterLockSlim.Dispose` method leaves the `ReaderWriterLockSlim` in an unusable state. After calling `ReaderWriterLockSlim.Dispose`, you must release all references to the `ReaderWriterLockSlim` so the garbage collector can reclaim the memory that the `ReaderWriterLockSlim` was occupying. For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
> Always call `ReaderWriterLockSlim.Dispose` before you release your last reference to the `ReaderWriterLockSlim` object.

## ReaderWriterLockSlim.EnterReadLock() method

```csharp
public void EnterReadLock ();
```

Tries to enter the lock in read mode.

Exceptions:

- `LockRecursionException`: The `ReaderWriterLockSlim.RecursionPolicy` property is `LockRecursionPolicy.NoRecursion`, and the current thread has attempted to acquire the read lock when it already holds the read lock.

-or-

The `ReaderWriterLockSlim.RecursionPolicy` property is `LockRecursionPolicy.NoRecursion`, and the current thread has attempted to acquire the read lock when it already holds the write lock.

-or-

The recursion number would exceed the capacity of the counter. This limit is so large that applications should never encounter this exception.
- `ObjectDisposedException`: The `ReaderWriterLockSlim` object has been disposed.

#### Remarks
This method blocks until the calling thread enters the lock, and therefore might never return. Use the `ReaderWriterLockSlim.TryEnterReadLock` method to block for a specified interval, and then return if the calling thread has not entered read mode during that interval.

Multiple threads can enter read mode at the same time.

If one or more threads are waiting to enter write mode, a thread that calls the `ReaderWriterLockSlim.EnterReadLock` method blocks until those threads have either timed out or entered write mode and then exited from it.

> **Note:**
> If a lock allows recursion, a thread that has entered the lock in read mode can enter read mode recursively, even if other threads are waiting to enter write mode.

At most one thread can be in upgradeable mode while other threads are in read mode. If additional threads are waiting to enter upgradeable mode, and there are no threads waiting to enter write mode, threads that call the `ReaderWriterLockSlim.EnterReadLock` method enter read mode immediately and do not block.

#### Examples
The following example shows how to use the `ReaderWriterLockSlim.EnterReadLock` method to enter the lock in read mode. The method shown in the example retrieves the value associated with a key. If the key is not found, the exception thrown by the inner `Dictionary<T1,T2>` is allowed to terminate the method. A `finally` block is used to execute the `ReaderWriterLockSlim.ExitReadLock` method, ensuring that the caller exits read mode.

This code is part of a larger example provided for the `ReaderWriterLockSlim` class.

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/Overview/source.cs._

## ReaderWriterLockSlim.EnterUpgradeableReadLock() method

```csharp
public void EnterUpgradeableReadLock ();
```

Tries to enter the lock in upgradeable mode.

Exceptions:

- `LockRecursionException`: The `ReaderWriterLockSlim.RecursionPolicy` property is `LockRecursionPolicy.NoRecursion` and the current thread has already entered the lock in any mode.

-or-

The current thread has entered read mode, so trying to enter upgradeable mode would create the possibility of a deadlock.

-or-

The recursion number would exceed the capacity of the counter. The limit is so large that applications should never encounter it.
- `ObjectDisposedException`: The `ReaderWriterLockSlim` object has been disposed.

#### Remarks
This method blocks until the calling thread enters the lock, and therefore might never return. Use the `ReaderWriterLockSlim.TryEnterUpgradeableReadLock` method to block for a specified interval, and then return if the calling thread has not entered upgradeable mode during that interval.

Use upgradeable mode when a thread usually accesses the resource that is protected by the `ReaderWriterLockSlim` in read mode, but may need to enter write mode if certain conditions are met. A thread in upgradeable mode can downgrade to read mode or upgrade to write mode.

Only one thread can enter upgradeable mode at any given time. If a thread is in upgradeable mode, and there are no threads waiting to enter write mode, any number of other threads can enter read mode, even if there are threads waiting to enter upgradeable mode.

If one or more threads are waiting to enter write mode, a thread that calls the `ReaderWriterLockSlim.EnterUpgradeableReadLock` method blocks until those threads have either timed out or entered write mode and then exited from it.

> **Note:**
> If a lock allows recursion, a thread that has entered the lock in upgradeable mode can enter upgradeable mode recursively, even if other threads are waiting to enter write mode.

#### Examples
The following example shows how to use the `ReaderWriterLockSlim.EnterUpgradeableReadLock` method to enter the lock in upgradeable mode. A `finally` block is used to execute the `ReaderWriterLockSlim.ExitUpgradeableReadLock` method, ensuring that the caller exits upgradeable mode.

The method shown in the example retrieves the value associated with a key and compares it with a new value. If the value is unchanged, the method returns a status indicating no change. If no value is found for the key, the key/value pair is inserted. If the value has changed, it is updated. Upgradeable mode allows the thread to upgrade the read lock as needed, without risk of deadlocks.

The example uses the parameterless constructor to create the lock, so recursion is not allowed. Programming the `ReaderWriterLockSlim` is simpler and less prone to error when the lock does not allow recursion.

This code is part of a larger example provided for the `ReaderWriterLockSlim` class.

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/Overview/source.cs._

## ReaderWriterLockSlim.EnterWriteLock() method

```csharp
public void EnterWriteLock ();
```

Tries to enter the lock in write mode.

Exceptions:

- `LockRecursionException`: The `ReaderWriterLockSlim.RecursionPolicy` property is `LockRecursionPolicy.NoRecursion` and the current thread has already entered the lock in any mode.

-or-

The current thread has entered read mode and doesn't already own a write lock, so trying to enter the lock in write mode would create the possibility of a deadlock.

-or-

The recursion number would exceed the capacity of the counter. The limit is so large that applications should never encounter it.
- `ObjectDisposedException`: The `ReaderWriterLockSlim` object has been disposed.

#### Remarks
This method blocks until the calling thread enters the lock, and therefore might never return. Use the `ReaderWriterLockSlim.TryEnterWriteLock` method to block for a specified interval, and then return if the calling thread has not entered write mode during that interval.

If other threads have entered the lock in read mode, a thread that calls the `ReaderWriterLockSlim.EnterWriteLock` method blocks until those threads have exited read mode. When there are threads waiting to enter write mode, additional threads that try to enter read mode or upgradeable mode block until all the threads waiting to enter write mode have either timed out or entered write mode and then exited from it.

> **Note:**
> If a lock allows recursion, a thread that has entered the lock in write mode can enter write mode recursively, even if other threads are waiting to enter write mode.

#### Examples
The following example shows how to use the `ReaderWriterLockSlim.EnterWriteLock` method to enter the lock in write mode. The method shown in the example adds a new key/value pair to the synchronized cache. If the key is already in the cache, the exception thrown by the inner `Dictionary<T1,T2>` is allowed to terminate the method. A `finally` block is used to execute the `ReaderWriterLockSlim.ExitWriteLock` method, ensuring that the caller exits write mode.

This code is part of a larger example provided for the `ReaderWriterLockSlim` class.

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/Overview/source.cs._

## ReaderWriterLockSlim.ExitReadLock() method

```csharp
public void ExitReadLock ();
```

Reduces the recursion count for read mode, and exits read mode if the resulting count is 0 (zero).

Exceptions:

- `SynchronizationLockException`: The current thread has not entered the lock in read mode.

#### Remarks
This method is not sensitive to recursion order. For example, if a thread enters a lock in upgradeable mode and then enters the lock in read mode, the order in which the thread exits the two modes does not matter. If a lock allows recursion, a thread can enter the lock in write mode and then enter it recursively in read mode; the order in which the thread exits read mode and write mode does not matter.

Exiting the lock might signal other waiting threads.

#### Examples
The following example shows how to use a `finally` block to execute the `ReaderWriterLockSlim.ExitReadLock` method, ensuring that the caller exits read mode. The method shown in the example retrieves the value associated with a key. If the key is not found, the exception thrown by the inner `Dictionary<T1,T2>` is allowed to terminate the method. The `ReaderWriterLockSlim.EnterReadLock` method is used to enter read mode.

This code is part of a larger example provided for the `ReaderWriterLockSlim` class.

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/Overview/source.cs._

## ReaderWriterLockSlim.ExitUpgradeableReadLock() method

```csharp
public void ExitUpgradeableReadLock ();
```

Reduces the recursion count for upgradeable mode, and exits upgradeable mode if the resulting count is 0 (zero).

Exceptions:

- `SynchronizationLockException`: The current thread has not entered the lock in upgradeable mode.

#### Remarks
This method is not sensitive to recursion order. For example, if a thread enters a lock in upgradeable mode and then enters the lock in write mode, the order in which the thread exits the two modes does not matter. If a lock allows recursion, a thread can enter the lock in write mode and then enter it recursively in upgradeable mode; the order in which the thread exits upgradeable mode and write mode does not matter.

Exiting the lock might signal other waiting threads.

#### Examples
The following example shows how to use a `finally` block to execute the `ReaderWriterLockSlim.ExitUpgradeableReadLock` method, ensuring that the caller exits upgradeable mode.

The method shown in the example retrieves the value associated with a key and compares it with a new value. If the value is unchanged, the method returns a status indicating no change. If no value is found for the key, the key/value pair is inserted. If the value has changed, it is updated. Upgradeable mode allows the thread to upgrade the read lock as needed, without risk of deadlocks.

The example uses the parameterless constructor to create the lock, so recursion is not allowed. Programming the `ReaderWriterLockSlim` is simpler and less prone to error when the lock does not allow recursion.

This code is part of a larger example provided for the `ReaderWriterLockSlim` class.

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLockSlim/Overview/source.cs._
