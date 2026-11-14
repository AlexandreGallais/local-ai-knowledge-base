---
title: "Thread class (part 5 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Thread.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Thread class (part 5 of 7)

## Thread.Join(TimeSpan) method

```csharp
public bool Join (TimeSpan timeout);
```

Blocks the calling thread until the thread represented by this instance terminates or the specified time elapses, while continuing to perform standard COM and SendMessage pumping.

Parameters:

- `timeout`: A `TimeSpan` set to the amount of time to wait for the thread to terminate.

Returns: `true` if the thread terminated; `false` if the thread has not terminated after the amount of time specified by the `timeout` parameter has elapsed.

Exceptions:

- `ArgumentOutOfRangeException`: The value of `timeout` is negative and is not equal to `Timeout.Infinite` in milliseconds, or is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> milliseconds.
- `ThreadStateException`: The caller attempted to join a thread that is in the `ThreadState.Unstarted` state.

#### Remarks
`Join` is a synchronization method that blocks the calling thread (that is, the thread that calls the method) until either the thread whose `Thread.Join` method is called has completed or the time-out interval has elapsed. In the following example, the `Thread1` thread calls the `Join` method of `Thread2`, which causes `Thread1` to block either until `Thread2` has completed or 2 seconds have elapsed.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/Join/join1c.cs._

If `Infinite` is specified for `timeout`, this method behaves identically to the `Join` method overload, except for the return value.

If the thread has already terminated when `Thread.Join` is called, the method returns immediately.

This method changes the state of the current thread to include `WaitSleepJoin`. You cannot invoke `Join` on a thread that is in the `Unstarted` state.

#### Examples
The following code example demonstrates how to use a `TimeSpan` value with the `Join` method.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/Join/source.cs._

## Thread.MemoryBarrier() method

```csharp
public static void MemoryBarrier ();
```

Synchronizes memory access as follows: The processor executing the current thread cannot reorder instructions in such a way that memory accesses prior to the call to `Thread.MemoryBarrier` execute after memory accesses that follow the call to `Thread.MemoryBarrier`.

#### Remarks
For most purposes, the C# `lock` statement, the Visual Basic `SyncLock` statement, or the `Monitor` class provide easier ways to synchronize data.

## Thread.ResetAbort() method

```csharp
public static void ResetAbort ();
```

Cancels an `Thread.Abort` requested for the current thread.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## Thread.Resume() method

```csharp
public void Resume ();
```

Resumes a thread that has been suspended.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## Thread.SetApartmentState(ApartmentState) method

```csharp
public void SetApartmentState (System.Threading.ApartmentState state);
```

Sets the apartment state of a thread before it is started.

Parameters:

- `state`: The new apartment state.

Exceptions:

- `PlatformNotSupportedException`: On macOS and Linux: In all cases.
- `ArgumentException`: `state` is not a valid apartment state.
- `ThreadStateException`: The thread has already been started.
- `InvalidOperationException`: The apartment state has already been initialized.

#### Remarks
New threads are initialized as `MTA` if their apartment state has not been set before they are started. Apartment state must be set before a thread is started.

> **Note:**
> The main application thread is initialized to `MTA` by default. The only way to set the apartment state of the main application thread to `STA` is to apply the `STAThreadAttribute` attribute to the entry point method.

The `Thread.SetApartmentState` method, along with the `Thread.GetApartmentState` method and the `Thread.TrySetApartmentState` method, replaces the `ApartmentState` property.

#### Examples
The following code example demonstrates the `Thread.GetApartmentState`, `Thread.SetApartmentState`, and `Thread.TrySetApartmentState` methods. The code example creates a thread. Before the thread is started, `Thread.GetApartmentState` displays the initial `Unknown` state and `Thread.SetApartmentState` changes the state to `STA`. The `Thread.TrySetApartmentState` method then returns `false` when attempting to change the state to `MTA` because the apartment state is already set. If the same operation had been attempted with `Thread.SetApartmentState`, `InvalidOperationException` would have been thrown.

