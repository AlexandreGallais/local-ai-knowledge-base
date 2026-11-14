---
title: "X509ContentType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X509ContentType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X509ContentType enum

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public enum X509ContentType
```

Specifies the format of an X.509 certificate.

#### Remarks
Content types Cert, Pkcs12, and SerializedCert can be exported as byte arrays. Therefore, all three formats are serialized certificates. SerializedCert differs from an exported Cert file in that it is created by using the CertSerializeCertificateStoreElement function, which serializes both the encoded certificate and its encoded properties. If you export the same `X509Certificate` object in both formats and view the resulting byte arrays, you will see that the two are different.

## X509ContentType.Authenticode field

```csharp
Authenticode
```

An Authenticode X.509 certificate.

## X509ContentType.Cert field

```csharp
Cert
```

A single X.509 certificate.

## X509ContentType.Pfx field

```csharp
Pfx
```

A PFX-formatted certificate. The `Pfx` value is identical to the `Pkcs12` value.

## X509ContentType.Pkcs12 field

```csharp
Pkcs12
```

A PKCS #12-formatted certificate. The `Pkcs12` value is identical to the `Pfx` value.

## X509ContentType.Pkcs7 field

```csharp
Pkcs7
```

A PKCS #7-formatted certificate.

## X509ContentType.SerializedCert field

```csharp
SerializedCert
```

A single serialized X.509 certificate.

## X509ContentType.SerializedStore field

```csharp
SerializedStore
```

A serialized store.

## X509ContentType.Unknown field

```csharp
Unknown
```

An unknown X.509 certificate.
