---
title: "Process class (part 1 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Process.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Process class

Namespace: `System.Diagnostics`

```csharp
public class Process : System.ComponentModel.Component, IDisposable
```

Provides access to local and remote processes and enables you to start and stop local system processes.

#### Remarks
A `Process` component provides access to a process that is running on a computer. A process, in the simplest terms, is a running app. A thread is the basic unit to which the operating system allocates processor time. A thread can execute any part of the code of the process, including parts currently being executed by another thread.

The `Process` component is a useful tool for starting, stopping, controlling, and monitoring apps. You can use the `Process` component, to obtain a list of the processes that are running, or you can start a new process. A `Process` component is used to access system processes. After a `Process` component has been initialized, it can be used to obtain information about the running process. Such information includes the set of threads, the loaded modules (.dll and .exe files), and performance information such as the amount of memory the process is using.

This type implements the `IDisposable` interface. When you have finished using the type, you should dispose of it either directly or indirectly. To dispose of the type directly, call its `IDisposable.Dispose` method in a `try`/`finally` block. To dispose of it indirectly, use a language construct such as `using` (in C#) or `Using` (in Visual Basic). For more information, see the "Using an Object that Implements IDisposable" section in the `IDisposable` interface documentation.

> **Note:**
> 32-bit processes cannot access the modules of a 64-bit process. If you try to get information about a 64-bit process from a 32-bit process, you will get a `Win32Exception` exception. A 64-bit process, on the other hand, can access the modules of a 32-bit process.

The process component obtains information about a group of properties all at once. After the `Process` component has obtained information about one member of any group, it will cache the values for the other properties in that group and not obtain new information about the other members of the group until you call the `Process.Refresh` method. Therefore, a property value is not guaranteed to be any newer than the last call to the `Process.Refresh` method. The group breakdowns are operating-system dependent.

If you have a path variable declared in your system using quotes, you must fully qualify that path when starting any process found in that location. Otherwise, the system will not find the path. For example, if `c:\mypath` is not in your path, and you add it using quotation marks: `path = %path%;"c:\mypath"`, you must fully qualify any process in `c:\mypath` when starting it.

A system process is uniquely identified on the system by its process identifier. Like many Windows resources, a process is also identified by its handle, which might not be unique on the computer. A handle is the generic term for an identifier of a resource. The operating system persists the process handle, which is accessed through the `Handle` property of the `Process` component, even when the process has exited. Thus, you can get the process's administrative information, such as the `Process.ExitCode` (usually either zero for success or a nonzero error code) and the `Process.ExitTime`. Handles are an extremely valuable resource, so leaking handles is more virulent than leaking memory.

On macOS, the following properties return 0:

- `PeakVirtualMemorySize64`
- `PrivateMemorySize64`
- `PeakWorkingSet64`

.NET might make only a limited subset of `Console` encodings available. If this is the case, the `Console` class uses `Encoding.UTF8` as the default encoding. If a `Process` object depends on specific code-page encodings, you can make them available by doing the following *before* you call any `Process` methods:

1. Retrieve the `EncodingProvider` object from the `Instance` property.
2. Pass the `EncodingProvider` object to the `Encoding.RegisterProvider` method to make the additional encodings supported by the encoding provider available.

The `Process` class will then automatically use the default system encoding rather than UTF8, provided that you have registered the encoding provider before calling any `Process` methods.

#### Examples
The following example uses an instance of the `Process` class to start a process.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Overview/processstart.cs._

The following example uses the `Process` class itself and a static `Process.Start` method to start a process.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/Overview/processstartstatic.cs._

The following F# example defines a `runProc` function that starts a process, captures all output and error information, and records the number of milliseconds that the process has run. The `runProc` function has three parameters: the name of application to launch, the arguments to supply to the application, and the starting directory.

The code for the `runProc` function was written by ImaginaryDevelopment and is available under the Microsoft Public License.

## Process.Process() constructor

```csharp
public Process ();
```

Initializes a new instance of the `Process` class.

#### Remarks
If you do not specify the `MachineName` property, the default is the local computer, (".").

You have two options for associating a new `Process` component with a process on the computer. The first option is to use the constructor to create the `Process` component, set the appropriate members of the `StartInfo` property and call `Process.Start` to associate the `Process` with a new system process. The second option is to associate the `Process` with a running system process by using `Process.GetProcessById` or one of the `Process.GetProcesses` return values.

If you use a `static` overload of the `Process.Start` method to start a new system process, the method creates a new `Process` component and associates it with the process.

When the `UseShellExecute` property is set to its default value, `true`, you can start applications and documents in a way that is similar to using the `Run` dialog box of the Windows `Start` menu. When `ProcessStartInfo.UseShellExecute` is `false`, you can start only executables.

Any executable file that you can call from the command line can be started in one of two ways: by setting the appropriate members of the `StartInfo` property and calling the `Process.Start` method with no parameters, or by passing the appropriate parameter to the `static` `Process.Start` member.

You can create a `Process` component by using the constructor, one of the static `Process.Start` overloads, or any of the `Process.GetProcessById`, `Process.GetProcesses`, or `Process.GetProcessesByName` methods. After you have done so, you have a view into the associated process. This is not a dynamic view that updates itself automatically when the process properties have changed in memory. Instead, you must call `Process.Refresh` for the component to update the `Process` property information in your application.

## Process.BasePriority property

```csharp
public int BasePriority { get; }
```

Gets the base priority of the associated process.

Returns: The base priority, which is computed from the `Process.PriorityClass` of the associated process.

Exceptions:

- `InvalidOperationException`: The process has exited.

-or-

The process has not started, so there is no process ID.

#### Remarks
The value returned by this property represents the most recently refreshed base priority of the process. To get the most up to date base priority, you need to call `Refresh` method first.

The `Process.BasePriority` of the process is the starting priority for threads created within the associated process. You can view information about the base priority through the System Monitor's Priority Base counter.

Based on the time elapsed or other boosts, the operating system can change the base priority when a process should be placed ahead of others.

The `BasePriority` property lets you view the starting priority assigned to a process. However, because it is read-only, you cannot use the `Process.BasePriority` to set the priority of the process. To change the priority, use the `PriorityClass` property. The `Process.BasePriority` is viewable using the System Monitor, while the `Process.PriorityClass` is not. Both the `Process.BasePriority` and the `Process.PriorityClass` can be viewed programmatically. The following table shows the relationship between `Process.BasePriority` values and `Process.PriorityClass` values.

|BasePriority|PriorityClass|
|------------------|-------------------|
|4|`Idle`|
|8|`Normal`|
|13|`High`|
|24|`RealTime`|

#### Examples
The following example starts an instance of Notepad. The example then retrieves and displays various properties of the associated process. The example detects when the process exits, and displays the process's exit code.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/BasePriority/source.cs._

## Process.EnableRaisingEvents property

```csharp
public bool EnableRaisingEvents { get; set; }
```

Gets or sets whether the `Process.Exited` event should be raised when the process terminates.

Returns: `true` if the `Process.Exited` event should be raised when the associated process is terminated (through either an exit or a call to `Process.Kill`); otherwise, `false`. The default is `false`. Note that even if the value of `Process.EnableRaisingEvents` is `false`, the `Process.Exited` event will be raised by the `Process.HasExited` property accessor, if it determines that the process has exited.

#### Remarks
The `EnableRaisingEvents` property suggests whether the component should be notified when the operating system has shut down a process. The `EnableRaisingEvents` property is used in asynchronous processing to notify your application that a process has exited. To force your application to synchronously wait for an exit event (which interrupts processing of the application until the exit event has occurred), use the `Process.WaitForExit` method.

> **Note:**
> If you're using Visual Studio and double-click a `Process` component in your project, an `Exited` event delegate and event handler are automatically generated. Additional code sets the `EnableRaisingEvents` property to `false`. You must change this property to `true` for your event handler to execute when the associated process exits.

If the component's `Process.EnableRaisingEvents` value is `true`, or when `Process.EnableRaisingEvents` is `false` and a `Process.HasExited` check is invoked by the component, the component can access the administrative information for the associated process, which remains stored by the operating system. Such information includes the `Process.ExitTime` and the `Process.ExitCode`.

After the associated process exits, the `Process.Handle` of the component no longer points to an existing process resource. Instead, it can only be used to access the operating system's information about the process resource. The operating system is aware that there are handles to exited processes that haven't been released by `Process` components, so it keeps the `Process.ExitTime` and `Process.Handle` information in memory.

There's a cost associated with watching for a process to exit. If `Process.EnableRaisingEvents` is `true`, the `Exited` event is raised when the associated process terminates. Your procedures for the `Exited` event run at that time.

Sometimes, your application starts a process but doesn't require notification of its closure. For example, your application can start Notepad to allow the user to perform text editing but make no further use of the Notepad application. You can choose to avoid notification when the process exits because it's not relevant to the continued operation of your application. Setting `Process.EnableRaisingEvents` to `false` can save system resources.

#### Examples
The following code example creates a process that prints a file. It sets the `EnableRaisingEvents` property to cause the process to raise the `Exited` event when it exits. The `Exited` event handler displays process information.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/EnableRaisingEvents/processexitedevent.cs._
