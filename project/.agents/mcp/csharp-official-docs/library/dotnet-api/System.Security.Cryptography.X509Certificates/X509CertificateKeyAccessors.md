---
title: "X509CertificateKeyAccessors class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509CertificateKeyAccessors.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509CertificateKeyAccessors class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public static class X509CertificateKeyAccessors
```

Provides helper methods to access keys on `X509Certificate2`.

To be added.

## X509CertificateKeyAccessors.CopyWithPrivateKey(X509Certificate2, CompositeMLDsa) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2 CopyWithPrivateKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate, System.Security.Cryptography.CompositeMLDsa privateKey);
```

Combines a private key with a certificate containing the associated public key into a new instance that can access the private key.

Parameters:

- `certificate`: The X.509 certificate that contains the public key.
- `privateKey`: The Composite ML-DSA private key that corresponds to the Composite ML-DSA public key in this certificate.

Returns: A new certificate with the `X509Certificate2.HasPrivateKey` property set to `true`.

The current certificate isn't modified.

Exceptions:

- `ArgumentNullException`: `certificate` or `privateKey` is `null`.
- `ArgumentException`: The specified private key doesn't match the public key for this certificate.
- `InvalidOperationException`: The certificate already has an associated private key.
- `PlatformNotSupportedException`: Combining a certificate and a Composite ML-DSA private key is not supported on this platform.

To be added.

## X509CertificateKeyAccessors.CopyWithPrivateKey(X509Certificate2, CompositeMLKem) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2 CopyWithPrivateKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate, System.Security.Cryptography.CompositeMLKem privateKey);
```

To be added.

Parameters:

- `certificate`: To be added.
- `privateKey`: To be added.

Returns: To be added.

To be added.

## X509CertificateKeyAccessors.CopyWithPrivateKey(X509Certificate2, MLDsa) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2 CopyWithPrivateKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate, System.Security.Cryptography.MLDsa privateKey);
```

Combines a private key with a certificate containing the associated public key into a new instance that can access the private key.

Parameters:

- `certificate`: The X.509 certificate that contains the public key.
- `privateKey`: The ML-DSA private key that corresponds to the ML-DSA public key in this certificate.

Returns: A new certificate with the `X509Certificate2.HasPrivateKey` property set to `true`.

The current certificate isn't modified.

Exceptions:

- `ArgumentNullException`: `certificate` or `privateKey` is `null`.
- `ArgumentException`: The specified private key doesn't match the public key for this certificate.
- `InvalidOperationException`: The certificate already has an associated private key.
- `PlatformNotSupportedException`: Combining a certificate and an ML-DSA private key is not supported on this platform.

To be added.

## X509CertificateKeyAccessors.CopyWithPrivateKey(X509Certificate2, MLKem) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2 CopyWithPrivateKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate, System.Security.Cryptography.MLKem privateKey);
```

Combines a private key with a certificate containing the associated public key into a new instance that can access the private key.

Parameters:

- `certificate`: The X.509 certificate that contains the public key.
- `privateKey`: The ML-KEM private key that corresponds to the ML-KEM public key in this certificate.

Returns: A new certificate with the `X509Certificate2.HasPrivateKey` property set to `true`.

The current certificate isn't modified.

Exceptions:

- `ArgumentNullException`: `certificate` or `privateKey` is `null`.
- `ArgumentException`: The specified private key doesn't match the public key for this certificate.
- `InvalidOperationException`: The certificate already has an associated private key.
- `PlatformNotSupportedException`: Combining a certificate and an ML-KEM private key is not supported on this platform.

To be added.

## X509CertificateKeyAccessors.CopyWithPrivateKey(X509Certificate2, SlhDsa) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Certificate2 CopyWithPrivateKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate, System.Security.Cryptography.SlhDsa privateKey);
```

Combines a private key with a certificate containing the associated public key into a new instance that can access the private key.

Parameters:

- `certificate`: The X509 certificate that contains the public key.
- `privateKey`: The SLH-DSA private key that corresponds to the SLH-DSA public key in this certificate.

Returns: A new certificate with the `X509Certificate2.HasPrivateKey` property set to `true`.

The current certificate isn't modified.

Exceptions:

- `ArgumentNullException`: `certificate` or `privateKey` is `null`.
- `ArgumentException`: The specified private key doesn't match the public key for this certificate.
- `InvalidOperationException`: The certificate already has an associated private key.
- `PlatformNotSupportedException`: Combining a certificate and an SLH-DSA private key is not supported on this platform.

To be added.

## X509CertificateKeyAccessors.GetCompositeMLDsaPrivateKey(X509Certificate2) method

```csharp
public static System.Security.Cryptography.CompositeMLDsa? GetCompositeMLDsaPrivateKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Gets the `CompositeMLDsa` private key from this certificate.

Parameters:

- `certificate`: The X.509 certificate that contains the private key.

Returns: The private key, or `null` if this certificate does not have a Composite ML-DSA private key.

Exceptions:

- `ArgumentNullException`: `certificate` is `null`.
- `PlatformNotSupportedException`: Retrieving a Composite ML-DSA private key from a certificate is not supported on this platform.
- `CryptographicException`: An error occurred accessing the private key.

To be added.

## X509CertificateKeyAccessors.GetCompositeMLDsaPublicKey(X509Certificate2) method

```csharp
public static System.Security.Cryptography.CompositeMLDsa? GetCompositeMLDsaPublicKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Gets the `CompositeMLDsa` public key from this certificate.

