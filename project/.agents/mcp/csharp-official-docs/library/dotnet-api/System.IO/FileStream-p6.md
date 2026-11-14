---
title: "FileStream class (part 6 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileStream class (part 6 of 7)

## FileStream.ReadAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task<int> ReadAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Asynchronously reads a sequence of bytes from the current file stream and writes them to a byte array beginning at a specified offset, advances the position within the file stream by the number of bytes read, and monitors cancellation requests.

Parameters:

- `buffer`: The buffer to write the data into.
- `offset`: The byte offset in `buffer` at which to begin writing data from the stream.
- `count`: The maximum number of bytes to read.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous read operation and wraps the total number of bytes read into the buffer. The result value can be less than the number of bytes requested if the number of bytes currently available is less than the requested number, or it can be 0 (zero) if the end of the stream has been reached.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `count` is negative.
- `ArgumentException`: The sum of `offset` and `count` is larger than the buffer length.
- `NotSupportedException`: The stream does not support reading.
- `ObjectDisposedException`: The stream has been disposed.
- `InvalidOperationException`: The stream is currently in use by a previous read operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The `ReadAsync` method enables you to perform resource-intensive file operations without blocking the main thread. This performance consideration is particularly important in a desktop app where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Use the `CanRead` property to determine whether the current instance supports reading.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property. If the handle to the file is disposed, the returned task contains the `ObjectDisposedException` exception in the `Exception` property.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Read`.

#### Examples

The following example shows how to read from a file asynchronously.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/Overview/example4.cs._

## FileStream.ReadByte() method

```csharp
public override int ReadByte ();
```

Reads a byte from the file and advances the read position one byte.

Returns: The byte, cast to an `Int32`, or -1 if the end of the stream has been reached.

Exceptions:

- `NotSupportedException`: The current stream does not support reading.
- `ObjectDisposedException`: The current stream is closed.

#### Remarks
This method overrides `Stream.ReadByte`.

> **Note:**
> Use the `CanRead` property to determine whether the current instance supports reading. For additional information, see `Stream.CanRead`.

#### Examples
The following code example shows how to write data to a file, byte by byte, and then verify that the data was written correctly.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/.ctor/source.cs._

## FileStream.Seek(Int64, SeekOrigin) method

```csharp
public override long Seek (long offset, System.IO.SeekOrigin origin);
```

Sets the current position of this stream to the given value.

Parameters:

- `offset`: The point relative to `origin` from which to begin seeking.
- `origin`: Specifies the beginning, the end, or the current position as a reference point for `offset`, using a value of type `SeekOrigin`.

Returns: The new position in the stream.

Exceptions:

- `IOException`: An I/O error occurred.
- `NotSupportedException`: The stream does not support seeking, such as if the `FileStream` is constructed from a pipe or console output.
- `ArgumentException`: Seeking is attempted before the beginning of the stream.
- `ObjectDisposedException`: Methods were called after the stream was closed.

#### Remarks
This method overrides `Stream.Seek`.

> **Note:**
> Use the `CanSeek` property to determine whether the current instance supports seeking. For additional information, see `Stream.CanSeek`.

You can seek to any location beyond the length of the stream. When you seek beyond the length of the file, the file size grows. Data added to the end of the file is set to zero.

For a list of common file and directory operations, see Common I/O Tasks.

#### Examples
The following example shows how to write data to a file, byte by byte, and then verify that the data was written correctly.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/.ctor/source.cs._

The following example reads text in the reverse direction, from the end of file to the beginning of the file, by using the various `SeekOrigin` values with the `FileStream.Seek` method.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/Seek/source.cs._

## FileStream.SetLength(Int64) method

```csharp
public override void SetLength (long value);
```

Sets the length of this stream to the given value.

Parameters:

- `value`: The new length of the stream.

Exceptions:

- `IOException`: An I/O error has occurred.
- `NotSupportedException`: The stream does not support both writing and seeking.
- `ArgumentOutOfRangeException`: Attempted to set the `value` parameter to less than 0.

#### Remarks
This method overrides `Stream.SetLength`.

If the given value is less than the current length of the stream, the stream is truncated. In this scenario, if the current position is greater than the new length, the current position is moved to the last byte of the stream. If the given value is larger than the current length of the stream, the stream is expanded, and the current position remains the same. If the stream is expanded, the contents of the stream between the old and the new length are undefined on Windows, while on Linux, that space is filled with zeros.

A stream must support both writing and seeking for `SetLength` to work.

> **Note:**
> Use the `CanWrite` property to determine whether the current instance supports writing, and the `CanSeek` property to determine whether seeking is supported. For additional information, see `Stream.CanWrite` and `Stream.CanSeek`.

For a list of common file and directory operations, see Common I/O Tasks.

## FileStream.Unlock(Int64, Int64) method

```csharp
public virtual void Unlock (long position, long length);
```

Allows access by other processes to all or part of a file that was previously locked.

Parameters:

- `position`: The beginning of the range to unlock.
- `length`: The range to be unlocked.

Exceptions:

- `ArgumentOutOfRangeException`: `position` or `length` is negative.

#### Remarks
For a list of common file and directory operations, see Common I/O Tasks.

#### Examples
The following code example demonstrates how to lock part of a file so another process cannot access that part of the file even though it has read/write access to the file, and then unlock the specified part of the file . Run the program simultaneously in different command windows and investigate using the different console input options.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/.ctor/fstreamlock.cs._

## FileStream.Write(Byte>) method

```csharp
public override void Write (ReadOnlySpan<byte> buffer);
```

Writes a sequence of bytes from a read-only span to the current file stream and advances the current position within this file stream by the number of bytes written.

Parameters:

- `buffer`: A region of memory. This method copies the contents of this region to the current file stream.

Exceptions:

- `IOException`: .NET 8 and later versions: The underlying pipe is closed or disconnected.

#### Remarks

Use the `CanWrite` property to determine whether the current instance supports writing. Use the `FileStream.WriteAsync` method to write asynchronously to the current stream.

If the write operation is successful, the position within the file stream advances by the number of bytes written. If an exception occurs, the position within the file stream remains unchanged.

## FileStream.Write(Byte[], Int32, Int32) method

```csharp
public override void Write (byte[] buffer, int offset, int count);
```

Writes a block of bytes to the file stream.

Parameters:

- `buffer`: To be added.
- `offset`: The zero-based byte offset in `array` from which to begin copying bytes to the stream.
- `count`: The maximum number of bytes to write.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentException`: `offset` and `count` describe an invalid range in `array`.
- `ArgumentOutOfRangeException`: `offset` or `count` is negative.
- `IOException`: An I/O error occurred.

