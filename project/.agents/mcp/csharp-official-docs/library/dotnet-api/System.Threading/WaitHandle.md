---
title: "WaitHandle class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/WaitHandle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WaitHandle class

Namespace: `System.Threading`

```csharp
public abstract class WaitHandle : MarshalByRefObject, IDisposable
```

Encapsulates operating system-specific objects that wait for exclusive access to shared resources.

#### Remarks
The `WaitHandle` class encapsulates a native operating system synchronization handle and is used to represent all synchronization objects in the runtime that allow multiple wait operations. For a comparison of wait handles with other synchronization objects, see Overview of Synchronization Primitives.

The `WaitHandle` class itself is abstract. Classes derived from `WaitHandle` define a signaling mechanism to indicate taking or releasing access to a shared resource, but they use the inherited `WaitHandle` methods to block while waiting for access to shared resources. The classes derived from `WaitHandle` include:

- The `Mutex` class. See Mutexes.
- The `EventWaitHandle` class and its derived classes, `AutoResetEvent` and `ManualResetEvent`.
- The `Semaphore` class. See Semaphore and SemaphoreSlim.

Threads can block on an individual wait handle by calling the instance method `WaitHandle.WaitOne`, which is inherited by classes derived from `WaitHandle`.

The derived classes of `WaitHandle` differ in their thread affinity. Event wait handles (`EventWaitHandle`, `AutoResetEvent`, and `ManualResetEvent`) and semaphores do not have thread affinity; any thread can signal an event wait handle or semaphore. Mutexes, on the other hand, do have thread affinity; the thread that owns a mutex must release it, and an exception is thrown if a thread calls the `Mutex.ReleaseMutex` method on a mutex that it does not own.

In addition to its derived classes, the `WaitHandle` class has a number of static methods that block a thread until one or more synchronization objects receive a signal. These include:

- `WaitHandle.SignalAndWait`, which allows a thread to signal one wait handle and immediately wait on another.
- `WaitHandle.WaitAll`, which allows a thread to wait until all the wait handles in an array receive a signal.
- `WaitHandle.WaitAny`, which allows a thread to wait until any one of a specified set of wait handles has been signaled.

The overloads of these methods provide timeout intervals for abandoning the wait, and the opportunity to exit a synchronization context before entering the wait, allowing other threads to use the synchronization context.

> **Important:**
> This type implements the `IDisposable` interface. When you've finished using the type or a type derived from it, you should dispose of it either directly or indirectly. To dispose of the type directly, call its `WaitHandle.Close` method in a `try`/`finally` block. To dispose of it indirectly, use a language construct such as `using` in C#.
>
> When you derive from `WaitHandle`, use the `SafeWaitHandle` property to store your native operating system handle. You do not need to override the protected `WaitHandle.Dispose` method unless you use additional unmanaged resources.

#### Examples
The following code example shows how two threads can do background tasks while the Main thread waits for the tasks to complete using the static `WaitHandle.WaitAny` and `WaitHandle.WaitAll` methods of the `WaitHandle` class.

_Code sample not included: ~/snippets/csharp/System.Threading/WaitHandle/Overview/WaitHandle.cs._

## WaitHandle.WaitHandle() constructor

```csharp
protected WaitHandle ();
```

Initializes a new instance of the `WaitHandle` class.

To be added.

## WaitHandle.Handle property

```csharp
public virtual IntPtr Handle { get; set; }
```

Gets or sets the native operating system handle.

Returns: An `IntPtr` representing the native operating system handle. The default is the value of the `WaitHandle.InvalidHandle` field.

To be added.

## WaitHandle.SafeWaitHandle property

```csharp
public Microsoft.Win32.SafeHandles.SafeWaitHandle SafeWaitHandle { get; set; }
```

Gets or sets the native operating system handle.

Returns: A `SafeWaitHandle` representing the native operating system handle.

#### Remarks
When you assign a new value to the `SafeWaitHandle` property, the previous handle will be closed when the previous `SafeWaitHandle` object is collected. Do not manually close the handle, because this results in an `ObjectDisposedException` when the `SafeWaitHandle` attempts to close the handle.

`WaitHandle` implements the `IDisposable.Dispose` pattern. See Implementing a Dispose method. When you derive from `WaitHandle`, use the `SafeWaitHandle` property to store your native handle operating system handle. You do not need to override the protected `WaitHandle.Dispose` method unless you use additional unmanaged resources.

