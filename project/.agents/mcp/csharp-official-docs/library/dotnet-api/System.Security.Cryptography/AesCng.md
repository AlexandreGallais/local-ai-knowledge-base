---
title: "AesCng class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/AesCng.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AesCng class

Namespace: `System.Security.Cryptography`

```csharp
public sealed class AesCng : System.Security.Cryptography.Aes
```

Provides a Cryptography Next Generation (CNG) implementation of the Advanced Encryption Standard (AES) algorithm.

To be added.

## AesCng.AesCng() constructor

```csharp
public AesCng ();
```

Initializes a new instance of the `AesCng` class with an ephemeral key.

To be added.

## AesCng.AesCng(CngKey) constructor

```csharp
public AesCng (System.Security.Cryptography.CngKey key);
```

Initializes a new instance of the `AesCng` class with the specified `CngKey`.

Parameters:

- `key`: The key that will be used as input to the cryptographic operations performed by the current object.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `CryptographicException`: `key` does not represent an AES key.

-or-

An error occured while performing a cryptographic operation.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) is not supported on this system.

To be added.

## AesCng.AesCng(String) constructor

```csharp
public AesCng (string keyName);
```

Initializes a new instance of the `AesCng` class with the specified key name, which represents an existing persisted AES key.

Parameters:

- `keyName`: The name of the key.

Exceptions:

- `ArgumentNullException`: `keyName` is `null`.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) is not supported on this system.
- `CryptographicException`: All other errors.

#### Remarks
This constructor uses a default `CngKeyOpenOptions` value of `None` and `CngProvider.MicrosoftSoftwareKeyStorageProvider` as the default key <example-value> provider (KSP) to open the key.

## AesCng.AesCng(String, CngProvider) constructor

```csharp
public AesCng (string keyName, System.Security.Cryptography.CngProvider provider);
```

Initializes a new instance of the `AesCng` class with the specified key name, which represents an existing persisted AES key, and the specified key <example-value> provider (KSP).

Parameters:

- `keyName`: The name of the key.
- `provider`: The KSP that contains the key.

Exceptions:

- `ArgumentNullException`: `keyName` is `null`.

-or-

`provider` is `null`.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) is not supported on this system.
- `CryptographicException`: All other errors.

#### Remarks
A default `CngKeyOpenOptions` value of `None` is used to open the key.

## AesCng.AesCng(String, CngProvider, CngKeyOpenOptions) constructor

```csharp
public AesCng (string keyName, System.Security.Cryptography.CngProvider provider, System.Security.Cryptography.CngKeyOpenOptions openOptions);
```

Initializes a new instance of the `AesCng` class with the specified key name, which represents an existing persisted AES key,  the specified key <example-value> provider (KSP) and key open options.

Parameters:

- `keyName`: The name of the key.
- `provider`: The KSP that contains the key.
- `openOptions`: A bitwise combination of the enumeration values that specify options for opening the key, such as where the key is opened from (machine or user storage) and whether to suppress UI prompting.

Exceptions:

- `ArgumentNullException`: `keyName` is `null`.

-or-

`provider` is `null`.
- `PlatformNotSupportedException`: Cryptography Next Generation (CNG) is not supported on this system.
- `CryptographicException`: All other errors.

To be added.

## AesCng.Key <example-value>

```csharp
public override byte[] Key { get; set; }
```

Gets or sets the key for the `AesCng` algorithm.

Returns: The key for the `AesCng` algorithm.

#### Remarks
If you've created the `AesCng` object using an existing persisted key, when you read the value of the `Key` property, an attempt to export the key will be made. In this case, if the key is not exportable, a `CryptographicException` will be thrown.

In addition to that, if you set the value of the `Key` property,  the persisted key will no longer be used and a temporary key will be used instead. If you need to use the persisted key again, a new instance of `AesCng` class needs to be created.

## AesCng.KeySize property

```csharp
public override int KeySize { get; set; }
```

Gets or sets the size, in bits, of the secret key used by the `AesCng` algorithm.

Returns: The size, in bits, of the secret key used by the `AesCng` algorithm.

#### Remarks
For AES, the legal key sizes are 128, 192, and 256 bits.

If you've created the `AesCng` object using an existing persisted key and you set the value of the `KeySize` property,  the persisted key will no longer be used and an ephemeral key will be used instead. If you need to use the persisted key again, a new instance of `AesCng` class needs to be created.

## AesCng.CreateDecryptor() method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateDecryptor ();
```

Creates a symmetric AES decryptor object with the current key and initialization vector (`SymmetricAlgorithm.IV`).

Returns: A symmetric AES decryptor object.

Exceptions:

- `CryptographicException`: CFB128 mode is selected and the key is persisted.

#### Remarks

This method decrypts an encrypted message created using the `CreateEncryptor` overload with the same signature.

## AesCng.CreateDecryptor(Byte[], Byte[]) method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateDecryptor (byte[] rgbKey, byte[]? rgbIV);
```

Creates a symmetric AES decryptor object with the specified key and initialization vector (IV).

Parameters:

- `rgbKey`: The secret key to use for the AES algorithm. The key size must be 128, 192, or 256 bits.
- `rgbIV`: The initialization vector to use for the AES algorithm.

Returns: A symmetric AES decryptor object.

Exceptions:

- `ArgumentNullException`: `rgbKey` is `null`.
- `ArgumentException`: `rgbKey` is not a valid size for this algorithm.

-or-

