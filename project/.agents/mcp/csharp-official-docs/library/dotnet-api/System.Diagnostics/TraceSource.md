---
title: "TraceSource class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/TraceSource.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TraceSource class

Namespace: `System.Diagnostics`

```csharp
public class TraceSource
```

Provides a set of methods and properties that enable applications to trace the execution of code and associate trace messages with their source.

#### Remarks
The `TraceSource` class is used by applications to produce traces that can be associated with the application. `TraceSource` provides tracing methods that allow you to easily trace events, trace data, and issue informational traces.

The `TraceSource` class is identified by the name of a source, typically the name of the application.  The trace messages coming from a particular component can be initiated by a particular trace source, allowing all messages coming from that component to be easily identified.

`TraceSource` defines tracing methods but does not actually provide any specific mechanism for generating and storing tracing data. The tracing data is produced by trace listeners, which are plug-ins that can be loaded by trace sources.

> **Note:**
>  You should not call the tracing methods during finalization. Doing so can result in an `ObjectDisposedException` being thrown.

You can customize the tracing output's target by adding or removing `TraceListener` instances to or from the collection stored in the `Listeners` property. By default, trace output is produced using an instance of the `DefaultTraceListener` class.

> **Note:**
>  Adding a trace listener to the `TraceSource.Listeners` collection can cause an exception to be thrown while tracing, if a resource used by the trace listener is not available. The conditions and the exception thrown depend on the trace listener. It might be useful to place calls to the `TraceSource` methods in `try`/`catch` blocks to detect and handle any exceptions from trace listeners.

The `SourceSwitch` class provides the means to dynamically control the tracing output.

The `TraceEventType` enumeration is used to define the event type of the trace message. Trace filters use the `TraceEventType` to determine if a trace listener should produce the trace message.

The trace listeners can optionally have an additional layer of filtering through a trace filter. If a trace listener has an associated filter, the listener calls the `TraceFilter.ShouldTrace` method on that filter to determine whether or not to produce the trace information.

The trace listeners use the values of the `Indent`, `IndentSize`, and `AutoFlush` properties to format trace output.

#### Examples
The following code example shows the use of the `TraceSource` class to forward traces to listeners.  The example also demonstrates switch and filter usage.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SwitchAttribute/Overview/program.cs._

## TraceSource.TraceSource(String) constructor

```csharp
public TraceSource (string name);
```

Initializes a new instance of the `TraceSource` class, using the specified name for the source.

Parameters:

- `name`: The name of the source (typically, the name of the application).

Exceptions:

- `ArgumentNullException`: `name` is `null`.
- `ArgumentException`: `name` is an empty string ("").

#### Remarks
The source name is used to identify traces. It is used by a `SourceFilter` to determine whether a trace listener should produce the trace. The recommended practice is to use the name of the application for the source name.

> **Note:**
>  It is not necessary to create a new `TraceSource` instance for each trace request. Create one `TraceSource` instance and use it for all trace requests for the application.

#### Examples
The following code example shows the use of the `TraceSource.%23ctor` constructor to create a new `TraceSource` object. This code example is part of a larger example provided for the `TraceSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SwitchAttribute/Overview/program.cs._

## TraceSource.TraceSource(String, SourceLevels) constructor

```csharp
public TraceSource (string name, System.Diagnostics.SourceLevels defaultLevel);
```

Initializes a new instance of the `TraceSource` class, using the specified name for the source and the default source level at which tracing is to occur.

Parameters:

- `name`: The name of the source, typically the name of the application.
- `defaultLevel`: A bitwise combination of the enumeration values that specifies the default source level at which to trace.

Exceptions:

- `ArgumentNullException`: `name` is `null`.
- `ArgumentException`: `name` is an empty string ("").

#### Remarks
The source name is used to identify traces. It can be used by a `SourceSwitch` to determine if tracing is to occur and by a `SourceFilter` to determine whether to produce the trace. The default source level is used by an `EventTypeFilter` to determine if tracing is to occur based on the source level of the message to be traced.

> **Note:**
>  It is not necessary to create a new `TraceSource` instance for each trace request. Create one `TraceSource` instance and use it for all trace requests for the application.

## TraceSource.Attributes property

```csharp
public System.Collections.Specialized.StringDictionary Attributes { get; }
```

Gets the custom switch attributes defined in the application configuration file.

Returns: A `StringDictionary` containing the custom attributes for the trace switch.

#### Remarks
The `Attributes` property identifies the custom attributes referenced in the application's configuration file. Unreferenced custom attributes are not enumerated. Classes that inherit from the `TraceSource` class can add custom attributes by overriding the `Switch.GetSupportedAttributes` method and returning a string array of custom attribute names.

The following is a sample of a trace source element specifying the custom attribute `SecondTraceSourceAttribute`:

```xml
<sources>
  <source name="TraceTest" switchName="TestSourceSwitch"
    switchType="Testing.MySourceSwitch, TraceSample"
    SecondTraceSourceAttribute="two">
  </source>
</sources>
```

#### Examples
The following code sample shows how to display the custom attributes for a `TraceSource`.  This code example is part of a larger example provided for the `TraceSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SwitchAttribute/Overview/program.cs._

## TraceSource.DefaultLevel property

```csharp
public System.Diagnostics.SourceLevels DefaultLevel { get; }
```

Gets the default level assigned in the constructor.

Returns: To be added.

To be added.

## TraceSource.Listeners property

```csharp
public System.Diagnostics.TraceListenerCollection Listeners { get; }
```

Gets the collection of trace listeners for the trace source.

