---
title: "SpinLock struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/SpinLock.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SpinLock struct

Namespace: `System.Threading`

```csharp
public struct SpinLock
```

Provides a mutual exclusion lock primitive where a thread trying to acquire the lock waits in a loop repeatedly checking until the lock becomes available.

#### Remarks
For an example of how to use a Spin Lock, see How to: Use SpinLock for Low-Level Synchronization.

Spin locks can be used for leaf-level locks where the object allocation implied by using a `Monitor`, in size or due to garbage collection pressure, is overly expensive. A spin lock can be useful to avoid blocking; however, if you expect a significant amount of blocking, you should probably not use spin locks due to excessive spinning. Spinning can be beneficial when locks are fine-grained and large in number (for example, a lock per node in a linked list) and also when lock hold-times are always extremely short. In general, while holding a spin lock, one should avoid any of these actions:

- blocking,

- calling anything that itself may block,

- holding more than one spin lock at once,

- making dynamically dispatched calls (interface and virtuals),

- making statically dispatched calls into any code one doesn't own, or

- allocating memory.

`SpinLock` should only be used after you have been determined that doing so will improve an application's performance. It is also important to note that `SpinLock` is a value type, for performance reasons. For this reason, you must be very careful not to accidentally copy a `SpinLock` instance, as the two instances (the original and the copy) would then be completely independent of one another, which would likely lead to erroneous behavior of the application. If a `SpinLock` instance must be passed around, it should be passed by reference rather than by value.

Do not store `SpinLock` instances in readonly fields.

#### Examples
The following example shows how to use a `SpinLock`:

_Code sample not included: ~/snippets/csharp/System.Threading/SpinLock/Overview/spinlock.cs._

## SpinLock.SpinLock(Boolean) constructor

```csharp
public SpinLock (bool enableThreadOwnerTracking);
```

Initializes a new instance of the `SpinLock` structure with the option to track thread IDs to improve debugging.

Parameters:

- `enableThreadOwnerTracking`: Whether to capture and use thread IDs for debugging purposes.

#### Remarks
The parameterless constructor for `SpinLock` tracks thread ownership.

#### Examples
The following example demonstrates how a SpinLock may be used.

```csharp
// C#
public class MyType
{
    private SpinLock _spinLock = new SpinLock();

    public void DoWork()
    {
        bool lockTaken = false;
        try
        {
           _spinLock.Enter(ref lockTaken);
           // do work here protected by the lock
        }
        finally
        {
            if (lockTaken) _spinLock.Exit();
        }
    }
}
```

```vb
' Visual Basic

Class MyType
   Private _spinLock As New SpinLock()

   Public Sub DoWork()
      Dim lockTaken As Boolean = False
      Try
         _spinLock.Enter(lockTaken)
         ' do work here protected by the lock
      Finally
         If lockTaken Then _spinLock.Exit()
      End Try
   End Sub
End Class
```

## SpinLock.IsHeld property

```csharp
public bool IsHeld { get; }
```

Gets whether the lock is currently held by any thread.

Returns: true if the lock is currently held by any thread; otherwise false.

To be added.

## SpinLock.IsHeldByCurrentThread property

```csharp
public bool IsHeldByCurrentThread { get; }
```

Gets whether the lock is held by the current thread.

Returns: true if the lock is held by the current thread; otherwise false.

Exceptions:

- `InvalidOperationException`: Thread ownership tracking is disabled.

#### Remarks
If the lock was initialized to track owner threads, this will return whether the lock is acquired by the current thread. It is invalid to use this property when the lock was initialized to not track thread ownership.

## SpinLock.IsThreadOwnerTrackingEnabled property

```csharp
public bool IsThreadOwnerTrackingEnabled { get; }
```

Gets whether thread ownership tracking is enabled for this instance.

Returns: true if thread ownership tracking is enabled for this instance; otherwise false.

To be added.

## SpinLock.Enter(Boolean) method

```csharp
public void Enter (ref bool lockTaken);
```

Acquires the lock in a reliable manner, such that even if an exception occurs within the method call, `lockTaken` can be examined reliably to determine whether the lock was acquired.

Parameters:

- `lockTaken`: True if the lock is acquired; otherwise, false. `lockTaken` must be initialized to false prior to calling this method.

Exceptions:

- `ArgumentException`: The `lockTaken` argument must be initialized to false prior to calling Enter.
- `LockRecursionException`: Thread ownership tracking is enabled, and the current thread has already acquired this lock.

