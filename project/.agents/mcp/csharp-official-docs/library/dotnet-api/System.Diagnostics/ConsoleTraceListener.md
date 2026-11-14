---
title: "ConsoleTraceListener class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ConsoleTraceListener.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConsoleTraceListener class

Namespace: `System.Diagnostics`

```csharp
public class ConsoleTraceListener : System.Diagnostics.TextWriterTraceListener
```

Directs tracing or debugging output to either the standard output or the standard error stream.

#### Remarks
Use the `ConsoleTraceListener` class to write trace and debugging messages to the console. You can initialize a `ConsoleTraceListener` object to write trace messages to the `Console.Out` stream or to the `Console.Error` stream.

> **Important:**
> This type implements the `IDisposable` interface. When you have finished using the type, you should dispose of it either directly or indirectly. To dispose of the type directly, call its `IDisposable.Dispose` method in a`try`/`catch` block. To dispose of it indirectly, use a language construct such as `using` in C#.

When trace and debugging output is enabled, the `ConsoleTraceListener` messages are written to the specified `Console` stream, which is similar to the way messages are written with the `Console.Write` or `Console.WriteLine` methods. In a console application, the `Console` output and error streams write messages to the existing console window, or you can redirect the streams to write to a `TextWriter` instance.

> **Note:**
> If the console does not exist, as in a Windows-based application, messages written to the console are not displayed.

Add a `ConsoleTraceListener` object to the appropriate `Trace.Listeners` collection if you want messages written through `Trace`, `TraceSource`, or `Debug` to be written to the console. In addition, you can write messages directly to the console using the `Trace.Write` or `Trace.WriteLine` methods.

> **Note:**
>  The `Debug` and `Trace` classes share the same `TraceListenerCollection` collection, accessed through their respective `Listeners` properties. If you add a `ConsoleTraceListener` object to the collection using one of these classes, the other class automatically uses the same listener.

Most compilers enable trace and debug output through conditional compilation flags. If you do not enable tracing or debugging, the messages written through the `Debug` and `Trace` classes are effectively ignored.

To write trace and debug messages to the console for a specific section of code, initialize a `ConsoleTraceListener` object and add it to the `Trace.Listeners` collection. Instrument the section of code that contains messages using the `Trace` or `Debug` classes. At the end of the code section, remove the `ConsoleTraceListener` object from the `Trace.Listeners` collection, and call the `TextWriterTraceListener.Close` method on the `ConsoleTraceListener`.

#### Examples
The following code example implements a console application consisting of a class with two public methods.

The `Main` method examines the command-line arguments and determines if trace output should be directed to the standard error stream or the standard output stream. `Main` creates and initializes a `ConsoleTraceListener` object for the specified `Console` output stream, and adds this object to the trace listener collection. It then calls the `WriteEnvironmentInfoToTrace` method, which writes details about the executing environment and the trace listener configuration to the trace output.

When the example application runs, the environment and trace configuration details are written to the specified console output stream through the `ConsoleTraceListener` object.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/ConsoleTraceListener/Overview/program.cs._

## ConsoleTraceListener.ConsoleTraceListener() constructor

```csharp
public ConsoleTraceListener ();
```

Initializes a new instance of the `ConsoleTraceListener` class with trace output written to the standard output stream.

#### Remarks
This constructor initializes a `ConsoleTraceListener` object to write messages to the `Console.Out` stream. Its `Name` property is initialized to an empty string ("").

#### Examples
The following code example initializes a `ConsoleTraceListener` object for the specified `Console` output stream and adds it to the trace listener collection. This code example is part of a larger example provided for the `ConsoleTraceListener` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/ConsoleTraceListener/Overview/program.cs._

## ConsoleTraceListener.ConsoleTraceListener(Boolean) constructor

```csharp
public ConsoleTraceListener (bool useErrorStream);
```

Initializes a new instance of the `ConsoleTraceListener` class with an option to write trace output to the standard output stream or the standard error stream.

Parameters:

- `useErrorStream`: `true` to write tracing and debugging output to the standard error stream; `false` to write tracing and debugging output to the standard output stream.

#### Remarks
This constructor initializes a `ConsoleTraceListener` object to write messages to either the `Console.Out` or the `Console.Error` stream. Its `Name` property is initialized to an empty string ("").

#### Examples
The following code example initializes a `ConsoleTraceListener` object for the specified `Console` output stream and adds it to the trace listener collection. This code example is part of a larger example provided for the `ConsoleTraceListener` class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/ConsoleTraceListener/Overview/program.cs._

## ConsoleTraceListener.Close() method

```csharp
public override void Close ();
```

Closes the output to the stream specified for this trace listener.

#### Remarks
The stream specified for this `ConsoleTraceListener` instance (either the `Console.Out` stream or the `Console.Error` stream) is closed.
