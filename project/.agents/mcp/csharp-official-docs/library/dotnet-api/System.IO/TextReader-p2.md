---
title: "TextReader class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/TextReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TextReader class (part 2 of 2)

## TextReader.ReadBlockAsync(Char[], Int32, Int32) method

```csharp
public virtual System.Threading.Tasks.Task<int> ReadBlockAsync (char[] buffer, int index, int count);
```

Reads a specified maximum number of characters from the current text reader asynchronously and writes the data to a buffer, beginning at the specified index.

Parameters:

- `buffer`: When this method returns, contains the specified character array with the values between `index` and (`index` + `count` - 1) replaced by the characters read from the current source.
- `index`: The position in `buffer` at which to begin writing.
- `count`: The maximum number of characters to read. If the end of the text is reached before the specified number of characters is read into the buffer, the current method returns.

Returns: A task that represents the asynchronous read operation. The value of the `TResult` parameter contains the total number of bytes read into the buffer. The result value can be less than the number of bytes requested if the number of bytes currently available is less than the requested number, or it can be 0 (zero) if the end of the text has been reached.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `ArgumentException`: The sum of `index` and `count` is larger than the buffer length.
- `ObjectDisposedException`: The text reader has been disposed.
- `InvalidOperationException`: The reader is currently in use by a previous read operation.

#### Remarks
The task does not complete until either the number of characters specified by the `count` parameter are read, or the end of the text has been reached.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadBlock`.

## TextReader.ReadLine() method

```csharp
public virtual string? ReadLine ();
```

Reads a line of characters from the text reader and returns the data as a string.

Returns: The next line from the reader, or `null` if all characters have been read.

Exceptions:

- `IOException`: An I/O error occurs.
- `OutOfMemoryException`: There is insufficient memory to allocate a buffer for the returned string.
- `ObjectDisposedException`: The `TextReader` is closed.
- `ArgumentOutOfRangeException`: The number of characters in the next line is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>

#### Remarks
A line is defined as a sequence of characters followed by a carriage return (0x000d), a line feed (0x000a), a carriage return followed by a line feed, `Environment.NewLine`, or the end of the reader's input. The string that is returned does not contain the terminating carriage return or line feed. The return value is `null` if the end of the input has been reached.

If the input ends with a newline sequence, no additional empty line is returned. For example, input containing `"line1\nline2\n"` produces the same two lines (`"line1"` and `"line2"`) as input containing `"line1\nline2"`.

If the method throws an `OutOfMemoryException` exception, the reader's position in its underlying source is advanced by the number of characters the method was able to read, but the characters that were already read into the internal `TextReader.ReadLine` buffer are discarded. Because the reader's position in the underlying source cannot be reset, the characters that were already read are unrecoverable and can be accessed only by reinitializing the `TextReader` object. If the initial position within the underlying source is unknown or the source does not support repositioning, the underlying source also needs to be reinitialized.

To avoid such a situation and produce robust code you should use the `TextReader.Read` method and store the read characters in a preallocated buffer.

The `TextReader` class is an abstract class. Therefore, you do not instantiate it in your code. For an example of using the `TextReader.ReadLine` method, see the `StreamReader.ReadLine` method.

## TextReader.ReadLineAsync() method

```csharp
public virtual System.Threading.Tasks.Task<string?> ReadLineAsync ();
```

Reads a line of characters asynchronously and returns the data as a string.

Returns: A task that represents the asynchronous read operation. The value of the `TResult` parameter contains the next line from the text reader, or is `null` if all of the characters have been read.

Exceptions:

- `ArgumentOutOfRangeException`: The number of characters in the next line is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ObjectDisposedException`: The text reader has been disposed.
- `InvalidOperationException`: The reader is currently in use by a previous read operation.

#### Remarks
The `TextReader` class is an abstract class. Therefore, you do not instantiate it in your code. For an example of using the `TextReader.ReadLineAsync` method, see the `StreamReader.ReadLineAsync` method.

If the current `TextReader` represents the standard input stream returned by the `In` property, the `TextReader.ReadLineAsync` method executes synchronously rather than asynchronously.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadLine`.

## TextReader.ReadLineAsync(CancellationToken) method

```csharp
public virtual System.Threading.Tasks.ValueTask<string?> ReadLineAsync (System.Threading.CancellationToken <example-value>);
```

Reads a line of characters asynchronously and returns the data as a string.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A value task that represents the asynchronous read operation. The value of the `TResult` parameter contains the next line from the text reader, or is `null` if all of the characters have been read.

Exceptions:

- `ArgumentOutOfRangeException`: The number of characters in the next line is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ObjectDisposedException`: The text reader has been disposed.
- `InvalidOperationException`: The reader is currently in use by a previous read operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The `TextReader` class is an abstract class. Therefore, you do not instantiate it in
your code. For an example of using the `ReadLineAsync` method, see the
`ReadLineAsync` method.

