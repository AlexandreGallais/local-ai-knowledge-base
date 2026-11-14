---
title: "StringReader class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/StringReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringReader class (part 2 of 2)

## StringReader.ReadBlockAsync(Char[], Int32, Int32) method

```csharp
public override System.Threading.Tasks.Task<int> ReadBlockAsync (char[] buffer, int index, int count);
```

Reads a specified maximum number of characters from the current string asynchronously and writes the data to a buffer, beginning at the specified index.

Parameters:

- `buffer`: When this method returns, contains the specified character array with the values between `index` and (`index` + `count` - 1) replaced by the characters read from the current source.
- `index`: The position in `buffer` at which to begin writing.
- `count`: The maximum number of characters to read. If the end of the string is reached before the specified number of characters is written into the buffer, the method returns.

Returns: A task that represents the asynchronous read operation. The value of the `TResult` parameter contains the total number of bytes read into the buffer. The result value can be less than the number of bytes requested if the number of bytes currently available is less than the requested number, or it can be 0 (zero) if the end of the string has been reached.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `ArgumentException`: The sum of `index` and `count` is larger than the buffer length.
- `ObjectDisposedException`: The string reader has been disposed.
- `InvalidOperationException`: The reader is currently in use by a previous read operation.

#### Remarks
The task does not complete until either the number of characters specified by the `count` parameter are read, or the end of the string has been reached.

## StringReader.ReadLine() method

```csharp
public override string? ReadLine ();
```

Reads a line of characters from the current string and returns the data as a string.

Returns: The next line from the current string, or `null` if the end of the string is reached.

Exceptions:

- `ObjectDisposedException`: The current reader is closed.
- `OutOfMemoryException`: There is insufficient memory to allocate a buffer for the returned string.

#### Remarks
This method overrides the `TextReader.ReadLine` method.

A line is defined as a sequence of characters followed by a line feed ("\n"), a carriage return ("\r"), a carriage return immediately followed by a line feed ("\r\n"), or the end-of-stream marker. The string that is returned does not contain the terminating carriage return or line feed. The returned value is `null` if the end-of-stream marker has been reached. That is to say, if there is nothing between the last line read and the end-of-stream marker, the method returns `null`.

If the string ends with a newline sequence, no additional empty line is returned. For example, the string `"line1\nline2\n"` produces the same two lines (`"line1"` and `"line2"`) as the string `"line1\nline2"`.

If the current method throws an `OutOfMemoryException`, the reader's position in the underlying string is advanced by the number of characters the method was able to read, but the characters already read into the internal `StringReader.ReadLine` buffer are discarded. Because the position of the reader in the string cannot be changed, the characters already read are unrecoverable, and can be accessed only by reinitializing the `StringReader`. To avoid such a situation, use the `StringReader.Read` method and store the read characters in a preallocated buffer.

The following table lists examples of other typical or related I/O tasks.

|To do this...|See the example in this topic...|
|-------------------|--------------------------------------|
|Create a text file.|How to: Write Text to a File|
|Write to a text file.|How to: Write Text to a File|
|Read from a text file.|How to: Read Text from a File|
|Append text to a file.|How to: Open and Append to a Log File `File.AppendText` `FileInfo.AppendText`|
|Get the size of a file.|`FileInfo.Length`|
|Get the attributes of a file.|`File.GetAttributes`|
|Set the attributes of a file.|`File.SetAttributes`|
|Determine if a file exists.|`File.Exists`|
|Read from a binary file.|How to: Read and Write to a Newly Created Data File|
|Write to a binary file.|How to: Read and Write to a Newly Created Data File|

#### Examples
This code example is part of a larger example provided for the `StringReader` class.

_Code sample not included: ~/snippets/csharp/System.IO/StringReader/.ctor/stringrw.cs._

## StringReader.ReadLineAsync() method

```csharp
public override System.Threading.Tasks.Task<string?> ReadLineAsync ();
```

Reads a line of characters asynchronously from the current string and returns the data as a string.

Returns: A task that represents the asynchronous read operation. The value of the `TResult` parameter contains the next line from the string reader, or is `null` if all the characters have been read.

