---
title: "Trace class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Trace.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Trace class (part 2 of 4)

## Trace.Close() method

```csharp
public static void Close ();
```

Flushes the output buffer, and then closes the `Trace.Listeners`.

#### Remarks
Use this method when the output is going to a file, such as to the `TextWriterTraceListener`.

Flushing the stream will not flush its underlying encoder unless you explicitly call `Trace.Flush` or `Trace.Close`. Setting `Trace.AutoFlush` to `true` means that data will be flushed from the buffer to the stream, but the encoder state will not be flushed. This allows the encoder to keep its state (partial characters) so that it can encode the next block of characters correctly. This scenario affects UTF8 and UTF7 where certain characters can only be encoded after the encoder receives the adjacent character or characters.

#### Examples
The following example creates a `TextWriterTraceListener` named `myTextListener`. `myTextListener` uses a `StreamWriter` called `myOutputWriter` to write to a file named `TestFile.txt`. The example creates the file, stream and text writer, writes one line of text to the file, and then flushes and closes the output.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Trace/Close/source.cs._

## Trace.Fail(String) method

```csharp
public static void Fail (string? message);
```

Emits the specified error message.

Parameters:

- `message`: A message to emit.

#### Remarks
The default behavior for the default trace listener is to output the `message` parameter to a message box when the application runs in user-interface mode, and to the `TraceListener` instances in the `Trace.Listeners` collection.

> **Note:**
> The display of the message box is dependent on the presence of the `DefaultTraceListener`. If the `DefaultTraceListener` is not in the `Trace.Listeners` collection, the message box is not displayed. The `DefaultTraceListener` can be removed by calling the `TraceListenerCollection.Clear` method on the `Listeners` property (`System.Diagnostics.Trace.Listeners.Clear()`).

You can customize this behavior by adding a `TraceListener` to, or by removing one from, the `Trace.Listeners` collection.

#### Examples
The following example uses the `Trace.Fail` method to print a message during exception handling.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Trace/Fail/source.cs._

You can also use the `Trace.Fail` method in a switch statement.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Trace/Fail/source.cs._

## Trace.Fail(String, String) method

```csharp
public static void Fail (string? message, string? detailMessage);
```

Emits an error message, and a detailed error message.

Parameters:

- `message`: A message to emit.
- `detailMessage`: A detailed message to emit.

#### Remarks
The default behavior is for the default trace listener to output the `message` parameter and the `detailedMessage` parameter to a message box when the application runs in user-interface mode, and to the `TraceListener` instances in the `Trace.Listeners` collection.

> **Note:**
> The display of the message box is dependent on the presence of the `DefaultTraceListener`. If the `DefaultTraceListener` is not in the `Trace.Listeners` collection, the message box is not displayed. The `DefaultTraceListener` can be removed by calling the `TraceListenerCollection.Clear` method on the `Listeners` property (`System.Diagnostics.Trace.Listeners.Clear()`).

You can customize this behavior by adding a `TraceListener` to, or by removing one from, the `Trace.Listeners` collection.

#### Examples
The following example uses the `Trace.Fail` method to print a message during exception handling.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Trace/Fail/source1.cs._

You can also use the `Trace.Fail` method in a switch statement.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Trace/Fail/source1.cs._

## Trace.Flush() method

```csharp
public static void Flush ();
```

Flushes the output buffer, and causes buffered data to be written to the `Trace.Listeners`.

#### Remarks
Flushing the stream will not flush its underlying encoder unless you explicitly call `Trace.Flush` or `Trace.Close`. Setting `Trace.AutoFlush` to `true` means that data will be flushed from the buffer to the stream, but the encoder state will not be flushed. This allows the encoder to keep its state (partial characters) so that it can encode the next block of characters correctly. This scenario affects UTF8 and UTF7 where certain characters can only be encoded after the encoder receives the adjacent character or characters.

#### Examples
The following example creates a `TextWriterTraceListener` named `myTextListener`. `myTextListener` uses a `StreamWriter` called `myOutputWriter` to write to a file named `TestFile.txt`. The example creates the file, stream and text writer, writes one line of text to the file, and then flushes and closes the output.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Trace/Close/source.cs._

