---
title: "Process class (part 3 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Process.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Process class (part 3 of 15)

## Process.MainWindowTitle property

```csharp
public string MainWindowTitle { get; }
```

Gets the caption of the main window of the process.

Returns: The main window title of the process.

Exceptions:

- `InvalidOperationException`: The `Process.MainWindowTitle` property is not defined because the process has exited.
- `NotSupportedException`: You are trying to access the `Process.MainWindowTitle` property for a process that is running on a remote computer. This property is available only for processes that are running on the local computer.

#### Remarks
A process has a main window associated with it only if the process has a graphical interface. If the associated process does not have a main window (so that `Process.MainWindowHandle` is zero), or if the system can't determine that there's a main window (such as may be the case on some Unix platforms), `Process.MainWindowTitle` is an empty string ("").

If you have just started a process and want to use its main window title, consider using the `Process.WaitForInputIdle` method to allow the process to finish starting, ensuring that the main window handle has been created. Otherwise, the system throws an exception.

> **Note:**
> The main window is the window that currently has the focus; note that this might not be the primary window for the process. You must use the `Process.Refresh` method to refresh the `Process` object to get the most up to date main window handle if it has changed.

#### Examples
The following example starts an instance of Notepad and retrieves the caption of the main window of the process.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/MainWindowTitle/process_mainwindowtitle.cs._

## Process.MaxWorkingSet property

```csharp
public IntPtr MaxWorkingSet { get; set; }
```

Gets or sets the maximum allowable working set size, in bytes, for the associated process.

Returns: The maximum working set size that is allowed in memory for the process, in bytes.

Exceptions:

- `ArgumentException`: The maximum working set size is invalid. It must be greater than or equal to the minimum working set size.
- `Win32Exception`: Working set information cannot be retrieved from the associated process resource.

-or-

The process identifier or process handle is zero because the process has not been started.
- `NotSupportedException`: You are trying to access the `Process.MaxWorkingSet` property for a process that is running on a remote computer. This property is available only for processes that are running on the local computer.
- `InvalidOperationException`: The process `Process.Id` is not available.

-or-

The process has exited.
- `PlatformNotSupportedException`: On Linux, when the property is set.

#### Remarks
The working set of a process is the set of memory pages currently visible to the process in physical RAM memory. These pages are resident and available for an application to use without triggering a page fault.

The working set includes both shared and private data. The shared data includes the pages that contain all the instructions that your application executes, including the pages in your .dll files and the system.dll files. As the working set size increases, memory demand increases.

A process has minimum and maximum working set sizes. Each time a process resource is created, the system reserves an amount of memory equal to the minimum working set size for the process. The virtual memory manager attempts to keep at least the minimum amount of memory resident when the process is active, but it never keeps more than the maximum size.

The system sets the default working set sizes. You can modify these sizes using the `Process.MaxWorkingSet` and `Process.MinWorkingSet` members. However, setting these values does not guarantee that the memory will be reserved or resident.

> **Note:**
> When you increase the working set size of a process, you take physical memory away from the rest of the system. Ensure that you do not request a minimum or maximum working set size that is too large, because doing so can degrade system performance.

## Process.MinWorkingSet property

```csharp
public IntPtr MinWorkingSet { get; set; }
```

Gets or sets the minimum allowable working set size, in bytes, for the associated process.

Returns: The minimum working set size that is required in memory for the process, in bytes.

Exceptions:

- `ArgumentException`: The minimum working set size is invalid. It must be less than or equal to the maximum working set size.
- `Win32Exception`: Working set information cannot be retrieved from the associated process resource.

-or-

The process identifier or process handle is zero because the process has not been started.
- `NotSupportedException`: You are trying to access the `Process.MinWorkingSet` property for a process that is running on a remote computer. This property is available only for processes that are running on the local computer.
- `InvalidOperationException`: The process `Process.Id` is not available.

-or-

The process has exited.
- `PlatformNotSupportedException`: On Linux, when the property is set.

#### Remarks
The working set of a process is the set of memory pages currently visible to the process in physical RAM memory. These pages are resident and available for an application to use without triggering a page fault.

The working set includes both shared and private data. The shared data includes the pages that contain all the instructions that your application executes, including the pages in your .dll files and the system.dll files. As the working set size increases, memory demand increases.

A process has minimum and maximum working set sizes. Each time a process resource is created, the system reserves an amount of memory equal to the minimum working set size for the process. The virtual memory manager attempts to keep at least the minimum amount of memory resident when the process is active, but it never keeps more than the maximum size.

The system sets the default working set sizes. You can modify these sizes using the `Process.MaxWorkingSet` and `Process.MinWorkingSet` members. However, setting these values does not guarantee that the memory will be reserved or resident.

> **Note:**
> When you increase the working set size of a process, you take physical memory away from the rest of the system. Ensure that you do not request a minimum or maximum working set size that is too large, because doing so can degrade system performance.

## Process.Modules property

```csharp
public System.Diagnostics.ProcessModuleCollection Modules { get; }
```

Gets the modules that have been loaded by the associated process.

Returns: An array of type `ProcessModule` that represents the modules that have been loaded by the associated process.

Exceptions:

