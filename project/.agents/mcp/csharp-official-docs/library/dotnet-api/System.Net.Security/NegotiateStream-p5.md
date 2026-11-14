---
title: "NegotiateStream class (part 5 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/NegotiateStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NegotiateStream class (part 5 of 9)

## NegotiateStream.AuthenticateAsServerAsync(NetworkCredential, ExtendedProtectionPolicy, ProtectionLevel, TokenImpersonationLevel) method

```csharp
public virtual System.Threading.Tasks.Task AuthenticateAsServerAsync (System.Net.NetworkCredential <example-value>, System.Security.Authentication.ExtendedProtection.ExtendedProtectionPolicy? policy, System.Net.Security.ProtectionLevel requiredProtectionLevel, System.Security.Principal.TokenImpersonationLevel requiredImpersonationLevel);
```

Called by servers to authenticate the client, and optionally the server, in a client-server connection as an asynchronous operation. The authentication process uses the specified server credentials, authentication options, and extended protection policy.

Parameters:

- `credential`: The `NetworkCredential` that is used to establish the identity of the client.
- `policy`: The `ExtendedProtectionPolicy` that is used for extended protection.
- `requiredProtectionLevel`: One of the `ProtectionLevel` values, indicating the security services for the stream.
- `requiredImpersonationLevel`: One of the `TokenImpersonationLevel` values, indicating how the server can use the client's credentials to access resources.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentException`: The `ExtendedProtectionPolicy.CustomChannelBinding` and `ExtendedProtectionPolicy.CustomServiceNames` on the extended protection policy passed in the `policy` parameter are both `null`.
- `ArgumentNullException`: `credential` is `null`.
- `ArgumentOutOfRangeException`: `requiredImpersonationLevel` must be `TokenImpersonationLevel.Identification`, `TokenImpersonationLevel.Impersonation`, or `TokenImpersonationLevel.Delegation`,
- `AuthenticationException`: The authentication failed. You can use this object to try to r-authenticate.
- `InvalidCredentialException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidOperationException`: Authentication has already occurred.

-or-

This stream was used previously to attempt authentication as the client. You cannot use the stream to retry authentication as the server.
- `ObjectDisposedException`: This object has been closed.
- `PlatformNotSupportedException`: The `policy` parameter was set to `PolicyEnforcement.Always` on a platform that does not support extended protection.

#### Remarks
If the `policy` parameter is `null`, then an extended protection policy is used that has `ExtendedProtectionPolicy.PolicyEnforcement` set to `Never`.

When authentication succeeds, you must check the `NegotiateStream.IsEncrypted` and `NegotiateStream.IsSigned` properties to determine what security services are used by the `NegotiateStream`. Check the `IsMutuallyAuthenticated` property to determine whether mutual authentication occurred.

If the authentication fails, you receive an `AuthenticationException` or an `InvalidCredentialException`. In this case, you can retry the authentication with a different credential.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `AuthenticateAsServer`.

## NegotiateStream.BeginAuthenticateAsClient(AsyncCallback, Object) method

```csharp
public virtual IAsyncResult BeginAuthenticateAsClient (AsyncCallback? asyncCallback, object? asyncState);
```

Called by clients to begin an asynchronous operation to authenticate the client, and optionally the server, in a client-server connection. This method does not block.

Parameters:

- `asyncCallback`: An `AsyncCallback` delegate that references the method to invoke when the authentication is complete.
- `asyncState`: A user-defined object containing information about the operation. This object is passed to the `asyncCallback` delegate when the operation completes.

Returns: An `IAsyncResult` object indicating the status of the asynchronous operation.

Exceptions:

- `AuthenticationException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidCredentialException`: The authentication failed. You can use this object to retry the authentication.
- `ObjectDisposedException`: This object has been closed.
- `InvalidOperationException`: Authentication has already occurred.

-or-

This stream was used previously to attempt authentication as the server. You cannot use the stream to retry authentication as the client.

#### Remarks
The authentication uses the client's `CredentialCache.DefaultCredentials`. No Service Principal Name (SPN) is specified for the server. The impersonation level is `Identification`, and the security level is `EncryptAndSign`. The `NegotiateStream` class will construct the SPN used for mutual authentication.

This method is asynchronous and does not block while the operation completes. To block until the operation completes, use one of the `NegotiateStream.AuthenticateAsClient` method overloads.

The asynchronous authentication operation must be completed by calling the `NegotiateStream.EndAuthenticateAsClient` method. Typically, the method is invoked by the `asyncCallback` delegate. For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously

If the authentication fails, you receive an `AuthenticationException` or an `InvalidCredentialException`. In this case, you can retry the authentication with a different credential.

#### Examples

The following example demonstrates calling this method to begin an asynchronous authentication for the client.

_Code sample not included: ~/snippets/csharp/System.Net.Security/AuthenticatedStream/Overview/client.cs._

## NegotiateStream.BeginAuthenticateAsClient(NetworkCredential, String, AsyncCallback, Object) method

```csharp
public virtual IAsyncResult BeginAuthenticateAsClient (System.Net.NetworkCredential <example-value>, string targetName, AsyncCallback? asyncCallback, object? asyncState);
```

Called by clients to begin an asynchronous operation to authenticate the client, and optionally the server, in a client-server connection. The authentication process uses the specified credentials. This method does not block.

Parameters:

- `credential`: The `NetworkCredential` that is used to establish the identity of the client.
- `targetName`: The Service Principal Name (SPN) that uniquely identifies the server to authenticate.
- `asyncCallback`: An `AsyncCallback` delegate that references the method to invoke when the authentication is complete.
- `asyncState`: A user-defined object containing information about the write operation. This object is passed to the `asyncCallback` delegate when the operation completes.

