---
title: "Process class (part 7 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Process.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Process class (part 7 of 15)

## Process.TotalProcessorTime property

```csharp
public TimeSpan TotalProcessorTime { get; }
```

Gets the amount of time the associated process has spent utilizing the CPU. This value is the sum of `Process.UserProcessorTime` and `Process.PrivilegedProcessorTime`.

Returns: A `TimeSpan` that indicates the amount of time that the associated process has spent utilizing the CPU. This value is the sum of the `Process.UserProcessorTime` and the `Process.PrivilegedProcessorTime`.

Exceptions:

- `InvalidOperationException`: No process is associated with this object. On Windows, there is no process handle available. On Unix, the process has exited.
- `Win32Exception`: The operating system could not retrieve process timing information.
- `NotSupportedException`: You are attempting to access the `Process.TotalProcessorTime` property for a process that is running on a remote computer. This property is available only for processes that are running on the local computer.

On Windows, if a handle to the process is available, the value can be retrieved after the process exits.
On Unix, the value is unavailable after the process exits.

#### Examples
The following example starts an instance of Notepad. The example then retrieves and displays various properties of the associated process. The example detects when the process exits, and displays the process's exit code.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/BasePriority/source.cs._

## Process.UserProcessorTime property

```csharp
public TimeSpan UserProcessorTime { get; }
```

Gets the amount of time the associated process has spent running code inside the application portion of the process (not the operating system core).

Returns: A `TimeSpan` that indicates the amount of time that the associated process has spent running code inside the application portion of the process (not inside the operating system core).

Exceptions:

- `InvalidOperationException`: No process is associated with this object. On Windows, there is no process handle available. On Unix, the process has exited.
- `Win32Exception`: The operating system could not retrieve process timing information.
- `NotSupportedException`: You are attempting to access the `Process.UserProcessorTime` property for a process that is running on a remote computer. This property is available only for processes that are running on the local computer.

On Windows, if a handle to the process is available, the value can be retrieved after the process exits.
On Unix, the value is unavailable after the process exits.

#### Examples
The following example starts an instance of Notepad. The example then retrieves and displays various properties of the associated process. The example detects when the process exits, and displays the process's exit code.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/BasePriority/source.cs._

## Process.VirtualMemorySize property

```csharp
public int VirtualMemorySize { get; }
```

Gets the size of the process's virtual memory, in bytes.

Returns: The amount of virtual memory, in bytes, that the associated process has requested.

To be added.

## Process.VirtualMemorySize64 property

```csharp
public long VirtualMemorySize64 { get; }
```

Gets the amount of the virtual memory, in bytes, allocated for the associated process.

Returns: The amount of virtual memory, in bytes, allocated for the associated process.

#### Remarks
The value returned by this property represents the most recently refreshed size of virtual memory used by the process, in bytes. To get the most up to date size, you need to call `Refresh` method first.

The operating system maps the virtual address space for each process either to pages loaded in physical memory, or to pages stored in the virtual memory paging file on disk.

This property can be used to monitor memory usage on computers with 32-bit processors or 64-bit processors. The property value is equivalent to the **Virtual Bytes** performance counter for the process.

#### Examples
The following code example starts an instance of the Notepad application. The example then retrieves and displays various properties of the associated process. The example detects when the process exits, and displays its exit code and peak memory statistics.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/BasePriority/source.cs._

## Process.WorkingSet property

```csharp
public int WorkingSet { get; }
```

Gets the associated process's physical memory usage, in bytes.

Returns: The total amount of physical memory the associated process is using, in bytes.

To be added.

## Process.WorkingSet64 property

```csharp
public long WorkingSet64 { get; }
```

Gets the amount of physical memory, in bytes, allocated for the associated process.

Returns: The amount of physical memory, in bytes, allocated for the associated process.

#### Remarks
The value returned by this property represents the most recently refreshed size of working set memory used by the process, in bytes. To get the most up to date size, you need to call `Refresh` method first.

The working set of a process is the set of memory pages currently visible to the process in physical RAM memory. These pages are resident and available for an application to use without triggering a page fault.

The working set includes both shared and private data. The shared data includes the pages that contain all the instructions that the process executes, including instructions in the process modules and the system libraries.

This property can be used to monitor memory usage on computers with 32-bit processors or 64-bit processors. The property value is equivalent to the **Working Set** performance counter for the process.

#### Examples
The following code example starts an instance of the Notepad application. The example then retrieves and displays various properties of the associated process. The example detects when the process exits, and displays its exit code and peak memory statistics.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/BasePriority/source.cs._

## Process.BeginErrorReadLine() method

```csharp
public void BeginErrorReadLine ();
```

Begins asynchronous read operations on the redirected `Process.StandardError` stream of the application.

Exceptions:

- `InvalidOperationException`: The `ProcessStartInfo.RedirectStandardError` property is `false`.

-or-

An asynchronous read operation is already in progress on the `Process.StandardError` stream.

-or-

The `Process.StandardError` stream has been used by a synchronous read operation.

