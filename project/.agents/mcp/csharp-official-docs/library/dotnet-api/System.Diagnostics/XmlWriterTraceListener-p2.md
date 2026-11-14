---
title: "XmlWriterTraceListener class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/XmlWriterTraceListener.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlWriterTraceListener class (part 2 of 2)

## XmlWriterTraceListener.TraceEvent(TraceEventCache, String, TraceEventType, Int32, String, Object[]) method

```csharp
public override void TraceEvent (System.Diagnostics.TraceEventCache? eventCache, string source, System.Diagnostics.TraceEventType eventType, int id, string? format, params object?[]? args);
```

Writes trace information, a formatted message, and event information to the file or stream.

Parameters:

- `eventCache`: A `TraceEventCache` that contains the current process ID, thread ID, and stack trace information.
- `source`: The source name.
- `eventType`: One of the `TraceEventType` values.
- `id`: A numeric identifier for the event.
- `format`: A format string that contains zero or more format items that correspond to objects in the `args` array.
- `args`: An object array containing zero or more objects to format.

#### Remarks
The `eventCache`, `source`, `eventType`, and `id` parameters are used in the header and footer of the trace. The `id` parameter is converted to an unsigned integer before writing, so a negative `id` value is written as a large positive integer. The `Format` method is called, passing in the `format` string and `args` array as parameters, to format the `args` object array as the `Message` element.

> **Important:**
>  This method is not intended to be called directly by application code.  It is called by methods of the `Debug`, `Trace`, and `TraceSource` classes to write trace data.

## XmlWriterTraceListener.TraceTransfer(TraceEventCache, String, Int32, String, Guid) method

```csharp
public override void TraceTransfer (System.Diagnostics.TraceEventCache? eventCache, string source, int id, string? message, Guid relatedActivityId);
```

Writes trace information including the identity of a related activity, a message, and event information to the file or stream.

Parameters:

- `eventCache`: A `TraceEventCache` that contains the current process ID, thread ID, and stack trace information.
- `source`: The source name.
- `id`: A numeric identifier for the event.
- `message`: A trace message to write.
- `relatedActivityId`: A `Guid` structure that identifies a related activity.

#### Remarks
The `XmlWriterTraceListener.TraceTransfer` method is used for the correlation of related traces. The `eventCache`, `source`, `id`, and `relatedActivityId` parameters are used in the header and footer of the trace. The `id` parameter is converted to an unsigned integer before writing, so a negative `id` value is written as a large positive integer. The `message` parameter is written as the `Message` element. The `ToString` method is called to convert the `relatedActivityId`value to a "B" formatted string, which appears in the header. The `SubTypeName` element in the footer identifies the trace event type as a `Transfer`.

> **Important:**
>  The `XmlWriterTraceListener.TraceTransfer` method is not intended to be called by application code.  It is intended to be called by a `TraceSource` object to emit the trace information for its `TraceSource.TraceTransfer` method.

## XmlWriterTraceListener.Write(String) method

```csharp
public override void Write (string? message);
```

Writes a verbatim message without any additional context information to the file or stream.

Parameters:

- `message`: The message to write.

#### Remarks
Use the `XmlWriterTraceListener.TraceData` method to include context information in the log output.

## XmlWriterTraceListener.WriteLine(String) method

```csharp
public override void WriteLine (string? message);
```

Writes a verbatim message without any additional context information followed by the current line terminator to the file or stream.

Parameters:

- `message`: The message to write.

#### Remarks
Use the `XmlWriterTraceListener.TraceData` method to include context information in the log output.
