---
title: "Thread class (part 4 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Thread.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Thread class (part 4 of 7)

## Thread.FreeNamedDataSlot(String) method

```csharp
public static void FreeNamedDataSlot (string name);
```

Eliminates the association between a name and a slot, for all threads in the process. For better performance, use fields that are marked with the `ThreadStaticAttribute` attribute instead.

Parameters:

- `name`: The name of the data slot to be freed.

#### Remarks

> **Important:**
> .NET provides two mechanisms for using thread local storage (TLS): thread-relative static fields (that is, fields that are marked with the `ThreadStaticAttribute` attribute) and data slots. Thread-relative static fields provide much better performance than data slots, and enable compile-time type checking. For more information about using TLS, see Thread Local Storage: Thread-Relative Static Fields and Data Slots.

After any thread calls `FreeNamedDataSlot`, any other thread that calls `Thread.GetNamedDataSlot` with the same name will allocate a new slot associated with the name. Subsequent calls to `GetNamedDataSlot` by any thread will return the new slot. However, any thread that still has a `LocalDataStoreSlot` returned by an earlier call to `GetNamedDataSlot` can continue to use the old slot.

A slot that has been associated with a name is released only when every `LocalDataStoreSlot` that was obtained prior to the call to `FreeNamedDataSlot` has been released and garbage-collected.

Threads use a local store memory mechanism to store thread-specific data. The common language runtime allocates a multi-slot data store array to each process when it is created. The thread can allocate a data slot in the data store, store and retrieve a data value in the slot, and free the slot for reuse after the thread expires. Data slots are unique per thread. No other thread (not even a child thread) can get that data.

#### Examples
This section contains two code examples. The first example shows how to use a field that is marked with the `ThreadStaticAttribute` attribute to hold thread-specific information. The second example shows how to use a data slot to do the same thing.

**First Example**

The following example shows how to use a field that is marked with `ThreadStaticAttribute` to hold thread-specific information. This technique provides better performance than the technique that is shown in the second example.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/AllocateDataSlot/source1.cs._

**Second Example**

The following example demonstrates how to use a named data slot to store thread-specific information.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/AllocateNamedDataSlot/source.cs._

## Thread.GetApartmentState() method

```csharp
public System.Threading.ApartmentState GetApartmentState ();
```

Returns an `ApartmentState` value indicating the apartment state.

Returns: One of the `ApartmentState` values indicating the apartment state of the managed thread. The default is `ApartmentState.Unknown`.

#### Remarks
This method, along with the `Thread.SetApartmentState` method and the `Thread.TrySetApartmentState` method, replaces the `ApartmentState` property.

#### Examples
The following code example demonstrates the `Thread.GetApartmentState`, `Thread.SetApartmentState`, and `Thread.TrySetApartmentState` methods. The code example creates a thread. Before the thread is started, `Thread.GetApartmentState` displays the initial `Unknown` state and `Thread.SetApartmentState` changes the state to `STA`. The `Thread.TrySetApartmentState` method then returns `false` when attempting to change the state to `MTA` because the apartment state is already set. If the same operation had been attempted with `Thread.SetApartmentState`, `InvalidOperationException` would have been thrown.

After the thread is started, the `Thread.TrySetApartmentState` method is used again. This time it throws `ThreadStateException` because the thread has already been started.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/GetApartmentState/source.cs._

## Thread.GetCompressedStack() method

```csharp
public System.Threading.CompressedStack GetCompressedStack ();
```

Returns a `CompressedStack` object that can be used to capture the stack for the current thread.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: In all cases.

#### Remarks

This method is no longer supported.

## Thread.GetCurrentProcessorId() method

```csharp
public static int GetCurrentProcessorId ();
```

Gets an ID used to indicate on which processor the current thread is executing.

Returns: An integer representing the cached processor ID.

#### Remarks

This value is cached and periodically refreshed. It may be stale by the time it's used: consuming code must not rely on its accuracy for correctness.

