---
title: "Process class (part 4 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Process.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Process class (part 4 of 15)

## Process.PeakPagedMemorySize64 property

```csharp
public long PeakPagedMemorySize64 { get; }
```

Gets the maximum amount of memory in the virtual memory paging file, in bytes, used by the associated process.

Returns: The maximum amount of memory, in bytes, allocated in the virtual memory paging file for the associated process since it was started.

#### Remarks
The value returned by this property value represents the maximum size of memory in the virtual memory paging file used by the process since it started, in bytes. The operating system uses the virtual memory paging file in conjunction with physical memory to manage the virtual address space for each process. When pageable memory is not in use, it can be transferred to the virtual memory paging file on disk.

This property can be used to monitor memory usage on computers with 32-bit processors or 64-bit processors. The property value is equivalent to the **Page File Bytes Peak** performance counter for the process.

#### Examples
The following code example starts an instance of the Notepad application. The example then retrieves and displays various properties of the associated process. The example detects when the process exits, and displays its exit code and peak memory statistics.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/BasePriority/source.cs._

## Process.PeakVirtualMemorySize property

```csharp
public int PeakVirtualMemorySize { get; }
```

Gets the maximum amount of virtual memory, in bytes, used by the associated process.

Returns: The maximum amount of virtual memory, in bytes, that the associated process has requested.

To be added.

## Process.PeakVirtualMemorySize64 property

```csharp
public long PeakVirtualMemorySize64 { get; }
```

Gets the maximum amount of virtual memory, in bytes, used by the associated process.

Returns: The maximum amount of virtual memory, in bytes, allocated for the associated process since it was started.

#### Remarks
The value returned by this property represents the maximum size of virtual memory used by the process since it started, in bytes. The operating system maps the virtual address space for each process either to pages loaded in physical memory, or to pages stored in the virtual memory paging file on disk.

This property can be used to monitor memory usage on computers with 32-bit processors or 64-bit processors. The property value is equivalent to the **Virtual Bytes Peak** performance counter for the process.

#### Examples
The following code example starts an instance of the Notepad application. The example then retrieves and displays various properties of the associated process. The example detects when the process exits, and displays its exit code and peak memory statistics.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/BasePriority/source.cs._

## Process.PeakWorkingSet property

```csharp
public int PeakWorkingSet { get; }
```

Gets the peak working set size for the associated process, in bytes.

Returns: The maximum amount of physical memory that the associated process has required all at once, in bytes.

To be added.

## Process.PeakWorkingSet64 property

```csharp
public long PeakWorkingSet64 { get; }
```

Gets the maximum amount of physical memory, in bytes, used by the associated process.

Returns: The maximum amount of physical memory, in bytes, allocated for the associated process since it was started.

#### Remarks
The value returned by this property represents the maximum size of working set memory used by the process since it started, in bytes. The working set of a process is the set of memory pages currently visible to the process in physical RAM memory. These pages are resident and available for an application to use without triggering a page fault.

The working set includes both shared and private data. The shared data includes the pages that contain all the instructions that the process executes, including instructions from the process modules and the system libraries.

This property can be used to monitor memory usage on computers with 32-bit processors or 64-bit processors. The property value is equivalent to the **Working Set Peak** performance counter for the process.

#### Examples
The following code example starts an instance of the Notepad application. The example then retrieves and displays various properties of the associated process. The example detects when the process exits, and displays its exit code and peak memory statistics.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/BasePriority/source.cs._

## Process.PriorityBoostEnabled property

```csharp
public bool PriorityBoostEnabled { get; set; }
```

Gets or sets a value indicating whether the associated process priority should temporarily be boosted by the operating system when the main window has the focus.

Returns: `true` if dynamic boosting of the process priority should take place for a process when it is taken out of the wait state; otherwise, `false`. The default is `false`.

Exceptions:

- `Win32Exception`: Priority boost information could not be retrieved from the associated process resource.
- `PlatformNotSupportedException`: The process identifier or process handle is zero. (The process has not been started.)
- `NotSupportedException`: You are attempting to access the `Process.PriorityBoostEnabled` property for a process that is running on a remote computer. This property is available only for processes that are running on the local computer.
- `InvalidOperationException`: The process `Process.Id` is not available.

#### Remarks
The value returned by this property represents the most recently refreshed temporary priority boost. To get the most up to date value, you need to call `Refresh` method first.

When a thread runs in a process for which the priority class has one of the dynamic priority enumeration values (`Normal`, `High`, or `RealTime`), the system temporarily boosts the thread's priority when it is taken out of a wait state. This action prevents other processes from interrupting the processing of the current thread. The `Process.PriorityBoostEnabled` setting affects all the existing threads and any threads subsequently created by the process. To restore normal behavior, set the `PriorityBoostEnabled` property to `false`.

> **Note:**
> Boosting the priority too high can drain resources from essential operating system and network functions, causing problems with other operating system tasks.

## Process.PriorityClass property

