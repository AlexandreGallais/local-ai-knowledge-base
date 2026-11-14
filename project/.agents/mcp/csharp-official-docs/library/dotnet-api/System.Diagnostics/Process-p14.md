---
title: "Process class (part 14 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Process.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Process class (part 14 of 15)

## Process.StartAndForget(ProcessStartInfo) method

```csharp
public static int StartAndForget (System.Diagnostics.ProcessStartInfo startInfo);
```

Starts the process described by `startInfo`, releases all associated resources, and returns the process ID.

Parameters:

- `startInfo`: The `ProcessStartInfo` that contains the information used to start the process.

Returns: The process ID of the started process.

Exceptions:

- `ArgumentNullException`: `startInfo` is `null`.
- `InvalidOperationException`: One or more of `ProcessStartInfo.RedirectStandardInput`, `ProcessStartInfo.RedirectStandardOutput`, or `ProcessStartInfo.RedirectStandardError` is set to `true`. Stream redirection is not supported in fire-and-forget scenarios because redirected streams must be drained to avoid deadlocks.

-or-

`ProcessStartInfo.UseShellExecute` is set to `true`. Shell execution is not supported in fire-and-forget scenarios because on Windows it might not create a new process, making it impossible to return a valid process ID.

When a standard handle (`StandardInputHandle`, `StandardOutputHandle`, or `StandardErrorHandle`) is not provided, it is redirected to the null file by default.

This method is designed for fire-and-forget scenarios where the caller wants to launch a process and does not need to interact with it further. It starts the process, releases all associated resources, and returns the process ID. The started process continues to run independently.

## Process.StartAndForget(String, String>) method

```csharp
public static int StartAndForget (string fileName, System.Collections.Generic.IEnumerable<string>? arguments = default);
```

Starts a process with the specified file name and optional arguments, releases all associated resources, and returns the process ID.

Parameters:

- `fileName`: The name of the executable to start.
- `arguments`: The command-line arguments to pass to the process. Pass `null` or an empty sequence to start the process without additional arguments.

Returns: The process ID of the started process.

Exceptions:

- `ArgumentNullException`: `fileName` is `null`.
- `ArgumentException`: `fileName` is empty.

This method is designed for fire-and-forget scenarios where the caller wants to launch a process and does not need to interact with it further. It starts the process, captures its process ID, releases all associated resources, and returns the process ID. The started process continues to run independently.

Standard handles are redirected to the null file by default.

## Process.ToString() method

```csharp
public override string ToString ();
```

Formats the process's name as a string, combined with the parent component type, if applicable.

Returns: The `Process.ProcessName`, combined with the base component's `Object.ToString` return value.

#### Examples
The following example starts an instance of Notepad. The example then retrieves and displays various properties of the associated process. The example detects when the process exits, and displays the process's exit code.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/BasePriority/source.cs._

## Process.TryGetProcessById(Int32, Process) method

```csharp
public static bool TryGetProcessById (int processId, out System.Diagnostics.Process? process);
```

Attempts to get a `Process` instance for an existing process with the specified process ID.

Parameters:

- `processId`: The process ID of the process to find.
- `process`: When this method returns `true`, contains a `Process` representing the existing process; otherwise, `null`.

Returns: `true` if the process was found; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `processId` is less than or equal to zero.

To be added.

## Process.TryWaitForExitStatus(TimeSpan, ProcessExitStatus) method

```csharp
public bool TryWaitForExitStatus (TimeSpan timeout, out System.Diagnostics.ProcessExitStatus? exitStatus);
```

Waits for the process to exit within the specified timeout.

Parameters:

- `timeout`: The maximum time to wait for the process to exit. Use `Timeout.InfiniteTimeSpan` to wait indefinitely.
- `exitStatus`: When this method returns `true`, contains the exit status of the process; otherwise, `null`.