The value is not guaranteed to be a zero-based processor number.

## Thread.GetData(LocalDataStoreSlot) method

```csharp
public static object? GetData (LocalDataStoreSlot slot);
```

Retrieves the value from the specified slot on the current thread, within the current thread's current domain. For better performance, use fields that are marked with the `ThreadStaticAttribute` attribute instead.

Parameters:

- `slot`: The `LocalDataStoreSlot` from which to get the value.

Returns: The retrieved value.

#### Remarks

> **Important:**
> .NET provides two mechanisms for using thread local storage (TLS): thread-relative static fields (that is, fields that are marked with the `ThreadStaticAttribute` attribute) and data slots. Thread-relative static fields provide much better performance than data slots, and enable compile-time type checking. For more information about using TLS, see Thread Local Storage: Thread-Relative Static Fields and Data Slots.

Threads use a local store memory mechanism to store thread-specific data. The common language runtime allocates a multi-slot data store array to each process when it is created. The thread can allocate a data slot in the data store, store and retrieve a data value in the slot, and free the slot for reuse after the thread expires. Data slots are unique per thread. No other thread (not even a child thread) can get that data.

> **Note:**
>  `Thread.GetData` is a `Shared` method that always applies to the currently executing thread, even if you call it using a variable that refers to another thread. To avoid confusion, use the class name when calling `Shared` methods: `Dim test As Object = Thread.GetData(testSlot)`.

#### Examples
This section contains two code examples. The first example shows how to use a field that is marked with the `ThreadStaticAttribute` attribute to hold thread-specific information. The second example shows how to use a data slot to do the same thing.

**First Example**

The following example shows how to use a field that is marked with `ThreadStaticAttribute` to hold thread-specific information. This technique provides better performance than the technique that is shown in the second example.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/AllocateDataSlot/source1.cs._

**Second Example**

The following example demonstrates how to use a data slot to store thread-specific information.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/AllocateDataSlot/source.cs._

## Thread.GetDomain() method

```csharp
public static AppDomain GetDomain ();
```

Returns the current domain in which the current thread is running.

Returns: An `AppDomain` representing the current application domain of the running thread.

To be added.

## Thread.GetDomainID() method

```csharp
public static int GetDomainID ();
```

Returns a unique application domain identifier.

Returns: A 32-bit signed integer uniquely identifying the application domain.

To be added.

## Thread.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns a hash code for the current thread.

Returns: An integer hash code value.

#### Remarks
The hash code is not guaranteed to be unique. Use the `ManagedThreadId` property if you need a unique identifier for a managed thread.

## Thread.GetNamedDataSlot(String) method

```csharp
public static LocalDataStoreSlot GetNamedDataSlot (string name);
```

Looks up a named data slot. For better performance, use fields that are marked with the `ThreadStaticAttribute` attribute instead.

Parameters:

- `name`: The name of the local data slot.

Returns: A `LocalDataStoreSlot` allocated for this thread.

#### Remarks

> **Important:**
> .NET provides two mechanisms for using thread local storage (TLS): thread-relative static fields (that is, fields that are marked with the `ThreadStaticAttribute` attribute) and data slots. Thread-relative static fields provide much better performance than data slots, and enable compile-time type checking. For more information about using TLS, see Thread Local Storage: Thread-Relative Static Fields and Data Slots.

Threads use a local store memory mechanism to store thread-specific data. The common language runtime allocates a multi-slot data store array to each process when it is created. The thread can allocate a data slot in the data store, store and retrieve a data value in the slot, and free the slot for reuse after the thread expires. Data slots are unique per thread. No other thread (not even a child thread) can get that data.

If the named slot does not exist, a new slot is allocated. Named data slots are public and can be manipulated by anyone.

#### Examples
This section contains two code examples. The first example shows how to use a field that is marked with the `ThreadStaticAttribute` attribute to hold thread-specific information. The second example shows how to use a data slot to do the same thing.

