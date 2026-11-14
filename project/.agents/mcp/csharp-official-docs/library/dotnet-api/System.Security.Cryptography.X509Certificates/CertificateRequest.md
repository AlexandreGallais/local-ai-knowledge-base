---
title: "CertificateRequest class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/CertificateRequest.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CertificateRequest class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class CertificateRequest
```

Represents an abstraction over the PKCS#10 CertificationRequestInfo and the X.509 TbsCertificate.

#### Remarks
The `CertificateRequest` class allows callers to create self-signed or chain-signed X.509 Public-Key <example-value>, as well as to create a certificate signing request blob to send to a Certificate Authority (CA).

## CertificateRequest.CertificateRequest(X500DistinguishedName, CompositeMLDsa) constructor

```csharp
public CertificateRequest (System.Security.Cryptography.X509Certificates.X500DistinguishedName subjectName, System.Security.Cryptography.CompositeMLDsa key);
```

Create a CertificateRequest for the specified subject name and Composite ML-DSA key.

Parameters:

- `subjectName`: The parsed representation of the subject name for the certificate or certificate request.
- `key`: A Composite ML-DSA key whose public key <example-value> will be included in the certificate or certificate request.

This key will be used as a private key if `CertificateRequest.CreateSelfSigned` is called.

Exceptions:

- `ArgumentNullException`: `subjectName` or `key` is `null`.

To be added.

## CertificateRequest.CertificateRequest(X500DistinguishedName, MLDsa) constructor

```csharp
public CertificateRequest (System.Security.Cryptography.X509Certificates.X500DistinguishedName subjectName, System.Security.Cryptography.MLDsa key);
```

Create a CertificateRequest for the specified subject name and ML-DSA key.

Parameters:

- `subjectName`: The parsed representation of the subject name for the certificate or certificate request.
- `key`: An ML-DSA key whose public key <example-value> will be included in the certificate or certificate request.

This key will be used as a private key if `CertificateRequest.CreateSelfSigned` is called.

Exceptions:

- `ArgumentNullException`: `subjectName` or `key` is `null`.

To be added.

## CertificateRequest.CertificateRequest(X500DistinguishedName, SlhDsa) constructor

```csharp
public CertificateRequest (System.Security.Cryptography.X509Certificates.X500DistinguishedName subjectName, System.Security.Cryptography.SlhDsa key);
```

Create a CertificateRequest for the specified subject name and SLH-DSA key.

Parameters:

- `subjectName`: The parsed representation of the subject name for the certificate or certificate request.
- `key`: An SLH-DSA key whose public key <example-value> will be included in the certificate or certificate request.

This key will be used as a private key if `CertificateRequest.CreateSelfSigned` is called.

Exceptions:

- `ArgumentNullException`: `subjectName` or `key` is `null`.

To be added.

## CertificateRequest.CertificateRequest(String, CompositeMLDsa) constructor

```csharp
public CertificateRequest (string subjectName, System.Security.Cryptography.CompositeMLDsa key);
```

Create a CertificateRequest for the specified subject name and Composite ML-DSA key.

Parameters:

- `subjectName`: The parsed representation of the subject name for the certificate or certificate request.
- `key`: A Composite ML-DSA key whose public key <example-value> will be included in the certificate or certificate request.

This key will be used as a private key if `CertificateRequest.CreateSelfSigned` is called.

Exceptions:

- `ArgumentNullException`: `subjectName` or `key` is `null`.

To be added.

## CertificateRequest.CertificateRequest(String, MLDsa) constructor

```csharp
public CertificateRequest (string subjectName, System.Security.Cryptography.MLDsa key);
```

Create a CertificateRequest for the specified subject name and ML-DSA key.

Parameters:

- `subjectName`: The parsed representation of the subject name for the certificate or certificate request.
- `key`: An ML-DSA key whose public key <example-value> will be included in the certificate or certificate request.

This key will be used as a private key if `CertificateRequest.CreateSelfSigned` is called.

Exceptions:

- `ArgumentNullException`: `subjectName` or `key` is `null`.

To be added.

## CertificateRequest.CertificateRequest(String, SlhDsa) constructor

```csharp
public CertificateRequest (string subjectName, System.Security.Cryptography.SlhDsa key);
```

Create a CertificateRequest for the specified subject name and SLH-DSA key.

Parameters:

- `subjectName`: The parsed representation of the subject name for the certificate or certificate request.
- `key`: An SLH-DSA key whose public key <example-value> will be included in the certificate or certificate request.

This key will be used as a private key if `CertificateRequest.CreateSelfSigned` is called.

Exceptions:

- `ArgumentNullException`: `subjectName` or `key` is `null`.

To be added.

## CertificateRequest.CertificateRequest(X500DistinguishedName, ECDsa, HashAlgorithmName) constructor

```csharp
public CertificateRequest (System.Security.Cryptography.X509Certificates.X500DistinguishedName subjectName, System.Security.Cryptography.ECDsa key, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Initializes a new instance of the `CertificateRequest` class using the specified subject name, ECDSA key, and hash algorithm.

Parameters:

- `subjectName`: The parsed representation of the subject name for the certificate or certificate request.
- `key`: An ECDSA key whose public key <example-value> will be included in the certificate or certificate request. If the `CertificateRequest.CreateSelfSigned` method is called, this key is used as a private key.
- `hashAlgorithm`: The hash algorithm to use when signing the certificate or certificate request.

Exceptions:

- `ArgumentNullException`: `subjectName` is `null`.

-or-

`key` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.

To be added.

## CertificateRequest.CertificateRequest(X500DistinguishedName, PublicKey, HashAlgorithmName) constructor

```csharp
public CertificateRequest (System.Security.Cryptography.X509Certificates.X500DistinguishedName subjectName, System.Security.Cryptography.X509Certificates.PublicKey <example-value>, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Initializes a new instance of the `CertificateRequest` class using the specified subject name, encoded public key, and hash algorithm.

Parameters:

- `subjectName`: The parsed representation of the subject name for the certificate or certificate request.
- `publicKey`: The encoded representation of the public key to include in the certificate or certificate request.
- `hashAlgorithm`: The hash algorithm to use when signing the certificate or certificate request.

Exceptions:

- `ArgumentNullException`: `subjectName` is `null`.

-or-

`publicKey` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.

To be added.

## CertificateRequest.CertificateRequest(String, ECDsa, HashAlgorithmName) constructor

```csharp
public CertificateRequest (string subjectName, System.Security.Cryptography.ECDsa key, System.Security.Cryptography.HashAlgorithmName hashAlgorithm);
```

Initializes a new instance of the `CertificateRequest` class using the specified subject name, ECDSA key, and hash algorithm.

Parameters:

- `subjectName`: The string representation of the subject name for the certificate or certificate request.
- `key`: An ECDSA key whose public key <example-value> will be included in the certificate or certificate request. If the `CertificateRequest.CreateSelfSigned` method is called, this key is used as a private key.
- `hashAlgorithm`: The hash algorithm to use when signing the certificate or certificate request.

Exceptions:

- `ArgumentNullException`: `subjectName` is `null`.

-or-

`key` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.

To be added.

## CertificateRequest.CertificateRequest(X500DistinguishedName, RSA, HashAlgorithmName, RSASignaturePadding) constructor

```csharp
public CertificateRequest (System.Security.Cryptography.X509Certificates.X500DistinguishedName subjectName, System.Security.Cryptography.RSA key, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Initializes a new instance of the `CertificateRequest` class using the specified subject name, RSA key, and hash algorithm.

Parameters:

- `subjectName`: The parsed representation of the subject name for the certificate or certificate request.
- `key`: A RSA key whose public key <example-value> will be included in the certificate or certificate request. If the `CertificateRequest.CreateSelfSigned` method is called, this key is used as a private key.
- `hashAlgorithm`: The hash algorithm to use when signing the certificate or certificate request.
- `padding`: The RSA signature padding to apply if self-signing or being signed with an `X509Certificate2`.

Exceptions:

- `ArgumentNullException`: `subjectName` is `null`.

-or-

`key` is `null`.

-or-

`padding` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.

To be added.

## CertificateRequest.CertificateRequest(X500DistinguishedName, PublicKey, HashAlgorithmName, RSASignaturePadding) constructor

```csharp
public CertificateRequest (System.Security.Cryptography.X509Certificates.X500DistinguishedName subjectName, System.Security.Cryptography.X509Certificates.PublicKey <example-value>, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding? rsaSignaturePadding = default);
```

Creates a CertificateRequest for the specified subject name, encoded public key, hash algorithm, and RSA signature padding.

Parameters:

- `subjectName`: The parsed representation of the subject name for the certificate or certificate request.
- `publicKey`: The encoded representation of the public key to include in the certificate or certificate request.
- `hashAlgorithm`: The hash algorithm to use when signing the certificate or certificate request.
- `rsaSignaturePadding`: The RSA signature padding to use when signing this request with an RSA certificate.

To be added.

## CertificateRequest.CertificateRequest(String, RSA, HashAlgorithmName, RSASignaturePadding) constructor

```csharp
public CertificateRequest (string subjectName, System.Security.Cryptography.RSA key, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding padding);
```

Initializes a new instance of the `CertificateRequest` class using the specified subject name, RSA key, and hash algorithm.

Parameters:

- `subjectName`: The string representation of the subject name for the certificate or certificate request.
- `key`: A RSA key whose public key <example-value> will be included in the certificate or certificate request. If the `CertificateRequest.CreateSelfSigned` method is called, this key is used as a private key.
- `hashAlgorithm`: The hash algorithm to use when signing the certificate or certificate request.
- `padding`: The RSA signature padding to apply if self-signing or being signed with an `X509Certificate2`.

Exceptions:

- `ArgumentNullException`: `subjectName` is `null`.

-or-

`key` is `null`.

-or-

`padding` is `null`.
- `ArgumentException`: `hashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.

To be added.

## CertificateRequest.CertificateExtensions property

```csharp
public System.Collections.ObjectModel.Collection<System.Security.Cryptography.X509Certificates.X509Extension> CertificateExtensions { get; }
```

Gets the X.509 Certificate Extensions collection, which is a mutable collection, to include in the certificate or certificate request.

Returns: The X.509 Certificate Extensions collection to include in the certificate or certificate request.

To be added.

## CertificateRequest.HashAlgorithm property

```csharp
public System.Security.Cryptography.HashAlgorithmName HashAlgorithm { get; }
```

Gets the hash algorithm to use when signing the certificate or certificate request.

Returns: The hash algorithm to use when signing the certificate or certificate request.

To be added.

## CertificateRequest.OtherRequestAttributes property

```csharp
public System.Collections.ObjectModel.Collection<System.Security.Cryptography.AsnEncodedData> OtherRequestAttributes { get; }
```

Gets a collection representing attributes, other than the extension request attribute, to include in a certificate request.

Returns: A collection representing attributes, other than the extension request attribute, to include in a certificate request

To be added.

## CertificateRequest.PublicKey <example-value>

```csharp
public System.Security.Cryptography.X509Certificates.PublicKey <example-value> { get; }
```

Gets a representation of the public key for the certificate or certificate request.

Returns: The representation of the public key for the certificate or certificate request.

To be added.

## CertificateRequest.SubjectName property

```csharp
public System.Security.Cryptography.X509Certificates.X500DistinguishedName SubjectName { get; }
```

Gets the X.500 Distinguished Name to use as the Subject in a created certificate or certificate request.

Returns: The X.500 Distinguished Name to use as the Subject in a created certificate or certificate request.

To be added.
