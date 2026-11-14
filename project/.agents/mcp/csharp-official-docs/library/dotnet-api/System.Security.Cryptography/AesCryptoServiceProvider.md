---
title: "AesCryptoServiceProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/AesCryptoServiceProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AesCryptoServiceProvider class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class AesCryptoServiceProvider : System.Security.Cryptography.Aes
```

Performs symmetric encryption and decryption using the Cryptographic Application Programming Interfaces (CAPI) implementation of the Advanced Encryption Standard (AES) algorithm.

To be added.

## AesCryptoServiceProvider.AesCryptoServiceProvider() constructor

```csharp
public AesCryptoServiceProvider ();
```

Initializes a new instance of the `AesCryptoServiceProvider` class.

Exceptions:

- `PlatformNotSupportedException`: There is no supported key size for the current platform.

To be added.

## AesCryptoServiceProvider.BlockSize property

```csharp
public override int BlockSize { get; set; }
```

Gets or sets the block size, in bits, of the cryptographic operation.

Returns: The block size, in bits.

Exceptions:

- `CryptographicException`: The block size is invalid.

#### Remarks
The block size is the basic unit of data that can be encrypted or decrypted in one operation. Messages longer than the block size are handled as successive blocks; messages shorter than the block size must be padded with extra bits to reach the size of a block. Valid block sizes are determined by the symmetric algorithm used.

## AesCryptoServiceProvider.FeedbackSize property

```csharp
public override int FeedbackSize { get; set; }
```

Gets or sets the feedback size, in bits, of the cryptographic operation for the Cipher Feedback (CFB) and Output Feedback (OFB) cipher modes.

Returns: The feedback size in bits.

Exceptions:

- `CryptographicException`: The feedback size is larger than the block size.

To be added.

## AesCryptoServiceProvider.IV property

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

## AesCryptoServiceProvider.Key <example-value>

```csharp
public override byte[] Key { get; set; }
```

Gets or sets the symmetric key that is used for encryption and decryption.

Returns: The symmetric key that is used for encryption and decryption.

Exceptions:

- `ArgumentNullException`: The value for the key is `null`.
- `CryptographicException`: The size of the key is invalid.

To be added.

## AesCryptoServiceProvider.KeySize property

```csharp
public override int KeySize { get; set; }
```

Gets or sets the size, in bits, of the secret key.

Returns: The size, in bits, of the key.

#### Remarks
For AES, the legal key sizes are 128, 192, and 256 bits.

Changing the `KeySize` value resets the key and generates a new random key. This happens whenever the `KeySize` property setter is invoked (including when it's assigned the same value).

## AesCryptoServiceProvider.LegalBlockSizes property

```csharp
public override System.Security.Cryptography.KeySizes[] LegalBlockSizes { get; }
```

Gets the block sizes, in bits, that are supported by the symmetric algorithm.

Returns: An array that contains the block sizes supported by the algorithm.

#### Remarks
For AES, the only legal block size is 128 bits.

## AesCryptoServiceProvider.LegalKeySizes property

```csharp
public override System.Security.Cryptography.KeySizes[] LegalKeySizes { get; }
```

Gets the key sizes, in bits, that are supported by the symmetric algorithm.

Returns: An array that contains the key sizes supported by the algorithm.

#### Remarks
For AES, the legal key sizes are 128, 192, and 256 bits.

## AesCryptoServiceProvider.Mode property

```csharp
public override System.Security.Cryptography.CipherMode Mode { get; set; }
```

Gets or sets the mode for operation of the symmetric algorithm.

Returns: The mode for operation of the symmetric algorithm. The default is `CipherMode.CBC`.

Exceptions:

- `CryptographicException`: The cipher mode is not one of the `CipherMode` values.

#### Remarks
See `CipherMode` enumeration for a description of specific modes.

## AesCryptoServiceProvider.Padding property

```csharp
public override System.Security.Cryptography.PaddingMode Padding { get; set; }
```

Gets or sets the padding mode used in the symmetric algorithm.

Returns: The padding mode used in the symmetric algorithm. The default is `PaddingMode.PKCS7`.

Exceptions:

- `CryptographicException`: The padding mode is not one of the `PaddingMode` values.

#### Remarks
Most plain text messages do not consist of a number of bytes that completely fill blocks. Often, there are not enough bytes to fill the last block. When this happens, a padding string is added to the text. For example, if the block length is 64 bits and the last block contains only 40 bits, 24 bits of padding are added. See the `PaddingMode` enumeration for a description of specific modes.

## AesCryptoServiceProvider.CreateDecryptor() method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateDecryptor ();
```

Creates a symmetric AES decryptor object using the current key and initialization vector (IV).

Returns: A symmetric AES decryptor object.

Exceptions:

- `CryptographicException`: The current key is invalid or missing.

To be added.

## AesCryptoServiceProvider.CreateDecryptor(Byte[], Byte[]) method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateDecryptor (byte[] rgbKey, byte[]? rgbIV);
```

Creates a symmetric AES decryptor object using the specified key and initialization vector (IV).

Parameters:

- `rgbKey`: The secret key to use for the symmetric algorithm.
- `rgbIV`: The initialization vector to use for the symmetric algorithm.

Returns: A symmetric AES decryptor object.

Exceptions:

- `ArgumentNullException`: `key` or `iv` is `null`.
- `ArgumentException`: `key` is invalid.

#### Examples
The following example shows how to use the `AesCryptoServiceProvider.CreateDecryptor` method to decrypt an encrypted message. This code example is part of a larger example provided for the `AesCryptoServiceProvider` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AesCryptoServiceProvider/Overview/program.cs._

## AesCryptoServiceProvider.CreateEncryptor() method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateEncryptor ();
```

Creates a symmetric AES encryptor object using the current key and initialization vector (IV).

Returns: A symmetric AES encryptor object.

To be added.

## AesCryptoServiceProvider.CreateEncryptor(Byte[], Byte[]) method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateEncryptor (byte[] rgbKey, byte[]? rgbIV);
```

Creates a symmetric encryptor object using the specified key and initialization vector (IV).

Parameters:

- `rgbKey`: The secret key to use for the symmetric algorithm.
- `rgbIV`: The initialization vector to use for the symmetric algorithm.

Returns: A symmetric AES encryptor object.

Exceptions:

- `ArgumentNullException`: The `key` or `iv` parameter is `null`.
- `ArgumentException`: `key` is invalid.

#### Remarks
See the code examples in the `SymmetricAlgorithm.LegalKeySizes` and `SymmetricAlgorithm.LegalBlockSizes` properties to determine the size of the `key` and `iv` parameters.

#### Examples
The following example shows how to use the `AesCryptoServiceProvider.CreateEncryptor` method to encrypt a message. This code example is part of a larger example provided for the `AesCryptoServiceProvider` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AesCryptoServiceProvider/Overview/program.cs._

## AesCryptoServiceProvider.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `AesCryptoServiceProvider` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## AesCryptoServiceProvider.GenerateIV() method

```csharp
public override void GenerateIV ();
```

Generates a random initialization vector (IV) to use for the algorithm.

Exceptions:

- `CryptographicException`: The initialization vector (IV) could not be generated.

To be added.

## AesCryptoServiceProvider.GenerateKey() method

```csharp
public override void GenerateKey ();
```

Generates a random key to use for the algorithm.

Exceptions:

- `CryptographicException`: The key could not be generated.

To be added.
