---
title: "Lock class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Lock.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Lock class

Namespace: `System.Threading`

```csharp
public sealed class Lock
```

Provides a mechanism for achieving mutual exclusion in regions of code between different threads.

#### Remarks

The `Lock` class can be used to define regions of code that require mutually exclusive access between threads of a process, commonly called critical sections, to prevent concurrent accesses to a resource. A `Lock` can be entered and exited, where the region of code between the enter and exit is a critical section associated with the lock. A thread that enters a lock is said to hold or own the lock until it exits the lock. At most one thread can hold a lock at any given time. A thread can hold multiple locks. A thread can enter a lock multiple times before exiting it, such as recursively. A thread that can't enter a lock immediately can wait until the lock can be entered or until a specified timeout expires.

When using the `Lock.Enter` or `Lock.TryEnter` methods to enter a lock:
- Ensure that the thread exits the lock with `Lock.Exit` even in case of exceptions, such as in C# by using a `try/finally` block.
- When the lock is being entered and exited in a C# `async` method, ensure that there is no `await` between the enter and exit. Locks are held by threads and the code following an `await` might run on a different thread.

It is recommended to use the `Lock.EnterScope` method with a language construct that automatically disposes the returned `Scope` such as the C# `using` keyword, or to use the C# `lock` keyword, as these ensure that the lock is exited in exceptional cases. These patterns might also have performance benefits over using `Enter/TryEnter` and `Exit`. The following code fragment illustrates various patterns for entering and exiting a lock.

_Code sample not included: ~/snippets/csharp/System.Threading/Lock/Overview/UsagePatterns.cs._
When using the C# `lock` keyword or similar to enter and exit a lock, the type of the expression must be precisely `System.Threading.Lock`. If the type of the expression is anything else, such as `Object` or a generic type like `T`, a different implementation that is not interchangeable can be used instead (such as `Monitor`). For more information, see the relevant clause in the C# draft standard.

`Thread.Interrupt` can interrupt threads that are waiting to enter a lock. On Windows STA threads, waits for locks allow message pumping that can run other code on the same thread during a wait. Some features of the waits can be overridden by a custom `SynchronizationContext`.

> **Note:**
> A thread that enters a lock, including multiple times such as recursively, must exit the lock the same number of times to fully exit the lock and allow other threads to enter the lock. If a thread exits while holding a `Lock`, the behavior of the `Lock` becomes undefined.

> **Caution:**
> If, on a code path, a thread might enter multiple locks before exiting them, ensure that all code paths that might enter any two of those locks on the same thread enter them in the same order. Otherwise, it could lead to deadlocks. For example, consider that on one code path thread `T1` enters lock `L1` then lock `L2` before exiting both, and on another code path thread `T2` enters both locks in the inverse order. In that scenario, it would be possible for the following order of events to occur: `T1` enters `L1`, `T2` enters `L2`, `T1` tries to enter `L2` and waits, `T2` tries to enter `L1` and waits. There's a deadlock between `T1` and `T2` that can't be resolved, and any other threads that try to enter either lock in the future will also hang.

## Lock.Lock() constructor

```csharp
public Lock ();
```

Initializes a new instance of the `Lock` class.

To be added.

## Lock.IsHeldByCurrentThread property

```csharp
public bool IsHeldByCurrentThread { get; }
```

Gets a value that indicates whether the lock is held by the current thread.

Returns: `true` if the current thread holds the lock; otherwise, `false`.

To be added.

## Lock.Enter() method

```csharp
public void Enter ();
```

Enters the lock, waiting if necessary until the lock can be entered.

Exceptions:

- `LockRecursionException`: The lock has reached the limit of repeated entries by the current thread. The limit is implementation-defined and is intended to be high enough that it would not be reached in normal situations.

#### Remarks

When the method returns, the current thread is the only thread that holds the lock. If the lock can't be entered immediately, the method waits until the lock can be entered. If the lock is already held by the current thread, the lock is entered again. To fully exit the lock and allow other threads to enter the lock, the current thread should exit the lock as many times as it has entered the lock.

For more information, see the Remarks for `Lock`.

## Lock.EnterScope() method

```csharp
public System.Threading.Lock.Scope EnterScope ();
```

Enters the lock, waiting if necessary until the lock can be entered.

Returns: A `Scope` that can be disposed to exit the lock.

