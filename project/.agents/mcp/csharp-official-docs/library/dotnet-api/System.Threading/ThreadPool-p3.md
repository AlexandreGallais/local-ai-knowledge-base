---
title: "ThreadPool class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ThreadPool.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ThreadPool class (part 3 of 4)

## ThreadPool.RegisterWaitForSingleObject(WaitHandle, WaitOrTimerCallback, Object, UInt32, Boolean) method

```csharp
public static System.Threading.RegisteredWaitHandle RegisterWaitForSingleObject (System.Threading.WaitHandle waitObject, System.Threading.WaitOrTimerCallback callBack, object? state, uint millisecondsTimeOutInterval, bool executeOnlyOnce);
```

Registers a delegate to wait for a `WaitHandle`, specifying a 32-bit unsigned integer for the time-out in milliseconds.

Parameters:

- `waitObject`: The `WaitHandle` to register. Use a `WaitHandle` other than `Mutex`.
- `callBack`: The `WaitOrTimerCallback` delegate to call when the `waitObject` parameter is signaled.
- `state`: The object passed to the delegate.
- `millisecondsTimeOutInterval`: The time-out in milliseconds. If the `millisecondsTimeOutInterval` parameter is 0 (zero), the function tests the object's state and returns immediately. If `millisecondsTimeOutInterval` is -1, the function's time-out interval never elapses.
- `executeOnlyOnce`: `true` to indicate that the thread will no longer wait on the `waitObject` parameter after the delegate has been called; `false` to indicate that the timer is reset every time the wait operation completes until the wait is unregistered.

Returns: The `RegisteredWaitHandle` that can be used to cancel the registered wait operation.

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

#### Examples
The following example shows how to use the `ThreadPool.RegisterWaitForSingleObject` method to execute a specified callback method when a specified wait handle is signaled. In this example, the callback method is `WaitProc`, and the wait handle is an `AutoResetEvent`.

The example defines a `TaskInfo` class to hold the information that is passed to the callback when it executes. The example creates a `TaskInfo` object and assigns it some string data. The `RegisteredWaitHandle` that is returned by the `ThreadPool.RegisterWaitForSingleObject` method is assigned to the `Handle` field of the `TaskInfo` object so that the callback method has access to the `RegisteredWaitHandle`.

In addition to specifying `TaskInfo` as the object to pass to the callback method, the call to the `ThreadPool.RegisterWaitForSingleObject` method specifies the `AutoResetEvent` that the task will wait for, a `WaitOrTimerCallback` delegate that represents the `WaitProc` callback method, a one second time-out interval, and multiple callbacks.

When the main thread signals the `AutoResetEvent` by calling its `EventWaitHandle.Set` method, the `WaitOrTimerCallback` delegate is invoked. The `WaitProc` method tests `RegisteredWaitHandle` to determine whether a time-out occurred. If the callback was invoked because the wait handle was signaled, the `WaitProc` method unregisters the `RegisteredWaitHandle`, stopping additional callbacks. In the case of a time-out, the task continues to wait. The `WaitProc` method ends by printing a message to the console.

_Code sample not included: ~/snippets/csharp/System.Threading/RegisteredWaitHandle/Overview/source.cs._

## ThreadPool.SetMaxThreads(Int32, Int32) method

```csharp
public static bool SetMaxThreads (int workerThreads, int completionPortThreads);
```

Sets the number of requests to the thread pool that can be active concurrently. All requests above that number remain queued until thread pool threads become available.

Parameters:

- `workerThreads`: The maximum number of worker threads in the thread pool.
- `completionPortThreads`: The maximum number of asynchronous I/O threads in the thread pool.

Returns: `true` if the change is successful; otherwise, `false`.

#### Remarks
This method is not supported when the Windows thread pool is configured to be used instead of the .NET thread pool. For more information, see the Windows thread pool config setting.

You cannot set the maximum number of worker threads or I/O completion threads to a number smaller than the number of processors on the computer. To determine how many processors are present, retrieve the value of the `ProcessorCount` property. In addition, you cannot set the maximum number of worker threads or I/O completion threads to a number smaller than the corresponding minimum number of worker threads or I/O completion threads. To determine the minimum thread pool size,  call the `ThreadPool.GetMinThreads` method.

If the common language runtime is hosted, for example by Internet Information Services (IIS) or SQL Server, the host can limit or prevent changes to the thread pool size.

Use caution when changing the maximum number of threads in the thread pool. While your code might benefit, the changes might have an adverse effect on code libraries you use.

Setting the thread pool size too large can cause performance problems. If too many threads are executing at the same time, the task switching overhead becomes a significant factor.

> **Note:**
> The thread pool may have upper limits for the maximum thread counts (such as `short.MaxValue`, depending on the implementation). The argument values are capped to the upper limit, so even when the method returns `true`, the actual maximum thread counts may be lower than requested.

## ThreadPool.SetMinThreads(Int32, Int32) method

```csharp
public static bool SetMinThreads (int workerThreads, int completionPortThreads);
```

Sets the minimum number of threads the thread pool creates on demand, as new requests are made, before switching to an algorithm for managing thread creation and destruction.

Parameters:

- `workerThreads`: The minimum number of worker threads that the thread pool creates on demand.
- `completionPortThreads`: The minimum number of asynchronous I/O threads that the thread pool creates on demand.

Returns: `true` if the change is successful; otherwise, `false`.

#### Remarks
This method is not supported when the Windows thread pool is configured to be used instead of the .NET thread pool. For more information, see the Windows thread pool config setting.

