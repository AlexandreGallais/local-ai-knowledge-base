---
title: "NegotiateStream class (part 4 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/NegotiateStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NegotiateStream class (part 4 of 9)

## NegotiateStream.AuthenticateAsServer(NetworkCredential, ProtectionLevel, TokenImpersonationLevel) method

```csharp
public virtual void AuthenticateAsServer (System.Net.NetworkCredential <example-value>, System.Net.Security.ProtectionLevel requiredProtectionLevel, System.Security.Principal.TokenImpersonationLevel requiredImpersonationLevel);
```

Called by servers to authenticate the client, and optionally the server, in a client-server connection. The authentication process uses the specified server credentials and authentication options.

Parameters:

- `credential`: The `NetworkCredential` that is used to establish the identity of the server.
- `requiredProtectionLevel`: One of the `ProtectionLevel` values, indicating the security services for the stream.
- `requiredImpersonationLevel`: One of the `TokenImpersonationLevel` values, indicating how the server can use the client's credentials to access resources.

Exceptions:

- `ArgumentNullException`: `credential` is `null`.
- `ArgumentOutOfRangeException`: `requiredImpersonationLevel` must be `TokenImpersonationLevel.Identification`, `TokenImpersonationLevel.Impersonation`, or `TokenImpersonationLevel.Delegation`,
- `AuthenticationException`: The authentication failed. You can use this object to try to r-authenticate.
- `InvalidCredentialException`: The authentication failed. You can use this object to retry the authentication.
- `ObjectDisposedException`: This object has been closed.
- `InvalidOperationException`: Authentication has already occurred.

-or-

This stream was used previously to attempt authentication as the client. You cannot use the stream to retry authentication as the server.

#### Remarks
When authentication succeeds, you must check the `NegotiateStream.IsEncrypted` and `NegotiateStream.IsSigned` properties to determine what security services are used by the `NegotiateStream`. Check the `IsMutuallyAuthenticated` property to determine whether mutual authentication occurred.

This method blocks until the operation completes. To prevent blocking until the operation completes, use one of the `NegotiateStream.BeginAuthenticateAsServer` method overloads.

If the authentication fails, you receive an `AuthenticationException` or an `InvalidCredentialException`. In this case, you can retry the authentication with a different credential.

## NegotiateStream.AuthenticateAsServer(NetworkCredential, ExtendedProtectionPolicy, ProtectionLevel, TokenImpersonationLevel) method

```csharp
public virtual void AuthenticateAsServer (System.Net.NetworkCredential <example-value>, System.Security.Authentication.ExtendedProtection.ExtendedProtectionPolicy? policy, System.Net.Security.ProtectionLevel requiredProtectionLevel, System.Security.Principal.TokenImpersonationLevel requiredImpersonationLevel);
```

Called by servers to authenticate the client, and optionally the server, in a client-server connection. The authentication process uses the specified server credentials, authentication options, and extended protection policy.

Parameters:

- `credential`: The `NetworkCredential` that is used to establish the identity of the client.
- `policy`: The `ExtendedProtectionPolicy` that is used for extended protection.
- `requiredProtectionLevel`: One of the `ProtectionLevel` values, indicating the security services for the stream.
- `requiredImpersonationLevel`: One of the `TokenImpersonationLevel` values, indicating how the server can use the client's credentials to access resources.

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

This method blocks until the operation completes. To prevent blocking until the operation completes, use one of the `NegotiateStream.BeginAuthenticateAsServer` method overloads.

If the authentication fails, you receive an `AuthenticationException` or an `InvalidCredentialException`. In this case, you can retry the authentication with a different credential.

## NegotiateStream.AuthenticateAsServerAsync() method

```csharp
public virtual System.Threading.Tasks.Task AuthenticateAsServerAsync ();
```

Called by servers to authenticate the client, and optionally the server, in a client-server connection as an asynchronous operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `AuthenticationException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidCredentialException`: The authentication failed. You can use this object to retry the authentication.
- `ObjectDisposedException`: This object has been closed.

#### Remarks
The authentication uses the server's `CredentialCache.DefaultCredentials`. No Service Principal Name (SPN) is specified for the server. The impersonation level is `Identification`, and the security level is `EncryptAndSign`.

