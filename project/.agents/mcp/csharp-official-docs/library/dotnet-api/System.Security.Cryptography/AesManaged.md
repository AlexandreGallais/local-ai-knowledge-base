---
title: "AesManaged class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/AesManaged.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AesManaged class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class AesManaged : System.Security.Cryptography.Aes
```

Provides a managed implementation of the Advanced Encryption Standard (AES) symmetric algorithm.

To be added.

## AesManaged.AesManaged() constructor

```csharp
public AesManaged ();
```

Initializes a new instance of the `AesManaged` class.

Exceptions:

- `CryptographicException`: The Windows security policy setting for FIPS is enabled.
- `InvalidOperationException`: This implementation is not part of the Windows Platform FIPS-validated cryptographic algorithms.

To be added.

## AesManaged.BlockSize property

```csharp
public override int BlockSize { get; set; }
```

Gets or sets the block size, in bits, of the cryptographic operation.

Returns: The block size, in bits, of the cryptographic operation. The default is 128 bits.

#### Remarks
For AES, the only valid block size is 128 bits. See the `BlockSize` for more information about block size.

## AesManaged.FeedbackSize property

```csharp
public override int FeedbackSize { get; set; }
```

Gets or sets the number of bits to use as feedback.

Returns: The feedback size, in bits.

#### Remarks
The maximum feedback size is 128 bits.

> **Note:**
>  Because this algorithm does not support feedback modes, using this property is discouraged.

## AesManaged.IV property

```csharp
public override byte[] IV { get; set; }
```

Gets or sets the initialization vector (IV) to use for the symmetric algorithm.

Returns: The initialization vector to use for the symmetric algorithm.

#### Remarks
See the `IV` for more information about initialization vector.

## AesManaged.Key <example-value>

```csharp
public override byte[] Key { get; set; }
```

Gets or sets the secret key used for the symmetric algorithm.

Returns: The key for the symmetric algorithm.

To be added.

## AesManaged.KeySize property

```csharp
public override int KeySize { get; set; }
```

Gets or sets the size, in bits, of the secret key used for the symmetric algorithm.

Returns: The size, in bits, of the key used by the symmetric algorithm.

#### Remarks
The maximum size of the key is 256 bits.

## AesManaged.LegalBlockSizes property

```csharp
public override System.Security.Cryptography.KeySizes[] LegalBlockSizes { get; }
```

Gets the block sizes, in bits, that are supported by the symmetric algorithm.

Returns: The block sizes, in bits, that are supported by the symmetric algorithm.

#### Remarks
The only valid block size for AES is 128 bits.

## AesManaged.LegalKeySizes property

```csharp
public override System.Security.Cryptography.KeySizes[] LegalKeySizes { get; }
```

Gets the key sizes, in bits, that are supported by the symmetric algorithm.

Returns: The key sizes, in bits, that are supported by the symmetric algorithm.

#### Remarks
The valid key sizes for AES are 128, 192 and 256 bits.

## AesManaged.Mode property

```csharp
public override System.Security.Cryptography.CipherMode Mode { get; set; }
```

Gets or sets the mode for operation of the symmetric algorithm.

Returns: One of the enumeration values that specifies the block cipher mode to use for encryption. The default is `CipherMode.CBC`.

Exceptions:

- `CryptographicException`: `AesManaged.Mode` is set to `CipherMode.CFB` or `CipherMode.OFB`.

#### Remarks
The `CFB` and `OFB` modes are not supported.

## AesManaged.Padding property

```csharp
public override System.Security.Cryptography.PaddingMode Padding { get; set; }
```

Gets or sets the padding mode used in the symmetric algorithm.

Returns: One of the enumeration values that specifies the type of padding to apply. The default is `PaddingMode.PKCS7`.

#### Remarks
See the `Padding` for more information about padding.

## AesManaged.CreateDecryptor() method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateDecryptor ();
```

Creates a symmetric decryptor object using the current key and initialization vector (IV).

Returns: A symmetric decryptor object.

To be added.

## AesManaged.CreateDecryptor(Byte[], Byte[]) method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateDecryptor (byte[] rgbKey, byte[]? rgbIV);
```

Creates a symmetric decryptor object using the specified key and initialization vector (IV).

Parameters:

- `rgbKey`: The secret key to use for the symmetric algorithm.
- `rgbIV`: The initialization vector to use for the symmetric algorithm.

Returns: A symmetric decryptor object.

Exceptions:

- `ArgumentNullException`: `key` or `iv` is `null`.
- `ArgumentException`: `key` is invalid.

#### Examples
The following example shows how to use the `AesManaged.CreateDecryptor` method to decrypt an encrypted message. This code example is part of a larger example provided for the `AesManaged` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AesManaged/Overview/program.cs._

## AesManaged.CreateEncryptor() method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateEncryptor ();
```

Creates a symmetric encryptor object using the current key and initialization vector (IV).

Returns: A symmetric encryptor object.

To be added.

## AesManaged.CreateEncryptor(Byte[], Byte[]) method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateEncryptor (byte[] rgbKey, byte[]? rgbIV);
```

Creates a symmetric encryptor object using the specified key and initialization vector (IV).

Parameters:

- `rgbKey`: The secret key to use for the symmetric algorithm.
- `rgbIV`: The initialization vector to use for the symmetric algorithm.

Returns: A symmetric encryptor object.

Exceptions:

- `ArgumentNullException`: `key` or `iv` is `null`.
- `ArgumentException`: `key` is invalid.

#### Examples
The following example shows how to use the `AesManaged.CreateEncryptor` method to encrypt a message. This code example is part of a larger example provided for the `AesManaged` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/AesManaged/Overview/program.cs._

## AesManaged.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## AesManaged.GenerateIV() method

```csharp
public override void GenerateIV ();
```

Generates a random initialization vector (IV) to use for the symmetric algorithm.

To be added.

## AesManaged.GenerateKey() method

```csharp
public override void GenerateKey ();
```

Generates a random key to use for the symmetric algorithm.

To be added.
