---
title: "TextWriter class (part 6 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/TextWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TextWriter class (part 6 of 6)

## TextWriter.WriteLineAsync(Char[]) method

```csharp
public System.Threading.Tasks.Task WriteLineAsync (char[]? buffer);
```

Asynchronously writes an array of characters to the text stream, followed by a line terminator.

Parameters:

- `buffer`: The character array to write to the text stream. If the character array is `null`, only the line terminator is written.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ObjectDisposedException`: The text writer is disposed.
- `InvalidOperationException`: The text writer is currently in use by a previous write operation.

#### Remarks
The line terminator is defined by the `CoreNewLine` field.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteLine`.

## TextWriter.WriteLineAsync(String) method

```csharp
public virtual System.Threading.Tasks.Task WriteLineAsync (string? value);
```

Asynchronously writes a string to the text stream, followed by a line terminator.

Parameters:

- `value`: The string to write. If the value is `null`, only a line terminator is written.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ObjectDisposedException`: The text writer is disposed.
- `InvalidOperationException`: The text writer is currently in use by a previous write operation.

#### Remarks
The line terminator is defined by the `CoreNewLine` field.

The `TextWriter` class is an abstract class. Therefore, you do not instantiate it in your code. For an example of using the `TextWriter.WriteLineAsync` method, see the `StreamWriter.WriteLineAsync` method.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteLine`.

## TextWriter.WriteLineAsync(Rune) method

```csharp
public virtual System.Threading.Tasks.Task WriteLineAsync (System.Text.Rune value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## TextWriter.WriteLineAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task WriteLineAsync (System.Threading.CancellationToken <example-value>);
```

To be added.

Parameters:

- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## TextWriter.WriteLineAsync(Char>, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.Task WriteLineAsync (ReadOnlyMemory<char> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously writes the text representation of a character memory region to the text stream, followed by a line terminator.

Parameters:

- `buffer`: The character memory region to write to the text stream.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The line terminator is defined by the `CoreNewLine` field.

## TextWriter.WriteLineAsync(String, CancellationToken) method

```csharp
public System.Threading.Tasks.Task WriteLineAsync (string? value, System.Threading.CancellationToken <example-value>);
```

To be added.

Parameters:

- `value`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## TextWriter.WriteLineAsync(StringBuilder, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.Task WriteLineAsync (System.Text.StringBuilder? value, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously writes the text representation of a string builder to the text stream, followed by a line terminator.

Parameters:

- `value`: The string, as a string builder, to write to the text stream.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The line terminator is defined by the `CoreNewLine` field.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteLine`.

## TextWriter.WriteLineAsync(Char[], Int32, Int32) method

```csharp
public virtual System.Threading.Tasks.Task WriteLineAsync (char[] buffer, int index, int count);
```

Asynchronously writes a subarray of characters to the text stream, followed by a line terminator.

Parameters:

- `buffer`: The character array to write data from.
- `index`: The character position in the buffer at which to start retrieving data.
- `count`: The number of characters to write.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentException`: The `index` plus `count` is greater than the buffer length.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `ObjectDisposedException`: The text writer is disposed.
- `InvalidOperationException`: The text writer is currently in use by a previous write operation.

#### Remarks

The line terminator is defined by the `CoreNewLine` field.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `WriteLine`.

## TextWriter.CoreNewLine field

```csharp
protected char[] CoreNewLine;
```

Stores the newline characters used for this `TextWriter`.

#### Remarks
For a list of common I/O tasks, see Common I/O Tasks.

## TextWriter.Null field

```csharp
public static readonly System.IO.TextWriter Null;
```

Provides a `TextWriter` with no backing store that can be written to, but not read from.

#### Remarks
Use `Null` to redirect output to a stream that will not consume any operating system resources.

When the `TextWriter.Write` methods are invoked on `Null`, the call simply returns, and no data is actually written to any backing store.

For a list of common I/O tasks, see Common I/O Tasks.
