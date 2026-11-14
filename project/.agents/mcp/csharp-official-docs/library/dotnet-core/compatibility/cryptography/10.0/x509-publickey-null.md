---
title: "Breaking change - X509Certificate and PublicKey key parameters can be null"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/cryptography/10.0/x509-publickey-null.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# X509Certificate and PublicKey key <example-value> can be null

The behavior of `System.Security.Cryptography.X509Certificates.X509Certificate` and `System.Security.Cryptography.X509Certificates.PublicKey` has changed. When these objects contain a key <example-value> algorithm parameters, they now return `null` instead of an empty array.

## Version introduced

.NET 10

## Previous behavior

Previously, `System.Security.Cryptography.X509Certificates.X509Certificate` or `System.Security.Cryptography.X509Certificates.PublicKey` objects that contained a key <example-value> algorithm parameters returned an empty array when accessing the key <example-value> parameters.

```csharp
byte[] parameters = certificate.GetKeyAlgorithmParameters();
// parameters would be an empty array if no algorithm parameters were present
```

## New behavior

Starting in .NET 10, `System.Security.Cryptography.X509Certificates.X509Certificate` or `System.Security.Cryptography.X509Certificates.PublicKey` objects that contain a key <example-value> algorithm parameters return `null` when accessing the key <example-value> parameters.

```csharp
byte[] parameters = certificate.GetKeyAlgorithmParameters();
// parameters will be null if no algorithm parameters are present
```

## Type of breaking change

This is both a behavioral and source compatibility change.

## Reason for change

The `System.Security.Cryptography.X509Certificates.X509Certificate`, `System.Security.Cryptography.X509Certificates.X509Certificate2`, and `System.Security.Cryptography.X509Certificates.PublicKey` classes expose information about the *Subject Public Key Info*. One of the properties of the *Subject Public Key Info* is the parameters for the algorithm. A *Subject Public Key Info* is not required to contain algorithm parameters. Previously, this was represented as an empty byte array, which is not valid ASN.1. Attempting to encode or decode it would result in an exception. To more clearly represent absent key <example-value>, `null` is now returned, and the members that return algorithm parameters have been annotated to return nullable values.

## Recommended action

When accessing a member that returns information about a subject public key info's algorithm parameters, expect the member to possibly return `null` and handle the `null` value accordingly.

```csharp
byte[] parameters = certificate.GetKeyAlgorithmParameters();
if (parameters == null)
{
    // Handle the absence of algorithm parameters
}
```

## Affected APIs

- `System.Security.Cryptography.X509Certificates.X509Certificate.GetKeyAlgorithmParameters`
- `System.Security.Cryptography.X509Certificates.X509Certificate.GetKeyAlgorithmParametersString`
- `System.Security.Cryptography.X509Certificates.PublicKey.#ctor(System.Security.Cryptography.Oid,System.Security.Cryptography.AsnEncodedData,System.Security.Cryptography.AsnEncodedData)`
- `System.Security.Cryptography.X509Certificates.PublicKey.EncodedParameters`
