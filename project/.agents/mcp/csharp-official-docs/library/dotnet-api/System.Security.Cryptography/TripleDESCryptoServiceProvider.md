---
title: "TripleDESCryptoServiceProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/TripleDESCryptoServiceProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TripleDESCryptoServiceProvider class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class TripleDESCryptoServiceProvider : System.Security.Cryptography.TripleDES
```

Defines a wrapper object to access the cryptographic service provider (CSP) version of the `TripleDES` algorithm. This class cannot be inherited.

#### Remarks
`TripleDESCryptoServiceProvider` is obsolete. Use the `Create` method instead.

> **Note:**
>  A newer symmetric encryption algorithm, Advanced Encryption Standard (AES), is available. Consider using the `AesCryptoServiceProvider` class instead of the `TripleDESCryptoServiceProvider` class. Use `TripleDESCryptoServiceProvider` only for compatibility with legacy applications and data.

## TripleDESCryptoServiceProvider.TripleDESCryptoServiceProvider() constructor

```csharp
public TripleDESCryptoServiceProvider ();
```

Initializes a new instance of the `TripleDESCryptoServiceProvider` class.

Exceptions:

- `CryptographicException`: The `TripleDES` cryptographic service provider is not available.

#### Remarks
`TripleDESCryptoServiceProvider` is obsolete. Use the `Create` method instead.

## TripleDESCryptoServiceProvider.BlockSize property

```csharp
public override int BlockSize { get; set; }
```

Gets or sets the block size, in bits, of the cryptographic operation.

Returns: The block size, in bits.

#### Remarks
The block size is the basic unit of data that can be encrypted or decrypted in one operation. Messages longer than the block size are handled as successive blocks; messages shorter than the block size must be padded with extra bits to reach the size of a block. Valid block sizes are determined by the symmetric algorithm used.

## TripleDESCryptoServiceProvider.FeedbackSize property

```csharp
public override int FeedbackSize { get; set; }
```

Gets or sets the feedback size, in bits, of the cryptographic operation for the Cipher Feedback (CFB) and Output Feedback (OFB) cipher modes.

Returns: The feedback size in bits.

Exceptions:

- `CryptographicException`: The feedback size is larger than the block size.

To be added.

## TripleDESCryptoServiceProvider.IV property

```csharp
public override byte[] IV { get; set; }
```

Gets or sets the initialization vector (`SymmetricAlgorithm.IV`) for the symmetric algorithm.

Returns: The initialization vector.

Exceptions:

- `ArgumentNullException`: An attempt was made to set the initialization vector to `null`.
- `CryptographicException`: An attempt was made to set the initialization vector to an invalid size.

#### Remarks
The `IV` property is automatically set to a new random value whenever you create a new instance of one of the `SymmetricAlgorithm` classes or when you manually call the `SymmetricAlgorithm.GenerateIV` method.  The size of the `IV` property must be the same as the `BlockSize` property divided by 8.

The classes that derive from the `SymmetricAlgorithm` class use a chaining mode called cipher block chaining (CBC), which requires a key and an initialization vector to perform cryptographic transformations on data.  To decrypt data that was encrypted using one of the `SymmetricAlgorithm` classes, you must set the `Key` property and `IV` property to the same values that were used for encryption.

For a given secret key *k*, a simple block cipher that does not use an initialization vector will encrypt the same input block of plain text into the same output block of cipher text. If you have duplicate blocks within your plain text stream, you will have duplicate blocks within your cipher text stream. If unauthorized users know anything about the structure of a block of your plain text, they can use that information to decipher the known cipher text block and possibly recover your key. To combat this problem, information from the previous block is mixed into the process of encrypting the next block. Thus, the output of two identical plain text blocks is different. Because this technique uses the previous block to encrypt the next block, an initialization vector is needed to encrypt the first block of data.

## TripleDESCryptoServiceProvider.Key <example-value>

```csharp
public override byte[] Key { get; set; }
```

Gets or sets the secret key for the `TripleDES` algorithm.

Returns: The secret key for the `TripleDES` algorithm.

#### Remarks
This algorithm supports key <example-value> from 128 bits to 192 bits in increments of 64 bits.

## TripleDESCryptoServiceProvider.KeySize property

```csharp
public override int KeySize { get; set; }
```

Gets or sets the size, in bits, of the secret key.

Returns: The size, in bits, of the key.

#### Remarks
The minimum size of the key is 128 bits, and the maximum size is 256 bits.

Changing the `KeySize` value resets the key and generates a new random key. This happens whenever the `KeySize` property setter is invoked (including when it's assigned the same value).

## TripleDESCryptoServiceProvider.LegalBlockSizes property

```csharp
public override System.Security.Cryptography.KeySizes[] LegalBlockSizes { get; }
```

Gets the block sizes, in bits, that are supported by the symmetric algorithm.

Returns: An array that contains the block sizes supported by the algorithm.

#### Remarks
For TripleDES, the only legal block size is 64 bits.

## TripleDESCryptoServiceProvider.LegalKeySizes property

```csharp
public override System.Security.Cryptography.KeySizes[] LegalKeySizes { get; }
```

Gets the key sizes, in bits, that are supported by the symmetric algorithm.

Returns: An array that contains the key sizes supported by the algorithm.

#### Remarks
For TripleDES, the legal key sizes are 128 and 192 bits.

## TripleDESCryptoServiceProvider.Mode property

```csharp
public override System.Security.Cryptography.CipherMode Mode { get; set; }
```

Gets or sets the mode for operation of the symmetric algorithm.

Returns: The mode for operation of the symmetric algorithm. The default is `CipherMode.CBC`.

Exceptions:

- `CryptographicException`: The cipher mode is not one of the `CipherMode` values.

#### Remarks
See `CipherMode` enumeration for a description of specific modes.

## TripleDESCryptoServiceProvider.Padding property

```csharp
public override System.Security.Cryptography.PaddingMode Padding { get; set; }
```

Gets or sets the padding mode used in the symmetric algorithm.

Returns: The padding mode used in the symmetric algorithm. The default is `PaddingMode.PKCS7`.

Exceptions:

- `CryptographicException`: The padding mode is not one of the `PaddingMode` values.

#### Remarks
Most plain text messages do not consist of a number of bytes that completely fill blocks. Often, there are not enough bytes to fill the last block. When this happens, a padding string is added to the text. For example, if the block length is 64 bits and the last block contains only 40 bits, 24 bits of padding are added. See the `PaddingMode` enumeration for a description of specific modes.

## TripleDESCryptoServiceProvider.CreateDecryptor() method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateDecryptor ();
```