When authentication succeeds, you must check the `NegotiateStream.IsEncrypted` and `NegotiateStream.IsSigned` properties to determine what security services are used by the `NegotiateStream`. Check the `IsMutuallyAuthenticated` property to determine whether mutual authentication occurred.

If the authentication fails, you receive an `AuthenticationException` or an `InvalidCredentialException`. In this case, you can retry the authentication with a different credential.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `AuthenticateAsServer`.

## NegotiateStream.AuthenticateAsServerAsync(ExtendedProtectionPolicy) method

```csharp
public virtual System.Threading.Tasks.Task AuthenticateAsServerAsync (System.Security.Authentication.ExtendedProtection.ExtendedProtectionPolicy? policy);
```

Called by servers to authenticate the client, and optionally the server, in a client-server connection as an asynchronous operation. The authentication process uses the specified extended protection policy.

Parameters:

- `policy`: The `ExtendedProtectionPolicy` that is used for extended protection.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentException`: The `ExtendedProtectionPolicy.CustomChannelBinding` and `ExtendedProtectionPolicy.CustomServiceNames` on the extended protection policy passed in the `policy` parameter are both `null`.
- `AuthenticationException`: The authentication failed. You can use this object to retry the authentication.
- `InvalidCredentialException`: The authentication failed. You can use this object to retry the authentication.
- `ObjectDisposedException`: This object has been closed.
- `PlatformNotSupportedException`: The `policy` parameter was set to `PolicyEnforcement.Always` on a platform that does not support extended protection.

#### Remarks
The authentication uses the server's `CredentialCache.DefaultCredentials`. No Service Principal Name (SPN) is specified for the server. The impersonation level is `Identification`, and the security level is `EncryptAndSign`.

If the `policy` parameter is `null`, then an extended protection policy is used that has `ExtendedProtectionPolicy.PolicyEnforcement` set to `Never`.

When authentication succeeds, you must check the `NegotiateStream.IsEncrypted` and `NegotiateStream.IsSigned` properties to determine what security services are used by the `NegotiateStream`. Check the `IsMutuallyAuthenticated` property to determine whether mutual authentication occurred.

If the authentication fails, you receive an `AuthenticationException` or an `InvalidCredentialException`. In this case, you can retry the authentication with a different credential.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `AuthenticateAsServer`.

## NegotiateStream.AuthenticateAsServerAsync(NetworkCredential, ProtectionLevel, TokenImpersonationLevel) method

```csharp
public virtual System.Threading.Tasks.Task AuthenticateAsServerAsync (System.Net.NetworkCredential <example-value>, System.Net.Security.ProtectionLevel requiredProtectionLevel, System.Security.Principal.TokenImpersonationLevel requiredImpersonationLevel);
```

Called by servers to authenticate the client, and optionally the server, in a client-server connection as an asynchronous operation. The authentication process uses the specified server credentials and authentication options.

Parameters:

- `credential`: The `NetworkCredential` that is used to establish the identity of the server.
- `requiredProtectionLevel`: One of the `ProtectionLevel` values, indicating the security services for the stream.
- `requiredImpersonationLevel`: One of the `TokenImpersonationLevel` values, indicating how the server can use the client's credentials to access resources.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `credential` is `null`.
- `ArgumentOutOfRangeException`: `requiredImpersonationLevel` must be `TokenImpersonationLevel.Identification`, `TokenImpersonationLevel.Impersonation`, or `TokenImpersonationLevel.Delegation`,
- `AuthenticationException`: The authentication failed. You can use this object to try to r-authenticate.
- `InvalidCredentialException`: The authentication failed. You can use this object to retry the authentication.
- `ObjectDisposedException`: This object has been closed.
- `InvalidOperationException`: Authentication has already occurred.

-or-

This stream was used previously to attempt authentication as the client. You cannot use the stream to retry authentication as the server.

#### Remarks
When authentication succeeds, you must check the `NegotiateStream.IsEncrypted` and `NegotiateStream.IsSigned` properties to determine what security services are used by the `NegotiateStream`. Check the `IsMutuallyAuthenticated` property to determine whether mutual authentication occurred.

If the authentication fails, you receive an `AuthenticationException` or an `InvalidCredentialException`. In this case, you can retry the authentication with a different credential.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `AuthenticateAsServer`.
