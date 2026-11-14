---
title: "TraceListener class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/TraceListener.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TraceListener class (part 2 of 2)

## TraceListener.TraceEvent(TraceEventCache, String, TraceEventType, Int32, String) method

```csharp
public virtual void TraceEvent (System.Diagnostics.TraceEventCache? eventCache, string source, System.Diagnostics.TraceEventType eventType, int id, string? message);
```

Writes trace information, a message, and event information to the listener specific output.

Parameters:

- `eventCache`: A `TraceEventCache` object that contains the current process ID, thread ID, and stack trace information.
- `source`: A name used to identify the output, typically the name of the application that generated the trace event.
- `eventType`: One of the `TraceEventType` values specifying the type of event that has caused the trace.
- `id`: A numeric identifier for the event.
- `message`: A message to write.

#### Remarks

> **Important:**
>  This method is not intended to be called directly by application code but by members of the `Debug`, `Trace`, and `TraceSource` classes to write trace data to output.

The default implementation writes the values of the `source`, `eventType` and `id` parameters as a header, followed by the `message` data. The `eventCache` data is written as a footer, the nature of the output data being dependent on the value of the `TraceOutputOptions` property.

## TraceListener.TraceEvent(TraceEventCache, String, TraceEventType, Int32, String, Object[]) method

```csharp
public virtual void TraceEvent (System.Diagnostics.TraceEventCache? eventCache, string source, System.Diagnostics.TraceEventType eventType, int id, string? format, params object?[]? args);
```

Writes trace information, a formatted array of objects and event information to the listener specific output.

Parameters:

- `eventCache`: A `TraceEventCache` object that contains the current process ID, thread ID, and stack trace information.
- `source`: A name used to identify the output, typically the name of the application that generated the trace event.
- `eventType`: One of the `TraceEventType` values specifying the type of event that has caused the trace.
- `id`: A numeric identifier for the event.
- `format`: A format string that contains zero or more format items, which correspond to objects in the `args` array.
- `args`: An `object` array containing zero or more objects to format.

#### Remarks

> **Important:**
>  This method is not intended to be called directly by application code but by members of the `Debug`, `Trace`, and `TraceSource` classes to write trace data to output.

The default implementation writes the values of the `source`, `eventType` and `id` parameters as a header. The `args` object array is converted to a string using the `String.Format` method, passing the `format` string and `args` array to format the string as the message portion of the trace. The `eventCache` data is written as a footer, the nature of the output data being dependent on the value of the `TraceOutputOptions` property.

## TraceListener.TraceTransfer(TraceEventCache, String, Int32, String, Guid) method

```csharp
public virtual void TraceTransfer (System.Diagnostics.TraceEventCache? eventCache, string source, int id, string? message, Guid relatedActivityId);
```

Writes trace information, a message, a related activity identity and event information to the listener specific output.

Parameters:

- `eventCache`: A `TraceEventCache` object that contains the current process ID, thread ID, and stack trace information.
- `source`: A name used to identify the output, typically the name of the application that generated the trace event.
- `id`: A numeric identifier for the event.
- `message`: A message to write.
- `relatedActivityId`: A `Guid` object identifying a related activity.

#### Remarks

> **Important:**
>  This method is not intended to be called directly by application code but by members of the `Debug`, `Trace`, and `TraceSource` classes to write trace data to output.

The `XmlWriterTraceListener.TraceTransfer` method is used for the correlation of related traces. The `TraceListener.TraceTransfer` method calls the `TraceListener.TraceEvent` method to process the call, with the eventType level set to `Transfer` and the `relatedActivityId` `Guid` as a string appended to the message.

## TraceListener.Write(Object) method

```csharp
public virtual void Write (object? o);
```

Writes the value of the object's `Object.ToString` method to the listener you create when you implement the `TraceListener` class.

Parameters:

- `o`: An `Object` whose fully qualified class name you want to write.

To be added.

## TraceListener.Write(String) method

```csharp
public abstract void Write (string? message);
```

When overridden in a derived class, writes the specified message to the listener you create in the derived class.

Parameters:

- `message`: A message to write.

To be added.

## TraceListener.Write(Object, String) method

```csharp
public virtual void Write (object? o, string? category);
```

Writes a category name and the value of the object's `Object.ToString` method to the listener you create when you implement the `TraceListener` class.

Parameters:

- `o`: An `Object` whose fully qualified class name you want to write.
- `category`: A category name used to organize the output.

To be added.

## TraceListener.Write(String, String) method

```csharp
public virtual void Write (string? message, string? category);
```

Writes a category name and a message to the listener you create when you implement the `TraceListener` class.

Parameters:

- `message`: A message to write.
- `category`: A category name used to organize the output.

To be added.

## TraceListener.WriteIndent() method

```csharp
protected virtual void WriteIndent ();
```

Writes the indent to the listener you create when you implement this class, and resets the `TraceListener.NeedIndent` property to `false`.

#### Remarks
This method writes the indent and resets the `NeedIndent` property to `false`. Call this method if `TraceListener.NeedIndent` is `true` when you are overriding the `TraceListener.Write` and `TraceListener.WriteLine` methods. By default, this method uses blank spaces for indentation. The size of the indent is determined by the values of the `TraceListener.IndentSize` and `TraceListener.IndentLevel` properties. The `IndentLevel` property represents the number of times the indent of the size specified by the `IndentSize` property is applied. This method is called by the `DefaultTraceListener` and `TextWriterTraceListener` classes.

## TraceListener.WriteLine(Object) method

```csharp
public virtual void WriteLine (object? o);
```

Writes the value of the object's `Object.ToString` method to the listener you create when you implement the `TraceListener` class, followed by a line terminator.

Parameters:

- `o`: An `Object` whose fully qualified class name you want to write.

#### Remarks
The typical line terminator you might implement is a carriage return followed by a line feed (\r\n).

## TraceListener.WriteLine(String) method

```csharp
public abstract void WriteLine (string? message);
```

When overridden in a derived class, writes a message to the listener you create in the derived class, followed by a line terminator.

Parameters:

- `message`: A message to write.

#### Remarks
The typical line terminator you might implement is a carriage return followed by a line feed (\r\n).

## TraceListener.WriteLine(Object, String) method

```csharp
public virtual void WriteLine (object? o, string? category);
```

Writes a category name and the value of the object's `Object.ToString` method to the listener you create when you implement the `TraceListener` class, followed by a line terminator.

Parameters:

- `o`: An `Object` whose fully qualified class name you want to write.
- `category`: A category name used to organize the output.

#### Remarks
The typical line terminator you might implement is a carriage return followed by a line feed (\r\n).

## TraceListener.WriteLine(String, String) method

```csharp
public virtual void WriteLine (string? message, string? category);
```

Writes a category name and a message to the listener you create when you implement the `TraceListener` class, followed by a line terminator.

Parameters:

- `message`: A message to write.
- `category`: A category name used to organize the output.

#### Remarks
The typical line terminator you might implement is a carriage return followed by a line feed (\r\n).