Returns: An `IAsyncResult` object indicating the status of the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `credential` is `null`.

-or-

`targetName` is `null`.
- `AuthenticationException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidCredentialException`: The authentication failed. You can use this object to retry the authentication.
- `ObjectDisposedException`: This object has been closed.
- `InvalidOperationException`: Authentication has already occurred.

-or-

This stream was used previously to attempt authentication as the server. You cannot use the stream to retry authentication as the client.

#### Remarks
This method is asynchronous and does not block while the operation completes. To block until the operation completes, use one of the `NegotiateStream.AuthenticateAsClient` method overloads.

The asynchronous authentication operation must be completed by calling the `NegotiateStream.EndAuthenticateAsClient` method. Typically, the method is invoked by the `asyncCallback` delegate. For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously

If the authentication fails, you receive an `AuthenticationException` or an `InvalidCredentialException`. In this case, you can retry the authentication with a different credential.

## NegotiateStream.BeginAuthenticateAsClient(NetworkCredential, ChannelBinding, String, AsyncCallback, Object) method

```csharp
public virtual IAsyncResult BeginAuthenticateAsClient (System.Net.NetworkCredential <example-value>, System.Security.Authentication.ExtendedProtection.ChannelBinding? binding, string targetName, AsyncCallback? asyncCallback, object? asyncState);
```

Called by clients to begin an asynchronous operation to authenticate the client, and optionally the server, in a client-server connection. The authentication process uses the specified credentials and channel binding. This method does not block.

Parameters:

- `credential`: The `NetworkCredential` that is used to establish the identity of the client.
- `binding`: The `ChannelBinding` that is used for extended protection.
- `targetName`: The Service Principal Name (SPN) that uniquely identifies the server to authenticate.
- `asyncCallback`: An `AsyncCallback` delegate that references the method to invoke when the authentication is complete.
- `asyncState`: A user-defined object containing information about the write operation. This object is passed to the `asyncCallback` delegate when the operation completes.

Returns: An `IAsyncResult` object indicating the status of the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `credential` is `null`.

-or-

`targetName` is `null`.
- `AuthenticationException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidCredentialException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidOperationException`: Authentication has already occurred.

-or-

This stream was used previously to attempt authentication as the server. You cannot use the stream to retry authentication as the client.
- `ObjectDisposedException`: This object has been closed.

#### Remarks
This method is asynchronous and does not block while the operation completes. To block until the operation completes, use one of the `NegotiateStream.AuthenticateAsClient` method overloads.

The asynchronous authentication operation must be completed by calling the `NegotiateStream.EndAuthenticateAsClient` method. Typically, the method is invoked by the `asyncCallback` delegate. For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously

If the authentication fails, you receive an `AuthenticationException` or an `InvalidCredentialException`. In this case, you can retry the authentication with a different credential.

## NegotiateStream.BeginAuthenticateAsClient(NetworkCredential, String, ProtectionLevel, TokenImpersonationLevel, AsyncCallback, Object) method

```csharp
public virtual IAsyncResult BeginAuthenticateAsClient (System.Net.NetworkCredential <example-value>, string targetName, System.Net.Security.ProtectionLevel requiredProtectionLevel, System.Security.Principal.TokenImpersonationLevel allowedImpersonationLevel, AsyncCallback? asyncCallback, object? asyncState);
```

Called by clients to begin an asynchronous operation to authenticate the client, and optionally the server, in a client-server connection. The authentication process uses the specified credentials and authentication options. This method does not block.

Parameters:

- `credential`: The `NetworkCredential` that is used to establish the identity of the client.
- `targetName`: The Service Principal Name (SPN) that uniquely identifies the server to authenticate.
- `requiredProtectionLevel`: One of the `ProtectionLevel` values, indicating the security services for the stream.
- `allowedImpersonationLevel`: One of the `TokenImpersonationLevel` values, indicating how the server can use the client's credentials to access resources.
- `asyncCallback`: An `AsyncCallback` delegate that references the method to invoke when the authentication is complete.
- `asyncState`: A user-defined object containing information about the write operation. This object is passed to the `asyncCallback` delegate when the operation completes.

Returns: An `IAsyncResult` object indicating the status of the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `credential` is `null`.

-or-

`targetName` is `null`.
- `AuthenticationException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidCredentialException`: The authentication failed. You can use this object to retry the authentication.
- `ObjectDisposedException`: This object has been closed.
- `InvalidOperationException`: Authentication has already occurred.

-or-

This stream was used previously to attempt authentication as the server. You cannot use the stream to retry authentication as the client.

#### Remarks
Use the `requiredProtectionLevel` parameter to request security services for data transmitted using the authenticated stream. For example, to have the data encrypted and signed, specify the `EncryptAndSign` value. Successful authentication does not guarantee that the requested `ProtectionLevel` has been granted. You must check the `NegotiateStream.IsEncrypted` and `NegotiateStream.IsSigned` properties to determine what security services are used by the `NegotiateStream`.

This method is asynchronous and does not block while the operation completes. To block until the operation completes, use one of the `NegotiateStream.AuthenticateAsClient` method overloads.

The asynchronous authentication operation must be completed by calling the `NegotiateStream.EndAuthenticateAsClient` method. Typically, the method is invoked by the `asyncCallback` delegate. For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously

If the authentication fails, you receive an `AuthenticationException` or an `InvalidCredentialException`. In this case, you can retry the authentication with a different credential.
