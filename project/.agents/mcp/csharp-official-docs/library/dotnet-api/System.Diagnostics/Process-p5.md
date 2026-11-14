---
title: "Process class (part 5 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Process.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Process class (part 5 of 15)

## Process.ProcessorAffinity property

```csharp
public IntPtr ProcessorAffinity { get; set; }
```

Gets or sets the processors on which the threads in this process can be scheduled to run.

Returns: A bitmask representing the processors that the threads in the associated process can run on. The default depends on the number of processors on the computer. The default value is 2 n -1, where n is the number of processors.

Exceptions:

- `Win32Exception`: `Process.ProcessorAffinity` information could not be set or retrieved from the associated process resource.

-or-

The process identifier or process handle is zero. (The process has not been started.)
- `NotSupportedException`: You are attempting to access the `Process.ProcessorAffinity` property for a process that is running on a remote computer. This property is available only for processes that are running on the local computer.
- `InvalidOperationException`: The process `Process.Id` was not available.

-or-

The process has exited.
- `PlatformNotSupportedException`: On macOS: In all cases.

#### Remarks
The value returned by this property represents the most recently refreshed affinity of the process. To get the most up to date affinity, you need to call `Refresh` method first.

A thread in a process can migrate from processor to processor, with each migration reloading the processor cache. Under heavy system loads, specifying which processor should run a specific thread can improve performance by reducing the number of times the processor cache is reloaded. The association between a processor and a thread is called the processor affinity.

Each processor is represented as a bit. Bit 0 is processor one, bit 1 is processor two, and so forth. If you set a bit to the value 1, the corresponding processor is selected for thread assignment. When you set the `Process.ProcessorAffinity` value to zero, the operating system's scheduling algorithms set the thread's affinity. When the `Process.ProcessorAffinity` value is set to any nonzero value, the value is interpreted as a bitmask that specifies those processors eligible for selection.

The following table shows a selection of `Process.ProcessorAffinity` values for an eight-processor system.

| Bitmask | Binary value      | Eligible processors    |
|---------|-------------------|------------------------|
| 0x0001  | 00000000 00000001 | 1                      |
| 0x0003  | 00000000 00000011 | 1 and 2                |
| 0x0007  | 00000000 00000111 | 1, 2 and 3             |
| 0x0009  | 00000000 00001001 | 1 and 4                |
| 0x007F  | 00000000 01111111 | 1, 2, 3, 4, 5, 6 and 7 |

## Process.Responding property

```csharp
public bool Responding { get; }
```

Gets a value indicating whether the user interface of the process is responding.

Returns: `true` if the user interface of the associated process is responding to the system; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: There is no process associated with this `Process` object.
- `NotSupportedException`: You are attempting to access the `Process.Responding` property for a process that is running on a remote computer. This property is available only for processes that are running on the local computer.

#### Remarks
The value returned by this property represents the most recently refreshed status. To get the most up to date status, you need to call `Refresh` method first.

If a process has a user interface, the `Responding` property contacts the user interface to determine whether the process is responding to user input. If the interface does not respond immediately, the `Responding` property returns `false`. Use this property to determine whether the interface of the associated process has stopped responding.

If the process does not have a `Process.MainWindowHandle`, this property returns `true`.

#### Examples
The following example starts an instance of Notepad. The example then retrieves and displays various properties of the associated process. The example detects when the process exits, and displays the process's exit code.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/BasePriority/source.cs._

## Process.SafeHandle property

```csharp
public Microsoft.Win32.SafeHandles.SafeProcessHandle SafeHandle { get; }
```

Gets the native handle to this process.

Returns: The native handle to this process.

#### Remarks
The handle is only available if the calling component started the process.

## Process.SessionId property

```csharp
public int SessionId { get; }
```

Gets the Terminal Services session identifier for the associated process.

Returns: The Terminal Services session identifier for the associated process.

Exceptions:

- `NullReferenceException`: There is no session associated with this process.
- `InvalidOperationException`: There is no process associated with this session identifier.

-or-

The associated process is not on this machine.

#### Remarks
The `SessionId` property identifies the session in which the application is currently running.

## Process.StandardError property

```csharp
public System.IO.StreamReader StandardError { get; }
```

Gets a stream used to read the error output of the application.

Returns: A `StreamReader` that can be used to read the standard error stream of the application.

Exceptions:

- `InvalidOperationException`: The `Process.StandardError` stream has not been defined for redirection; ensure `ProcessStartInfo.RedirectStandardError` is set to `true` and `ProcessStartInfo.UseShellExecute` is set to `false`.

-or-

The `Process.StandardError` stream has been opened for asynchronous read operations with `Process.BeginErrorReadLine`.

#### Remarks
When a `Process` writes text to its standard error stream, that text is normally displayed on the console. By redirecting the `Process.StandardError` stream, you can manipulate or suppress the error output of a process. For example, you can filter the text, format it differently, or write the output to both the console and a designated log file.

