---
title: "SslStream class (part 4 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/SslStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SslStream class (part 4 of 8)

## SslStream.AuthenticateAsClientAsync(String) method

```csharp
public virtual System.Threading.Tasks.Task AuthenticateAsClientAsync (string targetHost);
```

Called by clients to authenticate the server and optionally the client in a client-server connection as an asynchronous operation.

Parameters:

- `targetHost`: The name of the server that shares this `SslStream`.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `targetHost` is `null`.
- `AuthenticationException`: The authentication failed and left this object in an unusable state.
- `InvalidOperationException`: Authentication has already occurred.

-or-

Server authentication using this `SslStream` was tried previously.

-or-

Authentication is already in progress.
- `ObjectDisposedException`: This object has been closed.

#### Remarks
 No client certificates are used in the authentication. The certificate revocation list is not checked during authentication. The value specified for `targetHost` must match the name on the server's certificate.

When authentication succeeds, you must check the `SslStream.IsEncrypted` and `SslStream.IsSigned` properties to determine what security services are used by the `SslStream`. Check the `IsMutuallyAuthenticated` property to determine whether mutual authentication occurred.

If the authentication fails, you receive a `AuthenticationException`, and this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `AuthenticateAsClient`.

## SslStream.AuthenticateAsClientAsync(SslClientAuthenticationOptions, CancellationToken) method

```csharp
public System.Threading.Tasks.Task AuthenticateAsClientAsync (System.Net.Security.SslClientAuthenticationOptions sslClientAuthenticationOptions, System.Threading.CancellationToken <example-value> = default);
```

Called by clients to authenticate the server and optionally the client in a client-server connection as an asynchronous operation. The authentication process uses information specified in the `sslClientAuthenticationOptions` property bag.

Parameters:

- `sslClientAuthenticationOptions`: The property bag for the SSL connection.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `sslClientAuthenticationOptions` is `null`.
- `AuthenticationException`: The authentication failed and left this object in an unusable state.
- `InvalidOperationException`: Authentication has already occurred.

-or-

Server authentication using this `SslStream` was tried previously.

-or-

Authentication is already in progress.
- `ObjectDisposedException`: This object has been closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

When authentication succeeds, you must check the `SslStream.IsEncrypted` and `SslStream.IsSigned` properties to determine what security services are used by the `SslStream`. Check the `IsMutuallyAuthenticated` property to determine whether mutual authentication occurred.

If the authentication fails, you receive a `AuthenticationException`, and this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `AuthenticateAsClient`.

## SslStream.AuthenticateAsClientAsync(String, X509CertificateCollection, Boolean) method

```csharp
public virtual System.Threading.Tasks.Task AuthenticateAsClientAsync (string targetHost, System.Security.Cryptography.X509Certificates.X509CertificateCollection? clientCertificates, bool checkCertificateRevocation);
```

Called by clients to authenticate the server and optionally the client in a client-server connection as an asynchronous operation. The authentication process uses the specified certificate collection and the system default SSL protocol.

Parameters:

- `targetHost`: The name of the server that will share this `SslStream`.
- `clientCertificates`: The `X509CertificateCollection` that contains client certificates.
- `checkCertificateRevocation`: A `Boolean` value that specifies whether the certificate revocation list is checked during authentication.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `AuthenticationException`: The authentication failed and left this object in an unusable state.
- `InvalidOperationException`: Authentication has already occurred.

-or-

Server authentication using this `SslStream` was tried previously.

-or-

Authentication is already in progress.
- `ObjectDisposedException`: This object has been closed.

#### Remarks

When authentication succeeds, you must check the `SslStream.IsEncrypted` and `SslStream.IsSigned` properties to determine what security services are used by the `SslStream`. Check the `IsMutuallyAuthenticated` property to determine whether mutual authentication occurred.

If the authentication fails, you receive a `AuthenticationException`, and this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.

> **Note:**
>  Client certificates are not supported in the SSL version 2 protocol.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `AuthenticateAsClient`.

## SslStream.AuthenticateAsClientAsync(String, X509CertificateCollection, SslProtocols, Boolean) method

```csharp
public virtual System.Threading.Tasks.Task AuthenticateAsClientAsync (string targetHost, System.Security.Cryptography.X509Certificates.X509CertificateCollection? clientCertificates, System.Security.Authentication.SslProtocols enabledSslProtocols, bool checkCertificateRevocation);
```

Called by clients to authenticate the server and optionally the client in a client-server connection as an asynchronous operation. The authentication process uses the specified certificate collection and SSL protocol.

Parameters:

