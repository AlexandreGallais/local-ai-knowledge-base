---
title: "XmlWriterTraceListener class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/XmlWriterTraceListener.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlWriterTraceListener class

Namespace: `System.Diagnostics`

```csharp
public class XmlWriterTraceListener : System.Diagnostics.TextWriterTraceListener
```

Directs tracing or debugging output as XML-encoded data to a `TextWriter` or to a `Stream`, such as a `FileStream`.

#### Remarks

The `XmlWriterTraceListener` class converts tracing and debugging information into an XML-encoded text stream. The description of the XML output is shown in the tables that follow. You can use the Service Trace Viewer Tool (SvcTraceViewer.exe) to display the XML output.

The `XmlWriterTraceListener` class inherits the `Filter` property from the base class `TraceListener`. The `Filter` property allows an additional level of trace output filtering at the listener. If there is a filter present, the `Trace` methods of the trace listener call the `TraceFilter.ShouldTrace` method of the filter to determine whether to emit the trace.

> **Note:**
>  If an attempt is made to write to a file that is in use or unavailable, the file name is automatically prefixed by a GUID.

> **Note:**
>  Listener methods are intended to be called by methods of the `Debug`, `Trace`, and `TraceSource` classes.  The listener methods are not intended to be called directly from application code. The `XmlWriterTraceListener` listener is primarily intended for use by the `TraceSource` class. The `XmlWriterTraceListener.Write` and `XmlWriterTraceListener.WriteLine` methods can be called by the `Trace` and `Debug` classes, and default values are provided for the XML elements that `Trace` and `Debug` do not supply values for.

The following table describes the elements and attributes of the XML output.

| Element | Attributes | Output | Notes |
|---------|------------|--------|-------|
|`CallStack`|None|Depends on the presence of the `Callstack` flag in the `TraceOutputOptions` property.|Special characters such as > or  The data output uses the `ToString` method of the passed-in data objects.|
|`EventID`|None|Always present.|Parameter input (`id`).|
|`Execution`|`ProcessName`|Always present.|From the `TraceEventCache`.|
||`ProcessID`|Always present.|From the `TraceEventCache`.|
||`ThreadID`|Always present.|From the `TraceEventCache`.|
|`Level`|None|Always present.|Parameter input (the numeric value of `eventType`). Parameter values greater than 255 are output as 255.|
|`LogicalOperationStack`|None|Depends on the presence of the `LogicalOperationStack` flag in the `TraceOutputOptions` property.|There can be more than one logical operation, so the values are written as `LogicalOperation` nodes under the `LogicalOperationStack` element.|
|`Message`|None|Depends on the presence of a message in the Trace method call.|This element is a formatted message if formatting arguments are provided.|
|`Source`|`Name`|Always present.|Parameter input.|
|`SubType`|`Name`|Always present.|Parameter input.|
|`TimeCreated`|`SystemTime`|Always present.|If not present in the `TraceEventCache`, the default is the current time.|
|`TimeStamp`|None|Depends on the presence of the `Timestamp` flag in the `TraceOutputOptions` property.|From the `TraceEventCache`.|
|`Type`|None|Always present.|Always the value 3.|

The following table shows the characters that are escaped in the XML output. Escaping occurs in all the elements and attributes with the exception of the `DataItem` element, which is not escaped if the object passed to the `data` parameter of the `XmlWriterTraceListener.TraceData` method is an `XPathNavigator` object. If an `XPathNavigator` is used for the data object, the `XPathNavigator.MoveToRoot` method is called and the entire root node is traced as unescaped data.

| Escaped character | Value  |
|-------------------|--------|
| &                 | &  |
| \<                | <   |
| >                 | >   |
| "                 | " |
| \                 | ' |
| 0xD               | &\#xD; |
| 0xA               | &\#xA; |

#### Examples
The following code example shows the use of the `XmlWriterTraceListener` class to write both escaped and non-escaped data to file logs.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/XmlWriterTraceListener/Overview/program.cs._

## XmlWriterTraceListener.XmlWriterTraceListener(Stream) constructor

```csharp
public XmlWriterTraceListener (System.IO.Stream stream);
```

Initializes a new instance of the `XmlWriterTraceListener` class, using the specified stream as the recipient of the debugging and tracing output.

Parameters:

- `stream`: A `Stream` that represents the stream the trace listener writes to.

