---
title: "KeyNumber enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/KeyNumber.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# KeyNumber enum

Namespace: `System.Security.Cryptography`

```csharp
public enum KeyNumber
```

Specifies whether to create an asymmetric signature key or an asymmetric exchange key.

#### Remarks
Use the `KeyNumber` enumeration with the `KeyNumber` property to inspect a key type or with the `KeyNumber` field to specify a key type.

#### Examples
The following code example demonstrates how to use the `KeyNumber` enumeration to specify a key type for an `RSACryptoServiceProvider` object.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CspParameters/KeyNumber/sample.cs._

## KeyNumber.Exchange field

```csharp
Exchange
```

An exchange key pair used to encrypt session keys so that they can be safely stored and exchanged with other users. This value corresponds to the AT_KEYEXCHANGE value used in the unmanaged Microsoft Cryptographic API (CAPI).

## KeyNumber.Signature field

```csharp
Signature
```

A signature key pair used for authenticating digitally signed messages or files. This value corresponds to the AT_SIGNATURE value used in the unmanaged Microsoft Cryptographic API (CAPI).
