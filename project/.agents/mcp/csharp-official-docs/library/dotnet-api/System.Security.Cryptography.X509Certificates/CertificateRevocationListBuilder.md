---
title: "CertificateRevocationListBuilder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/CertificateRevocationListBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CertificateRevocationListBuilder class

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public sealed class CertificateRevocationListBuilder
```

Facilitates building a Certificate Revocation List (CRL).

To be added.

## CertificateRevocationListBuilder.CertificateRevocationListBuilder() constructor

```csharp
public CertificateRevocationListBuilder ();
```

Initializes a new instance of the `CertificateRevocationListBuilder` class.

To be added.

## CertificateRevocationListBuilder.AddEntry(Byte[], DateTimeOffset>, X509RevocationReason>) method

```csharp
public void AddEntry (byte[] serialNumber, DateTimeOffset? revocationTime = default, System.Security.Cryptography.X509Certificates.X509RevocationReason? reason = default);
```

Adds the specified serial number to the revocation list with an optional revocation time and an optional revocation reason.

Parameters:

- `serialNumber`: The serial number of the certificate to revoke.
- `revocationTime`: The time the certificate was revoked, or `null` to use the current system time.
The default is `null`.
- `reason`: The reason why the certificate was revoked, or `null` to not include a reason.
The default is `null`.

Exceptions:

- `ArgumentNullException`: `serialNumber` is `null`.
- `ArgumentOutOfRangeException`: `reason` is not a supported revocation reason.
- `ArgumentException`: `serialNumber` is empty.

To be added.

## CertificateRevocationListBuilder.AddEntry(Byte>, DateTimeOffset>, X509RevocationReason>) method

```csharp
public void AddEntry (ReadOnlySpan<byte> serialNumber, DateTimeOffset? revocationTime = default, System.Security.Cryptography.X509Certificates.X509RevocationReason? reason = default);
```

Adds the specified serial number to the revocation list with an optional revocation time and an optional revocation reason.

Parameters:

- `serialNumber`: The serial number of the certificate to revoke.
- `revocationTime`: The time the certificate was revoked, or `null` to use the current system time.
The default is `null`.
- `reason`: The reason why the certificate was revoked, or `null` to not include a reason.
The default is `null`.

Exceptions:

- `ArgumentOutOfRangeException`: `reason` is not a supported revocation reason.
- `ArgumentException`: `serialNumber` is empty.

To be added.

## CertificateRevocationListBuilder.AddEntry(X509Certificate2, DateTimeOffset>, X509RevocationReason>) method

```csharp
public void AddEntry (System.Security.Cryptography.X509Certificates.X509Certificate2 certificate, DateTimeOffset? revocationTime = default, System.Security.Cryptography.X509Certificates.X509RevocationReason? reason = default);
```

Adds the specified certificate to the revocation list with an optional revocation time and an optional revocation reason.

Parameters:

- `certificate`: The certificate to revoke.
- `revocationTime`: The time the certificate was revoked, or `null` to use the current system time.
The default is `null`.
- `reason`: The reason why the certificate was revoked, or `null` to not include a reason.
The default is `null`.

Exceptions:

- `ArgumentNullException`: `certificate` is `null`.
- `ArgumentOutOfRangeException`: `reason` is not a supported revocation reason.

This method does not check that the certificate issuer is appropriate for the CRL that is being built, the certificate is just used for extracting the serial number.

## CertificateRevocationListBuilder.Build(X509Certificate2, BigInteger, DateTimeOffset, HashAlgorithmName, RSASignaturePadding, DateTimeOffset>) method

```csharp
public byte[] Build (System.Security.Cryptography.X509Certificates.X509Certificate2 issuerCertificate, System.Numerics.BigInteger crlNumber, DateTimeOffset nextUpdate, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.RSASignaturePadding? rsaSignaturePadding = default, DateTimeOffset? thisUpdate = default);
```

Builds a Certificate Revocation List (CRL) signed by the specified certificate.

Parameters:

- `issuerCertificate`: The certificate representing the Certificate Authority (CA) that is creating this Certificate Revocation List.
- `crlNumber`: The sequence number for this CRL.  Per IETF RFC 5280, this value must always increase from one CRL to the next for a given CA.
- `nextUpdate`: The latest possible time before the CA will publish a newer CRL, generally treated as an expiration date for this CRL.
- `hashAlgorithm`: The hash algorithm to use when signing the CRL.
- `rsaSignaturePadding`: For Certificate Authorities with RSA keys, this parameter is required and specifies the RSA signature padding mode to use when signing the CRL.
For all other algorithms, this parameter is ignored.
The default is `null`.
- `thisUpdate`: An optional value that specifies when this CRL was created, or `null` to use the current system time.
The default is `null`.

Returns: An array that contains the bytes of the signed CRL.

Exceptions:

- `ArgumentNullException`: `issuerCertificate` is `null`.

-or-

`hashAlgorithm` has `null` as the value of
`HashAlgorithmName.Name`.
- `ArgumentException`: `issuerCertificate` does not have an associated private key.

-or-

`issuerCertificate` uses a public key <example-value> that is unknown,
or not supported by this implementation.

-or-

`issuerCertificate` does not have a Basic <example-value> extension.

-or-

`issuerCertificate` has a Basic <example-value> extension that indicates
it is not a valid Certificate Authority certificate.

-or-

`issuerCertificate` has a Key Usage extension that lacks the
`X509KeyUsageFlags.CrlSign` usage.

-or-

`issuerCertificate` has an RSA private key but
`rsaSignaturePadding` is `null`.

-or-

`issuerCertificate` has an unknown key algorithm.

-or-

`nextUpdate` is older than `thisUpdate`.

-or-

`hashAlgorithm` has the empty string as the value of
`HashAlgorithmName.Name`.

-or-

`rsaSignaturePadding` was not recognized.
- `ArgumentOutOfRangeException`: `crlNumber` is negative.
- `CryptographicException`: an error occurred during signing.

To be added.

## CertificateRevocationListBuilder.Build(X500DistinguishedName, X509SignatureGenerator, BigInteger, DateTimeOffset, HashAlgorithmName, X509AuthorityKeyIdentifierExtension, DateTimeOffset>) method

```csharp
public byte[] Build (System.Security.Cryptography.X509Certificates.X500DistinguishedName issuerName, System.Security.Cryptography.X509Certificates.X509SignatureGenerator generator, System.Numerics.BigInteger crlNumber, DateTimeOffset nextUpdate, System.Security.Cryptography.HashAlgorithmName hashAlgorithm, System.Security.Cryptography.X509Certificates.X509AuthorityKeyIdentifierExtension authorityKeyIdentifier, DateTimeOffset? thisUpdate = default);
```

Builds a Certificate Revocation List (CRL).

Parameters:

- `issuerName`: The subject name of the certificate for the Certificate Authority (CA) that is issuing this CRL.
- `generator`: A signature generator to produce the CA signature for this CRL.
- `crlNumber`: The sequence number for this CRL.  Per IETF RFC 5280, this value must always increase from one CRL to the next for a given CA.
- `nextUpdate`: The latest possible time before the CA will publish a newer CRL, generally treated as an expiration date for this CRL.
- `hashAlgorithm`: The hash algorithm to use when signing the CRL.
- `authorityKeyIdentifier`: The Authority Key <example-value> to use in this CRL, identifying the CA certificate.
- `thisUpdate`: An optional value that specifies when this CRL was created, or `null` to use the current system time.
The default is `null`.

Returns: An array that contains the bytes of the signed CRL.

Exceptions:

- `ArgumentNullException`: `issuerName`, `generator`, or
`authorityKeyIdentifier` is `null`.

-or-

`hashAlgorithm` has `null` as the value of
`HashAlgorithmName.Name`.
- `ArgumentException`: `nextUpdate` is older than `thisUpdate`.

-or-

`hashAlgorithm` has the empty string as the value of
`HashAlgorithmName.Name`.
- `ArgumentOutOfRangeException`: `crlNumber` is negative.
- `CryptographicException`: an error occurred during signing.

To be added.

## CertificateRevocationListBuilder.BuildCrlDistributionPointExtension(String>, Boolean) method

```csharp
public static System.Security.Cryptography.X509Certificates.X509Extension BuildCrlDistributionPointExtension (System.Collections.Generic.IEnumerable<string> uris, bool critical = false);
```

Builds a CRL Distribution Point Extension with the specified retrieval URIs.

Parameters:

- `uris`: The URIs to include as distribution points for the relevant Certificate Revocation List (CRL).
- `critical`: `true` to mark the extension as critical; otherwise, `false`.
The default is `false`.

Returns: An object suitable for use as a CRL Distribution Point Extension.

Exceptions:

- `ArgumentNullException`: `uris` is `null`.
- `ArgumentException`: `uris` contains a `null` value.

-or-

`uris` is empty.
- `CryptographicException`: One of the values in `uris`
contains characters outside of the International Alphabet 5 (IA5) character space
(which is equivalent to 7-bit US-ASCII).

To be added.

## CertificateRevocationListBuilder.Load(Byte[], BigInteger) method

```csharp
public static System.Security.Cryptography.X509Certificates.CertificateRevocationListBuilder Load (byte[] currentCrl, out System.Numerics.BigInteger currentCrlNumber);
```

Decodes the specified Certificate Revocation List (CRL) and produces a `CertificateRevocationListBuilder` with all of the revocation entries from the decoded CRL.

Parameters:

- `currentCrl`: The DER-encoded CRL to decode.
- `currentCrlNumber`: When this method returns, contains the CRL sequence number from the decoded CRL.
This parameter is treated as uninitialized.

Returns: A new builder that has the same revocation entries as the decoded CRL.

Exceptions:

- `ArgumentNullException`: `currentCrl` is `null`.
- `CryptographicException`: `currentCrl` could not be decoded.

-or-

`currentCrl` decoded successfully, but decoding did not
need all of the bytes provided in the array.

To be added.

## CertificateRevocationListBuilder.Load(Byte>, BigInteger, Int32) method

```csharp
public static System.Security.Cryptography.X509Certificates.CertificateRevocationListBuilder Load (ReadOnlySpan<byte> currentCrl, out System.Numerics.BigInteger currentCrlNumber, out int bytesConsumed);
```

Decodes the specified Certificate Revocation List (CRL) and produces a `CertificateRevocationListBuilder` with all of the revocation entries from the decoded CRL.

Parameters:

- `currentCrl`: The DER-encoded CRL to decode.
- `currentCrlNumber`: When this method returns, contains the CRL sequence number from the decoded CRL.
This parameter is treated as uninitialized.
- `bytesConsumed`: When this method returns, contains the number of bytes that were read from `currentCrl` while decoding.

Returns: A new builder that has the same revocation entries as the decoded CRL.

Exceptions:

- `CryptographicException`: `currentCrl` could not be decoded.

To be added.

## CertificateRevocationListBuilder.LoadPem(Char>, BigInteger) method

```csharp
public static System.Security.Cryptography.X509Certificates.CertificateRevocationListBuilder LoadPem (ReadOnlySpan<char> currentCrl, out System.Numerics.BigInteger currentCrlNumber);
```

Decodes the specified Certificate Revocation List (CRL) and produces a `CertificateRevocationListBuilder` with all of the revocation entries from the decoded CRL.

Parameters:

- `currentCrl`: The PEM-encoded CRL to decode.
- `currentCrlNumber`: When this method returns, contains the CRL sequence number from the decoded CRL.
This parameter is treated as uninitialized.

Returns: A new builder that has the same revocation entries as the decoded CRL.

Exceptions:

- `CryptographicException`: `currentCrl` did not contain a well-formed PEM payload with
an `X509 CRL` label.

-or-

`currentCrl` could not be decoded.

This loads the first well-formed PEM found with an `X509 CRL` label.

## CertificateRevocationListBuilder.LoadPem(String, BigInteger) method

```csharp
public static System.Security.Cryptography.X509Certificates.CertificateRevocationListBuilder LoadPem (string currentCrl, out System.Numerics.BigInteger currentCrlNumber);
```

Decodes the specified Certificate Revocation List (CRL) and produces a `CertificateRevocationListBuilder` with all of the revocation entries from the decoded CRL.

Parameters:

- `currentCrl`: The PEM-encoded CRL to decode.
- `currentCrlNumber`: When this method returns, contains the CRL sequence number from the decoded CRL.
This parameter is treated as uninitialized.

Returns: A new builder that has the same revocation entries as the decoded CRL.

Exceptions:

- `ArgumentNullException`: `currentCrl` is `null`.
- `CryptographicException`: `currentCrl` did not contain a well-formed PEM payload with
an `X509 CRL` label.

-or-

`currentCrl` could not be decoded.

This loads the first well-formed PEM found with an `X509 CRL` label.

## CertificateRevocationListBuilder.RemoveEntry(Byte[]) method

```csharp
public bool RemoveEntry (byte[] serialNumber);
```

Removes the specified serial number from the revocation list.

Parameters:

- `serialNumber`: The serial number to remove.

Returns: `true` if the serial number was found in the list and was removed; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `serialNumber` is `null`.

This method assumes that the same serial number is not present on the list more than once, and thus stops at the first match.

## CertificateRevocationListBuilder.RemoveEntry(Byte>) method

```csharp
public bool RemoveEntry (ReadOnlySpan<byte> serialNumber);
```

Removes the specified serial number from the revocation list.

Parameters:

- `serialNumber`: The serial number to remove.

Returns: `true` if the serial number was found in the list and was removed; otherwise, `false`.

This method assumes that the same serial number is not present on the list more than once, and thus stops at the first match.