- `targetHost`: The name of the server that will share this `SslStream`.
- `clientCertificates`: The `X509CertificateCollection` that contains client certificates.
- `enabledSslProtocols`: The `SslProtocols` value that represents protocols used for authentication.
- `checkCertificateRevocation`: A `Boolean` value that specifies whether the certificate revocation list is checked during authentication.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `AuthenticationException`: The authentication failed and left this object in an unusable state.
- `InvalidOperationException`: Authentication has already occurred.

-or-

Server authentication using this `SslStream` was tried previously.

-or-

Authentication is already in progress.
- `ObjectDisposedException`: This object has been closed.

#### Remarks

When authentication succeeds, you must check the `SslStream.IsEncrypted` and `SslStream.IsSigned` properties to determine what security services are used by the `SslStream`. Check the `IsMutuallyAuthenticated` property to determine whether mutual authentication occurred.

If the authentication fails, you receive a `AuthenticationException`, and this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.

> **Note:**
>  Client certificates are not supported in the SSL version 2 protocol.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `AuthenticateAsClient`.

## SslStream.AuthenticateAsServer(SslServerAuthenticationOptions) method

```csharp
public void AuthenticateAsServer (System.Net.Security.SslServerAuthenticationOptions sslServerAuthenticationOptions);
```

Called by servers to authenticate the server and optionally the client in a client-server connection using the specified certificate.

Parameters:

- `sslServerAuthenticationOptions`: The property bag for the SSL connection.

Exceptions:

- `ArgumentNullException`: `sslServerAuthenticationOptions` is `null`.
- `AuthenticationException`: The authentication failed and left this object in an unusable state.
- `InvalidOperationException`: Authentication has already occurred.

-or-

Client authentication using this `SslStream` was tried previously.

-or-

Authentication is already in progress.
- `ObjectDisposedException`: This object has been closed.

#### Remarks
 The certificate revocation list is not checked during authentication. The client is not required to provide a certificate for authentication.

This method blocks until the operation completes. To prevent blocking until the operation completes, use one of the `SslStream.BeginAuthenticateAsServer` method overloads.

If the authentication fails, you receive a `AuthenticationException`, and this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.

## SslStream.AuthenticateAsServer(X509Certificate) method

```csharp
public virtual void AuthenticateAsServer (System.Security.Cryptography.X509Certificates.X509Certificate serverCertificate);
```

Called by servers to authenticate the server and optionally the client in a client-server connection using the specified certificate.

Parameters:

- `serverCertificate`: The certificate used to authenticate the server.

Exceptions:

- `ArgumentNullException`: `serverCertificate` is `null`.
- `AuthenticationException`: The authentication failed and left this object in an unusable state.
- `InvalidOperationException`: Authentication has already occurred.

-or-

Client authentication using this `SslStream` was tried previously.

-or-

Authentication is already in progress.
- `ObjectDisposedException`: This object has been closed.

#### Remarks
 The certificate revocation list is not checked during authentication. The client is not required to provide a certificate for authentication.

This method blocks until the operation completes. To prevent blocking until the operation completes, use one of the `SslStream.BeginAuthenticateAsServer` method overloads.

If the authentication fails, you receive a `AuthenticationException`, and this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.

## SslStream.AuthenticateAsServer(X509Certificate, Boolean, Boolean) method

```csharp
public virtual void AuthenticateAsServer (System.Security.Cryptography.X509Certificates.X509Certificate serverCertificate, bool clientCertificateRequired, bool checkCertificateRevocation);
```

Called by servers to authenticate the server and optionally the client in a client-server connection using the specified certificates and requirements, and using the system default security protocol.

Parameters:

- `serverCertificate`: The X509Certificate used to authenticate the server.
- `clientCertificateRequired`: A `Boolean` value that specifies whether the client is asked for a certificate for authentication. Note that this is only a request -- if no certificate is provided, the server still accepts the connection request.
- `checkCertificateRevocation`: A `Boolean` value that specifies whether the certificate revocation list is checked during authentication.

Exceptions:

- `ArgumentNullException`: `serverCertificate` is `null`.
- `AuthenticationException`: The authentication failed and left this object in an unusable state.
- `InvalidOperationException`: Authentication has already occurred.

-or-

Client authentication using this `SslStream` was tried previously.

-or-

Authentication is already in progress.
- `ObjectDisposedException`: This object has been closed.

#### Remarks

This method blocks until the operation completes. To prevent blocking until the operation completes, use one of the `SslStream.BeginAuthenticateAsServer` method overloads.

If the authentication fails, you receive a `AuthenticationException`, and this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.
