---
title: "TraceListener class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/TraceListener.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TraceListener class

Namespace: `System.Diagnostics`

```csharp
public abstract class TraceListener : MarshalByRefObject, IDisposable
```

Provides the `abstract` base class for the listeners who monitor trace and debug output.

#### Remarks
For examples of how to implement a `TraceListener`, see the `DefaultTraceListener`, `TextWriterTraceListener` and the `EventLogTraceListener` classes.

You must enable tracing or debugging to use a trace listener.

## TraceListener.TraceListener() constructor

```csharp
protected TraceListener ();
```

Initializes a new instance of the `TraceListener` class.

#### Remarks
The following table shows initial property values for an instance of `TraceListener`.

|Property|Default Value|
|--------------|-------------------|
|Name|The empty string ("").|
|Indent|Zero.|
|IndentSize|Four spaces.|

## TraceListener.TraceListener(String) constructor

```csharp
protected TraceListener (string? name);
```

Initializes a new instance of the `TraceListener` class using the specified name as the listener.

Parameters:

- `name`: The name of the `TraceListener`.

To be added.

## TraceListener.Attributes property

```csharp
public System.Collections.Specialized.StringDictionary Attributes { get; }
```

Gets the custom trace listener attributes defined in the application configuration file.

Returns: A `StringDictionary` containing the custom attributes for the trace listener.

#### Remarks
Classes that inherit from the `TraceListener` class can add custom attributes by overriding the `TraceListener.GetSupportedAttributes` method and returning a string array of custom attribute names. The `Attributes` property identifies the custom attributes that are referenced in the application's configuration file. For example, in the following configuration file excerpt the `DelimitedListTraceListener` custom attribute "delimiter" is referenced. In this case, the `Attributes` property returns a `StringDictionary` containing the string "delimiter".

```xml
<listeners>
  
  
</listeners>
```

Unreferenced custom attributes are not enumerated.  For more information, see the `TraceListener.GetSupportedAttributes` method.

## TraceListener.Filter property

```csharp
public System.Diagnostics.TraceFilter? Filter { get; set; }
```

Gets or sets the trace filter for the trace listener.

Returns: An object derived from the `TraceFilter` base class.

#### Remarks
A trace filter can be added to a trace listener to provide a layer of screening beyond that provided to the trace source by switches. For example, the `EventTypeFilter` can be added to a trace listener to control the event types that are output by the listener.  Listeners that are called because the switch criteria are met can query their filter, if present, to determine if a trace is to be sent to output.