-or-

Another thread may have caused an unexpected change in the position of the operating system's file handle.

-or-

.NET 8 and later versions: The underlying pipe is closed or disconnected.
- `ObjectDisposedException`: The stream is closed.
- `NotSupportedException`: The current stream instance does not support writing.

#### Remarks

This method overrides `Stream.Write`.

The `offset` parameter gives the offset of the byte in `array` (the buffer index) at which to begin copying, and the `count` parameter gives the number of bytes that will be written to the stream. If the write operation is successful, the current position of the stream is advanced by the number of bytes written. If an exception occurs, the current position of the stream is unchanged.

> **Note:**
> Use the `CanWrite` property to determine whether the current instance supports writing. For additional information, see `Stream.CanWrite`.

Do not interrupt a thread that's performing a write operation. Although the application may appear to run successfully after the thread is unblocked, the interruption can decrease your application's performance and reliability.

For a list of common file and directory operations, see Common I/O Tasks.

#### Examples
This code example is part of a larger example provided for the `FileStream.Lock` method.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/.ctor/fstreamlock.cs._

## FileStream.WriteAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask WriteAsync (ReadOnlyMemory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously writes a sequence of bytes from a memory region to the current file stream, advances the current position within this file stream by the number of bytes written, and monitors cancellation requests.

Parameters:

- `buffer`: The region of memory to write data from.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The `WriteAsync` method lets you perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in apps where a time-consuming stream operation can block the UI thread and make your app appear as if it isn't working.

Use the `CanWrite` property to determine whether the current instance supports writing.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

## FileStream.WriteAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Asynchronously writes a sequence of bytes to the current stream, advances the current position within this stream by the number of bytes written, and monitors cancellation requests.

Parameters:

- `buffer`: The buffer to write data from.
- `offset`: The zero-based byte offset in `buffer` from which to begin copying bytes to the stream.
- `count`: The maximum number of bytes to write.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `count` is negative.
- `ArgumentException`: The sum of `offset` and `count` is larger than the buffer length.
- `NotSupportedException`: The stream does not support writing.
- `ObjectDisposedException`: The stream has been disposed.
- `InvalidOperationException`: The stream is currently in use by a previous write operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
The `FileStream.WriteAsync` method enables you to perform resource-intensive file operations without blocking the main thread. This performance consideration is particularly important in apps where a time-consuming stream operation can block the UI thread and make your app appear as if it isn't working.

Use the `CanWrite` property to determine whether the current instance supports writing.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property. If the handle to the file is disposed, the returned task contains the `ObjectDisposedException` exception in the `Exception` property.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Write`.

#### Examples
The following example shows how to write asynchronously to a file.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/Overview/example3.cs._
