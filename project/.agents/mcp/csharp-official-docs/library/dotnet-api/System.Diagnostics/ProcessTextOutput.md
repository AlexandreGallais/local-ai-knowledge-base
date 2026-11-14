---
title: "ProcessTextOutput class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ProcessTextOutput.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProcessTextOutput class

Namespace: `System.Diagnostics`

```csharp
public sealed class ProcessTextOutput
```

Represents the captured text output and exit status of a completed process.

To be added.

## ProcessTextOutput.ProcessTextOutput(ProcessExitStatus, String, String, Int32) constructor

```csharp
public ProcessTextOutput (System.Diagnostics.ProcessExitStatus exitStatus, string standardOutput, string standardError, int processId);
```

Initializes a new instance of the `ProcessTextOutput` class.

Parameters:

- `exitStatus`: The exit status of the process.
- `standardOutput`: The captured standard output text.
- `standardError`: The captured standard error text.
- `processId`: The process ID of the completed process.

Exceptions:

- `ArgumentNullException`: `exitStatus`, `standardOutput`, or `standardError` is `null`.

To be added.

## ProcessTextOutput.ExitStatus property

```csharp
public System.Diagnostics.ProcessExitStatus ExitStatus { get; }
```

Gets the exit status of the process.

Returns: The exit status of the process.

To be added.

## ProcessTextOutput.ProcessId property

```csharp
public int ProcessId { get; }
```

Gets the process ID of the completed process.

Returns: The process ID of the completed process.

To be added.

## ProcessTextOutput.StandardError property

```csharp
public string StandardError { get; }
```

Gets the captured standard error text of the process.

Returns: The captured standard error text of the process.

To be added.

## ProcessTextOutput.StandardOutput property

```csharp
public string StandardOutput { get; }
```

Gets the captured standard output text of the process.

Returns: The captured standard output text of the process.

To be added.
