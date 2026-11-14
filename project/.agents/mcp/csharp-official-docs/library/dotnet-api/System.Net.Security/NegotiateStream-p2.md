---
title: "NegotiateStream class (part 2 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/NegotiateStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NegotiateStream class (part 2 of 9)

## NegotiateStream.RemoteIdentity property

```csharp
public virtual System.Security.Principal.IIdentity RemoteIdentity { get; }
```

Gets information about the identity of the remote party sharing this authenticated stream.

Returns: An `IIdentity` object that describes the identity of the remote endpoint.

Exceptions:

- `InvalidOperationException`: Authentication failed or has not occurred.

#### Remarks
When accessed by the client, this property returns a `GenericIdentity` containing the Service Principal Name (SPN) of the server and the authentication protocol used. When accessed by the server, this property returns a `WindowsIdentity` that describes the client. If the `WindowsIdentity` is not available, client information is returned to the server in a `GenericIdentity`.

#### Examples

The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/Overview/server.cs._

## NegotiateStream.WriteTimeout property

```csharp
public override int WriteTimeout { get; set; }
```

Gets or sets the amount of time a write operation blocks waiting for data.

Returns: A `Int32` that specifies the amount of time that will elapse before a write operation fails.

#### Remarks
This property returns the value returned by invoking the `WriteTimeout` property on the underlying stream. For set operations, the specified value sets the `Stream.WriteTimeout` value on the underlying stream.

If the underlying stream is a `NetworkStream`, `NegotiateStream.WriteTimeout` is in milliseconds and is set to `Infinite` by default so that write operations do not time out.

#### Examples

The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/.ctor/client.cs._

## NegotiateStream.AuthenticateAsClient() method

```csharp
public virtual void AuthenticateAsClient ();
```

Called by clients to authenticate the client, and optionally the server, in a client-server connection.

Exceptions:

- `AuthenticationException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidCredentialException`: The authentication failed. You can use this object to retry the authentication.
- `ObjectDisposedException`: This object has been closed.
- `InvalidOperationException`: Authentication has already occurred.

-or-

This stream was used previously to attempt authentication as the server. You cannot use the stream to retry authentication as the client.

#### Remarks
The authentication uses the client's `CredentialCache.DefaultCredentials`. No Service Principal Name (SPN) is specified for the server. The impersonation level is `Identification`, the security level is `EncryptAndSign`, and mutual authentication is requested. The `NegotiateStream` class will construct the SPN used for mutual authentication.

When authentication succeeds, you must check the `NegotiateStream.IsEncrypted` and `NegotiateStream.IsSigned` properties to determine what security services are used by the `NegotiateStream`. Check the `IsMutuallyAuthenticated` property to determine whether mutual authentication occurred.

If the authentication fails, you receive an `AuthenticationException` or an `InvalidCredentialException`. In this case, you can retry the authentication with a different credential.

## NegotiateStream.AuthenticateAsClient(NetworkCredential, String) method

```csharp
public virtual void AuthenticateAsClient (System.Net.NetworkCredential <example-value>, string targetName);
```

Called by clients to authenticate the client, and optionally the server, in a client-server connection. The authentication process uses the specified client credential.

Parameters:

- `credential`: The `NetworkCredential` that is used to establish the identity of the client.
- `targetName`: The Service Principal Name (SPN) that uniquely identifies the server to authenticate.

Exceptions:

- `AuthenticationException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidCredentialException`: The authentication failed. You can use this object to retry the authentication.
- `ObjectDisposedException`: This object has been closed.
- `InvalidOperationException`: Authentication has already occurred.

-or-

This stream was used previously to attempt authentication as the server. You cannot use the stream to retry authentication as the client.
- `ArgumentNullException`: `targetName` is `null`.

#### Remarks
The impersonation level is `Identification`, the security level is `EncryptAndSign`, and mutual authentication is requested. The `NegotiateStream` class will construct the SPN used for mutual authentication.

When authentication succeeds, you must check the `NegotiateStream.IsEncrypted` and `NegotiateStream.IsSigned` properties to determine what security services are used by the `NegotiateStream`. Check the `IsMutuallyAuthenticated` property to determine whether mutual authentication occurred.

## NegotiateStream.AuthenticateAsClient(NetworkCredential, ChannelBinding, String) method

```csharp
public virtual void AuthenticateAsClient (System.Net.NetworkCredential <example-value>, System.Security.Authentication.ExtendedProtection.ChannelBinding? binding, string targetName);
```

Called by clients to authenticate the client, and optionally the server, in a client-server connection. The authentication process uses the specified client credential and the channel binding.

Parameters:

- `credential`: The `NetworkCredential` that is used to establish the identity of the client.
- `binding`: The `ChannelBinding` that is used for extended protection.
- `targetName`: The Service Principal Name (SPN) that uniquely identifies the server to authenticate.

Exceptions:

- `ArgumentNullException`: `targetName` is `null`.

-or-

`credential` is `null`.
- `AuthenticationException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidCredentialException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidOperationException`: Authentication has already occurred.

-or-

This stream was used previously to attempt authentication as the server. You cannot use the stream to retry authentication as the client.
- `ObjectDisposedException`: This object has been closed.

#### Remarks
The impersonation level is `Identification`, the security level is `EncryptAndSign`, and mutual authentication is requested. The `NegotiateStream` class will construct the SPN used for mutual authentication.

The `ChannelBinding` used for extended protection that is passed to this method in the `binding` parameter would be retrieved by an application from `TransportContext` property on the associated `SslStream`.