The thread pool provides new worker threads or I/O completion threads on demand until it reaches the minimum for each category. When the minimum is reached, the thread pool can create additional threads in that category or wait until some tasks complete. The thread pool creates and destroys threads in order to optimize throughput, which is defined as the number of tasks that complete per unit of time. Too few threads might not make optimal use of available resources, whereas too many threads could increase resource contention.

When demand is low, the actual number of thread pool threads can fall below the minimum values.

If you specify a negative number or a number larger than the maximum number of active thread pool threads (obtained using `ThreadPool.GetMaxThreads`), `ThreadPool.SetMinThreads` returns `false` and does not change either of the minimum values.

By default, the minimum number of threads is set to the processor count. You can use `ThreadPool.SetMinThreads` to increase the minimum number of threads, such as to temporarily work around issues where some queued work items or tasks block thread pool threads. Those blockages sometimes lead to a situation where all worker or I/O completion threads are blocked (starvation). However, increasing the minimum number of threads might degrade performance in other ways, such as:

- The thread pool may schedule more worker threads, even when the worker threads are not getting blocked. The oversubscription can cause threads that get scheduled-out to be significantly delayed as they wait in a long queue to get another time slice, delaying some work items or tasks.
- Worker threads may take more CPU time in dequeuing work items due to having to scan more threads to steal work from.
- Context switching between threads may increase CPU usage.
- Garbage collection may take more CPU time in thread stack walking.
- The process may consume more memory.

> **Caution:**
> Using the `ThreadPool.SetMinThreads` method to increase the minimum number of threads can cause performance problems as described in the preceding text. In most cases, the thread pool will perform better with its own algorithm for allocating threads. Reducing the minimum to less than the number of processors can also hurt performance.

#### Examples
The following example sets the minimum number of worker threads to four, and preserves the original value for the minimum number of asynchronous I/O completion threads.

_Code sample not included: ~/snippets/csharp/System.Threading/ThreadPool/GetMinThreads/source.cs._

## ThreadPool.UnsafeQueueNativeOverlapped(NativeOverlapped*) method

```csharp
public static bool UnsafeQueueNativeOverlapped (System.Threading.NativeOverlapped* overlapped);
```

Queues an overlapped I/O operation for execution.

Parameters:

- `overlapped`: The `NativeOverlapped` structure to queue.

Returns: `true` if the operation was successfully queued to an I/O completion port; otherwise, `false`.

#### Remarks
For information about using native Win32 overlapped I/O, see the `Overlapped` class, the `NativeOverlapped` structure, and the `OVERLAPPED` structure in the Win32 Platform SDK.

## ThreadPool.UnsafeQueueUserWorkItem(IThreadPoolWorkItem, Boolean) method

```csharp
public static bool UnsafeQueueUserWorkItem (System.Threading.IThreadPoolWorkItem callBack, bool preferLocal);
```

Queues the specified work item object to the thread pool.

Parameters:

- `callBack`: The work item to invoke when a thread in the thread pool picks up the work item.
- `preferLocal`: `true` to prefer queueing the work item in a queue close to the current thread; `false` to prefer queueing the work item to the thread pool's shared queue.

Returns: `true` if the method succeeds; `OutOfMemoryException` is thrown if the work item could not be queued.

Exceptions:

- `ArgumentNullException`: `callBack` is `null`.
- `ArgumentOutOfRangeException`: The work item is a `Task`.
- `OutOfMemoryException`: The work item could not be queued.

#### Remarks

The thread pool will invoke the work item's `Execute` method. It is the responsibility of that work item to propagate `ExecutionContext` if it's needed; the thread pool will not do so.

## ThreadPool.UnsafeQueueUserWorkItem(WaitCallback, Object) method

```csharp
public static bool UnsafeQueueUserWorkItem (System.Threading.WaitCallback callBack, object? state);
```

Queues the specified delegate to the thread pool, but does not propagate the calling stack to the worker thread.

Parameters:

- `callBack`: A `WaitCallback` that represents the delegate to invoke when a thread in the thread pool picks up the work item.
- `state`: The object that is passed to the delegate when serviced from the thread pool.

Returns: `true` if the method succeeds; `OutOfMemoryException` is thrown if the work item could not be queued.

Exceptions:

- `SecurityException`: The caller does not have the required permission.
- `ApplicationException`: An out-of-memory condition was encountered.
- `OutOfMemoryException`: The work item could not be queued.
- `ArgumentNullException`: `callBack` is `null`.

#### Remarks
Unlike the `ThreadPool.QueueUserWorkItem` method, `ThreadPool.UnsafeQueueUserWorkItem` does not propagate the calling stack to the worker thread. This allows code to lose the calling stack and thereby to elevate its security privileges.

## ThreadPool.UnsafeQueueUserWorkItem<TState>(Action<TState>, TState, Boolean) method

```csharp
public static bool UnsafeQueueUserWorkItem<TState> (Action<TState> callBack, TState state, bool preferLocal);
```

Queues a method specified by an `Action<T>` delegate for execution, and specifies an object containing data to be used by the method. The method executes when a thread pool thread becomes available.

Parameters:

- `TState`: The type of elements of `state`.
- `callBack`: A delegate representing the method to execute.
- `state`: An object containing data to be used by the method.
- `preferLocal`: `true` to prefer queueing the work item in a queue close to the current thread; `false` to prefer queueing the work item to the thread pool's shared queue.

Returns: `true` if the method is successfully queued; `NotSupportedException` is thrown if the work item could not be queued.

Exceptions:

- `ArgumentNullException`: `callBack` is `null`.
- `NotSupportedException`: The work item could not be queued.

To be added.
