---
title: "X509ChainTrustMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509ChainTrustMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509ChainTrustMode enum

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public enum X509ChainTrustMode
```

The mode determining the root trust for building the certificate chain.

To be added.

## X509ChainTrustMode.CustomRootTrust field

```csharp
CustomRootTrust
```

When this value is used, the `X509ChainPolicy.CustomTrustStore` will be used instead of the default root trust.

## X509ChainTrustMode.System field

```csharp
System
```

Use the default (system) root trust.
