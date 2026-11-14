---
title: "EncryptionPolicy enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/EncryptionPolicy.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EncryptionPolicy enum

Namespace: `System.Net.Security`

```csharp
public enum EncryptionPolicy
```

Specifies the encryption policy.

#### Remarks

The `EncryptionPolicy` can be set to require, allow, or prevent encryption.

#### Examples
The `EncryptionPolicy` will be applied to an SSL/TLS session.

## EncryptionPolicy.AllowNoEncryption field

```csharp
AllowNoEncryption
```

Prefer that full encryption be used, but allow a NULL cipher (no encryption) if the server agrees. This member is obsolete.

## EncryptionPolicy.NoEncryption field

```csharp
NoEncryption
```

Allow no encryption and request that a NULL cipher be used if the other endpoint can handle a NULL cipher. This member is obsolete.

## EncryptionPolicy.RequireEncryption field

```csharp
RequireEncryption
```

Require encryption and never allow a NULL cipher.
