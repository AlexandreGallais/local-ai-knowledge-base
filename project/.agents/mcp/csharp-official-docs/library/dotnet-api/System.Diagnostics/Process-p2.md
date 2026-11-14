---
title: "Process class (part 2 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Process.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Process class (part 2 of 15)

## Process.ExitCode property

```csharp
public int ExitCode { get; }
```

Gets the value that the associated process specified when it terminated.

Returns: The code that the associated process specified when it terminated.

Exceptions:

- `InvalidOperationException`: The process has not exited.

-or-

The process `Process.Handle` is not valid.
- `NotSupportedException`: You are trying to access the `Process.ExitCode` property for a process that is running on a remote computer. This property is available only for processes that are running on the local computer.

#### Remarks
Use `Process.ExitCode` to get the status that the system process returned when it exited. You can use the exit code much like an integer return value from a `main()` procedure.

The `Process.ExitCode` value for a process reflects the specific convention implemented by the application developer for that process. If you use the exit code value to make decisions in your code, be sure that you know the exit code convention used by the application process.

Developers usually indicate a successful exit by an `Process.ExitCode` value of zero, and designate errors by nonzero values that the calling method can use to identify the cause of an abnormal process termination. It is not necessary to follow these guidelines, but they are the convention.

If you try to get the `Process.ExitCode` before the process has exited, the attempt throws an exception. Examine the `HasExited` property first to verify whether the associated process has terminated.

> **Note:**
> When standard output has been redirected to asynchronous event handlers, it is possible that output processing will not have completed when `Process.HasExited` returns `true`. To ensure that asynchronous event handling has been completed, call the `WaitForExit` overload that takes no parameter before checking `Process.HasExited`.

You can use the `Process.CloseMainWindow` or the `Process.Kill` method to cause an associated process to exit.

There are two ways of being notified when the associated process exits: synchronously and asynchronously. Synchronous notification relies on calling the `Process.WaitForExit` method to pause the processing of your application until the associated component exits. Asynchronous notification relies on the `Exited` event. When using asynchronous notification, `Process.EnableRaisingEvents` must be set to `true` for the `Process` component to receive notification that the process has exited.

#### Examples
The following example starts an instance of Notepad. The example then retrieves and displays various properties of the associated process. The example detects when the process exits, and displays the process's exit code.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/BasePriority/source.cs._

## Process.ExitTime property

```csharp
public DateTime ExitTime { get; }
```

Gets the time that the associated process exited.

Returns: A `DateTime` that indicates when the associated process was terminated.

Exceptions:

- `InvalidOperationException`: You're attempting to access this property before the process has exited, when no process is associated with this object, or (on Windows) when there is no process handle available.
- `NotSupportedException`: You are trying to access the `Process.ExitTime` property for a process that is running on a remote computer. This property is available only for processes that are running on the local computer.

#### Remarks
If the process has not terminated, attempting to retrieve the `ExitTime` property throws an exception. Use `Process.HasExited` before getting the `ExitTime` property to determine whether the associated process has terminated.

#### Examples
The following code example creates a process that prints a file. The process raises the `Exited` event when it exits, and the event handler displays the `ExitTime` property and other process information.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/EnableRaisingEvents/processexitedevent.cs._

## Process.Handle property

```csharp
public IntPtr Handle { get; }
```

Gets the native handle of the associated process.

Returns: The handle that the operating system assigned to the associated process when the process was started. The system uses this handle to keep track of process attributes.

Exceptions:

- `InvalidOperationException`: The process has not been started or has exited. The `Process.Handle` property cannot be read because there is no process associated with this `Process` instance.

-or-

The `Process` instance has been attached to a running process but you do not have the necessary permissions to get a handle with full access rights.
- `NotSupportedException`: You are trying to access the `Process.Handle` property for a process that is running on a remote computer. This property is available only for processes that are running on the local computer.

#### Remarks
An application can obtain a handle to a process that can be used as a parameter to many process-information and control functions. You can use this handle to initialize a `WaitHandle` or to call native methods with platform invoke.

This process handle is private to an application. In other words, process handles cannot be shared. A process also has a process `Process.Id` that, unlike the `Process.Handle`, is unique and, therefore, valid throughout the system.

Only processes started through a call to `Process.Start` set the `Handle` property of the corresponding `Process` instances.

## Process.HandleCount property

```csharp
public int HandleCount { get; }
```

Gets the number of handles opened by the process.

Returns: The number of operating system handles the process has opened.

#### Remarks
The value returned by this property represents the most recently refreshed handle count. To get the most up to date handle count, you need to call `Refresh` method first.

Handles provide a way for a process to refer to objects. A process can obtain handles to files, resources, message queues, and many other operating system objects. The operating system reclaims the memory associated with the process only when the handle count is zero.

## Process.HasExited property

```csharp
public bool HasExited { get; }
```

Gets a value indicating whether the associated process has been terminated.

Returns: `true` if the operating system process referenced by the `Process` component has terminated; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: There is no process associated with the object.
- `Win32Exception`: The exit code for the process could not be retrieved.
- `NotSupportedException`: You are trying to access the `Process.HasExited` property for a process that is running on a remote computer. This property is available only for processes that are running on the local computer.

