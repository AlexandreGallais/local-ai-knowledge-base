---
title: "TraceOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/TraceOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TraceOptions enum

Namespace: `System.Diagnostics`

```csharp
public enum TraceOptions
```

Specifies trace data options to be written to the trace output.

#### Remarks
This enumeration is used by trace listeners to determine which options, or elements, should be included in the trace output. Trace listeners store the trace options in the `TraceOutputOptions` property.

The `TraceOptions` enumeration is not used by the following classes and methods:

- The `EventLogTraceListener` class, because it can cause a large volume of data to be written to the log.
- The `Write` and `WriteLine` methods of the `ConsoleTraceListener`, `DefaultTraceListener`, and `TextWriterTraceListener` classes.
- The `TraceListener.Write` and `TraceListener.WriteLine` methods of the `TraceListener` class when they are not overridden in a derived class.

#### Examples
The following code example shows the use of the `TraceOptions` enumeration to programmatically set the `TraceOutputOptions` property for a console trace listener. The console trace listener is one of the listeners enumerated in the `Listeners` property of a trace source. This code example is part of a larger example provided for the `TraceSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SwitchAttribute/Overview/program.cs._

## TraceOptions.Callstack field

```csharp
Callstack
```

Write the call stack, which is represented by the return value of the `Environment.StackTrace` property.

## TraceOptions.DateTime field

```csharp
DateTime
```

Write the date and time.

## TraceOptions.LogicalOperationStack field

```csharp
LogicalOperationStack
```

Write the logical operation stack, which is represented by the return value of the `CorrelationManager.LogicalOperationStack` property.

## TraceOptions.None field

```csharp
None
```

Do not write any elements.

## TraceOptions.ProcessId field

```csharp
ProcessId
```

Write the process identity, which is represented by the return value of the `Process.Id` property.

## TraceOptions.ThreadId field

```csharp
ThreadId
```

Write the thread identity, which is represented by the return value of the `Thread.ManagedThreadId` property for the current thread.

## TraceOptions.Timestamp field

```csharp
Timestamp
```

Write the timestamp, which is represented by the return value of the `Stopwatch.GetTimestamp` method.
