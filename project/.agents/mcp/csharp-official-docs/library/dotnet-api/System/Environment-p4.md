---
title: "Environment class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Environment.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Environment class (part 4 of 5)

## Environment.GetEnvironmentVariables() method

```csharp
public static System.Collections.IDictionary GetEnvironmentVariables ();
```

Retrieves all environment variable names and their values from the current process.

Returns: A dictionary that contains all environment variable names and their values; otherwise, an empty dictionary if no environment variables are found.

Exceptions:

- `SecurityException`: The caller does not have the required permission to perform this operation.
- `OutOfMemoryException`: The buffer is out of memory.

#### Remarks

The names and values for the environment variables are stored as key-value pairs in the returned `IDictionary`.

#### On Windows systems

On Windows systems, the `GetEnvironmentVariables` method returns the following environment variables:

- All per-machine environment variables that are defined at the time the process is created, along with their values.
- All per-user environment variables that are defined at the time the process is created, along with their values.
- Any variables inherited from the parent process from which the .NET application was launched or added to the process block while the process is running. Environment variables are added while the process is running by calling either the `SetEnvironmentVariable` method or the `SetEnvironmentVariable` method with a `target` value of `Process`.

#### On Unix-like systems

On Unix-like systems, the `GetEnvironmentVariables` method retrieves the name and value of all environment variables that are inherited from the parent process that launched the `dotnet` process or that are defined within the scope of the `dotnet` process itself. Once the `dotnet` process ends, these latter environment variables cease to exist.

.NET running on Unix-like systems does not support per-machine or per-user environment variables.

> **Note:**
> On Unix-like systems, in-process environment modifications made by native libraries aren't seen by managed callers.

#### Examples

The following example demonstrates the `Environment.GetEnvironmentVariables` method.

_Code sample not included: ~/snippets/csharp/System/Environment/GetEnvironmentVariables/getenvironmentvariables.cs._

## Environment.GetEnvironmentVariables(EnvironmentVariableTarget) method

```csharp
public static System.Collections.IDictionary GetEnvironmentVariables (EnvironmentVariableTarget target);
```

Retrieves all environment variable names and their values from the current process, or from the Windows operating system registry key for the current user or local machine.

Parameters:

- `target`: One of the `EnvironmentVariableTarget` values. Only `EnvironmentVariableTarget.Process` is supported on .NET running on Unix-like systems.

Returns: A dictionary that contains all environment variable names and their values from the source specified by the `target` parameter; otherwise, an empty dictionary if no environment variables are found.

Exceptions:

- `SecurityException`: The caller does not have the required permission to perform this operation for the specified value of `target`.
- `ArgumentException`: `target` contains an illegal value.

#### Remarks

The names and values of the environment variables are stored as key/value pairs in the returned `IDictionary` object.

#### On Windows systems

On Windows systems, the `target` parameter specifies whether the source is the current process, the registry key for the current user, or the registry key for the local machine.

#### On Unix-like systems

On Unix-like systems, only a `target` value of `Process` is supported. Per-process environment variables are inherited from the parent process (typically the shell) used to launch the `dotnet` process or are defined within the scope of the `dotnet` process itself. Once the dotnet process ends, these latter environment variables cease to exist.

Per-machine and per-user environment variables aren't supported. A `target` value of `Machine` or `User` returns an empty array.

> **Note:**
> On Unix-like systems, in-process environment modifications made by native libraries aren't seen by managed callers.

#### Examples

The following example creates environment variables for the `Process`, `User`, and `Machine` targets, checks whether the operating system registry contains the user and machine environment variables, then deletes the environment variables. Because .NET on Unix-like systems does not support per-user and per-machine environment variables, only `SetEnvironmentVariable` and `SetEnvironmentVariable` with a value of `Process` successfully store an environment variable to the process environment block.

_Code sample not included: ~/snippets/csharp/System/Environment/GetEnvironmentVariable/gsev.cs._

## Environment.GetFolderPath(Environment+SpecialFolder) method

```csharp
public static string GetFolderPath (Environment.SpecialFolder folder);
```

Gets the path to the specified system special folder.

Parameters:

- `folder`: One of the enumeration values that identifies a system special folder.

Returns: The path to the specified system special folder, if that folder physically exists on your computer; otherwise, an empty string ("").

A folder will not physically exist if the operating system did not create it, the existing folder was deleted, or the folder is a virtual directory, such as My Computer, which does not correspond to a physical path.

Exceptions:

- `ArgumentException`: `folder` is not a member of `SpecialFolder`.
- `PlatformNotSupportedException`: The current platform is not supported.

#### Remarks
This method retrieves the path to a system special folder, such as Program Files, Programs, System, or Startup, which can be used to access common information. Special folders are set by default by the system, or explicitly by the user, when installing a version of Windows.

The `folder` parameter designates the special folder to retrieve and must be one of the values in the `SpecialFolder` enumeration; any other value throws an exception.

For more information about special folders, see Constant special item ID list (CSIDL).