#### Examples
The following code example shows how to use the `Filter` property to add a source filter to a console trace listener. This code example is part of a larger example provided for the `TraceSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SwitchAttribute/Overview/program.cs._

## TraceListener.IndentLevel property

```csharp
public int IndentLevel { get; set; }
```

Gets or sets the indent level.

Returns: The indent level. The default is zero.

#### Remarks
The `IndentLevel` property represents the number of times that the indent specified by the `IndentSize` property is applied. This property is stored on per-thread/per-request basis.

## TraceListener.IndentSize property

```csharp
public int IndentSize { get; set; }
```

Gets or sets the number of spaces in an indent.

Returns: The number of spaces in an indent. The default is four spaces.

Exceptions:

- `ArgumentOutOfRangeException`: Set operation failed because the value is less than zero.

#### Remarks
The property is stored on per-thread/per-request basis.

## TraceListener.IsThreadSafe property

```csharp
public virtual bool IsThreadSafe { get; }
```

Gets a value indicating whether the trace listener is thread safe.

Returns: `true` if the trace listener is thread safe; otherwise, `false`. The default is `false`.

#### Remarks
The value of `TraceListener.IsThreadSafe` is used to determine whether to use a global lock when writing to the listener. If the value of `TraceListener.IsThreadSafe` is `false`, the global lock is used regardless of the value of `Trace.UseGlobalLock`. The global lock is not used only if the value of `TraceListener.IsThreadSafe` is `true` and the value of `Trace.UseGlobalLock` is `false`. The default behavior is to use the global lock whenever writing to the listener.

## TraceListener.Name property

```csharp
public virtual string Name { get; set; }
```

Gets or sets a name for this `TraceListener`.

Returns: A name for this `TraceListener`. The default is an empty string ("").

#### Remarks
The name can be used to organize and access listeners in a `TraceListenerCollection` collection.

## TraceListener.NeedIndent property

```csharp
protected bool NeedIndent { get; set; }
```

Gets or sets a value indicating whether to indent the output.

Returns: `true` if the output should be indented; otherwise, `false`.

#### Remarks
**Note** The `TraceListener.WriteIndent` method, called by the `DefaultTraceListener` and `TextWriterTraceListener` classes, sets the `NeedIndent` property value to `false` to prevent later, unnecessary indents. You must set the `NeedIndent` property to `true` each time you wish to indent trace output.

## TraceListener.TraceOutputOptions property

```csharp
public System.Diagnostics.TraceOptions TraceOutputOptions { get; set; }
```

Gets or sets the trace output options.

Returns: A bitwise combination of the enumeration values. The default is `TraceOptions.None`.

Exceptions:

- `ArgumentOutOfRangeException`: Set operation failed because the value is invalid.

#### Remarks
The `TraceOutputOptions` property determines the optional content of trace output. The property can be set in the configuration file or programmatically during execution to include additional data specifically for a section of code. For example, you can set the `TraceOutputOptions` property for the console trace listener to `Callstack` to add call stack information to the trace output.

The `TraceOptions` enumeration is not used by the following classes and methods:

- The `EventLogTraceListener` class, because it can cause a large volume of data to be written to the log.

- The `Write` and `WriteLine` methods of the `ConsoleTraceListener`, `DefaultTraceListener`, and `TextWriterTraceListener` classes.

- The `TraceListener.Write` and `TraceListener.WriteLine` methods of the `TraceListener` class when they are not overridden in a derived class.

#### Examples
The following example shows the setting of the `TraceOutputOptions` property for a console trace listener. The console trace listener is one of the listeners enumerated in the `Listeners` property of a trace source. This code example is part of a larger example provided for the `TraceSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SwitchAttribute/Overview/program.cs._

## TraceListener.Close() method

```csharp
public virtual void Close ();
```

When overridden in a derived class, closes the output stream so it no longer receives tracing or debugging output.

#### Remarks
Use this method when the output is going to a file, such as to the `TextWriterTraceListener`. After a call to this method, you must reinitialize the object.

## TraceListener.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the `TraceListener`.

#### Remarks
Calling `TraceListener.Dispose` allows the resources used by the `TraceListener` to be reallocated for other purposes. For more information about `TraceListener.Dispose`, see Cleaning Up Unmanaged Resources.

## TraceListener.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `TraceListener` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `TraceListener.Dispose` method and the `Finalize` method, if it has been overridden. `Dispose` invokes the protected `TraceListener.Dispose` method with the `disposing` parameter set to `true`. `Finalize` specifies the `disposing` parameter as `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `TraceListener` references. This method invokes the `Dispose` method of each referenced object.

## TraceListener.Fail(String) method

```csharp
public virtual void Fail (string? message);
```

Emits an error message to the listener you create when you implement the `TraceListener` class.

Parameters:

- `message`: A message to emit.

#### Remarks
The default behavior is to display the specified message in a message box when the application is running in a user-interface mode, and to the `TraceListener` instances in a `TraceListenerCollection` collection. By default, the `TraceListenerCollection` collection has an instance of a `DefaultTraceListener`. You can customize this behavior by adding a `TraceListener` to or removing one from the collection.

## TraceListener.Fail(String, String) method

```csharp
public virtual void Fail (string? message, string? detailMessage);
```

Emits an error message and a detailed error message to the listener you create when you implement the `TraceListener` class.

Parameters:

- `message`: A message to emit.
- `detailMessage`: A detailed message to emit.

