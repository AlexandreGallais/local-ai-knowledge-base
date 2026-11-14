---
title: "CertificateRequestLoadOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/CertificateRequestLoadOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CertificateRequestLoadOptions enum

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public enum CertificateRequestLoadOptions
```

Specifies options when loading a `CertificateRequest`.

To be added.

## CertificateRequestLoadOptions.Default field

```csharp
Default
```

Load the certificate request with default options.

## CertificateRequestLoadOptions.SkipSignatureValidation field

```csharp
SkipSignatureValidation
```

When loading the request, do not check if the embedded public key <example-value> the request signature.

## CertificateRequestLoadOptions.UnsafeLoadCertificateExtensions field

```csharp
UnsafeLoadCertificateExtensions
```

When loading the request, populate the `CertificateRequest.CertificateExtensions` collection based on the PKCS#9 Extension Request attribute (1.2.840.113549.1.9.14).