#### Remarks
`SpinLock` is a non-reentrant lock, meaning that if a thread holds the lock, it is not allowed to enter the lock again. If thread ownership tracking is enabled (whether it's enabled is available through `SpinLock.IsThreadOwnerTrackingEnabled`), an exception will be thrown when a thread tries to re-enter a lock it already holds. However, if thread ownership tracking is disabled, attempting to enter a lock already held will result in deadlock.

If you call `SpinLock.Exit` without having first called `SpinLock.Enter` the internal state of the `SpinLock` can become corrupted.

## SpinLock.Exit() method

```csharp
public void Exit ();
```

Releases the lock.

Exceptions:

- `SynchronizationLockException`: Thread ownership tracking is enabled, and the current thread is not the owner of this lock.

#### Remarks
The default overload of `SpinLock.Exit` provides the same behavior as if calling `SpinLock.Exit` using true as the argument.

If you call `SpinLock.Exit` without having first called `SpinLock.Enter` the internal state of the `SpinLock` can become corrupted.

## SpinLock.Exit(Boolean) method

```csharp
public void Exit (bool useMemoryBarrier);
```

Releases the lock.

Parameters:

- `useMemoryBarrier`: A Boolean value that indicates whether a memory fence should be issued in order to immediately publish the exit operation to other threads.

Exceptions:

- `SynchronizationLockException`: Thread ownership tracking is enabled, and the current thread is not the owner of this lock.

#### Remarks
Calling `SpinLock.Exit` with the `useMemoryBarrier` argument set to true will improve the fairness of the lock at the expense of some performance. The default `SpinLock.Exit` overload behaves as if specifying true for `useMemoryBarrier`.

If you call `SpinLock.Exit` without having first called `SpinLock.Enter` the internal state of the `SpinLock` can become corrupted.

## SpinLock.TryEnter(Boolean) method

```csharp
public void TryEnter (ref bool lockTaken);
```

Attempts to acquire the lock in a reliable manner, such that even if an exception occurs within the method call, `lockTaken` can be examined reliably to determine whether the lock was acquired.

Parameters:

- `lockTaken`: True if the lock is acquired; otherwise, false. `lockTaken` must be initialized to false prior to calling this method.

Exceptions:

- `ArgumentException`: The `lockTaken` argument must be initialized to false prior to calling TryEnter.
- `LockRecursionException`: Thread ownership tracking is enabled, and the current thread has already acquired this lock.

#### Remarks
Unlike `SpinLock.Enter`, TryEnter will not block waiting for the lock to be available. If the lock is not available when TryEnter is called, it will return immediately without any further spinning.

## SpinLock.TryEnter(Int32, Boolean) method

```csharp
public void TryEnter (int millisecondsTimeout, ref bool lockTaken);
```

Attempts to acquire the lock in a reliable manner, such that even if an exception occurs within the method call, `lockTaken` can be examined reliably to determine whether the lock was acquired.

Parameters:

- `millisecondsTimeout`: The number of milliseconds to wait, or `Timeout.Infinite` (-1) to wait indefinitely.
- `lockTaken`: True if the lock is acquired; otherwise, false. `lockTaken` must be initialized to false prior to calling this method.

Exceptions:

- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `ArgumentException`: The `lockTaken` argument must be initialized to false prior to calling TryEnter.
- `LockRecursionException`: Thread ownership tracking is enabled, and the current thread has already acquired this lock.

#### Remarks
Unlike `SpinLock.Enter`, TryEnter will not block indefinitely waiting for the lock to be available. It will block until either the lock is available or until the `millisecondsTimeout` has expired.

## SpinLock.TryEnter(TimeSpan, Boolean) method

```csharp
public void TryEnter (TimeSpan timeout, ref bool lockTaken);
```

Attempts to acquire the lock in a reliable manner, such that even if an exception occurs within the method call, `lockTaken` can be examined reliably to determine whether the lock was acquired.

Parameters:

- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait, or a `TimeSpan` that represents -1 milliseconds to wait indefinitely.
- `lockTaken`: True if the lock is acquired; otherwise, false. `lockTaken` must be initialized to false prior to calling this method.

Exceptions:

- `ArgumentOutOfRangeException`: `timeout` is a negative number other than -1 milliseconds, which represents an infinite time-out -or- timeout is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> milliseconds.
- `ArgumentException`: The `lockTaken` argument must be initialized to false prior to calling TryEnter.
- `LockRecursionException`: Thread ownership tracking is enabled, and the current thread has already acquired this lock.

#### Remarks
Unlike `SpinLock.Enter`, TryEnter will not block indefinitely waiting for the lock to be available. It will block until either the lock is available or until the `timeout` has expired.
