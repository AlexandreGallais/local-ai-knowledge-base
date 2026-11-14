---
title: "RSASignaturePaddingMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RSASignaturePaddingMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RSASignaturePaddingMode enum

Namespace: `System.Security.Cryptography`

```csharp
public enum RSASignaturePaddingMode
```

Specifies the padding mode to use with RSA signature creation or verification operations.

#### Remarks

`Pkcs1` corresponds to the RSASSA-PKCS1-v1.5 signature scheme of the PKCS #1: RSA Encryption Standard](https://datatracker.ietf.org/doc/html/rfc8017#section-8.2). It is supported for compatibility with existing applications.

`Pss` corresponds to the Probabilistic Signature Scheme (RSASSA-PSS) of the PKCS #1: RSA Encryption Standard. It is recommended for new applications.

## RSASignaturePaddingMode.Pkcs1 field

```csharp
Pkcs1
```

PKCS #1 v1.5.

#### Remarks

This corresponds to the RSASSA-PKCS1-v1.5 signature scheme of the PKCS #1 RSA Encryption Standard.
It is supported for compatibility with existing applications.

## RSASignaturePaddingMode.Pss field

```csharp
Pss
```

Probabilistic Signature Scheme.

#### Remarks

This corresponds to the RSASSA-PSS signature scheme of the PKCS #1 RSA Encryption Standard.
It is recommended for new applications.
