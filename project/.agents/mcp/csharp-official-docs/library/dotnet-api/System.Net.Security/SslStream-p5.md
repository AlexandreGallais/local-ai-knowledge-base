---
title: "SslStream class (part 5 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/SslStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SslStream class (part 5 of 8)

## SslStream.AuthenticateAsServer(X509Certificate, Boolean, SslProtocols, Boolean) method

```csharp
public virtual void AuthenticateAsServer (System.Security.Cryptography.X509Certificates.X509Certificate serverCertificate, bool clientCertificateRequired, System.Security.Authentication.SslProtocols enabledSslProtocols, bool checkCertificateRevocation);
```

Called by servers to authenticate the server and optionally the client in a client-server connection using the specified certificates, requirements and security protocol.

Parameters:

- `serverCertificate`: The X509Certificate used to authenticate the server.
- `clientCertificateRequired`: A `Boolean` value that specifies whether the client is asked for a certificate for authentication. Note that this is only a request -- if no certificate is provided, the server still accepts the connection request.
- `enabledSslProtocols`: The `SslProtocols` value that represents protocols used for authentication.
- `checkCertificateRevocation`: A `Boolean` value that specifies whether the certificate revocation list is checked during authentication.

Exceptions:

- `ArgumentNullException`: `serverCertificate` is `null`.
- `ArgumentException`: `enabledSslProtocols` is not a valid `SslProtocols` value.
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

## SslStream.AuthenticateAsServerAsync(X509Certificate) method

```csharp
public virtual System.Threading.Tasks.Task AuthenticateAsServerAsync (System.Security.Cryptography.X509Certificates.X509Certificate serverCertificate);
```

Called by servers to authenticate the server and optionally the client in a client-server connection using the specified certificate as an asynchronous operation.

Parameters:

- `serverCertificate`: The certificate used to authenticate the server.

Returns: The task object representing the asynchronous operation.

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

This method authenticates using `Default`. The certificate revocation list is not checked during authentication. The client is not required to provide a certificate for authentication.

If the authentication fails, you receive a `AuthenticationException`, and this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `AuthenticateAsServer`.

## SslStream.AuthenticateAsServerAsync(SslServerAuthenticationOptions, CancellationToken) method

```csharp
public System.Threading.Tasks.Task AuthenticateAsServerAsync (System.Net.Security.SslServerAuthenticationOptions sslServerAuthenticationOptions, System.Threading.CancellationToken <example-value> = default);
```

Authenticates the server and optionally the client in a client-server connection as an asynchronous operation. The authentication process uses information specified in the `sslServerAuthenticationOptions` property bag.

Parameters:

- `sslServerAuthenticationOptions`: The property bag for the SSL connection.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: Either `SslServerAuthenticationOptions.ServerCertificateSelectionCallback` or `SslServerAuthenticationOptions.ServerCertificate` or `SslServerAuthenticationOptions.ServerCertificateContext` is `null` and `LocalCertificateSelectionCallback` is not set in the `SslStream` constructor.
- `ArgumentNullException`: `sslServerAuthenticationOptions` is `null`.
- `AuthenticationException`: The authentication failed and left this object in an unusable state.
- `InvalidOperationException`: Authentication has already occurred.

-or-

Client authentication using this `SslStream` was tried previously.

-or-

Authentication is already in progress.
- `ObjectDisposedException`: This object has been closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

If the authentication fails, you receive a `AuthenticationException`, and this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `AuthenticateAsServer`.

## SslStream.AuthenticateAsServerAsync(ServerOptionsSelectionCallback, Object, CancellationToken) method

```csharp
public System.Threading.Tasks.Task AuthenticateAsServerAsync (System.Net.Security.ServerOptionsSelectionCallback optionsCallback, object? state, System.Threading.CancellationToken <example-value> = default);
```

Called by servers to authenticate the server and optionally the client in a client-server connection as an asynchronous operation. The authentication process uses information returned by `optionsCallback`.

Parameters:

