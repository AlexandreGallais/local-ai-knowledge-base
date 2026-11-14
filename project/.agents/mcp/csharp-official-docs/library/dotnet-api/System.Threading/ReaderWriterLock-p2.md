---
title: "ReaderWriterLock class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ReaderWriterLock.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReaderWriterLock class (part 2 of 2)

## ReaderWriterLock.AcquireWriterLock(TimeSpan) method

```csharp
public void AcquireWriterLock (TimeSpan timeout);
```

Acquires the writer lock, using a `TimeSpan` value for the time-out.

Parameters:

- `timeout`: The `TimeSpan` specifying the time-out period.

Exceptions:

- `ApplicationException`: `timeout` expires before the lock request is granted.
- `ArgumentOutOfRangeException`: `timeout` specifies a negative value other than -1 milliseconds.

#### Remarks
This method blocks if another thread has a reader lock or writer lock. For a description of the way the writer lock alternates with multiple concurrent reader locks, see the `ReaderWriterLock` class.

A thread that already has a reader lock can acquire the writer lock in one of two ways: by releasing the reader lock before calling `ReaderWriterLock.AcquireWriterLock`, or by calling `ReaderWriterLock.UpgradeToWriterLock`.

> **Caution:**
>  If a thread calls `AcquireWriterLock` while it still has a reader lock, it will block on its own reader lock; if an infinite time-out is specified, the thread will deadlock. To avoid such deadlocks, use `ReaderWriterLock.IsReaderLockHeld` to determine whether the current thread already has a reader lock.

`AcquireWriterLock` supports recursive writer-lock requests. That is, a thread can call `AcquireWriterLock` multiple times, which increments the lock count each time. You must call `ReaderWriterLock.ReleaseWriterLock` once for each time you call `AcquireWriterLock`. Alternatively, you can call `ReaderWriterLock.ReleaseLock` to reduce the lock count to zero immediately.

Recursive lock requests are always granted immediately, without placing the requesting thread in the writer queue.

For valid time-out values, see `ReaderWriterLock`.

## ReaderWriterLock.AnyWritersSince(Int32) method

```csharp
public bool AnyWritersSince (int seqNum);
```

Indicates whether the writer lock has been granted to any thread since the sequence number was obtained.

Parameters:

- `seqNum`: The sequence number.

Returns: `true` if the writer lock has been granted to any thread since the sequence number was obtained; otherwise, `false`.

#### Remarks
You can use `ReaderWriterLock.WriterSeqNum` and `AnyWritersSince` to improve application performance. For example, a thread might cache the information it obtains while holding a reader lock. After releasing and later reacquiring the lock, the thread can use `AnyWritersSince` to determine whether other threads have written to the resource in the interim; if not, the cached information can be used. This technique is useful where reading the information protected by the lock is expensive; for example, running a database query.

The caller must be holding a reader lock or a writer lock in order for the sequence number to be useful.

#### Examples
The following code example shows how to use the `ReaderWriterLock.AnyWritersSince` method and the `WriterSeqNum` property to determine whether another thread acquired the writer lock on the protected resource since the current thread last held the writer lock.

This code is part of a larger example provided for the `ReaderWriterLock` class.

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

## ReaderWriterLock.DowngradeFromWriterLock(LockCookie) method

```csharp
public void DowngradeFromWriterLock (ref System.Threading.LockCookie lockCookie);
```

Restores the lock status of the thread to what it was before `ReaderWriterLock.UpgradeToWriterLock` was called.

Parameters:

- `lockCookie`: A `LockCookie` returned by `ReaderWriterLock.UpgradeToWriterLock`.

Exceptions:

- `ApplicationException`: The thread does not have the writer lock.
- `NullReferenceException`: The address of `lockCookie` is a null pointer.

#### Remarks
`ReaderWriterLock.DowngradeFromWriterLock` releases the writer lock, regardless of the recursive lock count, and restores the reader lock that was held by the thread before upgrading to the writer lock. The lock count on the reader lock is restored.