If the current `TextReader` represents the standard input stream returned by
the `Console.In` property, the `ReadLineAsync` method
executes synchronously rather than asynchronously.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadLine`.

## TextReader.ReadToEnd() method

```csharp
public virtual string ReadToEnd ();
```

Reads all characters from the current position to the end of the text reader and returns them as one string.

Returns: A string that contains all characters from the current position to the end of the text reader.

Exceptions:

- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: The `TextReader` is closed.
- `OutOfMemoryException`: There is insufficient memory to allocate a buffer for the returned string.
- `ArgumentOutOfRangeException`: The number of characters in the next line is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>

#### Remarks
If the method throws an `OutOfMemoryException` exception, the reader's position in the underlying `Stream` is advanced by the number of characters the method was able to read, but the characters that were already read into the internal `TextReader.ReadToEnd` buffer are discarded. Because the position of the reader in the stream cannot be changed, the characters that were already read are unrecoverable and can be accessed only by reinitializing the `TextReader`. If the initial position within the stream is unknown or the stream does not support seeking, the underlying `Stream` also needs to be reinitialized.

To avoid such a situation and produce robust code you should use the `TextReader.Read` method and store the read characters in a preallocated buffer.

The `TextReader` class is an abstract class. Therefore, you do not instantiate it in your code. For an example of using the `TextReader.ReadToEnd` method, see the `StreamReader.ReadToEnd` method.

## TextReader.ReadToEndAsync() method

```csharp
public virtual System.Threading.Tasks.Task<string> ReadToEndAsync ();
```

Reads all characters from the current position to the end of the text reader asynchronously and returns them as one string.

Returns: A task that represents the asynchronous read operation. The value of the `TResult` parameter contains a string with the characters from the current position to the end of the text reader.

Exceptions:

- `ArgumentOutOfRangeException`: The number of characters is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ObjectDisposedException`: The text reader has been disposed.
- `InvalidOperationException`: The reader is currently in use by a previous read operation.

#### Remarks
The `TextReader` class is an abstract class. Therefore, you do not instantiate it in your code. For an example of using the `TextReader.ReadToEndAsync` method, see the `StreamReader.ReadToEndAsync` method.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadToEnd`.

## TextReader.ReadToEndAsync(CancellationToken) method

```csharp
public virtual System.Threading.Tasks.Task<string> ReadToEndAsync (System.Threading.CancellationToken <example-value>);
```

Reads all characters from the current position to the end of the text reader asynchronously and returns them as one string.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous read operation. The value of the `TResult` parameter contains a string with the characters from the current position to the end of the text reader.

Exceptions:

- `ArgumentOutOfRangeException`: The number of characters is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ObjectDisposedException`: The text reader has been disposed.
- `InvalidOperationException`: The reader is currently in use by a previous read operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The `TextReader` class is an abstract class. Therefore, you do not instantiate it in
your code. For an example of using the `ReadToEndAsync` method, see the
`ReadToEndAsync` method.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadToEnd`.

## TextReader.Synchronized(TextReader) method

```csharp
public static System.IO.TextReader Synchronized (System.IO.TextReader reader);
```

Creates a thread-safe wrapper around the specified `TextReader`.

Parameters:

- `reader`: The `TextReader` to synchronize.

Returns: A thread-safe `TextReader`.

Exceptions:

- `ArgumentNullException`: `reader` is `null`.

#### Remarks
The current method returns a class that wraps around the specified `TextReader` instance and restricts access to it by multiple threads. All reads from the returned wrapper will be thread safe.

## TextReader.Null field

```csharp
public static readonly System.IO.TextReader Null;
```

Provides a `TextReader` with no data to read from.

#### Remarks
Reading from the `Null` text reader is similar to reading from the end of a stream:

- The `TextReader.Read` and `TextReader.Peek` methods return -1.

- The `TextReader.ReadBlock` method returns zero.

- The `TextReader.ReadLine` method returns `null`.

- The `TextReader.ReadToEnd` method returns an empty string.