- `optionsCallback`: The callback delegate.
- `state`: The state object to pass to `optionsCallback` when the callback is invoked.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: Either `SslServerAuthenticationOptions.ServerCertificateSelectionCallback` or `SslServerAuthenticationOptions.ServerCertificate` or `SslServerAuthenticationOptions.ServerCertificateContext` is `null` and `LocalCertificateSelectionCallback` is not set in the `SslStream` constructor.
- `AuthenticationException`: The authentication failed and left this object in an unusable state.
- `InvalidOperationException`: Authentication has already occurred.

-or-

Client authentication using this `SslStream` was tried previously.

-or-

Authentication is already in progress.
- `ObjectDisposedException`: This object has been closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

If the authentication fails, you receive a `AuthenticationException`, and this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.

## SslStream.AuthenticateAsServerAsync(X509Certificate, Boolean, Boolean) method

```csharp
public virtual System.Threading.Tasks.Task AuthenticateAsServerAsync (System.Security.Cryptography.X509Certificates.X509Certificate serverCertificate, bool clientCertificateRequired, bool checkCertificateRevocation);
```

Called by servers to authenticate the server and optionally the client in a client-server connection using the specified certificates, requirements and security protocol as an asynchronous operation.

Parameters:

- `serverCertificate`: The X509Certificate used to authenticate the server.
- `clientCertificateRequired`: A `Boolean` value that specifies whether the client is asked for a certificate for authentication. Note that this is only a request -- if no certificate is provided, the server still accepts the connection request.
- `checkCertificateRevocation`: A `Boolean` value that specifies whether the certificate revocation list is checked during authentication.

Returns: The task object representing the asynchronous operation.

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

If the authentication fails, you receive a `AuthenticationException`, and this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `AuthenticateAsServer`.

## SslStream.AuthenticateAsServerAsync(X509Certificate, Boolean, SslProtocols, Boolean) method

```csharp
public virtual System.Threading.Tasks.Task AuthenticateAsServerAsync (System.Security.Cryptography.X509Certificates.X509Certificate serverCertificate, bool clientCertificateRequired, System.Security.Authentication.SslProtocols enabledSslProtocols, bool checkCertificateRevocation);
```

Called by servers to authenticate the server and optionally the client in a client-server connection using the specified certificates, requirements and security protocol as an asynchronous operation.

Parameters:

- `serverCertificate`: The X509Certificate used to authenticate the server.
- `clientCertificateRequired`: A `Boolean` value that specifies whether the client is asked for a certificate for authentication. Note that this is only a request -- if no certificate is provided, the server still accepts the connection request.
- `enabledSslProtocols`: The `SslProtocols` value that represents protocols used for authentication.
- `checkCertificateRevocation`: A `Boolean` value that specifies whether the certificate revocation list is checked during authentication.

Returns: The task object representing the asynchronous operation.

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

If the authentication fails, you receive a `AuthenticationException`, and this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `AuthenticateAsServer`.

## SslStream.BeginAuthenticateAsClient(String, AsyncCallback, Object) method

```csharp
public virtual IAsyncResult BeginAuthenticateAsClient (string targetHost, AsyncCallback? asyncCallback, object? asyncState);
```

Called by clients to begin an asynchronous operation to authenticate the server and optionally the client.

Parameters:

- `targetHost`: The name of the server that shares this `SslStream`.
- `asyncCallback`: An `AsyncCallback` delegate that references the method to invoke when the authentication is complete.
- `asyncState`: A user-defined object that contains information about the operation. This object is passed to the `asyncCallback` delegate when the operation completes.

Returns: An `IAsyncResult` object that indicates the status of the asynchronous operation.

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
 No client certificates are used in the authentication. The certificate revocation list is not checked during authentication.

The value specified for `targetHost` must match the name on the server's certificate.

The asynchronous authentication operation must be completed by calling the `SslStream.EndAuthenticateAsClient` method. Typically, the method is invoked by the `asyncCallback` delegate.

This method does not block while the operation completes. To block until the operation completes, use one of the `SslStream.AuthenticateAsClient` method overloads.

For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously

If you receive a `AuthenticationException`, this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.
