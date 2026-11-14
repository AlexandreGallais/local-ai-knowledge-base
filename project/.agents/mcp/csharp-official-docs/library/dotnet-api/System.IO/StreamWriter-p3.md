---
title: "StreamWriter class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/StreamWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StreamWriter class (part 3 of 4)

## StreamWriter.Write(String) method

```csharp
public override void Write (string? value);
```

Writes a string to the stream.

Parameters:

- `value`: The string to write to the stream. If `value` is null, nothing is written.

Exceptions:

- `ObjectDisposedException`: `StreamWriter.AutoFlush` is true or the `StreamWriter` buffer is full, and current writer is closed.
- `NotSupportedException`: `StreamWriter.AutoFlush` is true or the `StreamWriter` buffer is full, and the contents of the buffer cannot be written to the underlying fixed size stream because the `StreamWriter` is at the end the stream.
- `IOException`: An I/O error occurs.

#### Remarks
This method overrides `TextWriter.Write`.

The specified `String` is written to the underlying stream unless the end of the stream is reached prematurely.

`StreamWriter.Flush` is invoked automatically if `StreamWriter.AutoFlush` is `true`. If `value` is `null`, no entries are written.

For a list of common I/O tasks, see Common I/O Tasks.

## StreamWriter.Write(String, Object) method

```csharp
public override void Write (string format, object? arg0);
```

Writes a formatted string to the stream, using the same semantics as the `String.Format` method.

Parameters:

- `format`: A composite format string.
- `arg0`: The object to format and write.

#### Remarks

See `Write` for a description of the composite formatting capabilities offered.

## StreamWriter.Write(String, Object[]) method

```csharp
public override void Write (string format, params object?[] arg);
```

Writes a formatted string to the stream, using the same semantics as the `String.Format` method.

Parameters:

- `format`: A composite format string.
- `arg`: An object array that contains zero or more objects to format and write.

#### Remarks

See `Write` for a description of the composite formatting capabilities offered.

## StreamWriter.Write(String, Object>) method

```csharp
public override void Write (string format, scoped ReadOnlySpan<object?> arg);
```

Writes a formatted string to the stream, using the same semantics as `String.Format`.

Parameters:

- `format`: A composite format string.
- `arg`: An object span that contains zero or more objects to format and write.

To be added.

## StreamWriter.Write(Char[], Int32, Int32) method

```csharp
public override void Write (char[] buffer, int index, int count);
```

Writes a subarray of characters to the stream.

Parameters:

- `buffer`: A character array that contains the data to write.
- `index`: The character position in the buffer at which to start reading data.
- `count`: The maximum number of characters to write.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentException`: The buffer length minus `index` is less than `count`.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: `StreamWriter.AutoFlush` is true or the `StreamWriter` buffer is full, and current writer is closed.
- `NotSupportedException`: `StreamWriter.AutoFlush` is true or the `StreamWriter` buffer is full, and the contents of the buffer cannot be written to the underlying fixed size stream because the `StreamWriter` is at the end the stream.

#### Remarks
This method overrides `TextWriter.Write`.

The characters are read from `buffer` beginning at `index` and continuing through `index` + (`count` - 1). All characters are written to the underlying stream unless the end of the underlying stream is reached prematurely. `StreamWriter.Flush` is invoked automatically if `StreamWriter.AutoFlush` is `true`.

For a list of common I/O tasks, see Common I/O Tasks.

#### Examples
This example writes eight characters from a 13-element array to a file, beginning at the third element of the array.

_Code sample not included: ~/snippets/csharp/System.IO/StreamWriter/Write/source.cs._

## StreamWriter.Write(String, Object, Object) method

```csharp
public override void Write (string format, object? arg0, object? arg1);
```

Writes a formatted string to the stream using the same semantics  as the `String.Format` method.

Parameters:

- `format`: A composite format string.
- `arg0`: The first object to format and write.
- `arg1`: The second object to format and write.

#### Remarks

See `Write` for a description of the composite formatting capabilities offered.

## StreamWriter.Write(String, Object, Object, Object) method

```csharp
public override void Write (string format, object? arg0, object? arg1, object? arg2);
```

Writes a formatted string to the stream, using the same semantics as the `String.Format` method.

Parameters:

- `format`: A composite format string.
- `arg0`: The first object to format and write.
- `arg1`: The second object to format and write.
- `arg2`: The third object to format and write.

#### Remarks

See `Write` for a description of the composite formatting capabilities offered.

## StreamWriter.WriteAsync(Char) method

```csharp
public override System.Threading.Tasks.Task WriteAsync (char value);
```

Asynchronously writes a character to the stream.

Parameters:

- `value`: The character to write to the stream.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ObjectDisposedException`: The stream writer is disposed.
- `InvalidOperationException`: The stream writer is currently in use by a previous write operation.

#### Remarks

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Write`.

#### Examples
The following example shows how to write a single character (the letter "a") to a text file by using the `WriteAsync` method.

_Code sample not included: ~/snippets/csharp/System.IO/StreamWriter/AutoFlush/example20.cs._

## StreamWriter.WriteAsync(String) method

```csharp
public override System.Threading.Tasks.Task WriteAsync (string? value);
```

Asynchronously writes a string to the stream.

Parameters:

- `value`: The string to write to the stream. If `value` is `null`, nothing is written.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ObjectDisposedException`: The stream writer is disposed.
- `InvalidOperationException`: The stream writer is currently in use by a previous write operation.

