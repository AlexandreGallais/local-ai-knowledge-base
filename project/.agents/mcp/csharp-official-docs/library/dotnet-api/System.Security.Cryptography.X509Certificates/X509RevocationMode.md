---
title: "X509RevocationMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509RevocationMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509RevocationMode enum

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public enum X509RevocationMode
```

Specifies the mode used to check for X509 certificate revocation.

#### Remarks
This enumeration is used to specify whether a revocation check occurs and if it is performed online or offline.

> **Note:**
>  Specifying an online check can result in a long delay while the certificate authority is contacted.

#### Examples
The following example opens the current user's personal certificate store, allows the user to select a certificate, then writes certificate and certificate chain information to the console. The output depends on the certificate you select.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X509Chain/Overview/x509chaintest.cs._

## X509RevocationMode.NoCheck field

```csharp
NoCheck
```

Revocation checks should not be performed.

## X509RevocationMode.Offline field

```csharp
Offline
```

Revocation checks can only be performed with cached revocation data.

## X509RevocationMode.Online field

```csharp
Online
```

Revocation checks that are not possible with cached revocation data should attempt to make live requests to update the cache.
