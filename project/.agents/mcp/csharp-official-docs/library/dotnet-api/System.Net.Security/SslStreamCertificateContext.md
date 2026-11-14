---
title: "SslStreamCertificateContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/SslStreamCertificateContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SslStreamCertificateContext class

Namespace: `System.Net.Security`

```csharp
public class SslStreamCertificateContext
```

Represents a set of certificates used for building a certificate chain.

#### Remarks

The certificates are normalized. If a certificate is missing in the constructed X509Chain, SslStream will try to resolve them either by searching for the certificate in the certificate stores or by fetching them over the network, if allowed.

The `SslStreamCertificateContext` can be used across multiple streams to save chain construction and improve performance.

## SslStreamCertificateContext.IntermediateCertificates property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.Security.Cryptography.X509Certificates.X509Certificate2> IntermediateCertificates { get; }
```

Gets the intermediate certificates for the built chain.

Returns: To be added.

To be added.

## SslStreamCertificateContext.TargetCertificate property

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2 TargetCertificate { get; }
```

Gets the target (leaf) certificate of the built chain.

Returns: To be added.

To be added.

## SslStreamCertificateContext.Create(X509Certificate2, X509Certificate2Collection, Boolean) method

```csharp
public static System.Net.Security.SslStreamCertificateContext Create (System.Security.Cryptography.X509Certificates.X509Certificate2 target, System.Security.Cryptography.X509Certificates.X509Certificate2Collection? additionalCertificates, bool offline);
```

Attempts to build the certificate chain from the provided certificates.

Parameters:

- `target`: The server certificate.
- `additionalCertificates`: Supplementary certificates used to build the certificate chain.
- `offline`: `false` to indicate that the missing certificates can be downloaded from the network; `true` to indicate that only available X509Certificate stores should be searched for missing certificates.

Returns: The certificate context with the newly created certificate chain.

Exceptions:

- `NotSupportedException`: `target` doesn't have an associated private key.

#### Remarks

The provided certificates should not be disposed during the lifetime of the `SslStreamCertificateContext`.

> **Important:**
> The target certificate must include a private key.

## SslStreamCertificateContext.Create(X509Certificate2, X509Certificate2Collection, Boolean, SslCertificateTrust) method

```csharp
public static System.Net.Security.SslStreamCertificateContext Create (System.Security.Cryptography.X509Certificates.X509Certificate2 target, System.Security.Cryptography.X509Certificates.X509Certificate2Collection? additionalCertificates, bool offline = false, System.Net.Security.SslCertificateTrust? trust = default);
```

Attempts to build the certificate chain from the provided certificates.

Parameters:

- `target`: The server certificate.
- `additionalCertificates`: Supplementary certificates used to build the certificate chain.
- `offline`: `false` to indicate that the missing certificates can be downloaded from the network; `true` to indicate that only available X509Certificate stores should be searched for missing certificates.
- `trust`: An optional trust policy to replace the default system trust. A custom certificate chain policy on the authentication options takes precedence for remote certificate validation.

Returns: The certificate context with the newly created certificate chain.

Exceptions:

- `NotSupportedException`: `target` doesn't have an associated private key.

#### Remarks

The provided certificates should not be disposed during the lifetime of the `SslStreamCertificateContext`.

If `CertificateChainPolicy` or `CertificateChainPolicy` isn't `null`, the specified chain policy supersedes the `trust` argument for remote certificate validation. The `TrustMode` and `CustomTrustStore` properties determine trust instead. The server still sends the trust list during the TLS handshake if the trust policy is configured to do so.

> **Important:**
> The target certificate must include a private key.
