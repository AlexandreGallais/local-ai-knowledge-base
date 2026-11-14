---
title: "Process class (part 15 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Process.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Process class (part 15 of 15)

## Process.WaitForInputIdle() method

```csharp
public bool WaitForInputIdle ();
```

Causes the `Process` component to wait indefinitely for the associated process to enter an idle state. This overload applies only to processes with a user interface and, therefore, a message loop.

Returns: `true` if the associated process has reached an idle state.

Exceptions:

- `InvalidOperationException`: The process does not have a graphical interface.

-or-

An unknown error occurred. The process failed to enter an idle state.

-or-

The process has already exited.

-or-

No process is associated with this `Process` object.

#### Remarks
Use `WaitForInputIdle` to force the processing of your application to wait until the message loop has returned to the idle state. When a process with a user interface is executing, its message loop executes every time a Windows message is sent to the process by the operating system. The process then returns to the message loop. A process is said to be in an idle state when it is waiting for messages inside of a message loop. This state is useful, for example, when your application needs to wait for a starting process to finish creating its main window before the application communicates with that window.

If a process does not have a message loop, `WaitForInputIdle` throws an `InvalidOperationException`.

The `WaitForInputIdle` overload instructs the `Process` component to wait indefinitely for the process to become idle in the message loop. This instruction can cause an application to stop responding. For example, if the process is written to always exit its message loop immediately, as in the code fragment `while(true)`.

## Process.WaitForInputIdle(Int32) method

```csharp
public bool WaitForInputIdle (int milliseconds);
```

Causes the `Process` component to wait the specified number of milliseconds for the associated process to enter an idle state. This overload applies only to processes with a user interface and, therefore, a message loop.

Parameters:

- `milliseconds`: A value of 1 to <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> that specifies the amount of time, in milliseconds, to wait for the associated process to become idle. A value of 0 specifies an immediate return, and a value of -1 specifies an infinite wait.

Returns: `true` if the associated process has reached an idle state; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The process does not have a graphical interface.

-or-

An unknown error occurred. The process failed to enter an idle state.

-or-

The process has already exited.

-or-

No process is associated with this `Process` object.

#### Remarks
Use `WaitForInputIdle` to force the processing of your application to wait until the message loop has returned to the idle state. When a process with a user interface is executing, its message loop executes every time a Windows message is sent to the process by the operating system. The process then returns to the message loop. A process is said to be in an idle state when it is waiting for messages inside of a message loop. This state is useful, for example, when your application needs to wait for a starting process to finish creating its main window before the application communicates with that window.

If a process does not have a message loop, `WaitForInputIdle` throws an `InvalidOperationException`.

The `WaitForInputIdle` overload instructs the `Process` component to wait a finite amount of time for the process to become idle in the message loop. If the associated process has not become idle by the end of the interval because the loop is still processing messages, `false` is returned to the calling procedure.

For more information about handling events, see Handling and Raising Events.

## Process.WaitForInputIdle(TimeSpan) method

```csharp
public bool WaitForInputIdle (TimeSpan timeout);
```

Causes the `Process` component to wait the specified `timeout` for the associated process to enter an idle state.
This overload applies only to processes with a user interface and, therefore, a message loop.

Parameters:

- `timeout`: The amount of time, in milliseconds, to wait for the associated process to become idle.

Returns: `true` if the associated process has reached an idle state; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The process does not have a graphical interface.

-or-

An unknown error occurred. The process failed to enter an idle state.

-or-

The process has already exited.

-or-

No process is associated with this `Process` object.

#### Remarks

Use `WaitForInputIdle` to force the processing of your application to wait until the message loop has returned to the idle state.

When a process with a user interface is executing, its message loop executes every time a Windows message is sent to the process by the operating system.

The process then returns to the message loop. A process is said to be in an idle state when it is waiting for messages inside of a message loop.

This state is useful, for example, when your application needs to wait for a starting process to finish creating its main window before the application communicates with that window.

## Process.ErrorDataReceived event

```csharp
public event System.Diagnostics.DataReceivedEventHandler? ErrorDataReceived;
```

Occurs when an application writes to its redirected `Process.StandardError` stream.

#### Remarks
The `ErrorDataReceived` event indicates that the associated `Process` has written a line that's terminated with a newline (carriage return (CR), line feed (LF), or CR+LF) to its redirected `Process.StandardError` stream.