## WaitHandle.Close() method

```csharp
public virtual void Close ();
```

Releases all resources held by the current `WaitHandle`.

#### Remarks
This method is the public implementation of the `IDisposable.Dispose` method for the `WaitHandle` class and its derived classes. It provides a standard implementation that calls the `Dispose(Boolean)` overload with a `true` argument and then calls the `GC.SuppressFinalize` method. Call this method to release all resources held by an instance of `WaitHandle` or a derived class.

Once this method is called, references to the current instance cause undefined behavior.

> **Note:**
> Always call `WaitHandle.Close` or `Dispose` before you release your last reference to the `WaitHandle`. Otherwise, the resources it is using will not be freed.

## WaitHandle.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `WaitHandle` class.

#### Remarks
This method is equivalent to the `WaitHandle.Close` method.

> **Note:**
> Always call `WaitHandle.Close` or `Dispose` before you release your last reference to the `WaitHandle`. Otherwise, the resources it is using will not be freed.

## WaitHandle.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool explicitDisposing);
```

When overridden in a derived class, releases the unmanaged resources used by the `WaitHandle`, and optionally releases the managed resources.

Parameters:

- `explicitDisposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the `WaitHandle.Close` and the `Dispose` methods with the `explicitDisposing` parameter set to `true`.  When the `explicitDisposing` parameter is `true`, this method releases all resources held by any managed objects that this `WaitHandle` object references.

## WaitHandle.SignalAndWait(WaitHandle, WaitHandle) method

```csharp
public static bool SignalAndWait (System.Threading.WaitHandle toSignal, System.Threading.WaitHandle toWaitOn);
```

Signals one `WaitHandle` and waits on another.

Parameters:

- `toSignal`: The `WaitHandle` to signal.
- `toWaitOn`: The `WaitHandle` to wait on.

Returns: `true` if both the signal and the wait complete successfully; if the wait does not complete, the method does not return.

Exceptions:

- `ArgumentNullException`: `toSignal` is `null`.

-or-

`toWaitOn` is `null`.
- `NotSupportedException`: The method was called on a thread in `ApartmentState.STA` state.
- `InvalidOperationException`: `toSignal` is a semaphore, and it already has a full count.
- `AbandonedMutexException`: The wait completed because a thread exited without releasing a mutex.

#### Remarks
This operation is not guaranteed to be atomic. After the current thread signals `toSignal` but before it waits on `toWaitOn`, a thread that is running on another processor might signal `toWaitOn` or wait on it.

#### Examples
The following code example uses the `SignalAndWait` method overload to allow the main thread to signal a blocked thread and then wait until the thread finishes a task.

The example starts five threads, allows them to block on an `EventWaitHandle` created with the `AutoReset` flag, and then releases one thread each time the user presses the ENTER key. The example then queues another five threads and releases them all using an `EventWaitHandle` created with the `ManualReset` flag.

_Code sample not included: ~/snippets/csharp/System.Threading/EventResetMode/Overview/source.cs._

## WaitHandle.SignalAndWait(WaitHandle, WaitHandle, Int32, Boolean) method

```csharp
public static bool SignalAndWait (System.Threading.WaitHandle toSignal, System.Threading.WaitHandle toWaitOn, int millisecondsTimeout, bool exitContext);
```

Signals one `WaitHandle` and waits on another, specifying a time-out interval as a 32-bit signed integer and specifying whether to exit the synchronization domain for the context before entering the wait.

Parameters:

- `toSignal`: The `WaitHandle` to signal.
- `toWaitOn`: The `WaitHandle` to wait on.
- `millisecondsTimeout`: An integer that represents the interval to wait. If the value is `Timeout.Infinite`, that is, -1, the wait is infinite.
- `exitContext`: `true` to exit the synchronization domain for the context before the wait (if in a synchronized context), and reacquire it afterward; otherwise, `false`.

Returns: `true` if both the signal and the wait completed successfully, or `false` if the signal completed but the wait timed out.

Exceptions:

- `ArgumentNullException`: `toSignal` is `null`.

-or-

`toWaitOn` is `null`.
- `NotSupportedException`: The method is called on a thread in `ApartmentState.STA` state.
- `InvalidOperationException`: The `WaitHandle` cannot be signaled because it would exceed its maximum count.
- `ArgumentOutOfRangeException`: `millisecondsTimeout` is a negative number other than -1, which represents an infinite time-out.
- `AbandonedMutexException`: The wait completed because a thread exited without releasing a mutex.

