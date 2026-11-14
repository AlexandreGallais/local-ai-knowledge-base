---
title: "SslStream class (part 3 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/SslStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SslStream class (part 3 of 8)

## SslStream.KeyExchangeAlgorithm property

```csharp
public virtual System.Security.Authentication.ExchangeAlgorithmType KeyExchangeAlgorithm { get; }
```

Gets the key <example-value> algorithm used by this `SslStream`.

Returns: An `ExchangeAlgorithmType` value.

#### Remarks
The value of this property is `None` until the authentication occurs.

The key <example-value> algorithm protects information used to generate shared keys.

#### Examples
The following code example displays the cryptography settings for the specified stream.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

## SslStream.KeyExchangeStrength property

```csharp
public virtual int KeyExchangeStrength { get; }
```

Gets a value that identifies the strength of the key <example-value> algorithm used by this instance.

Returns: An `Int32` value that specifies the strength of the `ExchangeAlgorithmType` algorithm, in bits.

#### Remarks
The value of this property is zero until the authentication occurs.

In common scenarios, the value of this property is one of the following:

- 512

- 768

- 1024

- 2048

#### Examples
The following code example displays the cryptography settings for the specified stream.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

## SslStream.Length property

```csharp
public override long Length { get; }
```

Gets the length of the underlying stream.

Returns: The length of the underlying stream.

Exceptions:

- `NotSupportedException`: Getting the value of this property is not supported when the underlying stream is a `NetworkStream`.

#### Remarks
This property returns the value returned by invoking `Stream.Length` on the underlying stream. If the underlying stream is not seekable, this method typically throws an exception. The run-time type of the underlying stream determines the run-time type of the exception that is thrown.

## SslStream.LocalCertificate property

```csharp
public virtual System.Security.Cryptography.X509Certificates.X509Certificate? LocalCertificate { get; }
```

Gets the certificate used to authenticate the local endpoint.

Returns: An X509Certificate object that represents the certificate supplied for authentication or `null` if no certificate was supplied.

Exceptions:

- `InvalidOperationException`: Authentication failed or has not occurred.

#### Examples
The following code example demonstrates displaying the certificate returned by this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

## SslStream.NegotiatedApplicationProtocol property

```csharp
public System.Net.Security.SslApplicationProtocol NegotiatedApplicationProtocol { get; }
```

Gets the negotiated application protocol in TLS handshake.

Returns: To be added.

Available once authentication via one of of the `AuthenticateAs...` methods has been successfully processed.

## SslStream.NegotiatedCipherSuite property

```csharp
public virtual System.Net.Security.TlsCipherSuite NegotiatedCipherSuite { get; }
```

Gets the cipher suite that was negotiated for this connection.

Returns: One of the enumeration values that identifies the cipher suite that was negotiated for this connection.

Exceptions:

- `InvalidOperationException`: The property was accessed before the completion of the authentication process or the authentication process failed.

#### Remarks

This property gets the cipher suite that is going to be used in the communication between a client and server by the underlying SSL/TLS implementation. It is only available after a successful call to `SslStream.AuthenticateAsServer` or `SslStream.AuthenticateAsClient`.

## SslStream.Position property

```csharp
public override long Position { get; set; }
```

Gets or sets the current position in the underlying stream.

Returns: The current position in the underlying stream.

Exceptions:

- `NotSupportedException`: Setting this property is not supported.

-or-

Getting the value of this property is not supported when the underlying stream is a `NetworkStream`.

#### Remarks
This property returns the value returned by invoking `Stream.Position` on the underlying stream. If the underlying stream is not seekable, this method typically throws an exception. The run-time type of the underlying stream determines the run-time type of the exception that is thrown.

## SslStream.ReadTimeout property

```csharp
public override int ReadTimeout { get; set; }
```

Gets or sets the amount of time, expressed in milliseconds, a read operation blocks waiting for data.

Returns: The amount of time, in milliseconds, that elapses before a synchronous read operation fails.

#### Remarks
This property returns the value returned by invoking `Stream.ReadTimeout` on the underlying stream. When you set this property, the `Stream.ReadTimeout` value on the underlying stream is set to the specified value.

If the underlying stream is a `NetworkStream`, `SslStream.ReadTimeout` is in milliseconds and is set to `Infinite` by default so that read operations do not timeout.

#### Examples
The following code example demonstrates setting the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

## SslStream.RemoteCertificate property

```csharp
public virtual System.Security.Cryptography.X509Certificates.X509Certificate? RemoteCertificate { get; }
```

Gets the certificate used to authenticate the remote endpoint.

Returns: An X509Certificate object that represents the certificate supplied for authentication or `null` if no certificate was supplied.

Exceptions:

- `InvalidOperationException`: Authentication failed or has not occurred.

If the property is accessed, the remote certificate will not be disposed when the SslStream instance is disposed. The caller of the property is responsible for disposing the returned `X509Certificate` object.

#### Examples
The following code example demonstrates displaying the certificate returned by this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