Exceptions:

- `LockRecursionException`: The lock has reached the limit of repeated entries by the current thread. The limit is implementation-defined and is intended to be high enough that it would not be reached in normal situations.

#### Remarks

If the lock can't be entered immediately, the method waits until the lock can be entered. If the lock is already held by the current thread, the lock is entered again. To fully exit the lock and allow other threads to enter the lock, the current thread should dispose the returned `Scope` to exit the lock as many times as it has entered the lock.

This method is intended to be used with a language construct that automatically disposes the `Scope`, such as the C# `using` keyword.

For more information, see the Remarks for `Lock`.

## Lock.Exit() method

```csharp
public void Exit ();
```

Exits the lock.

Exceptions:

- `SynchronizationLockException`: The current thread does not hold the lock.

#### Remarks

If the current thread holds the lock multiple times, such as recursively, the lock is exited only once. The current thread should ensure that each enter is matched with an exit.

For more information, see the Remarks for `Lock`.

## Lock.TryEnter() method

```csharp
public bool TryEnter ();
```

Tries to enter the lock without waiting.

Returns: `true` if the lock was entered by the current thread; otherwise, `false`.

Exceptions:

- `LockRecursionException`: The lock has reached the limit of repeated entries by the current thread. The limit is implementation-defined and is intended to be high enough that it would not be reached in normal situations.

#### Remarks

When the method returns `true`, the current thread is the only thread that holds the lock. If the lock can't be entered immediately, the method returns `false` without waiting for the lock. If the lock is already held by the current thread, the lock is entered again. To fully exit the lock and allow other threads to enter the lock, the current thread should exit the lock as many times as it has entered the lock.

For more information, see the Remarks for `Lock`.

## Lock.TryEnter(Int32) method

```csharp
public bool TryEnter (int millisecondsTimeout);
```

Tries to enter the lock, waiting if necessary for the specified number of milliseconds until the lock can be entered.

Parameters:

- `millisecondsTimeout`: The number of milliseconds to wait until the lock can be entered. Specify <see cref="F:System.Threading.Timeout.Infinite">Timeout.Infinite</see> (
```csharp
-1
```
) to wait indefinitely, or
```csharp
0
```
to not wait.

Returns: `true` if the lock was entered by the current thread; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `millisecondsTimeout` is less than
```csharp
-1
```
.
- `LockRecursionException`: The lock has reached the limit of repeated entries by the current thread. The limit is implementation-defined and is intended to be high enough that it would not be reached in normal situations.

#### Remarks

When the method returns `true`, the current thread is the only thread that holds the lock. If the lock can't be entered immediately, the method waits until the lock can be entered or until the timeout specified by the `millisecondsTimeout` parameter expires. If the timeout expires before entering the lock, the method returns `false`. If the lock is already held by the current thread, the lock is entered again. To fully exit the lock and allow other threads to enter the lock, the current thread should exit the lock as many times as it has entered the lock.

For more information, see the Remarks for `Lock`.

## Lock.TryEnter(TimeSpan) method

```csharp
public bool TryEnter (TimeSpan timeout);
```

Tries to enter the lock, waiting if necessary until the lock can be entered or until the specified timeout expires.

Parameters:

- `timeout`: A `TimeSpan` that represents the number of milliseconds to wait until the lock can be entered. Specify a value that represents <see cref="F:System.Threading.Timeout.Infinite">Timeout.Infinite</see> (
```csharp
-1
```
) milliseconds to wait indefinitely, or a value that represents
```csharp
0
```
milliseconds to not wait.

Returns: `true` if the lock was entered by the current thread; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `timeout`, after its conversion to an integer millisecond value, represents a value that is less than
```csharp
-1
```
milliseconds or greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> milliseconds.
- `LockRecursionException`: The lock has reached the limit of repeated entries by the current thread. The limit is implementation-defined and is intended to be high enough that it would not be reached in normal situations.

#### Remarks

When the method returns `true`, the current thread is the only thread that holds the lock. If the lock can't be entered immediately, the method waits until the lock can be entered or until the specified `timeout` expires. If the timeout expires before entering the lock, the method returns `false`. If the lock is already held by the current thread, the lock is entered again. To fully exit the lock and allow other threads to enter the lock, the current thread should exit the lock as many times as it has entered the lock.

For more information, see the Remarks for `Lock`.