> **Note:**
> To use `Process.StandardError`, you must set `ProcessStartInfo.UseShellExecute` to `false`, and you must set `ProcessStartInfo.RedirectStandardError` to `true`. Otherwise, reading from the `Process.StandardError` stream throws an exception.

The redirected `Process.StandardError` stream can be read synchronously or asynchronously. Methods such as `StreamReader.Read`, `StreamReader.ReadLine`, and `StreamReader.ReadToEnd` perform synchronous read operations on the error output stream of the process. These synchronous read operations do not complete until the associated `Process` writes to its `Process.StandardError` stream, or closes the stream.

In contrast, `Process.BeginErrorReadLine` starts asynchronous read operations on the `Process.StandardError` stream. This method enables a designated event handler for the stream output and immediately returns to the caller, which can perform other work while the stream output is directed to the event handler.

Synchronous read operations introduce a dependency between the caller reading from the `Process.StandardError` stream and the child process writing to that stream. These dependencies can result in deadlock conditions. When the caller reads from the redirected stream of a child process, it is dependent on the child. The caller waits on the read operation until the child writes to the stream or closes the stream. When the child process writes enough data to fill its redirected stream, it is dependent on the parent. The child process waits on the next write operation until the parent reads from the full stream or closes the stream. The deadlock condition results when the caller and child process wait on each other to complete an operation, and neither can proceed. You can avoid deadlocks by evaluating dependencies between the caller and child process.

The last two examples in this section use the `Process.Start` method to launch an executable named *Write500Lines.exe*. The following example contains its source code.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Write500Lines/write500lines.cs._

The following example shows how to read from a redirected error stream and wait for the child process to exit. It avoids a deadlock condition by calling `p.StandardError.ReadToEnd` before `p.WaitForExit`. A deadlock condition can result if the parent process calls `p.WaitForExit` before `p.StandardError.ReadToEnd` and the child process writes enough text to fill the redirected stream. The parent process would wait indefinitely for the child process to exit. The child process would wait indefinitely for the parent to read from the full `Process.StandardError` stream.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/StandardError/stderror-sync.cs._

There is a similar issue when you read all text from both the standard output and standard error streams. The following example performs a read operation on both streams. It avoids the deadlock condition by performing asynchronous read operations on the `Process.StandardError` stream. A deadlock condition results if the parent process calls `p.StandardOutput.ReadToEnd` followed by `p.StandardError.ReadToEnd` and the child process writes enough text to fill its error stream. The parent process would wait indefinitely for the child process to close its `Process.StandardOutput` stream. The child process would wait indefinitely for the parent to read from the full `Process.StandardError` stream.
_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/StandardOutput/stdoutput-async.cs._

You can use asynchronous read operations to avoid these dependencies and their deadlock potential. Alternately, you can avoid the deadlock condition by creating two threads and reading the output of each stream on a separate thread.

> **Note:**
> You cannot mix asynchronous and synchronous read operations on a redirected stream. Once the redirected stream of a `Process` is opened in either asynchronous or synchronous mode, all further read operations on that stream must be in the same mode. For example, do not follow `Process.BeginErrorReadLine` with a call to `StreamReader.ReadLine` on the `Process.StandardError` stream, or vice versa. However, you can read two different streams in different modes. For example, you can call `Process.BeginOutputReadLine` and then call `StreamReader.ReadLine` for the `Process.StandardError` stream.

#### Examples
The following example uses the `net use` command together with a user supplied argument to map a network resource. It then reads the standard error stream of the net command and writes it to console.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/StandardError/source.cs._

## Process.StandardInput property

```csharp
public System.IO.StreamWriter StandardInput { get; }
```

Gets a stream used to write the input of the application.

Returns: A `StreamWriter` that can be used to write the standard input stream of the application.

Exceptions:

- `InvalidOperationException`: The `Process.StandardInput` stream has not been defined because `ProcessStartInfo.RedirectStandardInput` is set to `false`.

#### Remarks
A `Process` can read input text from its standard input stream, typically the keyboard. By redirecting the `Process.StandardInput` stream, you can programmatically specify the input. For example, instead of using keyboard input, you can provide text from the contents of a designated file or output from another application.

> **Note:**
> To use `Process.StandardInput`, you must set `ProcessStartInfo.UseShellExecute` to `false`, and you must set `ProcessStartInfo.RedirectStandardInput` to `true`. Otherwise, writing to the `Process.StandardInput` stream throws an exception.

#### Examples
The following example illustrates how to redirect the `Process.StandardInput` stream of a process. The example starts the `sort` command with redirected input. It then prompts the user for text, and passes that to the `sort` process by means of the redirected `Process.StandardInput` stream. The `sort` results are displayed to the user on the console.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/StandardInput/process_standardinput.cs._
