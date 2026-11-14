---
title: "CryptoStream class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CryptoStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CryptoStream class

Namespace: `System.Security.Cryptography`

```csharp
public class CryptoStream : System.IO.Stream
```

Defines a stream that links data streams to cryptographic transformations.

The common language runtime uses a stream-oriented design for cryptography. The core of this design is `CryptoStream`. Any cryptographic objects that implement `CryptoStream` can be chained together with any objects that implement `Stream`, so the streamed output from one object can be fed into the input of another object. The intermediate result (the output from the first object) does not need to be stored separately.

> **Important:**
> When `Stream.Read` or `Stream.ReadAsync` is called with a buffer of length `N`, the operation completes when either at least 1 byte has been read from the stream, or the underlying stream that it wraps returns 0 from a call to `Read`, indicating no more data is available. If your code assumes the `Read` methods won't return until all `N` bytes have been read, it could fail to read all the content. For more information, see Partial and zero-byte reads in streams.

You should always explicitly close your `CryptoStream` object after you're finished using it by calling the `CryptoStream.Clear` method. Doing so flushes the underlying stream and causes all remaining blocks of data to be processed by the `CryptoStream` object. However, if an exception occurs before you call the `Stream.Close` method, the `CryptoStream` object might not be closed. To ensure that the `Stream.Close` method always gets called, place your call to the `CryptoStream.Clear` method within the `finally` block of a `try`/`catch` statement.

This type implements the `IDisposable` interface. When you've finished using the type, you should dispose of it either directly or indirectly by calling its `CryptoStream.Clear` method, which in turn calls its `IDisposable` implementation. To dispose of the type directly, call its `CryptoStream.Clear` method in a `try`/`catch` block. To dispose of it indirectly, use a language construct such as `using` (in C#) or `Using` (in Visual Basic).

#### Examples

The following example demonstrates how to use a `CryptoStream` to encrypt a string. This method uses the `Aes` class with the specified `SymmetricAlgorithm.Key` and initialization vector (`SymmetricAlgorithm.IV`).

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CryptoStream/Overview/CryptoStream.cs._

## CryptoStream.CryptoStream(Stream, ICryptoTransform, CryptoStreamMode) constructor

```csharp
public CryptoStream (System.IO.Stream stream, System.Security.Cryptography.ICryptoTransform transform, System.Security.Cryptography.CryptoStreamMode mode);
```

Initializes a new instance of the `CryptoStream` class with a target data stream, the transformation to use, and the mode of the stream.

Parameters:

- `stream`: The stream on which to perform the cryptographic transformation.
- `transform`: The cryptographic transformation that is to be performed on the stream.
- `mode`: One of the `CryptoStreamMode` values.

Exceptions:

- `ArgumentException`: `stream` is invalid.

Any object that derives from `Stream` can be passed into the `stream` parameter. Any object that implements `ICryptoTransform` (such as `HashAlgorithm`) can be passed into the `transform` parameter.

## CryptoStream.CryptoStream(Stream, ICryptoTransform, CryptoStreamMode, Boolean) constructor

```csharp
public CryptoStream (System.IO.Stream stream, System.Security.Cryptography.ICryptoTransform transform, System.Security.Cryptography.CryptoStreamMode mode, bool leaveOpen);
```

Initializes a new instance of the `CryptoStream` class.

Parameters:

- `stream`: The stream on which to perform the cryptographic transformation.
- `transform`: The cryptographic transformation that is to be performed on the stream.
- `mode`: The mode of the stream.
- `leaveOpen`: `true` to not close the underlying stream when the `CryptoStream` object is disposed; otherwise, `false`.

Exceptions:

- `ArgumentException`: `mode` is invalid.

To be added.

## CryptoStream.CanRead property

```csharp
public override bool CanRead { get; }
```

Gets a value indicating whether the current `CryptoStream` is readable.

Returns: `true` if the current stream is readable; otherwise, `false`.

To be added.

## CryptoStream.CanSeek property

```csharp
public override bool CanSeek { get; }
```

Gets a value indicating whether you can seek within the current `CryptoStream`.

Returns: Always `false`.

Seeking is not enabled in a `CryptoStream`, so this method always returns `false`.

## CryptoStream.CanWrite property

```csharp
public override bool CanWrite { get; }
```

Gets a value indicating whether the current `CryptoStream` is writable.

Returns: `true` if the current stream is writable; otherwise, `false`.

To be added.

## CryptoStream.HasFlushedFinalBlock property

```csharp
public bool HasFlushedFinalBlock { get; }
```

Gets a value indicating whether the final buffer block has been written to the underlying stream.

Returns: `true` if the final block has been flushed; otherwise, `false`.

This property is set `true` when the `CryptoStream.FlushFinalBlock` method is called.

## CryptoStream.Length property

```csharp
public override long Length { get; }
```

Gets the length in bytes of the stream.

Returns: This property is not supported.

Exceptions:

- `NotSupportedException`: This property is not supported.

This property exists only to support inheritance from `Stream`, and cannot be used.

## CryptoStream.Position property

```csharp
public override long Position { get; set; }
```

Gets or sets the position within the current stream.

Returns: This property is not supported.

Exceptions:

- `NotSupportedException`: This property is not supported.

This property exists only to support inheritance from `Stream`, and cannot be used.

