---
title: "RSAEncryptionPaddingMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RSAEncryptionPaddingMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSAEncryptionPaddingMode enum

Namespace: `System.Security.Cryptography`

```csharp
public enum RSAEncryptionPaddingMode
```

Specifies the padding mode to use with RSA encryption or decryption operations.

#### Remarks

The `Oaep` mode corresponds to the RSAES-OEAP encryption scheme described in the PKCS #1: RSA Encryption Standard, and the `Pkcs1` mode corresponds to the RSAES-PKCS1-v1_5 encryption scheme described in the PKCS #1: RSA Encryption Standard.

## RSAEncryptionPaddingMode.Oaep field

```csharp
Oaep
```

Optimal Asymmetric Encryption Padding. It is recommended for new applications.

#### Remarks

This mode corresponds to the RSAES-OEAP encryption scheme described in the PKCS #1 RSA Encryption Standard.
It is recommended for new applications.

## RSAEncryptionPaddingMode.Pkcs1 field

```csharp
Pkcs1
```

PKCS #1 v1.5. It is supported for compatibility with existing applications.

#### Remarks

This mode corresponds to the RSAES-PKCS1-v1_5 encryption scheme described in the PKCS #1 RSA Encryption Standard.
It is supported for compatibility with existing applications.
