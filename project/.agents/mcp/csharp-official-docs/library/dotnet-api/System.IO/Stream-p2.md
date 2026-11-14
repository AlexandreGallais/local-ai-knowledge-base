---
title: "Stream class (part 2 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/Stream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Stream class (part 2 of 6)

## Stream.BeginWrite(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public virtual IAsyncResult BeginWrite (byte[] buffer, int offset, int count, AsyncCallback? callback, object? state);
```

Begins an asynchronous write operation. (Consider using `Stream.WriteAsync` instead.)

Parameters:

- `buffer`: The buffer to write data from.
- `offset`: The byte offset in `buffer` from which to begin writing.
- `count`: The maximum number of bytes to write.
- `callback`: An optional asynchronous callback, to be called when the write is complete.
- `state`: A user-provided object that distinguishes this particular asynchronous write request from other requests.

Returns: An `IAsyncResult` that represents the asynchronous write, which could still be pending.

Exceptions:

- `IOException`: Attempted an asynchronous write past the end of the stream, or a disk error occurs.
- `ArgumentException`: One or more of the arguments is invalid.
- `ObjectDisposedException`: Methods were called after the stream was closed.
- `NotSupportedException`: The current `Stream` implementation does not support the write operation.

#### Remarks

This method is available to support legacy code; however, the newer async methods, such as `Stream.ReadAsync`, `Stream.WriteAsync`, `Stream.CopyToAsync`, and `Stream.FlushAsync`, help you implement asynchronous I/O operations more easily.

The default implementation of `BeginWrite` on a stream calls the `Stream.Write` method synchronously, which means that `Write` might block on some streams. However, instances of classes such as `FileStream` and `NetworkStream` fully support asynchronous operations if the instances have been opened asynchronously. Therefore, calls to `BeginWrite` will not block on those streams. You can override `BeginWrite` (by using async delegates, for example) to provide asynchronous behavior.

Pass the `IAsyncResult` returned by the current method to `Stream.EndWrite` to ensure that the write completes and frees resources appropriately. `Stream.EndWrite` must be called once for every call to `Stream.BeginWrite`. You can do this either by using the same code that called `BeginWrite` or in a callback passed to `BeginWrite`. If an error occurs during an asynchronous write, an exception will not be thrown until `EndWrite` is called with the `IAsyncResult` returned by this method.

If a stream is writable, writing at the end of the stream expands the stream.

The current position in the stream is updated when you issue the asynchronous read or write, not when the I/O operation completes. Multiple simultaneous asynchronous requests render the request completion order uncertain.

Use the `CanWrite` property to determine whether the current instance supports writing.

If a stream is closed or you pass an invalid argument, exceptions are thrown immediately from `BeginWrite`. Errors that occur during an asynchronous write request, such as a disk failure during the I/O request, occur on the thread pool thread and throw exceptions when calling `EndWrite`.

## Stream.Close() method

```csharp
public virtual void Close ();
```

Closes the current stream and releases any resources (such as sockets and file handles) associated with the current stream. Instead of calling this method, ensure that the stream is properly disposed.

#### Remarks
This method calls `Stream.Dispose`, specifying `true` to release all resources. You do not have to specifically call the `Stream.Close` method. Instead, ensure that every `Stream` object is properly disposed. You can declare `Stream` objects within a `using` block (or `Using` block in Visual Basic) to ensure that the stream and all of its resources are disposed, or you can explicitly call the `Stream.Dispose` method.

Flushing the stream will not flush its underlying encoder unless you explicitly call an implementation of `Stream.Flush` or `Close`. Setting `StreamWriter.AutoFlush` to `true` means that data will be flushed from the buffer to the stream, but the encoder state will not be flushed. This allows the encoder to keep its state (partial characters) so that it can encode the next block of characters correctly. This scenario affects UTF8 and UTF7 where certain characters can be encoded only after the encoder receives the adjacent character or characters.

Attempts to manipulate the stream after the stream has been closed might throw an `ObjectDisposedException`.

## Stream.CopyTo(Stream) method

```csharp
public void CopyTo (System.IO.Stream destination);
```

Reads the bytes from the current stream and writes them to another stream. Both streams positions are advanced by the number of bytes copied.

Parameters:

- `destination`: The stream to which the contents of the current stream will be copied.

Exceptions:

- `ArgumentNullException`: `destination` is `null`.
- `NotSupportedException`: The current stream does not support reading.

-or-

`destination` does not support writing.
- `ObjectDisposedException`: Either the current stream or `destination` were closed before the `Stream.CopyTo` method was called.
- `IOException`: An I/O error occurred.

#### Remarks
Copying begins at the current position in the current stream, and does not reset the position of the destination stream after the copy operation is complete.

#### Examples
The following example copies the contents of a `FileStream` to a `MemoryStream`.

_Code sample not included: ~/snippets/csharp/System.IO/Stream/CopyTo/program.cs._

## Stream.CopyTo(Stream, Int32) method

```csharp
public virtual void CopyTo (System.IO.Stream destination, int bufferSize);
```

Reads the bytes from the current stream and writes them to another stream, using a specified buffer size. Both streams positions are advanced by the number of bytes copied.

Parameters:

- `destination`: The stream to which the contents of the current stream will be copied.
- `bufferSize`: The size of the buffer. This value must be greater than zero. The default size is 81920.

Exceptions:

- `ArgumentNullException`: `destination` is `null`.
- `ArgumentOutOfRangeException`: `bufferSize` is negative or zero.
- `NotSupportedException`: The current stream does not support reading.

-or-

`destination` does not support writing.
- `ObjectDisposedException`: Either the current stream or `destination` were closed before the `Stream.CopyTo` method was called.
- `IOException`: An I/O error occurred.

#### Remarks
Copying begins at the current position in the current stream, and does not reset the position of the destination stream after the copy operation is complete.

## Stream.CopyToAsync(Stream) method

```csharp
public System.Threading.Tasks.Task CopyToAsync (System.IO.Stream destination);
```

Asynchronously reads the bytes from the current stream and writes them to another stream. Both streams positions are advanced by the number of bytes copied.

Parameters:

- `destination`: The stream to which the contents of the current stream will be copied.

Returns: A task that represents the asynchronous copy operation.

Exceptions:

- `ArgumentNullException`: `destination` is `null`.
- `ObjectDisposedException`: Either the current stream or the destination stream is disposed.
- `NotSupportedException`: The current stream does not support reading, or the destination stream does not support writing.

#### Remarks
The `Stream.CopyToAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Copying begins at the current position in the current stream.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `CopyTo`.