## SslStream.SslProtocol property

```csharp
public virtual System.Security.Authentication.SslProtocols SslProtocol { get; }
```

Gets a value that indicates the security protocol used to authenticate this connection.

Returns: The `SslProtocols` value that represents protocols used for authentication.

#### Remarks
The enabled security protocols can be specified in `SslStream.AuthenticateAsClient` or via `EnabledSslProtocols` and `SslStream.AuthenticateAsServer` or `EnabledSslProtocols`. If no security protocol was explicitly specified, the `Default` value is used.

The actual protocol used for authentication is selected based on the ones supported by the client and server.

#### Examples
The following example displays the security properties of the specified stream.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

## SslStream.TargetHostName property

```csharp
public string TargetHostName { get; }
```

Gets the name of the server the client is trying to connect to. That name is used for server certificate validation. It can be a DNS name or an IP address.

Returns: The name of the server the client is trying to connect to.

To be added.

## SslStream.TransportContext property

```csharp
public System.Net.TransportContext TransportContext { get; }
```

Gets the `TransportContext` used for authentication using extended protection.

Returns: The `TransportContext` object that contains the channel binding token (CBT) used for extended protection.

To be added.

## SslStream.WriteTimeout property

```csharp
public override int WriteTimeout { get; set; }
```

Gets or sets the amount of time a write operation blocks waiting for data.

Returns: The amount of time that elapses before a synchronous write operation fails.

#### Remarks
This property returns the value returned by invoking `Stream.WriteTimeout` on the underlying stream. For set operations, the specified value sets the `Stream.WriteTimeout` value on the underlying stream.

If the underlying stream is a `NetworkStream`, `SslStream.WriteTimeout` is in milliseconds and is set to `Infinite` by default so that write operations do not timeout.

#### Examples
The following code example demonstrates setting the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

## SslStream.AuthenticateAsClient(SslClientAuthenticationOptions) method

```csharp
public void AuthenticateAsClient (System.Net.Security.SslClientAuthenticationOptions sslClientAuthenticationOptions);
```

Authenticates the server and optionally the client in a client-server connection.

Parameters:

- `sslClientAuthenticationOptions`: The property bag for the SSL connection.

Exceptions:

- `ArgumentNullException`: `sslClientAuthenticationOptions` is `null`.
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

## SslStream.AuthenticateAsClient(String) method

```csharp
public virtual void AuthenticateAsClient (string targetHost);
```

Called by clients to authenticate the server and optionally the client in a client-server connection.

Parameters:

- `targetHost`: The name of the server that shares this `SslStream`.

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

## SslStream.AuthenticateAsClient(String, X509CertificateCollection, Boolean) method

```csharp
public virtual void AuthenticateAsClient (string targetHost, System.Security.Cryptography.X509Certificates.X509CertificateCollection? clientCertificates, bool checkCertificateRevocation);
```

Called by clients to authenticate the server and optionally the client in a client-server connection. The authentication process uses the specified certificate collection, and the system default SSL protocol.

Parameters:

- `targetHost`: The name of the server that will share this `SslStream`.
- `clientCertificates`: The `X509CertificateCollection` that contains client certificates.
- `checkCertificateRevocation`: A `Boolean` value that specifies whether the certificate revocation list is checked during authentication.

#### Remarks

When authentication succeeds, you must check the `SslStream.IsEncrypted` and `SslStream.IsSigned` properties to determine what security services are used by the `SslStream`. Check the `IsMutuallyAuthenticated` property to determine whether mutual authentication occurred.

If the authentication fails, you receive a `AuthenticationException`, and this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.

> **Note:**
>  Client certificates are not supported in the SSL version 2 protocol.

## SslStream.AuthenticateAsClient(String, X509CertificateCollection, SslProtocols, Boolean) method

```csharp
public virtual void AuthenticateAsClient (string targetHost, System.Security.Cryptography.X509Certificates.X509CertificateCollection? clientCertificates, System.Security.Authentication.SslProtocols enabledSslProtocols, bool checkCertificateRevocation);
```

Called by clients to authenticate the server and optionally the client in a client-server connection. The authentication process uses the specified certificate collection and SSL protocol.

Parameters:

- `targetHost`: The name of the server that will share this `SslStream`.
- `clientCertificates`: The `X509CertificateCollection` that contains client certificates.
- `enabledSslProtocols`: The `SslProtocols` value that represents protocols used for authentication.
- `checkCertificateRevocation`: A `Boolean` value that specifies whether the certificate revocation list is checked during authentication.

#### Remarks

When authentication succeeds, you must check the `SslStream.IsEncrypted` and `SslStream.IsSigned` properties to determine what security services are used by the `SslStream`. Check the `IsMutuallyAuthenticated` property to determine whether mutual authentication occurred.

If the authentication fails, you receive a `AuthenticationException`, and this `SslStream` is no longer useable. You should close this object and remove all references to it so that it can be collected by the garbage collector.

> **Note:**
>  Client certificates are not supported in the SSL version 2 protocol.
