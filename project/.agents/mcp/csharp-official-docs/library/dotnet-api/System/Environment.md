---
title: "Environment class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Environment.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Environment class

Namespace: `System`

```csharp
public static class Environment
```

Provides information about, and means to manipulate, the current environment and platform. This class cannot be inherited.

#### Remarks
Use the `Environment` class to retrieve information such as command-line arguments, the exit code, environment variable settings, contents of the call stack, time since last system boot, and the version of the common language runtime.

#### Examples
The following example displays a list of information about the current environment.

_Code sample not included: ~/snippets/csharp/System/Environment/Overview/env0.cs._

## Environment.CommandLine property

```csharp
public static string CommandLine { get; }
```

Gets the command line for this process.

Returns: A string containing command-line arguments.

#### Remarks
This property provides access to the program name and any arguments specified on the command line when the current process was started.

The program name can include path information, but is not required to do so. Use the `Environment.GetCommandLineArgs` method to retrieve the command-line information parsed and stored in an array of strings.

The maximum size of the command-line buffer is not set to a specific number of characters; it varies depending on the Windows operating system that is running on the computer.

#### Examples
The following example displays its own command line.

_Code sample not included: ~/snippets/csharp/System/Environment/CommandLine/commandline.cs._

## Environment.CpuUsage property

```csharp
public static Environment.ProcessCpuUsage CpuUsage { get; }
```

Get the CPU usage, including the process time spent running the application code, the process time spent running the operating system code, and the total time spent running both the application and operating system code.

Returns: To be added.

To be added.

## Environment.CurrentDirectory property

```csharp
public static string CurrentDirectory { get; set; }
```

Gets or sets the fully qualified path of the current working directory.

Returns: The directory path.

Exceptions:

- `ArgumentException`: Attempted to set to an empty string ("").
- `ArgumentNullException`: Attempted to set to `null`.
- `IOException`: An I/O error occurred.
- `DirectoryNotFoundException`: Attempted to set a local path that cannot be found.
- `SecurityException`: The caller does not have the appropriate permission.

#### Remarks
By definition, if this process starts in the root directory of a local or network drive, the value of this property is the drive name followed by a trailing slash (for example, "C:\\"). If this process starts in a subdirectory, the value of this property is the drive and subdirectory path, without a trailing slash (for example, "C:\mySubDirectory").

#### Examples
The following example demonstrates setting the `CurrentDirectory` property.

_Code sample not included: ~/snippets/csharp/System/Environment/CurrentDirectory/Vars1.cs._

## Environment.CurrentManagedThreadId property

```csharp
public static int CurrentManagedThreadId { get; }
```

Gets a unique identifier for the current managed thread.

Returns: A unique identifier for this managed thread.

To be added.

## Environment.ExitCode property

```csharp
public static int ExitCode { get; set; }
```

Gets or sets the exit code of the process.

Returns: A 32-bit signed integer containing the exit code. The default value is 0 (zero), which indicates that the process completed successfully.

#### Remarks
If the `Main` method returns `void`, you can use this property to set the exit code that will be returned to the calling environment. If `Main` does not return `void`, this property is ignored. The initial value of this property is zero.

> **Warning:**
>  The `ExitCode` property is a signed 32-bit integer. To prevent the property from returning a negative exit code, you should not use values greater than or equal to 0x80000000.

Use a non-zero number to indicate an error. In your application, you can define your own error codes in an enumeration, and return the appropriate error code based on the scenario. For example, return a value of 1 to indicate that the required file is not present and a value of 2 to indicate that the file is in the wrong format. For a list of exit codes used by the Windows operating system, see System Error Codes in the Windows documentation.

#### Examples
The following is a simple app named Double.exe that doubles an integer value passed to it as a command-line argument. The value assigns error codes to the `ExitCode` property to indicate error conditions.

_Code sample not included: ~/snippets/csharp/System/Environment/ExitCode/double.cs._

The example can then be invoked from a batch file such as the following, which makes its error codes accessible by using the `ERRORLEVEL` command.

