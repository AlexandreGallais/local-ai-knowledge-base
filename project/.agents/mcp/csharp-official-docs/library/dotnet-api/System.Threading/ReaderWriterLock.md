---
title: "ReaderWriterLock class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ReaderWriterLock.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReaderWriterLock class

Namespace: `System.Threading`

```csharp
public sealed class ReaderWriterLock : System.Runtime.ConstrainedExecution.CriticalFinalizerObject
```

Defines a lock that supports single writers and multiple readers.

#### Remarks

> **Important:**
> .NET provides two reader-writer locks, `ReaderWriterLockSlim` and `ReaderWriterLock`. `ReaderWriterLockSlim` is recommended for all new development. `ReaderWriterLockSlim` is similar to `ReaderWriterLock`, but it has simplified rules for recursion and for upgrading and downgrading lock state. `ReaderWriterLockSlim` avoids many cases of potential deadlock. In addition, the performance of `ReaderWriterLockSlim` is significantly better than `ReaderWriterLock`.

`ReaderWriterLock` is used to synchronize access to a resource. At any given time, it allows either concurrent read access for multiple threads, or write access for a single thread. In a situation where a resource is changed infrequently, a `ReaderWriterLock` provides better throughput than a simple one-at-a-time lock, such as `Monitor`.

`ReaderWriterLock` works best where most accesses are reads, while writes are infrequent and of short duration. Multiple readers alternate with single writers, so that neither readers nor writers are blocked for long periods.

> **Note:**
>  Holding reader locks or writer locks for long periods will starve other threads. For best performance, consider restructuring your application to minimize the duration of writes.

A thread can hold a reader lock or a writer lock, but not both at the same time. Instead of releasing a reader lock in order to acquire the writer lock, you can use `ReaderWriterLock.UpgradeToWriterLock` and `ReaderWriterLock.DowngradeFromWriterLock`.

Recursive lock requests increase the lock count on a lock.

Readers and writers are queued separately. When a thread releases the writer lock, all threads waiting in the reader queue at that instant are granted reader locks; when all of those reader locks have been released, the next thread waiting in the writer queue, if any, is granted the writer lock, and so on. In other words, `ReaderWriterLock` alternates between a collection of readers, and one writer.

While a thread in the writer queue is waiting for active reader locks to be released, threads requesting new reader locks accumulate in the reader queue. Their requests are not granted, even though they could share concurrent access with existing reader-lock holders; this helps protect writers against indefinite blockage by readers.

Most methods for acquiring locks on a `ReaderWriterLock` accept time-out values. Use time-outs to avoid deadlocks in your application. For example, a thread might acquire the writer lock on one resource and then request a reader lock on a second resource; in the meantime, another thread might acquire the writer lock on the second resource, and request a reader lock on the first. Unless time-outs are used, the threads deadlock.

If the time-out interval expires and the lock request has not been granted, the method returns control to the calling thread by throwing an `ApplicationException`. A thread can catch this exception and determine what action to take next.

Time-outs are expressed in milliseconds. If you use a `TimeSpan` to specify the time-out, the value used is the total number of whole milliseconds represented by the `TimeSpan`. The following table shows the valid time-out values in milliseconds.

|Value|Description|
|-----------|-----------------|
|-1|The thread waits until the lock is acquired, regardless of how long it takes. For methods that specify integer time-outs, the constant `Infinite` can be used.|
|0|The thread does not wait to acquire the lock. If the lock cannot be acquired immediately, the method returns.|
|>0|The number of milliseconds to wait.|

With the exception of -1, negative time-out values are not allowed. If you specify a negative integer other than -1, a time-out value of zero is used instead. (That is, the method returns without waiting, if the lock cannot be acquired immediately.) If you specify a `TimeSpan` that represents a negative number of milliseconds other than -1, `ArgumentOutOfRangeException` is thrown.

#### Examples
The following example demonstrates how to use a `ReaderWriterLock` to protect a shared resource, an integer value named `resource`, that is read concurrently and written exclusively by multiple threads. Note that the `ReaderWriterLock` is declared at the class level so that it is visible to all threads.

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

## ReaderWriterLock.ReaderWriterLock() constructor

```csharp
public ReaderWriterLock ();
```

Initializes a new instance of the `ReaderWriterLock` class.

#### Examples
The following code example demonstrates how to create a new instance of the `ReaderWriterLock` class.

This code is part of a larger example provided for the `ReaderWriterLock` class.

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

## ReaderWriterLock.IsReaderLockHeld property

```csharp
public bool IsReaderLockHeld { get; }
```

Gets a value indicating whether the current thread holds a reader lock.

Returns: `true` if the current thread holds a reader lock; otherwise, `false`.

#### Examples
The following code example demonstrates how to use `IsReaderLockHeld` to avoid deadlocks.

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLock/IsReaderLockHeld/source.cs._

## ReaderWriterLock.IsWriterLockHeld property

```csharp
public bool IsWriterLockHeld { get; }
```

Gets a value indicating whether the current thread holds the writer lock.

Returns: `true` if the current thread holds the writer lock; otherwise, `false`.

#### Examples
The following code example demonstrates that when an attempt is made to acquire a reader lock on a thread that has a writer lock, `ReaderWriterLock` does not grant the reader lock but instead increments the lock count on the writer lock.

_Code sample not included: ~/snippets/csharp/System.Threading/ReaderWriterLock/IsReaderLockHeld/source.cs._

## ReaderWriterLock.WriterSeqNum property

```csharp
public int WriterSeqNum { get; }
```

Gets the current sequence number.

Returns: The current sequence number.

#### Remarks
The sequence number increases whenever a thread acquires the writer lock. You can save the sequence number and pass it to `ReaderWriterLock.AnyWritersSince` at a later time, if you want to determine whether other threads have acquired the writer lock in the meantime.

