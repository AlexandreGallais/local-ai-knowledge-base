---
title: "Trace class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/Trace.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Trace class

Namespace: `System.Diagnostics`

```csharp
public sealed class Trace
```

Provides a set of methods and properties that help you trace the execution of your code. This class cannot be inherited.

#### Remarks
You can use the properties and methods in the `Trace` class to instrument release builds. Instrumentation allows you to monitor the health of your application running in real-life settings. Tracing helps you isolate problems and fix them without disturbing a running system.

This class provides methods to display an `Trace.Assert` dialog box, and to emit an assertion that will always `Trace.Fail`. This class provides write methods in the following variations:

- `Trace.Write`
- `Trace.WriteLine`
- `Trace.WriteIf`
- `Trace.WriteLineIf`

The `BooleanSwitch` and `TraceSwitch` classes provide means to dynamically control the tracing output.

You can customize the tracing output's target by adding `TraceListener` instances to or removing instances from the `Trace.Listeners` collection. The `Trace.Listeners` collection is shared by both the `Debug` and the `Trace` classes; adding a trace listener to either class adds the listener to both. By default, trace output is emitted using the `DefaultTraceListener` class.

> **Note:**
> Adding a trace listener to the `Trace.Listeners` collection can cause an exception to be thrown while tracing, if a resource used by the trace listener is not available. The conditions and the exception thrown depend on the trace listener. It might be useful to place calls to the `Trace` methods in `try`/`catch` blocks to detect and handle any exceptions from trace listeners.

The `Trace` class provides properties to get or set the level of `Trace.Indent` and the `Trace.IndentSize`, and whether to `Trace.AutoFlush` after each write.

The `ConditionalAttribute` attribute is applied to the methods of `Trace`. Compilers that support `ConditionalAttribute` ignore calls to these methods unless `TRACE` is defined as a conditional compilation symbol. Refer to a compiler's documentation to determine whether `ConditionalAttribute` is supported and the syntax for defining a conditional compilation symbol.

> **Note:**
> In Visual Studio projects, by default, the `DEBUG` conditional compilation symbol is defined for debug builds, and the `TRACE` symbol is defined for both debug and release builds.

To define the `TRACE` conditional compilation symbol in C#, add the `/d:TRACE` option to the compiler command line when you compile your code using a command line, or add `#define TRACE` to the top of your file. In Visual Basic, add the `/d:TRACE=True` option to the compiler command line or add `#Const TRACE=True` to the file.

`ConditionalAttribute` is not supported by the C++ compiler. To provide equivalent functionality, you must enclose calls to the methods of `Trace` in an `#if defined(TRACE) ... #endif` block, and add the `/DTRACE` option to the compiler command line or add `#define TRACE` to the file.

#### Examples
The following example uses `Trace` to indicate the beginning and the end of a program's execution. The example also uses the `Trace.Indent` and `Trace.Unindent` methods to distinguish the tracing output. For a more complete example of the use of `Trace`, see How to: Add Trace Statements to Application Code.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Trace/Overview/source.cs._

## Trace.AutoFlush property

```csharp
public static bool AutoFlush { get; set; }
```

Gets or sets whether `Trace.Flush` should be called on the `Trace.Listeners` after every write.

Returns: `true` if `Trace.Flush` is called on the `Trace.Listeners` after every write; otherwise, `false`. The default is `false`.

#### Remarks

Flushing the stream doesn't flush its underlying encoder unless you explicitly call `Trace.Flush` or `Trace.Close`. Setting `Trace.AutoFlush` to `true` means that data will be flushed from the buffer to the stream, but the encoder state will not be flushed. This allows the encoder to keep its state (partial characters) so that it can encode the next block of characters correctly. This scenario affects UTF8 and UTF7 where certain characters can only be encoded after the encoder receives the adjacent character or characters.

## Trace.CorrelationManager property

```csharp
public static System.Diagnostics.CorrelationManager CorrelationManager { get; }
```

Gets the correlation manager for the thread for this trace.