#### Remarks

This operation is not guaranteed to be atomic. After the current thread signals `toSignal` but before it waits on `toWaitOn`, a thread that is running on another processor might signal `toWaitOn` or wait on it.

If `millisecondsTimeout` is zero, the method does not block. It tests the state of the `toWaitOn` and returns immediately.

## WaitHandle.SignalAndWait(WaitHandle, WaitHandle, TimeSpan, Boolean) method

```csharp
public static bool SignalAndWait (System.Threading.WaitHandle toSignal, System.Threading.WaitHandle toWaitOn, TimeSpan timeout, bool exitContext);
```

Signals one `WaitHandle` and waits on another, specifying the time-out interval as a `TimeSpan` and specifying whether to exit the synchronization domain for the context before entering the wait.

Parameters:

- `toSignal`: The `WaitHandle` to signal.
- `toWaitOn`: The `WaitHandle` to wait on.
- `timeout`: A `TimeSpan` that represents the interval to wait. If the value is -1, the wait is infinite.
- `exitContext`: `true` to exit the synchronization domain for the context before the wait (if in a synchronized context), and reacquire it afterward; otherwise, `false`.

Returns: `true` if both the signal and the wait completed successfully, or `false` if the signal completed but the wait timed out.

Exceptions:

- `ArgumentNullException`: `toSignal` is `null`.

-or-

`toWaitOn` is `null`.
- `NotSupportedException`: The method was called on a thread in `ApartmentState.STA` state.
- `InvalidOperationException`: `toSignal` is a semaphore, and it already has a full count.
- `ArgumentOutOfRangeException`: `timeout` evaluates to a negative number of milliseconds other than -1.

-or-

`timeout` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `AbandonedMutexException`: The wait completed because a thread exited without releasing a mutex.

#### Remarks
This operation is not guaranteed to be atomic. After the current thread signals `toSignal` but before it waits on `toWaitOn`, a thread that is running on another processor might signal `toWaitOn` or wait on it.

The maximum value for `timeout` is `MaxValue`.

If `timeout` is zero, the method does not block. It tests the state of the `toWaitOn` and returns immediately.

## WaitHandle.WaitAll(WaitHandle[]) method

```csharp
public static bool WaitAll (System.Threading.WaitHandle[] waitHandles);
```

Waits for all the elements in the specified array to receive a signal.

Parameters:

- `waitHandles`: A `WaitHandle` array containing the objects for which the current instance will wait. This array cannot contain multiple references to the same object.

Returns: `true` when every element in `waitHandles` has received a signal; otherwise the method never returns.

Exceptions:

- `ArgumentNullException`: The `waitHandles` parameter is `null`.

-or-

One or more of the objects in the `waitHandles` array are `null`.

-or-

`waitHandles` is an array with no elements.
- `DuplicateWaitObjectException`: The `waitHandles` array contains elements that are duplicates.
- `NotSupportedException`: The number of objects in `waitHandles` is greater than the system permits.

-or-

The current thread is in `ApartmentState.STA` state, and `waitHandles` contains more than one element.
- `AbandonedMutexException`: The wait terminated because a thread exited without releasing a mutex.
- `InvalidOperationException`: The `waitHandles` array contains a transparent proxy for a `WaitHandle` in another application domain.

#### Remarks
`AbandonedMutexException` is thrown when a mutex is abandoned. An abandoned mutex often indicates a serious coding error. In the case of a system-wide mutex, it might indicate that an application has been terminated abruptly (for example, by using Windows Task Manager). The exception contains information useful for debugging.

The `WaitHandle.WaitAll` method returns when all the handles are signaled. If more than 64 handles are passed, a `NotSupportedException` is thrown. If the array contains duplicates, the call fails with a `DuplicateWaitObjectException`.

> **Note:**
> The `WaitHandle.WaitAll` method is not supported on threads in `STA` state.

Calling this method overload is equivalent to calling the `WaitAll` method overload and specifying -1 (or `Infinite`) for `millisecondsTimeout` and `true` for `exitContext`.

#### Examples
The following code example shows how to use the thread pool to asynchronously create and write to a group of files. Each write operation is queued as a work item and signals when it is finished. The main thread waits for all the items to signal and then exits.

_Code sample not included: ~/snippets/csharp/System.Threading/WaitHandle/WaitAll/source1.cs._
