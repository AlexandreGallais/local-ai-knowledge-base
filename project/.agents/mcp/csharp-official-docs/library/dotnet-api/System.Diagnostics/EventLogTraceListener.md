---
title: "EventLogTraceListener class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventLogTraceListener.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventLogTraceListener class

Namespace: `System.Diagnostics`

```csharp
public sealed class EventLogTraceListener : System.Diagnostics.TraceListener
```

Provides a simple listener that directs tracing or debugging output to an `EventLog`.

#### Remarks
An instance of this `EventLogTraceListener` can be added to the `Debug.Listeners`, `Trace.Listeners`, or `TraceSource.Listeners` collections to send output from tracing or debugging to an `EventLog`.

> **Note:**
> If the `EventLog.Source` for the event log that's associated with the `EventLogTraceListener` instance does not exist, a new event source is created. To create an event source in Windows, you must have administrative privileges. You can elevate your privileges when you start an application by right-clicking the application icon and indicating that you want to run as an administrator.

The class provides the `EventLog` property to get or set the event log that receives the tracing or debugging output, and the `Name` property to hold the name of the `EventLogTraceListener`.

The `EventLogTraceListener.Close` method closes the event log so it no longer receives tracing or debugging output. The `EventLogTraceListener.Write` and `EventLogTraceListener.WriteLine` methods write a message to the event log.

> **Note:**
> To avoid the possibility of writing large amounts of data to the event log, the `EventLogTraceListener` does not output the optional trace data specified by the `TraceOutputOptions` property.

#### Examples
The following example creates a trace listener that sends output to an event log. First, the code creates a new `EventLogTraceListener` that uses the source `myEventLogSource`. Next, `myTraceListener` is added to the `Trace.Listeners` collection. Finally, the example sends a line of output to the `Trace.Listeners` object.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLogTraceListener/Overview/source.cs._

## EventLogTraceListener.EventLogTraceListener() constructor

```csharp
public EventLogTraceListener ();
```

Initializes a new instance of the `EventLogTraceListener` class without a trace listener.

To be added.

## EventLogTraceListener.EventLogTraceListener(EventLog) constructor

```csharp
public EventLogTraceListener (System.Diagnostics.EventLog? eventLog);
```

Initializes a new instance of the `EventLogTraceListener` class using the specified event log.

Parameters:

- `eventLog`: The event log to write to.

To be added.

## EventLogTraceListener.EventLogTraceListener(String) constructor

```csharp
public EventLogTraceListener (string source);
```

Initializes a new instance of the `EventLogTraceListener` class using the specified source.

Parameters:

- `source`: The name of an existing event log source.

To be added.

## EventLogTraceListener.EventLog property

```csharp
public System.Diagnostics.EventLog? EventLog { get; set; }
```

Gets or sets the event log to write to.

Returns: The event log to write to.

To be added.

## EventLogTraceListener.Name property

```csharp
public override string Name { get; set; }
```

Gets or sets the name of this `EventLogTraceListener`.

Returns: The name of this trace listener.

#### Remarks
This property defaults to the source name of the event log.

## EventLogTraceListener.Close() method

```csharp
public override void Close ();
```

Closes the event log so that it no longer receives tracing or debugging output.

To be added.

## EventLogTraceListener.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## EventLogTraceListener.TraceData(TraceEventCache, String, TraceEventType, Int32, Object) method

```csharp
public override void TraceData (System.Diagnostics.TraceEventCache? eventCache, string source, System.Diagnostics.TraceEventType severity, int id, object? data);
```

Writes trace information, a data object, and event information to the event log.

Parameters:

- `eventCache`: An object that contains the current process ID, thread ID, and stack trace information.
- `source`: A name used to identify the output; typically the name of the application that generated the trace event.
- `severity`: One of the enumeration values that specifies the type of event that has caused the trace.
- `id`: A numeric identifier for the event. The combination of `source` and `id` uniquely identifies an event.
- `data`: A data object to write to the output file or stream.

Exceptions:

- `ArgumentException`: `source` is not specified.

-or-

The log entry string exceeds 32,766 characters.

#### Remarks

> **Important:**
>  The `EventLogTraceListener.TraceData` methods are not intended to be called by application code. They are called by methods of the `Debug`, `Trace`, and `TraceSource` classes to output trace data.

The `EventLogTraceListener.TraceData` method, like the `EventLogTraceListener.TraceEvent` method is intended for automated tools but also allows the attaching of additional objects, for example an exception instance, to the trace.

The `eventCache` and `source` parameters are used to determine if the event should be traced. `id` is used to create an `EventInstance` object and the `TraceEventType` is equated to an `EventLogEntryType` for the `EntryType` property. The `EventInstance` is written to the event log with the `data` object, formatted as a string, using the `EventLog.WriteEvent` method.

> **Note:**
>  The maximum value of the `id` parameter is 65,535. If the `id` value specified is greater than 65,535, the maximum value is used.

## EventLogTraceListener.TraceData(TraceEventCache, String, TraceEventType, Int32, Object[]) method

```csharp
public override void TraceData (System.Diagnostics.TraceEventCache? eventCache, string source, System.Diagnostics.TraceEventType severity, int id, params object?[]? data);
```

Writes trace information, an array of data objects, and event information to the event log.

Parameters:

- `eventCache`: An object that contains the current process ID, thread ID, and stack trace information.
- `source`: A name used to identify the output; typically the name of the application that generated the trace event.
- `severity`: One of the enumeration values that specifies the type of event that has caused the trace.
- `id`: A numeric identifier for the event. The combination of `source` and `id` uniquely identifies an event.
- `data`: An array of data objects.

Exceptions:

- `ArgumentException`: `source` is not specified.

-or-

The log entry string exceeds 32,766 characters.

#### Remarks

> **Important:**
>  The `EventLogTraceListener.TraceData` methods are not intended to be called by application code. They are called by methods of the `Debug`, `Trace`, and `TraceSource` classes to output trace data.

The `EventLogTraceListener.TraceData` method, like the `EventLogTraceListener.TraceEvent` method is intended for automated tools but also allows the attaching of additional objects, for example an exception instance, to the trace.

The `severity` and `id` parameter data is used to create an `EventInstance` object, which is written to the event log with the data from the array of data objects.

The `eventCache` and `source` parameters are used to determine if the event should be traced. `id` is used to create an `EventInstance` object and the `TraceEventType` is equated to an `EventLogEntryType` for the `EntryType` property. The `EventInstance` is written to the event log with the `data` object array, formatted as a string array, using the `EventLog.WriteEvent` method.

> **Note:**
>  The maximum value of the `id` parameter is 65,535. If the `id` value specified is greater than 65,535, the maximum value is used.

## EventLogTraceListener.TraceEvent(TraceEventCache, String, TraceEventType, Int32, String) method

```csharp
public override void TraceEvent (System.Diagnostics.TraceEventCache? eventCache, string source, System.Diagnostics.TraceEventType severity, int id, string? message);
```

Writes trace information, a message, and event information to the event log.

Parameters:

- `eventCache`: An object that contains the current process ID, thread ID, and stack trace information.
- `source`: A name used to identify the output; typically the name of the application that generated the trace event.
- `severity`: One of the enumeration values that specifies the type of event that has caused the trace.
- `id`: A numeric identifier for the event. The combination of `source` and `id` uniquely identifies an event.
- `message`: The trace message.

Exceptions:

- `ArgumentException`: `source` is not specified.

-or-

The log entry string exceeds 32,766 characters.

#### Remarks

> **Important:**
>  The `EventLogTraceListener.TraceEvent` methods are not intended to be called by application code. These methods are called by methods of the `Debug`, `Trace`, and `TraceSource` classes to write trace data.

The `EventLogTraceListener.TraceEvent` method is intended to trace events that can be processed automatically by tools. For example a monitoring tool can notify an administrator if a specific event is traced by a specific source.

The `eventCache` and `source` parameters are used to determine if the event should be traced. `id` is used to create an `EventInstance` object and the `TraceEventType` is equated to an `EventLogEntryType` for the `EntryType` property. The `EventInstance` is written to the event log with the `message` data using the `EventLog.WriteEvent` method.

> **Note:**
>  The maximum value of the `id` parameter is 65,535. If the `id` value specified is greater than 65,535, the maximum value is used.

## EventLogTraceListener.TraceEvent(TraceEventCache, String, TraceEventType, Int32, String, Object[]) method

```csharp
public override void TraceEvent (System.Diagnostics.TraceEventCache? eventCache, string source, System.Diagnostics.TraceEventType severity, int id, string? format, params object?[]? args);
```

Writes trace information, a formatted array of objects, and event information to the event log.

Parameters:

- `eventCache`: An object that contains the current process ID, thread ID, and stack trace information.
- `source`: A name used to identify the output; typically the name of the application that generated the trace event.
- `severity`: One of the enumeration values that specifies the type of event that has caused the trace.
- `id`: A numeric identifier for the event. The combination of `source` and `id` uniquely identifies an event.
- `format`: A format string that contains zero or more format items that correspond to objects in the `args` array.
- `args`: An `object` array containing zero or more objects to format.

Exceptions:

- `ArgumentException`: `source` is not specified.

-or-

The log entry string exceeds 32,766 characters.

#### Remarks

> **Important:**
>  The `EventLogTraceListener.TraceEvent` methods are not intended to be called by application code. These methods are called by methods of the `Debug`, `Trace`, and `TraceSource` classes to write trace data.

The `EventLogTraceListener.TraceEvent` method is intended to trace events that can be processed automatically by tools. For example a monitoring tool can notify an administrator if a specific event is traced by a specific source.

The `eventCache` and `source` parameters are used to determine if the event should be traced. `id` is used to create an `EventInstance` object and the `TraceEventType` is equated to an `EventLogEntryType` for the `EntryType` property. The `EventInstance` is written to the event log, using the `EventLog.WriteEvent` method, with the message obtained from the `format` and `args` parameters. The `args` object array is converted to a string using the `String.Format` method, passing the `format` string and `args` array to format the string as the message for the event log.

> **Note:**
>  The maximum value of the `id` parameter is 65,535. If the `id` value specified is greater than 65,535, the maximum value is used.

## EventLogTraceListener.Write(String) method

```csharp
public override void Write (string? message);
```

Writes a message to the event log for this instance.

Parameters:

- `message`: The message to write.

Exceptions:

- `ArgumentException`: `message` exceeds 32,766 characters.

To be added.

## EventLogTraceListener.WriteLine(String) method

```csharp
public override void WriteLine (string? message);
```

Writes a message to the event log for this instance.

Parameters:

- `message`: The message to write.

Exceptions:

- `ArgumentException`: `message` exceeds 32,766 characters.

To be added.
