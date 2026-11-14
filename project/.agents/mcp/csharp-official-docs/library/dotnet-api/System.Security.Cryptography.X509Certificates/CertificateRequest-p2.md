---
title: "CertificateRequest class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/CertificateRequest.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CertificateRequest class (part 2 of 3)

## CertificateRequest.Create(X509Certificate2, DateTimeOffset, DateTimeOffset, Byte[]) method

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2 Create (System.Security.Cryptography.X509Certificates.X509Certificate2 issuerCertificate, DateTimeOffset notBefore, DateTimeOffset notAfter, byte[] serialNumber);
```

Creates a certificate using the established subject, key, and optional extensions using the specified certificate as the issuer.

Parameters:

- `issuerCertificate`: An `X509Certificate2` instance representing the issuing Certificate Authority (CA).
- `notBefore`: The oldest date and time when this certificate is considered valid. Typically `DateTimeOffset.UtcNow`, plus or minus a few seconds.
- `notAfter`: The date and time when this certificate is no longer considered valid.
- `serialNumber`: The serial number to use for the new certificate. This value should be unique per issuer. The value is interpreted as an unsigned integer of arbitrary size in big-endian byte ordering. RFC 3280 recommends confining it to 20 bytes or less.

Returns: An `X509Certificate2` object with the specified values. The returned object won't assert `X509Certificate2.HasPrivateKey`.

Exceptions:

- `ArgumentNullException`: `issuerCertificate` is `null`.
- `ArgumentException`: The `issuerCertificate` doesn't contain a private key.

-or-

The type of signing key <example-value> by `issuerCertificate` couldn't be determined.

-or-

`notAfter` represents a date and time that happens earlier than `notBefore`.

-or-

`serialNumber` is zero length or `null`.

-or-

`issuerCertificate` has a different key <example-value> than the requested certificate.

-or-

The `X509Certificate2.HasPrivateKey` value for `issuerCertificate` is `false`.
- `InvalidOperationException`: `issuerCertificate` is an RSA certificate and the current object was created using a constructor that doesn't accept a `padding` parameter.
- `ArgumentOutOfRangeException`: The `CertificateRequest.HashAlgorithm` property value is not supported.

#### Remarks

This method does not support using MD5 or SHA-1 as the hash algorithm for the certificate signature.
If you need an MD5 or SHA-1 based certificate signature, you need to implement a custom `X509SignatureGenerator` and call `Create`.

## CertificateRequest.Create(X509Certificate2, DateTimeOffset, DateTimeOffset, Byte>) method

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2 Create (System.Security.Cryptography.X509Certificates.X509Certificate2 issuerCertificate, DateTimeOffset notBefore, DateTimeOffset notAfter, ReadOnlySpan<byte> serialNumber);
```

Create a certificate using the established subject, key, and optional extensions using the provided certificate as the issuer.

Parameters:

- `issuerCertificate`: An X509Certificate2 instance representing the issuing Certificate Authority (CA).
- `notBefore`: The oldest date and time where this certificate is considered valid.
Typically `DateTimeOffset.UtcNow`, plus or minus a few seconds.
- `notAfter`: The date and time where this certificate is no longer considered valid.
- `serialNumber`: The serial number to use for the new certificate. This value should be unique per issuer.
The value is interpreted as an unsigned (big) integer in big endian byte ordering.

Returns: A certificate with the specified values. The returned object will not assert `X509Certificate2.HasPrivateKey`.

Exceptions:

- `ArgumentNullException`: `issuerCertificate` is `null`.
- `ArgumentException`: The `X509Certificate2.HasPrivateKey` value for `issuerCertificate` is `false`.
- `ArgumentException`: The type of signing key <example-value> by `issuerCertificate` could not be determined.
- `ArgumentException`: `notAfter` represents a date and time before `notBefore`.
- `ArgumentException`: `serialNumber` has length 0.
- `ArgumentException`: `issuerCertificate` has a different key <example-value> than the requested certificate.
- `InvalidOperationException`: `issuerCertificate` is an RSA certificate and this object was created via a constructor that doesn't accept an `RSASignaturePadding` value.

To be added.

