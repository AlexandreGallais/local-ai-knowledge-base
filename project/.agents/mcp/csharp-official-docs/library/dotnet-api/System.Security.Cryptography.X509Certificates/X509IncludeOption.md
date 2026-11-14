---
title: "X509IncludeOption enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509IncludeOption.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509IncludeOption enum

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public enum X509IncludeOption
```

Specifies how much of the X.509 certificate chain should be included in the X.509 data.

#### Remarks
This enumeration specifies how much of the certificate chain to include in X.509 data. You can choose to include the end certificate only; the whole chain; or the whole chain except the root certificate, which is the default.

## X509IncludeOption.EndCertOnly field

```csharp
EndCertOnly
```

Only the end certificate is included in the X.509 chain information.

## X509IncludeOption.ExcludeRoot field

```csharp
ExcludeRoot
```

The entire X.509 chain is included except for the root certificate.

## X509IncludeOption.None field

```csharp
None
```

No X.509 chain information is included.

## X509IncludeOption.WholeChain field

```csharp
WholeChain
```

The entire X.509 chain is included.
