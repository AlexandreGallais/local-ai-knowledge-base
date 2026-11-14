---
title: "Debug class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Debug.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Debug class (part 2 of 4)

## Debug.Assert(Boolean, String, String) method

```csharp
public static void Assert (bool condition, string? message, string? detailMessage);
```

Checks for a condition; if the condition is `false`, outputs two specified messages and displays a message box that shows the call stack.

Parameters:

- `condition`: The conditional expression to evaluate. If the condition is `true`, the specified messages are not sent and the message box is not displayed.
- `message`: The message to send to the `Trace.Listeners` collection.
- `detailMessage`: The detailed message to send to the `Trace.Listeners` collection.

#### Remarks
By default, the `Debug.Assert` method works only in debug builds. Use the `Trace.Assert` method if you want to do assertions in release builds. For more information, see Assertions in Managed Code.

Typically, the `Assert` method is used to identify logic errors during program development. `Debug.Assert` evaluates the condition. If the result is `false`, it sends the specified diagnostic message and detailed message to the `Debug.Listeners` collection. You can customize this behavior by adding a `TraceListener` to, or removing one from, the `Debug.Listeners` collection.

When the application runs in user interface mode, it displays a message box that shows the call stack with file and line numbers. The message box contains three buttons: **Abort**, **Retry**, and **Ignore**. Clicking the **Abort** button terminates the application. Clicking **Retry** sends you to the code in the debugger if your application is running in a debugger, or offers to open a debugger if it is not. Clicking **Ignore** continues with the next instruction in the code.

> **Note:**
>  The display of the message box depends on the presence of the `DefaultTraceListener`. If the `DefaultTraceListener` is not in the `Trace.Listeners` collection, the message box is not displayed. The `DefaultTraceListener` can be removed by calling the `TraceListenerCollection.Clear` method on the `Listeners` property (`System.Diagnostics.Trace.Listeners.Clear()`).

#### Examples

The following example checks whether the `type` parameter is valid. If `type` is `null`, `Trace.Assert` outputs two messages.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/Assert/source2.cs._

## Debug.Assert(Boolean, String, String, Object[]) method

```csharp
public static void Assert (bool condition, string? message, string detailMessageFormat, params object?[] args);
```

Checks for a condition; if the condition is `false`, outputs two messages (simple and formatted) and displays a message box that shows the call stack.

Parameters:

- `condition`: The conditional expression to evaluate. If the condition is `true`, the specified messages are not sent and the message box is not displayed.
- `message`: The message to send to the `Trace.Listeners` collection.
- `detailMessageFormat`: The composite format string to send to the `Trace.Listeners` collection. This message contains text intermixed with zero or more format items, which correspond to objects in the `args` array.
- `args`: An object array that contains zero or more objects to format.

#### Remarks
This method uses the .NET composite formatting feature to convert the value of an object to its text representation and embed that representation in a string. The resulting string is sent to the `Trace.Listeners` collection.

By default, the `Debug.Assert` method works only in debug builds. Use the `Trace.Assert` method if you want to do assertions in release builds. For more information, see Assertions in Managed Code.

Typically, the `Assert` method is used to identify logic errors during program development. `Debug.Assert` evaluates the condition. If the result is `false`, The `Format` method is called and the `detailMessageFormat` string and `args` array are passed in as parameters. `Assert` then sends the specified text message and the formatted text message to the `Debug.Listeners` collection. You can customize this behavior by adding a `TraceListener` to, or removing one from, the `Debug.Listeners` collection.

When the application runs in user interface mode, it displays a message box that shows the call stack with file and line numbers. The message box contains three buttons: **Abort**, **Retry**, and **Ignore**. Clicking the **Abort** button terminates the application. Clicking **Retry** sends you to the code in the debugger if your application is running in a debugger, or offers to open a debugger if it is not. Clicking **Ignore** continues with the next instruction in the code.