#### Remarks
A value of `true` for `Process.HasExited` indicates that the associated process has terminated, either normally or abnormally. You can request or force the associated process to exit by calling `Process.CloseMainWindow` or `Process.Kill`. If a handle is open to the process, the operating system releases the process memory when the process has exited, but retains administrative information about the process, such as the handle, exit code, and exit time. To get this information, you can use the `Process.ExitCode` and `Process.ExitTime` properties. These properties are populated automatically for processes that were started by this component. The administrative information is released when all the `Process` components that are associated with the system process are destroyed and hold no more handles to the exited process.

A process can terminate independently of your code. If you started the process using this component, the system updates the value of `Process.HasExited` automatically, even if the associated process exits independently.

> **Note:**
> When standard output has been redirected to asynchronous event handlers, it is possible that output processing will not have completed when this property returns `true`. To ensure that asynchronous event handling has been completed, call the `WaitForExit` overload that takes no parameter before checking `Process.HasExited`.

#### Examples
The following example starts an instance of Notepad. It then retrieves the physical memory usage of the associated process at 2 second intervals for a maximum of 10 seconds. The example detects whether the process exits before 10 seconds have elapsed. The example closes the process if it is still running after 10 seconds.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Close/process_refresh.cs._

## Process.Id property

```csharp
public int Id { get; }
```

Gets the unique identifier for the associated process.

Returns: The system-generated unique identifier of the process that is referenced by this `Process` instance.

Exceptions:

- `InvalidOperationException`: The process's `Process.Id` property has not been set.

-or-

There is no process associated with this `Process` object.

#### Remarks
The process `Process.Id` is not valid if the associated process is not running. Therefore, you should ensure that the process is running before attempting to retrieve the `Id` property. Until the process terminates, the process identifier uniquely identifies the process throughout the system.

You can connect a process that is running on a local or remote computer to a new `Process` instance by passing the process identifier to the `Process.GetProcessById` method. `Process.GetProcessById` is a `static` method that creates a new component and sets the `Id` property for the new `Process` instance automatically.

Process identifiers can be reused by the system. The `Id` property value is unique only while the associated process is running. After the process has terminated, the system can reuse the `Id` property value for an unrelated process.

Because the identifier is unique on the system, you can pass it to other threads as an alternative to passing a `Process` instance. This action can save system resources yet guarantee that the process is correctly identified.

#### Examples
The following example demonstrates how to obtain the `Process.Id` for all running instances of an application. The code creates a new instance of Notepad, lists all the instances of Notepad, and then allows the user to enter the `Process.Id` number to remove a specific instance.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Id/program.cs._

## Process.MachineName property

```csharp
public string MachineName { get; }
```

Gets the name of the computer the associated process is running on.

Returns: The name of the computer that the associated process is running on.

Exceptions:

- `InvalidOperationException`: There is no process associated with this `Process` object.

#### Remarks
You can view statistical data and process information for processes running on remote computers but you cannot call `Process.Start`, `Process.CloseMainWindow`, or `Process.Kill` on remote computers.

> **Note:**
> When the associated process is executing on the local machine, this property returns a period (".") for the machine name. You should use the `MachineName` property to get the correct machine name.

#### Examples
To use the following example you must first start at least one instance of Notepad on a remote computer. The example requests the name of the remote computer on which Notepad is running, and then displays the respective `Process.ProcessName`, `Process.Id`, and `Process.MachineName` properties for each instance.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/MachineName/process_getprocessesbyname2_2.cs._

## Process.MainModule property

```csharp
public System.Diagnostics.ProcessModule? MainModule { get; }
```

Gets the main module for the associated process.

Returns: The `ProcessModule` that was used to start the process, or `null` if no main module was found.

Exceptions:

- `NotSupportedException`: You are trying to access the `Process.MainModule` property for a process that's running on a remote computer. This property is available only for processes that are running on the local computer.
- `Win32Exception`: A 32-bit process is trying to access the modules of a 64-bit process.
- `InvalidOperationException`: The process `Process.Id` is not available.

-or-

The process has exited.

#### Remarks

A process module represents a .dll or .exe file that's loaded into a particular process. The `MainModule` property lets you view information about the executable used to start the process, including the module name, file name, and module memory details.

If no main module is found, it could be because the process hasn't finished loading the main module when the property is called.

## Process.MainWindowHandle property

```csharp
public IntPtr MainWindowHandle { get; }
```

Gets the window handle of the main window of the associated process.

Returns: The system-generated window handle of the main window of the associated process.

Exceptions:

- `InvalidOperationException`: The `Process.MainWindowHandle` is not defined because the process has exited.
- `NotSupportedException`: You are trying to access the `Process.MainWindowHandle` property for a process that is running on a remote computer. This property is available only for processes that are running on the local computer.

#### Remarks
The main window is the window opened by the process that currently has the focus (the `Form.TopLevel` form). You must use the `Process.Refresh` method to refresh the `Process` object to get the most up to date main window handle if it has changed. In general, because the window handle is cached, use `Process.Refresh` beforehand to guarantee that you'll retrieve the current handle.

You can get the `MainWindowHandle` property only for processes that are running on the local computer. The `MainWindowHandle` property is a value that uniquely identifies the window that is associated with the process.

A process has a main window associated with it only if the process has a graphical interface. If the associated process does not have a main window, the `Process.MainWindowHandle` value is zero. The value is also zero for processes that have been hidden, that is, processes that are not visible in the taskbar. This can be the case for processes that appear as icons in the notification area, at the far right of the taskbar.

If you have just started a process and want to use its main window handle, consider using the `Process.WaitForInputIdle` method to allow the process to finish starting, ensuring that the main window handle has been created. Otherwise, an exception will be thrown.