#### Remarks
The default behavior is to display the message and detailed message in a message box when the application is running in a user-interface mode, and to the `TraceListener` instances in a `TraceListenerCollection` collection. By default, the `TraceListenerCollection` collection has an instance of a `DefaultTraceListener`. You can customize this behavior by adding a `TraceListener` to or removing one from the collection.

## TraceListener.Flush() method

```csharp
public virtual void Flush ();
```

When overridden in a derived class, flushes the output buffer.

To be added.

## TraceListener.GetSupportedAttributes() method

```csharp
protected virtual string[]? GetSupportedAttributes ();
```

Gets the custom attributes supported by the trace listener.

Returns: A string array naming the custom attributes supported by the trace listener, or `null` if there are no custom attributes.

#### Remarks
The default implementation for `TraceListener.GetSupportedAttributes` returns `null`.

#### Examples
The following code sample shows an override of the `TraceListener.GetSupportedAttributes` method for a custom trace listener.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TraceListener/GetSupportedAttributes/program.cs._

## TraceListener.TraceData(TraceEventCache, String, TraceEventType, Int32, Object) method

```csharp
public virtual void TraceData (System.Diagnostics.TraceEventCache? eventCache, string source, System.Diagnostics.TraceEventType eventType, int id, object? data);
```

Writes trace information, a data object and event information to the listener specific output.

Parameters:

- `eventCache`: A `TraceEventCache` object that contains the current process ID, thread ID, and stack trace information.
- `source`: A name used to identify the output, typically the name of the application that generated the trace event.
- `eventType`: One of the `TraceEventType` values specifying the type of event that has caused the trace.
- `id`: A numeric identifier for the event.
- `data`: The trace data to emit.

#### Remarks

> **Important:**
>  This method is not intended to be called directly by application code but by members of the `Debug`, `Trace`, and `TraceSource` classes to write trace data to output.

The default implementation writes the `eventCache`, `source`, `eventType` and `id` parameters in the header and footer of the trace. The `data` parameter is written as the body of the trace message. The `ToString` method of the data object is used to convert the object to a `String`.

## TraceListener.TraceData(TraceEventCache, String, TraceEventType, Int32, Object[]) method

```csharp
public virtual void TraceData (System.Diagnostics.TraceEventCache? eventCache, string source, System.Diagnostics.TraceEventType eventType, int id, params object?[]? data);
```

Writes trace information, an array of data objects and event information to the listener specific output.

Parameters:

- `eventCache`: A `TraceEventCache` object that contains the current process ID, thread ID, and stack trace information.
- `source`: A name used to identify the output, typically the name of the application that generated the trace event.
- `eventType`: One of the `TraceEventType` values specifying the type of event that has caused the trace.
- `id`: A numeric identifier for the event.
- `data`: An array of objects to emit as data.

#### Remarks

> **Important:**
>  This method is not intended to be called directly by application code but by members of the `Debug`, `Trace`, and `TraceSource` classes to write trace data to output.

The default implementation writes the values of the `source`, `eventType` and `id` parameters as a header. The data objects are converted to strings using the `ToString` method of each object. The `eventCache` data is written as a footer, the nature of the output data being dependent on the value of the `TraceOutputOptions` property.

## TraceListener.TraceEvent(TraceEventCache, String, TraceEventType, Int32) method

```csharp
public virtual void TraceEvent (System.Diagnostics.TraceEventCache? eventCache, string source, System.Diagnostics.TraceEventType eventType, int id);
```

Writes trace and event information to the listener specific output.

Parameters:

- `eventCache`: A `TraceEventCache` object that contains the current process ID, thread ID, and stack trace information.
- `source`: A name used to identify the output, typically the name of the application that generated the trace event.
- `eventType`: One of the `TraceEventType` values specifying the type of event that has caused the trace.
- `id`: A numeric identifier for the event.

#### Remarks

> **Important:**
>  This method is not intended to be called directly by application code but by members of the `Debug`, `Trace`, and `TraceSource` classes to write trace data to output.

The default implementation writes the values of the `source`, `eventType` and `id` parameters as a header. The `eventCache` data is written as a footer, the nature of the output data being dependent on the value of the `TraceOutputOptions` property.