Returns: `true` if the process exited before the timeout; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: There is no process associated with this object, or the process handle or exit status is unavailable.
- `ObjectDisposedException`: The process object has been disposed.
- `NotSupportedException`: The process is on a remote computer.
- `PlatformNotSupportedException`: The current platform is not supported, or, on Unix, the process is not a child process.
- `ArgumentOutOfRangeException`: `timeout`, truncated to a whole number of milliseconds, is less than -1 or greater than `Int32.MaxValue`.

A timeout stops waiting without terminating the process.

On Unix, obtaining the exit status is supported only for child processes.

## Process.WaitForExit() method

```csharp
public void WaitForExit ();
```

Instructs the `Process` component to wait indefinitely for the associated process to exit.

Exceptions:

- `Win32Exception`: The wait setting could not be accessed.
- `SystemException`: No process `Process.Id` has been set, and a `Process.Handle` from which the `Process.Id` property can be determined does not exist.

-or-

There is no process associated with this `Process` object.

-or-

You are attempting to call `Process.WaitForExit` for a process that is running on a remote computer. This method is available only for processes that are running on the local computer.

#### Remarks
`WaitForExit` makes the current thread wait until the associated process terminates. It should be called after all other methods are called on the process. To avoid blocking the current thread, use the `Exited` event.

This method instructs the `Process` component to wait an infinite amount of time for the process and event handlers to exit. This can cause an application to stop responding. For example, if you call `Process.CloseMainWindow` for a process that has a user interface, the request to the operating system to terminate the associated process might not be handled if the process is written to never enter its message loop.

This overload ensures that all processing has been completed, including the handling of asynchronous events for redirected standard output. You should use this overload after a call to the `WaitForExit` overload when standard output has been redirected to asynchronous event handlers.

When an associated process exits (that is, when it is shut down by the operation system through a normal or abnormal termination), the system stores administrative information about the process and returns to the component that had called `WaitForExit`. The `Process` component can then access the information, which includes the `Process.ExitTime`, by using the `Process.Handle` to the exited process.

Because the associated process has exited, the `Handle` property of the component no longer points to an existing process resource. Instead, the handle can be used only to access the operating system's information about the process resource. The system is aware of handles to exited processes that have not been released by `Process` components, so it keeps the `Process.ExitTime` and `Process.Handle` information in memory until the `Process` component specifically frees the resources. For this reason, any time you call `Process.Start` for a `Process` instance, call `Process.Close` when the associated process has terminated and you no longer need any administrative information about it. `Process.Close` frees the memory allocated to the exited process.

#### Examples
See the Remarks section of the `StandardError` property reference page.

## Process.WaitForExit(Int32) method

```csharp
public bool WaitForExit (int milliseconds);
```

Instructs the `Process` component to wait the specified number of milliseconds for the associated process to exit.

Parameters:

- `milliseconds`: The amount of time, in milliseconds, to wait for the associated process to exit. A value of 0 specifies an immediate return, and a value of -1 specifies an infinite wait.

Returns: `true` if the associated process has exited; otherwise, `false`.

Exceptions:

- `Win32Exception`: The wait setting could not be accessed.
- `SystemException`: No process `Process.Id` has been set, and a `Process.Handle` from which the `Process.Id` property can be determined does not exist.

-or-

There is no process associated with this `Process` object.

-or-

You are attempting to call `Process.WaitForExit` for a process that is running on a remote computer. This method is available only for processes that are running on the local computer.
- `ArgumentOutOfRangeException`: `milliseconds` is a negative number other than -1, which represents an infinite time-out.

#### Remarks
`WaitForExit` makes the current thread wait until the associated process terminates. It should be called after all other methods are called on the process. To avoid blocking the current thread, use the `Exited` event.

This method instructs the `Process` component to wait a finite amount of time for the process to exit. If the associated process does not exit by the end of the interval because the request to terminate is denied, `false` is returned to the calling procedure. You can specify `Infinite` for `milliseconds`, and `WaitForExit` will behave the same as the `WaitForExit` overload. If you pass 0 (zero) to the method, it returns `true` only if the process has already exited; otherwise, it immediately returns `false`.

