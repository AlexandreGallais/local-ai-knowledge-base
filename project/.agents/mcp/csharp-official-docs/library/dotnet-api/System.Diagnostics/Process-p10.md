---
title: "Process class (part 10 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Process.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Process class (part 10 of 15)

## Process.Kill(Boolean) method

```csharp
public void Kill (bool entireProcessTree);
```

Immediately stops the associated process, and optionally its child/descendent processes.

Parameters:

- `entireProcessTree`: `true` to kill the associated process and its descendants; `false` to kill only the associated process.

Exceptions:

- `Win32Exception`: The associated process could not be terminated.

-or-

The process is terminating.
- `NotSupportedException`: You are attempting to call `Process.Kill` for a process that is running on a remote computer. The method is available only for processes running on the local computer.
- `InvalidOperationException`: There is no process associated with this `Process` object.

-or-

The calling process is a member of the associated process's descendant tree.
- `AggregateException`: Not all processes in the associated process's descendant tree could be terminated.

When `entireProcessTree` is set to `true`, processes where the call lacks permissions to view details are silently skipped by the descendant termination process because the termination process is unable to determine whether those processes are descendants.

## Process.LeaveDebugMode() method

```csharp
public static void LeaveDebugMode ();
```

Takes a `Process` component out of the state that lets it interact with operating system processes that run in a special mode.

#### Remarks
Some operating system processes run in a special mode. Attempting to read properties of or attach to these processes is not possible unless you have called `Process.EnterDebugMode` on the component. Call `Process.LeaveDebugMode` when you no longer need access to these processes that run in special mode.

## Process.OnExited() method

```csharp
protected void OnExited ();
```

Raises the `Process.Exited` event.

#### Remarks
`Process.OnExited` is the API method that raises the `Exited` event. Calling `Process.OnExited` causes the `Exited` event to occur and is the only way to raise the event using the `Process` component. `Process.OnExited` is primarily used when deriving classes from the component.

As an alternative to `Process.OnExited`, you can write your own event handler. You create your own event handler delegate and your own event-handling method.

> **Note:**
> If you are using the Visual Studio environment, an event handler delegate (AddOnExited) and an event-handling method (Process1_Exited) are created for you when you drag a `Process` component onto a form and double-click the icon. The code you create to run when the `Exited` event occurs is entered into the Process1_Exited procedure. You do not need to create the `Process.OnExited` member, because it is implemented for you.

Raising an event invokes the event handler through a delegate. For an overview, see Handling and Raising Events.

#### Examples
The following example shows how to use the `Process.OnExited` method in a derived class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/OnExited/program.cs._

## Process.ReadAllBytes(TimeSpan>) method

```csharp
public (byte[] StandardOutput, byte[] StandardError) ReadAllBytes (TimeSpan? timeout = default);
```

Reads all standard output and standard error of the process as byte arrays.

Parameters:

- `timeout`: The maximum amount of time to wait for the streams to be fully read. When `null`, waits indefinitely.

Returns: A tuple containing the standard output and standard error bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `timeout`, truncated to a whole number of milliseconds, is less than -1 or greater than `Int32.MaxValue`.
- `InvalidOperationException`: Standard output or standard error has not been redirected.

-or-

A redirected stream has already been used for synchronous or asynchronous reading.
- `TimeoutException`: The operation did not complete within the specified `timeout`.
- `ObjectDisposedException`: The process has been disposed.

To be added.

## Process.ReadAllBytesAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task<(byte[] StandardOutput, byte[] StandardError)> ReadAllBytesAsync (System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads all standard output and standard error of the process as byte arrays.

Parameters:

- `cancellationToken`: A token to cancel the asynchronous operation.

Returns: A task that represents the asynchronous read operation. The value of the task contains a tuple with the standard output and standard error bytes.

Exceptions:

- `InvalidOperationException`: Standard output or standard error has not been redirected.

-or-

A redirected stream has already been used for synchronous or asynchronous reading.
- `OperationCanceledException`: The `cancellationToken` was canceled.
- `ObjectDisposedException`: The process has been disposed.

To be added.

## Process.ReadAllLines(TimeSpan>) method