Creates a symmetric decryptor object with the current `SymmetricAlgorithm.Key` property and initialization vector (`SymmetricAlgorithm.IV`).

Returns: A symmetric decryptor object.

#### Remarks
This method decrypts an encrypted message created using the `SymmetricAlgorithm.CreateEncryptor` overload with the same signature.

## TripleDESCryptoServiceProvider.CreateDecryptor(Byte[], Byte[]) method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateDecryptor (byte[] rgbKey, byte[]? rgbIV);
```

Creates a symmetric `TripleDES` decryptor object with the specified key (`SymmetricAlgorithm.Key`) and initialization vector (`SymmetricAlgorithm.IV`).

Parameters:

- `rgbKey`: The secret key to use for the symmetric algorithm.
- `rgbIV`: The initialization vector to use for the symmetric algorithm.

Returns: A symmetric `TripleDES` decryptor object.

Exceptions:

- `CryptographicException`: The value of the `SymmetricAlgorithm.Mode` property is `CipherMode.OFB`.

-or-

The value of the `SymmetricAlgorithm.Mode` property is `CipherMode.CFB` and the value of the `SymmetricAlgorithm.FeedbackSize` property is not 8.

-or-

An invalid key size was used.

-or-

The algorithm key size was not available.

#### Remarks
This method decrypts an encrypted message created using the `TripleDESCryptoServiceProvider.CreateEncryptor` overload with the same parameters.

## TripleDESCryptoServiceProvider.CreateEncryptor() method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateEncryptor ();
```

Creates a symmetric encryptor object with the current `SymmetricAlgorithm.Key` property and initialization vector (`SymmetricAlgorithm.IV`).

Returns: A symmetric encryptor object.

#### Remarks
If the current `Key` property is `null`, the `SymmetricAlgorithm.GenerateKey` method is called to create a new random `SymmetricAlgorithm.Key`. If the current `IV` property is `null`, the `SymmetricAlgorithm.GenerateIV` method is called to create a new random `SymmetricAlgorithm.IV`.

Use the `SymmetricAlgorithm.CreateDecryptor` overload with the same signature to decrypt the result of this method.

## TripleDESCryptoServiceProvider.CreateEncryptor(Byte[], Byte[]) method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateEncryptor (byte[] rgbKey, byte[]? rgbIV);
```

Creates a symmetric `TripleDES` encryptor object with the specified key (`SymmetricAlgorithm.Key`) and initialization vector (`SymmetricAlgorithm.IV`).

Parameters:

- `rgbKey`: The secret key to use for the symmetric algorithm.
- `rgbIV`: The initialization vector to use for the symmetric algorithm.

Note: The initialization vector must be 8 bytes long. If it is longer than 8 bytes, it is truncated and an exception is not thrown. Before you call `TripleDESCryptoServiceProvider.CreateEncryptor`, check the length of the initialization vector and throw an exception if it is too long.

Returns: A symmetric `TripleDES` encryptor object.

Exceptions:

- `CryptographicException`: The value of the `SymmetricAlgorithm.Mode` property is `CipherMode.OFB`.

-or-

The value of the `SymmetricAlgorithm.Mode` property is `CipherMode.CFB` and the value of the `SymmetricAlgorithm.FeedbackSize` property is not 8.

-or-

An invalid key size was used.

-or-

The algorithm key size was not available.

#### Remarks
Use the `TripleDESCryptoServiceProvider.CreateDecryptor` overload with the same parameters to decrypt the result of this method.

## TripleDESCryptoServiceProvider.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `AesCryptoServiceProvider` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## TripleDESCryptoServiceProvider.GenerateIV() method

```csharp
public override void GenerateIV ();
```

Generates a random initialization vector (`SymmetricAlgorithm.IV`) to use for the algorithm.

#### Remarks
Use this method to generate a random initialization vector when none is specified.

## TripleDESCryptoServiceProvider.GenerateKey() method

```csharp
public override void GenerateKey ();
```

Generates a random `SymmetricAlgorithm.Key` to be used for the algorithm.

#### Remarks
Use this method to generate a random key when none is specified. This method will never return a weak key (see `TripleDES.IsWeakKey`).

This algorithm supports key <example-value> from 128 bits to 192 bits in increments of 64 bits.