#### Examples
The following example demonstrates how to use the `Environment.GetFolderPath` method to return and display the path associated with the `folder` parameter.

_Code sample not included: ~/snippets/csharp/System/Environment+SpecialFolder/Overview/getfolderpath.cs._

## Environment.GetFolderPath(Environment+SpecialFolder, Environment+SpecialFolderOption) method

```csharp
public static string GetFolderPath (Environment.SpecialFolder folder, Environment.SpecialFolderOption option);
```

Gets the path to the specified system special folder using a specified option for accessing special folders.

Parameters:

- `folder`: One of the enumeration values that identifies a system special folder.
- `option`: One of the enumeration values that specifies options to use for accessing a special folder.

Returns: The path to the specified system special folder, if that folder physically exists on your computer; otherwise, an empty string ("").

A folder will not physically exist if the operating system did not create it, the existing folder was deleted, or the folder is a virtual directory, such as My Computer, which does not correspond to a physical path.

Exceptions:

- `ArgumentException`: `folder` is not a member of `SpecialFolder`.

-or-

`option` is not a member of `SpecialFolderOption`.
- `PlatformNotSupportedException`: The current platform is not supported.

#### Remarks
This method retrieves the path to a system special folder, such as Program Files, Programs, System, or Startup, which can be used to access common information. Special folders are set by default by the system, or explicitly by the user, when installing a version of Windows.

The `folder` parameter designates the special folder to retrieve and must be one of the values in the `SpecialFolder` enumeration; any other value throws an exception.

For more information about special folders, see Constant special item ID list (CSIDL).

## Environment.GetLogicalDrives() method

```csharp
public static string[] GetLogicalDrives ();
```

Retrieves the names of the logical drives on this computer.

Returns: An array of strings representing the logical drive names.

Exceptions:

- `IOException`: An I/O error occurs.
- `SecurityException`: The caller does not have the required permissions.

#### Remarks
On Windows, `GetLogicalDrives` returns the names of all accessible drives on a particular machine, including any optical drives or removable media devices, in the form "\<drive letter\>:\\" (for example, "C:\\"). On Unix, it returns the paths of all filesystem mount points mounted on a particular machine (for example, "/home/user", "/media/usb").

#### Examples
The following example shows how to display the logical drives of the current computer using the `Environment.GetLogicalDrives` method.

_Code sample not included: ~/snippets/csharp/System/Environment/GetLogicalDrives/getlogicaldrives.cs._

## Environment.SetEnvironmentVariable(String, String) method

```csharp
public static void SetEnvironmentVariable (string variable, string? value);
```

Creates, modifies, or deletes an environment variable stored in the current process.

Parameters:

- `variable`: The name of an environment variable.
- `value`: A value to assign to `variable`.

Exceptions:

- `ArgumentNullException`: `variable` is `null`.
- `ArgumentException`: `variable` contains a zero-length string, an initial hexadecimal zero character (0x00), or an equal sign ("=").

-or-

The length of `variable` or `value` is greater than or equal to 32,767 characters.

-or-

An error occurred during the execution of this operation.
- `SecurityException`: The caller does not have the required permission to perform this operation.

#### Remarks

Calling this method is equivalent to calling the `SetEnvironmentVariable` overload with a value of `Process` for the `target` argument.

On Unix-like systems, calls to the `SetEnvironmentVariable` method have no effect on any native libraries that are, or will be, loaded. (Conversely, in-process environment modifications made by native libraries aren't seen by managed callers.)

If the `value` argument is not `null` and the environment variable named by the `variable` parameter doesn't exist, the environment variable is created and assigned the contents of `value`. If it does exist, its value is modified. Because the environment variable is defined in the environment block of the current process only, it does not persist after the process has ended.

If `variable` contains a non-initial hexadecimal zero character, the characters before the zero character are considered the environment variable name and all subsequent characters are ignored.

If `value` contains a non-initial hexadecimal zero character, the characters before the zero character are assigned to the environment variable and all subsequent characters are ignored.

If `value` is `null` (or empty in versions prior to .NET 9) and the environment variable named by `variable` exists, the environment variable is deleted. If `variable` doesn't exist, no error occurs even though the operation cannot be performed. `value` is considered empty under any of the following conditions:

- It is `Empty`.
- It consists of a single character whose value is U+0000.

#### Examples

The following example attempts to retrieve the value of an environment variable named `Test1` from the process environment block. If the variable doesn't exist, the example creates the variable and retrieves its value. The example displays the value of the variable. For .NET implementations running on Windows systems, it also calls the `GetEnvironmentVariables` method with each member of the `EnvironmentVariableTarget` enumeration to establish that the variable can be retrieved only from the current process environment block. (.NET implementations on Unix-like systems only support variables in the process environment block.) Finally, if the example created the variable, it deletes it.

_Code sample not included: ~/snippets/csharp/System/Environment/GetEnvironmentVariable/getenvironmentvariableex1.cs._
