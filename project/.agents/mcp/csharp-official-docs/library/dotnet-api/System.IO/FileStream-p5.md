---
title: "FileStream class (part 5 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileStream class (part 5 of 7)

## FileStream.EndWrite(IAsyncResult) method

```csharp
public override void EndWrite (IAsyncResult asyncResult);
```

Ends an asynchronous write operation and blocks until the I/O operation is complete. (Consider using `FileStream.WriteAsync` instead.)

Parameters:

- `asyncResult`: The pending asynchronous I/O request.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: This `IAsyncResult` object was not created by calling `Stream.BeginWrite` on this class.
- `InvalidOperationException`: `FileStream.EndWrite` is called multiple times.
- `IOException`: The stream is closed or an internal error has occurred.

#### Remarks

This method is available to support legacy code; however, the newer async methods, such as `FileStream.ReadAsync`, `FileStream.WriteAsync`, `Stream.CopyToAsync`, and `FileStream.FlushAsync`, help you implement asynchronous file operations more easily.

This method overrides `Stream.EndWrite`.

`FileStream.EndWrite` must be called exactly once on every `IAsyncResult` from `FileStream.BeginWrite`. `FileStream.EndWrite` will block until the I/O operation has completed.

#### Examples
This code example is part of a larger example provided for the `%23ctor` constructor.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/.ctor/source1.cs._

## FileStream.Finalize() method

```csharp
~FileStream ();
```

Ensures that resources are freed and other cleanup operations are performed when the garbage collector reclaims the `FileStream`.

#### Remarks
The garbage collector calls `Finalize` when the current object is ready to be finalized. `Finalize` closes the `FileStream`.

## FileStream.Flush() method

```csharp
public override void Flush ();
```

Clears buffers for this stream and causes any buffered data to be written to the file.

Exceptions:

- `IOException`: An I/O error occurred.
- `ObjectDisposedException`: The stream is closed.

#### Remarks
This method overrides `Stream.Flush`.

When you call the `FileStream.Flush` method, the operating system I/O buffer is also flushed.

A stream's encoder is not flushed unless you explicitly call `FileStream.Flush` or dispose of the object. Setting `StreamWriter.AutoFlush` to `true` means that data will be flushed from the buffer to the stream, but the encoder state will not be flushed. This allows the encoder to keep its state (partial characters) so that it can encode the next block of characters correctly. This scenario affects UTF8 and UTF7 where certain characters can only be encoded after the encoder receives the adjacent character or characters.

Because a buffer can be used for either reading or writing, `Flush` performs the following two functions:

- Any data previously written to the buffer is copied to the file and the buffer is cleared except for its encoder state.

- If `BufferedStream.CanSeek` is `true` and data was previously copied from the file to the buffer for reading, the current position within the file is decremented by the number of unread bytes in the buffer. The buffer is then cleared.

Use the `Flush` method overload when you want to ensure that all buffered data in intermediate file buffers is written to disk.

#### Examples
This code example is part of a larger example provided for the `FileStream.Lock` method.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/.ctor/fstreamlock.cs._

## FileStream.Flush(Boolean) method

```csharp
public virtual void Flush (bool flushToDisk);
```

Clears buffers for this stream and causes any buffered data to be written to the file, and also clears all intermediate file buffers.

Parameters:

- `flushToDisk`: `true` to flush all intermediate file buffers; otherwise, `false`.

#### Remarks
Use this overload when you want to ensure that all buffered data in intermediate file buffers is written to disk.

When you call the `FileStream.Flush` method, the operating system I/O buffer is also flushed.

## FileStream.FlushAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.Task FlushAsync (System.Threading.CancellationToken <example-value>);
```

Asynchronously clears all buffers for this stream, causes any buffered data to be written to the file, and monitors cancellation requests.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous flush operation.

Exceptions:

- `ObjectDisposedException`: The stream has been disposed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

This method flushes the .NET stream buffers to the file, but does not flush intermediate file buffers in the operating system. To ensure that all buffered data is written to the underlying storage device, use the `Flush` method with the `flushToDisk` parameter set to `true`.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property. If the handle to the file is disposed, the returned task contains the `ObjectDisposedException` exception in the `Exception` property.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Flush`.

## FileStream.Lock(Int64, Int64) method

```csharp
public virtual void Lock (long position, long length);
```

Prevents other processes from reading from or writing to the `FileStream`.

Parameters:

- `position`: The beginning of the range to lock. The value of this parameter must be equal to or greater than zero (0).
- `length`: The range to be locked.