#### Remarks

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Write`.

#### Examples
The following example shows how to write a string to a text file by using the `WriteAsync` method.

_Code sample not included: ~/snippets/csharp/System.IO/StreamWriter/AutoFlush/example21.cs._

## StreamWriter.WriteAsync(Char>, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteAsync (ReadOnlyMemory<char> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously writes a character memory region to the stream.

Parameters:

- `buffer`: The character memory region to write to the stream.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## StreamWriter.WriteAsync(Char[], Int32, Int32) method

```csharp
public override System.Threading.Tasks.Task WriteAsync (char[] buffer, int index, int count);
```

Asynchronously writes a subarray of characters to the stream.

Parameters:

- `buffer`: A character array that contains the data to write.
- `index`: The character position in the buffer at which to begin reading data.
- `count`: The maximum number of characters to write.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentException`: The `index` plus `count` is greater than the buffer length.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `ObjectDisposedException`: The stream writer is disposed.
- `InvalidOperationException`: The stream writer is currently in use by a previous write operation.

#### Remarks

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Write`.

#### Examples
The following example shows how to write multiple characters to a text file by using the `WriteAsync` method.

_Code sample not included: ~/snippets/csharp/System.IO/StreamWriter/AutoFlush/example24.cs._

## StreamWriter.WriteLine(Char>) method

```csharp
public override void WriteLine (ReadOnlySpan<char> buffer);
```

Writes the text representation of a character span to the stream, followed by a line terminator.

Parameters:

- `buffer`: The character span to write to the stream.

#### Remarks

The text representation of the specified value is produced by calling the ReadOnlySpan\<Char>.ToString method.

The line terminator is defined by the `CoreNewLine` field.

For a list of common I/O tasks, see Common I/O Tasks.

## StreamWriter.WriteLine(String) method

```csharp
public override void WriteLine (string? value);
```

Writes a string to the stream, followed by a line terminator.

Parameters:

- `value`: The string to write. If `value` is `null`, only the line terminator is written.

#### Remarks

This overload is equivalent to the `Write` overload.

The line terminator is defined by the `CoreNewLine` field.

This method does not search the specified string for individual newline characters (hexadecimal 0x000a) and replace them with `TextWriter.NewLine`.

For a list of common I/O tasks, see Common I/O Tasks.

## StreamWriter.WriteLine(String, Object) method

```csharp
public override void WriteLine (string format, object? arg0);
```

Writes a formatted string and a new line to the stream, using the same semantics as the `String.Format` method.

Parameters:

- `format`: A composite format string.
- `arg0`: The object to format and write.

#### Remarks

See `WriteLine` for a description of the composite formatting capabilities offered.

## StreamWriter.WriteLine(String, Object[]) method

```csharp
public override void WriteLine (string format, params object?[] arg);
```

Writes out a formatted string and a new line to the stream, using the same semantics as `String.Format`.

Parameters:

- `format`: A composite format string.
- `arg`: An object array that contains zero or more objects to format and write.

#### Remarks

See `WriteLine` for a description of the composite formatting capabilities offered.

## StreamWriter.WriteLine(String, Object>) method

```csharp
public override void WriteLine (string format, scoped ReadOnlySpan<object?> arg);
```

Writes out a formatted string and a new line to the stream, using the same semantics as `String.Format`.

Parameters:

- `format`: A composite format string.
- `arg`: An object span that contains zero or more objects to format and write.

To be added.

## StreamWriter.WriteLine(String, Object, Object) method

```csharp
public override void WriteLine (string format, object? arg0, object? arg1);
```

Writes a formatted string and a new line to the stream, using the same semantics as the `String.Format` method.

Parameters:

- `format`: A composite format string.
- `arg0`: The first object to format and write.
- `arg1`: The second object to format and write.

#### Remarks

See `WriteLine` for a description of the composite formatting capabilities offered.

## StreamWriter.WriteLine(String, Object, Object, Object) method

```csharp
public override void WriteLine (string format, object? arg0, object? arg1, object? arg2);
```

Writes out a formatted string and a new line to the stream, using the same semantics as `String.Format`.

Parameters:

- `format`: A composite format string.
- `arg0`: The first object to format and write.
- `arg1`: The second object to format and write.
- `arg2`: The third object to format and write.

#### Remarks

See `WriteLine` for a description of the composite formatting capabilities offered.

## StreamWriter.WriteLineAsync() method

```csharp
public override System.Threading.Tasks.Task WriteLineAsync ();
```

Asynchronously writes a line terminator to the stream.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ObjectDisposedException`: The stream writer is disposed.
- `InvalidOperationException`: The stream writer is currently in use by a previous write operation.

#### Remarks
The line terminator is defined by the `NewLine` property.

## StreamWriter.WriteLineAsync(Char) method

```csharp
public override System.Threading.Tasks.Task WriteLineAsync (char value);
```

Asynchronously writes a character to the stream, followed by a line terminator.

Parameters:

- `value`: The character to write to the stream.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ObjectDisposedException`: The stream writer is disposed.
- `InvalidOperationException`: The stream writer is currently in use by a previous write operation.

#### Remarks
The line terminator is defined by the `NewLine` property.

#### Examples
The following example shows how to write a single character (the letter "a") to a line in a text file, followed by another line that contains a single character (the letter "b"), by using the `WriteLineAsync` method.

_Code sample not included: ~/snippets/csharp/System.IO/StreamWriter/AutoFlush/example22.cs._
