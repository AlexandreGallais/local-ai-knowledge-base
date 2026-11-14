---
title: "SymmetricAlgorithm class (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/SymmetricAlgorithm.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SymmetricAlgorithm class (part 5 of 5)

## SymmetricAlgorithm.IVValue field

```csharp
protected byte[]? IVValue;
```

Represents the initialization vector (`SymmetricAlgorithm.IV`) for the symmetric algorithm.

#### Remarks
This field is accessed through the `IV` property.

## SymmetricAlgorithm.KeySizeValue field

```csharp
protected int KeySizeValue;
```

Represents the size, in bits, of the secret key used by the symmetric algorithm.

#### Remarks
The valid key sizes are specified by the particular symmetric algorithm implementation and are listed in the `LegalKeySizes` property.

This field is accessed through the `KeySize` property.

## SymmetricAlgorithm.KeyValue field

```csharp
protected byte[]? KeyValue;
```

Represents the secret key for the symmetric algorithm.

#### Remarks
The secret key is used both for encryption and for decryption. For a symmetric algorithm to be successful, the secret key must be known only to the sender and the receiver. The valid key sizes are specified by the particular symmetric algorithm implementation and are listed in the `LegalKeySizes` property.

This field is accessed through the `Key` property.

## SymmetricAlgorithm.LegalBlockSizesValue field

```csharp
protected System.Security.Cryptography.KeySizes[] LegalBlockSizesValue;
```

Specifies the block sizes, in bits, that are supported by the symmetric algorithm.

#### Remarks
The symmetric algorithm supports only block sizes that match an entry in this array.

This field is accessed through the `LegalBlockSizes` property.

## SymmetricAlgorithm.LegalKeySizesValue field

```csharp
protected System.Security.Cryptography.KeySizes[] LegalKeySizesValue;
```

Specifies the key sizes, in bits, that are supported by the symmetric algorithm.

#### Remarks
The symmetric algorithm supports only key sizes that match an entry in this array.

This field is accessed through the `LegalKeySizes` property.

## SymmetricAlgorithm.ModeValue field

```csharp
protected System.Security.Cryptography.CipherMode ModeValue;
```

Represents the cipher mode used in the symmetric algorithm.

#### Remarks
See `CipherMode` enumeration for a description of specific modes.

This field is accessed through the `Mode` property.

## SymmetricAlgorithm.PaddingValue field

```csharp
protected System.Security.Cryptography.PaddingMode PaddingValue;
```

Represents the padding mode used in the symmetric algorithm.

#### Remarks
Most plain text messages do not consist of a number of bytes that completely fill blocks. Often, there are not enough bytes to fill the last block. When this happens, a padding string is added to the text. For example, if the block length is 64 bits and the last block contains only 40 bits, 24 bits of padding are added. See the `PaddingMode` enumeration for a description of specific modes.

This field is accessed through the `Padding` property.
