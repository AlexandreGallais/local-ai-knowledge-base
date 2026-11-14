---
title: "Process class (part 8 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Process.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Process class (part 8 of 15)

## Process.CancelErrorRead() method

```csharp
public void CancelErrorRead ();
```

Cancels the asynchronous read operation on the redirected `Process.StandardError` stream of an application.

Exceptions:

- `InvalidOperationException`: The `Process.StandardError` stream is not enabled for asynchronous read operations.

#### Remarks
`Process.BeginErrorReadLine` starts an asynchronous read operation on the `Process.StandardError` stream. `Process.CancelErrorRead` ends the asynchronous read operation.

After canceling, you can resume the asynchronous read operation by calling `Process.BeginErrorReadLine` again.

When you call `Process.CancelErrorRead`, all in-progress read operations for `Process.StandardError` are completed and then the event handler is disabled. All further redirected output to `Process.StandardError` will be lost. If you re-enable the event handler with a call to `Process.BeginErrorReadLine`, asynchronous read operations resume. If you want to change the event handler before resuming asynchronous read operations, you must remove the existing event handler before adding the new event handler:

```csharp
// At this point the DataReceivedEventHandler(ErrorHandler1)
// has executed a CancelErrorRead.

// Remove the prior event handler.
process.ErrorDataReceived -=
    new DataReceivedEventHandler(ErrorHandler1);

// Register a new event handler.
process.ErrorDataReceived +=
    new DataReceivedEventHandler(ErrorHandler2);

// Call the corresponding BeginErrorReadLine.
process.BeginErrorReadLine();
```

> **Note:**
> You cannot mix asynchronous and synchronous read operations on the redirected `Process.StandardError` stream. Once the redirected stream of a `Process` is opened in either asynchronous or synchronous mode, all further read operations on that stream must be in the same mode. If you cancel an asynchronous read operation on `Process.StandardError` and then need to read from the stream again, you must use `Process.BeginErrorReadLine` to resume asynchronous read operations. Do not follow `Process.CancelErrorRead` with a call to the synchronous read methods of `Process.StandardError` such as `StreamReader.Read`, `StreamReader.ReadLine`, or `StreamReader.ReadToEnd`.

#### Examples
The following example starts the `nmake` command with user supplied arguments. The error and output streams are read asynchronously; the collected text lines are displayed to the console as well as written to a log file. If the command output exceeds a specified number of lines, the asynchronous read operations are canceled.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DataReceivedEventArgs/Overview/nmake_async.cs._

## Process.CancelOutputRead() method

```csharp
public void CancelOutputRead ();
```

Cancels the asynchronous read operation on the redirected `Process.StandardOutput` stream of an application.

Exceptions:

- `InvalidOperationException`: The `Process.StandardOutput` stream is not enabled for asynchronous read operations.

#### Remarks
`Process.BeginOutputReadLine` starts an asynchronous read operation on the `Process.StandardOutput` stream. `Process.CancelOutputRead` ends the asynchronous read operation.

After canceling, you can resume asynchronous read operations by calling `Process.BeginOutputReadLine` again.

When you call `Process.CancelOutputRead`, all in-progress read operations for `Process.StandardOutput` are completed and then the event handler is disabled. All further redirected output to `Process.StandardOutput` is saved in a buffer. If you re-enable the event handler with a call to `Process.BeginOutputReadLine`, the saved output is sent to the event handler and asynchronous read operations resume. If you want to change the event handler before resuming asynchronous read operations, you must remove the existing event handler before adding the new event handler:

```csharp
// At this point the DataReceivedEventHandler(OutputHandler1)
// has executed a CancelOutputRead.

// Remove the prior event handler.
process.OutputDataReceived -=
    new DataReceivedEventHandler(OutputHandler1);

// Register a new event handler.
process.OutputDataReceived +=
    new DataReceivedEventHandler(OutputHandler2);

// Call the corresponding BeginOutputReadLine.
process.BeginOutputReadLine();
```

> **Note:**
> You cannot mix asynchronous and synchronous read operations on the redirected `Process.StandardOutput` stream. Once the redirected stream of a `Process` is opened in either asynchronous or synchronous mode, all further read operations on that stream must be in the same mode. If you cancel an asynchronous read operation on `Process.StandardOutput` and then need to read from the stream again, you must use `Process.BeginOutputReadLine` to resume asynchronous read operations. Do not follow `Process.CancelOutputRead` with a call to the synchronous read methods of `Process.StandardOutput` such as `StreamReader.Read`, `StreamReader.ReadLine`, or `StreamReader.ReadToEnd`.

#### Examples
The following example starts the `nmake` command with user supplied arguments. The error and output streams are read asynchronously; the collected text lines are displayed to the console as well as written to a log file. If the command output exceeds a specified number of lines, the asynchronous read operations are canceled.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DataReceivedEventArgs/Overview/nmake_async.cs._

## Process.Close() method

```csharp
public void Close ();
```

Frees all the resources that are associated with this component.

#### Remarks
The `Process.Close` method causes the process to stop waiting for exit if it was waiting, closes the process handle, and clears process-specific properties. `Process.Close` does not close the standard output, input, and error readers and writers in case they are being referenced externally.