## CertificateRequest.Create(X500DistinguishedName, X509SignatureGenerator, DateTimeOffset, DateTimeOffset, Byte[]) method

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2 Create (System.Security.Cryptography.X509Certificates.X500DistinguishedName issuerName, System.Security.Cryptography.X509Certificates.X509SignatureGenerator generator, DateTimeOffset notBefore, DateTimeOffset notAfter, byte[] serialNumber);
```

Signs the current certificate request to create a chain-signed or self-signed certificate.

Parameters:

- `issuerName`: The `X500DistinguishedName` for the issuer.
- `generator`: An `X509SignatureGenerator` object representing the issuing certificate authority.
- `notBefore`: The oldest date and time when this certificate is considered valid. Typically `DateTimeOffset.UtcNow`, plus or minus a few seconds.
- `notAfter`: The date and time when this certificate is no longer considered valid.
- `serialNumber`: The serial number to use for the new certificate. This value should be unique per issuer. The value is interpreted as an unsigned integer of arbitrary size in big-endian byte ordering. RFC 3280 recommends confining it to 20 bytes or less.

Returns: An `X509Certificate2` object with the specified values. The returned object won't assert `X509Certificate2.HasPrivateKey`.

Exceptions:

- `ArgumentNullException`: `issuerName` is `null`.

-or-

`generator` is `null`.
- `ArgumentException`: `notAfter` represents a date and time that happens earlier than `notBefore`.

-or-

`serialNumber` is zero length or `null`.
- `CryptographicException`: An error occurs during the signing operation.
- `InvalidOperationException`: The signature generator requires a non-default value for `CertificateRequest.HashAlgorithm`, but this object was created without one being provided.

To be added.

## CertificateRequest.Create(X500DistinguishedName, X509SignatureGenerator, DateTimeOffset, DateTimeOffset, Byte>) method

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2 Create (System.Security.Cryptography.X509Certificates.X500DistinguishedName issuerName, System.Security.Cryptography.X509Certificates.X509SignatureGenerator generator, DateTimeOffset notBefore, DateTimeOffset notAfter, ReadOnlySpan<byte> serialNumber);
```

Sign the current certificate request to create a chain-signed or self-signed certificate.

Parameters:

- `issuerName`: The distinguished name of the issuer.
- `generator`: The issuing certificate authority.
- `notBefore`: The oldest date and time where this certificate is considered valid.
Typically `DateTimeOffset.UtcNow`, plus or minus a few seconds.
- `notAfter`: The date and time where this certificate is no longer considered valid.
- `serialNumber`: The serial number to use for the new certificate. This value should be unique per issuer.
The value is interpreted as an unsigned (big) integer in big endian byte ordering.

Returns: A certificate with the specified values. The returned object will not assert `X509Certificate2.HasPrivateKey`.

Exceptions:

- `ArgumentNullException`: `issuerName` or `generator` is `null`.
- `ArgumentException`: `notAfter` represents a date and time before `notBefore`.

-or

`serialNumber` has length 0.
- `CryptographicException`: An error occurred during the signing operation.
- `InvalidOperationException`: The signature generator requires a non-default value for `CertificateRequest.HashAlgorithm`, but this object was created without one being provided.

To be added.

## CertificateRequest.CreateSelfSigned(DateTimeOffset, DateTimeOffset) method

```csharp
public System.Security.Cryptography.X509Certificates.X509Certificate2 CreateSelfSigned (DateTimeOffset notBefore, DateTimeOffset notAfter);
```

Creates a self-signed certificate using the established subject, key, and optional extensions.

Parameters:

- `notBefore`: The oldest date and time when this certificate is considered valid. Typically `DateTimeOffset.UtcNow`, plus or minus a few seconds.
- `notAfter`: The date and time when this certificate is no longer considered valid.

Returns: An `X509Certificate2` object with the specified values. The returned object will assert `X509Certificate2.HasPrivateKey`.

Exceptions:

- `ArgumentException`: `notAfter` represents a date and time that happens earlier than `notBefore`.
- `InvalidOperationException`: The current object was created using a constructor that doesn't accept a signing key.
- `CryptographicException`: An error occurs during the certificate creation process.
- `ArgumentOutOfRangeException`: The `CertificateRequest.HashAlgorithm` property value is not supported.

#### Remarks

This method does not support using MD5 or SHA-1 as the hash algorithm for the certificate signature.
If you need an MD5 or SHA-1 based certificate signature, you need to implement a custom `X509SignatureGenerator` and call `Create`.

## CertificateRequest.CreateSigningRequest() method

```csharp
public byte[] CreateSigningRequest ();
```

Creates an ASN.1 DER-encoded PKCS#10 CertificationRequest value representing the state of the current object.

Returns: A DER-encoded certificate signing request.

Exceptions:

- `InvalidOperationException`: The current object was created using a constructor that doesn't accept a signing key.
- `ArgumentOutOfRangeException`: The `CertificateRequest.HashAlgorithm` property value is not supported.
- `CryptographicException`: A cryptographic error occurs while creating the signing request.

#### Remarks

This method does not support using MD5 or SHA-1 as the hash algorithm for the signing request signature.
If you need an MD5 or SHA-1 based signing request, you need to implement a custom `X509SignatureGenerator` and call `CreateSigningRequest`.