#### Examples
The following example demonstrates how to use two `FileStream` objects to asynchronously copy the files from one directory to another. The `FileStream` class derives from the `Stream` class.  Notice that the `Click` event handler for the `Button` control is marked with the `async` modifier because it calls an asynchronous method

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/Overview/example.cs._

## Stream.CopyToAsync(Stream, Int32) method

```csharp
public System.Threading.Tasks.Task CopyToAsync (System.IO.Stream destination, int bufferSize);
```

Asynchronously reads the bytes from the current stream and writes them to another stream, using a specified buffer size. Both streams positions are advanced by the number of bytes copied.

Parameters:

- `destination`: The stream to which the contents of the current stream will be copied.
- `bufferSize`: The size, in bytes, of the buffer. This value must be greater than zero. The default size is 81920.

Returns: A task that represents the asynchronous copy operation.

Exceptions:

- `ArgumentNullException`: `destination` is `null`.
- `ArgumentOutOfRangeException`: `bufferSize` is negative or zero.
- `ObjectDisposedException`: Either the current stream or the destination stream is disposed.
- `NotSupportedException`: The current stream does not support reading, or the destination stream does not support writing.

#### Remarks
The `Stream.CopyToAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Copying begins at the current position in the current stream.

For an example of copying between two streams, see the `CopyToAsync` overload.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `CopyTo`.

## Stream.CopyToAsync(Stream, CancellationToken) method

```csharp
public System.Threading.Tasks.Task CopyToAsync (System.IO.Stream destination, System.Threading.CancellationToken <example-value>);
```

Asynchronously reads the bytes from the current stream and writes them to another stream, using a specified cancellation token. Both streams positions are advanced by the number of bytes copied.

Parameters:

- `destination`: The stream to which the contents of the current stream will be copied.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous copy operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
The `Stream.CopyToAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

Copying begins at the current position in the current stream.

For an example of copying between two streams, see the `CopyToAsync` overload.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `CopyTo`.

## Stream.CopyToAsync(Stream, Int32, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.Task CopyToAsync (System.IO.Stream destination, int bufferSize, System.Threading.CancellationToken <example-value>);
```

Asynchronously reads the bytes from the current stream and writes them to another stream, using a specified buffer size and cancellation token. Both streams positions are advanced by the number of bytes copied.

Parameters:

- `destination`: The stream to which the contents of the current stream will be copied.
- `bufferSize`: The size, in bytes, of the buffer. This value must be greater than zero. The default size is 81920.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous copy operation.

Exceptions:

- `ArgumentNullException`: `destination` is `null`.
- `ArgumentOutOfRangeException`: `bufferSize` is negative or zero.
- `ObjectDisposedException`: Either the current stream or the destination stream is disposed.
- `NotSupportedException`: The current stream does not support reading, or the destination stream does not support writing.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
The `Stream.CopyToAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

Copying begins at the current position in the current stream.

For an example of copying between two streams, see the `CopyToAsync` overload.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `CopyTo`.
