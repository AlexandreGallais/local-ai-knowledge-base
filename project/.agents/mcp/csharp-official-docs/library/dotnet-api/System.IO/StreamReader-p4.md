---
title: "StreamReader class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/StreamReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StreamReader class (part 4 of 4)

## StreamReader.ReadBlockAsync(Char>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<int> ReadBlockAsync (Memory<char> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads the characters from the current stream and writes the data to a buffer.

Parameters:

- `buffer`: When this method returns, contains the specified memory block of characters replaced by the characters read from the current source.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A value task that represents the asynchronous read operation. The value of the type parameter of the value task contains the total number of characters read into the buffer. The result value can be less than the number of characters requested if the number of characters currently available is less than the requested number, or it can be 0 (zero) if the end of the stream has been reached.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## StreamReader.ReadBlockAsync(Char[], Int32, Int32) method

```csharp
public override System.Threading.Tasks.Task<int> ReadBlockAsync (char[] buffer, int index, int count);
```

Reads a specified maximum number of characters from the current stream asynchronously and writes the data to a buffer, beginning at the specified index.

Parameters:

- `buffer`: When this method returns, contains the specified character array with the values between `index` and (`index` + `count` - 1) replaced by the characters read from the current source.
- `index`: The position in `buffer` at which to begin writing.
- `count`: The maximum number of characters to read. If the end of the stream is reached before the specified number of characters is written into the buffer, the method returns.

Returns: A task that represents the asynchronous read operation. The value of the `TResult` parameter contains the total number of characters read into the buffer. The result value can be less than the number of characters requested if the number of characters currently available is less than the requested number, or it can be 0 (zero) if the end of the stream has been reached.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `ArgumentException`: The sum of `index` and `count` is larger than the buffer length.
- `ObjectDisposedException`: The stream has been disposed.
- `InvalidOperationException`: The reader is currently in use by a previous read operation.

#### Remarks
The task does not complete until either the number of characters specified by the `count` parameter are read, or the end of the stream has been reached.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadBlock`.

## StreamReader.ReadLine() method

```csharp
public override string? ReadLine ();
```

Reads a line of characters from the current stream and returns the data as a string.

Returns: The next line from the input stream, or `null` if the end of the input stream is reached.

Exceptions:

- `OutOfMemoryException`: There is insufficient memory to allocate a buffer for the returned string.
- `IOException`: An I/O error occurs.

#### Remarks
A line is defined as a sequence of characters followed by a line feed ("\n"), a carriage return ("\r"), or a carriage return immediately followed by a line feed ("\r\n"). The string that is returned does not contain the terminating carriage return or line feed. The returned value is `null` if the end of the input stream is reached.

If the stream ends with a newline sequence, no additional empty line is returned. For example, a stream containing `"line1\nline2\n"` produces the same two lines (`"line1"` and `"line2"`) as a stream containing `"line1\nline2"`.

This method overrides `TextReader.ReadLine`.

If the current method throws an `OutOfMemoryException`, the reader's position in the underlying `Stream` object is advanced by the number of characters the method was able to read, but the characters already read into the internal `StreamReader.ReadLine` buffer are discarded. If you manipulate the position of the underlying stream after reading data into the buffer, the position of the underlying stream might not match the position of the internal buffer. To reset the internal buffer, call the `StreamReader.DiscardBufferedData` method; however, this method slows performance and should be called only when absolutely necessary.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example reads lines from a file until the end of the file is reached.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/ReadLine/strmreader readline.cs._

## StreamReader.ReadLineAsync() method

```csharp
public override System.Threading.Tasks.Task<string?> ReadLineAsync ();
```

Reads a line of characters asynchronously from the current stream and returns the data as a string.

Returns: A task that represents the asynchronous read operation. The value of the `TResult` parameter contains the next line from the stream, or is `null` if all the characters have been read.

Exceptions:

- `ArgumentOutOfRangeException`: The number of characters in the next line is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ObjectDisposedException`: The stream has been disposed.
- `InvalidOperationException`: The reader is currently in use by a previous read operation.

#### Remarks

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadLine`.

#### Examples
The following example shows how to read the first line of a file by using the `ReadLineAsync` method.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/Overview/example41.cs._

## StreamReader.ReadLineAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<string?> ReadLineAsync (System.Threading.CancellationToken <example-value>);
```

