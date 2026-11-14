---
title: "TraceSource class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/TraceSource.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TraceSource class (part 2 of 2)

## TraceSource.TraceEvent(TraceEventType, Int32) method

```csharp
public void TraceEvent (System.Diagnostics.TraceEventType eventType, int id);
```

Writes a trace event message to the trace listeners in the `TraceSource.Listeners` collection using the specified event type and event identifier.

Parameters:

- `eventType`: One of the enumeration values that specifies the event type of the trace data.
- `id`: A numeric identifier for the event.

Exceptions:

- `ObjectDisposedException`: An attempt was made to trace an event during finalization.

#### Remarks
The `TraceSource.TraceEvent` method is intended to trace events that can be processed automatically by tools. For example, a monitoring tool can notify an administrator if a specific event is traced by a specific source.

The `TraceSource.TraceEvent` method calls the `SourceSwitch.ShouldTrace` method of the `SourceSwitch` object returned by the `Switch` property. If `SourceSwitch.ShouldTrace` returns `true`, `TraceSource.TraceEvent` calls the corresponding `TraceListener.TraceEvent` method of each listener. Otherwise, `TraceSource.TraceEvent` returns without calling the listeners' methods.

The trace content is listener specific. If the method is not overridden by the listener implementation, the default output is the name of the trace source, its numeric identity, and the event type.  Additional trace content is dependent upon the listener's `TraceOutputOptions` property value.

> **Note:**
>  The `EventLogTraceListener` object is limited to a maximum `id` value of 65,535. If the `id` value specified is greater than 65,535, the `EventLogTraceListener` uses 65,535.

#### Examples
The following code example shows the use of the `TraceEvent` method to pass a trace event to the listeners. This code example is part of a larger example provided for the `TraceSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SwitchAttribute/Overview/program.cs._

## TraceSource.TraceEvent(TraceEventType, Int32, String) method

```csharp
public void TraceEvent (System.Diagnostics.TraceEventType eventType, int id, string? message);
```

Writes a trace event message to the trace listeners in the `TraceSource.Listeners` collection using the specified event type, event identifier, and message.

Parameters:

- `eventType`: One of the enumeration values that specifies the event type of the trace data.
- `id`: A numeric identifier for the event.
- `message`: The trace message to write.

Exceptions:

- `ObjectDisposedException`: An attempt was made to trace an event during finalization.

#### Remarks
The `TraceSource.TraceEvent` method is intended to trace events that can be processed automatically by tools. For example, a monitoring tool can notify an administrator if a specific event is traced by a specific source.

The `TraceSource.TraceEvent` method calls the `SourceSwitch.ShouldTrace` method of the `SourceSwitch` object returned by the `Switch` property. If `SourceSwitch.ShouldTrace` returns `true`, `TraceSource.TraceEvent` calls the corresponding `TraceListener.TraceEvent` method of each listener. Otherwise, `TraceSource.TraceEvent` returns without calling the listeners' methods.

The trace content is listener specific. If the method is not overridden by the listener implementation, the default output is the name of the trace source, its numeric identity, the event type, and the message.  Additional trace content is dependent upon the listener's `TraceOutputOptions` property value.

> **Note:**
>  The `EventLogTraceListener` object is limited to a maximum `id` value of 65,535. If the `id` value specified is greater than 65,535, the `EventLogTraceListener` object uses 65,535.

#### Examples
The following code example shows the use of the `TraceEvent` method to pass a trace event to the listeners. This code example is part of a larger example provided for the `TraceSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SwitchAttribute/Overview/program.cs._

## TraceSource.TraceEvent(TraceEventType, Int32, String, Object[]) method

```csharp
public void TraceEvent (System.Diagnostics.TraceEventType eventType, int id, string? format, params object?[]? args);
```

Writes a trace event to the trace listeners in the `TraceSource.Listeners` collection using the specified event type, event identifier, and argument array and format.

Parameters:

- `eventType`: One of the enumeration values that specifies the event type of the trace data.
- `id`: A numeric identifier for the event.
- `format`: A composite format string that contains text intermixed with zero or more format items, which correspond to objects in the `args` array.
- `args`: An `object` array containing zero or more objects to format.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: `format` is invalid.

-or-

The number that indicates an argument to format is less than zero, or greater than or equal to the number of specified objects to format.
- `ObjectDisposedException`: An attempt was made to trace an event during finalization.

