---
title: "ECDsaCertificateExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/ECDsaCertificateExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ECDsaCertificateExtensions class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public static class ECDsaCertificateExtensions
```

Provides extension methods for retrieving `ECDsa` implementations for the     public and private keys of a `X509Certificate2` certificate.

To be added.

## ECDsaCertificateExtensions.CopyWithPrivateKey(X509Certificate2, ECDsa) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2 CopyWithPrivateKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate, System.Security.Cryptography.ECDsa privateKey);
```

Combines a private key with the public key of an `ECDsa` certificate to generate a new ECDSA certificate.

Parameters:

- `certificate`: The ECDSA certificate.
- `privateKey`: The private ECDSA key.

Returns: A new ECDSA certificate with the `X509Certificate2.HasPrivateKey` property set to `true`. The input ECDSA certificate object isn't modified.

Exceptions:

- `ArgumentNullException`: `certificate` or `privateKey` is `null`.
- `InvalidOperationException`: The certificate already has an associated private key.
- `ArgumentException`: The certificate doesn't have a public key.

-or-

The specified private key doesn't match the public key for the specified certificate.

To be added.

## ECDsaCertificateExtensions.GetECDsaPrivateKey(X509Certificate2) method

```csharp
public static System.Security.Cryptography.ECDsa? GetECDsaPrivateKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Gets the `ECDsa` private key from the `X509Certificate2` certificate.

Parameters:

- `certificate`: The certificate.

Returns: The private key, or `null` if the certificate does not have an ECDsa private key.

Exceptions:

- `ArgumentNullException`: `certificate` is `null`.

To be added.

## ECDsaCertificateExtensions.GetECDsaPublicKey(X509Certificate2) method

```csharp
public static System.Security.Cryptography.ECDsa? GetECDsaPublicKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Gets the `ECDsa` public key from the `X509Certificate2` certificate.

Parameters:

- `certificate`: The certificate.

Returns: The public key, or `null` if the certificate does not have an ECDsa public key.

Exceptions:

- `ArgumentNullException`: `certificate` is `null`.
- `CryptographicException`: The handle is invalid.

To be added.
