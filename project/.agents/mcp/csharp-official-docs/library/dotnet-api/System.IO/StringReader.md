---
title: "StringReader class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/StringReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringReader class

Namespace: `System.IO`

```csharp
public class StringReader : System.IO.TextReader
```

Implements a `TextReader` that reads from a string.

#### Remarks
`StringReader` enables you to read a string synchronously or asynchronously. You can read a character at a time with the `StringReader.Read` or the `StringReader.ReadAsync` method, a line at a time using the `StringReader.ReadLine` or the `StringReader.ReadLineAsync` method and an entire string using the `StringReader.ReadToEnd` or the `StringReader.ReadToEndAsync` method.

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
The following example shows how to read an entire string asynchronously.

_Code sample not included: ~/snippets/csharp/System.IO/StringReader/Overview/example2.cs._

## StringReader.StringReader(String) constructor

```csharp
public StringReader (string s);
```

Initializes a new instance of the `StringReader` class that reads from the specified string.

Parameters:

- `s`: The string to which the `StringReader` should be initialized.

Exceptions:

- `ArgumentNullException`: The `s` parameter is `null`.

#### Remarks
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

## StringReader.Close() method

```csharp
public override void Close ();
```

Closes the `StringReader`.

#### Remarks

For an example of creating a file and writing text to a file, see How to: Write Text to a File. For an example of reading text from a file, see How to: Read Text from a File. For an example of reading from and writing to a binary file, see How to: Read and Write to a Newly Created Data File.

This method overrides the `TextReader.Close` method.

This implementation of `Close` calls the `StringReader.Dispose`, method passing a `true` value. Following a call to `Close`, other methods might throw an exception.

## StringReader.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `StringReader` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `StringReader` references. This method invokes the `Dispose` method of each referenced object.

## StringReader.Peek() method

```csharp
public override int Peek ();
```

Returns the next available character but does not consume it.

Returns: An integer representing the next character to be read, or -1 if no more characters are available or the stream does not support seeking.

Exceptions:

- `ObjectDisposedException`: The current reader is closed.

#### Remarks
The `StringReader.Peek` method returns an integer value in order to determine whether the end of the file, or another error has occurred. This allows a user to first check if the returned value is -1 before casting it to a `Char` type.

This method overrides the `TextReader.Peek` method.

The current position of the `StringReader` is not changed by this operation.

The following table lists examples of other typical or related I/O tasks.

|To do this...|See the example in this topic...|
|-------------------|--------------------------------------|
|Create a text file.|How to: Write Text to a File|
|Write to a text file.|How to: Write Text to a File|
|Read from a text file.|How to: Read Text from a File|
|Get the size of a file.|`FileInfo.Length`|

## StringReader.Read() method

```csharp
public override int Read ();
```

Reads the next character from the input string and advances the character position by one character.

Returns: The next character from the underlying string, or -1 if no more characters are available.

Exceptions:

- `ObjectDisposedException`: The current reader is closed.

#### Remarks
This method overrides the `TextReader.Read` method.

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

## StringReader.Read(Char>) method

```csharp
public override int Read (Span<char> buffer);
```

Reads all the characters from the input string, starting at the current position, and advances the current position to the end of the input string.

Parameters:

- `buffer`: When this method returns, contains the characters read from the current source. If the total number of characters read is zero, the span remains unmodified.

Returns: The total number of characters read into the buffer.

Exceptions:

- `ObjectDisposedException`: The current string reader instance is closed.

To be added.

## StringReader.Read(Char[], Int32, Int32) method

```csharp
public override int Read (char[] buffer, int index, int count);
```

Reads a block of characters from the input string and advances the character position by `count`.

Parameters:

- `buffer`: When this method returns, contains the specified character array with the values between `index` and (`index` + `count` - 1) replaced by the characters read from the current source.
- `index`: The starting index in the buffer.
- `count`: The number of characters to read.

Returns: The total number of characters read into the buffer. This can be less than the number of characters requested if that many characters are not currently available, or zero if the end of the underlying string has been reached.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentException`: The buffer length minus `index` is less than `count`.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `ObjectDisposedException`: The current reader is closed.

#### Remarks
This method overrides `TextReader.Read`.

The method will read up to `count` characters from the `StringReader` into the `buffer` character array starting at position `index`. Returns the actual number of characters read, or zero if the end of the string has been reached and no characters are read.

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

## StringReader.ReadAsync(Char>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<int> ReadAsync (Memory<char> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads all the characters from the input string, starting at the current position, and advances the current position to the end of the input string.

Parameters:

- `buffer`: When this method returns, contains the characters read from the current source.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation. The value of the `TResult` parameter contains the total number of characters read into the buffer.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## StringReader.ReadAsync(Char[], Int32, Int32) method

```csharp
public override System.Threading.Tasks.Task<int> ReadAsync (char[] buffer, int index, int count);
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
The task completes after either the number of characters specified by the `count` parameter are read or the end of the string is reached.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Read`.

#### Examples
The following example shows how to read the first 23 characters of a string asynchronously.

_Code sample not included: ~/snippets/csharp/System.IO/StringReader/Overview/example1.cs._

## StringReader.ReadBlock(Char>) method

```csharp
public override int ReadBlock (Span<char> buffer);
```

Reads all the characters from the input string starting at the current position and advances the current position to the end of the input string.

Parameters:

- `buffer`: When this method returns, contains the characters read from the current source. If the total number of characters read is zero, the span remains unmodified.

Returns: The total number of characters read into the buffer.

Exceptions:

- `ObjectDisposedException`: The current string reader instance is closed.

#### Remarks

`ReadBlock` internally calls `Read` directly.

## StringReader.ReadBlockAsync(Char>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<int> ReadBlockAsync (Memory<char> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads all the characters from the input string starting at the current position and advances the current position to the end of the input string.

Parameters:

- `buffer`: When this method returns, contains the characters read from the current source. If the total number of characters read is zero, the span remains unmodified.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task representing the asynchronous read operation. The value of the `TResult` parameter contains the total number of characters read into the buffer.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

`ReadBlockAsync` calls `ReadBlock` asynchronously, which in turn calls `Read` directly.
