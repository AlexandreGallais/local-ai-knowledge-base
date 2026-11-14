---
title: "Monitor class (part 2 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Monitor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Monitor class (part 2 of 6)

## Monitor.Enter(Object) method

```csharp
public static void Enter (object obj);
```

Acquires an exclusive lock on the specified object.

Parameters:

- `obj`: The object on which to acquire the monitor lock.

Exceptions:

- `ArgumentNullException`: The `obj` parameter is `null`.

#### Remarks
Use `Enter` to acquire the `Monitor` on the object passed as the parameter. If another thread has executed an `Enter` on the object but has not yet executed the corresponding `Monitor.Exit`, the current thread will block until the other thread releases the object. It is legal for the same thread to invoke `Enter` more than once without it blocking; however, an equal number of `Exit` calls must be invoked before other threads waiting on the object will unblock.

Use `Monitor` to lock objects (that is, reference types), not value types. When you pass a value type variable to `Enter`, it is boxed as an object. If you pass the same variable to `Enter` again, it is boxed as a separate object, and the thread does not block. In this case, the code that `Monitor` is supposedly protecting is not protected. Furthermore, when you pass the variable to `Exit`, still another separate object is created. Because the object passed to `Exit` is different from the object passed to `Enter`, `Monitor` throws `SynchronizationLockException`. For more information, see the conceptual topic Monitors.

`Thread.Interrupt` can interrupt threads that are waiting to enter a `Monitor` on an object. A `ThreadInterruptedException` will be thrown.

Use a C# `try`…`finally` block (`Try`…`Finally` in Visual Basic) to ensure that you release the monitor, or use the C# `lock` statement (`SyncLock` statement in Visual Basic), which wraps the `Monitor.Enter` and `Monitor.Exit` methods in a `try`…`finally` block.

#### Examples
The following example demonstrates how to use the `Enter` method.

_Code sample not included: ~/snippets/csharp/System.Threading/Monitor/Enter/monitor2.cs._

## Monitor.Enter(Object, Boolean) method

```csharp
public static void Enter (object obj, ref bool lockTaken);
```

Acquires an exclusive lock on the specified object, and atomically sets a value that indicates whether the lock was taken.

Parameters:

- `obj`: The object on which to wait.
- `lockTaken`: The result of the attempt to acquire the lock, passed by reference. The input must be `false`. The output is `true` if the lock is acquired; otherwise, the output is `false`. The output is set even if an exception occurs during the attempt to acquire the lock.

Note   If no exception occurs, the output of this method is always `true`.

Exceptions:

- `ArgumentException`: The input to `lockTaken` is `true`.
- `ArgumentNullException`: The `obj` parameter is `null`.

#### Remarks
Use `Enter` to acquire the `Monitor` on the object passed as the `obj` parameter. If another thread has executed an `Enter` on the object but has not yet executed the corresponding `Monitor.Exit`, the current thread will block until the other thread releases the object. It is legal for the same thread to invoke `Enter` more than once without it blocking; however, an equal number of `Exit` calls must be invoked before other threads waiting on the object will unblock.

If the lock was not taken because an exception was thrown, the variable specified for the `lockTaken` parameter is `false` after this method ends. This allows the program to determine, in all cases, whether it is necessary to release the lock. If this method returns without throwing an exception, the variable specified for the `lockTaken` parameter is always `true`, and there is no need to test it.

Use `Monitor` to lock objects (that is, reference types), not value types. When you pass a value type variable to `Enter`, it is boxed as an object. If you pass the same variable to `Enter` again, it is boxed as a separate object, and the thread does not block. In this case, the code that `Monitor` is supposedly protecting is not protected. Furthermore, when you pass the variable to `Exit`, another separate object is created. Because the object passed to `Exit` is different from the object passed to `Enter`, `Monitor` throws `SynchronizationLockException`. For more information, see the conceptual topic Monitors.

`Thread.Interrupt` can interrupt threads that are waiting to enter a `Monitor` on an object. A `ThreadInterruptedException` will be thrown.

#### Examples
The following code shows the basic <example-value> for using the `Enter` method overload. This overload always sets the value of the variable that is passed to the `ref` parameter (`ByRef` in Visual Basic) `lockTaken`, even if the method throws an exception, so the value of the variable is a reliable way to test whether the lock has to be released.