```csharp
public System.Diagnostics.ProcessPriorityClass PriorityClass { get; set; }
```

Gets or sets the overall priority category for the associated process.

Returns: The priority category for the associated process, from which the `Process.BasePriority` of the process is calculated.

Exceptions:

- `Win32Exception`: Process priority information could not be set or retrieved from the associated process resource.

-or-

The process identifier or process handle is zero. (The process has not been started.)
- `NotSupportedException`: You are attempting to access the `Process.PriorityClass` property for a process that is running on a remote computer. This property is available only for processes that are running on the local computer.
- `InvalidOperationException`: The process `Process.Id` is not available.
- `InvalidEnumArgumentException`: Priority class cannot be set because it does not use a valid value, as defined in the `ProcessPriorityClass` enumeration.

#### Remarks
The value returned by this property represents the most recently refreshed priority of the process. To get the most up to date priority, you need to call `Refresh` method first.

A process priority class encompasses a range of thread priority levels. Threads with different priorities that are running in the process run relative to the priority class of the process. Win32 uses four priority classes with seven base priority levels per class. These process priority classes are captured in the `ProcessPriorityClass` enumeration, which lets you set the process priority to `Idle`, `Normal`, `High`, `AboveNormal`, `BelowNormal`, or `RealTime`. Based on the time elapsed or other boosts, the base priority level can be changed by the operating system when a process needs to be put ahead of others for access to the processor. In addition, you can set the `Process.PriorityBoostEnabled` to temporarily boost the priority level of threads that have been taken out of the wait state. The priority is reset when the process returns to the wait state.

The `BasePriority` property lets you view the starting priority that is assigned to a process. However, because it is read-only, you cannot use the `BasePriority` property to set the priority of a process. To change the priority, use the `PriorityClass` property, which gets or sets the overall priority category for the process.

The priority class cannot be viewed using System Monitor. The following table shows the relationship between the `Process.BasePriority` and `Process.PriorityClass` values.

|BasePriority|PriorityClass|
|------------------|-------------------|
|4|`Idle`|
|8|`Normal`|
|13|`High`|
|24|`RealTime`|

#### Examples
The following example starts an instance of Notepad. The example then retrieves and displays various properties of the associated process. The example detects when the process exits, and displays the process's exit code.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/BasePriority/source.cs._

## Process.PrivateMemorySize property

```csharp
public int PrivateMemorySize { get; }
```

Gets the amount of private memory, in bytes, allocated for the associated process.

Returns: The number of bytes allocated by the associated process that cannot be shared with other processes.

To be added.

## Process.PrivateMemorySize64 property

```csharp
public long PrivateMemorySize64 { get; }
```

Gets the amount of private memory, in bytes, allocated for the associated process.

Returns: The amount of memory, in bytes, allocated for the associated process that cannot be shared with other processes.

#### Remarks
The value returned by this property represents the most recently refreshed size of memory used by the process, in bytes, that cannot be shared with other processes. To get the most up to date size, you need to call `Refresh` method first.

This property can be used to monitor memory usage on computers with 32-bit processors or 64-bit processors. The property value is equivalent to the **Private Bytes** performance counter for the process.

#### Examples
The following code example starts an instance of the Notepad application. The example then retrieves and displays various properties of the associated process. The example detects when the process exits, and displays its exit code and peak memory statistics.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/BasePriority/source.cs._

## Process.PrivilegedProcessorTime property

```csharp
public TimeSpan PrivilegedProcessorTime { get; }
```

Gets the amount of time the process has spent running code inside the operating system core.

Returns: A `TimeSpan` that indicates the amount of time that the process has spent running code inside the operating system core.

Exceptions:

- `InvalidOperationException`: No process is associated with this object. On Windows, there is no process handle available. On Unix, the process has exited.
- `Win32Exception`: The operating system could not retrieve process timing information.
- `NotSupportedException`: You are attempting to access the `Process.PrivilegedProcessorTime` property for a process that is running on a remote computer. This property is available only for processes that are running on the local computer.

On Windows, if a handle to the process is available, the value can be retrieved after the process exits.
On Unix, the value is unavailable after the process exits.

#### Examples
The following example starts an instance of Notepad. The example then retrieves and displays various properties of the associated process. The example detects when the process exits, and displays the process's exit code.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/BasePriority/source.cs._

## Process.ProcessName property

```csharp
public string ProcessName { get; }
```

Gets the name of the process.

Returns: The name that the system uses to identify the process to the user.

Exceptions:

- `InvalidOperationException`: The process does not have an identifier, or no process is associated with the `Process`.

-or-

The associated process has exited.
- `NotSupportedException`: The process is not on this computer.

#### Remarks
The `ProcessName` property holds an executable file name, such as Outlook, that does not include the .exe extension or the path. It is helpful for getting and manipulating all the processes that are associated with the same executable file.

You can call `Process.GetProcessesByName`, passing it an executable file name, to retrieve an array that contains every running instance on the specified computer. You can use this array, for example, to shut down all the running instances of the executable file.