```csharp
public System.Collections.Generic.IEnumerable<System.Diagnostics.ProcessOutputLine> ReadAllLines (TimeSpan? timeout = default);
```

Reads all standard output and standard error of the process as lines of text, interleaving them as they become available.

Parameters:

- `timeout`: The maximum amount of time to wait for the streams to be fully read. When `null`, waits indefinitely.

Returns: An enumerable of `ProcessOutputLine` instances representing the lines read from standard output and standard error.

Exceptions:

- `ArgumentOutOfRangeException`: `timeout`, truncated to a whole number of milliseconds, is less than -1 or greater than `Int32.MaxValue`.
- `InvalidOperationException`: Standard output or standard error has not been redirected.

-or-

A redirected stream has already been used for synchronous or asynchronous reading.
- `TimeoutException`: The operation did not complete within the specified `timeout`.
- `ObjectDisposedException`: The process has been disposed.

Lines from standard output and standard error are yielded as they become available. When data is available in both standard output and standard error, standard error is processed first.

## Process.ReadAllLinesAsync(CancellationToken) method

```csharp
public System.Collections.Generic.IAsyncEnumerable<System.Diagnostics.ProcessOutputLine> ReadAllLinesAsync (System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads all standard output and standard error of the process as lines of text, interleaving them as they become available.

Parameters:

- `cancellationToken`: A token to cancel the asynchronous operation.

Returns: An async enumerable of `ProcessOutputLine` instances representing the lines read from standard output and standard error.

Exceptions:

- `InvalidOperationException`: Standard output or standard error has not been redirected.

-or-

A redirected stream has already been used for synchronous or asynchronous reading.
- `OperationCanceledException`: The `cancellationToken` was canceled.
- `ObjectDisposedException`: The process has been disposed.

Lines from standard output and standard error are yielded as they become available. When the consumer stops enumerating early (for example, by breaking out of `await foreach`), any pending read operations are canceled.

## Process.ReadAllText(TimeSpan>) method

```csharp
public (string StandardOutput, string StandardError) ReadAllText (TimeSpan? timeout = default);
```

Reads all standard output and standard error of the process as text.

Parameters:

- `timeout`: The maximum amount of time to wait for the streams to be fully read. When `null`, waits indefinitely.

Returns: A tuple containing the standard output and standard error text.

Exceptions:

- `ArgumentOutOfRangeException`: `timeout`, truncated to a whole number of milliseconds, is less than -1 or greater than `Int32.MaxValue`.
- `InvalidOperationException`: Standard output or standard error has not been redirected.

-or-

A redirected stream has already been used for synchronous or asynchronous reading.
- `TimeoutException`: The operation did not complete within the specified `timeout`.
- `ObjectDisposedException`: The process has been disposed.

To be added.

## Process.ReadAllTextAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task<(string StandardOutput, string StandardError)> ReadAllTextAsync (System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads all standard output and standard error of the process as text.

Parameters:

- `cancellationToken`: A token to cancel the asynchronous operation.

Returns: A task that represents the asynchronous read operation. The value of the task contains a tuple with the standard output and standard error text.

Exceptions:

- `InvalidOperationException`: Standard output or standard error has not been redirected.

-or-

A redirected stream has already been used for synchronous or asynchronous reading.
- `OperationCanceledException`: The `cancellationToken` was canceled.
- `ObjectDisposedException`: The process has been disposed.

To be added.

## Process.Refresh() method

```csharp
public void Refresh ();
```

Discards any information about the associated process that has been cached inside the process component.

#### Remarks
After `Process.Refresh` is called, the first request for information about each property causes the process component to obtain a new value from the associated process.

When a `Process` component is associated with a process resource, the property values of the `Process` are immediately populated according to the status of the associated process. If the information about the associated process subsequently changes, those changes are not reflected in the `Process` component's cached values. The `Process` component is a snapshot of the process resource at the time they are associated. To view the current values for the associated process, call the `Process.Refresh` method.

#### Examples
The following example starts an instance of Notepad. It then retrieves the physical memory usage of the associated process at 2 second intervals for a maximum of 10 seconds. The example detects whether the process exits before 10 seconds have elapsed. The example closes the process if it is still running after 10 seconds.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Close/process_refresh.cs._

## Process.Run(ProcessStartInfo, TimeSpan>) method

```csharp
public static System.Diagnostics.ProcessExitStatus Run (System.Diagnostics.ProcessStartInfo startInfo, TimeSpan? timeout = default);
```

Starts the process described by `startInfo`, waits for it to exit, and returns its exit status.

Parameters:

- `startInfo`: The `ProcessStartInfo` that contains the information used to start the process.
- `timeout`: The maximum amount of time to wait for the process to exit. When `null`, waits indefinitely. If the process does not exit within the specified timeout, it is killed.

Returns: The exit status of the process. If the process is killed due to timeout, `ProcessExitStatus.Canceled` is `true`.

Exceptions:

- `ArgumentOutOfRangeException`: `timeout`, truncated to a whole number of milliseconds, is less than -1 or greater than `Int32.MaxValue`.
- `ArgumentNullException`: `startInfo` is `null`.
- `InvalidOperationException`: `ProcessStartInfo.UseShellExecute` is set to `true`.

-or-

`ProcessStartInfo.RedirectStandardInput`, `ProcessStartInfo.RedirectStandardOutput`, or `ProcessStartInfo.RedirectStandardError` is set to `true`. Use the corresponding standard handle properties to supply handles instead.

To be added.

## Process.Run(String, String>, Boolean, TimeSpan>) method

```csharp
public static System.Diagnostics.ProcessExitStatus Run (string fileName, System.Collections.Generic.IEnumerable<string>? arguments = default, bool silent = false, TimeSpan? timeout = default);
```

Starts a process with the specified file name and optional arguments, waits for it to exit, and returns its exit status.

Parameters:

- `fileName`: The name of the executable to start.
- `arguments`: The command-line arguments to pass to the process. Pass `null` or an empty sequence to start the process without additional arguments.
- `silent`: When `true`, redirects standard input, output, and error to the null device, ensuring the process produces no visible console output. When `false`, the process inherits standard handles from the parent.
- `timeout`: The maximum amount of time to wait for the process to exit. When `null`, waits indefinitely. If the process does not exit within the specified timeout, it is killed.

Returns: The exit status of the process. If the process is killed due to timeout, `ProcessExitStatus.Canceled` is `true`.

Exceptions:

- `ArgumentOutOfRangeException`: `timeout`, truncated to a whole number of milliseconds, is less than -1 or greater than `Int32.MaxValue`.
- `ArgumentNullException`: `fileName` is `null`.
- `ArgumentException`: `fileName` is empty.

To be added.

## Process.RunAndCaptureText(ProcessStartInfo, TimeSpan>) method

```csharp
public static System.Diagnostics.ProcessTextOutput RunAndCaptureText (System.Diagnostics.ProcessStartInfo startInfo, TimeSpan? timeout = default);
```

Starts the process described by `startInfo`, captures its standard output and error, waits for it to exit, and returns the captured text and exit status.

Parameters:

- `startInfo`: The `ProcessStartInfo` that contains the information used to start the process.
- `timeout`: The maximum amount of time to wait for the process to exit. When `null`, waits indefinitely. If the process does not exit within the specified timeout, it is killed.

Returns: The captured text output and exit status of the process.

Exceptions:

- `ArgumentOutOfRangeException`: `timeout`, truncated to a whole number of milliseconds, is less than -1 or greater than `Int32.MaxValue`.
- `ArgumentNullException`: `startInfo` is `null`.
- `InvalidOperationException`: `ProcessStartInfo.UseShellExecute` is set to `true`.

-or-

`ProcessStartInfo.RedirectStandardOutput` or `ProcessStartInfo.RedirectStandardError` is not set to `true`.
- `TimeoutException`: The redirected streams were not fully read within the specified `timeout`.

If the timeout expires while reading the redirected streams, the method attempts to kill the process and throws `TimeoutException`. If the streams have been fully read but the process doesn't exit within the remaining timeout, the process is killed and the returned `ExitStatus` has `Canceled` set to `true`.