#### Remarks
The `Process.StandardError` stream can be read synchronously or asynchronously. Methods such as `StreamReader.Read`, `StreamReader.ReadLine`, and `StreamReader.ReadToEnd` perform synchronous read operations on the error output stream of the process. These synchronous read operations do not complete until the associated `Process` writes to its `Process.StandardError` stream, or closes the stream.

In contrast, `Process.BeginErrorReadLine` starts asynchronous read operations on the `Process.StandardError` stream. This method enables the designated event handler for the stream output and immediately returns to the caller, which can perform other work while the stream output is directed to the event handler.

Follow these steps to perform asynchronous read operations on `Process.StandardError` for a `Process` :

1. Set `ProcessStartInfo.UseShellExecute` to `false`.

2. Set `ProcessStartInfo.RedirectStandardError` to `true`.

3. Add your event handler to the `ErrorDataReceived` event. The event handler must match the `DataReceivedEventHandler` delegate signature.

4. Start the `Process`.

5. Call `Process.BeginErrorReadLine` for the `Process`. This call starts asynchronous read operations on `Process.StandardError`.

When asynchronous read operations start, the event handler is called each time the associated `Process` writes a line of text to its `Process.StandardError` stream.

You can cancel an asynchronous read operation by calling `Process.CancelErrorRead`. The read operation can be canceled by the caller or by the event handler. After canceling, you can call `Process.BeginErrorReadLine` again to resume asynchronous read operations.

> **Note:**
> You cannot mix asynchronous and synchronous read operations on a redirected stream. Once the redirected stream of a `Process` is opened in either asynchronous or synchronous mode, all further read operations on that stream must be in the same mode. For example, do not follow `Process.BeginErrorReadLine` with a call to `StreamReader.ReadLine` on the `Process.StandardError` stream, or vice versa. However, you can read two different streams in different modes. For example, you can call `Process.BeginErrorReadLine` and then call `StreamReader.ReadLine` for the `Process.StandardOutput` stream.

#### Examples
The following example uses the `net view` command to list the available network resources on a remote computer. The user supplies the target computer name as a command-line argument. The user can also supply a file name for error output. The example collects the output of the net command, waits for the process to finish, and then writes the output results to the console. If the user supplies the optional error file, the example writes errors to the file.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DataReceivedEventArgs/Overview/net_async.cs._

## Process.BeginOutputReadLine() method

```csharp
public void BeginOutputReadLine ();
```

Begins asynchronous read operations on the redirected `Process.StandardOutput` stream of the application.

Exceptions:

- `InvalidOperationException`: The `ProcessStartInfo.RedirectStandardOutput` property is `false`.

-or-

An asynchronous read operation is already in progress on the `Process.StandardOutput` stream.

-or-

The `Process.StandardOutput` stream has been used by a synchronous read operation.

#### Remarks
The `Process.StandardOutput` stream can be read synchronously or asynchronously. Methods such as `StreamReader.Read`, `StreamReader.ReadLine`, and `StreamReader.ReadToEnd` perform synchronous read operations on the output stream of the process. These synchronous read operations do not complete until the associated `Process` writes to its `Process.StandardOutput` stream, or closes the stream.

In contrast, `Process.BeginOutputReadLine` starts asynchronous read operations on the `Process.StandardOutput` stream. This method enables a designated event handler for the stream output and immediately returns to the caller, which can perform other work while the stream output is directed to the event handler.

Follow these steps to perform asynchronous read operations on `Process.StandardOutput` for a `Process` :

1. Set `ProcessStartInfo.UseShellExecute` to `false`.

2. Set `ProcessStartInfo.RedirectStandardOutput` to `true`.

3. Add your event handler to the `OutputDataReceived` event. The event handler must match the `DataReceivedEventHandler` delegate signature.

4. Start the `Process`.

5. Call `Process.BeginOutputReadLine` for the `Process`. This call starts asynchronous read operations on `Process.StandardOutput`.

When asynchronous read operations start, the event handler is called each time the associated `Process` writes a line of text to its `Process.StandardOutput` stream.

You can cancel an asynchronous read operation by calling `Process.CancelOutputRead`. The read operation can be canceled by the caller or by the event handler. After canceling, you can call `Process.BeginOutputReadLine` again to resume asynchronous read operations.

> **Note:**
> You cannot mix asynchronous and synchronous read operations on a redirected stream. Once the redirected stream of a `Process` is opened in either asynchronous or synchronous mode, all further read operations on that stream must be in the same mode. For example, do not follow `Process.BeginOutputReadLine` with a call to `StreamReader.ReadLine` on the `Process.StandardOutput` stream, or vice versa. However, you can read two different streams in different modes. For example, you can call `Process.BeginOutputReadLine` and then call `StreamReader.ReadLine` for the `Process.StandardError` stream.

#### Examples
The following example illustrates how to perform asynchronous read operations on the redirected `Process.StandardOutput` stream of the `sort` command. The `sort` command is a console application that reads and sorts text input.

The example creates an event delegate for the `SortOutputHandler` event handler and associates it with the `OutputDataReceived` event. The event handler receives text lines from the redirected `Process.StandardOutput` stream, formats the text, and writes the text to the screen.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DataReceivedEventArgs/Overview/sort_async.cs._
