---
title: "StreamReader class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/StreamReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StreamReader class (part 3 of 4)

## StreamReader.Close() method

```csharp
public override void Close ();
```

Closes the `StreamReader` object and the underlying stream, and releases any system resources associated with the reader.

#### Remarks

This method overrides the `TextReader.Close` method.

This implementation of `StreamReader.Close` calls the `StreamReader.Dispose` method, passing a `true` value.

Following a call to `StreamReader.Close`, any operations on the reader might raise exceptions.

## StreamReader.DiscardBufferedData() method

```csharp
public void DiscardBufferedData ();
```

Clears the internal buffer.

#### Remarks
Use the `StreamReader.DiscardBufferedData` method to reset the internal buffer for the `StreamReader` object. You need to call this method only when the position of the internal buffer and the `StreamReader.BaseStream` do not match. These positions can become mismatched when you read data into the buffer and then seek a new position in the underlying stream. This method slows performance and should be used only when absolutely necessary, such as when you want to read a portion of the contents of a `StreamReader` object more than once.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example shows a scenario where the `StreamReader.DiscardBufferedData` method must be called to synchronize the internal buffer and the underlying stream. The file in the example is used to illustrate position and consists of the text `abcdefghijklmnopqrstuvwxyz`. By calling `StreamReader.DiscardBufferedData` after the data is read, the example works as expected. After the first 15 characters are read, the position is reset to the offset value of 2 and all the remaining characters are read. If you remove the call to `StreamReader.DiscardBufferedData`, the example does not work as expected. The first 15 characters are read, but only the position of the underlying stream is reset. The internal buffer of the `StreamReader` object is still on the 16th character. Therefore, `StreamReader.ReadToEnd` returns all the characters in the buffer plus the characters in the underlying stream starting from the reset position.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/Overview/program.cs._

## StreamReader.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Closes the underlying stream, releases the unmanaged resources used by the `StreamReader`, and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `IDisposable.Dispose` method and the `Finalize` method, if it has been overridden. `IDisposable.Dispose` invokes the protected `StreamReader.Dispose` method with the `disposing` parameter set to true. `Finalize` invokes `StreamReader.Dispose` with `disposing` set to false.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that the `StreamReader` object references. This method invokes the `IDisposable.Dispose` method of each referenced object.

.

## StreamReader.Peek() method

```csharp
public override int Peek ();
```

Returns the next available character but does not consume it.

Returns: An integer representing the next character to be read, or -1 if there are no characters to be read or if the stream does not support seeking.

Exceptions:

- `IOException`: An I/O error occurs.

#### Remarks
The `StreamReader.Peek` method returns an integer value in order to determine whether the end of the file, or another error has occurred. This allows a user to first check if the returned value is -1 before casting it to a `Char` type.

This method overrides `TextReader.Peek`.

The current position of the `StreamReader` object is not changed by `StreamReader.Peek`.

#### Examples
The following code example reads lines from a file until the end of the file is reached.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/Peek/strmreader peek.cs._

## StreamReader.Read() method

```csharp
public override int Read ();
```

Reads the next character from the input stream and advances the character position by one character.

Returns: The next character from the input stream represented as an `Int32` object, or -1 if no more characters are available.

Exceptions:

- `IOException`: An I/O error occurs.

#### Remarks
This method overrides `TextReader.Read`.

This method returns an integer so that it can return -1 if the end of the stream has been reached. If you manipulate the position of the underlying stream after reading data into the buffer, the position of the underlying stream might not match the position of the internal buffer. To reset the internal buffer, call the `StreamReader.DiscardBufferedData` method; however, this method slows performance and should be called only when absolutely necessary.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example demonstrates a simple use of the `StreamReader.Read` method.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/Read/strmreader read1.cs._

The following code example demonstrates reading a single character using the `Read` method overload, formatting the ASCII integer output as decimal and hexadecimal.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/Read/strmrdrread.cs._

## StreamReader.Read(Char>) method

```csharp
public override int Read (Span<char> buffer);
```

Reads the characters from the current stream into a span.

Parameters:

- `buffer`: When this method returns, contains the specified span of characters replaced by the characters read from the current source.

Returns: The number of characters that have been read, or 0 if at the end of the stream and no data was read. The number will be less than or equal to the `buffer` length, depending on whether the data is available within the stream.

Exceptions:

- `IOException`: The number of characters read from the stream is larger than the `buffer` length.
- `ArgumentNullException`: `buffer` is `null`.

To be added.

## StreamReader.Read(Char[], Int32, Int32) method

```csharp
public override int Read (char[] buffer, int index, int count);
```

Reads a specified maximum of characters from the current stream into a buffer, beginning at the specified index.

Parameters:

- `buffer`: When this method returns, contains the specified character array with the values between `index` and (`index + count - 1`) replaced by the characters read from the current source.
- `index`: The index of `buffer` at which to begin writing.
- `count`: The maximum number of characters to read.

Returns: The number of characters that have been read, or 0 if at the end of the stream and no data was read. The number will be less than or equal to the `count` parameter, depending on whether the data is available within the stream.

Exceptions:

- `ArgumentException`: The buffer length minus `index` is less than `count`.
- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `IOException`: An I/O error occurs, such as the stream is closed.

#### Remarks
This method overrides `TextReader.Read`.

This method returns an integer so that it can return 0 if the end of the stream has been reached.

When using the `StreamReader.Read` method, it is more efficient to use a buffer that is the same size as the internal buffer of the stream, where the internal buffer is set to your desired block size, and to always read less than the block size. If the size of the internal buffer was unspecified when the stream was constructed, its default size is 4 kilobytes (4096 bytes). If you manipulate the position of the underlying stream after reading data into the buffer, the position of the underlying stream might not match the position of the internal buffer. To reset the internal buffer, call the `StreamReader.DiscardBufferedData` method; however, this method slows performance and should be called only when absolutely necessary.

This method returns after either the number of characters specified by the `count` parameter are read, or the end of the file is reached. `TextReader.ReadBlock` is a blocking version of `StreamReader.Read`.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following code example reads five characters at a time until the end of the file is reached.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/Read/strmreader read2.cs._

## StreamReader.ReadAsync(Char>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<int> ReadAsync (Memory<char> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads the characters from the current stream into a memory block.

Parameters:

- `buffer`: When this method returns, contains the specified memory block of characters replaced by the characters read from the current source.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A value task that represents the asynchronous read operation. The value of the type parameter of the value task contains the number of characters that have been read, or 0 if at the end of the stream and no data was read. The number will be less than or equal to the `buffer` length, depending on whether the data is available within the stream.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## StreamReader.ReadAsync(Char[], Int32, Int32) method

```csharp
public override System.Threading.Tasks.Task<int> ReadAsync (char[] buffer, int index, int count);
```

Reads a specified maximum number of characters from the current stream asynchronously and writes the data to a buffer, beginning at the specified index.

Parameters:

- `buffer`: When this method returns, contains the specified character array with the values between `index` and (`index` + `count` - 1) replaced by the characters read from the current source.
- `index`: The position in `buffer` at which to begin writing.
- `count`: The maximum number of characters to read. If the end of the stream is reached before the specified number of characters is written into the buffer, the current method returns.

Returns: A task that represents the asynchronous read operation. The value of the `TResult` parameter contains the total number of characters read into the buffer. The result value can be less than the number of characters requested if the number of characters currently available is less than the requested number, or it can be 0 (zero) if the end of the stream has been reached.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `ArgumentException`: The sum of `index` and `count` is larger than the buffer length.
- `ObjectDisposedException`: The stream has been disposed.
- `InvalidOperationException`: The reader is currently in use by a previous read operation.

#### Remarks
The task completes after either the number of characters specified by the `count` parameter are read or the end of the stream is reached.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Read`.

#### Examples
The following example shows how to read all the characters in a file by using the `ReadAsync` method. It checks whether each character is a letter, digit, or white space before adding the character to an instance of the `StringBuilder` class.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/Overview/example42.cs._

## StreamReader.ReadBlock(Char>) method

```csharp
public override int ReadBlock (Span<char> buffer);
```

Reads the characters from the current stream and writes the data to a buffer.

Parameters:

- `buffer`: When this method returns, contains the specified span of characters replaced by the characters read from the current source.

Returns: The number of characters that have been read. The number will be less than or equal to the `buffer` length, depending on whether all input characters have been read.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ObjectDisposedException`: The `StreamReader` is closed.
- `IOException`: An I/O error occurred.

To be added.

## StreamReader.ReadBlock(Char[], Int32, Int32) method

```csharp
public override int ReadBlock (char[] buffer, int index, int count);
```

Reads a specified maximum number of characters from the current stream and writes the data to a buffer, beginning at the specified index.

Parameters:

- `buffer`: When this method returns, contains the specified character array with the values between `index` and (`index + count - 1`) replaced by the characters read from the current source.
- `index`: The position in `buffer` at which to begin writing.
- `count`: The maximum number of characters to read.

Returns: The number of characters that have been read. The number will be less than or equal to `count`, depending on whether all input characters have been read.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentException`: The buffer length minus `index` is less than `count`.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `ObjectDisposedException`: The `StreamReader` is closed.
- `IOException`: An I/O error occurred.

#### Remarks
The position of the underlying stream is advanced by the number of characters that were read into `buffer`.

The method blocks until either `count` characters are read, or the end of the stream has been reached. This is a blocking version of `StreamReader.Read`.
