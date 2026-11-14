---
title: "Debug class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Debug.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Debug class

Namespace: `System.Diagnostics`

```csharp
public static class Debug
```

Provides a set of methods and properties that help debug your code.

#### Remarks

To make your code more robust without impacting the performance and code size of your shipping product, use methods in the `Debug` class to print debugging information and check your logic with assertions.

This class provides methods to display an `Debug.Assert` dialog box, and to emit an assertion that will always fail. This class provides write methods in the following variations:

- `Debug.Write`
- `Debug.WriteLine`
- `Debug.WriteIf`
- `Debug.WriteLineIf`

The `BooleanSwitch` and `TraceSwitch` classes provide means to dynamically control the tracing output.

You can customize the tracing output's target by adding `TraceListener` instances to or removing instances from the `Debug.Listeners` collection. The `Debug.Listeners` collection is shared by both the `Debug` and the `Trace` classes; adding a trace listener to either class adds the listener to both. By default, the `DefaultTraceListener` class emits trace output.

> **Note:**
>  Adding a trace listener to the `Debug.Listeners` collection can cause an exception to be thrown while tracing, if a resource used by the trace listener is not available. The conditions and the exception thrown depend on the trace listener and can't be enumerated in this article. It may be useful to place calls to the `Debug` methods in `try`/`catch` blocks to detect and handle any exceptions from trace listeners.

You can modify the level of indentation using the `Debug.Indent` method or the `IndentLevel` property. To modify the indent spacing, use the `IndentSize` property. You can specify whether to automatically flush the output buffer after each write by setting the `AutoFlush` property to `true`.

The `ConditionalAttribute` attribute is applied to the methods of `Debug`. Compilers that support `ConditionalAttribute` ignore calls to these methods unless `DEBUG` is defined as a conditional compilation symbol. Refer to a compiler's documentation to determine whether `ConditionalAttribute` is supported and the syntax for defining a conditional compilation symbol.

> **Note:**
> In Visual Studio C# and Visual Basic <example-value>, by default, the `DEBUG` conditional compilation symbol is defined for debug builds, and the `TRACE` symbol is defined for both debug and release builds. For information about conditional debugging in Visual C++, see Debug class (C++/CLI).

To define the `DEBUG` conditional compilation symbol in C#, add the `/d:DEBUG` option to the compiler command line when you compile your code using a command line, or add `#define DEBUG` to the top of your file. In Visual Basic, add the `/d:DEBUG=True` option to the compiler command line or add `#Const DEBUG=True` to the file.

#### Examples

The following example uses `Debug` to indicate the beginning and end of a program's execution. The example also uses `Debug.Indent` and `Debug.Unindent` to distinguish the tracing output.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/Overview/source.cs._

## Debug.AutoFlush property

```csharp
public static bool AutoFlush { get; set; }
```

Gets or sets a value indicating whether `Debug.Flush` should be called on the `Debug.Listeners` after every write.

Returns: `true` if `Debug.Flush` is called on the `Debug.Listeners` after every write; otherwise, `false`.

#### Remarks
The default is `false`.

Flushing the stream will not flush its underlying encoder unless you explicitly call `Debug.Flush` or `Debug.Close`. Setting `Debug.AutoFlush` to `true` means that data will be flushed from the buffer to the stream, but the encoder state will not be flushed. This allows the encoder to keep its state (partial characters) so that it can encode the next block of characters correctly. This scenario affects UTF8 and UTF7 where certain characters can only be encoded after the encoder receives the adjacent character or characters.

## Debug.IndentLevel property

```csharp
public static int IndentLevel { get; set; }
```

Gets or sets the indent level.

Returns: The indent level. The default is 0.

#### Remarks

The `IndentLevel` property represents the number of times the indent of size `Debug.IndentSize` is applied.

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

## Debug.IndentSize property

```csharp
public static int IndentSize { get; set; }
```

Gets or sets the number of spaces in an indent.

Returns: The number of spaces in an indent. The default is four.

#### Remarks
A `TextWriterTraceListener` interprets this number as spaces. An `EventLogTraceListener` ignores this value.

## Debug.Assert(Boolean) method

```csharp
public static void Assert (bool condition);
```

Checks for a condition; if the condition is `false`, displays a message box that shows the call stack.

Parameters:

- `condition`: The conditional expression to evaluate. If the condition is `true`, a failure message is not sent and the message box is not displayed.

#### Remarks
By default, the `Debug.Assert` method works only in debug builds. Use the `Trace.Assert` method if you want to do assertions in release builds. For more information, see Assertions in Managed Code.

Typically, the `Assert` method is used to identify logic errors during program development. `Debug.Assert` evaluates the condition. If the result is `false`, it sends a failure message to the `Debug.Listeners` collection. You can customize this behavior by adding a `TraceListener` to, or removing one from, the `Debug.Listeners` collection.

When the application runs in user interface mode, it displays a message box that shows the call stack with file and line numbers. The message box contains three buttons: **Abort**, **Retry**, and **Ignore**. Clicking the **Abort** button terminates the application. Clicking **Retry** sends you to the code in the debugger if your application is running in a debugger, or offers to open a debugger if it is not. Clicking **Ignore** continues with the next instruction in the code.

> **Note:**
> The display of the message box depends on the presence of the `DefaultTraceListener`. If the `DefaultTraceListener` is not in the `Trace.Listeners` collection, the message box is not displayed. The `DefaultTraceListener` can be removed by calling the `TraceListenerCollection.Clear` method on the `Listeners` property (`System.Diagnostics.Trace.Listeners.Clear()`).

#### Examples

The following example creates an index for an array, performs some action to set the value of the index, and then calls `Debug.Assert` to confirm that the index value is valid. If it is not valid, `Debug.Assert` outputs the call stack.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/Assert/source.cs._

