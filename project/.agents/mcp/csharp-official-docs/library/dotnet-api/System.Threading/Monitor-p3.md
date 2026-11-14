---
title: "Monitor class (part 3 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Monitor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Monitor class (part 3 of 6)

## Monitor.TryEnter(Object, Int32) method

```csharp
public static bool TryEnter (object obj, int millisecondsTimeout);
```

Attempts, for the specified number of milliseconds, to acquire an exclusive lock on the specified object.

Parameters:

- `obj`: The object on which to acquire the lock.
- `millisecondsTimeout`: The number of milliseconds to wait for the lock.

Returns: `true` if the current thread acquires the lock; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `obj` parameter is `null`.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is negative, and not equal to `Timeout.Infinite`.

#### Remarks
If the `millisecondsTimeout` parameter equals `Infinite`, this method is equivalent to `Monitor.Enter`. If `millisecondsTimeout` equals 0, this method is equivalent to `Monitor.TryEnter`.

> **Note:**
>  Use `Monitor` to lock objects (that is, reference types), not value types. For details, see the `Monitor` article.

To ensure that the thread does not enter the critical section, you should examine the method's return value and  execute code in the critical section only if its return value is `true`. The following code fragment shows the pattern used to call this method. Note that you should call `Monitor.Exit` in a `finally` block to ensure that the calling thread releases its lock on the critical section if an exception occurs.

_Code sample not included: ~/snippets/csharp/System.Threading/Monitor/TryEnter/pattern1.cs._

## Monitor.TryEnter(Object, TimeSpan) method

```csharp
public static bool TryEnter (object obj, TimeSpan timeout);
```

Attempts, for the specified amount of time, to acquire an exclusive lock on the specified object.

Parameters:

- `obj`: The object on which to acquire the lock.
- `timeout`: A `TimeSpan` representing the amount of time to wait for the lock. A value of -1 millisecond specifies an infinite wait.

Returns: `true` if the current thread acquires the lock; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `obj` parameter is `null`.
- `ArgumentOutOfRangeException`: The value of `timeout` in milliseconds is negative and is not equal to `Timeout.Infinite` (-1 millisecond), or is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
If the value of the `timeout` parameter converted to milliseconds equals -1, this method is equivalent to `Monitor.Enter`. If the value of `timeout` equals 0, this method is equivalent to `Monitor.TryEnter`.

> **Note:**
>  Use `Monitor` to lock objects (that is, reference types), not value types. For details, see the `Monitor` class topic.

To ensure that the thread does not enter the critical section, you should examine the method's return value and  execute code in the critical section only if its return value is `true`. The following code fragment shows the pattern used to call this method. Note that you should call `Monitor.Exit` in a `finally` block to ensure that the calling thread releases its lock on the critical section if an exception occurs.

_Code sample not included: ~/snippets/csharp/System.Threading/Monitor/TryEnter/pattern1.cs._

## Monitor.TryEnter(Object, Int32, Boolean) method

```csharp
public static void TryEnter (object obj, int millisecondsTimeout, ref bool lockTaken);
```

Attempts, for the specified number of milliseconds, to acquire an exclusive lock on the specified object, and atomically sets a value that indicates whether the lock was taken.

Parameters:

- `obj`: The object on which to acquire the lock.
- `millisecondsTimeout`: The number of milliseconds to wait for the lock.
- `lockTaken`: The result of the attempt to acquire the lock, passed by reference. The input must be `false`. The output is `true` if the lock is acquired; otherwise, the output is `false`. The output is set even if an exception occurs during the attempt to acquire the lock.

Exceptions:

- `ArgumentException`: The input to `lockTaken` is `true`.
- `ArgumentNullException`: The `obj` parameter is `null`.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is negative, and not equal to `Timeout.Infinite`.

#### Remarks
If the `millisecondsTimeout` parameter equals `Infinite`, this method is equivalent to `Enter`. If `millisecondsTimeout` equals 0, this method is equivalent to `TryEnter`.

If the lock was not taken because an exception was thrown, the variable specified for the `lockTaken` parameter is `false` after this method ends. This allows the program to determine, in all cases, whether it is necessary to release the lock.

> **Note:**
>  Use `Monitor` to lock objects (that is, reference types), not value types. For more information, see the `Monitor` class topic.

To ensure that the thread does not enter the critical section, you should examine the value of `lockTaken` and  execute code in the critical section only if its value is `true`. The following code fragment shows the pattern used to call this method. Note that you should call `Monitor.Exit` in a `finally` block to ensure that the calling thread releases its lock on the critical section if an exception occurs.

_Code sample not included: ~/snippets/csharp/System.Threading/Monitor/TryEnter/pattern1.cs._