## CryptoStream.BeginRead(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginRead (byte[] buffer, int offset, int count, AsyncCallback? callback, object? state);
```

Begins an asynchronous read operation. (Consider using `ReadAsync` instead.)

Parameters:

- `buffer`: The buffer to read the data into.
- `offset`: The byte offset in `buffer` at which to begin writing data read from the stream.
- `count`: The maximum number of bytes to read.
- `callback`: An optional asynchronous callback, to be called when the read is complete.
- `state`: A user-provided object that distinguishes this particular asynchronous read request from other requests.

Returns: An `IAsyncResult` that represents the asynchronous read, which could still be pending.

Exceptions:

- `IOException`: Attempted an asynchronous read past the end of the stream, or a disk error occurred.
- `ArgumentException`: One or more of the arguments is invalid.
- `ObjectDisposedException`: Methods were called after the stream was closed.
- `NotSupportedException`: The current `Stream` implementation does not support the read operation.

> **Important:**
> This method might not read as many bytes as were requested. For more information, see Partial and zero-byte reads in DeflateStream, GZipStream, and CryptoStream.

This method is available to support legacy code; however, the newer async methods, such as `CryptoStream.ReadAsync`, `CryptoStream.WriteAsync`, `Stream.CopyToAsync`, and `CryptoStream.FlushAsync`, help you implement asynchronous I/O operations more easily.

Pass the `IAsyncResult` return value to the `CryptoStream.EndRead` method of the stream to determine how many bytes were read and to release operating system resources used for reading. `CryptoStream.EndRead` must be called once for every call to `CryptoStream.BeginRead`. You can do this either by using the same code that called `BeginRead` or in a callback passed to `BeginRead`.

The current position in the stream is updated when the asynchronous read or write is issued, not when the I/O operation completes.

Multiple simultaneous asynchronous requests render the request completion order uncertain.

Use the `CanRead` property to determine whether the current instance supports reading.

If a stream is closed or you pass an invalid argument, exceptions are thrown immediately from `BeginRead`. Errors that occur during an asynchronous read request, such as a disk failure during the I/O request, occur on the thread pool thread and throw exceptions when calling `EndRead`.

## CryptoStream.BeginWrite(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginWrite (byte[] buffer, int offset, int count, AsyncCallback? callback, object? state);
```

Begins an asynchronous write operation. (Consider using `WriteAsync` instead.)

Parameters:

- `buffer`: The buffer to write data from.
- `offset`: The byte offset in `buffer` from which to begin writing.
- `count`: The maximum number of bytes to write.
- `callback`: An optional asynchronous callback, to be called when the write is complete.
- `state`: A user-provided object that distinguishes this particular asynchronous write request from other requests.

Returns: An `IAsyncResult` that represents the asynchronous write, which could still be pending.

Exceptions:

- `IOException`: Attempted an asynchronous write past the end of the stream, or a disk error occurred.
- `ArgumentException`: One or more of the arguments is invalid.
- `ObjectDisposedException`: Methods were called after the stream was closed.
- `NotSupportedException`: The current `Stream` implementation does not support the write operation.

This method is available to support legacy code; however, the newer async methods, such as `CryptoStream.ReadAsync`, `CryptoStream.WriteAsync`, `Stream.CopyToAsync`, and `CryptoStream.FlushAsync`, help you implement asynchronous I/O operations more easily.

Pass the `IAsyncResult` returned by the current method to `CryptoStream.EndWrite` to ensure that the write completes and frees resources appropriately. `CryptoStream.EndWrite` must be called once for every call to `CryptoStream.BeginWrite`. You can do this either by using the same code that called `BeginWrite` or in a callback passed to `BeginWrite`. If an error occurs during an asynchronous write, an exception will not be thrown until `EndWrite` is called with the `IAsyncResult` returned by this method.

If a stream is writable, writing at the end of the stream expands the stream.

The current position in the stream is updated when you issue the asynchronous read or write, not when the I/O operation completes. Multiple simultaneous asynchronous requests render the request completion order uncertain.

Use the `CanWrite` property to determine whether the current instance supports writing.

If a stream is closed or you pass an invalid argument, exceptions are thrown immediately from `BeginWrite`. Errors that occur during an asynchronous write request, such as a disk failure during the I/O request, occur on the thread pool thread and throw exceptions when calling `EndWrite`.

## CryptoStream.Clear() method

```csharp
public void Clear ();
```

Releases all resources used by the `CryptoStream`.

This method wraps a call to the type's `IDisposable.Dispose` implementation.

Calling `Dispose` allows the resources used by the `CryptoStream` to be reallocated for other purposes. For more information about `Dispose`, see Cleaning Up Unmanaged Resources.

## CryptoStream.CopyTo(Stream, Int32) method

```csharp
public override void CopyTo (System.IO.Stream destination, int bufferSize);
```

Reads the bytes from the underlying stream, applies the relevant cryptographic transforms, and writes the result to the destination stream.

Parameters:

- `destination`: The stream to which the contents of the current stream will be copied.
- `bufferSize`: The size, in bytes, of the buffer to use for reading from the underlying stream. This value must be greater than zero. The default size is 81920 bytes.

Exceptions:

- `ArgumentNullException`: `destination` is `null`.
- `ArgumentOutOfRangeException`: `bufferSize` is negative or zero.
- `NotSupportedException`: The current stream does not support reading.

-or-

`destination` does not support writing.
- `ObjectDisposedException`: Either the current stream or `destination` were closed before the `Stream.CopyTo` method was called.
- `IOException`: An I/O error occurred.
- `CryptographicException`: An error occurred during a cryptographic operation.

Copying begins at the current position in the current stream, and does not reset the position of the destination stream after the copy operation is complete.

## CryptoStream.CopyToAsync(Stream, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task CopyToAsync (System.IO.Stream destination, int bufferSize, System.Threading.CancellationToken <example-value>);
```

Asynchronously reads the bytes from the underlying stream, applies the relevant cryptographic transforms, and writes the result to the destination stream.

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
- `CryptographicException`: An error occurred during a cryptographic operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

Copying begins at the current position in the current stream, and does not reset the position of the destination stream after the copy operation is complete.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `CopyTo`.