Exceptions:

- `ArgumentNullException`: `stream` is `null`.

#### Remarks
The `Name` property is initialized to an empty string ("").

## XmlWriterTraceListener.XmlWriterTraceListener(TextWriter) constructor

```csharp
public XmlWriterTraceListener (System.IO.TextWriter writer);
```

Initializes a new instance of the `XmlWriterTraceListener` class using the specified writer as the recipient of the debugging and tracing output.

Parameters:

- `writer`: A `TextWriter` that receives the output from the trace listener.

Exceptions:

- `ArgumentNullException`: `writer` is `null`.

#### Remarks
The `Name` property is initialized to an empty string ("").

## XmlWriterTraceListener.XmlWriterTraceListener(String) constructor

```csharp
public XmlWriterTraceListener (string? filename);
```

Initializes a new instance of the `XmlWriterTraceListener` class, using the specified file as the recipient of the debugging and tracing output.

Parameters:

- `filename`: The name of the file to write to.

Exceptions:

- `ArgumentNullException`: `filename` is `null`.

#### Remarks
This constructor initializes a new instance of the `StreamWriter` class for the specified file on the specified path, using `Encoding.UTF8` encoding. If the file exists, it is appended to. If the file does not exist, a new file is created.

> **Note:**
>  To reduce the chance of an exception, any character that might invalidate the output is replaced with a "?" character.

The `Name` property is initialized to an empty string ("").

## XmlWriterTraceListener.XmlWriterTraceListener(Stream, String) constructor

```csharp
public XmlWriterTraceListener (System.IO.Stream stream, string? name);
```

Initializes a new instance of the `XmlWriterTraceListener` class with the specified name, using the specified stream as the recipient of the debugging and tracing output.

Parameters:

- `stream`: A `Stream` that represents the stream the trace listener writes to.
- `name`: The name of the new instance.

Exceptions:

- `ArgumentNullException`: `stream` is `null`.

#### Remarks
This constructor initializes the `Name` property to the `name` parameter value or to an empty string ("") if the `name` parameter is `null`. The name can be used as an index into the `Trace.Listeners` collection to programmatically change the properties for the listener. For example, the following code sets the `TraceOutputOptions` property for an instance of `XmlWriterTraceListener` whose `Name` property is "xmlListener".

```csharp
((XmlWriterTraceListener)Trace.Listeners["xmlListener"]).TraceOutputOptions =
    TraceOptions.Timestamp;
```

## XmlWriterTraceListener.XmlWriterTraceListener(TextWriter, String) constructor

```csharp
public XmlWriterTraceListener (System.IO.TextWriter writer, string? name);
```

Initializes a new instance of the `XmlWriterTraceListener` class with the specified name, using the specified writer as the recipient of the debugging and tracing output.

Parameters:

- `writer`: A `TextWriter` that receives the output from the trace listener.
- `name`: The name of the new instance.

Exceptions:

- `ArgumentNullException`: `writer` is `null`.

#### Remarks
This constructor initializes the `Name` property to the `name` parameter value or to an empty string ("") if the `name` parameter is `null`. The name can be used as an index into the `Trace.Listeners` collection to programmatically change the properties for the listener. For example, the following code sets the `TraceOutputOptions` property for an instance of `XmlWriterTraceListener` whose `Name` property is "xmlListener".

```csharp
((XmlWriterTraceListener)Trace.Listeners["xmlListener"]).TraceOutputOptions =
    TraceOptions.Timestamp;
```

## XmlWriterTraceListener.XmlWriterTraceListener(String, String) constructor

```csharp
public XmlWriterTraceListener (string? filename, string? name);
```

Initializes a new instance of the `XmlWriterTraceListener` class with the specified name, using the specified file as the recipient of the debugging and tracing output.

Parameters:

- `filename`: The name of the file to write to.
- `name`: The name of the new instance.

#### Remarks
This constructor initializes a new instance of the `StreamWriter` class for the specified file on the specified path, using `Encoding.UTF8` encoding. If the file exists, it is appended to. If the file does not exist, a new file is created.

> **Note:**
>  To reduce the chance of an exception, any character that might invalidate the output is replaced with a "?" character.

The `Name` property is set to the `name` parameter value or to an empty string ("") if the `name` parameter is `null`. The name can be used as an index into the `Trace.Listeners` collection to programmatically change the properties for the listener. For example, the following code sets the `TraceOutputOptions` property for an instance of `XmlWriterTraceListener` whose `Name` property is "xmlListener".

