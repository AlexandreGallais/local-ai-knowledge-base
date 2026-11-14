---
title: "SslStream class (part 6 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/SslStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SslStream class (part 6 of 8)

## SslStream.BeginAuthenticateAsClient(String, X509CertificateCollection, Boolean, AsyncCallback, Object) method

```csharp
public virtual IAsyncResult BeginAuthenticateAsClient (string targetHost, System.Security.Cryptography.X509Certificates.X509CertificateCollection? clientCertificates, bool checkCertificateRevocation, AsyncCallback? asyncCallback, object? asyncState);
```

Called by clients to begin an asynchronous operation to authenticate the server and optionally the client using the specified certificates and the system default security protocol.

Parameters:

- `targetHost`: The name of the server that shares this `SslStream`.
- `clientCertificates`: The `X509CertificateCollection` containing client certificates.
- `checkCertificateRevocation`: A `Boolean` value that specifies whether the certificate revocation list is checked during authentication.
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

The value specified for `targetHost` must match the name on the server's certificate.

The asynchronous authentication operation must be completed by calling the `SslStream.EndAuthenticateAsClient` method. Typically, the method is invoked by the `asyncCallback` delegate.

This method does not block while the operation completes. To block until the operation completes, use one of the `SslStream.AuthenticateAsClient` method overloads.

For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously

If you receive a `AuthenticationException`, this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.

> **Note:**
>  Client certificates are not supported in the SSL version 2 protocol.

## SslStream.BeginAuthenticateAsClient(String, X509CertificateCollection, SslProtocols, Boolean, AsyncCallback, Object) method

```csharp
public virtual IAsyncResult BeginAuthenticateAsClient (string targetHost, System.Security.Cryptography.X509Certificates.X509CertificateCollection? clientCertificates, System.Security.Authentication.SslProtocols enabledSslProtocols, bool checkCertificateRevocation, AsyncCallback? asyncCallback, object? asyncState);
```

Called by clients to begin an asynchronous operation to authenticate the server and optionally the client using the specified certificates and security protocol.

Parameters:

- `targetHost`: The name of the server that shares this `SslStream`.
- `clientCertificates`: The `X509CertificateCollection` containing client certificates.
- `enabledSslProtocols`: The `SslProtocols` value that represents protocols used for authentication.
- `checkCertificateRevocation`: A `Boolean` value that specifies whether the certificate revocation list is checked during authentication.
- `asyncCallback`: An `AsyncCallback` delegate that references the method to invoke when the authentication is complete.
- `asyncState`: A user-defined object that contains information about the operation. This object is passed to the `asyncCallback` delegate when the operation completes.

Returns: An `IAsyncResult` object that indicates the status of the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `targetHost` is `null`.
- `ArgumentException`: `enabledSslProtocols` is not a valid `SslProtocols` value.
- `AuthenticationException`: The authentication failed and left this object in an unusable state.
- `InvalidOperationException`: Authentication has already occurred.

-or-

Server authentication using this `SslStream` was tried previously.

-or-

Authentication is already in progress.
- `ObjectDisposedException`: This object has been closed.

#### Remarks

The value specified for `targetHost` must match the name on the server's certificate.

The asynchronous authentication operation must be completed by calling the `SslStream.EndAuthenticateAsClient` method. Typically, the method is invoked by the `asyncCallback` delegate.

This method does not block while the operation completes. To block until the operation completes, use one of the `SslStream.AuthenticateAsClient` method overloads.

For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously

If you receive a `AuthenticationException`, this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.

> **Note:**
>  Client certificates are not supported in the SSL version 2 protocol.

## SslStream.BeginAuthenticateAsServer(X509Certificate, AsyncCallback, Object) method

```csharp
public virtual IAsyncResult BeginAuthenticateAsServer (System.Security.Cryptography.X509Certificates.X509Certificate serverCertificate, AsyncCallback? asyncCallback, object? asyncState);
```

Called by servers to begin an asynchronous operation to authenticate the client and optionally the server in a client-server connection.

Parameters:

- `serverCertificate`: The X509Certificate used to authenticate the server.
- `asyncCallback`: An `AsyncCallback` delegate that references the method to invoke when the authentication is complete.
- `asyncState`: A user-defined object that contains information about the operation. This object is passed to the `asyncCallback` delegate when the operation completes.

Returns: An `IAsyncResult` object indicating the status of the asynchronous operation.

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