The event is also raised when the end of the redirected stream is reached. In that case, the `Data` property of the event handler's `DataReceivedEventArgs` is `null`.

The event only occurs during asynchronous read operations on `Process.StandardError`. To start asynchronous read operations, you must redirect the `Process.StandardError` stream of a `Process`, add your event handler to the `ErrorDataReceived` event, and call `Process.BeginErrorReadLine`. Thereafter, the `ErrorDataReceived` event signals each time the process writes a line to the redirected `Process.StandardError` stream, until the process exits or calls `Process.CancelErrorRead`.

> **Note:**
> The application that is processing the asynchronous output should call the `WaitForExit` method to ensure that the output buffer has been flushed. Note that specifying a timeout by using the `WaitForExit` overload does *not* ensure the output buffer has been flushed.

#### Examples
The following example uses the `net view` command to list the available network resources on a remote computer. The user supplies the target computer name as a command-line argument. The user can also supply a file name for error output. The example collects the output of the net command, waits for the process to finish, and then writes the output results to the console. If the user supplies the optional error file, the example writes errors to the file.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DataReceivedEventArgs/Overview/net_async.cs._

## Process.Exited event

```csharp
public event EventHandler Exited;
```

Occurs when a process exits.

#### Remarks
The `Exited` event indicates that the associated process exited. This occurrence means either that the process terminated (aborted) or successfully closed. This event can occur only if the value of the `EnableRaisingEvents` property is `true`.

There are two ways of being notified when the associated process exits: synchronously and asynchronously. Synchronous notification means calling the `Process.WaitForExit` method to block the current thread until the process exits. Asynchronous notification uses the `Exited` event, which allows the calling thread to continue execution in the meantime. In the latter case, `Process.EnableRaisingEvents` must be set to `true` for the calling application to receive the Exited event.

When the operating system shuts down a process, it notifies all other processes that have registered handlers for the Exited event. At this time, the handle of the process that just exited can be used to access some properties such as  `Process.ExitTime` and `Process.HasExited` that the operating system maintains until it releases that handle completely.

> **Note:**
> Even if you have a handle to an exited process, you cannot call `Process.Start` again to reconnect to the same process. Calling `Process.Start` automatically releases the associated process and connects to a process with the same file but an entirely new `Process.Handle`.

For more information about the use of the `Exited` event in Windows Forms applications, see the `SynchronizingObject` property.

#### Examples
The following code example creates a process that prints a file. It raises the `Exited` event when the process exits because the `EnableRaisingEvents` property was set when the process was created. The `Exited` event handler displays process information.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/EnableRaisingEvents/processexitedevent.cs._

## Process.OutputDataReceived event

```csharp
public event System.Diagnostics.DataReceivedEventHandler? OutputDataReceived;
```

Occurs each time an application writes a line to its redirected `Process.StandardOutput` stream.

#### Remarks
The `OutputDataReceived` event indicates that the associated `Process` has written a line that's terminated with a newline (carriage return (CR), line feed (LF), or CR+LF) to its redirected `Process.StandardOutput` stream.

The event is also raised when the end of the redirected stream is reached. In that case, the `Data` property of the event handler's `DataReceivedEventArgs` is `null`.

The event is enabled during asynchronous read operations on `Process.StandardOutput`. To start asynchronous read operations, you must redirect the `Process.StandardOutput` stream of a `Process`, add your event handler to the `OutputDataReceived` event, and call `Process.BeginOutputReadLine`. Thereafter, the `OutputDataReceived` event signals each time the process writes a line to the redirected `Process.StandardOutput` stream, until the process exits or calls `Process.CancelOutputRead`.

> **Note:**
> The application that is processing the asynchronous output should call the `Process.WaitForExit` method to ensure that the output buffer has been flushed.

#### Examples
The following example illustrates how to perform asynchronous read operations on the redirected `Process.StandardOutput` stream of the `ipconfig` command.

The example creates an event delegate for the `OutputHandler` event handler and associates it with the `OutputDataReceived` event. The event handler receives text lines from the redirected `Process.StandardOutput` stream, formats the text, and saves it in an output string that's later shown in the example's console window.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DataReceivedEventArgs/Overview/datareceivedevent.cs._