You can use `WriterSeqNum` to improve application performance. For example, a thread might cache the information it obtains while holding a reader lock. After releasing and later reacquiring the lock, the thread can determine whether other threads have written to the resource by calling `AnyWritersSince`; if not, the cached information can be used. This technique is useful when reading the information protected by the lock is expensive; for example, running a database query.

The caller must be holding a reader lock or a writer lock in order for the sequence number to be useful.

#### Examples
The following code example shows how to use the `WriterSeqNum` property and the `ReaderWriterLock.AnyWritersSince` method to determine whether another thread acquired the writer lock on the protected resource since the current thread last held the writer lock.

This code is part of a larger example provided for the `ReaderWriterLock` class.

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

## ReaderWriterLock.AcquireReaderLock(Int32) method

```csharp
public void AcquireReaderLock (int millisecondsTimeout);
```

Acquires a reader lock, using an `Int32` value for the time-out.

Parameters:

- `millisecondsTimeout`: The time-out in milliseconds.

Exceptions:

- `ApplicationException`: `millisecondsTimeout` expires before the lock request is granted.

#### Remarks
`ReaderWriterLock.AcquireReaderLock` blocks if a different thread has the writer lock, or if at least one thread is waiting for the writer lock.

> **Note:**
>  If the current thread already has the writer lock, no reader lock is acquired. Instead, the lock count on the writer lock is incremented. This prevents a thread from blocking on its own writer lock. The result is exactly the same as calling `ReaderWriterLock.AcquireWriterLock`, and an additional call to `ReaderWriterLock.ReleaseWriterLock` is required when releasing the writer lock.

`AcquireReaderLock` supports recursive reader-lock requests. That is, a thread can call AcquireReaderLock multiple times, which increments the lock count each time. You must call `ReaderWriterLock.ReleaseReaderLock` once for each time you call `AcquireReaderLock`. Alternatively, you can call `ReaderWriterLock.ReleaseLock` to reduce the lock count to zero immediately.

Recursive lock requests are always granted immediately, without placing the requesting thread in the reader queue. Use recursive locks with caution, to avoid blocking writer-lock requests for long periods.

For valid time-out values, see `ReaderWriterLock`.

#### Examples
The following code example shows how to acquire and release a reader lock, and how to handle the exception thrown when a request times out.

This code is part of a larger example provided for the `ReaderWriterLock` class.

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

## ReaderWriterLock.AcquireReaderLock(TimeSpan) method

```csharp
public void AcquireReaderLock (TimeSpan timeout);
```

Acquires a reader lock, using a `TimeSpan` value for the time-out.

Parameters:

- `timeout`: A `TimeSpan` specifying the time-out period.

Exceptions:

- `ApplicationException`: `timeout` expires before the lock request is granted.
- `ArgumentOutOfRangeException`: `timeout` specifies a negative value other than -1 milliseconds.

#### Remarks
`ReaderWriterLock.AcquireReaderLock` blocks if a different thread has the writer lock, or if at least one thread is waiting for the writer lock.

> **Note:**
>  If the current thread already has the writer lock, no reader lock is acquired. Instead, the lock count on the writer lock is incremented. This prevents a thread from blocking on its own writer lock. The result is exactly the same as calling `ReaderWriterLock.AcquireWriterLock`, and an additional call to `ReaderWriterLock.ReleaseWriterLock` is required when releasing the writer lock.

`AcquireReaderLock` supports recursive reader-lock requests. That is, a thread can call AcquireReaderLock multiple times, which increments the lock count each time. You must call `ReaderWriterLock.ReleaseReaderLock` once for each time you call `AcquireReaderLock`. Alternatively, you can call `ReaderWriterLock.ReleaseLock` to reduce the lock count to zero immediately.

Recursive lock requests are always granted immediately, without placing the requesting thread in the reader queue. Use recursive locks with caution, to avoid blocking writer-lock requests for long periods.

For valid time-out values, see `ReaderWriterLock`.

## ReaderWriterLock.AcquireWriterLock(Int32) method

```csharp
public void AcquireWriterLock (int millisecondsTimeout);
```

Acquires the writer lock, using an `Int32` value for the time-out.

Parameters:

- `millisecondsTimeout`: The time-out in milliseconds.

Exceptions:

- `ApplicationException`: `millisecondsTimeout` expires before the lock request is granted.

#### Remarks
This method blocks if another thread has a reader lock or writer lock. For a description of the way the writer lock alternates with multiple concurrent reader locks, see the `ReaderWriterLock` class.

A thread that already has a reader lock can acquire the writer lock in one of two ways: by releasing the reader lock before calling `ReaderWriterLock.AcquireWriterLock`, or by calling `ReaderWriterLock.UpgradeToWriterLock`.

> **Caution:**
>  If a thread calls `AcquireWriterLock` while it still has a reader lock, it will block on its own reader lock; if an infinite time-out is specified, the thread will deadlock. To avoid such deadlocks, use `ReaderWriterLock.IsReaderLockHeld` to determine whether the current thread already has a reader lock.

`AcquireWriterLock` supports recursive writer-lock requests. That is, a thread can call `AcquireWriterLock` multiple times, which increments the lock count each time. You must call `ReaderWriterLock.ReleaseWriterLock` once for each time you call `AcquireWriterLock`. Alternatively, you can call `ReaderWriterLock.ReleaseLock` to reduce the lock count to zero immediately.

Recursive lock requests are always granted immediately, without placing the requesting thread in the writer queue.

For valid time-out values, see `ReaderWriterLock`.

#### Examples
The following code example shows how to acquire and release a writer lock, and how to handle the exception thrown when a request times out.

This code is part of a larger example provided for the `ReaderWriterLock` class.

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._
