---
title: "StreamWriter class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/StreamWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StreamWriter class (part 4 of 4)

## StreamWriter.WriteLineAsync(String) method

```csharp
public override System.Threading.Tasks.Task WriteLineAsync (string? value);
```

Asynchronously writes a string to the stream, followed by a line terminator.

Parameters:

- `value`: The string to write. If the value is `null`, only a line terminator is written.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ObjectDisposedException`: The stream writer is disposed.
- `InvalidOperationException`: The stream writer is currently in use by a previous write operation.

#### Remarks
The line terminator is defined by the `NewLine` property.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteLine`.

#### Examples
The following example shows how to write two lines that consist of string values to a text file by using the `WriteLineAsync` method.

_Code sample not included: ~/snippets/csharp/System.IO/StreamWriter/AutoFlush/example23.cs._

## StreamWriter.WriteLineAsync(Char>, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteLineAsync (ReadOnlyMemory<char> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously writes the text representation of a character memory region to the stream, followed by a line terminator.

Parameters:

- `buffer`: The character memory region to write to the stream.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The line terminator is defined by the `CoreNewLine` field.

## StreamWriter.WriteLineAsync(Char[], Int32, Int32) method

```csharp
public override System.Threading.Tasks.Task WriteLineAsync (char[] buffer, int index, int count);
```

Asynchronously writes a subarray of characters to the stream, followed by a line terminator.

Parameters:

- `buffer`: The character array to write data from.
- `index`: The character position in the buffer at which to start reading data.
- `count`: The maximum number of characters to write.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentException`: The `index` plus `count` is greater than the buffer length.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `ObjectDisposedException`: The stream writer is disposed.
- `InvalidOperationException`: The stream writer is currently in use by a previous write operation.

#### Remarks
The line terminator is defined by the `NewLine` property.

#### Examples
The following example shows how to write characters to two separate lines in a text file by using the `WriteLineAsync` method. The first line contains the first 11 characters from the string (the letters "First line" followed by a space). The second line contains the remaining characters from the string (the letters "and second line").

_Code sample not included: ~/snippets/csharp/System.IO/StreamWriter/AutoFlush/example25.cs._

## StreamWriter.Null field

```csharp
public static readonly System.IO.StreamWriter Null;
```

Provides a `StreamWriter` with no backing store that can be written to, but not read from.

#### Remarks
Use `Null` to redirect output to a `StreamWriter` that will not consume any operating system resources.

When the `StreamWriter.Write` methods are invoked on `Null`, the call simply returns, and no data is actually written to any backing store.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
The following example demonstrates a use of the `Null` field.

_Code sample not included: ~/snippets/csharp/System.IO/StreamWriter/AutoFlush/logger.cs._
