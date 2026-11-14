---
title: "SslCertificateTrust class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/SslCertificateTrust.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SslCertificateTrust class

Namespace: `System.Net.Security`

```csharp
public sealed class SslCertificateTrust
```

Represents a trust policy for use with SSL/TLS connections.

#### Remarks

To associate a trust policy with an `SslStreamCertificateContext`, pass the policy to the `trust` parameter of `Create`.

For remote certificate validation, a non-`null` `CertificateChainPolicy` or `CertificateChainPolicy` supersedes this trust policy. The `TrustMode` and `CustomTrustStore` properties of the specified chain policy determine trust instead. The server still sends the trust list during the TLS handshake if `sendTrustInHandshake` is `true`.

## SslCertificateTrust.CreateForX509Collection(X509Certificate2Collection, Boolean) method

```csharp
public static System.Net.Security.SslCertificateTrust CreateForX509Collection (System.Security.Cryptography.X509Certificates.X509Certificate2Collection trustList, bool sendTrustInHandshake = false);
```

Creates a new `SslCertificateTrust`.

Parameters:

- `trustList`: The collection containing the trusted certificates.
- `sendTrustInHandshake`: `true` for the server to send a list of trusted certificate authorities during the TLS handshake; `false` not to send the list.

Returns: Represents a trust policy.

Exceptions:

- `PlatformNotSupportedException`: `sendTrustInHandshake` is `true` and the current platform does not support sending trusted issuers list in handshake.

#### Remarks

If the `sendTrustInHandshake` argument is `true`, the client can use the list of trusted certificate authorities from the server to select an appropriate client certificate.

The sending trusted issuers list is supported on Linux and macOS platforms.

> **Warning:**
> The list of trusted CAs increases the size of the handshake message. It could also be viewed as an information leak about the system's configuration. For these reasons, we recommend setting `sendTrustInHandshake` to `false`.

## SslCertificateTrust.CreateForX509Store(X509Store, Boolean) method

```csharp
public static System.Net.Security.SslCertificateTrust CreateForX509Store (System.Security.Cryptography.X509Certificates.X509Store store, bool sendTrustInHandshake = false);
```

Creates a new `SslCertificateTrust`.

Parameters:

- `store`: The store containing the trusted certificates.
- `sendTrustInHandshake`: `true` for the server to send a list of trusted certificate authorities during the TLS handshake; `false` not to send the list.

Returns: Represents a trust policy.

Exceptions:

- `PlatformNotSupportedException`: `sendTrustInHandshake` is `true` and the current platform does not support sending trusted issuers list in handshake, or (on Windows) the `store`'s location is not `LocalMachine`.

#### Remarks

If the `sendTrustInHandshake` argument is `true`, the client can use the list of trusted certificate authorities from the server to select an appropriate client certificate.

> **Warning:**
> The list of trusted CAs increases the size of the handshake message. It could also be viewed as an information leak about the system's configuration. For these reasons, we recommend setting `sendTrustInHandshake` to `false`.