The asynchronous authentication operation must be completed by calling the `SslStream.EndAuthenticateAsClient` method. Typically, the method is invoked by the `asyncCallback` delegate.

This method does not block while the operation completes. To block until the operation completes, use one of the `SslStream.AuthenticateAsClient` method overloads.

For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously

If you receive a `AuthenticationException`, this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.

## SslStream.BeginAuthenticateAsServer(X509Certificate, Boolean, Boolean, AsyncCallback, Object) method

```csharp
public virtual IAsyncResult BeginAuthenticateAsServer (System.Security.Cryptography.X509Certificates.X509Certificate serverCertificate, bool clientCertificateRequired, bool checkCertificateRevocation, AsyncCallback? asyncCallback, object? asyncState);
```

Called by servers to begin an asynchronous operation to authenticate the server and optionally the client using the specified certificates and requirements, and the system default security protocol.

Parameters:

- `serverCertificate`: The X509Certificate used to authenticate the server.
- `clientCertificateRequired`: A `Boolean` value that specifies whether the client is asked for a certificate for authentication. Note that this is only a request -- if no certificate is provided, the server still accepts the connection request.
- `checkCertificateRevocation`: A `Boolean` value that specifies whether the certificate revocation list is checked during authentication.
- `asyncCallback`: An `AsyncCallback` delegate that references the method to invoke when the authentication is complete.
- `asyncState`: A user-defined object that contains information about the operation. This object is passed to the `asyncCallback` delegate when the operation completes.

Returns: An `IAsyncResult` object that indicates the status of the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `serverCertificate` is `null`.
- `AuthenticationException`: The authentication failed and left this object in an unusable state.
- `InvalidOperationException`: Authentication has already occurred.

-or-

Server authentication using this `SslStream` was tried previously.

-or-

Authentication is already in progress.
- `ObjectDisposedException`: This object has been closed.

#### Remarks

The asynchronous authentication operation must be completed by calling the `SslStream.EndAuthenticateAsServer` method. Typically, the method is invoked by the `asyncCallback` delegate.

This method does not block while the operation completes. To block until the operation completes, use one of the `SslStream.AuthenticateAsServer` method overloads.

For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously

If you receive a `AuthenticationException`, this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.

## SslStream.BeginAuthenticateAsServer(X509Certificate, Boolean, SslProtocols, Boolean, AsyncCallback, Object) method

```csharp
public virtual IAsyncResult BeginAuthenticateAsServer (System.Security.Cryptography.X509Certificates.X509Certificate serverCertificate, bool clientCertificateRequired, System.Security.Authentication.SslProtocols enabledSslProtocols, bool checkCertificateRevocation, AsyncCallback? asyncCallback, object? asyncState);
```

Called by servers to begin an asynchronous operation to authenticate the server and optionally the client using the specified certificates, requirements and security protocol.

Parameters:

- `serverCertificate`: The X509Certificate used to authenticate the server.
- `clientCertificateRequired`: A `Boolean` value that specifies whether the client is asked for a certificate for authentication. Note that this is only a request -- if no certificate is provided, the server still accepts the connection request.
- `enabledSslProtocols`: The `SslProtocols` value that represents protocols used for authentication.
- `checkCertificateRevocation`: A `Boolean` value that specifies whether the certificate revocation list is checked during authentication.
- `asyncCallback`: An `AsyncCallback` delegate that references the method to invoke when the authentication is complete.
- `asyncState`: A user-defined object that contains information about the operation. This object is passed to the `asyncCallback` delegate when the operation completes.

Returns: An `IAsyncResult` object that indicates the status of the asynchronous operation.

Exceptions:

- `ArgumentNullException`: `serverCertificate` is `null`.
- `ArgumentException`: `enabledSslProtocols` is not a valid `SslProtocols` value.
- `AuthenticationException`: The authentication failed and left this object in an unusable state.
- `InvalidOperationException`: Authentication has already occurred.

-or-

Server authentication using this `SslStream` was tried previously.

-or-

Authentication is already in progress.
- `ObjectDisposedException`: This object has been closed.

#### Remarks

The asynchronous authentication operation must be completed by calling the `SslStream.EndAuthenticateAsServer` method. Typically, the method is invoked by the `asyncCallback` delegate.

This method does not block while the operation completes. To block until the operation completes, use one of the `SslStream.AuthenticateAsServer` method overloads.

For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously

If you receive a `AuthenticationException`, this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.
