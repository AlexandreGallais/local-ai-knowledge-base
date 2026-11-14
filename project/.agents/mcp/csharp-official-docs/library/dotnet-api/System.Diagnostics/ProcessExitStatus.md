---
title: "ProcessExitStatus class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ProcessExitStatus.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProcessExitStatus class

Namespace: `System.Diagnostics`

```csharp
public sealed class ProcessExitStatus
```

Represents the exit status of a process.

To be added.

## ProcessExitStatus.ProcessExitStatus(Int32, Boolean, PosixSignal>) constructor

```csharp
public ProcessExitStatus (int exitCode, bool canceled, System.Runtime.InteropServices.PosixSignal? signal = default);
```

Initializes a new instance of the `ProcessExitStatus` class.

Parameters:

- `exitCode`: The exit code of the process.
- `canceled`: A value indicating whether the process has been terminated due to timeout or cancellation.
- `signal`: On Unix, the POSIX signal that terminated the process, or `null` if the process exited normally.

To be added.

## ProcessExitStatus.Canceled property

```csharp
public bool Canceled { get; }
```

Gets a value indicating whether the process has been terminated due to timeout or cancellation.

Returns: `true` if the process was terminated due to timeout or cancellation; otherwise, `false`.

To be added.

## ProcessExitStatus.ExitCode property

```csharp
public int ExitCode { get; }
```

Gets the exit code of the process.

Returns: The exit code of the process.

If the process was terminated by a signal on Unix, the exit code is 128 + the signal number. Use `Signal` to get the actual signal.

## ProcessExitStatus.Signal property

```csharp
public System.Runtime.InteropServices.PosixSignal? Signal { get; }
```

Gets the POSIX signal that terminated the process on Unix, or `null` if the process was not terminated by a signal.

Returns: The POSIX signal that terminated the process, or `null` if the process was not terminated by a signal.

On Unix, a process can be terminated by a signal (for example, SIGKILL or SIGTERM). When a signal terminates the process, the kernel reports "terminated by signal X" rather than an exit code. The `Signal` property captures that signal. When the process exits normally on Unix, or on Windows where POSIX signals don't apply, the property is `null`.
