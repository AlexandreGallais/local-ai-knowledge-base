---
title: "Process class (part 9 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Process.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Process class (part 9 of 15)

## Process.GetProcessById(Int32, String) method

```csharp
public static System.Diagnostics.Process GetProcessById (int processId, string machineName);
```

Returns a new `Process` component, given a process identifier and the name of a computer on the network.

Parameters:

- `processId`: The system-unique identifier of a process resource.
- `machineName`: The name of a computer on the network.

Returns: A `Process` component that is associated with a remote process resource identified by the `processId` parameter.

Exceptions:

- `ArgumentException`: The process specified by the `processId` parameter is not running. The identifier might be expired.

-or-

The `machineName` parameter syntax is invalid. The name might have length zero (0).
- `ArgumentNullException`: The `machineName` parameter is `null`.

#### Remarks
Use this method to create a new `Process` component and associate it with a process resource on a remote computer on the network. The process resource must already exist on the specified computer, because `GetProcessById` does not create a system resource, but rather associates a resource with an application-generated `Process` component. A process `Process.Id` can be retrieved only for a process that is currently running on the computer. After the process terminates, `GetProcessById` throws an exception if you pass it an expired identifier.

On any particular computer, the identifier of a process is unique. `GetProcessById` returns one process at most. If you want to get all the processes running a particular application, use `GetProcessesByName`. If multiple processes exist on the computer running the specified application, `GetProcessesByName` returns an array containing all the associated processes. You can query each of these processes in turn for its identifier. The process identifier can be viewed in the `Processes` panel of the Windows Task Manager. The `PID` column displays the process identifier that is assigned to a process.

If you do not specify a `machineName`, the local computer is used. Alternatively, you can specify the local computer by setting `machineName` to the value "." or to an empty string ("").

The `processId` parameter is an `Int32` (a 32-bit signed integer), although the underlying Windows API uses a `DWORD` (an unsigned 32-bit integer) for similar APIs. This is for historical reasons.

#### Examples
The following example retrieves information of the current process, processes running on the local computer, all instances of Notepad running on the local computer, and a specific process on the local computer. It then retrieves information for the same processes on a remote computer.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/GetCurrentProcess/processstaticget.cs._

## Process.GetProcesses() method

```csharp
public static System.Diagnostics.Process[] GetProcesses ();
```

Creates a new `Process` component for each process resource on the local computer.

Returns: An array of type `Process` that represents all the process resources running on the local computer.

#### Remarks
Use this method to create an array of new `Process` components and associate them with all the process resources on the local computer. The process resources must already exist on the local computer, because `Process.GetProcesses` does not create system resources but rather associates resources with application-generated `Process` components. Because the operating system itself is running background processes, this array is never empty.

If you do not want to retrieve all the processes running on the computer, you can restrict their number by using the `Process.GetProcessById` or `Process.GetProcessesByName` method. `Process.GetProcessById` creates a `Process` component that is associated with the process identified on the system by the process identifier that you pass to the method. `Process.GetProcessesByName` creates an array of `Process` components whose associated process resources share the executable file you pass to the method.

> **Note:**
> Multiple Windows services can be loaded within the same instance of the Service Host process (svchost.exe). GetProcesses does not identify those individual services; for that, see `ServiceController.GetServices`.

#### Examples
The following example retrieves information of the current process, processes running on the local computer, all instances of Notepad running on the local computer, and a specific process on the local computer. It then retrieves information for the same processes on a remote computer.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/GetCurrentProcess/processstaticget.cs._

## Process.GetProcesses(String) method

```csharp
public static System.Diagnostics.Process[] GetProcesses (string machineName);
```

Creates a new `Process` component for each process resource on the specified computer.

Parameters:

- `machineName`: The computer from which to read the list of processes.

Returns: An array of type `Process` that represents all the process resources running on the specified computer.

Exceptions:

- `ArgumentException`: The `machineName` parameter syntax is invalid. It might have length zero (0).
- `ArgumentNullException`: The `machineName` parameter is `null`.
- `PlatformNotSupportedException`: The operating system platform does not support this operation on remote computers.
- `Win32Exception`: A problem occurred accessing an underlying system API.

#### Remarks
Use this method to create an array of new `Process` components and associate them with all the process resources on the specified (usually remote) computer. The process resources must already exist on the local computer, because `Process.GetProcesses` does not create system resources but rather associates resources with application-generated `Process` components. Because the operating system itself is running background processes, this array is never empty.

If you do not want to retrieve all the processes running on the computer, you can restrict their number by using the `Process.GetProcessById` or `Process.GetProcessesByName` method. `Process.GetProcessById` creates a `Process` component that is associated with the process identified on the system by the process identifier that you pass to the method. `Process.GetProcessesByName` creates an array of `Process` components whose associated process resources share the executable file you pass to the method.

This overload of the `Process.GetProcesses` method is generally used to retrieve the list of process resources running on a remote computer on the network, but you can specify the local computer by passing ".".