`rgbIV` size does not match the block size for this algorithm.
- `CryptographicException`: `rgbKey` is a known weak key for this algorithm and cannot be used.

-or-

`rgbIV` is `null`.

#### Remarks
This method decrypts an encrypted message created using the `CreateEncryptor` overload with the same signature.

> **Note:**
>  If you've created the `AesCng` object using an existing persisted key and you want to make use of that key when decrypting the message, you want to set the `IV` property and then call the parameterless `CreateDecryptor` overload instead; otherwise, using this method will create an ephemeral key as specified by the `rgbKey` parameter.

## AesCng.CreateEncryptor() method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateEncryptor ();
```

Creates a symmetric AES encryptor object using the current key and initialization vector (`SymmetricAlgorithm.IV`).

Returns: A symmetric AES encryptor object.

Exceptions:

- `CryptographicException`: CFB128 mode is selected and the key is persisted.

#### Remarks

Use this method to encrypt a message and then use the `AesCng.CreateDecryptor` overload with the same signature to decrypt the result of this method.

## AesCng.CreateEncryptor(Byte[], Byte[]) method

```csharp
public override System.Security.Cryptography.ICryptoTransform CreateEncryptor (byte[] rgbKey, byte[]? rgbIV);
```

Creates a symmetric AES encryptor object with the specified key and initialization vector (IV).

Parameters:

- `rgbKey`: The secret key to use for the AES algorithm. The key size must be 128, 192, or 256 bits.
- `rgbIV`: The initialization vector to use for the AES algorithm.

Returns: A symmetric AES encryptor object.

Exceptions:

- `ArgumentNullException`: `rgbKey` is `null`.
- `ArgumentException`: `rgbKey` is not a valid size for this algorithm.

-or-

`rgbIV` size does not match the block size for this algorithm.
- `CryptographicException`: `rgbKey` is a known weak key for this algorithm and cannot be used.

-or-

`rgbIV` is `null`.

#### Remarks
Use this method to encrypt a message and then use the `AesCng.CreateDecryptor` overload with the same signature to decrypt the result of this method.

> **Note:**
>  If you've created the `AesCng` object using an existing persisted key and you want to make use of that key when encrypting the message, you want to set the `IV` property and then call the parameterless `CreateEncryptor` overload instead; otherwise, using this method will create an ephemeral key as specified by the `rgbKey` parameter.

## AesCng.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

To be added.

Parameters:

- `disposing`: To be added.

To be added.

## AesCng.GenerateIV() method

```csharp
public override void GenerateIV ();
```

Generates a random initialization vector (IV) to use for the AES algorithm.

To be added.

## AesCng.GenerateKey() method

```csharp
public override void GenerateKey ();
```

Generates a random key to use for the AES algorithm.

To be added.

## AesCng.TryDecryptCbcCore(Byte>, Byte>, Byte>, PaddingMode, Int32) method

```csharp
protected override bool TryDecryptCbcCore (ReadOnlySpan<byte> ciphertext, ReadOnlySpan<byte> iv, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode, out int bytesWritten);
```

To be added.

Parameters:

- `ciphertext`: To be added.
- `iv`: To be added.
- `destination`: To be added.
- `paddingMode`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## AesCng.TryDecryptCfbCore(Byte>, Byte>, Byte>, PaddingMode, Int32, Int32) method

```csharp
protected override bool TryDecryptCfbCore (ReadOnlySpan<byte> ciphertext, ReadOnlySpan<byte> iv, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode, int feedbackSizeInBits, out int bytesWritten);
```

To be added.

Parameters:

- `ciphertext`: To be added.
- `iv`: To be added.
- `destination`: To be added.
- `paddingMode`: To be added.
- `feedbackSizeInBits`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## AesCng.TryDecryptEcbCore(Byte>, Byte>, PaddingMode, Int32) method

```csharp
protected override bool TryDecryptEcbCore (ReadOnlySpan<byte> ciphertext, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode, out int bytesWritten);
```

To be added.

Parameters:

- `ciphertext`: To be added.
- `destination`: To be added.
- `paddingMode`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## AesCng.TryEncryptCbcCore(Byte>, Byte>, Byte>, PaddingMode, Int32) method

```csharp
protected override bool TryEncryptCbcCore (ReadOnlySpan<byte> plaintext, ReadOnlySpan<byte> iv, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode, out int bytesWritten);
```

To be added.

Parameters:

- `plaintext`: To be added.
- `iv`: To be added.
- `destination`: To be added.
- `paddingMode`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## AesCng.TryEncryptCfbCore(Byte>, Byte>, Byte>, PaddingMode, Int32, Int32) method

```csharp
protected override bool TryEncryptCfbCore (ReadOnlySpan<byte> plaintext, ReadOnlySpan<byte> iv, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode, int feedbackSizeInBits, out int bytesWritten);
```

To be added.

Parameters:

- `plaintext`: To be added.
- `iv`: To be added.
- `destination`: To be added.
- `paddingMode`: To be added.
- `feedbackSizeInBits`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.

## AesCng.TryEncryptEcbCore(Byte>, Byte>, PaddingMode, Int32) method

```csharp
protected override bool TryEncryptEcbCore (ReadOnlySpan<byte> plaintext, Span<byte> destination, System.Security.Cryptography.PaddingMode paddingMode, out int bytesWritten);
```

To be added.

Parameters:

- `plaintext`: To be added.
- `destination`: To be added.
- `paddingMode`: To be added.
- `bytesWritten`: To be added.

Returns: To be added.

To be added.
