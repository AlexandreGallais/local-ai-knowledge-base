---
title: "Monitor class (part 5 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Monitor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Monitor class (part 5 of 6)

## Monitor.Wait(Object, Int32, Boolean) method

```csharp
public static bool Wait (object obj, int millisecondsTimeout, bool exitContext);
```

Releases the lock on an object and blocks the current thread until it reacquires the lock. If the specified time-out interval elapses, the thread enters the ready queue. This method also specifies whether the synchronization domain for the context (if in a synchronized context) is exited before the wait and reacquired afterward.

Parameters:

- `obj`: The object on which to wait.
- `millisecondsTimeout`: The number of milliseconds to wait before the thread enters the ready queue.
- `exitContext`: `true` to exit and reacquire the synchronization domain for the context (if in a synchronized context) before the wait; otherwise, `false`.

Returns: `true` if the lock was reacquired before the specified time elapsed; `false` if the lock was reacquired after the specified time elapsed. The method does not return until the lock is reacquired.

Exceptions:

- `ArgumentNullException`: The `obj` parameter is `null`.
- `SynchronizationLockException`: `Wait` is not invoked from within a synchronized block of code.
- `ThreadInterruptedException`: The thread that invokes `Wait` is later interrupted from the waiting state. This happens when another thread calls this thread's `Thread.Interrupt` method.
- `ArgumentOutOfRangeException`: The value of the `millisecondsTimeout` parameter is negative, and is not equal to `Timeout.Infinite`.

#### `Wait` method

This method does not return until it reacquires an exclusive lock on the `obj` parameter.

The thread that currently owns the lock on the specified object invokes this method in order to release the object so that another thread can access it. The caller is blocked while waiting to reacquire the lock. This method is called when the caller needs to wait for a state change that will occur as a result of another thread's operations.

The time-out ensures that the current thread does not block indefinitely if another thread releases the lock without first calling the `Monitor.Pulse` or `Monitor.PulseAll` method. It also moves the thread to the ready queue, bypassing other threads ahead of it in the wait queue, so that it can reacquire the lock sooner. The thread can test the return value of the `Monitor.Wait` method to determine whether it reacquired the lock prior to the time-out. The thread can evaluate the conditions that caused it to enter the wait, and if necessary call the `Monitor.Wait` method again.

When a thread calls `Wait`, it releases the lock and enters the waiting queue. At this point, the next thread in the ready queue (if there is one) is allowed to take control of the lock. The thread that invoked `Wait` remains in the waiting queue until either a thread that holds the lock invokes `Monitor.PulseAll`, or it is the next in the queue and a thread that holds the lock invokes `Monitor.Pulse`. However, if `millisecondsTimeout` elapses before another thread invokes this object's `Monitor.Pulse` or `Monitor.PulseAll` method, the original thread is moved to the ready queue in order to regain the lock.

> **Note:**
> If `Infinite` is specified for the `millisecondsTimeout` parameter, this method blocks indefinitely unless the holder of the lock calls `Monitor.Pulse` or `Monitor.PulseAll`. If `millisecondsTimeout` equals 0, the thread that calls `Wait` releases the lock and then immediately enters the ready queue in order to regain the lock.

The caller executes `Wait` once, regardless of the number of times `Monitor.Enter` has been invoked for the specified object. Conceptually, the `Wait` method stores the number of times the caller invoked `Monitor.Enter` on the object and invokes `Monitor.Exit` as many times as necessary to fully release the locked object. The caller then blocks while waiting to reacquire the object. When the caller reacquires the lock, the system calls `Monitor.Enter` as many times as necessary to restore the saved `Monitor.Enter` count for the caller. Calling `Wait` releases the lock for the specified object only; if the caller is the owner of locks on other objects, these locks are not released.

> **Note:**
> A synchronized object holds several references, including a reference to the thread that currently holds the lock, a reference to the ready queue, which contains the threads that are ready to obtain the lock, and a reference to the waiting queue, which contains the threads that are waiting for notification of a change in the object's state.

The `Monitor.Pulse`, `Monitor.PulseAll`, and `Wait` methods must be invoked from within a synchronized block of code.

