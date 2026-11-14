---
title: "NegotiateStream class (part 8 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/NegotiateStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NegotiateStream class (part 8 of 9)

## NegotiateStream.EndAuthenticateAsServer(IAsyncResult) method

```csharp
public virtual void EndAuthenticateAsServer (IAsyncResult asyncResult);
```

Ends a pending asynchronous client authentication operation that was started with a call to `BeginAuthenticateAsServer`.

Parameters:

- `asyncResult`: An `IAsyncResult` instance returned by a call to `BeginAuthenticateAsServer`.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not created by a call to `BeginAuthenticateAsServer`.
- `AuthenticationException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidCredentialException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidOperationException`: There is no pending authentication to complete.

#### Remarks
If the operation has not completed, this method blocks until it does.

When authentication succeeds, you must check the `NegotiateStream.IsEncrypted` and `NegotiateStream.IsSigned` properties to determine what security services are used by the `NegotiateStream`. Check the `IsMutuallyAuthenticated` property to determine whether mutual authentication occurred.

If the authentication fails, you receive an `AuthenticationException` or an `InvalidCredentialException`. In this case, you can retry the authentication with a different credential.

To perform this operation synchronously, use the `NegotiateStream.AuthenticateAsServer` method.

## NegotiateStream.EndRead(IAsyncResult) method

```csharp
public override int EndRead (IAsyncResult asyncResult);
```

Ends an asynchronous read operation that was started with a call to `NegotiateStream.BeginRead`.

Parameters:

- `asyncResult`: An `IAsyncResult` instance returned by a call to `NegotiateStream.BeginRead`.

Returns: A `Int32` value that specifies the number of bytes read from the underlying stream.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: The asyncResult was not created by a call to `NegotiateStream.BeginRead`.
- `InvalidOperationException`: There is no pending read operation to complete.

-or-

Authentication has not occurred.
- `IOException`: The read operation failed.

#### Remarks
If the operation has not completed, this method blocks until it does.

To perform this operation synchronously, use the `NegotiateStream.Read` method.

You cannot call this method until you have successfully authenticated. To authenticate, call one of the `NegotiateStream.AuthenticateAsClient`, `NegotiateStream.AuthenticateAsClientAsync`, `NegotiateStream.BeginAuthenticateAsClient`, `NegotiateStream.AuthenticateAsServer`, `NegotiateStream.AuthenticateAsServerAsync`, or `NegotiateStream.BeginAuthenticateAsServer` methods.

#### Examples

The following code example demonstrates ending an asynchronous read operation. For an example that demonstrates starting the operation, see `NegotiateStream.BeginRead`.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/Overview/server.cs._

## NegotiateStream.EndWrite(IAsyncResult) method

```csharp
public override void EndWrite (IAsyncResult asyncResult);
```

Ends an asynchronous write operation that was started with a call to `NegotiateStream.BeginWrite`.

Parameters:

- `asyncResult`: An `IAsyncResult` instance returned by a call to `NegotiateStream.BeginWrite`.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: The asyncResult was not created by a call to `NegotiateStream.BeginWrite`.
- `InvalidOperationException`: There is no pending write operation to complete.

-or-

Authentication has not occurred.
- `IOException`: The write operation failed.

#### Remarks
If the operation has not completed, this method blocks until it does.

You cannot call this method until you have successfully authenticated. To authenticate, call one of the `NegotiateStream.AuthenticateAsClient`, `NegotiateStream.AuthenticateAsClientAsync`, `NegotiateStream.BeginAuthenticateAsClient`, `NegotiateStream.AuthenticateAsServer`, `NegotiateStream.AuthenticateAsServerAsync`, or `NegotiateStream.BeginAuthenticateAsServer` methods.

To perform this operation synchronously, use the `NegotiateStream.Write` method.

#### Examples

The following example demonstrates a method that is called to complete the asynchronous write operation. For an example that demonstrates starting the operation, see `NegotiateStream.BeginWrite`.

_Code sample not included: ~/snippets/csharp/System.Net.Security/AuthenticatedStream/Overview/client.cs._

## NegotiateStream.Flush() method

```csharp
public override void Flush ();
```

Causes any buffered data to be written to the underlying device.

#### Remarks
This method invokes `Stream.Flush` on the underlying stream.

#### Examples

The following code example demonstrates flushing the stream.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/.ctor/client.cs._

## NegotiateStream.FlushAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.Task FlushAsync (System.Threading.CancellationToken <example-value>);
```

Asynchronously writes any buffered data to the underlying device.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous flush operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This method invokes `Stream.FlushAsync` on the underlying stream.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Flush`.

## NegotiateStream.Read(Byte[], Int32, Int32) method

```csharp
public override int Read (byte[] buffer, int offset, int count);
```

Reads data from this stream and stores it in the specified array.

Parameters:

- `buffer`: A `Byte` array that receives the bytes read from the stream.
- `offset`: A `Int32` containing the zero-based location in `buffer` at which to begin storing the data read from this stream.
- `count`: A `Int32` containing the maximum number of bytes to read from the stream.

Returns: An `Int32` value that specifies the number of bytes read from the underlying stream. When there is no more data to be read, returns 0.

Exceptions:

- `IOException`: The read operation failed.
- `InvalidOperationException`: Authentication has not occurred.
- `NotSupportedException`: A `NegotiateStream.Read` operation is already in progress.

#### Remarks
The method reads a maximum of `count` bytes from the current stream and stores them in `buffer` beginning at `offset`.

