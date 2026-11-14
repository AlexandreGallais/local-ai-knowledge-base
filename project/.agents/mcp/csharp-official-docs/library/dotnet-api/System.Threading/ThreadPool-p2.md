---
title: "ThreadPool class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ThreadPool.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ThreadPool class (part 2 of 4)

## ThreadPool.QueueUserWorkItem(WaitCallback, Object) method

```csharp
public static bool QueueUserWorkItem (System.Threading.WaitCallback callBack, object? state);
```

Queues a method for execution, and specifies an object containing data to be used by the method. The method executes when a thread pool thread becomes available.

Parameters:

- `callBack`: A `WaitCallback` representing the method to execute.
- `state`: An object containing data to be used by the method.

Returns: `true` if the method is successfully queued; `NotSupportedException` is thrown if the work item could not be queued.

Exceptions:

- `NotSupportedException`: The common language runtime (CLR) is hosted, and the host does not support this action.
- `ArgumentNullException`: `callBack` is `null`.

#### Remarks
If the callback method requires complex data, you can define a class to contain the data.

> **Note:**
> Visual Basic users can omit the `WaitCallback` constructor, and simply use the `AddressOf` operator when passing the callback method to `ThreadPool.QueueUserWorkItem`. Visual Basic <example-value> calls the correct delegate constructor.

#### Examples
The following example uses the .NET thread pool to calculate the `Fibonacci` result for five numbers between 20 and 40. Each `Fibonacci` result is represented by the `Fibonacci` class, which provides a method named `ThreadPoolCallback` that performs the calculation. An object that represents each `Fibonacci` value is created, and the `ThreadPoolCallback` method is passed to `ThreadPool.QueueUserWorkItem`, which assigns an available thread in the pool to execute the method.

Because each `Fibonacci` object is given a semi-random value to compute, and because each thread will be competing for processor time, you cannot know in advance how long it will take for all five results to be calculated. That is why each `Fibonacci` object is passed an instance of the `ManualResetEvent` class during construction. Each object signals the provided event object when its calculation is complete, which allows the primary thread to block execution with `WaitHandle.WaitAll` until all five `Fibonacci` objects have calculated a result. The `Main` method then displays each `Fibonacci` result.

_Code sample not included: ~/snippets/csharp/System.Threading/ThreadPool/QueueUserWorkItem/source.cs._

## ThreadPool.QueueUserWorkItem<TState>(Action<TState>, TState, Boolean) method

```csharp
public static bool QueueUserWorkItem<TState> (Action<TState> callBack, TState state, bool preferLocal);
```

Queues a method specified by an `Action<T>` delegate for execution, and provides data to be used by the method. The method executes when a thread pool thread becomes available.

Parameters:

- `TState`: The type of elements of `state`.
- `callBack`: An `Action<T>` representing the method to execute.
- `state`: An object containing data to be used by the method.
- `preferLocal`: `true` to prefer queueing the work item in a queue close to the current thread; `false` to prefer queueing the work item to the thread pool's shared queue.

Returns: `true` if the method is successfully queued; `NotSupportedException` is thrown if the work item could not be queued.

To be added.

## ThreadPool.RegisterWaitForSingleObject(WaitHandle, WaitOrTimerCallback, Object, Int32, Boolean) method

```csharp
public static System.Threading.RegisteredWaitHandle RegisterWaitForSingleObject (System.Threading.WaitHandle waitObject, System.Threading.WaitOrTimerCallback callBack, object? state, int millisecondsTimeOutInterval, bool executeOnlyOnce);
```

Registers a delegate to wait for a `WaitHandle`, specifying a 32-bit signed integer for the time-out in milliseconds.

Parameters:

- `waitObject`: The `WaitHandle` to register. Use a `WaitHandle` other than `Mutex`.
- `callBack`: The `WaitOrTimerCallback` delegate to call when the `waitObject` parameter is signaled.
- `state`: The object that is passed to the delegate.
- `millisecondsTimeOutInterval`: The time-out in milliseconds. If the `millisecondsTimeOutInterval` parameter is 0 (zero), the function tests the object's state and returns immediately. If `millisecondsTimeOutInterval` is -1, the function's time-out interval never elapses.
- `executeOnlyOnce`: `true` to indicate that the thread will no longer wait on the `waitObject` parameter after the delegate has been called; `false` to indicate that the timer is reset every time the wait operation completes until the wait is unregistered.

Returns: The `RegisteredWaitHandle` that encapsulates the native handle.

Exceptions:

- `ArgumentOutOfRangeException`: The `millisecondsTimeOutInterval` parameter is less than -1.