#### Examples
The following code shows the basic <example-value> for using the `TryEnter` method overload. This overload always sets the value of the variable that is passed to the `ref` parameter (`ByRef` in Visual Basic) `lockTaken`, even if the method throws an exception, so the value of the variable is a reliable way to test whether the lock has to be released.

_Code sample not included: ~/snippets/csharp/System.Threading/Monitor/Enter/example.cs._

## Monitor.TryEnter(Object, TimeSpan, Boolean) method

```csharp
public static void TryEnter (object obj, TimeSpan timeout, ref bool lockTaken);
```

Attempts, for the specified amount of time, to acquire an exclusive lock on the specified object, and atomically sets a value that indicates whether the lock was taken.

Parameters:

- `obj`: The object on which to acquire the lock.
- `timeout`: The amount of time to wait for the lock. A value of -1 millisecond specifies an infinite wait.
- `lockTaken`: The result of the attempt to acquire the lock, passed by reference. The input must be `false`. The output is `true` if the lock is acquired; otherwise, the output is `false`. The output is set even if an exception occurs during the attempt to acquire the lock.

Exceptions:

- `ArgumentException`: The input to `lockTaken` is `true`.
- `ArgumentNullException`: The `obj` parameter is `null`.
- `ArgumentOutOfRangeException`: The value of `timeout` in milliseconds is negative and is not equal to `Timeout.Infinite` (-1 millisecond), or is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
If the value of the `timeout` parameter converted to milliseconds equals -1, this method is equivalent to `Enter`. If the value of `timeout` equals 0, this method is equivalent to `TryEnter`.

If the lock was not taken because an exception was thrown, the variable specified for the `lockTaken` parameter is `false` after this method ends. This allows the program to determine, in all cases, whether it is necessary to release the lock.

> **Note:**
>  Use `Monitor` to lock objects (that is, reference types), not value types. For more information, see the `Monitor` class topic.

To ensure that the thread does not enter the critical section, you should examine the value of `lockTaken` and  execute code in the critical section only if its value is `true`. The following code fragment shows the pattern used to call this method. Note that you should call `Monitor.Exit` in a `finally` block to ensure that the calling thread releases its lock on the critical section if an exception occurs.

_Code sample not included: ~/snippets/csharp/System.Threading/Monitor/TryEnter/pattern1.cs._

## Monitor.Wait(Object) method

```csharp
public static bool Wait (object obj);
```

Releases the lock on an object and blocks the current thread until it reacquires the lock.

Parameters:

- `obj`: The object on which to wait.

Returns: `true` if the call returned because the caller reacquired the lock for the specified object. This method does not return if the lock is not reacquired.

Exceptions:

- `ArgumentNullException`: The `obj` parameter is `null`.
- `SynchronizationLockException`: The calling thread does not own the lock for the specified object.
- `ThreadInterruptedException`: The thread that invokes `Wait` is later interrupted from the waiting state. This happens when another thread calls this thread's `Thread.Interrupt` method.

#### Remarks
The thread that currently owns the lock on the specified object invokes this method in order to release the object so that another thread can access it. The caller is blocked while waiting to reacquire the lock. This method is called when the caller needs to wait for a state change that will occur as a result of another thread's operations.

When a thread calls `Wait`, it releases the lock on the object and enters the object's waiting queue. The next thread in the object's ready queue (if there is one) acquires the lock and has exclusive use of the object. All threads that call `Wait` remain in the waiting queue until they receive a signal from `Monitor.Pulse` or `Monitor.PulseAll`, sent by the owner of the lock. If `Pulse` is sent, only the thread at the head of the waiting queue is affected. If `PulseAll` is sent, all threads that are waiting for the object are affected. When the signal is received, one or more threads leave the waiting queue and enter the ready queue. A thread in the ready queue is permitted to reacquire the lock.

This method returns when the calling thread reacquires the lock on the object. Note that this method blocks indefinitely if the holder of the lock does not call `Pulse` or `PulseAll`.

The caller executes `Wait` once, regardless of the number of times `Monitor.Enter` has been invoked for the specified object. Conceptually, the `Wait` method stores the number of times the caller invoked `Enter` on the object and invokes `Exit` as many times as necessary to fully release the locked object. The caller then blocks while waiting to reacquire the object. When the caller reacquires the lock, the system calls `Enter` as many times as necessary to restore the saved `Enter` count for the caller. Calling `Wait` releases the lock for the specified object only; if the caller is the owner of locks on other objects, these locks are not released.

Note that a synchronized object holds several references, including a reference to the thread that currently holds the lock, a reference to the ready queue, which contains the threads that are ready to obtain the lock, and a reference to the waiting queue, which contains the threads that are waiting for notification of a change in the object's state.

The `Monitor.Pulse`, `Monitor.PulseAll`, and `Wait` methods must be invoked from within a synchronized block of code.

The remarks for the `Monitor.Pulse` method explain what happens if `Monitor.Pulse` is called when no threads are waiting.
