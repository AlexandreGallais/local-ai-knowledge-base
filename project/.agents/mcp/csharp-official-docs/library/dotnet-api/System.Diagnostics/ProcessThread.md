---
title: "ProcessThread class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ProcessThread.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProcessThread class

Namespace: `System.Diagnostics`

```csharp
public class ProcessThread : System.ComponentModel.Component
```

Represents an operating system process thread.

#### Remarks
Use `ProcessThread` to obtain information about a thread that is currently running on the system. Doing so allows you, for example, to monitor the thread's performance characteristics.

> **Important:**
> This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.

A thread is a path of execution through a program. It is the smallest unit of execution that Win32 schedules. It consists of a stack, the state of the CPU registers, and an entry in the execution list of the system scheduler.

A process consists of one or more threads and the code, data, and other resources of a program in memory. Typical program resources are open files, semaphores, and dynamically allocated memory. Each resource of a process is shared by all that process's threads.

A program executes when the system scheduler gives execution control to one of the program's threads. The scheduler determines which threads should run and when. A lower-priority thread might be forced to wait while higher-priority threads complete their tasks. On multiprocessor computers, the scheduler can move individual threads to different processors, thus balancing the CPU load.

Each process starts with a single thread, which is known as the primary thread. Any thread can create additional threads. All the threads within a process share the address space of that process.

The primary thread is not necessarily located at the first index in the collection.

The threads of a process execute individually and are unaware of each other unless you make them visible to each other. Threads that share common resources, however, must coordinate their work by using semaphores or another method of interprocess communication.

To get a collection of all the `ProcessThread` objects associated with the current process, get the `Threads` property of the `Process` instance.

## ProcessThread.BasePriority property

```csharp
public int BasePriority { get; }
```

Gets the base priority of the thread.

Returns: The base priority of the thread, which the operating system computes by combining the process priority class with the priority level of the associated thread.

#### Remarks
The `ProcessThread.BasePriority` is the starting priority for the process thread. You can view information about the base priority through the System Monitor's Priority Base counter.

The operating system computes a thread's base priority by combining the thread's priority level range with the process's priority class. You can set the process's `PriorityClass` property to one of the values in the `ProcessPriorityClass` enumeration, which are `Idle`, `Normal`, `High`, `AboveNormal`, `BelowNormal`, or `RealTime`. You can set the thread's `PriorityLevel` property to a range of values that bounds the thread's base priority. Win32 uses four priority classes with seven base priority levels per class.

The thread's current priority might deviate from the base priority. For example, the operating system can change the `CurrentPriority` property based on the time elapsed or other boosts when a process must be put ahead of others for access to the processor. In addition, you can set the `PriorityBoostEnabled` property to cause the system to temporarily boost the priority of a thread whenever the process is taken out of the wait state. The priority is reset when the process returns to the wait state.

## ProcessThread.CurrentPriority property

```csharp
public int CurrentPriority { get; }
```

Gets the current priority of the thread.

Returns: The current priority of the thread, which may deviate from the base priority based on how the operating system is scheduling the thread. The priority may be temporarily boosted for an active thread.

#### Remarks
The thread's current priority might deviate from the base priority. For example, the operating system can change the `CurrentPriority` property based on the time elapsed, or other boosts, when a process must be put ahead of others for access to the processor. In addition, you can set the `PriorityBoostEnabled` property to cause the system to temporarily boost the priority of a thread whenever the process is taken out of the wait state. The priority is reset when the process returns to the wait state.

## ProcessThread.Id property

```csharp
public int Id { get; }
```

Gets the unique identifier of the thread.

Returns: The unique identifier associated with a specific thread.

#### Remarks
The operating system reuses thread identification numbers, which identify threads only during their lifetimes.

## ProcessThread.IdealProcessor property

```csharp
public int IdealProcessor { set; }
```

Sets the preferred processor for this thread to run on.

Returns: The preferred processor for the thread, used when the system schedules threads, to determine which processor to run the thread on.

Exceptions:

- `Win32Exception`: The system could not set the thread to start on the specified processor.
- `NotSupportedException`: The process is on a remote computer.

#### Remarks
The `ProcessThread.IdealProcessor` value is zero-based.  In other words, to set the thread affinity for the first processor, set the property to zero.

The system schedules threads on their preferred processors whenever possible.

A process thread can migrate from processor to processor, with each migration reloading the processor cache. Specifying a processor for a thread can improve performance under heavy system loads by reducing the number of times the processor cache is reloaded.

#### Examples
The following example demonstrates how to set the `IdealProcessor` property for an instance of Notepad to the first processor.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/ProcessThread/IdealProcessor/program.cs._

## ProcessThread.PriorityBoostEnabled property

```csharp
public bool PriorityBoostEnabled { get; set; }
```

Gets or sets a value indicating whether the operating system should temporarily boost the priority of the associated thread whenever the main window of the thread's process receives the focus.

Returns: `true` to boost the thread's priority when the user interacts with the process's interface; otherwise, `false`. The default is `false`.

Exceptions:

- `Win32Exception`: The priority boost information could not be retrieved.

-or-

The priority boost information could not be set.
- `NotSupportedException`: The process is on a remote computer.

#### Remarks
When `ProcessThread.PriorityBoostEnabled` is `true`, the system temporarily boosts the thread's priority whenever its associated process is taken out of the wait state. This action prevents other processes from interrupting the processing of the current thread. The `ProcessThread.PriorityBoostEnabled` setting affects all existing threads as well as any threads subsequently created by the process. To restore normal behavior, set the `PriorityBoostEnabled` property to `false`.

`ProcessThread.PriorityBoostEnabled` has an effect only when the thread is running in a process that has a `Process.PriorityClass` set to one of the dynamic priority enumeration values (`Normal`, `High`, or `RealTime`).