#### Remarks
When you are finished using the `RegisteredWaitHandle` that is returned by this method, call its `RegisteredWaitHandle.Unregister` method to release references to the wait handle. We recommend that you always call the `RegisteredWaitHandle.Unregister` method, even if you specify `true` for `executeOnlyOnce`. Garbage collection works more efficiently if you call the `RegisteredWaitHandle.Unregister` method instead of depending on the registered wait handle's finalizer.

The `ThreadPool.RegisterWaitForSingleObject` method queues the specified delegate to the thread pool. A worker thread will execute the delegate when one of the following occurs:

- The specified object is in the signaled state.
- The time-out interval elapses.

The `ThreadPool.RegisterWaitForSingleObject` method checks the current state of the specified object's `WaitHandle`. If the object's state is unsignaled, the method registers a wait operation. The wait operation is performed by a thread from the thread pool. The delegate is executed by a worker thread when the object's state becomes signaled or the time-out interval elapses. If the `timeOutInterval` parameter is not 0 (zero) and the `executeOnlyOnce` parameter is `false`, the timer is reset every time the event is signaled or the time-out interval elapses.

> **Important:**
> Using a `Mutex` for `waitObject` does not provide mutual exclusion for the callbacks because the underlying Windows API uses the default `WT_EXECUTEDEFAULT` flag, so each callback is dispatched on a separate thread pool thread. Instead of a `Mutex`, use a `Semaphore` with a maximum count of 1.

To cancel the wait operation, call the `RegisteredWaitHandle.Unregister` method.

The wait thread uses the Win32 `WaitForMultipleObjects` function to monitor registered wait operations. Therefore, if you must use the same native operating system handle in multiple calls to `ThreadPool.RegisterWaitForSingleObject`, you must duplicate the handle using the Win32 `DuplicateHandle` function. Note that you should not pulse an event object passed to `ThreadPool.RegisterWaitForSingleObject`, because the wait thread might not detect that the event is signaled before it is reset.

Before returning, the function modifies the state of some types of synchronization objects. Modification occurs only for the object whose signaled state caused the wait condition to be satisfied. For example, the count of a semaphore is decreased by one.

## ThreadPool.RegisterWaitForSingleObject(WaitHandle, WaitOrTimerCallback, Object, Int64, Boolean) method

```csharp
public static System.Threading.RegisteredWaitHandle RegisterWaitForSingleObject (System.Threading.WaitHandle waitObject, System.Threading.WaitOrTimerCallback callBack, object? state, long millisecondsTimeOutInterval, bool executeOnlyOnce);
```

Registers a delegate to wait for a `WaitHandle`, specifying a 64-bit signed integer for the time-out in milliseconds.

Parameters:

- `waitObject`: The `WaitHandle` to register. Use a `WaitHandle` other than `Mutex`.
- `callBack`: The `WaitOrTimerCallback` delegate to call when the `waitObject` parameter is signaled.
- `state`: The object passed to the delegate.
- `millisecondsTimeOutInterval`: The time-out in milliseconds. If the `millisecondsTimeOutInterval` parameter is 0 (zero), the function tests the object's state and returns immediately. If `millisecondsTimeOutInterval` is -1, the function's time-out interval never elapses.
- `executeOnlyOnce`: `true` to indicate that the thread will no longer wait on the `waitObject` parameter after the delegate has been called; `false` to indicate that the timer is reset every time the wait operation completes until the wait is unregistered.

Returns: The `RegisteredWaitHandle` that encapsulates the native handle.

Exceptions:

- `ArgumentOutOfRangeException`: The `millisecondsTimeOutInterval` parameter is less than -1.

#### Remarks
When you are finished using the `RegisteredWaitHandle` that is returned by this method, call its `RegisteredWaitHandle.Unregister` method to release references to the wait handle. We recommend that you always call the `RegisteredWaitHandle.Unregister` method, even if you specify `true` for `executeOnlyOnce`. Garbage collection works more efficiently if you call the `RegisteredWaitHandle.Unregister` method instead of depending on the registered wait handle's finalizer.

The `ThreadPool.RegisterWaitForSingleObject` method queues the specified delegate to the thread pool. A worker thread will execute the delegate when one of the following occurs:

- The specified object is in the signaled state.
- The time-out interval elapses.

The `ThreadPool.RegisterWaitForSingleObject` method checks the current state of the specified object's `WaitHandle`. If the object's state is unsignaled, the method registers a wait operation. The wait operation is performed by a thread from the thread pool. The delegate is executed by a worker thread when the object's state becomes signaled or the time-out interval elapses. If the `timeOutInterval` parameter is not 0 (zero) and the `executeOnlyOnce` parameter is `false`, the timer is reset every time the event is signaled or the time-out interval elapses.