The remarks for the `Monitor.Pulse` method explain what happens if `Monitor.Pulse` is called when no threads are waiting.

#### `Wait` method

This method does not return until it reacquires an exclusive lock on the `obj` parameter.

The thread that currently owns the lock on the specified object invokes this method in order to release the object so that another thread can access it. The caller is blocked while waiting to reacquire the lock. This method is called when the caller needs to wait for a state change that will occur as a result of another thread's operations.

The time-out ensures that the current thread does not block indefinitely if another thread releases the lock without first calling the `Monitor.Pulse` or `Monitor.PulseAll` method. It also moves the thread to the ready queue, bypassing other threads ahead of it in the wait queue, so that it can reacquire the lock sooner. The thread can test the return value of the `Monitor.Wait` method to determine whether it reacquired the lock prior to the time-out. The thread can evaluate the conditions that caused it to enter the wait, and if necessary call the `Monitor.Wait` method again.

When a thread calls `Wait`, it releases the lock and enters the waiting queue. At this point, the next thread in the ready queue (if there is one) is allowed to take control of the lock. The thread that invoked `Wait` remains in the waiting queue until either a thread that holds the lock invokes `Monitor.PulseAll`, or it is the next in the queue and a thread that holds the lock invokes `Monitor.Pulse`. However, if `timeout` milliseconds elapse before another thread invokes this object's `Monitor.Pulse` or `Monitor.PulseAll` method, the original thread is moved to the ready queue in order to regain the lock.

> **Note:**
> If a `TimeSpan` representing -1 millisecond is specified for the `timeout` parameter, this method blocks indefinitely unless the holder of the lock calls `Monitor.Pulse` or `Monitor.PulseAll`. If `timeout` is 0 milliseconds, the thread that calls `Wait` releases the lock and then immediately enters the ready queue in order to regain the lock.

The caller executes `Wait` once, regardless of the number of times `Monitor.Enter` has been invoked for the specified object. Conceptually, the `Wait` method stores the number of times the caller invoked `Monitor.Enter` on the object and invokes `Monitor.Exit` as many times as necessary to fully release the locked object. The caller then blocks while waiting to reacquire the object. When the caller reacquires the lock, the system calls `Monitor.Enter` as many times as necessary to restore the saved `Monitor.Enter` count for the caller. Calling `Wait` releases the lock for the specified object only; if the caller is the owner of locks on other objects, these locks are not released.

> **Note:**
> A synchronized object holds several references, including a reference to the thread that currently holds the lock, a reference to the ready queue, which contains the threads that are ready to obtain the lock, and a reference to the waiting queue, which contains the threads that are waiting for notification of a change in the object's state.

The `Monitor.Pulse`, `Monitor.PulseAll`, and `Wait` methods must be invoked from within a synchronized block of code.

The remarks for the `Monitor.Pulse` method explain what happens if `Monitor.Pulse` is called when no threads are waiting.

#### Exit the context

The `exitContext` parameter has no effect unless the `Monitor.Wait` method is called from inside a nondefault managed context. This can happen if your thread is inside a call to an instance of a class derived from `ContextBoundObject`. Even if you are currently executing a method on a class that is not derived from `ContextBoundObject`, like `String`, you can be in a nondefault context if a `ContextBoundObject` is on your stack in the current application domain.

When your code is executing in a nondefault context, specifying `true` for `exitContext` causes the thread to exit the nondefault managed context (that is, to transition to the default context) before executing the `Monitor.Wait` method. It returns to the original nondefault context after the call to the `Monitor.Wait` method completes.

This can be useful when the context-bound class has the `SynchronizationAttribute` attribute applied. In that case, all calls to members of the class are automatically synchronized, and the synchronization domain is the entire body of code for the class. If code in the call stack of a member calls the `Monitor.Wait` method and specifies `true` for `exitContext`, the thread exits the synchronization domain, allowing a thread that is blocked on a call to any member of the object to proceed. When the `Monitor.Wait` method returns, the thread that made the call must wait to reenter the synchronization domain.
