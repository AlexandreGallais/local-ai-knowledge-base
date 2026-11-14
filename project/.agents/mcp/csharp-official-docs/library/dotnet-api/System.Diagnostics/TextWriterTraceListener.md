---
title: "TextWriterTraceListener class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/TextWriterTraceListener.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TextWriterTraceListener class

Namespace: `System.Diagnostics`

```csharp
public class TextWriterTraceListener : System.Diagnostics.TraceListener
```

Directs tracing or debugging output to a `TextWriter` or to a `Stream`, such as `FileStream`.

#### Remarks
The `TextWriterTraceListener` class provides the `Writer` property to get or set the text writer that receives the tracing or debugging output.

> **Important:**
> This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.

This class also provides methods to `TextWriterTraceListener.Close` the `TextWriterTraceListener.Writer` so that it no longer receives tracing or debugging output, to `TextWriterTraceListener.Flush` the output buffer for the `TextWriterTraceListener.Writer`, and to `TextWriterTraceListener.Write` a message to the `TextWriterTraceListener.Writer`.

You must enable tracing or debugging to use a trace listener.

> **Note:**
> If an attempt is made to write to a file that is in use or unavailable, the file name is automatically prefixed by a GUID.

#### Examples
The following example implements an instance of the `TextWriterTraceListener` class that uses a `StreamWriter` called `myOutputWriter` to write to a file named `TestFile.txt`. First the example creates a file for output. Then it creates the `StreamWriter` for the first text writer, assigns it the output file, and adds it to the `Trace.Listeners`. Then, the code outputs one line of text to the file. Finally, the example flushes the output buffer.

After running this sample, you can open the `TestFile.txt` file to see the output.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TextWriterTraceListener/Overview/source.cs._

## TextWriterTraceListener.TextWriterTraceListener() constructor

```csharp
public TextWriterTraceListener ();
```

Initializes a new instance of the `TextWriterTraceListener` class with `TextWriter` as the output recipient.

#### Remarks
This constructor uses the `TextWriter` stream as the recipient of the tracing or debugging output. Its `Name` property is initialized to an empty string ("", or `Empty`).

#### Examples
The following example creates a `TextWriterTraceListener` using the `%23ctor` constructor. It sets the `Writer` property to console output, and then adds the `TextWriterTraceListener` to the `TraceListenerCollection`. It writes a message in two segments, and then closes the `TextWriterTraceListener`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TextWriterTraceListener/.ctor/source1.cs._

## TextWriterTraceListener.TextWriterTraceListener(Stream) constructor

```csharp
public TextWriterTraceListener (System.IO.Stream stream);
```

Initializes a new instance of the `TextWriterTraceListener` class, using the stream as the recipient of the debugging and tracing output.

Parameters:

- `stream`: A `Stream` that represents the stream the `TextWriterTraceListener` writes to.

Exceptions:

- `ArgumentNullException`: The stream is `null`.

#### Remarks
This constructor initializes the `Name` property to an empty string ("").

#### Examples
The following code example creates a `TextWriterTraceListener` using the `%23ctor` constructor and adds it to the `TraceListenerCollection`. The example then writes two messages to this `TextWriterTraceListener`, and writes a message to all `TraceListener` objects in the `TraceListenerCollection`. Finally, it flushes and closes the `TextWriterTraceListener`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TextWriterTraceListener/.ctor/twtlconstream.cs._

## TextWriterTraceListener.TextWriterTraceListener(TextWriter) constructor

```csharp
public TextWriterTraceListener (System.IO.TextWriter writer);
```

Initializes a new instance of the `TextWriterTraceListener` class using the specified writer as recipient of the tracing or debugging output.

Parameters:

- `writer`: A `TextWriter` that receives the output from the `TextWriterTraceListener`.

Exceptions:

- `ArgumentNullException`: The writer is `null`.

#### Remarks
This constructor initializes the `Name` property to an empty string ("").

#### Examples
The following code example creates a `TextWriterTraceListener` using the `%23ctor` constructor. The example creates a `StreamWriter`, then references the `StreamWriter` when it creates the `TextWriterTraceListener`, which it then adds to the `TraceListenerCollection`. The example writes a message to all `TraceListener` objects in the `TraceListenerCollection`, then closes this `TextWriterTraceListener`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TextWriterTraceListener/.ctor/source.cs._

## TextWriterTraceListener.TextWriterTraceListener(String) constructor

```csharp
public TextWriterTraceListener (string? fileName);
```

Initializes a new instance of the `TextWriterTraceListener` class, using the file as the recipient of the debugging and tracing output.

Parameters:

- `fileName`: The name of the file the `TextWriterTraceListener` writes to.

Exceptions:

- `ArgumentNullException`: The file is `null`.

#### Remarks
This constructor initializes the `Name` property to an empty string ("").

#### Examples
The following code example creates a `TextWriterTraceListener` using the `%23ctor` constructor, then adds it to the `TraceListenerCollection`. The example writes two messages to this `TextWriterTraceListener`, then writes a message to all `TraceListener` objects in the `TraceListenerCollection`. Finally, it flushes and closes the `TextWriterTraceListener`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TextWriterTraceListener/.ctor/twtlconstring.cs._

## TextWriterTraceListener.TextWriterTraceListener(Stream, String) constructor

```csharp
public TextWriterTraceListener (System.IO.Stream stream, string? name);
```

Initializes a new instance of the `TextWriterTraceListener` class with the specified name, using the stream as the recipient of the debugging and tracing output.

Parameters:

- `stream`: A `Stream` that represents the stream the `TextWriterTraceListener` writes to.
- `name`: The name of the new instance.

Exceptions:

- `ArgumentNullException`: The stream is `null`.

#### Remarks
This constructor initializes the `Name` property to the `name` parameter or to an empty string (""), if the `name` parameter is `null`.

#### Examples
The following code example creates a `TextWriterTraceListener` using the `%23ctor` constructor and adds it to the `TraceListenerCollection`. The example then writes two messages to this `TextWriterTraceListener` and writes a message to all `TraceListener` objects in the `TraceListenerCollection`. Finally, it flushes and closes the `TextWriterTraceListener`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TextWriterTraceListener/.ctor/twtlconstreamname.cs._

## TextWriterTraceListener.TextWriterTraceListener(TextWriter, String) constructor

```csharp
public TextWriterTraceListener (System.IO.TextWriter writer, string? name);
```

Initializes a new instance of the `TextWriterTraceListener` class with the specified name, using the specified writer as recipient of the tracing or debugging output.

Parameters:

- `writer`: A `TextWriter` that receives the output from the `TextWriterTraceListener`.
- `name`: The name of the new instance.

Exceptions:

- `ArgumentNullException`: The writer is `null`.

#### Examples
The following code example creates a `TextWriterTraceListener` using the `%23ctor` constructor. The example creates a `StreamWriter`, then references the `StreamWriter` when it creates the `TextWriterTraceListener`, which it then adds to the `TraceListenerCollection`. The example writes two messages to this `TextWriterTraceListener`, then writes a message to all `TraceListener` objects in the `TraceListenerCollection`. Finally, it flushes and closes the `TextWriterTraceListener`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TextWriterTraceListener/.ctor/twtlconwritername.cs._

## TextWriterTraceListener.TextWriterTraceListener(String, String) constructor

```csharp
public TextWriterTraceListener (string? fileName, string? name);
```

Initializes a new instance of the `TextWriterTraceListener` class with the specified name, using the file as the recipient of the debugging and tracing output.

Parameters:

- `fileName`: The name of the file the `TextWriterTraceListener` writes to.
- `name`: The name of the new instance.

Exceptions:

- `ArgumentNullException`: The stream is `null`.

#### Remarks
This constructor initializes the `Name` property to the `name` parameter or to an empty string (""), if the `name` parameter is `null`.

#### Examples
The following code example creates a `TextWriterTraceListener` using the `%23ctor` constructor, then adds it to the `TraceListenerCollection`. The example writes two messages to this `TextWriterTraceListener`, then writes a message to all `TraceListener` objects in the `TraceListenerCollection`. Finally, it flushes and closes the `TextWriterTraceListener`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TextWriterTraceListener/.ctor/twtlconstringname.cs._

## TextWriterTraceListener.Writer property

```csharp
public System.IO.TextWriter? Writer { get; set; }
```

Gets or sets the text writer that receives the tracing or debugging output.

Returns: A `TextWriter` that represents the writer that receives the tracing or debugging output.

#### Examples
The following example creates a `TextWriterTraceListener` that writes to the console screen. Then the code adds the new trace listener to the `Trace.Listeners` in the trace class.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TextWriterTraceListener/Writer/source.cs._

## TextWriterTraceListener.Close() method

```csharp
public override void Close ();
```

Closes the `TextWriterTraceListener.Writer` so that it no longer receives tracing or debugging output.

#### Remarks
Calling a `TextWriterTraceListener.Write` or `TextWriterTraceListener.WriteLine` method after calling `TextWriterTraceListener.Close` automatically reopens the stream.

#### Examples
The following example implements a `TextWriterTraceListener` named `myTextListener`, which uses a `StreamWriter` called `myOutputWriter` to write to a file named `TestFile.txt`. The example creates the file, stream, and text writer, writes one line of text to the file, and then flushes and closes the stream.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TextWriterTraceListener/.ctor/source.cs._

## TextWriterTraceListener.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Disposes this `TextWriterTraceListener` object.

Parameters:

- `disposing`: `true` to release managed resources; if `false`, `TextWriterTraceListener.Dispose` has no effect.

#### Remarks
Use the `TextWriterTraceListener.Close` method of the `TextWriterTraceListener` class to release the managed resources of a `TextWriterTraceListener` object.

## TextWriterTraceListener.Flush() method

```csharp
public override void Flush ();
```

Flushes the output buffer for the `TextWriterTraceListener.Writer`.

#### Examples
The following example implements a `TextWriterTraceListener` named `myTextListener`, which uses a `StreamWriter` called `myOutputWriter` to write to a file named `TestFile.txt`. The example creates the file, stream, and text writer, writes one line of text to the file, and then flushes and closes the stream.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TextWriterTraceListener/.ctor/source.cs._

## TextWriterTraceListener.Write(String) method

```csharp
public override void Write (string? message);
```

Writes a message to this instance's `TextWriterTraceListener.Writer`.

Parameters:

- `message`: A message to write.

#### Examples
The following example implements a `TextWriterTraceListener` named `myWriter` to write to the console screen. The example writes two lines to the console screen. Note the second write appears on the same line as the first write. The example then flushes and closes the stream.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TextWriterTraceListener/Write/source.cs._

## TextWriterTraceListener.WriteLine(String) method

```csharp
public override void WriteLine (string? message);
```

Writes a message to this instance's `TextWriterTraceListener.Writer` followed by a line terminator. The default line terminator is a carriage return followed by a line feed (\r\n).

Parameters:

- `message`: A message to write.

#### Examples
The following example implements a `TextWriterTraceListener` named `myWriter` to write to the console screen. The example writes two lines to the console screen. Note the second write appears on the same line as the first write. The example then flushes and closes the stream.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TextWriterTraceListener/.ctor/source1.cs._