_Code sample not included: ~/snippets/csharp/System.Threading/Monitor/Enter/example.cs._

## Monitor.Exit(Object) method

```csharp
public static void Exit (object obj);
```

Releases an exclusive lock on the specified object.

Parameters:

- `obj`: The object on which to release the lock.

Exceptions:

- `ArgumentNullException`: The `obj` parameter is `null`.
- `SynchronizationLockException`: The current thread does not own the lock for the specified object.

#### Remarks
The calling thread must own the lock on the `obj` parameter. If the calling thread owns the lock on the specified object, and has made an equal number of `Exit` and `Monitor.Enter` calls for the object, then the lock is released. If the calling thread has not invoked `Exit` as many times as `Enter`, the lock is not released.

If the lock is released and other threads are in the ready queue for the object, one of the threads acquires the lock. If other threads are in the waiting queue waiting to acquire the lock, they are not automatically moved to the ready queue when the owner of the lock calls `Exit`. To move one or more waiting threads into the ready queue, call `Monitor.Pulse` or `Monitor.PulseAll` before invoking `Exit`.

#### Examples
The following example demonstrates how to use the `Exit` method.

_Code sample not included: ~/snippets/csharp/System.Threading/Monitor/Enter/monitor2.cs._

## Monitor.IsEntered(Object) method

```csharp
public static bool IsEntered (object obj);
```

Determines whether the current thread holds the lock on the specified object.

Parameters:

- `obj`: The object to test.

Returns: `true` if the current thread holds the lock on `obj`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `obj` is `null`.

#### Remarks
This method works only for locks that are acquired by using the methods of the `Monitor` class, or by using the C# `lock` statement or the Visual Basic `SyncLock` statement, which are implemented with `Monitor`.

Use this method with diagnostic tools, such as the `Debug.Assert` method and the `Contract` class, to debug locking issues that involve the `Monitor` class.

## Monitor.Pulse(Object) method

```csharp
public static void Pulse (object obj);
```

Notifies a thread in the waiting queue of a change in the locked object's state.

Parameters:

- `obj`: The object a thread is waiting for.

Exceptions:

- `ArgumentNullException`: The `obj` parameter is `null`.
- `SynchronizationLockException`: The calling thread does not own the lock for the specified object.

#### Remarks
Only the current owner of the lock can signal a waiting object using `Pulse`.

The thread that currently owns the lock on the specified object invokes this method to signal the next thread in line for the lock. Upon receiving the pulse, the waiting thread is moved to the ready queue. When the thread that invoked `Pulse` releases the lock, the next thread in the ready queue (which is not necessarily the thread that was pulsed) acquires the lock.

> **Important:**
>  The `Monitor` class does not maintain state indicating that the `Monitor.Pulse` method has been called. Thus, if you call `Monitor.Pulse` when no threads are waiting, the next thread that calls `Monitor.Wait` blocks as if `Monitor.Pulse` had never been called. If two threads are using `Monitor.Pulse` and `Monitor.Wait` to interact, this could result in a deadlock. Contrast this with the behavior of the `AutoResetEvent` class: If you signal an `AutoResetEvent` by calling its `EventWaitHandle.Set` method, and there are no threads waiting, the `AutoResetEvent` remains in a signaled state until a thread calls `WaitHandle.WaitOne`, `WaitHandle.WaitAny`, or `WaitHandle.WaitAll`. The `AutoResetEvent` releases that thread and returns to the unsignaled state.

Note that a synchronized object holds several references, including a reference to the thread that currently holds the lock, a reference to the ready queue, which contains the threads that are ready to obtain the lock, and a reference to the waiting queue, which contains the threads that are waiting for notification of a change in the object's state.

The `Pulse`, `Monitor.PulseAll`, and `Monitor.Wait` methods must be invoked from within a synchronized block of code.

To signal multiple threads, use the `Monitor.PulseAll` method.

## Monitor.PulseAll(Object) method

```csharp
public static void PulseAll (object obj);
```

Notifies all waiting threads of a change in the object's state.

Parameters:

- `obj`: The object that sends the pulse.

Exceptions:

