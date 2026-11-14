---
title: "Environment class (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Environment.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Environment class (part 2 of 5)

## Environment.TickCount property

```csharp
public static int TickCount { get; }
```

Gets the number of milliseconds elapsed since the system started.

Returns: A 32-bit signed integer containing the amount of time in milliseconds that has passed since the last time the computer was started.

This property returns the truncated result of `TickCount64`. For version differences and information about update frequency, see the `TickCount64#remarks` remarks.

> **Important:**
> Because the value of the `TickCount` property value is a 32-bit signed integer, if the system runs continuously, `TickCount` increments from zero to `MaxValue` for approximately 24.9 days, then jumps to `MinValue`, which is a negative number, then increments back to zero during the next 24.9 days. You can work around this issue by casting the result of `TickCount` to `uint`. This works because `int` and `uint` are a two's complement representation. This workaround is valid on all platforms.

`TickCount` is different from the `Ticks` property, which is the number of 100-nanosecond intervals that have elapsed since 1/1/0001, 12:00am.

Use the `Now` property to obtain the current local date and time.

## Environment.TickCount64 property

```csharp
public static long TickCount64 { get; }
```

Gets the number of milliseconds elapsed since the system started.

Returns: The elapsed milliseconds since the system started.

The elapsed time excludes any non-awake time, such as time spent in sleep mode, hibernation mode, or other low-power states.

This value updates at the same frequency as the underlying interrupt timer for the system.

> **Note:**
> On Windows, in .NET 10 and earlier versions, the elapsed time **includes** non-awake time. In addition, the value updates at a fixed cadence of 10-16ms (typically 15.5ms).

## Environment.UserDomainName property

```csharp
public static string UserDomainName { get; }
```

Gets the network domain name associated with the current user.

Returns: The network domain name associated with the current user.

Exceptions:

- `PlatformNotSupportedException`: The operating system does not support retrieving the network domain name.
- `InvalidOperationException`: The network domain name cannot be retrieved.

#### Remarks
The domain account credentials for a user are formatted as the user's domain name, the '\\' character, and user name. Use the `UserDomainName` property to obtain the user's domain name without the user name, and the `UserName` property to obtain the user name without the domain name. For example, if a user's domain name and user name are CORPORATENETWORK\john, the `UserDomainName` property returns "CORPORATENETWORK".

The `UserDomainName` property first attempts to get the domain name component of the Windows account name for the current user. If that attempt fails, this property attempts to get the domain name associated with the user name provided by the `UserName` property. If that attempt fails because the host computer is not joined to a domain, then the host computer name is returned.

## Environment.UserInteractive property

```csharp
public static bool UserInteractive { get; }
```

Gets a value indicating whether the current process is running in user interactive mode.

Returns: `true` if the current process is running in user interactive mode; otherwise, `false`.

#### Remarks
The `UserInteractive` property reports `false` for a Windows process or a service like IIS that runs without a user interface. If this property is `false`, do not display modal dialogs or message boxes because there is no graphical user interface for the user to interact with.

#### Examples
The following example displays whether the current process is running in user interactive mode.

_Code sample not included: ~/snippets/csharp/System/Environment/UserInteractive/userinteractive.cs._

## Environment.UserName property

```csharp
public static string UserName { get; }
```

Gets the user name of the person who is associated with the current thread.

Returns: The user name of the person who is associated with the current thread.

#### Remarks
You can use the `UserName` property to identify the user on the current thread, to the system and application for security or access purposes. It can also be used to customize a particular application for each user.

On Windows the `UserName` property wraps a call to the Windows GetUserName function. The domain account credentials for a user are formatted as the user's domain name, the '\\' character, and user name. Use the `UserDomainName` property to obtain the user's domain name and the `UserName` property to obtain the user name.

On Unix platforms the `UserName` property wraps a call to the `getpwuid_r` function.

If an ASP.NET application runs in a development environment, the `UserName` property returns the name of the current user. In a published ASP.NET application, this property returns the name of the application pool account (such as Default AppPool).

#### Examples
The following example displays the user name of the person who started the current thread.

_Code sample not included: ~/snippets/csharp/System/Environment/UserName/username.cs._

## Environment.Version property

```csharp
public static Version Version { get; }
```

Gets a version consisting of the major, minor, build, and revision numbers of the common language runtime.

Returns: The version of the common language runtime.

#### Remarks

The `Version` property returns the .NET runtime version number.

#### Examples
The following example displays the version of the common language runtime.

_Code sample not included: ~/snippets/csharp/System/Environment/Version/version.cs._

## Environment.WorkingSet property

```csharp
public static long WorkingSet { get; }
```

Gets the amount of physical memory mapped to the process context.

Returns: A 64-bit signed integer containing the number of bytes of physical memory mapped to the process context.

#### Examples
The following example displays the size of the working set of the computer that runs the code example.

_Code sample not included: ~/snippets/csharp/System/Environment/WorkingSet/workingset.cs._

## Environment.Exit(Int32) method

```csharp
public static void Exit (int exitCode);
```

Terminates this process and returns an exit code to the operating system.

Parameters:

- `exitCode`: The exit code to return to the operating system. Use 0 (zero) to indicate that the process completed successfully.

Exceptions:

- `SecurityException`: The caller does not have sufficient security permission to perform this function.