- `NotSupportedException`: You are attempting to access the `Process.Modules` property for a process that is running on a remote computer. This property is available only for processes that are running on the local computer.
- `InvalidOperationException`: The process `Process.Id` is not available.
- `Win32Exception`: You are attempting to access the `Process.Modules` property for either the system process or the idle process. These processes do not have modules.

#### Remarks
The value returned by this property represents the most recently refreshed modules. To get the most up to date information, you need to call `Refresh` method first.

A process module represents a.dll or .exe file that is loaded into a particular process. A `ProcessModule` instance lets you view information about a module, including the module name, file name, and module memory details.

A process can load multiple modules into memory. For example,.exe files that load additional .dll files have multiple modules.

After starting the process, this collection is empty until the system has loaded the process. If the process has a main window, you can call `Process.WaitForInputIdle` before retrieving this property to ensure that the collection is nonempty when you get the list.

## Process.NonpagedSystemMemorySize property

```csharp
public int NonpagedSystemMemorySize { get; }
```

Gets the amount of nonpaged system memory, in bytes, allocated for the associated process.

Returns: The amount of memory, in bytes, the system has allocated for the associated process that cannot be written to the virtual memory paging file.

To be added.

## Process.NonpagedSystemMemorySize64 property

```csharp
public long NonpagedSystemMemorySize64 { get; }
```

Gets the amount of nonpaged system memory, in bytes, allocated for the associated process.

Returns: The amount of system memory, in bytes, allocated for the associated process that cannot be written to the virtual memory paging file.

#### Remarks
The value returned by this property represents the most recently refreshed size of nonpaged system memory used by the process, in bytes. To get the most up to date size, you need to call `Refresh` method first.

System memory is the physical memory used by the operating system, and is divided into paged and nonpaged pools. Nonpaged memory allocations remain in system memory and are not paged out to the virtual memory paging file.

This property can be used to monitor memory usage on computers with 32-bit processors or 64-bit processors. The property value is equivalent to the **Pool Nonpaged Bytes** performance counter for the process.

#### Examples
The following code example starts an instance of the Notepad application. The example then retrieves and displays various properties of the associated process. The example detects when the process exits, and displays its exit code and peak memory statistics.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/BasePriority/source.cs._

## Process.PagedMemorySize property

```csharp
public int PagedMemorySize { get; }
```

Gets the amount of paged memory, in bytes, allocated for the associated process.

Returns: The amount of memory, in bytes, allocated by the associated process that can be written to the virtual memory paging file.

To be added.

## Process.PagedMemorySize64 property

```csharp
public long PagedMemorySize64 { get; }
```

Gets the amount of paged memory, in bytes, allocated for the associated process.

Returns: The amount of memory, in bytes, allocated in the virtual memory paging file for the associated process.

#### Remarks
The value returned by this property represents the most recently refreshed size of memory in the virtual memory paging file used by the process, in bytes. To get the most up to date size, you need to call `Refresh` method first.

The operating system uses the virtual memory paging file in conjunction with physical memory to manage the virtual address space for each process. When pageable memory is not in use, it can be transferred to the virtual memory paging file on disk. To obtain the size of memory used by the operating system for the process, use the `PagedSystemMemorySize64` property.

This property can be used to monitor memory usage on computers with 32-bit processors or 64-bit processors. The property value is equivalent to the **Page File Bytes** performance counter for the process.

#### Examples
The following code example starts an instance of the Notepad application, and then retrieves and displays various properties of the associated process. The example detects when the process exits, and displays its exit code and peak memory statistics.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/BasePriority/source.cs._

## Process.PagedSystemMemorySize property

```csharp
public int PagedSystemMemorySize { get; }
```

Gets the amount of pageable system memory, in bytes, allocated for the associated process.

Returns: The amount of memory, in bytes, the system has allocated for the associated process that can be written to the virtual memory paging file.

To be added.

## Process.PagedSystemMemorySize64 property

```csharp
public long PagedSystemMemorySize64 { get; }
```

Gets the amount of pageable system memory, in bytes, allocated for the associated process.

Returns: The amount of system memory, in bytes, allocated for the associated process that can be written to the virtual memory paging file.

#### Remarks
The value returned by this property value represents the current size of pageable system memory used by the process, in bytes. System memory is the physical memory used by the operating system, and is divided into paged and nonpaged pools. When pageable memory is not in use, it can be transferred to the virtual memory paging file on disk. To obtain the size of the application memory used by the process, use the `PagedMemorySize64` property.

This property can be used to monitor memory usage on computers with 32-bit processors or 64-bit processors. The property value is equivalent to the **Pool Paged Bytes** performance counter for the process.

#### Examples
The following code example starts an instance of the Notepad application. The example then retrieves and displays various properties of the associated process. The example detects when the process exits, and displays its exit code and peak memory statistics.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/BasePriority/source.cs._

## Process.PeakPagedMemorySize property

```csharp
public int PeakPagedMemorySize { get; }
```

Gets the maximum amount of memory in the virtual memory paging file, in bytes, used by the associated process.

Returns: The maximum amount of memory, in bytes, allocated by the associated process that could be written to the virtual memory paging file.

To be added.
