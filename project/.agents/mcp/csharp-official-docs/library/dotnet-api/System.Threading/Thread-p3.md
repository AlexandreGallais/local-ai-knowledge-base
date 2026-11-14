---
title: "Thread class (part 3 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/Thread.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Thread class (part 3 of 7)

## Thread.AllocateDataSlot() method

```csharp
public static LocalDataStoreSlot AllocateDataSlot ();
```

Allocates an unnamed data slot on all the threads. For better performance, use fields that are marked with the `ThreadStaticAttribute` attribute instead.

Returns: The allocated named data slot on all threads.

#### Remarks

> **Important:**
> .NET provides two mechanisms for using thread local storage (TLS): thread-relative static fields (that is, fields that are marked with the `ThreadStaticAttribute` attribute) and data slots. Thread-relative static fields provide much better performance than data slots, and enable compile-time type checking. For more information about using TLS, see Thread Local Storage: Thread-Relative Static Fields and Data Slots.

The slot is allocated on all threads.

Threads use a local store memory mechanism to store thread-specific data. The common language runtime allocates a multi-slot data store array to each process when it is created. The thread can allocate a data slot in the data store, store and retrieve a data value in the slot, and free the slot for reuse after the thread expires. Data slots are unique per thread. No other thread (not even a child thread) can get that data.

#### Examples
This section contains two code examples. The first example shows how to use a field that is marked with the `ThreadStaticAttribute` attribute to hold thread-specific information. The second example shows how to use a data slot to do the same thing.

**First Example**

The following example shows how to use a field that is marked with `ThreadStaticAttribute` to hold thread-specific information. This technique provides better performance than the technique that is shown in the second example.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/AllocateDataSlot/source1.cs._

**Second Example**

The following code example demonstrates how to use a data slot to store thread-specific information.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/AllocateDataSlot/source.cs._

## Thread.AllocateNamedDataSlot(String) method

```csharp
public static LocalDataStoreSlot AllocateNamedDataSlot (string name);
```

Allocates a named data slot on all threads. For better performance, use fields that are marked with the `ThreadStaticAttribute` attribute instead.

Parameters:

- `name`: The name of the data slot to be allocated.

Returns: The allocated named data slot on all threads.

Exceptions:

- `ArgumentException`: A named data slot with the specified name already exists.

#### Remarks

> **Important:**
> .NET provides two mechanisms for using thread local storage (TLS): thread-relative static fields (that is, fields that are marked with the `ThreadStaticAttribute` attribute) and data slots. Thread-relative static fields provide much better performance than data slots, and enable compile-time type checking. For more information about using TLS, see Thread Local Storage: Thread-Relative Static Fields and Data Slots.

Threads use a local store memory mechanism to store thread-specific data. The common language runtime allocates a multi-slot data store array to each process when it is created. The thread can allocate a data slot in the data store, store and retrieve a data value in the slot, and free the slot for reuse after the thread expires. Data slots are unique per thread. No other thread (not even a child thread) can get that data.

It is not necessary to use the `Thread.AllocateNamedDataSlot` method to allocate a named data slot, because the `Thread.GetNamedDataSlot` method allocates the slot if it has not already been allocated.

> **Note:**
> If the `Thread.AllocateNamedDataSlot` method is used, it should be called in the main thread at program startup, because it throws an exception if a slot with the specified name has already been allocated. There is no way to test whether a slot has already been allocated.

Slots allocated with this method must be freed with `Thread.FreeNamedDataSlot`.

#### Examples
This section contains two code examples. The first example shows how to use a field that is marked with the `ThreadStaticAttribute` attribute to hold thread-specific information. The second example shows how to use a data slot to do the same thing.

**First Example**

The following example shows how to use a field that is marked with `ThreadStaticAttribute` to hold thread-specific information. This technique provides better performance than the technique that is shown in the second example.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/AllocateDataSlot/source1.cs._

**Second Example**

The following example demonstrates how to use a named data slot to store thread-specific information.

> **Note:**
> The example code does not use the `Thread.AllocateNamedDataSlot` method, because the `Thread.GetNamedDataSlot` method allocates the slot if it has not already been allocated. If the `Thread.AllocateNamedDataSlot` method is used, it should be called in the main thread at program startup.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/AllocateNamedDataSlot/source.cs._

## Thread.BeginCriticalRegion() method

```csharp
public static void BeginCriticalRegion ();
```

Notifies a host that execution is about to enter a region of code in which the effects of a thread abort or unhandled exception might jeopardize other tasks.

#### Remarks
Hosts of the common language runtime (CLR), such as SQL Server, can establish different policies for failures in critical and non-critical regions of code. A critical region is one in which the effects of a thread abort or an unhandled exception might not be limited to the current task. By contrast, an abort or failure in a non-critical region of code affects only the task in which the error occurs.

For example, consider a task that attempts to allocate memory while holding a lock. If the memory allocation fails, aborting the current task is not sufficient to ensure stability of the `AppDomain`, because there can be other tasks in the domain waiting for the same lock. If the current task is terminated, other tasks could be deadlocked.

When a failure occurs in a critical region, the host might decide to unload the entire `AppDomain` rather than take the risk of continuing execution in a potentially unstable state. To inform the host that your code is entering a critical region, call `Thread.BeginCriticalRegion`. Call `Thread.EndCriticalRegion` when execution returns to a non-critical region of code.

