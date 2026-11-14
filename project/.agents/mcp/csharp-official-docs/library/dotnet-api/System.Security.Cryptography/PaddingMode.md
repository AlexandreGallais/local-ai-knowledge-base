---
title: "PaddingMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/PaddingMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PaddingMode enum

Namespace: `System.Security.Cryptography`

```csharp
public enum PaddingMode
```

Specifies the type of padding to apply when the message data block is shorter than the full number of bytes needed for a cryptographic operation.

#### Remarks
Most plain text messages don't consist of bytes that completely fill blocks. Often, there aren't enough bytes to fill the last block. When this happens, a padding string is added to the text. For example, if the block length is 64 bits and the last block contains only 40 bits, 24 bits of padding are added.

Some encryption standards specify a particular padding scheme. The following example shows how these modes work. Given a blocklength of 8, a data length of 9, the number of padding octets equal to 7, and the data equal to FF FF FF FF FF FF FF FF FF:

| Padding scheme        | Data with padding                               |
|-----------------------|-------------------------------------------------|
| **X923 padding:**     | FF FF FF FF FF FF FF FF FF 00 00 00 00 00 00 07 |
| **PKCS7 padding:**    | FF FF FF FF FF FF FF FF FF 07 07 07 07 07 07 07 |
| **ISO10126 padding:** | FF FF FF FF FF FF FF FF FF 7D 2A 75 EF F8 EF 07 |

## PaddingMode.ANSIX923 field

```csharp
ANSIX923
```

The ANSIX923 padding string consists of a sequence of bytes filled with zeros before the length.

## PaddingMode.ISO10126 field

```csharp
ISO10126
```

The ISO10126 padding string consists of random data before the length.

## PaddingMode.None field

```csharp
None
```

No padding is done.

## PaddingMode.PKCS7 field

```csharp
PKCS7
```

The PKCS #7 padding string consists of a sequence of bytes, each of which is equal to the total number of padding bytes added.

## PaddingMode.Zeros field

```csharp
Zeros
```

The padding string consists of bytes set to zero.
