---
title: "SslStream class (part 8 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/SslStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SslStream class (part 8 of 8)

## SslStream.Read(Byte[], Int32, Int32) method

```csharp
public override int Read (byte[] buffer, int offset, int count);
```

Reads data from this stream and stores it in the specified array.

Parameters:

- `buffer`: A `Byte` array that receives the bytes read from this stream.
- `offset`: A `Int32` that contains the zero-based location in `buffer` at which to begin storing the data read from this stream.
- `count`: A `Int32` that contains the maximum number of bytes to read from this stream.

Returns: A `Int32` value that specifies the number of bytes read. When there is no more data to be read, returns 0.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentException`: `offset` is less than zero.

-or-

`offset` is greater than the length of `buffer`.

-or-

`offset` + count is greater than the length of `buffer`.
- `IOException`: The read operation failed. Check the inner exception, if present to determine the cause of the failure.
- `NotSupportedException`: There is already a read operation in progress.
- `ObjectDisposedException`: This object has been closed.
- `InvalidOperationException`: Authentication has not occurred.

#### Remarks
The method reads a maximum of `count` bytes from the stream and stores them in `buffer` beginning at `offset`. You cannot perform multiple simultaneous read operations.

You cannot call this method until you have successfully authenticated. To authenticate call one of the `SslStream.AuthenticateAsClient`, or `SslStream.BeginAuthenticateAsClient`, `SslStream.AuthenticateAsServer`, `SslStream.BeginAuthenticateAsServer` methods.

To perform this operation asynchronously, use the `SslStream.BeginRead` method.

#### Examples
The following code example demonstrates reading from an `SslStream`.

_Code sample not included: ~/snippets/csharp/System.Net.Security/RemoteCertificateValidationCallback/Overview/clientsync.cs._

## SslStream.ReadAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<int> ReadAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads data from this stream and stores it in the specified memory range.

Parameters:

- `buffer`: The buffer that receives the bytes read from this stream.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous read operation. The value of its `ValueTask<T>.Result` property contains the total number of bytes read into `buffer`. When there is no more data to be read, returns 0.

Exceptions:

- `InvalidOperationException`: Authentication has not occurred.
- `IOException`: The read operation failed. Check the inner exception, if it is present, to determine the cause of the failure.
- `NotSupportedException`: There is already a read operation in progress.
- `ObjectDisposedException`: This object has been closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This method reads as much data as is available into the `buffer`.

You cannot perform multiple simultaneous read operations.

You cannot call this method until you have successfully authenticated.

## SslStream.ReadAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task<int> ReadAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Asynchronously reads data from this stream and stores it in the specified range of a byte array.

Parameters:

- `buffer`: The buffer that receives the bytes read from this stream.
- `offset`: The zero-based location in `buffer` at which to begin storing the data read from this stream.
- `count`: The maximum number of bytes to read from this stream.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous read operation. The value of its `Task<T>.Result` property contains the total number of bytes read into `buffer`. When there is no more data to be read, returns 0.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` is less than 0.

-or-

`count` is less than 0.

-or-

`count` is greater than the length of `buffer` minus `offset`.
- `InvalidOperationException`: Authentication has not occurred.
- `IOException`: The read operation failed. Check the inner exception, if it is present, to determine the cause of the failure.
- `NotSupportedException`: There is already a read operation in progress.
- `ObjectDisposedException`: This object has been closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
The method reads a maximum of `count` bytes from the stream and stores them in `buffer` beginning at `offset`.

You cannot perform multiple simultaneous read operations.

