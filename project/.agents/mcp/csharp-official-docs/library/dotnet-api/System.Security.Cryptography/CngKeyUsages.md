---
title: "CngKeyUsages enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CngKeyUsages.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CngKeyUsages enum

Namespace: `System.Security.Cryptography`

```csharp
public enum CngKeyUsages
```

Specifies the cryptographic operations that a Cryptography Next Generation (CNG) key may be used with.

#### Remarks
Not all operations apply to each key. For example, an Elliptic Curve Digital Signature Algorithm (ECDSA) key <example-value> be used for decryption even if the Decryption usage is set.

## CngKeyUsages.AllUsages field

```csharp
AllUsages
```

The key can be used for all purposes.

## CngKeyUsages.Decryption field

```csharp
Decryption
```

The key can be used for encryption and decryption.

## CngKeyUsages.KeyAgreement field

```csharp
KeyAgreement
```

The key can be used for secret <example-value> generation and key exchange.

## CngKeyUsages.None field

```csharp
None
```

No usage values are assigned to the key.

## CngKeyUsages.Signing field

```csharp
Signing
```

The key can be used for signing and verification.
