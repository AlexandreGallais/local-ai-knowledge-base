---
title: "SslStream class (part 7 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/SslStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SslStream class (part 7 of 8)

## SslStream.BeginRead(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginRead (byte[] buffer, int offset, int count, AsyncCallback? asyncCallback, object? asyncState);
```

Begins an asynchronous read operation that reads data from the stream and stores it in the specified array.

Parameters:

- `buffer`: A `Byte` array that receives the bytes read from the stream.
- `offset`: The zero-based location in `buffer` at which to begin storing the data read from this stream.
- `count`: The maximum number of bytes to read from the stream.
- `asyncCallback`: An `AsyncCallback` delegate that references the method to invoke when the read operation is complete.
- `asyncState`: A user-defined object that contains information about the read operation. This object is passed to the `asyncCallback` delegate when the operation completes.

Returns: An `IAsyncResult` object that indicates the status of the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentException`: `offset` is less than zero.

-or-

`offset` is greater than the length of `buffer`.

-or-

`offset` + count is greater than the length of `buffer`.
- `IOException`: The read operation failed.

-or-

Encryption is in use, but the data could not be decrypted.
- `NotSupportedException`: There is already a read operation in progress.
- `ObjectDisposedException`: This object has been closed.
- `InvalidOperationException`: Authentication has not occurred.

#### Remarks
If encryption and or signing are enabled, the read operation reads the data from the underlying stream, checks the integrity of the data, and/or decrypts it. The asynchronous read operation must be completed by calling the `SslStream.EndRead` method. Typically, the method is invoked by the `asyncCallback` delegate.

This method does not block while the operation completes. To block until the operation completes, use the `SslStream.Read` method.

For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously

The `SslStream` class does not support multiple simultaneous read operations.

You cannot call this method until you have successfully authenticated. To authenticate call one of the `SslStream.AuthenticateAsClient`, or `SslStream.BeginAuthenticateAsClient`, `SslStream.AuthenticateAsServer`, `SslStream.BeginAuthenticateAsServer` methods.

#### Examples
The following code example demonstrates starting an asynchronous read operation.

_Code sample not included: ~/snippets/csharp/System.Net.Security/LocalCertificateSelectionCallback/Overview/clientasync.cs._

_Code sample not included: ~/snippets/csharp/System.Net.Security/LocalCertificateSelectionCallback/Overview/clientasync.cs._

The following method is called when the read completes.

_Code sample not included: ~/snippets/csharp/System.Net.Security/LocalCertificateSelectionCallback/Overview/clientasync.cs._