You cannot call this method until you have successfully authenticated.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Read`.

## SslStream.ReadByte() method

```csharp
public override int ReadByte ();
```

Reads a byte from the `SslStream` and advances the position within the stream by one byte, or returns -1 if at the end of the stream.

Returns: The unsigned byte cast to an `Int32`, or -1 if at the end of the stream.

Exceptions:

- `InvalidOperationException`: Authentication has not occurred.
- `IOException`: The read operation failed. Check the inner exception, if present to determine the cause of the failure.
- `NotSupportedException`: There is already a read operation in progress.
- `ObjectDisposedException`: This object has been closed.

#### Remarks
You cannot perform multiple simultaneous read operations.

You cannot call this method until you have successfully authenticated.

## SslStream.Seek(Int64, SeekOrigin) method

```csharp
public override long Seek (long offset, System.IO.SeekOrigin origin);
```

Throws a `NotSupportedException`.

Parameters:

- `offset`: This value is ignored.
- `origin`: This value is ignored.

Returns: Always throws a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: Seeking is not supported by `SslStream` objects.

#### Remarks
Do not call this method. It is inherited, but is not supported by the `SslStream` class.

## SslStream.SetLength(Int64) method

```csharp
public override void SetLength (long value);
```

Sets the length of the underlying stream.

Parameters:

- `value`: An `Int64` value that specifies the length of the stream.

#### Remarks
This method invokes `Stream.SetLength` on the underlying stream specified when this `SslStream` was created.

## SslStream.ShutdownAsync() method

```csharp
public virtual System.Threading.Tasks.Task ShutdownAsync ();
```

Shuts down this SslStream.

Returns: The task object representing the asynchronous operation.

To be added.

## SslStream.Write(Byte[]) method

```csharp
public void Write (byte[] buffer);
```

Writes the specified data to this stream.

Parameters:

- `buffer`: A `Byte` array that supplies the bytes written to the stream.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `IOException`: The write operation failed.
- `NotSupportedException`: There is already a write operation in progress.
- `ObjectDisposedException`: This object has been closed.
- `InvalidOperationException`: Authentication has not occurred.

#### Remarks
This method blocks while the operation completes. To prevent blocking while the operation completes, use the `SslStream.BeginWrite` method.

You cannot call this method until you have successfully authenticated. To authenticate call one of the `SslStream.AuthenticateAsClient`, or `SslStream.BeginAuthenticateAsClient`, `SslStream.AuthenticateAsServer`, `SslStream.BeginAuthenticateAsServer` methods.

The `SslStream` class does not support multiple simultaneous write operations.

#### Examples
The following code example demonstrates writing to an authenticated `SslStream`.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

## SslStream.Write(Byte>) method

```csharp
public override void Write (ReadOnlySpan<byte> buffer);
```

To be added.

Parameters:

- `buffer`: To be added.

To be added.

## SslStream.Write(Byte[], Int32, Int32) method

```csharp
public override void Write (byte[] buffer, int offset, int count);
```

Writes the specified number of `Byte`s to the underlying stream using the specified buffer and offset.

Parameters:

- `buffer`: A `Byte` array that supplies the bytes written to the stream.
- `offset`: A `Int32` that contains the zero-based location in `buffer` at which to begin reading bytes to be written to the stream.
- `count`: A `Int32` that contains the number of bytes to read from `buffer`.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentException`: `offset` is less than zero.

-or-

`offset` is greater than the length of `buffer`.

-or-

`offset` + count is greater than the length of `buffer`.
- `IOException`: The write operation failed.
- `NotSupportedException`: There is already a write operation in progress.
- `ObjectDisposedException`: This object has been closed.
- `InvalidOperationException`: Authentication has not occurred.

#### Remarks
This method blocks while the operation completes. To prevent blocking while the operation completes the operation completes, use the `SslStream.BeginWrite` method.

You cannot call this method until you have successfully authenticated. To authenticate call one of the `SslStream.AuthenticateAsClient`, or `SslStream.BeginAuthenticateAsClient`, `SslStream.AuthenticateAsServer`, `SslStream.BeginAuthenticateAsServer` methods.

The `SslStream` class does not support multiple simultaneous write operations.

## SslStream.WriteAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask WriteAsync (ReadOnlyMemory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously writes data to the underlying stream from a read-only byte memory range.

Parameters:

- `buffer`: The data to write to the underlying stream.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `InvalidOperationException`: Authentication has not occurred.
- `IOException`: The write operation failed.
- `NotSupportedException`: There is already a write operation in progress.
- `ObjectDisposedException`: This object has been closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
You cannot call this method until you have successfully authenticated.

The `SslStream` class does not support multiple simultaneous write operations.

## SslStream.WriteAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Asynchronously writes data to the underlying stream from the specified range of a byte array.

Parameters:

- `buffer`: The data to write to the underlying stream.
- `offset`: The location in `buffer` from which to start writing data.
- `count`: The number of bytes to write to the underlying stream.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` is less than 0.

-or-

`count` is less than 0.

-or-

`count` is greater than the length of `buffer` minus `offset`.
- `InvalidOperationException`: Authentication has not occurred.
- `IOException`: The write operation failed.
- `NotSupportedException`: There is already a write operation in progress.
- `ObjectDisposedException`: This object has been closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
You cannot call this method until you have successfully authenticated.

The `SslStream` class does not support multiple simultaneous write operations.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Write`.

## SslStream.WriteByte(Byte) method

```csharp
public override void WriteByte (byte value);
```

To be added.

Parameters:

- `value`: To be added.

To be added.
