---
title: "NegotiateStream class (part 7 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/NegotiateStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NegotiateStream class (part 7 of 9)

## NegotiateStream.BeginAuthenticateAsServer(NetworkCredential, ExtendedProtectionPolicy, ProtectionLevel, TokenImpersonationLevel, AsyncCallback, Object) method

```csharp
public virtual IAsyncResult BeginAuthenticateAsServer (System.Net.NetworkCredential <example-value>, System.Security.Authentication.ExtendedProtection.ExtendedProtectionPolicy? policy, System.Net.Security.ProtectionLevel requiredProtectionLevel, System.Security.Principal.TokenImpersonationLevel requiredImpersonationLevel, AsyncCallback? asyncCallback, object? asyncState);
```

Called by servers to begin an asynchronous operation to authenticate the client, and optionally the server, in a client-server connection. The authentication process uses the specified server credentials, authentication options, and extended protection policy. This method does not block.

Parameters:

- `credential`: The `NetworkCredential` that is used to establish the identity of the client.
- `policy`: The `ExtendedProtectionPolicy` that is used for extended protection.
- `requiredProtectionLevel`: One of the `ProtectionLevel` values, indicating the security services for the stream.
- `requiredImpersonationLevel`: One of the `TokenImpersonationLevel` values, indicating how the server can use the client's credentials to access resources.
- `asyncCallback`: An `AsyncCallback` delegate that references the method to invoke when the authentication is complete.
- `asyncState`: A user-defined object containing information about the write operation. This object is passed to the `asyncCallback` delegate when the operation completes.

Returns: An `IAsyncResult` object indicating the status of the asynchronous operation.

Exceptions:

- `ArgumentException`: The `ExtendedProtectionPolicy.CustomChannelBinding` and `ExtendedProtectionPolicy.CustomServiceNames` on the extended protection policy passed in the `policy` parameter are both `null`.
- `ArgumentNullException`: `credential` is `null`.
- `ArgumentOutOfRangeException`: `requiredImpersonationLevel` must be `TokenImpersonationLevel.Identification`, `TokenImpersonationLevel.Impersonation`, or `TokenImpersonationLevel.Delegation`,
- `AuthenticationException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidCredentialException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidOperationException`: Authentication has already occurred.

-or-

This stream was used previously to attempt authentication as the client. You cannot use the stream to retry authentication as the server.
- `ObjectDisposedException`: This object has been closed.
- `PlatformNotSupportedException`: The `policy` parameter was set to `PolicyEnforcement.Always` on a platform that does not support extended protection.

#### Remarks
Use the `requiredProtectionLevel` parameter to request security services for data transmitted using the authenticated stream. For example, to have the data encrypted and signed, specify the `EncryptAndSign` value. Successful authentication does not guarantee that, the requested `ProtectionLevel` has been granted. You must check the `NegotiateStream.IsEncrypted` and `NegotiateStream.IsSigned` properties to determine what security services are used by the `NegotiateStream`.

If the `policy` parameter is `null`, then an extended protection policy is used that has `ExtendedProtectionPolicy.PolicyEnforcement` set to `Never`.

This method is asynchronous and does not block while the operation completes. To block until the operation completes, use one of the `NegotiateStream.AuthenticateAsServer` method overloads.

The asynchronous authentication operation must be completed by calling the `NegotiateStream.EndAuthenticateAsServer` method. Typically, the method is invoked by the `asyncCallback` delegate. For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously

If the authentication fails, you receive an `AuthenticationException` or an `InvalidCredentialException`. In this case, you can retry the authentication with a different credential.

## NegotiateStream.BeginRead(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginRead (byte[] buffer, int offset, int count, AsyncCallback? asyncCallback, object? asyncState);
```

Begins an asynchronous read operation that reads data from the stream and stores it in the specified array.

Parameters:

- `buffer`: A `Byte` array that receives the bytes read from the stream.
- `offset`: The zero-based location in `buffer` at which to begin storing the data read from this stream.
- `count`: The maximum number of bytes to read from the stream.
- `asyncCallback`: An `AsyncCallback` delegate that references the method to invoke when the read operation is complete.
- `asyncState`: A user-defined object containing information about the read operation. This object is passed to the `asyncCallback` delegate when the operation completes.

Returns: An `IAsyncResult` object indicating the status of the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentException`: `offset` is less than 0.

-or-

`offset` is greater than the length of `buffer`.

-or-

`offset` plus `count` is greater than the length of `buffer`.
- `IOException`: The read operation failed.

-or-

Encryption is in use, but the data could not be decrypted.
- `NotSupportedException`: There is already a read operation in progress.
- `ObjectDisposedException`: This object has been closed.
- `InvalidOperationException`: Authentication has not occurred.

#### Remarks
If encryption, signing, or encryption and signing are enabled, the read operation reads the data from the underlying stream, checks the integrity of the data, and decrypts it. If no security services such as data encryption or signing are in use, this method starts an asynchronous read operation on the underlying stream.

This method is asynchronous and does not block while the operation completes. To block until the operation completes, use the `NegotiateStream.Read` method.