#### Remarks
For the `exitCode` parameter, use a non-zero number to indicate an error. In your application, you can define your own error codes in an enumeration, and return the appropriate error code based on the scenario. For example, return a value of 1 to indicate that the required file is not present, and a value of 2 to indicate that the file is in the wrong format. For a list of exit codes used by the Windows operating system, see System Error Codes in the Windows documentation.

Calling the `Environment.Exit` method differs from using your programming language's `return` statement in the following ways:

- `Environment.Exit` always terminates an application. Using the `return` statement may terminate an application only if it is used in the application entry point, such as in the `Main` method.
- `Environment.Exit` terminates an application immediately, even if other threads are running. If the `return` statement is called in the application entry point, it causes an application to terminate only after all foreground threads have terminated.
- `Environment.Exit` requires the caller to have permission to call unmanaged code. The `return` statement does not.
- If `Environment.Exit` is called from a `try` or `catch` block, the code in any `finally` block does not execute. If the `return` statement is used, the code in the `finally` block does execute.

## Environment.ExpandEnvironmentVariables(String) method

```csharp
public static string ExpandEnvironmentVariables (string name);
```

Replaces the name of each environment variable embedded in the specified string with the string equivalent of the value of the variable, then returns the resulting string.

Parameters:

- `name`: A string containing the names of zero or more environment variables. Each environment variable is quoted with the percent sign character (%).

Returns: A string with each environment variable replaced by its value.

Exceptions:

- `ArgumentNullException`: `name` is `null`.

#### Remarks
COM interop is used to retrieve the environment variables from the operating system. If the environment variables cannot be retrieved due to a COM error, the HRESULT that explains the cause of the failure is used to generate one of several possible exceptions; that is, the exception depends on the HRESULT. For more information about how the HRESULT is processed, see the Remarks section of the `Marshal.ThrowExceptionForHR` method.

Replacement only occurs for environment variables that are set. For example, suppose `name` is "MyENV = %MyENV%". If the environment variable, MyENV, is set to 42, this method returns "MyENV = 42". If MyENV is not set, no change occurs; this method returns "MyENV = %MyENV%".

The size of the return value is limited to 32K.

#### Examples
The following example shows how to obtain the system drive and system root variables.

_Code sample not included: ~/snippets/csharp/System/Environment/ExpandEnvironmentVariables/expandenvironmentvariables.cs._

## Environment.FailFast(String) method

```csharp
public static void FailFast (string? message);
```

Immediately terminates the process before reporting an error message. For Windows, the error message is written to the Windows Application event log, and the message is included in error reporting to Microsoft. For Unix-like systems, the message, alongside the stack trace, is written to the standard error stream.

Parameters:

- `message`: A message that explains why the process was terminated, or `null` if no explanation is provided.

#### Remarks
This method terminates a process without running any active `try`/`finally` blocks or finalizers.

On Windows, the `Environment.FailFast` method writes the `message` string to the Windows Application event log, creates a dump of your application, and then terminates the current process. The `message` string is also included in error reporting to Microsoft via Windows Error Reporting. For more information, see Windows Error Reporting: Getting Started.

On Unix-like systems, the message is written to the standard error stream, alongside the stack trace information.

Use the `Environment.FailFast` method instead of the `Environment.Exit` method to terminate your application if the state of your application is damaged beyond repair, and executing your application's `try`/`finally` blocks and finalizers will corrupt program resources.

Calling the `Environment.FailFast` method to terminate execution of an application running in the Visual Studio debugger throws an `ExecutionEngineException` and automatically triggers the fatalExecutionEngineError managed debugging assistant (MDA).

#### Examples
The following example writes a log entry to the Windows Application event log when running under Windows, or writes the error message to the standard error stream when running under a Unix-like system, and terminates the current process.

_Code sample not included: ~/snippets/csharp/System/Environment/FailFast/ff.cs._

## Environment.FailFast(String, Exception) method

```csharp
public static void FailFast (string? message, Exception? exception);
```

Immediately terminates the process before reporting an error message. For Windows, the error message is written to the Windows Application event log, and the message and exception information is included in error reporting to Microsoft. For Unix-like systems, the message alongside the stack trace is written to the standard error stream.

Parameters:

- `message`: A message that explains why the process was terminated, or `null` if no explanation is provided.
- `exception`: An exception that represents the error that caused the termination. This is typically the exception in a `catch` block.

#### Remarks
This method terminates the process without running any active `try`/`finally` blocks or finalizers.

On Windows, the `Environment.FailFast` method writes the `message` string to the Windows Application event log, creates a dump of your application, and then terminates the current process.

Information is reported to Microsoft by using Windows Error Reporting. For more information, see Windows Error Reporting: Getting Started. Error reporting to Microsoft includes `message` and `exception` information, which provides details used to classify the error. Although `exception` is not handled because the process is terminated, the contextual information that raised the exception is still obtained.

On Unix-like systems, the message is written to the standard error stream, alongside the stack trace information.

If `exception` is `null`, or if `exception` is not thrown, this method operates the same as the `FailFast` method overload.

Use the `Environment.FailFast` method instead of the `Environment.Exit` method to terminate your application if the state of your application is damaged beyond repair, and executing your application's `try`/`finally` blocks and finalizers will corrupt program resources.

Calling the `Environment.FailFast` method to terminate execution of an application running in the Visual Studio debugger throws an `ExecutionEngineException` and automatically triggers the fatalExecutionEngineError managed debugging assistant (MDA).
