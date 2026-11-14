---
title: "SslStream class (part 2 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/SslStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SslStream class (part 2 of 8)

## SslStream.SslStream(Stream, Boolean, RemoteCertificateValidationCallback, LocalCertificateSelectionCallback) constructor

```csharp
public SslStream (System.IO.Stream innerStream, bool leaveInnerStreamOpen, System.Net.Security.RemoteCertificateValidationCallback? userCertificateValidationCallback, System.Net.Security.LocalCertificateSelectionCallback? userCertificateSelectionCallback);
```

Initializes a new instance of the `SslStream` class using the specified `Stream`, stream closure behavior, certificate validation delegate and certificate selection delegate.

Parameters:

- `innerStream`: A `Stream` object used by the `SslStream` for sending and receiving data.
- `leaveInnerStreamOpen`: A Boolean value that indicates the closure behavior of the `Stream` object used by the `SslStream` for sending and receiving data. This parameter indicates if the inner stream is left open.
- `userCertificateValidationCallback`: A `RemoteCertificateValidationCallback` delegate responsible for validating the certificate supplied by the remote party.
- `userCertificateSelectionCallback`: A `LocalCertificateSelectionCallback` delegate responsible for selecting the certificate used for authentication.

Exceptions:

- `ArgumentException`: `innerStream` is not readable.

-or-

`innerStream` is not writable.
- `ArgumentNullException`: `innerStream` is `null`.

-or-

`innerStream` is equal to `Stream.Null`.

#### Remarks
When you specify `true` for the `leaveStreamOpen` parameter, closing the `SslStream` has no effect on the `innerStream` stream; you must explicitly close `innerStream` when you no longer need it.

The `userCertificateValidationCallback` delegate's `certificateErrors` argument contains any Windows error codes returned by the channel Security Support Provider Interface (SSPI). The return value of the method invoked by the `userCertificateValidationCallback` delegate determines whether authentication succeeds.

The security protocol and cryptographic algorithms are already selected when the `userCertificateValidationCallback` delegate's method is invoked. You can use the method to determine whether the selected cryptographic algorithms and strengths are sufficient for your application. If not, the method should return `false` to prevent the `SslStream` from being created.

The `userCertificateSelectionCallback` delegate is useful when your application has multiple certificates and must dynamically choose a certificate. Certificates in the "MY" store are passed to the method invoked by the delegate.

If a value is not specified in the configuration file for encryptionpolicy, the `EncryptionPolicy` defaults to `RequireEncryption` for the `SslStream` instance that is constructed.

The use of the Null cipher is required when the encryption policy is set to `NoEncryption`.

> **Note:**
> .NET caches SSL sessions as they are created and attempts to reuse a cached session for subsequent requests, if possible. When attempting to reuse an SSL session, .NET uses the first element of the `X509Certificate2Collection` provided during authentication (if there is one), or tries to reuse an anonymous session if the certificate collection is empty.

#### Examples
The following code example demonstrates calling this constructor. This example is part of a larger example provided for the `SslStream` class.

_Code sample not included: ~/snippets/csharp/System.Net.Security/LocalCertificateSelectionCallback/Overview/clientasync.cs._

## SslStream.SslStream(Stream, Boolean, RemoteCertificateValidationCallback, LocalCertificateSelectionCallback, EncryptionPolicy) constructor

```csharp
public SslStream (System.IO.Stream innerStream, bool leaveInnerStreamOpen, System.Net.Security.RemoteCertificateValidationCallback? userCertificateValidationCallback, System.Net.Security.LocalCertificateSelectionCallback? userCertificateSelectionCallback, System.Net.Security.EncryptionPolicy encryptionPolicy);
```

Initializes a new instance of the `SslStream` class using the specified `Stream`.

Parameters:

- `innerStream`: A `Stream` object used by the `SslStream` for sending and receiving data.
- `leaveInnerStreamOpen`: A Boolean value that indicates the closure behavior of the `Stream` object used by the `SslStream` for sending and receiving data. This parameter indicates if the inner stream is left open.
- `userCertificateValidationCallback`: A `RemoteCertificateValidationCallback` delegate responsible for validating the certificate supplied by the remote party.
- `userCertificateSelectionCallback`: A `LocalCertificateSelectionCallback` delegate responsible for selecting the certificate used for authentication.
- `encryptionPolicy`: The `EncryptionPolicy` to use.

Exceptions:

- `ArgumentException`: `innerStream` is not readable.

-or-

`innerStream` is not writable.

-or-

`encryptionPolicy` is not valid.
- `ArgumentNullException`: `innerStream` is `null`.

-or-

`innerStream` is equal to `Stream.Null`.

#### Remarks
The use of the Null cipher is required when the `encryptionPolicy` parameter is set to `NoEncryption`.

## SslStream.CanRead property

```csharp
public override bool CanRead { get; }
```

Gets a `Boolean` value that indicates whether the underlying stream is readable.

Returns: `true` if authentication has occurred and the underlying stream is readable; otherwise `false`.

#### Remarks
If successful authentication has occurred, this property returns the value returned by invoking `Stream.CanRead` on the underlying stream.

The underlying stream is specified when you create an instance of the `SslStream` class.

#### Examples
The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

## SslStream.CanSeek property

```csharp
public override bool CanSeek { get; }
```

Gets a `Boolean` value that indicates whether the underlying stream is seekable.

Returns: This property always returns `false`.

#### Remarks
Do not attempt to set the position of the `SslStream` object or its underlying stream.

The underlying stream is specified when you create an instance of the `SslStream` class.

## SslStream.CanTimeout property

```csharp
public override bool CanTimeout { get; }
```

Gets a `Boolean` value that indicates whether the underlying stream supports time-outs.