The asynchronous read operation must be completed by calling the `NegotiateStream.EndRead` method. Typically, the method is invoked by the `asyncCallback` delegate. For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously

The `NegotiateStream` class does not support multiple simultaneous read operations. If you attempt to start a read operation while another read operation is already executing on the same stream, a `NotSupportedException` exception will be thrown.

You cannot call this method until you have successfully authenticated. To authenticate, call one of the `NegotiateStream.AuthenticateAsClient`, `NegotiateStream.AuthenticateAsClientAsync`, `NegotiateStream.BeginAuthenticateAsClient`, `NegotiateStream.AuthenticateAsServer`, `NegotiateStream.AuthenticateAsServerAsync`, or `NegotiateStream.BeginAuthenticateAsServer` methods.

#### Examples

The following code example demonstrates starting an asynchronous read operation. This code example is part of a larger example provided for the `NegotiateStream` class.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/Overview/server.cs._

## NegotiateStream.BeginWrite(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginWrite (byte[] buffer, int offset, int count, AsyncCallback? asyncCallback, object? asyncState);
```

Begins an asynchronous write operation that writes `Byte`s from the specified buffer to the stream.

Parameters:

- `buffer`: A `Byte` array that supplies the bytes to be written to the stream.
- `offset`: The zero-based location in `buffer` at which to begin reading bytes to be written to the stream.
- `count`: An `Int32` value that specifies the number of bytes to read from `buffer`.
- `asyncCallback`: An `AsyncCallback` delegate that references the method to invoke when the write operation is complete.
- `asyncState`: A user-defined object containing information about the write operation. This object is passed to the `asyncCallback` delegate when the operation completes.

Returns: An `IAsyncResult` object indicating the status of the asynchronous operation.

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
If encryption, signing, or encryption and signing are enabled, this method reads the data from buffer, encrypts, signs, or encrypts and signs it, and transmits it using the underlying stream. If no security services such as data encryption or signing are in use, this method starts an asynchronous write operation on the underlying stream.

This method is asynchronous and does not block while the operation completes. To block until the operation completes, use the `NegotiateStream.Read` method.

The asynchronous read operation must be completed by calling the `NegotiateStream.EndWrite` method. Typically, the method is invoked by the `asyncCallback` delegate. For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously

The `NegotiateStream` class does not support multiple simultaneous write operations. If you attempt to start a write operation while another write operation is already executing on the same stream, a `NotSupportedException` exception will be thrown.

You cannot call this method until you have successfully authenticated. To authenticate, call one of the `NegotiateStream.AuthenticateAsClient`, `NegotiateStream.AuthenticateAsClientAsync`, `NegotiateStream.BeginAuthenticateAsClient`, `NegotiateStream.AuthenticateAsServer`, `NegotiateStream.AuthenticateAsServerAsync`, or `NegotiateStream.BeginAuthenticateAsServer` methods.

#### Examples

The following example demonstrates beginning an asynchronous write operation.

_Code sample not included: ~/snippets/csharp/System.Net.Security/AuthenticatedStream/Overview/client.cs._

The following method is called when the operation completes.

_Code sample not included: ~/snippets/csharp/System.Net.Security/AuthenticatedStream/Overview/client.cs._

## NegotiateStream.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `NegotiateStream` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is true, this method releases all resources held by any managed objects that this `NegotiateStream` references. This method invokes the `Dispose()` method of each referenced object.

## NegotiateStream.DisposeAsync() method

```csharp
public override System.Threading.Tasks.ValueTask DisposeAsync ();
```

Asynchronously releases the unmanaged and managed resources used by the `NegotiateStream`.

Returns: A task that represents the asynchronous dispose operation.

#### Remarks
This method enables you to perform a resource-intensive dispose operation without blocking the main thread.

This method also disposes the inner stream when `LeaveInnerStreamOpen` is `false`; otherwise, the inner stream is just flushed.

Calling `DisposeAsync` allows the resources used by the `NegotiateStream` to be reallocated for other purposes. For more information, see Cleaning Up Unmanaged Resources.

## NegotiateStream.EndAuthenticateAsClient(IAsyncResult) method

```csharp
public virtual void EndAuthenticateAsClient (IAsyncResult asyncResult);
```

Ends a pending asynchronous client authentication operation that was started with a call to `BeginAuthenticateAsClient`.

Parameters:

- `asyncResult`: An `IAsyncResult` instance returned by a call to `BeginAuthenticateAsClient`.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not created by a call to `BeginAuthenticateAsClient`.
- `AuthenticationException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidCredentialException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidOperationException`: There is no pending client authentication to complete.

#### Remarks
If the operation has not completed, this method blocks until it does. When the authentication succeeds, you must check the `NegotiateStream.IsEncrypted` and `NegotiateStream.IsSigned` properties to determine what security services are used by the `NegotiateStream`. Check the `IsMutuallyAuthenticated` property to determine whether mutual authentication occurred.

If the authentication fails, you receive an `AuthenticationException` or an `InvalidCredentialException`. In this case, you can retry the authentication with a different credential.

To perform this operation synchronously, use one of the `NegotiateStream.AuthenticateAsClient` method.
