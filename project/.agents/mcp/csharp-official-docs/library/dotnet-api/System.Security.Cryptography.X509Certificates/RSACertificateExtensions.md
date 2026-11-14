---
title: "RSACertificateExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/RSACertificateExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSACertificateExtensions class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public static class RSACertificateExtensions
```

Provides extension methods for retrieving `RSA` implementations for the public and private keys of an `X509Certificate2`.

To be added.

## RSACertificateExtensions.CopyWithPrivateKey(X509Certificate2, RSA) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2 CopyWithPrivateKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate, System.Security.Cryptography.RSA privateKey);
```

Combines a private key with the public key of an `RSA` certificate to generate a new RSA certificate.

Parameters:

- `certificate`: The RSA certificate.
- `privateKey`: The private RSA key.

Returns: A new RSA certificate with the `X509Certificate2.HasPrivateKey` property set to `true`. The input RSA certificate object isn't modified.

Exceptions:

- `ArgumentNullException`: `certificate` or `privateKey` is `null`.
- `InvalidOperationException`: The certificate already has an associated private key.
- `ArgumentException`: The certificate doesn't have a public key.

-or-

The specified private key doesn't match the public key for the specified certificate.

To be added.

## RSACertificateExtensions.GetRSAPrivateKey(X509Certificate2) method

```csharp
public static System.Security.Cryptography.RSA? GetRSAPrivateKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Gets the `RSA` private key from the `X509Certificate2`.

Parameters:

- `certificate`: The certificate.

Returns: The private key, or `null` if the certificate does not have an RSA private key.

Exceptions:

- `ArgumentNullException`: `certificate` is `null`.

To be added.

## RSACertificateExtensions.GetRSAPublicKey(X509Certificate2) method

```csharp
public static System.Security.Cryptography.RSA? GetRSAPublicKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Gets the `RSA` public key from the `X509Certificate2`.

Parameters:

- `certificate`: The certificate.

Returns: The public key, or `null` if the certificate does not have an RSA public key.

Exceptions:

- `ArgumentNullException`: `certificate` is `null`.
- `CryptographicException`: Windows reports an error. See the `Exception.Message` property for more information.

To be added.