## Trace.Indent() method

```csharp
public static void Indent ();
```

Increases the current `Trace.IndentLevel` by one.

#### Examples
The following example increments and decrements the indent level and emits tracing messages.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Trace/Indent/source.cs._

This example produces the following output:

```
List of errors:
     Error 1: File not found
     Error 2: Directory not found
End of list of errors
```

## Trace.Refresh() method

```csharp
public static void Refresh ();
```

Refreshes the trace configuration data.

#### Remarks
Trace configuration data is captured when the application is started. If the configuration data is changed after the application is started, call the `Trace.Refresh` method to update the trace configuration data.

## Trace.TraceError(String) method

```csharp
public static void TraceError (string? message);
```

Writes an error message to the trace listeners in the `Trace.Listeners` collection using the specified message.

Parameters:

- `message`: The informative message to write.

#### Remarks
`Trace.TraceError` calls the `TraceEvent` method for each trace listener, with the trace event type `Error`, passing the informative message as the message string.

## Trace.TraceError(String, Object[]) method

```csharp
public static void TraceError (string format, params object?[]? args);
```

Writes an error message to the trace listeners in the `Trace.Listeners` collection using the specified array of objects and formatting information.

Parameters:

- `format`: A format string that contains zero or more format items, which correspond to objects in the `args` array.
- `args`: An `object` array containing zero or more objects to format.

#### Remarks
`Trace.TraceError` calls the `TraceEvent` methods in the trace listeners with the trace event type `Error`, passing the message content as an object array with formatting information. See the `String.Format` method for more information about the `format` and `args` parameters.

## Trace.TraceInformation(String) method

```csharp
public static void TraceInformation (string? message);
```

Writes an informational message to the trace listeners in the `Trace.Listeners` collection using the specified message.

Parameters:

- `message`: The informative message to write.

#### Remarks
`Trace.TraceInformation` calls the `TraceEvent` method for each trace listener, with the trace event type `Information`, passing the informative message as the message string.

## Trace.TraceInformation(String, Object[]) method

```csharp
public static void TraceInformation (string format, params object?[]? args);
```

Writes an informational message to the trace listeners in the `Trace.Listeners` collection using the specified array of objects and formatting information.

Parameters:

- `format`: A format string that contains zero or more format items, which correspond to objects in the `args` array.
- `args`: An `object` array containing zero or more objects to format.

#### Remarks
`Trace.TraceInformation` calls the `TraceEvent` methods in the trace listeners with the trace event type `Information`, passing the message content as an object array with formatting information. See the `String.Format` method for more information about the `format` and `args` parameters.

## Trace.TraceWarning(String) method

```csharp
public static void TraceWarning (string? message);
```

Writes a warning message to the trace listeners in the `Trace.Listeners` collection using the specified message.

Parameters:

- `message`: The informative message to write.

#### Remarks
`Trace.TraceWarning` calls the `TraceEvent` method for each trace listener with the trace event type `Warning`, passing the informative message as the message string.

## Trace.TraceWarning(String, Object[]) method

```csharp
public static void TraceWarning (string format, params object?[]? args);
```

Writes a warning message to the trace listeners in the `Trace.Listeners` collection using the specified array of objects and formatting information.

Parameters:

- `format`: A format string that contains zero or more format items, which correspond to objects in the `args` array.
- `args`: An `object` array containing zero or more objects to format.

#### Remarks
`Trace.TraceWarning` calls the `TraceEvent` methods in the trace listeners with the trace event type `Warning`, passing the message content as an object array with formatting information. See the `String.Format` method for more information about the `format` and `args` parameters.

## Trace.Unindent() method

```csharp
public static void Unindent ();
```

Decreases the current `Trace.IndentLevel` by one.

#### Examples
The following example increments and decrements the indent level and emits tracing messages.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Trace/Indent/source.cs._

This example produces the following output:

```

List of errors:
     Error 1: File not found
     Error 2: Directory not found
End of list of errors

```

