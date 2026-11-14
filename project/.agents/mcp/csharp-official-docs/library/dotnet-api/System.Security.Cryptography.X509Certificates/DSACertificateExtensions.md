---
title: "DSACertificateExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/DSACertificateExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DSACertificateExtensions class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public static class DSACertificateExtensions
```

Provides extension methods for retrieving `DSA` implementations for the public and private keys of an `X509Certificate2`.

To be added.

## DSACertificateExtensions.CopyWithPrivateKey(X509Certificate2, DSA) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2 CopyWithPrivateKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate, System.Security.Cryptography.DSA privateKey);
```

Combines a private key with the public key of a `DSA` certificate to generate a new DSA certificate.

Parameters:

- `certificate`: The DSA certificate.
- `privateKey`: The private DSA key.

Returns: A new DSA certificate with the `X509Certificate2.HasPrivateKey` property set to `true`. The input DSA certificate object isn't modified.

Exceptions:

- `ArgumentNullException`: `certificate` or `privateKey` is `null`.
- `InvalidOperationException`: The certificate already has an associated private key.
- `ArgumentException`: The certificate doesn't have a public key.

-or-

The specified private key doesn't match the public key for the specified certificate.
- `PlatformNotSupportedException`: .NET 11 and later versions on macOS: In all cases.

To be added.

## DSACertificateExtensions.GetDSAPrivateKey(X509Certificate2) method

```csharp
public static System.Security.Cryptography.DSA? GetDSAPrivateKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Gets the `DSA` private key from the `X509Certificate2`.

Parameters:

- `certificate`: The certificate.

Returns: The private key, or `null` if the certificate does not have a DSA private key.

Exceptions:

- `ArgumentNullException`: `certificate` is `null`.
- `PlatformNotSupportedException`: .NET 11 and later versions on macOS, when the certificate contains a DSA private key.

To be added.

## DSACertificateExtensions.GetDSAPublicKey(X509Certificate2) method

```csharp
public static System.Security.Cryptography.DSA? GetDSAPublicKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Gets the `DSA` public key from the `X509Certificate2`.

Parameters:

- `certificate`: The certificate.

Returns: The public key, or `null` if the certificate does not have a DSA public key.

Exceptions:

- `ArgumentNullException`: `certificate` is `null`.
- `CryptographicException`: Windows reports an error. See the `Exception.Message` property for more information.
- `PlatformNotSupportedException`: .NET 11 and later versions on macOS, when the certificate contains a DSA public key.

To be added.