```csharp
((XmlWriterTraceListener)Trace.Listeners["xmlListener"]).TraceOutputOptions =
    TraceOptions.Timestamp;
```

## XmlWriterTraceListener.Close() method

```csharp
public override void Close ();
```

Closes the `TextWriterTraceListener.Writer` for this listener so that it no longer receives tracing or debugging output.

To be added.

## XmlWriterTraceListener.Fail(String, String) method

```csharp
public override void Fail (string? message, string? detailMessage);
```

Writes trace information including an error message and a detailed error message to the file or stream.

Parameters:

- `message`: The error message to write.
- `detailMessage`: The detailed error message to append to the error message.

#### Remarks
The default behavior is to display the message and detailed message in a message box when the application is running in user-interface mode, and to the `TraceListener` instances in the `Trace.Listeners` collection. By default, the collection contains an instance of `DefaultTraceListener`. You can customize this behavior by adding or removing a `TraceListener` from the collection.

## XmlWriterTraceListener.TraceData(TraceEventCache, String, TraceEventType, Int32, Object) method

```csharp
public override void TraceData (System.Diagnostics.TraceEventCache? eventCache, string source, System.Diagnostics.TraceEventType eventType, int id, object? data);
```

Writes trace information, a data object, and event information to the file or stream.

Parameters:

- `eventCache`: A `TraceEventCache` that contains the current process ID, thread ID, and stack trace information.
- `source`: The source name.
- `eventType`: One of the `TraceEventType` values.
- `id`: A numeric identifier for the event.
- `data`: A data object to emit.

#### Remarks
The `eventCache`, `source`, `eventType`, and `id` parameters are used in the header and footer of the trace. The `id` parameter is converted to an unsigned integer before writing, so a negative `id` value is written as a large positive integer. The `data` parameter is written as a `DataItem` node in the `TraceData` element. The `ToString` method of the data object is used to convert the object to a string.

> **Important:**
>  This method is not intended to be called directly by application code.  It is called by methods of the `Debug`, `Trace`, and `TraceSource` classes to write trace data.

## XmlWriterTraceListener.TraceData(TraceEventCache, String, TraceEventType, Int32, Object[]) method

```csharp
public override void TraceData (System.Diagnostics.TraceEventCache? eventCache, string source, System.Diagnostics.TraceEventType eventType, int id, params object?[]? data);
```

Writes trace information, data objects, and event information to the file or stream.

Parameters:

- `eventCache`: A `TraceEventCache` that contains the current process ID, thread ID, and stack trace information.
- `source`: The source name.
- `eventType`: One of the `TraceEventType` values.
- `id`: A numeric identifier for the event.
- `data`: An array of data objects to emit.

#### Remarks
The `eventCache`, `source`, `eventType`, and `id` parameters are used in the header and footer of the trace. The `id` parameter is converted to an unsigned integer before writing, so a negative `id` value is written as a large positive integer. The objects in the `data` parameter array are written as `DataItem` nodes in the `TraceData` element. The `ToString` method of each data object is used to convert the object to a string.

> **Important:**
>  This method is not intended to be called directly by application code.  It is called by methods of the `Debug`, `Trace`, and `TraceSource` classes to write trace data.

## XmlWriterTraceListener.TraceEvent(TraceEventCache, String, TraceEventType, Int32, String) method

```csharp
public override void TraceEvent (System.Diagnostics.TraceEventCache? eventCache, string source, System.Diagnostics.TraceEventType eventType, int id, string? message);
```

Writes trace information, a message, and event information to the file or stream.

Parameters:

- `eventCache`: A `TraceEventCache` that contains the current process ID, thread ID, and stack trace information.
- `source`: The source name.
- `eventType`: One of the `TraceEventType` values.
- `id`: A numeric identifier for the event.
- `message`: The message to write.

#### Remarks
The `eventCache`, `source`, `eventType`, and `id` parameters are used in the header and footer of the trace. The `id` parameter is converted to an unsigned integer before writing, so a negative `id` value is written as a large positive integer. The `message` parameter is written as the `Message` element.

> **Important:**
>  This method is not intended to be called directly by application code.  It is called by methods of the `Debug`, `Trace`, and `TraceSource` classes to write trace data.
