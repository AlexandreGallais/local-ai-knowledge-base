---
title: "RijndaelManaged class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/RijndaelManaged.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RijndaelManaged class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class RijndaelManaged : System.Security.Cryptography.Rijndael
```

Accesses the managed version of the `Rijndael` algorithm. This class cannot be inherited.

To be added.

## RijndaelManaged.RijndaelManaged() constructor

```csharp
public RijndaelManaged ();
```

Initializes a new instance of the `RijndaelManaged` class.

Exceptions:

- `InvalidOperationException`: This class is not compliant with the FIPS algorithm.

#### Examples
The following example creates a new instance of the `RijndaelManaged` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RijndaelManaged/Overview/class1.cs._

## RijndaelManaged.BlockSize property

```csharp
public override int BlockSize { get; set; }
```

Gets or sets the block size, in bits, of the cryptographic operation.

Returns: The block size, in bits, of the cryptographic operation. The default is 128 bits.

#### Remarks

The block size for Rijndael must be 128 bits. For more information about block size, see the `BlockSize`.

## RijndaelManaged.FeedbackSize property

```csharp
public override int FeedbackSize { get; set; }
```

Gets or sets the feedback size, in bits, of the cryptographic operation for the Cipher Feedback (CFB) and Output Feedback (OFB) cipher modes.

Returns: The feedback size in bits.

Exceptions:

- `CryptographicException`: The feedback size is larger than the block size.

#### Remarks
The feedback size determines the amount of data that is fed back to successive encryption or decryption operations. The feedback size cannot be greater than the block size.

## RijndaelManaged.IV property

```csharp
public override byte[] IV { get; set; }
```

Gets or sets the initialization vector (IV) to use for the symmetric algorithm.

Returns: The initialization vector (IV) to use for the symmetric algorithm.

#### Remarks
See the `IV` for more information about initialization vectors.

## RijndaelManaged.Key <example-value>

```csharp
public override byte[] Key { get; set; }
```

Gets or sets the secret key used for the symmetric algorithm.

Returns: The secret key used for the symmetric algorithm.

#### Remarks
See the `Key` for more information about the secret key.

## RijndaelManaged.KeySize property

```csharp
public override int KeySize { get; set; }
```

Gets or sets the size, in bits, of the secret key used for the symmetric algorithm.

Returns: The size, in bits, of the secret key used for the symmetric algorithm. The default is 256 bits.

#### Remarks
The valid key sizes for Rijndael are 128, 192 and 256 bits.

## RijndaelManaged.LegalKeySizes property

```csharp
public override System.Security.Cryptography.KeySizes[] LegalKeySizes { get; }
```

Gets the key sizes, in bits, that are supported by the symmetric algorithm.

Returns: The key sizes, in bits, that are supported by the symmetric algorithm.

#### Remarks
The valid key sizes for Rijndael are 128, 192 and 256 bits.

## RijndaelManaged.Mode property

```csharp
public override System.Security.Cryptography.CipherMode Mode { get; set; }
```

Gets or sets the mode for operation of the symmetric algorithm.

Returns: The mode for operation of the symmetric algorithm. The default is `CipherMode.CBC`

#### Remarks
See the `CipherMode` enumeration for a description of specific modes.

## RijndaelManaged.Padding property

```csharp
public override System.Security.Cryptography.PaddingMode Padding { get; set; }
```

Gets or sets the padding mode used in the symmetric algorithm.

Returns: The padding mode used in the symmetric algorithm. The default is `PaddingMode.PKCS7`.

#### Remarks
See the `Padding` property for more information about padding.

## RijndaelManaged.CreateDecryptor() method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateDecryptor ();
```

Creates a symmetric decryptor object with the current `SymmetricAlgorithm.Key` property and initialization vector (`SymmetricAlgorithm.IV`).

Returns: A symmetric decryptor object.

#### Remarks
This method decrypts an encrypted message created using the `SymmetricAlgorithm.CreateEncryptor` overload with the same signature.

