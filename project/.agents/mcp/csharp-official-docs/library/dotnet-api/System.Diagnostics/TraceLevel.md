---
title: "TraceLevel enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/TraceLevel.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TraceLevel enum

Namespace: `System.Diagnostics`

```csharp
public enum TraceLevel
```

Specifies what messages to output for the `Debug`, `Trace` and `TraceSwitch` classes.

#### Remarks
This enumeration is used by the `TraceSwitch` class.

You must enable tracing or debugging to use a switch.

For more information on instrumenting your application, see `Debug` and `Trace`.

## TraceLevel.Error field

```csharp
Error
```

Output error-handling messages.

## TraceLevel.Info field

```csharp
Info
```

Output informational messages, warnings, and error-handling messages.

## TraceLevel.Off field

```csharp
Off
```

Output no tracing and debugging messages.

## TraceLevel.Verbose field

```csharp
Verbose
```

Output all debugging and tracing messages.

## TraceLevel.Warning field

```csharp
Warning
```

Output warnings and error-handling messages.
