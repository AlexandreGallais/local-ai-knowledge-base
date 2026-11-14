---
title: "DelimitedListTraceListener class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DelimitedListTraceListener.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DelimitedListTraceListener class

Namespace: `System.Diagnostics`

```csharp
public class DelimitedListTraceListener : System.Diagnostics.TextWriterTraceListener
```

Directs tracing or debugging output to a text writer, such as a stream writer, or to a stream, such as a file stream.

#### Remarks
The trace output is in a delimited text format that uses the delimiter specified by the `Delimiter` property. The delimiter is used to terminate each field in a line of output. For example, to display the trace output in a Microsoft Excel spreadsheet, you might specify a comma (",") as a delimiter and create a comma-separated value (CSV) file.

> **Important:**
> This type implements the `IDisposable` interface. When you have finished using the type, you should dispose of it either directly or indirectly. To dispose of the type directly, call its `IDisposable.Dispose` method in a `try`/`catch` block. To dispose of it indirectly, use a language construct such as `using` (in C#) or `Using` (in Visual Basic). For more information, see the "Using an Object that Implements IDisposable" section in the `IDisposable` interface docs.

> **Note:**
> The `DelimitedListTraceListener` delimits only text that is emitted by using the methods that have names starting with the word `Trace`, such as `DelimitedListTraceListener.TraceEvent` or `Trace.TraceWarning`. Trace data that is emitted by using the `Debug.Write` and `TextWriterTraceListener.WriteLine` methods is not delimited.

> **Note:**
> If you try to write to a file that is in use or unavailable, the file name is automatically prefixed by a GUID.

> **Note:**
> Listeners are intended to be used by methods of the `Debug`, `Trace`, and `TraceSource` classes to write trace information. Listener methods, except for constructors, should not be called directly from application code.

## DelimitedListTraceListener.DelimitedListTraceListener(Stream) constructor

```csharp
public DelimitedListTraceListener (System.IO.Stream stream);
```

Initializes a new instance of the `DelimitedListTraceListener` class that writes to the specified output stream.

Parameters:

- `stream`: The `Stream` to receive the output.

Exceptions:

- `ArgumentNullException`: `stream` is `null`.

#### Remarks
This constructor initializes the `Name` property to an empty string ("").

## DelimitedListTraceListener.DelimitedListTraceListener(TextWriter) constructor

```csharp
public DelimitedListTraceListener (System.IO.TextWriter writer);
```

Initializes a new instance of the `DelimitedListTraceListener` class that writes to the specified text writer.

Parameters:

- `writer`: The `TextWriter` to receive the output.

Exceptions:

- `ArgumentNullException`: `writer` is `null`.

#### Remarks
This constructor initializes the `Name` property to an empty string ("").

## DelimitedListTraceListener.DelimitedListTraceListener(String) constructor

```csharp
public DelimitedListTraceListener (string? fileName);
```

Initializes a new instance of the `DelimitedListTraceListener` class that writes to the specified file.

Parameters:

- `fileName`: The name of the file to receive the output.

Exceptions:

- `ArgumentNullException`: `fileName` is `null`.

#### Remarks
This constructor initializes the `Name` property to an empty string ("").

## DelimitedListTraceListener.DelimitedListTraceListener(Stream, String) constructor

```csharp
public DelimitedListTraceListener (System.IO.Stream stream, string? name);
```

Initializes a new instance of the `DelimitedListTraceListener` class that writes to the specified output stream and has the specified name.

Parameters:

- `stream`: The `Stream` to receive the output.
- `name`: The name of the new instance of the trace listener.

Exceptions:

- `ArgumentNullException`: `stream` is `null`.

#### Remarks
This constructor initializes the `Name` property to the value of the `name` parameter, or to an empty string ("") if the `name` parameter is `null`.  The `Name` property can be used as an index into the `Listeners` collection to programmatically change the properties for the listener. For example, the following code sets the `Delimiter` property for the instance of `DelimitedListTraceListener` that has the name "delimListener":

```csharp
((DelimitedListTraceListener)Trace.Listeners["delimListener"]).Delimiter = ":"
```

## DelimitedListTraceListener.DelimitedListTraceListener(TextWriter, String) constructor

```csharp
public DelimitedListTraceListener (System.IO.TextWriter writer, string? name);
```

Initializes a new instance of the `DelimitedListTraceListener` class that writes to the specified text writer and has the specified name.

Parameters:

- `writer`: The `TextWriter` to receive the output.
- `name`: The name of the new instance of the trace listener.

Exceptions:

- `ArgumentNullException`: `writer` is `null`.

#### Remarks
This constructor initializes the `Name` property to the value of the `name` parameter, or to an empty string ("") if the `name` parameter is `null`. The `Name` property can be used as an index into the `Listeners` collection to programmatically change the properties for the listener. For example the following code sets the `Delimiter` property for the instance of `DelimitedListTraceListener` that has the name "delimListener":

```csharp
((DelimitedListTraceListener)Trace.Listeners["delimListener"]).Delimiter = ":"
```

## DelimitedListTraceListener.DelimitedListTraceListener(String, String) constructor

```csharp
public DelimitedListTraceListener (string? fileName, string? name);
```

Initializes a new instance of the `DelimitedListTraceListener` class that writes to the specified file and has the specified name.

Parameters:

- `fileName`: The name of the file to receive the output.
- `name`: The name of the new instance of the trace listener.

Exceptions:

- `ArgumentNullException`: `fileName` is `null`.

#### Remarks
This constructor initializes a new instance of the `StreamWriter` class for the specified file on the specified path, using `Encoding.UTF8` encoding. If the file exists, it is appended to. If the file does not exist, a new file is created.

> **Note:**
> To reduce the chance of an exception, any character that might invalidate the output is replaced with a "?" character.

The `Name` property is set to the value of the `name` parameter, or to an empty string ("") if the `name` parameter is `null`. The `Name` property can be used as an index into the `Listeners` collection to programmatically change the properties for the listener. For example, the following code sets the `Delimiter` property for the instance of `DelimitedListTraceListener` that has the name "delimListener":

```csharp
((DelimitedListTraceListener)Trace.Listeners["delimListener"]).Delimiter = ":"
```

## DelimitedListTraceListener.Delimiter property

```csharp
public string Delimiter { get; set; }
```

Gets or sets the delimiter for the delimited list.

Returns: The delimiter for the delimited list.

Exceptions:

- `ArgumentNullException`: `DelimitedListTraceListener.Delimiter` is set to `null`.
- `ArgumentException`: `DelimitedListTraceListener.Delimiter` is set to an empty string ("").

The default delimiter is ";" (semicolon).

## DelimitedListTraceListener.GetSupportedAttributes() method

```csharp
protected override string[] GetSupportedAttributes ();
```

Returns the custom configuration file attribute supported by the delimited trace listener.

Returns: A string array that contains the single value "delimiter".

A custom attribute is an attribute that is not inherited from the base class that can be used to set a property for the class. The custom attribute for `DelimitedListTraceListener` is used to set the `Delimiter` property.

## DelimitedListTraceListener.TraceData(TraceEventCache, String, TraceEventType, Int32, Object) method

```csharp
public override void TraceData (System.Diagnostics.TraceEventCache? eventCache, string source, System.Diagnostics.TraceEventType eventType, int id, object? data);
```

Writes trace information, a data object, and event information to the output file or stream.

Parameters:

- `eventCache`: A `TraceEventCache` object that contains the current process ID, thread ID, and stack trace information.
- `source`: A name used to identify the output, typically the name of the application that generated the trace event.
- `eventType`: One of the `TraceEventType` values specifying the type of event that has caused the trace.
- `id`: A numeric identifier for the event.
- `data`: A data object to write to the output file or stream.

#### Remarks
The values of the `source`, `eventType`, and `id` parameters are written as a header. The data object is converted to a string using the `ToString` method of the object. The `eventCache` data is written as a footer whose content depends on the value of the `TraceOutputOptions` property.

> **Important:**
> The `DelimitedListTraceListener.TraceData` method is not intended to be called by application code. It is called by methods of the `Debug`, `Trace`, and `TraceSource` classes to write trace data.

## DelimitedListTraceListener.TraceData(TraceEventCache, String, TraceEventType, Int32, Object[]) method

```csharp
public override void TraceData (System.Diagnostics.TraceEventCache? eventCache, string source, System.Diagnostics.TraceEventType eventType, int id, params object?[]? data);
```

Writes trace information, an array of data objects, and event information to the output file or stream.

Parameters:

- `eventCache`: A `TraceEventCache` object that contains the current process ID, thread ID, and stack trace information.
- `source`: A name used to identify the output, typically the name of the application that generated the trace event.
- `eventType`: One of the `TraceEventType` values specifying the type of event that has caused the trace.
- `id`: A numeric identifier for the event.
- `data`: An array of data objects to write to the output file or stream.

#### Remarks
The values of the `source`, `eventType`, and `id` parameters are written as a header. The data objects are converted to strings using the `ToString` method of each object. The `eventCache` data is written as a footer whose content depends on the value of the `TraceOutputOptions` property.

> **Important:**
> The `DelimitedListTraceListener.TraceData` method is not intended to be called by application code. It is called by methods of the `Debug`, `Trace`, and `TraceSource` classes to write trace data.

## DelimitedListTraceListener.TraceEvent(TraceEventCache, String, TraceEventType, Int32, String) method

```csharp
public override void TraceEvent (System.Diagnostics.TraceEventCache? eventCache, string source, System.Diagnostics.TraceEventType eventType, int id, string? message);
```

Writes trace information, a message, and event information to the output file or stream.

Parameters:

- `eventCache`: A `TraceEventCache` object that contains the current process ID, thread ID, and stack trace information.
- `source`: A name used to identify the output, typically the name of the application that generated the trace event.
- `eventType`: One of the `TraceEventType` values specifying the type of event that has caused the trace.
- `id`: A numeric identifier for the event.
- `message`: The trace message to write to the output file or stream.

#### Remarks
The values of the `source`, `eventType`, and `id` parameters are written as a header, followed by the `message` data. The `eventCache` data is written as a footer whose content depends on the value of the `TraceOutputOptions` property.

> **Important:**
> The `DelimitedListTraceListener.TraceEvent` method is not intended to be called by application code. It is called by methods of the `Debug`, `Trace`, and `TraceSource` classes to write trace data.

## DelimitedListTraceListener.TraceEvent(TraceEventCache, String, TraceEventType, Int32, String, Object[]) method

```csharp
public override void TraceEvent (System.Diagnostics.TraceEventCache? eventCache, string source, System.Diagnostics.TraceEventType eventType, int id, string? format, params object?[]? args);
```

Writes trace information, a formatted array of objects, and event information to the output file or stream.

Parameters:

- `eventCache`: A `TraceEventCache` object that contains the current process ID, thread ID, and stack trace information.
- `source`: A name used to identify the output, typically the name of the application that generated the trace event.
- `eventType`: One of the `TraceEventType` values specifying the type of event that has caused the trace.
- `id`: A numeric identifier for the event.
- `format`: A format string that contains zero or more format items that correspond to objects in the `args` array.
- `args`: An array containing zero or more objects to format.

#### Remarks
The values of the `source`, `eventType`, and `id` parameters are written as a header. The `args` object array is converted to a string using the `Format` method, passing the `format` string and `args` array to format the string as the message portion of the trace. The `eventCache` data is written as a footer whose content depends on the value of the `TraceOutputOptions` property.

> **Important:**
> The `DelimitedListTraceListener.TraceEvent` method is not intended to be called by application code. It is called by methods of the `Debug`, `Trace`, and `TraceSource` classes to write trace data.