**First Example**

The following example shows how to use a field that is marked with `ThreadStaticAttribute` to hold thread-specific information. This technique provides better performance than the technique that is shown in the second example.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/AllocateDataSlot/source1.cs._

**Second Example**

The following example demonstrates how to use a named data slot to store thread-specific information.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/AllocateNamedDataSlot/source.cs._

## Thread.Interrupt() method

```csharp
public void Interrupt ();
```

Interrupts a thread that is in the `ThreadState.WaitSleepJoin` thread state.

Exceptions:

- `SecurityException`: The caller does not have the appropriate `SecurityPermission`.

#### Remarks
If this thread is not currently blocked in a wait, sleep, or join state, it will be interrupted when it next begins to block.

`ThreadInterruptedException` is thrown in the interrupted thread, but not until the thread blocks. If the thread never blocks, the exception is never thrown, and thus the thread might complete without ever being interrupted.

#### Examples
The following code example shows the behavior of a running thread when it is interrupted and subsequently gets blocked.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/Interrupt/source.cs._

## Thread.Join() method

```csharp
public void Join ();
```

Blocks the calling thread until the thread represented by this instance terminates, while continuing to perform standard COM and `SendMessage` pumping.

Exceptions:

- `ThreadStateException`: The caller attempted to join a thread that is in the `ThreadState.Unstarted` state.
- `ThreadInterruptedException`: The thread is interrupted while waiting.

#### Remarks
`Thread.Join` is a synchronization method that blocks the calling thread (that is, the thread that calls the method) until the thread whose `Thread.Join` method is called has completed. Use this method to ensure that a thread has been terminated. The caller will block indefinitely if the thread does not terminate. In the following example, the `Thread1` thread calls the `Join` method of `Thread2`, which causes `Thread1` to block until `Thread2` has completed.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/Join/join1a.cs._

If the thread has already terminated when `Thread.Join` is called, the method returns immediately.

> **Warning:**
> You should never call the `Thread.Join` method of the `Thread` object that represents the current thread from the current thread. This causes your app to become unresponsive because the current thread waits upon itself indefinitely,

This method changes the state of the calling thread to include `WaitSleepJoin`. You cannot invoke `Join` on a thread that is in the `Unstarted` state.

## Thread.Join(Int32) method

```csharp
public bool Join (int millisecondsTimeout);
```

Blocks the calling thread until the thread represented by this instance terminates or the specified time elapses, while continuing to perform standard COM and SendMessage pumping.

Parameters:

- `millisecondsTimeout`: The number of milliseconds to wait for the thread to terminate.

Returns: `true` if the thread has terminated; `false` if the thread has not terminated after the amount of time specified by the `millisecondsTimeout` parameter has elapsed.

Exceptions:

- `ArgumentOutOfRangeException`: The value of `millisecondsTimeout` is negative and is not equal to `Timeout.Infinite` in milliseconds.
- `ThreadStateException`: The thread has not been started.
- `ArgumentException`: `millisecondsTimeout` is less than -1 (Timeout.Infinite).
- `ThreadInterruptedException`: The thread was interrupted while waiting.

#### Remarks
`Join` is a synchronization method that blocks the calling thread (that is, the thread that calls the method) until either the thread whose `Thread.Join` method is called has completed or the time-out interval has elapsed. In the following example, the `Thread1` thread calls the `Join` method of `Thread2`, which causes `Thread1` to block either until `Thread2` has completed or 2 seconds have elapsed.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/Join/join1b.cs._

If `Infinite` is specified for the `millisecondsTimeout` parameter, this method behaves identically to the `Join` method overload, except for the return value.

If the thread has already terminated when `Thread.Join` is called, the method returns immediately.

This method changes the state of the calling thread to include `WaitSleepJoin`. You cannot invoke `Join` on a thread that is in the `Unstarted` state.