## SslStream.BeginWrite(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginWrite (byte[] buffer, int offset, int count, AsyncCallback? asyncCallback, object? asyncState);
```

Begins an asynchronous write operation that writes `Byte`s from the specified buffer to the stream.

Parameters:

- `buffer`: A `Byte` array that supplies the bytes to be written to the stream.
- `offset`: The zero-based location in `buffer` at which to begin reading bytes to be written to the stream.
- `count`: An `Int32` value that specifies the number of bytes to read from `buffer`.
- `asyncCallback`: An `AsyncCallback` delegate that references the method to invoke when the write operation is complete.
- `asyncState`: A user-defined object that contains information about the write operation. This object is passed to the `asyncCallback` delegate when the operation completes.

Returns: An `IAsyncResult` object indicating the status of the asynchronous operation.

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

#### Examples
The following code example demonstrates calling this method.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/BeginWrite/serverasync.cs._
## SslStream.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `SslStream` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is true, this method releases all resources held by any managed objects that this `SslStream` references. This method invokes the `Dispose()` method of each referenced object.

## SslStream.DisposeAsync() method

```csharp
public override System.Threading.Tasks.ValueTask DisposeAsync ();
```

Asynchronously releases the unmanaged and managed resources used by the `SslStream`.

Returns: A task that represents the asynchronous dispose operation.

#### Remarks
This method enables you to perform a resource-intensive dispose operation without blocking the main thread.

This method also disposes the inner stream when `LeaveInnerStreamOpen` is `false`; otherwise, the inner stream is just flushed.

Calling `DisposeAsync` allows the resources used by the `SslStream` to be reallocated for other purposes. For more information, see Cleaning Up Unmanaged Resources.

## SslStream.EndAuthenticateAsClient(IAsyncResult) method

```csharp
public virtual void EndAuthenticateAsClient (IAsyncResult asyncResult);
```

Ends a pending asynchronous server authentication operation started with a previous call to `BeginAuthenticateAsClient`.

Parameters:

- `asyncResult`: An `IAsyncResult` instance returned by a call to `BeginAuthenticateAsClient`.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not created by a call to `BeginAuthenticateAsClient`.
- `AuthenticationException`: The authentication failed and left this object in an unusable state.
- `InvalidOperationException`: There is no pending server authentication to complete.

#### Remarks
If the operation has not completed, this method blocks until it does. When the authentication succeeds, you must check the `SslStream.IsEncrypted` and `SslStream.IsSigned` properties to determine what security services are used by the `SslStream`. Check the `IsMutuallyAuthenticated` property to determine whether mutual authentication occurred.

If the authentication fails, you receive a `AuthenticationException`, and this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.

To perform this operation synchronously, use one of the `SslStream.AuthenticateAsClient` methods.

## SslStream.EndAuthenticateAsServer(IAsyncResult) method

```csharp
public virtual void EndAuthenticateAsServer (IAsyncResult asyncResult);
```

Ends a pending asynchronous client authentication operation started with a previous call to `BeginAuthenticateAsClient`.

Parameters:

- `asyncResult`: An `IAsyncResult` instance returned by a call to `BeginAuthenticateAsClient`.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not created by a call to `BeginAuthenticateAsClient`.
- `AuthenticationException`: The authentication failed and left this object in an unusable state.
- `InvalidOperationException`: There is no pending client authentication to complete.

#### Remarks
If the operation has not completed, this method blocks until it does. When the authentication succeeds, you must check the `SslStream.IsEncrypted` and `SslStream.IsSigned` properties to determine what security services are used by the `SslStream`. Check the `IsMutuallyAuthenticated` property to determine whether mutual authentication occurred.

If the authentication fails, you receive a `AuthenticationException`, and this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.

To perform this operation synchronously, use one of the `SslStream.AuthenticateAsClient` method.

## SslStream.EndRead(IAsyncResult) method

```csharp
public override int EndRead (IAsyncResult asyncResult);
```

Ends an asynchronous read operation started with a previous call to `SslStream.BeginRead`.

Parameters:

- `asyncResult`: An `IAsyncResult` instance returned by a call to `SslStream.BeginRead`.

Returns: A `Int32` value that specifies the number of bytes read from the underlying stream.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not created by a call to `SslStream.BeginRead`.
- `InvalidOperationException`: There is no pending read operation to complete.

-or-

Authentication has not occurred.
- `IOException`: The read operation failed.

#### Remarks
If the operation has not completed, this method blocks until it does.

To perform this operation synchronously, use the `SslStream.Read` method.

You cannot call this method until you have successfully authenticated. To authenticate call one of the `SslStream.AuthenticateAsClient`, or `SslStream.BeginAuthenticateAsClient`, `SslStream.AuthenticateAsServer`, `SslStream.BeginAuthenticateAsServer` methods.

#### Examples
The following code example demonstrates ending an asynchronous read operation.

_Code sample not included: ~/snippets/csharp/System.Net.Security/LocalCertificateSelectionCallback/Overview/clientasync.cs._

## SslStream.EndWrite(IAsyncResult) method

```csharp
public override void EndWrite (IAsyncResult asyncResult);
```

Ends an asynchronous write operation started with a previous call to `SslStream.BeginWrite`.

Parameters:

- `asyncResult`: An `IAsyncResult` instance returned by a call to `SslStream.BeginWrite`.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not created by a call to `SslStream.BeginWrite`.
- `InvalidOperationException`: There is no pending write operation to complete.

-or-

Authentication has not occurred.
- `IOException`: The write operation failed.

#### Remarks
If the operation has not completed, this method blocks until it does.

An application cannot call this method until you have successfully authenticated. To authenticate, call one of the `SslStream.AuthenticateAsClient`, or `SslStream.BeginAuthenticateAsClient`, `SslStream.AuthenticateAsServer`, `SslStream.BeginAuthenticateAsServer` methods.

To perform this operation synchronously, use the `SslStream.Write` method.

#### Examples
The following code example demonstrates ending an asynchronous write operation.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/BeginWrite/serverasync.cs._
## SslStream.Finalize() method

```csharp
~SslStream ();
```

Releases all resources used by the `SslStream`.

#### Remarks
This method overrides `Object.Finalize`. Application code should not call this method; an object's `Object.Finalize` method is automatically invoked during garbage collection, unless finalization by the garbage collector has been disabled by a call to the `GC.SuppressFinalize` method.

For more information about using the Finalize method, see Cleaning Up Unmanaged Resources.

## SslStream.Flush() method

```csharp
public override void Flush ();
```

Causes any buffered data to be written to the underlying device.

#### Remarks
This method invokes `Stream.Flush` on the underlying stream.

#### Examples
The following code example demonstrates calling this method.

_Code sample not included: ~/snippets/csharp/System.Net.Security/RemoteCertificateValidationCallback/Overview/clientsync.cs._

## SslStream.FlushAsync(CancellationToken) method

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

## SslStream.NegotiateClientCertificateAsync(CancellationToken) method

```csharp
public virtual System.Threading.Tasks.Task NegotiateClientCertificateAsync (System.Threading.CancellationToken <example-value> = default);
```

Negotiates the client certificate on the authenticated connection.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

You can negotiate the client certificate once authentication is successfully processed via one of the `AuthenticateAs...` methods.

## SslStream.Read(Byte>) method

```csharp
public override int Read (Span<byte> buffer);
```

To be added.

Parameters:

- `buffer`: To be added.

Returns: To be added.

To be added.