Reads a line of characters asynchronously from the current stream and returns the data as a string.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A value task that represents the asynchronous read operation. The value of the `TResult` parameter contains the next line from the stream, or is `null` if all of the characters have been read.

Exceptions:

- `ArgumentOutOfRangeException`: The number of characters in the next line is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ObjectDisposedException`: The stream reader has been disposed.
- `InvalidOperationException`: The reader is currently in use by a previous read operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

If this method is canceled via `cancellationToken`, some data that has been read from the current `Stream` but not stored (by the `StreamReader`) or returned (to the caller) may be lost.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadLine`.

## StreamReader.ReadToEnd() method

```csharp
public override string ReadToEnd ();
```

Reads all characters from the current position to the end of the stream.

Returns: The rest of the stream as a string, from the current position to the end. If the current position is at the end of the stream, returns an empty string ("").

Exceptions:

- `OutOfMemoryException`: There is insufficient memory to allocate a buffer for the returned string.
- `IOException`: An I/O error occurs.

#### Remarks
This method overrides `TextReader.ReadToEnd`.

`StreamReader.ReadToEnd` works best when you need to read all the input from the current position to the end of the stream. If more control is needed over how many characters are read from the stream, use the `Read` method overload, which generally results in better performance.

`StreamReader.ReadToEnd` assumes that the stream knows when it has reached an end. For interactive protocols in which the server sends data only when you ask for it and does not close the connection, `StreamReader.ReadToEnd` might block indefinitely because it does not reach an end, and should be avoided.

Note that when using the `StreamReader.Read` method, it is more efficient to use a buffer that is the same size as the internal buffer of the stream. If the size of the buffer was unspecified when the stream was constructed, its default size is 4 kilobytes (4096 bytes).

If the current method throws an `OutOfMemoryException`, the reader's position in the underlying `Stream` object is advanced by the number of characters the method was able to read, but the characters already read into the internal `StreamReader.ReadLine` buffer are discarded. If you manipulate the position of the underlying stream after reading data into the buffer, the position of the underlying stream might not match the position of the internal buffer. To reset the internal buffer, call the `StreamReader.DiscardBufferedData` method; however, this method slows performance and should be called only when absolutely necessary.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example reads all the way to the end of a file in one operation.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/ReadToEnd/strmreader readtoend.cs._

## StreamReader.ReadToEndAsync() method

```csharp
public override System.Threading.Tasks.Task<string> ReadToEndAsync ();
```

Reads all characters from the current position to the end of the stream asynchronously and returns them as one string.

Returns: A task that represents the asynchronous read operation. The value of the `TResult` parameter contains a string with the characters from the current position to the end of the stream.

Exceptions:

- `ArgumentOutOfRangeException`: The number of characters is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ObjectDisposedException`: The stream has been disposed.
- `InvalidOperationException`: The reader is currently in use by a previous read operation.

#### Remarks

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadToEnd`.

#### Examples
The following example shows how to read the contents of a file by using the `ReadToEndAsync` method.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/Overview/example40.cs._

## StreamReader.ReadToEndAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.Task<string> ReadToEndAsync (System.Threading.CancellationToken <example-value>);
```

Reads all characters from the current position to the end of the stream asynchronously and returns them as one string.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous read operation. The value of the `TResult` parameter contains a string with the characters from the current position to the end of the stream.

Exceptions:

- `ArgumentOutOfRangeException`: The number of characters is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ObjectDisposedException`: The stream reader has been disposed.
- `InvalidOperationException`: The reader is currently in use by a previous read operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

If this method is canceled via `cancellationToken`, some data
that has been read from the current `Stream` but not stored (by the
`StreamReader`) or returned (to the caller) may be lost.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadToEnd`.

## StreamReader.Null field

```csharp
public static readonly System.IO.StreamReader Null;
```

A `StreamReader` object around an empty stream.

#### Remarks
When read methods are invoked on `Null`, zero is always returned. When `StreamReader.ReadLine` is invoked on `Null`, `null` is returned.

For a list of common I/O tasks, see Common I/O Tasks.