> **Note:**
>  The display of the message box is dependent on the presence of the `DefaultTraceListener`. If the `DefaultTraceListener` is not in the `Trace.Listeners` collection, the message box is not displayed. The `DefaultTraceListener` can be removed by calling the `TraceListenerCollection.Clear` method on the `Listeners` property (`System.Diagnostics.Trace.Listeners.Clear()`).

## Debug.Close() method

```csharp
public static void Close ();
```

Flushes the output buffer and then calls the `Close` method on each of the `Debug.Listeners`.

#### Remarks
Use this method when the output goes to a file, such as to the `TextWriterTraceListener`.

Flushing the stream will not flush its underlying encoder unless you explicitly call `Debug.Flush` or `Debug.Close`. Setting `Debug.AutoFlush` to `true` means that data will be flushed from the buffer to the stream, but the encoder state will not be flushed. This allows the encoder to keep its state (partial characters) so that it can encode the next block of characters correctly. This scenario affects UTF8 and UTF7 where certain characters can only be encoded after the encoder receives the adjacent character or characters.

#### Examples

The following example creates a `TextWriterTraceListener` named `myTextListener`. `myTextListener` uses a `StreamWriter` called `myOutputWriter` to write to a file named `TestFile.txt`. The example creates the file, stream, and text writer, writes one line of text to the file, and then flushes and closes the output.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/Close/source.cs._

## Debug.Fail(String) method

```csharp
public static void Fail (string? message);
```

Emits the specified error message.

Parameters:

- `message`: A message to emit.

#### Remarks
The default behavior is that the `DefaultTraceListener` outputs the message to a message box when the application is running in user interface mode and to the `TraceListener` instances in the `Debug.Listeners` collection.

> **Note:**
>  The display of the message box is dependent on the presence of the `DefaultTraceListener`. If the `DefaultTraceListener` is not in the `Trace.Listeners` collection, the message box is not displayed. The `DefaultTraceListener` can be removed by calling the `TraceListenerCollection.Clear` method on the `Listeners` property (`System.Diagnostics.Trace.Listeners.Clear()`).

You can customize this behavior by adding a `TraceListener` to, or removing one from, the `Debug.Listeners` collection.

#### Examples

The following example uses the `Debug.Fail` method to print a message during exception handling.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/Fail/source.cs._

You can also use the `Debug.Fail` method in a switch statement.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/Fail/source.cs._

## Debug.Fail(String, String) method

```csharp
public static void Fail (string? message, string? detailMessage);
```

Emits an error message and a detailed error message.

Parameters:

- `message`: A message to emit.
- `detailMessage`: A detailed message to emit.

#### Remarks
The default behavior is that the `DefaultTraceListener` outputs the message to a message box when the application is running in user interface mode and to the `TraceListener` instances in the `Debug.Listeners` collection.

> **Note:**
>  The display of the message box is dependent on the presence of the `DefaultTraceListener`. If the `DefaultTraceListener` is not in the `Trace.Listeners` collection, the message box is not displayed. The `DefaultTraceListener` can be removed by calling the `TraceListenerCollection.Clear` method on the `Listeners` property (`System.Diagnostics.Trace.Listeners.Clear()`).

You can customize this behavior by adding a `TraceListener` to, or removing one from, the `Debug.Listeners` collection.

#### Examples

The following example uses the `Debug.Fail` method to print a message during exception handling.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/Fail/source1.cs._

You can also use the `Debug.Fail` method in a switch statement.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/Fail/source1.cs._

## Debug.Flush() method

```csharp
public static void Flush ();
```

Flushes the output buffer and causes buffered data to write to the `Debug.Listeners` collection.

#### Remarks
Flushing the stream will not flush its underlying encoder unless you explicitly call `Debug.Flush` or `Debug.Close`. Setting `Debug.AutoFlush` to `true` means that data will be flushed from the buffer to the stream, but the encoder state will not be flushed. This allows the encoder to keep its state (partial characters) so that it can encode the next block of characters correctly. This scenario affects UTF8 and UTF7 where certain characters can only be encoded after the encoder receives the adjacent character or characters.

