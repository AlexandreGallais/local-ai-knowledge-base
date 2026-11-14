---
title: "TextReader class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/TextReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TextReader class

Namespace: `System.IO`

```csharp
public abstract class TextReader : MarshalByRefObject, IDisposable
```

Represents a reader that can read a sequential series of characters.

#### Remarks
`TextReader` is the abstract base class of `StreamReader` and `StringReader`, which read characters from streams and strings, respectively. Use these derived classes to open a text file for reading a specified range of characters, or to create a reader based on an existing stream.

> **Important:**
This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly (by calling its `Dispose` method) or indirectly (with a language construct such as `using` in C#). For more information, see Use an object that implements IDisposable.

#### Examples
The `TextReader` class is an abstract class. Therefore, you do not instantiate it in your code. The `StreamReader` class derives from `TextReader` and provides implementations of the members for reading from a stream. The following example shows how to read all the characters in a file by using the `ReadAsync` method. It checks whether each character is a letter, digit, or white space before adding the character to an instance of the `StringBuilder` class.

_Code sample not included: ~/snippets/csharp/System.IO/StreamReader/Overview/example42.cs._

## TextReader.TextReader() constructor

```csharp
protected TextReader ();
```

Initializes a new instance of the `TextReader` class.

#### Remarks
Use this constructor for derived classes.

## TextReader.Close() method

```csharp
public virtual void Close ();
```

Closes the `TextReader` and releases any system resources associated with the `TextReader`.

#### Remarks
This implementation of `Close` calls the `Dispose` method and passes it a `true` value.

> **Note:**
> In derived classes, do not override the `TextReader.Close` method. Instead, override the `Dispose` method to add code for releasing resources.

## TextReader.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the `TextReader` object.

#### Remarks
Call `TextReader.Dispose` when you are finished using the `TextReader`. The `TextReader.Dispose` method leaves the `TextReader` in an unusable state. After calling `TextReader.Dispose`, you must release all references to the `TextReader` so the garbage collector can reclaim the memory that the `TextReader` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
> Always call `TextReader.Dispose` before you release your last reference to the `TextReader`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `TextReader` object's `Object.Finalize` method.

## TextReader.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `TextReader` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `TextReader` references. This method invokes the `Dispose` method of each referenced object.

## TextReader.Peek() method

```csharp
public virtual int Peek ();
```

Reads the next character without changing the state of the reader or the character source. Returns the next available character without actually reading it from the reader.

Returns: An integer representing the next character to be read, or -1 if no more characters are available or the reader does not support seeking.

Exceptions:

- `ObjectDisposedException`: The `TextReader` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
The `TextReader.Peek` method returns an integer value in order to determine whether the end of the file, or another error has occurred. This allows a user to first check if the returned value is -1 before casting it to a `Char` type.

The current position of the `TextReader` is not changed by this operation. The returned value is -1 if no more characters are available. The default implementation returns -1.

The `TextReader` class is an abstract class. Therefore, you do not instantiate it in your code. For an example of using the `TextReader.Peek` method, see the `StreamReader.Peek` method.

## TextReader.Read() method

```csharp
public virtual int Read ();
```

Reads the next character from the text reader and advances the character position by one character.

Returns: The next character from the text reader, or -1 if no more characters are available. The default implementation returns -1.

Exceptions:

- `ObjectDisposedException`: The `TextReader` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
The `TextReader` class is an abstract class. Therefore, you do not instantiate it in your code. For an example of using the `TextReader.Read` method, see the `StreamReader.Read` method.

## TextReader.Read(Char>) method

```csharp
public virtual int Read (Span<char> buffer);
```

Reads the characters from the current reader and writes the data to the specified buffer.

Parameters:

- `buffer`: When this method returns, contains the specified span of characters replaced by the characters read from the current source.

Returns: The number of characters that have been read. The number will be less than or equal to the `buffer` length, depending on whether the data is available within the reader. This method returns 0 (zero) if it is called when no more characters are left to read.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `IOException`: The number of characters read from the stream is larger than the length of the `buffer`.

To be added.

## TextReader.Read(Char[], Int32, Int32) method

```csharp
public virtual int Read (char[] buffer, int index, int count);
```

Reads a specified maximum number of characters from the current reader and writes the data to a buffer, beginning at the specified index.

Parameters:

- `buffer`: When this method returns, contains the specified character array with the values between `index` and (`index` + `count` - 1) replaced by the characters read from the current source.
- `index`: The position in `buffer` at which to begin writing.
- `count`: The maximum number of characters to read. If the end of the reader is reached before the specified number of characters is read into the buffer, the method returns.

Returns: The number of characters that have been read. The number will be less than or equal to `count`, depending on whether the data is available within the reader. This method returns 0 (zero) if it is called when no more characters are left to read.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentException`: The buffer length minus `index` is less than `count`.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `ObjectDisposedException`: The `TextReader` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
This method returns after either `count` characters are read or the end of the file is reached. `TextReader.ReadBlock` is a blocking version of this method.

The `TextReader` class is an abstract class. Therefore, you do not instantiate it in your code. For an example of using the `TextReader.Read` method, see the `StreamReader.Read` method.

## TextReader.ReadAsync(Char>, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.ValueTask<int> ReadAsync (Memory<char> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads the characters from the current stream into a memory block.

Parameters:

- `buffer`: When this method returns, contains the specified memory block of characters replaced by the characters read from the current source.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A value task that represents the asynchronous read operation. The value of the type parameter contains the number of characters that have been read, or 0 if at the end of the stream and no data was read. The number will be less than or equal to the `buffer` length, depending on whether the data is available within the stream.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## TextReader.ReadAsync(Char[], Int32, Int32) method

```csharp
public virtual System.Threading.Tasks.Task<int> ReadAsync (char[] buffer, int index, int count);
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
The task completes after either the number of characters specified by the `count` parameter are read or the end of the file is reached.

The `TextReader` class is an abstract class. Therefore, you do not instantiate it in your code. For an example of using the `TextReader.ReadAsync` method, see the `StreamReader.ReadAsync` method.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Read`.

## TextReader.ReadBlock(Char>) method

```csharp
public virtual int ReadBlock (Span<char> buffer);
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

## TextReader.ReadBlock(Char[], Int32, Int32) method

```csharp
public virtual int ReadBlock (char[] buffer, int index, int count);
```

Reads a specified maximum number of characters from the current text reader and writes the data to a buffer, beginning at the specified index.

Parameters:

- `buffer`: When this method returns, this parameter contains the specified character array with the values between `index` and (`index` + `count` -1) replaced by the characters read from the current source.
- `index`: The position in `buffer` at which to begin writing.
- `count`: The maximum number of characters to read.

Returns: The number of characters that have been read. The number will be less than or equal to `count`, depending on whether all input characters have been read.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentException`: The buffer length minus `index` is less than `count`.
- `ArgumentOutOfRangeException`: `index` or `count` is negative.
- `ObjectDisposedException`: The `TextReader` is closed.
- `IOException`: An I/O error occurs.

#### Remarks
The position of the underlying text reader is advanced by the number of characters that were read into `buffer`.

The method blocks until either `count` characters are read, or all characters have been read. This is a blocking version of `TextReader.Read`.

## TextReader.ReadBlockAsync(Char>, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.ValueTask<int> ReadBlockAsync (Memory<char> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads the characters from the current stream and writes the data to a buffer.

Parameters:

- `buffer`: When this method returns, contains the specified memory block of characters replaced by the characters read from the current source.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A value task that represents the asynchronous read operation. The value of the type parameter contains the total number of characters read into the buffer. The result value can be less than the number of characters requested if the number of characters currently available is less than the requested number, or it can be 0 (zero) if the end of the stream has been reached.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