> **Note:**
>  `DowngradeFromWriterLock` accepts a `LockCookie` obtained by calling `ReaderWriterLock.UpgradeToWriterLock`. Do not use a `LockCookie` returned by `ReaderWriterLock.ReleaseLock`.

A thread does not block when downgrading from the writer lock, even if other threads are waiting for the writer lock, because all reader-lock requests are granted when the writer lock is released.

#### Examples
The following code example shows how to request a reader lock, upgrade the reader lock to a writer lock, and downgrade to a reader lock again.

This code is part of a larger example provided for the `ReaderWriterLock` class.

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

## ReaderWriterLock.ReleaseLock() method

```csharp
public System.Threading.LockCookie ReleaseLock ();
```

Releases the lock, regardless of the number of times the thread acquired the lock.

Returns: A `LockCookie` value representing the released lock.

#### Remarks
`ReaderWriterLock.ReleaseLock` releases the reader lock or writer lock, regardless of the recursive lock count. To restore the state of the lock, including the lock count, pass the `LockCookie` to `ReaderWriterLock.RestoreLock`.

#### Examples
The following code example shows how to use the `ReaderWriterLock.ReleaseLock` method to release the lock, regardless of how many times it has been acquired by the thread, and how to restore the state of the lock later.

This code is part of a larger example provided for the `ReaderWriterLock` class.

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

## ReaderWriterLock.ReleaseReaderLock() method

```csharp
public void ReleaseReaderLock ();
```

Decrements the lock count.

Exceptions:

- `ApplicationException`: The thread does not have any reader or writer locks.

#### Remarks
`ReaderWriterLock.ReleaseReaderLock` decrements the lock count. When the count reaches zero, the lock is released.

> **Note:**
>  If a thread has the writer lock, calling `ReleaseReaderLock` has the same effect as calling `ReaderWriterLock.ReleaseWriterLock`. If a thread has no locks, calling `ReleaseReaderLock` throws an `ApplicationException`.

#### Examples
The following code example shows how to acquire and release a reader lock, and how to handle the exception thrown when a request times out.

This code is part of a larger example provided for the `ReaderWriterLock` class.

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

## ReaderWriterLock.ReleaseWriterLock() method

```csharp
public void ReleaseWriterLock ();
```

Decrements the lock count on the writer lock.

Exceptions:

- `ApplicationException`: The thread does not have the writer lock.

#### Remarks
`ReaderWriterLock.ReleaseWriterLock` decrements the writer lock count. When the count reaches zero, the writer lock is released.

> **Note:**
>  If a thread has a reader lock, or no locks, calling `ReleaseWriterLock` throws an `ApplicationException`.

#### Examples
The following code example shows how to acquire and release a writer lock, and how to handle the exception thrown when a request times out.

This code is part of a larger example provided for the `ReaderWriterLock` class.

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

## ReaderWriterLock.RestoreLock(LockCookie) method

```csharp
public void RestoreLock (ref System.Threading.LockCookie lockCookie);
```

Restores the lock status of the thread to what it was before calling `ReaderWriterLock.ReleaseLock`.

Parameters:

- `lockCookie`: A `LockCookie` returned by `ReaderWriterLock.ReleaseLock`.

Exceptions:

- `NullReferenceException`: The address of `lockCookie` is a null pointer.

#### Remarks
The state restored by `RestoreLock` includes the recursive lock count.

A thread blocks if it tries to restore a reader lock after another thread has acquired the writer lock, or if it tries to restore the writer lock after another thread has acquired a reader lock or writer lock. Because `RestoreLock` does not accept a time-out, you should take care to avoid possible deadlocks.

> **Caution:**
>  Before calling `RestoreLock`, make sure you have released all locks acquired since the call to `ReaderWriterLock.ReleaseLock`. For example, a thread deadlocks if it acquires a reader lock, and then attempts to restore an earlier writer lock. Use `ReaderWriterLock.IsReaderLockHeld` and `ReaderWriterLock.IsWriterLockHeld` to detect such additional locks.

Do not use a `LockCookie` returned from `ReaderWriterLock.UpgradeToWriterLock`.

