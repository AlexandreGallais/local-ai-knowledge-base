---
title: "X509Certificate2Collection class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509Certificate2Collection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509Certificate2Collection class (part 3 of 3)

## X509Certificate2Collection.TryExportCertificatePems(Char>, Int32) method

```csharp
public bool TryExportCertificatePems (Span<char> destination, out int charsWritten);
```

Attempts to export the public X.509 certificates, encoded as PEM.

Parameters:

- `destination`: The buffer to receive the PEM encoded certificates.
- `charsWritten`: When this method returns, the total number of characters written to `destination`.

Returns: `true` if `destination` was large enough to receive the encoded PEMs; otherwise, `false`.

Exceptions:

- `CryptographicException`: A certificate is corrupt, in an invalid state, or could not be exported
to PEM.

#### Remarks

A PEM-encoded X.509 certificate collection will contain certificates
where each certificate begins with `-----BEGIN CERTIFICATE-----`
and ends with `-----END CERTIFICATE-----`, with the base64 encoded DER
contents of the certificate between the PEM boundaries. Each certificate is
separated by a single line-feed character.

Certificates are encoded according to the IETF RFC 7468 "strict" encoding rules.

## X509Certificate2Collection.TryExportPkcs7Pem(Char>, Int32) method

```csharp
public bool TryExportPkcs7Pem (Span<char> destination, out int charsWritten);
```

Attempts to export the X.509 public certificates as a PKCS7 certificate collection, encoded as PEM.

Parameters:

- `destination`: The buffer to receive the PEM encoded PKCS7 collection.
- `charsWritten`: When this method returns, the total number of characters written to `destination`.

Returns: `true` if `destination` was large enough to receive PEM encoded PKCS7 certificate collection; otherwise, `false`.

Exceptions:

- `CryptographicException`: A certificate is corrupt, in an invalid state, or could not be exported
to PEM.

To be added.
