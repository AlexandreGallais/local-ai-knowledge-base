---
title: "SslServerAuthenticationOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/SslServerAuthenticationOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SslServerAuthenticationOptions class

Namespace: `System.Net.Security`

```csharp
public class SslServerAuthenticationOptions
```

This struct represents a server authentication property bag for the `SslStream`.

This property bag is used as an argument for `SslStream.AuthenticateAsServer` and `SslStream.AuthenticateAsServerAsync`.

## SslServerAuthenticationOptions.SslServerAuthenticationOptions() constructor

```csharp
public SslServerAuthenticationOptions ();
```

Initializes a new instance of the `SslServerAuthenticationOptions` class.

To be added.

## SslServerAuthenticationOptions.AllowRenegotiation property

```csharp
public bool AllowRenegotiation { get; set; }
```

Gets or sets a value that indicates whether the `SslStream` should allow SSL renegotiation.

Returns: `true` to allow SSL renegotiation; otherwise, `false`. The default value is `false`.

To be added.

## SslServerAuthenticationOptions.AllowRsaPkcs1Padding property

```csharp
public bool AllowRsaPkcs1Padding { get; set; }
```

Gets or sets a value that indicates whether the the rsa_pkcs1_* family of TLS signature algorithms is enabled for use in the TLS handshake.

Returns: To be added.

To be added.

## SslServerAuthenticationOptions.AllowRsaPssPadding property

```csharp
public bool AllowRsaPssPadding { get; set; }
```

Gets or sets a value that indicates whether the the rsa_pss_* family of TLS signature algorithms is enabled for use in the TLS handshake.

Returns: To be added.

To be added.

## SslServerAuthenticationOptions.AllowTlsResume property

```csharp
public bool AllowTlsResume { get; set; }
```

Gets or sets a value that indicates whether the SslStream should allow TLS resumption.

Returns: To be added.

To be added.

## SslServerAuthenticationOptions.ApplicationProtocols property

```csharp
public System.Collections.Generic.List<System.Net.Security.SslApplicationProtocol>? ApplicationProtocols { get; set; }
```

Gets or sets a list of ALPN protocols.

Returns: To be added.

To be added.

## SslServerAuthenticationOptions.CertificateChainPolicy property

```csharp
public System.Security.Cryptography.X509Certificates.X509ChainPolicy? CertificateChainPolicy { get; set; }
```

Gets or sets an optional customized policy for remote certificate validation.

Returns: To be added.

#### Remarks

When this property isn't `null`, certain properties on `SslServerAuthenticationOptions` are superseded by corresponding properties on the provided `X509ChainPolicy`:

- `CertificateRevocationCheckMode` is superseded by `RevocationMode`.
- Any `SslCertificateTrust` associated with `ServerCertificateContext` is superseded by `TrustMode` and `CustomTrustStore`. However, the trust list from `SslCertificateTrust` is still sent in the handshake when configured.

When validating client certificates on the server, .NET 11 and later disable AIA certificate downloads by default if this property is `null`. If you supply a chain policy, its `DisableCertificateDownloads` value is used.

## SslServerAuthenticationOptions.CertificateRevocationCheckMode property

```csharp
public System.Security.Cryptography.X509Certificates.X509RevocationMode CertificateRevocationCheckMode { get; set; }
```

Gets or sets the certificate revocation mode for certificate validation.

Returns: One of the values in `X509RevocationMode`: `NoCheck`, `Online`, or `Offline`. The default is `NoCheck`.

Exceptions:

- `ArgumentException`: The value contains an invalid enumeration value.

#### Remarks
When using certificates, the system validates that the client certificate is not revoked, by checking that the client certificate is not in the revoked certificate list. This check can be performed either by checking online or by checking against a cached revocation list. Revocation checking can be turned off by setting this property to `NoCheck`.

For more information, see Working with Certificates.

## SslServerAuthenticationOptions.CipherSuitesPolicy property

```csharp
public System.Net.Security.CipherSuitesPolicy? CipherSuitesPolicy { get; set; }
```

Specifies the cipher suites allowed for TLS. When set to `null`, the operating system default is used. Use extreme caution when changing this setting.

Returns: To be added.

To be added.

## SslServerAuthenticationOptions.ClientCertificateRequired property

```csharp
public bool ClientCertificateRequired { get; set; }
```

Gets or sets a value that specifies whether the client is asked for a certificate for authentication. Note that this is only a request -- if no certificate is provided, the server still accepts the connection request.

Returns: To be added.

To be added.

## SslServerAuthenticationOptions.EnabledSslProtocols property

```csharp
public System.Security.Authentication.SslProtocols EnabledSslProtocols { get; set; }
```

Gets or sets a value that represents protocol versions used by the server to match the client protocol version during authentication.

Returns: The default value is `SslProtocols.None`, which is the recommended value. See `SslProtocols` for more details.

To be added.

## SslServerAuthenticationOptions.EncryptionPolicy property

```csharp
public System.Net.Security.EncryptionPolicy EncryptionPolicy { get; set; }
```

Gets or sets the `EncryptionPolicy`.

Returns: The default value is `EncryptionPolicy.RequireEncryption`

Exceptions:

- `ArgumentException`: The value contains an invalid enumeration value.

To be added.

## SslServerAuthenticationOptions.RemoteCertificateValidationCallback property

```csharp
public System.Net.Security.RemoteCertificateValidationCallback? RemoteCertificateValidationCallback { get; set; }
```

Gets or sets a `RemoteCertificateValidationCallback` delegate responsible for custom validating the certificate supplied by the remote party.

Returns: To be added.

To be added.

## SslServerAuthenticationOptions.ServerCertificate property

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate? ServerCertificate { get; set; }
```

Gets or sets the server certificate.

Returns: To be added.

To be added.

## SslServerAuthenticationOptions.ServerCertificateContext property

```csharp
public System.Net.Security.SslStreamCertificateContext? ServerCertificateContext { get; set; }
```

Gets or sets the server certificate context.

Returns: The server certificate context.

To be added.

## SslServerAuthenticationOptions.ServerCertificateSelectionCallback property

```csharp
public System.Net.Security.ServerCertificateSelectionCallback? ServerCertificateSelectionCallback { get; set; }
```

Gets or sets the `ServerCertificateSelectionCallback` delegate responsible for the server certificate selection.

Returns: To be added.

When the server connection is established, the server first uses the `ServerCertificateSelectionCallback` callback. If the delegate isn't provided, the server uses `LocalCertificateSelectionCallback`, which is provided as an argument of `SslStream.%23ctor` (for .NET Framework compatibility). If neither callback is provided, the server falls back to `ServerCertificate`.
