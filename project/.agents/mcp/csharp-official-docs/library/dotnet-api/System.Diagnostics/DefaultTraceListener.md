---
title: "DefaultTraceListener class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/DefaultTraceListener.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DefaultTraceListener class

Namespace: `System.Diagnostics`

```csharp
public class DefaultTraceListener : System.Diagnostics.TraceListener
```

Provides the default output methods and behavior for tracing.

#### Remarks
An instance of this class is automatically added to the `Debug.Listeners` and `Trace.Listeners` collections. Explicitly adding a second `DefaultTraceListener` causes duplicate messages in the debugger output window and duplicate message boxes for asserts.

By default, the `DefaultTraceListener.Write` and `DefaultTraceListener.WriteLine` methods emit the message to the Win32 OutputDebugString function and to the `Debugger.Log` method.

The `DefaultTraceListener.Fail` method, by default, displays a message box when the application is running in a user interface mode; it also emits the message using `DefaultTraceListener.WriteLine`.

> **Note:**
> The display of the message box for `Debug.Assert` and `Debug.Fail` method calls depends on the presence of the `DefaultTraceListener`. If the `DefaultTraceListener` is not in the `Trace.Listeners` collection, the message box is not displayed. The `DefaultTraceListener` can be removed by calling the `TraceListenerCollection.Clear` method on the `Listeners` property (`System.Diagnostics.Trace.Listeners.Clear()`).

You must enable tracing or debugging to use a trace listener.

#### Examples
The following code example calculates binomial coefficients, which are values used in probability and statistics. This example uses a `DefaultTraceListener` to trace results and log errors. It creates a new `DefaultTraceListener`, adds it to the `Trace.Listeners` collection, and sets the `LogFileName` property to the log file specified in the command-line arguments.

If an error is detected while processing the input parameter, or if the `CalcBinomial` function throws an exception, the `DefaultTraceListener.Fail` method logs and displays an error message. If the `AssertUiEnabled` property is `false`, the error message is also written to the console. When the result is calculated successfully, the `Write` and `WriteLine` methods write the results to the log file.

The `DefaultTraceListener.Fail`, `DefaultTraceListener.Write`, and `DefaultTraceListener.WriteLine` methods cause trace information to be written only to the `DefaultTraceListener`. To write trace information to all listeners in the `Trace.Listeners` collection, use the `Trace.Fail`, `Trace.Write`, and `Trace.WriteLine` methods of the `Trace` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DefaultTraceListener/Overview/binomial.cs._

## DefaultTraceListener.DefaultTraceListener() constructor

```csharp
public DefaultTraceListener ();
```

Initializes a new instance of the `DefaultTraceListener` class with "Default" as its `TraceListener.Name` property value.

#### Examples
The following code example removes the `DefaultTraceListener` provided by the application from the `Trace.Listeners` collection and then creates a new `DefaultTraceListener` and adds it to the `Trace.Listeners` collection.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DefaultTraceListener/Overview/binomial.cs._

## DefaultTraceListener.AssertUiEnabled property

```csharp
public bool AssertUiEnabled { get; set; }
```

Gets or sets a value indicating whether the application is running in user-interface mode.

Returns: `true` if user-interface mode is enabled; otherwise, `false`.

#### Examples
The following code example calls a function that calls the `Fail` method to log an error message if the function throws an exception. If the `AssertUiEnabled` property is `false`, the method also writes the error message to the console.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DefaultTraceListener/Overview/binomial.cs._

## DefaultTraceListener.LogFileName property

```csharp
public string? LogFileName { get; set; }
```

Gets or sets the name of a log file to write trace or debug messages to.

Returns: The name of a log file to write trace or debug messages to.

#### Examples
The following code example creates a new `DefaultTraceListener`, adds it to the `Trace.Listeners` collection, and sets the `LogFileName` property to the log file specified in the command-line arguments.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DefaultTraceListener/Overview/binomial.cs._

## DefaultTraceListener.Fail(String) method

```csharp
public override void Fail (string? message);
```

Emits or displays a message and a stack trace for an assertion that always fails.

Parameters:

- `message`: The message to emit or display.

#### Remarks
By default, this method sends the `message` parameter and a stack trace to a message box (when the application runs in user-interface mode) and to the `DefaultTraceListener` instance.

#### Examples
The following code example writes an error message to a `DefaultTraceListener` using the `Fail` method. The method also writes the message to the console if a user interface is not available.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DefaultTraceListener/Overview/binomial.cs._

## DefaultTraceListener.Fail(String, String) method

```csharp
public override void Fail (string? message, string? detailMessage);
```

Emits or displays detailed messages and a stack trace for an assertion that always fails.

Parameters:

- `message`: The message to emit or display.
- `detailMessage`: The detailed message to emit or display.

#### Remarks
By default, this method sends the `message` parameter, the `detailMessage` parameter, and a stack trace to a message box (when the application runs in user-interface mode) and to the `DefaultTraceListener` instance.

#### Examples
The following code example calls a function that calls the `Fail` method to log a detailed error message if the function throws an exception. The method writes the message to the console if a user interface is not available.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DefaultTraceListener/Overview/binomial.cs._

## DefaultTraceListener.Write(String) method

```csharp
public override void Write (string? message);
```

Writes the output to the `OutputDebugString` function and to the `Debugger.Log` method.

Parameters:

- `message`: The message to write to `OutputDebugString` and `Debugger.Log`.

#### Remarks
For information about the Win32 `OutputDebugString` debugging function, see "OutputDebugString" in the Platform SDK or MSDN.

#### Examples
The following code example formats the results of a function and uses the `Write` method to write the first part of the message to a `DefaultTraceListener`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DefaultTraceListener/Write/defaulttracelistener.cs._

## DefaultTraceListener.WriteLine(String) method

```csharp
public override void WriteLine (string? message);
```

Writes the output to the `OutputDebugString` function and to the `Debugger.Log` method, followed by a carriage return and line feed (\r\n).

Parameters:

- `message`: The message to write to `OutputDebugString` and `Debugger.Log`.

#### Remarks
The default line terminator is a carriage return followed by a line feed (\r\n).

For information about the Win32 `OutputDebugString` debugging function, see the Platform SDK or MSDN.

This method sets the `NeedIndent` property to `true`.

#### Examples
The following code example formats the results of a function and uses the `WriteLine` method to write the last part of the message to a `DefaultTraceListener`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/DefaultTraceListener/Write/defaulttracelistener.cs._
