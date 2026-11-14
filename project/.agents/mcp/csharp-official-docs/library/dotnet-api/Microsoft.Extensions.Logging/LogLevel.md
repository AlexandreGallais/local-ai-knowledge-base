---
title: "LogLevel enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/LogLevel.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LogLevel enum

Namespace: `Microsoft.Extensions.Logging`

```csharp
public enum LogLevel
```

Defines logging severity levels.

To be added.

## LogLevel.Critical field

```csharp
Critical
```

Logs that describe an unrecoverable application or system crash, or a catastrophic failure that requires
immediate attention.

## LogLevel.Debug field

```csharp
Debug
```

Logs that are used for interactive investigation during development.  These logs should primarily contain
information useful for debugging and have no long-term value.

## LogLevel.Error field

```csharp
Error
```

Logs that highlight when the current flow of execution is stopped due to a failure. These should indicate a
failure in the current activity, not an application-wide failure.

## LogLevel.Information field

```csharp
Information
```

Logs that track the general flow of the application. These logs should have long-term value.

## LogLevel.None field

```csharp
None
```

Not used for writing log messages. Specifies that a logging category should not write any messages.

## LogLevel.Trace field

```csharp
Trace
```

Logs that contain the most detailed messages. These messages may contain sensitive application data.
These messages are disabled by default and should never be enabled in a production environment.

## LogLevel.Warning field

```csharp
Warning
```

Logs that highlight an abnormal or unexpected event in the application flow, but do not otherwise cause the
application execution to stop.