#### Examples
The following code example shows how to use the `ReaderWriterLock.ReleaseLock` method to release the lock, regardless of how many times it has been acquired by the thread, and how to restore the state of the lock later.

This code is part of a larger example provided for the `ReaderWriterLock` class.

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

## ReaderWriterLock.UpgradeToWriterLock(Int32) method

```csharp
public System.Threading.LockCookie UpgradeToWriterLock (int millisecondsTimeout);
```

Upgrades a reader lock to the writer lock, using an `Int32` value for the time-out.

Parameters:

- `millisecondsTimeout`: The time-out in milliseconds.

Returns: A `LockCookie` value.

Exceptions:

- `ApplicationException`: `millisecondsTimeout` expires before the lock request is granted.

#### Remarks
When a thread calls `UpgradeToWriterLock` the reader lock is released, regardless of the lock count, and the thread goes to the end of the queue for the writer lock. Thus, other threads might write to the resource before the thread that requested the upgrade is granted the writer lock.

> **Important:**
>  The time-out exception is not thrown until the thread that called the `ReaderWriterLock.UpgradeToWriterLock` method can reacquire the reader lock. If there are no other threads waiting for the writer lock, this happens immediately. However, if another thread is queued for the writer lock, the thread that called the `ReaderWriterLock.UpgradeToWriterLock` method cannot reacquire the reader lock until all current readers have released their locks, and one thread has acquired and released the writer lock. This is true even if the other thread that requested the writer lock requested it after the current thread called the `ReaderWriterLock.UpgradeToWriterLock` method.

To restore the lock state, call `ReaderWriterLock.DowngradeFromWriterLock` using the `LockCookie` returned by `UpgradeToWriterLock`. Do not use this `LockCookie` with `ReaderWriterLock.RestoreLock`.

When a thread has no reader lock, do not use `UpgradeToWriterLock`. Use `ReaderWriterLock.AcquireWriterLock` instead.

For valid time-out values, see `ReaderWriterLock`.

#### Examples
The following code example shows how to request a reader lock, upgrade the reader lock to a writer lock, and downgrade to a reader lock again.

This code is part of a larger example provided for the `ReaderWriterLock` class.

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Threading/LockCookie/Overview/source.cs._

## ReaderWriterLock.UpgradeToWriterLock(TimeSpan) method

```csharp
public System.Threading.LockCookie UpgradeToWriterLock (TimeSpan timeout);
```

Upgrades a reader lock to the writer lock, using a `TimeSpan` value for the time-out.

Parameters:

- `timeout`: The `TimeSpan` specifying the time-out period.

Returns: A `LockCookie` value.

Exceptions:

- `ApplicationException`: `timeout` expires before the lock request is granted.
- `ArgumentOutOfRangeException`: `timeout` specifies a negative value other than -1 milliseconds.

#### Remarks
When a thread calls `UpgradeToWriterLock` the reader lock is released, regardless of the lock count, and the thread goes to the end of the queue for the writer lock. Thus, other threads might write to the resource before the thread that requested the upgrade is granted the writer lock.

> **Important:**
>  The time-out exception is not thrown until the thread that called the `ReaderWriterLock.UpgradeToWriterLock` method can reacquire the reader lock. If there are no other threads waiting for the writer lock, this happens immediately. However, if another thread is queued for the writer lock, the thread that called the `ReaderWriterLock.UpgradeToWriterLock` method cannot reacquire the reader lock until all current readers have released their locks, and one thread has acquired and released the writer lock. This is true even if the other thread that requested the writer lock requested it after the current thread called the `ReaderWriterLock.UpgradeToWriterLock` method.

To restore the lock state, call `ReaderWriterLock.DowngradeFromWriterLock` using the `LockCookie` returned by `UpgradeToWriterLock`. Do not use this `LockCookie` with `ReaderWriterLock.RestoreLock`.

When a thread has no reader lock, do not use `UpgradeToWriterLock`. Use `ReaderWriterLock.AcquireWriterLock` instead.

For valid time-out values, see `ReaderWriterLock`.
