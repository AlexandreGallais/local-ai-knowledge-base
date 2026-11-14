---
title: "ThreadPool class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ThreadPool.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ThreadPool class

Namespace: `System.Threading`

```csharp
public static class ThreadPool
```

Provides a pool of threads that can be used to execute tasks, post work items, process asynchronous I/O, wait on behalf of other threads, and process timers.

#### Remarks
Many applications create threads that spend a great deal of time in the sleeping state, waiting for an event to occur. Other threads might enter a sleeping state only to be awakened periodically to poll for a change or update status information. The thread pool enables you to use threads more efficiently by providing your application with a pool of worker threads that are managed by the system. Examples of operations that use thread pool threads include the following:

- When you create a `Task` or `Task<T>` object to perform some task asynchronously, by default the task is scheduled to run on a thread pool thread.

- Asynchronous timers use the thread pool. Thread pool threads execute callbacks from the `Timer` class and raise events from the `Timer` class.

- When you use registered wait handles, a system thread monitors the status of the wait handles. When a wait operation completes, a worker thread from the thread pool executes the corresponding callback function.

- When you call the `ThreadPool.QueueUserWorkItem` method to queue a method for execution on a thread pool thread. You do this by passing the method a `WaitCallback` delegate. The delegate has the signature `void WaitCallback(object state)`, where `state` is an object that contains data to be used by the delegate. The actual data can be passed to the delegate by calling the `QueueUserWorkItem` method.

> **Note:**
> The threads in the managed thread pool are background threads. That is, their `Thread.IsBackground` properties are `true`. This means that a `ThreadPool` thread will not keep an application running after all foreground threads have exited.

> **Important:**
> When the thread pool reuses a thread, it does not clear the data in thread local storage or in fields that are marked with the `ThreadStaticAttribute` attribute. Therefore, when a method examines thread local storage or fields that are marked with the `ThreadStaticAttribute` attribute, the values it finds might be left over from an earlier use of the thread pool thread.

You can also queue work items that are not related to a wait operation to the thread pool. To request that a work item be handled by a thread in the thread pool, call the `ThreadPool.QueueUserWorkItem` method. This method takes as a parameter a reference to the method or delegate that will be called by the thread selected from the thread pool. There is no way to cancel a work item after it has been queued.

Timer-queue timers and registered wait operations also use the thread pool. Their callback functions are queued to the thread pool.

There is one thread pool per process. The default size of the thread pool for a process depends on several factors, such as the size of the virtual address space. A process can call the `ThreadPool.GetMaxThreads` method to determine the number of threads. The number of threads in the thread pool can be changed by using the `ThreadPool.SetMaxThreads` method. Each thread uses the default stack size and runs at the default priority.

> **Note:**
> Unmanaged code that hosts .NET can change the size of the thread pool by using the `CorSetMaxThreads` function, defined in the mscoree.h file.

The thread pool provides new worker threads or I/O completion threads on demand until it reaches the maximum for each category. When a maximum is reached, the thread pool can create additional threads in that category or wait until some tasks complete. The thread pool creates and destroys worker threads in order to optimize throughput, which is defined as the number of tasks that complete per unit of time. Too few threads might not make optimal use of available resources, whereas too many threads could increase resource contention.

> **Note:**
> When demand is low, the actual number of thread pool threads can fall below the minimum values.

You can use the `ThreadPool.GetMinThreads` method to obtain these minimum values.

> **Caution:**
> You can use the `ThreadPool.SetMinThreads` method to increase the minimum number of threads. However, unnecessarily increasing these values can cause performance problems. If too many tasks start at the same time, all of them might appear to be slow. In most cases the thread pool will perform better with its own algorithm for allocating threads.

#### Examples
In the following example, the main application thread  queues a method named `ThreadProc` to execute on a thread pool thread, sleeps for one second, and then exits. The `ThreadProc` method simply displays a message.

_Code sample not included: ~/snippets/csharp/System.Threading/ThreadPool/Overview/source.cs._

