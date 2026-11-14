---
title: "StreamWriter class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/StreamWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StreamWriter class (part 2 of 4)

## StreamWriter.StreamWriter(Stream, Encoding, Int32, Boolean) constructor

```csharp
public StreamWriter (System.IO.Stream stream, System.Text.Encoding? encoding = default, int bufferSize = -1, bool leaveOpen = false);
```

Initializes a new instance of the `StreamWriter` class for the specified stream by using the specified encoding and buffer size, and optionally leaves the stream open.

Parameters:

- `stream`: The stream to write to.
- `encoding`: The character encoding to use.
- `bufferSize`: The buffer size, in characters.
- `leaveOpen`: `true` to leave the stream open after the `StreamWriter` object is disposed; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `stream` or `encoding` is `null`.
- `ArgumentOutOfRangeException`: `bufferSize` is less than or equal to zero, except for -1, which is allowed to indicate the default buffer size.
- `ArgumentException`: `stream` is not writable.

#### Remarks
Unless you set the `leaveOpen` parameter to `true`, the `StreamWriter` object calls `Dispose` on the provided `Stream` object when `StreamWriter.Dispose` is called.

This constructor initializes the `Encoding` property by using the `encoding` parameter, and initializes the `BaseStream` property by using the `stream` parameter. The position of the stream is not reset. For additional information, see the `Encoding` property.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

#### Examples
The following example demonstrates this constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StreamWriter/.ctor/program4.cs._

## StreamWriter.StreamWriter(String, Boolean, Encoding, Int32) constructor

```csharp
public StreamWriter (string path, bool append, System.Text.Encoding? encoding, int bufferSize);
```

Initializes a new instance of the `StreamWriter` class for the specified file on the specified path, using the specified encoding and buffer size. If the file exists, it can be either overwritten or appended to. If the file does not exist, this constructor creates a new file.

Parameters:

- `path`: The complete file path to write to.
- `append`: `true` to append data to the file; `false` to overwrite the file. If the specified file does not exist, this parameter has no effect, and the constructor creates a new file.
- `encoding`: The character encoding to use.
- `bufferSize`: The buffer size, in characters.

Exceptions:

- `ArgumentException`: `path` is an empty string ("").

-or-

`path` contains the name of a system device (com1, com2, and so on).
- `ArgumentNullException`: `path` or `encoding` is `null`.
- `ArgumentOutOfRangeException`: `bufferSize` is less than or equal to zero, except for -1, which is allowed to indicate the default buffer size.
- `IOException`: `path` includes an incorrect or invalid syntax for file name, directory name, or volume label syntax.
- `SecurityException`: The caller does not have the required permission.
- `UnauthorizedAccessException`: Access is denied.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.

#### Remarks
This constructor initializes the `Encoding` property using the encoding parameter. For additional information, see `TextWriter.Encoding`.

`path` can be a file name, including a file on a Universal Naming Convention (UNC) share.

`path` is not required to be a file stored on disk; it can be any part of a system that supports access via streams.

> **Caution:**
> When you compile a set of characters with a particular cultural setting and retrieve those same characters with a different cultural setting, the characters might not be interpretable, and could cause an exception to be thrown.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates this constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StreamWriter/.ctor/program8.cs._

## StreamWriter.AutoFlush property

```csharp
public virtual bool AutoFlush { get; set; }
```

Gets or sets a value indicating whether the `StreamWriter` will flush its buffer to the underlying stream after every call to `StreamWriter.Write`.

Returns: `true` to force `StreamWriter` to flush its buffer; otherwise, `false`.

#### Remarks
Flushing the stream will not flush its underlying encoder unless you explicitly call `StreamWriter.Flush` or `StreamWriter.Close`. Setting `StreamWriter.AutoFlush` to `true` means that data will be flushed from the buffer to the stream after each write operation, but the encoder state will not be flushed. This allows the encoder to keep its state (partial characters) so that it can encode the next block of characters correctly. This scenario affects UTF8 and UTF7 where certain characters can only be encoded after the encoder receives the adjacent character or characters.

When `AutoFlush` is set to `false`, `StreamWriter` will do a limited amount of buffering, both internally and potentially in the encoder from the encoding you passed in. You can get better performance by setting `AutoFlush` to `false`, assuming that you always call `Close` (or at least `Flush`) when you're done writing with a `StreamWriter`.

For example, set `AutoFlush` to `true` when you are writing to a device where the user expects immediate feedback. `Console.Out` is one of these cases: The `StreamWriter` used internally for writing to `Console` flushes all its internal state except the encoder state after every call to `StreamWriter.Write`.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example shows the syntax for using the `AutoFlush` property.

_Code sample not included: ~/snippets/csharp/System.IO/StreamWriter/AutoFlush/logger.cs._

## StreamWriter.BaseStream property

```csharp
public virtual System.IO.Stream BaseStream { get; }
```

Gets the underlying stream that interfaces with a backing store.

Returns: The stream this `StreamWriter` is writing to.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.

## StreamWriter.Encoding property

```csharp
public override System.Text.Encoding Encoding { get; }
```

Gets the `Encoding` in which the output is written.

Returns: The `Encoding` specified in the constructor for the current instance, or `UTF8Encoding` if an encoding was not specified.

#### Remarks
This property is necessary for some XML scenarios where a header must be written containing the encoding used by the `StreamWriter`. This allows the XML code to consume an arbitrary `StreamWriter` and generate the correct XML header.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example retrieves the encoding of the specified `StreamWriter` instance.

_Code sample not included: ~/snippets/csharp/System.IO/StreamWriter/AutoFlush/logger.cs._