> **Note:**
> Multiple Windows services can be loaded within the same instance of the Service Host process (svchost.exe). GetProcesses does not identify those individual services; for that, see `ServiceController.GetServices`.

#### Examples
The following example retrieves information of the current process, processes running on the local computer, all instances of Notepad running on the local computer, and a specific process on the local computer. It then retrieves information for the same processes on a remote computer.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/GetCurrentProcess/processstaticget.cs._

## Process.GetProcessesByName(String) method

```csharp
public static System.Diagnostics.Process[] GetProcessesByName (string? processName);
```

Creates an array of new `Process` components and associates them with all the process resources on the local computer that share the specified process name.

Parameters:

- `processName`: The friendly name of the process.

Returns: An array of type `Process` that represents the process resources running the specified application or file.

#### Remarks
Use this method to create an array of new `Process` components and associate them with all the process resources that are running the same executable file on the local computer. The process resources must already exist on the computer, because `Process.GetProcessesByName` does not create system resources but rather associates them with application-generated `Process` components. A `processName` can be specified for an executable file that is not currently running on the local computer, so the array the method returns can be empty.

The process name is a friendly name for the process, such as Outlook, that does not include the .exe extension or the path. `Process.GetProcessesByName` is helpful for getting and manipulating all the processes that are associated with the same executable file. For example, you can pass an executable file name as the `processName` parameter, in order to shut down all the running instances of that executable file.

Although a process `Process.Id` is unique to a single process resource on the system, multiple processes on the local computer can be running the application specified by the `processName` parameter. Therefore, `Process.GetProcessById` returns one process at most, but `Process.GetProcessesByName` returns an array containing all the associated processes. If you need to manipulate the process using standard API calls, you can query each of these processes in turn for its identifier. You cannot access process resources through the process name alone but, once you have retrieved an array of `Process` components that have been associated with the process resources, you can start, terminate, and otherwise manipulate the system resources.

#### Examples
The following example retrieves information of the current process, processes running on the local computer, all instances of Notepad running on the local computer, and a specific process on the local computer. It then retrieves information for the same processes on a remote computer.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/GetCurrentProcess/processstaticget.cs._

## Process.GetProcessesByName(String, String) method

```csharp
public static System.Diagnostics.Process[] GetProcessesByName (string? processName, string machineName);
```

Creates an array of new `Process` components and associates them with all the process resources on a remote computer that share the specified process name.

Parameters:

- `processName`: The friendly name of the process.
- `machineName`: The name of a computer on the network.

Returns: An array of type `Process` that represents the process resources running the specified application or file.

Exceptions:

- `ArgumentException`: The `machineName` parameter syntax is invalid. It might have length zero (0).
- `ArgumentNullException`: The `machineName` parameter is `null`.
- `PlatformNotSupportedException`: The operating system platform does not support this operation on remote computers.
- `InvalidOperationException`: The attempt to connect to `machineName` has failed.
- `Win32Exception`: A problem occurred accessing an underlying system API.

#### Remarks
Use this method to create an array of new `Process` components and associate them with all the process resources that are running the same executable file on the specified computer. The process resources must already exist on the computer, because `Process.GetProcessesByName` does not create system resources but rather associates them with application-generated `Process` components. A `processName` can be specified for an executable file that is not currently running on the local computer, so the array the method returns can be empty.

The process name is a friendly name for the process, such as Outlook, that does not include the .exe extension or the path. `Process.GetProcessesByName` is helpful for getting and manipulating all the processes that are associated with the same executable file. For example, you can pass an executable file name as the `processName` parameter, in order to shut down all the running instances of that executable file.

Although a process `Process.Id` is unique to a single process resource on the system, multiple processes on the local computer can be running the application specified by the `processName` parameter. Therefore, `Process.GetProcessById` returns one process at most, but `Process.GetProcessesByName` returns an array containing all the associated processes. If you need to manipulate the process using standard API calls, you can query each of these processes in turn for its identifier. You cannot access process resources through the process name alone but, once you have retrieved an array of `Process` components that have been associated with the process resources, you can start, terminate, and otherwise manipulate the system resources.

You can use this overload to get processes on the local computer as well as on a remote computer. Use "." to specify the local computer. Another overload exists that uses the local computer by default.

You can access processes on remote computers only to view information, such as statistics, about the processes. You cannot close, terminate (using `Process.Kill`), or start processes on remote computers.

#### Examples
The following example retrieves information of the current process, processes running on the local computer, all instances of Notepad running on the local computer, and a specific process on the local computer. It then retrieves information for the same processes on a remote computer.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Process/GetCurrentProcess/processstaticget.cs._

## Process.Kill() method

```csharp
public void Kill ();
```

Immediately stops the associated process.

Exceptions:

- `Win32Exception`: The associated process could not be terminated.
- `NotSupportedException`: You are attempting to call `Process.Kill` for a process that is running on a remote computer. The method is available only for processes running on the local computer.
- `InvalidOperationException`: There is no process associated with this `Process` object.

To be added.