If you comment out the call to the `Thread.Sleep` method, the main thread exits before         method runs on the thread pool thread.  The thread pool uses background         threads, which do not keep the application running if all foreground threads have terminated.  (This         is a simple example of a race condition.)

## ThreadPool.CompletedWorkItemCount property

```csharp
public static long CompletedWorkItemCount { get; }
```

Gets the number of work items that have been processed so far.

Returns: The number of work items that have been processed so far.

If a thread pool implementation may have different types of work items, the count includes all types.

## ThreadPool.PendingWorkItemCount property

```csharp
public static long PendingWorkItemCount { get; }
```

Gets the number of work items that are currently queued to be processed.

Returns: The number of work items that are currently queued to be processed.

If a thread pool implementation may have different types of work items, the count includes all types that can be tracked, which may only be the user work items, including tasks. Some implementations may also include queued timer and wait callbacks in the count. On Windows, the count is unlikely to include the number of pending IO completions, because they are posted directly to an IO completion port.

## ThreadPool.ThreadCount property

```csharp
public static int ThreadCount { get; }
```

Gets the number of thread pool threads that currently exist.

Returns: The number of thread pool threads that currently exist.

If a thread pool implementation may have different types of threads, the count includes all types.

## ThreadPool.BindHandle(IntPtr) method

```csharp
public static bool BindHandle (IntPtr osHandle);
```

Binds an operating system handle to the `ThreadPool`.

Parameters:

- `osHandle`: An `IntPtr` that holds the handle. The handle must have been opened for overlapped I/O on the unmanaged side.

Returns: `true` if the handle is bound; otherwise, `false`.

Exceptions:

- `SecurityException`: The caller does not have the required permission.

#### Remarks
This method is not supported when the Windows thread pool is configured to be used instead of the .NET thread pool. For more information, see the Windows thread pool config setting. An alternative is the `ThreadPoolBoundHandle` class.

## ThreadPool.BindHandle(SafeHandle) method

```csharp
public static bool BindHandle (System.Runtime.InteropServices.SafeHandle osHandle);
```

Binds an operating system handle to the `ThreadPool`.

Parameters:

- `osHandle`: A `SafeHandle` that holds the operating system handle. The handle must have been opened for overlapped I/O on the unmanaged side.

Returns: `true` if the handle is bound; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `osHandle` is `null`.

#### Remarks
This method is not supported when the Windows thread pool is configured to be used instead of the .NET thread pool. For more information, see the Windows thread pool config setting. An alternative is the `ThreadPoolBoundHandle` class.

The `osHandle` parameter should be a `SafeFileHandle`, which derives from the abstract `SafeHandle` class.

## ThreadPool.GetAvailableThreads(Int32, Int32) method

```csharp
public static void GetAvailableThreads (out int workerThreads, out int completionPortThreads);
```

Retrieves the difference between the maximum number of thread pool threads returned by the `ThreadPool.GetMaxThreads` method, and the number currently active.

Parameters:

- `workerThreads`: The number of available worker threads.
- `completionPortThreads`: The number of available asynchronous I/O threads.

#### Remarks
When `ThreadPool.GetAvailableThreads` returns, the variable specified by `workerThreads` contains the number of additional worker threads that can be started, and the variable specified by `completionPortThreads` contains the number of additional asynchronous I/O threads that can be started.

If there are no available threads, additional thread pool requests remain queued until thread pool threads become available.

#### Examples
The following example displays the number of worker threads and I/O threads available when a simple app is started.

_Code sample not included: ~/snippets/csharp/System.Threading/ThreadPool/GetAvailableThreads/Example2.cs._

## ThreadPool.GetMaxThreads(Int32, Int32) method

```csharp
public static void GetMaxThreads (out int workerThreads, out int completionPortThreads);
```

Retrieves the number of requests to the thread pool that can be active concurrently. All requests above that number remain queued until thread pool threads become available.

Parameters:

- `workerThreads`: The maximum number of worker threads in the thread pool.
- `completionPortThreads`: The maximum number of asynchronous I/O threads in the thread pool.

#### Remarks
When `ThreadPool.GetMaxThreads` returns, the variable specified by `workerThreads` contains the maximum number of worker threads allowed in the thread pool, and the variable specified by `completionPortThreads` contains the maximum number of asynchronous I/O threads allowed in the thread pool.

You can use the `ThreadPool.GetAvailableThreads` method to determine the actual number of threads in the thread pool at any given time.

You can use the `ThreadPool.SetMaxThreads` to set the maximum number of worker threads and asynchronous I/O threads in the thread pool.

You can queue as many thread pool requests as system memory allows. If there are more requests than thread pool threads, the additional requests remain queued until thread pool threads become available.

#### Examples
The following code example shows how to retrieve a count of the maximum and available number of threads in the thread pool. A work item is queued that uses `FileStream` to asynchronously write to two files. The callback methods are timed to overlap. A worker thread handles the work item and, depending on the speed and number of processors on the computer, one or two completion port threads handle the write operations.

_Code sample not included: ~/snippets/csharp/System.Threading/ThreadPool/GetAvailableThreads/source.cs._

## ThreadPool.GetMinThreads(Int32, Int32) method

```csharp
public static void GetMinThreads (out int workerThreads, out int completionPortThreads);
```

Retrieves the minimum number of threads the thread pool creates on demand, as new requests are made, before switching to an algorithm for managing thread creation and destruction.

Parameters:

- `workerThreads`: When this method returns, contains the minimum number of worker threads that the thread pool creates on demand.
- `completionPortThreads`: When this method returns, contains the minimum number of asynchronous I/O threads that the thread pool creates on demand.

#### Remarks
The thread pool provides new worker threads or I/O completion threads on demand until it reaches the minimum for each category. By default, the minimum number of threads is set to the number of processors on a system. When the minimum is reached, the thread pool can create additional threads in that category or wait until some tasks complete. The thread pool creates and destroys threads in order to optimize throughput, which is defined as the number of tasks that complete per unit of time. Too few threads might not make optimal use of available resources, whereas too many threads could increase resource contention.

> **Note:**
> When demand is low, the actual number of thread pool threads can fall below the minimum values.

#### Examples
The following example sets the minimum number of worker threads to four, and preserves the original value for the minimum number of asynchronous I/O completion threads.

_Code sample not included: ~/snippets/csharp/System.Threading/ThreadPool/GetMinThreads/source.cs._

## ThreadPool.QueueUserWorkItem(WaitCallback) method

```csharp
public static bool QueueUserWorkItem (System.Threading.WaitCallback callBack);
```

Queues a method for execution. The method executes when a thread pool thread becomes available.

Parameters:

- `callBack`: A `WaitCallback` that represents the method to be executed.

Returns: `true` if the method is successfully queued; `NotSupportedException` is thrown if the work item could not be queued.

Exceptions:

- `ArgumentNullException`: `callBack` is `null`.
- `NotSupportedException`: The common language runtime (CLR) is hosted, and the host does not support this action.

You can place data required by the queued method in the instance fields of the class in which the method is defined, or you can use the `QueueUserWorkItem` overload that accepts an object containing the necessary data.

> **Note:**
> Visual Basic users can omit the `WaitCallback` constructor, and simply use the `AddressOf` operator when passing the callback method to `ThreadPool.QueueUserWorkItem`. Visual Basic <example-value> calls the correct delegate constructor.

The `CurrentPrincipal` property value is propagated to worker threads queued using the `ThreadPool.QueueUserWorkItem` method.

The following example uses the `QueueUserWorkItem` method overload to queue a task, which is represented by the `ThreadProc` method, to execute when a thread becomes available. No task information is supplied with this overload. Therefore, the information that is available to the `ThreadProc` method is limited to the object the method belongs to.

_Code sample not included: ~/snippets/csharp/System.Threading/ThreadPool/Overview/source.cs._