Returns: A `TraceListenerCollection` that contains the active trace listeners associated with the source.

#### Remarks
Use this property to access and perform operations on the trace listeners.

## TraceSource.Name property

```csharp
public string Name { get; }
```

Gets the name of the trace source.

Returns: The name of the trace source.

#### Remarks
The name is set by the `name` parameter passed to the constructor.

#### Examples
The following code sample shows how to name a trace source in the constructor call. This code example is part of a larger example provided for the `TraceSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SwitchAttribute/Overview/program.cs._

## TraceSource.Switch property

```csharp
public System.Diagnostics.SourceSwitch Switch { get; set; }
```

Gets or sets the source switch value.

Returns: A `SourceSwitch` object representing the source switch value.

Exceptions:

- `ArgumentNullException`: `TraceSource.Switch` is set to `null`.

#### Remarks
The `Switch` property allows the filtering of messages before the trace source calls the listeners.

The switch is used to check whether trace calls should be generated or ignored. Each trace method calls the `SourceSwitch.ShouldTrace` method of the `SourceSwitch` to determine whether to proceed with the trace. If the call returns `true`, the listeners are called.

## TraceSource.Close() method

```csharp
public void Close ();
```

Closes all the trace listeners in the trace listener collection.

#### Remarks
The `TraceSource.Close` method calls the `TraceListener.Close` method of each trace listener in the `TraceSource.Listeners` collection.

#### Examples
The following code example shows how you can use the `TraceSource.Close` method to close all the listeners in the collection. This code example is part of a larger example provided for the `TraceSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SwitchAttribute/Overview/program.cs._

## TraceSource.Flush() method

```csharp
public void Flush ();
```

Flushes all the trace listeners in the trace listener collection.

Exceptions:

- `ObjectDisposedException`: An attempt was made to trace an event during finalization.

#### Remarks
The `TraceSource.Flush` method calls the `TraceListener.Flush` method of each trace listener in the `TraceSource.Listeners` collection.

#### Examples
The following code example shows how you can use the `TraceSource.Flush` method to flush all the listeners in the collection. This code example is part of a larger example provided for the `TraceSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SwitchAttribute/Overview/program.cs._

## TraceSource.GetSupportedAttributes() method

```csharp
protected virtual string[]? GetSupportedAttributes ();
```

Gets the custom attributes supported by the trace source.

Returns: A string array naming the custom attributes supported by the trace source, or `null` if there are no custom attributes.

#### Remarks
The default implementation for `TraceSource.GetSupportedAttributes` returns `null`.

#### Examples
The following code example shows an override of the `TraceSource.GetSupportedAttributes` method to identify the custom attributes for the `MyTraceSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SourceFilter/.ctor/program.cs._

## TraceSource.TraceData(TraceEventType, Int32, Object) method

```csharp
public void TraceData (System.Diagnostics.TraceEventType eventType, int id, object? data);
```

Writes trace data to the trace listeners in the `TraceSource.Listeners` collection using the specified event type, event identifier, and trace data.

Parameters:

- `eventType`: One of the enumeration values that specifies the event type of the trace data.
- `id`: A numeric identifier for the event.
- `data`: The trace data.

Exceptions:

- `ObjectDisposedException`: An attempt was made to trace an event during finalization.

#### Remarks
The `TraceSource.TraceData` method, like the `TraceSource.TraceEvent` method, is intended for automated tools, but it also allows the attaching of an additional object, such as an exception instance, to the trace.

The `TraceSource.TraceData` method calls the `SourceSwitch.ShouldTrace` method of the `SourceSwitch` object returned by the `Switch` property. If `SourceSwitch.ShouldTrace` returns `true`, `TraceSource.TraceData` calls the corresponding `TraceListener.TraceData` method on all listeners. Otherwise, `TraceSource.TraceData` returns without calling the listeners' methods.

> **Note:**
>  The `EventLogTraceListener` object is limited to a maximum `id` value of 65,535. If the `id` value specified is greater than 65,535, the `EventLogTraceListener` object uses 65,535.

#### Examples
The following code example shows the use of the `TraceData` method to filter and forward a trace message to the listeners. This code example is part of a larger example provided for the `TraceSource` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/SwitchAttribute/Overview/program.cs._

## TraceSource.TraceData(TraceEventType, Int32, Object[]) method

```csharp
public void TraceData (System.Diagnostics.TraceEventType eventType, int id, params object?[]? data);
```

Writes trace data to the trace listeners in the `TraceSource.Listeners` collection using the specified event type, event identifier, and trace data array.

Parameters:

- `eventType`: One of the enumeration values that specifies the event type of the trace data.
- `id`: A numeric identifier for the event.
- `data`: An object array containing the trace data.

Exceptions:

- `ObjectDisposedException`: An attempt was made to trace an event during finalization.

#### Remarks
The `TraceSource.TraceData` method, like the `TraceSource.TraceEvent` method, is intended for automated tools, but it also allows the attaching of additional objects, such as an exception instance and a stack trace, to the trace.

The `TraceSource.TraceData` method calls the `SourceSwitch.ShouldTrace` method of the `SourceSwitch` object returned by the `Switch` property. If `SourceSwitch.ShouldTrace` returns `true`, `TraceSource.TraceData` calls the corresponding `TraceListener.TraceData` method on all listeners. Otherwise, `TraceSource.TraceData` returns without calling the listeners' methods.

> **Note:**
>  The `EventLogTraceListener` object is limited to a maximum `id` value of 65,535. If the `id` value specified is greater than 65,535, the `EventLogTraceListener` object uses 65,535.
