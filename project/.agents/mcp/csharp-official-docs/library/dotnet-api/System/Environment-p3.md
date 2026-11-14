---
title: "Environment class (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Environment.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Environment class (part 3 of 5)

## Environment.GetCommandLineArgs() method

```csharp
public static string[] GetCommandLineArgs ();
```

Returns a string array containing the command-line arguments for the current process.

Returns: An array of strings where each element contains a command-line argument. The first element is the executable file name, and the following zero or more elements contain the remaining command-line arguments.

Exceptions:

- `NotSupportedException`: The system does not support command-line arguments.

#### Remarks
The first element in the array contains the file name of the executing program. If the file name is not available, the first element is equal to `Empty`. The remaining elements contain any additional tokens entered on the command line.

For single-file publishing, the first element is the name of the host executable.

The program file name can, but is not required to, include path information.

Command line arguments are delimited by spaces. You can use double quotation marks (") to include spaces within an argument. The single quotation mark ('), however, does not provide this functionality.

If a double quotation mark follows two or an even number of backslashes, each proceeding backslash pair is replaced with one backslash and the double quotation mark is removed. If a double quotation mark follows an odd number of backslashes, including just one, each preceding pair is replaced with one backslash and the remaining backslash is removed; however, in this case the double quotation mark is not removed.

The following table shows how command line arguments can be delimited, and assumes `MyApp` as the current executing application.

|Input at the command line|Resulting command line arguments|
|-------------------------------|--------------------------------------|
|`MyApp alpha beta`|`MyApp, alpha, beta`|
|`MyApp "alpha with spaces" "beta with spaces"`|`MyApp, alpha with spaces, beta with spaces`|
|`MyApp 'alpha with spaces' beta`|`MyApp, 'alpha, with, spaces', beta`|
|`MyApp \\\alpha \\\\"beta`|`MyApp, \\\alpha, \\beta`|
|`MyApp \\\\\"alpha \"beta`|`MyApp, \\"alpha, "beta`|

To obtain the command line as a single string, use the `CommandLine` property.

#### Examples
The following example displays the application's command line arguments.

_Code sample not included: ~/snippets/csharp/System/Environment/GetCommandLineArgs/getcommandlineargs.cs._

## Environment.GetEnvironmentVariable(String) method

```csharp
public static string? GetEnvironmentVariable (string variable);
```

Retrieves the value of an environment variable from the current process.

Parameters:

- `variable`: The name of the environment variable.

Returns: The value of the environment variable specified by `variable`, or `null` if the environment variable is not found.

Exceptions:

- `ArgumentNullException`: `variable` is `null`.
- `SecurityException`: The caller does not have the required permission to perform this operation.

The `Environment.GetEnvironmentVariable` method retrieves the value of an environment variable from the current process.

Environment variable names are case-sensitive on Unix-like systems but aren't case-sensitive on Windows.

> **Note:**
> In-process environment modifications made by native libraries aren't seen by managed callers. Conversely, such modifications made by managed callers aren't seen by native libraries.

#### `GetEnvironmentVariable` method

The `GetEnvironmentVariable` method retrieves an environment variable from the environment block of the current process only. It's equivalent to calling the `GetEnvironmentVariable` method with a `target` value of `Process`.

To retrieve all environment variables along with their values, call the `Environment.GetEnvironmentVariables` method.

#### On Windows systems

On Windows systems, the environment block of the current process includes:

- All environment variables that are provided to it by the parent process that created it. For example, a .NET application launched from a console window inherits all of the console window's environment variables.

If there is no parent process, per-machine and per-user environment variables are used instead. For example, a new console window has all per-machine and per-user environment variables defined at the time it was launched.

- Any variables added to the process block while the process is running by calling either the `SetEnvironmentVariable` method or the `SetEnvironmentVariable` method with a `target` value of `Process`. These environment variables persist until the .NET application terminates.

If environment variables are created after the process has started, you can use this method to retrieve only those variables that were created by calling the `SetEnvironmentVariable` method or the `SetEnvironmentVariable` method with a `target` value of .`Process`.

#### On Unix-like systems

On Unix-like systems, the environment block of the current process includes the following environment variables:

- All environment variables that are provided to it by the parent process that created it. For .NET applications launched from a shell, this includes all environment variables defined in the shell.

- Any variables added to the process block while the process is running by calling either the `SetEnvironmentVariable` method or the `SetEnvironmentVariable` method with a `target` value of `Process`. These environment variables persist until the .NET application terminates.

.NET on Unix-like systems does not support per-machine or per-user environment variables.

#### `GetEnvironmentVariable` method

To retrieve all environment variables along with their values, call the `Environment.GetEnvironmentVariables` method.

#### On Windows systems

On Windows, the `target` parameter specifies whether the environment variable is retrieved from the current process or from the Windows operating system registry key for the current user or local machine. All per-user and per-machine environment variables are automatically copied into the environment block of the current process, as are any other environment variables that are available to the parent process that created the .NET process. However, environment variables added only to the environment block of the current process by calling either the `SetEnvironmentVariable` method or the `SetEnvironmentVariable` method with a `target` value of `Process` persist only for the duration of the process.

#### On Unix-like systems

On Unix-like systems, the `GetEnvironmentVariable(String, EnvironmentVariableTarget)` method supports a `target` value of `Process` only. Calls with a `target` value of `Machine` or `User` are not supported and return `null`.

Per-process environment variables are:

- Those inherited from the parent process, typically the shell used to invoke `dotnet.exe` or to launch the .NET application.

- Those defined by calling either the `SetEnvironmentVariable` method or the `SetEnvironmentVariable` method with a `target` value of `Process`. These environment variables persist only until the `dotnet` process or the .NET application terminates.

The following example uses the `Environment.GetEnvironmentVariable` method to retrieve the `windir` environment variable, which contains the path of the Windows directory.

_Code sample not included: ~/snippets/csharp/System/Environment/CurrentDirectory/Vars1.cs._

The following example attempts to retrieve the value of an environment variable named `Test1` from the process environment block. If the variable doesn't exist, the example creates it and retrieves its value. The example displays the value of the variable. If the example created the variable, it also calls the `GetEnvironmentVariables` method with each member of the `EnvironmentVariableTarget` enumeration to establish that the variable can be retrieved only from the current process environment block. Finally, if the example created the variable, it deletes it.

_Code sample not included: ~/snippets/csharp/System/Environment/GetEnvironmentVariable/getenvironmentvariableex1.cs._

## Environment.GetEnvironmentVariable(String, EnvironmentVariableTarget) method

```csharp
public static string? GetEnvironmentVariable (string variable, EnvironmentVariableTarget target);
```

Retrieves the value of an environment variable from the current process or from the Windows operating system registry key for the current user or local machine.

Parameters:

- `variable`: The name of an environment variable.
- `target`: One of the `EnvironmentVariableTarget` values. Only `EnvironmentVariableTarget.Process` is supported on .NET running on Unix-like systems.

Returns: The value of the environment variable specified by the `variable` and `target` parameters, or `null` if the environment variable is not found.

Exceptions:

- `ArgumentNullException`: `variable` is `null`.
- `ArgumentException`: `target` is not a valid `EnvironmentVariableTarget` value.
- `SecurityException`: The caller does not have the required permission to perform this operation.

The `Environment.GetEnvironmentVariable` method retrieves the value of an environment variable from the current process.

Environment variable names are case-sensitive on Unix-like systems but aren't case-sensitive on Windows.

> **Note:**
> In-process environment modifications made by native libraries aren't seen by managed callers. Conversely, such modifications made by managed callers aren't seen by native libraries.

#### `GetEnvironmentVariable` method

The `GetEnvironmentVariable` method retrieves an environment variable from the environment block of the current process only. It's equivalent to calling the `GetEnvironmentVariable` method with a `target` value of `Process`.

To retrieve all environment variables along with their values, call the `Environment.GetEnvironmentVariables` method.

#### On Windows systems

On Windows systems, the environment block of the current process includes:

- All environment variables that are provided to it by the parent process that created it. For example, a .NET application launched from a console window inherits all of the console window's environment variables.

If there is no parent process, per-machine and per-user environment variables are used instead. For example, a new console window has all per-machine and per-user environment variables defined at the time it was launched.

- Any variables added to the process block while the process is running by calling either the `SetEnvironmentVariable` method or the `SetEnvironmentVariable` method with a `target` value of `Process`. These environment variables persist until the .NET application terminates.

If environment variables are created after the process has started, you can use this method to retrieve only those variables that were created by calling the `SetEnvironmentVariable` method or the `SetEnvironmentVariable` method with a `target` value of .`Process`.

#### On Unix-like systems

On Unix-like systems, the environment block of the current process includes the following environment variables:

- All environment variables that are provided to it by the parent process that created it. For .NET applications launched from a shell, this includes all environment variables defined in the shell.

- Any variables added to the process block while the process is running by calling either the `SetEnvironmentVariable` method or the `SetEnvironmentVariable` method with a `target` value of `Process`. These environment variables persist until the .NET application terminates.

.NET on Unix-like systems does not support per-machine or per-user environment variables.

#### `GetEnvironmentVariable` method

To retrieve all environment variables along with their values, call the `Environment.GetEnvironmentVariables` method.

#### On Windows systems

On Windows, the `target` parameter specifies whether the environment variable is retrieved from the current process or from the Windows operating system registry key for the current user or local machine. All per-user and per-machine environment variables are automatically copied into the environment block of the current process, as are any other environment variables that are available to the parent process that created the .NET process. However, environment variables added only to the environment block of the current process by calling either the `SetEnvironmentVariable` method or the `SetEnvironmentVariable` method with a `target` value of `Process` persist only for the duration of the process.

#### On Unix-like systems

On Unix-like systems, the `GetEnvironmentVariable(String, EnvironmentVariableTarget)` method supports a `target` value of `Process` only. Calls with a `target` value of `Machine` or `User` are not supported and return `null`.

Per-process environment variables are:

- Those inherited from the parent process, typically the shell used to invoke `dotnet.exe` or to launch the .NET application.

- Those defined by calling either the `SetEnvironmentVariable` method or the `SetEnvironmentVariable` method with a `target` value of `Process`. These environment variables persist only until the `dotnet` process or the .NET application terminates.

The following example creates environment variables for the `Process`, `User`, and `Machine` targets, checks whether the operating system registry contains the user and machine environment variables, then deletes the environment variables. Because .NET on Unix-like systems does not support per-user and per-machine environment variables, only `SetEnvironmentVariable` and `SetEnvironmentVariable` with a value of `Process` successfully store an environment variable to the process environment block.

_Code sample not included: ~/snippets/csharp/System/Environment/GetEnvironmentVariable/gsev.cs._