> **Note:**
> Boosting the priority too high can drain resources from essential operating system and network functions. This could cause problems with other operating system tasks.

## ProcessThread.PriorityLevel property

```csharp
public System.Diagnostics.ThreadPriorityLevel PriorityLevel { get; set; }
```

Gets or sets the priority level of the thread.

Returns: One of the `ThreadPriorityLevel` values, specifying a range that bounds the thread's priority.

Exceptions:

- `Win32Exception`: The thread priority level information could not be retrieved.

-or-

The thread priority level could not be set.
- `NotSupportedException`: The process is on a remote computer.
- `PlatformNotSupportedException`: On Linux and macOS, when the property is set; on macOS, when the property is retrieved.

#### Remarks
The priority level is not a single value, but rather a range of values. The operating system computes the thread's base priority by using the process's `Process.PriorityClass` to choose a value from the range specified in the `PriorityLevel` property.

## ProcessThread.PrivilegedProcessorTime property

```csharp
public TimeSpan PrivilegedProcessorTime { get; }
```

Gets the amount of time that the thread has spent running code inside the operating system core.

Returns: A `TimeSpan` indicating the amount of time that the thread has spent running code inside the operating system core.

Exceptions:

- `Win32Exception`: The thread time could not be retrieved.
- `NotSupportedException`: The process is on a remote computer.

#### Remarks
Windows uses several different protection mechanisms, and at the root of them all is the distinction between user mode and privileged mode. `ProcessThread.PrivilegedProcessorTime` corresponds to the amount of time that the application has spent running in privileged mode, inside the operating system core. The `UserProcessorTime` property indicates the amount of time that the application has spent running code in user mode, outside the system core.

User mode restricts the application in two important ways. First, the application cannot directly access the peripherals, but instead must call the operating system core to get or set peripheral data. The operating system can thus ensure that one application does not destroy peripheral data that is needed by another. Second, the application cannot read or change data that the operating system itself maintains. This restriction prevents applications from either inadvertently or intentionally corrupting the core. If the application needs the operating system to perform an operation, it calls one of the system's routines. Many of these transition into privileged mode, perform the operation, and smoothly return to user mode.

## ProcessThread.ProcessorAffinity property

```csharp
public IntPtr ProcessorAffinity { set; }
```

Sets the processors on which the associated thread can run.

Returns: An `IntPtr` that points to a set of bits, each of which represents a processor that the thread can run on.

Exceptions:

- `Win32Exception`: The processor affinity could not be set.
- `NotSupportedException`: The process is on a remote computer.
- `PlatformNotSupportedException`: On Linux and macOS, when the property is set.

#### Remarks
The processor affinity of a thread is the set of processors it has a relationship to. In other words, those it can be scheduled to run on.

`ProcessThread.ProcessorAffinity` represents each processor as a bit. Bit 0 represents processor one, bit 1 represents processor two, and so on. The following table shows a subset of the possible `ProcessThread.ProcessorAffinity` for a four-processor system.

|Property value (in hexadecimal)|Valid processors|
|---------------------------------------|----------------------|
|0x0001|1|
|0x0002|2|
|0x0003|1 or 2|
|0x0004|3|
|0x0005|1 or 3|
|0x0007|1, 2, or 3|
|0x000F|1, 2, 3, or 4|

You can also specify the single, preferred processor for a thread by setting the `IdealProcessor` property. A process thread can migrate from processor to processor, with each migration reloading the processor cache. Specifying a processor for a thread can improve performance under heavy system loads by reducing the number of times the processor cache is reloaded.

#### Examples
The following example shows how to set the `ProcessorAffinity` property for an instance of Notepad to the first processor.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/ProcessThread/IdealProcessor/program.cs._

## ProcessThread.StartAddress property

```csharp
public IntPtr StartAddress { get; }
```

Gets the memory address of the function that the operating system called that started this thread.

Returns: The thread's starting address, which points to the application-defined function that the thread executes.

Exceptions:

- `NotSupportedException`: The process is on a remote computer.

#### Remarks
Each process starts with a single thread, which is known as the primary thread. Any thread can create additional threads.

A process has a virtual address space, executable code, data, object handles, environment variables, a base priority, and minimum and maximum working set sizes. All the threads of a process share its virtual address space and system resources. In addition, each thread maintains exception handlers, a scheduling priority, and a set of structures in which the system saves the thread context while the thread is waiting to be scheduled. The thread context includes the thread's set of machine registers, the kernel stack, a thread environment block, and a user stack in the address space of the thread's process.

Every Windows thread actually begins execution in a system-supplied function, not the application-supplied function. The starting address for the primary thread is, therefore, the same (as it represents the address of the system-supplied function) for every Windows process in the system. However, the `StartAddress` property allows you to get the starting function address that is specific to your application.

## ProcessThread.StartTime property

```csharp
public DateTime StartTime { get; }
```

Gets the time that the operating system started the thread.

Returns: A `DateTime` representing the time that was on the system when the operating system started the thread.

Exceptions:

- `Win32Exception`: The thread time could not be retrieved.
- `NotSupportedException`: The process is on a remote computer.

To be added.

## ProcessThread.ThreadState property

```csharp
public System.Diagnostics.ThreadState ThreadState { get; }
```

Gets the current state of this thread.

Returns: A `ThreadState` that indicates the thread's execution, for example, running, waiting, or terminated.

Exceptions:

- `NotSupportedException`: The process is on a remote computer.

#### Remarks
The `WaitReason` property value is valid only when the `ProcessThread.ThreadState` value is `Wait`. Therefore, check the `ProcessThread.ThreadState` value before you get the `WaitReason` property.
