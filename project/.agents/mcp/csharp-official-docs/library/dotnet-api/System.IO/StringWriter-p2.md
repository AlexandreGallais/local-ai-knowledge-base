---
title: "StringWriter class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/StringWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringWriter class (part 2 of 2)

## StringWriter.Write(String) method

```csharp
public override void Write (string? value);
```

Writes a string to the current string.

Parameters:

- `value`: The string to write.

Exceptions:

- `ObjectDisposedException`: The writer is closed.

#### Remarks
This method overrides `TextWriter.Write`.

If the specified string is `null`, nothing is written.

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
This code example is part of a larger example provided for the `StringWriter` class.

_Code sample not included: ~/snippets/csharp/System.IO/StringReader/.ctor/stringrw.cs._

## StringWriter.Write(StringBuilder) method

```csharp
public override void Write (System.Text.StringBuilder? value);
```

Writes the string representation of a string builder to the current string.

Parameters:

- `value`: The string builder to write to the string.

To be added.

## StringWriter.Write(Char[], Int32, Int32) method

```csharp
public override void Write (char[] buffer, int index, int count);
```

Writes a subarray of characters to the string.

Parameters:

- `buffer`: The character array to write data from.
- `index`: The position in the buffer at which to start reading data.
- `count`: The maximum number of characters to write.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `ArgumentException`: (`index` + `count`)> `buffer`. `Length`.
- `ObjectDisposedException`: The writer is closed.

#### Remarks
This method overrides `TextWriter.Write`.

This method writes `count` characters of data to this `StringWriter` from `buffer`, starting at position `index`.

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
This code example is part of a larger example provided for the `%23ctor` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/StringWriter/.ctor/strwriter1.cs._

## StringWriter.WriteAsync(Char) method

```csharp
public override System.Threading.Tasks.Task WriteAsync (char value);
```

Writes a character to the string asynchronously.

Parameters:

- `value`: The character to write to the string.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ObjectDisposedException`: The string writer is disposed.
- `InvalidOperationException`: The string writer is currently in use by a previous write operation.

#### Remarks

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Write`.

#### Examples
The following example shows how to write characters by using the `WriteAsync` method.

_Code sample not included: ~/snippets/csharp/System.IO/StringWriter/WriteAsync/example5.cs._

## StringWriter.WriteAsync(String) method

```csharp
public override System.Threading.Tasks.Task WriteAsync (string? value);
```

Writes a string to the current string asynchronously.

Parameters:

- `value`: The string to write. If `value` is `null`, nothing is written to the text stream.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ObjectDisposedException`: The string writer is disposed.
- `InvalidOperationException`: The string writer is currently in use by a previous write operation.

#### Remarks

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Write`.

#### Examples
The following example shows how to write a string by using the `WriteAsync` method.

_Code sample not included: ~/snippets/csharp/System.IO/StringWriter/WriteAsync/example4.cs._

## StringWriter.WriteAsync(Char>, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteAsync (ReadOnlyMemory<char> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously writes a memory region of characters to the string.

Parameters:

- `buffer`: The character memory region to write to the string.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## StringWriter.WriteAsync(StringBuilder, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteAsync (System.Text.StringBuilder? value, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously writes the text representation of a string builder to the string.

Parameters:

- `value`: The string builder to write to the string.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `StringWriter.Write`.

## StringWriter.WriteAsync(Char[], Int32, Int32) method

```csharp
public override System.Threading.Tasks.Task WriteAsync (char[] buffer, int index, int count);
```

Writes a subarray of characters to the string asynchronously.

Parameters:

- `buffer`: The character array to write data from.
- `index`: The position in the buffer at which to start reading data.
- `count`: The maximum number of characters to write.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentException`: The `index` plus `count` is greater than the buffer length.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `ObjectDisposedException`: The string writer is disposed.
- `InvalidOperationException`: The string writer is currently in use by a previous write operation.

#### Remarks

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Write`.

#### Examples
The following example shows how to write characters by using the `WriteAsync` method.

_Code sample not included: ~/snippets/csharp/System.IO/StringWriter/WriteAsync/example6.cs._

## StringWriter.WriteLine(Char>) method

```csharp
public override void WriteLine (ReadOnlySpan<char> buffer);
```

Writes the text representation a span of characters to the string, followed by a line terminator.

Parameters:

- `buffer`: The span of characters to write to the string.

To be added.

## StringWriter.WriteLine(StringBuilder) method

```csharp
public override void WriteLine (System.Text.StringBuilder? value);
```

Writes the text representation of a string builder to the string, followed by a line terminator.

Parameters:

- `value`: The string, as a string builder, to write to the string.

To be added.

## StringWriter.WriteLineAsync(Char) method

```csharp
public override System.Threading.Tasks.Task WriteLineAsync (char value);
```

Asynchronously writes a character to the string, followed by a line terminator.

Parameters:

- `value`: The character to write to the string.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ObjectDisposedException`: The string writer is disposed.
- `InvalidOperationException`: The string writer is currently in use by a previous write operation.

#### Remarks

The line terminator is defined by the `NewLine` property.

#### Examples

The following example shows how to write characters by using the `WriteLineAsync` method.

_Code sample not included: ~/snippets/csharp/System.IO/StringWriter/WriteAsync/example2.cs._

## StringWriter.WriteLineAsync(String) method

```csharp
public override System.Threading.Tasks.Task WriteLineAsync (string? value);
```

Asynchronously writes a string to the current string, followed by a line terminator.

Parameters:

- `value`: The string to write. If the value is `null`, only a line terminator is written.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ObjectDisposedException`: The string writer is disposed.
- `InvalidOperationException`: The string writer is currently in use by a previous write operation.

#### Remarks

The line terminator is defined by the `NewLine` property.

#### Examples

The following example shows how to write a string by using the `WriteLineAsync` method.

_Code sample not included: ~/snippets/csharp/System.IO/StringWriter/WriteAsync/example.cs._

## StringWriter.WriteLineAsync(Char>, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteLineAsync (ReadOnlyMemory<char> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously writes the string representation of the memory region of characters to the current string, followed by a line terminator.

Parameters:

- `buffer`: A memory region of characters to write to the string.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## StringWriter.WriteLineAsync(StringBuilder, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteLineAsync (System.Text.StringBuilder? value, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously writes the string representation of the string builder to the current string, followed by a line terminator.

Parameters:

- `value`: The string builder to write to the string.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `StringWriter.WriteLine`.

## StringWriter.WriteLineAsync(Char[], Int32, Int32) method

```csharp
public override System.Threading.Tasks.Task WriteLineAsync (char[] buffer, int index, int count);
```

asynchronously writes a subarray of characters to the string, followed by a line terminator.

Parameters:

- `buffer`: The character array to write data from.
- `index`: The position in the buffer at which to start reading data.
- `count`: The maximum number of characters to write.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentException`: The `index` plus `count` is greater than the buffer length.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `ObjectDisposedException`: The string writer is disposed.
- `InvalidOperationException`: The string writer is currently in use by a previous write operation.

#### Remarks

The line terminator is defined by the `NewLine` property.

#### Examples

The following example shows how to write characters by using the `WriteLineAsync` method.

_Code sample not included: ~/snippets/csharp/System.IO/StringWriter/WriteAsync/example3.cs._