When standard output has been redirected to asynchronous event handlers, it is possible that output processing will not have completed when this method returns. To ensure that asynchronous event handling has been completed, call the `WaitForExit` overload that takes no parameter after receiving a `true` from this overload. To help ensure that the `Exited` event is handled correctly in Windows Forms applications, set the `SynchronizingObject` property.

When an associated process exits (is shut down by the operating system through a normal or abnormal termination), the system stores administrative information about the process and returns to the component that had called `WaitForExit`. The `Process` component can then access the information, which includes the `Process.ExitTime`, by using the `Process.Handle` to the exited process.

Because the associated process has exited, the `Handle` property of the component no longer points to an existing process resource. Instead, the handle can be used only to access the operating system's information about the process resource. The system is aware of handles to exited processes that have not been released by `Process` components, so it keeps the `Process.ExitTime` and `Process.Handle` information in memory until the `Process` component specifically frees the resources. For this reason, any time you call `Process.Start` for a `Process` instance, call `Process.Close` when the associated process has terminated and you no longer need any administrative information about it. `Process.Close` frees the memory allocated to the exited process.

#### Examples
See the code example for the `ExitCode` property.

## Process.WaitForExit(TimeSpan) method

```csharp
public bool WaitForExit (TimeSpan timeout);
```

Instructs the Process component to wait the specified amount of time for the associated process to exit.

Parameters:

- `timeout`: The amount of time to wait for the associated process to exit.

Returns: `true` if the associated process has exited; otherwise, `false`.

See `Process.WaitForExit` remarks.

## Process.WaitForExitAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task WaitForExitAsync (System.Threading.CancellationToken <example-value> = default);
```

Instructs the process component to wait for the associated process to exit, or for the `cancellationToken` to be cancelled.

Parameters:

- `cancellationToken`: An optional token to cancel the asynchronous operation.

Returns: A task that will complete when the process has exited, cancellation has been requested, or an error occurs.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

Calling this method will set `EnableRaisingEvents` to `true`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WaitForExit`.

## Process.WaitForExitStatus() method

```csharp
public System.Diagnostics.ProcessExitStatus WaitForExitStatus ();
```

Waits indefinitely for the process to exit.

Returns: The exit status of the process.

Exceptions:

- `InvalidOperationException`: There is no process associated with this object, or the process handle or exit status is unavailable.
- `ObjectDisposedException`: The process object has been disposed.
- `NotSupportedException`: The process is on a remote computer.
- `PlatformNotSupportedException`: The current platform is not supported, or, on Unix, the process is not a child process.

On Unix, obtaining the exit status is supported only for child processes.

## Process.WaitForExitStatusAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Diagnostics.ProcessExitStatus> WaitForExitStatusAsync (System.Threading.CancellationToken <example-value> = default);
```

Waits asynchronously for the process to exit.

Parameters:

- `cancellationToken`: A cancellation token that can be used to cancel the wait operation.

Returns: A task that represents the asynchronous wait operation. The task result contains the exit status of the process.

Exceptions:

- `InvalidOperationException`: There is no process associated with this object, or the process handle or exit status is unavailable.
- `ObjectDisposedException`: The process object has been disposed.
- `NotSupportedException`: The process is on a remote computer.
- `PlatformNotSupportedException`: The current platform is not supported, or, on Unix, the process is not a child process.
- `OperationCanceledException`: The `cancellationToken` was canceled. The exception is stored in the returned task.

When the cancellation token is canceled, the method stops waiting and throws `OperationCanceledException`. The process isn't terminated and continues running. To terminate the process on cancellation instead, call `SafeProcessHandle.WaitForExitOrKillOnCancellationAsync` on `SafeHandle`.

On Unix, obtaining the exit status is supported only for child processes.
