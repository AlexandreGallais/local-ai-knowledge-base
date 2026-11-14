---
title: "Debugger class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Debugger.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Debugger class

Namespace: `System.Diagnostics`

```csharp
public static class Debugger
```

Enables communication with a debugger. This class cannot be inherited.

To be added.

## Debugger.IsAttached property

```csharp
public static bool IsAttached { get; }
```

Gets a value that indicates whether a debugger is attached to the process.

Returns: `true` if a debugger is attached; otherwise, `false`.

To be added.

## Debugger.Break() method

```csharp
public static void Break ();
```

Signals a breakpoint to an attached debugger.

Exceptions:

- `SecurityException`: The `UIPermission` is not set to break into the debugger.

#### Remarks
If no debugger is attached, users are asked if they want to attach a debugger. If they choose yes, the debugger is started. If a debugger is attached, the debugger is signaled with a user breakpoint event, and the debugger suspends execution of the process just as if a debugger breakpoint had been hit.

> **Tip:**
> On Windows, the runtime reports an error to the Windows Error Reporting (WER) subsystem when this method is called. WER provides many settings to customize the problem reporting experience, so a lot of factors will influence the way WER responds to an error, such as operating system version, process, session, user, machine, and domain. If you're having unexpected results when calling the `Debugger.Break` method, check the WER settings. If you want to ensure the debugger is launched regardless of the WER settings, call the `Debugger.Launch` method instead.

#### Examples

The following code example demonstrates how to stop the debugger at the call to `Console.WriteLine`.

```vb
Debugger.Break()
Console.WriteLine("Hello, world.")
```

```csharp
Debugger.Break();
Console.WriteLine("Hello, world.");
```

## Debugger.BreakForUserUnhandledException(Exception) method

```csharp
public static void BreakForUserUnhandledException (Exception exception);
```

Signals a breakpoint to an attached debugger with the `exception` details if a .NET debugger is attached with break on user-unhandled exception enabled and a method attributed with DebuggerDisableUserUnhandledExceptionsAttribute calls this method.

Parameters:

- `exception`: The user-unhandled exception.

## Remarks
This API is designed to be used with `DebuggerDisableUserUnhandledExceptionsAttribute`. If a .NET debugger is attached and the debugger supports breaking on user-unhandled exceptions, this method signals a breakpoint to the debugger with the `exception` parameter.

## Debugger.IsLogging() method

```csharp
public static bool IsLogging ();
```

Checks to see if logging is enabled by an attached debugger.

Returns: `true` if a debugger is attached and logging is enabled; otherwise, `false`. The attached debugger is the registered managed debugger in the `DbgManagedDebugger` registry key. For more information on this key, see Enabling JIT-Attach Debugging.

To be added.

## Debugger.Launch() method

```csharp
public static bool Launch ();
```

Launches and attaches a debugger to the process.

Returns: `true` if the startup is successful or if the debugger is already attached; otherwise, `false`.

Exceptions:

- `SecurityException`: The `UIPermission` is not set to start the debugger.

#### Remarks
If a debugger is already attached, nothing happens.

Debugger launch is only supported on Windows. On Unix operating systems, the method returns `true` without launching a debugger.

## Debugger.Log(Int32, String, String) method

```csharp
public static void Log (int level, string? category, string? message);
```

Posts a message for the attached debugger.

Parameters:

- `level`: A description of the importance of the message.
- `category`: The category of the message.
- `message`: The message to show.

#### Remarks
If there is no debugger attached, this method has no effect. The debugger might or might not report the message, depending upon its settings.

> **Note:**
>  The category parameter is limited to 256 characters. Strings longer than 256 characters are truncated.

## Debugger.NotifyOfCrossThreadDependency() method

```csharp
public static void NotifyOfCrossThreadDependency ();
```

Notifies a debugger that execution is about to enter a path that involves a cross-thread dependency.

#### Remarks
Debuggers must specifically enable callbacks that they wish to receive. A debugger that wants to receive cross-thread dependency callbacks must call the ICorDebugProcess3::SetEnableCustomNotification method.

A debugger that has selected `Debugger.NotifyOfCrossThreadDependency` can take appropriate action upon notification. For example, performing a function evaluation typically requires freezing all threads except for the thread that is performing the evaluation. If the function evaluation requires execution on more than one thread, as might occur in remoting scenarios, the evaluation will block. The `Debugger.NotifyOfCrossThreadDependency` notification informs the debugger that it has to release a thread or abort the function evaluation. The notification is subject to collection after this method returns.

## Debugger.DefaultCategory field

```csharp
public static readonly string? DefaultCategory;
```

Represents the default category of message with a constant.

#### Remarks
The value of this default constant is `null`. `DefaultCategory` is used by `Debugger.Log`.
