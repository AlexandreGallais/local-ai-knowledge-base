---
title: "X509RevocationFlag enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509RevocationFlag.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509RevocationFlag enum

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public enum X509RevocationFlag
```

Specifies which X509 certificates in the chain should be checked for revocation.

#### Remarks
Use this enumeration to specify which certificates in the chain are checked for revocation.

#### Examples
The following example opens the current user's personal certificate store, allows the user to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509RevocationFlag.EndCertificateOnly field

```csharp
EndCertificateOnly
```

Only the end certificate is checked for revocation.

## X509RevocationFlag.EntireChain field

```csharp
EntireChain
```

The entire chain of certificates is checked for revocation.

## X509RevocationFlag.ExcludeRoot field

```csharp
ExcludeRoot
```

The entire chain, except the root certificate, is checked for revocation.
