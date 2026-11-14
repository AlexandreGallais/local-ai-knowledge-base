---
title: "CertificateRequest class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/CertificateRequest.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CertificateRequest class (part 3 of 3)

## CertificateRequest.LoadSigningRequest(Byte[], HashAlgorithmName, CertificateRequestLoadOptions, RSASignaturePadding) method

```csharp
public static System.Security.Cryptography.X509Certificates.CertificateRequest LoadSigningRequest (byte[] pkcs10, System.Security.Cryptography.HashAlgorithmName signerHashAlgorithm, System.Security.Cryptography.X509Certificates.CertificateRequestLoadOptions options = System.Security.Cryptography.X509Certificates.CertificateRequestLoadOptions.Default, System.Security.Cryptography.RSASignaturePadding? signerSignaturePadding = default);
```

Loads a binary PKCS#10 signing request as a new CertificateRequest instance.

Parameters:

- `pkcs10`: The binary PKCS#10 signing request to load.
- `signerHashAlgorithm`: The hash algorithm to use when creating a certificate or new signing request.
- `options`: A bitwise combination of the enumeration values that specifies how to load the request.
- `signerSignaturePadding`: The RSA Signature Padding to use when creating a certificate from this request. For RSA signing certificates using the default signature generator, this parameter is required; otherwise, this parameter is ignored.

Returns: A CertificateRequest instance that contains the information from the signing request.

Exceptions:

- `ArgumentException`: `signerHashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `ArgumentNullException`: `pkcs10` is `null`.
- `ArgumentOutOfRangeException`: `options` specifies a value that is not supported.
- `CryptographicException`: `pkcs10` is not a valid PKCS#10 signing request.

-or-

`pkcs10` contains a signature that could not be verified using its embedded public key.

To be added.

## CertificateRequest.LoadSigningRequest(Byte>, HashAlgorithmName, Int32, CertificateRequestLoadOptions, RSASignaturePadding) method

```csharp
public static System.Security.Cryptography.X509Certificates.CertificateRequest LoadSigningRequest (ReadOnlySpan<byte> pkcs10, System.Security.Cryptography.HashAlgorithmName signerHashAlgorithm, out int bytesConsumed, System.Security.Cryptography.X509Certificates.CertificateRequestLoadOptions options = System.Security.Cryptography.X509Certificates.CertificateRequestLoadOptions.Default, System.Security.Cryptography.RSASignaturePadding? signerSignaturePadding = default);
```

Loads a binary PKCS#10 signing request as a new CertificateRequest instance.

Parameters:

- `pkcs10`: The binary PKCS#10 signing request to load.
- `signerHashAlgorithm`: The hash algorithm to use when creating a certificate or new signing request.
- `bytesConsumed`: When this method returns, contains a value that indicates the number of bytes read from `pkcs10`. This parameter is treated as uninitialized.
- `options`: A bitwise combination of the enumeration values that specifies how to load the request.
- `signerSignaturePadding`: The RSA Signature Padding to use when creating a certificate from this request. For RSA signing certificates using the default signature generator, this parameter is required; otherwise, this parameter is ignored.

Returns: A CertificateRequest instance that contains the information from the signing request.

Exceptions:

- `ArgumentException`: `signerHashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `ArgumentNullException`: `pkcs10` is `null`.
- `ArgumentOutOfRangeException`: `options` specifies a value that is not supported.
- `CryptographicException`: `pkcs10` is not a valid PKCS#10 signing request.

-or-

`pkcs10` contains a signature that could not be verified using its embedded public key.

To be added.

## CertificateRequest.LoadSigningRequestPem(Char>, HashAlgorithmName, CertificateRequestLoadOptions, RSASignaturePadding) method

```csharp
public static System.Security.Cryptography.X509Certificates.CertificateRequest LoadSigningRequestPem (ReadOnlySpan<char> pkcs10Pem, System.Security.Cryptography.HashAlgorithmName signerHashAlgorithm, System.Security.Cryptography.X509Certificates.CertificateRequestLoadOptions options = System.Security.Cryptography.X509Certificates.CertificateRequestLoadOptions.Default, System.Security.Cryptography.RSASignaturePadding? signerSignaturePadding = default);
```

Loads the first PEM-encoded PKCS#10 signing request from `pkcs10Pem` as a new CertificateRequest instance.

Parameters:

- `pkcs10Pem`: The PEM-encoded PKCS#10 signing request to load.
- `signerHashAlgorithm`: The hash algorithm to use when creating a certificate or new signing request.
- `options`: A bitwise combination of the enumeration values that specifies how to load the request.
- `signerSignaturePadding`: The RSA Signature Padding to use when creating a certificate from this request. For RSA signing certificates using the default signature generator, this parameter is required; otherwise, this parameter is ignored.

Returns: A CertificateRequest instance that contains the information from the signing request.

Exceptions:

- `ArgumentException`: `signerHashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `ArgumentNullException`: `pkcs10Pem` is `null`.
- `ArgumentOutOfRangeException`: `options` specifies a value that is not supported.
- `CryptographicException`: `pkcs10Pem` does not contain a PKCS#10 signing request.

-or-

`pkcs10Pem` is not a valid PKCS#10 signing request.

-or-

`pkcs10Pem` contains a signature that could not be verified using its embedded public key.

To be added.

## CertificateRequest.LoadSigningRequestPem(String, HashAlgorithmName, CertificateRequestLoadOptions, RSASignaturePadding) method

```csharp
public static System.Security.Cryptography.X509Certificates.CertificateRequest LoadSigningRequestPem (string pkcs10Pem, System.Security.Cryptography.HashAlgorithmName signerHashAlgorithm, System.Security.Cryptography.X509Certificates.CertificateRequestLoadOptions options = System.Security.Cryptography.X509Certificates.CertificateRequestLoadOptions.Default, System.Security.Cryptography.RSASignaturePadding? signerSignaturePadding = default);
```

Loads the first PEM-encoded PKCS#10 signing request from `pkcs10Pem` as a new CertificateRequest instance.

Parameters:

- `pkcs10Pem`: The PEM-encoded PKCS#10 signing request to load.
- `signerHashAlgorithm`: The hash algorithm to use when creating a certificate or new signing request.
- `options`: A bitwise combination of the enumeration values that specifies how to load the request.
- `signerSignaturePadding`: The RSA Signature Padding to use when creating a certificate from this request. For RSA signing certificates using the default signature generator, this parameter is required; otherwise, this parameter is ignored.

Returns: A CertificateRequest instance that contains the information from the signing request.

Exceptions:

- `ArgumentException`: `signerHashAlgorithm`.`HashAlgorithmName.Name` is `null` or `String.Empty`.
- `ArgumentNullException`: `pkcs10Pem` is `null`.
- `ArgumentOutOfRangeException`: `options` specifies a value that is not supported.
- `CryptographicException`: `pkcs10Pem` does not contain a PKCS#10 signing request.

-or-

`pkcs10Pem` is not a valid PKCS#10 signing request.

-or-

`pkcs10Pem` contains a signature that could not be verified using its embedded public key.

To be added.
