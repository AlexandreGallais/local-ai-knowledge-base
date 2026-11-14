---
title: "Breaking change - APIs Removed from System.Security.Cryptography.Pkcs netstandard2.0"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/cryptography/9.0/api-removed-pkcs.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# APIs Removed from System.Security.Cryptography.Pkcs netstandard2.0

The `netstandard2.0` build of the `System.Security.Cryptography.Pkcs` NuGet package versions 9.0.0 through 9.0.2 included APIs that are not present in .NET Framework. Calling these APIs from a .NET Standard library that runs on .NET Framework will throw `System.MissingMemberException`. These members were mistakenly included and have been removed in version 9.0.3 of the package.

## Version introduced

.NET 9

## Previous behavior

When referencing `System.Security.Cryptography.Pkcs` version 9.0.0 in a project targeting `netstandard2.0`, the compilation would succeed when referencing the `System.Security.Cryptography.Pkcs.CmsSigner.PrivateKey` property. However, if the library ran on .NET Framework, accessing the property would trigger a `System.MissingMemberException`.

## New behavior

Accessing any of the removed members now results in a compilation failure, rather than a runtime failure.

## Type of breaking change

This is a source incompatible change.

## Reason for change

The members were accidentally included due to a change in how the NuGet package was produced. As these members cannot work on .NET Framework, they should never have been listed as available to .NET Standard 2.0.

## Recommended action

If these additional members are needed, compile specifically for a TFM that includes them, such as `net8.0`.

## Affected APIs

- `System.Security.Cryptography.Pkcs.CmsSigner.#ctor*`
- `System.Security.Cryptography.Pkcs.CmsSigner.PrivateKey`
- `System.Security.Cryptography.Pkcs.CmsSigner.SignaturePadding`
- `System.Security.Cryptography.Pkcs.ContentInfo.GetContentType(System.ReadOnlySpan{System.Byte})`
- `System.Security.Cryptography.Pkcs.EnvelopedCms.Decode(System.ReadOnlySpan{System.Byte})`
- `System.Security.Cryptography.Pkcs.EnvelopedCms.Decrypt(System.Security.Cryptography.Pkcs.RecipientInfo,System.Security.Cryptography.AsymmetricAlgorithm)`
- `System.Security.Cryptography.Pkcs.SignedCms.AddCertificate(System.Security.Cryptography.X509Certificates.X509Certificate2)`
- `System.Security.Cryptography.Pkcs.SignedCms.Decode(System.ReadOnlySpan{System.Byte})`
- `System.Security.Cryptography.Pkcs.SignedCms.RemoveCertificate(System.Security.Cryptography.X509Certificates.X509Certificate2)`
- `System.Security.Cryptography.Pkcs.SignerInfo.AddUnsignedAttribute(System.Security.Cryptography.AsnEncodedData)`
- `System.Security.Cryptography.Pkcs.SignerInfo.SignatureAlgorithm`
- `System.Security.Cryptography.Pkcs.SignerInfo.GetSignature`
- `System.Security.Cryptography.Pkcs.SignerInfo.RemoveUnsignedAttribute(System.Security.Cryptography.AsnEncodedData)`
- `System.Security.Cryptography.Pkcs.SubjectIdentifier.MatchesCertificate(System.Security.Cryptography.X509Certificates.X509Certificate2)`