When authentication succeeds, you must check the `NegotiateStream.IsEncrypted` and `NegotiateStream.IsSigned` properties to determine what security services are used by the `NegotiateStream`. Check the `IsMutuallyAuthenticated` property to determine whether mutual authentication occurred.

## NegotiateStream.AuthenticateAsClient(NetworkCredential, String, ProtectionLevel, TokenImpersonationLevel) method

```csharp
public virtual void AuthenticateAsClient (System.Net.NetworkCredential <example-value>, string targetName, System.Net.Security.ProtectionLevel requiredProtectionLevel, System.Security.Principal.TokenImpersonationLevel allowedImpersonationLevel);
```

Called by clients to authenticate the client, and optionally the server, in a client-server connection. The authentication process uses the specified credentials and authentication options.

Parameters:

- `credential`: The `NetworkCredential` that is used to establish the identity of the client.
- `targetName`: The Service Principal Name (SPN) that uniquely identifies the server to authenticate.
- `requiredProtectionLevel`: One of the `ProtectionLevel` values, indicating the security services for the stream.
- `allowedImpersonationLevel`: One of the `TokenImpersonationLevel` values, indicating how the server can use the client's credentials to access resources.

Exceptions:

- `ArgumentOutOfRangeException`: `allowedImpersonationLevel` is not a valid value.
- `ArgumentNullException`: `targetName` is null.
- `AuthenticationException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidCredentialException`: The authentication failed. You can use this object to retry the authentication.
- `ObjectDisposedException`: This object has been closed.
- `InvalidOperationException`: Authentication has already occurred.

-or-

This stream was used previously to attempt authentication as the server. You cannot use the stream to retry authentication as the client.

#### Remarks
Use the `requiredProtectionLevel` parameter to request security services for data transmitted using the authenticated stream. For example, to have the data encrypted and signed, specify the `EncryptAndSign` value. Successful authentication does not guarantee that the requested `ProtectionLevel` has been granted. You must check the `NegotiateStream.IsEncrypted` and `NegotiateStream.IsSigned` properties to determine what security services are used by the `NegotiateStream`.

If the authentication fails, you receive an `AuthenticationException` or an `InvalidCredentialException`. In this case, you can retry the authentication with a different credential.

## NegotiateStream.AuthenticateAsClient(NetworkCredential, ChannelBinding, String, ProtectionLevel, TokenImpersonationLevel) method

```csharp
public virtual void AuthenticateAsClient (System.Net.NetworkCredential <example-value>, System.Security.Authentication.ExtendedProtection.ChannelBinding? binding, string targetName, System.Net.Security.ProtectionLevel requiredProtectionLevel, System.Security.Principal.TokenImpersonationLevel allowedImpersonationLevel);
```

Called by clients to authenticate the client, and optionally the server, in a client-server connection. The authentication process uses the specified credential, authentication options, and channel binding.

Parameters:

- `credential`: The `NetworkCredential` that is used to establish the identity of the client.
- `binding`: The `ChannelBinding` that is used for extended protection.
- `targetName`: The Service Principal Name (SPN) that uniquely identifies the server to authenticate.
- `requiredProtectionLevel`: One of the `ProtectionLevel` values, indicating the security services for the stream.
- `allowedImpersonationLevel`: One of the `TokenImpersonationLevel` values, indicating how the server can use the client's credentials to access resources.

Exceptions:

- `ArgumentNullException`: `targetName` is `null`.

-or-

`credential` is `null`.
- `ArgumentOutOfRangeException`: `allowedImpersonationLevel` is not a valid value.
- `AuthenticationException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidCredentialException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidOperationException`: Authentication has already occurred.

-or-

This stream was used previously to attempt authentication as the server. You cannot use the stream to retry authentication as the client.
- `ObjectDisposedException`: This object has been closed.

#### Remarks
Use the `requiredProtectionLevel` parameter to request security services for data transmitted using the authenticated stream. For example, to have the data encrypted and signed, specify the `EncryptAndSign` value. Successful authentication does not guarantee that the requested `ProtectionLevel` has been granted. You must check the `NegotiateStream.IsEncrypted` and `NegotiateStream.IsSigned` properties to determine what security services are used by the `NegotiateStream`.

The `ChannelBinding` used for extended protection that is passed to this method in the `binding` parameter would be retrieved by an application from `TransportContext` property on the associated `SslStream`.

If the authentication fails, you receive an `AuthenticationException` or an `InvalidCredentialException`. In this case, you can retry the authentication with a different credential.

## NegotiateStream.AuthenticateAsClientAsync() method

```csharp
public virtual System.Threading.Tasks.Task AuthenticateAsClientAsync ();
```

Called by clients to authenticate the client, and optionally the server, in a client-server connection as an asynchronous operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `AuthenticationException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidCredentialException`: The authentication failed. You can use this object to retry the authentication.
- `ObjectDisposedException`: This object has been closed.
- `InvalidOperationException`: Authentication has already occurred.

-or-

This stream was used previously to attempt authentication as the server. You cannot use the stream to retry authentication as the client.

#### Remarks
The authentication uses the client's `CredentialCache.DefaultCredentials`. No Service Principal Name (SPN) is specified for the server. The impersonation level is `Identification`, the security level is `EncryptAndSign`, and mutual authentication is requested. The `NegotiateStream` class will construct the SPN used for mutual authentication.

When authentication succeeds, you must check the `NegotiateStream.IsEncrypted` and `NegotiateStream.IsSigned` properties to determine what security services are used by the `NegotiateStream`. Check the `IsMutuallyAuthenticated` property to determine whether mutual authentication occurred.

If the authentication fails, you receive an `AuthenticationException` or an `InvalidCredentialException`. In this case, you can retry the authentication with a different credential.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `AuthenticateAsClient`.