## Trace.Write(Object) method

```csharp
public static void Write (object? value);
```

Writes the value of the object's `Object.ToString` method to the trace listeners in the `Trace.Listeners` collection.

Parameters:

- `value`: An `Object` whose name is sent to the `Trace.Listeners`.

#### Remarks
By default, the output is written to an instance of `DefaultTraceListener`.

This method calls the `TraceListener.Write` method of the trace listener.

> **Note:**
> ASP.NET supplies tracing functionality tailored for Web pages. To write trace messages in ASP.NET pages, use the `Trace` property.

By default, in code associated with an ASP.NET Web page, the statement `Trace.Write("...")` is a call to the `TraceContext.Write` method of the `Trace` property. To use the `Trace` class in Web pages, you must include the namespace, for example, `System.Diagnostics.Trace.Write("...")`.

#### Examples
The following example creates a `TraceSwitch` named `generalSwitch`. This switch is set outside the code sample.

If the switch is set to the `TraceLevel` `Error` or higher, the example outputs the first name of the `value` parameter to the `Trace.Listeners`. For information on adding a listener to the `Trace.Listeners` collection, see the `TraceListenerCollection` class.

Then, if the `TraceLevel` is set to `Verbose`, the example outputs a message on the same line as the first message. The second message is followed by a line terminator.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Trace/Write/source1.cs._

## Trace.Write(String) method

```csharp
public static void Write (string? message);
```

Writes a message to the trace listeners in the `Trace.Listeners` collection.

Parameters:

- `message`: A message to write.

#### Remarks
By default, the output is written to an instance of `DefaultTraceListener`.

This method calls the `TraceListener.Write` method of the trace listener.

> **Note:**
> ASP.NET supplies tracing functionality tailored for Web pages. To write trace messages in ASP.NET pages, use the `Trace` property.

By default, in code associated with an ASP.NET Web page, the statement `Trace.Write("...")` is a call to the `TraceContext.Write` method of the `Trace` property. To use the `Trace` class in Web pages, you must include the namespace, for example, `System.Diagnostics.Trace.Write("...")`.

#### Examples
The following example creates a `TraceSwitch` named `generalSwitch`. This switch is set outside the code sample.

If the switch is set to the `TraceLevel` `Error` or higher, the example outputs the first error message to the `Trace.Listeners`. For information on adding a listener to the `Trace.Listeners` collection, see the `TraceListenerCollection` class.

Then, if the `TraceLevel` is set to `Verbose`, the example outputs the second error message on the same line as the first message. A line terminator follows the second message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Trace/Write/source.cs._

## Trace.Write(Object, String) method

```csharp
public static void Write (object? value, string? category);
```

Writes a category name and the value of the object's `Object.ToString` method to the trace listeners in the `Trace.Listeners` collection.

Parameters:

- `value`: An `Object` name is sent to the `Trace.Listeners`.
- `category`: A category name used to organize the output.

#### Remarks
By default, the output is written to an instance of `DefaultTraceListener`.

The `category` parameter can be used to group output messages.

This method calls the `TraceListener.Write` method of the trace listener.

> **Note:**
> ASP.NET supplies tracing functionality tailored for Web pages. To write trace messages in ASP.NET pages, use the `Trace` property.

By default, in code associated with an ASP.NET Web page, the statement `Trace.Write("...")` is a call to the `TraceContext.Write` method of the `Trace` property. To use the `Trace` class in Web pages, you must include the namespace, for example, `System.Diagnostics.Trace.Write("...")`.

#### Examples
The following example creates a `TraceSwitch` named `generalSwitch`. This switch is set outside the code sample.

If the switch is set to the `TraceLevel` `Verbose`, the example outputs the name of the `myObject` and the `category` to the `Trace.Listeners`. For information on adding a listener to the `Trace.Listeners` collection, see the `TraceListenerCollection` class.

Then, if the `TraceLevel` is set to `Error` or higher, the example outputs the second error message on the same line as the first message. The second message is followed by a line terminator.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Trace/Write/source3.cs._