Parameters:

- `certificate`: The X.509 certificate that contains the public key.

Returns: The public key, or `null` if this certificate does not have a Composite ML-DSA public key.

Exceptions:

- `ArgumentNullException`: `certificate` is `null`.
- `PlatformNotSupportedException`: The certificate has a Composite ML-DSA public key, but the platform does not support Composite ML-DSA.
- `CryptographicException`: The public key was invalid, or otherwise could not be imported.

To be added.

## X509CertificateKeyAccessors.GetCompositeMLKemPrivateKey(X509Certificate2) method

```csharp
public static System.Security.Cryptography.CompositeMLKem? GetCompositeMLKemPrivateKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

To be added.

Parameters:

- `certificate`: To be added.

Returns: To be added.

To be added.

## X509CertificateKeyAccessors.GetCompositeMLKemPublicKey(X509Certificate2) method

```csharp
public static System.Security.Cryptography.CompositeMLKem? GetCompositeMLKemPublicKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

To be added.

Parameters:

- `certificate`: To be added.

Returns: To be added.

To be added.

## X509CertificateKeyAccessors.GetMLDsaPrivateKey(X509Certificate2) method

```csharp
public static System.Security.Cryptography.MLDsa? GetMLDsaPrivateKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Gets the `MLDsa` private key from this certificate.

Parameters:

- `certificate`: The X.509 certificate that contains the private key.

Returns: The private key, or `null` if this certificate does not have an ML-DSA private key.

Exceptions:

- `ArgumentNullException`: `certificate` is `null`.
- `PlatformNotSupportedException`: Retrieving an ML-DSA private key from a certificate is not supported on this platform.
- `CryptographicException`: An error occurred accessing the private key.

To be added.

## X509CertificateKeyAccessors.GetMLDsaPublicKey(X509Certificate2) method

```csharp
public static System.Security.Cryptography.MLDsa? GetMLDsaPublicKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Gets the `MLDsa` public key from this certificate.

Parameters:

- `certificate`: The X.509 certificate that contains the public key.

Returns: The public key, or `null` if this certificate does not have an ML-DSA public key.

Exceptions:

- `ArgumentNullException`: `certificate` is `null`.
- `PlatformNotSupportedException`: The certificate has an ML-DSA public key, but the platform does not support ML-DSA.
- `CryptographicException`: The public key was invalid, or otherwise could not be imported.

To be added.

## X509CertificateKeyAccessors.GetMLKemPrivateKey(X509Certificate2) method

```csharp
public static System.Security.Cryptography.MLKem? GetMLKemPrivateKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Gets the `MLKem` private key from this certificate.

Parameters:

- `certificate`: The X.509 certificate that contains the private key.

Returns: The private key, or `null` if this certificate does not have an ML-KEM private key.

Exceptions:

- `ArgumentNullException`: `certificate` is `null`.
- `PlatformNotSupportedException`: Retrieving an ML-KEM private key from a certificate is not supported on this platform.
- `CryptographicException`: An error occurred accessing the private key.

To be added.

## X509CertificateKeyAccessors.GetMLKemPublicKey(X509Certificate2) method

```csharp
public static System.Security.Cryptography.MLKem? GetMLKemPublicKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Gets the `MLKem` public key from this certificate.

Parameters:

- `certificate`: The X.509 certificate that contains the public key.

Returns: The public key, or `null` if this certificate does not have an ML-KEM public key.

Exceptions:

- `ArgumentNullException`: `certificate` is `null`.
- `PlatformNotSupportedException`: The certificate has an ML-KEM public key, but the platform does not support ML-KEM.
- `CryptographicException`: The public key was invalid, or otherwise could not be imported.

To be added.

## X509CertificateKeyAccessors.GetSlhDsaPrivateKey(X509Certificate2) method

```csharp
public static System.Security.Cryptography.SlhDsa? GetSlhDsaPrivateKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Gets the `SlhDsa` private key from this certificate.

Parameters:

- `certificate`: The X509 certificate that contains the private key.

Returns: The private key, or `null` if this certificate does not have an SLH-DSA private key.

Exceptions:

- `ArgumentNullException`: `certificate` is `null`.
- `PlatformNotSupportedException`: Retrieving an SLH-DSA private key from a certificate is not supported on this platform.
- `CryptographicException`: An error occurred accessing the private key.

To be added.

## X509CertificateKeyAccessors.GetSlhDsaPublicKey(X509Certificate2) method

```csharp
public static System.Security.Cryptography.SlhDsa? GetSlhDsaPublicKey (this System.Security.Cryptography.X509Certificates.X509Certificate2 certificate);
```

Gets the `SlhDsa` public key from this certificate.

Parameters:

- `certificate`: The X509 certificate that contains the public key.

Returns: The public key, or `null` if this certificate does not have an SLH-DSA public key.

Exceptions:

- `ArgumentNullException`: `certificate` is `null`.
- `PlatformNotSupportedException`: The certificate has an SLH-DSA public key, but the platform does not support SLH-DSA.
- `CryptographicException`: The public key was invalid, or otherwise could not be imported.

To be added.