After the thread is started, the `Thread.TrySetApartmentState` method is used again. This time it throws `ThreadStateException` because the thread has already been started.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/GetApartmentState/source.cs._

## Thread.SetCompressedStack(CompressedStack) method

```csharp
public void SetCompressedStack (System.Threading.CompressedStack stack);
```

Applies a captured `CompressedStack` to the current thread.

Parameters:

- `stack`: The `CompressedStack` object to be applied to the current thread.

Exceptions:

- `InvalidOperationException`: In all cases.

#### Remarks

This method is no longer supported.

## Thread.SetData(LocalDataStoreSlot, Object) method

```csharp
public static void SetData (LocalDataStoreSlot slot, object? data);
```

Sets the data in the specified slot on the currently running thread, for that thread's current domain. For better performance, use fields marked with the `ThreadStaticAttribute` attribute instead.

Parameters:

- `slot`: The `LocalDataStoreSlot` in which to set the value.
- `data`: The value to be set.

#### Remarks

> **Important:**
> .NET provides two mechanisms for using thread local storage (TLS): thread-relative static fields (that is, fields that are marked with the `ThreadStaticAttribute` attribute) and data slots. Thread-relative static fields provide much better performance than data slots, and enable compile-time type checking. For more information about using TLS, see Thread Local Storage: Thread-Relative Static Fields and Data Slots.

Threads use a local store memory mechanism to store thread-specific data. The common language runtime allocates a multi-slot data store array to each process when it is created. The thread can allocate a data slot in the data store, store and retrieve a data value in the slot, and free the slot for reuse after the thread procedure ends and the `Thread` object has been reclaimed by garbage collection. Data slots are unique per thread. No other thread (not even a child thread) can get that data.

> **Note:**
>  `Thread.SetData` is a `Shared` method that always applies to the currently executing thread, even if you call it using a variable that refers to another thread. To avoid confusion, use the class name when calling `Shared` methods: `Thread.SetData(testSlot, "test data")`.

#### Examples
This section contains two code examples. The first example shows how to use a field that is marked with the `ThreadStaticAttribute` attribute to hold thread-specific information. The second example shows how to use a data slot to do the same thing.

**First Example**

The following example shows how to use a field that is marked with `ThreadStaticAttribute` to hold thread-specific information. This technique provides better performance than the technique that is shown in the second example.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/AllocateDataSlot/source1.cs._

**Second Example**

The following example demonstrates how to use a named data slot to store thread-specific information.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/AllocateNamedDataSlot/source.cs._

## Thread.Sleep(Int32) method

```csharp
public static void Sleep (int millisecondsTimeout);
```

Suspends the current thread for the specified number of milliseconds.

Parameters:

- `millisecondsTimeout`: The number of milliseconds for which the thread is suspended. If the value of the `millisecondsTimeout` argument is zero, the thread relinquishes the remainder of its time slice to any thread of equal priority that is ready to run. If there are no other threads of equal priority that are ready to run, execution of the current thread is not suspended.

Exceptions:

- `ArgumentOutOfRangeException`: The time-out value is negative and is not equal to `Timeout.Infinite`.

#### Remarks
The thread will not be scheduled for execution by the operating system for the amount of time specified. This method changes the state of the thread to include `WaitSleepJoin`.

You can specify `Infinite` for the `millisecondsTimeout` parameter to suspend the thread indefinitely. However, we recommend that you use other `Threading` classes such as `Mutex`, `Monitor`, `EventWaitHandle`, or `Semaphore` instead to synchronize threads or manage resources.

The system clock ticks at a specific rate called the clock resolution. The actual timeout might not be exactly the specified timeout, because the specified timeout will be adjusted to coincide with clock ticks. For more information on clock resolution and the waiting time, see the Sleep function from the Windows system APIs.

This method does not perform standard COM and SendMessage pumping.

> **Note:**
> If you need to sleep on a thread that has `STAThreadAttribute`, but you want to perform standard COM and SendMessage pumping, consider using one of the overloads of the `Thread.Join` method that specifies a timeout interval.