Returns: The `CorrelationManager` object associated with the thread for this trace.

#### Remarks

> **Note:**
> This is an advanced property that most applications should not have occasion to use.

The `CorrelationManager` class provides methods used to store a logical operation identity in a thread-bound context and automatically tag each trace event generated by the thread with the stored identity.

## Trace.IndentLevel property

```csharp
public static int IndentLevel { get; set; }
```

Gets or sets the indent level.

Returns: The indent level. The default is zero.

#### Remarks
The `IndentLevel` property represents the number of times the indent of size `Trace.IndentSize` is applied. This property is stored on per-thread/per-request basis.

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

## Trace.IndentSize property

```csharp
public static int IndentSize { get; set; }
```

Gets or sets the number of spaces in an indent.

Returns: The number of spaces in an indent. The default is four.

#### Remarks
A `TextWriterTraceListener` interprets this number as spaces. An `EventLogTraceListener` ignores this value.

This property is stored on per-thread/per-request basis.

## Trace.Listeners property

```csharp
public static System.Diagnostics.TraceListenerCollection Listeners { get; }
```

Gets the collection of listeners that is monitoring the trace output.

Returns: A `TraceListenerCollection` that represents a collection of type `TraceListener` monitoring the trace output.

#### Remarks
The listeners produce formatted output from the trace output. By default, the collection contains an instance of the `DefaultTraceListener` class. If you want to remove the default listener, call the `TraceListenerCollection.Remove` method, and pass it the instance of the `DefaultTraceListener`. To redirect output to the console window, add an instance of the `ConsoleTraceListener` class.

> **Note:**
> The `Trace.Listeners` collection is shared by both the `Debug` and the `Trace` classes; adding a trace listener to either class adds the listener to both.

#### Examples
The following example creates a `ConsoleTraceListener` that outputs to the console screen. The code then adds the new listener to the `Trace.Listeners`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Trace/Listeners/source.cs._

## Trace.UseGlobalLock property

```csharp
public static bool UseGlobalLock { get; set; }
```

Gets or sets a value indicating whether the global lock should be used.

Returns: `true` if the global lock is to be used; otherwise, `false`. The default is `true`.

#### Remarks
The global lock is always used if the trace listener is not thread safe, regardless of the value of `Trace.UseGlobalLock`. The `IsThreadSafe` property is used to determine if the listener is thread safe. The global lock is not used only if the value of `Trace.UseGlobalLock` is `false` and the value of `TraceListener.IsThreadSafe` is `true`. The default behavior is to use the global lock.

## Trace.Assert(Boolean) method

```csharp
public static void Assert (bool condition);
```

Checks for a condition; if the condition is `false`, displays a message box that shows the call stack.

Parameters:

- `condition`: The conditional expression to evaluate. If the condition is `true`, a failure message is not sent and the message box is not displayed.

#### Remarks
Use the `Trace.Assert` method if you want to do assertions in release builds. The `Debug.Assert` method works only in debug builds. For more information, see Assertions in Managed Code.

Typically, the `Assert` method is used to identify logic errors during program development. `Assert` evaluates the condition. If the result is `false`, it sends a failure message to the `Trace.Listeners` collection. You can customize this behavior by adding a `TraceListener` to, or removing one from, the `Trace.Listeners` collection.

When the application runs in user-interface mode, it displays a message box that shows the call stack with file and line numbers. The message box contains three buttons: **Abort**, **Retry**, and **Ignore**. Clicking the **Abort** button terminates the application. Clicking **Retry** sends you to the code in the debugger if your application is running in a debugger, or offers to open a debugger if it is not. Clicking **Ignore** continues with the next instruction in the code.

> **Note:**
> The display of the message box depends on the presence of the `DefaultTraceListener`. If the `DefaultTraceListener` is not in the `Trace.Listeners` collection, the message box is not displayed. The `DefaultTraceListener` can be removed by calling the `TraceListenerCollection.Clear` method on the `Listeners` property (`System.Diagnostics.Trace.Listeners.Clear()`).