#### Remarks
For more information about the `format` parameter, see Composite Formatting.

The `TraceSource.TraceEvent` method is intended to trace events that can be processed automatically by tools. For example, a monitoring tool can notify an administrator if a specific event is traced by a specific source.

The `TraceSource.TraceEvent` method calls the `SourceSwitch.ShouldTrace` method of the `SourceSwitch` object returned by the `Switch` property. If `SourceSwitch.ShouldTrace` returns `true`, `TraceSource.TraceEvent` calls the corresponding `TraceListener.TraceEvent` method of each listener. Otherwise, `TraceSource.TraceEvent` returns without calling the listeners' methods.

The trace content is listener specific. The default `TraceEvent` method writes the source name, event type, and numeric identity in the trace header, then calls the `Format` method, passing the `format` string and `args` array and using the `InvariantCulture` property to format the string as the message output.

> **Note:**
>  The `EventLogTraceListener` object is limited to a maximum `id` value of 65,535. If the `id` value specified is greater than 65,535, the `EventLogTraceListener` object uses 65,535.

#### Examples
The following code example shows the use of the `TraceEvent` method to pass a trace event to the listeners. This code example is part of a larger example provided for the `TraceSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SwitchAttribute/Overview/program.cs._

## TraceSource.TraceInformation(String) method

```csharp
public void TraceInformation (string? message);
```

Writes an informational message to the trace listeners in the `TraceSource.Listeners` collection using the specified message.

Parameters:

- `message`: The informative message to write.

Exceptions:

- `ObjectDisposedException`: An attempt was made to trace an event during finalization.

#### Remarks
The `TraceSource.TraceInformation` method provides an informational message intended to be read by users and not by tools.

`TraceInformation` calls the `TraceEvent` method, setting `eventType` to `Information` and passing the informative message as the message string. The `TraceEvent` method in turn calls the `TraceEvent` method of each trace listener.

## TraceSource.TraceInformation(String, Object[]) method

```csharp
public void TraceInformation (string? format, params object?[]? args);
```

Writes an informational message to the trace listeners in the `TraceSource.Listeners` collection using the specified object array and formatting information.

Parameters:

- `format`: A composite format string that contains text intermixed with zero or more format items, which correspond to objects in the `args` array.
- `args`: An array containing zero or more objects to format.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: `format` is invalid.

-or-

The number that indicates an argument to format is less than zero, or greater than or equal to the number of specified objects to format.
- `ObjectDisposedException`: An attempt was made to trace an event during finalization.

#### Remarks
For more information about the `format` parameter, see Composite Formatting.

The `TraceSource.TraceInformation` method provides an informational message intended to be read by users and not by tools.

`TraceInformation` calls the `TraceEvent` method, setting `eventType` to `Information` and passing the message content as an object array with formatting information. The `TraceEvent` method in turn calls the `TraceEvent` method of each trace listener.

## TraceSource.TraceTransfer(Int32, String, Guid) method

```csharp
public void TraceTransfer (int id, string? message, Guid relatedActivityId);
```

Writes a trace transfer message to the trace listeners in the `TraceSource.Listeners` collection using the specified numeric identifier, message, and related activity identifier.

Parameters:

- `id`: A numeric identifier for the event.
- `message`: The trace message to write.
- `relatedActivityId`: A structure that identifies the related activity.

#### Remarks
The `TraceSource.TraceTransfer` method calls the `TraceListener.TraceTransfer` method of each trace listener in the `Listeners` property to write the trace information. The default `TraceListener.TraceTransfer` method in the base `TraceListener` class calls the `TraceEvent` method to process the call, setting `eventType` to `Transfer` and appending a string representation of the `relatedActivityId` GUID to `message`.

`TraceSource.TraceTransfer` is intended to be used with the logical operations of a `CorrelationManager`. The `relatedActivityId` parameter relates to the `ActivityId` property of a `CorrelationManager` object. If a logical operation begins in one activity and transfers to another, the second activity logs the transfer by calling the `TraceSource.TraceTransfer` method. The `TraceSource.TraceTransfer` call relates the new activity identity to the previous identity. The most likely consumer of this functionality is a trace viewer that can report logical operations that span multiple activities.

## TraceSource.Initializing event

```csharp
public static event EventHandler<System.Diagnostics.InitializingTraceSourceEventArgs>? Initializing;
```

Occurs when a `TraceSource` needs to be initialized.

To be added.