## RijndaelManaged.CreateDecryptor(Byte[], Byte[]) method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateDecryptor (byte[] rgbKey, byte[]? rgbIV);
```

Creates a symmetric `Rijndael` decryptor object with the specified `SymmetricAlgorithm.Key` and initialization vector (`SymmetricAlgorithm.IV`).

Parameters:

- `rgbKey`: The secret key to be used for the symmetric algorithm. The key size must be 128, 192, or 256 bits.
- `rgbIV`: The IV to be used for the symmetric algorithm.

Returns: A symmetric `Rijndael` decryptor object.

Exceptions:

- `ArgumentNullException`: The `rgbKey` parameter is `null`.

-or-

The `rgbIV` parameter is `null`.
- `CryptographicException`: The value of the `SymmetricAlgorithm.Mode` property is not `CipherMode.ECB`, `CipherMode.CBC`, or `CipherMode.CFB`.

#### Remarks
This method decrypts an encrypted message created using the `RijndaelManaged.CreateEncryptor` overload with the same signature.

The `rgbkey` size must be 128, 192, or 256 bits.

#### Examples
The following code example demonstrates how to use the `RijndaelManaged.CreateDecryptor` method to decrypt messages encoded with the same signature parameter.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RijndaelManaged/Overview/class1.cs._

## RijndaelManaged.CreateEncryptor() method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateEncryptor ();
```

Creates a symmetric encryptor object with the current `SymmetricAlgorithm.Key` property and initialization vector (`SymmetricAlgorithm.IV`).

Returns: A symmetric encryptor object.

#### Remarks
If the current `Key` property is `null`, the `SymmetricAlgorithm.GenerateKey` method is called to create a new random `SymmetricAlgorithm.Key`. If the current `IV` property is `null`, the `SymmetricAlgorithm.GenerateIV` method is called to create a new random `SymmetricAlgorithm.IV`.

Use the `SymmetricAlgorithm.CreateDecryptor` overload with the same signature to decrypt the result of this method.

## RijndaelManaged.CreateEncryptor(Byte[], Byte[]) method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateEncryptor (byte[] rgbKey, byte[]? rgbIV);
```

Creates a symmetric `Rijndael` encryptor object with the specified `SymmetricAlgorithm.Key` and initialization vector (`SymmetricAlgorithm.IV`).

Parameters:

- `rgbKey`: The secret key to be used for the symmetric algorithm. The key size must be 128, 192, or 256 bits.
- `rgbIV`: The IV to be used for the symmetric algorithm.

Returns: A symmetric `Rijndael` encryptor object.

Exceptions:

- `ArgumentNullException`: The `rgbKey` parameter is `null`.

-or-

The `rgbIV` parameter is `null`.
- `CryptographicException`: The value of the `SymmetricAlgorithm.Mode` property is not `CipherMode.ECB`, `CipherMode.CBC`, or `CipherMode.CFB`.

#### Remarks
Use the `RijndaelManaged.CreateDecryptor` overload with the same signature to decrypt the result of this method.

The `rgbkey` size must be 128, 192, or 256 bits.

#### Examples
The following code examples demonstrates how to encrypt a message using the `CreateEncryptor` method.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RijndaelManaged/Overview/class1.cs._

## RijndaelManaged.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `SymmetricAlgorithm` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## RijndaelManaged.GenerateIV() method

```csharp
public override void GenerateIV ();
```

Generates a random initialization vector (`SymmetricAlgorithm.IV`) to be used for the algorithm.

#### Remarks
Use this method to generate a random IV when none is specified.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RijndaelManaged/Overview/class1.cs._

## RijndaelManaged.GenerateKey() method

```csharp
public override void GenerateKey ();
```

Generates a random `SymmetricAlgorithm.Key` to be used for the algorithm.

#### Remarks
Use this method to generate a random key when none is specified.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/RijndaelManaged/Overview/class1.cs._