#### Examples
The following example uses the `Thread.Sleep` method to block the application's main thread.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/Sleep/example.cs._

## Thread.Sleep(TimeSpan) method

```csharp
public static void Sleep (TimeSpan timeout);
```

Suspends the current thread for the specified amount of time.

Parameters:

- `timeout`: The amount of time for which the thread is suspended. If the value of the `timeout` argument is `TimeSpan.Zero`, the thread relinquishes the remainder of its time slice to any thread of equal priority that is ready to run. If there are no other threads of equal priority that are ready to run, execution of the current thread is not suspended.

Exceptions:

- `ArgumentOutOfRangeException`: The value of `timeout` is negative and is not equal to `Timeout.Infinite` in milliseconds, or is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> milliseconds.

#### Remarks
The thread will not be scheduled for execution by the operating system for the amount of time specified. This method changes the state of the thread to include `WaitSleepJoin`.

You can specify `InfiniteTimeSpan` for the `timeout` parameter to suspend the thread indefinitely. However, we recommend that you use other `Threading` classes such as `Mutex`, `Monitor`, `EventWaitHandle`, or `Semaphore` instead to synchronize threads or manage resources.

This overload of `Thread.Sleep` uses the total number of whole milliseconds in `timeout`. Fractional milliseconds are discarded.

This method does not perform standard COM and SendMessage pumping.

> **Note:**
> If you need to sleep on a thread that has `STAThreadAttribute`, but you want to perform standard COM and SendMessage pumping, consider using one of the overloads of the `Thread.Join` method that specifies a timeout interval.

#### Examples
The following example uses the `Sleep` method overload to block the application's main thread five times, for two seconds each time.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/Sleep/example1.cs._

## Thread.SpinWait(Int32) method

```csharp
public static void SpinWait (int iterations);
```

Causes a thread to wait the number of times defined by the `iterations` parameter.

Parameters:

- `iterations`: A 32-bit signed integer that defines how long a thread is to wait.

#### Remarks
The `Thread.SpinWait` method is useful for implementing locks. Classes such as `Monitor` and `ReaderWriterLock` use this method internally. `Thread.SpinWait` essentially puts the processor into a very tight loop, with the loop count specified by the `iterations` parameter. The duration of the wait therefore depends on the speed of the processor.

Contrast this with the `Thread.Sleep` method. A thread that calls `Thread.Sleep` yields the rest of its current slice of processor time, even if the specified interval is zero. Specifying a non-zero interval for `Thread.Sleep` removes the thread from consideration by the thread scheduler until the time interval has elapsed.

`Thread.SpinWait` is not generally useful for ordinary applications. In most cases, you should use the synchronization classes provided by .NET; for example, call `Monitor.Enter` or a statement that wraps `Monitor.Enter` (`lock` in C# or `SyncLock` in Visual Basic).

> **Caution:**
> In the rare case where it is advantageous to avoid a context switch, such as when you know that a state change is imminent, make a call to the `Thread.SpinWait` method in your loop. The code `Thread.SpinWait` executes is designed to prevent problems that can occur on computers with multiple processors. For example, on computers with multiple Intel processors employing Hyper-Threading technology, `Thread.SpinWait` prevents processor starvation in certain situations.

## Thread.Start() method

```csharp
public void Start ();
```

Causes the operating system to change the state of the current instance to `ThreadState.Running`.

Exceptions:

- `ThreadStateException`: The thread has already been started.
- `OutOfMemoryException`: There is not enough memory available to start this thread.

#### Remarks
Once a thread is in the `Running` state, the operating system can schedule it for execution. The thread begins executing at the first line of the method represented by the `ThreadStart` or `ParameterizedThreadStart` delegate supplied to the thread constructor. Note that the call to `Thread.Start` does not block the calling thread.

> **Note:**
> If this overload is used with a thread created using a `ParameterizedThreadStart` delegate, `null` is passed to the method executed by the thread.

Once the thread terminates, it cannot be restarted with another call to `Start`.

#### Examples
The following example creates and starts a thread.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/Start/threadstart.cs._
