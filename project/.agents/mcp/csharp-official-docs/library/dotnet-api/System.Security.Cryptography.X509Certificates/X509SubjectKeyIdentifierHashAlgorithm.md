---
title: "X509SubjectKeyIdentifierHashAlgorithm enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509SubjectKeyIdentifierHashAlgorithm.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509SubjectKeyIdentifierHashAlgorithm enum

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public enum X509SubjectKeyIdentifierHashAlgorithm
```

Defines the type of hash algorithm to use with the `X509SubjectKeyIdentifierExtension` class.

#### Remarks
The subject key <example-value> (SKI) provides a unique identification for a certificate's subject.

Use the `X509SubjectKeyIdentifierHashAlgorithm` enumeration to define the type of hash algorithm to use with the `X509SubjectKeyIdentifierExtension` class when creating an SKI.

## X509SubjectKeyIdentifierHashAlgorithm.CapiSha1 field

```csharp
CapiSha1
```

The subject key <example-value> (SKI) is composed of a 160-bit SHA-1 hash of the encoded public key (including the tag, length, and number of unused bits).

## X509SubjectKeyIdentifierHashAlgorithm.Sha1 field

```csharp
Sha1
```

The SKI is composed of the 160-bit SHA-1 hash of the value of the public key (excluding the tag, length, and number of unused bits).

## X509SubjectKeyIdentifierHashAlgorithm.Sha256 field

```csharp
Sha256
```

The SHA-256 hash over the SubjectPublicKeyInfo as described in RFC 7093.

## X509SubjectKeyIdentifierHashAlgorithm.Sha384 field

```csharp
Sha384
```

The SHA-384 hash over the SubjectPublicKeyInfo as described in RFC 7093.

## X509SubjectKeyIdentifierHashAlgorithm.Sha512 field

```csharp
Sha512
```

The SHA-512 hash over the SubjectPublicKeyInfo as described in RFC 7093.

## X509SubjectKeyIdentifierHashAlgorithm.ShortSha1 field

```csharp
ShortSha1
```

The SKI is composed of a four-bit type field with the value 0100, followed by the least significant 60 bits of the SHA-1 hash of the value of the public key (excluding the tag, length, and number of unused bit string bits)

## X509SubjectKeyIdentifierHashAlgorithm.ShortSha256 field

```csharp
ShortSha256
```

The SHA-256 hash over the subjectPublicKey <example-value> to the leftmost 160-bits as described in RFC 7093.

## X509SubjectKeyIdentifierHashAlgorithm.ShortSha384 field

```csharp
ShortSha384
```

The SHA-384 hash over the subjectPublicKey <example-value> to the leftmost 160-bits as described in RFC 7093.

## X509SubjectKeyIdentifierHashAlgorithm.ShortSha512 field

```csharp
ShortSha512
```

The SHA-512 hash over the subjectPublicKey <example-value> to the leftmost 160-bits as described in RFC 7093.