> **Important:**
> Using a `Mutex` for `waitObject` does not provide mutual exclusion for the callbacks because the underlying Windows API uses the default `WT_EXECUTEDEFAULT` flag, so each callback is dispatched on a separate thread pool thread. Instead of a `Mutex`, use a `Semaphore` with a maximum count of 1.

To cancel the wait operation, call the `RegisteredWaitHandle.Unregister` method.

The wait thread uses the Win32 `WaitForMultipleObjects` function to monitor registered wait operations. Therefore, if you must use the same native operating system handle in multiple calls to `ThreadPool.RegisterWaitForSingleObject`, you must duplicate the handle using the Win32 `DuplicateHandle` function. Note that you should not pulse an event object passed to `ThreadPool.RegisterWaitForSingleObject`, because the wait thread might not detect that the event is signaled before it is reset.

Before returning, the function modifies the state of some types of synchronization objects. Modification occurs only for the object whose signaled state caused the wait condition to be satisfied. For example, the count of a semaphore is decreased by one.

## ThreadPool.RegisterWaitForSingleObject(WaitHandle, WaitOrTimerCallback, Object, TimeSpan, Boolean) method

```csharp
public static System.Threading.RegisteredWaitHandle RegisterWaitForSingleObject (System.Threading.WaitHandle waitObject, System.Threading.WaitOrTimerCallback callBack, object? state, TimeSpan timeout, bool executeOnlyOnce);
```

Registers a delegate to wait for a `WaitHandle`, specifying a `TimeSpan` value for the time-out.

Parameters:

- `waitObject`: The `WaitHandle` to register. Use a `WaitHandle` other than `Mutex`.
- `callBack`: The `WaitOrTimerCallback` delegate to call when the `waitObject` parameter is signaled.
- `state`: The object passed to the delegate.
- `timeout`: The time-out represented by a `TimeSpan`. If `timeout` is 0 (zero), the function tests the object's state and returns immediately. If `timeout` is -1, the function's time-out interval never elapses.
- `executeOnlyOnce`: `true` to indicate that the thread will no longer wait on the `waitObject` parameter after the delegate has been called; `false` to indicate that the timer is reset every time the wait operation completes until the wait is unregistered.

Returns: The `RegisteredWaitHandle` that encapsulates the native handle.

Exceptions:

- `ArgumentOutOfRangeException`: The `timeout` parameter is less than -1.
- `NotSupportedException`: The `timeout` parameter is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
When you are finished using the `RegisteredWaitHandle` that is returned by this method, call its `RegisteredWaitHandle.Unregister` method to release references to the wait handle. We recommend that you always call the `RegisteredWaitHandle.Unregister` method, even if you specify `true` for `executeOnlyOnce`. Garbage collection works more efficiently if you call the `RegisteredWaitHandle.Unregister` method instead of depending on the registered wait handle's finalizer.

The `ThreadPool.RegisterWaitForSingleObject` method queues the specified delegate to the thread pool. A worker thread will execute the delegate when one of the following occurs:

- The specified object is in the signaled state.
- The time-out interval elapses.

The `ThreadPool.RegisterWaitForSingleObject` method checks the current state of the specified object's `WaitHandle`. If the object's state is unsignaled, the method registers a wait operation. The wait operation is performed by a thread from the thread pool. The delegate is executed by a worker thread when the object's state becomes signaled or the time-out interval elapses. If the `timeOutInterval` parameter is not 0 (zero) and the `executeOnlyOnce` parameter is `false`, the timer is reset every time the event is signaled or the time-out interval elapses.

> **Important:**
> Using a `Mutex` for `waitObject` does not provide mutual exclusion for the callbacks because the underlying Windows API uses the default `WT_EXECUTEDEFAULT` flag, so each callback is dispatched on a separate thread pool thread. Instead of a `Mutex`, use a `Semaphore` with a maximum count of 1.

To cancel the wait operation, call the `RegisteredWaitHandle.Unregister` method.

The wait thread uses the Win32 `WaitForMultipleObjects` function to monitor registered wait operations. Therefore, if you must use the same native operating system handle in multiple calls to `ThreadPool.RegisterWaitForSingleObject`, you must duplicate the handle using the Win32 `DuplicateHandle` function. Note that you should not pulse an event object passed to `ThreadPool.RegisterWaitForSingleObject`, because the wait thread might not detect that the event is signaled before it is reset.

Before returning, the function modifies the state of some types of synchronization objects. Modification occurs only for the object whose signaled state caused the wait condition to be satisfied. For example, the count of a semaphore is decreased by one.