You cannot call this method until you have successfully authenticated. To authenticate, call one of the `NegotiateStream.AuthenticateAsClient`, `NegotiateStream.AuthenticateAsClientAsync`, `NegotiateStream.BeginAuthenticateAsClient`, `NegotiateStream.AuthenticateAsServer`, `NegotiateStream.AuthenticateAsServerAsync`, or `NegotiateStream.BeginAuthenticateAsServer` methods.

To perform this operation asynchronously, use the `NegotiateStream.ReadAsync` method.

#### Examples

The following code example demonstrates reading from a `NegotiateStream`.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/Read/server.cs._

## NegotiateStream.ReadAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<int> ReadAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Reads data asynchronously from the `NegotiateStream` and stores it in a byte memory range as an asynchronous operation.

Parameters:

- `buffer`: The buffer to write the data to.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A `ValueTask<T>` that represents the asynchronous read operation. The value of its `ValueTask<T>.Result` property contains the total number of bytes read into `buffer`.

Exceptions:

- `IOException`: The read operation failed.
- `InvalidOperationException`: Authentication has not occurred.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This method reads asynchronously as much data as is available into `buffer` and returns the number of bytes successfully read.

You cannot call this method until you have successfully authenticated. To authenticate, call one of the `NegotiateStream.AuthenticateAsClient`, `NegotiateStream.AuthenticateAsClientAsync`, `NegotiateStream.BeginAuthenticateAsClient`, `NegotiateStream.AuthenticateAsServer`, `NegotiateStream.AuthenticateAsServerAsync`, or `NegotiateStream.BeginAuthenticateAsServer` methods.

## NegotiateStream.ReadAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task<int> ReadAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Reads data asynchronously from this stream and stores it in the specified array.

Parameters:

- `buffer`: A `Byte` array that receives the bytes read from the stream.
- `offset`: A `Int32` containing the zero-based location in `buffer` at which to begin storing the data read from this stream.
- `count`: A `Int32` containing the maximum number of bytes to read from the stream.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: An `Int32` value that specifies the number of bytes read from the underlying stream. When there is no more data to be read, returns 0.

Exceptions:

- `IOException`: The read operation failed.
- `InvalidOperationException`: Authentication has not occurred.
- `NotSupportedException`: A `NegotiateStream.Read` operation is already in progress.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
The method reads asynchronously a maximum of `count` bytes from the current stream and stores them in `buffer` beginning at `offset`.

You cannot call this method until you have successfully authenticated. To authenticate, call one of the `NegotiateStream.AuthenticateAsClient`, `NegotiateStream.AuthenticateAsClientAsync`, `NegotiateStream.BeginAuthenticateAsClient`, `NegotiateStream.AuthenticateAsServer`, `NegotiateStream.AuthenticateAsServerAsync`, or `NegotiateStream.BeginAuthenticateAsServer` methods.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Read`.

## NegotiateStream.Seek(Int64, SeekOrigin) method

```csharp
public override long Seek (long offset, System.IO.SeekOrigin origin);
```

Throws `NotSupportedException`.

Parameters:

- `offset`: This value is ignored.
- `origin`: This value is ignored.

Returns: Always throws a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: Seeking is not supported on `NegotiateStream`.

#### Remarks
Do not call this method. It is inherited, but is not supported by `NegotiateStream`.

## NegotiateStream.SetLength(Int64) method

```csharp
public override void SetLength (long value);
```

Sets the length of the underlying stream.

Parameters:

- `value`: An `Int64` value that specifies the length of the stream.

To be added.

## NegotiateStream.Write(Byte[], Int32, Int32) method

```csharp
public override void Write (byte[] buffer, int offset, int count);
```

Write the specified number of `Byte`s to the underlying stream using the specified buffer and offset.

Parameters:

- `buffer`: A `Byte` array that supplies the bytes written to the stream.
- `offset`: An `Int32` containing the zero-based location in `buffer` at which to begin reading bytes to be written to the stream.
- `count`: A `Int32` containing the number of bytes to read from `buffer`.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentException`: `offset` is less than 0.

-or-

`offset` is greater than the length of `buffer`.

-or-

`offset` plus count is greater than the length of `buffer`.
- `IOException`: The write operation failed.

-or-

Encryption is in use, but the data could not be encrypted.
- `NotSupportedException`: There is already a write operation in progress.
- `ObjectDisposedException`: This object has been closed.
- `InvalidOperationException`: Authentication has not occurred.

#### Remarks
If encryption, signing, or encryption and signing are enabled, this method reads the data from buffer, encrypts, signs, or encrypts and signs it, and transmits it using the underlying stream. If no security services such as data encryption or signing are in use, this method invokes `Stream.Write` on the underlying stream.

This method blocks while the write operation completes. To prevent blocking while the operation completes, use the `NegotiateStream.WriteAsync` method.

You cannot call this method until you have successfully authenticated. To authenticate, call one of the `NegotiateStream.AuthenticateAsClient`, `NegotiateStream.AuthenticateAsClientAsync`, `NegotiateStream.BeginAuthenticateAsClient`, `NegotiateStream.AuthenticateAsServer`, `NegotiateStream.AuthenticateAsServerAsync`, or `NegotiateStream.BeginAuthenticateAsServer` methods.

The `NegotiateStream` class does not support multiple simultaneous write operations. If you attempt to start a write operation while another write operation is already executing on the same stream, a `NotSupportedException` exception will be thrown.

#### Examples

The following code example demonstrates writing to a `NegotiateStream`.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/.ctor/client.cs._