Returns: `true` if the underlying stream supports time-outs; otherwise, `false`.

#### Remarks
This property returns the value returned by invoking `Stream.CanTimeout` on the underlying stream.

The underlying stream is specified when you create an instance of the `SslStream` class.

#### Examples
The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

## SslStream.CanWrite property

```csharp
public override bool CanWrite { get; }
```

Gets a `Boolean` value that indicates whether the underlying stream is writable.

Returns: `true` if authentication has occurred and the underlying stream is writable; otherwise `false`.

#### Remarks
If successful authentication has occurred, this property returns the value returned by invoking `Stream.CanWrite` on the underlying stream.

The underlying stream is specified when you create an instance of the `SslStream` class.

#### Examples
The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

## SslStream.CheckCertRevocationStatus property

```csharp
public virtual bool CheckCertRevocationStatus { get; }
```

Gets a `Boolean` value that indicates whether the certificate revocation list is checked during the certificate validation process.

Returns: `true` if the certificate revocation list is checked; otherwise, `false`.

#### Remarks
The certificate revocation list contains certificates that have been revoked by the issuer. Checking the list negatively impacts performance but improves application security.

#### Examples
The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

## SslStream.CipherAlgorithm property

```csharp
public virtual System.Security.Authentication.CipherAlgorithmType CipherAlgorithm { get; }
```

Gets a value that identifies the bulk encryption algorithm used by this `SslStream`.

Returns: A value that identifies the bulk encryption algorithm used by this `SslStream`.

Exceptions:

- `InvalidOperationException`: The `SslStream.CipherAlgorithm` property was accessed before the completion of the authentication process or the authentication process failed.

#### Remarks

A value of `Null` is required for the `CipherAlgorithm` property when the `NoEncryption` enumeration value is used to construct a `SslStream` instance.

#### Examples
The following code example displays the cryptography settings for the specified stream.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

## SslStream.CipherStrength property

```csharp
public virtual int CipherStrength { get; }
```

Gets a value that identifies the strength of the cipher algorithm used by this `SslStream`.

Returns: An `Int32` value that specifies the strength of the algorithm, in bits.

#### Remarks
The value of this property is zero until the authentication occurs.

This property returns one of the following values:

- 0

- 40

- 56

- 80

- 128

- 168

- 192

- 256

#### Examples
The following code example displays the cryptography settings for the specified stream.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

## SslStream.HashAlgorithm property

```csharp
public virtual System.Security.Authentication.HashAlgorithmType HashAlgorithm { get; }
```

Gets the algorithm used for generating message authentication codes (MACs).

Returns: The algorithm used for generating message authentication codes (MACs).

Exceptions:

- `InvalidOperationException`: The `SslStream.HashAlgorithm` property was accessed before the completion of the authentication process or the authentication process failed.

#### Remarks
Message authentication algorithms generate message hashes and signatures used to detect tampering and forgery.

#### Examples
The following code example displays the cryptography settings for the specified stream.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

## SslStream.HashStrength property

```csharp
public virtual int HashStrength { get; }
```

Gets a value that identifies the strength of the hash algorithm used by this instance.

Returns: An `Int32` value that specifies the strength of the `HashAlgorithmType` algorithm, in bits. Valid values are 128 or 160.

#### Remarks
The value of this property is zero until the authentication occurs.

#### Examples
The following code example displays the cryptography settings for the specified stream.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

## SslStream.IsAuthenticated property

```csharp
public override bool IsAuthenticated { get; }
```

Gets a `Boolean` value that indicates whether authentication was successful.

Returns: `true` if successful authentication occurred; otherwise, `false`.

#### Remarks
Clients authenticate by calling the `SslStream.AuthenticateAsClient` or `SslStream.BeginAuthenticateAsClient` methods. Servers authenticate by calling the `SslStream.AuthenticateAsServer` or `SslStream.BeginAuthenticateAsServer` methods.

#### Examples
The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

## SslStream.IsEncrypted property

```csharp
public override bool IsEncrypted { get; }
```

Gets a `Boolean` value that indicates whether this `SslStream` uses data encryption.

Returns: `true` if data is encrypted before being transmitted over the network and decrypted when it reaches the remote endpoint; otherwise `false`.

#### Remarks
Encryption helps to protect the privacy of the data, namely it helps to ensure that while data is in transit, it cannot be deciphered by third parties.

#### Examples
The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

## SslStream.IsMutuallyAuthenticated property

```csharp
public override bool IsMutuallyAuthenticated { get; }
```

Gets a `Boolean` value that indicates whether both server and client have been authenticated.

Returns: `true` if both server and client have been authenticated; otherwise `false`.

#### Remarks
Mutual authentication is specified by the server when the server wants the client to provide a certificate for authentication.

#### Examples
The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

## SslStream.IsServer property

```csharp
public override bool IsServer { get; }
```

Gets a `Boolean` value that indicates whether the local side of the connection used by this `SslStream` was authenticated as the server.

Returns: `true` if the local endpoint was successfully authenticated as the server side of the authenticated connection; otherwise `false`.

#### Remarks
If authentication failed or did not occur, this property returns `false`.

To authenticate as the server, call the `SslStream.AuthenticateAsServer` or `SslStream.BeginAuthenticateAsServer` methods.

#### Examples
The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._

## SslStream.IsSigned property

```csharp
public override bool IsSigned { get; }
```

Gets a `Boolean` value that indicates whether the data sent using this stream is signed.

Returns: `true` if the data is signed before being transmitted; otherwise `false`.

#### Remarks
Data signing helps to protect the integrity of the data, namely it helps the recipient determine whether the data has been tampered with while in transit.

#### Examples
The following code example demonstrates displaying the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Security/SslStream/Overview/serversync.cs._