```bat
@echo off
Double.exe %1
if errorlevel 1639 goto NoArg
if errorlevel 534 goto Overflow
if errorlevel 160 goto BadArg
if errorlevel 0 echo Completed Successfully
goto :EOF

:NoArg
echo Missing argument
goto :EOF

:Overflow
echo Arithmetic overflow
goto :EOF

:BadArg
echo Invalid argument
goto :EOF
```

The following shows some sample output produced by invoking the batch file.

```txt
>getdouble 123
Result: 246
Completed Successfully

>getdouble 5912323109093
Arithmetic overflow

>getdouble
Missing argument

>getdouble "a string"
Invalid argument
```

Note that code for Double.exe is identical in function to the following example, except that the former defines an entry point named `Main` that has no return value, whereas this example defines an entry point named `Main` that returns an integer.

_Code sample not included: ~/snippets/csharp/System/Environment/ExitCode/double1.cs._

## Environment.HasShutdownStarted property

```csharp
public static bool HasShutdownStarted { get; }
```

Gets a value that indicates whether the current application domain is being unloaded or the common language runtime (CLR) is shutting down.

Returns: `true` if the current application domain is being unloaded or the CLR is shutting down; otherwise, `false`.

#### Remarks

The `HasShutdownStarted` property returns `false` if the finalizer thread has not been started.

By using this property, you can determine whether to access static variables in your finalization code. If either an application domain or the CLR is shutting down, you cannot reliably access any object that has a finalization method and that is referenced by a static field. This is because these objects may have already been finalized.

## Environment.Is64BitOperatingSystem property

```csharp
public static bool Is64BitOperatingSystem { get; }
```

Gets a value that indicates whether the current operating system is a 64-bit operating system.

Returns: `true` if the operating system is 64-bit; otherwise, `false`.

To be added.

## Environment.Is64BitProcess property

```csharp
public static bool Is64BitProcess { get; }
```

Gets a value that indicates whether the current process is a 64-bit process.

Returns: `true` if the process is 64-bit; otherwise, `false`.

To be added.

## Environment.IsPrivilegedProcess property

```csharp
public static bool IsPrivilegedProcess { get; }
```

Gets a value that indicates whether the current process is authorized to perform security-relevant functions.

Returns: To be added.

To be added.

## Environment.MachineName property

```csharp
public static string MachineName { get; }
```

Gets the NetBIOS name of this local computer.

Returns: The name of this computer.

Exceptions:

- `InvalidOperationException`: The name of this computer cannot be obtained.

#### Remarks
The name of this computer is established at system startup when the name is read from the registry. If this computer is a node in a cluster, the name of the node is returned.

#### Examples
The following example displays the name of the computer that runs the code example. (The machine name is omitted from the example output for security reasons.)

_Code sample not included: ~/snippets/csharp/System/Environment/MachineName/machinename.cs._

## Environment.NewLine property

```csharp
public static string NewLine { get; }
```

Gets the newline string defined for this environment.

Returns: `\r\n` for non-Unix platforms, or `\n` for Unix platforms.

#### Remarks
The property value of `Environment.NewLine` is a constant customized specifically for the current platform and implementation of .NET. For more information about the escape characters in the property value, see Character Escapes.

The functionality provided by `Environment.NewLine` is often what is meant by the terms newline, line feed, line break, carriage return, CRLF, and end of line.

`Environment.NewLine` can be used in conjunction with language-specific newline support such as the escape characters '\r' and '\n' in Microsoft C# and C/C++, or `vbCrLf` in Microsoft Visual Basic.

`Environment.NewLine` is automatically appended to text processed by the `Console.WriteLine` and `StringBuilder.AppendLine` methods.

#### Examples
The following example displays two lines separated by a newline.

_Code sample not included: ~/snippets/csharp/System/Environment/NewLine/newline.cs._

## Environment.OSVersion property

```csharp
public static OperatingSystem OSVersion { get; }
```

Gets the current platform identifier and version number.

Returns: The platform identifier and version number.

Exceptions:

- `InvalidOperationException`: This property was unable to obtain the system version.

-or-

The obtained platform identifier is not a member of `PlatformID`

#### Remarks

`OSVersion` returns an OS version that may be incorrect when an application runs under Windows compatibility mode. For more information, see GetVersionExA function remarks.