When submitting a certificate signing request via a web browser, or other graphical or textual
interface, the input is frequently expected to be in the Privacy Enhanced Mail (PEM) format,
instead of the DER binary format. To convert the return value to PEM format, make a string
consisting of `-----BEGIN CERTIFICATE REQUEST-----`, a newline, the Base-64-encoded
representation of the request (by convention, linewrapped at 64 characters), a newline,
and `-----END CERTIFICATE REQUEST-----`.

```csharp
public static string PemEncodeSigningRequest(CertificateRequest request, PkcsSignatureGenerator generator)
{
    byte[] pkcs10 = request.CreateSigningRequest(generator);
    StringBuilder builder = new StringBuilder();

    builder.AppendLine("-----BEGIN CERTIFICATE REQUEST-----");

    string base64 = Convert.ToBase64String(pkcs10);

    int offset = 0;
    const int LineLength = 64;

    while (offset < base64.Length)
    {
        int lineEnd = Math.Min(offset + LineLength, base64.Length);
        builder.AppendLine(base64.Substring(offset, lineEnd - offset));
        offset = lineEnd;
     }

     builder.AppendLine("-----END CERTIFICATE REQUEST-----");
     return builder.ToString();
}
```

## CertificateRequest.CreateSigningRequest(X509SignatureGenerator) method

```csharp
public byte[] CreateSigningRequest (System.Security.Cryptography.X509Certificates.X509SignatureGenerator signatureGenerator);
```

Creates an ASN.1 DER-encoded PKCS#10 CertificationRequest representing the current state of the current object using the provided signature generator.

Parameters:

- `signatureGenerator`: The signature generator with which to sign the request.

Returns: A DER-encoded certificate signing request.

Exceptions:

- `ArgumentNullException`: `signatureGenerator` is `null`.
- `CryptographicException`: A cryptographic error occurs while creating the signing request.
- `InvalidOperationException`: `CertificateRequest.OtherRequestAttributes` contains a `null` value.

-or-

`CertificateRequest.OtherRequestAttributes` contains an entry with a `null``AsnEncodedData.Oid` value.

-or-

`CertificateRequest.OtherRequestAttributes` contains an entry representing the PKCS#9
Extension Request Attribute (1.2.840.113549.1.9.14).

-or-

`CertificateRequest.CertificateExtensions` contains a `null` value.

-or-

`CertificateRequest.CertificateExtensions` contains an entry with a `null``AsnEncodedData.Oid` value.

-or-

This object was created with a constructor that did not accept a signing key.

#### Remarks

When submitting a certificate signing request via a web browser or other graphical or textual
interface, the input is frequently expected to be in the PEM (Privacy Enhanced Mail) format,
instead of the DER binary format.

## CertificateRequest.CreateSigningRequestPem() method

```csharp
public string CreateSigningRequestPem ();
```

Creates a PEM-encoded PKCS#10 CertificationRequest representing the current state of this object using the provided signature generator.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: `CertificateRequest.OtherRequestAttributes` contains a `null` value.

-or-

`CertificateRequest.OtherRequestAttributes` contains an entry with a `null``AsnEncodedData.Oid` value.

-or-

`CertificateRequest.OtherRequestAttributes` contains an entry representing the PKCS#9
Extension Request Attribute (1.2.840.113549.1.9.14).

-or-

`CertificateRequest.CertificateExtensions` contains a `null` value.

-or-

`CertificateRequest.CertificateExtensions` contains an entry with a `null``AsnEncodedData.Oid` value.

-or-

This object was created with a constructor that did not accept a signing key.
- `CryptographicException`: A cryptographic error occurs while creating the signing request.

To be added.

## CertificateRequest.CreateSigningRequestPem(X509SignatureGenerator) method

```csharp
public string CreateSigningRequestPem (System.Security.Cryptography.X509Certificates.X509SignatureGenerator signatureGenerator);
```

Creates a PEM-encoded PKCS#10 CertificationRequest representing the current state of this object using the provided signature generator.

Parameters:

- `signatureGenerator`: A `X509SignatureGenerator` with which to sign the request.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `signatureGenerator` is `null`.
- `InvalidOperationException`: `CertificateRequest.OtherRequestAttributes` contains a `null` value.

-or-

`CertificateRequest.OtherRequestAttributes` contains an entry with a `null``AsnEncodedData.Oid` value.

-or-

`CertificateRequest.OtherRequestAttributes` contains an entry representing the PKCS#9
Extension Request Attribute (1.2.840.113549.1.9.14).

-or-

`CertificateRequest.CertificateExtensions` contains a `null` value.

-or-

`CertificateRequest.CertificateExtensions` contains an entry with a `null``AsnEncodedData.Oid` value.

-or-

This object was created with a constructor which did not accept a signing key.
- `CryptographicException`: A cryptographic error occurs while creating the signing request.

To be added.