> **Note:**
> The `Process.Dispose` method calls `Process.Close`. Placing the `Process` object in a `using` block disposes of resources without the need to call `Process.Close`.

#### Examples
The following example starts an instance of Notepad. It then retrieves the physical memory usage of the associated process at 2-second intervals for a maximum of 10 seconds. The example detects whether the process exits before 10 seconds have elapsed. The example closes the process if it is still running after 10 seconds.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Close/process_refresh.cs._

## Process.CloseMainWindow() method

```csharp
public bool CloseMainWindow ();
```

Closes a process that has a user interface by sending a close message to its main window.

Returns: `true` if the close message was successfully sent; `false` if the associated process does not have a main window or if the main window is disabled (for example if a modal dialog is being shown).

Exceptions:

- `InvalidOperationException`: The process has already exited.

-or-

No process is associated with this `Process` object.

#### Remarks
When a process is executing, its message loop is in a wait state. The message loop executes every time a Windows message is sent to the process by the operating system. Calling `Process.CloseMainWindow` sends a request to close the main window, which, in a well-formed application, closes child windows and revokes all running message loops for the application. The request to exit the process by calling `Process.CloseMainWindow` does not force the application to quit. The application can ask for user verification before quitting, or it can refuse to quit. To force the application to quit, use the `Process.Kill` method. The behavior of `Process.CloseMainWindow` is identical to that of a user closing an application's main window using the system menu. Therefore, the request to exit the process by closing the main window does not force the application to quit immediately.

Data edited by the process or resources allocated to the process can be lost if you call `Process.Kill`. `Process.Kill` causes an abnormal process termination, and should be used only when necessary. `Process.CloseMainWindow` enables an orderly termination of the process and closes all windows, so it is preferable for applications with an interface. If `Process.CloseMainWindow` fails, you can use `Process.Kill` to terminate the process. `Process.Kill` is the only way to terminate processes that do not have graphical interfaces.

You can call `Process.Kill` and `Process.CloseMainWindow` only for processes that are running on the local computer. You cannot cause processes on remote computers to exit. You can only view information for processes running on remote computers.

#### Examples
The following example starts an instance of Notepad. It then retrieves the physical memory usage of the associated process at 2 second intervals for a maximum of 10 seconds. The example detects whether the process exits before 10 seconds have elapsed. The example closes the process if it is still running after 10 seconds.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Close/process_refresh.cs._

## Process.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Release all resources used by this process.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## Process.EnterDebugMode() method

```csharp
public static void EnterDebugMode ();
```

Puts a `Process` component in state to interact with operating system processes that run in a special mode by enabling the native property `SeDebugPrivilege` on the current thread.

#### Remarks
Some operating system processes run in a special mode. Attempting to read properties of or attach to these processes is not possible unless you have called `Process.EnterDebugMode` on the component. Call `Process.LeaveDebugMode` when you no longer need access to these processes that run in special mode.

## Process.GetCurrentProcess() method

```csharp
public static System.Diagnostics.Process GetCurrentProcess ();
```

Gets a new `Process` component and associates it with the currently active process.

Returns: A new `Process` component associated with the process resource that is running the calling application.

#### Remarks
Use this method to create a new `Process` instance and associate it with the process resource on the local computer.

Like the similar `Process.GetProcessById`, `Process.GetProcessesByName`, and `Process.GetProcesses` methods, `Process.GetCurrentProcess` associates an existing resource with a new `Process` component.

#### Examples
The following example retrieves information of the current process, processes running on the local computer, all instances of Notepad running on the local computer, and a specific process on the local computer. It then retrieves information for the same processes on a remote computer.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/GetCurrentProcess/processstaticget.cs._

## Process.GetProcessById(Int32) method

```csharp
public static System.Diagnostics.Process GetProcessById (int processId);
```

Returns a new `Process` component, given the identifier of a process on the local computer.

Parameters:

- `processId`: The system-unique identifier of a process resource.

Returns: A `Process` component that is associated with the local process resource identified by the `processId` parameter.

Exceptions:

- `ArgumentException`: The process specified by the `processId` parameter is not running. The identifier might be expired.

#### Remarks
Use this method to create a new `Process` component and associate it with a process resource on the local computer. The process resource must already exist on the computer, because `GetProcessById` does not create a system resource, but rather associates a resource with an application-generated `Process` component. A process `Process.Id` can be retrieved only for a process that is currently running on the computer. After the process terminates, `GetProcessById` throws an exception if you pass it an expired identifier.

On any particular computer, the identifier of a process is unique. `GetProcessById` returns one process at most. If you want to get all the processes running a particular application, use `GetProcessesByName`. If multiple processes exist on the computer running the specified application, `GetProcessesByName` returns an array containing all the associated processes. You can query each of these processes in turn for its identifier. The process identifier can be viewed in the `Processes` panel of the Windows Task Manager. The `PID` column displays the process identifier that is assigned to a process.

The `processId` parameter is an `Int32` (a 32-bit signed integer), although the underlying Windows API uses a `DWORD` (an unsigned 32-bit integer) for similar APIs. This is for historical reasons.

#### Examples
The following example retrieves information of the current process, processes running on the local computer, all instances of Notepad running on the local computer, and a specific process on the local computer. It then retrieves information for the same processes on a remote computer.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/GetCurrentProcess/processstaticget.cs._