Using this method in code that runs under SQL Server 2005 requires the code to be run at the highest host protection level.

#### Examples
The following example demonstrates the use of the `Thread.BeginCriticalRegion` and `Thread.EndCriticalRegion` methods to divide a block of code into critical and non-critical regions.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/BeginCriticalRegion/source.cs._

## Thread.BeginThreadAffinity() method

```csharp
public static void BeginThreadAffinity ();
```

Notifies a host that managed code is about to execute instructions that depend on the identity of the current physical operating system thread.

Exceptions:

- `SecurityException`: The caller does not have the required permission.

#### Remarks
Some hosts of the common language runtime, such as Microsoft SQL Server 2005, provide their own thread management. A host that provides its own thread management can move an executing task from one physical operating system thread to another at any time. Most tasks are not affected by this switching. However, some tasks have thread affinity - that is, they depend on the identity of a physical operating system thread. These tasks must inform the host when they execute code that should not be switched.

For example, if your application calls a system API to acquire an operating system lock that has thread affinity, such as a Win32 CRITICAL_SECTION, you must call `Thread.BeginThreadAffinity` before acquiring the lock, and `Thread.EndThreadAffinity` after releasing the lock.

Using this method in code that runs under SQL Server 2005 requires the code to be run at the highest host protection level.

#### Examples
The following example demonstrates the use of the `Thread.BeginThreadAffinity` and `Thread.EndThreadAffinity` methods to notify a host that a block of code depends on the identity of a physical operating system thread.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/BeginThreadAffinity/source.cs._

## Thread.DisableComObjectEagerCleanup() method

```csharp
public void DisableComObjectEagerCleanup ();
```

Turns off automatic cleanup of runtime callable wrappers (RCW) for the current thread.

#### Remarks
By default, the common language runtime (CLR) cleans up runtime callable wrappers automatically. The CLR pumps messages during the cleanup, which might cause reentrancy problems for a few applications that meet the following unusual criteria:

- The application does its own message pumping.

- The application needs to control precisely when message pumping occurs.

Such applications can use the `Thread.DisableComObjectEagerCleanup` method to prevent the CLR from doing automatic reclamation of runtime callable wrappers.

When this method has been called on a thread, automatic cleanup cannot be re-enabled for that thread. When your application is ready to clean up runtime callable wrappers, use the `Marshal.CleanupUnusedObjectsInCurrentContext` method to instruct the runtime to clean up all runtime callable wrappers in the current context. Message pumping occurs while the method executes.

## Thread.EndCriticalRegion() method

```csharp
public static void EndCriticalRegion ();
```

Notifies a host that execution is about to enter a region of code in which the effects of a thread abort or unhandled exception are limited to the current task.

#### Remarks
Hosts of the common language runtime (CLR), such as Microsoft SQL Server 2005, can establish different policies for failures in critical and non-critical regions of code. A critical region is one in which the effects of a thread abort or an unhandled exception might not be limited to the current task. By contrast, an abort or failure in a non-critical region of code affects only the task in which the error occurs.

For example, consider a task that attempts to allocate memory while holding a lock. If the memory allocation fails, aborting the current task is not sufficient to ensure stability of the `AppDomain`, because there can be other tasks in the domain waiting for the same lock. If the current task is terminated, other tasks could be deadlocked.

When a failure occurs in a critical region, the host might decide to unload the entire `AppDomain` rather than take the risk of continuing execution in a potentially unstable state. To inform the host that your code is entering a critical region, call `Thread.BeginCriticalRegion`. Call `Thread.EndCriticalRegion` when execution returns to a non-critical region of code.

Using this method in code that runs under SQL Server 2005 requires the code to be run at the highest host protection level.

#### Examples
The following example demonstrates the use of the `Thread.BeginCriticalRegion` and `Thread.EndCriticalRegion` methods to divide a block of code into critical and non-critical regions.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/BeginCriticalRegion/source.cs._

## Thread.EndThreadAffinity() method

```csharp
public static void EndThreadAffinity ();
```

Notifies a host that managed code has finished executing instructions that depend on the identity of the current physical operating system thread.

Exceptions:

- `SecurityException`: The caller does not have the required permission.

#### Remarks
Some hosts of the common language runtime, such as Microsoft SQL Server 2005, provide their own thread management. A host that provides its own thread management can move an executing task from one physical operating system thread to another at any time. Most tasks are not affected by this switching. However, some tasks have thread affinity - that is, they depend on the identity of a physical operating system thread. These tasks must inform the host when they execute code that should not be switched.

For example, if your application calls a system API to acquire an operating system lock that has thread affinity, such as a Win32 CRITICAL_SECTION, you must call `Thread.BeginThreadAffinity` before acquiring the lock, and `Thread.EndThreadAffinity` after releasing the lock.

Using this method in code that runs under SQL Server 2005 requires the code to be run at the highest host protection level.

#### Examples
The following example demonstrates the use of the `Thread.BeginThreadAffinity` and `Thread.EndThreadAffinity` methods to notify a host that a block of code depends on the identity of a physical operating system thread.

_Code sample not included: ~/snippets/csharp/System.Threading/Thread/BeginThreadAffinity/source.cs._

## Thread.Finalize() method

```csharp
~Thread ();
```

Ensures that resources are freed and other cleanup operations are performed when the garbage collector reclaims the `Thread` object.

#### Remarks
The garbage collector calls `Thread.Finalize` when the current object is ready to be finalized.
