---
title: "ReaderWriterLockSlim class (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ReaderWriterLockSlim.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReaderWriterLockSlim class (part 5 of 5)

## ReaderWriterLockSlim.TryEnterWriteLock(TimeSpan) method

```csharp
public bool TryEnterWriteLock (TimeSpan timeout);
```

Tries to enter the lock in write mode, with an optional time-out.

Parameters:

- `timeout`: The interval to wait, or -1 milliseconds to wait indefinitely.

Returns: `true` if the calling thread entered write mode, otherwise, `false`.

Exceptions:

- `LockRecursionException`: The `ReaderWriterLockSlim.RecursionPolicy` property is `LockRecursionPolicy.NoRecursion` and the current thread has already entered the lock.

-or-

The current thread initially entered the lock in read mode, and therefore trying to enter write mode would create the possibility of a deadlock.

-or-

The recursion number would exceed the capacity of the counter. The limit is so large that applications should never encounter it.
- `ArgumentOutOfRangeException`: The value of `timeout` is negative, but it is not equal to -1 milliseconds, which is the only negative value allowed.

-or-

The value of `timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> milliseconds.
- `ObjectDisposedException`: The `ReaderWriterLockSlim` object has been disposed.

#### Remarks
If `timeout` is 0 (zero), this method checks the lock state and returns `false` immediately if the desired state is unavailable.

If other threads have entered the lock in read mode, a thread that calls the `ReaderWriterLockSlim.TryEnterWriteLock` method blocks until those threads have exited read mode or until the time-out interval has elapsed. While threads are blocked waiting to enter write mode, additional threads that try to enter read mode or upgradeable mode block until all the threads waiting to enter write mode have either timed out or entered write mode and then exited from it.

> **Note:**
> If a lock allows recursion, a thread that has entered the lock in write mode can enter write mode recursively, even if other threads are waiting to enter write mode.
