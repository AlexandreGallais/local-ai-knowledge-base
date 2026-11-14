---
title: "X509KeyUsageFlags enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509KeyUsageFlags.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509KeyUsageFlags enum

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public enum X509KeyUsageFlags
```

Defines how the certificate key can be used. If this value is not defined, the key can be used for any purpose.

#### Remarks
This class is an implementation of a commonly used extension that is mapped by default to the `CryptoConfig` file. When the `Extensions` property of the `X509Certificate2` class is invoked, this class can be used directly.

## X509KeyUsageFlags.CrlSign field

```csharp
CrlSign
```

The key can be used to sign a certificate revocation list (CRL).

## X509KeyUsageFlags.DataEncipherment field

```csharp
DataEncipherment
```

The key can be used for data encryption.

## X509KeyUsageFlags.DecipherOnly field

```csharp
DecipherOnly
```

The key can be used for decryption only.

## X509KeyUsageFlags.DigitalSignature field

```csharp
DigitalSignature
```

The key can be used as a digital signature.

## X509KeyUsageFlags.EncipherOnly field

```csharp
EncipherOnly
```

The key can be used for encryption only.

## X509KeyUsageFlags.KeyAgreement field

```csharp
KeyAgreement
```

The key can be used to determine key <example-value>, such as a key <example-value> using the Diffie-Hellman key <example-value> algorithm.

## X509KeyUsageFlags.KeyCertSign field

```csharp
KeyCertSign
```

The key can be used to sign certificates.

## X509KeyUsageFlags.KeyEncipherment field

```csharp
KeyEncipherment
```

The key can be used for key encryption.

## X509KeyUsageFlags.None field

```csharp
None
```

No key usage parameters.

## X509KeyUsageFlags.NonRepudiation field

```csharp
NonRepudiation
```

The key can be used for authentication.