#### Examples
The following example creates an index for an array. Then some action is performed that sets the value of the index. Next the code calls `Trace.Assert` to verify the index value is valid. If it is not valid, the `Trace.Assert` outputs the call stack.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Trace/Assert/source.cs._

## Trace.Assert(Boolean, String) method

```csharp
public static void Assert (bool condition, string? message = default);
```

Checks for a condition; if the condition is `false`, outputs a specified message and displays a message box that shows the call stack.

Parameters:

- `condition`: The conditional expression to evaluate. If the condition is `true`, the specified message is not sent and the message box is not displayed.
- `message`: The message to send to the `Trace.Listeners` collection.

#### Remarks
Use the `Trace.Assert` method if you want to do assertions in release builds. The `Debug.Assert` method works only in debug builds. For more information, see Assertions in Managed Code.

Typically, the `Assert` method is used to identify logic errors during program development. `Assert` evaluates the condition. If the result is `false`, it sends the specified diagnostic message to the `Trace.Listeners` collection. You can customize this behavior by adding a `TraceListener` to, or removing one from, the `Trace.Listeners` collection.

When the application runs in user-interface mode, it displays a message box that shows the call stack with file and line numbers. The message box contains three buttons: **Abort**, **Retry**, and **Ignore**. Clicking the **Abort** button terminates the application. Clicking **Retry** sends you to the code in the debugger if your application is running in a debugger, or offers to open a debugger if it is not. Clicking **Ignore** continues with the next instruction in the code.

> **Note:**
> The display of the message box depends on the presence of the `DefaultTraceListener`. If the `DefaultTraceListener` is not in the `Trace.Listeners` collection, the message box is not displayed. The `DefaultTraceListener` can be removed by calling the `TraceListenerCollection.Clear` method on the `Listeners` property (`System.Diagnostics.Trace.Listeners.Clear()`).

#### Examples
The following example checks to see that the `type` parameter is valid. If the `type` passed in is `null`, the `Trace.Assert` outputs a message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Trace/Assert/source1.cs._

## Trace.Assert(Boolean, String, String) method

```csharp
public static void Assert (bool condition, string? message, string? detailMessage);
```

Checks for a condition; if the condition is `false`, outputs two specified messages and displays a message box that shows the call stack.

Parameters:

- `condition`: The conditional expression to evaluate. If the condition is `true`, the specified messages are not sent and the message box is not displayed.
- `message`: The message to send to the `Trace.Listeners` collection.
- `detailMessage`: The detailed message to send to the `Trace.Listeners` collection.

#### Remarks
Use the `Trace.Assert` method if you want to do assertions in release builds. The `Debug.Assert` method works only in debug builds. For more information, see Assertions in Managed Code.

Typically, the `Assert` method is used to identify logic errors during program development. `Trace.Assert` evaluates the condition. If the result is `false`, it sends the specified diagnostic message and detailed message to the `Trace.Listeners` collection. You can customize this behavior by adding a `TraceListener` to, or removing one from, the `Trace.Listeners` collection.

When the application runs in user-interface mode, it displays a message box that shows the call stack with file and line numbers. The message box contains three buttons: **Abort**, **Retry**, and **Ignore**. Clicking the **Abort** button terminates the application. Clicking **Retry** sends you to the code in the debugger if your application is running in a debugger, or offers to open a debugger if it is not. Clicking **Ignore** continues with the next instruction in the code.

> **Note:**
> The display of the message box depends on the presence of the `DefaultTraceListener`. If the `DefaultTraceListener` is not in the `Trace.Listeners` collection, the message box is not displayed. The `DefaultTraceListener` can be removed by calling the `TraceListenerCollection.Clear` method on the `Listeners` property (`System.Diagnostics.Trace.Listeners.Clear()`).

#### Examples
The following example checks to see that the `type` parameter is valid. If the `type` passed in is `null`, the `Trace.Assert` outputs a message.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Trace/Assert/source2.cs._