- `ArgumentNullException`: The `obj` parameter is `null`.
- `SynchronizationLockException`: The calling thread does not own the lock for the specified object.

#### Remarks
The thread that currently owns the lock on the specified object invokes this method to signal all threads waiting to acquire the lock on the object. After the signal is sent, the waiting threads are moved to the ready queue. When the thread that invoked `PulseAll` releases the lock, the next thread in the ready queue acquires the lock.

Note that a synchronized object holds several references, including a reference to the thread that currently holds the lock, a reference to the ready queue, which contains the threads that are ready to obtain the lock, and a reference to the waiting queue, which contains the threads that are waiting for notification of a change in the object's state.

The `Monitor.Pulse`, `PulseAll`, and `Monitor.Wait` methods must be invoked from within a synchronized block of code.

The remarks for the `Monitor.Pulse` method explain what happens if `Monitor.Pulse` is called when no threads are waiting.

To signal a single thread, use the `Pulse` method.

## Monitor.TryEnter(Object) method

```csharp
public static bool TryEnter (object obj);
```

Attempts to acquire an exclusive lock on the specified object.

Parameters:

- `obj`: The object on which to acquire the lock.

Returns: `true` if the current thread acquires the lock; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `obj` parameter is `null`.

#### Remarks
If successful, this method acquires an exclusive lock on the `obj` parameter. This method returns immediately, whether or not the lock is available.

This method is similar to `Monitor.Enter`, but it will never block the current thread. If the thread cannot enter without blocking, the method returns `false,`.

> **Note:**
>  Use `Monitor` to lock objects (that is, reference types), not value types. For details, see the `Monitor` article.

To ensure that the thread does not enter the critical section, you should examine the method's return value and  execute code in the critical section only if its return value is `true`. The following code fragment shows the pattern used to call this method. Note that you should call `Monitor.Exit` in a `finally` block to ensure that the calling thread releases its lock on the critical section if an exception occurs.

_Code sample not included: ~/snippets/csharp/System.Threading/Monitor/TryEnter/pattern1.cs._

#### Examples
The following code example demonstrates how to use the `TryEnter` method.

_Code sample not included: ~/snippets/csharp/System.Threading/Monitor/Enter/monitor2.cs._

## Monitor.TryEnter(Object, Boolean) method

```csharp
public static void TryEnter (object obj, ref bool lockTaken);
```

Attempts to acquire an exclusive lock on the specified object, and atomically sets a value that indicates whether the lock was taken.

Parameters:

- `obj`: The object on which to acquire the lock.
- `lockTaken`: The result of the attempt to acquire the lock, passed by reference. The input must be `false`. The output is `true` if the lock is acquired; otherwise, the output is `false`. The output is set even if an exception occurs during the attempt to acquire the lock.

Exceptions:

- `ArgumentException`: The input to `lockTaken` is `true`.
- `ArgumentNullException`: The `obj` parameter is `null`.

#### Remarks
If successful, this method acquires an exclusive lock on the `obj` parameter. This method returns immediately, whether or not the lock is available.

If the lock was not taken because an exception was thrown, the variable specified for the `lockTaken` parameter is `false` after this method ends. This allows the program to determine, in all cases, whether it is necessary to release the lock.

This method is similar to `Enter`, but it will never block the current thread. If the thread cannot enter without blocking, the `lockTaken` argument is set to `false` when the method returns.

> **Note:**
>  Use `Monitor` to lock objects (that is, reference types), not value types. For more information, see the `Monitor` article.

To ensure that the thread does not enter the critical section, you should examine the value of `lockTaken` and  execute code in the critical section only if its value is `true`. The following code fragment shows the pattern used to call this method. Note that you should call `Monitor.Exit` in a `finally` block to ensure that the calling thread releases its lock on the critical section if an exception occurs.

_Code sample not included: ~/snippets/csharp/System.Threading/Monitor/TryEnter/pattern1.cs._

#### Examples
The following code shows the basic <example-value> for using the `TryEnter` method overload. This overload always sets the value of the variable that is passed to the `ref` parameter (`ByRef` in Visual Basic) `lockTaken`, even if the method throws an exception, so the value of the variable is a reliable way to test whether the lock has to be released.

_Code sample not included: ~/snippets/csharp/System.Threading/Monitor/Enter/example.cs._