#### Examples

The following example creates a `TextWriterTraceListener` named `myTextListener`. `myTextListener` uses a `FileStream` called `myFileStream` to write to a file named `TestFile.txt`. The example creates the stream, opens the file if it exists or creates a new one, writes one line of text to the file, and then flushes and closes the output.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/Close/source.cs._

## Debug.Indent() method

```csharp
public static void Indent ();
```

Increases the current `Debug.IndentLevel` by one.

#### Examples

The following example sets the indent level and emits debugging messages.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/Indent/source.cs._

This example produces the following output:

```txt
List of errors:
     Error 1: File not found
     Error 2: Directory not found
End of list of errors
```

## Debug.Print(String) method

```csharp
public static void Print (string? message);
```

Writes a message followed by a line terminator to the trace listeners in the `Debug.Listeners` collection.

Parameters:

- `message`: The message to write.

#### Remarks
The default line terminator is a carriage return followed by a line feed. By default, the output is written to an instance of `DefaultTraceListener`.

## Debug.Print(String, Object[]) method

```csharp
public static void Print (string format, params object?[] args);
```

Writes a formatted string followed by a line terminator to the trace listeners in the `Debug.Listeners` collection.

Parameters:

- `format`: A composite format string that contains text intermixed with zero or more format items, which correspond to objects in the `args` array.
- `args`: An object array containing zero or more objects to format.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: `format` is invalid.

-or-

The number that indicates an argument to format is less than zero, or greater than or equal to the number of specified objects to format.

#### Remarks
This method uses .NET composite formatting feature to convert the value of an object to its text representation and embed that representation in a string. By default, the output is written to an instance of `DefaultTraceListener`.

## Debug.Unindent() method

```csharp
public static void Unindent ();
```

Decreases the current `Debug.IndentLevel` by one.

#### Examples

The following example sets the indent level and emits debugging messages.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/Indent/source.cs._

This example produces the following output:

```txt
List of errors:
     Error 1: File not found
     Error 2: Directory not found
End of list of errors
```

## Debug.Write(Object) method

```csharp
public static void Write (object? value);
```

Writes the value of the object's `Object.ToString` method to the trace listeners in the `Debug.Listeners` collection.

Parameters:

- `value`: An object whose name is sent to the `Debug.Listeners`.

#### Remarks
By default, the output is written to an instance of `DefaultTraceListener`.

This method calls the `TraceListener.Write` method of the trace listener.

#### Examples

The following example creates a `TraceSwitch` named `generalSwitch`. This switch is set outside of the code sample.

If the switch is set to the `TraceLevel` `Error` or higher, the example outputs the first error message to the `Debug.Listeners`. For information on adding a listener to the `Debug.Listeners` collection, see the `TraceListenerCollection` class.

Then, if the `TraceLevel` is set to `Verbose`, the example outputs the second error message on the same line as the first message. A line terminator follows the second message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/Write/source.cs._

## Debug.Write(String) method

```csharp
public static void Write (string? message);
```

Writes a message to the trace listeners in the `Debug.Listeners` collection.

Parameters:

- `message`: A message to write.

#### Remarks
By default, the output is written to an instance of `DefaultTraceListener`.

This method calls the `TraceListener.Write` method of the trace listener.

#### Examples

The following example creates a `TraceSwitch` named `generalSwitch`. This switch is set outside of the code sample.

If the switch is set to the `TraceLevel` `Error` or higher, the example outputs the first error message to the `Debug.Listeners`. For information on adding a listener to the `Debug.Listeners` collection, see the `TraceListenerCollection` class.

Then, if the `TraceLevel` is set to `Verbose`, the example outputs the second error message on the same line as the first message. A line terminator follows the second message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/Write/source.cs._