## StreamWriter.Close() method

```csharp
public override void Close ();
```

Closes the current `StreamWriter` object and the underlying stream.

Exceptions:

- `EncoderFallbackException`: The current encoding does not support displaying half of a Unicode surrogate pair.

#### Remarks
This method overrides `Stream.Close`.

This implementation of `StreamWriter.Close` calls the `StreamWriter.Dispose` method passing a `true` value.

You must call `StreamWriter.Close` to ensure that all data is correctly written out to the underlying stream. Following a call to `StreamWriter.Close`, any operations on the `StreamWriter` might raise exceptions. If there is insufficient space on the disk, calling `StreamWriter.Close` will raise an exception.

Flushing the stream will not flush its underlying encoder unless you explicitly call `StreamWriter.Flush` or `StreamWriter.Close`. Setting `StreamWriter.AutoFlush` to `true` means that data will be flushed from the buffer to the stream, but the encoder state will not be flushed. This allows the encoder to keep its state (partial characters) so that it can encode the next block of characters correctly. This scenario affects UTF8 and UTF7 where certain characters can only be encoded after the encoder receives the adjacent character or characters.

#### Examples
The following code example demonstrates the `Close` method.

_Code sample not included: ~/snippets/csharp/System.IO/StreamWriter/AutoFlush/logger.cs._

## StreamWriter.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Causes any buffered data to be written to the underlying stream, releases the unmanaged resources used by the `StreamWriter`, and optionally the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

Exceptions:

- `EncoderFallbackException`: The current encoding does not support displaying half of a Unicode surrogate pair.

#### Remarks
When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `StreamWriter` references. This method invokes the `Dispose` method of each referenced object.

## StreamWriter.DisposeAsync() method

```csharp
public override System.Threading.Tasks.ValueTask DisposeAsync ();
```

Asynchronously writes any buffered data to the underlying stream and releases the unmanaged resources used by the `StreamWriter`.

Returns: A task that represents the asynchronous dispose operation.

To be added.

## StreamWriter.Flush() method

```csharp
public override void Flush ();
```

Clears all buffers for the current writer and causes any buffered data to be written to the underlying stream.

Exceptions:

- `ObjectDisposedException`: The current writer is closed.
- `IOException`: An I/O error has occurred.
- `EncoderFallbackException`: The current encoding does not support displaying half of a Unicode surrogate pair.

#### Remarks
This method overrides `TextWriter.Flush`.

Flushing the stream will not flush its underlying encoder unless you explicitly call `Flush` or `StreamWriter.Close`. Setting `StreamWriter.AutoFlush` to `true` means that data will be flushed from the buffer to the stream after each write operation, but the encoder state will not be flushed. This allows the encoder to keep its state (partial characters) so that it can encode the next block of characters correctly. This scenario affects UTF8 and UTF7 where certain characters can only be encoded after the encoder receives the adjacent character or characters.

For a list of common I/O tasks, see Common I/O Tasks.

## StreamWriter.FlushAsync() method

```csharp
public override System.Threading.Tasks.Task FlushAsync ();
```

Clears all buffers for this stream asynchronously and causes any buffered data to be written to the underlying device.

Returns: A task that represents the asynchronous flush operation.

Exceptions:

- `ObjectDisposedException`: The stream has been disposed.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `StreamWriter.Flush`.

## StreamWriter.FlushAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.Task FlushAsync (System.Threading.CancellationToken <example-value>);
```

Clears all buffers for this stream asynchronously and causes any buffered data to be written to the underlying device.

Parameters:

- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests.

Returns: A `Task` that represents the asynchronous flush operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## StreamWriter.Write(Char) method

```csharp
public override void Write (char value);
```

Writes a character to the stream.

Parameters:

- `value`: The character to write to the stream.

Exceptions:

- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: `StreamWriter.AutoFlush` is true or the `StreamWriter` buffer is full, and current writer is closed.
- `NotSupportedException`: `StreamWriter.AutoFlush` is true or the `StreamWriter` buffer is full, and the contents of the buffer cannot be written to the underlying fixed size stream because the `StreamWriter` is at the end the stream.

#### Remarks
This method overrides `TextWriter.Write`.

The specified character is written to the underlying stream unless the end of the stream is reached prematurely. If `StreamWriter.AutoFlush` is `true`, `StreamWriter.Flush` is invoked automatically.

For a list of common I/O tasks, see Common I/O Tasks.

## StreamWriter.Write(Char[]) method

```csharp
public override void Write (char[]? buffer);
```

Writes a character array to the stream.

Parameters:

- `buffer`: A character array containing the data to write. If `buffer` is `null`, nothing is written.

Exceptions:

- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: `StreamWriter.AutoFlush` is true or the `StreamWriter` buffer is full, and current writer is closed.
- `NotSupportedException`: `StreamWriter.AutoFlush` is true or the `StreamWriter` buffer is full, and the contents of the buffer cannot be written to the underlying fixed size stream because the `StreamWriter` is at the end the stream.

#### Remarks
This method overrides `TextWriter.Write`.

The specified characters are written to the underlying stream unless the end of the stream is reached prematurely. If `StreamWriter.AutoFlush` is `true`, `StreamWriter.Flush` is invoked automatically.

This method might provide faster performance than `Write` (`char[],``int,``int`) because it has fewer arguments to check.

For a list of common I/O tasks, see Common I/O Tasks.

## StreamWriter.Write(Char>) method

```csharp
public override void Write (ReadOnlySpan<char> buffer);
```

Writes a character span to the stream.

Parameters:

- `buffer`: The character span to write.

To be added.