## Debug.Assert(Boolean, Debug+AssertInterpolatedStringHandler) method

```csharp
public static void Assert (bool condition, ref System.Diagnostics.Debug.AssertInterpolatedStringHandler message);
```

Checks for a condition; if the condition is `false`, outputs a specified message and displays a message box that shows the call stack.

Parameters:

- `condition`: The conditional expression to evaluate. If the condition is `true`, the specified message is not sent and the message box is not displayed.
- `message`: The message to send to the `Trace.Listeners` collection.

#### Remarks

This overload has better performance than the overloads that take a `String` parameter. This overload only evaluates any interpolated string formatting items if the message is required.

By default, the `Debug.Assert` method works only in debug builds. Use the `Trace.Assert` method if you want to do assertions in release builds. For more information, see Assertions in Managed Code.

Typically, the `Debug.Assert` method is used to identify logic errors during program development. `Debug.Assert` evaluates the condition. If the result is `false`, it sends the specified diagnostic message to the `Debug.Listeners` collection. You can customize this behavior by adding a `TraceListener` to, or removing one from, the `Debug.Listeners` collection.

When the application runs in user interface mode, it displays a message box that shows the call stack with file and line numbers. The message box contains three buttons: **Abort**, **Retry**, and **Ignore**. Clicking the **Abort** button terminates the application. Clicking **Retry** sends you to the code in the debugger if your application is running in a debugger, or offers to open a debugger if it is not. Clicking **Ignore** continues with the next instruction in the code.

> **Note:**
> The display of the message box depends on the presence of the `DefaultTraceListener`. If the `DefaultTraceListener` is not in the `Trace.Listeners` collection, the message box is not displayed. The `DefaultTraceListener` can be removed by calling the `TraceListenerCollection.Clear` method on the `Listeners` property (`System.Diagnostics.Trace.Listeners.Clear()`).

## Debug.Assert(Boolean, String) method

```csharp
public static void Assert (bool condition, string? message = default);
```

Checks for a condition; if the condition is `false`, outputs a specified message and displays a message box that shows the call stack.

Parameters:

- `condition`: The conditional expression to evaluate. If the condition is `true`, the specified message is not sent and the message box is not displayed.
- `message`: The message to send to the `Trace.Listeners` collection.

#### Remarks
By default, the `Debug.Assert` method works only in debug builds. Use the `Trace.Assert` method if you want to do assertions in release builds. For more information, see Assertions in Managed Code.

Typically, the `Debug.Assert` method is used to identify logic errors during program development. `Debug.Assert` evaluates the condition. If the result is `false`, it sends the specified diagnostic message to the `Debug.Listeners` collection. You can customize this behavior by adding a `TraceListener` to, or removing one from, the `Debug.Listeners` collection.

When the application runs in user interface mode, it displays a message box that shows the call stack with file and line numbers. The message box contains three buttons: **Abort**, **Retry**, and **Ignore**. Clicking the **Abort** button terminates the application. Clicking **Retry** sends you to the code in the debugger if your application is running in a debugger, or offers to open a debugger if it is not. Clicking **Ignore** continues with the next instruction in the code.

> **Note:**
>  The display of the message box depends on the presence of the `DefaultTraceListener`. If the `DefaultTraceListener` is not in the `Trace.Listeners` collection, the message box is not displayed. The `DefaultTraceListener` can be removed by calling the `TraceListenerCollection.Clear` method on the `Listeners` property (`System.Diagnostics.Trace.Listeners.Clear()`).

#### Examples

The following example checks whether the `type` parameter is valid. If `type` is `null`, `Trace.Assert` outputs a message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Debug/Assert/source1.cs._

## Debug.Assert(Boolean, Debug+AssertInterpolatedStringHandler, Debug+AssertInterpolatedStringHandler) method

```csharp
public static void Assert (bool condition, ref System.Diagnostics.Debug.AssertInterpolatedStringHandler message, ref System.Diagnostics.Debug.AssertInterpolatedStringHandler detailMessage);
```

Checks for a condition; if the condition is `false`, outputs a specified message and displays a message box that shows the call stack.

Parameters:

- `condition`: The conditional expression to evaluate. If the condition is `true`, the specified message is not sent and the message box is not displayed.
- `message`: The message to send to the `Trace.Listeners` collection.
- `detailMessage`: The detailed message to send to the `Trace.Listeners` collection.

#### Remarks

This overload has better performance than the overloads that take a `String` parameter. This overload only evaluates any interpolated string formatting items if the message is required.

By default, the `Debug.Assert` method works only in debug builds. Use the `Trace.Assert` method if you want to do assertions in release builds. For more information, see Assertions in Managed Code.

Typically, the `Debug.Assert` method is used to identify logic errors during program development. `Debug.Assert` evaluates the condition. If the result is `false`, it sends the specified diagnostic message to the `Debug.Listeners` collection. You can customize this behavior by adding a `TraceListener` to, or removing one from, the `Debug.Listeners` collection.

When the application runs in user interface mode, it displays a message box that shows the call stack with file and line numbers. The message box contains three buttons: **Abort**, **Retry**, and **Ignore**. Clicking the **Abort** button terminates the application. Clicking **Retry** sends you to the code in the debugger if your application is running in a debugger, or offers to open a debugger if it is not. Clicking **Ignore** continues with the next instruction in the code.

> **Note:**
> The display of the message box depends on the presence of the `DefaultTraceListener`. If the `DefaultTraceListener` is not in the `Trace.Listeners` collection, the message box is not displayed. The `DefaultTraceListener` can be removed by calling the `TraceListenerCollection.Clear` method on the `Listeners` property (`System.Diagnostics.Trace.Listeners.Clear()`).
