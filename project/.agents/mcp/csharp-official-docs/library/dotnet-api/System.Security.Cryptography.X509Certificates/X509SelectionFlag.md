---
title: "X509SelectionFlag enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509SelectionFlag.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509SelectionFlag enum

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public enum X509SelectionFlag
```

Specifies the type of selection requested using the `SelectFromCollection` method.

#### Remarks
This flag represents either a single or multiple certificate selection using the `X509Certificate2UI.SelectFromCollection` method.

#### Examples
The following code example demonstrates how to use the selection flag with the `X509Certificate2UI.SelectFromCollection` method. This code example is part of a larger example provided for the `X509Store` class. The larger example opens the current user's personal certificate store, allows the user to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate the user selects.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509SelectionFlag.MultiSelection field

```csharp
MultiSelection
```

A multiple selection. The user can use the SHIFT or CRTL keys to select more than one X.509 certificate.

## X509SelectionFlag.SingleSelection field

```csharp
SingleSelection
```

A single selection. The UI allows the user to select one X.509 certificate.