`OSVersion` returns the actual OS version in compatibility modes specified by the application manifest. For more information, see Environment.OSVersion returns the correct operating system version.

To identify the operating system platform, for example, Linux or Windows, you can use the `RuntimeInformation.IsOSPlatform` method.

## Environment.ProcessId property

```csharp
public static int ProcessId { get; }
```

Gets the unique identifier for the current process.

Returns: A number that represents the unique identifier for the current process.

To be added.

## Environment.ProcessorCount property

```csharp
public static int ProcessorCount { get; }
```

Gets the number of processors available to the current process.

Returns: The 32-bit signed integer that specifies the number of processors that are available.

#### Remarks
On Linux, macOS, and Windows systems, this API returns the minimum of:
- The number of logical processors on the machine.
- If the process is running with CPU affinity, the number of processors that the process is affinitized to.
- If the process is running with a CPU utilization limit, the CPU utilization limit rounded up to the next whole number.

The value returned by this API is fixed at .NET runtime startup for the process lifetime. It does not reflect changes in the environment settings while the process is running.

For more information about processor groups and logical processors, see Processor Groups.

#### Examples
The following example demonstrates the `ProcessorCount` property.

_Code sample not included: ~/snippets/csharp/System/Environment/ProcessorCount/pc.cs._

## Environment.ProcessPath property

```csharp
public static string? ProcessPath { get; }
```

Returns the path of the executable that started the currently executing process. Returns `null` when the path is not available.

Returns: The path of the executable that started the currently executing process.

#### Remarks

If the executable is renamed or deleted before this property is first accessed, the return value is undefined and depends on the operating system.

## Environment.StackTrace property

```csharp
public static string StackTrace { get; }
```

Gets current stack trace information.

Returns: A string containing stack trace information. This value can be `String.Empty`.

#### Remarks
The `StackTrace` property lists method calls in reverse chronological order, that is, the most recent method call is described first, and one line of stack trace information is listed for each method call on the stack. However, the `StackTrace` property might not report as many method calls as expected due to code transformations that occur during optimization.

> **Note:**
>  For a hierarchical view of the stack trace information by class, use the `StackTrace` class.

The `StackTrace` property formats the stack trace information for each method call as follows:

"at `FullClassName`.`MethodName`(`MethodParams`) in `FileName` :line `LineNumber` "

The literal "at" is preceded by three spaces, and the entire substring starting with "in" is omitted if debug symbols are not available. The placeholders, `FullClassName`, `MethodName`, `MethodParams`, `FileName`, and `LineNumber`, are replaced by actual values, and are defined as follows:

`FullClassName`
The full name of the class, including the namespace.

`MethodName`
The name of the method.

`MethodParams`
The list of parameter type/name pairs. Each pair is separated by a comma (","). This information is omitted if `MethodName` takes no parameters.

`FileName`
The name of the source file where the `MethodName` method is declared. This information is omitted if debug symbols are not available.

`LineNumber`
The number of the line in `FileName` that contains the source code from `MethodName` for the instruction that is on the call stack. This information is omitted if debug symbols are not available.

The `Environment.NewLine` string terminates each line of the stack trace.

#### Examples
The following example demonstrates the `StackTrace` property.

_Code sample not included: ~/snippets/csharp/System/Environment/StackTrace/stacktrace.cs._

## Environment.SystemDirectory property

```csharp
public static string SystemDirectory { get; }
```

Gets the fully qualified path of the system directory.

Returns: A string containing a directory path.

#### Remarks
An example of the value returned is the string "C:\WINDOWS\System32".

#### Examples
The following example displays the system directory of the computer that runs the code example. (The system directory is omitted from the example output for security reasons.)

_Code sample not included: ~/snippets/csharp/System/Environment/SystemDirectory/systemdirectory.cs._

## Environment.SystemPageSize property

```csharp
public static int SystemPageSize { get; }
```

Gets the number of bytes in the operating system's memory page.

Returns: The number of bytes in the system memory page.

#### Remarks
This information can be useful when determining whether to use the `DelayAllocatePages` option when you work with memory-mapped files.

In Windows, this value is the `dwPageSize` member in the `SYSTEM_INFO` structure.
