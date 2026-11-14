---
title: "SslClientAuthenticationOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/SslClientAuthenticationOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SslClientAuthenticationOptions class

Namespace: `System.Net.Security`

```csharp
public class SslClientAuthenticationOptions
```

Represents a client authentication property bag for the `SslStream`.

#### Remarks
This property bag is used as argument for `SslStream.AuthenticateAsClientAsync` and `SslStream.AuthenticateAsClient`.

The `SocketsHttpHandler` uses this property bag in the `SslOptions` property.

## SslClientAuthenticationOptions.SslClientAuthenticationOptions() constructor

```csharp
public SslClientAuthenticationOptions ();
```

Initializes a new instance of the `SslClientAuthenticationOptions` class.

To be added.

## SslClientAuthenticationOptions.AllowRenegotiation property

```csharp
public bool AllowRenegotiation { get; set; }
```

Gets or sets a value that indicates whether the `SslStream` should allow SSL renegotiation.

Returns: `true` to indicate that the `SslStream` allows SSL renegotiation; otherwise, `false`. The default value is `true`.

To be added.

## SslClientAuthenticationOptions.AllowRsaPkcs1Padding property

```csharp
public bool AllowRsaPkcs1Padding { get; set; }
```

Gets or sets a value that indicates whether the the rsa_pkcs1_* family of TLS signature algorithms is enabled for use in the TLS handshake.

Returns: To be added.

To be added.

## SslClientAuthenticationOptions.AllowRsaPssPadding property

```csharp
public bool AllowRsaPssPadding { get; set; }
```

Gets or sets a value that indicates whether the the rsa_pss_* family of TLS signature algorithms is enabled for use in the TLS handshake.

Returns: To be added.

To be added.

## SslClientAuthenticationOptions.AllowTlsResume property

```csharp
public bool AllowTlsResume { get; set; }
```

Gets or sets a value that indicates whether the SslStream should allow TLS resumption.

Returns: `true` if the `SslStream` allows TLS resumption; otherwise, `false`. The default value is `true`.

To be added.

## SslClientAuthenticationOptions.ApplicationProtocols property

```csharp
public System.Collections.Generic.List<System.Net.Security.SslApplicationProtocol>? ApplicationProtocols { get; set; }
```

Gets or sets a list of ALPN protocols.

Returns: To be added.

To be added.

## SslClientAuthenticationOptions.CertificateChainPolicy property

```csharp
public System.Security.Cryptography.X509Certificates.X509ChainPolicy? CertificateChainPolicy { get; set; }
```

Gets or sets an optional customized policy for remote certificate validation.

Returns: To be added.

#### Remarks

When this property isn't `null`, certain properties on `SslClientAuthenticationOptions` are superseded by corresponding properties on the provided `X509ChainPolicy`:

- `CertificateRevocationCheckMode` is superseded by `RevocationMode`.
- Any `SslCertificateTrust` associated with `ClientCertificateContext` is superseded by `TrustMode` and `CustomTrustStore`.

## SslClientAuthenticationOptions.CertificateRevocationCheckMode property

```csharp
public System.Security.Cryptography.X509Certificates.X509RevocationMode CertificateRevocationCheckMode { get; set; }
```

Gets or sets the certificate revocation mode for certificate validation.

Returns: One of the values in `X509RevocationMode`. The default is `NoCheck`.

Exceptions:

- `ArgumentNullException`: The value contains an invalid enumeration value.

#### Remarks
When using certificates, the system validates that the client certificate is not revoked by checking that the client certificate is not in the revoked certificate list. This validation can be performed by checking online or against a cached revocation list. You can turn off revocation checking by setting this property to `NoCheck`.

For more information, see Working with Certificates.

## SslClientAuthenticationOptions.CipherSuitesPolicy property

```csharp
public System.Net.Security.CipherSuitesPolicy? CipherSuitesPolicy { get; set; }
```

Specifies the cipher suites allowed for TLS. When set to `null`, the operating system default is used. Use extreme caution when changing this setting.

Returns: To be added.

To be added.

## SslClientAuthenticationOptions.ClientCertificateContext property

```csharp
public System.Net.Security.SslStreamCertificateContext? ClientCertificateContext { get; set; }
```

Gets or sets the client certificate context.

Returns: To be added.

To be added.

## SslClientAuthenticationOptions.ClientCertificates property

```csharp
public System.Security.Cryptography.X509Certificates.X509CertificateCollection? ClientCertificates { get; set; }
```

A collection of certificates to be considered for the client's authentication to the server.

Returns: To be added.

#### Remarks

`LocalCertificateSelectionCallback` can be used to select a specific certificate to offer to the server.

## SslClientAuthenticationOptions.EnabledSslProtocols property

```csharp
public System.Security.Authentication.SslProtocols EnabledSslProtocols { get; set; }
```

Gets or sets the value that represents the protocol versions offered by the client to the server during authentication.

Returns: The default value is `SslProtocols.None`, which is the recommended value. For more information, see `SslProtocols`.

To be added.

## SslClientAuthenticationOptions.EncryptionPolicy property

```csharp
public System.Net.Security.EncryptionPolicy EncryptionPolicy { get; set; }
```

Gets or sets the encryption policy.

Returns: The default value is `EncryptionPolicy.RequireEncryption`.

To be added.

## SslClientAuthenticationOptions.LocalCertificateSelectionCallback property

```csharp
public System.Net.Security.LocalCertificateSelectionCallback? LocalCertificateSelectionCallback { get; set; }
```

Gets or sets a `LocalCertificateSelectionCallback` delegate that's responsible for selecting the client authentication certificate used for authentication.

Returns: To be added.

To be added.

## SslClientAuthenticationOptions.RemoteCertificateValidationCallback property

```csharp
public System.Net.Security.RemoteCertificateValidationCallback? RemoteCertificateValidationCallback { get; set; }
```

Gets or sets a `RemoteCertificateValidationCallback` delegate that's responsible for validating the certificate supplied by the remote party.

Returns: To be added.

To be added.

## SslClientAuthenticationOptions.TargetHost property

```csharp
public string? TargetHost { get; set; }
```

Gets or sets the name of the server the client is trying to connect to. The name is used for server certificate validation and can be a DNS name or an IP address.

Returns: The name of the server the client is trying to connect to. If set to `null` or an empty string, the client doesn't send the host name in the Server Name Indication extension.

If the value is `null` or an empty string, you should also provide a `RemoteCertificateValidationCallback` and validate the subject of the server's certificate.