Exceptions:

- `ArgumentOutOfRangeException`: `position` or `length` is negative.
- `ObjectDisposedException`: The file is closed.
- `IOException`: The process cannot access the file because another process has locked a portion of the file.

#### Remarks
Locking a range of a file stream gives the threads of the locking process exclusive access to that range of the file stream.

For a list of common file and directory operations, see Common I/O Tasks.

#### Examples
The following code example demonstrates how to lock part of a file so another process cannot access that part of the file even though it has read/write access to the file. Run the program simultaneously in different command windows and investigate using the different console input options.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/.ctor/fstreamlock.cs._

## FileStream.Read(Byte>) method

```csharp
public override int Read (Span<byte> buffer);
```

Reads a sequence of bytes from the current file stream and advances the position within the file stream by the number of bytes read.

Parameters:

- `buffer`: A region of memory. When this method returns, the contents of this region are replaced by the bytes read from the current file stream.

Returns: The total number of bytes read into the buffer. This can be less than the number of bytes allocated in the buffer if that many bytes are not currently available, or zero (0) if the end of the stream has been reached.

#### Remarks

Use the `CanRead` property to determine whether the current instance supports reading. Use the `FileStream.ReadAsync` method to read asynchronously from the current stream.

This method reads a maximum of `buffer.Length` bytes from the current file stream and stores them in `buffer`. The current position within the file stream is advanced by the number of bytes read; however, if an exception occurs, the current position within the file stream remains unchanged. The method will block until at least one byte of data can be read, in the event that no data is available. `Read` returns 0 only when there is no more data in the file stream and no more is expected (such as a closed socket or end of file). The method is free to return fewer bytes than requested even if the end of the file stream has not been reached.

Use `BinaryReader` for reading primitive data types.

## FileStream.Read(Byte[], Int32, Int32) method

```csharp
public override int Read (byte[] buffer, int offset, int count);
```

Reads a block of bytes from the stream and writes the data in a given buffer.

Parameters:

- `buffer`: To be added.
- `offset`: The byte offset in `array` at which the read bytes will be placed.
- `count`: The maximum number of bytes to read.

Returns: The total number of bytes read into the buffer. This might be less than the number of bytes requested if that number of bytes are not currently available, or zero if the end of the stream is reached.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `count` is negative.
- `NotSupportedException`: The stream does not support reading.
- `IOException`: An I/O error occurred.
- `ArgumentException`: `offset` and `count` describe an invalid range in `array`.
- `ObjectDisposedException`: Methods were called after the stream was closed.

#### Remarks
This method overrides `Stream.Read`.

The `offset` parameter gives the offset of the byte in `array` (the buffer index) at which to begin reading, and the `count` parameter gives the maximum number of bytes to be read from this stream. The returned value is the actual number of bytes read, or zero if the end of the stream is reached. If the read operation is successful, the current position of the stream is advanced by the number of bytes read. If an exception occurs, the current position of the stream is unchanged.

The `FileStream.Read` method returns zero only after reaching the end of the stream. Otherwise, `FileStream.Read` always reads at least one byte from the stream before returning. If no data is available from the stream upon a call to `FileStream.Read`, the method will block until at least one byte of data can be returned. An implementation is free to return fewer bytes than requested even if the end of the stream has not been reached.

Use `BinaryReader` for reading primitive data types.

Do not interrupt a thread that is performing a read operation. Although the application may appear to run successfully after the thread is unblocked, the interruption can decrease your application's performance and reliability.

For a list of common file and directory operations, see Common I/O Tasks.

#### Examples
The following example reads the contents from a `FileStream` and writes it into another `FileStream`.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/Read/fsread.cs._

## FileStream.ReadAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<int> ReadAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads a sequence of bytes from the current file stream and writes them to a memory region, advances the position within the file stream by the number of bytes read, and monitors cancellation requests.

Parameters:

- `buffer`: The buffer to write the data into.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation and wraps the total number of bytes read into the buffer. The result value can be less than the number of bytes requested if the number of bytes currently available is less than the requested number, or it can be 0 (zero) if the end of the stream has been reached.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The `ReadAsync` method enables you to perform resource-intensive file operations without blocking the main thread. This performance consideration is particularly important in a desktop app where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Use the `CanRead` property to determine whether the current instance supports reading.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property. If the handle to the file is disposed, the returned task contains the `ObjectDisposedException` exception in the `Exception` property.

#### Examples

The following example shows how to read from a file asynchronously.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/Overview/example4.cs._