Exceptions:

- `ArgumentOutOfRangeException`: The number of characters in the next line is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ObjectDisposedException`: The string reader has been disposed.
- `InvalidOperationException`: The reader is currently in use by a previous read operation.

#### Remarks

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadLine`.

#### Examples
The following example shows how to read one line at a time from a string asynchronously.

_Code sample not included: ~/snippets/csharp/System.IO/StringReader/Overview/example3.cs._

## StringReader.ReadLineAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<string?> ReadLineAsync (System.Threading.CancellationToken <example-value>);
```

Reads a line of characters asynchronously from the current string and returns the data as a string.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A value task that represents the asynchronous read operation. The value of the `TResult` parameter contains the next line from the string reader, or is `null` if all of the characters have been read.

Exceptions:

- `ArgumentOutOfRangeException`: The number of characters in the next line is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ObjectDisposedException`: The string reader has been disposed.
- `InvalidOperationException`: The reader is currently in use by a previous read operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `StringReader.ReadLine`.

## StringReader.ReadToEnd() method

```csharp
public override string ReadToEnd ();
```

Reads all characters from the current position to the end of the string and returns them as a single string.

Returns: The content from the current position to the end of the underlying string.

Exceptions:

- `OutOfMemoryException`: There is insufficient memory to allocate a buffer for the returned string.
- `ObjectDisposedException`: The current reader is closed.

#### Remarks
This method overrides the `TextReader.ReadToEnd` method.

If the current method throws an `OutOfMemoryException`, the reader's position in the underlying string is advanced by the number of characters the method was able to read, but the characters already read into the internal `StringReader.ReadToEnd` buffer are discarded. Because the position of the reader in the string cannot be changed, the characters already read are unrecoverable, and can be accessed only by reinitializing the `StringReader`. To avoid such a situation, use the `StringReader.Read` method and store the read characters in a preallocated buffer.

The following table lists examples of other typical or related I/O tasks.

|To do this...|See the example in this topic...|
|-------------------|--------------------------------------|
|Create a text file.|How to: Write Text to a File|
|Write to a text file.|How to: Write Text to a File|
|Read from a text file.|How to: Read Text from a File|
|Append text to a file.|How to: Open and Append to a Log File `File.AppendText` `FileInfo.AppendText`|
|Get the size of a file.|`FileInfo.Length`|
|Get the attributes of a file.|`File.GetAttributes`|
|Set the attributes of a file.|`File.SetAttributes`|
|Determine if a file exists.|`File.Exists`|
|Read from a binary file.|How to: Read and Write to a Newly Created Data File|
|Write to a binary file.|How to: Read and Write to a Newly Created Data File|

#### Examples
This code example is part of a larger example provided for the `TextReader` class.

_Code sample not included: ~/snippets/csharp/System.IO/StringReader/ReadToEnd/textrw.cs._

## StringReader.ReadToEndAsync() method

```csharp
public override System.Threading.Tasks.Task<string> ReadToEndAsync ();
```

Reads all characters from the current position to the end of the string asynchronously and returns them as a single string.

Returns: A task that represents the asynchronous read operation. The value of the `TResult` parameter contains a string with the characters from the current position to the end of the string.

Exceptions:

- `ArgumentOutOfRangeException`: The number of characters is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ObjectDisposedException`: The string reader has been disposed.
- `InvalidOperationException`: The reader is currently in use by a previous read operation.

#### Remarks

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadToEnd`.

#### Examples
The following example shows how to read an entire string asynchronously.

_Code sample not included: ~/snippets/csharp/System.IO/StringReader/Overview/example2.cs._

## StringReader.ReadToEndAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.Task<string> ReadToEndAsync (System.Threading.CancellationToken <example-value>);
```

Reads all characters from the current position to the end of the string asynchronously and returns them as a single string.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous read operation. The value of the `TResult` parameter contains a string with the characters from the current position to the end of the string.

Exceptions:

- `ArgumentOutOfRangeException`: The number of characters is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ObjectDisposedException`: The string reader has been disposed.
- `InvalidOperationException`: The reader is currently in use by a previous read operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `StringReader.ReadToEnd`.
