---
title: "ProtectionLevel enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/ProtectionLevel.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProtectionLevel enum

Namespace: `System.Net.Security`

```csharp
public enum ProtectionLevel
```

Indicates the security services requested for an authenticated stream.

#### Remarks
This enumeration is used by the `NegotiateStream` class.

#### Examples
The following code example demonstrates creating and using a client-side `NegotiateStream`.

_Code sample not included: ~/snippets/csharp/System.Net.Security/NegotiateStream/.ctor/client.cs._
## ProtectionLevel.EncryptAndSign field

```csharp
EncryptAndSign
```

Encrypt and sign data to help ensure the confidentiality and integrity of transmitted data.

## ProtectionLevel.None field

```csharp
None
```

Authentication only.

## ProtectionLevel.Sign field

```csharp
Sign
```

Sign data to help ensure the integrity of transmitted data.
